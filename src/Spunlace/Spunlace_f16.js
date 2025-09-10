/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import BleachingHeader from "../Components/BleachingHeader";
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
const Spunlace_f16 = () => {
  const { state } = useLocation();
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const [productName, setProductName] = useState("");
  const [gsm, setGsm] = useState("");
  const [width, setWidth] = useState("");
  const [unwinder, setUnwinder] = useState("");
  const [rewinder, setRewinder] = useState("");
  const [cutterTrim, setCutterTrim] = useState("");
  const [layonTrim, setLayonTrim] = useState("");
  const [noOfFlagsInRoll, setNoOfFlagsInRoll] = useState("");
  const [pressureAtMinDia, setPressureAtMinDia] = useState("");
  const [uwData, setUwData] = useState("");
  const [tension, setTension] = useState("");
  const [diameter, setDiameter] = useState("");
  const [mixing, setMixing] = useState("");
  const [pattern, setPattern] = useState("");
  const [moisture, setMoisture] = useState("");
  const [thickness, setThickness] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [processId, setProcessId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [operatorDate, setOperatorDate] = useState("");
  const [operator, setOperator] = useState("");
  const [supervisior, setSupervisor] = useState("");
  const [supervisorDate, setSupervisorDate] = useState("");
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
    navigate("/Precot/Spunlace/F-16/Summary");
  };
  const [editResponse, setEditResponse] = useState(null);
  const roleauth = localStorage.getItem("role");
  const handleUnwinder = () => {
    const num = Number(unwinder);
    if (num < 0 || num > 400) {
      message.error(
        "Please enter a number between 0 and 400 in unwinder set value"
      );
      setUnwinder("");
    }
  };
  const handleRewinder = () => {
    const num = Number(rewinder);
    if (num < 0 || num > 400) {
      message.error(
        "Please enter a number between 0 and 400 in rewinder set value"
      );
      setRewinder("");
    }
  };
  const handleCutterTrim = () => {
    const num = Number(cutterTrim);
    if (num < -20 || num > 20) {
      message.error(
        "Please enter a number between -20 and 20 in cutter trim set value"
      );
      setCutterTrim("");
    }
  };
  const handleLayonTrim = () => {
    const num = Number(layonTrim);
    if (num < -20 || num > 20) {
      message.error(
        "Please enter a number between -20 and 20 in layon trim set value"
      );
      setLayonTrim("");
    }
  };
  const handleNoOfFlagsInRoll = () => {
    const num = Number(noOfFlagsInRoll);
    if (num < 0 || num > 99) {
      message.error(
        "Please enter a number between 0 and 99 in No of flages in roll set value"
      );
      setNoOfFlagsInRoll("");
    }
  };
  const handlePressure = () => {
    const num = Number(pressureAtMinDia);
    if (num < 0 || num > 100) {
      message.error(
        "Please enter a number between 0 and 100 in Pressure set value"
      );
      setPressureAtMinDia("");
    }
    //  else {
    //   setPressureAtMinDia(num.toFixed(1));
    // }
  };

  const hanldeUwData = () => {
    const num = Number(uwData);
    // !/^\d+$/.test(uwData) ||
    if (num < 0 || num > 150) {
      message.error(
        "Please enter a number between 0 and 150 in UW data set value"
      );
      setUwData("");
    }
  };
  const handleTension = () => {
    const num = Number(tension);
    if (num < 0 || num > 400) {
      message.error(
        "Please enter a number between 0 and 400 in Tension set value"
      );
      setTension("");
    }
  };
  const handleDiameter = () => {
    const num = Number(diameter);
    if (num < 100 || num > 1200) {
      message.error(
        "Please enter a number between 100 and 1200 in Tension set value"
      );
      setDiameter("");
    }
  };
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

  const handleChangeUnwinder = (e) => {
    let inputValue = e.target.value;

    // Remove non-numeric characters
    // inputValue = inputValue.replace(/\D/g, "");

    // Limit input length to 2 digits
    // if (inputValue.length > 3) {
    //   inputValue = inputValue.slice(0, 2);
    // }

    setUnwinder(inputValue);
  };

  const handleChangeRewinder = (e) => {
    let inputValue = e.target.value;
    // Remove non-numeric characters and limit to 2 digits
    // inputValue = inputValue.replace(/\D/g, "").slice(0, 3);
    setRewinder(inputValue);
  };

  const handleChangeCutterTrim = (e) => {
    let inputValue = e.target.value;
    // Remove non-numeric characters and limit to 2 digits
    // if (/^-?\d*$/.test(inputValue)) {
    setCutterTrim(inputValue);
    // }
  };

  const handleChangeLayonTrim = (e) => {
    let inputValue = e.target.value;
    // if (/^-?\d*$/.test(inputValue)) {
    setLayonTrim(inputValue);
    // }
  };

  const handleChangeNoOfFlagsInRoll = (e) => {
    let inputValue = e.target.value;
    // Remove non-numeric characters and limit to 2 digits
    // inputValue = inputValue.replace(/\D/g, "").slice(0, 3);
    setNoOfFlagsInRoll(inputValue);
  };

  const handleChangePressureAtMinDia = (e) => {
    let inputValue = e.target.value;
    // Allow only numeric characters and one decimal point, limit to 4 characters
    // inputValue = inputValue.replace(/[^0-9.]/g, "").slice(0, 4);
    setPressureAtMinDia(inputValue);
  };

  const handleChangeUwData = (e) => {
    let inputValue = e.target.value;
    // Remove non-numeric characters and limit to 3 digits
    // inputValue = inputValue.replace(/\D/g, "").slice(0, 3);
    setUwData(inputValue);
  };

  const handleChangeTension = (e) => {
    let inputValue = e.target.value;
    // Remove non-numeric characters and limit to 2 digits
    // inputValue = inputValue.replace(/\D/g, "").slice(0, 3);
    setTension(inputValue);
  };

  const handleChangeDiameter = (e) => {
    let inputValue = e.target.value;
    // Remove non-numeric characters and limit to 4 digits
    // inputValue = inputValue.replace(/\D/g, "").slice(0, 4);
    setDiameter(inputValue);
  };

  const handleThickness = (e) => {
    let inputValue = e.target.value;
    // Allow only numeric characters and one decimal point, limit to 4 characters
    // inputValue = inputValue.replace(/[^0-9.]/g, "").slice(0, 4);
    setThickness(inputValue);
  };

  const handleMoisture = (e) => {
    let inputValue = e.target.value;
    // Allow only numeric characters and one decimal point, limit to 4 characters
    // inputValue = inputValue.replace(/[^0-9.]/g, "").slice(0, 10);
    setMoisture(inputValue);
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

  const date1 = formatDateUser(state.date);
  const formattedDatesupervisor = formatDate(supervisorDate);
  const formatedDateOperator = formatDate(operatorDate);
  const formattedDateHod = formatDate(hodDate);
  // console.loglog("date1", date1);
  // console.loglog("shift", state.shift);
  const token = localStorage.getItem("token");
  // console.loglog(token);

  useEffect(() => {
    fetchBmrOptions();
    fetchData();
    // approval();
  }, []);
  const fetchBmrOptions = async () => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationSliterWinder/getByDateShiftOrderNo?date=${date1}&shift=${state.shift}&orderNo=${state.orderNo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.loglog("edit data", data);

      if (data) {
        setEditResponse(data);
        setProcessId(data.processId);
        setOrderNo(data.orderNo);
        setMoisture(data.moisture);
        setThickness(data.thickness);
        setUnwinder(data.unwinder);
        setRewinder(data.rewinder);
        setCutterTrim(data.cutterTrim);
        setLayonTrim(data.layonTrim);
        setNoOfFlagsInRoll(data.noOfFlags);
        setPressureAtMinDia(data.pressure);
        setUwData(data.uwData);
        setTension(data.tension);
        setDiameter(data.diameter);
        setDate(formatDate(data.date));
        setShift(data.shift);
        setOperator(data.operator_sign);
        setOperatorDate(data.operator_submitted_on);
        setSupervisor(data.supervisor_sign);
        setSupervisorDate(data.supervisor_submit_on);
        setHod(data.hod_sign);
        setHodDate(data.hod_submit_on);
        setSupervisorStatus(data.supervisor_status);
        // console.loglog("supervisoesdufheiljwkqmnfjknk", data.supervisor_status);
      }

      if (roleauth === "ROLE_SUPERVISOR") {
        // console.loglog("Supervisor Role Detected");
        // console.loglog("Supervisor Status:", data?.supervisor_status);
        // console.loglog("HOD Status:", data?.hod_status);

        if (
          data?.supervisor_status === "SUPERVISOR_REJECTED" ||
          data?.hod_status === "HOD_REJECTED"
        ) {
          message.warning(
            "Operator Not Yet Approved or Previous Stage Rejected"
          );
          setTimeout(() => {
            navigate("/Precot/Spunlace/F-16/Summary");
          }, 1500);
        }
      }

      if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
        if (
          data?.operator_status !== "OPERATOR_APPROVED" ||
          data?.supervisor_status !== "SUPERVISOR_APPROVED" ||
          data?.supervisor_status === "SUPERVISOR_REJECTED" ||
          data?.hod_status === "HOD_REJECTED"
        ) {
          message.warning(
            "Operator Not Yet Approved or Previous Stage Rejected"
          );
          setTimeout(() => {
            navigate("/Precot/Spunlace/F-16/Summary");
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/spulance/silterWinderProductionDetails?order=${state.orderNo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.loglog('edit1 data', data);
      setMixing(data[0].MixDesc);
      setProductName(data[0].Brand);
      setPattern(data[0].PatternDesc);
      setGsm(data[0].gsm);
      // setMoisture(data[0].moisture);
      setWidth(data[0].width);
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };
  // console.loglog("suoper", editResponse?.supervisor_status);

  const approval = () => {
    if (roleauth === "ROLE_SUPERVISOR") {
      // console.loglog("Supervisor Role Detected");
      // console.loglog("Supervisor Status:", editResponse?.supervisor_status);
      // console.loglog("HOD Status:", editResponse?.hod_status);

      if (
        editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
        editResponse?.hod_status === "HOD_REJECTED"
      ) {
        message.warning("Previous Stage Rejected");
        setTimeout(() => {
          navigate("/Precot/Spunlace/F-16/Summary");
        }, 1500);
      }
    }

    if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      if (
        editResponse?.operator_status !== "OPERATOR_APPROVED" ||
        editResponse?.supervisor_status !== "SUPERVISOR_APPROVED" ||
        editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
        editResponse?.hod_status === "HOD_REJECTED"
      ) {
        message.warning("Operator Not Yet Approved or Previous Stage Rejected");
        setTimeout(() => {
          navigate("/Precot/Spunlace/F-16/Summary");
        }, 1500);
      }
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
      if (
        editResponse?.operator_status == "OPERATOR_APPROVED"
        // editResponse?.supervisor_status == "SUPERVISOR_APPROVED" || editResponse?.supervisor_status == "SUPERVISOR_REJECTED") &&
        // editResponse?.hod_status == "HOD_REJECTED"
      ) {
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

  // const canEdit = () => {
  //   if (roleauth === "ROLE_OPERATOR") {
  //     return (
  //       editResponse &&
  //       editResponse.operator_status !== "OPERATOR_APPROVED"

  //     );
  //   } else if (roleauth === "ROLE_SUPERVISOR") {
  //     return !(
  //       editResponse &&
  //       editResponse.operator_status === "OPERATOR_APPROVED" &&
  //       editResponse.hod_status == "WAITING_FOR_APPROVAL" &&
  //       editResponse.supervisor_status === "WAITING_FOR_APPROVAL" || "SUPERVISOR_APPROVED"

  //     );
  //   } else if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
  //     return !(
  //       editResponse &&
  //       (editResponse.hod_status === "WAITING_FOR_APPROVAL" ||
  //         editResponse.hod_status === "HOD_APPROVED" ||
  //         editResponse.hod_status === "HOD_REJECTED")
  //     );
  //   } else {
  //     return false;
  //   }
  // };

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

  // Determine if inputs are editable
  const isEditable = canEdit();

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = supervisior;
    if (username) {
      // console.loglog("usernameparams", username);

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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = hod;
    if (username) {
      // console.loglog("usernameparams", username);

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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = operator;
    if (username) {
      // console.loglog("usernameparams", username);

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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse,API.prodUrl, token]);

  // console.loglog(productName);
  // console.loglog("noOfFlagsInRoll", mixing);

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationSliterWinder/approveOrReject`,
        {
          id: processId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        // console.loglog("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-16/Summary");
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
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationSliterWinder/approveOrReject`,
        {
          id: processId,
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
        navigate("/Precot/Spunlace/F-16/Summary");
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
    const payload = {
      processId: processId || null,
      formatName: "PROCESS SETUP VERIFICATION SLITER WINDER",
      formatNo: "PH-PRD02/F-015",
      revisionNo: 1,
      refSopNo: "PH-PRD02-D-03",
      date: date1,
      shift: state.shift,
      unit: "H",
      orderNo: state.orderNo,
      mixing: mixing,
      productName: productName,
      pattern: pattern,
      gsm: gsm,
      moisture: moisture,
      width: width,
      thickness: thickness,
      unwinder: unwinder,
      rewinder: rewinder,
      cutterTrim: cutterTrim,
      layonTrim: layonTrim,
      noOfFlags: noOfFlagsInRoll,
      pressure: pressureAtMinDia,
      uwData: uwData,
      tension: tension,
      diameter: diameter,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    console.log("payload", payload);
    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationSliterWinder/SaveProcessSetupVerificationSliterWinder`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully Saved");
        navigate("/Precot/Spunlace/F-16/Summary");
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
      thickness &&
      unwinder &&
      rewinder &&
      cutterTrim &&
      layonTrim &&
      noOfFlagsInRoll &&
      pressureAtMinDia &&
      uwData &&
      tension &&
      diameter
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      message.error("Please fill all required fields.");
      return;
    }
    // setShift(state.shift);
    // setOrderNo(state.orderNo);

    setSubmitLoading(true);
    const payload = {
      processId: processId || "",
      formatName: "PROCESS SETUP VERIFICATION SLITER WINDER",
      formatNo: "PH-PRD02/F-015",
      revisionNo: 1,
      refSopNo: "PH-PRD02-D-03",
      date: date1,
      shift: state.shift,
      unit: "H",
      orderNo: state.orderNo,
      mixing: mixing,
      productName: productName,
      pattern: pattern,
      gsm: gsm,
      moisture: moisture,
      width: width,
      thickness: thickness,
      unwinder: unwinder,
      rewinder: rewinder,
      cutterTrim: cutterTrim,
      layonTrim: layonTrim,
      noOfFlags: noOfFlagsInRoll,
      pressure: pressureAtMinDia,
      uwData: uwData,
      tension: tension,
      diameter: diameter,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationSliterWinder/SubmitProcessSetupVerificationSliterWinder`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully submitted");
        navigate("/Precot/Spunlace/F-16/Summary");
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

  const items = [
    {
      key: "1",
      label: <p> VERIFICATION </p>,
      children: (
        <div>
          <table
            align="left"
            style={{ width: "50%", margin: "auto" }}
            pagpagination={{ pageSize: 5 }}
          >
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "center" }}>
                Descriptions{" "}
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Standards
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Units
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                SET VALUE
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                UNWINDER
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                0 to 400
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                N
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={unwinder}
                  onBlur={handleUnwinder}
                  onInput={handleChangeUnwinder}
                  onChange={handleChangeUnwinder}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                REWINDER
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                0 to 400
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                N
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={rewinder}
                  onBlur={handleRewinder}
                  onInput={handleChangeRewinder}
                  onChange={handleChangeRewinder}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                CUTTER TRIM
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                -20 to 20
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                %
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={cutterTrim}
                  onBlur={handleCutterTrim}
                  onInput={handleChangeCutterTrim}
                  onChange={handleChangeCutterTrim}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                LAYON TRIM
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                -20 to 20
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                %
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={layonTrim}
                  onBlur={handleLayonTrim}
                  onInput={handleChangeLayonTrim}
                  onChange={handleChangeLayonTrim}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                NO OF FLAGS IN ROLL
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                0 to 99
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Nos
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={noOfFlagsInRoll}
                  onBlur={handleNoOfFlagsInRoll}
                  onInput={handleChangeNoOfFlagsInRoll}
                  onChange={handleChangeNoOfFlagsInRoll}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                PRESSURE AT MIN. DIA
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                0 to 100
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                %
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={pressureAtMinDia}
                  onBlur={handlePressure}
                  onInput={handleChangePressureAtMinDia}
                  onChange={handleChangePressureAtMinDia}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                UW DATA{" "}
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                0 to 150
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                %
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={uwData}
                  onBlur={hanldeUwData}
                  onInput={handleChangeUwData}
                  onChange={handleChangeUwData}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                TENSION{" "}
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                0 to 400
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                N
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={tension}
                  onBlur={handleTension}
                  onInput={handleChangeTension}
                  onChange={handleChangeTension}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                DIAMETER{" "}
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                100 to 1200
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                MM
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={diameter}
                  onBlur={handleDiameter}
                  onInput={handleChangeDiameter}
                  onChange={handleChangeDiameter}
                  disabled={!isEditable}
                />
              </th>
            </tr>
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
                <p>Operator </p>
                <b>Sign & Date</b>
              </td>
              <td
                style={
                  {
                    // borderRight: "none",
                  }
                }
              >
                <textarea
                  className="inp-new"
                  value={
                    operator ? `${operator}\n ${formatedDateOperator}` : ""
                  }
                  readOnly
                  rows="2"
                  style={{ resize: "none", overflow: "hidden" }}
                />
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
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid ",
                }}
              >
                <p>Production</p>
                <b>Sign & Date</b>
              </td>
              <td>
                <p style={{ textAlign: "center" }}></p>
                {(editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
                  editResponse?.supervisor_status ===
                    "SUPERVISOR_APPROVED") && (
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
                )}
                {(editResponse?.supervisor_status === "SUPERVISOR_APPROVED" ||
                  editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
                  editResponse?.hod_status === "HOD_APPROVED" ||
                  editResponse?.hod_status === "HOD_REJECTED") &&
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
                }}
              >
                <p> HOD / Designee</p>
                <b>Sign & Date</b>
              </td>
              <td
                style={
                  {
                    // borderRight: "none",
                  }
                }
              >
                {(editResponse?.hod_status === "HOD_APPROVED" ||
                  editResponse?.hod_status === "HOD_REJECTED") && (
                  <textarea
                    className="inp-new"
                    value={hod ? `${hod}\n ${formattedDateHod}` : ""}
                    readOnly
                    rows="2"
                    style={{ resize: "none", overflow: "hidden" }}
                  />
                )}
                {(editResponse?.hod_status === "HOD_APPROVED" ||
                  editResponse?.hod_status === "HOD_REJECTED") &&
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
        formName="PROCESS SETUP VERIFICATION SLITER WINDER"
        formatNo="PH-PRD02/F-015"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "ROLE_SUPERVISOR" ||
          roleauth === "ROLE_HOD" ||
          roleauth === "ROLE_QA" ||
          roleauth === "ROLE_QC" ||
          roleauth === "ROLE_DESIGNEE" ? (
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
          addonBefore="Shift:"
          placeholder="Shift"
          required
          value={state.shift}
          disabled
          style={{ width: "10%", height: "35px" }}
        />
        <Input
          addonBefore="Order No.:"
          placeholder="Order No"
          required
          value={state.orderNo}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Mixing:"
          // placeholder="Mixing"
          required
          value={mixing}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Product Name:"
          // placeholder="Product Name"
          required
          value={productName}
          disabled
          style={{ width: "30%", height: "35px" }}
        />
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
          addonBefore="Pattern:"
          // placeholder="Pattern"
          required
          value={pattern}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="GSM:"
          // placeholder="GSM"
          required
          value={gsm}
          disabled
          style={{ width: "15%", height: "35px" }}
        />
        <Input
          addonBefore="Moisture:"
          // placeholder="Moisture"
          required
          value={moisture}
          onChange={handleMoisture}
          disabled={!isEditable}
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Width:"
          // placeholder="Width"
          required
          value={width}
          disabled
          style={{ width: "15%", height: "35px" }}
        />

        <Input
          addonBefore="Thickness:"
          // placeholder="Thickness"
          required
          value={thickness}
          onChange={handleThickness}
          disabled={!isEditable}
          style={{ width: "20%", height: "35px" }}
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

export default Spunlace_f16;
