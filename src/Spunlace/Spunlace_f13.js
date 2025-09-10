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
const Spunlace_f13 = () => {
  const { state } = useLocation();
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const [twistWithNeedles, setTwistWithNeedles] = useState("");
  const [twistWithoutNeedles, setTwistWithoutNeedles] = useState("");
  const [actualNoOftwist, setActualNoOftwist] = useState("");
  const [lenOfBales, setLenOfBales] = useState("");
  const [actualLenOfBales, setActualLenOfBales] = useState("");
  const [pressurePressPlate, setPressurePressPlate] = useState("");
  const [pressureCompensator, setPressureCompensator] = useState("");
  const [dePressurizedPressPlate, setDePressurizedPressPlate] = useState("");
  const [timeOutMotor, setTimeOutMotor] = useState("");
  const [odtFillLevel, setOdtFillLevel] = useState("");
  const [odtHighLevel, setOdtHighLevel] = useState("");
  // const [beaterSpeed, setBeaterSpeed] = useState("");
  // const [feedRollerSpeed, setFeedRollerSpeed] = useState("");
  // const [transportFanSpeed, setTransportFanSpeed] = useState("");
  const [formatName, setFormatName] = useState(" ");
  const [formatNo, setFormatNo] = useState("");
  const [revisionNo, setRevisionNo] = useState(null);
  const [refSopNo, setRefSopNo] = useState("");
  const [unit, setUnit] = useState("H");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [processId, setProcessId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [operatorDate, setOperatorDate] = useState("");
  const [operator, setOperator] = useState("");
  const [supervisior, setSupervisor] = useState("");
  const [supervisorDate, setSupervisorDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodDate, setHodDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  // // console.loglog("date,",state.date);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/Spunlace/F-13/Summary");
  };
  const [editResponse, setEditResponse] = useState(null);
  const roleauth = localStorage.getItem("role");
  const handleTwistWithNeedles = () => {
    const num = Number(twistWithNeedles);
    if (!/^\d+$/.test(twistWithNeedles) || num < 2 || num > 16) {
      message.error(
        "Please enter a number between 2 and 16 in Number of twists with Needles  Set Parameter"
      );
      setTwistWithNeedles("");
    }
  };
  const handleTwistWithoutNeedles = () => {
    const num = Number(twistWithoutNeedles);
    if (!/^\d+$/.test(twistWithoutNeedles) || num < 2 || num > 16) {
      message.error(
        "Please enter a number between 2 and 16 in Number of twists without Needles  Set Parameter"
      );
      setTwistWithoutNeedles("");
    }
  };
  const handleActualNoOfTwist = () => {
    const num = Number(actualNoOftwist);
    if (!/^\d+$/.test(actualNoOftwist) || num < 0 || num > 10) {
      message.error(
        "Please enter a number between 0 and 10 in Actual No of Twist Set Parameter"
      );
      setActualNoOftwist("");
    }
  };
  const handleLenghtOfBale = () => {
    const num = Number(lenOfBales);
    if (!/^\d+$/.test(lenOfBales) || num < 50 || num > 300) {
      message.error(
        "Please enter a number between 50 and 300 in Length of Bale Set Parameter"
      );
      setLenOfBales("");
    }
  };
  const handleActualLengthOfBales = () => {
    const num = Number(actualLenOfBales);
    if (!/^\d+$/.test(actualLenOfBales) || num < 45 || num > 65) {
      message.error(
        "Please enter a number between 45 and 65 in Actual Length of Bales Set Parameter"
      );
      setActualLenOfBales("");
    }
  };
  const handleMaxPressurePressPlate = () => {
    const num = Number(pressurePressPlate);
    if (!/^\d+$/.test(pressurePressPlate) || num < 50 || num > 200) {
      message.error(
        "Please enter a number between 50 and 200 in Maximum Pressure Press plate Set Parameter"
      );
      setPressurePressPlate("");
    }
  };

  const handleMaxPressureCompensator = () => {
    const num = Number(pressureCompensator);
    if (!/^\d+$/.test(pressureCompensator) || num < 10 || num > 190) {
      message.error(
        "Please enter a number between 10 and 190 in Maximum Pressure Compensator Set Parameter"
      );
      setPressureCompensator("");
    }
  };
  const handleDePressurizedPressPlate = () => {
    const num = Number(dePressurizedPressPlate);
    if (!/^\d+$/.test(dePressurizedPressPlate) || num < 10 || num > 80) {
      message.error(
        "Please enter a number between 10 and 80 in De-pressurized Pressure Press plate Set Parameter"
      );
      setDePressurizedPressPlate("");
    }
  };
  const handleTimeOutMotor = () => {
    const num = Number(timeOutMotor);
    if (!/^\d+$/.test(timeOutMotor) || num < 2 || num > 90) {
      message.error(
        "Please enter a number between 2 and 90 in Time out Motor Set Parameter"
      );
      setTimeOutMotor("");
    }
  };

  const handleOdtFillLevel = () => {
    const num = Number(odtFillLevel);
    if (!/^\d+$/.test(odtFillLevel) || num < 1 || num > 30) {
      message.error(
        "Please enter a number between 1 and 30 in ODT photo electric switch fill level Set Parameter"
      );
      setOdtFillLevel("");
    }
  };
  const handleOdtHighLevel = () => {
    const num = Number(odtHighLevel);
    if (!/^\d+$/.test(odtHighLevel) || num < 1 || num > 30) {
      message.error(
        "Please enter a number between 1 and 30 in ODT photo electric switch high level Set Parameter"
      );
      setOdtHighLevel("");
    }
  };
  // const handleBeaterSpeed = () => {
  //   const num = Number(beaterSpeed);
  //   if (!/^\d+$/.test(beaterSpeed) || num < 1200 || num > 1500) {
  //     message.error(
  //       "Please enter a number between 1200 and 1500 in Beater speed Set Parameter"
  //     );
  //     setBeaterSpeed("");
  //   }
  // };
  // const handleFeedRollerSpeed = () => {
  //   const num = Number(feedRollerSpeed);
  //   if (!/^\d+$/.test(feedRollerSpeed) || num < 1000 || num > 1600) {
  //     message.error(
  //       "Please enter a number between 1000 and 1600 in Feed roller speed Set Parameter"
  //     );
  //     setFeedRollerSpeed("");
  //   }
  // };
  // const handleTransportFanSpeed = () => {
  //   const num = Number(transportFanSpeed);
  //   if (!/^\d+$/.test(transportFanSpeed) || num < 2600 || num > 3100) {
  //     message.error(
  //       "Please enter a number between 2600 and 3100 in Transport fan speed Set Parameter"
  //     );
  //     setTransportFanSpeed("");
  //   }
  // };

  const handleChangeTwistWithNeedles = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setTwistWithNeedles(inputValue);
    }
  };

  const handleChangeTwistWithoutNeedles = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setTwistWithoutNeedles(inputValue);
    }
  };

  const handleChangeActualNoOfTwist = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setActualNoOftwist(inputValue);
    }
  };

  const handleChangeLenOfBales = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setLenOfBales(inputValue);
    }
  };

  const handleChangeActualLenOfBales = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setActualLenOfBales(inputValue);
    }
  };

  const handleChangePressurePressPlate = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setPressurePressPlate(inputValue);
    }
  };

  const handleChangePressureCompensator = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setPressureCompensator(inputValue);
    }
  };

  const handleChangeDePressurizedPressPlate = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setDePressurizedPressPlate(inputValue);
    }
  };

  const handleChangeTimeOutMotor = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setTimeOutMotor(inputValue);
    }
  };

  const handleChangeOdtFillLevel = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setOdtFillLevel(inputValue);
    }
  };

  const handleChangeOdtHighLevel = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setOdtHighLevel(inputValue);
    }
  };

  // const handleChangeBeaterSpeed = (e) => {
  //   const inputValue = e.target.value;
  //   if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
  //     setBeaterSpeed(inputValue);
  //   }
  // };

  // const handleChangeFeedRollerSpeed = (e) => {
  //   const inputValue = e.target.value;
  //   if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
  //     setFeedRollerSpeed(inputValue);
  //   }
  // };

  // const handleChangeTransportFanSpeed = (e) => {
  //   const inputValue = e.target.value;
  //   if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
  //     setTransportFanSpeed(inputValue);
  //   }
  // };

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
    //  approval();
  }, []);
  const fetchBmrOptions = async () => {
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationRpBalePress/getByDateShiftOrderNo?date=${date1}&shift=${state.shift}&orderNo=${state.orderNo}`,
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
        setRefSopNo(data.refSopNo);
        setFormatName(data.formatName);
        setFormatNo(data.formatNo);
        setRevisionNo(data.revisionNo);
        setProcessId(data.processId);
        setOrderNo(data.orderNo);
        setDate(formatDate(data.date));
        setShift(data.shift);
        setTwistWithNeedles(data.twistWithNeedles);
        setTwistWithoutNeedles(data.twistWithoutNeedles);
        setActualNoOftwist(data.actualNoOftwist);
        setLenOfBales(data.lenOfBales);
        setActualLenOfBales(data.actualLenOfBales);
        setPressurePressPlate(data.pressurePressPlate);
        setPressureCompensator(data.pressureCompensator);
        setDePressurizedPressPlate(data.dePressurizedPressPlate);
        setTimeOutMotor(data.timeOutMotor);
        setOdtFillLevel(data.odtFillLevel);
        setOdtHighLevel(data.odtHighLevel);
        // setBeaterSpeed(data.beaterSpeed);
        // setFeedRollerSpeed(data.feedRollerSpeed);
        // setTransportFanSpeed(data.transportFanSpeed);
        setOperator(data.operator_sign);
        setOperatorDate(data.operator_submitted_on);
        setSupervisor(data.supervisor_sign);
        setSupervisorDate(data.supervisor_submit_on);
        setHod(data.hod_sign);
        setHodDate(data.hod_submit_on);
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${data.supervisor_sign}`,
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
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${data.hod_sign}`,
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
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${data.operator_sign}`,
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
            navigate("/Precot/Spunlace/F-13/Summary");
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
            navigate("/Precot/Spunlace/F-13/Summary");
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };

  // console.loglog("edit........", editResponse?.supervisor_sign);
  // console.loglog("edit........", editResponse?.supervisor_status);

  // const approval = () => {
  //   if ((roleauth == "ROLE_HOD" && (editResponse?.operator_status !== "OPERATOR_APPROVED" || editResponse?.supervisor_status === "WAITING_FOR_APPROVAL" ||
  //     editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||  editResponse?.hod_status === "HOD_REJECTED")
  //     )) {
  //     message.warning("Operator Not Yet Approved");
  //     setTimeout(() => {
  //       navigate('/Precot/Spunlace/F-13/Summary');
  //     }, 1500)
  //   }
  // }

  const approval = () => {
    if (roleauth === "ROLE_SUPERVISOR") {
      if (
        editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
        editResponse?.hod_status === "HOD_REJECTED"
      ) {
        message.warning("Operator Not Yet Approved or Previous Stage Rejected");
        setTimeout(() => {
          navigate("/Precot/Spunlace/F-13/Summary");
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
          navigate("/Precot/Spunlace/F-13/Summary");
        }, 1500);
      }
    }
  };

  //  else if (roleauth === "ROLE_OPERATOR") {
  //   // Operator should be able to edit and resubmit if any rejection occurs.
  //   if (
  //     editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
  //     editResponse?.hod_status === "HOD_REJECTED"
  //   ) {
  //     message.info("You can edit and resubmit the form.");
  //     // Optionally, navigate to the form page for editing.
  //     setTimeout(() => {
  //       navigate('/Precot/Spunlace/F-13/Edit'); // Replace with the correct route
  //     }, 1500);
  //   }
  // else if (
  //   editResponse?.operator_status === "OPERATOR_APPROVED" &&
  //   editResponse?.supervisor_status === "SUPERVISOR_APPROVED" &&
  //   editResponse?.hod_status === "HOD_APPROVED"
  // ) {
  //   message.success("All approvals are complete.");
  //   // You can redirect to a final summary or another page.
  //   setTimeout(() => {
  //     navigate('/Precot/Spunlace/F-13/Summary');
  //   }, 1500);
  // }
  // }

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
        // editResponse?.supervisor_status == "SUPERVISOR_APPROVED" || "SUPERVISOR_REJECTED" &&
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
        // emptyarraycheck == 0
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

  const [getImage1, setGetImage1] = useState("");

  const [getImage2, setGetImage2] = useState("");

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationRpBalePress/approveOrReject`,
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
        navigate("/Precot/Spunlace/F-13/Summary");
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
        `${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationRpBalePress/approveOrReject`,
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
        navigate("/Precot/Spunlace/F-13/Summary");
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
      formatName: "Process Setup Verification - RP Bale Press",
      formatNo: "PH-PRD02/F-012",
      revisionNo: 1,
      refSopNo: "PH-PRD02-D-03",
      unit: "H",
      date: date1,
      shift: state.shift,
      orderNo: state.orderNo,
      twistWithNeedles: twistWithNeedles,
      twistWithoutNeedles: twistWithoutNeedles,
      // actualNoOftwist: actualNoOftwist,
      lenOfBales: lenOfBales,
      actualLenOfBales: actualLenOfBales,
      pressurePressPlate: pressurePressPlate,
      pressureCompensator: pressureCompensator,
      dePressurizedPressPlate: dePressurizedPressPlate,
      timeOutMotor: timeOutMotor,
      odtFillLevel: odtFillLevel,
      odtHighLevel: odtHighLevel,
      // beaterSpeed: beaterSpeed,
      // feedRollerSpeed: feedRollerSpeed,
      // transportFanSpeed: transportFanSpeed,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationRpBalePress/SaveProcessSetupVerificationRpBalePress`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully Saved");
        navigate("/Precot/Spunlace/F-13/Summary");
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
      twistWithNeedles &&
      twistWithoutNeedles &&
      actualNoOftwist &&
      lenOfBales &&
      // actualLenOfBales &&
      pressurePressPlate &&
      pressureCompensator &&
      dePressurizedPressPlate &&
      timeOutMotor &&
      odtFillLevel &&
      odtHighLevel
    );
  };

  const handleSubmit = () => {
    // if (!isFormValid()) {
    //   message.error("Please fill all required fields.");
    //   return;
    // }
    // setShift(state.shift);
    // setOrderNo(state.orderNo);

    setSubmitLoading(true);
    const payload = {
      processId: processId || "",
      formatName: "Process Setup Verification - RP Bale Press",
      formatNo: "PH-PRD02/F-012",
      revisionNo: 1,
      refSopNo: "PH-PRD02-D-03",
      unit: "H",
      date: date1,
      shift: state.shift,
      orderNo: state.orderNo,
      twistWithNeedles: twistWithNeedles,
      twistWithoutNeedles: twistWithoutNeedles,
      actualNoOftwist: actualNoOftwist,
      lenOfBales: lenOfBales,
      actualLenOfBales: actualLenOfBales,
      pressurePressPlate: pressurePressPlate,
      pressureCompensator: pressureCompensator,
      dePressurizedPressPlate: dePressurizedPressPlate,
      timeOutMotor: timeOutMotor,
      odtFillLevel: odtFillLevel,
      odtHighLevel: odtHighLevel,
      // beaterSpeed: beaterSpeed,
      // feedRollerSpeed: feedRollerSpeed,
      // transportFanSpeed: transportFanSpeed,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationRpBalePress/SubmitProcessSetupVerificationRpBalePress`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully submitted");
        navigate("/Precot/Spunlace/F-13/Summary");
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
                Set Parameters
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                Number of twists with Needles
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                2 to 16
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Nos
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={twistWithNeedles}
                  onBlur={handleTwistWithNeedles}
                  onInput={handleChangeTwistWithNeedles}
                  onChange={handleChangeTwistWithNeedles}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                Number of twists without Needles
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                2 to 16
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Nos
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={twistWithoutNeedles}
                  onBlur={handleTwistWithoutNeedles}
                  onInput={handleChangeTwistWithoutNeedles}
                  onChange={handleChangeTwistWithoutNeedles}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            {/* <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                Actual No of Twist
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                0 to 10
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Nos
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={actualNoOftwist}
                  onBlur={handleActualNoOfTwist}
                  onInput={handleChangeActualNoOfTwist}
                  onChange={handleChangeActualNoOfTwist}
                  disabled={!isEditable}
                />
              </th>
            </tr> */}
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                Length of Bale
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                50 to 300
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                cm
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={lenOfBales}
                  onBlur={handleLenghtOfBale}
                  onInput={handleChangeLenOfBales}
                  onChange={handleChangeLenOfBales}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            {/* <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                Actual Length of Bales
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                45 to 65
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                cm
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={actualLenOfBales}
                  onBlur={handleActualLengthOfBales}
                  onInput={handleChangeActualLenOfBales}
                  onChange={handleChangeActualLenOfBales}
                  disabled={!isEditable}
                />
              </th>
            </tr> */}
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p> SETTINGS PRESS </p>,
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
                Set Parameters
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                Maximum Pressure Press plate
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                50 to 200
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Bar
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={pressurePressPlate}
                  onBlur={handleMaxPressurePressPlate}
                  onInput={handleChangePressurePressPlate}
                  onChange={handleChangePressurePressPlate}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                Maximum Pressure compensator
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                10 to 190
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Bar
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={pressureCompensator}
                  onBlur={handleMaxPressureCompensator}
                  onInput={handleChangePressureCompensator}
                  onChange={handleChangePressureCompensator}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                De-pressurized Pressure Press plate
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                10 to 80
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                Bar
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={dePressurizedPressPlate}
                  onBlur={handleDePressurizedPressPlate}
                  onInput={handleChangeDePressurizedPressPlate}
                  onChange={handleChangeDePressurizedPressPlate}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                Time out Motor
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                2 to 90
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                min
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={timeOutMotor}
                  onBlur={handleTimeOutMotor}
                  onInput={handleChangeTimeOutMotor}
                  onChange={handleChangeTimeOutMotor}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                ODT photo electric switch fill level
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                1 to 30
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                sec
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={odtFillLevel}
                  onBlur={handleOdtFillLevel}
                  onInput={handleChangeOdtFillLevel}
                  onChange={handleChangeOdtFillLevel}
                  disabled={!isEditable}
                />
              </th>
            </tr>
            <tr>
              <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
                ODT photo electric switch high level
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                1 to 30
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                sec
              </th>
              <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
                <input
                  className="inp-new"
                  value={odtHighLevel}
                  onBlur={handleOdtHighLevel}
                  onInput={handleChangeOdtHighLevel}
                  onChange={handleChangeOdtHighLevel}
                  disabled={!isEditable}
                />
              </th>
            </tr>
          </table>
        </div>
      ),
    },
    // {
    //   key: "3",
    //   label: <p> HOPPER SETTING </p>,
    //   children: (
    //     <div>
    //       <table
    //         align="left"
    //         style={{ width: "50%", margin: "auto" }}
    //         pagpagination={{ pageSize: 5 }}
    //       >
    //         <tr>
    //           <th colSpan={60} style={{ height: "35px", textAlign: "center" }}>
    //             Descriptions{" "}
    //           </th>
    //           <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
    //             Standards
    //           </th>
    //           <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
    //             Units
    //           </th>
    //           <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
    //             Set Parameters
    //           </th>
    //         </tr>
    //         <tr>
    //           <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
    //             Beater speed
    //           </th>
    //           <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
    //             1200 to 1500
    //           </th>
    //           <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
    //             RPM
    //           </th>
    //           <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
    //             <input
    //               className="inp-new"
    //               value={beaterSpeed}
    //               onBlur={handleBeaterSpeed}
    //               onInput={handleChangeBeaterSpeed}
    //               onChange={handleChangeBeaterSpeed}
    //               disabled={!isEditable}
    //             />
    //           </th>
    //         </tr>
    //         <tr>
    //           <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
    //             Feed roller speed
    //           </th>
    //           <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
    //             1000 to 1600
    //           </th>
    //           <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
    //             RPM
    //           </th>
    //           <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
    //             <input
    //               className="inp-new"
    //               value={feedRollerSpeed}
    //               onBlur={handleFeedRollerSpeed}
    //               onInput={handleChangeFeedRollerSpeed}
    //               onChange={handleChangeFeedRollerSpeed}
    //               disabled={!isEditable}
    //             />
    //           </th>
    //         </tr>
    //         <tr>
    //           <th colSpan={60} style={{ height: "35px", textAlign: "left" }}>
    //             Transport fan speed{" "}
    //           </th>
    //           <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
    //             2600 to 3100
    //           </th>
    //           <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
    //             RPM
    //           </th>
    //           <th colSpan={20} style={{ height: "35px", textAlign: "center" }}>
    //             <input
    //               className="inp-new"
    //               value={transportFanSpeed}
    //               onBlur={handleTransportFanSpeed}
    //               onInput={handleChangeTransportFanSpeed}
    //               onChange={handleChangeTransportFanSpeed}
    //               disabled={!isEditable}
    //             />
    //           </th>
    //         </tr>
    //       </table>
    //     </div>
    //   ),
    // },
    {
      key: "4",
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
                {editResponse?.operator_status == "OPERATOR_APPROVED" &&
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
                {/* {(editResponse?.supervisor_status === "SUPERVISOR_APPROVED" ||
                    editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
                   
                    editResponse?.hod_status === "HOD_APPROVED" ||
                    editResponse?.hod_status === "HOD_REJECTED" 
                   ) &&
                  getImage && ( */}
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
        formName="PROCESS SETUP VERIFICATION - RP BALE PRESS"
        formatNo="PH-PRD02/F-012"
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

export default Spunlace_f13;
