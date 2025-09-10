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
  Form,
  Input,
} from "antd";
import React, { useEffect, useState } from "react";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import API from "../baseUrl.json";
import axios from "axios";
import useMessage from "antd/es/message/useMessage";
import moment from "moment";
import Production_Details from "./Components/Production_Details";
import Packing_Material_Issue from "./Components/Packing_Material_Issue";
import Reference_Documents from "./Components/Reference_Documents";
import Verification_Records from "./Components/Verification_Records";
import Manufacturing_Steps from "./Components/Manufacturing_Steps";
import Product_Reconciliation from "./Components/Product_Reconciliation";
import Process_Delay from "./Components/Process_Delay";
import Process_Deviation from "./Components/Process_Deviation";
import List_Of_Enclosures from "./Components/List_Of_Enclosures";
import Post_Production from "./Components/Post_Production";
import Qa_release from "./Components/Qa_release";
import Product_Release from "./Components/Product_Release";
import Equipment_Used_Process from "./Components/Equipment_Used_Process";
import Rework from "./Components/Rework";
import logo from "../Assests/logo.png";

const CottonBuds_BMR = () => {
  const [open, setOpen] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [messageApi, contextHolder] = useMessage();
  const [selectedOrderNo, setSelectedOrderNo] = useState("");
  const [New, setNew] = useState("");
  const [order, setOrder] = useState("");
  const [bmrReworkList, setBmrReworkList] = useState([]);
  const [printParams, setPrintParams] = useState({
    date: "",
    shift: "",
    machineNamePrint: "",
  });
  const [printData, setPrintData] = useState({
    productionDetails: [
      {
        batchNo: "",
        productDescription: "",
        machine: "",
        poNumber: "",
        orderNumber: "",
        productCode: "",
        poQuantityBags: "",
        poQuantityBoxes: "",
        packedQuantityBags: "",
        packedQuantityBoxes: "",
        remainingQuantityBags: "",
        remainingQuantityBoxes: "",
        packDateQtyBag: "",
        packDateQtyBox: "",
        poStatus: "",
        lotNumber: "",
        manufactureStartDate: "",
        manufactureStartTime: "",
        manufactureEndDate: "",
        manufactureEndTime: "",
        supervisiorName: "",
        supervisiorStatus: "",
        supervisiorId: "",
        supervisiorDate: "",
        qaStatus: "",
        qaId: "",
        qaName: "",
        qaDate: "",
        nextBatch: "",
      },
    ],
    equipmentDetails: [
      {
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
        supervisor_status: "",
        supervisor_save_on: "",
        supervisor_save_by: "",
        supervisor_save_id: "",
        supervisor_submit_on: "",
        supervisor_submit_by: "",
        supervisor_submit_id: "",
        supervisor_sign: "",
        supervisor_signature_image: "",
        qa_status: "",
        qa_submit_on: "",
        qa_submit_by: "",
        qa_submit_id: "",
        qa_sign: "",
        qa_signature_image: "",
        equipmentId: "",
        orderNo: "",
        batchNo: "",
        department: "",
        details: [
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            equipmentName: "",
            equipmentCode: "",
            dateOfCalibration: "",
            calibrationDueOn: "",
            checked_time: "",
            checked_name: "",
            checked_id: "",
            checked_date: "",
            checked_sign: "",
            checked_status: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            equipmentName: "",
            equipmentCode: "",
            dateOfCalibration: "",
            calibrationDueOn: "",
            checked_time: "",
            checked_name: "",
            checked_id: "",
            checked_date: "",
            checked_sign: "",
            checked_status: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            equipmentName: "",
            equipmentCode: "",
            dateOfCalibration: "",
            calibrationDueOn: "",
            checked_time: "",
            checked_name: "",
            checked_id: "",
            checked_date: "",
            checked_sign: "",
            checked_status: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            equipmentName: "",
            equipmentCode: "",
            dateOfCalibration: "",
            calibrationDueOn: "",
            checked_time: "",
            checked_name: "",
            checked_id: "",
            checked_date: "",
            checked_sign: "",
            checked_status: "",
          },
        ],
      },
    ],
    verificationRecords: [
      {
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
        supervisor_status: "",
        supervisor_save_on: "",
        supervisor_save_by: "",
        supervisor_save_id: "",
        supervisor_submit_on: "",
        supervisor_submit_by: "",
        supervisor_submit_id: "",
        supervisor_sign: "",
        supervisor_signature_image: "",
        qa_status: "",
        qa_submit_on: "",
        qa_submit_by: "",
        qa_submit_id: "",
        qa_sign: "",
        qa_signature_image: "",
        id: "",
        status: "",
        department: "",
        batchNo: "",
        orderNo: "",
        details: [
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            lineId: "",
            recordName: "",
            checked_date: "",
            checked_time: "",
            checked_name: "",
            checked_id: "",
            checked_sign: "",
            checked_status: "",
            verified_date: "",
            verified_time: "",
            verified_name: "",
            verified_id: "",
            verified_status: "",
            verified_sign: "",
            satisfactory: "",
            non_satisfactory: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            lineId: "",
            recordName: "",
            checked_date: "",
            checked_time: "",
            checked_name: "",
            checked_id: "",
            checked_sign: "",
            checked_status: "",
            verified_date: "",
            verified_time: "",
            verified_name: "",
            verified_id: "",
            verified_status: "",
            verified_sign: "",
            satisfactory: "",
            non_satisfactory: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            lineId: "",
            recordName: "",
            checked_date: "",
            checked_time: "",
            checked_name: "",
            checked_id: "",
            checked_sign: "",
            checked_status: "",
            verified_date: "",
            verified_time: "",
            verified_name: "",
            verified_id: "",
            verified_status: "",
            verified_sign: "",
            satisfactory: "",
            non_satisfactory: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            lineId: "",
            recordName: "",
            checked_date: "",
            checked_time: "",
            checked_name: "",
            checked_id: "",
            checked_sign: "",
            checked_status: "",
            verified_date: "",
            verified_time: "",
            verified_name: "",
            verified_id: "",
            verified_status: "",
            verified_sign: "",
            satisfactory: "",
            non_satisfactory: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            lineId: "",
            recordName: "",
            checked_date: "",
            checked_time: "",
            checked_name: "",
            checked_id: "",
            checked_sign: "",
            checked_status: "",
            verified_date: "",
            verified_time: "",
            verified_name: "",
            verified_id: "",
            verified_status: "",
            verified_sign: "",
            satisfactory: "",
            non_satisfactory: "",
          },
        ],
      },
    ],
    manufactureSteps: [
      {
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
        supervisor_status: "",
        supervisor_save_on: "",
        supervisor_save_by: "",
        supervisor_save_id: "",
        supervisor_submit_on: "",
        supervisor_submit_by: "",
        supervisor_submit_id: "",
        supervisor_sign: "",
        supervisor_signature_image: "",
        qa_status: "",
        qa_submit_on: "",
        qa_submit_by: "",
        qa_submit_id: "",
        qa_sign: "",
        qa_signature_image: "",
        id: "",
        batchNo: "",
        orderNo: "",
        department: "",
        machineName2: "",
        machineStartTime2: "",
        machineEndTime2: "",
        machineSpeed2: "",
        rpm2: "",
        pdsNumber4: "",
        details: [
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            lineId: "",
            machineName: "",
            machineStartTime: "",
            machineEndTime: "",
            padCount: "",
            machineSpeed: "",
            pdsNumber: "",
            observation: "",
            checked_date: "",
            checked_time: "",
            checked_name: "",
            checked_sign: "",
            performed_date: "",
            performed_time: "",
            performed_name: "",
            performed_sign: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            lineId: "",
            machineName: "",
            machineStartTime: "",
            machineEndTime: "",
            padCount: "",
            machineSpeed: "",
            pdsNumber: "",
            observation: "",
            checked_date: "",
            checked_time: "",
            checked_name: "",
            checked_sign: "",
            performed_date: "",
            performed_time: "",
            performed_name: "",
            performed_sign: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            lineId: "",
            machineName: "",
            machineStartTime: "",
            machineEndTime: "",
            padCount: "",
            machineSpeed: "",
            pdsNumber: "",
            observation: "",
            checked_date: "",
            checked_time: "",
            checked_name: "",
            checked_sign: "",
            performed_date: "",
            performed_time: "",
            performed_name: "",
            performed_sign: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            lineId: "",
            machineName: "",
            machineStartTime: "",
            machineEndTime: "",
            padCount: "",
            machineSpeed: "",
            pdsNumber: "",
            observation: "",
            checked_date: "",
            checked_time: "",
            checked_name: "",
            checked_sign: "",
            performed_date: "",
            performed_time: "",
            performed_name: "",
            performed_sign: "",
          },
        ],
      },
    ],
    stoppageList: [
      {
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
        stoppageId: "",
        department: "",
        orderNo: "",
        batchNo: "",
        fromdate: "",
        todate: "",
        machineName: "",
        status: "",
        supervisor_id: "",
        details: [
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            date: "",
            fromTime: "",
            toTime: "",
            totalTime: "",
            remarks: "",
            supervisorStatus: "",
            supervisorName: "",
            supervisorId: "",
            supervisorDate: "",
          },
        ],
      },
    ],
    postProductionReview: [
      {
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
        supervisorName: "",
        supervisorStatus: "",
        supervisorId: "",
        supervisorDate: "",
        qaName: "",
        qaStatus: "",
        qaId: "",
        qaDate: "",
        formatName: "",
        formatNumber: "",
        status: "",
        batchNo: "",
        orderNo: "",
        id: "",
        hodName: "",
        hodStatus: "",
        hodId: "",
        hodDate: "",
      },
    ],
    processDeviation: [
      {
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
        deviationId: "",
        orderNo: "",
        batchNo: "",
        department: "",
        status: "",
        details: [
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            deviationLogNo: "",
            qaRemarks: "",
            supervisorName: "",
            supervisorStatus: "",
            supervisorId: "",
            supervisorDate: "",
            qaName: "",
            qaStatus: "",
            qaDate: "",
            qaId: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            deviationLogNo: "",
            qaRemarks: "",
            supervisorName: "",
            supervisorStatus: "",
            supervisorId: "",
            supervisorDate: "",
            qaName: "",
            qaStatus: "",
            qaDate: "",
            qaId: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            deviationLogNo: "",
            qaRemarks: "",
            supervisorName: "",
            supervisorStatus: "",
            supervisorId: "",
            supervisorDate: "",
            qaName: "",
            qaStatus: "",
            qaDate: "",
            qaId: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            deviationLogNo: "",
            qaRemarks: "",
            supervisorName: "",
            supervisorStatus: "",
            supervisorId: "",
            supervisorDate: "",
            qaName: "",
            qaStatus: "",
            qaDate: "",
            qaId: "",
          },
        ],
      },
    ],
    enclosureList: [
      {
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
        id: "",
        title1: "",
        title2: "",
        remarks1: "",
        remarks2: "",
        orderNo: "",
        batchNo: "",
        department: "",
        supervisiorStatus: "",
        qaStatus: "",
        title3: "",
        remarks3: "",
      },
    ],
    qualityRelease: [
      {
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
        qualityId: "",
        orderNo: "",
        batchNo: "",
        department: "",
        status: "",
        details: [
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            description: "",
            qaName: "",
            qaId: "",
            qaStatus: "",
            qaDate: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            description: "",
            qaName: "",
            qaId: "",
            qaStatus: "",
            qaDate: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            description: "",
            qaName: "",
            qaId: "",
            qaStatus: "",
            qaDate: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            description: "",
            qaName: "",
            qaId: "",
            qaStatus: "",
            qaDate: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            description: "",
            qaName: "",
            qaId: "",
            qaStatus: "",
            qaDate: "",
          },
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            id: "",
            description: "",
            qaName: "",
            qaId: "",
            qaStatus: "",
            qaDate: "",
          },
        ],
      },
    ],
    productRelease: [
      {
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
        id: "",
        batchNo: "",
        orderNo: "",
        checkerName: "",
        checkerDate: "",
        checkerSign: "",
        approverName: "",
        approverDate: "",
        approverSign: "",
        checkerStatus: "",
        approverStatus: "",
      },
    ],
    reworkList: [],
    reconillation: {
      inputQuantity: "",
      outputQuantity: "",
      yield: "",
    },
    packingMaterialHeaders: [
      {
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
        pack_id: "",
        order_no: "",
        batch_no: "",
        form_no: "",
        status: "",
        supervisor_id: "",
        pckdetails: [
          {
            createdAt: "",
            updatedAt: "",
            createdBy: "",
            updatedBy: "",
            pack_id: "",
            s_no: "",
            date: "",
            packing_batch_no: "",
            name_of_the_meterial: "",
            qty: "",
            unit: "",
            remarks: "",
            id: "",
          },
        ],
      },
    ],
  });
  //All states for API here
  const [apiData, setApiData] = useState({
    baleConsumption: [],
    equipmentUsedProcess: [],
    listOfEnclosures: [],
    manufactureSteps: [],
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
  const [baleData, setBaleData] = useState([]);
  //All States for LOV Here
  const [Lov, setLov] = useState({
    qaLov: [],
    supLov: [],
    HodLov: [],
    machineLov: [],
    orderNoLov: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [baleDate, setBaleDate] = useState("");
  const [baleMachine, setBaleMachine] = useState("");
  const [baleShift, setBaleShift] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
    baleConsumptionReport();
    // onPrint()
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const [printData1, setPrintData1] = useState([]);
  const [eSign, setESign] = useState({});
  /////////////////////
  const handlePrintParams = (e, name) => {
    if (name == "date") {
      setPrintParams((prevState) => ({
        ...prevState,
        date: e.target.value,
      }));
    }
    if (name == "shift") {
      setPrintParams((prevState) => ({
        ...prevState,
        shift: e,
      }));
    }
    if (name == "machineNamePrint") {
      setPrintParams((prevState) => ({
        ...prevState,
        machineNamePrint: e,
      }));
    }
  };
  ////////////////
  const handlePrint = async () => {
    if (
      printParams.machineNamePrint == "" &&
      printParams.shift == "" &&
      printParams.date == ""
    ) {
      message.warning("Please Select Atleast One Field");
      return;
    }
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/buds/Service/printSliverProduction?date=${printParams.date}&shift=${printParams.shift}&machine_name=${printParams.machineNamePrint}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No data available to print");
        return;
      }
      const uniqueSigns = new Set();

      const fetchSignatures = async () => {
        for (const entry of response.data) {
          const { operator_sign, supervisor_sign, hod_sign } = entry;

          if (operator_sign && !uniqueSigns.has(operator_sign)) {
            uniqueSigns.add(operator_sign);
            fetchSignature(operator_sign, operator_sign);
          }
          if (supervisor_sign && !uniqueSigns.has(supervisor_sign)) {
            uniqueSigns.add(supervisor_sign);
            fetchSignature(supervisor_sign, supervisor_sign);
          }
          if (hod_sign && !uniqueSigns.has(hod_sign)) {
            uniqueSigns.add(hod_sign);
            fetchSignature(hod_sign, hod_sign);
          }
        }
      };

      await fetchSignatures();
      setPrintData1(response.data);

      ////////
      axios
        .get(
          `${API.prodUrl}/Precot/api/buds/bmr/getBmrPrint?batchNumber=${selectedOrderNo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("Response", res.data);
          setPrintData(res.data);
          setTimeout(() => {
            window.print();
          }, 1500);
        })
        .catch((err) => {
          message.error("No Data Found");
        });
      // setTimeout(() => {
      //   fetchJob();
      // }, 1000);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const fetchSignature = async (sign, key) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/image?username=${sign}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "arraybuffer",
        }
      );
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const url = `data:image/jpeg;base64,${base64}`;
      setESign((prevSign) => ({
        ...prevSign,
        [key]: url,
      }));
    } catch (err) {
      console.log("Error fetching image:", err);
    }
  };
  ///////////////////

  const onOrderChange = (selectedOrder) => {
    setNew(selectedOrder);
    axios
      .get(
        `${API.prodUrl}/Precot/api/buds/bmr/getOrderByBatchNumber?batchNumber=${
          selectedOrder.split("-")[0]
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Response", res.data);
        const a = res.data.map((x, i) => {
          return {
            value: x.value,
            label: x.value,
          };
        });
        updateLovData({ orderNoLov: a });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    axios
      .get(`${API.prodUrl}/Precot/api/buds/bmr/fetchProductionDetails`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
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
      .get(`${API.prodUrl}/Precot/api/buds/Service/qaandqcname`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("QA", res.data);

        const a = res.data.map((option) => ({
          value: option.value,
          label: option.value,
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
      .get(`${API.prodUrl}/Precot/api/buds/Service/supervisoname`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Res", res.data);
        const a = res.data.map((option) => ({
          value: option.value,
          label: option.value,
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
      .get(`${API.prodUrl}/Precot/api/buds/Service/hodname`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Res", res.data);
        // const a = res.data.map((option) => ({
        //   value: option.username,
        //   label: option.username,
        // }));
        const a = res.data.map((x) => ({
          value: x.value,
          label: x.value,
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

    //Machine LOV
    axios
      .get(`${API.prodUrl}/Precot/api/buds/sap/Service/machineList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Res", res.data);
        const a = res.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        console.log("User Lov", a);
        updateLovData({ machineLov: a });
      })
      .catch((err) => {
        console.log("ERRor", err);
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
  };
  //setSelectedOrderNo(selectedOrder);

  const onPrint = () => {
    //alert(selectedOrderNo)
    axios
      .get(
        `${API.prodUrl}/Precot/api/buds/bmr/getBmrPrint?batchNumber=${selectedOrderNo}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setPrintData(res.data);
        setBmrReworkList(res.data.reworkList);
        if (res.data.enclosureList[0].remarks1 == "ATTACHED") {
          setIsModalOpen(true);
        } else {
          setTimeout(() => {
            window.print();
          }, 1500);
        }
      })
      .catch((err) => {
        message.error("No Data Found", err);
        console.log("error", err);
      });
  };

  const baleConsumptionReport = () => {
    axios
      .get(
        `${
         API.prodUrl
        }/Precot/api/PadPunching/Service/RollConsumptionReport/getByDateShiftMachinePrint?date=${moment(
          baleDate
        ).format("YYYY-MM-DD")}&shift=${baleShift}&machineName=${baleMachine}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("REsposne data", res.data);
        if (res.data && res.data.length > 0) {
          //setPrintResponseData(res.data);
          setBaleData(res.data);
          axios
            .get(
              `${API.prodUrl}/Precot/api/punching/bmr/punchingprint?batchNo=${selectedOrderNo}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              console.log("Response", res.data);
              setPrintData(res.data);
              setTimeout(() => {
                window.print();
              }, 1500);
            })
            .catch((err) => {
              message.error("No Data Found");
            });
        } else {
          message.error("No Data");
          //  handleModalClose();
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
        message.error("Error In Bale Consumption Report");
      });
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
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={
            localStorage.getItem("role") == "ROLE_QA" ||
            localStorage.getItem("role") == "QA_MANAGER"
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
      key: "2",
      label: "Packing Material Issue",
      children: (
        <Packing_Material_Issue
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={
            localStorage.getItem("role") == "ROLE_QA" ||
            localStorage.getItem("role") == "QA_MANAGER"
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
      key: "3",
      label: "Reference Documents",
      children: (
        <Reference_Documents
          apiData={[]}
          edit={true}
          bmr="SP90897"
          batchNo=""
          qaLov={[]}
          supLov={[]}
          hodLov={[]}
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
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          machineLov={Lov.machineLov}
          loggedInQa={
            localStorage.getItem("role") == "ROLE_QA" ||
            localStorage.getItem("role") == "QA_MANAGER"
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
      key: "5",
      label: "Verification of Record",
      children: (
        <Verification_Records
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={
            localStorage.getItem("role") == "ROLE_QA" ||
            localStorage.getItem("role") == "QA_MANAGER"
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
      key: "6",
      label: "Manufacturing Steps",
      children: (
        <Manufacturing_Steps
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          machineLov={Lov.machineLov}
          loggedInQa={
            localStorage.getItem("role") == "ROLE_QA" ||
            localStorage.getItem("role") == "QA_MANAGER"
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
      key: "7",
      label: "Product Reconciliation",
      children: (
        <Product_Reconciliation
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={
            localStorage.getItem("role") == "ROLE_QA" ||
            localStorage.getItem("role") == "QA_MANAGER"
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
      key: "8",
      label: "Process delay Equipment breakdown record",
      children: (
        <Process_Delay
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          machineLov={Lov.machineLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={
            localStorage.getItem("role") == "ROLE_QA" ||
            localStorage.getItem("role") == "QA_MANAGER"
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
      key: "9",
      label: "Process Deviation Record",
      children: (
        <Process_Deviation
          apiData={[]}
          edit={true}
          bmr="SP90897"
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={
            localStorage.getItem("role") == "ROLE_QA" ||
            localStorage.getItem("role") == "QA_MANAGER"
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
      key: "10",
      label: "List of Enclosures",
      children: (
        <List_Of_Enclosures
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={
            localStorage.getItem("role") == "ROLE_QA" ||
            localStorage.getItem("role") == "QA_MANAGER"
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
      label: "Post Production Review",
      children: (
        <Post_Production
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQaManandQADesignee={
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
        <Qa_release
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQaManandQADesignee={
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
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={
            localStorage.getItem("role") == "ROLE_QA" ||
            localStorage.getItem("role") == "QA_MANAGER"
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
      key: "14",
      label: "Rework",
      children: (
        <Rework
          apiData={[]}
          edit={true}
          batchNo={selectedOrderNo}
          qaLov={Lov.qaLov}
          supLov={Lov.supLov}
          hodLov={Lov.HodLov}
          orderNo={order}
          role={localStorage.getItem("role")}
          loggedInQa={
            localStorage.getItem("role") == "ROLE_QA" ||
            localStorage.getItem("role") == "QA_MANAGER"
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
  ];
  return (
    <div>
      <Modal
        title="DIALY PRODUCTION - SLIVER MAKING FOR COTTON BUDS (Print)"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="reject" type="primary" onClick={handlePrint}>
            OK
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ marginRight: "1px", width: "30%", textAlign: "center" }}
          >
            Machine Name:
          </label>

          <Select
            showSearch
            placeholder="Machine Name"
            id="ph-select"
            options={Lov.machineLov}
            value={printParams.machineNamePrint}
            onChange={(e) => {
              handlePrintParams(e, "machineNamePrint");
            }}
            size="medium"
            style={{
              backgroundColor: "#E5EEF9",
              fontWeight: "bold",
              margin: "10px",
              textAlign: "center",
              width: "200px",
            }}
            dropdownStyle={{ textAlign: "center" }}
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
            Date:
          </label>

          <Input
            onChange={(e) => {
              handlePrintParams(e, "date");
            }}
            type="date"
            size="small"
            // max ={ formattedToday }
            style={{ width: "50%", height: "30px", textAlign: "center" }}
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
            value={printParams.shift}
            // onChange={fetchPrintValue}
            style={{ width: "50%", textAlign: "center" }}
            // placeholder="Search Batch No"
            options={[
              {
                value: "I",
                label: "I",
              },
              {
                value: "II",
                label: "II",
              },
              {
                value: "III",
                label: "III",
              },
            ]}
            onChange={(e) => {
              handlePrintParams(e, "shift");
            }}
          />
        </div>
      </Modal>
      {/* <Modal
        title="Cotton BMR - Sliver Consumption"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={baleConsumptionReport}>
            Submit
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Date:">
            <Input
              value={baleDate}
              onChange={(e) => setBaleDate(e.target.value)}
              type="date"
            />
          </Form.Item>
          <Form.Item label="Shift:">
            <Select
              value={baleShift}
              onChange={(e) => setBaleShift(e)}
              options={[
                { value: "I", label: "I" },
                { value: "II", label: "II" },
                { value: "III", label: "III" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Machine:">
            <Select
              value={baleMachine}
              onChange={(e) => setBaleMachine(e)}
              options={Lov.machineLov}
            />
          </Form.Item>
        </Form>
      </Modal> */}
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
            onClick={onPrint}
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
            onChange={onOrderChange}
            options={orderList}
            placeholder="Select Batch No"
            style={{
              marginRight: "2em",
            }}
          />
          Select Order No :
          <Select
            showSearch
            onChange={(e) => setOrder(e)}
            options={Lov.orderNoLov}
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
      {/* section to print */}
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
                PH-PRD06/F-004
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
                PH-QAD01-D-42
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
                Cotton Buds Making
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
                CB-PD-001 / 01
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
                Cotton Buds
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
                01/10/2024
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
                  {printData.productionDetails[0].qaName.length > 0
                    ? printData.productionDetails[0].qaName
                    : "NA"}
                  <br></br>
                  {printData.productionDetails[0].qaDate.length > 0
                    ? moment(printData.productionDetails[0].qaDate).format(
                        "DD/MM/YYYY - HH:mm"
                      )
                    : "NA"}
                </div>
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
                  {printData.productionDetails[0].supervisiorName.length > 0
                    ? printData.productionDetails[0].supervisiorName
                    : "NA"}
                  <br></br>
                  {printData.productionDetails[0].supervisiorDate.length > 0
                    ? moment(
                        printData &&
                          printData.productionDetails[0].supervisiorDate
                      ).format("DD/MM/YYYY - HH:mm")
                    : "NA"}
                </div>
              </td>
            </tr>

            <br></br>

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
                BATCH NO: {printData.productionDetails[0].batchNo || "NA"}
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
                PO No{" "}
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.productionDetails[0].poNumber || "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Production Order No
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.productionDetails[0].orderNumber || "NA"}
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
                Product Description
              </td>
              <td
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.productionDetails[0].productDescription || "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Product Code
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.productionDetails[0].productCode || "NA"}
              </td>
            </tr>
            {/* // */}
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
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.productionDetails[0].poQuantityBags || "NA"}
              </td>
              <td
                colspan="3"
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
                {printData.productionDetails[0].poQuantityBoxes || "NA"}
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
                colspan="7"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.productionDetails[0].packedQuantityBags || "NA"}
              </td>
              <td
                colspan="3"
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
                {printData.productionDetails[0].packedQuantityBoxes || "NA"}
              </td>
            </tr>
            {/* // */}
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
                {printData.productionDetails[0].remainingQuantityBags || "NA"}
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
                {printData.productionDetails[0].remainingQuantityBoxes || "NA"}
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
                {printData.productionDetails[0].packDateQtyBag || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                On date packed Qty.in No of Boxes:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.productionDetails[0].packDateQtyBox || "NA"}
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
                PO Completion Status:{" "}
                {printData.productionDetails[0].poStatus || "NA"}
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
                Lot No : {printData.productionDetails[0].lotNumber || "NA"}
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
                Manufacturing End Date{" "}
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
                Date{" "}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {moment(
                  printData &&
                    printData.productionDetails[0].manufactureStartDate
                ).format("DD/MM/YYYY") || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {moment(
                  printData && printData.productionDetails[0].manufactureEndDate
                ).format("DD/MM/YYYY") || "NA"}
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
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Date
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {moment(
                  printData && printData.productionDetails[0].manufactureEndDate
                ).format("DD/MM/YYYY") || "NA"}
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
                {" "}
                2.0 SLIVER CONSUMPTION:
              </th>
            </tr>
            {/* //attached here */}
            {printData.enclosureList[0].remarks1 == "ATTACHED"
              ? printData1.map((data, index) => (
                  <>
                    <tr>
                      <td colSpan={20}>1. Machine Name: {data.machineName} </td>
                    </tr>
                    <tr>
                      <td colSpan={10}>
                        Date: {moment(data.machineDate).format("DD/MM/YYYY")}
                      </td>
                      <td colSpan={5}>Shift: {data.shift} </td>
                      <td colSpan={5}>Lay down No.: {data.laydownNumber}</td>
                    </tr>
                    <tr>
                      <td colSpan={5}>Order No.</td>
                      <td colSpan={5}>{data.orderNumber}</td>
                      <td colSpan={5}>Mixing</td>
                      <td colSpan={5}>{data.mixing}</td>
                    </tr>
                    <tr>
                      <td colSpan={5}>Customer Name</td>
                      <td colSpan={5}>{data.customerName}</td>
                      <td colSpan={10}>
                        Std. Wt in Grams (Wt. Tolerance in +/- 5%)
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={20}>2.Parameters:</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        GPM
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        Draft
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        Doffer Speed in rpm
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        Sliver Length in Mtrs
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        {data.gpm}
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        {data.draft}
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        {data.dofferSpeed}
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        {data.sliverLength}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={20}> 3.Perfect Card Sliver Production:</td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: "center" }} colSpan={2}>
                        S. No.
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={2}>
                        Sliver Can No
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={2}>
                        GPM
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={2}>
                        Carding M/c No
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={2}>
                        Net Wet (kgs)
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={2}>
                        S. No.
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={2}>
                        Sliver Can No
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={2}>
                        GPM
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={2}>
                        Carding M/c No
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={2}>
                        Net Wet (kgs)
                      </td>
                    </tr>
                    {data.sliverLine.map((row, rowIndex) => (
                      <tr>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                          {" "}
                          {rowIndex + 1}
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                          {" "}
                          {row.sliverCanNumber1}{" "}
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                          {row.gpm1}{" "}
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                          {" "}
                          {row.cardingMachineNumber1}
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                          {row.netWeight1}{" "}
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                          {rowIndex + 1}{" "}
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                          {row.sliverCanNumber2}{" "}
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                          {row.gpm2}{" "}
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                          {" "}
                          {row.cardingMachineNumber2}{" "}
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={2}>
                          {" "}
                          {row.netWeight2}{" "}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        {" "}
                        Total in Kg
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        {data.total1}
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        Total in Kg
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        {data.total2}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={20}>
                        Total Production in Kg: {data.totalProduction}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ textAlign: "center" }}
                        //rowSpan={0}
                        colSpan={4}
                      >
                        Waste in Kg
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={8}>
                        Compactor waste
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={8}>
                        Sliver Weight in Kgs
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan={10}>
                        {data.compactorWaste}
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={10}>
                        {data.sliverWeight}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={20}>4.Stoppage:</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        Nature Of Problem
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        Stop. Time
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        Restart Time
                      </td>
                      <td style={{ textAlign: "center" }} colSpan={5}>
                        Idle Time (in Min)
                      </td>
                    </tr>
                    {data.stoppageDetails.map((row, rowIndex) => (
                      <tr>
                        <td style={{ textAlign: "center" }} colSpan={5}>
                          {row.problemNature}
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={5}>
                          {row.stopTime}
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={5}>
                          {row.restartTime}
                        </td>
                        <td style={{ textAlign: "center" }} colSpan={5}>
                          {row.idleTime}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          textAlign: "center",
                          borderBottom: "none",
                        }}
                      >
                        Performed by Operator Sign & Date
                      </td>
                      <td
                        colSpan={5}
                        style={{
                          textAlign: "center",
                          borderBottom: "none",
                        }}
                      >
                        Checked by Supervisor Sign & Date{" "}
                      </td>
                      <td
                        colSpan={10}
                        style={{
                          textAlign: "center",
                          borderBottom: "none",
                        }}
                      >
                        Reviewed by HOD/ DesigneeSign & Date
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        style={{ textAlign: "center", borderTop: "none" }}
                      >
                        {eSign[data.operator_sign] ? (
                          <img
                            src={eSign[data.operator_sign]}
                            alt="Operator eSign"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        ) : null}
                        <br />
                        {data.operator_sign}
                        <br />
                        {moment(data.operator_submitted_on).format(
                          "DD/MM/YYYY - HH:mm"
                        )}
                      </td>
                      <td
                        colSpan={5}
                        style={{ textAlign: "center", borderTop: "none" }}
                      >
                        {eSign[data.supervisor_sign] ? (
                          <img
                            src={eSign[data.supervisor_sign]}
                            alt="Operator eSign"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        ) : null}
                        <br />
                        {data.supervisor_sign}
                        <br />
                        {moment(data.supervisor_submit_on).format(
                          "DD/MM/YYYY - HH:mm"
                        )}
                      </td>
                      <td
                        colSpan={10}
                        style={{ textAlign: "center", borderTop: "none" }}
                      >
                        {eSign[data.hod_sign] ? (
                          <img
                            src={eSign[data.hod_sign]}
                            alt="Operator eSign"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                            }}
                          />
                        ) : null}
                        <br />
                        {data.hod_sign}
                        <br />
                        {moment(data.hod_submit_on).format(
                          "DD/MM/YYYY - HH:mm"
                        )}
                      </td>
                    </tr>
                  </>
                ))
              : null}
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
            {printData.packingMaterialHeaders.length > 0
              ? printData.packingMaterialHeaders[0].pckdetails.map((x, i) => {
                  return (
                    <tr>
                      <td colSpan="2">{i + 1}</td>
                      <td colSpan="4">{x.name_of_the_meterial || "NA"}</td>
                      <td colSpan="4">{x.packing_batch_no || "NA"}</td>
                      <td colSpan="4">{x.qty || "NA"}</td>
                      <td colSpan="4">{x.remarks || "NA"}</td>
                      <td colSpan="2">{x.unit || "NA"}</td>
                    </tr>
                  );
                })
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
              >
                Cotton Swab Machine Operation
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-PRD06-D-03
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
                Cleaning Machine
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                PH-PRD06-D-04
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
                Deviations Management
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
            <tr>
              <td
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                5.0 EQUPEMENTS USED FOR THE PROCESS:
              </td>
            </tr>
            <tr>
              <th colSpan="4">S No.</th>
              <th colSpan="2">Equipment Name</th>
              <th colSpan="2">Equipment code</th>
              <th colSpan="4">Date of Calibration</th>
              <th colSpan="4">Calibration due on</th>
              <th colSpan="4">Checked by Sign & Date</th>
            </tr>
            {printData.equipmentDetails[0].details.map((x, i) => {
              return (
                <tr>
                  <td colSpan="4">{i + 1}</td>
                  <td colSpan="2">{x.equipmentName}</td>
                  <td colSpan="2">{x.equipmentCode}</td>
                  <td colSpan="4">
                    {moment(x.dateOfCalibration).format("DD/MM/YYYY - HH:mm")}
                  </td>
                  <td colSpan="4">
                    {moment(x.calibrationDueOn).format("DD/MM/YYYY - HH:mm")}
                  </td>
                  <td colSpan="4">
                    {x.checked_name}
                    <br />
                    {moment(x.checked_date).format("DD/MM/YYYY - HH:mm")}
                  </td>
                </tr>
              );
            })}
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
                {printData.verificationRecords[0].details[0].checked_sign ||
                  "NA"}
                <br></br>
                {moment(
                  printData.verificationRecords[0].details[0].checked_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
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
                {printData.verificationRecords[0].details[0].verified_sign ||
                  "NA"}
                <br></br>
                {moment(
                  printData.verificationRecords[0].details[0].verified_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
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
                {printData.verificationRecords[0].details[0].satisfactory ==
                "SATISFACTORY"
                  ? "✓"
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
                {printData.verificationRecords[0].details[0].satisfactory ==
                "NOT SATISFACTORY"
                  ? "✕"
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
                Equipment logbook buds
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
                {printData.verificationRecords[0].details[1].checked_sign ||
                  "NA"}
                <br></br>
                {moment(
                  printData.verificationRecords[0].details[1].checked_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
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
                {printData.verificationRecords[0].details[1].verified_sign ||
                  "NA"}
                <br></br>
                {moment(
                  printData.verificationRecords[0].details[1].verified_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
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
                {printData.verificationRecords[0].details[1].satisfactory ==
                "SATISFACTORY"
                  ? "✓"
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
                {printData.verificationRecords[0].details[1].satisfactory ==
                "NOT SATISFACTORY"
                  ? "✕"
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
                Production Details-Logbook
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
                {printData.verificationRecords[0].details[2].checked_sign ||
                  "NA"}
                <br></br>
                {moment(
                  printData.verificationRecords[0].details[2].checked_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
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
                {printData.verificationRecords[0].details[2].verified_sign ||
                  "NA"}
                <br></br>
                {moment(
                  printData.verificationRecords[0].details[2].verified_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
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
                {printData.verificationRecords[0].details[2].satisfactory ==
                "SATISFACTORY"
                  ? "✓"
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
                {printData.verificationRecords[0].details[2].satisfactory ==
                "NOT SATISFACTORY"
                  ? "✕"
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
                Sliver consumption report
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
                {printData.verificationRecords[0].details[3].checked_sign ||
                  "NA"}
                <br></br>
                {moment(
                  printData.verificationRecords[0].details[3].checked_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
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
                {printData.verificationRecords[0].details[3].verified_sign ||
                  "NA"}
                <br></br>
                {moment(
                  printData.verificationRecords[0].details[3].verified_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
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
                {printData.verificationRecords[0].details[3].satisfactory ==
                "SATISFACTORY"
                  ? "✓"
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
                {printData.verificationRecords[0].details[3].satisfactory ==
                "NOT SATISFACTORY"
                  ? "✕"
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
                {printData.verificationRecords[0].details[4].checked_sign ||
                  "NA"}
                <br></br>
                {moment(
                  printData.verificationRecords[0].details[4].checked_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
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
                {printData.verificationRecords[0].details[4].verified_sign ||
                  "NA"}
                <br></br>
                {moment(
                  printData.verificationRecords[0].details[4].verified_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
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
                {printData.verificationRecords[0].details[4].satisfactory ==
                "SATISFACTORY"
                  ? "✓"
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
                {printData.verificationRecords[0].details[4].satisfactory ==
                "NOT SATISFACTORY"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>

            <br />
            <tr>
              <th
                colSpan="20"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                7.0 MANUFACTURING STEPS:
              </th>
            </tr>
            <tr>
              <th
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Step No
              </th>
              <th
                colSpan="7"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Operation
              </th>
              <th
                colSpan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Observation
              </th>
              <th
                colSpan="4"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Performed by (Sign & Date){" "}
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checked by(Sign & Date){" "}
              </th>
            </tr>
            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Sliver material arrangement: Cleanliness and verify the
                arrangement of the Sliver for the readiness of process of
                allocated machine.
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ready{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[0].observation == "READY"
                  ? "✓"
                  : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[0].performed_name ||
                  "NA"}
                <br></br>
                {moment(
                  printData.manufactureSteps[0].details[0].performed_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[0].checked_name || "NA"}
                <br></br>
                {moment(
                  printData.manufactureSteps[0].details[0].checked_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Not Ready{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[0].observation ==
                "NOT READY"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                2
              </td>
              <td
                colSpan="7"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Switch ON the{" "}
                {printData.manufactureSteps[0].machineName2 || "NA"} machine.
                <br />
                Machine start time:{" "}
                {printData.manufactureSteps[0].machineStartTime2 || "NA"}
                <br />
                Machine end time:{" "}
                {printData.manufactureSteps[0].machineEndTime2 || "NA"}
                <br />
                Set parameters.
                <br />
                No of Buds:{" "}
                {printData.manufactureSteps[0].machineSpeed2 || "NA"}
                <br />
                Machine Speed (RPM):{" "}
                {printData.manufactureSteps[0].rpm2 || "NA"}
                <br />
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ready{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[1].observation == "READY"
                  ? "✓"
                  : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[1].performed_name ||
                  "NA"}
                <br></br>
                {moment(
                  printData.manufactureSteps[0].details[1].performed_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
              </td>
              <td
                colSpan="3"
                rowSpan="3"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[1].checked_name || "NA"}
                <br></br>
                {moment(
                  printData.manufactureSteps[0].details[1].checked_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {" "}
                Not Ready{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[1].observation ==
                "NOT READY"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                No of Buds:{" "}
                {printData.manufactureSteps[0].details[1].padCount || "NA"}
                <br />
                Machine Speed (RPM):{" "}
                {printData.manufactureSteps[0].details[1].machineSpeed || "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                3
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Check the metal detector setting with FE – 1.0 mm & SS – 1.2 mm
                Refer Metal detector calibration record. (Format No.:
                QAD01/F-35)
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Checked
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[2].observation ==
                "CHECKED"
                  ? "✓"
                  : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[2].performed_name ||
                  "NA"}
                <br></br>
                {moment(
                  printData.manufactureSteps[0].details[2].performed_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[2].checked_name || "NA"}
                <br></br>
                {moment(
                  printData.manufactureSteps[0].details[2].checked_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Checked
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[2].observation ==
                "NOT READY"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>

            <tr>
              <td
                colSpan="2"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                4
              </td>
              <td
                colSpan="7"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Perform the packing as per the Product Development Sheet (Format
                # PH-DVP01/F-005) PDS No.{" "}
                {printData.manufactureSteps[0].pdsNumber4 || "NA"}
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Performed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[3].observation ==
                "PERFORMED"
                  ? "✓"
                  : "NA"}
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[3].performed_name ||
                  "NA"}
                <br></br>
                {moment(
                  printData.manufactureSteps[0].details[3].performed_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
              </td>
              <td
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[3].checked_name || "NA"}
                <br></br>
                {moment(
                  printData.manufactureSteps[0].details[3].checked_date
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Not Performed
              </td>
              <td
                colSpan="2"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.manufactureSteps[0].details[3].observation ==
                "NOT PERFORMED"
                  ? "✕"
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
                {printData.reconillation.inputQuantity || "NA"}
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
                {printData.reconillation.outputQuantity || "NA"}
              </td>
              <td
                colspan="3"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                % Yield (Specification: 55% to 70%)
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
                {printData.reconillation.yield || "NA"}
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

            {printData.stoppageList[0].details.map((x, i) => {
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
                    {moment(x.date).format("DD/MM/YYYY")}
                  </td>
                  <td
                    colspan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {x.fromTime}
                  </td>
                  <td
                    colspan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {x.toTime}
                  </td>
                  <td
                    colspan="3"
                    style={{
                      textAlign: "left",
                      fontSize: "10pt",
                      fontFamily: "Times New Roman, Times, serif",
                    }}
                  >
                    {x.totalTime}
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
                    {x.supervisorName.length > 0 ? x.supervisorName : "NA"}
                    <br></br>
                    {x.supervisorDate.length > 0
                      ? moment(x.supervisorDate).format("DD/MM/YYYY")
                      : "NA"}
                  </td>
                </tr>
              );
            })}
            <br />
            {/* // */}
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
                10.0 LIST OF ENCLOSURES:
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
                Sliver Consumption Report
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
                {printData.enclosureList[0].remarks1 == "ATTACHED" ? "✓" : "NA"}
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
                {printData.enclosureList[0].remarks1 == "NOT ATTACHED"
                  ? "✕"
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
                Packing Material Issue & Consumption Report
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
                {printData.enclosureList[0].remarks2 == "ATTACHED" ? "✓" : "NA"}
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
                {printData.enclosureList[0].remarks2 == "NOT ATTACHED"
                  ? "✕"
                  : "NA"}
              </td>
            </tr>
            <br />
            {/* // */}
            <tr>
              <th
                colspan="20"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                11.0 PROCESS DEVIATION RECORD
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
                {printData.processDeviation[0].details[0].deviationLogNo ||
                  "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.processDeviation[0].details[0].supervisorName ||
                  "NA"}
                <br></br>
                {moment(
                  printData.processDeviation[0].details[0].supervisorDate
                ).format("DD/MM/YYYY") || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.processDeviation[0].details[0].qaRemarks || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.processDeviation[0].details[0].qaName || "NA"}
                <br></br>
                {moment(printData.processDeviation[0].details[0].qaDate).format(
                  "DD/MM/YYYY"
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
                {printData.processDeviation[0].details[1].deviationLogNo ||
                  "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.processDeviation[0].details[1].supervisorName ||
                  "NA"}
                <br></br>
                {moment(
                  printData.processDeviation[0].details[1].supervisorDate
                ).format("DD/MM/YYYY") || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.processDeviation[0].details[1].qaRemarks || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.processDeviation[0].details[1].qaName || "NA"}
                <br></br>
                {moment(printData.processDeviation[0].details[1].qaDate).format(
                  "DD/MM/YYYY"
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
                {printData.processDeviation[0].details[2].deviationLogNo ||
                  "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.processDeviation[0].details[2].supervisorName ||
                  "NA"}
                <br></br>
                {moment(
                  printData.processDeviation[0].details[2].supervisorDate
                ).format("DD/MM/YYYY") || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.processDeviation[0].details[2].qaRemarks || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.processDeviation[0].details[2].qaName || "NA"}
                <br></br>
                {moment(printData.processDeviation[0].details[2].qaDate).format(
                  "DD/MM/YYYY"
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
                {printData.processDeviation[0].details[3].deviationLogNo ||
                  "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.processDeviation[0].details[3].supervisorName ||
                  "NA"}
                <br></br>
                {moment(
                  printData.processDeviation[0].details[3].supervisorDate
                ).format("DD/MM/YYYY") || "NA"}
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.processDeviation[0].details[3].qaRemarks || "NA"}
              </td>
              <td
                colspan="4"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.processDeviation[0].details[3].qaName || "NA"}
                <br></br>
                {moment(printData.processDeviation[0].details[3].qaDate).format(
                  "DD/MM/YYYY"
                ) || "NA"}
              </td>
            </tr>

            <br />
            {/* // */}
            {/* // */}
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
                {printData.postProductionReview[0].supervisorName || "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.postProductionReview[0].hodName || "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.postProductionReview[0].qaName || "NA"}
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
                {moment(
                  printData.postProductionReview[0].supervisorDate
                ).format("DD/MM/YYYY - HH:mm") || "NA"}
              </td>
              <td
                colspan="6"
                style={{
                  textAlign: "center",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {moment(printData.postProductionReview[0].hodDate).format(
                  "DD/MM/YYYY - HH:mm"
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
                {moment(printData.postProductionReview[0].qaDate).format(
                  "DD/MM/YYYY - HH:mm"
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
                {printData.qualityRelease[0].details[0].qaStatus == "REVIEWED"
                  ? "✓"
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
                {printData.qualityRelease[0].details[0].qaName || "NA"}
                <br></br>
                {moment(printData.qualityRelease[0].details[0].qaDate).format(
                  "DD/MM/YYYY - HH:mm"
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
                {printData.qualityRelease[0].details[0].qaStatus ==
                "NOT REVIEWED"
                  ? "✕"
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
                {printData.qualityRelease[0].details[1].qaStatus == "REVIEWED"
                  ? "✓"
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
                {printData.qualityRelease[0].details[1].qaName || "NA"}
                <br></br>
                {moment(printData.qualityRelease[0].details[1].qaDate).format(
                  "DD/MM/YYYY - HH:mm"
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
                {printData.qualityRelease[0].details[1].qaStatus ==
                "NOT REVIEWED"
                  ? "✕"
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
                {printData.qualityRelease[0].details[2].qaStatus == "REVIEWED"
                  ? "✓"
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
                {printData.qualityRelease[0].details[2].qaName || "NA"}
                <br></br>
                {moment(printData.qualityRelease[0].details[2].qaDate).format(
                  "DD/MM/YYYY - HH:mm"
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
                {printData.qualityRelease[0].details[2].qaStatus ==
                "NOT REVIEWED"
                  ? "✕"
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
                {printData.qualityRelease[0].details[3].qaStatus == "REVIEWED"
                  ? "✓"
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
                {printData.qualityRelease[0].details[3].qaName || "NA"}
                <br></br>
                {moment(printData.qualityRelease[0].details[3].qaDate).format(
                  "DD/MM/YYYY - HH:mm"
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
                {printData.qualityRelease[0].details[3].qaStatus ==
                "NOT REVIEWED"
                  ? "✕"
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
                Batch Release Checklist (QC & QA Report)
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
                {" "}
                {printData.qualityRelease[0].details[4].qaStatus == "REVIEWED"
                  ? "✓"
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
                {printData.qualityRelease[0].details[4].qaName || "NA"}
                <br></br>
                {moment(printData.qualityRelease[0].details[4].qaDate).format(
                  "DD/MM/YYYY - HH:mm"
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
                {printData.qualityRelease[0].details[4].qaStatus ==
                "NOT REVIEWED"
                  ? "✕"
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
                6
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
                {" "}
                {printData.qualityRelease[0].details[5].qaStatus == "REVIEWED"
                  ? "✓"
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
                {printData.qualityRelease[0].details[5].qaName || "NA"}
                <br></br>
                {moment(printData.qualityRelease[0].details[5].qaDate).format(
                  "DD/MM/YYYY - HH:mm"
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
                {printData.qualityRelease[0].details[5].qaStatus ==
                "NOT REVIEWED"
                  ? "✕"
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
                (PH-QAD01-D-43) and documented as per the Format:
                PH-QAD01/F-047.
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
                {printData.productRelease[0].checkerName || "NA"}
              </td>
              <td
                colspan="8"
                style={{
                  textAlign: "left",
                  fontSize: "10pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printData.productRelease[0].approverName || "NA"}
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
                {printData.productRelease[0].checkerName || "NA"}
                <br></br>
                {moment(printData.productRelease[0].checkerDate).format(
                  "DD/MM/YYYY - HH:mm"
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
                {printData.productRelease[0].approverName || "NA"}
                <br></br>
                {moment(printData.productRelease[0].approverDate).format(
                  "DD/MM/YYYY - HH:mm"
                ) || "NA"}
              </td>
            </tr>

            <br></br>

            {bmrReworkList && bmrReworkList.length > 0 && (
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
                    {bmrReworkList && bmrReworkList.length > 0
                      ? moment(bmrReworkList[0].reworkDate).format(
                          "DD/MM/YYYY - HH:mm"
                        )
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
                    {bmrReworkList && bmrReworkList.length > 0
                      ? bmrReworkList[0].departmentName
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
                    {bmrReworkList && bmrReworkList.length > 0
                      ? bmrReworkList[0].machineName
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
                    {bmrReworkList && bmrReworkList.length > 0
                      ? bmrReworkList[0].bmrNumber
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
                    {bmrReworkList && bmrReworkList.length > 0
                      ? bmrReworkList[0].lotNumber
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
                    {bmrReworkList && bmrReworkList.length > 0
                      ? bmrReworkList[0].reworkReason
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
                    {bmrReworkList && bmrReworkList.length > 0
                      ? bmrReworkList[0].reworkQuantity
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
                    {bmrReworkList && bmrReworkList.length > 0
                      ? bmrReworkList[0].referenceNcNumber
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
                    {bmrReworkList && bmrReworkList.length > 0
                      ? bmrReworkList[0].actionTaken
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
          {/* // */}
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
        </table>

        {/* print layout ended here */}
      </div>
      {/* section to print */}
    </div>
  );
};

export default CottonBuds_BMR;
