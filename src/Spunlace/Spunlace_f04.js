/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Input,
  Row,
  Tabs,
  Select,
  Form,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
  TimePicker,
  Modal,
} from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import jwtDecode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../baseUrl.json";
import { BiLock } from "react-icons/bi";
import { IoMdPrint } from "react-icons/io";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaBackward, FaUserCircle } from "react-icons/fa";
import { IoCaretBackCircleSharp } from "react-icons/io5";
import moment from "moment";
import logo from "../Assests/logo.png";
import { GoArrowLeft } from "react-icons/go";
import gif from "../Assests/gif.gif";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock, FaTrash } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import TextArea from "antd/es/input/TextArea.js";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

const Spunlace_f04 = () => {
  const formatName = "Filter Bag Consumption Details";
  const formatNo = "PH-PRD02/F-004";
  const revisionNo = "01";
  const sopNo = "PH-PRD02-D-03";
  const unit = "Unit H";

  const navigate = useNavigate();
  const { state } = useLocation();

  const token = localStorage.getItem("token");
  // const decodedToken = jwtDecode(token);
  // const userRole = decodedToken.role;
  const userName = localStorage.getItem("username");

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [gotobtn, setGotobtn] = useState(true);
  const [summary, setSummary] = useState();

  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  // const [printBtnStatus, setPrintBtnStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const [newDate, setNewDate] = useState("");
  const [shift, setShift] = useState("");
  const [newData, setNewData] = useState("");
  const [filterId, setFilterId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [editable, setEditable] = useState(false);
  const [details, setRows] = useState([
    { time: "", f1: 0, f2: 0, f3: 0, f4: 0, noOfBags: 0 },
  ]);

  const [formData, setFormData] = useState({
    date: "",
    shift: "",
    time: "",
    f1: "",
    f2: "",
    f3: "",
    f4: "",
    bagsChanged: "",
    changedBy: "",
    verifiedBy: "",
    hodDesignee: "",
  });

  const [time, setTime] = useState(null);

  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");

  const { confirm } = Modal;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = newData?.operator_sign;
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
  }, [newData,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = newData?.supervisor_sign;
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
  }, [newData,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = newData?.hod_sign;
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
          setGetImage3(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [newData,API.prodUrl, token]);

  let formattedOperatorDate;
  if (newData.operator_submit_on) {
    formattedOperatorDate = moment(newData.operator_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedOperatorDate = ""; // Or any other default value or error handling
  }
  let formattedSupervisorDate;
  if (newData.supervisor_submit_on) {
    formattedSupervisorDate = moment(newData.supervisor_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedSupervisorDate = ""; // Or any other default value or error handling
  }
  let formattedHODDate;
  if (newData.hod_submit_on) {
    formattedHODDate = moment(newData.hod_submit_on).format("DD/MM/YYYY HH:mm");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedHODDate = ""; // Or any other default value or error handling
  }

  const roleauth = localStorage.getItem("role");

  useEffect(() => {
    const currentTime = moment();
    setTime(currentTime);
  }, []);

  useEffect(() => {
    const { date, shiftvalue } = state || {};

    setNewDate(date);
    setShift(shiftvalue);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(
        `${API.prodUrl}/Precot/api/spunlace/Service/FilterConsumptionDetails/getByDateAndShift`,
        {
          headers,
          params: {
            date: date,
            shift: shiftvalue,
          },
        }
      )
      .then((response) => {
        // console.log(" Response ", response.data);
        if (response.data.message === "No data") {
          // console.log("No Data");
          if (
            localStorage.getItem("role") == "ROLE_OPERATOR" &&
            response.data.message == "No data"
          ) {
            setSaveBtnStatus(true);
            setSubmitBtnStatus(true);
          }
        } else {
          setNewData(response.data);
          setRows(response.data.details);
          setFilterId(response.data.filterId);
          // console.log("Details", details);
          // console.log("New Data", response.data[0]);
          // console.log("Hod ", response.data.hod_status);
          // console.log("supervisor", response.data.supervisor_status);
          // console.log("Operator ", response.data.operator_status);
          if (
            ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
              response.data.supervisor_status !== "SUPERVISOR_APPROVED") ||
            ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
              response.data.hod_status == "HOD_REJECTED")
          ) {
            message.error("Not Yet Supervisor Approved");
            setTimeout(() => {
              navigate("/Precot/Spunlace/F-04/Summary");
            }, 1500);
          }
          if (
            (roleauth == "ROLE_SUPERVISOR" &&
              response.data.operator_status !== "OPERATOR_APPROVED") ||
            (roleauth == "ROLE_SUPERVISOR" &&
              (response.data.supervisor_status == "SUPERVISOR_REJECTED" ||
                response.data.hod_status == "HOD_REJECTED"))
          ) {
            message.error("Not Yet Operator Approved");
            setTimeout(() => {
              navigate("/Precot/Spunlace/F-04/Summary");
            }, 1500);
          }

          if (
            roleauth == "ROLE_OPERATOR" &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "WAITING_FOR_APPROVAL" &&
            response.data.hod_status == ""
          ) {
            setSaveBtnStatus(false);
            setSubmitBtnStatus(false);
            setDisable(true); // Disable for Operator
          } else if (
            roleauth == "ROLE_OPERATOR" &&
            response.data.operator_status == "OPERATOR_SAVED" &&
            (response.data.supervisor_status == "" ||
              response.data.supervisor_status == null) &&
            (response.data.hod_status == "" || response.data.hod_status == null)
          ) {
            setSaveBtnStatus(true);
            setSubmitBtnStatus(true);
            setDisable(false); // Disable for Operator
          } else if (
            roleauth == "ROLE_SUPERVISOR" &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "WAITING_FOR_APPROVAL" &&
            response.data.hod_status == ""
          ) {
            setSaveBtnStatus(true);
            setSubmitBtnStatus(true);
            setDisable(true); // Enable for Supervisor
          } else if (
            roleauth == "ROLE_HOD" &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "WAITING_FOR_APPROVAL" &&
            response.data.hod_status == ""
          ) {
            setSaveBtnStatus(false);
            setSubmitBtnStatus(false);
            setDisable(true); // Disable for HOD
          } else if (
            roleauth == "ROLE_OPERATOR" &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "SUPERVISOR_REJECTED" &&
            response.data.hod_status == ""
          ) {
            setSaveBtnStatus(true);
            setSubmitBtnStatus(true);
            setDisable(false); // Enable for Operator
          } else if (
            roleauth == "ROLE_SUPERVISOR" &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "SUPERVISOR_REJECTED" &&
            response.data.hod_status == ""
          ) {
            setSaveBtnStatus(false);
            setSubmitBtnStatus(false);
            setDisable(true); // Disable for Supervisor
          } else if (
            roleauth == "ROLE_HOD" &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "SUPERVISOR_REJECTED" &&
            response.data.hod_status == ""
          ) {
            setSaveBtnStatus(false);
            setSubmitBtnStatus(false);
            setDisable(true); // Disable for HOD
          } else if (
            roleauth == "ROLE_OPERATOR" &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "SUPERVISOR_APPROVED" &&
            response.data.hod_status == "WAITING_FOR_APPROVAL"
          ) {
            setSaveBtnStatus(false);
            setSubmitBtnStatus(false);
            setDisable(true); // Disable for Operator
          } else if (
            roleauth == "ROLE_SUPERVISOR" &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "SUPERVISOR_APPROVED" &&
            response.data.hod_status == "WAITING_FOR_APPROVAL"
          ) {
            setSaveBtnStatus(false);
            setSubmitBtnStatus(false);
            setDisable(true); // Disable for Supervisor
          } else if (
            roleauth == "ROLE_OPERATOR" &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "SUPERVISOR_APPROVED" &&
            response.data.hod_status == "HOD_REJECTED"
          ) {
            // setSaveBtnStatus(false);
            setSubmitBtnStatus(true);
            setDisable(false); // Disable for Operator
          } else if (
            roleauth == "ROLE_SUPERVISOR" &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "SUPERVISOR_APPROVED" &&
            response.data.hod_status == "HOD_REJECTED"
          ) {
            setSaveBtnStatus(false);
            setSubmitBtnStatus(false);
            setDisable(true); // Disable for Supervisor
          } else if (
            (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "SUPERVISOR_APPROVED" &&
            response.data.hod_status == "WAITING_FOR_APPROVAL"
          ) {
            setSaveBtnStatus(true);
            setSubmitBtnStatus(true);
            setDisable(true); // Enable for HOD/Designee
          } else if (
            (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "SUPERVISOR_APPROVED" &&
            response.data.hod_status == "HOD_REJECTED"
          ) {
            // setSaveBtnStatus(true);
            setSubmitBtnStatus(false);
            setDisable(true); // Enable for HOD/Designee
          } else if (
            (roleauth == "ROLE_HOD" ||
              roleauth == "ROLE_DESIGNEE" ||
              roleauth == "ROLE_SUPERVISOR" ||
              roleauth == "ROLE_OPERATOR") &&
            response.data.operator_status == "OPERATOR_APPROVED" &&
            response.data.supervisor_status == "SUPERVISOR_APPROVED" &&
            response.data.hod_status == "HOD_APPROVED"
          ) {
            // setSaveBtnStatus(true);
            setSubmitBtnStatus(false);
            setDisable(true); // Enable for HOD/Designee
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // navigate("/Precot/Spunlace/F-04/Summary");
      });
  }, [state]);

  const formattedDate = moment(newDate).format("DD/MM/YYYY");

  const handleBack = () => {
    navigate("/Precot/Spunlace/F-04/Summary");
  };

  const handleSubmit = () => {
    setSubmitLoading(true);
    const validateDetails = (details) => {
      return details.filter((detail) => {
        // Check if at least one field in the row has a value
        const hasAtLeastOneValue = detail.time.trim() !== "";

        if (!hasAtLeastOneValue) {
          return false; // Exclude row from saving
        }

        return true; // Include row for saving
      });
    };

    const validatedDetails = validateDetails(details);

    // Ensure that there is at least one valid row
    if (validatedDetails.length === 0) {
      message.warning("At least one row must have a valid value.");
      setSubmitLoading(false); // Reset loading state
      return; // Stop execution if validation fails
    }

    const payload = {
      filterId: filterId,
      formatName: formatName,
      formatNo: formatNo,
      revisionNo: revisionNo,
      refSopNo: sopNo,
      unit: unit,
      date: newDate,
      shift: shift,
      details: validatedDetails.map((detail) => ({
        time: detail.time,
        f1: detail.f1 || 0,
        f2: detail.f2 || 0,
        f3: detail.f3 || 0,
        f4: detail.f4 || 0,
        noOfBags: detail.noOfBags || 0,
      })),
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/Service/FilterConsumptionDetails/SubmitFilterConsumptionDetails`,
        payload,
        { headers }
      )
      .then((response) => {
        message.success(response.data.message);
        setSubmitLoading(false);
        setTimeout(() => {
          navigate("/Precot/Spunlace/F-04/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSubmitLoading(false);
      });
  };

  const handleSave = () => {
    const validatedDetails = details.filter((detail) => {
      if (detail.time == "" || detail.time.trim() == "") {
        return false; // Exclude row from saving
      }
      return true; // Include row for saving
    });

    setSaveLoading(true);
    const payload = {
      filterId: filterId,
      formatName: formatName,
      formatNo: formatNo,
      revisionNo: revisionNo,
      refSopNo: sopNo,
      unit: unit,
      date: newDate,
      shift: shift,
      details: validatedDetails.map((detail) => ({
        time: detail.time,
        f1: detail.f1 || 0,
        f2: detail.f2 || 0,
        f3: detail.f3 || 0,
        f4: detail.f4 || 0,
        noOfBags: detail.noOfBags || 0,
      })),
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/spunlace/Service/FilterConsumptionDetails/SaveFilterConsumptionDetails`,
        payload,
        { headers }
      )
      .then((response) => {
        message.success("Filter Bag Consumption Details Save Successfully");
        setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/Spunlace/F-04/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSaveLoading(false);
      });
  };

  const addRow = () => {
    setRows([
      ...details,
      { time: "", f1: 0, f2: 0, f3: 0, f4: 0, noOfBags: 0 },
    ]);
  };

  const handleLogout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      // content: "You will be logged out and redirected to the login page.",
      onOk() {
        localStorage.removeItem("token");
        navigate("/Precot");
      },
      onCancel() {
        // Logic if the user cancels the logout action
      },
    });
  };

  const deleteRow = (rowIndex) => {
    if (rowIndex == 0) {
      message.warning("One Row Mandatory");
      return;
    }
    confirm({
      title: "Are you sure you want to delete this row?",
      // content: "This action cannot be undone.",
      onOk() {
        setRows(details.filter((_, index) => index !== rowIndex));
      },
      onCancel() {
        // You can add any logic here if needed when the cancel button is clicked.
      },
    });
    // setRows(details.filter((_, index) => index !== rowIndex));
  };

  // const handleTimeChange = (time, timeString, rowIndex) => {
  //   const newRows = [...details];
  //   newRows[rowIndex] = {
  //     ...newRows[rowIndex],
  //     time: timeString,
  //   };
  //   setRows(newRows);
  // };

  const handleTimeChange = (time, timeString, rowIndex) => {
    const newRows = [...details];

    // // Validate time sequence
    // if (rowIndex > 0 && time && moment(timeString, "HH:mm").isBefore(moment(details[rowIndex - 1].time, "HH:mm"))) {
    //   message.warning("Time should be later than the previous row.");
    //   return; // Prevent further execution if validation fails
    // }

    newRows[rowIndex] = {
      ...newRows[rowIndex],
      time: timeString,
    };
    setRows(newRows);
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_OPERATOR") {
      if (
        newData &&
        newData.operator_status === "OPERATOR_APPROVED" &&
        newData.hod_status !== "HOD_REJECTED" &&
        newData.supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      } else if (
        newData.operator_status === "OPERATOR_APPROVED" &&
        newData.hod_status !== "WAITING_FOR_APPROVAL" &&
        newData.supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return true; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
      return "block";
    } else if (roleauth == "ROLE_SUPERVISOR") {
      if (
        (newData?.supervisor_status == "SUPERVISOR_APPROVED" ||
          newData?.supervisor_status == "SUPERVISOR_REJECTED") &&
        newData?.hod_status == ""
      ) {
        return "none";
      } else if (
        newData?.supervisor_status == "SUPERVISOR_REJECTED" &&
        newData?.hod_status == "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else if (
        (newData?.supervisor_status == "SUPERVISOR_APPROVED" &&
          newData?.hod_status == "WAITING_FOR_APPROVAL") ||
        newData?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        newData?.hod_status == "HOD_APPROVED" ||
        newData?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        newData?.hod_status == "" &&
        newData?.supervisor_status === "SUPERVISOR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        newData?.hod_status == "HOD_APPROVED" ||
        newData?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_OPERATOR") {
      if (
        newData?.operator_status == "OPERATOR_APPROVED"
        // &&
        // newData?.supervisor_status == "SUPERVISOR_APPROVED" || "SUPERVISOR_REJECTED" &&
        // newData?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        newData?.operator_status == "OPERATOR_APPROVED" &&
        newData?.supervisor_status == "WAITING_FOR_APPROVAL" &&
        (newData?.hod_status == "WAITING_FOR_APPROVAL" ||
          newData?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    }
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        newData?.supervisor_status == "SUPERVISOR_APPROVED" &&
        newData?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        newData?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (newData?.hod_status == "WAITING_FOR_APPROVAL" ||
          newData?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        newData?.hod_status == "HOD_APPROVED" ||
        newData?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        newData?.hod_status == "HOD_APPROVED" ||
        newData?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
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
        `${API.prodUrl}/Precot/api/spunlace/Service/FilterConsumptionDetails/approveOrReject`,
        {
          id: filterId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-04/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setSaveLoading(true);

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
        `${API.prodUrl}/Precot/api/spunlace/Service/FilterConsumptionDetails/approveOrReject`,
        {
          id: filterId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-04/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleKeyDown = (e) => {
    if (
      ["e", "E", "+", "-"].includes(e.key) ||
      (e.target.value.length >= 3 && e.key !== "Backspace")
    ) {
      e.preventDefault();
    }
    if (e.target.value.length >= 2 && e.key !== "Backspace") {
      e.preventDefault();
    }
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...details];

    // // Validate input to allow only numbers in the range 0-99
    // if (/^\d{0,2}$/.test(value)) {
    //   const numericValue = value === "" ? "" : parseInt(value, 10); // Convert to integer
    //   if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 99) {
    //     newRows[index][name] = value; // Update the value if it's a valid two-digit number
    //   }
    // }
    // Validate input to allow only numbers in the range 0-99
    if (/^\d{0,2}$|^N\/A$/i.test(value)) {
      const numericValue = value === "" ? "" : parseInt(value, 10); // Convert to integer
      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 99) {
        newRows[index][name] = value; // Update the value if it's a valid two-digit number
      }
    } else if (value === " ") {
      newRows[index][name] = "N/A"; // Handle empty values by setting to 'N/A'
    }
    // Ensure the time field is mandatory
    if (!newRows[index].time) {
      message.warning("Time field is mandatory");
      return;
    }
    // Calculate the sum of f1, f2, f3, f4 and set it to bagsChanged
    const sum = ["f1", "f2", "f3", "f4"].reduce(
      (acc, key) => acc + (parseInt(newRows[index][key]) || 0),
      0
    );
    newRows[index].noOfBags = sum;

    setRows(newRows);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   const newRows = [...rows];
  //   if (name === "f1" || name === "f2" || name === "f3" || name === "f4") {
  //     if (/^(\d{1,2}|99)$/.test(value) || value === "") {
  //       setFormData((prevData) => {
  //         const updatedData = {
  //           ...prevData,
  //           [name]: value === "" ? "N/A" : value
  //         };
  //         const { f1, f2, f3, f4 } = updatedData;
  //         const allNA = [f1, f2, f3, f4].every(val => val === "N/A");
  //         updatedData.bagsChanged = allNA ? 0 : Number(f1 || 0) + Number(f2 || 0) + Number(f3 || 0) + Number(f4 || 0);
  //         return updatedData;
  //       });
  //     }
  //   } else {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value
  //     }));
  //   }
  // };

  const items = [
    {
      key: "1",
      label: (
        <p>
          <b>Consumption Details</b>
        </p>
      ),
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "95%",
            }}
          >
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "50px",
                    width: "50px",
                  }}
                >
                  S.No
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Time
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  F-1
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  F-2
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  F-3
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  F-4
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  No Of Bags Changed
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {details.map((row, index) => (
                <tr key={index}>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {/* <TimePicker format="HH:mm"  onChange={handleTimeChange} />
                     */}
                    <TimePicker
                      format="HH:mm"
                      value={row.time ? moment(row.time, "HH:mm") : null}
                      disabled={disable}
                      onChange={(time, timeString) =>
                        handleTimeChange(time, timeString, index)
                      }
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="f1"
                      type="number"
                      onKeyDown={handleKeyDown}
                      value={row.f1}
                      disabled={disable}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="f2"
                      value={row.f2}
                      disabled={disable}
                      type="number"
                      onKeyDown={handleKeyDown}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="f3"
                      value={row.f3}
                      disabled={disable}
                      type="number"
                      onKeyDown={handleKeyDown}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      name="f4"
                      value={row.f4}
                      disabled={disable}
                      type="number"
                      onKeyDown={handleKeyDown}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <Input
                      style={{ fontWeight: "bold" }}
                      name="noOfBags"
                      value={row.noOfBags}
                      disabled={disable}
                      onBlur={() => setEditable(false)}
                      onFocus={() => setEditable(true)}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      minWidth: "50px",
                      width: "50px",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      danger
                      icon={<FaTrash style={{ fontSize: "10px" }} />}
                      onClick={() => deleteRow(index)}
                      // disabled={!isEditable}
                      disabled={disable}
                      style={{
                        padding: "2px 4px",
                        fontSize: "10px",
                        lineHeight: "12px",
                        height: "24px",
                        width: "auto",
                        minWidth: "auto",
                        backgroundColor: "#ff4d4f",
                        borderColor: "#ff4d4f",
                      }}
                    >
                      Delete
                    </Button>
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
            disabled={disable}
            // disabled={!isEditable}
            onClick={addRow}
            icon={
              <AiOutlinePlus style={{ color: "#00308F", marginRight: "1px" }} />
            }
          >
            Add Row
          </Button>
        </div>
      ),
    },
    {
      key: "2",
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
                <b>Operator Changed by Sign & Date</b>
              </td>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                <b>Verified by Prod. Supervisor Sign & Date</b>
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <b>HOD / Designee Sign & Date</b>
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
                {newData?.operator_status === "OPERATOR_APPROVED" && (
                  <>
                    {newData && newData.operator_sign}
                    <br />
                    {formattedOperatorDate}
                    <br />
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Operator"
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
                {(newData?.supervisor_status === "SUPERVISOR_REJECTED" ||
                  newData?.supervisor_status === "SUPERVISOR_APPROVED") && (
                  <>
                    {newData && newData.supervisor_sign}
                    <br></br>
                    {formattedSupervisorDate}
                    <br />
                    {getImage2 && (
                      <img
                        className="signature"
                        src={getImage2}
                        alt="Superviosr Sign"
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
                {(newData?.hod_status === "HOD_REJECTED" ||
                  newData?.hod_status === "HOD_APPROVED") && (
                  <>
                    {newData && newData.hod_sign}
                    <br></br>
                    {formattedHODDate}
                    <br />
                    {getImage3 && (
                      <img className="signature" src={getImage3} alt="HOD" />
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
                  // display: canDisplayButtons(),
                  display: submitBtnStatus ? "block" : "none",
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
                  // display: canDisplayButtons(),
                  display: submitBtnStatus ? "block" : "none",
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
                  // display: canDisplayButtons(),
                  display: submitBtnStatus ? "block" : "none",
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
          // <Button
          //   type="primary"
          //   style={{
          //     backgroundColor: "#E5EEF9",
          //     color: "#00308F",
          //     fontWeight: "bold",
          //   }}
          //   shape="round"
          //   icon={<BiLock color="#00308F" />}
          //   onClick={() => {
          //     if (confirm("Are you sure want to logout")) {
          //       localStorage.removeItem("token");
          //       navigate("/Precot");
          //     }
          //   }}
          // >
          //   Logout
          // </Button>,
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
      <Form
        layout="horizontal"
        style={{ display: "flex", alignItems: "center", gap: "20px" }}
      >
        <Form.Item label="Date" style={{ marginBottom: 0 }}>
          <p style={{ margin: 0 }}>{newDate}</p>
        </Form.Item>
        <Form.Item label="Shift" style={{ marginBottom: 0 }}>
          <p style={{ margin: 0 }}>{shift}</p>
        </Form.Item>
      </Form>
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

export default Spunlace_f04;
