/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, message, Row, Select, Tabs, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const QA_F048 = () => {
  const { state } = useLocation();
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const [operatorDate, setOperatorDate] = useState("");
  const [supervisorDate, setSupervisorDate] = useState("");
  const [hodDate, setHodDate] = useState("");
  const [open, setOpen] = useState(false);
  const [deviationId, setDeviationId] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfInitiation, setDateOfInitiation] = useState("");
  const [initiatingDepartment, setInitiatingDepartment] = useState("");
  const [deviationNumber, setDeviationNumber] = useState("");
  const [descriptionOfDeviation, setDescriptionOfDeviation] = useState("");
  const [impactAssessment, setImpactAssessment] = useState("");
  const [immediateActionTaken, setImmediateActionTaken] = useState("");
  const [qaReviewComments, setQaReviewComments] = useState("");
  const [investigation, setInvestigation] = useState("");
  const [qaAssessment, setQaAssessment] = useState("");
  const [CAPA, setCAPA] = useState("");
  const [closureDateExtentionRequest, setClosureDateExtentionRequest] =
    useState("");
  const [dateOfRequest, setDateOfRequest] = useState("");
  const [justificationOfRequest, setJustificationOfRequest] = useState("");
  const [attachmentsSupportingDocs, setAttachmentsSupportingDocs] =
    useState("");
  const [closureOfDeviation, setClosureOfDeviation] = useState("");
  const [finalApprovalOfClosure, setFinalApprovalOfClosure] = useState("");
  const [reason, setReason] = useState("");

  // Supervisor section 1
  const [sec1SupervisorStatus, setSec1SupervisorStatus] = useState("");
  const [sec1SupervisorSubmitOn, setSec1SupervisorSubmitOn] = useState("");
  const [sec1SupervisorSign, setSec1SupervisorSign] = useState("");

  // HOD designee section 1
  const [sec1HodDesigneeStatus, setSec1HodDesigneeStatus] = useState("");
  const [sec1HodDesigneeSubmitOn, setSec1HodDesigneeSubmitOn] = useState("");
  const [sec1HodDesigneeSign, setSec1HodDesigneeSign] = useState("");

  // QA Manager MR Review section 1
  const [sec1QaManagerMrReviewStatus, setSec1QaManagerMrReviewStatus] =
    useState("");
  const [sec1QaManagerMrReviewSubmitOn, setSec1QaManagerMrReviewSubmitOn] =
    useState("");
  const [sec1QaManagerMrReviewSign, setSec1QaManagerMrReviewSign] =
    useState("");

  // QA Manager MR Investigation section 1
  const [sec1QaManagerMrInvgStatus, setSec1QaManagerMrInvgStatus] =
    useState("");
  const [sec1QaManagerMrInvgSubmitOn, setSec1QaManagerMrInvgSubmitOn] =
    useState("");
  const [sec1QaManagerMrInvgSign, setSec1QaManagerMrInvgSign] = useState("");

  // Supervisor section 2
  const [sec2SupervisorStatus, setSec2SupervisorStatus] = useState("");
  const [sec2SupervisorSubmitOn, setSec2SupervisorSubmitOn] = useState("");
  const [sec2SupervisorSign, setSec2SupervisorSign] = useState("");

  // HOD designee section 2
  const [sec2HodDesigneeStatus, setSec2HodDesigneeStatus] = useState("");
  const [sec2HodDesigneeSubmitOn, setSec2HodDesigneeSubmitOn] = useState("");
  const [sec2HodDesigneeSign, setSec2HodDesigneeSign] = useState("");

  // QA Manager MR section 2
  const [sec2QaManagerMrStatus, setSec2QaManagerMrStatus] = useState("");
  const [sec2QaManagerMrSubmitOn, setSec2QaManagerMrSubmitOn] = useState("");
  const [sec2QaManagerMrSign, setSec2QaManagerMrSign] = useState("");

  // Supervisor section 3
  const [sec3SupervisorStatus, setSec3SupervisorStatus] = useState("");
  const [sec3SupervisorSubmitOn, setSec3SupervisorSubmitOn] = useState("");
  const [sec3SupervisorSign, setSec3SupervisorSign] = useState("");

  // HOD designee section 3
  const [sec3HodDesigneeStatus, setSec3HodDesigneeStatus] = useState("");
  const [sec3HodDesigneeSubmitOn, setSec3HodDesigneeSubmitOn] = useState("");
  const [sec3HodDesigneeSign, setSec3HodDesigneeSign] = useState("");

  // QA Manager MR section 3
  const [sec3QaManagerMrStatus, setSec3QaManagerMrStatus] = useState("");
  const [sec3QaManagerMrSubmitOn, setSec3QaManagerMrSubmitOn] = useState("");
  const [sec3QaManagerMrSign, setSec3QaManagerMrSign] = useState("");

  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [getImage4, setGetImage4] = useState("");
  const [getImage5, setGetImage5] = useState("");
  const [getImage6, setGetImage6] = useState("");
  const [getImage7, setGetImage7] = useState("");
  const [getImage8, setGetImage8] = useState("");
  const [getImage9, setGetImage9] = useState("");

  const [id, setId] = useState("");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QA/F-048/Summary");
  };

  const departmentLOV = [
    "BLEACHING",
    "SPUNLACE",
    "PAD_PUNCHING",
    "DRY_GOODS",
    "QC",
    "QUALITY_ASSURANCE",
    "PPC",
    "STORE",
    "DISPATCH",
    "PRODUCT_DEVELOPMENT",
    "ENGINEERING",
  ];

  // Find the label by value (e.g., "1" will correspond to "BLEACHING")
  const selectedDepartment = departmentLOV.find(
    (department) => department.value === initiatingDepartment
  );
  const initiatingDepartmentLabel = selectedDepartment
    ? selectedDepartment.label
    : "";

  const [editResponse, setEditResponse] = useState(null);
  const roleauth = localStorage.getItem("role");

  const formatDateUser = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDate = (dateStr) => {
    // Check if the date is already in the format dd/MM/yyyy
    if (!dateStr) return "";

    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    // Convert ISO date format to Date object
    const date = new Date(dateStr.replace(/(\.\d+)?([+-]\d{2}:\d{2}|Z)?$/, ""));

    if (isNaN(date)) {
      return "Invalid date";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value); // Store the department value (ID)
  };

  function formatMonthYear(uniqueDate) {
    if (!uniqueDate) {
      // Return a default value or an empty string if uniqueDate is undefined or null
      return "Unknown";
    }
    const [year, month, date] = uniqueDate.split("-");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${year}`;
  }
  function formatMonth(uniqueDate) {
    if (!uniqueDate) {
      // Return a default value or an empty string if uniqueDate is undefined or null
      return "Unknown";
    }
    const [year, month, date] = uniqueDate.split("-");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[parseInt(month) - 1]}`;
  }
  const payloadyear = formatMonthYear(state.date);
  const payloadmonth = formatMonth(state.date);

  useEffect(() => {
    fetchBmrOptions();
  }, []);

  const fetchBmrOptions = async () => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/QA/Service/deviationForm/getDeviationForm?dateOfIniation=${state.date}&department=${state.department}&deviationNumber=${state.deviationNo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data) {
        const deviationData = data;
        setEditResponse(deviationData);
        // Mapping fields to state dynamically
        setDeviationId(deviationData.deviationId || "");
        setYear(deviationData.year || "");
        setMonth(deviationData.month || "");
        setDepartment(deviationData.department || "");
        setDateOfInitiation(deviationData.dateOfInitiation || "");
        setInitiatingDepartment(deviationData.initiatingDepartment || "");
        setDeviationNumber(deviationData.deviationNumber || "");
        setDescriptionOfDeviation(deviationData.descriptionOfDeviation || "");
        setImpactAssessment(deviationData.impactAssessment || "");
        setImmediateActionTaken(deviationData.immediateActionTaken || "");
        setQaReviewComments(deviationData.qaReviewComments || "");
        setInvestigation(deviationData.investigation || "");
        setQaAssessment(deviationData.qaAssessment || "");
        setCAPA(deviationData.capa || "");
        setClosureDateExtentionRequest(
          deviationData.closureDateExtentionRequest || ""
        );
        setDateOfRequest(deviationData.dateOfRequest || "");
        setJustificationOfRequest(deviationData.justificationOfRequest || "");
        setAttachmentsSupportingDocs(
          deviationData.attachmentsSupportingDocs || ""
        );
        setClosureOfDeviation(deviationData.closureOfDeviation || "");
        setFinalApprovalOfClosure(deviationData.finalApprovalOfClosure || "");
        setReason(deviationData.reason || "");
        setSec1SupervisorStatus(deviationData.sec1SupervisorStatus || "");
        setSec1SupervisorSubmitOn(deviationData.sec1SupervisorSubmitOn || "");
        setSec1SupervisorSign(deviationData.sec1SupervisorSign || "");

        // HOD Designee Section 1
        setSec1HodDesigneeStatus(deviationData.sec1HodDesigneeStatus || "");
        setSec1HodDesigneeSubmitOn(deviationData.sec1HodDesigneeSubmitOn || "");
        setSec1HodDesigneeSign(deviationData.sec1HodDesigneeSign || "");

        // QA Manager MR Review Section 1
        setSec1QaManagerMrReviewStatus(
          deviationData.sec1QaManagerMrReviewStatus || ""
        );
        setSec1QaManagerMrReviewSubmitOn(
          deviationData.sec1QaManagerMrReviewSubmitOn || ""
        );
        setSec1QaManagerMrReviewSign(
          deviationData.sec1QaManagerMrReviewSign || ""
        );

        // QA Manager MR Investigation Section 1
        setSec1QaManagerMrInvgStatus(
          deviationData.sec1QaManagerMrInvgStatus || ""
        );
        setSec1QaManagerMrInvgSubmitOn(
          deviationData.sec1QaManagerMrInvgSubmitOn || ""
        );
        setSec1QaManagerMrInvgSign(deviationData.sec1QaManagerMrInvgSign || "");

        // Supervisor Section 2
        setSec2SupervisorStatus(deviationData.sec2SupervisorStatus || "");
        setSec2SupervisorSubmitOn(deviationData.sec2SupervisorSubmitOn || "");
        setSec2SupervisorSign(deviationData.sec2SupervisorSign || "");

        // HOD Designee Section 2
        setSec2HodDesigneeStatus(deviationData.sec2HodDesigneeStatus || "");
        setSec2HodDesigneeSubmitOn(deviationData.sec2HodDesigneeSubmitOn || "");
        setSec2HodDesigneeSign(deviationData.sec2HodDesigneeSign || "");

        // QA Manager MR Section 2
        setSec2QaManagerMrStatus(deviationData.sec2QaManagerMrStatus || "");
        setSec2QaManagerMrSubmitOn(deviationData.sec2QaManagerMrSubmitOn || "");
        setSec2QaManagerMrSign(deviationData.sec2QaManagerMrSign || "");

        // Supervisor Section 3
        setSec3SupervisorStatus(deviationData.sec3SupervisorStatus || "");
        setSec3SupervisorSubmitOn(deviationData.sec3SupervisorSubmitOn || "");
        setSec3SupervisorSign(deviationData.sec3SupervisorSign || "");

        // HOD Designee Section 3
        setSec3HodDesigneeStatus(deviationData.sec3HodDesigneeStatus || "");
        setSec3HodDesigneeSubmitOn(deviationData.sec3HodDesigneeSubmitOn || "");
        setSec3HodDesigneeSign(deviationData.sec3HodDesigneeSign || "");

        // QA Manager MR Section 3
        setSec3QaManagerMrStatus(deviationData.sec3QaManagerMrStatus || "");
        setSec3QaManagerMrSubmitOn(deviationData.sec3QaManagerMrSubmitOn || "");
        setSec3QaManagerMrSign(deviationData.sec3QaManagerMrSign || "");

        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${deviationData.sec1SupervisorSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
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
            console.error("Error in fetching assistant image:", err);
          });

        // Fetch image for QC
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${deviationData.sec1HodDesigneeSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImage1(url); // Store QC image URL
          })
          .catch((err) => {
            console.error("Error in fetching QC image:", err);
          });

        // Fetch image for QA
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${deviationData.sec1QaManagerMrReviewSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImage2(url); // Store QA image URL
          })
          .catch((err) => {
            console.error("Error in fetching QA image:", err);
          });
        // Fetch image for PPC
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${deviationData.sec1QaManagerMrInvgSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImage3(url); // Store PPC image URL
          })
          .catch((err) => {
            console.error("Error in fetching PPC image:", err);
          });

        // Fetch image for Bleaching
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${deviationData.sec2SupervisorSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImage4(url); // Store Bleaching image URL
          })
          .catch((err) => {
            console.error("Error in fetching Bleaching image:", err);
          });

        // Fetch image for Spunlace
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${deviationData.sec2HodDesigneeSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImage5(url); // Store Spunlace image URL
          })
          .catch((err) => {
            console.error("Error in fetching Spunlace image:", err);
          });

        // Fetch image for Pad Punching
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${deviationData.sec2QaManagerMrSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImage6(url); // Store Pad Punching image URL
          })
          .catch((err) => {
            console.error("Error in fetching Pad Punching image:", err);
          });

        // Fetch image for Dry Goods
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${deviationData.sec3SupervisorSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImage7(url); // Store Dry Goods image URL
          })
          .catch((err) => {
            console.error("Error in fetching Dry Goods image:", err);
          });

        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${deviationData.sec3HodDesigneeSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImage8(url); // Store Dry Goods image URL
          })
          .catch((err) => {
            console.error("Error in fetching Dry Goods image:", err);
          });
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${deviationData.sec3QaManagerMrSign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
            const base64 = btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            const url = `data:image/jpeg;base64,${base64}`;
            setGetImage9(url); // Store Dry Goods image URL
          })
          .catch((err) => {
            console.error("Error in fetching Dry Goods image:", err);
          });
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_OPERATOR") {
      if (
        editResponse &&
        editResponse.operator_status === "OPERATOR_APPROVED" &&
        editResponse.hod_status !== "HOD_REJECTED" &&
        editResponse.supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
      return "block";
    } else if (roleauth == "ROLE_SUPERVISOR") {
      if (
        editResponse?.supervisor_status === "SUPERVISOR_APPROVED" &&
        editResponse?.hod_status === "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
          editResponse?.hod_status == "WAITING_FOR_APPROVAL") ||
        editResponse?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      } else if (
        editResponse?.supervisor_status == "SUPERVISOR_REJECTED" &&
        editResponse?.hod_status == "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_OPERATOR") {
      if (editResponse?.operator_status == "OPERATOR_APPROVED") {
        return "none"; // Disable button 2
      } else if (
        editResponse?.operator_status == "OPERATOR_APPROVED" &&
        editResponse?.supervisor_status == "WAITING_FOR_APPROVAL" &&
        (editResponse?.hod_status == "WAITING_FOR_APPROVAL" ||
          editResponse?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    }
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (editResponse?.hod_status == "WAITING_FOR_APPROVAL" ||
          editResponse?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };

  const canEdit = () => {
    if (roleauth === "ROLE_OPERATOR") {
      return !(
        editResponse &&
        editResponse.operator_status === "OPERATOR_APPROVED" &&
        editResponse.supervisor_status !== "SUPERVISOR_REJECTED" &&
        editResponse.hod_status !== "HOD_REJECTED"
      );
    } else if (roleauth === "ROLE_SUPERVISOR") {
      return !(
        (editResponse &&
          editResponse.operator_status === "OPERATOR_APPROVED" &&
          (editResponse.supervisor_status === "SUPERVISOR_APPROVED" ||
            editResponse.supervisor_status === "WAITING_FOR_APPROVAL") &&
          editResponse.hod_status === "WAITING_FOR_APPROVAL") ||
        "HOD_APPROVED"
      );
    } else if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      return !(
        editResponse &&
        (editResponse.hod_status === "HOD_APPROVED" ||
          editResponse.hod_status === "WAITING_FOR_APPROVAL" ||
          editResponse.hod_status === "HOD_REJECTED")
      );
    } else {
      return false;
    }
  };

  const ActionButtons = ({ saveLoading, submitLoading, onSave, onSubmit }) => (
    <div
      style={{
        position: "absolute",
        right: "10px",
        bottom: "10px",
        display: "flex",
      }}
    >
      <Button
        loading={saveLoading}
        type="primary"
        size="small"
        style={{
          backgroundColor: "#E5EEF9",
          color: "#00308F",
          fontWeight: "bold",
          marginRight: "8px",
        }}
        onClick={onSave}
        shape="round"
        icon={<IoSave color="#00308F" />}
      >
        Save
      </Button>
      <Button
        loading={submitLoading}
        type="primary"
        size="small"
        style={{
          backgroundColor: "#E5EEF9",
          color: "#00308F",
          fontWeight: "bold",
        }}
        icon={<GrDocumentStore color="#00308F" />}
        onClick={onSubmit}
        shape="round"
      >
        Submit
      </Button>
    </div>
  );
  const token = localStorage.getItem("token");
  const ActionButtonForSubmit = ({
    saveLoading,
    submitLoading,
    onSave,
    onSubmit,
  }) => (
    <div
      style={{
        position: "absolute",
        right: "10px",
        bottom: "10px",
        display: "flex",
      }}
    >
      <Button
        loading={submitLoading}
        type="primary"
        size="small"
        style={{
          backgroundColor: "#E5EEF9",
          color: "#00308F",
          fontWeight: "bold",
        }}
        icon={<GrDocumentStore color="#00308F" />}
        onClick={onSubmit}
        shape="round"
      >
        Submit
      </Button>
    </div>
  );
  const [deviationNo, setDeviationNo] = useState("");

  const incrementDeviationNo = (currentDeviationNo) => {
    // Assuming the format is 'DEV/PRD02/24/0002', split by '/'
    const parts = currentDeviationNo.split("/");
    if (parts.length === 4) {
      const numPart = parts[3]; // '0002'
      const incrementedNum = (parseInt(numPart) + 1)
        .toString()
        .padStart(numPart.length, "0");
      parts[3] = incrementedNum;
      return parts.join("/");
    }
    return currentDeviationNo;
  };

  // Fetch Deviation Number from the API
  const setDeviationNoFromResponse = (response) => {
    if (response.success && response.message) {
      setDeviationNo(response.message);
    } else {
      console.error("Invalid response format:", response);
    }
  };

  const getInitiatingDepartmentLabel = () => {
    const selectedDepartment = departmentLOV.find(
      (departments) => departments.value === department
    );
    return selectedDepartment ? selectedDepartment.label : ""; // Return label or empty string if no match
  };

  const handleSave = (section) => {
    setSaveLoading(true);
    const incrementedDeviationNo = incrementDeviationNo(state.deviationNo);
    setDeviationNo(incrementedDeviationNo);
    const payload = {
      unit: "Unit H",
      formatName: "DEVIATION FORM",
      formatNo: "PH-QAD01/F-048",
      revisionNo: "01",
      sopNumber: "PH-QAD01-D-44",
      deviationId: deviationId || null,
      year: payloadyear || "",
      month: payloadmonth || "",
      department: state.department,
      dateOfInitiation: state.date,
      initiatingDepartment: getInitiatingDepartmentLabel(),
      deviationNumber: state.deviationNo,
      descriptionOfDeviation: descriptionOfDeviation || "",
      impactAssessment: impactAssessment || "",
      immediateActionTaken: immediateActionTaken || "",
      qaReviewComments: qaReviewComments || "",
      investigation: investigation || "",
      qaAssessment: qaAssessment || "",
      capa: CAPA || "",
      closureDateExtentionRequest: closureDateExtentionRequest || "",
      dateOfRequest: dateOfRequest || "",
      justificationOfRequest: justificationOfRequest || "",
      attachmentsSupportingDocs: attachmentsSupportingDocs || "",
      closureOfDeviation: closureOfDeviation || "",
      finalApprovalOfClosure: finalApprovalOfClosure || "",
      reason: reason || "",
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/deviationForm/saveDeviationForm?section=${section}`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Sucessfully Saved");
        navigate("/Precot/QA/F-048/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const validateSection = (section) => {
    switch (section) {
      case "sec1_spvr":
        if (
          !descriptionOfDeviation ||
          !impactAssessment ||
          !immediateActionTaken
        ) {
          message.error(
            "Please fill all required fields for Deviation Information."
          );
          return false;
        }
        break;

      case "sec1_hod_designee":
        // No validation needed for this section
        return true;

      case "sec1_qa_review":
        if (!qaReviewComments) {
          message.error("Please fill QA Review Comments.");
          return false;
        }
        break;

      case "sec1_qa_invg":
        if (!investigation || !qaAssessment) {
          message.error(
            "Please fill all required fields for QA Investigation."
          );
          return false;
        }
        break;

      case "sec2_spvr":
        if (
          !CAPA ||
          !closureDateExtentionRequest ||
          !dateOfRequest ||
          !justificationOfRequest
        ) {
          message.error(
            "Please fill all required fields for CAPA and Closure Date Extension Request."
          );
          return false;
        }
        break;

      case "sec2_hod_designee":
        // No validation needed for this section
        return true;

      case "sec2_qa":
        if (!qaAssessment) {
          message.error("Please fill QA Assessment for Section 2.");
          return false;
        }
        break;

      case "sec3_spvr":
        if (!attachmentsSupportingDocs || !closureOfDeviation) {
          message.error(
            "Please fill all required fields for Deviation Closure."
          );
          return false;
        }
        break;

      case "sec3_hod_designee":
        // No validation needed for this section
        return true;

      case "sec3_qa":
        if (!finalApprovalOfClosure) {
          message.error("Please fill Final Approval of Closure.");
          return false;
        }
        break;

      default:
        message.error("Invalid section.");
        return false;
    }
    return true;
  };

  const handleSubmit = (section) => {
    if (!validateSection(section)) {
      return;
    }

    setSubmitLoading(true);
    const incrementedDeviationNo = incrementDeviationNo(state.deviationNo);
    setDeviationNo(incrementedDeviationNo);
    const payload = {
      unit: "Unit H",
      formatName: "DEVIATION FORM",
      formatNo: "PH-QAD01/F-048",
      revisionNo: "01",
      sopNumber: "PH-QAD01-D-44",
      deviationId: deviationId || null,
      year: payloadyear || "",
      month: payloadmonth || "",
      department: state.department,
      dateOfInitiation: state.date,
      initiatingDepartment: getInitiatingDepartmentLabel(),
      deviationNumber: state.deviationNo,
      descriptionOfDeviation: descriptionOfDeviation || "",
      impactAssessment: impactAssessment || "",
      immediateActionTaken: immediateActionTaken || "",
      qaReviewComments: qaReviewComments || "",
      investigation: investigation || "",
      qaAssessment: qaAssessment || "",
      capa: CAPA || "",
      closureDateExtentionRequest: closureDateExtentionRequest || "",
      dateOfRequest: dateOfRequest || "",
      justificationOfRequest: justificationOfRequest || "",
      attachmentsSupportingDocs: attachmentsSupportingDocs || "",
      closureOfDeviation: closureOfDeviation || "",
      finalApprovalOfClosure: finalApprovalOfClosure || "",
      reason: reason || "",
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${API.prodUrl}/Precot/api/QA/Service/deviationForm/submitDeviationForm?section=${section}`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Sucessfully submitted");
        navigate("/Precot/QA/F-048/Summary");
      })
      .catch((err) => {
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const items = [
    {
      key: "1",
      // label: <p>DEVIATION</p>,
      children: (
        <div>
          <table
            align="left"
            style={{ width: "100%", margin: "auto", paddingBottom: "50px" }}
          >
            <tr>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Date of Initiation:{" "}
              </td>
              <td colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="date"
                  value={state.date}
                  disabled
                />
              </td>

              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Initiating Department:
              </td>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                <select
                  className="inp-new"
                  value={state.department}
                  onChange={handleDepartmentChange}
                  style={{ width: "100%", textAlign: "center" }}
                  disabled
                >
                  <option value="">Select Department</option>
                  {departmentLOV.map((departmentLabel, index) => (
                    <option key={index} value={departmentLabel}>
                      {departmentLabel}
                    </option>
                  ))}
                </select>
              </td>

              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Deviation Number:{" "}
              </td>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                <input className="inp-new" value={state.deviationNo} disabled />
              </td>
            </tr>
            <tr>
              <td colSpan={10}>Description of Deviation: </td>
              <td colSpan={80} style={{ textAlign: "left" }}>
                <textarea
                  className="inp-new"
                  type="text"
                  style={{
                    minHeight: "50px",
                    textAlign: "left",
                    width: "98%",
                    paddingLeft: "10px",
                  }}
                  value={descriptionOfDeviation}
                  onChange={(e) => setDescriptionOfDeviation(e.target.value)}
                  disabled={sec1SupervisorStatus === "SUPERVISOR_SUBMITTED"}
                />{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={10}>Impact Assessment: </td>
              <td colSpan={80} style={{ textAlign: "left" }}>
                <textarea
                  className="inp-new"
                  type="text"
                  style={{
                    minHeight: "50px",
                    textAlign: "left",
                    width: "98%",
                    paddingLeft: "10px",
                  }}
                  value={impactAssessment}
                  onChange={(e) => setImpactAssessment(e.target.value)}
                  disabled={sec1SupervisorStatus === "SUPERVISOR_SUBMITTED"}
                />{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={10}>Immediate action taken: </td>
              <td colSpan={80} style={{ textAlign: "left" }}>
                <textarea
                  className="inp-new"
                  type="text"
                  style={{
                    minHeight: "50px",
                    textAlign: "left",
                    width: "98%",
                    paddingLeft: "10px",
                  }}
                  value={immediateActionTaken}
                  onChange={(e) => setImmediateActionTaken(e.target.value)}
                  disabled={sec1SupervisorStatus === "SUPERVISOR_SUBMITTED"}
                />{" "}
              </td>
            </tr>
            <tr>
              <td
                colSpan={40}
                style={{
                  height: "50px",
                  verticalAlign: "top",
                  position: "relative",
                }}
              >
                {getImage && <img className="signature" src={getImage} />}
                <br />
                Deviation Initiator Name:{sec1SupervisorSign}
                <br />
                <br />
                Sign & Date:{formatDate(sec1SupervisorSubmitOn)}
                {roleauth === "ROLE_SUPERVISOR" &&
                  (sec1SupervisorStatus == !"SUPERVISOR_SUBMITTED" ||
                    sec1SupervisorStatus === "SUPERVISOR_SAVED") && (
                    <>
                      <ActionButtons
                        saveLoading={saveLoading}
                        submitLoading={submitLoading}
                        onSave={() => handleSave("sec1_spvr")}
                        onSubmit={() => handleSubmit("sec1_spvr")}
                      />
                    </>
                  )}
              </td>

              <td colSpan={50} style={{ height: "50px" }}>
                QA Review Comments:
                <textarea
                  className="inp-new"
                  type="text"
                  style={{
                    minHeight: "50px",
                    textAlign: "left",
                    width: "97%",
                    paddingLeft: "10px",
                  }}
                  value={qaReviewComments}
                  onChange={(e) => setQaReviewComments(e.target.value)}
                  disabled={
                    sec1QaManagerMrReviewStatus === "QA_MANAGER_MR_SUBMITTED" || // Disable after submission
                    sec1HodDesigneeStatus !== "HOD_DESIGNEE_SUBMITTED" || // Disable if HOD status is not submitted
                    !(roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") // Disable if role is not QA_MANAGER or ROLE_MR
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={40} style={{ height: "60px", position: "relative" }}>
                Reviewed By (Res. Dept., HOD/Designee)
                <br />
                {getImage1 && <img className="signature" src={getImage1} />}
                <br />
                Name:{sec1HodDesigneeSign}
                <br />
                Sign & date:{formatDate(sec1HodDesigneeSubmitOn)}
                {(roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
                  (sec1SupervisorStatus === "SUPERVISOR_SUBMITTED" ||
                    sec1SupervisorStatus === "SUPERVISOR_SUBMITTED") &&
                  sec1HodDesigneeStatus !== "HOD_DESIGNEE_SUBMITTED" && (
                    <>
                      <ActionButtonForSubmit
                        submitLoading={submitLoading}
                        onSubmit={() => handleSubmit("sec1_hod_designee")}
                      />
                    </>
                  )}
              </td>
              <td colSpan={50} style={{ height: "60px", position: "relative" }}>
                Approved By (QA Manager/MR) Name:
                <br />
                {getImage2 && <img className="signature" src={getImage2} />}
                <br />
                {sec1QaManagerMrReviewSign}
                <br />
                Sign & date:{formatDate(sec1QaManagerMrReviewSubmitOn)}
                {(roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") &&
                  sec1SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec1HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec1QaManagerMrReviewStatus !== "QA_MANAGER_MR_SUBMITTED" && (
                    <>
                      <ActionButtons
                        saveLoading={saveLoading}
                        submitLoading={submitLoading}
                        onSave={() => handleSave("sec1_qa_review")}
                        onSubmit={() => handleSubmit("sec1_qa_review")}
                      />
                    </>
                  )}
              </td>
            </tr>
            <tr>
              <td colSpan={10}>Investigation:</td>
              <td colSpan={80}>
                <textarea
                  className="inp-new"
                  type="text"
                  style={{
                    minHeight: "50px",
                    textAlign: "left",
                    width: "98%",
                    paddingLeft: "10px",
                  }}
                  value={investigation}
                  onChange={(e) => setInvestigation(e.target.value)}
                  disabled={
                    !(
                      (roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") &&
                      sec1QaManagerMrReviewStatus ===
                        "QA_MANAGER_MR_SUBMITTED" &&
                      sec1QaManagerMrInvgStatus !== "QA_MANAGER_MR_SUBMITTED"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10}>
                QA Assessment:
                <br />
                Classification of Deviation filled by QA:
              </td>
              <td colSpan={80}>
                <textarea
                  className="inp-new"
                  type="text"
                  style={{
                    minHeight: "50px",
                    textAlign: "left",
                    width: "98%",
                    paddingLeft: "10px",
                  }}
                  value={qaAssessment}
                  onChange={(e) => setQaAssessment(e.target.value)}
                  disabled={
                    !(
                      (roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") &&
                      sec1QaManagerMrReviewStatus ===
                        "QA_MANAGER_MR_SUBMITTED" &&
                      sec1QaManagerMrInvgStatus !== "QA_MANAGER_MR_SUBMITTED"
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={90} style={{ position: "relative" }}>
                QA Manager/MR:
                <br />
                {getImage3 && <img className="signature" src={getImage3} />}
                <br />
                {sec1QaManagerMrInvgSign}
                <br />
                Sign & Date:{formatDate(sec1QaManagerMrInvgSubmitOn)}
                {(roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") &&
                  sec1SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec1HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec1QaManagerMrReviewStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec1QaManagerMrInvgStatus !== "QA_MANAGER_MR_SUBMITTED" && (
                    <>
                      <ActionButtons
                        saveLoading={saveLoading}
                        submitLoading={submitLoading}
                        onSave={() => handleSave("sec1_qa_invg")}
                        onSubmit={() => handleSubmit("sec1_qa_invg")}
                      />
                    </>
                  )}
              </td>
            </tr>
            <tr>
              <td colSpan={10}>CAPA: </td>
              <td colSpan={80}>
                <textarea
                  className="inp-new"
                  type="text"
                  style={{ minHeight: "50px", textAlign: "left" }}
                  value={CAPA}
                  onChange={(e) => setCAPA(e.target.value)}
                  disabled={
                    sec2SupervisorStatus === "SUPERVISOR_SUBMITTED" ||
                    sec1QaManagerMrInvgStatus !== "QA_MANAGER_MR_SUBMITTED" ||
                    roleauth !== "ROLE_SUPERVISOR"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10}>
                {" "}
                Deviation closure date extension request (If Any):
              </td>
              <td colSpan={30} style={{ height: "35px", textAlign: "center" }}>
                <Select
                  className="inp-new"
                  type="text"
                  style={{ textAlign: "center" }}
                  value={closureDateExtentionRequest}
                  onChange={(e) => setClosureDateExtentionRequest(e)}
                  disabled={
                    sec2SupervisorStatus === "SUPERVISOR_SUBMITTED" ||
                    sec1QaManagerMrInvgStatus !== "QA_MANAGER_MR_SUBMITTED" ||
                    roleauth !== "ROLE_SUPERVISOR"
                  }
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </td>
              <td colSpan={10} style={{ height: "35px", textAlign: "center" }}>
                Date of Request: <br />{" "}
              </td>
              <td colSpan={40} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  type="date"
                  value={dateOfRequest}
                  onChange={(e) => setDateOfRequest(e.target.value)}
                  disabled={
                    sec2SupervisorStatus === "SUPERVISOR_SUBMITTED" ||
                    sec1QaManagerMrInvgStatus !== "QA_MANAGER_MR_SUBMITTED" ||
                    roleauth !== "ROLE_SUPERVISOR"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={10}> Justification for extension of date: </td>
              <td colSpan={80} style={{ height: "35px", textAlign: "center" }}>
                <textarea
                  className="inp-new"
                  type="text"
                  style={{
                    minHeight: "50px",
                    textAlign: "left",
                    width: "98%",
                    paddingLeft: "10px",
                  }}
                  value={justificationOfRequest}
                  onChange={(e) => setJustificationOfRequest(e.target.value)}
                  disabled={
                    sec2SupervisorStatus === "SUPERVISOR_SUBMITTED" ||
                    sec1QaManagerMrInvgStatus !== "QA_MANAGER_MR_SUBMITTED" ||
                    roleauth !== "ROLE_SUPERVISOR"
                  }
                />
              </td>
            </tr>
            <tr>
              <td
                colSpan={10}
                style={{
                  height: "80px",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                Requested by (Initiating department)
                <br />
                {getImage4 && <img className="signature" src={getImage4} />}
                <br />
                Name:{sec2SupervisorSign}
                <br />
                Sign & date:{formatDate(sec2SupervisorSubmitOn)}
                {roleauth === "ROLE_SUPERVISOR" &&
                  sec1SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec1HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec1QaManagerMrReviewStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec1QaManagerMrInvgStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec2SupervisorStatus !== "SUPERVISOR_SUBMITTED" && (
                    <>
                      <ActionButtons
                        saveLoading={saveLoading}
                        submitLoading={submitLoading}
                        onSave={() => handleSave("sec2_spvr")}
                        onSubmit={() => handleSubmit("sec2_spvr")}
                      />
                    </>
                  )}
              </td>
              <td
                colSpan={35}
                style={{
                  height: "80px",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                Reviewed by (HOD of Initiator department):
                <br />
                {getImage5 && <img className="signature" src={getImage5} />}
                <br />
                Name:{sec2HodDesigneeSign}
                <br />
                Sign & date:{formatDate(sec2HodDesigneeSubmitOn)}
                {(roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
                  sec1SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec1HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec1QaManagerMrReviewStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec1QaManagerMrInvgStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec2SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec2HodDesigneeStatus !== "HOD_DESIGNEE_SUBMITTED" && (
                    <>
                      <ActionButtonForSubmit
                        submitLoading={submitLoading}
                        onSubmit={() => handleSubmit("sec2_hod_designee")}
                      />
                    </>
                  )}
              </td>
              <td
                colSpan={40}
                style={{
                  height: "80px",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                Approved by (QA Manager/MR)
                <br />
                {getImage6 && <img className="signature" src={getImage6} />}
                <br />
                Name:{sec2QaManagerMrSign}
                <br />
                Sign & date:{formatDate(sec2QaManagerMrSubmitOn)}
                {(roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") &&
                  sec1SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec1HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec1QaManagerMrReviewStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec1QaManagerMrInvgStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec2SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec2HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec2QaManagerMrStatus !== "QA_MANAGER_MR_SUBMITTED" && (
                    <>
                      <ActionButtonForSubmit
                        submitLoading={submitLoading}
                        onSubmit={() => handleSubmit("sec2_qa")}
                      />
                    </>
                  )}
              </td>
            </tr>
            <tr>
              <td colSpan={10}>Attachments / Supporting documents: </td>
              <td colSpan={80}>
                <Select
                  className="inp-new"
                  value={attachmentsSupportingDocs}
                  onChange={(e) => setAttachmentsSupportingDocs(e)}
                  disabled={
                    sec3SupervisorStatus === "SUPERVISOR_SUBMITTED" ||
                    sec2QaManagerMrStatus !== "QA_MANAGER_MR_SUBMITTED" ||
                    roleauth !== "ROLE_SUPERVISOR"
                  }
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </td>
            </tr>
            <tr>
              <td colSpan={10}>Closure of Deviation: </td>
              <td colSpan={80}>
                <textarea
                  className="inp-new"
                  type="text"
                  style={{
                    minHeight: "50px",
                    textAlign: "left",
                    width: "98%",
                    paddingLeft: "10px",
                  }}
                  value={closureOfDeviation}
                  onChange={(e) => setClosureOfDeviation(e.target.value)}
                  disabled={
                    sec3SupervisorStatus === "SUPERVISOR_SUBMITTED" ||
                    sec2QaManagerMrStatus !== "QA_MANAGER_MR_SUBMITTED" ||
                    roleauth !== "ROLE_SUPERVISOR"
                  }
                />
              </td>
            </tr>
            <tr>
              <td
                colSpan={40}
                style={{
                  height: "60px",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                {getImage7 && <img className="signature" src={getImage7} />}
                <br />
                Initiator Name:{sec3SupervisorSign}
                <br />
                Sign & date:{formatDate(sec3SupervisorSubmitOn)}
                {roleauth === "ROLE_SUPERVISOR" &&
                  sec1SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec1HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec1QaManagerMrReviewStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec1QaManagerMrInvgStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec2SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec2HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec2QaManagerMrStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec3SupervisorStatus !== "SUPERVISOR_SUBMITTED" && (
                    <>
                      <ActionButtons
                        saveLoading={saveLoading}
                        submitLoading={submitLoading}
                        onSave={() => handleSave("sec3_spvr")}
                        onSubmit={() => handleSubmit("sec3_spvr")}
                      />
                    </>
                  )}
              </td>
              <td
                colSpan={50}
                style={{
                  height: "60px",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                {getImage8 && <img className="signature" src={getImage8} />}
                <br />
                Reviewed By (HOD/Designee) Name:{sec3HodDesigneeSign}
                <br />
                Sign & date:{formatDate(sec3HodDesigneeSubmitOn)}
                {(roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
                  sec1SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec1HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec1QaManagerMrReviewStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec1QaManagerMrInvgStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec2SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec2HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec2QaManagerMrStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec3SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec3HodDesigneeStatus !== "HOD_DESIGNEE_SUBMITTED" && (
                    <>
                      <ActionButtonForSubmit
                        submitLoading={submitLoading}
                        onSubmit={() => handleSubmit("sec3_hod_designee")}
                      />
                    </>
                  )}
              </td>
            </tr>
            <tr>
              <td colSpan={10}> Final Approval of Closure of Deviation: </td>
              <td colSpan={80}>
                <textarea
                  className="inp-new"
                  type="text"
                  style={{
                    minHeight: "50px",
                    textAlign: "left",
                    width: "98%",
                    paddingLeft: "10px",
                  }}
                  value={finalApprovalOfClosure}
                  onChange={(e) => setFinalApprovalOfClosure(e.target.value)}
                  disabled={
                    sec3QaManagerMrStatus === "QA_MANAGER_MR_APPROVED" ||
                    sec3HodDesigneeStatus !== "HOD_DESIGNEE_SUBMITTED" ||
                    !(roleauth === "ROLE_MR" || roleauth === "QA_MANAGER")
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={90} style={{ position: "relative", height: "60px" }}>
                {getImage9 && <img className="signature" src={getImage9} />}
                <br />
                Approved by (QA Manager/MR) Name:{sec3QaManagerMrSign}
                <br />
                Sign & date:{formatDate(sec3QaManagerMrSubmitOn)}
                {(roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") &&
                  sec1SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec1HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec1QaManagerMrReviewStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec1QaManagerMrInvgStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec2SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec2HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec2QaManagerMrStatus === "QA_MANAGER_MR_SUBMITTED" &&
                  sec3SupervisorStatus === "SUPERVISOR_SUBMITTED" &&
                  sec3HodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED" &&
                  sec3QaManagerMrStatus !== "QA_MANAGER_MR_APPROVED" && (
                    <>
                      <ActionButtons
                        saveLoading={saveLoading}
                        submitLoading={submitLoading}
                        onSave={() => handleSave("sec3_qa")}
                        onSubmit={() => handleSubmit("sec3_qa")}
                      />
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
      <BleachingHeader
        unit="Unit-H"
        formName="DEVIATION FORM"
        formatNo="PH- QAD01/F-048"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginRight: "20px",
            }}
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            shape="round"
          >
            Back
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <div style={{ paddingBottom: "2em" }}></div>
      <Row>
        <Tabs
          items={items}
          style={{
            width: "90%",
            position: "relative",
            left: "2%",
          }}
        />
      </Row>
    </div>
  );
};

export default QA_F048;
