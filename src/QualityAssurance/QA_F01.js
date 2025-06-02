/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
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

const QA_f01 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [fetchedData, setFetchedData] = useState("");
  const [incidenceId, setIncidenceId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const [department, setDepartment] = useState("");
  const [shift, setShift] = useState("");
  const [time, setTime] = useState("");
  const [incidentNO, setinceidentNO] = useState("");
  const [shiftLov, setShiftLov] = useState([]);
  const monthIndex = dateObject.getMonth();
  const monthNames = [
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
  const monthName = monthNames[monthIndex];
  const [deailsOfIncident, setDetailsOfIncident] = useState("");
  const [informationCommunicatedTo, setInformationCommunicatedTo] =
    useState("");
  const [effectOfIncident, setEffectOfIncident] = useState("");
  const [severity, setSeverity] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [remark, setRemark] = useState("");
  const [statusOfActionTaken, setStatusOfActionTaken] = useState("");
  const SeverityLov = [
    { id: 1, value: " High" },
    { id: 2, value: "Medium" },
    { id: 3, value: "Low" },
  ];
  const StatusLov = [
    { id: 1, value: " Open" },
    { id: 2, value: "Closed" },
    { id: 3, value: "In-process" },
  ];
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDatewithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  // Department Lov
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDepartments(response.data);
        const departmentId = localStorage.getItem("departmentId");
        if (departmentId) {
          const foundDepartment = response.data.find(
            (department) => department.id === parseInt(departmentId)
          );
          if (foundDepartment) {
            if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
              setDepartment(foundDepartment.department);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);
  // auto generate number
  const IIrgeneration = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
          API.prodUrl
        }/Precot/api/qa/number/generation?formNumber=${"PH-QAD01/F-001"}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setinceidentNO(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Shift LOV
  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setShiftLov(data);
        } else {
          console.error("API response is not an array", data);
          setShiftLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setShiftLov([]);
      }
    };
    fetchShiftOptions();
  }, [token]);

  // signature Image
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedData?.hod_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {});
    }
  }, [fetchedData, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedData?.qa_manager_sign;
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
  }, [fetchedData, API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedData?.plant_head_sign;
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
  }, [fetchedData, API.prodUrl, token]);

  const roleauth = localStorage.getItem("role");

  const disabled =
    ((roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") &&
      fetchedData?.hod_status === "HOD_SUBMITTED" &&
      fetchedData?.qa_manager_status !== "QA_MR_REJECTED" &&
      fetchedData?.plant_head_status !== "PLANT_HEAD_REJECTED") ||
    roleauth === "ROLE_MR" ||
    roleauth === "QA_MANAGER" ||
    roleauth === "ROLE_PLANT_HEAD";

  const disableActionTakenStatus =
    roleauth === "ROLE_HOD" ||
    roleauth === "ROLE_DESIGNEE" ||
    roleauth === "ROLE_PLANT_HEAD" ||
    ((roleauth === "ROLE_MR" || roleauth === "QA_MANAGER") &&
      fetchedData?.qa_manager_status === "QA_MR_APPROVED");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (
        fetchedData &&
        fetchedData.hod_status === "HOD_SUBMITTED" &&
        fetchedData.qa_manager_status !== "QA_MR_REJECTED" &&
        fetchedData.plant_head_status !== "PLANT_HEAD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else if (role == "ROLE_MR" || role == "QA_MANAGER") {
      if (
        fetchedData?.qa_manager_status == "QA_MR_APPROVED" &&
        fetchedData?.plant_head_status == "PLANT_HEAD_REJECTED"
      ) {
        return "block";
      } else if (
        (fetchedData?.qa_manager_status == "QA_MR_APPROVED" &&
          fetchedData?.plant_head_status == "WAITING_FOR_APPROVAL") ||
        fetchedData?.plant_head_status == "PLANT_HEAD_APPROVED"
      ) {
        return "none";
      }
    } else if (role == "ROLE_PLANTHEAD") {
      if (
        fetchedData?.plant_head_status == "PLANT_HEAD_APPROVED" ||
        fetchedData?.plant_head_status == "PLANT_HEAD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        fetchedData?.plant_head_status == "PLANT_HEAD_APPROVED" ||
        fetchedData?.plant_head_status == "PLANT_HEAD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (fetchedData?.hod_status == "HOD_SUBMITTED") {
        return "none";
      }
    }
  };
  const handleRejectModal = () => {
    setShowModal(true);
  };

  const handleSeverityChange = (value) => {
    setSeverity(value);
  };
  const handleStatusOfActionTakenChange = (value) => {
    setStatusOfActionTaken(value);
  };
  const handleShift = (value) => {
    setShift(value);
  };

  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/qa/ManagementOfIncidence/approveOrReject`,
        {
          id: incidenceId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-01/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleApprove = async () => {
    setSaveLoading(true);
    if (!statusOfActionTaken) {
      message.warning("Status Of Action Taken Required");
      setSaveLoading(false);
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/qa/ManagementOfIncidence/approveOrReject`,
        {
          id: incidenceId,
          status: "Approve",
          status_of_action_taken: statusOfActionTaken,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-01/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSave = async () => {
    try {
      await SaveManagementOfIncidents();
    } catch (error) {
      console.error("Error saving Management Of Incidence:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitManagementOfIncidence();
    } catch (error) {
      console.error("Error submitting Management Of Incidence..", error);
    }
  };

  const SaveManagementOfIncidents = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        unit: "Unit H",
        formatNo: "PH-QAD01/F-001",
        formatName: "MANAGEMENT OF INCIDENCE",
        sopNumber: "PH-QAD01-D-05",
        revisionNo: 2,
        incidence_id: incidenceId,
        year: year,
        month: monthName,
        date: date,
        shift: shift,
        time: time,
        department: department,
        incident_no: incidentNO,
        details_of_incidence: deailsOfIncident || "NA",
        information_communicated_to: informationCommunicatedTo || "NA",
        impact_of_incidence: effectOfIncident || "NA",
        severity: severity || "NA",
        root_cause: rootCause || "NA",
        action_taken: actionTaken || "NA",
        remarks: remark || "NA",
        status_of_action_taken: statusOfActionTaken,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/qa/saveManagementOfIncidence`,
        payload,
        { headers }
      );
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/QA/F-01/Summary");
      }, 1500);
      message.success("Record Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save  Record !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitManagementOfIncidence = async () => {
    setSubmitLoading(true);
    if (!incidentNO) {
      message.warning("Incident Number Required");
      setSubmitLoading(false);
      return; 
    }
    if (!time) {
      message.warning("Time Required");
      setSubmitLoading(false);
      return;
    }
    if (!department) {
      message.warning("Department Required");
      setSubmitLoading(false);
      return;
    }
    if (!shift) {
      message.warning("Shift Required");
      setSubmitLoading(false);
      return;
    }
    if (!severity) {
      message.warning("Severity Required");
      setSubmitLoading(false);
      return;
    }
    try {
      const payload = {
        unit: "Unit H",
        formatNo: "PH-QAD01/F-001",
        formatName: "MANAGEMENT OF INCIDENCE",
        sopNumber: "PH-QAD01-D-05",
        revisionNo: 2,
        incidence_id: incidenceId,
        year: year,
        month: monthName,
        date: date,
        shift: shift,
        time: time,
        department: department,
        incident_no: incidentNO,
        details_of_incidence: deailsOfIncident || "NA",
        information_communicated_to: informationCommunicatedTo || "NA",
        impact_of_incidence: effectOfIncident || "NA",
        severity: severity || "NA",
        root_cause: rootCause || "NA",
        action_taken: actionTaken || "NA",
        remarks: remark || "NA",
        status_of_action_taken: statusOfActionTaken,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/qa/submitManagementOfIncidence`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QA/F-01/Summary");
      }, 1500);
      message.success(response.data.message);
    } catch (error) {
      message.error(error.response.data.message);
      throw new Error("Failed to submit Record!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-01/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
  }, []);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/getdetailsbyParamIncidence?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setFetchedData(response.data.body);
      if (
        ((roleauth == "ROLE_MR" || roleauth == "QA_MANAGER") &&
          response.data.body.hod_status !== "HOD_SUBMITTED") ||
        ((roleauth == "ROLE_MR" || roleauth == "QA_MANAGER") &&
          response.data.body.qa_manager_status == "QA_MR_REJECTED") ||
        ((roleauth == "ROLE_MR" || roleauth == "QA_MANAGER") &&
          response.data.body.plant_head_status == "PLANT_HEAD_REJECTED")
      ) {
        message.error("HOD Yet Not Approved");
        setTimeout(() => {
          navigate("/Precot/QA/F-01/Summary");
        }, 1500);
      }
      if (
        (roleauth == "ROLE_PLANT_HEAD" &&
          response.data.body.qa_manager_status !== "QA_MR_APPROVED") ||
        (roleauth == "ROLE_PLANT_HEAD" &&
          response.data.body.plant_head_status == "PLANT_HEAD_REJECTED")
      ) {
        message.error("QA Manager Yet Not Approved");
        setTimeout(() => {
          navigate("/Precot/QA/F-01/Summary");
        }, 1500);
      }
      if (response.data.body.message === "No data") {
        await IIrgeneration();
      } else {
        setinceidentNO(response.data.body.incident_no);
      }
      if (response.data && response.data.body.message !== "No data") {
        const data = response.data;
        setIncidenceId(data.body.incidence_id);
        setShift(data.body.shift);
        setTime(data.body.time);
        setDepartment(data.body.department);
        setDetailsOfIncident(data.body.details_of_incidence);
        setInformationCommunicatedTo(data.body.information_communicated_to);
        setEffectOfIncident(data.body.impact_of_incidence);
        setSeverity(data.body.severity);
        setRootCause(data.body.root_cause);
        setActionTaken(data.body.action_taken);
        setRemark(data.body.remarks);
        setStatusOfActionTaken(data.body.status_of_action_taken);
      } else {
      }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Management of Incidence</p>,
      children: (
        <div>
          <table style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}>
            <tr>
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                Details of Incident :
              </th>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "35px", border: "none" }}>
                <TextArea
                  value={deailsOfIncident}
                  disabled={disabled}
                  onChange={(e) => setDetailsOfIncident(e.target.value)}
                  rows={1}
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    marginBottom: "20px",
                  }}
                />
              </th>
            </tr>
            <tr>
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                Information Communicated to :{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "35px", border: "none" }}>
                <TextArea
                  value={informationCommunicatedTo}
                  disabled={disabled}
                  onChange={(e) => setInformationCommunicatedTo(e.target.value)}
                  rows={2}
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    marginBottom: "20px",
                  }}
                />
              </th>
            </tr>
            <tr>
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                Effect / Impact of Incident :{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "35px", border: "none" }}>
                <TextArea
                  value={effectOfIncident}
                  disabled={disabled}
                  onChange={(e) => setEffectOfIncident(e.target.value)}
                  rows={2}
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    marginBottom: "20px",
                  }}
                />
              </th>
            </tr>
            <tr>
              {" "}
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                <div style={{ display: "flex" }}>
                  Severity :{" "}
                  <Select
                    showSearch
                    value={severity}
                    disabled={disabled}
                    onChange={handleSeverityChange}
                    style={{
                      width: "80%",
                      marginLeft: "20px",
                      marginBottom: "20px",
                    }}
                    placeholder="Search Severity"
                    optionFilterProp="children"
                  >
                    <Select.Option value="" disabled selected>
                      Select Severity
                    </Select.Option>
                    {SeverityLov.map((option) => (
                      <Select.Option key={option.id} value={option.value}>
                        {option.value}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </th>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Management of Incidence/2</p>,
      children: (
        <div>
          <table
            style={{ width: "100%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              {" "}
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                Root Cause :{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "35px", border: "none" }}>
                <TextArea
                  value={rootCause}
                  disabled={disabled}
                  onChange={(e) => setRootCause(e.target.value)}
                  rows={1}
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    marginBottom: "30px",
                  }}
                />
              </th>
            </tr>
            <tr>
              {" "}
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                Action Taken :
              </th>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "35px", border: "none" }}>
                <TextArea
                  value={actionTaken}
                  disabled={disabled}
                  onChange={(e) => setActionTaken(e.target.value)}
                  rows={1}
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    marginBottom: "30px",
                  }}
                />
              </th>
            </tr>
            <tr>
              {" "}
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                Remark :{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="100" style={{ height: "35px", border: "none" }}>
                <TextArea
                  value={remark}
                  disabled={disabled}
                  onChange={(e) => setRemark(e.target.value)}
                  rows={2}
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    marginBottom: "30px",
                  }}
                />
              </th>
            </tr>
            <tr>
              {" "}
              <th style={{ border: "none", textAlign: "left" }} colSpan="100">
                <div style={{ display: "flex" }}>
                  Status of Action Taken :{" "}
                  <Select
                    showSearch
                    value={statusOfActionTaken}
                    disabled={disableActionTakenStatus}
                    onChange={handleStatusOfActionTakenChange}
                    style={{ width: "60%", marginLeft: "20px" }}
                    placeholder="Search Status"
                    optionFilterProp="children"
                  >
                    <Select.Option value="" disabled selected>
                      Select Status of Action Taken
                    </Select.Option>
                    {StatusLov.map((option) => (
                      <Select.Option key={option.id} value={option.value}>
                        {option.value}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </th>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                HOD/Designee Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center" }}>
                QA Manager/MR Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center" }}>
                Plant Head Sign & Date
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
                {fetchedData?.hod_status === "HOD_SUBMITTED" && (
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
                        <div>{fetchedData?.hod_sign}</div>
                        <div>
                          {formattedDatewithTime(fetchedData?.hod_submit_on)}
                        </div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Hod Sign"
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

              <td colSpan="50" style={{ textAlign: "center" }}>
                {(fetchedData?.qa_manager_status === "QA_MR_APPROVED" ||
                  fetchedData?.qa_manager_status === "QA_MR_REJECTED") && (
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
                        <div>{fetchedData?.qa_manager_sign}</div>
                        <div>
                          {formattedDatewithTime(
                            fetchedData?.qa_manager_approved_on
                          )}
                        </div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="QA MR Sign"
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

              <td colSpan="50" style={{ textAlign: "center" }}>
                {(fetchedData?.plant_head_status === "PLANT_HEAD_REJECTED" ||
                  fetchedData?.plant_head_status === "PLANT_HEAD_APPROVED") && (
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
                        <div>{fetchedData?.plant_head_sign}</div>
                        <div>
                          {formattedDatewithTime(
                            fetchedData?.plant_head_approved_on
                          )}
                        </div>
                      </div>
                      {getImage3 && (
                        <img
                          src={getImage3}
                          alt="QA MR Sign"
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
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="MANAGEMENT OF INCIDENCE"
        formatNo="PH-QAD01/F-001"
        sopNo="PH-QAD01-D-05"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "ROLE_MR" ||
          role === "ROLE_PLANT_HEAD" ||
          role === "QA_MANAGER" ? (
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

      {/* Unique Param Row*/}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          width: "100%",
          marginLeft: "20px",
          maxWidth: "100%",
          overflowX: "hidden",
        }}
      >
        <Input
          addonBefore="Date:"
          placeholder="Date"
          value={formattedDate(date)}
          style={{ width: "40%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          addonBefore="Month:"
          placeholder="Month"
          value={monthName}
          style={{ width: "40%", height: "35px" }}
        />
        <Input
          addonBefore="Year:"
          placeholder="Year"
          value={year}
          style={{ width: "40%", height: "35px" }}
        />

        <Input.Group compact>
          <div style={{ width: "9%" }}>
            <Input
              addonBefore="Shift:"
              style={{ width: "11%", height: "35px" }}
              disabled
            />
          </div>
          <Select
            value={shift}
            onChange={handleShift}
            style={{
              width: "30%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            disabled={disabled}
            placeholder="Select Shift"
          >
            <Select.Option value="" disabled selected>
              Select Shift
            </Select.Option>
            {shiftLov.map((option) => (
              <Select.Option key={option.id} value={option.vaue}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </Input.Group>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          width: "100%",
          marginLeft: "20px",
          maxWidth: "100%",
        }}
      >
        <Input
          addonBefore="Time:"
          type="time"
          value={time}
          disabled={disabled}
          onChange={(e) => setTime(e.target.value)}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
          placeholder="Select Time"
        />

        <Input
          addonBefore="Incident No.:"
          placeholder="Incident No."
          value={incidentNO}
          disabled={disabled}
          style={{ width: "20%", height: "35px" }}
        />

        <Input
          addonBefore="Department:"
          placeholder="Department"
          value={department}
          disabled={disabled}
          style={{ width: "20%", height: "35px" }}
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

export default QA_f01;
