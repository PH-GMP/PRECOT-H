/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, Input, Row, Select, Tabs, Modal, Spin, message, Tooltip, Menu, Avatar, Drawer } from "antd";
import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import BleachingHeader from '../Components/BleachingHeader';
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from 'react-router-dom';
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from 'moment';
import API from "../baseUrl.json";



// import gif from '../Assests/gif.gif'
import logo from "../Assests/logo.png";
// import  './sutharsana.css';

import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Spunlace_f06 = () => {
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [ORDER_No, SetORDER_No] = useState('');
  const [open, setOpen] = useState(false);
  const [STD_WIDTH, SetSTD_WIDTH] = useState('');
  const [MIXING, SetMIXING] = useState('');
  const [MATERIAL_CODE, SetMATERIAL_CODE] = useState('');
  const [STD_ROLL_DIA, SetSTD_ROLL_DIA] = useState('');
  const [PRODUCT_NAME, SetPRODUCT_NAME] = useState('');
  const [PATTERN, SetPATTERN] = useState('');
  const [STD_THICKNESS, SetSTD_THICKNESS] = useState('');
  const [STD_GSM, SetSTD_GSM] = useState('');
  const [SHAFT_No, SetSHAFT_No] = useState('');
  const [ROLL_No, SetROLL_No] = useState('');
  const [LENGTH_MTRS, SetLENGTH_MTRS] = useState('');
  const [WIDTH_MM, SetWIDTH_MM] = useState('');
  const [NET_WT, SetNET_WT] = useState('');
  const [ROLL_GSM, SetROLL_GSM] = useState('');
  const [MOISTURE, SetMOISTURE] = useState('');

  const [REMARKS, SetREMARKS] = useState('');
  const [orderDetails, SetOrderDetails] = useState([]);
  const [getOrderDetails, SetGetOrderDetails] = useState([]);
  const [NewSave, setNewSave] = useState(false);
   
const initial=useRef(false);


  const [date, setDate] = useState('')
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState("");

  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  // console.log(roleauth);

  const [modalData, setmodalData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [SupervisorSign, setSupervisorSign] = useState('');
  const [HodSign, setHodSign] = useState('');
  const [SupervisorSubmitOn, setSupervisorSubmitOn] = useState();
  const [HodSubmitOn, setHodSubmitOn] = useState('');
  const [OperatorSign, setOperatorSign] = useState('');
  const [OperatorSubmitOn, setOperatorSubmitOn] = useState('');
  const [Operatorstatus, setOperatorstatus] = useState('');
  const [SupervisorStatus, setSupervisorStatus] = useState('');
  const [HodStatus, setHodStatus] = useState('');
  const [ReportDetails, setReportDetails] = useState([]);
  const [emptyarraycheck, setemptyarraycheck] = useState("");


  // console.log("supervisor", selectedRow?.operator_status)

  const roleBase = localStorage.getItem("role")


  const [getImage1, setGetImage1] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow.operator_sign;
    if (username) {
      // console.log("usernameparams", username);

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
  }, [selectedRow,API.prodUrl]);

  // // console.log("get image", getImage);


  const [getImage3, setGetImage3] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.supervisor_sign;
    if (username) {
      // console.log("usernameparams", username);

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
  }, [selectedRow,API.prodUrl]);


  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.hod_sign;
    if (username) {
      // console.log("usernameparams", username);

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
  }, [selectedRow,API.prodUrl]);


  const canEdit = () => {
    if (roleauth === "ROLE_OPERATOR") {
      return !(
        selectedRow &&
        selectedRow?.operator_status === "OPERATOR_APPROVED" &&
        selectedRow?.supervisor_status !== "SUPERVISOR_REJECTED" &&
        selectedRow?.hod_status !== "HOD_REJECTED"
      );
    } else if (roleauth === "ROLE_SUPERVISOR") {
      return !(
        selectedRow &&
        selectedRow?.operator_status === "OPERATOR_APPROVED" &&
        (selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" ||
          selectedRow?.supervisor_status === "WAITING_FOR_APPROVAL") &&
        selectedRow?.hod_status === "WAITING_FOR_APPROVAL" || "HOD_APPROVED"
      );
    } else if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      return !(
        selectedRow &&
        (selectedRow?.hod_status === "HOD_APPROVED" ||
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status === "HOD_REJECTED")
      );
    } else {
      return false;
    }
  };
  const isEditable = canEdit();

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_OPERATOR") {
      if (
        selectedRow &&
        selectedRow?.operator_status === "OPERATOR_APPROVED" &&
        selectedRow?.hod_status !== "HOD_REJECTED" &&
        selectedRow?.supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
      return "block";
    }
    else if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
          selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_OPERATOR") {
      if (
        selectedRow?.operator_status == "OPERATOR_APPROVED" &&
        selectedRow?.supervisor_status == "SUPERVISOR_REJECTED" || "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        selectedRow?.operator_status == "OPERATOR_APPROVED" &&
        selectedRow?.supervisor_status == "WAITING_FOR_APPROVAL" &&
        (selectedRow?.hod_status == "" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    }
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/approveOrReject`,
        {
          id: OverallID,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-06/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/approveOrReject`,
        {
          id: OverallID,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-06/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };




  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState('');

  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [OverallID, setOverallID] = useState('');

  const { Option } = Select;
  const { state } = location;
  const { newdate, shiftvalue, orderNo } = state || {};
  // const { batch } = state || {};
  // const { bale } = state || {};
  // console.log("bmr form create screen", newdate);
  // console.log("bmr form create screen", shiftvalue);
  // console.log("bmr form create screen", orderNo);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [opens, setOpens] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10
  const [placement, setPlacement] = useState("left");




  // const showDrawer = () => {
  //   setOpens(true);
  // };
  // const onCloses = () => {
  //   setOpens(false);
  // }

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }




  useEffect(() => {
    if (newdate) {

      setDate(newdate);

      // console.log("PHNo create", newdate);
    }

    if (shiftvalue) {
      setShift(shiftvalue);
      // console.log("Supplier create", shiftvalue);
    }
    if (orderNo) {
      SetORDER_No(orderNo);
      // console.log("Supplier create", orderNo);
    }
  })





  useEffect(() => {
    if (ReportDetails) {
      const initialRemarks = ReportDetails.map(detail => {
        return detail.remarks ? detail.remarks : "NA";
      });
      setRemarks(initialRemarks);
    }
  }, [ReportDetails]);





  const handleClick = () => {
    // handleSubmit();
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${year}-${month}-${day}`;


  const token = localStorage.getItem("token");


  const handlePrint = () => {
    window.print();
  };


  const handleShiftChange = (value) => {
    // console.log(" Shift ", value);
    setShift(value);
    // setGotobtn(false);
  };


  const convertShiftValue = (shift) => {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return shift;
    }
  };


  // console.log("Data", ReportDetails)

  const saveData = () => {
    setSaveLoading(true);
    // console.log("Date1", token);

    const isValid = () => {
      if (!STD_THICKNESS) return "STD THICKNESS is required";
      if (!STD_ROLL_DIA) return "STD ROLL DIA is required";
      return null;
    };

    const validationMessage = isValid();
    if (validationMessage) {
      setSaveLoading(false);
      message.error(validationMessage);
      return;
    }


    if (NewSave) {
      const payload = {
        unit: "Unit H",
        formatNo: "PH-PRD02/F-006",
        formatName: "DAILY PRODUCTION REPORT - SPUNLACE",
        refSopNo: "PH-PRD02-D-03",
        revisionNo: "01",
        shift: shift,
        date: date,
        orderNo: ORDER_No,
        stdWidth: STD_WIDTH,
        stdGsm: STD_GSM,
        mixing: MIXING,
        productName: PRODUCT_NAME,
        stdRollDia: STD_ROLL_DIA,
        materialCode: MATERIAL_CODE,
        pattern: PATTERN,
        stdThickness: STD_THICKNESS,
        reportDetails: orderDetails.map((detail, index) => ({
          shaftNo: detail.shaftNo,
          rollNo: detail.baleNo,
          length: detail.length,
          width: detail.width,
          netWt: detail.totalWeight,
          rollGsm: detail.gsm,
          moisture: detail.moisture,
          rollDia: detail.diameter,
          remarks: remarks[index]
        })),
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };


      axios
        .post(
          `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/SaveProductionReportDetails`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.log("Response", res.data);
          message.success("Form Saved Successfully");
          navigate('/Precot/Spunlace/F-06/Summary');
        })
        .catch((err) => {
          // console.log("Error", err);
          message.error(err.response.data.message);
        })
        .finally(() => {
          setSaveLoading(false);
        });
    } else {
      const payload = {
        unit: "Unit H",
        formatNo: "PH-PRD02/F-006",
        formatName: "DAILY PRODUCTION REPORT - SPUNLACE",
        refSopNo: "PH-PRD02-D-03",
        revisionNo: "01",
        shift: shift,
        reportId: OverallID,
        date: date,
        orderNo: ORDER_No,
        stdWidth: STD_WIDTH,
        stdGsm: STD_GSM,
        mixing: MIXING,
        productName: PRODUCT_NAME,
        stdRollDia: STD_ROLL_DIA,
        materialCode: MATERIAL_CODE,
        pattern: PATTERN,
        stdThickness: STD_THICKNESS,
        reportDetails: orderDetails.map((detail, index) => ({
          detailId: detail.detailId,
          shaftNo: detail.shaftNo,
          rollNo: detail.baleNo,
          length: detail.length,
          width: detail.width,
          netWt: detail.totalWeight,
          rollGsm: detail.gsm,
          moisture: detail.moisture,
          rollDia: detail.diameter,
          remarks: remarks[index]
          // reportId: OverallID,
        })),
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/SaveProductionReportDetails`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.log("Response", res.data);
          message.success("Form Saved Successfully");
          navigate('/Precot/Spunlace/F-06/Summary');
        })
        .catch((err) => {
          // console.log("Error", err);
          const errorMessage = err.response.message;
          message.error(err.response.data.message);
        })
        .finally(() => {
          setSaveLoading(false);
        });
    }
  };


  const submitData = () => {
    setSubmitLoading(true);
    // console.log("Date1", token);



    const isValid = () => {
      if (!STD_THICKNESS) return "STD THICKNESS is required";
      if (!STD_ROLL_DIA) return "STD ROLL DIA is required";
      return null;
    };

    const validationMessage = isValid();
    if (validationMessage) {
      setSubmitLoading(false);
      message.error(validationMessage);
      return;
    }

    if (NewSave) {
      const payload = {
        unit: "Unit H",
        formatNo: "PH-PRD02/F-006",
        formatName: "DAILY PRODUCTION REPORT - SPUNLACE",
        refSopNo: "PH-PRD02-D-03",
        revisionNo: "01",
        shift: shift,
        date: date,

        orderNo: ORDER_No,
        stdWidth: STD_WIDTH,
        stdGsm: STD_GSM,
        mixing: MIXING,
        productName: PRODUCT_NAME,
        stdRollDia: STD_ROLL_DIA,
        materialCode: MATERIAL_CODE,
        pattern: PATTERN,
        stdThickness: STD_THICKNESS,
        reportDetails: orderDetails.map((detail, index) => ({

          shaftNo: detail.shaftNo,
          rollNo: detail.baleNo,
          length: detail.length,
          width: detail.width,
          netWt: detail.totalWeight,
          rollGsm: detail.gsm,
          moisture: detail.moisture,
          rollDia: detail.diameter,
          remarks: remarks[index]
        })),
      };
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/SubmitProductionReportDetails`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.log("Response", res.data);
          message.success("Form Submitted Successfully");
          navigate('/Precot/Spunlace/F-06/Summary');
        })
        .catch((err) => {
          // console.log("Error", err);
          message.error(err.response.data.message);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    } else {
      const payload = {
        unit: "Unit H",
        formatNo: "PH-PRD02/F-006",
        formatName: "DAILY PRODUCTION REPORT - SPUNLACE",
        refSopNo: "PH-PRD02-D-03",
        revisionNo: "01",
        shift: shift,
        reportId: OverallID,
        date: date,
        orderNo: ORDER_No,
        stdWidth: STD_WIDTH,
        stdGsm: STD_GSM,
        mixing: MIXING,
        productName: PRODUCT_NAME,
        stdRollDia: STD_ROLL_DIA,
        materialCode: MATERIAL_CODE,
        pattern: PATTERN,
        stdThickness: STD_THICKNESS,
        reportDetails: orderDetails.map((detail, index) => ({
          detailId: detail.detailId,
          shaftNo: detail.shaftNo,
          rollNo: detail.baleNo,
          length: detail.length,
          width: detail.width,
          netWt: detail.totalWeight,
          rollGsm: detail.gsm,
          moisture: detail.moisture,
          rollDia: detail.diameter,
          remarks: remarks[index]
          // reportId: OverallID,
        })),
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/SubmitProductionReportDetails`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.log("Response", res.data);
          message.success("Form Submitted Successfully");
          navigate('/Precot/Spunlace/F-06/Summary');
        })
        .catch((err) => {
          // console.log("Error", err);
          message.error(err.response.data.message);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    }
  };




  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
    const fetchDataAsync = async () => {
      const data = await fetchGet(token);
      if (data && data.reportDetails) {
        SetOrderDetails(data.reportDetails);
        const newRemarks = data.reportDetails.map(detail => detail.remarks);
        setRemarks(newRemarks);
      } else {
        console.error('Invalid data format', data);
      }
    };

    fetchDataAsync();}
  }, []);


  const handleBack = () => {
    navigate("/Precot/Spunlace/F-06/Summary");
  };



  useEffect(() => {
    if (orderNo) {
      checkBmrExists(orderNo);
    }
  }, [orderNo]);

  const checkBmrExists = async (orderNo) => {


    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/orderDetails?order=${orderNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response", response.data);
      if (response.data && response.data.length > 0) {


        const data = response.data;
        // console.log("data", data);

        // console.log("inside data", data);
        SetPRODUCT_NAME(data[0].customerName);
        SetSTD_GSM(data[0].gsm);
        SetMATERIAL_CODE(data[0].material);
        SetMIXING(data[0].mix);
        SetPATTERN(data[0].patternDescription);
        SetSTD_WIDTH(data[0].width);

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };




  useEffect(() => {
    if (orderNo) {
      checkBmrExist();
    }
  }, []);

  const checkBmrExist = async () => {

    const { newdate, shiftvalue, orderNo } = state || {};
    const formattedDate = moment(newdate, "DD/MM/YYYY").format("YYYY-MM-DD");
    const numberShift = convertShiftValue(shiftvalue);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/splProduction?order=${orderNo}&date=${formattedDate}&shift=${numberShift}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response shift", response.data);
      SetOrderDetails(response.data)







    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {

    if (!initial.current) {
      initial.current = true;
    if (orderNo) {
      fetchGet();
    }
  }
  }, [orderNo]);

  const fetchGet = async () => {
    
    const { newdate, shiftvalue, orderNo } = state || {};


    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/getByDateShiftOrderNo?orderNo=${orderNo}&date=${newdate}&shift=${shiftvalue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response Fecthget", response.data);

      if (role === "ROLE_SUPERVISOR") {
        if (
          response.data?.supervisor_status === "SUPERVISOR_REJECTED" ||
          response.data?.hod_status === "HOD_REJECTED"
        ) {
          message.warning("Operator Not Yet Approved or Previous Stage Rejected");
          setTimeout(() => {
            navigate('/Precot/Spunlace/F-06/Summary');
          }, 1500);
        }
      }

      if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
        if (
          response.data?.operator_status !== "OPERATOR_APPROVED" ||
          response.data?.supervisor_status !== "SUPERVISOR_APPROVED" ||
          response.data?.supervisor_status === "SUPERVISOR_REJECTED" ||
          response.data?.hod_status === "HOD_REJECTED"
        ) {
          message.warning("Operator Not Yet Approved or Previous Stage Rejected");
          setTimeout(() => {
            navigate('/Precot/Spunlace/F-06/Summary');
          }, 1500);
        }
      }
      response.data.length == 0 ? setNewSave(true) : setNewSave(false);
      SetSTD_THICKNESS(response.data.stdThickness);
      SetSTD_ROLL_DIA(response.data.stdRollDia);
      // console.log("report", response.data.reportDetails)

      setReportDetails(response.data.reportDetails);

      // setOverallID(response.data.reportId);
      // // console.log("Report id",response.data.reportId)


      SetGetOrderDetails(response.data);
      setSelectedRow(response.data);
      // console.log("selectedRow", response.data)
      setHodSign(response.data.hod_sign);
      setHodStatus(response.data.hod_status);
      setHodSubmitOn(response.data.hod_submit_on);

      setemptyarraycheck(response.data.length);
      setOperatorSign(response.data.operator_sign);

      setOperatorstatus(response.data.operator_status);
      setOperatorSubmitOn(response.data.operator_submit_on);
      setSupervisorSign(response.data.supervisor_sign);
      setSupervisorStatus(response.data.supervisor_status);
      setSupervisorSubmitOn(response.data.supervisor_submit_on);



      // const newRemarks = response.data.reportDetails.map(detail => detail.remarks);
      // setRemarks(newRemarks);
      const newRemarks = response.data.reportDetails.map(detail => detail.remarks ? detail.remarks : "NA");
      setRemarks(newRemarks);

      setOverallID(response.data.reportId);
      // console.log("Report ids", response.data.reportId)

      SetMATERIAL_CODE(response.data.materialCode);




    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };




  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderDetails.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orderDetails.length / itemsPerPage);

  const [remarks, setRemarks] = useState(Array(currentItems.length).fill(''));



  const handleRemarksChange = (e, index) => {
    const newRemarks = [...remarks];
    newRemarks[indexOfFirstItem + index] = e.target.value;
    setRemarks(newRemarks);
  };



  const formattedOperatorDate = OperatorSubmitOn
    ? moment(OperatorSubmitOn).format('DD/MM/YYYY HH:mm')
    : '';


  const formattedSupervisorDate = SupervisorSubmitOn
    ? moment(SupervisorSubmitOn).format('DD/MM/YYYY HH:mm')
    : '';

  const formattedhodDate = HodSubmitOn
    ? moment(HodSubmitOn).format('DD/MM/YYYY HH:mm')
    : '';



  const items = [
    {
      key: "1",
      label: <p>Form 1</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "100%", margin: "auto" }}>
            <thead>
              <tr>
                <td colSpan="1" style={{ textAlign: 'center' }}>S.No.</td>
                <td colSpan="3" style={{ textAlign: 'center' }}>Shaft No.</td>
                <td colSpan="3" style={{ textAlign: 'center' }}>Roll No.</td>
                <td colSpan="2" style={{ textAlign: 'center' }}>Length In Mtrs</td>
                <td colSpan="2" style={{ textAlign: 'center' }}>Width In Mm</td>
                <td colSpan="2" style={{ textAlign: 'center' }}>Net Wt In Kg</td>
                <td colSpan="2" style={{ textAlign: 'center' }}>Roll GSM</td>
                <td colSpan="2" style={{ textAlign: 'center' }}>Moisture In %</td>
                <td colSpan="2" style={{ textAlign: 'center' }}>Roll Dai In Mm</td>
                <td colSpan="3" style={{ textAlign: 'center' }}>Remarks</td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((detail, index) => (
                <tr key={index}>
                  <td colSpan="1" style={{ textAlign: 'center', padding: '4px' }}>{indexOfFirstItem + index + 1}</td>
                  <td colSpan="3" style={{ textAlign: 'center' }}>{detail.shaftNo}</td>
                  <td colSpan="3" style={{ textAlign: 'center' }}>{detail.baleNo}</td>
                  <td colSpan="2" style={{ textAlign: 'center' }}>{detail.length}</td>
                  <td colSpan="2" style={{ textAlign: 'center' }}>{detail.width}</td>
                  <td colSpan="2" style={{ textAlign: 'center' }}>{detail.totalWeight}</td>
                  <td colSpan="2" style={{ textAlign: 'center' }}>{detail.gsm}</td>
                  <td colSpan="2" style={{ textAlign: 'center' }}>{detail.moisture}</td>
                  <td colSpan="2" style={{ textAlign: 'center' }}>{detail.diameter}</td>
                  <td colSpan="3" style={{ textAlign: 'center', width: '100px' }}>

                    <input
                      type="text"
                      value={remarks[indexOfFirstItem + index] || ''}
                      onChange={(e) => handleRemarksChange(e, index)}
                      style={{
                        width: '100%', boxSizing: 'border-box', border: 'none', textAlign: 'center',
                        outline: 'none'
                      }}
                      disabled={!isEditable}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination" style={{ textAlign: 'right', marginTop: '20px' }}>
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="pagination-button"
                style={{
                  padding: '5px 10px',
                  margin: '5px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: '1px solid #007bff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Previous
              </button>
            )}

            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="pagination-button"
                style={{
                  padding: '5px 10px',
                  margin: '5px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: '1px solid #007bff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ),
    }, {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "90%", margin: "auto" }}>
            <tr >
              <td colSpan="10" style={{
                textAlign: 'center',
              }}>
                Operator Sign & Date
              </td >
              <td colSpan="10" style={{
                textAlign: 'center',
              }}>
                Production Supervisor Sign & Date
              </td>
              <td colSpan="10" style={{
                textAlign: 'center',
              }}>
                HOD / Designee Sign & Date
              </td>

            </tr>


            <tr>
              <td colSpan="10" style={{
                fontSize: "12pt",
                textAlign: 'center',
                height: '70px',
                fontFamily: "Times New Roman, Times, serif"
              }}

                disabled={
                  !isEditable
                }
              >
                <div>
                  {OperatorSign}

                  <br />
                  {formattedOperatorDate}<br />
                  {selectedRow?.operator_status === "OPERATOR_APPROVED" && (
                    getImage1 && (
                  <img
                    src={getImage1}
                    alt="Operator Sign"
                    style={{
                      width: "70px",
                      height: "50px",
                      marginLeft: "20px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                      justifyContent: "space-evenly",
                    }}
                  />
                    )
                  )}




                </div>
              </td>
             
                  <td colSpan="10" style={{
                    fontSize: "12pt",
                    textAlign: 'center',
                    height: '70px',
                    fontFamily: "Times New Roman, Times, serif"
                  }}
                    disabled={
                      !isEditable
                    }
                  >
                {(selectedRow?.supervisor_status === "SUPERVISOR_REJECTED" ||
                selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") && (

                    <div>
                      {SupervisorSign}

                      <br />
                      {formattedSupervisorDate}<br />
                      {(selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" ||
                        selectedRow?.supervisor_status === "SUPERVISOR_REJECTED" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED") &&
                        getImage3 && (
                          <img
                            src={getImage3}
                            alt="Supervisor Sign"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                    </div>
                  )}
                  </td>
                


              <td colSpan="10" style={{
                fontSize: "12pt",
                textAlign: 'center',
                height: '70px',
                fontFamily: "Times New Roman, Times, serif"

              }}
                disabled={
                  !isEditable
                }
              >
                {(selectedRow?.hod_status === "HOD_APPROVED" ||
                  selectedRow?.hod_status === "HOD_REJECTED") && (
                    <div>
                      {HodSign}

                      <br />
                      {formattedhodDate}<br />
                      {(selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED") &&
                        getImage2 && (
                          <img
                            src={getImage2}
                            alt="Hod Sign"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                    </div>
                  )}
              </td>

            </tr>

          </table>
        </div>
      ),
    }]



  return (
    <div>



      <BleachingHeader
        unit="Unit-H"
        formName={"DAILY PRODUCTION REPORT - SPUNLACE"}
        formatNo={"PH-PRD02/F-006"}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }


        buttonsArray={[

          <Button
            key="back"
            type="primary"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
          >
            Back
          </Button>,
          ...(role === "ROLE_HOD" ||
            role === "ROLE_SUPERVISOR" ||
            role === "ROLE_QC" ||
            role === "ROLE_DESIGNEE" ? [
            <Button
              key="approve"
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
            </Button>,
            <Button
              key="reject"
              loading={saveLoading}
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
          ] : [
            <Button
              key="save"
              loading={saveLoading}
              type="primary"
              onClick={saveData}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayButton2(),
              }}
              shape="round"
              icon={<IoSave color="#00308F" />}
            >
              Save
            </Button>,
            <Button
              key="submit"
              loading={submitLoading}
              type="primary"
              onClick={submitData}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayButtons(),
              }}
              icon={<GrDocumentStore color="#00308F" />}
              shape="round"
            >
              Submit
            </Button>
          ]),
          <Button
            key="logout"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiLock color="#00308F" />}
            onClick={() => {
              if (window.confirm("Are you sure want to logout")) {
                localStorage.removeItem("token");
                navigate("/Precot"); // Ensure navigate is defined or imported
              }
            }}
          >
            Logout
          </Button>,
          <Tooltip
            key="user-info"
            trigger="click"
            style={{ backgroundColor: "#fff" }}
            title={
              <div>
                <h3>{localStorage.getItem("username")}</h3>
                <p>{localStorage.getItem("role")}</p>
              </div>
            }
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#E5EEF9" }}
              shape="circle"
              icon={<FaUserCircle color="#00308F" size={20} />}
            />
          </Tooltip>,

          <Modal
            key="reject-modal"
            title="Reject"
            open={showModal}
            onOk={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
            destroyOnClose={true}
            footer={[
              <Button
                key="submit-reject"
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

        ]}


      />
      <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
      

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
        <Input
          addonBefore="Order No"
          placeholder="Order No"
          readOnly
          value={ORDER_No}


          style={{ width: '100%', height: '35px' }}


        />
        <Input
          addonBefore="Std Width In MM"
          placeholder="Std Width In MM"
          readOnly

          value={STD_WIDTH}

          style={{ width: '100%', height: '35px' }}


        />
        <Input
          addonBefore="Mixing"
          placeholder="Mixing"

          readOnly
          value={MIXING}
          style={{ width: '100%', height: '35px' }}



        />


        <Input
          addonBefore="Material Code"
          placeholder="Material Code"
          readOnly
          value={MATERIAL_CODE}

          style={{ width: '100%', height: '35px' }}


        />



      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginTop: '5px' }}>

        <Input
          addonBefore="Date"
          placeholder="Date"

          value={date}
          readOnly
          onChange={handleDateChange}
          style={{ width: '100%', height: '35px' }}

        />

        <Input
          addonBefore="Shift"
          placeholder="Shift"
          readOnly
          value={shift}
          style={{ width: '100%', height: '35px' }}


        />



        <Input
          addonBefore="Std Gsm"
          placeholder="Std Gsm"
          readOnly

          value={STD_GSM}
          style={{ width: '100%', height: '35px' }}


        />


        <Input
          addonBefore="Product Name"
          placeholder="Product Name"
          readOnly
          value={PRODUCT_NAME}



          style={{ width: '100%', height: '35px' }}


        />


      </div>

      <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>

        <Input
          addonBefore="Pattern"
          placeholder="Pattern"
          readOnly

          value={PATTERN}
          style={{ width: '310px', height: '35px' }}

        // onChange={(e) => setBmr_No(e.target.value)}
        />


        <Input
          addonBefore="Std Roll Dia In MM"
          placeholder="Std Roll Dia In MM"
          value={STD_ROLL_DIA}
          disabled={!isEditable}
          onChange={(e) => SetSTD_ROLL_DIA(e.target.value)}
          type="number"
          min="0"
          onKeyPress={(e) => {
            if (e.key === '-' || e.key === 'e') {
              e.preventDefault();
            }
          }}
          style={{ width: '300px', height: '35px' }}
        />

        <Input
          addonBefore="Std Thickness In MM"
          placeholder="Std Thickness In MM"
          value={STD_THICKNESS}
          disabled={!isEditable}
          onChange={(e) => SetSTD_THICKNESS(e.target.value)}
          type="number"
          min="0"
          onKeyPress={(e) => {
            if (e.key === '-' || e.key === 'e') {
              e.preventDefault();
            }
          }}

          style={{ width: '310px', height: '35px', marginRight: '0px' }}
        />

      </div>



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
  )
}

export default Spunlace_f06;

