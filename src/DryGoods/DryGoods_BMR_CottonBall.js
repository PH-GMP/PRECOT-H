/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-pascal-case */
import {
  Button,
  Tabs,
  Tooltip,
  Row,
  Select,
  message,
  Modal,
  Input,
} from "antd";
import React, { useEffect, useState } from "react";
import Production_Details from "./Dry Goods Cotton Ball/Production_Details";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import { BiNavigation } from "react-icons/bi";
import { FaLock } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Bale_Consumption_For_MiniRoll from "./Dry Goods Cotton Ball/Bale_Consumption_For_MiniRoll";
import Packing_Material_Issue from "./Dry Goods Cotton Ball/Packing_Material_Issue";
import Reference_Documents from "./Dry Goods Cotton Ball/Reference_Documents";
import Equipment_Used_Process from "./Dry Goods Cotton Ball/Equipment_Used_Process";
import Verification_Of_Records from "./Dry Goods Cotton Ball/Verification_Of_Records";
import Manufacturing_Steps from "./Dry Goods Cotton Ball/Manufacturing_Steps";
import Product_Reconciliation from "./Dry Goods Cotton Ball/Product_Reconciliation";
import Process_Delay from "./Dry Goods Cotton Ball/Process_Delay";
import Process_Deviation from "./Dry Goods Cotton Ball/Process_Deviation";
import List_Of_Enclosure from "./Dry Goods Cotton Ball/List_Of_Enclosure";
import Post_Production from "./Dry Goods Cotton Ball/Post_Production";
import Qa_Release from "./Dry Goods Cotton Ball/Qa_Release";
import Product_Release from "./Dry Goods Cotton Ball/Product_Release";
import Rework from "./Dry Goods Cotton Ball/Rework";
import API from "../baseUrl.json";
import axios from "axios";
import logo from "../Assests/logo.png";
import useMessage from "antd/es/message/useMessage";
import moment from "moment";

const DryGoods_BMR_CottonBall = () => {
  const [open, setOpen] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [isModalPrint2, setIsModalPrint2] = useState(false);
  const [laydownLov, setLaydownLov] = useState([]);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printParams, setPrintParams] = useState({
    batchNo: "",
    BaleConsumpDate: "",
    BaleConsumpShift: "",
    baleConsumptionLaydown: "",
  });
  const [baleData, setBaleData] = useState({
    details: [],
    printPdeRes: [],
  });

  const formatDate1 = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const [batchList, setBatchList] = useState([]);
  const [messageApi, contextHolder] = useMessage();
  const [selectedBatchNo, setSelectedBatchNo] = useState("");
  const [orderNo, setOrderNO] = useState("sampleorder");
  const [New, setNew] = useState("");
  const [printData, setPrintData] = useState({
    bmr001goodsproductiondetails: [],
    bmr05goodsequipmentused: [],
    bmr06goodsverificationofrecords: [],
    bmr07goodsmanufacturingstepscottonballs: [],
    bmr09goodsprocessdevrecord: [],
    bmr10goodsprocessdelayequpment: [],
    bmr11goodslistofenclouser: [],
    bmr12goodspostprodreview: [],
    bmr13goodsqarelease: [],
    bmr14goodsproductrelease: [],
    bmr03goodspackingmeterialissue: [],
    reworkList: [],
  });
  const [pdeData, setPdeData] = useState({
    output: "",
    input: "",
    yield: "",
  });
  console.log("PDE", pdeData);
  //All states for API here
  const machineNameLov = [
    { value: "TC10-1", label: "TC10-1 " },
    { value: "TC10-2", label: "TC10-2" },
  ];

  const [apiData, setApiData] = useState({
    baleConsumption: [],
    equipmentUsedProcess: [],
    listOfEnclosures: [],
    ManufacturingSteps: [],
    PackingMaterialIssue: [],
    PostProduction: [],
    ProcessDelay: [],
    ProcessDeviation: [],
    ProductReconciliation: [],
    ProductRelease: [],
    ProductionDetails: [],
    QaRelease: [],
    VerificationOfRecords: [],
    Rework: [],
  });

  //All States for LOV Here
  const [Lov, setLov] = useState({
    qaLov: [],
    supLov: [],
    hodLov: [],
  });

  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (key) => {};

  const updateAPIData = (updates) => {
    setApiData((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const updateLovData = (updates) => {
    setLov((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const onBatchChange = (selectedBatch) => {
    setNew(selectedBatch);
  };
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (role === "ROLE_QA") {
      axios
        .get(`${API.prodUrl}/Precot/api/Users/Service/getQA`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "applcation/json",
          },
        })
        .then((res) => {
          const a = res.data.map((option) => ({
            value: option.username,
            label: option.username,
          }));
          setLov({ qaLov: a });
        });
    }

    axios
      .get(`${API.prodUrl}/Precot/api/cottonBall/fetchBatchNo`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const a = res.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        setBatchList(a);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Unable to fetch BMR Caused Network Error",
        });
      });

    axios
      .get(
        `${API.prodUrl}/Precot/api/Users/Service/getRoleBaseDepartmentNames?department=DRY_GOODS`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const roleMap = {
          ROLE_SUPERVISOR: "supLov",
          ROLE_HOD: "hodLov",
          ROLE_DESIGNEE: "hodLov",
        };
        console.log("Getted Role ", res.data);
        const newLovState = Object.keys(roleMap).reduce((acc, role) => {
          const filteredOptions = res.data
            .filter(
              (option) =>
                option.role == role ||
                (role == "ROLE_DESIGNEE" && option.role == "ROLE_HOD")
            )
            .map((option) => ({
              value: option.username,
              label: option.username,
            }));

          const targetLov = roleMap[role];
          acc[targetLov] = filteredOptions;
          return acc;
        }, {});
        console.log("Filtered LOv", newLovState);
        setLov((prevState) => ({
          ...prevState,
          ...newLovState,
        }));
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Unable to fetch Production Department Caused Network Error",
        });
      });

    const handleKeyDown = (event) => {};
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const sendOrderNo = () => {
    setSelectedBatchNo(New);
  };
  //    setSelectedBatchNo(selectedOrder);
  useEffect(() => {}, [orderNo]);

  const items = [
    {
      key: "1",
      label: "Production Details",
      children: (
        <Production_Details
          apiData={[]}
          edit={true}
          bmr="SP90897"
          batchNo={selectedBatchNo}
          orderNo={orderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          // hodLov={[]}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "2",
      label: "Packing Material Issue",
      children: (
        <Packing_Material_Issue
          apiData={[]}
          edit={true}
          orderNo={orderNo}
          batchNo={selectedBatchNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          // hodLov={[]}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "3",
      label: "Reference Documents",
      children: (
        <Reference_Documents
          apiData={[]}
          edit={true}
          bmr="SP90897"
          batchNo=""
          orderNo={orderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          // hodLov={[]}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "4",
      label: "Equipment Used For The Process",
      children: (
        <Equipment_Used_Process
          apiData={[]}
          edit={true}
          bmr="SP90897"
          orderNo={orderNo}
          batchNo={selectedBatchNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          // hodLov={[]}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "5",
      label: "Verification of Record",
      children: (
        <Verification_Of_Records
          apiData={[]}
          edit={true}
          orderNo={orderNo}
          batchNo={selectedBatchNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          // hodLov={[]}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "6",
      label: "Manufacturing Steps",
      children: (
        <Manufacturing_Steps
          apiData={[]}
          edit={true}
          orderNo={orderNo}
          batchNo={selectedBatchNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          // hodLov={[]}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "7",
      label: "Product Reconciliation",
      children: (
        <Product_Reconciliation
          apiData={[]}
          edit={true}
          orderNo={orderNo}
          batchNo={selectedBatchNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          // hodLov={[]}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "8",
      label: "Process Deviation Record",
      children: (
        <Process_Deviation
          apiData={[]}
          edit={true}
          bmr="SP90897"
          orderNo={orderNo}
          batchNo={selectedBatchNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          // hodLov={[]}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "9",
      label: "Process delay Equipment breakdown record",
      children: (
        <Process_Delay
          apiData={[]}
          edit={true}
          batchNo={selectedBatchNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          orderNo={orderNo}
          // hodLov={[]}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "10",
      label: "List of Enclosures",
      children: (
        <List_Of_Enclosure
          apiData={[]}
          edit={true}
          batchNo={selectedBatchNo}
          orderNo={orderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          // hodLov={[]}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "11",
      label: "Post Production Review",
      children: (
        <Post_Production
          apiData={[]}
          edit={true}
          batchNo={selectedBatchNo}
          orderNo={orderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.hodLov}
          role={localStorage.getItem("role")}
          loggedInQaManQADes={
            localStorage.getItem("role") == "QA_MANAGER" ||
            localStorage.getItem("role") == "QA_DESIGNEE"
              ? true
              : false
          }
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "12",
      label: "QA Release",
      children: (
        <Qa_Release
          apiData={[]}
          edit={true}
          batchNo={selectedBatchNo}
          orderNo={orderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.hodLov}
          role={localStorage.getItem("role")}
          loggedInQaManQADes={
            localStorage.getItem("role") == "QA_MANAGER" ||
            localStorage.getItem("role") == "QA_DESIGNEE"
              ? true
              : false
          }
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "13",
      label: "Product Release",
      children: (
        <Product_Release
          apiData={[]}
          edit={true}
          batchNo={selectedBatchNo}
          orderNo={orderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.hodLov}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
    {
      key: "14",
      label: "Rework",
      children: (
        <Rework
          apiData={[]}
          edit={true}
          batchNo={selectedBatchNo}
          orderNo={orderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.hodLov}
          role={localStorage.getItem("role")}
          loggedInQa={localStorage.getItem("role") == "ROLE_QA" ? true : false}
          loggedInHod={
            localStorage.getItem("role") == "ROLE_HOD" ||
            localStorage.getItem("role") == "ROLE_DESIGNEE"
              ? true
              : false
          }
          loggedInSupervisor={
            localStorage.getItem("role") == "ROLE_SUPERVISOR" ? true : false
          }
        />
      ),
    },
  ];

  // ---------- Print Functions --------------------

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/goodsLaydown/LaydownLov`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length > 0) {
          const a = response.data.map((option) => ({
            value: option.drygoods_laydown_number,
            label: option.drygoods_laydown_number,
          }));
          setLaydownLov(a);
        }
      } catch (error) {}
    };
    fetchData();
  }, [selectedBatchNo]);
  const options = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];
  const handlePrintCancel = () => {
    setPrintButtonLoading(false);
    setIsModalPrint(false);
    setPrintParams({
      batchNo: "",
      BaleConsumpDate: "",
      BaleConsumpShift: "",
      baleConsumptionLaydown: "",
    });
  };
  const handlePrintCancel2 = () => {
    setPrintButtonLoading(false);
    setIsModalPrint2(false);
    setBaleData({
      consumptionReports: [],
    });
  };

  useState(() => {
    console.log("Print Data", printData);
  }, [printData]);

  const [reworkList, setreworkList] = useState([]);

  // const handlePrint1 = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${ API.prodUrl}/Precot/api/cottonBall/GetCottonBallPrint?batch_no=95277810-1`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setreworkList(response.data.reworkList);
  //     window.print(); // Trigger print after data is set
  //   } catch (error) {
  //     console.error("Error fetching print data:", error);
  //   }
  // };

  const handlePrint = async () => {
    if (printParams.batchNo == "") {
      message.warning("Please Select Batch No");
      return;
    }
    try {
      setPrintButtonLoading(true);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/cottonBall/GetCottonBallPrint?batch_no=${printParams.batchNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        const data = response.data;
        setreworkList(response.data.reworkList);
        console.log("data", data);
        if (data.bmr14goodsproductrelease.length > 0) {
          setPrintData(response.data);
          handlePde(
            data.bmr001goodsproductiondetails[0]?.order_no,
            data.bmr001goodsproductiondetails[0]?.start_date,
            data.bmr001goodsproductiondetails[0]?.end_date
          );
          if (
            data.bmr11goodslistofenclouser[0]?.detailsEncloser[0]?.remarks ==
            "ATTACHED"
          ) {
            setIsModalPrint2(true);
            setIsModalPrint(false);
            setPrintButtonLoading(false);
            handlePrint2();
          } else if (
            data.bmr11goodslistofenclouser[0]?.detailsEncloser[0]?.remarks !==
            "ATTACHED"
          ) {
            setTimeout(() => {
              window.print();
              setPrintButtonLoading(false);
              setPrintData({
                bmr001goodsproductiondetails: [],
                bmr05goodsequipmentused: [],
                bmr06goodsverificationofrecords: [],
                bmr07goodsmanufacturingstepscottonballs: [],
                bmr09goodsprocessdevrecord: [],
                bmr10goodsprocessdelayequpment: [],
                bmr11goodslistofenclouser: [],
                bmr12goodspostprodreview: [],
                bmr13goodsqarelease: [],
                bmr14goodsproductrelease: [],
                bmr03goodspackingmeterialissue: [],
                reworkList: [],
              });
              setPdeData({
                output: "",
                input: "",
                yield: "",
              });
              setPrintParams({
                batchNo: "",
                BaleConsumpDate: "",
                BaleConsumpShift: "",
                baleConsumptionLaydown: "",
              });
            }, [4000]);
          }
        } else {
          message.warning("No Data Available To Print");
          setPrintButtonLoading(false);
          return;
        }
      }
    } catch (error) {
      setPrintButtonLoading(false);
      message.error(error?.response?.data?.message);
    }
  };

  const handlePrint2 = async () => {
    if (
      printParams.BaleConsumpDate == "" ||
      printParams.BaleConsumpDate == null
    ) {
      message.warning("Please Select Date");
      return;
    }
    if (
      printParams.BaleConsumpShift == "" ||
      printParams.BaleConsumpShift == null
    ) {
      message.warning("Please Select Shift");
      return;
    }
    if (
      printParams.baleConsumptionLaydown == "" ||
      printParams.baleConsumptionLaydown == ""
    ) {
      message.warning("Please Select Machine Name");
      return;
    }
    try {
      setPrintButtonLoading(true);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Drygoods/Service/getsliverDetailsForPrintF01?date=${printParams.BaleConsumpDate}&shift=${printParams.BaleConsumpShift}&machine_name=${printParams.baleConsumptionLaydown}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        setTimeout(() => {
          setPrintButtonLoading(false);
          setPrintData({
            bmr001goodsproductiondetails: [],
            bmr05goodsequipmentused: [],
            bmr06goodsverificationofrecords: [],
            bmr07goodsmanufacturingstepscottonballs: [],
            bmr09goodsprocessdevrecord: [],
            bmr10goodsprocessdelayequpment: [],
            bmr11goodslistofenclouser: [],
            bmr12goodspostprodreview: [],
            bmr13goodsqarelease: [],
            bmr14goodsproductrelease: [],
            bmr03goodspackingmeterialissue: [],
            reworkList: [],
          });
          setPdeData({
            output: "",
            input: "",
            yield: "",
          });
          setPrintParams({
            batchNo: "",
            BaleConsumpDate: "",
            BaleConsumpShift: "",
            baleConsumptionLaydown: "",
          });
        }, [4000]);
        return;
      }
      const data = response.data[0];
      setBaleData((prevState) => ({
        ...prevState,
        ...data,
        details: response.data.map((x) => {
          return x.details;
        }),
      }));
      setTimeout(() => {
        fetchJob();
      }, 1000);
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };
  const fetchJob = async () => {
    let pdeShift;
    switch (printParams.BaleConsumpShift) {
      case "I":
        pdeShift = 1;
        break;
      case "II":
        pdeShift = 2;
        break;
      case "III":
        pdeShift = 3;
        break;
    }
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/goods/api/sliverStoppage?date=${printParams.date}&shift=${pdeShift}&machine_name=${printParams.machineNamePrint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length > 0) {
        setBaleData((prevState) => ({
          ...prevState,
          printPdeRes: response.data,
        }));
        setTimeout(() => {
          window.print();
          setPrintButtonLoading(false);
          setPrintData({
            bmr001goodsproductiondetails: [],
            bmr05goodsequipmentused: [],
            bmr06goodsverificationofrecords: [],
            bmr07goodsmanufacturingstepscottonballs: [],
            bmr09goodsprocessdevrecord: [],
            bmr10goodsprocessdelayequpment: [],
            bmr11goodslistofenclouser: [],
            bmr12goodspostprodreview: [],
            bmr13goodsqarelease: [],
            bmr14goodsproductrelease: [],
            bmr03goodspackingmeterialissue: [],
            reworkList: [],
          });
          setPdeData({
            output: "",
            input: "",
            yield: "",
          });
          setPrintParams({
            batchNo: "",
            BaleConsumpDate: "",
            BaleConsumpShift: "",
            baleConsumptionLaydown: "",
          });
        }, [4000]);
      }
    } catch (error) {
      message.error(error.response.data.message);
      setPrintButtonLoading(false);
    }
  };
  const handlePde = async (orderNo, startDate, endDate) => {
    if (orderNo && startDate && endDate) {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/CottonWoolRall/productReconillation?order=${orderNo}&fromdate=${startDate}&todate=${endDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setPdeData((prevState) => ({
            ...prevState,
            input: response.data.input,
            output: response.data.output,
            yield: response.data.yield,
          }));
        }
      } catch (error) {
        // message.error(error.response.data.message);
      }
    }
  };

  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const handlePrintParams = (e, name, type) => {
    let value;
    if (type == "select") {
      value = e;
    }
    setPrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePrintParams2 = (e, name) => {
    if (name == "date") {
      setPrintParams((prevState) => ({
        ...prevState,
        BaleConsumpDate: e.target.value,
      }));
    }
    if (name == "shift") {
      setPrintParams((prevState) => ({
        ...prevState,
        BaleConsumpShift: e,
      }));
    }
    if (name == "laydown") {
      setPrintParams((prevState) => ({
        ...prevState,
        baleConsumptionLaydown: e,
      }));
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleTotal = (bodyContent) => {
    let netWeightTotal = 0;
    bodyContent.forEach((details) => {
      netWeightTotal += details.NetWt;
    });
    return { netWeightTotal };
  };
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div>
      <Modal
        title="Batch Manufacturing Record - Cotton Ball (Print)"
        open={isModalPrint}
        onCancel={handlePrintCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handlePrintCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handlePrint}
            loading={printButtonLoading}
          >
            OK
          </Button>,
        ]}
      >
        <label>Select Batch No : </label>
        <Select
          showSearch
          options={batchList}
          value={printParams.batchNo}
          style={{ width: "150px", textAlign: "center" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "batchNo", "select");
          }}
        ></Select>
      </Modal>
      <Modal
        title="Bale Consumption for Sliver Report (Attachment)"
        open={isModalPrint2}
        onCancel={handlePrintCancel2}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handlePrintCancel2}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handlePrint2}
            loading={printButtonLoading}
          >
            OK
          </Button>,
        ]}
      >
        <label>
          Date
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
          &nbsp;&nbsp;
        </label>
        <Input
          type="date"
          value={printParams.BaleConsumpDate}
          onChange={(e) => {
            handlePrintParams2(e, "date");
          }}
          style={{ textAlign: "center", width: "150px" }}
        ></Input>
        <br></br>
        <br></br>
        <label>
          Shift
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          : &nbsp;&nbsp;
        </label>
        <Select
          showSearch
          options={options}
          value={printParams.BaleConsumpShift}
          onChange={(e) => {
            handlePrintParams2(e, "shift");
          }}
          style={{ textAlign: "center", width: "150px" }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        ></Select>
        <br></br>
        <br></br>
        <label>Machine Name : &nbsp;&nbsp;</label>
        <Select
          options={machineNameLov}
          value={printParams.baleConsumptionLaydown}
          onChange={(e) => {
            handlePrintParams2(e, "laydown");
          }}
          style={{ textAlign: "center", width: "150px" }}
          showSearch
          dropdownStyle={{ textAlign: "center" }}
        ></Select>
      </Modal>
      <BleachingHeader
        formName={"Batch Manufacturing Record - Cotton Ball"}
        formatNo={"(BMR)"}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            onClick={showPrintModal}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              //   display: printBtnEnable ? "block" : "none",
            }}
            shape="round"
            icon={<FaPrint color="#00308F" />}
          >
            Print
          </Button>,
          // <Button onClick={a}>a</Button>,
          <Button
            // onClick={handleBack}
            onClick={() => window.history.back()}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            Back
          </Button>,
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // display: saveBtnStatus ? "block" : "none",
            }}
            onClick={() => {
              // eslint-disable-next-line no-unused-expressions
              confirm("You Want to logged out") == true
                ? navigate("/Precot")
                : null;
            }}
            shape="round"
            icon={<FaLock color="#00308F" />}
          >
            &nbsp;Logout
          </Button>,
          <Tooltip
            trigger="click"
            style={{
              backgroundColor: "#fff",
            }}
            title={
              <div>
                <h3>{localStorage.getItem("username")}</h3>
                <p>{localStorage.getItem("role")}</p>
              </div>
            }
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
              }}
              shape="circle"
              icon={<FaUserCircle color="#00308F" size={20} />}
            />
          </Tooltip>,
        ]}
      />
      <Row
        style={{
          display: "flex",
          width: "98%",
          position: "relative",
          left: "1%",
          justifyContent: "space-between",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <label>
          Select Batch No :
          <Select
            showSearch
            onChange={onBatchChange}
            options={batchList}
            placeholder="Select Batch No"
            style={{
              marginRight: "2em",
            }}
          />
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // display: saveBtnStatus ? "block" : "none",
            }}
            shape="round"
            icon={<BiNavigation color={"#00308F"} />}
            onClick={sendOrderNo}
          >
            Go
          </Button>
        </label>
      </Row>
      <Tabs
        style={{
          width: "98%",
          position: "relative",
          left: "1%",
        }}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
      {/* print layout code */}
      <div id="section-to-print">
        <style>
          {`
      @media print {
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.8); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
      #section-to-print table th,
  #section-to-print table td {
    border: 1px solid black;
    text-align: left;
    padding:2px;
    font-size: 12px !important;
    font-family: "Times New Roman", Times, serif;
  }
      }
    `}
        </style>
        <table style={{ width: "90%", tableLayout: "fixed" }}>
          <br></br>
          <thead>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none", padding: "20px" }} colSpan="15"></td>
            </tr>

            <tr>
              <th
                colspan="5"
                rowSpan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "80px", height: "auto", textAlign: "center" }}
                />
                <br></br>
                <br></br>
                Unit H
              </th>
              <th
                colspan="9"
                rowSpan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Batch Manufacturing Record
              </th>
              <th
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Format.:
              </th>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-PRD04/F-004
              </td>
            </tr>
            <tr>
              <th
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Revision No.:
              </th>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                01
              </td>
            </tr>
            <tr>
              <th
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ref SOP No.:
              </th>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01-D-64
              </td>
            </tr>
            <tr>
              <th
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Page NO.:
              </th>
              <td
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
            </tr>

            <br />
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Department Name
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Dry Goods
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                BMR No. / Rev. No.
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                DG-PL-002 / 01
              </td>
            </tr>

            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Product Name
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Cotton Ball
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Effective Date{" "}
              </td>
              <td
                colSpan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                {formatDate(printData.bmr14goodsproductrelease[0]?.updatedAt) ||
                  "NA"}
              </td>
            </tr>
            <tr></tr>
          </thead>
          <br></br>
          <tbody>
            <tr>
              <th
                colSpan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1.0 PRODUCTION DETAILS{" "}
              </th>
            </tr>
            <tr>
              <th
                colSpan={10}
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                BATCH NO: {printData.bmr001goodsproductiondetails[0]?.batch_no}
              </th>
              <th
                colSpan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Machine :{" "}
                {printData.bmr001goodsproductiondetails[0]?.machine_no}
              </th>
            </tr>
            <tr>
              <th
                colSpan={10}
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                PO No.: {printData.bmr001goodsproductiondetails[0]?.po_no}
              </th>
              <th
                colSpan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Production Order No.:{" "}
                {printData.bmr001goodsproductiondetails[0]?.order_no}
              </th>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Product Description{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]?.prod_desc || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Product Code.:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]?.prod_code || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PO Qty. in No of Bag:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]?.po_qty_bag || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PO Qty. in No of Boxes:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]?.po_qty_box || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                So far Packed Qty. in No of Bags:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]?.far_qty_bag || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                So far Packed Qty. in No of Boxes:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]?.far_qty_box || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Remaining Qty.in No of Bags:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]?.rem_qty_bag || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Remaining Qty.in No of Boxes:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]?.rem_qty_box || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                On date packed Qty.in No of Bags:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]?.on_date_pack}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                On date packed Qty.in No of Bags:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]?.on_date_box}
              </td>
            </tr>
            <tr>
              <th
                colSpan={10}
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                PO Completion Status
              </th>
              <th
                colSpan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                {printData.bmr001goodsproductiondetails[0]?.po_comp_status}
              </th>
            </tr>
            <tr>
              <th
                colSpan={20}
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Lot No :{printData.bmr001goodsproductiondetails[0]?.lot_no}
              </th>
            </tr>
            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Manufacturing Start Date
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Manufacturing End Date{" "}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date{" "}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {formatDate(
                  printData.bmr001goodsproductiondetails[0]?.start_date
                ) || "NA"}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Time{" "}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]?.start_time || "NA"}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {formatDate(
                  printData.bmr001goodsproductiondetails[0]?.end_date
                ) || "NA"}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Time
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]?.end_time || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Manufacturing Completion Date{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {formatDate(
                  printData.bmr001goodsproductiondetails[0]
                    ?.manufactureCompletionDate
                ) || "NA"}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Time
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr001goodsproductiondetails[0]
                  ?.manufactureCompletionTime || "NA"}
              </td>
            </tr>
            <br />

            <tr>
              <th
                colSpan="20"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRODUCTION BATCH RECORD ISSUANCE DETAILS{" "}
              </th>
            </tr>
            <tr>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Issued by: Quality Assurance has reviewed the Batch Record to
                ensure that the copy is a complete, accurate copy of the Master
                Batch Record.
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Received by: Production has reviewed the Batch Record to ensure
                that the copy is complete and correct. Production is responsible
                for the Batch Record, following the issuance.
              </td>
            </tr>

            <tr>
              <td
                colSpan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "50px",
                }}
              >
                Issued by (QA)
                <div style={{ verticalAlign: "Bottom" }}>
                  {printData.bmr001goodsproductiondetails[0]?.issued_by || "NA"}
                  <br></br>
                  {formatDateTime(
                    printData.bmr001goodsproductiondetails[0]?.issued_on
                  ) || "NA"}
                </div>{" "}
              </td>
              <td
                colSpan="10"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                  height: "50px",
                }}
              >
                Received by (Production)
                <div style={{ verticalAlign: "Bottom" }}>
                  {printData.bmr001goodsproductiondetails[0]?.received_by ||
                    "NA"}
                  <br></br>
                  {formatDateTime(
                    printData.bmr001goodsproductiondetails[0]?.received_on
                  ) || "NA"}
                </div>
              </td>
            </tr>

            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                  border: "none",
                }}
              >
                <strong>
                  {" "}
                  Instructions while filling in BMR: <br />
                </strong>
                1. Record all data in blue ink. <br />
                2. Record time as HR: MM in 24 hours format. <br />
                3. Record date in DD/MM/YYYY or DD/MM/YY format.
                <br />
                4. Do not leave any blank space. If there is any blank space, NA
                should be written, and the line should be <br />
                marked as "Z" Shape with sign and date. 5. Blue ink should be
                used by QA for review. <br />
                6. Immediately do the entry in BMR, along with the completion of
                activity. The time entered should be <br />
                considered as completion time of the activity.
                <br />
                7. Time of starting the batch shall be considered as start time
                and end of the completion of activity from <br />
                the equipment should be considered as completion time of batch.
                <br />
                8.Whenever any Deviation occurs, raise the deviation,
                investigation of deviation shall be performed & <br /> enter the
                deviation in the BMR.
                <br />
                9. Note: Tick mark "√" indicates activity selected /completed &
                Cross mark '"×" <br />
                indicate not selected/ not completed. <br />
                <strong>Safety Instructions: </strong>
                <br />
                Use personal Protective Equipment like Apron, Helmet, Safety
                goggles, Nose mask and hand gloves, etc <br />
                during material handling and sampling. Ear plugs are used in
                high noise areas.
              </td>
            </tr>

            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                2.0 SLIVER CONSUMPTION FOR BALL: Refer the attachment.
                Format#PRD04-/F-13
              </th>
            </tr>
            {baleData?.details?.length > 0 && (
              <>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    Machine Name
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {baleData.machine_name}
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    Date
                  </td>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    {formatDate(baleData.date)}
                  </td>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    Shift
                  </td>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    {baleData.shift}
                  </td>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    Lay down No
                  </td>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    {baleData.laydown_no}
                  </td>
                </tr>
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {" "}
                    Order No.
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData.order_no}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {" "}
                    Mixing
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData.mixing}
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {" "}
                    Std. Wt in Grams (Wt. Tolerance in +/- 5%)
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {baleData.std_wt}
                  </td>
                </tr>
                <tr>
                  <td colSpan="20" style={{ textAlign: "left" }}>
                    1.Parameters:
                  </td>
                </tr>
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    GMP
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Draft
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Doffer Speed in RPM
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Sliver Length in MTRS
                  </td>
                </tr>
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {baleData.gmp}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {baleData.draft}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {baleData.doffer_speed}
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {baleData.sliver_length}
                  </td>
                </tr>
                <tr>
                  <td colSpan="20" style={{ textAlign: "left" }}>
                    2.Sliver Receipt:
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    S. No.
                  </td>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    Sliver Can No
                  </td>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    GPM
                  </td>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    Carding M/c No.
                  </td>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    Net Wt. In Kg
                  </td>
                </tr>
                {baleData.details && baleData.details.length > 0 ? (
                  baleData.details[0].map(
                    (detail, index) => (
                      console.log("2222", detail),
                      (
                        <tr key={detail.id}>
                          <td style={{ textAlign: "center", width: "10%" }}>
                            {index + 1}
                          </td>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            {detail.can_no}
                          </td>
                          <td colSpan="4" style={{ textAlign: "center" }}>
                            {detail.gpm}
                          </td>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            {detail.carding_mc_no}
                          </td>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            {detail.net_wt}
                          </td>
                        </tr>
                      )
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="11" style={{ textAlign: "center" }}>
                      No data available
                    </td>
                  </tr>
                )}

                <tr>
                  <td colSpan="20" style={{ textAlign: "left" }}>
                    3.Out Put details:
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    Hours
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    1
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    2
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    3
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    4
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    5
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    6
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    7
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    8
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    Total
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    Wt. In Kg
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData.hours_01}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData.hours_02}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData.hours_03}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData.hours_04}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData.hours_05}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData.hours_06}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData.hours_07}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData.hours_08}
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {" "}
                    {baleData.total_sum}
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} rowSpan={2} style={{ textAlign: "center" }}>
                    Waste in Kg
                  </td>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    Compactor Wt. in Kg
                  </td>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    Sliver Weight in Kg
                  </td>
                </tr>
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    {baleData.compactor_wt}
                  </td>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    {baleData.sliver_wt}
                  </td>
                </tr>
                <tr>
                  <td colSpan="20" style={{ textAlign: "left" }}>
                    4.Stoppage:
                  </td>
                </tr>
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {" "}
                    Nature Of Problem
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {" "}
                    Stop. Time
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {" "}
                    Restart Time
                  </td>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {" "}
                    Idle Time (in Min)
                  </td>
                </tr>
                {baleData?.printPdeRes?.length > 0 ? (
                  baleData?.printPdeRes?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.Scause}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.FTime}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.TTime}
                      </td>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        {row.TotHrs}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}></td>
                    <td colSpan="5" style={{ textAlign: "center" }}></td>
                    <td colSpan="5" style={{ textAlign: "center" }}></td>
                    <td colSpan="5" style={{ textAlign: "center" }}></td>
                  </tr>
                )}
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {" "}
                    Operator Sign & Date <br></br>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          {baleData.operator_sign} <br></br>
                          {formatDateTime(baleData.createdAt)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {" "}
                    HOD / Designee Sign & Date <br></br>
                    <div style={{ textAlign: "center" }}>
                      {baleData.hod_sign} <br></br>
                      {formatDateTime(baleData.hod_submit_on)}
                    </div>
                  </td>
                </tr>
              </>
            )}
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                3.0 PACKING MATERIAL ISSUE: Refer the attachment. Format
                Format#STR01/F-11
              </th>
            </tr>
            <tr>
              <th colSpan="2">S.No</th>
              <th colSpan="4">Date</th>
              <th colSpan="3">Batch No</th>
              <th colSpan="3">Name of the Material</th>
              <th colSpan="3">QTY</th>
              <th colSpan="3">Units</th>
              <th colSpan="2">Remarks</th>
            </tr>
            {printData && printData.bmr03goodspackingmeterialissue.length > 0
              ? printData.bmr03goodspackingmeterialissue[0].pckdetails.map(
                  (x, i) => {
                    return (
                      <tr>
                        <td colSpan="2">{i + 1}</td>
                        <td colSpan="4">{x.date}</td>
                        <td colSpan="3">{x.packing_batch_no}</td>
                        <td colSpan="3">{x.name_of_the_meterial}</td>
                        <td colSpan="3">{x.qty}</td>
                        <td colSpan="3">{x.unit}</td>
                        <td colSpan="2">{x.remarks}</td>
                      </tr>
                    );
                  }
                )
              : null}
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                4.0 REFERENCE DOCUMENTS:{" "}
              </th>
            </tr>

            <tr>
              <th
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Sl.No.
              </th>
              <th
                colspan="12"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Title{" "}
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Document No.{" "}
              </th>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Good Documentation Practices
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01-D-10
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-PRD03-D-03
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Cleaning Machine & Sanitization
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-PRD03-D-04
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Control of Non-Conforming
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01-D-20
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Deviation Management
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01-D-41
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                6
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Change Control
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-QAD01-D-37
              </td>
            </tr>

            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                <b>5.0 EQUIPMENT USED FOR THE PROCESS:</b>
                <br />
                PROCESSING EQUIPMENTS (MEASURING DEVICES) CALIBRATION STATUS:
                Refer Annexure No-1
              </th>
            </tr>
            <tr>
              <th style={{ textAlign: "center" }} colSpan={2}>
                S. No.
              </th>
              <th style={{ textAlign: "center" }} colSpan={6}>
                Equipment Name
              </th>
              <th style={{ textAlign: "center" }} colSpan={2}>
                Equipment code
              </th>
              <th style={{ textAlign: "center" }} colSpan={2}>
                Date of Calibration
              </th>
              <th style={{ textAlign: "center" }} colSpan={2}>
                Calibration due on
              </th>
              <th style={{ textAlign: "center" }} colSpan={2}>
                {" "}
                Checked by
              </th>
              <th style={{ textAlign: "center" }} colSpan={4}>
                Remarks
              </th>
            </tr>
            {printData.bmr05goodsequipmentused[0]?.details?.map(
              (equipment, index) => (
                <tr style={{ textAlign: "center" }} key={index}>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {index + 1}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={6}>
                    {equipment.equipmentName || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {equipment.equipmentCode || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {formatDate(equipment.calibrationDate) || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {formatDate(equipment.dueDate) || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {equipment.checked_by || "NA"}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={4}>
                    {equipment.remarks || "NA"}
                  </td>
                </tr>
              )
            )}

            <br></br>
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                6.0 VERIFICATION OF RECORDS:
              </th>
            </tr>

            <tr>
              <th
                colspan="7"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Name of the Record{" "}
              </th>
              <th
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checked by/Date{" "}
              </th>
              <th
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Verified by/Date{" "}
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Status
              </th>
            </tr>

            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Department Cleaning Records
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[0]?.checked_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[0]?.checked_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[0]?.verified_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[0]?.verified_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[0]?.activity ==
                    "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[0]?.activity ==
                    "NOT SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Machine Cleaning Record{" "}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[1]?.checked_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[1]?.checked_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[1]?.verified_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[1]?.verified_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords?.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[1]?.activity ==
                    "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[1]?.activity ==
                    "NOT SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Logbook
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[2]?.checked_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[2]?.checked_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[2]?.verified_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[2]?.verified_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[2]?.activity ==
                    "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[2]?.activity ==
                    "NOT SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Production Records
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[3]?.checked_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[3]?.checked_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[3]?.verified_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[3]?.verified_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[3]?.activity ==
                    "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[2]?.activity ==
                    "NOT SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Bale consumption for Sliver Record
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[3]?.checked_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[3]?.checked_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[3]?.verified_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[3]?.verified_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[3]?.activity ==
                    "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[3]?.activity ==
                    "NOT SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Product change over
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[4]?.checked_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[4]?.checked_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[4]?.verified_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[4]?.verified_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[4]?.activity ==
                    "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[4]?.activity ==
                    "NOT SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sharp tool issue record
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[5]?.checked_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[5]?.checked_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[5]?.verified_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[5]?.verified_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[5]?.activity ==
                    "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[5]?.activity ==
                    "NOT SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Waste Record
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[7]?.checked_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[7]?.checked_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[7]?.verified_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[7]?.verified_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[7]?.activity ==
                    "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[7]?.activity ==
                    "NOT SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Machine sanitizer
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[6]?.checked_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[6]?.checked_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr06goodsverificationofrecords[0]
                  ?.detailsVerificationRecords[6]?.verified_sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr06goodsverificationofrecords[0]
                    ?.detailsVerificationRecords[6]?.verified_date
                ) || "NA"}
                <br></br>
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[6]?.activity ==
                    "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr06goodsverificationofrecords.length > 0
                  ? printData.bmr06goodsverificationofrecords[0]
                      ?.detailsVerificationRecords[6]?.activity ==
                    "NOT SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                7.0 MANUFACTURING STEPS:{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="2">Step No</th>
              <th colSpan="8">Operation</th>
              <th colSpan="4">Observation</th>
              <th colSpan="3">Performed by (Sign & Date) </th>
              <th colSpan="3">Checked by(Sign & Date) </th>
            </tr>
            <tr>
              <td
                colSpan="2"
                rowSpan={2}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1
              </td>
              <td
                colSpan="8"
                rowSpan={2}
                style={{ textAlign: "center", padding: "0.9em" }}
              >
                Switch ON all the machines & Sub machines: Bale plucker, MBO,
                ERM, TC-10 (1&2), Ball Machine (Link & Texcore), Sealing
                machine, Metal detector.
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ready
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr07goodsmanufacturingstepscottonballs?.length > 0
                  ? printData.bmr07goodsmanufacturingstepscottonballs[0]
                      ?.rdyNoRdy01 == "Ready"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colSpan="3"
                rowSpan={2}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.rdy01SignProd || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.rdy01DateProd
                ) || "NA"}
              </td>
              <td
                colSpan="3"
                rowSpan={2}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.rdy01SignQa || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.rdy01DateQa
                ) || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Ready
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr07goodsmanufacturingstepscottonballs?.length > 0
                  ? printData.bmr07goodsmanufacturingstepscottonballs[0]
                      ?.rdyNoRdy01 == "NotReady"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                rowSpan={2}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2
              </td>
              <td
                colSpan="8"
                rowSpan={2}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Bale Plucker: Check the lay down area for Cleanliness and verify
                the arrangement of the bales for the readiness of process in
                Bale Plucker.
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ready
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr07goodsmanufacturingstepscottonballs?.length > 0
                  ? printData.bmr07goodsmanufacturingstepscottonballs[0]
                      ?.rdyNoRdy02 == "Ready"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colSpan="3"
                rowSpan={2}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.rdy02SignProd || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.rdy02DateProd
                ) || "NA"}
              </td>
              <td
                colSpan="3"
                rowSpan={2}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.rdy02SignQa || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.rdy02DateQa
                ) || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Ready
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr07goodsmanufacturingstepscottonballs?.length > 0
                  ? printData.bmr07goodsmanufacturingstepscottonballs[0]
                      ?.rdyNoRdy02 == "Ready"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3
              </td>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                TC10 - 01: Check the input cotton flow, and machine parameters
                as per the below specification. Sliver GPM: Min 3 - Max 6
                Delivery speed (Mtrs/min) Standard: Min 100 to Max 408 Draft
                Standard: Min 40 to Max 250
              </td>
              <td
                colspan={4}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Deliver Speed :{" "}
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.tc01DelvSpeed || "NA"}
                Mtrs/min <br />
                Draft :{" "}
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.tc01Draft || "NA"}{" "}
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.tc01SignProd || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.tc01DateProd
                ) || "NA"}
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.tc01SignQa || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.tc01DateQa
                ) || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4
              </td>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                TC10 - 02: Check the input cotton flow, and machine parameters
                as per the below specification. Sliver GPM: Min 3 - Max 6
                Delivery speed (Mtrs/min) Standard: Min 100 to Max 408 Draft
                Standard: Min 40 to Max 250
              </td>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Deliver Speed :{" "}
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.tc02DelvSpeed || "NA"}{" "}
                Mtrs/min <br />
                Draft :{" "}
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.tc02Draft || "NA"}
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.tc02SignProd || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.tc02DateProd
                ) || "NA"}
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.tc02SignQa || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.tc02DateQa
                ) || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5
              </td>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Link: Feed the sliver into all 10 tubes. follow the Ball weight
                settings for as per the Product Development Sheet.
              </td>
              <td
                colSpan={4}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PDS No:{" "}
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.psdNo05 || "NA"}{" "}
                SAP
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.no05SignProd || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.no05DateProd
                ) || "NA"}
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.no05SignQa || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.no05DateQa
                ) || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                6
              </td>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Texcore: Feed the sliver into all 10 tubes and set the cutting
                length depending up on the Ball weight.
              </td>
              <td
                colspan={4}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PDS No:{" "}
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.psdNo06 || "NA"}{" "}
                SAP
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.no06SignProd || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.no06DateProd
                ) || "NA"}
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.no06SignQa || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.no06DateQa
                ) || "NA"}
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td
                colSpan="2"
                rowSpan={2}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                7
              </td>
              <td
                colSpan="8"
                rowSpan={2}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Check the metal detector setting with FE – 1.0 mm & SS – 1.8 mm
                Refer Metal detector calibration record. (Format No.:
                QAD01/F-35)
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checked
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr07goodsmanufacturingstepscottonballs?.length > 0
                  ? printData.bmr07goodsmanufacturingstepscottonballs[0]
                      ?.rdyNoRdy07 == "Checked"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colSpan="3"
                rowSpan={2}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.rdy07SignProd || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.rdy07DateProd
                ) || "NA"}
              </td>
              <td
                colSpan="3"
                rowSpan={2}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.rdy07SignQa || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.rdy07DateQa
                ) || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Checked
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData &&
                printData.bmr07goodsmanufacturingstepscottonballs?.length > 0
                  ? printData.bmr07goodsmanufacturingstepscottonballs[0]
                      ?.rdyNoRdy07 == "Not Checked"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                8
              </td>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Perform the packing as per the Product Development Sheet (Format
                # DVP01/F-05)
              </td>
              <td
                colSpan={4}
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PDS No:{" "}
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.psdNo08 || "NA"}{" "}
                SAP
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.no08SignProd || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.no08DateProd
                ) || "NA"}
              </td>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr07goodsmanufacturingstepscottonballs[0]
                  ?.no08SignQa || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr07goodsmanufacturingstepscottonballs[0]
                    ?.no08DateQa
                ) || "NA"}
              </td>
            </tr>

            <br />
            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                <strong>8.0 PRODUCT RECONCILIATION:</strong> <br />
                Yield in % = (Output Qty / Input Qty) x 100
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Input Quantity
                <br /> (Kgs)
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                align="center"
              >
                {pdeData.input}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Output Quantity <br /> (Kgs){" "}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                align="center"
              >
                {pdeData.output}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                % Yield (Specification: 80% to 100%)
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                align="center"
              >
                {pdeData.yield}
              </td>
            </tr>
            <br />

            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                9.0 PROCESS DELAY / EQUIPMENT BREAK DOWN RECORD
              </th>
            </tr>
            <tr>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                S.No.
              </td>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>

              <td
                colspan="9"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Process Delay / Down Time
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Remarks
              </td>
              <td
                colspan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign and Date
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                From (hours or Minutes)
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                To (hours or Minutes)
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Total (hours or Minutes)
              </td>
            </tr>
            {printData.bmr10goodsprocessdelayequpment[0]?.detailsDly?.map(
              (data, index) => (
                <tr>
                  <td
                    colspan="2"
                    style={{
                      textAlign: "center",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {" "}
                    {index + 1}
                  </td>
                  <td
                    colspan="2"
                    style={{
                      textAlign: "center",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {" "}
                    {formatDate(data.date)}{" "}
                  </td>
                  <td
                    colspan="3"
                    style={{
                      textAlign: "center",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {" "}
                    {data.from_hour}
                  </td>
                  <td
                    colspan="3"
                    style={{
                      textAlign: "center",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {" "}
                    {data.to_hour}{" "}
                  </td>
                  <td
                    colspan="3"
                    style={{
                      textAlign: "center",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {" "}
                    {data.total_hour}
                  </td>
                  <td
                    colspan="4"
                    style={{
                      textAlign: "center",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {data.remarks}{" "}
                  </td>
                  <td
                    colspan="3"
                    style={{
                      textAlign: "center",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {data.sign}
                    <br />
                    {formatDateTime(data.sign_date)}{" "}
                  </td>
                </tr>
              )
            )}
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                10.0 PROCESS DEVIATION RECORD
              </th>
            </tr>

            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                S No.
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Deviation Log No
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign and date
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                QA Remarks
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign and Date
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[0]
                  .deviation || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[0]
                  .signature || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[0]
                    .sig_date
                ) || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[0]
                  .qa_remarks || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[0]
                  .signature2 || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[0]
                    .sig_date2
                ) || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[1]
                  .deviation || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[1]
                  .signature || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[1]
                    .sig_date
                ) || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[1]
                  .qa_remarks || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[1]
                  .signature2 || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[1]
                    .sig_date2
                ) || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[2]
                  .deviation || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[2]
                  .signature || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[2]
                    .sig_date
                ) || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[2]
                  .qa_remarks || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[2]
                  .signature2 || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[2]
                    .sig_date2
                ) || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[3]
                  .deviation || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[3]
                  .signature || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[3]
                    .sig_date
                ) || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[3]
                  .qa_remarks || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[3]
                  .signature2 || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr09goodsprocessdevrecord[0]?.detailsDevRecords[3]
                    .sig_date2
                ) || "NA"}
              </td>
            </tr>
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                11.0 LIST OF ENCLOSURES:
              </th>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                S No.
              </td>
              <td
                colspan="10"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Title
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Remarks
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1.
              </td>
              <td
                colspan="10"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Bale Consumption for Sliver Report
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr11goodslistofenclouser.length > 0
                  ? printData.bmr11goodslistofenclouser[0]?.detailsEncloser[0]
                      ?.remarks == "ATTACHED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr11goodslistofenclouser.length > 0
                  ? printData.bmr11goodslistofenclouser[0]?.detailsEncloser[0]
                      ?.remarks == "NOT ATTACHED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2.
              </td>
              <td
                colspan="10"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Packing Material Consumption Report
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr11goodslistofenclouser.length > 0
                  ? printData.bmr11goodslistofenclouser[0]?.detailsEncloser[1]
                      ?.remarks == "ATTACHED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr11goodslistofenclouser.length > 0
                  ? printData.bmr11goodslistofenclouser[0]?.detailsEncloser[1]
                      ?.remarks == "NOT ATTACHED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3.
              </td>
              <td
                colspan="10"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr11goodslistofenclouser[0]?.detailsEncloser[2]
                  ?.title || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr11goodslistofenclouser.length > 0
                  ? printData.bmr11goodslistofenclouser[0]?.detailsEncloser[2]
                      ?.remarks == "ATTACHED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not attached
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr11goodslistofenclouser.length > 0
                  ? printData.bmr11goodslistofenclouser[0]?.detailsEncloser[2]
                      ?.remarks == "NOT ATTACHED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <br />

            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                12.0 POST-PRODUCTION REVIEW:
              </th>
            </tr>
            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Designation
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Production Supervisor
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Head of the Department/ Designee
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Approved by Manager-QA/ Designee
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Signature
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr12goodspostprodreview[0]?.sup_sign || "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr12goodspostprodreview[0]?.designee_sign || "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr12goodspostprodreview[0]?.qa_sign || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {formatDateTime(
                  printData.bmr12goodspostprodreview[0]?.sup_date
                ) || "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {formatDateTime(
                  printData.bmr12goodspostprodreview[0]?.designee_date
                ) || "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {formatDateTime(
                  printData.bmr12goodspostprodreview[0]?.qa_date
                ) || "NA"}
              </td>
            </tr>
            <br />
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                13.0 QA RELEASE:
              </th>
            </tr>
            <tr>
              <th
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                S.No
              </th>
              <th
                colspan="8"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Description
              </th>
              <th
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Status
              </th>
              <th
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign and Date
              </th>
            </tr>

            <tr>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1
              </td>
              <td
                colspan="8"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                All critical process parameters reviewed. (Within/Not within
                range)
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr13goodsqarelease.length > 0
                  ? printData.bmr13goodsqarelease[0]?.details[0].status_1 ==
                    "REVIEWED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr13goodsqarelease[0]?.details[0].sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr13goodsqarelease[0]?.details[0].date
                ) || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr13goodsqarelease.length > 0
                  ? printData.bmr13goodsqarelease[0]?.details[0].status_1 ==
                    "NOT REVIEWED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2
              </td>
              <td
                colspan="8"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                In process checks reviewed. (Meeting/Not meeting the
                specification)
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr13goodsqarelease.length > 0
                  ? printData.bmr13goodsqarelease[0]?.details[1].status_1 ==
                    "REVIEWED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr13goodsqarelease[0]?.details[1].sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr13goodsqarelease[0]?.details[1].date
                ) || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr13goodsqarelease.length > 0
                  ? printData.bmr13goodsqarelease[0]?.details[1].status_1 ==
                    "NOT REVIEWED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3
              </td>
              <td
                colspan="8"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Deviations reviewed. (Found/Not found)
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr13goodsqarelease.length > 0
                  ? printData.bmr13goodsqarelease[0]?.details[2].status_1 ==
                    "REVIEWED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr13goodsqarelease[0]?.details[2].sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr13goodsqarelease[0]?.details[2].date
                ) || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Reviewed
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr13goodsqarelease.length > 0
                  ? printData.bmr13goodsqarelease[0]?.details[2].status_1 ==
                    "NOT REVIEWED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4
              </td>
              <td
                colspan="8"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                If deviations are logged
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Closed{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr13goodsqarelease.length > 0
                  ? printData.bmr13goodsqarelease[0]?.details[3].status_1 ==
                    "CLOSED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr13goodsqarelease[0]?.details[3].sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr13goodsqarelease[0]?.details[3].date
                ) || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Closed{" "}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr13goodsqarelease.length > 0
                  ? printData.bmr13goodsqarelease[0]?.details[2].status_1 ==
                    "NOT CLOSED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5
              </td>
              <td
                colspan="8"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                The Batch is released to next step.
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Released
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr13goodsqarelease.length > 0
                  ? printData.bmr13goodsqarelease[0]?.details[4].status_1 ==
                    "RELEASED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr13goodsqarelease[0]?.details[4].sign || "NA"}
                <br></br>
                {formatDateTime(
                  printData.bmr13goodsqarelease[0]?.details[4].date
                ) || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Released
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr13goodsqarelease.length > 0
                  ? printData.bmr13goodsqarelease[0]?.details[4].status_1 ==
                    "NOT RELEASED"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>
            <br />
            <br />
            <br />

            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                14.0 PRODUCT RELEASE
              </th>
            </tr>
            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                The material produced through the execution of this Batch Record
                shall be archival by QA according to Product Release Procedure
                (SOP-QAD01-D-61) and documented as per the Format: QAD01/F-34
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Particulars
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checked by QA
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Approved by Manager-QA / Designee
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Name
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr14goodsproductrelease[0]?.chk_qa_sign || "NA"}
                <br />
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr14goodsproductrelease[0]?.apr_qa_sign || "NA"}
                <br />
              </td>
            </tr>

            <tr>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sign & Date
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr14goodsproductrelease[0]?.chk_qa_sign || "NA"}
                <br />
                {formatDateTime(
                  printData.bmr14goodsproductrelease[0]?.chk_qa_date
                ) || "NA"}
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.bmr14goodsproductrelease[0]?.apr_qa_sign || "NA"}
                <br />
                {formatDateTime(
                  printData.bmr14goodsproductrelease[0]?.apr_qa_date
                ) || "NA"}
              </td>
            </tr>
            <br />

            <br></br>

            {reworkList && reworkList.length > 0 && (
              <>
                <tr>
                  <th
                    colSpan="20"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    15.0 Rework Report
                  </th>
                </tr>

                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Date:
                  </td>
                  <td
                    colSpan="16"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {reworkList && reworkList.length > 0
                      ? formatDate1(reworkList[0].reworkDate)
                      : "NA"}
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Department Name
                  </td>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {reworkList && reworkList.length > 0
                      ? reworkList[0].departmentName
                      : "NA"}
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Machine No
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {reworkList && reworkList.length > 0
                      ? reworkList[0].machineName
                      : "NA"}
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    BMR No
                  </td>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {reworkList && reworkList.length > 0
                      ? reworkList[0].bmrNumber
                      : "NA"}
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Lot No./ Julian Date
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {reworkList && reworkList.length > 0
                      ? reworkList[0].lotNumber
                      : "NA"}
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Reason for Rework
                  </td>
                  <td
                    colSpan="16"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {reworkList && reworkList.length > 0
                      ? reworkList[0].reworkReason
                      : "NA"}
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Rework Qty. In Bags/ Boxes
                  </td>
                  <td
                    colSpan="16"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {reworkList && reworkList.length > 0
                      ? reworkList[0].reworkQuantity
                      : "NA"}
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Reference NC No (if)
                  </td>
                  <td
                    colSpan="16"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {reworkList && reworkList.length > 0
                      ? reworkList[0].referenceNcNumber
                      : "NA"}
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    Action Taken:
                  </td>
                  <td
                    colSpan="16"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {reworkList && reworkList.length > 0
                      ? reworkList[0].actionTaken
                      : "NA"}
                  </td>
                </tr>
              </>
            )}

            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="15"></td>
            </tr>
          </tbody>
          <br />
          <br />
          <br></br>
          <tfoot>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none", padding: "10px" }} colSpan="15"></td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Particulars
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Prepared by
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Reviewed by
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Apporved by
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Name
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Signature & Date
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              ></td>
            </tr>
          </tfoot>
          <br></br>
          <br></br>
        </table>
        {/* print layout ended here */}
      </div>
    </div>
  );
};

export default DryGoods_BMR_CottonBall;
