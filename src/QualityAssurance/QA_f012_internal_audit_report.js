import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Tabs,
  Tooltip,
} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f012_internal_audit_report = () => {
  const formatName = "INTERNAL AUDIT REPORT";
  const formatNo = "PH-QAD01/F-012";
  const unit = "Unit H";
  const userName = localStorage.getItem("username");
  const [auditees, setauditees] = useState([]);
  const [auditors, setauditors] = useState([]);
  const [newauditee, setNewauditee] = useState("");
  const [auditSchedule, setAuditSchedule] = useState("");
  const [newauditor, setNewauditor] = useState("");
  const [selectedAuditee, setSelectedAuditee] = useState("");
  const [selectedAuditor, setSelectedAuditor] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [iarNo, setIarNo] = useState("");
  const [form] = Form.useForm();
  const [totalNCRaised, setTotalNCRaised] = useState("");
  const [responseData, setResponseData] = useState("");
  const [minorNC, setMinorNC] = useState("");
  const [majorNC, setMajorNC] = useState("");
  const [remarks, setRemarks] = useState("");
  const [rows, setRows] = useState([
    {
      ClauseNo: "",
      Observation: "",
      Finding: "",
    },
  ]);
  const today = new Date();
  const yearF = today.getFullYear();
  const monthF = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${yearF}-${monthF}-${day}`;

  const roleauth = localStorage.getItem("role");

  const handleAddRow = () => {
    setRows([...rows, {}]);
  };
  const handleClauseNoChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].ClauseNo = value;
    setRows(updatedRows);
  };
  const handleObservationChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].Observation = value;
    setRows(updatedRows);
  };
  const handleFindingChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].Finding = value;
    setRows(updatedRows);
  };
  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );

    if (confirmDelete) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    }
  };
  const disabled =
    (roleauth === "ROLE_HOD" &&
      responseData?.auditeeStatus === "AUDITEE_SUBMITTED" &&
      responseData?.auditorStatus !== "AUDITOR_REJECTED" &&
      responseData?.qaMrStatus !== "QA_MR_REJECTED") ||
    roleauth === "QA_MANAGER" ||
    roleauth === "ROLE_MR" ||
    responseData?.auditorName?.toUpperCase() === userName?.toUpperCase();

  const handleKeyDown = (e) => {
    const isAlphanumeric = /^[a-zA-Z.0-9]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "_", " ", ","].includes(
        e.key
      )
    ) {
      e.preventDefault();
    }
  };
  const handleBlur = () => {
    const totalNC = Number(totalNCRaised);
    const minor = Number(minorNC);
    const major = Number(majorNC);

    if (minor + major > totalNC) {
      message.warning(
        "The sum of Minor NC and Major NC cannot exceed the Total No. of NC Raised."
      );
      setMajorNC("");
      setMinorNC("");
    }
  };

  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newData, setNewData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [month, setMonth] = useState(null);
  const location = useLocation();
  const { editYear, editMonth, editDepartment } = location.state || {};
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [reportDate, setReportDate] = useState(null);
  const [basedOnStandard, setBasedOnStandard] = useState("");
  const [reportId, setReportId] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const alertShown = useRef(false); // Flag to prevent duplicate alert

  const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  const { confirm } = Modal;

  const handleAddAuditParticipant = async (type) => {
    const token = localStorage.getItem("token");

    // Determine the input and state based on the type
    const participantName = type === "auditor" ? newauditor : newauditee;
    //const setParticipantList = type === 'auditor' ? setauditors : setauditees;

    if (participantName) {
      try {
        // Make the API call to add the participant
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/addAuditParticipant`,
          { participant: participantName, formatNo: "PH-QAD01/F-010" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        message.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`
        );

        // Reset the input field
        type === "auditor" ? setNewauditor("") : setNewauditee("");

        // Re-fetch the updated participant list
        const participantResponse = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditParticipants`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setauditors(participantResponse.data);
        setauditees(participantResponse.data);
      } catch (error) {
        console.error(`Error adding ${type}:`, error);
        message.error(`Failed to add ${type}`);
      }
    }
  };

  const handleDeleteParticipant = async (participants, index, type) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/deleteAuditParticipant?id=${participants.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      message.success("Audit Type deleted successfully");
      // If the deleted item was selected, clear it

      // handleInputChange(index, type, null); // Adjust this part to reset the selected value

      // Re-fetch auditees to refresh the list
      const auditParticipantResponse = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditParticipants`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setauditees(auditParticipantResponse.data);
      setauditors(auditParticipantResponse.data);
    } catch (error) {
      message.error("Failed to delete auditee");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = newData?.auditeeSign;
    if (username) {
      //

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
          //
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
          //
        });
    }
  }, [newData,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = newData?.auditorSign;
    if (username) {
      //

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
          //
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
          //
        });
    }
  }, [newData,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = newData?.qaMrSign;
    if (username) {
      //

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
          //
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
          //
        });
    }
  }, [newData,API.prodUrl, token]);

  let formattedAuditeeDate;
  if (newData.auditeeSubmitOn) {
    formattedAuditeeDate = moment(newData.auditeeSubmitOn).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where auditee is null or undefined
    formattedAuditeeDate = ""; // Or any other default value or error handling
  }
  let formattedAuditorDate;
  if (newData.auditorSubmitOn) {
    formattedAuditorDate = moment(newData.auditorSubmitOn).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedAuditorDate = ""; // Or any other default value or error handling
  }
  let formattedQAMRDate;
  if (newData.qaMrSubmitOn) {
    formattedQAMRDate = moment(newData.qaMrSubmitOn).format("DD/MM/YYYY HH:mm");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQAMRDate = ""; // Or any other default value or error handling
  }

  const fetchData = async () => {
    try {
      const auditeesResponse = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditParticipants`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (auditeesResponse.data && Array.isArray(auditeesResponse.data)) {
        setauditees(auditeesResponse.data);
        setauditors(auditeesResponse.data);
      } else {
        setauditors([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setauditors([]); // Fallback to an empty array in case of error
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if editYear and editMonth are available
    if (editYear) {
      setYear(editYear);
    }
    if (editMonth) {
      setMonth(editMonth);
    }

    if (editDepartment) {
      setDepartment(editDepartment);
    }

    // Set form fields for year and month programmatically
    form.setFieldsValue({
      year: editYear,
      month: editMonth,
      department: editDepartment,
    });

    // Fetch Audit Participants and Schedule if both editYear and editMonth are available
    if (editYear && editMonth) {
      fetchData();
      fetchAuditSchedule(); // Calling fetchAuditSchedule in the same block
    } else {
    }
  }, [editYear, editMonth, editDepartment, form]);

  const generateFinancialYears = (
    startYear = new Date().getFullYear(),
    numberOfYears = 10
  ) => {
    let financialYears = [];
    for (let i = 0; i < numberOfYears; i++) {
      const year1 = startYear + i;
      const year2 = year1 + 1;
      financialYears.push(`${year1}-${year2}`);
    }
    return financialYears;
  };

  const years = generateFinancialYears();

  const yearOptions = years.map((year) => ({
    label: year,
    value: year,
  }));

  const fetchAuditSchedule = async () => {
    //  alert(alertShown.current);
    if (alertShown.current) {
      // alert(alertShown.current);
      return;
    }
    alertShown.current = true;
    const token = localStorage.getItem("token");
    if (editYear && editMonth && editDepartment) {
      try {
        setLoading(true);
        const encodedDepartment = encodeURIComponent(editDepartment);
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditReport/getAuditReport?year=${editYear}&month=${editMonth}&department=${encodedDepartment}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        setResponseData(response.data);
        if (response.data && response.data.message != "No data") {
          setReportId(response.data.reportId);
          setSelectedAuditee(response.data.auditeeName);
          setSelectedAuditor(response.data.auditorName);
          setIarNo(response.data.iarNo);
          setNewData(response.data);
          setReportDate(response.data.reportDate);
          setDepartment(response.data.department);
          setBasedOnStandard(response.data.standard);
          setRemarks(response.data.auditRemarks);
          setTotalNCRaised(response.data.totalNoOfNc);
          setMinorNC(response.data.noOfMinorNc);
          setMajorNC(response.data.noOfMajorNc);

          if (response.data && response.data.clauseInfoList) {
            setRows(
              response.data.clauseInfoList.map((item) => ({
                ClauseNo: item.clauseNo,
                Observation: item.observationEvidence,
                Finding: item.finding,
              }))
            );
          } else {
            setRows([]);
            setSelectedAuditee(userName);
          }
        } else {
          setDataSource([]);
        }
        if (
          roleauth == "ROLE_HOD" &&
          response?.data?.auditorName?.toUpperCase() ===
            userName?.toUpperCase() &&
          response?.data?.auditorStatus === "AUDITOR_REJECTED"
        ) {
          message.error("Auditee Not Yet Approved");

          setTimeout(() => {
            navigate(
              "/Precot/QualityAssurance/F-012/internal_audit_report_summary"
            );
          }, 1500);
        }
        if (
          (roleauth == "ROLE_MR" &&
            response?.data?.qaMrStatus === "QA_MR_REJECTED") ||
          (roleauth == "QA_MANAGER" &&
            response?.data?.qaMrStatus === "QA_MR_REJECTED")
        ) {
          message.error("Auditor Not Yet Approved");

          setTimeout(() => {
            navigate(
              "/Precot/QualityAssurance/F-012/internal_audit_report_summary"
            );
          }, 1500);
        }
      } catch (error) {
        console.error("Error fetching audit report:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleBack = () => {
    navigate("/Precot/QualityAssurance/F-012/internal_audit_report_summary");
  };

  const handleSubmit = () => {
    if (reportDate == "null" || reportDate == "") {
      message.warning("Date Required");
      setSubmitLoading(false);
      return;
    }
    if (selectedAuditor == "null" || selectedAuditor == "") {
      message.warning("Auditor Name Required");
      setSubmitLoading(false);
      return;
    }
    if (selectedAuditor == "null" || selectedAuditor == "") {
      message.warning("Auditor Name Required");
      setSubmitLoading(false);
      return;
    }
    if (iarNo == "null" || iarNo == "") {
      message.warning("IAR Number Required");
      setSubmitLoading(false);
      return;
    }
    if (totalNCRaised == "null" || totalNCRaised == "") {
      message.warning("Total Nc Raised Required");
      setSubmitLoading(false);
      return;
    }
    if (minorNC == "null" || minorNC == "") {
      message.warning("Minor NC Required");
      setSubmitLoading(false);
      return;
    }
    if (majorNC == "null" || majorNC == "") {
      message.warning("Major NC Required");
      setSubmitLoading(false);
      return;
    }
    form
      .validateFields()
      .then((values) => {
        // Construct the payload data
        const filteredDataSource = dataSource.map(
          ({
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
            reportId,
            ...rest
          }) => {
            return { ...rest };
          }
        );

        const payloadData = {
          unit: "Unit H",
          formatNo: "PH-QAD01/F-012",
          formatName: "INTERNAL AUDIT REPORT",
          sopNumber: "PH-QAD01-D-17",
          revisionNo: "02",
          auditYear: year,
          auditMonth: month,
          auditeeName: selectedAuditee || userName,
          auditorName: selectedAuditor,
          iarNo: iarNo || "NA",
          reportDate: reportDate,
          department: department,
          standard: basedOnStandard || "NA",
          auditRemarks: remarks || "NA",
          totalNoOfNc: totalNCRaised || 0,
          noOfMinorNc: minorNC || 0,
          noOfMajorNc: majorNC || 0,
          clauseInfoList: rows.map((row) => ({
            clauseNo: row.ClauseNo || "NA",
            observationEvidence: row.Observation || "NA",
            finding: row.Finding || "NA",
          })),

          reportId: reportId,
        };

        // Get the Bearer token from localStorage (or however you are storing it)
        const token = localStorage.getItem("token");

        // Make the API call
        axios
          .post(
            `${API.prodUrl}/Precot/api/QA/Service/internalAuditReport/submitAuditReport`,
            payloadData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            navigate(
              "/Precot/QualityAssurance/F-012/internal_audit_report_summary"
            );
            message.success("Audit Report submitted successfully!");
          })
          .catch((error) => {
            console.error("API Error:", error);
            message.error("Failed to submit the audit Report.");
          });
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
        message.error("Please fill all required fields.");
      });
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const payloadData = {
          unit: "Unit H",
          formatNo: "PH-QAD01/F-012",
          formatName: "INTERNAL AUDIT REPORT",
          sopNumber: "PH-QAD01-D-17",
          revisionNo: "02",
          auditYear: year,
          auditMonth: month,
          auditeeName: selectedAuditee || userName,
          auditorName: selectedAuditor,
          iarNo: iarNo,
          reportDate: reportDate,
          department: department,
          standard: basedOnStandard,
          auditRemarks: remarks,
          totalNoOfNc: totalNCRaised,
          noOfMinorNc: minorNC,
          noOfMajorNc: majorNC,
          clauseInfoList: rows.map((row) => ({
            clauseNo: row.ClauseNo,
            observationEvidence: row.Observation,
            finding: row.Finding,
          })),

          reportId: reportId,
        };

        // Get the Bearer token from localStorage (or however you are storing it)
        const token = localStorage.getItem("token");

        // Make the API call
        axios
          .post(
            `${API.prodUrl}/Precot/api/QA/Service/internalAuditReport/saveAuditReport`,
            payloadData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            navigate(
              "/Precot/QualityAssurance/F-012/internal_audit_report_summary"
            );
            message.success("Audit Report saved successfully!");
          })
          .catch((error) => {
            console.error("API Error:", error);
            message.error("Failed to save the audit Report.");
          });
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
        message.error("Please fill all required fields.");
      });
  };

  const handleLogout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      onOk() {
        localStorage.removeItem("token");
        navigate("/Precot");
      },
      onCancel() {},
    });
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_HOD") {
      if (
        newData &&
        newData.auditeeName?.toUpperCase() === userName.toUpperCase() &&
        newData.auditeeStatus === "AUDITEE_SUBMITTED" &&
        newData.auditorStatus !== "AUDITOR_REJECTED" &&
        newData.qaMrStatus !== "QA_MR_REJECTED"
      ) {
        return "none";
      } else if (
        (newData.auditorName?.toUpperCase() === userName.toUpperCase() &&
          newData?.auditorStatus === "AUDITOR_APPROVED") ||
        (newData.auditorName?.toUpperCase() === userName.toUpperCase() &&
          newData?.auditorStatus === "AUDITOR_REJECTED") ||
        (newData.auditorName?.toUpperCase() === userName.toUpperCase() &&
          newData?.qaMrStatus === "QA_MR_REJECTED")
      ) {
        return "none";
      } else if (
        newData.auditorName?.toUpperCase() === userName.toUpperCase() &&
        newData?.auditorStatus == "AUDITOR_REJECTED" &&
        newData?.qaMrStatus == "QA_MR_REJECTED"
      ) {
        return "none";
      } else if (
        (newData.auditorName === userName &&
          newData?.auditorStatus == "AUDITOR_APPROVED" &&
          newData?.qaMrStatus == "WAITING_FOR_APPROVAL") ||
        newData?.qaMrStatus == "QA_MR_APPROVED"
      ) {
        return "none";
      }
      return "block";
    } else if (roleauth == "QA_MANAGER" || roleauth == "ROLE_MR") {
      if (
        newData?.qaMrStatus == "QA_MR_APPROVED" ||
        newData?.qaMrStatus == "QA_MR_REJECTED"
      ) {
        return "none";
      } else if (
        newData?.qaMrStatus == "" &&
        newData?.auditorStatus === "AUDITOR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        newData?.qaMrStatus == "QA_MR__APPROVED" ||
        newData?.qaMrStatus == "QA_MR__REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButtonsSave = () => {
    if (roleauth === "ROLE_HOD") {
      if (
        newData &&
        newData.auditeeName?.toUpperCase() === userName.toUpperCase() &&
        newData.auditeeStatus === "AUDITEE_SUBMITTED"
      ) {
        return "none";
      }
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
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditReport/approveOrReject`,
        {
          id: reportId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        navigate(
          "/Precot/QualityAssurance/F-012/internal_audit_report_summary"
        );
      })
      .catch((err) => {
        setLoading(false);
        //
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
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setSaveLoading(false);
      return;
    }

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditReport/approveOrReject`,
        {
          id: reportId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        navigate(
          "/Precot/QualityAssurance/F-012/internal_audit_report_summary"
        );
      })
      .catch((err) => {
        setLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/internalAuditSchedule/getAuditDepartments`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const departmentOptions = response.data.map((dept) => ({
          label: dept.auditDepartment, // Displayed text
          value: dept.auditDepartment, // Value of the option
        }));

        setDepartments(departmentOptions);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Report Details</b>
        </p>
      ),
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th colSpan="20" style={{ textAlign: "center", height: "30px" }}>
                Clause No.
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Observation / Evidence
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Finding
              </th>
            </tr>
            {rows.map((row, index) => (
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.ClauseNo}
                    disabled={disabled}
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      handleClauseNoChange(e.target.value, index)
                    }
                  />
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.Observation}
                    disabled={disabled}
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      handleObservationChange(e.target.value, index)
                    }
                  />
                </td>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    className="inp-new"
                    style={{ width: "85%", height: "35px" }}
                    value={row.Finding}
                    disabled={disabled}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => handleFindingChange(e.target.value, index)}
                  />
                </td>
                <td
                  colSpan="1"
                  style={{
                    height: "35px",
                    textAlign: "center",
                    cursor: "pointer",
                    size: "40px",
                    border: "none",
                    display: disabled ? "none" : "block",
                  }}
                  onClick={() => handleDeleteRow(index)}
                >
                  <DeleteOutlined
                    style={{ fontSize: "24px", color: "#ff4d4f" }}
                  />
                </td>
              </tr>
            ))}
            <button
              onClick={handleAddRow}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: disabled ? "none" : "block",
                border: "none",
                width: "100px",
                padding: "5px",
                marginTop: "10px",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <p>
          <b>comments</b>
        </p>
      ),
      children: (
        <div>
          <Form layout="horizontal">
            <Row gutter={16} style={{ width: "100%", marginBottom: "16px" }}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item
                  label="Total No. of NC Raised"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    type="number"
                    disabled={disabled}
                    value={totalNCRaised}
                    onChange={(e) => setTotalNCRaised(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="No. of Minor NC" style={{ marginBottom: 0 }}>
                  <Input
                    type="number"
                    disabled={disabled}
                    value={minorNC} // Bound to state
                    onChange={(e) => setMinorNC(e.target.value)} // Update state
                    onKeyDown={handleKeyDown}
                    style={{ width: "100%" }}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={16} lg={6}>
                <Form.Item label="No. of Major NC" style={{ marginBottom: 0 }}>
                  <Input
                    type="number"
                    disabled={disabled}
                    value={majorNC} // Bound to state
                    onChange={(e) => setMajorNC(e.target.value)} // Update state
                    onKeyDown={handleKeyDown}
                    style={{ width: "100%" }}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12} md={8} lg={24}>
                <Form.Item
                  label="Remark(s) / Comment(s)"
                  style={{ marginBottom: 0 }}
                >
                  <TextArea
                    rows={4}
                    value={remarks}
                    disabled={disabled}
                    onChange={(e) => setRemarks(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <p>
          <b> Reviews </b>
        </p>
      ),
      children: (
        <div
          style={{
            width: "100%",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tr>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                <b>Signature of Auditee</b>
              </td>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                <b>Signature of Auditor</b>
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <b>Signature of QA/MR</b>
              </td>
            </tr>
            <tr style={{ height: "35px" }}>
              <td
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {newData?.auditeeStatus === "AUDITEE_SUBMITTED" && (
                  <>
                    {newData && newData.auditeeSign}
                    <br />
                    {formattedAuditeeDate}
                    <br />
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Auditee"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                          border: "none",
                        }}
                      />
                    )}
                    {/* Signature & Date */}
                  </>
                )}
              </td>
              <td
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {(newData?.auditorStatus === "AUDITOR_REJECTED" ||
                  newData?.auditorStatus === "AUDITOR_APPROVED") && (
                  <>
                    {newData && newData.auditorSign}
                    <br></br>
                    {formattedAuditorDate}
                    <br />
                    {getImage2 && (
                      <img
                        className="signature"
                        src={getImage2}
                        alt="Auditor Sign"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                          border: "none",
                        }}
                      />
                    )}
                  </>
                )}
              </td>
              <td
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {(newData?.qaMrStatus === "QA_MR_REJECTED" ||
                  newData?.qaMrStatus === "QA_MR_APPROVED") && (
                  <>
                    {newData && newData.qaMrSign}
                    <br></br>
                    {formattedQAMRDate}
                    <br />
                    {getImage3 && (
                      <img
                        className="signature"
                        src={getImage3}
                        alt="QAMr"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                          border: "none",
                        }}
                      />
                    )}
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
        unit={unit}
        formName={formatName}
        formatNo={formatNo}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "QA_MANAGER" ||
          roleauth === "ROLE_MR" ||
          (roleauth === "ROLE_HOD" &&
            newData?.auditorName?.toUpperCase() === userName?.toUpperCase() &&
            newData?.auditeeStatus === "AUDITEE_SUBMITTED") ? (
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
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtonsSave(),
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
            onClick={handleLogout}
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
          <label style={{ marginRight: "8px" }}>Reason:</label>
          <TextArea
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4} // Adjust the number of rows as needed
            style={{ width: "100%" }} // Adjust the width as needed
          />
        </div>
      </Modal>

      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
          marginLeft: "2px",
        }}
      >
        <label style={{ textAlign: "center" }}>Year:</label>
        <Select
          onChange={(value) => setYear(value)}
          value={year}
          disabled
          options={yearOptions}
          placeholder="Choose Year"
        />
        <label style={{ textAlign: "center" }}>Month:</label>
        <Select
          style={{ width: "20%" }}
          placeholder="Select a month"
          value={month}
          disabled
          onChange={(value) => setMonth(value)}
        >
          {months.map((month) => (
            <Select.Option key={month.value} value={month.value}>
              {month.label}
            </Select.Option>
          ))}
        </Select>

        <label style={{ textAlign: "center" }}>Department:</label>
        <Select
          value={department}
          onChange={(value) => setDepartment(value)}
          style={{ width: "20%" }}
          options={departments}
          disabled
        ></Select>
        <label style={{ textAlign: "center" }}>IAR No:</label>
        <Input
          style={{ width: "20%" }}
          value={iarNo} // Value from state
          disabled={disabled}
          onKeyDown={handleKeyDown}
          onChange={(e) => setIarNo(e.target.value)} // Update state on change
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
          marginLeft: "2px",
        }}
      >
        <label style={{ textAlign: "center" }}>Name of Auditor(s):</label>
        <Select
          style={{ width: "30%" }}
          placeholder="Select auditor"
          value={selectedAuditor}
          onChange={(value) => setSelectedAuditor(value)}
          dropdownRender={(menu) => (
            <>
              {menu}
              <div style={{ display: "flex", padding: 8, minWidth: "250px" }}>
                <Input
                  style={{ flex: "auto", marginRight: 8, minWidth: "50px" }}
                  value={newauditor}
                  onChange={(e) => setNewauditor(e.target.value)}
                  placeholder="Add new auditor"
                  disabled={disabled}
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    handleAddAuditParticipant("auditor");
                    setNewauditor("");
                  }}
                  disabled={disabled}
                >
                  Add
                </Button>
              </div>
            </>
          )}
          disabled={disabled}
        >
          {auditors
            .filter(
              (auditor) =>
                auditor.participant.toLowerCase() !== userName.toLowerCase()
            )
            .map((auditor, index) => (
              <Select.Option
                key={auditor.participant}
                value={auditor.participant}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {auditor.participant}
                  {auditor.participant !== selectedAuditor && (
                    <Popconfirm
                      title={`Delete ${auditor.participant}?`}
                      onConfirm={(e) => {
                        e.stopPropagation(); // Prevent select option trigger
                        handleDeleteParticipant(auditor, index, "auditor");
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        size="small"
                        style={{ padding: 0, marginLeft: 8 }}
                        disabled={disabled}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Popconfirm>
                  )}
                </div>
              </Select.Option>
            ))}
        </Select>

        <label style={{ textAlign: "center" }}>Name of Auditee(s):</label>
        <Select
          value={selectedAuditee || userName}
          style={{ width: "30%", minWidth: "250px" }}
          placeholder="Select or Add auditee"
          disabled
          onChange={(value) => setSelectedAuditee(value)}
          dropdownRender={(menu) => (
            <>
              {menu}
              <div style={{ display: "flex", padding: 8, minWidth: "250px" }}>
                <Input
                  style={{ flex: "auto", marginRight: 8, minWidth: "50px" }}
                  value={newauditee}
                  onChange={(e) => setNewauditee(e.target.value)}
                  placeholder="Add new auditee"
                  disabled={disabled}
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    handleAddAuditParticipant("auditee");
                    setNewauditee("");
                  }}
                  disabled={disabled}
                >
                  Add
                </Button>
              </div>
            </>
          )}
        ></Select>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
          marginLeft: "2px",
        }}
      >
        <label style={{ textAlign: "center" }}>Date:</label>
        <Input
          value={reportDate}
          type="date"
          disabled={disabled}
          onChange={(e) => setReportDate(e.target.value)}
          style={{ width: "20%" }}
          max={formattedToday}
        />

        <label style={{ textAlign: "center" }}>Based On standard:</label>
        <Input
          value={basedOnStandard}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          onChange={(e) => setBasedOnStandard(e.target.value)}
          style={{ width: "20%" }}
        />
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items}
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

export default QA_f012_internal_audit_report;
