/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, Input, Row, Select, Tabs, Modal, Spin, message, Tooltip, Menu, Avatar, Drawer } from "antd";
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import BleachingHeader from '../Components/BleachingHeader';
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from 'react-router-dom';
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from 'moment';
import API from "../baseUrl.json";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import TextArea from "antd/es/input/TextArea";
import PrecotSidebar from "../Components/PrecotSidebar.js";


import logo from "../Assests/logo.png";


import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";



const Spunlace_f12 = () => {
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [ORDER_No, SetORDER_No] = useState('');
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
  const [ROLL_DIA, SetROLL_DIA] = useState('');
  const [REMARKS, SetREMARKS] = useState('');
  const [STD_MOISTURE, SetSTD_MOISTURE] = useState('');
  const [orderDetails, SetOrderDetails] = useState([]);
  const [getOrderDetails, SetGetOrderDetails] = useState([]);
  const [NewSave, setNewSave] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10
  const [date, setDate] = useState('')
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState("");
  // console.log("state of selected", selectedRow[0])
  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  // console.log(roleauth);
  const [modalData, setmodalData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [orderDescription, setOrderDescription] = useState('');
  const [OverallID, setOverallID] = useState('');

  const [SupervisorSign, setSupervisorSign] = useState('');
  const [HodSign, setHodSign] = useState('');
  const [SupervisorSubmitOn, setSupervisorSubmitOn] = useState();
  const [HodSubmitOn, setHodSubmitOn] = useState('');
  const [OperatorSign, setOperatorSign] = useState('');
  const [OperatorSubmitOn, setOperatorSubmitOn] = useState('');
  const [Operatorstatus, setOperatorstatus] = useState('');
  const [SupervisorStatus, setSupervisorStatus] = useState('');
  const [HodStatus, setHodStatus] = useState('');
  const [detailID, setDetailID] = useState('');
  const [ReportDetails, setReportDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");

  const initial = useRef(false);

  // console.log("supervisor",selectedRow?.supervisor_status)


  const roleBase = localStorage.getItem("role")

  const [getImage1, setGetImage1] = useState('');
  const [getImage3, setGetImage3] = useState("");
  const [getImage2, setGetImage2] = useState("");
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const username =selectedRow.supervisor_sign;
  //   if (username) {
  //     // console.log("usernameparams", username);

  //     axios
  //       .get(
  //         `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //           responseType: "arraybuffer",
  //         }
  //       )
  //       .then((res) => {
  //         // console.log("Response:", res.data);
  //         const base64 = btoa(
  //           new Uint8Array(res.data).reduce(
  //             (data, byte) => data + String.fromCharCode(byte),
  //             ""
  //           )
  //         );
  //         const url = `data:image/jpeg;base64,${base64}`;
  //         setGetImage1(url);
  //       })
  //       .catch((err) => {
  //         // console.log("Error in fetching image:", err);
  //       });
  //   }
  // }, [selectedRow,API.prodUrl]);

  // // console.log("get image", getImage);




  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const username =selectedRow?.qc_sign;
  //   if (username) {
  //     // console.log("usernameparams", username);

  //     axios
  //       .get(
  //         `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //           responseType: "arraybuffer",
  //         }
  //       )
  //       .then((res) => {
  //         // console.log("Response:", res.data);
  //         const base64 = btoa(
  //           new Uint8Array(res.data).reduce(
  //             (data, byte) => data + String.fromCharCode(byte),
  //             ""
  //           )
  //         );
  //         const url = `data:image/jpeg;base64,${base64}`;
  //         setGetImage3(url);
  //       })
  //       .catch((err) => {
  //         // console.log("Error in fetching image:", err);
  //       });
  //   }
  // }, [selectedRow,API.prodUrl]);




  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const username =selectedRow?.hod_sign;
  //   if (username) {
  //     // console.log("usernameparams", username);

  //     axios
  //       .get(
  //         `${API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //           responseType: "arraybuffer",
  //         }
  //       )
  //       .then((res) => {
  //         // console.log("Response:", res.data);
  //         const base64 = btoa(
  //           new Uint8Array(res.data).reduce(
  //             (data, byte) => data + String.fromCharCode(byte),
  //             ""
  //           )
  //         );
  //         const url = `data:image/jpeg;base64,${base64}`;
  //         setGetImage2(url);
  //       })
  //       .catch((err) => {
  //         // console.log("Error in fetching image:", err);
  //       });
  //   }
  // }, [selectedRow,API.prodUrl]);

  //  // console.log("get image", getImage);


  const canEdit = () => {
    if (roleauth === "ROLE_SUPERVISOR") {
      return !(
        selectedRow &&
        selectedRow.supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow.hod_status !== "HOD_REJECTED" &&
        selectedRow.qc_status !== "QC_REJECTED"
      );
    } else if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      return !(
        selectedRow &&
        selectedRow.supervisor_status === "SUPERVISOR_APPROVED" &&
        (selectedRow.hod_status === "HOD_APPROVED" ||
          selectedRow.hod_status === "HOD_REJECTED" ||
          selectedRow.hod_status === "WAITING_FOR_APPROVAL" ||
          selectedRow.qc_status === "WAITING_FOR_APPROVAL") &&
        selectedRow.qc_status === "" ||
        selectedRow.qc_status === "QC_REJECTED" ||
        selectedRow.qc_status === "QC_APPROVED"
      );
    }
    else if (roleauth === "ROLE_QC") {
      return !(
        selectedRow &&
        (selectedRow.qc_status === "QC_APPROVED" ||
          selectedRow.qc_status === "WAITING_FOR_APPROVAL" ||
          selectedRow.qc_status === "QC_REJECTED")
      );
    } else {
      return false;
    }
  };

  const isEditable = canEdit();

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_SUPERVISOR") {
      if (
        selectedRow &&
        selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status !== "HOD_REJECTED" &&
        selectedRow?.qc_status !== "QC_REJECTED"
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
      return "block";
    }
    else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "WAITING_FOR_APPROVAL"
      ) {
        return "block";
      } else if (
        (selectedRow?.hod_status == "HOD_APPROVED" &&
          selectedRow?.qc_status == "WAITING_FOR_APPROVAL") ||
        (selectedRow?.hod_status == "HOD_REJECTED" &&
          selectedRow?.qc_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.qc_status == "QC_APPROVED" ||
        selectedRow?.qc_status == "QC_REJECTED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_QC") {
      if (
        selectedRow?.qc_status == "QC_APPROVED" ||
        selectedRow?.qc_status == "QC_REJECTED" ||
        selectedRow?.hod_status == "HOD_REJECTED" ||
        selectedRow?.supervisor_status == "SUPERVISOR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.qc_status == "QC_APPROVED" ||
        selectedRow?.qc_status == "QC_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_APPROVED" &&
        selectedRow?.qc_status == "" || "WAITING_FOR_APPROVAL" || "QC_REJECTED"
      ) {
        return "none";
      } else if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "WAITING_FOR_APPROVAL" &&
        (selectedRow?.qc_status == "" ||
          selectedRow?.qc_status == "QC_APPROVED")
      ) {
        return "none";
      }
    }
    if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" &&
        selectedRow?.qc_status == "QC_REJECTED"
      ) {
        return "none";
      } else if (
        selectedRow?.hod_status == "HOD_APPROVED" &&
        (selectedRow?.qc_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.qc_status == "QC_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_QC") {
      if (
        selectedRow?.qc_status == "QC_APPROVED" ||
        selectedRow?.qc_status == "QC_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.qc_status == "QC_APPROVED" ||
        selectedRow?.qc_status == "QC_REJECTED"
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
        `${API.prodUrl}/Precot/api/spulance/SummarydetailsF012/approveOrReject`,
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
        navigate("/Precot/Spunlace/F-12/Summary");
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
        `${API.prodUrl}/Precot/api/spulance/SummarydetailsF012/approveOrReject`,
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
        navigate("/Precot/Spunlace/F-12/Summary");
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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }
  const { state } = location;
  const { newdate, shiftvalue, orderNo } = state || {};



  useEffect(() => {
    // console.log("Date new" , newdate);
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

    // Fetch data from API
    const fetchOrderDescription = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API.prodUrl}/Precot/api/spulance/sampleReportOrders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;


        const order = data.find(item => item.value === orderNo);
        if (order) {
          setOrderDescription(`${order.value}/${order.description}`);
        } else {
          setOrderDescription(orderNo);
        }
      } catch (error) {
        console.error('Error fetching order description:', error);
      }
    };

    fetchOrderDescription();
  }, [newdate, shiftvalue, orderNo]);






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
        return shift; // Return the original value if it doesn't match any case
    }
  };

  const saveData = () => {
    setSaveLoading(true);
    // console.log("Date1", token);

    const isValid = () => {
      if (!STD_THICKNESS) return "STD THICKNESS is required";
      if (!STD_MOISTURE) return "STD MOISTURE is required";
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
        formatNo: "PH-PRD02/F-011",
        formatName: "Sample Report",
        sopNumber: "PH-PRD02-D-03",
        revisionNo: "01",
        shift: shift,
        date: date,
        order_no: ORDER_No,
        mixing: MIXING,
        product_name: PRODUCT_NAME,
        material_code: MATERIAL_CODE,
        pattern: PATTERN,
        std_gsm: STD_GSM,
        std_thickness: STD_THICKNESS,
        std_moisture: STD_MOISTURE,
        reportDetails: orderDetails.map((detail, index) => ({
          shaft_no: detailID,
          roll_no: detail.baleNo,
          length: detail.length,
          width: detail.width,
          net_weight: detail.weight,
          roll_gsm: detail.gsm,
          moisture: detail.moisture,
          roll_dai: detail.diameter,
          remarks: remarks[index]
        }))
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/spulance/saveSampleReportDetailsF012`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.log("Response", res.data);
          message.success("Form Saved Successfully");
          navigate('/Precot/Spunlace/F-12/Summary');
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
        formatNo: "PH-PRD02/F-011",
        formatName: "Sample Report",
        sopNumber: "PH-PRD02-D-03",
        revisionNo: "01",
        shift: shift,
        report_id: OverallID,
        date: date,
        order_no: ORDER_No,
        mixing: MIXING,
        product_name: PRODUCT_NAME,
        material_code: MATERIAL_CODE,
        pattern: PATTERN,
        std_gsm: STD_GSM,
        std_thickness: STD_THICKNESS,
        std_moisture: STD_MOISTURE,
        reportDetails: orderDetails.map((detail, index) => ({
          detail_id: detailID,
          shaft_no: detail.shaftNo,
          roll_no: detail.baleNo,
          length: detail.length,
          width: detail.width,
          net_weight: detail.weight,
          roll_gsm: detail.gsm,
          moisture: detail.moisture,
          roll_dai: detail.diameter,
          remarks: remarks[index]
        }))
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/spulance/submitSampleReportDetailsF012`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.log("Response", res.data);
          message.success(res.data.message);
          navigate('/Precot/Spunlace/F-12/Summary');
        })
        .catch((err) => {
          // console.log("Error", err);
          const errorMessage = err?.response?.message || 'An error occurred while saving the form';
          message.error(errorMessage);
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
      if (!STD_MOISTURE) return "STD MOISTURE is required";
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
        formatNo: "PH-PRD02/F-011",
        formatName: "Sample Report",
        sopNumber: "PH-PRD02-D-03",
        revisionNo: "01",
        shift: shift,
        date: date,
        order_no: ORDER_No,
        mixing: MIXING,
        product_name: PRODUCT_NAME,
        material_code: MATERIAL_CODE,
        pattern: PATTERN,
        std_gsm: STD_GSM,
        std_thickness: STD_THICKNESS,
        std_moisture: STD_MOISTURE,
        reportDetails: orderDetails.map((detail, index) => ({
          shaft_no: detailID,
          roll_no: detail.baleNo,
          length: detail.length,
          width: detail.width,
          net_weight: detail.weight,
          roll_gsm: detail.gsm,
          moisture: detail.moisture,
          roll_dai: detail.diameter,
          remarks: remarks[index]
        }))
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/spulance/saveSampleReportDetailsF012`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.log("Response", res.data);
          message.success("Form Saved Successfully");
          navigate('/Precot/Spunlace/F-12/Summary');
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
        formatNo: "PH-PRD02/F-011",
        formatName: "Sample Report",
        sopNumber: "PH-PRD02-D-03",
        revisionNo: "01",
        shift: shift,
        report_id: OverallID,
        date: date,
        order_no: ORDER_No,
        mixing: MIXING,
        product_name: PRODUCT_NAME,
        material_code: MATERIAL_CODE,
        pattern: PATTERN,
        std_gsm: STD_GSM,
        std_thickness: STD_THICKNESS,
        std_moisture: STD_MOISTURE,
        reportDetails: orderDetails.map((detail, index) => ({
          detail_id: detailID[index],
          shaft_no: detail.shaftNo,
          roll_no: detail.baleNo,
          length: detail.length,
          width: detail.width,
          net_weight: detail.weight,
          roll_gsm: detail.gsm,
          moisture: detail.moisture,
          roll_dai: detail.diameter,
          remarks: remarks[index]
        }))
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/spulance/submitSampleReportDetailsF012`,
          payload,
          { headers }
        )
        .then((res) => {
          // console.log("Response", res.data);
          message.success(res.data.message);
          navigate('/Precot/Spunlace/F-12/Summary');
        })
        .catch((err) => {
          // console.log("Error", err);
          message.error(err.response.data.message);

        })
        .finally(() => {
          setSaveLoading(false);
        });
    }
  };



  // const submitData = () => {
  //   setSubmitLoading(true);
  //   // console.log("Date1", token);


  //   const isValid = () => {
  //     if (!STD_THICKNESS) return "STD THICKNESS is required";
  //     if (!STD_MOISTURE) return "STD MOISTURE is required";
  //     return null;
  //   };

  //   const validationMessage = isValid();
  //   if (validationMessage) {
  //     setSubmitLoading(false);
  //     message.error(validationMessage);
  //     return;
  //   }

  //   if (NewSave) {
  //     const isValid = () => {
  //       if (!STD_THICKNESS) return "STD THICKNESS is required";
  //       if (!STD_MOISTURE) return "STD MOISTURE is required";
  //       return null;
  //     };

  //     const validationMessage = isValid();
  //     if (validationMessage) {
  //       message.error(validationMessage);
  //       return;
  //     }

  //     const payload = {
  //       unit: "Unit H",
  //       formatNo: "PH-PRD02/F-011",
  //       formatName: "Sample Report",
  //       sopNumber: "PH-PRD02-D-03",
  //       revisionNo: "01",
  //       shift: shift,
  //       date: date,
  //       order_no: ORDER_No,
  //       mixing: MIXING,
  //       product_name: PRODUCT_NAME,
  //       material_code: MATERIAL_CODE,
  //       pattern: PATTERN,
  //       std_gsm: STD_GSM,
  //       std_thickness: STD_THICKNESS,
  //       std_moisture: STD_MOISTURE,
  //       reportDetails: orderDetails.map((detail, index) => ({
  //         shaft_no: detail.shaftNo,
  //         roll_no: detail.baleNo,
  //         length: detail.length,
  //         width: detail.width,
  //         net_weight: detail.weight,
  //         roll_gsm: detail.gsm,
  //         moisture: detail.moisture,
  //         roll_dai: detail.diameter,
  //         remarks: remarks[index]
  //       }))
  //     };

  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };

  //     axios
  //       .post(
  //         `${API.prodUrl}/Precot/api/spulance/submitSampleReportDetailsF012`,
  //         payload,
  //         { headers }
  //       )
  //       .then((res) => {
  //         // console.log("Response", res.data);
  //         message.success("Form Submitted Successfully");
  //         navigate('/Precot/Spunlace/F-12/Summary');
  //       })
  //       .catch((err) => {
  //         // console.log("Error", err);
  //         message.error(err.response.data.message);
  //       })
  //       .finally(() => {
  //         setSubmitLoading(false);
  //       });
  //   } else {
  //     const payload = {
  //       unit: "Unit H",
  //       formatNo: "PH-PRD02/F-011",
  //       formatName: "Sample Report",
  //       sopNumber: "PH-PRD02-D-03",
  //       revisionNo: "01",
  //       shift: shift,
  //       report_id: OverallID,
  //       date: date,
  //       order_no: ORDER_No,
  //       mixing: MIXING,
  //       product_name: PRODUCT_NAME,
  //       material_code: MATERIAL_CODE,
  //       pattern: PATTERN,
  //       std_gsm: STD_GSM,
  //       std_thickness: STD_THICKNESS,
  //       std_moisture: STD_MOISTURE,
  //       reportDetails: orderDetails.map((detail, index) => ({
  //         detail_id: detail.detailId,
  //         shaft_no: detail.shaftNo,
  //         roll_no: detail.baleNo,
  //         length: detail.length,
  //         width: detail.width,
  //         net_weight: detail.weight,
  //         roll_gsm: detail.gsm,
  //         moisture: detail.moisture,
  //         roll_dai: detail.diameter,
  //         remarks: remarks[index]
  //       }))
  //     };

  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };

  //     axios
  //       .post(
  //         `${API.prodUrl}/Precot/api/spulance/submitSampleReportDetailsF012`,
  //         payload,
  //         { headers }
  //       )
  //       .then((res) => {
  //         // console.log("Response", res.data);
  //         message.success("Form Submitted Successfully");
  //         navigate('/Precot/Spunlace/F-12/Summary');
  //       })
  //       .catch((err) => {
  //         // console.log("Error", err);
  //         const errorMessage = err.response.data.message || 'An error occurred while saving the form';
  //         message.error(errorMessage);
  //       })
  //       .finally(() => {
  //         setSaveLoading(false);
  //       });
  //   }
  // };

  // const submitData = () => {
  //   setSubmitLoading(true);
  //   // console.log("Date1", token);

  //   const isValid = () => {
  //     if (!STD_THICKNESS) return "STD THICKNESS is required";
  //     if (!STD_MOISTURE) return "STD MOISTURE is required";
  //     return null;
  //   };

  //   const validationMessage = isValid();
  //   if (validationMessage) {
  //     setSubmitLoading(false);
  //     message.error(validationMessage);
  //     return;
  //   }

  //   if (NewSave) {
  //     const payload = {
  //       unit: "Unit H",
  //       formatNo: "PH-PRD02/F-006",
  //       formatName: "DAILY PRODUCTION REPORT - SPUNLACE",
  //       refSopNo: "PH-PRD02-D-03",
  //       revisionNo: "01",
  //       shift: shift,
  //       date: date,
  //       orderNo: ORDER_No,
  //       stdWidth: STD_WIDTH,
  //       stdGsm: STD_GSM,
  //       mixing: MIXING,
  //       productName: PRODUCT_NAME,
  //       stdRollDia: STD_ROLL_DIA,
  //       materialCode: MATERIAL_CODE,
  //       pattern: PATTERN,
  //       stdThickness: STD_THICKNESS,
  //       reportDetails: orderDetails.map((detail, index) => ({
  //         shaftNo: detail.shaftNo,
  //         rollNo: detail.baleNo,
  //         length: detail.length,
  //         width: detail.width,
  //         netWt: detail.totalWeight,
  //         rollGsm: detail.gsm,
  //         moisture: detail.moisture,
  //         rollDia: detail.diameter,
  //         remarks: remarks[index]
  //       })),
  //     };
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };

  //     axios
  //       .post(
  //         `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/SubmitProductionReportDetails`,
  //         payload,
  //         { headers }
  //       )
  //       .then((res) => {
  //         // console.log("Response", res.data);
  //         message.success("Form Submitted Successfully");
  //         navigate('/Precot/Spunlace/F-06/Summary');
  //       })
  //       .catch((err) => {
  //         // console.log("Error", err);
  //         message.error(err.response.data.message);
  //       })
  //       .finally(() => {
  //         setSubmitLoading(false);
  //       });
  //   } else {
  //     const payload = {
  //       unit: "Unit H",
  //       formatNo: "PH-PRD02/F-006",
  //       formatName: "DAILY PRODUCTION REPORT - SPUNLACE",
  //       refSopNo: "PH-PRD02-D-03",
  //       revisionNo: "01",
  //       shift: shift,
  //       reportId: OverallID,
  //       date: date,
  //       orderNo: ORDER_No,
  //       stdWidth: STD_WIDTH,
  //       stdGsm: STD_GSM,
  //       mixing: MIXING,
  //       productName: PRODUCT_NAME,
  //       stdRollDia: STD_ROLL_DIA,
  //       materialCode: MATERIAL_CODE,
  //       pattern: PATTERN,
  //       stdThickness: STD_THICKNESS,
  //       reportDetails: orderDetails.map((detail, index) => ({
  //         detailId: detail.detailId,
  //         shaftNo: detail.shaftNo,
  //         rollNo: detail.baleNo,
  //         length: detail.length,
  //         width: detail.width,
  //         netWt: detail.totalWeight,
  //         rollGsm: detail.gsm,
  //         moisture: detail.moisture,
  //         rollDia: detail.diameter,
  //         remarks: remarks[index]
  //       })),
  //     };

  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };

  //     axios
  //       .post(
  //         `${API.prodUrl}/Precot/api/spunlace/Service/DailyProductionReport/SubmitProductionReportDetails`,
  //         payload,
  //         { headers }
  //       )
  //       .then((res) => {
  //         // console.log("Response", res.data);
  //         message.success("Form Submitted Successfully");
  //         navigate('/Precot/Spunlace/F-06/Summary');
  //       })
  //       .catch((err) => {
  //         // console.log("Error", err);
  //         message.error(err.response.data.message);
  //       })
  //       .finally(() => {
  //         setSubmitLoading(false);
  //       });
  //   }
  // };

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


    // console.log("new Date",newdate)

    const numberShift = convertShiftValue(shiftvalue);
    const formattedDate = moment(newdate, "DD/MM/YYYY").format("YYYY-MM-DD");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/splSampleOrders?order=${orderNo}&date=${formattedDate}&shift=${numberShift}`,
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
      const fetchDataAsync = async () => {
        const data = await fetchGet(token);
        if (data && data.reportDetails) {
          SetOrderDetails(data.reportDetails);
          const newRemarks = data.reportDetails.map(detail => { return detail.remarks ? detail.remarks : "NA"; });
          setRemarks(newRemarks);
        } else {
          console.error('Invalid data format', data);
        }
      };


      fetchDataAsync();
    }
  }, []);

  useEffect(() => {
    if (ReportDetails) {
      const initialRemarks = ReportDetails.map(detail => { return detail.remarks ? detail.remarks : "NA"; });
      setRemarks(initialRemarks);
    }
  }, [ReportDetails]);


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
        `${API.prodUrl}/Precot/api/spulance/getdetailsbyParamF012?order_no=${orderNo}&date=${newdate}&shift=${shiftvalue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response Fecthget", response.data);





      if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
        if (
          response.data[0]?.hod_status === "HOD_REJECTED" ||
          response.data[0]?.qc_status === "QC_REJECTED"
        ) {
          message.warning("Supervisor Not Yet Approved or Previous Stage Rejected");
          setTimeout(() => {
            navigate('/Precot/Spunlace/F-12/Summary');
          }, 1500);
        }
      }

      if (role === "ROLE_QC") {
        if (
          response.data[0]?.supervisor_status !== "SUPERVISOR_APPROVED" ||
          response.data[0]?.hod_status !== "HOD_APPROVED" ||
          response.data[0]?.hod_status === "HOD_REJECTED" ||
          response.data[0]?.qc_status === "QC_REJECTED"
        ) {
          message.warning("Supervisor Not Yet Approved or Previous Stage Rejected");
          setTimeout(() => {
            navigate('/Precot/Spunlace/F-12/Summary');
          }, 1500);
        }
      }
      response.data.length == 0 ? setNewSave(true) : setNewSave(false);
      // console.log("length", response.data.length)
      const detailIds = response.data[0].reportDetails.map(detail => detail.detail_id);
      setDetailID(detailIds);
      // console.log("detail", response.data[0].reportDetails.map(detail => detail.detail_id))
      SetSTD_THICKNESS(response.data[0].std_thickness);
      SetSTD_MOISTURE(response.data[0].std_moisture);
      // console.log("Moistore",response.data[0].std_moisture)
      // console.log("report rr",response.data[0].reportDetails)

      setReportDetails(response.data.reportDetails);



      SetGetOrderDetails(response.data);
      setSelectedRow(response.data[0]);
      // console.log("selectedRow",response.data[0])
      setHodSign(response.data[0].hod_sign);
      setHodStatus(response.data[0].hod_status);
      setHodSubmitOn(response.data[0].hod_submit_on);


      setOperatorSign(response.data[0].qc_sign);

      setOperatorstatus(response.data[0].qc_status);
      setOperatorSubmitOn(response.data[0].qc_submit_on);
      setSupervisorSign(response.data[0].supervisor_sign);
      setSupervisorStatus(response.data[0].supervisor_status);
      setSupervisorSubmitOn(response.data[0].supervisor_submit_on);

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0].supervisor_sign}`,
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



      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0].qc_sign}`,
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


      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${response.data[0].hod_sign}`,
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





      const newRemarks = response.data[0].reportDetails.map(detail => detail.remarks ? detail.remarks : "NA");
      setRemarks(newRemarks);



      setOverallID(response.data[0].report_id);
      // console.log("Report id",response.data[0].report_id)

      // SetMATERIAL_CODE(response.data.materialCode);




    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };





  const handleBack = () => {
    navigate("/Precot/Spunlace/F-12/Summary");

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
      label: <p>DAILY PRODUCTION REPORT</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "100%", margin: "auto", tableLayout: "fixed" }}>
            <thead>
              <tr>
                <td colSpan="1" style={{ textAlign: 'center' }}>S.No.</td>
                <td colSpan="3" style={{ textAlign: 'center' }}>Shaft No.</td>
                <td colSpan="3" style={{ textAlign: 'center' }}>Roll No.</td>
                <td colSpan="2" style={{ textAlign: 'center' }}>Length In Mtrs</td>
                <td colSpan="2" style={{ textAlign: 'center' }}>Width In Mm</td>
                <td colSpan="2" style={{ textAlign: 'center' }}>Net Wt.In Kg</td>
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
                  <td colSpan="2" style={{ textAlign: 'center' }}>{detail.weight}</td>
                  <td colSpan="2" style={{ textAlign: 'center' }}>{detail.gsm}</td>
                  <td colSpan="2" style={{ textAlign: 'center' }}>{detail.moisture}</td>
                  <td colSpan="2" style={{ textAlign: 'center' }}>{detail.diameter}</td>
                  <td colSpan="3" style={{ textAlign: 'center', width: '100px' }}>

                    <input
                      type="text"
                      value={remarks[indexOfFirstItem + index] || ''}
                      onChange={(e) => handleRemarksChange(e, index)}
                      style={{ width: '100%', boxSizing: 'border-box', border: 'none', outline: 'none', textAlign: 'center' }}
                      disabled={
                        !isEditable
                      }
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
          <table className="f18table" style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}>
            <tr >
              <td colSpan="10" style={{ textAlign: "center" }}>
                Supervisor Sign & Date
              </td >

              <td colSpan="10" style={{ textAlign: "center" }}>
                HOD / Designee Sign & Date
              </td>

              <td colSpan="10" style={{ textAlign: "center" }} >
                QC Sign & Date
              </td>

            </tr>


            <tr>
              <td colSpan="10" style={{ height: '70px', textAlign: 'center' }}>
                <div>
                  {SupervisorSign}<br />
                  {formattedSupervisorDate}<br />
                  {selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && (
                    getImage1 && (
                      <img
                        src={getImage1}
                        alt="Supervisor Sign"
                        style={{
                          width: "22%",
                          height: "8%",
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

              <td colSpan="10" style={{ height: '70px', textAlign: 'center' }}>
                {(selectedRow?.hod_status === "HOD_REJECTED" ||
                  selectedRow?.hod_status === "HOD_APPROVED") && (
                    <div>
                      {HodSign}<br />
                      {formattedhodDate}<br />
                      {(selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED" ||
                        selectedRow?.qc_status === "QC_APPROVED" ||
                        selectedRow?.qc_status === "QC_REJECTED") &&
                        getImage2 && (
                          <img
                            src={getImage2}
                            alt="Hod Sign"
                            style={{
                              width: "22%",
                              height: "8%",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />)}
                    </div>
                  )}
              </td>




              <td colSpan="10" style={{ height: '70px', textAlign: 'center' }}>
                {(selectedRow?.qc_status === "QC_APPROVED" ||
                  selectedRow?.qc_status === "QC_REJECTED") && (
                    <div>

                      {OperatorSign}<br />
                      {formattedOperatorDate}<br />
                      {(selectedRow?.qc_status === "QC_APPROVED" ||
                        selectedRow?.qc_status === "QC_REJECTED") &&
                        getImage3 && (
                          <img
                            src={getImage3}
                            alt="QC Sign"
                            style={{
                              width: "22%",
                              height: "8%",
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
        formName="SAMPLE REPORT"
        formatNo="PH-PRD02/F-011"
        sopNo="PH-PRD02-D-03"
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
          <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />,
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


      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
        <Input
          addonBefore="Date:"
          placeholder="Date"

          value={date}
          readOnly
          onChange={handleDateChange}
          style={{ width: '100%', height: '35px' }}

        />

        <Input
          addonBefore="Shift:"
          placeholder="Shift"

          readOnly
          value={shift}



          style={{ width: '100%', height: '35px' }}

        // onChange={(e) => setBmr_No(e.target.value)}
        />



        <Input
          addonBefore="Order/Re-question No:"
          placeholder="Order /Re-question No"
          readOnly
          value={orderDescription}


          style={{ width: '100%', height: '35px' }}


        />







      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginTop: '5px' }}>




        <Input
          addonBefore="Product Name:"
          placeholder="Product Name"
          readOnly
          value={PRODUCT_NAME}

          style={{ width: '100%', height: '35px' }}


        />


        <Input
          addonBefore="Mixing:"
          placeholder="Mixing"
          readOnly
          value={MIXING}

          style={{ width: '100%', height: '35px' }}


        />


        <Input
          addonBefore="Material Code:"
          placeholder="Material Code"
          readOnly
          value={MATERIAL_CODE}

          style={{ width: '100%', height: '35px' }}


        />
      </div>

      <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>


        <Input
          addonBefore="Std Gsm:"
          placeholder="Std Gsm"
          readOnly
          value={STD_GSM}
          style={{ width: '100%', height: '35px' }}
        />


        <Input
          addonBefore="Std Moisture:"
          placeholder="Std Moisture"
          value={STD_MOISTURE}
          required
          disabled={
            !isEditable
          }
          onChange={(e) => SetSTD_MOISTURE(e.target.value)}
          type="number"
          min="0"
          onKeyPress={(e) => {
            if (e.key === '-' || e.key === 'e') {
              e.preventDefault();
            }
          }}
          style={{ width: '100%', height: '35px' }}


        />
        <Input
          addonBefore="Std Thickness In MM:"
          placeholder="Std Thickness In MM:"
          value={STD_THICKNESS}
          required
          disabled={
            !isEditable
          }
          onChange={(e) => SetSTD_THICKNESS(e.target.value)}
          type="number"
          min="0"
          onKeyPress={(e) => {
            if (e.key === '-' || e.key === 'e') {
              e.preventDefault();
            }
          }}
          style={{ width: '100%', height: '35px' }}
        />





        <Input
          addonBefore="Pattern:"
          placeholder="Pattern"

          readOnly

          value={PATTERN}


          style={{ width: '100%', height: '35px' }}


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

export default Spunlace_f12;

