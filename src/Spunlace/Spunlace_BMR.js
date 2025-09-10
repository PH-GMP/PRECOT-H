/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-pascal-case */
import {
  Button,
  Tabs,
  Tooltip,
  Row,
  Select,
  message,
  Input,
  Menu,
  Col,
  Avatar,
  Drawer,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import Production_Details from "./BMR_Components/Production_Details";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Bale_Consumption from "./BMR_Components/Bale_Consumption";
import Packing_Material_Issue from "./BMR_Components/Packing_Material_Issue";
import Reference_Documents from "./BMR_Components/Reference_Documents";
import Equipment_Used_Process from "./BMR_Components/Equipment_Used_Process";
import Verification_Of_Records from "./BMR_Components/Verification_Of_Records";
import Manufacturing_Steps from "./BMR_Components/Manufacturing_Steps";
import Product_Reconciliation from "./BMR_Components/Product_Reconciliation";
import Process_Delay from "./BMR_Components/Process_Delay";
import Process_Deviation from "./BMR_Components/Process_Deviation";
import List_Of_Enclosure from "./BMR_Components/List_Of_Enclosure";
import Post_Production from "./BMR_Components/Post_Production";
import Qa_Release from "./BMR_Components/Qa_Release";
import Product_Release from "./BMR_Components/Product_Release";
import API from "../baseUrl.json";
import axios from "axios";
import useMessage from "antd/es/message/useMessage";
import moment from "moment";
import { IoCreate } from "react-icons/io5";
import logo from "../Assests/logo.png";
const Spunlace_BMR = () => {
  const [open, setOpen] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [messageApi, contextHolder] = useMessage();
  const [selectedOrderNo, setSelectedOrderNo] = useState("");
  const [selectedBatchNo, setSelectedBatchNo] = useState("");
  const [New, setNew] = useState("");
  const [printData, setPrintData] = useState({
    bmr01productiondetailsSap: [],
    bmr01productiondetails: [],
    bmr03packingmeterialissue: [],
    bmr05annexurelist: [],
    bmr06verificationofrecords: [],
    bmr07manufacturingsteps: [],
    bmr08productionreconciliation: [],
    bmr09processdlyequpbrkdwnrecord: [],
    bmr10processdeviationrecord: [],
    bmr11listsofenclosures: [],
    bmr12postprodreview: [],
    bmr13qarelease: [],
    bmr14productrelease: [],
    stoppageList09: [],
  });
  //All states for API here
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
  });

  //All States for LOV Here
  const [Lov, setLov] = useState({
    qaLov: [],
    supLov: [],
    HodLov: [],
  });

  //states for Spunlace
  const [shiftPrint, setShiftPrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [orderNumberBasedHeaders, setorderNumberBasedHeaders] = useState(null);
  const [orderNumberBasedAbRp, setorderNumberBasedAbRp] = useState(null);
  const [orderNumberPrint, setOrderNumberPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [formateddateprint, setformateddateprint] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [shiftLov, setShiftLov] = useState([]);
  const [printLoading, setPrintLoading] = useState(false);
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.operator_sign;
    if (username) {
      // console.log("usernameparams", username);

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage1(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, localStorage.getItem("token")]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.supervisor_sign;
    if (username) {
      // console.log("usernameparams", username);

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage2(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, localStorage.getItem("token")]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.hod_sign;
    if (username) {
      // console.log("usernameparams", username);

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage3(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, localStorage.getItem("token")]);

  const formattedDate = () => {
    if (printResponseData?.operator_submitted_on) {
      const date = moment(printResponseData?.operator_submitted_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDatesupervisor = () => {
    if (printResponseData?.supervisor_submit_on) {
      const date = moment(printResponseData.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDateheader = () => {
    if (datePrint) {
      const date = moment(datePrint);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDateHod = () => {
    if (printResponseData?.hod_submit_on) {
      const date = moment(printResponseData.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const handleDatePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
    // formateddateprint(value);
    const date = new Date(value);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    setformateddateprint(formattedDate);
    // console.log("date value", formateddateprint);
  };
  const printSubmit = () => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/spunlace/summary/GetBmrPrint?order_no=${New}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Res", res.data);
        if (res.data.bmr14productrelease.length > 0) {
          setPrintData(res.data);
          setTimeout(() => {
            window.print();
            handleModalClose();
          }, 3000);
        } else {
          message.error("No Data found for print");
        }
        // window.print()
      })
      .catch((err) => {
        console.log("Error", err);
      });
    // window.print();
    handleModalClose();
  };

  const fetchOrderbasedHeadersPrint = (value) => {
    try {
      setOrderNumberPrint(value);

      axios
        .get(
          `${API.prodUrl}/Precot/api/spulance/orderDetails?order=${value}`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const printResponseData = res.data[0];
            setorderNumberBasedHeaders(printResponseData);
          } else {
            message.error(res.data.message);
          }
        })

        .catch((err) => {
          // console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  function convertShift(shift) {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return null;
    }
  }
  const handleModalClose = () => {
    setShowModal(false);
    // setShiftPrint(null);
    // setDatePrint(null);
    // setOrderNumberPrint(null);
  };
  const fetchPrintValue = (value) => {
    setShiftPrint(value);
    try {
      setPrintLoading(true);

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
      const formattedShift = convertShift(value);

      const orderDetailsPromise = axios.get(
        `${API.prodUrl}/Precot/api/spulance/approvedBaleConsumptions?order=${orderNumberPrint}&date=${datePrint}&shift=${value}`,
        { headers }
      );
      const baleByOrderPromise = axios.get(
        `${API.prodUrl}/Precot/api/spulance/baleByOrderdateshift?order=${orderNumberPrint}&date=${datePrint}&shift=${formattedShift}`,
        { headers }
      );

      Promise.all([orderDetailsPromise, baleByOrderPromise])
        .then(([orderDetailsResponse, baleByOrderResponse]) => {
          if (
            orderDetailsResponse.data &&
            orderDetailsResponse.data.message !== "No data"
          ) {
            const printResponseData = orderDetailsResponse.data[0];
            setPrintResponseData(printResponseData);
            // setPrintResponseData(orderDetailsResponse.data);
            // console.log("first print api",printResponseData);
          } else {
            setPrintResponseData([]);
            message.error("no data found...!");
            handleModalClose();
          }

          if (baleByOrderResponse.data) {
            setorderNumberBasedAbRp(baleByOrderResponse.data);
            setPrintLoading(false);
          } else {
            setorderNumberBasedAbRp([]);
            message.error("no data found...!");
            handleModalClose();
          }
        })
        .catch((err) => {
          // console.log("Error", err);
          handleModalClose();
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  //   shift
  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data);

        if (Array.isArray(data)) {
          setShiftLov(data);
        } else {
          console.error("API response is not an array", data);
          setShiftLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setShiftLov([]);
      }
    };

    fetchShiftOptions();
  }, [localStorage.getItem("token")]);
  // order number
  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/spulance/orders`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data);

        if (Array.isArray(data)) {
          setOrderNumberLov(data);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setOrderNumberLov([]);
      }
    };

    fetchOrderNumberOptions();
  }, [localStorage.getItem("token")]);
  // Calculate total pages based on content height and window height
  const totalHeight = document.body.scrollHeight;
  const pageHeight = window.innerHeight;
  const totalPages = Math.ceil(totalHeight / pageHeight);

  // Set total pages in the placeholder
  const totalPagesElement = document.getElementById("totalPages");
  if (totalPagesElement) {
    totalPagesElement.textContent = totalPages;
  }

  // This function will be called for each printed page
  const currentPage = Math.ceil((window.scrollY + pageHeight) / pageHeight);
  const currentPageElement = document.getElementById("currentPage");
  if (currentPageElement) {
    currentPageElement.textContent = currentPage;
  }

  ///////////////
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (key) => {
    console.log(key);
  };

  //States of API update here in standard approach
  const updateAPIData = (updates) => {
    setApiData((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };
  //States of LOV update here in standard approach
  const updateLovData = (updates) => {
    setLov((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const onOrderChange = (selectedOrder) => {
    setNew(selectedOrder);
    setSelectedBatchNo(selectedOrder.split("-")[0]);
  };

  useEffect(() => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/spunlace/summary/01.GetBatchNoSpulanceBmr`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("batchNo", res.data);
        // setBmrStore(res.data);
        const a = res.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        setOrderList(a);
        // setFindLaydown(res.data);
        // message.success("Closed BMR Values Fetched Successfully");
      })
      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch BMR Caused Network Error",
        });
      });

    axios
      .get(`${API.prodUrl}/Precot/api/Users/Service/getQA`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("QA", res.data);

        const a = res.data.map((option) => ({
          value: option.username,
          label: option.username,
        }));
        updateLovData({ qaLov: a });
      })
      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch QA Caused Network Error",
        });
      });

    //prodLov
    axios
      .get(
        `${API.prodUrl}/Precot/api/Users/Service/getRoleDetails?departmentId=2`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Res", res.data);
        const a = res.data.map((option) => ({
          value: option.username,
          label: option.username,
        }));
        updateLovData({ supLov: a });
      })
      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch Production Department Caused Network Error",
        });
      });
    //hodLov
    axios
      .get(
        `${API.prodUrl}/Precot/api/Users/Service/getRoleBaseDepartmentNames?department=SPUNLACE`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Res", res.data);
        // const a = res.data.map((option) => ({
        //   value: option.username,
        //   label: option.username,
        // }));
        const b = res.data.filter((x) => x.role == "ROLE_DESIGNEE");
        console.log("b", b);
        const a = b.map((x) => ({
          value: x.name,
          label: x.name,
        }));
        updateLovData({ HodLov: a });
      })
      .catch((err) => {
        console.log("ERRor", err);
        messageApi.open({
          type: "error",
          content: "Unable to fetch Production Department Caused Network Error",
        });
      });

    //Print Prevent
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "p") {
        event.preventDefault();
        message.error("Print function is disabled on this screen.");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const sendOrderNo = () => {
    setSelectedOrderNo(New);
    localStorage.setItem("batch_qty", "");
  };
  //    setSelectedOrderNo(selectedOrder);

  const print = () => {
    if (printData.bmr11listsofenclosures[0]?.remarks_1 == "ATTACHED") {
      handlePrint();
    } else {
      axios
        .get(
          `${API.prodUrl}/Precot/api/spunlace/summary/GetBmrPrint?order_no=${New}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Res", res.data);
          if (res.data.bmr14productrelease.length > 0) {
            if (res.data.bmr11listsofenclosures[0]?.remarks_1 == "ATTACHED") {
              handlePrint();
              setPrintData(res.data);
            } else {
              setPrintData(res.data);
              setTimeout(() => {
                window.print();
              }, 3000);
            }
          } else {
            message.error("No Data found for print");
          }
          // window.print()
        })
        .catch((err) => {
          console.log("Error", err.response);
          message.error(err.response.data.message);
        });
    }
  };
  const handlePrint = () => {
    setShowModal(true);
    // console.log("print screen works");
  };

  const a = () => {
    setTimeout(() => {
      console.log("PrintData", printData);
      window.print();
    }, 1000);
  };
  const items = [
    {
      key: "1",
      label: "Production Details",
      children: (
        <Production_Details
          apiData={[]}
          edit={true}
          bmr="SP90897"
          orderNo={selectedBatchNo}
          batchNo={selectedOrderNo}
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
          orderNo={selectedBatchNo}
          batchNo={selectedOrderNo}
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
          orderNo=""
          qaLov={[]}
          supLov={[]}
          hodLov={[]}
        />
      ),
    },
    {
      key: "4",
      label: "Verification of Record",
      children: (
        <Verification_Of_Records
          apiData={[]}
          edit={true}
          orderNo={selectedBatchNo}
          batchNo={selectedOrderNo}
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
      label: "Manufacturing Steps",
      children: (
        <Manufacturing_Steps
          apiData={[]}
          edit={true}
          orderNo={selectedBatchNo}
          batchNo={selectedOrderNo}
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
      label: "Product Reconciliation",
      children: (
        <Product_Reconciliation
          apiData={[]}
          edit={true}
          orderNo={selectedBatchNo}
          batchNo={selectedOrderNo}
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
      label: "Process delay Equipment breakdown record",
      children: (
        <Process_Delay
          apiData={[]}
          edit={true}
          orderNo={selectedBatchNo}
          batchNo={selectedOrderNo}
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
          orderNo={selectedBatchNo}
          batchNo={selectedOrderNo}
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
      label: "List of Enclosures",
      children: (
        <List_Of_Enclosure
          apiData={[]}
          edit={true}
          orderNo={selectedBatchNo}
          batchNo={selectedOrderNo}
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
      key: "10",
      label: "Post Production Review",
      children: (
        <Post_Production
          apiData={[]}
          edit={true}
          orderNo={selectedBatchNo}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          role={localStorage.getItem("role")}
          loggedInQAManagerAndQADesignee={
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
      key: "11",
      label: "QA Release",
      children: (
        <Qa_Release
          apiData={[]}
          edit={true}
          orderNo={selectedBatchNo}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          role={localStorage.getItem("role")}
          loggedInQAManagerAndQADesignee={
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
      label: "Product Release",
      children: (
        <Product_Release
          apiData={[]}
          edit={true}
          orderNo={selectedBatchNo}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
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
  return (
    <div>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width="fit-content"
        style={{
          padding: "1em",
        }}
      >
        {localStorage.getItem("departmentId") == 1 ? (
          <>
            <Row>
              <Col>
                <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
              </Col>

              <Col
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{localStorage.getItem("username")}</p>
                <p
                  style={{
                    fontSize: "x-small",
                  }}
                >
                  {localStorage.getItem("role")}
                </p>
              </Col>
            </Row>

            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={["1"]}
              style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "0",
                margin: "0",
              }}
              items={
                localStorage.getItem("role") === "ROLE_QA"
                  ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      {
                        key: "2",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Generation
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Generate"),
                      },
                      {
                        key: "3",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Audit
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Report/Generation"),
                      },

                      {
                        key: "4",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Mapping
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Mapping"),
                      },
                      {
                        key: "5",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Closing
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Closing"),
                      },
                      {
                        key: "6",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Traceability
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Traceability"),
                      },
                      {
                        key: "7",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                  : localStorage.getItem("role") === "ROLE_SUPERVISOR" ||
                    localStorage.getItem("role") === "ROLE_HOD" ||
                    localStorage.getItem("role") === "ROLE_DESIGNEE" ||
                    localStorage.getItem("role") === "ROLE_HR"
                  ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      // {
                      //   key: "2",
                      //   icon: <IoCreate color="#151718" />,
                      //   label: (
                      //     <b
                      //       style={{
                      //         color: "#151718",
                      //       }}
                      //     >
                      //      Dash Board
                      //     </b>
                      //   ),
                      //   onClick: () => navigate("/Precot/Dashboard"),
                      // },

                      {
                        key: "3",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Mapping
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Mapping"),
                      },
                      {
                        key: "4",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Closing
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Closing"),
                      },
                      {
                        key: "5",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Chemical Issue
                          </b>
                        ),
                        onClick: () => navigate("/Precot/RawMaterialIssue"),
                      },
                      {
                        key: "6",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                  : [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      {
                        key: "2",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
              }
            />
          </>
        ) : localStorage.getItem("departmentId") == 2 ? (
          <>
            <Row>
              <Col>
                <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
              </Col>

              <Col
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{localStorage.getItem("username")}</p>
                <p
                  style={{
                    fontSize: "x-small",
                  }}
                >
                  {localStorage.getItem("role")}
                </p>
              </Col>
            </Row>

            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={["1"]}
              style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "0",
                margin: "0",
              }}
              items={
                localStorage.getItem("role") === "ROLE_QA"
                  ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },

                      {
                        key: "2",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Audit
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Report/Generation"),
                      },
                      {
                        key: "3",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Traceability
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Traceability"),
                      },
                      {
                        key: "4",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                  : localStorage.getItem("role") === "ROLE_SUPERVISOR" ||
                    localStorage.getItem("role") === "ROLE_HOD" ||
                    localStorage.getItem("role") === "ROLE_DESIGNEE" ||
                    localStorage.getItem("role") === "ROLE_HR"
                  ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      {
                        key: "2",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Packing Material
                          </b>
                        ),
                        onClick: () =>
                          navigate("/Precot/Spunlace/PackingMaterial"),
                      },
                      {
                        key: "3",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                  : [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },

                      {
                        key: "2",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Packing Material
                          </b>
                        ),
                        onClick: () =>
                          navigate("/Precot/Spunlace/PackingMaterial"),
                      },
                      {
                        key: "3",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
              }
            />
          </>
        ) : localStorage.getItem("departmentId") == 3 ? (
          <>
            <Row>
              <Col>
                <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
              </Col>

              <Col
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{localStorage.getItem("username")}</p>
                <p
                  style={{
                    fontSize: "x-small",
                  }}
                >
                  {localStorage.getItem("role")}
                </p>
              </Col>
            </Row>

            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={["1"]}
              style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "0",
                margin: "0",
              }}
              items={
                localStorage.getItem("role") === "ROLE_QA"
                  ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      {
                        key: "2",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Audit
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Report/Generation"),
                      },
                      {
                        key: "3",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Traceability
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Traceability"),
                      },
                      {
                        key: "4",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                  : localStorage.getItem("role") === "ROLE_SUPERVISOR" ||
                    localStorage.getItem("role") === "ROLE_HOD" ||
                    localStorage.getItem("role") === "ROLE_DESIGNEE" ||
                    localStorage.getItem("role") === "ROLE_HR"
                  ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },

                      {
                        key: "2",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                  : [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      {
                        key: "2",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
              }
            />
          </>
        ) : localStorage.getItem("departmentId") == 4 ? (
          <>
            <Row>
              <Col>
                <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
              </Col>

              <Col
                style={{
                  marginLeft: "1em",
                }}
              >
                <p>{localStorage.getItem("username")}</p>
                <p
                  style={{
                    fontSize: "x-small",
                  }}
                >
                  {localStorage.getItem("role")}
                </p>
              </Col>
            </Row>

            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={["1"]}
              style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "0",
                margin: "0",
              }}
              items={
                localStorage.getItem("role") === "ROLE_QA"
                  ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      {
                        key: "2",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Generation
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Generate"),
                      },
                      {
                        key: "3",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Audit
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Report/Generation"),
                      },

                      {
                        key: "4",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Mapping
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Mapping"),
                      },
                      {
                        key: "5",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Closing
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Closing"),
                      },
                      {
                        key: "6",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Traceability
                          </b>
                        ),
                        onClick: () => navigate("/Precot/Traceability"),
                      },
                      {
                        key: "7",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                  : localStorage.getItem("role") === "ROLE_SUPERVISOR" ||
                    localStorage.getItem("role") === "ROLE_HOD" ||
                    localStorage.getItem("role") === "ROLE_DESIGNEE" ||
                    localStorage.getItem("role") === "ROLE_HR"
                  ? [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },

                      {
                        key: "2",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
                  : [
                      {
                        key: "1",
                        icon: <IoCreate color="#151718" />,
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Form Browser
                          </b>
                        ),
                        onClick: () => navigate("/Precot/choosenScreen"),
                      },
                      {
                        key: "2",
                        icon: (
                          <FaLock
                            color="#151718"
                            onClick={() => {
                              if (confirm("Are you sure want to logout")) {
                                localStorage.removeItem("token");
                                navigate("/Precot");
                              }
                            }}
                          />
                        ),
                        label: (
                          <b
                            style={{
                              color: "#151718",
                            }}
                          >
                            Logout
                          </b>
                        ),
                        onClick: () => navigate("/Precot"),
                      },
                    ]
              }
            />
          </>
        ) : null}
      </Drawer>
      <BleachingHeader
        formName={"Batch Manufacturing Record"}
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
            onClick={print}
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              //   display: printBtnEnable ? "block" : "none",
            }}
            shape="round"
          >
            Print
          </Button>,
          // <Button onClick={a}>a</Button>,
          <Button
            // onClick={handleBack}
            onClick={() => {
              window.history.back();
              localStorage.setItem("batch_qty", "");
            }}
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
            onChange={onOrderChange}
            options={orderList}
            placeholder="Select Order No"
            style={{
              marginRight: "2em",
            }}
          />
          Selected Order No : {selectedBatchNo}
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginLeft: "2em",
              // display: saveBtnStatus ? "block" : "none",
            }}
            shape="round"
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
        <table style={{ width: "90%", tableLayout: "fixed" }}>
          <br></br>
          <thead>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="15"></td>
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
                <img src={logo} alt="logo" width="50%" />
                <br />
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
                PRD02/F-26
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
                QAD01-D-64
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
                Spunlace
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
                SL-RG-001 / 01
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
                Roll Goods
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
                NA
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
                colSpan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                BATCH NO: {New}
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
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? printData.bmr01productiondetailsSap[0].Product_Description
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Width in mm{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? printData.bmr01productiondetailsSap[0].Width_in_mm
                  : "NA"}
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
                Mixing
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? printData.bmr01productiondetailsSap[0].Mixing
                  : "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                No. of Rolls / Shaft
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? printData.bmr01productiondetailsSap[0].No_of_Rolls_Shaft
                  : "NA"}
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
                Batch Quantity (Kgs)
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? printData.bmr01productiondetailsSap[0].Batch_Quantity
                  : "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Shaft Number Start From
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? printData.bmr01productiondetailsSap[0]
                      .Shaft_Number_Start_From
                  : "NA"}
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
                No of Shaft{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? printData.bmr01productiondetailsSap[0].No_of_Shaft
                  : "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Shaft Number Ended
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? printData.bmr01productiondetailsSap[0].Shaft_Number_Ended
                  : "NA"}
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
                Product Supply
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                In House
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? printData.bmr01productiondetailsSap[0].IN_HOUSE_EXPORT ==
                    "In House"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Export
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? printData.bmr01productiondetailsSap[0].IN_HOUSE_EXPORT ==
                    "Export"
                    ? "✓"
                    : "NA"
                  : "NA"}
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
                Manufacturing Completion Date{" "}
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
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? moment(
                      printData &&
                        printData.bmr01productiondetails[0].start_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
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
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? printData.bmr01productiondetails[0].start_time
                  : "NA"}
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
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? moment(
                      printData && printData.bmr01productiondetails[0].end_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
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
                {printData && printData.bmr01productiondetailsSap.length > 0
                  ? printData.bmr01productiondetails[0].end_time
                  : "NA"}
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
                  {printData && printData.bmr01productiondetails.length > 0
                    ? printData.bmr01productiondetails[0].issued_by
                    : "NA"}
                  <br></br>
                  {printData && printData.bmr01productiondetails.length > 0
                    ? moment(
                        printData.bmr01productiondetails[0].issued_on
                      ).format("DD/MM/YYYY - HH:mm")
                    : "NA"}
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
                  {printData && printData.bmr01productiondetails.length > 0
                    ? printData.bmr01productiondetails[0].received_by
                    : "NA"}
                  <br></br>
                  {printData && printData.bmr01productiondetails.length > 0
                    ? moment(
                        printData &&
                          printData.bmr01productiondetails[0].received_on
                      ).format("DD/MM/YYYY - HH:mm")
                    : "NA"}
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

            <th
              colspan="20"
              style={{
                textAlign: "left",
                fontSize: "10pt",
                fontFamily: "Times New Roman, Times, serif",
                border: "none !important",
              }}
            >
              {printData && printData.bmr11listsofenclosures.length > 0 ? (
                printData.bmr11listsofenclosures[0].remarks_1 == "ATTACHED" ? (
                  <div>
                    <tr>
                      <th colSpan="20" style={{ height: "15px" }}>
                        Date:
                      </th>
                      <th colSpan="30" style={{ height: "15px" }}>
                        {formattedDateheader()}
                      </th>
                      <th colSpan="20" style={{ height: "15px" }}>
                        Shift:
                      </th>
                      <th colSpan="30" style={{ height: "15px" }}>
                        {shiftPrint}
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="20" style={{ height: "15px" }}>
                        Order No.:
                      </th>
                      <th colSpan="30" style={{ height: "15px" }}>
                        {New}
                      </th>
                      <th colSpan="20" style={{ height: "15px" }}>
                        Mixing:
                      </th>
                      <th colSpan="30" style={{ height: "15px" }}>
                        {orderNumberBasedHeaders &&
                          orderNumberBasedHeaders?.mix}
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="5" style={{ height: "20px" }}>
                        Customer Name:
                      </th>
                      <th colSpan="30" style={{ height: "20px" }}>
                        {orderNumberBasedHeaders &&
                          orderNumberBasedHeaders?.customerName}
                      </th>
                      <th colSpan="5" style={{ height: "20px" }}>
                        Material Code:
                      </th>
                      <th colSpan="30" style={{ height: "20px" }}>
                        {orderNumberBasedHeaders &&
                          orderNumberBasedHeaders?.material}
                      </th>
                      <th colSpan="5" style={{ height: "20px" }}>
                        STD GSM:
                      </th>
                      <th colSpan="25" style={{ height: "20px" }}>
                        {orderNumberBasedHeaders &&
                          orderNumberBasedHeaders?.gsm}
                      </th>
                    </tr>
                    <tr>
                      <th
                        colSpan="60"
                        style={{ height: "20px", textAlign: "center" }}
                      >
                        AB COTTON{" "}
                      </th>
                      <th
                        colSpan="40"
                        style={{ height: "20px", textAlign: "center" }}
                      >
                        RP COTTON{" "}
                      </th>
                    </tr>
                    <tr>
                      <th
                        colSpan="20"
                        style={{ height: "20px", textAlign: "center" }}
                      >
                        Batch No.{" "}
                      </th>
                      <th
                        colSpan="20"
                        style={{ height: "20px", textAlign: "center" }}
                      >
                        Bale No.{" "}
                      </th>
                      <th
                        colSpan="20"
                        style={{ height: "20px", textAlign: "center" }}
                      >
                        Net Wt. in KG{" "}
                      </th>
                      <th
                        colSpan="20"
                        style={{ height: "20px", textAlign: "center" }}
                      >
                        Bale No.{" "}
                      </th>
                      <th
                        colSpan="20"
                        style={{ height: "20px", textAlign: "center" }}
                      >
                        Net Wt. in KG{" "}
                      </th>
                    </tr>
                    {orderNumberBasedAbRp &&
                      (() => {
                        const apBaleConsumptionResponse =
                          orderNumberBasedAbRp.apBaleConsumptionResponse || [];
                        // setaplength(apBaleConsumptionResponse);
                        const rpBaleConsumption =
                          orderNumberBasedAbRp.rpBaleConsumption || [];
                        // setrpleangth(rpBaleConsumption);
                        const maxLength = Math.max(
                          apBaleConsumptionResponse.length,
                          rpBaleConsumption.length
                        );

                        return Array.from({ length: maxLength }, (_, index) => (
                          <tr key={index}>
                            <td
                              colSpan="20"
                              style={{
                                height: "15px",
                                textAlign: "center",
                              }}
                            >
                              {apBaleConsumptionResponse[index]?.batchNo[
                                index
                              ] || "N/A"}
                            </td>
                            <td
                              colSpan="20"
                              style={{
                                height: "15px",
                                textAlign: "center",
                              }}
                            >
                              {apBaleConsumptionResponse[index]?.baleNo ||
                                "N/A"}
                            </td>
                            <td
                              colSpan="20"
                              style={{
                                height: "15px",
                                textAlign: "center",
                              }}
                            >
                              {apBaleConsumptionResponse[index]?.netWeight ||
                                "N/A"}
                            </td>
                            <td
                              colSpan="20"
                              style={{
                                height: "15px",
                                textAlign: "center",
                              }}
                            >
                              {rpBaleConsumption[index]?.baleNo || "N/A"}
                            </td>
                            <td
                              colSpan="20"
                              style={{
                                height: "15px",
                                textAlign: "center",
                              }}
                            >
                              {rpBaleConsumption[index]?.netWeight || "N/A"}
                            </td>
                          </tr>
                        ));
                      })()}

                    <tr>
                      <th
                        colSpan="40"
                        style={{ height: "10px", textAlign: "center" }}
                      >
                        Total
                      </th>
                      <td
                        colSpan="20"
                        style={{ height: "10px", textAlign: "center" }}
                      >
                        {" "}
                        {printResponseData?.totalABWeight}
                      </td>
                      <th
                        colSpan="20"
                        style={{ height: "10px", textAlign: "center" }}
                      >
                        Total{" "}
                      </th>
                      <td
                        colSpan="20"
                        style={{ height: "10px", textAlign: "center" }}
                      >
                        {printResponseData?.totalRpWeight}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="34"
                        style={{ height: "1opx", textAlign: "center" }}
                      >
                        Operator Sign & Date
                      </td>
                      <td colSpan="33" style={{ textAlign: "center" }}>
                        Production Supervisor Sign & Date
                      </td>
                      <td colSpan="33" style={{ textAlign: "center" }}>
                        HOD/ Designee Sign & Date
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="34"
                        style={{
                          height: "48px",
                          textAlign: "center",
                          marginBottom: "auto",
                          verticalAlign: "bottom",
                          borderTop: "none",
                        }}
                      >
                        {getImage1 && (
                          <img
                            src={getImage1}
                            alt="Operator Sign"
                            style={{
                              width: "50%",
                              height: "50%",
                              // marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                        <br />
                        {printResponseData?.operator_sign || ""}
                        <br />
                        {formattedDate()}
                      </td>

                      <td
                        colSpan="33"
                        style={{
                          height: "48px",
                          textAlign: "center",
                          marginBottom: "auto",
                          verticalAlign: "bottom",
                          borderTop: "none",
                        }}
                      >
                        {getImage2 && (
                          <img
                            src={getImage2}
                            alt="Supervisor Sign"
                            style={{
                              width: "50%",
                              height: "50%",
                              // marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}{" "}
                        <br />
                        {printResponseData?.supervisor_sign || ""}
                        <br />
                        {formattedDatesupervisor()}
                      </td>

                      <td
                        colSpan="33"
                        style={{
                          height: "48px",
                          textAlign: "center",
                          marginBottom: "auto",
                          verticalAlign: "bottom",
                          borderTop: "none",
                        }}
                      >
                        {getImage3 && (
                          <img
                            src={getImage3}
                            alt="HOD Sign"
                            style={{
                              width: "50%",
                              height: "50%",
                              // marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}{" "}
                        <br />
                        {printResponseData?.hod_sign || ""}
                        <br />
                        {formattedDateHod()}
                      </td>
                    </tr>
                  </div>
                ) : (
                  <>
                    2.0 BALE CONSUMPTION: Refer the attachment. (Format#
                    PRD02/F-08)
                  </>
                )
              ) : (
                <>
                  2.0 BALE CONSUMPTION: Refer the attachment. (Format#
                  PRD02/F-08)
                </>
              )}
            </th>

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
                3.0 PACKING MATERIAL ISSUE:{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="2">S.No</th>
              <th colSpan="4">Particulars</th>
              <th colSpan="4">Batch No</th>
              <th colSpan="4">Quantity</th>
              <th colSpan="4">Remarks</th>
              <th colSpan="2">Unit</th>
            </tr>
            {printData && printData.bmr03packingmeterialissue.length > 0
              ? printData.bmr03packingmeterialissue[0].detailsRecords03.map(
                  (x, i) => {
                    return (
                      <tr>
                        <td colSpan="2">{i + 1}</td>
                        <td colSpan="4">{x.particulars}</td>
                        <td colSpan="4">{x.batch_no}</td>
                        <td colSpan="4">{x.quantity}</td>
                        <td colSpan="4">
                          {x.remarks.length > 0 ? x.remarks : "NA"}
                        </td>
                        <td colSpan="2">{x.unit}</td>
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
                GOOD DOCUMENTATION PRACTICES{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                QAD01-D-50
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
              >
                INSTRUCTION FOR CLEANING
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRD02-D-26
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
                INSTRUCTION FOR BALE FEEDING AREA{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRD02-D-06
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
                INSTRUCTION FOR BALE OPENER{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRD02-D-07
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
                INSTRUCTION FOR WEIGHING BALE OPENER{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRD02/D-08
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
                CALIBRATION AND VERIFICATION OF WEIGHING SCALE{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRD02-D-09
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
                7
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                INSTRUCTION FOR AIR LAY CARDING MACHINE
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRD02-D-10
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
                8
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                INSTRUCTION FOR REITER CARDING MACHINE{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRD02-D-11
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
                9
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                INSTRUCTION FOR JETLACE
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRD02-D-14
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
                10
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                INSTRUCTION FOR DRYER
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                PRD02-D-15
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
                11
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                INSTRUCTION FOR WINDER
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRD02-D-16
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
                12
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                INSTRUCTION FOR MAHLO{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRD02-D-18
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
                13
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                WORK INSTRUCTION FOR LUCID{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PRD02-D-19
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
                14
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                OUT-OF-SPECIFICATION
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                QCL01-D-22
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
                15
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                DEVIATIONS MANAGEMENT
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                QAD01-D-43
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
                16
              </td>
              <td
                colspan="12"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                CHANGE CONTROL
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                QAD01-D-41{" "}
              </td>
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
                <strong>5.0 EQUPEMENTS USED FOR THE PROCESS: </strong>
                <p>
                  PROCESSING EQUIPMENTS (MEASURING DEVICES) CALIBRATION STATUS:
                  Refer Annexure No-1
                </p>
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
                Housekeeping cleaning checking list
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[0]
                      .checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[0].checked_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[0]
                      .verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[0].verified_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[0]
                      .details == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[0]
                      .details == "NOT SATISFACTORY"
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[1]
                      .checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[1].checked_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[1]
                      .verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[1].verified_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[1]
                      .details == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[1]
                      .details == "NOT SATISFACTORY"
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[2]
                      .checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[2].checked_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[2]
                      .verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[2].verified_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[2]
                      .details == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[2]
                      .details == "NOT SATISFACTORY"
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[3]
                      .checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[3].checked_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[3]
                      .verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[3].verified_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[3]
                      .details == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[3]
                      .details == "NOT SATISFACTORY"
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
                Bale Consumption Record
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[4]
                      .checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[4].checked_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[4]
                      .verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[4].verified_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[4]
                      .details == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[4]
                      .details == "NOT SATISFACTORY"
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[5]
                      .checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[5].checked_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[5]
                      .verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[5].verified_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[5]
                      .details == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[5]
                      .details == "NOT SATISFACTORY"
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[6]
                      .checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[6].checked_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[6]
                      .verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[6].verified_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[6]
                      .details == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[6]
                      .details == "NOT SATISFACTORY"
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[7]
                      .checked_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[7].checked_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[7]
                      .verified_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? moment(
                      printData.bmr06verificationofrecords[0]
                        .detailsRecords06[7].verified_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[7]
                      .details == "SATISFACTORY"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Satisfactory
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr06verificationofrecords.length > 0
                  ? printData.bmr06verificationofrecords[0].detailsRecords06[7]
                      .details == "NOT SATISFACTORY"
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
              <th
                colspan="2"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Step.No.
              </th>
              <th
                colspan="7"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Operation
              </th>
              <th
                colspan="5"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Observation
              </th>
              <th
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Performed by <br />
                (Sign / Date){" "}
              </th>
              <th
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checked by <br /> (Sign / Date)
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
                1
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                WBO 01 & 02: Set the mixing ratio in HMI. Take the AB cotton
                bales and feed them to the feed table. Start the WBO-1 and WBO
                -2 by pushing. ALC- opening button in operating panel. BALE
                OPENER: Take the AB cotton bales and feed them onto the feed
                table. Start BO by pushing C-60 opening button in operating
                panel.
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Mixing Ratio AB-Cotton:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].ab_cotton
                  : "NA"}
                <br />
                RP-Cotton:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].rp_cotton
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].wbo_sign_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].wbo_date_prod
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].wbo_sign_qa
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].wbo_date_qa
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
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
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                CARDING M/C ALC-: Start the push button main on HMI. Set GSM: 20
                to 300 Switch “ON” feeding
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Actual Set GSM:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].alc1_actual_set_gsm
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].alc2_sign_prod
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].alc2_date_prod
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].alc2_sign_qa
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].alc2_date_qa
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
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
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                CARDING M/C REITER 01: Press the start button on HMI Set the GSM
                and Web delivery to collecting belt. o Set GSM: 8 to 57
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Actual Set GSM:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].reiter01_actual_set_gsm
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].alc2_sign_prod
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].alc2_date_prod
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].alc2_sign_qa
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].alc2_date_qa
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
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
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                CARDING M/C ALC-2: Start the main “ON” in HMI by Push the ALC-1
                PUSH button. o Set GSM: 20 to 300 o Switch “ON” the feeding.
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Actual Set GSM:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].alc2_actual_set_gsm
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].alc2_sign_prod
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].alc2_date_prod
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].alc2_sign_qa
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].alc2_date_qa
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
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
                5
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                o CARDING M/C REITER 02: Press the start button on HMI Set the
                GSM and Pressure of transmitter Web delivery to collecting belt.
                o Set GSM: 8 to 57
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Actual Set GSM:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].reiter02_actual_set_gsm
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].alc2_sign_prod
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].alc2_date_prod
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].alc2_sign_qa
                  : ""}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].alc2_date_qa
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
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
                6
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                6 JETLACE: Switch “ON” the filtration. Start the conveyors and
                water pressure and link Jetlace to card Pass the card web, jet
                lace through dryer and winder and change the production mode
                after reached required speed ensure the fleece weight (GSM),
                thickness, bonding, drying, moisture and folding. Card Speed
                (MPM): 8 to 100 Vacuum suction in %: 0 to 100 Pre-Wetting water
                pressure (BAR): 0 to 12 All Injector water pressure (BAR) - 0 to
                120 Card Speed 8 to 100 MPM Vacuum suction 0 to 100 %
                Pre-Wetting: Injector 0 to 12 Bar Pattern: Text (LOV) Injector
                01: 0 to 120 Bar Injector IPA: 0 to 120 Bar Injector 11 or 12: 0
                to 120 Bar Injector 21: 0 to 120 Bar Digital sign & Date by
                Prod. Digital sign & Date by QA
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Card Speed <br />
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].jetlace_car_speed
                  : "NA"}
                <br />
                Vacuum suction <br />
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].jetlace_vacum_section
                  : "NA"}
                <br />
                Pre-Wetting:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].jetlace_pre_wetting
                  : "NA"}
                <br />
                {/* Pattern: {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].jetlace_pattern
                  : "NA"}
                <br /> */}
                Injector 01:
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].injector_11
                  : "NA"}
                <br />
                Bar <br />
                Injector IPA:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].injector_ipa
                  : "NA"}{" "}
                <br />
                Injector 11:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].injector_11
                  : "NA"}
                <br />
                Injector 12:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].injector_12
                  : "NA"}
                <br />
                Injector 21:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].injector_21
                  : "NA"}
                <br />
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].jetlace_sign_prod
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].jetlace_date_prod
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].jetlace_sign_qa
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].jetlace_date_qa
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
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
                7
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                DRYER A: Start the blowers and simultaneously start the dryer
                drums. <br />
                Set the temperature Min 50 – Max 200°C
                <br />
                Set the blower Speed Min 50 – Max 100%
                <br />
                Drum speed Min 8 - Max 100 mtrs/min
                <br />
                Inlet damper Setting: Min 0 – Max 100%
                <br />
                Outlet damper Setting: Min 0 – Max 100%
                <br />
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Dryer A Temperature:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].dryera_temp
                  : "NA"}
                <br />
                Blower speed:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].dryera_blow_speed
                  : "NA"}
                <br />
                Drum speed:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].dryera_drum_speed
                  : "NA"}{" "}
                <br />
                Inlet Damper setting:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0]
                      .dryera__intel_drum_speed
                  : "NA"}{" "}
                <br />
                Outlet damper setting:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0]
                      .dryera__outlet_drum_speed
                  : "NA"}{" "}
                <br />
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].dryera_sign_prod
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].dryera_date_prod
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].dryera_sign_qa
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].dryera_date_qa
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
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
                8
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                DRYER B: Start the blowers and simultaneously start the dryer
                drums.
                <br />
                Set the temperature Min 50 – Max 200°C
                <br />
                Set the blower Speed Min 50 – Max 100%
                <br />
                Drum speed Min 8 - Max 100 Mtrs/min
                <br />
                Inlet damper Setting: Min 0 – Max 100%
                <br />
                Outlet damper Setting: Min 0 – Max 100%
                <br />
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Dryer B Temperature:
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].dryerb_temp
                  : "NA"}
                <br />
                Blower speed:
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].dryerb_blow_speed
                  : "NA"}
                <br />
                Drum speed:
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].dryerb_drum_speed
                  : "NA"}{" "}
                <br />
                Inlet Damper setting:
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0]
                      .dryerb__intel_drum_speed
                  : "NA"}{" "}
                <br />
                Outlet damper setting:
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0]
                      .dryerb__outlet_drum_speed
                  : "NA"}
                <br />
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].dryerb_sign_prod
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].dryerb_date_prod
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].dryerb_sign_qa
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].dryerb_date_qa
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
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
                9
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                WINDER: Set the cutter & Width As per Product Planning. Keep
                paper tubes of the required size near the m/c. and set the paper
                tubes in the shaft and proper air lock. Thread the fabric from
                let-off stand into the m/c. Start the winder: Take a sample of
                the 1st shaft of every batch for testing (GSM, thickness, and
                strength of the fabric). Line Speed (mtrs/min) – Min 08 to
                Max100
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Line Speed:{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].winder_line_speed
                  : "NA"}
                <br />
                Roll width{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].winder_roll_width
                  : "NA"}
                mm.
                <br />
                Roll GSM (g): Roll thickness{" "}
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].winder_roll_thickness
                  : "NA"}{" "}
                mm.
                <br />
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].winder_sign_prod
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].winder_date_prod
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].winder_sign_qa
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].winder_date_qa
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
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
                10
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                MAHLO: Switch “ON” the main. <br />
                Set GSM and moisture as per product requirement.
                <br />
                Target GSM _________ (± 10 %)
                <br />
                Target Moisture (%) __________ (± 0.5)
                <br />
                START traverse movement.
                <br />
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1st Shaft No.:
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].mahlo_shaft_no
                  : "NA"}
                <br />
                Actual GSM.:
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].mahlo_actual_gsm
                  : "NA"}
                <br />
                Actual Moisture.:
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].mahlo_actual_moisture
                  : "NA"}
                <br />
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].mahlo_sign_prod
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].mahlo_date_prod
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].mahlo_sign_qa
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].mahlo_date_qa
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                rowSpan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                11
              </td>
              <td
                colspan="7"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                LUCID: Switch “ON” desktop with operator log in web inspection
                Go to create job and Create report of contamination/square meter
                every day. Verify detected contaminations really exist in fleece
                or not. Any abnormalities inform to shift supervisor
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Any abnormalities observed:
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].lucid_sign_prod
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].liucid_date_prod
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].lucid_sign_qa
                  : "NA"}
                <br></br>
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? moment(
                      printData.bmr07manufacturingsteps[0].lucid_date_qa
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                yes
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].lucid_observed_01 ==
                    "Yes"
                    ? "✓"
                    : "NA"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                No
              </td>
              <td
                colspan="2"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr07manufacturingsteps.length > 0
                  ? printData.bmr07manufacturingsteps[0].lucid_observed_01 ==
                    "No"
                    ? "✕"
                    : "NA"
                  : "NA"}
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                align="center"
              >
                {printData && printData.bmr08productionreconciliation.length > 0
                  ? printData.bmr08productionreconciliation[0].input_quantity
                  : "NA"}
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                align="center"
              >
                {printData && printData.bmr08productionreconciliation.length > 0
                  ? printData.bmr08productionreconciliation[0].output_quantity
                  : "NA"}
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
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
                align="center"
              >
                {printData && printData.bmr08productionreconciliation.length > 0
                  ? Number(
                      printData.bmr08productionreconciliation[0].calculation
                    ).toFixed(2)
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

            {printData && printData.bmr09processdlyequpbrkdwnrecord.length > 0
              ? printData.bmr09processdlyequpbrkdwnrecord[0].spunlacrdetails.map(
                  (x, i) => {
                    return (
                      <tr>
                        <td
                          colspan="2"
                          style={{
                            textAlign: "center",
                            fontSize: "10pt",
                            fontFamily: "Times New Roman, Times, serif",
                          }}
                        >
                          {i + 1}
                        </td>
                        <td
                          colspan="2"
                          style={{
                            textAlign: "left",
                            fontSize: "10pt",
                            fontFamily: "Times New Roman, Times, serif",
                          }}
                        >
                          {x.prod_date}
                        </td>
                        <td
                          colspan="3"
                          style={{
                            textAlign: "left",
                            fontSize: "10pt",
                            fontFamily: "Times New Roman, Times, serif",
                          }}
                        >
                          {x.pde_from_hr}
                        </td>
                        <td
                          colspan="3"
                          style={{
                            textAlign: "left",
                            fontSize: "10pt",
                            fontFamily: "Times New Roman, Times, serif",
                          }}
                        >
                          {x.pde_to_hr}
                        </td>
                        <td
                          colspan="3"
                          style={{
                            textAlign: "left",
                            fontSize: "10pt",
                            fontFamily: "Times New Roman, Times, serif",
                          }}
                        >
                          {x.pde_total_hr}
                        </td>
                        <td
                          colspan="4"
                          style={{
                            textAlign: "left",
                            fontSize: "10pt",
                            fontFamily: "Times New Roman, Times, serif",
                          }}
                        >
                          {x.remarks}
                        </td>
                        <td
                          colspan="3"
                          style={{
                            textAlign: "left",
                            fontSize: "10pt",
                            fontFamily: "Times New Roman, Times, serif",
                          }}
                        >
                          {x.prod_sign.length > 0 ? x.prod_sign : "NA"}
                          <br></br>
                          {x.pde_date.length > 0 ? x.pde_date : "NA"}
                        </td>
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
                {printData && printData.bmr10processdeviationrecord.length > 0
                  ? printData.bmr10processdeviationrecord[0].deviation_log_no_01
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr10processdeviationrecord.length > 0
                  ? printData.bmr10processdeviationrecord[0].qa1_sign_01
                  : "NA"}
                <br></br>
                {printData && printData.bmr10processdeviationrecord.length > 0
                  ? printData.bmr10processdeviationrecord[0].qa1_date_01
                  : "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr10processdeviationrecord.length > 0
                  ? printData.bmr10processdeviationrecord[0].remarks_01
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr10processdeviationrecord.length > 0
                  ? printData.bmr10processdeviationrecord[0].qa1_sign_02
                  : "NA"}
                <br></br>
                {printData && printData.bmr10processdeviationrecord.length > 0
                  ? printData.bmr10processdeviationrecord[0].qa1_date_02
                  : "NA"}
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
                {printData && printData.bmr10processdeviationrecord.length > 0
                  ? printData.bmr10processdeviationrecord[0].deviation_log_no_02
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr10processdeviationrecord.length > 0
                  ? printData.bmr10processdeviationrecord[0].qa2_sign_01
                  : "NA"}
                <br></br>
                {printData && printData.bmr10processdeviationrecord.length > 0
                  ? printData.bmr10processdeviationrecord[0].qa2_date_01
                  : "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr10processdeviationrecord.length > 0
                  ? printData.bmr10processdeviationrecord[0].remarks_02
                  : "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr10processdeviationrecord.length > 0
                  ? printData.bmr10processdeviationrecord[0].qa2_sign_02
                  : "NA"}
                <br></br>
                {printData && printData.bmr10processdeviationrecord.length > 0
                  ? printData.bmr10processdeviationrecord[0].qa2_date_02
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
                Bale Consumptions Report
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
                {printData && printData.bmr11listsofenclosures.length > 0
                  ? printData.bmr11listsofenclosures[0].remarks_1 == "ATTACHED"
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
                {printData && printData.bmr11listsofenclosures.length > 0
                  ? printData.bmr11listsofenclosures[0].remarks_1 ==
                    "NOT ATTACHED"
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
                Processing Equipment’s (Measuring Devices) Calibration Report
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
                {printData && printData.bmr11listsofenclosures.length > 0
                  ? printData.bmr11listsofenclosures[0].remarks_2 == "ATTACHED"
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
                {printData && printData.bmr11listsofenclosures.length > 0
                  ? printData.bmr11listsofenclosures[0].remarks_2 ===
                    "NOT ATTACHED"
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
                {printData && printData.bmr12postprodreview.length > 0
                  ? printData.bmr12postprodreview[0].sup_sign
                  : "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr12postprodreview.length > 0
                  ? printData.bmr12postprodreview[0].designee_sign
                  : "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr12postprodreview.length > 0
                  ? printData.bmr12postprodreview[0].qa_sign
                  : "NA"}
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
                {printData && printData.bmr12postprodreview.length > 0
                  ? moment(printData.bmr12postprodreview[0].sup_date).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                  : "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr12postprodreview.length > 0
                  ? moment(
                      printData.bmr12postprodreview[0].designee_date
                    ).format("DD/MM/YYYY - HH:mm")
                  : "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr12postprodreview.length > 0
                  ? moment(printData.bmr12postprodreview[0].qa_date).format(
                      "DD/MM/YYYY - HH:mm"
                    )
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[0].status_1 ==
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[0].sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr13qarelease.length > 0
                  ? moment(printData.bmr13qarelease[0].details[0].date).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                  : "NA"}
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[0].status_1 ==
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[1].status_1 ==
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[1].sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr13qarelease.length > 0
                  ? moment(printData.bmr13qarelease[0].details[1].date).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                  : "NA"}
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[1].status_1 ==
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[2].status_1 ==
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[2].sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr13qarelease.length > 0
                  ? moment(printData.bmr13qarelease[0].details[2].date).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                  : "NA"}
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[2].status_1 ==
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
                {" "}
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[3].status_1 ==
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[3].sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr13qarelease.length > 0
                  ? moment(printData.bmr13qarelease[0].details[3].date).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                  : "NA"}
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[3].status_1 ==
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
                {" "}
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[4].status_1 ==
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[4].sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr13qarelease.length > 0
                  ? moment(printData.bmr13qarelease[0].details[4].date).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                  : "NA"}
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
                {printData && printData.bmr13qarelease.length > 0
                  ? printData.bmr13qarelease[0].details[4].status_1 ==
                    "NOT REVIEWED"
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
                {printData && printData.bmr14productrelease.length > 0
                  ? printData.bmr14productrelease[0].chk_qa_sign
                  : "NA"}
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr14productrelease.length > 0
                  ? printData.bmr14productrelease[0].apr_qa_sign
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
                {printData && printData.bmr14productrelease.length > 0
                  ? printData.bmr14productrelease[0].chk_qa_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr14productrelease.length > 0
                  ? moment(printData.bmr14productrelease[0].chk_qa_date).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                  : "NA"}
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData && printData.bmr14productrelease.length > 0
                  ? printData.bmr14productrelease[0].apr_qa_sign
                  : "NA"}
                <br></br>
                {printData && printData.bmr14productrelease.length > 0
                  ? moment(printData.bmr14productrelease[0].apr_qa_date).format(
                      "DD/MM/YYYY - HH:mm"
                    )
                  : "NA"}
              </td>
            </tr>

            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="15"></td>
            </tr>
          </tbody>
          <br />
          <br />
          <br></br>
          <br></br>
          <tfoot>
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
      {/* modal */}
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={printSubmit}
            disabled={!shiftPrint}
            loading={printLoading}
          >
            Submit
          </Button>,
        ]}
      >
        {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Order Number:
          </label>

          <Select
            showSearch
            value={orderNumberPrint}
            onChange={fetchOrderbasedHeadersPrint}
            style={{ width: "50%" }}
            placeholder="Search Order Number"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Order Number
            </Select.Option>
            {orderNumberLov.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Date:
          </label>

          <Input
            onChange={handleDatePrint}
            type="date"
            value={datePrint}
            size="small"
            // max={formattedToday}
            style={{ width: "50%", height: "30px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            Shift:
          </label>

          <Select
            showSearch
            value={shiftPrint}
            onChange={fetchPrintValue}
            style={{ width: "50%" }}
            placeholder="Search Batch No"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Shift
            </Select.Option>
            {shiftLov.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default Spunlace_BMR;
