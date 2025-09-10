/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Tabs,
  Modal,
  Spin,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
  Radio,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader";
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import API from "../baseUrl.json";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import TextArea from "antd/es/input/TextArea";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const PadPunching_f03 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date, shift, machineName, firstOrderNumber, secondOrderNumber } = state || {};
  console.log("date, shift, machineName, firstOrderNumber, secondOrderNumber ", date, shift, machineName, firstOrderNumber, secondOrderNumber)
  const token = localStorage.getItem("token");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const roleauth = localStorage.getItem("role");
  const [productChangeOverRecord, setproductChangeOverRecord] = useState("");
  const [ProductId, setProductId] = useState("");
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [time, setTime] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [orderProductDetails, setorderProductDetails] = useState("");
  const [orderProductDetails2, setorderProductDetails2] = useState("");
  const [ScreenOneRecord, setScreenOneRecord] = useState([]);
  const [ScreenOneRecord2, setScreenOneRecord2] = useState([]);
  const [maintainedBy, setmaintainedBy] = useState("");
  const disable =
    (role == "ROLE_SUPERVISOR" &&
      productChangeOverRecord?.supervisor_status == "SUPERVISOR_APPROVED" &&
      productChangeOverRecord?.hod_status !== "HOD_REJECTED" &&
      productChangeOverRecord?.qa_status !== "QA_REJECTED") ||
    role == "ROLE_HOD" ||
    role == "ROLE_QA" ||
    role == "ROLE_DESIGNEE";
  const handleKeyDown2 = (e) => {
    const isAlphanumeric = /^[a-zA-Z0-9.]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const canDisplayButtons = () => {
    if (role === "ROLE_SUPERVISOR") {
      if (
        productChangeOverRecord &&
        productChangeOverRecord.supervisor_status === "SUPERVISOR_APPROVED" &&
        productChangeOverRecord.qa_status !== "QA_REJECTED" &&
        productChangeOverRecord.hod_status !== "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (
        productChangeOverRecord?.hod_status == "HOD_APPROVED" ||
        productChangeOverRecord?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else if (role == "ROLE_QA") {
      if (
        productChangeOverRecord?.hod_status == "HOD_REJECTED" &&
        productChangeOverRecord?.qa_status == "QA_APPROVED"
      ) {
        return "block";
      }
      if (
        productChangeOverRecord?.qa_status == "QA_APPROVED" ||
        productChangeOverRecord?.qa_status == "QA_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
    // else {
    //   if (
    //     productChangeOverRecord?.qa_status == "QA_APPROVED" ||
    //     productChangeOverRecord?.qa_status == "QA_REJECTED"
    //   ) {
    //     return "none";
    //   }
    //   return "block";
    // }
  };
  const canDisplayButton2 = () => {
    if (role == "ROLE_SUPERVISOR") {
      if (productChangeOverRecord?.supervisor_status == "SUPERVISOR_APPROVED") {
        return "none";
      }
    } else if (
      role == "ROLE_QA" ||
      role == "ROLE_HOD" ||
      role == "ROLE_DESIGNEE"
    ) {
      return "none";
    }
  };

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDateHeader = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const handleBulkYes = () => { };
  const handleBulkNo = () => { };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = productChangeOverRecord?.supervisor_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          console.log("Response:", res.data);
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [productChangeOverRecord,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = productChangeOverRecord?.hod_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          console.log("Response:", res.data);
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [productChangeOverRecord,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = productChangeOverRecord?.qa_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          console.log("Response:", res.data);
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [productChangeOverRecord,API.prodUrl, token]);

  // tab 1
  const [ProductNameRP, setProductNameRP] = useState("");
  const [PoNoRP, setPoNoRP] = useState("");
  const [JulianRP, setJulianRP] = useState("");
  const [GSMRP, setGSMRP] = useState("");
  const [PatternRP, setPatternRP] = useState("");
  const [PadsPerBagRP, setPadsPerBagRP] = useState("");
  const [EdgsRP, setEdgsRP] = useState("");

  const [ProductNameRP2, setProductNameRP2] = useState("");
  const [PoNoRP2, setPoNoRP2] = useState("");
  const [JulianRP2, setJulianRP2] = useState("");
  const [JulianCO2, setJulianCO2] = useState("");
  const [GSMRP2, setGSMRP2] = useState("");
  const [PatternRP2, setPatternRP2] = useState("");
  const [PadsPerBagRP2, setPadsPerBagRP2] = useState("");
  const [EdgsRP2, setEdgsRP2] = useState("");

  const [PdsRP, setPdsRP] = useState("");
  // const [JulianCO, setJulianCO] = useState("");
  const [PdsCO, setPdsCO] = useState("");

  const getJulianDate = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const getShift = (hours) => {
    if (hours >= 6 && hours < 14) return "1";
    if (hours >= 14 && hours < 22) return "2";
    return "3";
  };

  // key 1 onchange functions
  const handlePDSCO = (value) => {
    setPdsCO(value);
  };
  const handlePdsRP = (value) => {
    setPdsRP(value);
  };
  // const handleJulianCO = (value) => {
  //   setJulianCO(value);
  // };
  const convertTo24HourFormat = (timeString) => {
    if (timeString.includes("AM") || timeString.includes("PM")) {
      const [time, modifier] = timeString.split(" ");
      let [hours, minutes] = time.split(":");
      if (modifier === "PM" && hours !== "12") {
        hours = parseInt(hours, 10) + 12;
      }
      if (modifier === "AM" && hours === "12") {
        hours = "00";
      }
      return `${String(hours).padStart(2, "0")}:${minutes}`;
    }
    return timeString;
  };

  const handleTimeChange = (event) => {
    const value = event.target.value;
    setTime(value);
  };

  // useEffect(() => {
  //   const now = new Date();
  //   const hours = String(now.getHours()).padStart(2, "0");
  //   const minutes = String(now.getMinutes()).padStart(2, "0");
  //   setTime(`${hours}:${minutes}`);
  // }, []);

  // useEffect(() => {
  const currentDate = new Date(date);
  const datePart = String(currentDate.getDate()).padStart(2, "0");
  const julianPart = String(getJulianDate(currentDate)).padStart(3, "0");
  const yearPart = String(currentDate.getFullYear()).slice(-2);

  // Map shift values
  const shiftMapping = {
    I: "1",
    II: "2",
    III: "3",
  };

  const shiftPart = shiftMapping[shift] || shift;
  console.log(
    "(`${yearPart}${julianPart}${shiftPart}`",
    `${yearPart}${julianPart}${shiftPart}`
  );

  // setJulianCO2(`${yearPart}${julianPart}${shiftPart}`);

  // }, [date, shift]);

  // Tab 2

  const [InnerBag, setInnerBag] = useState("");
  const [OuterBag, setOuterBag] = useState("");
  const [InnerCarton, setInnerCarton] = useState("");
  const [OuterCarton, setOuterCarton] = useState("");
  const [FleeceRoll, setFleeceRoll] = useState("");
  const [InnerBagRemarks, setInnerBagRemarks] = useState("");
  const [OuterBagRemarks, setOuterBagRemarks] = useState("");
  const [InnerCartonRemarks, setInnerCartonRemarks] = useState("");
  const [OuterCartonRemarks, setOuterCartonRemarks] = useState("");
  const [FleeceRollRemarks, setFleeceRollRemarks] = useState("");

  const [TollChangeRequired, setTollChangeRequiredP] = useState("");
  const [TollChangeDone, setTollChangeDone] = useState("");
  const [MachineSetting, setMachineSetting] = useState("");
  const [TollChangeRequiredRemarks, setTollChangeRequiredRemarks] =
    useState("");
  const [TollChangeDoneRemarks, setTollChangeDoneRemarks] = useState("");
  const [MachineSettingRemarks, setMachineSettingRemarks] = useState("");

  // key 2 onchange functions
  const handleInnerBag = (e) => {
    setInnerBag(e.target.value);
  };
  const handleOuterBag = (e) => {
    setOuterBag(e.target.value);
  };
  const handleInnerCarton = (e) => {
    setInnerCarton(e.target.value);
  };
  const handleOuterCarton = (e) => {
    setOuterCarton(e.target.value);
  };
  const handleFleeceRoll = (e) => {
    setFleeceRoll(e.target.value);
  };

  const handleTollChangeRequired = (e) => {
    setTollChangeRequiredP(e.target.value);
  };
  const handleTollChangeDone = (e) => {
    setTollChangeDone(e.target.value);
  };
  const handleMachineSetting = (e) => {
    setMachineSetting(e.target.value);
  };

  // Tab 3

  const [TeachingOfMetal, setTeachingOfMetal] = useState("");
  const [FunctioningCheck, setFunctioningCheck] = useState("");
  const [ProductionReadyToStart, setProductionReadyToStart] = useState("");
  const [QuantityVerification, setQuantityVerification] = useState("");
  const [TeachingOfMetalRemarks, setTeachingOfMetalRemarks] = useState("");
  const [FunctioningCheckRemarks, setFunctioningCheckRemarks] = useState("");
  const [ProductionReadyToStartRemarks, setProductionReadyToStartRemarks] =
    useState("");
  const [QuantityVerificationRemarks, setQuantityVerificationRemarks] =
    useState("");

  // key 3 onchange functions
  const handleTeachingOfMetal = (e) => {
    setTeachingOfMetal(e.target.value);
  };
  const handleFunctioningCheck = (e) => {
    setFunctioningCheck(e.target.value);
  };
  const handleProductionReadyToStart = (e) => {
    setProductionReadyToStart(e.target.value);
  };
  const handleQuantityVerification = (e) => {
    setQuantityVerification(e.target.value);
  };
  const handleManintedBy = (e) => {
    setmaintainedBy(e.target.value);
  };

  // Display Button Based on Role Status

  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/padpunching/orderNoList`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

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
  }, [token]);

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
  useEffect(() => {
    ScreenOneApi(firstOrderNumber)
    ScreenOneApi2(secondOrderNumber)
  }, [])
  const ScreenOneApi = async (value) => {
    try {
      setorderProductDetails(value);
      const formattedShift = convertShift(shift);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/padpunching/packingDetailsRunning?date=${date}&shift=${formattedShift}&orderNo=${value}&machineName=${machineName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setScreenOneRecord(response.data);
      setProductNameRP(response.data[0].productName);
      setPoNoRP(response.data[0].poNo);
      // setJulianRP(response.data[0].julianDay);
      setGSMRP(response.data[0].gsm);
      setPatternRP(response.data[0].pattern);
      setPadsPerBagRP(response.data[0].padsPerBag);
      setEdgsRP(response.data[0].edge);

      console.log("screen tow details", response.data[0].ShaftNo);
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      // message.error(error.response.data.message);
    } finally {
    }
  };

  const ScreenOneApi2 = async (value) => {
    try {
      setorderProductDetails2(value);
      const formattedShift = convertShift(shift);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/padpunching/packingDetailsRunning?date=${date}&shift=${formattedShift}&orderNo=${value}&machineName=${machineName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setScreenOneRecord2(response.data);
      setProductNameRP2(response.data[0].productName);
      setPoNoRP2(response.data[0].poNo);
      // setJulianRP2(response.data[0].julianDay);
      setGSMRP2(response.data[0].gsm);
      setPatternRP2(response.data[0].pattern);
      setPadsPerBagRP2(response.data[0].padsPerBag);
      setEdgsRP2(response.data[0].edge);

      console.log("screen tow details", response.data[0].ShaftNo);
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      // message.error(error.response.data.message);
    } finally {
    }
  };
  // Save & Submit Api
  const handleSave = async () => {
    try {
      await saveProductChangeOverRecord();
    } catch (error) {
      console.error("Error saving Product ChangeOver Record :", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await submitProductChangeOverRecord();
    } catch (error) {
      console.error("Error submitting Product ChangeOver Record ", error);
    }
  };

  const saveProductChangeOverRecord = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        productId: ProductId,
        date: date,
        shift: shift,
        time: time,
        machineName: machineName,
        ccpMaintainedBy: maintainedBy,
        formatNo: "PH-PRD03/F-003",
        formatName: "Product Change Over",
        revisionNumber: "01",
        sopNumber: "PH-PRD04-D-03",
        productName1: ProductNameRP,
        orderNo1: orderProductDetails,
        poNumber1: PoNoRP,
        lotNo1: JulianRP || "",
        fleezeGSM1: GSMRP,
        fleezePattern1: PatternRP,
        packSize1: PadsPerBagRP,
        edgeCondition1: EdgsRP,
        pdsNumber1: PdsRP,

        productName2: ProductNameRP2,
        orderNo2: orderProductDetails2,
        poNumber2: PoNoRP2,
        lotNo2: JulianRP2 || `${yearPart}${julianPart}${shiftPart}`,
        fleezeGSM2: GSMRP2,
        fleezePattern2: PatternRP2,
        packSize2: PadsPerBagRP2,
        edgeCondition2: EdgsRP2,
        pdsNumber2: PdsCO,

        innerBag: InnerBag,
        outerBag: OuterBag,
        innerCarton: InnerCarton,
        outerCarton: OuterCarton,
        fleezeRoll: FleeceRoll,
        innerBagRemarks: InnerBagRemarks,
        outerBagRemarks: OuterBagRemarks,
        innerCartonRemarks: InnerCartonRemarks,
        outerCartonRemarks: OuterCartonRemarks,
        fleezeRollRemarks: FleeceRollRemarks,
        toolChangeRequired: TollChangeRequired,
        toolChangeDone: TollChangeDone,
        machineSetting: MachineSetting,
        toolChangeRequiredRemarks: TollChangeRequiredRemarks,
        toolChangeDoneRemarks: TollChangeDoneRemarks,
        machineSettingRemarks: MachineSettingRemarks,
        metalDetectorTeach: TeachingOfMetal,
        metalDetectorCheck: FunctioningCheck,
        metalDetectorTeachRemarks: TeachingOfMetalRemarks,
        metalDetectorCheckRemarks: FunctioningCheckRemarks,
        productionCheck: ProductionReadyToStart,
        qualityVerification: QuantityVerification,
        productionCheckRemarks: ProductionReadyToStartRemarks,
        qualityVerificationRemarks: QuantityVerificationRemarks,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/punching/saveProductChangeOverF03`,
        payload,
        { headers }
      );

      console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/PadPunching/F-03/Summary");
      }, 1500);
      message.success(
        " saving Product ChangeOver Record  Saved Successfully.."
      );
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save saving Product ChangeOver Record  !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const submitProductChangeOverRecord = async () => {
    setSubmitLoading(true);
    if (maintainedBy == "" || maintainedBy == null) {
      message.warning("Maintained By Required for Submittion !");
      setSubmitLoading(false);
      return;
    }
    if (time == "" || time == null) {
      message.warning("Time is Required for Submittion !");
      setSubmitLoading(false);
      return;
    }
    try {
      const payload = {
        productId: ProductId,
        date: date,
        shift: shift,
        time: time,
        machineName: machineName,
        ccpMaintainedBy: maintainedBy,
        formatNo: "PH-PRD03/F-003",
        formatName: "Product Change Over",
        revisionNumber: "01",
        sopNumber: "PH-PRD04-D-03",
        productName1: ProductNameRP,
        orderNo1: orderProductDetails,
        poNumber1: PoNoRP,
        lotNo1: JulianRP || "",
        fleezeGSM1: GSMRP,
        fleezePattern1: PatternRP,
        packSize1: PadsPerBagRP,
        edgeCondition1: EdgsRP,
        pdsNumber1: PdsRP,
        productName2: ProductNameRP2,
        orderNo2: orderProductDetails2,
        poNumber2: PoNoRP2,
        lotNo2: JulianRP2 || `${yearPart}${julianPart}${shiftPart}`,

        fleezeGSM2: GSMRP2,
        fleezePattern2: PatternRP2,
        packSize2: PadsPerBagRP2,
        edgeCondition2: EdgsRP2,
        pdsNumber2: PdsCO,

        innerBag: InnerBag,
        outerBag: OuterBag,
        innerCarton: InnerCarton,
        outerCarton: OuterCarton,
        fleezeRoll: FleeceRoll,
        innerBagRemarks: InnerBagRemarks,
        outerBagRemarks: OuterBagRemarks,
        innerCartonRemarks: InnerCartonRemarks,
        outerCartonRemarks: OuterCartonRemarks,
        fleezeRollRemarks: FleeceRollRemarks,
        toolChangeRequired: TollChangeRequired,
        toolChangeDone: TollChangeDone,
        machineSetting: MachineSetting,
        toolChangeRequiredRemarks: TollChangeRequiredRemarks,
        toolChangeDoneRemarks: TollChangeDoneRemarks,
        machineSettingRemarks: MachineSettingRemarks,
        metalDetectorTeach: TeachingOfMetal,
        metalDetectorCheck: FunctioningCheck,
        metalDetectorTeachRemarks: TeachingOfMetalRemarks,
        metalDetectorCheckRemarks: FunctioningCheckRemarks,
        productionCheck: ProductionReadyToStart,
        qualityVerification: QuantityVerification,
        productionCheckRemarks: ProductionReadyToStartRemarks,
        qualityVerificationRemarks: QuantityVerificationRemarks,
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/punching/submitProductChangeOverF03`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/PadPunching/F-03/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to submit Product Change Over Record !!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/PadPunching/F-03/Summary");
  };

  useEffect(() => {
    fetchDetailsByParams();
  }, []);
  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/punching/approveProductChangeOverF03`,
        {
          id: ProductId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/PadPunching/F-03/Summary");
      })
      .catch((err) => {
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setSubmitLoading(false);
      return;
    }
    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/punching/approveProductChangeOverF03`,
        {
          id: ProductId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/PadPunching/F-03/Summary");
      })
      .catch((err) => {
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const fetchDetailsByParams = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/punching/getproductChangeOverF03?date=${date}&shift=${shift}&machine=${machineName}&order1=${firstOrderNumber}&order2=${secondOrderNumber}
`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response (details based on date)", response.data);
      setemptyarraycheck(response.data.length);
      setproductChangeOverRecord(response.data);

      if (response.data && response.data.message !== "No data") {
        const data = response.data;
        setProductNameRP(response.data.productName1 || "NA");
        setPoNoRP(response.data.poNumber1 || "NA");
        setJulianRP(response.data.lotNo1 || "NA");
        setGSMRP(response.data.fleezeGSM1 || "NA");
        setPatternRP(response.data.fleezePattern1 || "NA");
        setPadsPerBagRP(response.data.packSize1 || "NA");
        setEdgsRP(response.data.edgeCondition1 || "NA");
        setPdsRP(response.data.pdsNumber1 || "NA");

        setProductNameRP2(response.data.productName2 || "NA");
        setPoNoRP2(response.data.poNumber2 || "NA");
        console.log("response.data.lotNo2", response.data.lotNo2);
        setJulianRP2(response.data.lotNo2);
        setGSMRP2(response.data.fleezeGSM2 || "NA");
        setPatternRP2(response.data.fleezePattern2 || "NA");
        setPadsPerBagRP2(response.data.packSize2 || "NA");
        setEdgsRP2(response.data.edgeCondition2 || "NA");
        // setPdsRP2(response.data.pdsNumber1 ||'NA');

        // setJulianCO(response.data.lotNo2 || "NA");
        setPdsCO(response.data.pdsNumber2 || "NA");
        setorderProductDetails(response.data.orderNo1);
        setorderProductDetails2(response.data.orderNo2);
        setInnerBag(response.data.innerBag || "NA");
        setOuterBag(response.data.outerBag || "NA");
        setInnerCarton(response.data.innerCarton || "NA");
        setOuterCarton(response.data.outerCarton || "NA");
        setFleeceRoll(response.data.fleezeRoll || "NA");
        setInnerBagRemarks(response.data.innerBagRemarks || "NA");
        setOuterBagRemarks(response.data.outerBagRemarks || "NA");
        setInnerCartonRemarks(response.data.innerCartonRemarks || "NA");
        setOuterCartonRemarks(response.data.outerCartonRemarks || "NA");
        setFleeceRollRemarks(response.data.fleezeRollRemarks || "NA");
        setTollChangeRequiredP(response.data.toolChangeRequired || "NA");
        setTollChangeDone(response.data.toolChangeDone);
        setMachineSetting(response.data.machineSetting || "NA");
        setTollChangeRequiredRemarks(
          response.data.toolChangeRequiredRemarks || "NA"
        );
        setTollChangeDoneRemarks(response.data.toolChangeDoneRemarks || "NA");
        setMachineSettingRemarks(response.data.machineSettingRemarks || "NA");

        setTeachingOfMetal(response.data.metalDetectorTeach || "NA");
        setFunctioningCheck(response.data.metalDetectorCheck || "NA");
        setProductionReadyToStart(response.data.productionCheck || "NA");
        setQuantityVerification(response.data.qualityVerification || "NA");
        setTeachingOfMetalRemarks(
          response.data.metalDetectorTeachRemarks || "NA"
        );
        setFunctioningCheckRemarks(
          response.data.metalDetectorCheckRemarks || "NA"
        );
        setProductionReadyToStartRemarks(
          response.data.productionCheckRemarks || "NA"
        );
        setQuantityVerificationRemarks(
          response.data.qualityVerificationRemarks || "NA"
        );
        setmaintainedBy(response.data.ccpMaintainedBy || "NA");
        setProductId(response.data.productId);
        setTime(response.data.time);

        if (
          ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
            response.data.qa_status !== "QA_APPROVED")
        ) {
          message.error("QA Yet Not Approved");
          setTimeout(() => {
            navigate("/Precot/PadPunching/F-03/Summary");
          }, 1500);
        }
        if (
          (role == "ROLE_QA" &&
            response.data.supervisor_status !== "SUPERVISOR_APPROVED")

        ) {
          message.error("Supervisor Yet Not Approved");
          setTimeout(() => {
            navigate("/Precot/PadPunching/F-03/Summary");
          }, 1500);
        }

      }
    } catch (error) {
      // message.error(error.message);
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Product Details</p>,
      children: (
        <div>
          <table>
            <tr>
              <th colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                Sr. No.
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Check Points
              </th>
              <th colSpan="30">Running Production</th>
              <th colSpan="25">Change Over To</th>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                1
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Product Name
              </td>
              <td colSpan="30">
                <Input className="inp-new" value={ProductNameRP} />
              </td>
              <td colSpan="25">
                <Input className="inp-new" value={ProductNameRP2} />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                2
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                PO No.
              </td>
              <td colSpan="30">
                <Input className="inp-new" value={PoNoRP} />
              </td>
              <td colSpan="25">
                <Input className="inp-new" value={PoNoRP2} />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                3
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Order No./BMR No.
              </td>
              <td colSpan="30" style={{ height: "30px", textAlign: "center" }}>
                <span style={{ fontSize: "15px" }}>{firstOrderNumber}</span>
              </td>
              <td colSpan="25" style={{ height: "30px", textAlign: "center" }}>
                <span style={{ fontSize: "15px" }}> {secondOrderNumber}</span>
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                4
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Lot No./Julian Date
              </td>
              <td colSpan="30">
                <Input
                  className="inp-new"
                  value={JulianRP}
                  onChange={(e) => setJulianRP(e.target.value)}
                  disabled={disable} />
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={JulianRP2 || `${yearPart}${julianPart}${shiftPart}`}
                  onChange={(e) => setJulianRP2(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                5
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Fleece GSM
              </td>
              <td colSpan="30">
                <Input className="inp-new" value={GSMRP} />
              </td>
              <td colSpan="25">
                <Input className="inp-new" value={GSMRP2} />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                6
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Fleece Pattern
              </td>
              <td colSpan="30">
                <Input className="inp-new" value={PatternRP} />
              </td>
              <td colSpan="25">
                <Input className="inp-new" value={PatternRP2} />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                7
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Pack Size (Pads per bag)
              </td>
              <td colSpan="30">
                <Input className="inp-new" value={PadsPerBagRP} />
              </td>
              <td colSpan="25">
                <Input className="inp-new" value={PadsPerBagRP2} />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                8
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Edge Condition
              </td>
              <td colSpan="30">
                <Input className="inp-new" value={EdgsRP} />
              </td>
              <td colSpan="25">
                <Input className="inp-new" value={EdgsRP2} />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                9
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                PDS No.
              </td>
              <td colSpan="30">
                <input
                  className="inp-new"
                  value={PdsRP}
                  onChange={(e) => handlePdsRP(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={PdsCO}
                  onChange={(e) => handlePDSCO(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
          </table>
        </div >
      ),
    },
    {
      key: "2",
      label: <p>Removal of Packaging Materials of Running Product</p>,
      children: (
        <div>
          {/* colums = 100 */}
          <table>
            <tr>
              <th colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                Sr. No.
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Packaging Materials
              </th>
              <th colSpan="30">Removed (Yes / No)</th>
              <th colSpan="25">Remark</th>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                1
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Inner Bag
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleInnerBag}
                  value={InnerBag}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={InnerBagRemarks}
                  onChange={(e) => setInnerBagRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                2
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Outer Bag
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleOuterBag}
                  value={OuterBag}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={OuterBagRemarks}
                  onChange={(e) => setOuterBagRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                3
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Inner Carton / Dispenser Box{" "}
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleInnerCarton}
                  value={InnerCarton}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={InnerCartonRemarks}
                  onChange={(e) => setInnerCartonRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                4
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Outer Carton
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleOuterCarton}
                  value={OuterCarton}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={OuterCartonRemarks}
                  onChange={(e) => setOuterCartonRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                5
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Fleece Roll
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleFleeceRoll}
                  value={FleeceRoll}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={FleeceRollRemarks}
                  onChange={(e) => setFleeceRollRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "30px", border: "none" }}>
                {" "}
                C.Tool / Dies & Machine Setting:
              </th>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                Sr. No.
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Activity
              </th>
              <th colSpan="30">Completed (Yes / No)</th>
              <th colSpan="25">Remark</th>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                1
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Tool Change required
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleTollChangeRequired}
                  value={TollChangeRequired}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={TollChangeRequiredRemarks}
                  onChange={(e) => setTollChangeRequiredRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                2
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Tool Change Done
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleTollChangeDone}
                  value={TollChangeDone}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={TollChangeDoneRemarks}
                  onChange={(e) => setTollChangeDoneRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                3
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Machine Setting
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleMachineSetting}
                  value={MachineSetting}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={MachineSettingRemarks}
                  onChange={(e) => setMachineSettingRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>CCP Setting</p>,
      children: (
        <div>
          {/* colums = 100 */}
          <table>
            <tr>
              <th colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                Sr. No.
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Activity
              </th>
              <th colSpan="30">Completed (Yes / No)</th>
              <th colSpan="25">Remark</th>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                1
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Teaching of Metal Detector
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleTeachingOfMetal}
                  value={TeachingOfMetal}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={TeachingOfMetalRemarks}
                  onChange={(e) => setTeachingOfMetalRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                2
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Functioning Check of Metal Detector
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleFunctioningCheck}
                  value={FunctioningCheck}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={FunctioningCheckRemarks}
                  onChange={(e) => setFunctioningCheckRemarks(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "30px", border: "none" }}>
                {" "}
                E. Production Start:
              </th>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                Sr. No.
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Activity
              </th>
              <th colSpan="30">Completed (Yes / No)</th>
              <th colSpan="25">Remark</th>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                1
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                Production ready to start
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleProductionReadyToStart}
                  value={ProductionReadyToStart}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={ProductionReadyToStartRemarks}
                  onChange={(e) =>
                    setProductionReadyToStartRemarks(e.target.value)
                  }
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "30px", textAlign: "center" }}>
                2
              </td>
              <td colSpan="40" style={{ textAlign: "center" }}>
                First Piece Inspection / Quality Verification
              </td>
              <td colSpan="30" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleQuantityVerification}
                  value={QuantityVerification}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="25">
                <input
                  className="inp-new"
                  value={QuantityVerificationRemarks}
                  onChange={(e) =>
                    setQuantityVerificationRemarks(e.target.value)
                  }
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "4",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              {/* <td colSpan="34" style={{ height: "35px", textAlign: "center" }}>Performed by Operator</td> */}
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                CCP Maintained by
              </td>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                Production Supervisor Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center" }}>
                Verified by QA Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center" }}>
                HOD/ Designee Sign & Date
              </td>
            </tr>
            <tr>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                <Input
                  placeholder="Maintained By"
                  value={maintainedBy}
                  onChange={handleManintedBy}
                  disabled={disable}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    textAlign: "center",
                  }}
                />
              </td>

              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {productChangeOverRecord?.supervisor_status ===
                  "SUPERVISOR_APPROVED" && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          {" "}
                          <div>{productChangeOverRecord?.supervisor_sign}</div>
                          <div>
                            {formattedDate(
                              productChangeOverRecord?.supervisor_submit_on
                            )}
                          </div>
                        </div>
                        {getImage1 && (
                          <img
                            src={getImage1}
                            alt="Supervisor Sign"
                            style={{
                              width: "60px",
                              height: "60px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "center",
                            }}
                          />
                        )}
                      </div>
                      {/* <div>Signature & Date</div> */}
                    </>
                  )}
              </td>
              <td
                colSpan="50"
                style={{
                  textAlign: "center",
                  // verticalAlign: "bottom"
                }}
              >
                {(productChangeOverRecord?.qa_status === "QA_REJECTED" ||
                  productChangeOverRecord?.qa_status === "QA_APPROVED") && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          {" "}
                          <div>{productChangeOverRecord?.qa_sign}</div>
                          <div>
                            {formattedDate(productChangeOverRecord?.qa_submit_on)}
                          </div>
                        </div>
                        {getImage3 && (
                          <img
                            src={getImage3}
                            alt="HOD Sign"
                            style={{
                              width: "60px",
                              height: "60px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                      </div>{" "}
                    </>
                  )}
              </td>
              <td
                colSpan="50"
                style={{
                  textAlign: "center",
                  // verticalAlign: "bottom"
                }}
              >
                {(productChangeOverRecord?.hod_status === "HOD_REJECTED" ||
                  productChangeOverRecord?.hod_status === "HOD_APPROVED") && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          {" "}
                          <div>{productChangeOverRecord?.hod_sign}</div>
                          <div>
                            {formattedDate(
                              productChangeOverRecord?.hod_submit_on
                            )}
                          </div>
                        </div>
                        {getImage2 && (
                          <img
                            src={getImage2}
                            alt="HOD Sign"
                            style={{
                              width: "60px",
                              height: "60px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                      </div>{" "}
                    </>
                  )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="Product Change Over"
        formatNo="PH-PRD03/F-003"
        sopNo="PH-PRD04-D-03"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
          </Button>,

          role === "ROLE_HOD" ||
            role === "ROLE_QA" ||
            role === "ROLE_QC" ||
            role === "ROLE_DESIGNEE" ? (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                onClick={handleApprove}
                shape="round"
                icon={<img src={approveIcon} alt="Approve Icon" />}
              >
                &nbsp;Approve
              </Button>
              <Button
                loading={submitLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                icon={<img src={rejectIcon} alt="Reject Icon" />}
                onClick={handleRejectModal}
                shape="round"
              >
                &nbsp;Reject
              </Button>
            </>
          ) : (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButton2(),
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                loading={submitLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ),

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiLock color="#00308F" />}
            onClick={() => {
              if (confirm("Are you sure want to logout")) {
                localStorage.removeItem("token");
                navigate("/Precot");
              }
            }}
          >
            Logout
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

      {/* date row */}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
          marginLeft: "10px",
        }}
      >
        <Input
          addonBefore="Date:"
          placeholder="Date"
          value={formattedDateHeader(date)}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Shift:"
          placeholder="Shift"
          value={shift}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Machine Name:"
          placeholder="Machine Name"
          value={machineName}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          onChange={handleTimeChange}
          type="time"
          value={time}
          size="small"
          style={{ width: "20%", height: "35px" }}
          disabled={disable}
        />
      </div>

      <Modal
        title="Reject"
        open={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        destroyOnClose={true}
        showSearch
        footer={[
          <Button
            key="submit"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            onClick={handleReject}
          >
            Submit
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
          <label style={{ marginRight: "8px" }}>Remarks:</label>
          <TextArea
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>

      <Tabs
        defaultActiveKey="1"
        items={items}
        // onChange={onChange}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />
    </div>
  );
};

export default PadPunching_f03;
