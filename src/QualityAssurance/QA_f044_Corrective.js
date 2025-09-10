import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { FaTrash, FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f044_Corrective = () => {
  const location = useLocation();
  const { uniqueDate, uniqueDep } = location.state || {}; // Destructure `uniqueDate` safely
  const navigate = useNavigate();
  const [mainid, setmainid] = useState(""); 
  const token = localStorage.getItem("token"); 
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState([]); 
  const [date, setDate] = useState("");
  const [dep, setDep] = useState(""); 
  const [selectedRow, setSelectedRow] = useState(""); 
  const roleauth = localStorage.getItem("role");

  const [shift, setShift] = useState(null);  
  const [remarks, setRemarks] = useState(""); 
  const [PackingDetails, setPackingDetails] = useState([]); 
  
  const [open, setOpen] = useState(false); 
  const [rows, setRows] = useState([
    {
      id: "",
      observationNo: "",
      date: uniqueDate,
      processProductDescription: "",
      natureOfNonConfirmity: "",
      rootCauseAnalysis: "",
      correctiveAction: "",
      responsibility: "",
      targetDate: "",
      effectivenessOfActionTaken: "",
    },
  ]);

  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: "",
        observationNo: "",
        date: uniqueDate,
        processProductDescription: "",
        natureOfNonConfirmity: "",
        rootCauseAnalysis: "",
        correctiveAction: "",
        responsibility: "",
        targetDate: "",
        effectivenessOfActionTaken: "",
      },
    ]);
  };
 

  const deleteRow = (index, rowId) => {
    if (rows.length === 1) {
      alert("At least one row is required.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      if (rowId) {
        setDeleteId((prevDeleteId) => [...prevDeleteId, rowId]);
      }

      setRows((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  // Function to actually delete a row by ID after saving
  const handleDelete = async (rowId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `${API.prodUrl}/Precot/api/QA/Service/correctiveActionReport/deleteActionReportInfo?id=${rowId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
      }
    } catch (err) {
      console.error("Error deleting row:", err);
      message.error("An error occurred while deleting a row.");
    }
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
  const payloadyear = formatMonthYear(uniqueDate);
  const payloadmonth = formatMonth(uniqueDate);
  
  const handleInputChange = (index, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };
  const handleSelectText = (e) => {
    if (
      !/[0-9a-zA-Z._/ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const formattedQaInspectorDate = formatDate(selectedRow?.qaInspectorSubmitOn);
  const formattedQaDesigneeDate = formatDate(selectedRow?.qaDesigneeSubmitOn);
  const formattedQaManagerDate = formatDate(selectedRow?.qaManagerMrSubmitOn);

  const [images, setImages] = useState({
    qaInspector: "",
    qaDesignee: "",
    qaManager: "",
  });

  const fetchImage = (username, roleKey) => {
    const token = localStorage.getItem("token");
    if (username) {
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
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setImages((prev) => ({ ...prev, [roleKey]: url }));
        })
        .catch((err) => {
          console.error(`Error fetching ${roleKey} image:`, err);
        });
    }
  };

  useEffect(() => {
    fetchImage(selectedRow?.qaInspectorSign, "qaInspector");
    fetchImage(selectedRow?.qaDesigneeSign, "qaDesignee");
    fetchImage(selectedRow?.qaManagerMrSign, "qaManager");
  }, [selectedRow,API.prodUrl]);

  const [getImage3, setGetImage3] = useState("");

  useEffect(() => {
    const username = selectedRow?.operator_sign;
    if (username) {
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
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage3(url);
        })
        .catch((err) => {});
    }
  }, [selectedRow,API.prodUrl]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.hod_sign;
    if (username) {
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
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage2(url);
        })
        .catch((err) => {});
    }
  }, [selectedRow,API.prodUrl]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const resetRows = () => {
      setRows([
        {
          id: "",
          observationNo: "",
          date: uniqueDate,
          processProductDescription: "",
          natureOfNonConfirmity: "",
          rootCauseAnalysis: "",
          correctiveAction: "",
          responsibility: "",
          targetDate: "",
          effectivenessOfActionTaken: "",
        },
      ]);
    };

    if (uniqueDate) {
      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/correctiveActionReport/getActionReport`,
          {
            headers,
            params: { reportDate: uniqueDate },
          }
        )
        .then((response) => {
          if (
            response.data[0] &&
            Array.isArray(response.data[0].actionReportInfoList) &&
            response.data[0].actionReportInfoList.length > 0
          ) {
            setSelectedRow(response.data[0]);
            if (roleauth === "ROLE_DESIGNEE") {
              if (
                response.data[0]?.qaDesigneeStatus === "QA_DESIGNIEE_REJECTED"
              ) {
                message.warning(
                  "QA INSPECTOR Not Yet Approved or Previous Stage Rejected"
                );
                setTimeout(() => {
                  navigate("/Precot/QA/F-044/corrective_summary");
                }, 1500);
              } else if (
                response.data[0]?.qaDesigneeStatus === "WAITING_FOR_APPROVAL"
              ) {
              }
            }

            if (roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") {
              if (
                (response.data[0]?.qaInspectorStatus ==
                  "QA_INSPECTOR_SUBMITTED" &&
                  response.data[0]?.qaDesigneeStatus ==
                    "QA_DESIGNIEE_APPROVED" &&
                  response.data[0]?.qaManagerMrStatus ==
                    "QA_MANAGER_MR_REJECTED") ||
                response.data[0]?.qaManagerMrStatus == "" ||
                response.data[0]?.qaManagerMrStatus == null
              ) {
                message.warning(
                  "QA DESIGNEE Not Yet Approved or Previous Stage Rejected"
                );
                setTimeout(() => {
                  navigate("/Precot/QA/F-044/corrective_summary");
                }, 1500);
              }
            }
            if (
              roleauth === "ROLE_DESIGNEE" ||
              roleauth === "ROLE_QA" ||
              roleauth === "QA_MANAGER" ||
              roleauth === "ROLE_MR"
            ) {
              if (
                response.data?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED"
              ) {
                message.warning("Already approved");
                setTimeout(() => {
                  navigate("/Precot/QA/F-044/corrective_summary");
                }, 2000);
              }
            }
            setmainid(response.data[0].reportId);

            setRows(
              response.data[0].actionReportInfoList.map((item) => ({
                id: item.infoId || "",
                observationNo: item.observationNo || "",
                date: item.date || "",
                processProductDescription: item.processProductDescription || "",
                natureOfNonConfirmity: item.natureOfNonConfirmity || "",
                rootCauseAnalysis: item.rootCauseAnalysis || "",
                correctiveAction: item.correctiveAction || "",
                responsibility: item.responsibility || "",
                targetDate: item.targetDate || "",
                effectivenessOfActionTaken:
                  item.effectivenessOfActionTaken || "",
              }))
            );
          } else {
            resetRows();
          }
        })
        .catch((err) => {
          console.error("Error fetching corrective action report data:", err);
          resetRows();
        });
    } else {
      resetRows();
    }
  }, [uniqueDate, token]);

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/correctiveActionReport/approveOrReject`,
        {
          id: mainid,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false); 
        message.success(res.data.message);
        navigate("/Precot/QA/F-044/corrective_summary");
      })
      .catch((err) => {
        setLoading(false);

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
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/correctiveActionReport/approveOrReject`,
        {
          id: mainid,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false); 
        message.success(res.data.message);
        navigate("/Precot/QA/F-044/corrective_summary");
      })
      .catch((err) => {
        setLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const [loading, setLoading] = useState(false); 

  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);  

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };  

  const handleBack = () => {
    navigate("/Precot/QA/F-044/corrective_summary");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this number as needed

 
  const handleSave = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      // Construct the payload based on rows state
      const payload = {
        reportId: mainid,
        formatName: "CORRECTIVE ACTION REPORT",
        formatNo: "PH-QAD01/F-044",
        revisionNo: 2,
        sopNumber: "PH-QAD01-D-21",
        unit: "Unit H", // Assuming unit as "Unit H" based on your response
        reportDate: uniqueDate, // Set the report date based on uniqueDate
        year: payloadyear, // Assuming payloadyear is the year in payload
        month: payloadmonth, // Set the month as required
        actionReportInfoList: rows.map((row) => ({
          infoId: row.id,
          observationNo:
            row.observationNo || "OBS" + String(Date.now()).slice(-5), // Unique observation no
          date: row.date,
          processProductDescription: row.processProductDescription,
          natureOfNonConfirmity: row.natureOfNonConfirmity || "N/A",
          rootCauseAnalysis: row.rootCauseAnalysis || "N/A",
          correctiveAction: row.correctiveAction || "N/A",
          responsibility: row.responsibility || "N/A",
          targetDate: row.targetDate,
          effectivenessOfActionTaken: row.effectivenessOfActionTaken || "N/A",
          reportId: mainid,
        })),
        qaInspectorStatus: "QA_INSPECTOR_SAVED", // Assuming default status
      };

      // Make the API request with correct headers
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/correctiveActionReport/saveActionReport`,
        payload,
        { headers }
      );

      // Handle the response, e.g., show success notification
      message.success("Saved successfully");
      if (deleteId.length > 0) {
        for (let i = 0; i < deleteId.length; i++) {
          await handleDelete(deleteId[i]);
        }
        setDeleteId([]); // Clear the deleteId array after successful deletion
      }

      setTimeout(() => {
        navigate("/Precot/QA/F-044/corrective_summary");
      }, 2000);
    } catch (error) {
      // Handle errors, e.g., show error notification
      console.error("Error saving data:", error);
      message.error("Failed to save data.");
    }
  };

  const handleSubmit = async () => {
    const invalidRows = rows.filter((row) => {
      return (
        !row.observationNo ||
        !row.date ||
        !row.processProductDescription ||
        !row.natureOfNonConfirmity ||
        !row.rootCauseAnalysis ||
        !row.correctiveAction ||
        !row.responsibility ||
        !row.targetDate ||
        !row.effectivenessOfActionTaken
      ); // Check if any required field is missing
    });

    if (invalidRows.length > 0) {
      // Show error notification or message
      message.error("Please provide the All field entries for all rows.");
      // You can use an alert, modal, or other notification system here
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      // Construct the payload based on rows state
      const payload = {
        reportId: mainid,
        formatName: "CORRECTIVE ACTION REPORT",
        formatNo: "PH-QAD01/F-044",
        revisionNo: 2,
        sopNumber: "PH-QAD01-D-21",
        unit: "Unit H", // Assuming unit as "Unit H" based on your response
        reportDate: uniqueDate, // Set the report date based on uniqueDate
        year: payloadyear, // Assuming payloadyear is the year in payload
        month: payloadmonth, // Set the month as required
        actionReportInfoList: rows.map((row) => ({
          infoId: row.id,
          observationNo:
            row.observationNo || "OBS" + String(Date.now()).slice(-5), // Unique observation no
          date: row.date,
          processProductDescription: row.processProductDescription,
          natureOfNonConfirmity: row.natureOfNonConfirmity || "N/A",
          rootCauseAnalysis: row.rootCauseAnalysis || "N/A",
          correctiveAction: row.correctiveAction || "N/A",
          responsibility: row.responsibility || "N/A",
          targetDate: row.targetDate,
          effectivenessOfActionTaken: row.effectivenessOfActionTaken || "N/A",
          reportId: mainid,
        })),
        qaInspectorStatus: "QA_INSPECTOR_SAVED", // Assuming default status
      };

      // Make the API request with correct headers
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/correctiveActionReport/submitActionReport`,
        payload,
        { headers }
      );

      // Handle the response, e.g., show success notification
      message.success("Submitted successfully");
      if (deleteId.length > 0) {
        for (let i = 0; i < deleteId.length; i++) {
          await handleDelete(deleteId[i]);
        }
        setDeleteId([]); // Clear the deleteId array after successful deletion
      }

      setTimeout(() => {
        navigate("/Precot/QA/F-044/corrective_summary");
      }, 2000);
    } catch (error) {
      // Handle errors, e.g., show error notification
      console.error("Error saving data:", error);
      message.error("Failed to save data.");
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_QA") {
      if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "WATING_FOR_APPROVAL"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "none"; // Return false for this specific condition
      }
    } else if (roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED"
      ) {
        return "none";
      }
    } else if (roleauth == "QA_MANAGER") {
      if (
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth === "ROLE_MR") {
      if (
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED"
      ) {
        return "none";
      }
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_QA") {
      if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_REJECTED"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        (selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
          selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
          selectedRow?.qaManagerMrStatus === "WAITING_FOR_APPROVAL") ||
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_REJECTED"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED"
      ) {
        return "none"; // Return false for this specific condition
      } else if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED"
      ) {
        return "none"; // Return false for this specific condition
      }
    }
    if (roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED"
      ) {
        return "none"; // Return false for this specific condition
      }
    }
  };

  const canEdit = () => {
    if (roleauth === "ROLE_QA") {
      if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "false"; // Return false for this specific condition
      } else if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "false"; // Return false for this specific condition
      } else if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED"
      ) {
        return "false"; // Return false for this specific condition
      }
    } else if (roleauth === "ROLE_DESIGNEE") {
      if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" ||
        selectedRow?.qaDesigneeStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "false"; // Return false for this specific condition
      }
    } else if (roleauth === "QA_MANAGER") {
      if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "false"; // Return false for this specific condition
      } else if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_REJECTED"
      ) {
        return "false"; // Return false for this specific condition
      } else if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED"
      ) {
        return "false";
      }
    } else if (roleauth === "QA_MANAGER") {
      if (
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "false";
      }
    } else if (roleauth === "ROLE_MR") {
      if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "false"; // Return false for this specific condition
      } else if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_REJECTED"
      ) {
        return "false"; // Return false for this specific condition
      } else if (
        selectedRow?.qaInspectorStatus === "QA_INSPECTOR_SUBMITTED" &&
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED"
      ) {
        return "false";
      }
    } else if (roleauth === "ROLE_MR") {
      if (
        selectedRow?.qaDesigneeStatus === "QA_DESIGNIEE_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED" &&
        selectedRow?.qaManagerMrStatus === "WAITING_FOR_APPROVAL"
      ) {
        return "false";
      }
    }
  };

  const isEditable = canEdit();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PackingDetails.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(PackingDetails.length / itemsPerPage);

  const handleTextareaChange = (event) => {
    setRemarks(event.target.value);
  };

  const formattedOperatorDate = selectedRow?.operator_submitted_on
    ? moment(selectedRow?.operator_submitted_on).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedhodDate = selectedRow?.hod_submit_on
    ? moment(selectedRow?.hod_submit_on).format("DD/MM/YYYY HH:mm")
    : "";

  const totalProductionQty = currentItems.reduce(
    (total, item) => total + (item.ProductionQty || 0),
    0
  );

  const items = [
    {
      key: "1",
      label: <p>Form</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "100%", margin: "auto", tableLayout: "fixed" }}
          >
            <tbody>
              <tr>
                <th colSpan="3">Observation No.</th>
                <th colSpan="3">Date</th>
                <th colSpan="3">Process / Product Description</th>
                <th colSpan="3">Observation / Nature of Non-conformity</th>
                <th colSpan="6">Root Cause Analysis</th>
                <th colSpan="6">Corrective Action</th>
                <th colSpan="3">Responsibility</th>
                <th colSpan="6">Target Date</th>
                <th colSpan="4">Effectiveness of Action Taken</th>
                <th colSpan="2">Action</th>
              </tr>

              {rows.map((row, index) => (
                <tr key={index}>
                  <td colSpan="3">
                    <Input
                      type="text"
                      placeholder="Text"
                      value={row.observationNo}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "observationNo",
                          e.target.value
                        )
                      }
                      disabled={isEditable}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                    />
                  </td>
                  <td colSpan="3">
                    <Input
                      type="date"
                      value={row.date}
                      onChange={(e) =>
                        handleInputChange(index, "date", e.target.value)
                      }
                      disabled={isEditable}
                    />
                  </td>
                  <td colSpan="3">
                    <Input
                      type="text"
                      placeholder="Text"
                      value={row.processProductDescription}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "processProductDescription",
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={isEditable}
                    />
                  </td>
                  <td colSpan="3">
                    <Input
                      type="text"
                      placeholder="Text"
                      value={row.natureOfNonConfirmity}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "natureOfNonConfirmity",
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={isEditable}
                    />
                  </td>
                  <td colSpan="6">
                    <Input
                      type="text"
                      placeholder="Text"
                      value={row.rootCauseAnalysis}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "rootCauseAnalysis",
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={isEditable}
                    />
                  </td>
                  <td colSpan="6">
                    <Input
                      type="text"
                      placeholder="Text"
                      value={row.correctiveAction}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "correctiveAction",
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={isEditable}
                    />
                  </td>
                  <td colSpan="3">
                    <Input
                      type="text"
                      placeholder="Text"
                      value={row.responsibility}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "responsibility",
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      disabled={isEditable}
                    />
                  </td>
                  <td colSpan="6">
                    <Input
                      type="date"
                      value={row.targetDate}
                      onChange={(e) =>
                        handleInputChange(index, "targetDate", e.target.value)
                      }
                      disabled={isEditable}
                    />
                  </td>
                  <td colSpan="4">
                    <Input
                      type="text"
                      placeholder="Text"
                      value={row.effectivenessOfActionTaken}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "effectivenessOfActionTaken",
                          e.target.value
                        )
                      }
                      disabled={isEditable}
                    />
                  </td>
                  <td colSpan={2}>
                    <Button
                      type="primary"
                      danger
                      icon={<FaTrash />}
                      onClick={() => deleteRow(index)}
                      disabled={isEditable}
                    ></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              border: "1px solid #00308F",
              padding: "8px 12px",
              fontSize: "12px",
              marginRight: "50%",
              marginLeft: "35px",
            }}
            onClick={addRow}
            icon={
              <AiOutlinePlus style={{ color: "#00308F", marginRight: "1px" }} />
            }
            disabled={isEditable}
          >
            Add Row
          </Button>
        </div>
      ),
    },

    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <td
                colSpan="12"
                style={{
                  textAlign: "center",
                }}
              >
                Prepared:
              </td>
              <td
                colSpan="12"
                style={{
                  textAlign: "center",
                }}
              >
                Verified:
              </td>
              <td
                colSpan="11"
                style={{
                  textAlign: "center",
                }}
              >
                Reviewed:
              </td>
            </tr>

            <tr>
              <td
                colSpan="12"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {selectedRow?.qaInspectorStatus ===
                  "QA_INSPECTOR_SUBMITTED" && (
                  <>
                    {images.qaInspector && (
                      <img
                        className="signature"
                        src={images.qaInspector}
                        alt="QA Inspector Signature"
                      />
                    )}
                    <br />
                    {selectedRow.qaInspectorSign}
                    <br />
                    {formattedQaInspectorDate}
                  </>
                )}
              </td>

              <td
                colSpan="12"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {selectedRow?.qaDesigneeStatus === "QA_DESIGNEE_APPROVED" && (
                  <>
                    {images.qaDesignee && (
                      <img
                        className="signature"
                        src={images.qaDesignee}
                        alt="QA Designee Signature"
                      />
                    )}
                    <br />
                    {selectedRow.qaDesigneeSubmitBy}
                    <br />
                    {formattedQaDesigneeDate}
                  </>
                )}
              </td>
              <td
                colSpan="11"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {selectedRow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED" ||
                  (selectedRow?.qaManagerMrStatus ===
                    "QA_MANAGER_MR_REJECTED" && (
                    <>
                      {images.qaManager && (
                        <img
                          className="signature"
                          src={images.qaManager}
                          alt="QA Manager Signature"
                        />
                      )}
                      <br />
                      {selectedRow.qaManagerMrSubmitBy}
                      <br />
                      {formattedQaManagerDate}
                    </>
                  ))}
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
        unit="Unit H"
        formName="CORRECTIVE ACTION REPORT"
        formatNo="PH-QAD01/F-044"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "QA_MANAGER" ||
          roleauth === "ROLE_DESIGNEE" ||
          roleauth === "ROLE_MR" ? (
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
                icon={
                  <img src={approveIcon} alt="Approve Icon" color="#00308F" />
                }
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
              if (window.confirm("Are you sure want to logout")) {
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
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Input
          addonBefore="year"
          placeholder="year"
          value={payloadyear}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />

        <Input
          addonBefore="month"
          placeholder="month"
          value={payloadmonth}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
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

export default QA_f044_Corrective;
