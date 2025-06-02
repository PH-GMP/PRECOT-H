// /* eslint-disable no-restricted-globals */
// /* eslint-disable no-unused-expressions */
// import {
//   Button,
//   Col,
//   Input,
//   Row,
//   Select,
//   Tabs,
//   Modal,
//   Spin,
//   message,
//   Tooltip,
//   Menu,
//   Avatar,
//   Drawer,
//   Table,
// } from "antd";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import BleachingHeader from "../Components/BleachingHeader";
// import Paragraph from "antd/es/skeleton/Paragraph";
// import { useNavigate, useLocation } from "react-router-dom";
// import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
// import { FaLock, FaUserCircle } from "react-icons/fa";
// import moment from "moment";
// import API from "../baseUrl.json";
// import logo from "../Assests/logo.png";
// import { TbMenuDeep } from "react-icons/tb";
// import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
// import { GoArrowLeft } from "react-icons/go";
// import { GrDocumentStore } from "react-icons/gr";
// import TextArea from "antd/es/input/TextArea";
// import approveIcon from "../Assests/outlined-approve.svg";
// import rejectIcon from "../Assests/outlined-reject.svg";
// import PrecotSidebar from "../Components/PrecotSidebar.js";

// const PadPunching_f02 = () => {
//   const navigate = useNavigate();
//   const { Column, ColumnGroup } = Table;
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");
//   const location = useLocation();
//   const [open, setOpen] = useState(false);
//   const { state } = location;
//   const { shift, date, machineName } = state || {};
//   const [saveLoading, setSaveLoading] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [emptyarraycheck, setemptyarraycheck] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [rejectRemarks, setRejectRemarks] = useState("");
//   const [getImage1, setGetImage1] = useState("");
//   const [getImage2, setGetImage2] = useState("");
//   const [getImage3, setGetImage3] = useState("");
//   const [productDetails, setProductDetails] = useState();
//   const [RolconsumptionDetails, setRollConsumptionDetails] = useState("");
//   const [ScreenOneRecord, setScreenOneRecord] = useState([]);
//   const [ScreenThreeRecord, setScreenThreeRecord] = useState([]);
//   const [ScreenTwoRecord, setScreenTwoRecord] = useState([]);
//   const [ReportId, setReportId] = useState("");
//   const [productAct, setProductAct] = useState("");
//   const [productTypeOfPad, setProductTypeOfPad] = useState("");
//   const [ProductName, setProductName] = useState("");
//   const [productBMRNo, setProductBMRNo] = useState("");
//   const [productPattern, setProductPattern] = useState("");
//   const [productGSM, setProductGSM] = useState("");
//   const [productEdge, setProductEdge] = useState("");
//   const [productSTD, setProductSTD] = useState("");

//   const [balanceWt, setBalanceWt] = useState("");
//   const [RollConsumptionDate, setRollConsumptionDate] = useState("");
//   const [RollConsumptionTime, setRollConsumptionTime] = useState("");
//   const [orderNumberRollConsumption, setOrderNumberRollConsumption] =
//     useState("");
//   const [RollConsumptionRollNo, setRollConsumptionRollNO] = useState("");
//   const [RollConsumptionShaftNo, setConsumptionShaftNo] = useState("");
//   const [RollConsumptionNetWt, setRollConsumptionNetWt] = useState("");
//   const [RollConsumptionBalanceWt, setRollConsumptionBalanceWt] = useState("");
//   const [orderNumberLov, setOrderNumberLov] = useState([]);

//   const [rowData, setRowData] = useState([]);
//   const [rowDataOne, setRowDataOne] = useState([]);
//   const [remarksStopage, setRemarksStopage] = useState("");
//   const [attendBy, setAttendBy] = useState("");
//   const [MCStopTime, setMCStopTime] = useState("");
//   const [MCStartTime, setMCStartTime] = useState("");
//   const [TotalMinStoppage, setTotalMinStoppage] = useState("");
//   const [StoppageReasoon, setStoppageReason] = useState("");

//   const [productionDetails, setaProductionDetails] = useState("");
//   const [remarks, setRemarks] = useState("");

//   const disabled =
//     (role == "ROLE_OPERATOR" &&
//       RolconsumptionDetails?.operator_status == "OPERATOR_APPROVED" &&
//       RolconsumptionDetails?.supervisor_status !== "SUPERVISOR_REJECTED" &&
//       RolconsumptionDetails?.hod_status !== "HOD_REJECTED") ||
//     role == "ROLE_HOD" ||
//     role == "ROLE_DESIGNEE";

//   const formattedDateSubmittedOn = (dateString) => {
//     if (dateString) {
//       const date = moment(dateString);
//       if (date.isValid()) {
//         return date.format("DD/MM/YYYY HH:mm");
//       }
//     }
//     return "";
//   };
//   const handleKeyDown2 = (e) => {
//     const isAlphanumeric = /^[a-zA-Z0-9.]$/;

//     if (
//       !isAlphanumeric.test(e.key) &&
//       !["Backspace", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)
//     ) {
//       e.preventDefault();
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const username = RolconsumptionDetails?.operator_sign;
//     if (username) {
//       console.log("usernameparams", username);

//       axios
//         .get(
//           `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + token,
//             },
//             responseType: "arraybuffer",
//           }
//         )
//         .then((res) => {
//           console.log("Response:", res.data);
//           const base64 = btoa(
//             new Uint8Array(res.data).reduce(
//               (data, byte) => data + String.fromCharCode(byte),
//               ""
//             )
//           );
//           const url = `data:image/jpeg;base64,${base64}`;
//           setGetImage1(url);
//         })
//         .catch((err) => {
//           console.log("Error in fetching image:", err);
//         });
//     }
//   }, [RolconsumptionDetails, API.prodUrl, token]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const username = RolconsumptionDetails?.supervisor_sign;
//     if (username) {
//       console.log("usernameparams", username);

//       axios
//         .get(
//           `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + token,
//             },
//             responseType: "arraybuffer",
//           }
//         )
//         .then((res) => {
//           console.log("Response:", res.data);
//           const base64 = btoa(
//             new Uint8Array(res.data).reduce(
//               (data, byte) => data + String.fromCharCode(byte),
//               ""
//             )
//           );
//           const url = `data:image/jpeg;base64,${base64}`;
//           setGetImage2(url);
//         })
//         .catch((err) => {
//           console.log("Error in fetching image:", err);
//         });
//     }
//   }, [RolconsumptionDetails, API.prodUrl, token]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const username = RolconsumptionDetails?.hod_sign;
//     if (username) {
//       console.log("usernameparams", username);

//       axios
//         .get(
//           `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + token,
//             },
//             responseType: "arraybuffer",
//           }
//         )
//         .then((res) => {
//           console.log("Response:", res.data);
//           const base64 = btoa(
//             new Uint8Array(res.data).reduce(
//               (data, byte) => data + String.fromCharCode(byte),
//               ""
//             )
//           );
//           const url = `data:image/jpeg;base64,${base64}`;
//           setGetImage3(url);
//         })
//         .catch((err) => {
//           console.log("Error in fetching image:", err);
//         });
//     }
//   }, [RolconsumptionDetails, API.prodUrl, token]);

//   const handleSave = async () => {
//     try {
//       await saveRollConsumptionRecord();
//     } catch (error) {
//       console.error("Error saving Roll Consumption Record :", error);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       await SubmitRollConsumptionRecord();
//     } catch (error) {
//       console.error("Error submitting Roll Consumption Record:", error);
//     }
//   };

//   const saveRollConsumptionRecord = async () => {
//     setSaveLoading(true);
//     try {
//       const payload = {
//         formatName: "Daily Roll Consumption Report-Pad Punching",
//         formatNo: "PH-PRD03/F-002",
//         revisionNo: 2,
//         refSopNo: "PH-PRD04-D-03",
//         reportId: ReportId,
//         unit: "Unit H",
//         date: date,
//         shift: shift,
//         machineName: machineName,
//         machineDetails: ScreenOneRecord.map((item, index) => ({
//           typeOfPad: item.Typeofpad,
//           productName: item.Material,
//           bmrNo: item.POrder,
//           pattern: item.Pattern,
//           gsm: item.gsm,
//           edge: item.Edge,
//           noOfPadsStd: item.NoOfPcPerBag,
//           noOfPadsAct: rowDataOne[index]?.productAct || "",
//         })),
//         rollConsumptionDetails: ScreenTwoRecord.map((item, index) => ({
//           date: item.RPackDt,
//           time: item.CreatedOn,
//           bmrNo: item.POrder,
//           rollNo: item.BaleNo,
//           shaftNo: item.ShaftNo,
//           netWt: item.RNWt,
//           balanceWt: item.BalanceWeight,
//         })),
//         stoppageDetails: ScreenThreeRecord.map((item, index) => ({
//           stopTime: item.TTime,
//           startTime: item.FTime,
//           totalMin: item.TotHrs,
//           reason: item.Scause,
//           attendBy: rowData[index]?.attendBy || "",
//           remarks: rowData[index]?.remarksStopage || "",
//         })),
//         remarks: remarks,
//         prodDetailsInBags: productDetails,
//       };

//       const token = localStorage.getItem("token");
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       };

//       const response = await axios.post(
//         `${ API.prodUrl}/Precot/api/PadPunching/Service/RollConsumptionReport/saveReport`,
//         payload,
//         { headers }
//       );

//       console.log("API Response:", response.data.id);
//       localStorage.setItem("id", response.data.id);
//       setTimeout(() => {
//         navigate("/Precot/PadPunching/F-02/Summary");
//       }, 1500);
//       message.success("Pad Punching Record Saved Successfully..");
//     } catch (error) {
//       console.error("Error:", error);
//       message.error(error.response.data.message);

//       throw new Error("Failed to save Pad Punching Record  !!");
//     } finally {
//       setSaveLoading(false);
//     }
//   };
//   const SubmitRollConsumptionRecord = async () => {
//     setSubmitLoading(true);
//     try {
//       const payload = {
//         formatName: "Daily Roll Consumption Report-Pad Punching",
//         formatNo: "PH-PRD03/F-002",
//         revisionNo: 2,
//         refSopNo: "PH-PRD04-D-03",
//         reportId: ReportId,
//         unit: "Unit H",
//         date: date,
//         shift: shift,
//         machineName: machineName,
//         machineDetails: ScreenOneRecord.map((item, index) => ({
//           typeOfPad: item.Typeofpad,
//           productName: item.Material,
//           bmrNo: item.POrder,
//           pattern: item.Pattern,
//           gsm: item.gsm,
//           edge: item.Edge,
//           noOfPadsStd: item.NoOfPcPerBag,
//           noOfPadsAct: rowDataOne[index]?.productAct || "",
//         })),
//         rollConsumptionDetails: ScreenTwoRecord.map((item, index) => ({
//           date: item.RPackDt,
//           time: item.CreatedOn,
//           bmrNo: item.POrder,
//           rollNo: item.BaleNo,
//           shaftNo: item.ShaftNo,
//           netWt: item.RNWt,
//           balanceWt: item.BalanceWeight,
//         })),
//         stoppageDetails: ScreenThreeRecord.map((item, index) => ({
//           stopTime: item.TTime,
//           startTime: item.FTime,
//           totalMin: item.TotHrs,
//           reason: item.Scause,
//           attendBy: rowData[index]?.attendBy || "",
//           remarks: rowData[index]?.remarksStopage || "",
//         })),
//         remarks: remarks,
//         prodDetailsInBags: productDetails,
//       };
//       const token = localStorage.getItem("token");
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       };

//       const response = await axios.post(
//         `${ API.prodUrl}/Precot/api/PadPunching/Service/RollConsumptionReport/SubmitReport`,
//         payload,
//         { headers }
//       );

//       setTimeout(() => {
//         navigate("/Precot/PadPunching/F-02/Summary");
//       }, 1500);

//       message.success("Pad Punching Record Submitted Successfully..");
//     } catch (error) {
//       console.error("Error:", error);
//       message.error(error.response.data.message);

//       throw new Error("Failed to submit Roll Consumption Record !!");
//     } finally {
//       setSubmitLoading(false);
//     }
//   };
//   const handleApprove = async () => {
//     setSaveLoading(true);

//     const headers = {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     const res = await axios
//       .put(
//         `${ API.prodUrl}/Precot/api/PadPunching/Service/RollConsumptionReport/approveOrReject`,
//         {
//           id: ReportId,
//           status: "Approve",
//         },
//         { headers }
//       )
//       .then((res) => {
//         console.log("messsage", res);
//         message.success(res.data.message);
//         navigate("/Precot/PadPunching/F-02/Summary");
//       })
//       .catch((err) => {
//         console.log("Err", err.response.data.message);
//         message.error(err.response.data.message);
//       })
//       .finally(() => {
//         setSaveLoading(false);
//       });
//   };
//   const handleRejectModal = () => {
//     setShowModal(true);
//   };
//   const handleReject = async () => {
//     setSubmitLoading(true);

//     const headers = {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     const res = await axios
//       .put(
//         `${ API.prodUrl}/Precot/api/PadPunching/Service/RollConsumptionReport/approveOrReject`,
//         {
//           id: ReportId,
//           status: "Reject",
//           remarks: rejectRemarks,
//         },
//         { headers }
//       )
//       .then((res) => {
//         console.log("messsage", res.data.message);
//         message.success(res.data.message);
//         navigate("/Precot/PadPunching/F-02/Summary");
//       })
//       .catch((err) => {
//         console.log("Err", err.response.data.message);
//         message.error(err.response.data.message);
//       })
//       .finally(() => {
//         setSubmitLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchDetailsByDateShiftMachineName();
//     ScreenThreeApi();
//   }, []);

//   const fetchDetailsByDateShiftMachineName = async () => {
//     try {
//       const response = await axios.get(
//         `${ API.prodUrl}/Precot/api/PadPunching/Service/RollConsumptionReport/getByDateShiftMachine?date=${date}&shift=${shift}&machineName=${machineName}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setemptyarraycheck(response.data.length);
//       setRollConsumptionDetails(response.data);

//       if (response.data.message == "No data") {
//         ScreenOneApi();
//         ScreenThreeApi();
//       }
//       if (response.data && response.data.message !== "No data") {
//         console.log("inside data", response.data);
//         const data = response.data;
//         setReportId(response.data.reportId);
//         setRemarks(response.data.remarks || "NA");
//         setProductDetails(response.data.prodDetailsInBags || "NA");
//         if (data.machineDetails) {
//           setScreenOneRecord(
//             data.machineDetails.map((item) => ({
//               MCN: machineName,
//               Typeofpad: item.typeOfPad,
//               Material: item.productName,
//               POrder: item.bmrNo,
//               Pattern: item.pattern,
//               gsm: item.gsm,
//               Edge: item.edge,
//               NoOfPcPerBag: item.noOfPadsStd,
//             }))
//           );
//         }
//         if (data.rollConsumptionDetails) {
//           setScreenTwoRecord(
//             data.rollConsumptionDetails.map((item) => ({
//               RPackDt: item.date,
//               CreatedOn: item.time,
//               POrder: item.bmrNo,
//               BaleNo: item.rollNo,
//               ShaftNo: item.shaftNo,
//               RNWt: item.netWt,
//               BalanceWeight: item.balanceWt,
//             }))
//           );
//         }
//         if (data.stoppageDetails) {
//           setScreenThreeRecord(
//             data.stoppageDetails.map((item) => ({
//               TTime: item.stopTime,
//               FTime: item.startTime,
//               TotHrs: item.totalMin,
//               Scause: item.reason,
//             }))
//           );
//         }

//         setRowDataOne(
//           data.machineDetails.map((item) => ({
//             productAct: item.noOfPadsAct || "NA",
//           }))
//         );
//         setRowData(
//           data.stoppageDetails.map((item) => ({
//             attendBy: item.attendBy || "NA",
//             remarksStopage: item.remarks || "NA",
//           }))
//         );
//         if (
//           ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
//             response.data.supervisor_status !== "SUPERVISOR_APPROVED") ||
//           ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
//             response.data.hod_status == "HOD_REJECTED")
//         ) {
//           message.error("Supervisor Yet Not Approved");
//           setTimeout(() => {
//             navigate("/Precot/PadPunching/F-02/Summary");
//           }, 1500);
//         }
//         // if((role=="ROLE_HOD"||role=="ROLE_DESIGNEE") &&(res.data[0].supervisor_status !=="SUPERVISOR_APPROVED")){
//         if (
//           (role == "ROLE_SUPERVISOR" &&
//             response.data.operator_status !== "OPERATOR_APPROVED") ||
//           (role == "ROLE_SUPERVISOR" &&
//             (response.data.supervisor_status == "SUPERVISOR_REJECTED" ||
//               response.data.hod_status == "HOD_REJECTED"))
//         ) {
//           message.error("Operator Yet Not Approved");
//           setTimeout(() => {
//             navigate("/Precot/PadPunching/F-02/Summary");
//           }, 1500);
//         }
//       } else {
//       }
//     } catch (e) {
//     } finally {
//     }
//   };
//   function convertShift(shift) {
//     switch (shift) {
//       case "I":
//         return 1;
//       case "II":
//         return 2;
//       case "III":
//         return 3;
//       default:
//         return null;
//     }
//   }
//   useEffect(() => {
//     const fetchOrderNumberOptions = async () => {
//       try {
//         const response = await fetch(
//           `${ API.prodUrl}/Precot/api/padpunching/orderNoList`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const data = await response.json();
//         console.log(data);

//         if (Array.isArray(data)) {
//           setOrderNumberLov(data);
//         } else {
//           console.error("API response is not an array", data);
//           setOrderNumberLov([]);
//         }
//       } catch (error) {
//         console.error("Error fetching BMR options:", error);
//         setOrderNumberLov([]);
//       }
//     };

//     fetchOrderNumberOptions();
//   }, [token]);

//   const handleInputOneChange = (index, field, value) => {
//     const updatedRowData = [...rowDataOne];
//     if (updatedRowData[index]) {
//       updatedRowData[index][field] = value;
//       setRowDataOne(updatedRowData);
//     }
//   };
//   const ScreenOneApi = async () => {
//     try {
//       const formattedShift = convertShift(shift);
//       const response = await axios.get(
//         `${ API.prodUrl}/Precot/api/padpunching/api/DailyRollConsumptionDetail1?ConsDt=${date}&mcn=${machineName}&shiftId=${formattedShift}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setScreenOneRecord(response.data);
//       const initialRowData = response.data.map(() => ({
//         productAct: "",
//       }));
//       setRowDataOne(initialRowData);
//     } catch (error) {
//       console.error("Error checking BMR existence:", error);
//       message.error(error.message);
//     } finally {
//     }
//   };
//   const ScreenTwoApi = async (value) => {
//     try {
//       setOrderNumberRollConsumption(value);
//       const formattedShift = convertShift(shift);
//       const response = await axios.get(
//         `${ API.prodUrl}/Precot/api/padpunching/api/DailyRollConsumption2?ConsDt=${date}&POrder=${value}&ShiftId=${formattedShift}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setScreenTwoRecord(response.data);

//       console.log("screen tow details", response.data[0].ShaftNo);
//     } catch (error) {
//       console.error("Error checking BMR existence:", error);
//       message.error(error.message);
//     } finally {
//     }
//   };
//   const handleInputChange = (index, field, value) => {
//     const updatedRowData = [...rowData];
//     if (updatedRowData[index]) {
//       updatedRowData[index][field] = value;
//       setRowData(updatedRowData);
//     }
//   };
//   const ScreenThreeApi = async () => {
//     try {
//       const formattedShift = convertShift(shift);
//       const response = await axios.get(
//         `${ API.prodUrl}/Precot/api/padpunching/api/DailyRollConsumption3?PackDt=${date}&ShiftID=${formattedShift}&mcn=${machineName}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setScreenThreeRecord(response.data);
//       const initialRowData = response.data.map(() => ({
//         attendBy: "",
//         remarksStopage: "",
//       }));
//       setRowData(initialRowData);
//       console.log("screen three record", response.data);
//     } catch (error) {
//       console.error("Error checking BMR existence:", error);
//       // message.error(error.message);
//     } finally {
//     }
//   };
//   const showDrawer = () => {
//     setOpen(true);
//   };
//   const onClose = () => {
//     setOpen(false);
//   };
//   const handleBack = () => {
//     navigate("/Precot/PadPunching/F-02/Summary");
//   };

//   const canDisplayButtons = () => {
//     if (role === "ROLE_OPERATOR") {
//       if (
//         RolconsumptionDetails &&
//         RolconsumptionDetails.operator_status === "OPERATOR_APPROVED" &&
//         RolconsumptionDetails.hod_status !== "HOD_REJECTED" &&
//         RolconsumptionDetails.supervisor_status !== "SUPERVISOR_REJECTED"
//       ) {
//         return "none";
//       }
//       return "block";
//     } else if (role == "ROLE_SUPERVISOR") {
//       if (
//         RolconsumptionDetails?.supervisor_status == "SUPERVISOR_APPROVED" &&
//         RolconsumptionDetails?.hod_status == "HOD_REJECTED"
//       ) {
//         return "block";
//       } else if (
//         (RolconsumptionDetails?.supervisor_status == "SUPERVISOR_APPROVED" &&
//           RolconsumptionDetails?.hod_status == "WAITING_FOR_APPROVAL") ||
//         RolconsumptionDetails?.hod_status == "HOD_APPROVED"
//       ) {
//         return "none";
//       }
//     } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
//       if (
//         RolconsumptionDetails?.hod_status == "HOD_APPROVED" ||
//         RolconsumptionDetails?.hod_status == "HOD_REJECTED"
//       ) {
//         return "none";
//       }
//       return "block";
//     } else {
//       if (
//         RolconsumptionDetails?.hod_status == "HOD_APPROVED" ||
//         RolconsumptionDetails?.hod_status == "HOD_REJECTED"
//       ) {
//         return "none";
//       }
//       return "block";
//     }
//   };
//   const canDisplayButton2 = () => {
//     if (role == "ROLE_OPERATOR") {
//       if (RolconsumptionDetails?.operator_status == "OPERATOR_APPROVED") {
//         return "none";
//       }
//     } else if (
//       role == "ROLE_SUPERVISOR" ||
//       role == "ROLE_HOD" ||
//       role == "ROLE_DESIGNEE"
//     ) {
//       return "none";
//     }
//   };

//   const formattedDate = (date) => {
//     if (date) {
//       const dateObject = moment(date);
//       if (dateObject.isValid()) {
//         return dateObject.format("HH:mm");
//       }
//     }
//     return "";
//   };

//   useEffect(() => {}, []);

//   const items = [
//     {
//       key: "1",
//       label: <p>Product Details</p>,
//       children: (
//         <div>
//           <table>
//             <tr>
//               <th colSpan="15" rowSpan="2" style={{ height: "25px" }}>
//                 Machine Name
//               </th>
//               <th colSpan="15" rowSpan="2">
//                 Type Of Pad
//               </th>
//               <th colSpan="10" rowSpan="2">
//                 Product Name
//               </th>
//               <th colSpan="10" rowSpan="2">
//                 BMR NO. / ORDER NO.
//               </th>
//               <th colSpan="10" rowSpan="2">
//                 Pattern
//               </th>
//               <th colSpan="10" rowSpan="2">
//                 GSM
//               </th>
//               <th colSpan="10" rowSpan="2">
//                 Edge
//               </th>
//               <th colSpan="20">No of Pads / Bags</th>
//             </tr>
//             <th colSpan="10" style={{ textAlign: "center" }}>
//               STD
//             </th>
//             <th colSpan="10" style={{ textAlign: "center" }}>
//               Act
//             </th>
//             <tr></tr>
//             {ScreenOneRecord.map((item, index) => (
//               <tr key={index}>
//                 <td
//                   colSpan="15"
//                   style={{ height: "25px", textAlign: "center" }}
//                 >
//                   {item.MCN}
//                 </td>
//                 <td colSpan="15" style={{ textAlign: "center" }}>
//                   {item.Typeofpad}
//                 </td>
//                 <td colSpan="10" style={{ textAlign: "center" }}>
//                   {item.Material}
//                 </td>
//                 <td colSpan="10" style={{ textAlign: "center" }}>
//                   {item.POrder}
//                 </td>
//                 <td colSpan="10" style={{ textAlign: "center" }}>
//                   {item.Pattern}
//                 </td>
//                 <td colSpan="10" style={{ textAlign: "center" }}>
//                   {item.gsm}
//                 </td>
//                 <td colSpan="10" style={{ textAlign: "center" }}>
//                   {item.Edge}
//                 </td>
//                 <td colSpan="10" style={{ textAlign: "center" }}>
//                   {item.NoOfPcPerBag}
//                 </td>
//                 <td colSpan="10">
//                   <input
//                     className="inp-new"
//                     style={{
//                       width: "98%",
//                       border: "none",
//                       height: "35px",
//                       paddingLeft: "2px",
//                     }}
//                     disabled={disabled}
//                     value={rowDataOne[index]?.productAct || ""}
//                     onChange={(e) =>
//                       handleInputOneChange(index, "productAct", e.target.value)
//                     }
//                     onKeyDown={handleKeyDown2}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </table>
//         </div>
//       ),
//     },
//     {
//       key: "2",
//       label: <p>Roll Consumption Details</p>,
//       children: (
//         <div>
//           <Select
//             showSearch
//             value={orderNumberRollConsumption}
//             onChange={(value) => {
//               ScreenTwoApi(value);
//             }}
//             style={{ width: "30%", marginBottom: "20px" }}
//             placeholder="Search Order Number"
//             disabled={disabled}
//           >
//             <Select.Option value="" disabled selected>
//               Select Order Number
//             </Select.Option>
//             {orderNumberLov.map((order) => (
//               <Select.Option key={order.value} value={order.value}>
//                 {order.value}
//               </Select.Option>
//             ))}
//           </Select>
//           <table style={{ tableLayout: "fixed" }}>
//             <tr>
//               <th colSpan="15" style={{ height: "25px" }}>
//                 Date
//               </th>
//               <th colSpan="15">Time</th>
//               <th colSpan="20">BMR NO. / ORDER NO</th>
//               <th colSpan="15">Roll No</th>
//               <th colSpan="20">Shaft No.</th>
//               <th colSpan="10">Net Wt.</th>
//               <th colSpan="15">Balance Wt.</th>
//             </tr>
//             {ScreenTwoRecord.map((item, index) => (
//               <tr key={index}>
//                 <td
//                   colSpan="15"
//                   style={{ height: "25px", textAlign: "center" }}
//                 >
//                   {item.RPackDt}
//                 </td>
//                 <td colSpan="15" style={{ textAlign: "center" }}>
//                   {formattedDate(item.CreatedOn)}
//                 </td>
//                 <td colSpan="20" style={{ textAlign: "center" }}>
//                   {item.POrder}{" "}
//                 </td>
//                 <td colSpan="15" style={{ textAlign: "center" }}>
//                   {item.BaleNo}
//                 </td>
//                 <td colSpan="20" style={{ textAlign: "center" }}>
//                   {item.ShaftNo}
//                 </td>
//                 <td colSpan="10" style={{ textAlign: "center" }}>
//                   {item.RNWt}
//                 </td>
//                 <td colSpan="15" style={{ textAlign: "center" }}>
//                   {" "}
//                   {item.BalanceWeight}
//                 </td>
//               </tr>
//             ))}
//           </table>
//         </div>
//       ),
//     },
//     {
//       key: "3",
//       label: <p>Stoppage Details</p>,
//       children: (
//         <div>
//           <table>
//             <tr>
//               <th colSpan="15" style={{ height: "25px" }}>
//                 M/c stop time (min)
//               </th>
//               <th colSpan="15">M/c start time (min)</th>
//               <th colSpan="15">Total min</th>
//               <th colSpan="15">Reason</th>
//               <th colSpan="15">Attend by</th>
//               <th colSpan="15">Remarks</th>
//             </tr>
//             {ScreenThreeRecord.map((item, index) => {
//               const MCStopTime = item.TTime;
//               const MCStartTime = item.FTime;
//               const TotalMinStoppage = item.TotHrs;
//               const StoppageReason = item.Scause;

//               return (
//                 <tr key={index}>
//                   <td
//                     colSpan="15"
//                     style={{ height: "25px", textAlign: "center" }}
//                   >
//                     {MCStopTime}
//                   </td>
//                   <td colSpan="15" style={{ textAlign: "center" }}>
//                     {MCStartTime}
//                   </td>
//                   <td colSpan="15" style={{ textAlign: "center" }}>
//                     {TotalMinStoppage}
//                   </td>
//                   <td colSpan="15" style={{ textAlign: "center" }}>
//                     {StoppageReason}
//                   </td>
//                   <td colSpan="15">
//                     <input
//                       className="inp-new"
//                       style={{
//                         width: "98%",
//                         border: "none",
//                         height: "35px",
//                         paddingLeft: "2px",
//                       }}
//                       value={rowData[index]?.attendBy || ""}
//                       disabled={disabled}
//                       onChange={(e) =>
//                         handleInputChange(index, "attendBy", e.target.value)
//                       }
//                       onKeyDown={handleKeyDown2}
//                     />
//                   </td>
//                   {/* <td colSpan="15"> */}
//                   {/* <input
//                       className="inp-new"
//                       style={{
//                         width: "98%",
//                         border: "none",
//                         height: "35px",
//                         paddingLeft: "2px",
//                       }}
//                       value={rowData[index]?.remarksStopage || ""}
//                       disabled={disabled}
//                       onChange={(e) =>
//                         handleInputChange(
//                           index,
//                           "remarksStopage",
//                           e.target.value
//                         )
//                       }
//                     /> */}
//                   {/* </td> */}
//                   <td colSpan="15" style={{ textAlign: "center" }}>
//                     {rowData[index]?.remarksStopage || item.SRemarks || ""}
//                   </td>
//                 </tr>
//               );
//             })}
//             <tr>
//               <td
//                 colSpan="100"
//                 style={{ padding: "10px", borderBottom: "none" }}
//               >
//                 Production Details in Bags :{" "}
//               </td>
//             </tr>
//             <tr>
//               <td colSpan="100" style={{ height: "20px", borderTop: "none" }}>
//                 <TextArea
//                   value={productDetails}
//                   onChange={(e) => setProductDetails(e.target.value)}
//                   rows={2}
//                   style={{ width: "100%" }}
//                   disabled={disabled}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td
//                 colSpan="100"
//                 style={{ padding: "10px", borderBottom: "none" }}
//               >
//                 Remarks:
//               </td>
//             </tr>
//             <tr>
//               <td colSpan="100" style={{ height: "25px", borderTop: "none" }}>
//                 <TextArea
//                   value={remarks}
//                   onChange={(e) => setRemarks(e.target.value)}
//                   rows={2}
//                   style={{ width: "100%" }}
//                   disabled={disabled}
//                 />
//               </td>
//             </tr>
//           </table>
//         </div>
//       ),
//     },
//     {
//       key: "4",
//       label: <p>Reviews</p>,
//       children: (
//         <div>
//           <table style={{ width: "100%", margin: "auto" }}>
//             <tr>
//               <td
//                 colSpan="34"
//                 style={{ height: "35px", textAlign: "center", width: "30%" }}
//               >
//                 Operator Sign & Date
//               </td>
//               <td colSpan="33" style={{ textAlign: "center", width: "35%" }}>
//                 Production Supervisor Sign & Date
//               </td>
//               <td colSpan="33" style={{ textAlign: "center", width: "35%" }}>
//                 HOD/ Designee Sign & Date
//               </td>
//             </tr>
//             <tr>
//               <td
//                 colSpan="34"
//                 style={{
//                   height: "80px",
//                   textAlign: "center",
//                   marginBottom: "auto",
//                   // verticalAlign: "bottom",
//                 }}
//               >
//                 {RolconsumptionDetails?.operator_status ===
//                   "OPERATOR_APPROVED" && (
//                   <>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <div>
//                         {" "}
//                         <div>{RolconsumptionDetails?.operator_sign}</div>
//                         <div>
//                           {formattedDateSubmittedOn(
//                             RolconsumptionDetails?.operator_submitted_on
//                           )}
//                         </div>
//                       </div>
//                       {getImage1 && (
//                         <img
//                           src={getImage1}
//                           alt="Operator Sign"
//                           style={{
//                             width: "60px",
//                             height: "60px",
//                             marginLeft: "20px",
//                             objectFit: "contain",
//                             mixBlendMode: "multiply",
//                             justifyContent: "center",
//                           }}
//                         />
//                       )}
//                     </div>
//                   </>
//                 )}
//               </td>

//               <td
//                 colSpan="33"
//                 style={{
//                   height: "80px",
//                   textAlign: "center",
//                   marginBottom: "auto",
//                   // verticalAlign: "bottom",
//                 }}
//               >
//                 {(RolconsumptionDetails?.supervisor_status ===
//                   "SUPERVISOR_REJECTED" ||
//                   RolconsumptionDetails?.supervisor_status ===
//                     "SUPERVISOR_APPROVED") && (
//                   <>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <div>
//                         {" "}
//                         <div>{RolconsumptionDetails?.supervisor_sign}</div>
//                         <div>
//                           {formattedDateSubmittedOn(
//                             RolconsumptionDetails?.supervisor_submit_on
//                           )}
//                         </div>
//                       </div>
//                       {getImage2 && (
//                         <img
//                           src={getImage2}
//                           alt="Superviosr Sign"
//                           style={{
//                             width: "60px",
//                             height: "60px",
//                             marginLeft: "20px",
//                             objectFit: "contain",
//                             mixBlendMode: "multiply",
//                             justifyContent: "center",
//                           }}
//                         />
//                       )}
//                     </div>
//                   </>
//                 )}
//               </td>

//               <td
//                 colSpan="50"
//                 style={{
//                   textAlign: "center",
//                   // verticalAlign: "bottom"
//                 }}
//               >
//                 {(RolconsumptionDetails?.hod_status === "HOD_REJECTED" ||
//                   RolconsumptionDetails?.hod_status === "HOD_APPROVED") && (
//                   <>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <div>
//                         {" "}
//                         <div>{RolconsumptionDetails?.hod_sign}</div>
//                         <div>
//                           {formattedDateSubmittedOn(
//                             RolconsumptionDetails?.hod_submit_on
//                           )}
//                         </div>
//                       </div>
//                       {getImage3 && (
//                         <img
//                           src={getImage3}
//                           alt="HOD Sign"
//                           style={{
//                             width: "60px",
//                             height: "60px",
//                             marginLeft: "20px",
//                             objectFit: "contain",
//                             mixBlendMode: "multiply",
//                             justifyContent: "space-evenly",
//                           }}
//                         />
//                       )}
//                     </div>{" "}
//                   </>
//                 )}
//               </td>
//             </tr>
//           </table>
//         </div>
//       ),
//     },
//   ];

//   const formatName = "CONTAMINATION CHECKING REPORT(Absorbent Bleached Cotton)";
//   const formatNo = "PRD01/F-18";
//   const revisionNo = "02";
//   const sopNo = "PRD01-D-09";

//   return (
//     <div>
//       <PrecotSidebar
//         open={open}
//         onClose={onClose}
//         role={localStorage.getItem("role")}
//       />
//       <BleachingHeader
//         unit="Unit-H"
//         formName="Daily Roll Consumption Report-Pad Punching"
//         formatNo="PH-PRD03/F-002 "
//         sopNo="PH-PRD04-D-03"
//         MenuBtn={
//           <Button
//             type="primary"
//             icon={<TbMenuDeep />}
//             onClick={showDrawer}
//           ></Button>
//         }
//         buttonsArray={[
//           role === "ROLE_SUPERVISOR" ||
//           role === "ROLE_HOD" ||
//           role === "ROLE_QA" ||
//           role === "ROLE_QC" ||
//           role === "ROLE_DESIGNEE" ? (
//             <>
//               <Button
//                 loading={saveLoading}
//                 type="primary"
//                 style={{
//                   backgroundColor: "#E5EEF9",
//                   color: "#00308F",
//                   fontWeight: "bold",
//                   display: canDisplayButtons(),
//                 }}
//                 onClick={handleApprove}
//                 shape="round"
//                 icon={<img src={approveIcon} alt="Approve Icon" />}
//               >
//                 &nbsp;Approve
//               </Button>
//               <Button
//                 loading={saveLoading}
//                 type="primary"
//                 style={{
//                   backgroundColor: "#E5EEF9",
//                   color: "#00308F",
//                   fontWeight: "bold",
//                   display: canDisplayButtons(),
//                 }}
//                 icon={<img src={rejectIcon} alt="Reject Icon" />}
//                 onClick={handleRejectModal}
//                 shape="round"
//               >
//                 &nbsp;Reject
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button
//                 loading={submitLoading}
//                 type="primary"
//                 style={{
//                   backgroundColor: "#E5EEF9",
//                   color: "#00308F",
//                   fontWeight: "bold",
//                   display: canDisplayButtons(),
//                 }}
//                 icon={<GrDocumentStore color="#00308F" />}
//                 onClick={handleSubmit}
//                 shape="round"
//               >
//                 &nbsp;Submit
//               </Button>
//               <Button
//                 loading={saveLoading}
//                 type="primary"
//                 style={{
//                   backgroundColor: "#E5EEF9",
//                   color: "#00308F",
//                   fontWeight: "bold",
//                   display: canDisplayButton2(),
//                 }}
//                 icon={<GrDocumentStore color="#00308F" />}
//                 onClick={handleSave}
//                 shape="round"
//               >
//                 &nbsp;Save
//               </Button>
//             </>
//           ),
//           <Button
//             type="primary"
//             style={{
//               backgroundColor: "#E5EEF9",
//               color: "#00308F",
//               fontWeight: "bold",
//             }}
//             onClick={handleBack}
//             shape="round"
//             icon={<GoArrowLeft color="#00308F" />}
//           >
//             &nbsp;Back
//           </Button>,

//           <Button
//             type="primary"
//             style={{
//               backgroundColor: "#E5EEF9",
//               color: "#00308F",
//               fontWeight: "bold",
//             }}
//             shape="round"
//             icon={<BiLock color="#00308F" />}
//             onClick={() => {
//               if (confirm("Are you sure want to logout")) {
//                 localStorage.removeItem("token");
//                 navigate("/Precot");
//               }
//             }}
//           >
//             Logout
//           </Button>,

//           <Tooltip
//             trigger="click"
//             style={{
//               backgroundColor: "#fff",
//             }}
//             title={
//               <div>
//                 <h3>{localStorage.getItem("username")}</h3>
//                 <p>{localStorage.getItem("role")}</p>
//               </div>
//             }
//           >
//             <Button
//               type="primary"
//               style={{
//                 backgroundColor: "#E5EEF9",
//               }}
//               shape="circle"
//               icon={<FaUserCircle color="#00308F" size={20} />}
//             />
//           </Tooltip>,
//         ]}
//       />
//       <div
//         style={{
//           display: "flex",
//           alignItems: "left",
//           gap: "10px",
//           marginTop: "20px",
//         }}
//       >
//         <Input
//           addonBefore="Date:"
//           placeholder="Date"
//           required
//           value={date}
//           disabled
//           style={{ width: "200px", height: "35px" }}
//         />
//         <Input
//           addonBefore="Shift:"
//           placeholder="Shift"
//           required
//           value={shift}
//           disabled
//           style={{ width: "200px", height: "35px" }}
//         />
//         <Input
//           addonBefore="Machine Name:"
//           placeholder="Machine Name"
//           required
//           value={machineName}
//           disabled
//           style={{ width: "300px", height: "35px" }}
//         />
//       </div>
//       <Modal
//         title="Reject"
//         open={showModal}
//         onOk={() => setShowModal(false)}
//         onCancel={() => setShowModal(false)}
//         destroyOnClose={true}
//         showSearch
//         footer={[
//           <Button
//             key="submit"
//             type="primary"
//             style={{
//               backgroundColor: "#E5EEF9",
//               color: "#00308F",
//               fontWeight: "bold",
//             }}
//             shape="round"
//             onClick={handleReject}
//           >
//             Submit
//           </Button>,
//         ]}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             marginBottom: "16px",
//           }}
//         >
//           <label style={{ marginRight: "8px" }}>Remarks:</label>
//           <TextArea
//             value={rejectRemarks}
//             onChange={(e) => setRejectRemarks(e.target.value)}
//             rows={4}
//             style={{ width: "100%" }}
//           />
//         </div>
//       </Modal>

//       <Tabs
//         defaultActiveKey="1"
//         items={items}
//         // onChange={onChange}
//         style={{
//           display: "flex",
//           width: "90%",
//           position: "relative",
//           left: "2%",
//         }}
//       />
//     </div>
//   );
// };

// export default PadPunching_f02;

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
  Table,
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
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const PadPunching_f02 = () => {
  const navigate = useNavigate();
  const { Column, ColumnGroup } = Table;
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { state } = location;
  const { shift, date, machineName } = state || {};
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [productDetails, setProductDetails] = useState();
  const [RolconsumptionDetails, setRollConsumptionDetails] = useState("");
  const [ScreenOneRecord, setScreenOneRecord] = useState([]);
  const [ScreenThreeRecord, setScreenThreeRecord] = useState([]);
  const [ScreenTwoRecord, setScreenTwoRecord] = useState([]);
  const [ReportId, setReportId] = useState("");
  const [productAct, setProductAct] = useState("");
  const [productTypeOfPad, setProductTypeOfPad] = useState("");
  const [ProductName, setProductName] = useState("");
  const [productBMRNo, setProductBMRNo] = useState("");
  const [productPattern, setProductPattern] = useState("");
  const [productGSM, setProductGSM] = useState("");
  const [productEdge, setProductEdge] = useState("");
  const [productSTD, setProductSTD] = useState("");

  const [balanceWt, setBalanceWt] = useState("");
  const [RollConsumptionDate, setRollConsumptionDate] = useState("");
  const [RollConsumptionTime, setRollConsumptionTime] = useState("");
  const [orderNumberRollConsumption, setOrderNumberRollConsumption] =
    useState("");
  const [RollConsumptionRollNo, setRollConsumptionRollNO] = useState("");
  const [RollConsumptionShaftNo, setConsumptionShaftNo] = useState("");
  const [RollConsumptionNetWt, setRollConsumptionNetWt] = useState("");
  const [RollConsumptionBalanceWt, setRollConsumptionBalanceWt] = useState("");
  const [orderNumberLov, setOrderNumberLov] = useState([]);

  const [rowData, setRowData] = useState([]);
  const [rowDataOne, setRowDataOne] = useState([]);
  const [remarksStopage, setRemarksStopage] = useState("");
  const [attendBy, setAttendBy] = useState("");
  const [MCStopTime, setMCStopTime] = useState("");
  const [MCStartTime, setMCStartTime] = useState("");
  const [TotalMinStoppage, setTotalMinStoppage] = useState("");
  const [StoppageReasoon, setStoppageReason] = useState("");

  const [productionDetails, setaProductionDetails] = useState("");
  const [remarks, setRemarks] = useState("");
  const [porder, setPorder] = useState("");

  const disabled =
    (role == "ROLE_OPERATOR" &&
      RolconsumptionDetails?.operator_status == "OPERATOR_APPROVED" &&
      RolconsumptionDetails?.supervisor_status !== "SUPERVISOR_REJECTED" &&
      RolconsumptionDetails?.hod_status !== "HOD_REJECTED") ||
    role == "ROLE_HOD" ||
    role == "ROLE_DESIGNEE";

  const formattedDateSubmittedOn = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const handleKeyDown2 = (e) => {
    const isAlphanumeric = /^[a-zA-Z0-9.]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = RolconsumptionDetails?.operator_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [RolconsumptionDetails, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = RolconsumptionDetails?.supervisor_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [RolconsumptionDetails, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = RolconsumptionDetails?.hod_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [RolconsumptionDetails, API.prodUrl, token]);

  const handleSave = async () => {
    try {
      await saveRollConsumptionRecord();
    } catch (error) {
      console.error("Error saving Roll Consumption Record :", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await SubmitRollConsumptionRecord();
    } catch (error) {
      console.error("Error submitting Roll Consumption Record:", error);
    }
  };

  const saveRollConsumptionRecord = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        formatName: "Daily Roll Consumption Report-Pad Punching",
        formatNo: "PH-PRD03/F-002",
        revisionNo: 2,
        refSopNo: "PH-PRD04-D-03",
        reportId: ReportId,
        unit: "Unit H",
        date: date,
        shift: shift,
        machineName: machineName,
        machineDetails: ScreenOneRecord.map((item, index) => ({
          typeOfPad: item.Typeofpad,
          productName: item.Material,
          bmrNo: item.POrder,
          pattern: item.Pattern,
          gsm: item.gsm,
          edge: item.Edge,
          noOfPadsStd: item.NoOfPcPerBag,
          noOfPadsAct: rowDataOne[index]?.productAct || "",
        })),
        rollConsumptionDetails: ScreenTwoRecord.map((item, index) => ({
          date: item.RPackDt,
          time: item.CreatedOn,
          bmrNo: item.POrder,
          rollNo: item.BaleNo,
          shaftNo: item.ShaftNo,
          netWt: item.RNWt,
          balanceWt: item.BalanceWeight,
        })),
        stoppageDetails: ScreenThreeRecord.map((item, index) => ({
          stopTime: item.TTime,
          startTime: item.FTime,
          totalMin: item.TotHrs,
          reason: item.Scause,
          attendBy: rowData[index]?.attendBy || "",
          remarks: rowData[index]?.remarksStopage || "",
        })),
        remarks: remarks,
        prodDetailsInBags: productDetails,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/RollConsumptionReport/saveReport`,
        payload,
        { headers }
      );

      console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/PadPunching/F-02/Summary");
      }, 1500);
      message.success("Pad Punching Record Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save Pad Punching Record  !!");
    } finally {
      setSaveLoading(false);
    }
  };
  const SubmitRollConsumptionRecord = async () => {
    setSubmitLoading(true);
    try {
      const payload = {
        formatName: "Daily Roll Consumption Report-Pad Punching",
        formatNo: "PH-PRD03/F-002",
        revisionNo: 2,
        refSopNo: "PH-PRD04-D-03",
        reportId: ReportId,
        unit: "Unit H",
        date: date,
        shift: shift,
        machineName: machineName,
        machineDetails: ScreenOneRecord.map((item, index) => ({
          typeOfPad: item.Typeofpad,
          productName: item.Material,
          bmrNo: item.POrder,
          pattern: item.Pattern,
          gsm: item.gsm,
          edge: item.Edge,
          noOfPadsStd: item.NoOfPcPerBag,
          noOfPadsAct: rowDataOne[index]?.productAct || "",
        })),
        rollConsumptionDetails: ScreenTwoRecord.map((item, index) => ({
          date: item.RPackDt,
          time: item.CreatedOn,
          bmrNo: item.POrder,
          rollNo: item.BaleNo,
          shaftNo: item.ShaftNo,
          netWt: item.RNWt,
          balanceWt: item.BalanceWeight,
        })),
        stoppageDetails: ScreenThreeRecord.map((item, index) => ({
          stopTime: item.TTime,
          startTime: item.FTime,
          totalMin: item.TotHrs,
          reason: item.Scause,
          attendBy: rowData[index]?.attendBy || "",
          remarks: rowData[index]?.remarksStopage || "",
        })),
        remarks: remarks,
        prodDetailsInBags: productDetails,
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/RollConsumptionReport/SubmitReport`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/PadPunching/F-02/Summary");
      }, 1500);

      message.success("Pad Punching Record Submitted Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to submit Roll Consumption Record !!");
    } finally {
      setSubmitLoading(false);
    }
  };
  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/RollConsumptionReport/approveOrReject`,
        {
          id: ReportId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        console.log("messsage", res);
        message.success(res.data.message);
        navigate("/Precot/PadPunching/F-02/Summary");
      })
      .catch((err) => {
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleRejectModal = () => {
    setShowModal(true);
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/RollConsumptionReport/approveOrReject`,
        {
          id: ReportId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/PadPunching/F-02/Summary");
      })
      .catch((err) => {
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  useEffect(() => {
    fetchDetailsByDateShiftMachineName();
    ScreenThreeApi();
  }, []);

  const fetchDetailsByDateShiftMachineName = async () => {
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/RollConsumptionReport/getByDateShiftMachine?date=${date}&shift=${shift}&machineName=${machineName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setRollConsumptionDetails(response.data);

      if (response.data.message == "No data") {
        ScreenOneApi();
        ScreenThreeApi();
      }
      if (response.data && response.data.message !== "No data") {
        console.log("inside data", response.data);
        const data = response.data;
        setReportId(response.data.reportId);
        setRemarks(response.data.remarks || "NA");
        setProductDetails(response.data.prodDetailsInBags || "NA");

        if (data.machineDetails) {
          setScreenOneRecord(
            data.machineDetails.map((item) => ({
              MCN: machineName,
              Typeofpad: item.typeOfPad,
              Material: item.productName,
              POrder: item.bmrNo,
              Pattern: item.pattern,
              gsm: item.gsm,
              Edge: item.edge,
              NoOfPcPerBag: item.noOfPadsStd,
            }))
          );
        }
        if (data.rollConsumptionDetails) {
          setScreenTwoRecord(
            data.rollConsumptionDetails.map((item) => ({
              RPackDt: item.date,
              CreatedOn: item.time,
              POrder: item.bmrNo,
              BaleNo: item.rollNo,
              ShaftNo: item.shaftNo,
              RNWt: item.netWt,
              BalanceWeight: item.balanceWt,
            }))
          );
        }
        if (data.stoppageDetails) {
          setScreenThreeRecord(
            data.stoppageDetails.map((item) => ({
              TTime: item.stopTime,
              FTime: item.startTime,
              TotHrs: item.totalMin,
              Scause: item.reason,
            }))
          );
        }

        setRowDataOne(
          data.machineDetails.map((item) => ({
            productAct: item.noOfPadsAct || "NA",
          }))
        );
        setRowData(
          data.stoppageDetails.map((item) => ({
            attendBy: item.attendBy || "NA",
            remarksStopage: item.remarks || "NA",
          }))
        );
        if (
          ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
            response.data.supervisor_status !== "SUPERVISOR_APPROVED") ||
          ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
            response.data.hod_status == "HOD_REJECTED")
        ) {
          message.error("Supervisor Yet Not Approved");
          setTimeout(() => {
            navigate("/Precot/PadPunching/F-02/Summary");
          }, 1500);
        }
        // if((role=="ROLE_HOD"||role=="ROLE_DESIGNEE") &&(res.data[0].supervisor_status !=="SUPERVISOR_APPROVED")){
        if (
          (role == "ROLE_SUPERVISOR" &&
            response.data.operator_status !== "OPERATOR_APPROVED") ||
          (role == "ROLE_SUPERVISOR" &&
            (response.data.supervisor_status == "SUPERVISOR_REJECTED" ||
              response.data.hod_status == "HOD_REJECTED"))
        ) {
          message.error("Operator Yet Not Approved");
          setTimeout(() => {
            navigate("/Precot/PadPunching/F-02/Summary");
          }, 1500);
        }
      } else {
      }
    } catch (e) {
    } finally {
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
  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/padpunching/orderNoList`,
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

  const handleInputOneChange = (index, field, value) => {
    const updatedRowData = [...rowDataOne];
    if (updatedRowData[index]) {
      updatedRowData[index][field] = value;
      setRowDataOne(updatedRowData);
    }
  };

  // const ScreenOneApi = async () => {
  //   console.log("screenoneapi");
  //   try {
  //     const formattedShift = convertShift(shift);
  //     const response = await axios.get(
  //       `${ API.prodUrl}/Precot/api/padpunching/api/DailyRollConsumptionDetail1?ConsDt=${date}&mcn=${machineName}&shiftId=${formattedShift}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("response.data[0]?.POrder", response.data[0]?.POrder);
  //     console.log("response.data ", response.data);
  //     for (const i = 0; i < response.data.length; i++) {
  //       console.log("response.data?.POrder", response.data?.POrder);
  //       ScreenTwoApi(response.data?.POrder);
  //     }

  //     setScreenOneRecord(response.data);
  //     const initialRowData = response.data.map(() => ({
  //       productAct: "",
  //     }));
  //     setRowDataOne(initialRowData);
  //   } catch (error) {
  //     console.error("Error checking BMR existence:", error);
  //     message.error(error.message);
  //   } finally {
  //   }
  // };

  const ScreenOneApi = async () => {
    console.log("Fetching ScreenOneApi...");
    try {
      const formattedShift = convertShift(shift);
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/padpunching/api/DailyRollConsumptionDetail1?ConsDt=${date}&mcn=${machineName}&shiftId=${formattedShift}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("ScreenOneApi Response:", response.data);

      setScreenOneRecord(response.data);

      const initialRowData = response.data.map(() => ({
        productAct: "",
      }));
      setRowDataOne(initialRowData);

      // Extract all POrder values and call ScreenTwoApi for each
      const pOrderValues = response.data.map((item) => item.POrder);
      fetchScreenTwoData(pOrderValues);
    } catch (error) {
      console.error("Error fetching ScreenOneApi:", error);
      message.error(error.message);
    }
  };

  const fetchScreenTwoData = async (pOrders) => {
    try {
      const formattedShift = convertShift(shift);

      // Fetch all ScreenTwoApi responses concurrently
      const responses = await Promise.all(
        pOrders.map(async (pOrder) => {
          try {
            const response = await axios.get(
              `${ API.prodUrl}/Precot/api/padpunching/api/DailyRollConsumption2?ConsDt=${date}&POrder=${pOrder}&ShiftId=${formattedShift}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            return response.data;
          } catch (error) {
            console.error(
              `Error fetching ScreenTwoApi for POrder ${pOrder}:`,
              error
            );
            return [];
          }
        })
      );

      // Flatten and store the responses
      setScreenTwoRecord(responses.flat());
      console.log("ScreenTwoApi Responses:", responses.flat());
    } catch (error) {
      console.error("Error fetching all ScreenTwoApi data:", error);
    }
  };

  // const ScreenTwoApi = async (value) => {
  //   try {
  //     setOrderNumberRollConsumption(value);
  //     const formattedShift = convertShift(shift);
  //     const response = await axios.get(
  //       `${ API.prodUrl}/Precot/api/padpunching/api/DailyRollConsumption2?ConsDt=${date}&POrder=${value}&ShiftId=${formattedShift}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     setScreenTwoRecord(response.data);

  //     console.log("screen tow details", response.data[0].ShaftNo);
  //   } catch (error) {
  //     console.error("Error checking BMR existence:", error);
  //   } finally {
  //   }
  // };

  const handleInputChange = (index, field, value) => {
    const updatedRowData = [...rowData];
    if (updatedRowData[index]) {
      updatedRowData[index][field] = value;
      setRowData(updatedRowData);
    }
  };
  const ScreenThreeApi = async () => {
    try {
      const formattedShift = convertShift(shift);
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/padpunching/api/DailyRollConsumption3?PackDt=${date}&ShiftID=${formattedShift}&mcn=${machineName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setScreenThreeRecord(response.data);
      const initialRowData = response.data.map(() => ({
        attendBy: "",
        remarksStopage: "",
      }));
      setRowData(initialRowData);
      console.log("screen three record", response.data);
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      // message.error(error.message);
    } finally {
    }
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/PadPunching/F-02/Summary");
  };

  const canDisplayButtons = () => {
    if (role === "ROLE_OPERATOR") {
      if (
        RolconsumptionDetails &&
        RolconsumptionDetails.operator_status === "OPERATOR_APPROVED" &&
        RolconsumptionDetails.hod_status !== "HOD_REJECTED" &&
        RolconsumptionDetails.supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else if (role == "ROLE_SUPERVISOR") {
      if (
        RolconsumptionDetails?.supervisor_status == "SUPERVISOR_APPROVED" &&
        RolconsumptionDetails?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (RolconsumptionDetails?.supervisor_status == "SUPERVISOR_APPROVED" &&
          RolconsumptionDetails?.hod_status == "WAITING_FOR_APPROVAL") ||
        RolconsumptionDetails?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (
        RolconsumptionDetails?.hod_status == "HOD_APPROVED" ||
        RolconsumptionDetails?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        RolconsumptionDetails?.hod_status == "HOD_APPROVED" ||
        RolconsumptionDetails?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (role == "ROLE_OPERATOR") {
      if (RolconsumptionDetails?.operator_status == "OPERATOR_APPROVED") {
        return "none";
      }
    } else if (
      role == "ROLE_SUPERVISOR" ||
      role == "ROLE_HOD" ||
      role == "ROLE_DESIGNEE"
    ) {
      return "none";
    }
  };

  const formattedDate = (date) => {
    if (date) {
      const dateObject = moment(date);
      if (dateObject.isValid()) {
        return dateObject.format("HH:mm");
      }
    }
    return "";
  };

  useEffect(() => {}, []);

  const items = [
    {
      key: "1",
      label: <p>Product Details</p>,
      children: (
        <div>
          <table>
            <tr>
              <th colSpan="15" rowSpan="2" style={{ height: "25px" }}>
                Machine Name
              </th>
              <th colSpan="15" rowSpan="2">
                Type Of Pad
              </th>
              <th colSpan="10" rowSpan="2">
                Product Name
              </th>
              <th colSpan="10" rowSpan="2">
                BMR NO. / ORDER NO.
              </th>
              <th colSpan="10" rowSpan="2">
                Pattern
              </th>
              <th colSpan="10" rowSpan="2">
                GSM
              </th>
              <th colSpan="10" rowSpan="2">
                Edge
              </th>
              <th colSpan="20">No of Pads / Bags</th>
            </tr>
            <th colSpan="10" style={{ textAlign: "center" }}>
              STD
            </th>
            <th colSpan="10" style={{ textAlign: "center" }}>
              Act
            </th>
            <tr></tr>
            {ScreenOneRecord.map((item, index) => (
              <tr key={index}>
                <td
                  colSpan="15"
                  style={{ height: "25px", textAlign: "center" }}
                >
                  {item.MCN}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {item.Typeofpad}
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.Material}
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.POrder}
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.Pattern}
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.gsm}
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.Edge}
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.NoOfPcPerBag}
                </td>
                <td colSpan="10">
                  <input
                    className="inp-new"
                    style={{
                      width: "98%",
                      border: "none",
                      height: "35px",
                      paddingLeft: "2px",
                    }}
                    disabled={disabled}
                    value={rowDataOne[index]?.productAct || ""}
                    onChange={(e) =>
                      handleInputOneChange(index, "productAct", e.target.value)
                    }
                    onKeyDown={handleKeyDown2}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Roll Consumption Details</p>,
      children: (
        <div>
          {/* <Select
            showSearch
            value={orderNumberRollConsumption}
            onChange={(value) => {
              ScreenTwoApi(value);
            }}
            style={{ width: "30%", marginBottom: "20px" }}
            placeholder="Search Order Number"
            disabled={disabled}
          >
            <Select.Option value="" disabled selected>
              Select Order Number
            </Select.Option>
            {orderNumberLov.map((order) => (
              <Select.Option key={order.value} value={order.value}>
                {order.value}
              </Select.Option>
            ))}
          </Select> */}
          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <th colSpan="15" style={{ height: "25px" }}>
                Date
              </th>
              <th colSpan="15">Time</th>
              <th colSpan="20">BMR NO. / ORDER NO</th>
              <th colSpan="15">Roll No</th>
              <th colSpan="20">Shaft No.</th>
              <th colSpan="10">Net Wt.</th>
              <th colSpan="15">Balance Wt.</th>
            </tr>
            {ScreenTwoRecord.map((item, index) => (
              <tr key={index}>
                <td
                  colSpan="15"
                  style={{ height: "25px", textAlign: "center" }}
                >
                  {item.RPackDt}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {formattedDate(item.CreatedOn)}
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {item.POrder}{" "}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {item.BaleNo}
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  {item.ShaftNo}
                </td>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  {item.RNWt}
                </td>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  {" "}
                  {item.BalanceWeight}
                </td>
              </tr>
            ))}
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Stoppage Details</p>,
      children: (
        <div>
          <table>
            <tr>
              <th colSpan="15" style={{ height: "25px" }}>
                M/c stop time (min)
              </th>
              <th colSpan="15">M/c start time (min)</th>
              <th colSpan="15">Total min</th>
              <th colSpan="15">Reason</th>
              <th colSpan="15">Attend by</th>
              <th colSpan="15">Remarks</th>
            </tr>
            {ScreenThreeRecord.map((item, index) => {
              const MCStopTime = item.TTime;
              const MCStartTime = item.FTime;
              const TotalMinStoppage = item.TotHrs;
              const StoppageReason = item.Scause;

              return (
                <tr key={index}>
                  <td
                    colSpan="15"
                    style={{ height: "25px", textAlign: "center" }}
                  >
                    {MCStopTime}
                  </td>
                  <td colSpan="15" style={{ textAlign: "center" }}>
                    {MCStartTime}
                  </td>
                  <td colSpan="15" style={{ textAlign: "center" }}>
                    {TotalMinStoppage}
                  </td>
                  <td colSpan="15" style={{ textAlign: "center" }}>
                    {StoppageReason}
                  </td>
                  <td colSpan="15">
                    <input
                      className="inp-new"
                      style={{
                        width: "98%",
                        border: "none",
                        height: "35px",
                        paddingLeft: "2px",
                      }}
                      value={rowData[index]?.attendBy || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleInputChange(index, "attendBy", e.target.value)
                      }
                      onKeyDown={handleKeyDown2}
                    />
                  </td>
                  {/* <td colSpan="15"> */}
                  {/* <input
                      className="inp-new"
                      style={{
                        width: "98%",
                        border: "none",
                        height: "35px",
                        paddingLeft: "2px",
                      }}
                      value={rowData[index]?.remarksStopage || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "remarksStopage",
                          e.target.value
                        )
                      }
                    /> */}
                  {/* </td> */}
                  <td colSpan="15" style={{ textAlign: "center" }}>
                    {rowData[index]?.remarksStopage || item.SRemarks || ""}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td
                colSpan="100"
                style={{ padding: "10px", borderBottom: "none" }}
              >
                Production Details in Bags :{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="100" style={{ height: "20px", borderTop: "none" }}>
                <TextArea
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                  rows={2}
                  style={{ width: "100%" }}
                  disabled={disabled}
                />
              </td>
            </tr>
            <tr>
              <td
                colSpan="100"
                style={{ padding: "10px", borderBottom: "none" }}
              >
                Remarks:
              </td>
            </tr>
            <tr>
              <td colSpan="100" style={{ height: "25px", borderTop: "none" }}>
                <TextArea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={2}
                  style={{ width: "100%" }}
                  disabled={disabled}
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
              <td
                colSpan="34"
                style={{ height: "35px", textAlign: "center", width: "30%" }}
              >
                Operator Sign & Date
              </td>
              <td colSpan="33" style={{ textAlign: "center", width: "35%" }}>
                Production Supervisor Sign & Date
              </td>
              <td colSpan="33" style={{ textAlign: "center", width: "35%" }}>
                HOD/ Designee Sign & Date
              </td>
            </tr>
            <tr>
              <td
                colSpan="34"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {RolconsumptionDetails?.operator_status ===
                  "OPERATOR_APPROVED" && (
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
                        <div>{RolconsumptionDetails?.operator_sign}</div>
                        <div>
                          {formattedDateSubmittedOn(
                            RolconsumptionDetails?.operator_submitted_on
                          )}
                        </div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Operator Sign"
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
                  </>
                )}
              </td>

              <td
                colSpan="33"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {(RolconsumptionDetails?.supervisor_status ===
                  "SUPERVISOR_REJECTED" ||
                  RolconsumptionDetails?.supervisor_status ===
                    "SUPERVISOR_APPROVED") && (
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
                        <div>{RolconsumptionDetails?.supervisor_sign}</div>
                        <div>
                          {formattedDateSubmittedOn(
                            RolconsumptionDetails?.supervisor_submit_on
                          )}
                        </div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="Superviosr Sign"
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
                {(RolconsumptionDetails?.hod_status === "HOD_REJECTED" ||
                  RolconsumptionDetails?.hod_status === "HOD_APPROVED") && (
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
                        <div>{RolconsumptionDetails?.hod_sign}</div>
                        <div>
                          {formattedDateSubmittedOn(
                            RolconsumptionDetails?.hod_submit_on
                          )}
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
            </tr>
          </table>
        </div>
      ),
    },
  ];

  const formatName = "CONTAMINATION CHECKING REPORT(Absorbent Bleached Cotton)";
  const formatNo = "PRD01/F-18";
  const revisionNo = "02";
  const sopNo = "PRD01-D-09";

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="Daily Roll Consumption Report-Pad Punching"
        formatNo="PH-PRD03/F-002 "
        sopNo="PH-PRD04-D-03"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "ROLE_SUPERVISOR" ||
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
            </>
          ) : (
            <>
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
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButton2(),
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSave}
                shape="round"
              >
                &nbsp;Save
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
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
          </Button>,

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
      <div
        style={{
          display: "flex",
          alignItems: "left",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Date:"
          placeholder="Date"
          required
          value={date}
          disabled
          style={{ width: "200px", height: "35px" }}
        />
        <Input
          addonBefore="Shift:"
          placeholder="Shift"
          required
          value={shift}
          disabled
          style={{ width: "200px", height: "35px" }}
        />
        <Input
          addonBefore="Machine Name:"
          placeholder="Machine Name"
          required
          value={machineName}
          disabled
          style={{ width: "300px", height: "35px" }}
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

export default PadPunching_f02;
