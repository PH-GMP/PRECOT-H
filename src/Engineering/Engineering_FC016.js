/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  message,
  Modal,
  Row,
  Select,
  Tabs,
  Tooltip
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
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
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const Engineering_FC016 = () => {
  const { Option } = Select;
  const { state } = useLocation();
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  const [operatorDate, setOperatorDate] = useState("");
  const [operator, setOperator] = useState("");
  const [supervisior, setSupervisor] = useState("");
  const [supervisorDate, setSupervisorDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [supervisorStatus, setSupervisorStatus] = useState("");

  const [open, setOpen] = useState(false);

  const [id, setId] = useState("");
  const [department, setDepartment] = useState("");
  const [capacity, setCapacity] = useState("");
  const [tolerances, setTolerances] = useState("");
  const [machineIdNo, setMachineIdNo] = useState("");
  const [stdWtCalCertNo, setStdWtCalCertNo] = useState("");
  const deptId = localStorage.getItem("departmentId");

  const [availableCertNos, setAvailableCertNos] = useState([]); // List of available calibration cert numbers
  const [unit, setUnit] = useState("");
  const [rows, setRows] = useState([
    {
      date: state.date,
      weightInGKg: "",
      observedWeightInGKg: "",
      rangeInGKg: "",
      status: "",
      remarks: "",
    },
  ]);

  useEffect(() => {
    if (state.machineIdNo) {
      const certNos = machineIdMapping[state.machineIdNo] || [];
      setAvailableCertNos(certNos);
    } else {
      setAvailableCertNos([]);
    }
  }, [state.machineIdNo]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        date: state.date, // Assuming `state.date` is shared for all rows
        weightInGKg: "",
        observedWeightInGKg: "",
        rangeInGKg: "",
        status: "",
        remarks: "",
      },
    ]);
  };

  const handleWeightChange = (e, index) => {
    const value = e.target.value;
    const updatedRows = [...rows];
    updatedRows[index].weightInGKg = value;

    // Your range logic remains here, but update the row's range
    const numericWeight = parseFloat(value) || 0;
    if (value === "0" || value === "") {
      updatedRows[index].rangeInGKg = "";
    } else {
      const toleranceString = state.tolerance
        .replace("+/-", "")
        .replace(/[a-zA-Z]/g, "");
      const numericTolerance = parseFloat(toleranceString);
      if (!numericTolerance) {
        updatedRows[index].rangeInGKg = "";
      } else {
        const decimalPlaces = (toleranceString.split(".")[1] || "").length;
        const minRange = (numericWeight - numericTolerance).toFixed(
          decimalPlaces
        );
        const maxRange = (numericWeight + numericTolerance).toFixed(
          decimalPlaces
        );
        updatedRows[index].rangeInGKg = `${minRange} - ${maxRange}`;
      }
    }
    setRows(updatedRows);
  };
  const handleObservedWeightChange = (e, index) => {
    const value = e.target.value;
    const updatedRows = [...rows]; // Create a copy of the current rows
    updatedRows[index].observedWeightInGKg = value; // Update the specific row at the given index
    setRows(updatedRows); // Set the updated rows back to the state
  };

  const handleStatusChange = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].status = value;
    setRows(updatedRows);
  };

  const setRemarks = (value, index) => {
    const updatedRows = [...rows];
    updatedRows[index].remarks = value;
    setRows(updatedRows);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((row, i) => i !== index); // Remove the row at the specified index
    setRows(updatedRows); // Update the state with the filtered rows
  };

  const machineIdMapping = [
    "PTCCBLR/24/660-177,179,143",
    "PTCCBLR/24/660-143,142,141,140,139,138,137,136,135,123,119",
  ];
  const handleStdWtCalCertNoChange = (value) => {
    setStdWtCalCertNo(value);
  };
  const today = new Date().toISOString().split("T")[0];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/Engineering/FC-016/Summary");
  };
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
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const date1 = formatDateUser(state.date);
  const formattedDatesupervisor = formatDate(supervisorDate);
  const formatedDateOperator = formatDate(operatorDate);
  const formattedDateHod = formatDate(hodDate);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBmrOptions();
  }, []);
  const fetchBmrOptions = async () => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/Engineering/getweightScale?date=${state.date}&machineIdNo=${state.machineIdNo}&department=${state.department}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("edit data", data[0]);

      if (data && data.length > 0) {
        const result = data[0];
        setEditResponse(result);
        setId(result.id);
        setDepartment(result.department);
        setUnit(result.measurementunit);
        setCapacity(result.capacity);
        setTolerances(result.tolerances);
        setMachineIdNo(result.machineIdNo);
        setStdWtCalCertNo(result.stdWtCalCertNo);
        if (result.details && result.details.length > 0) {
          const updatedRows = result.details.map((detail) => ({
            id: detail.id,
            date: result.date,
            weightInGKg: detail.weightInGKg,
            observedWeightInGKg: detail.observedWeightInGKg,
            rangeInGKg: detail.rangeInGKg,
            status: detail.status,
            remarks: detail.remarks,
          }));
          setRows(updatedRows);
        }
        setSupervisor(result.engineeringSupervisorSign);
        setHod(result.hodSign);
        setSupervisorDate(result.engineeringSupervisorSubmitOn);
        setHodDate(result.hodSubmitOn);
        setSupervisorStatus(result.engineeringSupervisorStatus);
      }
      if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
        if (
          data[0]?.engineeringSupervisorStatus !== "SUPERVISOR_APPROVED" ||
          data[0]?.hodStatus === "HOD_REJECTED"
        ) {
          message.warning("Supervisor Not Yet Approved");
          setTimeout(() => {
            navigate("/Precot/Engineering/FC-016/Summary");
          }, 1500);
        }
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
        editResponse.hodStatus !== "HOD_REJECTED" &&
        editResponse.engineeringSupervisorStatus !== "SUPERVISOR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else if (roleauth == "ROLE_SUPERVISOR") {
      if (
        editResponse?.engineeringSupervisorStatus === "SUPERVISOR_APPROVED" &&
        editResponse?.hodStatus === "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (editResponse?.engineeringSupervisorStatus == "SUPERVISOR_APPROVED" &&
          editResponse?.hodStatus == "WAITING_FOR_APPROVAL") ||
        editResponse?.hodStatus == "HOD_APPROVED"
      ) {
        return "none";
      } else if (
        editResponse?.engineeringSupervisorStatus == "SUPERVISOR_REJECTED" &&
        editResponse?.hodStatus == "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        editResponse?.engineeringSupervisorStatus === "SUPERVISOR_REJECTED" ||
        editResponse?.hodStatus == "HOD_APPROVED" ||
        editResponse?.hodStatus == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        editResponse?.hodStatus == "HOD_APPROVED" ||
        editResponse?.hodStatus == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_OPERATOR") {
      if (editResponse?.operator_status == "OPERATOR_APPROVED") {
        return "none";
      } else if (
        editResponse?.operator_status == "OPERATOR_APPROVED" &&
        editResponse?.engineeringSupervisorStatus == "WAITING_FOR_APPROVAL" &&
        (editResponse?.hodStatus == "WAITING_FOR_APPROVAL" ||
          editResponse?.hodStatus == "HOD_APPROVED")
      ) {
        return "none";
      }
    }
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        editResponse?.engineeringSupervisorStatus == "SUPERVISOR_APPROVED" &&
        editResponse?.hodStatus == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        editResponse?.engineeringSupervisorStatus == "SUPERVISOR_APPROVED" &&
        (editResponse?.hodStatus == "WAITING_FOR_APPROVAL" ||
          editResponse?.hodStatus == "HOD_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        editResponse?.hodStatus == "HOD_APPROVED" ||
        editResponse?.hodStatus == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        editResponse?.hodStatus == "HOD_APPROVED" ||
        editResponse?.hodStatus == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canEdit = () => {
    if (roleauth === "ROLE_SUPERVISOR") {
      return !(
        editResponse &&
        editResponse.engineeringSupervisorStatus === "SUPERVISOR_APPROVED" &&
        editResponse.hodStatus !== "HOD_REJECTED"
      );
    } else if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      return !(
        editResponse &&
        (editResponse.hodStatus === "HOD_APPROVED" ||
          editResponse.hodStatus === "WAITING_FOR_APPROVAL" ||
          editResponse.hodStatus === "HOD_REJECTED")
      );
    } else {
      return false;
    }
  };

  const isEditable = canEdit();

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = supervisior;
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
          setGetImage(url);
        })
        .catch((err) => {});
    }
  }, [editResponse,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = hod;
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
  }, [editResponse,API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = operator;
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
  }, [editResponse,API.prodUrl, token]);

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Engineering/weightScale/approveOrReject`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/Engineering/FC-016/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);

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
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Engineering/weightScale/approveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);

        message.success(res.data.message);
        navigate("/Precot/Engineering/FC-016/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleSave = () => {
    setSaveLoading(true);

    const payload = {
      id: id || null,
      format: "WEIGHING SCALES CALIBRATION RECORD",
      format_no: "PH-ENG01/FC-016",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-04",
      date: state.date,
      department: state.department,
      capacity: state.capacity,
      tolerances: state.tolerance,
      machineIdNo: state.machineIdNo,
      stdWtCalCertNo: stdWtCalCertNo,
      measurementunit: unit,
      details: rows.map((row) => ({
        id: row.id,
        weightInGKg: row.weightInGKg,
        observedWeightInGKg: row.observedWeightInGKg,
        rangeInGKg: row.rangeInGKg,
        status: row.status,
        remarks: row.remarks,
      })),
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${API.prodUrl}/Precot/api/Engineering/weightScale/Save`, payload, {
        headers,
      })
      .then((res) => {
        message.success("Sucessfully Saved");
        navigate("/Precot/Engineering/FC-016/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const isFormValid = () => {
    return (
      stdWtCalCertNo &&
      unit &&
      rows.every(
        (row) => row.weightInGKg && row.observedWeightInGKg && row.status
      )
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      message.error("Please fill all required fields.");
      return;
    }
    setSubmitLoading(true);
    const payload = {
      id: id || null,
      format: "WEIGHING SCALES CALIBRATION RECORD",
      format_no: "PH-ENG01/FC-016",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-04",
      date: state.date,
      department: state.department,
      capacity: state.capacity,
      tolerances: state.tolerance,
      machineIdNo: state.machineIdNo,
      stdWtCalCertNo: stdWtCalCertNo,
      measurementunit: unit,
      details: rows.map((row) => ({
        id: row.id,
        weightInGKg: row.weightInGKg,
        observedWeightInGKg: row.observedWeightInGKg,
        rangeInGKg: row.rangeInGKg,
        status: row.status,
        remarks: row.remarks || "NA",
      })),
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${API.prodUrl}/Precot/api/Engineering/weightScale/Submit`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Sucessfully submitted");
        navigate("/Precot/Engineering/FC-016/Summary");
      })
      .catch((err) => {
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleUnitChange = (value) => {
    setUnit(value);
  };

  const items = [
    {
      key: "1",
      label: <p> VERIFICATION </p>,
      children: (
        <div>
          <table align="left" style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan={10} style={{ textAlign: "center", height: "35px" }}>
                Date
              </td>
              <td colSpan={10} style={{ textAlign: "center", height: "35px" }}>
                Weight in (g / Kg){" "}
              </td>
              <td colSpan={10} style={{ textAlign: "center", height: "35px" }}>
                Observed weightin (g / Kg)
              </td>
              <td colSpan={10} style={{ textAlign: "center", height: "35px" }}>
                Range in (g / Kg)
              </td>
              <td colSpan={10} style={{ textAlign: "center", height: "35px" }}>
                Status (Pass/Fail)
              </td>
              <td colSpan={10} style={{ textAlign: "center", height: "35px" }}>
                Remarks
              </td>
            </tr>
            {rows.map((row, index) => (
              <tr key={index}>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  <input
                    className="inp-new"
                    max={today}
                    type="date"
                    value={state.date}
                    disabled
                  />
                </td>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.weightInGKg}
                    onChange={(e) => handleWeightChange(e, index)}
                    onInput={(e) => {
                      const value = e.target.value;
                      if (!/^[0-9.]*$/.test(value)) {
                        e.target.value = value.slice(0, -1);
                      }
                    }}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={10}>
                  <input
                    type="text"
                    className="inp-new"
                    value={row.observedWeightInGKg}
                    onChange={(e) => handleObservedWeightChange(e, index)}
                    disabled={!isEditable}
                  />
                </td>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  <input
                    className="inp-new"
                    type="text"
                    value={row.rangeInGKg}
                    disabled={!isEditable}
                    readOnly
                  />
                </td>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  <Select
                    className="inp-new"
                    value={row.status}
                    onChange={(value) => handleStatusChange(value, index)}
                    style={{ width: "100%", textAlign: "center" }}
                    disabled={!isEditable}
                  >
                    <Option value="Pass">Pass</Option>
                    <Option value="Fail">Fail</Option>
                  </Select>
                </td>
                <td
                  colSpan={10}
                  style={{ textAlign: "center", height: "35px" }}
                >
                  <TextArea
                    className="inp-new"
                    type="text"
                    value={row.remarks}
                    onChange={(e) => setRemarks(e.target.value, index)}
                    disabled={!isEditable}
                  />
                </td>
                {index !== 0 &&
                  !(
                    editResponse?.engineeringSupervisorStatus ===
                      "SUPERVISOR_SAVED" ||
                    editResponse?.engineeringSupervisorStatus ===
                      "SUPERVISOR_APPROVED"
                  ) && (
                    <button
                      onClick={() => removeRow(index)}
                      style={{
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "8px",
                        fontSize: "10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                      }}
                    >
                      <DeleteTwoTone
                        style={{ fontSize: "20px", color: "red" }}
                      />
                    </button>
                  )}
              </tr>
            ))}
            {editResponse?.engineeringSupervisorStatus !==
              "SUPERVISOR_APPROVED" && (
              <button
                onClick={addRow}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined style={{ marginRight: "8px" }} />
                Add Row
              </button>
            )}
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: "REVIEWS",
      children: (
        <>
          <table align="left" style={{ width: 600, alignItems: "left" }}>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid black ",
                }}
              >
                <p>Done by </p>
                <b>Sign & Date</b>
              </td>
              <td style={{}}>
                <textarea
                  className="inp-new"
                  value={
                    supervisior
                      ? `${supervisior}\n ${formattedDatesupervisor}`
                      : ""
                  }
                  readOnly
                  rows="2"
                  style={{ resize: "none", overflow: "hidden" }}
                />
                {editResponse?.engineeringSupervisorStatus ===
                  "SUPERVISOR_APPROVED" &&
                  getImage && (
                    <img
                      className="signature"
                      src={getImage}
                      alt="logo"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto",
                      }}
                    />
                  )}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid ",
                }}
              >
                <p>Checked by</p>
                <b>Sign & Date</b>
              </td>
              <td>
                <p style={{ textAlign: "center" }}></p>
                {(editResponse?.engineeringSupervisorStatus ===
                  "SUPERVISOR_REJECTED" ||
                  editResponse?.engineeringSupervisorStatus ===
                    "SUPERVISOR_APPROVED") && (
                  <textarea
                    className="inp-new"
                    value={hod ? `${hod}\n ${formattedDateHod}` : ""}
                    readOnly
                    rows="2"
                    style={{ resize: "none", overflow: "hidden" }}
                  />
                )}
                {(editResponse?.engineeringSupervisorStatus ===
                  "SUPERVISOR_APPROVED" ||
                  editResponse?.engineeringSupervisorStatus ===
                    "SUPERVISOR_REJECTED" ||
                  editResponse?.hodStatus === "HOD_APPROVED" ||
                  editResponse?.hodStatus === "HOD_REJECTED") &&
                  getImage1 && (
                    <img
                      className="signature"
                      src={getImage1}
                      alt="logo"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto",
                      }}
                    />
                  )}
              </td>
            </tr>
          </table>
        </>
      ),
    },
  ];

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="WEIGHING SCALES CALIBRATION RECORD"
        formatNo="PH-ENG01/FC-016"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE" ? (
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
            disabled={!rejectRemarks}
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
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "30px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Department Name:"
          placeholder="Department Name"
          required
          value={state.department}
          disabled
          style={{ width: "35%", height: "35px" }}
        />

        <Input
          addonBefore="Machine ID No:"
          placeholder="Machine ID No:"
          required
          value={state.machineIdNo}
          style={{ width: "35%", height: "35px" }}
          disabled
        />

        {deptId == "1" ? (
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <span style={{ width: "160px" }}>Std wt. Cal. Cert No:</span>
            <Select
              addonBefore="Std wt. Cal. Cert No:"
              placeholder="Select Std wt. Cal. Cert No"
              value={stdWtCalCertNo}
              onChange={handleStdWtCalCertNoChange}
              style={{ width: "70%", height: "35px" }}
              disabled={!isEditable}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setStdWtCalCertNo(e.target.value);
                }
              }}
              onSearch={(value) => setStdWtCalCertNo(value)}
              showSearch
              filterOption={false}
              mode="combobox"
            >
              {machineIdMapping.map((certNo, index) => (
                <Option key={index} value={certNo}>
                  {certNo}
                </Option>
              ))}
            </Select>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <span style={{ width: "160px" }}>Std wt. Cal. Cert No:</span>
            <Input
              // addonBefore="Std wt. Cal. Cert No:"
              placeholder="Enter Std wt. Cal. Cert No"
              value={stdWtCalCertNo}
              onChange={(e) => setStdWtCalCertNo(e.target.value)}
              style={{ width: "60%", height: "35px" }}
              disabled={!isEditable}
            />
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Capacity:"
          placeholder="Capacity"
          required
          value={state.capacity}
          style={{ width: "20%", height: "35px" }}
          disabled
        />

        <Input
          addonBefore="Tolerances:"
          placeholder="Tolerances"
          required
          value={state.tolerance}
          style={{ width: "20%", height: "35px" }}
          disabled
        />
        <span style={{ width: "160px" }}>Measurement unit : </span>
        <Select
          value={unit}
          onChange={handleUnitChange}
          style={{ width: "10%", height: "35px", textAlign: "center" }}
          disabled={!isEditable}
        >
          <option value="g">g</option>
          <option value="Kg">Kg</option>
        </Select>
      </div>

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

export default Engineering_FC016;
