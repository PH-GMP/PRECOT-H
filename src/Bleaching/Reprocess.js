import React, { useState, useEffect } from "react";
import {
  Tabs,
  Form,
  Input,
  Row,
  Col,
  Button,
  Tooltip,
  Table,
  message,
  Select,
  Modal,
} from "antd";
// Import your BleachingHeader component
import { TbMenuDeep } from "react-icons/tb";
import { IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import axios from "axios";
import API from "../baseUrl.json";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { useParams } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const { TabPane } = Tabs;

export default function MainComponent({
  open,
  onClose,
  showDrawer,
  saveLoading,
  submitLoading,
}) {
  const role = localStorage.getItem("role");
  const location = useLocation();

  const { id } = location.state || {};

  const handleBack = () => {
    navigate(-1);
  };

  const today = new Date().toISOString().split("T")[0];

  const token = localStorage.getItem("token");

  const [qa_sign, setqa_sign] = useState("");
  const [supersigndate, setsupersigndate] = useState(false);
  const [qa_signsignaturedate, setqa_signsignaturedate] = useState("");
  const [hodsign, sethodsigndate] = useState("");
  const [reprocessid, setReprocessId] = useState("");

  const navigate = useNavigate();

  const [BMR, setBMR] = useState(localStorage.getItem("BMR") || "");

  const [batchno, setbatchno] = useState(localStorage.getItem("loadno") || "");

  const [baleOptions, setBaleOptions] = useState([]);

  const [getImage2, setGetImage2] = useState("");
  const [finisharraylist, setfinisharray] = useState("Select Finish");
  const [selectedRow, setSelectedRow] = useState(null);
  const [rejectRemarks, setRejectRemarks] = useState("");

  const [supervisorstatus, setsupervisorStatus] = useState(null);
  const [hodstatus, sethodstatus] = useState(null);
  const [qastatus, setqastatus] = useState(null);

  useEffect(() => {
    console.log("IDDD", id);
    const token = localStorage.getItem("token");
    const username = selectedRow?.qaSubmittedBy;
    if (username) {
      // console.log("usernameparams", username);

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
  }, [selectedRow?.qaSubmittedBy, API.prodUrl, token]);

  useEffect(() => {
    const fetchBaleOptions = async () => {
      if (!batchno) return;

      try {
        setBaleOptions([]);

        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/bleaching/generation/fetchBaleByBatch?batchNo=${batchno}&bmr_no=${BMR}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update options only if the response is successful
        if (response.data) {
          setBaleOptions(response.data);
        }
      } catch (error) {
        console.error("Error fetching bale options:", error);
      }
    };

    fetchBaleOptions();
  }, [batchno]);

  useEffect(() => {
    const fetchReprocessReport = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/bleaching/Service/getReprocessReportById?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // setReportData(response.data);
        const data = response.data[0];
        setsupervisorStatus(response.data[0].supervisorStatus);
        sethodstatus(response.data[0].hodStatus);
        setqastatus(response.data[0].qaStatus);

        if (
          (roleauth === "ROLE_HOD" || roleauth === "ROLE_QA") &&
          (response.data[0].hodStatus === "HOD_REJECTED" ||
            response.data[0].qaStatus === "QA_REJECTED")
        ) {
          message.error("Supervisor Yet To Approve");
          setTimeout(() => {
            navigate("/Precot/ReprocessSummary");
          }, 1000);
        }

        if (response.data && response.data.length > 0) {
          setSelectedRow(response.data[0]);
          console.log("Selected new Row:", response.data[0]);
        } else {
          setSelectedRow(null);
        }
        setFormData({
          processDate: data.processDate || "",
          bmrNumber: data.bmrNumber || "",
          subBatchNumber: data.subBatchNumber || "",
          baleNumber: data.baleNumber || "",
          reasonReprocess: data.reasonReprocess || "",
          failureStage: data.failureStage || "",
          reprocessQuantity: data.reprocessQuantity || "",
          referenceNCnumber: data.referenceNCnumber || "",
          reprocessStage: data.reprocessStage || "",
          remarks: data.remarks || "N/A",
        });
      } catch (error) {
        console.error("Error fetching reprocess report:", error);
      }
    };

    fetchReprocessReport();
  }, [id]);
  // Sample data for the remarks table
  const remarksData = [
    {
      key: "1",
      performedBy: "",
      verifiedBy: "",
      approvedBy: "",
    },
  ];

  const [formData, setFormData] = useState({
    processDate: "",
    bmrNumber: "",
    subBatchNumber: "",
    baleNumber: "",
    reasonReprocess: "",
    failureStage: "",
    reprocessQuantity: "",
    referenceNCnumber: "",
    reprocessStage: "",
    remarks: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleApprove = async () => {
    const payload = {
      id: id,
      status: "Approve",
    };

    try {
      const response = await axios.put(
        `${ API.prodUrl}/Precot/api/bleaching/Service/approveReprocessReport`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Form approved successfully");
      navigate("/Precot/ReprocessSummary");
      console.log("Approve Response:", response.data);
    } catch (error) {
      message.error("Failed to Approve Form");
      console.error("Approve Error:", error);
    }
  };

  const handleReject = async () => {
    const payload = {
      id: id,
      status: "Reject",
      remarks: rejectRemarks,
    };

    try {
      const response = await axios.put(
        `${ API.prodUrl}/Precot/api/bleaching/Service/approveReprocessReport`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.error("Form Rejected successfully");
      navigate("/Precot/ReprocessSummary");
      console.log("Approve Response:", response.data);
    } catch (error) {
      message.error("Failed to Reject Form");
      console.error("Approve Error:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };

  // Handle save
  const handleSave = async () => {
    const payload = {
      ...formData,
      // id: id,
      id: id || reprocessid,
      baleNumber: formData.baleNumber,
      bmrNumber: BMR,
      subBatchNumber: batchno,
      formNumber: "FORM-123",
      formName: "Bleach Reprocess Report",
      revisionNumber: "REV-01",
      unit: "Unit A",
      rejectReason: "N/A",
      department: "Bleaching",
      // supervisorStatus: 'Approved',
      // supervisorSign: 'Supervisor Signature',
      // supervisorSaveBy: 'SupervisorName',
      // supervisorSavedOn: '2024-11-05T10:30:00',
      // supervisorSavedId: 101,
      // supervisorSubmittedId: 102,
      // supervisorSubmittedBy: 'SupervisorName',
      // supervisorSubmittedOn: '2024-11-05T12:00:00',
      // hodStatus: 'Approved',
      // hodSign: 'HOD Signature',
      // hodSubmittedBy: 'HODName',
      // hodSubmittedId: 201,
      // hodSubmittedDate: '2024-11-05T13:00:00',
      // qaStatus: 'Pending',
      // qaSign: 'QA Signature',
      // qaSubmittedBy: 'QAName',
      // qaSubmittedId: 301,
      // qaSubmittedDate: '2024-11-05T14:30:00',
    };

    try {
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/bleaching/Service/saveReprocessReport`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Form saved successfully");
      navigate("/Precot/ReprocessSummary");
      console.log("Save Response:", response.data);
    } catch (error) {
      message.error("Failed to save Form");
      console.error("Save Error:", error);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      baleNumber: formData.baleNumber,
      // id: id,
      id: id || reprocessid,
      bmrNumber: BMR,
      subBatchNumber: batchno,
      formNumber: "FORM-123",
      formName: "Bleach Reprocess Report",
      revisionNumber: "REV-01",
      unit: "Unit A",
      rejectReason: "N/A",
      department: "Bleaching",
      supervisorStatus: supervisorstatus,
      hodStatus: hodstatus,
      qaStatus: "",
      // supervisorStatus: 'Approved',
      // supervisorSign: 'Supervisor Signature',
      // supervisorSaveBy: 'SupervisorName',
      // supervisorSavedOn: '2024-11-05T10:30:00',
      // supervisorSavedId: 101,
      // supervisorSubmittedId: 102,
      // supervisorSubmittedBy: 'SupervisorName',
      // supervisorSubmittedOn: '2024-11-05T12:00:00',
      // hodStatus: 'Approved',
      // hodSign: 'HOD Signature',
      // hodSubmittedBy: 'HODName',
      // hodSubmittedId: 201,
      // hodSubmittedDate: '2024-11-05T13:00:00',
      // qaStatus: 'Pending',
      // qaSign: 'QA Signature',
      // qaSubmittedBy: 'QAName',
      // qaSubmittedId: 301,
      // qaSubmittedDate: '2024-11-05T14:30:00',
    };

    try {
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/bleaching/Service/submitReprocessReport`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Form submitted successfully");
      navigate("/Precot/ReprocessSummary");
      console.log("Submit Response:", response.data);
    } catch (error) {
      message.error("Failed to submit form");
      console.error("Submit Error:", error);
    }
  };

  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Only proceed if id is empty
    if (id) return;

    const fetchbmrReprocessReport = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/bleaching/Service/getReprocessReportByUnique?bmrNumber=${BMR}&batchNumber=${batchno}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data[0];
        setReprocessId(data.id);
        setsupervisorStatus(data.supervisorStatus);
        sethodstatus(data.hodStatus);
        setqastatus(data.qaStatus);
        console.log("check", data.id);

        if (
          (roleauth === "ROLE_HOD" || roleauth === "ROLE_QA") &&
          (response.data[0].hodStatus === "HOD_REJECTED" ||
            response.data[0].qaStatus === "QA_REJECTED")
        ) {
          message.error("Supervisor Yet To Approve");
          setTimeout(() => {
            navigate("/Precot/ReprocessSummary");
          }, 1000);
        }

        if (response.data && response.data.length > 0) {
          setSelectedRow(data);
          console.log("Selected new Row:", data);
        } else {
          setSelectedRow(null);
        }

        setFormData({
          processDate: data.processDate || "",
          bmrNumber: data.bmrNumber || "",
          subBatchNumber: data.subBatchNumber || "",
          baleNumber: data.baleNumber || "",
          reasonReprocess: data.reasonReprocess || "",
          failureStage: data.failureStage || "",
          reprocessQuantity: data.reprocessQuantity || "",
          referenceNCnumber: data.referenceNCnumber || "",
          reprocessStage: data.reprocessStage || "",
          remarks: data.remarks || "N/A",
        });
      } catch (error) {
        console.error("Error fetching reprocess report:", error);
      }
    };

    fetchbmrReprocessReport();
  }, [BMR, batchno]);

  // useEffect(() => {
  //   const fetchbmrReprocessReport = async () => {
  //     try {
  //       const token = localStorage.getItem("token");

  //       const response = await axios.get(
  //         `${ API.prodUrl}/Precot/api/bleaching/Service/getReprocessReportByUnique?bmrNumber=${BMR}&batchNumber=${batchno}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         }
  //       );

  //       // setReportData(response.data);
  //       const data = response.data[0];
  //       setReprocessId(response.data[0].id);

  //      setsupervisorStatus(response.data[0].supervisorStatus);
  //      sethodstatus(response.data[0].hodStatus)
  //      setqastatus(response.data[0].qaStatus)
  //       console.log("check",response.data[0].id);
  //       // setSelectedRow(response.data[0]);
  //       if (response.data && response.data.length > 0) {

  //         setSelectedRow(response.data[0]);
  //         console.log('Selected new Row:', response.data[0]);
  //       } else {

  //         setSelectedRow(null);
  //       }
  //       setFormData({
  //         processDate: data.processDate || "",
  //         bmrNumber: data.bmrNumber || "",
  //         subBatchNumber: data.subBatchNumber || "",
  //         baleNumber: data.baleNumber || "",
  //         reasonReprocess: data.reasonReprocess || "",
  //         failureStage: data.failureStage || "",
  //         reprocessQuantity: data.reprocessQuantity || "",
  //         referenceNCnumber: data.referenceNCnumber || "",
  //         reprocessStage: data.reprocessStage || "",
  //        remarks: data.remarks || "N/A"
  //       });
  //     } catch (error) {
  //       console.error("Error fetching reprocess report:", error);
  //     }
  //   };

  //   fetchbmrReprocessReport();
  // }, []);

  // const formatDate = (dateString) => {
  //   if (!dateString) return '';
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [getImage, setGetImage] = useState("");

  const [getImage1, setGetImage1] = useState("");

  // Table columns
  const columns = [
    {
      title: "Performed by Production Supervisor    Sign & Date ",
      dataIndex: "performedBy",
      key: "performedBy",
    },
    {
      title: "Verified by Head of the Dept.    Sign & Date ",
      dataIndex: "verifiedBy",
      key: "verifiedBy",
    },
    {
      title: "Approved by QA     Sign & Date ",
      dataIndex: "approvedBy",
      key: "approvedBy",
    },
  ];

  const roleauth = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.supervisorSubmittedBy;
    if (username) {
      // // console.log("usernameparams", username);

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
          // console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow?.supervisorSubmittedBy, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.hodSubmittedBy;
    if (username) {
      // console.log("usernameparams", username);

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
  }, [selectedRow, selectedRow?.hodSubmittedBy, API.prodUrl, token]);

  const roleBase = localStorage.getItem("role");

  // const canDisplayButtons = () => {
  //   if (roleBase === "ROLE_SUPERVISOR") {
  //     if (selectedRow?.supervisorStatus === "SUPERVISOR_APPROVED") {
  //       if (selectedRow?.hodStatus === "HOD_REJECTED") {
  //         return "block";
  //       }
  //       if (
  //         selectedRow?.hodStatus === "WAITING_FOR_APPROVAL" ||
  //         selectedRow?.hodStatus === "HOD_APPROVED" ||
  //         selectedRow?.hodStatus === "HOD_REJECTED"
  //       ) {
  //         return "none";
  //       }
  //       if (selectedRow?.qaStatus === "QA_APPROVED") {
  //         return "none";
  //       }
  //     }
  //   } else if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
  //     if (
  //       selectedRow?.hodStatus === "HOD_APPROVED" ||
  //       selectedRow?.hodStatus === "HOD_REJECTED"
  //     ) {
  //       return "none";
  //     }

  //     return "block";
  //   } else if (roleBase === "ROLE_QA") {
  //     if (
  //       selectedRow?.qaStatus === "QA_APPROVED" ||
  //       selectedRow?.qaStatus === "QA_REJECTED"
  //     ) {
  //       return "none";
  //     }
  //   } else {
  //     if (
  //       selectedRow?.qaStatus === "QA_APPROVED" ||
  //       selectedRow?.qaStatus === "QA_REJECTED"
  //     ) {
  //       return "none";
  //     }
  //     return "block";
  //   }
  // };

  const canDisplayButton2 = () => {
    if (roleBase == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisorStatus == "SUPERVISOR_APPROVED" &&
        selectedRow?.hodStatus == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        selectedRow?.supervisorStatus == "SUPERVISOR_APPROVED" &&
        (selectedRow?.hodStatus == "WAITING_FOR_APPROVAL" ||
          selectedRow?.hodStatus == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hodStatus == "HOD_APPROVED" ||
        selectedRow?.hodStatus == "HOD_REJECTED"
        // emptyarraycheck == 0
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        selectedRow?.hodStatus == "HOD_APPROVED" ||
        selectedRow?.hodStatus == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };

  const [buttonDisplay, setButtonDisplay] = useState({
    button1: "none",
    button2: "none",
  });

  const canDisplayPrint = () => {
    // console.log("ss", selectedRow?.supervisor_status);
    if (roleBase == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisorStatus == "SUPERVISOR_APPROVED" &&
        selectedRow?.qa_status == "QA_APPROVED" &&
        selectedRow?.hodStatus == "HOD_APPROVED"
      ) {
        return "block";
      }
      return "none";
    } else if (roleBase == "ROLE_QA") {
      if (
        selectedRow?.supervisorStatus == "SUPERVISOR_APPROVED" &&
        selectedRow?.qa_status == "QA_APPROVED" &&
        selectedRow?.hodStatus == "HOD_APPROVED"
      ) {
        return "block";
      }
      return "none";
    } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
      if (
        selectedRow?.supervisorStatus == "SUPERVISOR_APPROVED" &&
        selectedRow?.qa_status == "QA_APPROVED" &&
        selectedRow?.hodStatus == "HOD_APPROVED"
      ) {
        return "block";
      }
      return "none";
    }
  };

  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisorStatus == "SUPERVISOR_APPROVED" &&
        selectedRow?.hodStatus == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.supervisorStatus == "SUPERVISOR_APPROVED" &&
          selectedRow?.hodStatus == "WAITING_FOR_APPROVAL") ||
        selectedRow?.hodStatus == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_QA") {
      if (
        selectedRow?.hodStatus == "HOD_APPROVED" ||
        selectedRow?.hodStatus == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hodStatus == "HOD_APPROVED" ||
        selectedRow?.hodStatus == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  return (
    <div>
      {/* Sidebar */}
      <PrecotSidebar open={open} onClose={onClose} role={role} />

      {/* Header */}
      <BleachingHeader
        unit="Unit-H"
        formName="RE-PROCESSING REPORT"
        formatNo=""
        sopNo="PH-QCL01-D-05"
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
          role === "ROLE_DESIGNEE" ? (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  // display: canDisplayButtons(),
                  //  display: hodstatus == "HOD_APPROVED" ||  hodstatus == "HOD_REJECTED" && role == "ROLE_HOD" ? "none" : "block"

                  display:
                    ((hodstatus === "HOD_APPROVED" ||
                      hodstatus === "HOD_REJECTED") &&
                      role === "ROLE_HOD") ||
                    ((qastatus === "QA_APPROVED" ||
                      qastatus === "QA_REJECTED") &&
                      role === "ROLE_QA")
                      ? "none"
                      : "block",
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
                  // display: canDisplayButtons(),
                  //  display: hodstatus == "HOD_APPROVED"  ||  hodstatus == "HOD_REJECTED" && role == "ROLE_HOD" ? "none" : "block"
                  display:
                    ((hodstatus === "HOD_APPROVED" ||
                      hodstatus === "HOD_REJECTED") &&
                      role === "ROLE_HOD") ||
                    ((qastatus === "QA_APPROVED" ||
                      qastatus === "QA_REJECTED") &&
                      role === "ROLE_QA")
                      ? "none"
                      : "block",
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
                  // display: canDisplayButton2(),
                  display:
                    supervisorstatus == "SUPERVISOR_APPROVED" &&
                    role == "ROLE_SUPERVISOR"
                      ? "none"
                      : "block",
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  // display: canDisplayButtons(),
                  //  display: supervisorstatus == "SUPERVISOR_APPROVED" && role == "ROLE_SUPERVISOR" ? "none" : "block"
                  display:
                    role === "ROLE_SUPERVISOR" &&
                    supervisorstatus === "SUPERVISOR_APPROVED" &&
                    hodstatus !== "HOD_REJECTED" &&
                    qastatus !== "QA_REJECTED"
                      ? "none"
                      : "block",
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
              if (window.confirm("Are you sure you want to logout?")) {
                localStorage.removeItem("token");
                window.location.href = "/Precot";
              }
            }}
          >
            Logout
          </Button>,
          <Tooltip
            trigger="click"
            title={
              <div>
                <h3>{localStorage.getItem("username")}</h3>
                <p>{role}</p>
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
        ]}
      />

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
            rows={4} // Adjust the number of rows as needed
            style={{ width: "100%" }} // Adjust the width as needed
          />
        </div>
      </Modal>

      <Tabs defaultActiveKey="1" style={{ marginTop: 16 }}>
        <TabPane tab="Rework" key="1">
          <Table
            bordered
            pagination={false}
            columns={[
              {
                title: "",
                dataIndex: "value",
                key: "value",
                render: (text, record) => {
                  // For the 'Date' field, show "Date" label before the input field
                  if (record.key === "1") {
                    return (
                      <Row
                        gutter={17}
                        align="middle"
                        style={{ height: "40px" }}
                      >
                        <Col span={1.5}>
                          <label>Date:</label>
                        </Col>
                        <Col span={3.5}>
                          {/* <Input type="date" placeholder="Select Date" /> */}
                          <Input
                            type="date"
                            // disabled={role === 'ROLE_HOD' || role == 'ROLE_QA' || supervisorstatus == "SUPERVISOR_APPROVED"  }
                            disabled={
                              role === "ROLE_HOD" ||
                              role === "ROLE_QA" ||
                              (supervisorstatus === "SUPERVISOR_APPROVED" &&
                                hodstatus !== "HOD_REJECTED" &&
                                qastatus !== "QA_REJECTED")
                            }
                            max={today}
                            value={formData.processDate}
                            onChange={(e) =>
                              handleInputChange("processDate", e.target.value)
                            }
                          />
                        </Col>
                      </Row>
                    );
                  }

                  // For the 'Department Name, Machine No' row
                  if (record.key === "2") {
                    return (
                      <Row
                        gutter={18}
                        align="middle"
                        style={{ height: "40px" }}
                      >
                        <Col span={1.5}>
                          <label>BMR No:</label>
                        </Col>
                        <Col span={4}>
                          {/* <Input placeholder="Enter BMR No" /> */}
                          <Input
                            value={BMR}
                            disabled
                            onChange={(e) =>
                              handleInputChange("bmrNumber", e.target.value)
                            }
                          />
                        </Col>
                        <Col span={2.5}>
                          <label>Sub. Batch No:</label>
                        </Col>
                        <Col span={5}>
                          {/* <Input placeholder="Enter Sub. Batch No" /> */}
                          <Input
                            value={batchno}
                            disabled
                            onChange={(e) =>
                              handleInputChange(
                                "subBatchNumber",
                                e.target.value
                              )
                            }
                          />
                        </Col>
                        <Col span={1.5}>
                          <label>Bale No:</label>
                        </Col>
                        <Col span={5}>
                          {/* <Input placeholder="Enter Bale No:" /> */}
                          <Select
                            // disabled={role === 'ROLE_HOD' || role == 'ROLE_QA' || supervisorstatus == "SUPERVISOR_APPROVED"}
                            disabled={
                              role === "ROLE_HOD" ||
                              role === "ROLE_QA" ||
                              (supervisorstatus === "SUPERVISOR_APPROVED" &&
                                hodstatus !== "HOD_REJECTED" &&
                                qastatus !== "QA_REJECTED")
                            }
                            value={formData.baleNumber}
                            onChange={(value) =>
                              handleInputChange("baleNumber", value)
                            }
                            style={{ width: "200px", textAlign: "center" }}
                            placeholder="Select Bale Number"
                          >
                            {baleOptions.length > 0 ? (
                              baleOptions.map((option) => (
                                <Select.Option
                                  key={option.id}
                                  value={option.value}
                                >
                                  {option.value}
                                </Select.Option>
                              ))
                            ) : (
                              <Select.Option value="" disabled></Select.Option>
                            )}
                          </Select>
                        </Col>
                      </Row>
                    );
                  }

                  // For the 'BMR No. / Lot No' row
                  if (record.key === "3") {
                    return (
                      <Row
                        gutter={18}
                        align="middle"
                        style={{ height: "40px" }}
                      >
                        <Col span={3.5}>
                          <label>Reason for Reprocess:</label>
                        </Col>
                        <Col span={12}>
                          {/* <Input placeholder="Enter Reason for Reprocess" /> */}
                          <Input
                            // disabled={role === 'ROLE_HOD' || role == 'ROLE_QA' || supervisorstatus == "SUPERVISOR_APPROVED"}
                            disabled={
                              role === "ROLE_HOD" ||
                              role === "ROLE_QA" ||
                              (supervisorstatus === "SUPERVISOR_APPROVED" &&
                                hodstatus !== "HOD_REJECTED" &&
                                qastatus !== "QA_REJECTED")
                            }
                            value={formData.reasonReprocess}
                            onChange={(e) =>
                              handleInputChange(
                                "reasonReprocess",
                                e.target.value
                              )
                            }
                          />
                        </Col>
                      </Row>
                    );
                  }

                  // For the 'Reason for Rework' field
                  if (record.key === "4") {
                    return (
                      <Row
                        gutter={18}
                        align="middle"
                        style={{ height: "40px" }}
                      >
                        <Col span={3}>
                          <label>Failure stage : </label>
                        </Col>
                        <Col span={12}>
                          {/* <Input placeholder="Enter Failure stage " /> */}
                          <Input
                            // disabled={role === 'ROLE_HOD' || role == 'ROLE_QA' || supervisorstatus == "SUPERVISOR_APPROVED"}
                            disabled={
                              role === "ROLE_HOD" ||
                              role === "ROLE_QA" ||
                              (supervisorstatus === "SUPERVISOR_APPROVED" &&
                                hodstatus !== "HOD_REJECTED" &&
                                qastatus !== "QA_REJECTED")
                            }
                            value={formData.failureStage}
                            onChange={(e) =>
                              handleInputChange("failureStage", e.target.value)
                            }
                          />
                        </Col>
                      </Row>
                    );
                  }

                  // For the 'Rework Qty. In Bags/ Boxes' field
                  if (record.key === "5") {
                    return (
                      <Row
                        gutter={18}
                        align="middle"
                        style={{ height: "40px" }}
                      >
                        <Col span={3}>
                          <label>Reprocess Qty (Kg):</label>
                        </Col>
                        <Col span={12}>
                          {/* <Input placeholder="Enter Reprocess  Qty (Kg)" /> */}
                          <Input
                            // disabled={role === 'ROLE_HOD' || role == 'ROLE_QA' || supervisorstatus == "SUPERVISOR_APPROVED"}
                            disabled={
                              role === "ROLE_HOD" ||
                              role === "ROLE_QA" ||
                              (supervisorstatus === "SUPERVISOR_APPROVED" &&
                                hodstatus !== "HOD_REJECTED" &&
                                qastatus !== "QA_REJECTED")
                            }
                            value={formData.reprocessQuantity}
                            onChange={(e) =>
                              handleInputChange(
                                "reprocessQuantity",
                                e.target.value
                              )
                            }
                          />
                        </Col>
                      </Row>
                    );
                  }

                  if (record.key === "6") {
                    return (
                      <Row
                        gutter={18}
                        align="middle"
                        style={{ height: "40px" }}
                      >
                        <Col span={3.5}>
                          <label>Reference NC No (if):</label>
                        </Col>
                        <Col span={12}>
                          {/* <Input placeholder="Enter Reference NC No (if)" /> */}
                          <Input
                            // disabled={role === 'ROLE_HOD' || role == 'ROLE_QA' || supervisorstatus == "SUPERVISOR_APPROVED"}
                            disabled={
                              role === "ROLE_HOD" ||
                              role === "ROLE_QA" ||
                              (supervisorstatus === "SUPERVISOR_APPROVED" &&
                                hodstatus !== "HOD_REJECTED" &&
                                qastatus !== "QA_REJECTED")
                            }
                            value={formData.referenceNCnumber}
                            onChange={(e) =>
                              handleInputChange(
                                "referenceNCnumber",
                                e.target.value
                              )
                            }
                          />
                        </Col>
                      </Row>
                    );
                  }

                  if (record.key === "7") {
                    return (
                      <Row
                        gutter={18}
                        align="middle"
                        style={{ height: "40px" }}
                      >
                        <Col span={3}>
                          <label>Reprocessed stage:</label>
                        </Col>
                        <Col span={12}>
                          {/* <Input placeholder="Enter Reprocessed stage" /> */}
                          <Input
                            // disabled={role === 'ROLE_HOD' || role == 'ROLE_QA' || supervisorstatus == "SUPERVISOR_APPROVED"}
                            disabled={
                              role === "ROLE_HOD" ||
                              role === "ROLE_QA" ||
                              (supervisorstatus === "SUPERVISOR_APPROVED" &&
                                hodstatus !== "HOD_REJECTED" &&
                                qastatus !== "QA_REJECTED")
                            }
                            value={formData.reprocessStage}
                            onChange={(e) =>
                              handleInputChange(
                                "reprocessStage",
                                e.target.value
                              )
                            }
                          />
                        </Col>
                      </Row>
                    );
                  }

                  if (record.key === "8") {
                    return (
                      <Row
                        gutter={18}
                        align="middle"
                        style={{ height: "40px" }}
                      >
                        <Col span={3}>
                          <label>Remarks:</label>
                        </Col>
                        <Col span={20}>
                          {/* <Input
                   
                    aria-multiline
                     placeholder="Enter Remarks" /> */}
                          <Input
                            // disabled={role === 'ROLE_HOD' || role == 'ROLE_QA' || supervisorstatus == "SUPERVISOR_APPROVED"}
                            disabled={
                              role === "ROLE_HOD" ||
                              role === "ROLE_QA" ||
                              (supervisorstatus === "SUPERVISOR_APPROVED" &&
                                hodstatus !== "HOD_REJECTED" &&
                                qastatus !== "QA_REJECTED")
                            }
                            value={formData.remarks}
                            onChange={(e) =>
                              handleInputChange("remarks", e.target.value)
                            }
                          />
                        </Col>
                      </Row>
                    );
                  }
                  // For other rows, use the default input with the placeholder
                  return (
                    <Input placeholder={`Enter ${record.field}`} value={text} />
                  );
                },
              },
            ]}
            dataSource={[
              { key: "1", field: "Date" },
              { key: "2", field: "BMR No, Sub.Batch No , Bale No" },
              { key: "3", field: "Reason for Reprocess" },
              { key: "4", field: "Failure stage" },
              { key: "5", field: "Reprocess Qty (Kg)" },
              { key: "6", field: "Reference NC No (if)" },
              { key: "7", field: "Reprocessed stage" },
              { key: "8", field: "Remarks" },
            ]}
          />
        </TabPane>
        <TabPane tab="Remarks" key="2">
          {/* <Table columns={columns} dataSource={remarksData} /> */}
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}>Production Supervisor </b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}> HOD / Designees</b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}>QA </b>
              </td>
            </tr>

            <tr>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  textAlign: "center",
                  height: "40px",
                }}
                disabled={
                  (roleBase === "ROLE_SUPERVISOR" &&
                    selectedRow?.supervisorStatus === "SUPERVISOR_APPROVED") ||
                  (roleBase === "ROLE_HOD" &&
                    selectedRow?.hodStatus === "HOD_APPROVED") ||
                  (roleBase === "ROLE_QA" &&
                    selectedRow?.qaStatus === "QA_APPROVED") ||
                  finisharraylist !== "Crispy" ||
                  (roleBase === "ROLE_DESIGNEE" &&
                    selectedRow?.hodStatus === "HOD_APPROVED")
                }
              >
                {selectedRow?.supervisorStatus === "SUPERVISOR_APPROVED" && (
                  <>
                    <div>{supersigndate}</div>
                    {getImage !== "" && (
                      <img
                        className="signature"
                        src={getImage}
                        alt="Supervisor"
                      />
                    )}
                    <div>{selectedRow.supervisorSubmittedBy}</div>
                    <div>{formatDate(selectedRow.supervisorSubmittedOn)}</div>

                    {/* <div>Signature & Date</div> */}
                  </>
                )}
              </td>

              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  height: "40px",
                  textAlign: "center",
                }}
              >
                {(selectedRow?.hodStatus === "HOD_APPROVED" ||
                  selectedRow?.hodStatus === "HOD_REJECTED") && (
                  <>
                    <div>{hodsign}</div>
                    {getImage1 !== "" && (
                      <img className="signature" src={getImage1} alt="HOD" />
                    )}
                    <div>{selectedRow.hodSubmittedBy}</div>
                    <div>{formatDate(selectedRow.hodSubmittedDate)}</div>
                    {/* <span style={{ fontSize: '11px', marginLeft: "0px" }}>Signature & Date</span> */}
                  </>
                )}
              </td>

              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  height: "40px",
                  textAlign: "center",
                }}
              >
                {(selectedRow?.qaStatus === "QA_APPROVED" ||
                  selectedRow?.qaStatus === "QA_REJECTED") && (
                  <>
                    {getImage2 !== "" && (
                      <img className="signature" src={getImage2} alt="QA" />
                    )}
                    <div>{selectedRow.qaSubmittedBy}</div>
                    <div>{formatDate(selectedRow.qaSubmittedDate)}</div>
                    <div>{qa_signsignaturedate}</div>

                    {/* <span style={{ fontSize: '11px', marginLeft: "0px" }}>Signature & Date</span> */}
                  </>
                )}
              </td>
            </tr>
          </table>
        </TabPane>
      </Tabs>
    </div>
  );
}
