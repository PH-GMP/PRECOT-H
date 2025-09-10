/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import BleachingHeader from "../Components/BleachingHeader.js";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Menu,
  Radio,
  Row,
  Select,
  Tabs,
  Tooltip,
  message,
  Modal,
} from "antd";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const Stores_f008 = () => {
  const { state } = useLocation();
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [forkliftNo, setForkliftNo] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [startMeterReading, setStartMeterReading] = useState("");
  const [endMeterReading, setEndMeterReading] = useState("");
  const [totalMeterReading, setTotalMeterReading] = useState("");
  const [inKm, setInKm] = useState("");
  const [outKm, setOutKm] = useState("");
  const [totalKm, setTotalKm] = useState("");
  const [chargeInTime, setChargeInTime] = useState("");
  const [chargeOutTime, setChargeOutTime] = useState("");
  const [totalCharge, setTotalCharge] = useState("");
  const [remarks, setRemarks] = useState("");
  const [duration, setDuration] = useState("");
  const [storeInChargeStatus, setStoreInChargeStatus] = useState("");
  const [operatorStatus, setOperatorStatus] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const todaytime = new Date().toISOString().slice(0, 16);
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [operatorDate, setOperatorDate] = useState("");
  const [operator, setOperator] = useState("");
  const [incharge, setIncharge] = useState("");
  const [inchargeDate, setInchargeDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [supervisorStatus, setSupervisorStatus] = useState("");
  // console.loglog("date,", state.date);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/Stores/F-008/Summary");
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
    // Check if the date is already in the format dd/MM/yyyy
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

  const date1 = formatDateUser(date);
  const formattedInchargeDate = formatDate(inchargeDate);
  const formatedDateOperator = formatDate(operatorDate);
  const formattedDateHod = formatDate(hodDate);

  const getMonthNameFromDate = (dateString) => {
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

    const date = new Date(dateString);

    const monthIndex = date.getMonth();
    const monthName = months[date.getMonth()];

    return monthName.slice(0, 3).toUpperCase();
  };
  const getYearFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const monthSelected = getMonthNameFromDate(state.date);

  const yearSelected = getYearFromDate(state.date);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBmrOptions();
  }, []);
  const fetchBmrOptions = async () => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/Store/getForkliftCheckList?date=${state.date}&forkliftNo=${state.forkliftNo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("edit data", data);

      if (data) {
        setEditResponse(data[0]);
        setId(data[0].id);
        setDate(data[0].date);
        setForkliftNo(data[0].forkliftNo);
        setYear(data[0].year); // Assuming year is part of the response, if not, you can extract from `date`
        setMonth(data[0].month); // Same for month, handle it as per your requirements
        setCapacity(data[0].capacity);
        // Set meter readings
        setStartMeterReading(data[0].startMeterReading);
        setEndMeterReading(data[0].endMeterReading);
        setTotalMeterReading(data[0].totalMeterReading); // You might want to calculate this if it's not part of response
        setInKm(data[0].inKm);
        setOutKm(data[0].outKm);
        setTotalKm(data[0].totalKm);
        setChargeInTime(data[0].chargeInTime);
        setChargeOutTime(data[0].chargeOutTime);
        setDuration(data[0].totalCharge);
        setRemarks(data[0].remarks);
        setStoreInChargeStatus(data[0].store_in_charge_status);
        setOperatorStatus(data[0].operator_status);
        setOperator(data[0].operator_sign);
        setIncharge(data[0].store_in_charge_sign);
        setInchargeDate(data[0].store_in_charge_submit_on);
        setOperatorDate(data[0].operator_submit_on);
      }

      if (roleauth === "DISPATCH_SUPERVISOR") {
        if (
          data[0]?.operator_status !== "OPERATOR_APPROVED" ||
          data[0]?.store_in_charge_status === "INCHARGE_REJECTED"
        ) {
          message.warning(
            "DISPATCH_OPEARTOR Not Yet Approved"
          );
          setTimeout(() => {
            navigate("/Precot/Stores/F-008/Summary");
          }, 1500); 
        }
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };
  const canDisplayButtons = () => {
    if (roleauth === "DISPATCH_OPEARTOR") {
      // Operator approved and incharge rejected => show submit button
      if (
        editResponse?.operator_status === "OPERATOR_APPROVED" &&
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "block"; // Show submit button
      }

      // Operator approved and incharge still pending or approved => hide submit button
      if (
        editResponse?.operator_status === "OPERATOR_APPROVED" &&
        (editResponse?.store_in_charge_status === "WAITING_FOR_APPROVAL" ||
          editResponse?.store_in_charge_status === "INCHARGE_APPROVED")
      ) {
        return "none"; // Hide submit button
      }

      return "block"; // By default, show submit button
    } else if (roleauth === "DISPATCH_SUPERVISOR") {
      if (
        editResponse?.store_in_charge_status === "INCHARGE_APPROVED" ||
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        editResponse?.store_in_charge_status === "INCHARGE_APPROVED" ||
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth === "DISPATCH_OPEARTOR") {
      if (
        editResponse?.operator_status === "OPERATOR_APPROVED" &&
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        editResponse?.operator_status === "OPERATOR_APPROVED" &&
        (editResponse?.store_in_charge_status === "WAITING_FOR_APPROVAL" ||
          editResponse?.store_in_charge_status === "INCHARGE_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleauth === "DISPATCH_SUPERVISOR") {
      if (
        editResponse?.store_in_charge_status === "INCHARGE_APPROVED" ||
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        editResponse?.store_in_charge_status === "INCHARGE_APPROVED" ||
        editResponse?.store_in_charge_status === "INCHARGE_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };

  const canEdit = () => {
    const isOperatorApproved =
      editResponse?.operator_status === "OPERATOR_APPROVED";
    const isInchargeApproved =
      editResponse?.store_in_charge_status === "INCHARGE_APPROVED";
    const isInchargeRejected =
      editResponse?.store_in_charge_status === "INCHARGE_REJECTED";

    if (roleauth === "DISPATCH_OPEARTOR") {
      return !isOperatorApproved || isInchargeRejected;
    }

    if (roleauth === "DISPATCH_SUPERVISOR") {
      return !isOperatorApproved ;
    }

    return false;
  };
  const isEditable = canEdit();

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = incharge;
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
          setGetImage(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = incharge;
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
  }, [editResponse,API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");
  // console.log("operator",operator);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = operator;
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
  }, [editResponse,API.prodUrl, token]);

  // console.loglog(productName);
  // console.loglog("noOfFlagsInRoll", mixing);

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Store/ForkliftCheckList/approveOrReject`,
        {
          id: id,
          status: "Approve",
          remarks: "",
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        // console.loglog("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Stores/F-008/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        // console.loglog("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // console.loglog("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Store/ForkliftCheckList/approveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        // console.loglog("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Stores/F-008/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        // console.loglog("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleSave = () => {
    setSaveLoading(true);
    const remarkToSave = (remarks || "").trim() === "" ? "NA" : remarks;

    const payload = {
      id: id || null,
      formatName: "FORKLIFT MOVEMENT CHECKLIST",
      formatNo: "PH- STR01/F-008",
      revisionNo: "02",
      sopNumber: "PH-STR01-D-02",
      date: state.date,
      forkliftNo: state.forkliftNo,
      unit: "H",
      month: monthSelected,
      year: yearSelected,
      startMeterReading: startMeterReading,
      endMeterReading: endMeterReading,
      totalMeterReading: meterReading,
      inKm: inKm,
      outKm: outKm,
      totalKm: km,
      chargeInTime: chargeInTime,
      chargeOutTime: chargeOutTime,
      totalCharge: duration,
      remarks: remarkToSave,
      capacity: capacity,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(`${API.prodUrl}/Precot/api/Store/ForkliftCheckList/Save`, payload, {
        headers,
      })
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully Saved");
        navigate("/Precot/Stores/F-008/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const isFormValid = () => {
    return (
      startMeterReading &&
      endMeterReading &&
      inKm &&
      outKm &&
      chargeInTime &&
      chargeOutTime &&
      capacity
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      message.error("Please fill all required fields.");
      return;
    }

    setSubmitLoading(true);
    const remarkToSave = (remarks || "").trim() === "" ? "NA" : remarks;

    const payload = {
      id: id || null,
      formatName: "FORKLIFT MOVEMENT CHECKLIST",
      formatNo: "PH- STR01/F-008",
      revisionNo: "02",
      sopNumber: "PH-STR01-D-02",
      date: state.date,
      forkliftNo: state.forkliftNo,
      unit: "H",
      month: monthSelected,
      year: yearSelected,
      startMeterReading: startMeterReading,
      endMeterReading: endMeterReading,
      totalMeterReading: meterReading,
      inKm: inKm,
      outKm: outKm,
      totalKm: km,
      chargeInTime: chargeInTime,
      chargeOutTime: chargeOutTime,
      totalCharge: duration,
      remarks: remarkToSave,
      capacity: capacity,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(` ${API.prodUrl}/Precot/api/Store/ForkliftCheckList/Submit`, payload, {
        headers,
      })
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully submitted");
        navigate("/Precot/Stores/F-008/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
  const forkliftcapacity = [
    { label: "1 ton", value: "1 ton" },
    { label: "2 ton", value: "2 ton" },
  ];
  const [textFieldValue, setTextFieldValue] = useState("");
  const [capacity, setCapacity] = useState("");
  const handleTextFieldChange = (e) => {
    const value = e.target.value.trim();
    setTextFieldValue(value === "" ? "NA" : value);
  };

  const handleNumericInput = (value, setValue) => {
    let num = Number(value);
    if (!/^\d*\.?\d*$/.test(value)) {
      message.error("Please enter a valid value");
      setValue("");
    } else {
      setValue(num.toFixed(2));
    }
  };

  const handleChange = (e, setValue) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9.]/g, ""); // Only allow numbers and decimal points
    setValue(inputValue);
  };

  // Handle changes and validation for each field
  const handleStartMeterReadingChange = (e) => {
    handleChange(e, setStartMeterReading);
  };

  const handleEndMeterReadingChange = (e) => {
    handleChange(e, setEndMeterReading);
  };

  const handleInKmChange = (e) => {
    handleChange(e, setInKm);
  };

  const handleOutKmChange = (e) => {
    handleChange(e, setOutKm);
  };

  // Calculate Total Meter Reading and Total Km
  const calculateTotalMeterReading = () => {
    const meterReading = calculateAverage(endMeterReading, startMeterReading);
    setTotalMeterReading(meterReading);
  };

  const calculateTotalKm = () => {
    const total = Number(outKm) - Number(inKm);
    setTotalKm(total.toFixed(2));
  };

  const handleTotalChargeChange = (e) => {
    handleChange(e, setTotalCharge);
  };

  const calculateAverage = (end, start) => {
    if (!start || start === 0) return ""; // Return empty string if days is zero or not defined
    return (end - start).toFixed(2);
  };

  const meterReading = calculateAverage(endMeterReading, startMeterReading);
  const km = calculateAverage(outKm, inKm);
  // const charge = calculateAverage(chargeOutTime, chargeInTime);

  const handleChargeInTimeChange = (e) => {
    const value = e.target.value;
    setChargeInTime(value);
    calculateDuration(value, chargeOutTime); // Recalculate duration on charge in time change
  };

  const handleChargeOutTimeChange = (e) => {
    const value = e.target.value;
    setChargeOutTime(value);
    calculateDuration(chargeInTime, value); // Recalculate duration on charge out time change
  };

  // Function to calculate duration in hours
  // Function to calculate duration in hours
  const calculateDuration = (inTime, outTime) => {
    if (inTime && outTime) {
      const inDate = new Date(inTime);
      const outDate = new Date(outTime);

      // Check if chargeInTime is greater than or equal to chargeOutTime
      if (inDate >= outDate) {
        message.error("Charge Out Time should be greater than Charge In Time.");
        setChargeOutTime(""); // Clear the chargeOutTime if validation fails
        setDuration(""); // Clear the duration as well
        return;
      }

      const diffInMilliseconds = outDate - inDate; // Difference in milliseconds

      // Calculate total hours and minutes
      const totalMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60); // Total hours
      const minutes = totalMinutes % 60; // Remaining minutes

      setDuration(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
      );
    } else {
      setDuration(""); // Reset duration if either input is empty
    }
  };

  const items = [
    {
      key: "1",
      label: <p> Checklist</p>,
      children: (
        <div>
          <table
            align="left"
            style={{ width: "70%", margin: "auto", borderCollapse: "collapse" }}
          >
            <tr>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Start Meter Reading
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                End Meter Reading
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Total Meter reading of the day
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                In Km
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Out Km
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Total Km
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Charge In Time
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Charge Out Time
              </td>
              <td colSpan="1" style={{ textAlign: "center" }}>
                Total Charge
              </td>
            </tr>

            <tr style={{ height: "35px" }}>
              <td>
                <input
                  className="inp-new"
                  type="text"
                  value={startMeterReading}
                  onChange={handleStartMeterReadingChange}
                  onBlur={() =>
                    handleNumericInput(startMeterReading, setStartMeterReading)
                  }
                  disabled={!isEditable}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  type="text"
                  value={endMeterReading}
                  onChange={handleEndMeterReadingChange}
                  onBlur={() =>
                    handleNumericInput(endMeterReading, setEndMeterReading)
                  }
                  disabled={!isEditable}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  type="text"
                  value={meterReading}
                  readOnly
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  type="text"
                  value={inKm}
                  onChange={handleInKmChange}
                  onBlur={() => handleNumericInput(inKm, setInKm)}
                  disabled={!isEditable}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  type="text"
                  value={outKm}
                  onChange={handleOutKmChange}
                  onBlur={() => handleNumericInput(outKm, setOutKm)}
                  disabled={!isEditable}
                />
              </td>
              <td>
                <input className="inp-new" type="text" value={km} readOnly />
              </td>
              <td>
                <input
                  className="inp-new"
                  type="datetime-local"
                  max={todaytime}
                  value={chargeInTime}
                  onChange={handleChargeInTimeChange}
                  disabled={!isEditable}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  type="datetime-local"
                  max={todaytime}
                  value={chargeOutTime}
                  onChange={handleChargeOutTimeChange}
                  disabled={!isEditable}
                />
              </td>
              <td>
                <input
                  className="inp-new"
                  type="text"
                  value={duration}
                  readOnly
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p> Remarks </p>,
      children: (
        <div>
          <table align="left" style={{ width: 500, alignItems: "left" }}>
            <p>Remarks</p>
            <Input.TextArea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              style={{ width: 600, height: 100 }}
              disabled={!isEditable}
            />
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Review</p>,
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
                <p>Forklift Operator </p>
                <b>Sign & Date</b>
              </td>
              <td
                style={
                  {
                    // borderRight: "none",
                  }
                }
              >
                {" "}
                {editResponse?.operator_status === "OPERATOR_APPROVED" &&
                  getImage2 && (
                    <img
                      className="signature"
                      src={getImage2}
                      alt="logo"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto",
                      }}
                    />
                  )}
                <textarea
                  className="inp-new"
                  value={
                    operator ? `${operator}\n ${formatedDateOperator}` : ""
                  }
                  readOnly
                  rows="2"
                  style={{ resize: "none", overflow: "hidden" }}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid ",
                }}
              >
                <p>Checked by </p>
                <b>Sign & Date</b>
              </td>
              <td>
                {(editResponse?.store_in_charge_status ===
                  "INCHARGE_APPROVED" ||
                  editResponse?.store_in_charge_status ===
                  "INCHARGE_REJECTED") &&
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
                <p style={{ textAlign: "center" }}></p>
                {(editResponse?.store_in_charge_status ===
                  "INCHARGE_REJECTED" ||
                  editResponse?.store_in_charge_status ===
                  "INCHARGE_APPROVED") && (
                    <textarea
                      className="inp-new"
                      value={
                        incharge ? `${incharge}\n ${formattedInchargeDate}` : ""
                      }
                      readOnly
                      rows="2"
                      style={{ resize: "none", overflow: "hidden" }}
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
        formName="FORKLIFT MOVEMENT CHECKLIST"
        formatNo="PH- STR01/F-008"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "DISPATCH_SUPERVISOR" ? (
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
        }}
      >
        <Input
          addonBefore="Date:"
          placeholder="Date"
          required
          value={formatDateUser(state.date)}
          disabled
          style={{ width: "15%", height: "35px" }}
        />
        <Input
          addonBefore="Forklift No.: "
          placeholder="Forklift No."
          required
          value={state.forkliftNo}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <p>Forklift Capacity:</p>
        <Select
          label="Forklift Capacity: "
          placeholder="Forklift Capacity"
          required
          value={capacity}
          options={forkliftcapacity}
          onChange={(value) => setCapacity(value)}
          style={{ width: "15%", height: "35px" }}
          disabled={!isEditable}
        />
      </div>

      <div style={{ paddingBottom: "2em" }}></div>
      <Row>
        <Tabs
          items={items}
          //onChange={onChange}
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

export default Stores_f008;
