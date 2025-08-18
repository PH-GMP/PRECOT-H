/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import axios from "axios";
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
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import "../index.css";

const { TabPane } = Tabs;

const QualityAssurance_f43 = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { date } = location.state;
  const { TextArea } = Input;
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [statusLoader, setStatusLoader] = useState(false);
  const [deleteID, setDeleteId] = useState({
    attendenceId: [],
    discussionId: [],
  });

  const [hodLov, setHodLov] = useState([]);

  const [formData, setFormData] = useState({
    unit: "",
    formatNo: "",
    formatName: "",
    sopNumber: "",
    revisionNumber: "",
    venue: "",
    date: "",
    month: "",
    year: "",
    startTime: "",
    endTime: "",
    reason: "",
    details: [
      {
        nameOfParticipants: "",
        designation: "",
        sign: "",
        remarks: "",
      },
    ],
    detail: [
      {
        discussionPoints: "Status Of Previous Meeting Actions",
        description: "",
        actionPlan: "",
        responsibility: "",
        targetDate: "",
        status: "",
      },
      {
        discussionPoints: "Customer Complaint and CAPA Status",
        description: "",
        actionPlan: "",
        responsibility: "",
        targetDate: "",
        status: "",
      },
      {
        discussionPoints: "Customer/External Audit Feedback and Status",
        description: "",
        actionPlan: "",
        responsibility: "",
        targetDate: "",
        status: "",
      },
      {
        discussionPoints: "3rd Party Inspection and Status",
        description: "",
        actionPlan: "",
        responsibility: "",
        targetDate: "",
        status: "",
      },
      {
        discussionPoints: "Medline LOG Inspection",
        description: "",
        actionPlan: "",
        responsibility: "",
        targetDate: "",
        status: "",
      },
      {
        discussionPoints: "FRI Feedback",
        description: "",
        actionPlan: "",
        responsibility: "",
        targetDate: "",
        status: "",
      },
      {
        discussionPoints: "In-house Quality Concerns and Action Status",
        description: "",
        actionPlan: "",
        responsibility: "",
        targetDate: "",
        status: "",
      },
      {
        discussionPoints: "Supplier Quality Concerns",
        description: "",
        actionPlan: "",
        responsibility: "",
        targetDate: "",
        status: "",
      },
      {
        discussionPoints: "Calibration Plan V/S Actual",
        description: "",
        actionPlan: "",
        responsibility: "",
        targetDate: "",
        status: "",
      },
      {
        discussionPoints: "Pre Production Review status",
        description: "",
        actionPlan: "",
        responsibility: "",
        targetDate: "",
        status: "",
      },
      {
        discussionPoints: "New Product Sample status",
        description: "",
        actionPlan: "",
        responsibility: "",
        targetDate: "",
        status: "",
      },
      {
        discussionPoints: "CCP's Status",
        description: "",
        actionPlan: "",
        responsibility: "",
        targetDate: "",
        status: "",
      },
    ],
  });

  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    qa_inspector_sign: "",
    qa_mr_sign: "",
  });
  const statusLov = [
    { value: "Open", label: "Open" },
    { value: "Closed", label: "Closed" },
  ];
  const initialized = useRef(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QualityAssurance/F-043/Summary");
  };
  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
    setFormData((formData) => ({
      ...formData,
      reason: "",
    }));
  };
  const handleRejectReason = (e) => {
    const text = e.target.value;
    setFormData((formData) => ({
      ...formData,
      reason: text,
    }));
  };
  useEffect(() => {
    const signatureKeys = ["qa_inspector_sign", "qa_mr_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = formData[key];
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
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => { });
      }
    });
  }, [token, formData.qa_inspector_sign, formData.qa_mr_sign]);

  useEffect(() => {
    const fetchUserDataAndImages = () => {
      hodLov.forEach((user) => {
        const { value } = user;

        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${value}`,
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
            setESign((prevSign) => ({
              ...prevSign,
              [value]: url,
            }));
          })
          .catch((err) => { });
      });
    };
    fetchUserDataAndImages();
  }, [token, hodLov]);

  useEffect(() => {
    const hodLovApi = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Users/Service/getListOfUsers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const options = response.data
          .filter((user) => user.roles.some((role) => role.name === "ROLE_HOD"))
          .map((option) => ({
            value: option.username,
            label: option.username,
          }));
        setHodLov(options);
      } catch (error) {
        console.error("Error fetching Job Order Options:", error);
      }
    };

    hodLovApi();
  }, [token]);

  useEffect(() => {
    if (!initialized.current) {
      if (
        role == "QA_MANAGER" ||
        role == "ROLE_DESIGNEE" ||
        role == "ROLE_MR"
      ) {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QA/Service/api/findByParamQualityReviewMeetings?date=${date}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length == 0) {
            if (
              role == "QA_MANAGER" ||
              role == "ROLE_DESIGNEE" ||
              role == "ROLE_MR"
            ) {
              message.warning("QA Inspector yet to submit");
              setTimeout(() => {
                navigate("/Precot/QualityAssurance/F-043/Summary");
              }, 1000);
              return;
            }
          }
          if (response.data.length > 0) {
            const data = response.data[0];
            if (
              (role == "QA_MANAGER" ||
                role == "ROLE_DESIGNEE" ||
                role == "ROLE_MR") &&
              data.qa_inspector_status != "QA_INSPECTOR_APPROVED"
            ) {
              message.warning("QA Inspector yet to Submit");
              setTimeout(() => {
                navigate("/Precot/QualityAssurance/F-043/Summary");
              }, 1000);
            }
            statusFunction(data);
            setFormData(response.data[0]);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  }, []);

  const statusFunction = (responseData) => {
    if (
      role == "ROLE_QA" &&
      responseData.qa_inspector_status == "QA_INSPECTOR_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_QA" &&
      responseData.qa_inspector_status == "QA_INSPECTOR_APPROVED" &&
      (responseData.qa_mr_status == "WAITING_FOR_APPROVAL" ||
        responseData.qa_mr_status == "QA_MR_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      (role == "QA_MANAGER" || role == "ROLE_DESIGNEE" || role == "ROLE_MR") &&
      responseData.qa_mr_status == "QA_MR_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "QA_MANAGER" || role == "ROLE_DESIGNEE" || role == "ROLE_MR") &&
      responseData.qa_mr_status == "QA_MR_REJECTED"
    ) {
      message.warning("QA Inspector Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityAssurance/F-043/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const handleSave = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_QA") {
      if (deleteID.attendenceId.length > 0) {
        try {
          for (let i = 0; i < deleteID.attendenceId.length; i++) {
            handleDelete(deleteID.attendenceId[i], "attendence");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      if (deleteID.discussionId.length > 0) {
        try {
          for (let i = 0; i < deleteID.discussionId.length; i++) {
            handleDelete(deleteID.discussionId[i], "discussion");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/api/saveQualityReviewMeetings`;
      payload = {
        meetingId: formData.meetingId,
        unit: "UNIT H",
        formatNo: "PH-QAD01-F-043",
        formatName: "QUALITY REVIEW MEETING",
        sopNumber: "PH-QAD01-D-41",
        revisionNumber: "01",
        venue: formData.venue,
        date: date,
        month: getMonthAndYear(date).month,
        year: getMonthAndYear(date).year,
        startTime: formData.startTime,
        endTime: formData.endTime,
        reason: "",
        details: formData.details.map((row, index) => ({
          ...row,
          attendanceId: row.attendanceId,
          meetingId: formData.meetingId,
          remarks: row.remarks || "Nil",
        })),

        detail: formData.detail.map((row, index) => ({
          ...row,
          discussionId: row.discussionId,
          meetingId: formData.meetingId,
          discussionPoints: row.discussionPoints || "NA",
          description: row.description || "NA",
          actionPlan: row.actionPlan || "NA",
          responsibility: row.responsibility || "NA",
          targetDate: row.targetDate || "NA",
          status: row.status || "NA",
        })),
      };
    } else if (
      role == "QA_MANAGER" ||
      role == "ROLE_DESIGNEE" ||
      role == "ROLE_MR"
    ) {
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectQualityReviewMeetings`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.meetingId,
        formatNo: "PH-QAD01-F-043",
        status: "Approve",
      };
    }

    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_QA" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityAssurance/F-043/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };
  const handleSubmit = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_QA") {
      if ((formData.venue == "") | (formData.venue == null)) {
        message.warning("Please Enter The Venue");
        return;
      }
      if (formData.startTime == "" || formData.startTime == "") {
        message.warning("Please Select The Start Time");
        return;
      }
      if (formData.endTime == "" || formData.endTime == null) {
        message.warning("Please Select The End Time");
        return;
      }
      for (let index = 0; index < formData.details.length; index++) {
        const row = formData.details[index];
        if (row.nameOfParticipants == "" || row.designation == "") {
          message.warning(
            `Please Enter The All Details in Attendence Sheet row ${index + 1}`
          );
          return;
        }
      }

      if (deleteID.attendenceId.length > 0) {
        try {
          for (let i = 0; i < deleteID.attendenceId.length; i++) {
            handleDelete(deleteID.attendenceId[i], "attendence");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      if (deleteID.discussionId.length > 0) {
        try {
          for (let i = 0; i < deleteID.discussionId.length; i++) {
            handleDelete(deleteID.discussionId[i], "discussion");
          }
        } catch (error) {
          message.warning("Issues Occured While Delete");
          return;
        }
      }
      succesMsg = "Data Submitted Sucessfully";
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/api/SubmitQualityReviewMeetings`;
      payload = {
        meetingId: formData.meetingId,
        unit: "UNIT H",
        formatNo: "PH-QAD01-F-043",
        formatName: "QUALITY REVIEW MEETING",
        sopNumber: "PH-QAD01-D-41",
        revisionNumber: "01",
        venue: formData.venue,
        date: date,
        month: getMonthAndYear(date).month,
        year: getMonthAndYear(date).year,
        startTime: formData.startTime,
        endTime: formData.endTime,
        reason: "",
        details: formData.details.map((row, index) => ({
          ...row,
          attendanceId: row.attendanceId,
          meetingId: formData.meetingId,
          remarks: row.remarks || "Nil",
        })),

        detail: formData.detail.map((row, index) => ({
          ...row,
          discussionId: row.discussionId,
          meetingId: formData.meetingId,
          discussionPoints: row.discussionPoints || "NA",
          description: row.description || "NA",
          actionPlan: row.actionPlan || "NA",
          responsibility: row.responsibility || "NA",
          targetDate: row.targetDate || "NA",
          status: row.status || "NA",
        })),
      };
    } else if (
      role == "QA_MANAGER" ||
      role == "ROLE_DESIGNEE" ||
      role == "ROLE_MR"
    ) {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter the Reason");
        return;
      }
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectQualityReviewMeetings`;
      succesMsg = "Rejected Successfully";
      payload = {
        id: formData.meetingId,
        formatNo: "PH-QAD01-F-043",
        status: "Reject",
        remarks: formData.reason,
      };
    }

    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_QA" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityAssurance/F-043/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleInput = (value, key) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    if (formData.startTime > formData.endTime && formData.endTime !== "") {
      message.warning("End Time Should Come After Start Time");
      setFormData((prevState) => ({
        ...prevState,
        endTime: "",
      }));
    }
  };

  const handleArrayInput = (value, fieldName, index, type) => {
    if (type == "attendence") {
      const updatedIdentity = formData.details.map((row, idx) => {
        if (idx === index) {
          return { ...row, [fieldName]: value };
        }
        return row;
      });

      setFormData({
        ...formData,
        details: updatedIdentity,
      });
    } else if (type == "discussion") {
      const updatedIdentity = formData.detail.map((row, idx) => {
        if (idx === index) {
          return { ...row, [fieldName]: value };
        }
        return row;
      });

      setFormData({
        ...formData,
        detail: updatedIdentity,
      });
    }
  };
  const handleAddRow = (type) => {
    if (type == "attendence") {
      setFormData((prevState) => ({
        ...prevState,
        details: [
          ...prevState.details,
          {
            nameOfParticipants: "",
            designation: "",
            sign: "",
            remarks: "",
          },
        ],
      }));
    } else if (type == "discussion") {
      setFormData((prevState) => ({
        ...prevState,
        detail: [
          ...prevState.detail,
          {
            discussionPoints: "",
            description: "",
            actionPlan: "",
            responsibility: "",
            targetDate: "",
            status: "",
          },
        ],
      }));
    }
  };
  const handleDeleteRow = async (index, rowId, type) => {
    if (type == "attendence") {
      if (formData.details.length == 1) {
        return;
      }
      const confirm = window.confirm("Are You Sure To Delete This Row?");
      if (confirm) {
        if (rowId && formData.details.length !== 1) {
          setDeleteId((prevState) => ({
            ...prevState,
            attendenceId: [...prevState.attendenceId, rowId],
          }));
          setFormData((prevState) => ({
            ...prevState,
            details: prevState.details.filter((_, i) => i !== index),
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            details: prevState.details.filter((_, i) => i !== index),
          }));
        }
      }
    }
    if (type == "discussion") {
      if (formData.detail.length == 1) {
        return;
      }
      const confirm = window.confirm("Are You Sure To Delete This Row?");
      if (confirm) {
        if (rowId && formData.detail.length !== 1) {
          setDeleteId((prevState) => ({
            ...prevState,
            discussionId: [...prevState.discussionId, rowId],
          }));
          setFormData((prevState) => ({
            ...prevState,
            detail: prevState.detail.filter((_, i) => i !== index),
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            detail: prevState.detail.filter((_, i) => i !== index),
          }));
        }
      }
    }
  };

  const handleDelete = async (rowID, type) => {
    let apiurl;
    if (type == "attendence") {
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/api/deleteQualityReviewMeetingAttendanceSheet?id=${rowID}`;
    } else if (type == "discussion") {
      apiurl = `${API.prodUrl}/Precot/api/QA/Service/api/deleteQualityReviewMeetingDiscussion?id=${rowID}`;
    }

    try {
      const response = await axios.delete(apiurl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) { }
  };
  useEffect(() => {
    if (formData.startTime > formData.endTime && formData.endTime !== "") {
      message.warning("End Time Should Come After Start Time");
      setFormData((prevState) => ({
        ...prevState,
        endTime: "",
      }));
    }
  }, [formData.startTime, formData.endTime]);

  const handleSelectText = (e) => {
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
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
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const getMonthAndYear = (dateString) => {
    const formatDate = dateString.split("-");
    return { month: formatDate[1], year: formatDate[0] };
  };
  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  return (
    <>
      <BleachingHeader
        formName={"QUALITY REVIEW MEETING"}
        formatNo={"PH-QAD01-F-043"}
        unit={"UNIT H"}
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
              display: status.saveStatus ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_QA" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={handleSave}
            loading={statusLoader}
          >
            {role == "ROLE_QA" ? "Save" : "Approve"}
          </Button>,

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: status.submitStatus ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_QA" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={role == "ROLE_QA" ? handleSubmit : rejectFlow}
            loading={statusLoader}
          >
            {role == "ROLE_QA" ? " Submit" : "   Reject"}
          </Button>,
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
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
      <Modal
        title="Reason For Reject"
        open={rejectModal}
        onCancel={handleCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handleSubmit}
            loading={statusLoader}
          >
            Reject
          </Button>,
        ]}
      >
        <label>Reason : </label>
        <br></br>
        <br></br>
        <TextArea
          type="textArea"
          style={{ height: "100px" }}
          onChange={handleRejectReason}
        ></TextArea>
      </Modal>

      <div style={{ margin: "10px" }}>
        <Input
          value={formatDate(date)}
          addonBefore="Date :"
          style={{ textAlign: "center", width: "200px" }}
          readOnly
        ></Input>
        <Input
          type="text"
          addonBefore="Venue :"
          value={formData.venue}
          onChange={(e) => {
            handleInput(e.target.value, "venue");
          }}
          onKeyDown={(e) => {
            handleSelectText(e);
          }}
          style={{ textAlign: "center", width: "200px", marginLeft: "5px" }}
          readOnly={status.fieldStatus}
        ></Input>
        <Input
          type="time"
          addonBefore="Start Time "
          value={formData.startTime}
          onChange={(e) => {
            handleInput(e.target.value, "startTime");
          }}
          style={{ textAlign: "center", width: "200px", marginLeft: "5px" }}
          readOnly={status.fieldStatus}
        ></Input>
        <Input
          type="time"
          addonBefore="End Time "
          value={formData.endTime}
          min={formData.endTime}
          onChange={(e) => {
            handleInput(e.target.value, "endTime");
          }}
          style={{ textAlign: "center", width: "200px", marginLeft: "15px" }}
          readOnly={formData.start_time == "" || status.fieldStatus}
        ></Input>
      </div>
      <Tabs>
        <TabPane tab="Attendance Sheet" key="1">
          <div style={{ height: "50vh" }}>
            <table style={{ tableLayout: "fixed" }}>
              <tr>
                <td style={{ textAlign: "center", padding: "20px" }}>S. No.</td>
                <td style={{ textAlign: "center", padding: "20px" }}>
                  Name of Participants
                </td>
                <td style={{ textAlign: "center", padding: "20px" }}>
                  Designation
                </td>
                <td style={{ textAlign: "center", padding: "20px" }}>Sign</td>
                <td style={{ textAlign: "center", padding: "20px" }}>Remark</td>
                <td style={{ textAlign: "center", padding: "20px" }}>
                  Actions
                </td>
              </tr>
              {formData.details.map((row, index) => (
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {" "}
                    {index + 1}
                  </td>
                  <td>
                    <Select
                      value={row.nameOfParticipants}
                      options={hodLov}
                      onChange={(e) => {
                        handleArrayInput(
                          e,
                          "nameOfParticipants",
                          index,
                          "attendence"
                        );
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                      showSearch
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Input
                      type="text"
                      value={row.designation}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "designation",
                          index,
                          "attendence"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    {eSign[row.nameOfParticipants] ? (
                      <img
                        src={eSign[row.nameOfParticipants]}
                        alt="Operator eSign"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}{" "}
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.remarks}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "remarks",
                          index,
                          "attendence"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Button
                      style={{
                        textAlign: "center",
                        backgroundColor: "red",
                        color: "white",
                        gap: "0px",
                      }}
                      onClick={() => {
                        handleDeleteRow(index, row.attendanceId, "attendence");
                      }}
                      disabled={status.fieldStatus || statusLoader}

                    >
                      {" "}
                      <DeleteOutlined />
                    </Button>
                  </td>
                </tr>
              ))}
              <Button
                onClick={() => {
                  handleAddRow("attendence");
                }}
                disabled={status.fieldStatus || statusLoader}
                style={{ width: "100px", marginTop: "10px" }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </Button>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Discussion Points" key="2">
          <div style={{ height: "50vh" }}>
            <table style={{ tableLayout: "fixed" }}>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px", width: "5%" }}
                >
                  S. No.
                </td>
                <td
                  style={{ textAlign: "center", padding: "20px", width: "15%" }}
                >
                  Discussion Points
                </td>
                <td style={{ textAlign: "center", padding: "20px" }}>
                  Description
                </td>
                <td style={{ textAlign: "center", padding: "20px" }}>
                  Action Plan
                </td>
                <td style={{ textAlign: "center", padding: "20px" }}>
                  Responsibility
                </td>
                <td style={{ textAlign: "center", padding: "20px" }}>
                  Target Date
                </td>
                <td style={{ textAlign: "center", padding: "20px" }}>Status</td>
                <td style={{ textAlign: "center", padding: "20px" }}>
                  Actions
                </td>
              </tr>
              {formData.detail.map((row, index) => (
                <tr>
                  <td
                    style={{ textAlign: "center", padding: "5px", width: "5%" }}
                  >
                    {" "}
                    {index + 1}
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.discussionPoints}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "discussionPoints",
                          index,
                          "discussion"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.description}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "description",
                          index,
                          "discussion"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={row.actionPlan}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "actionPlan",
                          index,
                          "discussion"
                        );
                      }}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      mode="multiple"
                      value={row.responsibility ? row.responsibility === "NA" ? [] : row.responsibility.split(",") : []}
                      options={hodLov}
                      onChange={(selectedValues) => {
                        // Convert array -> comma separated string
                        handleArrayInput(
                          selectedValues.join(", "),
                          "responsibility",
                          index,
                          "discussion"
                        );
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                      showSearch
                    />
                  </td>
                  <td>
                    <Input
                      type="date"
                      value={row.targetDate}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "targetDate",
                          index,
                          "discussion"
                        );
                      }}
                      min={date}
                      style={{ textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={row.status}
                      options={statusLov}
                      onChange={(e) => {
                        handleArrayInput(e, "status", index, "discussion");
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Button
                      style={{
                        textAlign: "center",
                        backgroundColor: "red",
                        color: "white",
                        gap: "0px",
                      }}
                      onClick={() => {
                        handleDeleteRow(index, row.discussionId, "discussion");
                      }}
                      disabled={status.fieldStatus || statusLoader}

                    >
                      {" "}
                      <DeleteOutlined />
                    </Button>
                  </td>
                </tr>
              ))}
              <Button
                onClick={() => {
                  handleAddRow("discussion");
                }}
                disabled={status.fieldStatus || statusLoader}
                style={{ width: "100px", marginTop: "10px" }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </Button>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="3">
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="2" style={{ textAlign: "center", width: "35%" }}>
                  Prepared by:
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  Approved by:
                </td>
              </tr>
              <tr>
                <td colspan="2" style={{ height: "60%", textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        {formData.qa_inspector_sign}
                        <br />
                        {formatDateAndTime(formData.qa_inspector_submit_on)}
                      </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      {eSign.qa_inspector_sign ? (
                        <img
                          src={eSign.qa_inspector_sign}
                          alt="Operator eSign"
                          style={{
                            width: "150px",
                            height: "70px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </td>
                <td colspan="1" style={{ height: "60%", textAlign: "center" }}>
                  {formData.qa_mr_status !== "WAITING_FOR_APPROVAL" &&
                    formData.qa_mr_status !== "" && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            {formData.qa_mr_sign}
                            <br />
                            {formatDateAndTime(formData.qa_mr_submit_on)}
                          </div>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          {eSign.qa_mr_sign ? (
                            <img
                              src={eSign.qa_mr_sign}
                              alt="Supervisor eSign"
                              style={{
                                width: "150px",
                                height: "70px",
                                objectFit: "contain",
                                mixBlendMode: "multiply",
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                    )}
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default QualityAssurance_f43;
