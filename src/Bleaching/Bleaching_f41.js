/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Input,
  Row,
  Tabs,
  message,
  Select,
  Form,
  Menu,
  Avatar,
  Drawer,
  Modal,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader";
import API from "../baseUrl.json";
import { Tooltip } from "antd";
import { FaUserCircle } from "react-icons/fa";
import {
  IoPrint,
  IoSave,
  IoLockClosedOutline,
  IoCreate,
} from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { GrDocumentStore } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import { FaTrash } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;
const Bleaching_f41 = (props) => {
  const [formatNo, setFormatNo] = useState("");
  const [revisionNo, setRevisionNo] = useState("");
  const [sopNo, setSopNo] = useState("");
  const [pageNo, setPageNo] = useState("");
  const [cakingData, setCakingData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [date, setDate] = useState("");
  const [shiftSelections, setShiftSelections] = useState("");
  const [dataExists, setDataExists] = useState(false);
  const [searchDate, setSearchDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [apiData, setApiData] = useState({});
  const [hodStatus, setHodStatus] = useState("");
  const [isHODApproved, setIsHODApproved] = useState(false);
  const [isHODLoggedIn, setIsHODLoggedIn] = useState(false);
  const [supervisorStatus, setSupervisorStatus] = useState();
  const [supervisorSavedOn, setSupervisorSavedOn] = useState("");
  const [supervisorSavedBy, setSupervisorSavedBy] = useState("");
  const [supervisorSavedId, setSupervisorSavedId] = useState("");
  const [supervisorSubmitOn, setSupervisorSubmitOn] = useState("");
  const [supervisorSubmitBy, setSupervisorSubmitBy] = useState("");
  const [supervisorSubmitId, setSupervisorSubmitId] = useState("");
  const [idNumberLov, setIdNumberLov] = useState([]);
  const [supervisorSign, setSupervisorSign] = useState("");
  const [hodSavedOn, setHodSavedOn] = useState("");
  const [hodSavedBy, setHodSavedBy] = useState("");
  const [hodSavedId, setHodSavedId] = useState("");
  const [hodSubmitOn, setHodSubmitOn] = useState("");
  const [hodSubmitBy, setHodSubmitBy] = useState("");
  const [hodSubmitId, setHodSubmitId] = useState("");
  const [hodSign, setHodSign] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [shift, setShift] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [rows, setRows] = useState([{}]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [handSanitizationId, sethandSanitizationId] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const handleRowSelect = (rowIndex) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowIndex)) {
        // If row is already selected, unselect it
        return prevSelectedRows.filter((index) => index !== rowIndex);
      } else {
        // Otherwise, add it to the selected rows
        return [...prevSelectedRows, rowIndex];
      }
    });
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const addRow = () => {
    setRows([...rows, {}]);
    setIdNumbers([...idNumbers, ""]);
    setHourSelections([...hourSelections, Array(8).fill("")]);
    setRemarks([...remarks, ""]);
  };

  const roleauth = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [getImage, setGetImage] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = apiData?.supervisor_sign;
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
  }, [apiData,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API.prodUrl}/Precot/api/bleaching/generation/fetchHandSanitationIdNumbers?department=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log("Response LOV:", res.data);
        setIdNumberLov(res.data);
      })
      .catch((err) => {
        // console.log("Error in fetching image:", err);
      });
  }, [apiData,API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = apiData?.hod_sign;
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
  }, [apiData,API.prodUrl, token]);
  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        apiData?.supervisor_status == "SUPERVISOR_APPROVED" &&
        apiData?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (apiData?.supervisor_status == "SUPERVISOR_APPROVED" &&
          apiData?.hod_status == "WAITING_FOR_APPROVAL") ||
        apiData?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        apiData?.hod_status == "HOD_APPROVED" ||
        apiData?.hod_status == "HOD_REJECTED"
        // emptyarraycheck == 0
      ) {
        return "none";
      }
      if (apiData === "No Data") {
        return "none";
      }
      return "block";
    } else {
      if (
        apiData?.hod_status == "HOD_APPROVED" ||
        apiData?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        apiData?.supervisor_status == "SUPERVISOR_APPROVED" &&
        apiData?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        apiData?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (apiData?.hod_status == "WAITING_FOR_APPROVAL" ||
          apiData?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        apiData?.hod_status == "HOD_APPROVED" ||
        apiData?.hod_status == "HOD_REJECTED"
        // emptyarraycheck == 0
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        apiData?.hod_status == "HOD_APPROVED" ||
        apiData?.hod_status == "HOD_REJECTED"
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
        `${API.prodUrl}/Precot/api/bleaching/Service/approveOrRejectF41`,
        {
          id: handSanitizationId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-41/Summary");
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
        `${API.prodUrl}/Precot/api/bleaching/Service/approveOrRejectF41`,
        {
          id: handSanitizationId,
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
        navigate("/Precot/Bleaching/F-41/Summary");
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

  const { state } = useLocation();
  const [availableShifts, setAvailableShifts] = useState([]);
  const [idNumbers, setIdNumbers] = useState(Array(1).fill(""));
  const [remarks, setRemarks] = useState(Array(1).fill(""));
  const navigate = useNavigate();
  // const [hourSelections, setHourSelections] = useState( Array(8).fill(Array(8).fill("")) );
  const [hourSelections, setHourSelections] = useState(
    Array(rows.length).fill(Array(8).fill(""))
  );

  const handleCheckboxChange = (rowIndex, hourIndex, value) => {
    const updatedSelections = hourSelections.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return row.map((selection, hIndex) =>
          hIndex === hourIndex ? value : selection
        );
      }
      return row;
    });
    setHourSelections(updatedSelections);
  };
  const shouldShowSaveAndSubmitButtons = () => {
    return !(
      apiData?.supervisor_status === "SUPERVISOR_APPROVED" ||
      isHODApproved ||
      isHODLoggedIn
    );
  };

  const shouldShowPrintButton = () => {
    return (
      apiData?.supervisor_status === "SUPERVISOR_APPROVED" && !isHODApproved
    );
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsHODLoggedIn(role === "ROLE_HOD" || role === "ROLE_DESIGNEE");

    setIsHODApproved();
  }, []);

  let formattedSupervisorDate;
  if (supervisorSubmitOn) {
    formattedSupervisorDate =
      moment(supervisorSubmitOn).format("DD/MM/YYYY HH:mm");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedSupervisorDate = ""; // Or any other default value or error handling
  }
  let formattedHODDate;
  if (hodSubmitOn) {
    formattedHODDate = moment(hodSubmitOn).format("DD/MM/YYYY HH:mm");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedHODDate = ""; // Or any other default value or error handling
  }

  const handlePrint = () => {
    window.print();
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("Shift details fetched:", res.data);
        const shifts = res.data.map((shift) => shift.value);
        setAvailableShifts(shifts);
      })
      .catch((err) => {
        // console.log("Error fetching shifts:", err);
      });
  }, []);
  // const handleIdChange = (rowIndex, value) => {
  //   {
  //     const updatedIds = idNumbers.map((id, index) =>
  //       index === rowIndex ? value : id
  //     );
  //     setIdNumbers(updatedIds);
  //   }
  // };

  // const handleIdChange = (rowIndex, value) => {
  //   setIdNumbers((prevState) => ({
  //     ...prevState,
  //     [rowIndex]: value,
  //   }));
  // };

  // const handleInputChange = (inputValue, rowIndex) => {
  //   setIdNumbers((prevState) => ({
  //     ...prevState,
  //     [rowIndex]: inputValue,
  //   }));
  // };

  // const handleInputKeyDown = (e, rowIndex) => {
  //   const isPrintableKey = e.key.length == 1 && e.key !== "Backspace";
  //   if (isPrintableKey) {
  //     const newValue = e.target.value + e.key;
  //     handleInputChange(newValue, rowIndex);
  //   }
  // };

  const handleIdChange = (rowIndex, value) => {
    setIdNumbers((prevIdNumbers) => {
      const updatedIdNumbers = [...prevIdNumbers];
      updatedIdNumbers[rowIndex] = value;
      return updatedIdNumbers;
    });
  };

  const handleInputChange = (inputValue, rowIndex) => {
    setIdNumbers((prevState) => ({
      ...prevState,
      [rowIndex]: inputValue,
    }));
  };

  const handleInputKeyDown = (e, rowIndex) => {
    const isPrintableKey = e.key.length === 1 && e.key !== "Backspace";
    if (isPrintableKey) {
      const newValue = e.target.value + e.key;
      handleIdChange(rowIndex, newValue);
    }
  };

  useEffect(() => {
    console.log("ID Numbers", idNumbers);
  }, [idNumbers]);

  const handleRemarksChange = (rowIndex, value) => {
    const updatedRemarks = remarks.map((remark, index) =>
      index === rowIndex ? value : remark
    );
    setRemarks(updatedRemarks);
  };

  const onChange = (key) => {
    // console.log(key);
  };

  const validateForm = () => {
    // console.log('ID Numbers:', idNumbers);
    // console.log('Hour Selections:', hourSelections);

    if (!idNumbers || idNumbers.length === 0) {
      message.error("At least one ID number is required");
      return false;
    }

    for (let i = 0; i < idNumbers.length; i++) {
      if (!idNumbers[i]) {
        message.error(`ID number is required for row ${i + 1}`);
        return false;
      }

      for (let j = 0; j < 8; j++) {
        // console.log(`Hour selection for row ${i + 1}, ${getHourLabel(j)}:`, hourSelections[i][j]);
        if (hourSelections[i][j] !== "yes" && hourSelections[i][j] !== "no") {
          message.error(
            `Hour selection is required for row ${i + 1}, ${getHourLabel(j)}`
          );
          return false;
        }
      }
    }

    return true;
  };

  const handleSave = async () => {
    setSaveLoading(true);

    if (!validateForm()) {
      setSaveLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      message.error("No token found. Please log in again.");
      return;
    }
    const handSanitizationId =
      props.data && props.data.handSanitizationId
        ? props.data.handSanitizationId
        : null;
    const sanitizedRemarks = remarks.map((remark) =>
      remark.trim() !== "" ? remark : "N/A"
    );
    const payload = {
      unit: "Unit H",
      formatNo: "PRD01/F10",
      formatName: "Bleaching Hand Sanitization Report AB Bale Press Machine",
      revisionNo: "02",
      sopNumber: "HRD01-D-05",
      handSanitizationId: handSanitizationId,
      date: newDate,
      status: "DRAFT",
      approverStatus: "PENDING",
      shift: shift, // Updated to send a string instead of an array
      verifiedBy: null,
      reviewedBy: null,
      sanitizationList: hourSelections.map((row, rowIndex) => ({
        serialNumber: rowIndex + 1,
        idNumber: idNumbers[rowIndex],
        hour1: row[0] === "yes" ? "Y" : "N",
        hour2: row[1] === "yes" ? "Y" : "N",
        hour3: row[2] === "yes" ? "Y" : "N",
        hour4: row[3] === "yes" ? "Y" : "N",
        hour5: row[4] === "yes" ? "Y" : "N",
        hour6: row[5] === "yes" ? "Y" : "N",
        hour7: row[6] === "yes" ? "Y" : "N",
        hour8: row[7] === "yes" ? "Y" : "N",
        remarks: sanitizedRemarks[rowIndex],
      })),
    };
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/bleaching/Service/createHandSanitizationF41`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Form Save successfully");
      setShiftSelections(Array(8).fill(""));
      setIdNumbers(Array(3).fill(""));
      setRemarks(Array(3).fill(""));
      setHourSelections(Array(8).fill(Array(8).fill("")));
      setDate("");
      navigate("/Precot/Bleaching/F-41/Summary");
      // console.log(response.data);
      setSaveLoading(false);
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized. Please log in again.");
      } else {
        message.error("Failed to save form");
      }
      setSaveLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    setSaveLoading(true);

    if (!validateForm()) {
      setSubmitLoading(false);
      setSaveLoading(false);
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("No token found. Please log in again.");
      return;
    }
    // console.log("shiftSelections:", shiftSelections);
    const sanitizedRemarks = remarks.map((remark) =>
      remark.trim() !== "" ? remark : "N/A"
    );
    const payload = {
      unit: "Unit H",
      formatNo: "PRD01/F10",
      formatName: "Bleaching Hand Sanitization Report AB Bale Press Machine",
      revisionNo: "02",
      sopNumber: "HRD01-D-05",
      date: newDate,
      status: "SUBMITTED",
      supervisor_status: "SUPERVISOR_APPROVED",
      shift: shift,
      approverStatus: " ",
      verifiedBy: null,
      reviewedBy: null,
      supervisor_status: supervisorStatus,
      supervisor_saved_on: supervisorSavedOn,
      supervisor_saved_by: supervisorSavedBy,
      supervisor_saved_id: supervisorSavedId,
      supervisor_submit_on: supervisorSubmitOn,
      supervisor_submit_by: supervisorSubmitBy,
      supervisor_submit_id: supervisorSubmitId,
      supervisor_sign: supervisorSign,
      hod_saved_on: hodSavedOn,
      hod_saved_by: hodSavedBy,
      hod_saved_id: hodSavedId,
      sanitizationList: hourSelections.map((row, rowIndex) => {
        const shift =
          typeof shiftSelections[rowIndex] === "string"
            ? shiftSelections[rowIndex]
            : JSON.stringify(shiftSelections[rowIndex]);
        return {
          serialNumber: rowIndex + 1,
          idNumber: idNumbers[rowIndex],
          hour1: row[0] === "yes" ? "Y" : "N",
          hour2: row[1] === "yes" ? "Y" : "N",
          hour3: row[2] === "yes" ? "Y" : "N",
          hour4: row[3] === "yes" ? "Y" : "N",
          hour5: row[4] === "yes" ? "Y" : "N",
          hour6: row[5] === "yes" ? "Y" : "N",
          hour7: row[6] === "yes" ? "Y" : "N",
          hour8: row[7] === "yes" ? "Y" : "N",
          remarks: sanitizedRemarks[rowIndex],
        };
      }),
    };
    // console.log("Payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/bleaching/Service/submitHandSanitizationF41`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Form submitted successfully");
      setShiftSelections(Array(8).fill(""));
      setIdNumbers(Array(3).fill(""));
      setRemarks(Array(3).fill(""));
      setHourSelections(Array(8).fill(Array(8).fill("")));
      setDate("");
      navigate("/Precot/Bleaching/F-41/Summary");
      // console.log(response.data);
      setSubmitLoading(false);
      setSaveLoading(false);
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized. Please log in again.");
      } else {
        message.error(error.response.data.message);
      }
      setSubmitLoading(false);
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const { date, shiftvalue } = state || {};
    setNewDate(date);
    setShift(shiftvalue);
    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/bleaching/Service/getHandSanitizationByShiftAnddate`,
        {
          date: date,
          shift: shiftvalue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      // console.log("API Response:", responseData);
      // console.log( "response" , responseData.status);

      if (
        responseData &&
        responseData.sanitizationList &&
        responseData.sanitizationList.length > 0
      ) {
        const { sanitizationList, idNumber, remarks, date, shift } =
          responseData;

        // Extract hour values from sanitizationList
        const newHourSelections = responseData.sanitizationList.map((item) => [
          item.hour1 === "Y" ? "yes" : "no",
          item.hour2 === "Y" ? "yes" : "no",
          item.hour3 === "Y" ? "yes" : "no",
          item.hour4 === "Y" ? "yes" : "no",
          item.hour5 === "Y" ? "yes" : "no",
          item.hour6 === "Y" ? "yes" : "no",
          item.hour7 === "Y" ? "yes" : "no",
          item.hour8 === "Y" ? "yes" : "no",
        ]);
        // Set state variables
        setApiData(responseData);
        sethandSanitizationId(responseData.handSanitizationId);
        setDataExists(true);
        setSupervisorSubmitOn(responseData.supervisor_submit_on);
        setHodSubmitOn(response.hodSubmitOn);

        setSupervisorSign(response.data[0].supervisor_sign);
        setHodSign(response.data[0].hod_sign);
        setSupervisorSubmitOn(response.data[0].supervisor_submit_on);
        setSupervisorSubmitBy(response.data[0].supervisor_submit_by);
        setSupervisorSubmitId(response.data[0].supervisor_submit_id);
        setSupervisorSavedOn(response.data[0].supervisor_saved_on);
        setSupervisorSavedBy(response.data[0].supervisor_saved_by);
        setSupervisorSavedId(response.data[0].supervisor_saved_id);
        setHodSubmitOn(response.data[0].hod_submit_on);
        setHodSubmitBy(response.data[0].hod_submit_by);
        setHodSubmitId(response.data[0].hod_submit_id);
        setHodSavedOn(response.data[0].hod_saved_on);
        setHodSavedId(response.data[0].hod_saved_id);
        setHodSavedBy(response.data[0].hod_saved_by);

        setIdNumbers(sanitizationList.map((item) => item.idNumber));
        setRemarks(sanitizationList.map((item) => item.remarks));
        setHourSelections(newHourSelections);
        const { supervisor_status, hod_status } = responseData;
        setIsHODApproved(responseData.hod_status === "HOD_APPROVED");
        setIsEditable(
          !supervisor_status === "SUPERVISOR_APPROVED" &&
            (hod_status === "HOD_APPROVED" || hod_status === "HOD_SAVED")
        );
      } else if (responseData.status === "No Data") {
        if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
          setIsEditable(false);
          setApiData("No Data");
          // console.log("response status" , response.data.status);
        }
        setDataExists(false);
        setIdNumbers([""]);
        setRemarks([""]);
        setHourSelections([Array(8).fill("No")]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.response.data.message);
      navigate("/Precot/Bleaching/F-41/Summary");
    }
  };
  // const handleBulkChange = (value) => {
  //   const newHourSelections = hourSelections.map(row => row.map(() => value));
  //   setHourSelections(newHourSelections);
  // };
  const handleBulkChange = (value) => {
    setHourSelections((prevHourSelections) =>
      prevHourSelections.map((row) => row.map(() => value))
    );
  };

  const getHourLabel = (hourIndex) => {
    const ordinals = ["th", "st", "nd", "rd"];
    const v = hourIndex + 1;
    const suffix =
      ordinals[((v % 100) - 20) % 10] || ordinals[v % 100] || ordinals[0];
    return `${v}${suffix} Hour`;
  };

  const deleteRow = (rowIndex) => {
    setRows(rows.filter((_, index) => index !== rowIndex));
    setIdNumbers(idNumbers.filter((_, index) => index !== rowIndex));
    setHourSelections(hourSelections.filter((_, index) => index !== rowIndex));
    setRemarks(remarks.filter((_, index) => index !== rowIndex));
  };

  const items = [
    //     {
    //       key: "1",
    //       label: <p>Sanitization Form</p>,
    //       children: (
    //         <div>
    //           <div style={{ marginBottom: '10px', marginLeft: '82%' }}>
    //             <Button
    //               type="primary"
    //               style={{
    //                 backgroundColor: '#E5EEF9',
    //                 color: '#00308F',
    //                 fontWeight: 'bold',
    //                 border: '1px solid #00308F',
    //                 padding: '8px 12px',
    //                 fontSize: '12px',
    //                 marginRight: '8px',
    //               }}
    //               disabled={!isEditable}
    //               onClick={() => handleBulkChange('yes')}
    //               icon={<AiOutlineCheck style={{ color: '#00308F', marginRight: '1px' }} />}
    //             >
    //               Bulk Yes
    //             </Button>

    //             <Button
    //               type="primary"
    //               style={{
    //                 backgroundColor: '#E5EEF9',
    //                 color: '#00308F',
    //                 fontWeight: 'bold',
    //                 border: '1px solid #00308F',
    //                 padding: '8px 12px',
    //                 fontSize: '12px',
    //               }}
    //               disabled={!isEditable}
    //               onClick={() => handleBulkChange('no')}
    //               icon={<AiOutlineClose style={{ color: '#00308F', marginRight: '1px' }} />}
    //             >
    //               Bulk No
    //             </Button>
    //           </div>

    //           <table
    //             style={{
    //               borderCollapse: "collapse",
    //               border: "1px solid black",
    //               width: "95%",
    //             }}
    //           >
    //             <thead>
    //               <tr style={{ border: "1px solid black" }}>
    //                 <th style={{ border: "1px solid black", minWidth: "50px", width: "50px" }}>Select</th>
    //                 <th style={{ border: "1px solid black", minWidth: "50px", width: "50px" }}>Sr. No</th>
    //                 <th style={{ border: "1px solid black", minWidth: "95px", width: "95px" }}>ID No</th>
    //                 {[...Array(8)].map((_, hourIndex) => (
    //                   <th key={hourIndex} style={{ border: "1px solid black", minWidth: "100px", width: "100px" }}>
    //                     {getHourLabel(hourIndex)}
    //                   </th>
    //                 ))}
    //                 <th style={{ border: "1px solid black", minWidth: "95px", width: "90px" }}>Remarks</th>
    //                 <th style={{ border: "1px solid black", minWidth: "50px", width: "50px" }}>Delete</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {rows && hourSelections.map((row, rowIndex) => (
    //                 <tr key={rowIndex}>
    //                   <td style={{ textAlign: "center", verticalAlign: "middle" }}>
    //                     <input
    //                       type="checkbox"
    //                       checked={selectedRows.includes(rowIndex)}
    //                       onChange={() => handleRowSelect(rowIndex)}
    //                       disabled={!isEditable}
    //                     />
    //                   </td>
    //                   <td style={{ minWidth: "50px", width: "50px" }}>
    //                     <input
    //                       type="text"
    //                       style={{
    //                         width: "95%",
    //                         height: "20px",
    //                         border: "none",
    //                         textAlign: "center",
    //                         verticalAlign: "middle",
    //                       }}
    //                       value={rowIndex + 1}
    //                       readOnly
    //                     />
    //                   </td>
    //                   <td style={{
    //                     minWidth: "100px",
    //                     width: "100px",
    //                     verticalAlign: "middle",
    //                     alignItems: "center",
    //                   }}>
    //                     <input
    //                       type="text"
    //                       style={{
    //                         width: "95%",
    //                         height: "20px",
    //                         textAlign: "center",
    //                         alignItems: "center",
    //                         border: "none"
    //                       }}
    //                       value={idNumbers[rowIndex]}
    //                       onChange={(e) => handleIdChange(rowIndex, e.target.value)}
    //                       disabled={!isEditable}
    //                     />
    //                   </td>
    //                   {[...Array(8)].map((_, hourIndex) => (
    //                     <td key={hourIndex} style={{
    //                       border: "1px solid black",
    //                       minWidth: "100px",
    //                       width: "100px",
    //                       alignItems: "center",
    //                       textAlign: "center",
    //                     }}>
    //                       <label>
    //                         <input
    //                           type="checkbox"
    //                           checked={hourSelections[rowIndex] && hourSelections[rowIndex][hourIndex] === 'yes'}
    //                           onChange={() => handleCheckboxChange(rowIndex, hourIndex, 'yes')}
    //                           disabled={!isEditable}
    //                           style={{ marginRight: "5px", alignItems: "center" }}
    //                         />
    //                         Yes
    //                       </label>
    //                       <label>
    //                         <input
    //                           type="checkbox"
    //                           checked={hourSelections[rowIndex] && hourSelections[rowIndex][hourIndex] === 'no'}
    //                           onChange={() => handleCheckboxChange(rowIndex, hourIndex, 'no')}
    //                           disabled={!isEditable}
    //                           style={{ marginRight: "5px", alignItems: "center" }}
    //                         />
    //                         No
    //                       </label>
    //                     </td>
    //                   ))}
    //                   <td style={{ border: "1px solid black", minWidth: "95px", width: "95px" }}>
    //                     <input
    //                       type="text"
    //                       style={{
    //                         width: "90%",
    //                         height: "20px",
    //                         textAlign: "center",
    //                         border: "none"
    //                       }}
    //                       value={remarks[rowIndex]}
    //                       onChange={(e) => handleRemarksChange(rowIndex, e.target.value)}
    //                       disabled={!isEditable}
    //                     />
    //                   </td>
    //                   <td style={{ border: "1px solid black", minWidth: "50px", width: "50px", textAlign: "center" }}>
    //                   <Button
    //   type="primary"
    //   danger
    //   icon={<FaTrash style={{ fontSize: '10px' }} />}
    //   onClick={() => deleteRow(rowIndex)}
    //   disabled={!isEditable}
    //   style={{
    //     padding: '2px 4px',
    //     fontSize: '10px',
    //     lineHeight: '12px',
    //     height: '24px',
    //     width: 'auto',
    //     minWidth: 'auto',
    //     backgroundColor: '#ff4d4f',
    //     borderColor: '#ff4d4f'
    //   }}
    // >
    //   Delete
    // </Button>

    //           </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //           <div style={{ marginTop: "20px" }}>
    //             <table style={{
    //               width: "95%",
    //             }}>
    //               <tr>
    //                 <td style={{ textAlign: "center" }}>
    //                   ಗಮನಿಸಿ: ALCONOX- ಸಾಕಷ್ಟು ಪ್ರಮಾಣದ ಹ್ಯಾಂಡ್ ಸ್ಯಾನಿಟೈಜರ್ ಅನ್ನು ಅನ್ವಯಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕೈಗಳನ್ನು ಒಟ್ಟಿಗೆ ಉಜ್ಜಿಕೊಳ್ಳಿ, ಅಂಗೈಗಳು, ಬೆರಳುಗಳು ಮತ್ತು ಉಗುರುಗಳು ಸೇರಿದಂತೆ ನಿಮ್ಮ ಕೈಗಳ ಎಲ್ಲಾ ಬೆರಳುಗಳನ್ನು ಕನಿಷ್ಠ 20 ಸೆಕೆಂಡುಗಳ ಕಾಲ ಉಜ್ಜಲು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.
    //                 </td>
    //               </tr>
    //             </table>
    //             <Button
    //               type="primary"
    //               style={{
    //                 backgroundColor: '#E5EEF9',
    //                 color: '#00308F',
    //                 fontWeight: 'bold',
    //                 border: '1px solid #00308F',
    //                 padding: '8px 12px',
    //                 fontSize: '12px',
    //                 marginRight: '50%',
    //                 marginLeft: "35px",
    //               }}
    //               disabled={!isEditable}
    //               onClick={addRow}
    //               icon={<AiOutlinePlus style={{ color: '#00308F', marginRight: '1px' }} />}
    //             >
    //               Add Row
    //             </Button>
    //           </div>
    //         </div>
    //       ),
    //     },

    {
      key: "1",
      label: <p>Sanitization Form</p>,
      children: (
        <div>
          <div style={{ marginBottom: "10px", marginLeft: "82%" }}>
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "1px solid #00308F",
                padding: "8px 12px",
                fontSize: "12px",
                marginRight: "8px",
              }}
              disabled={!isEditable}
              onClick={() => handleBulkChange("yes")}
              icon={
                <AiOutlineCheck
                  style={{ color: "#00308F", marginRight: "1px" }}
                />
              }
            >
              Bulk Yes
            </Button>

            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                border: "1px solid #00308F",
                padding: "8px 12px",
                fontSize: "12px",
              }}
              disabled={!isEditable}
              onClick={() => handleBulkChange("no")}
              icon={
                <AiOutlineClose
                  style={{ color: "#00308F", marginRight: "1px" }}
                />
              }
            >
              Bulk No
            </Button>
          </div>

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
                  Sr. No
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  ID No
                </th>
                {[...Array(8)].map((_, hourIndex) => (
                  <th
                    key={hourIndex}
                    style={{
                      border: "1px solid black",
                      minWidth: "100px",
                      width: "100px",
                    }}
                  >
                    {getHourLabel(hourIndex)}
                  </th>
                ))}
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "90px",
                  }}
                >
                  Remarks
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "50px",
                    width: "50px",
                  }}
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {rows &&
                hourSelections.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td style={{ minWidth: "50px", width: "50px" }}>
                      <input
                        type="text"
                        style={{
                          width: "95%",
                          height: "20px",
                          border: "none",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        value={rowIndex + 1}
                        readOnly
                      />
                    </td>
                    <td
                      style={{
                        minWidth: "100px",
                        width: "100px",
                        verticalAlign: "middle",
                        alignItems: "center",
                      }}
                    >
                      {/* <input
                  type="text"
                  style={{
                    width: "95%",
                    height: "20px",
                    textAlign: "center",
                    alignItems: "center",
                    border: "none",
                     outline:"none"
                  }}
                  value={idNumbers[rowIndex]}
                  onChange={(e) => handleIdChange(rowIndex, e.target.value)}
                  disabled={!isEditable}
                /> */}
                      <Select
                        showSearch
                        value={idNumbers[rowIndex] || undefined}
                        onChange={(value) => handleIdChange(rowIndex, value)}
                        onInputKeyDown={(e) => handleInputKeyDown(e, rowIndex)}
                        style={{
                          backgroundColor: "#E5EEF9",
                          fontWeight: "bold",
                          width: "100%",
                        }}
                        filterOption={false}
                        disabled={!isEditable}
                      >
                        {idNumberLov.map((option) => (
                          <Option key={option.id} value={option.value}>
                            {option.value}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    {[...Array(8)].map((_, hourIndex) => (
                      <td
                        key={hourIndex}
                        style={{
                          border: "1px solid black",
                          minWidth: "100px",
                          width: "100px",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              hourSelections[rowIndex] &&
                              hourSelections[rowIndex][hourIndex] === "yes"
                            }
                            onChange={() =>
                              handleCheckboxChange(rowIndex, hourIndex, "yes")
                            }
                            disabled={!isEditable}
                            style={{ marginRight: "5px", alignItems: "center" }}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              hourSelections[rowIndex] &&
                              hourSelections[rowIndex][hourIndex] === "no"
                            }
                            onChange={() =>
                              handleCheckboxChange(rowIndex, hourIndex, "no")
                            }
                            disabled={!isEditable}
                            style={{ marginRight: "5px", alignItems: "center" }}
                          />
                          No
                        </label>
                      </td>
                    ))}
                    <td
                      style={{
                        border: "1px solid black",
                        minWidth: "95px",
                        width: "95px",
                      }}
                    >
                      <input
                        type="text"
                        style={{
                          width: "90%",
                          height: "20px",
                          textAlign: "center",
                          border: "none",
                          outline: "none",
                        }}
                        value={remarks[rowIndex]}
                        onChange={(e) =>
                          handleRemarksChange(rowIndex, e.target.value)
                        }
                        disabled={!isEditable}
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
                        onClick={() => deleteRow(rowIndex)}
                        disabled={!isEditable}
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
          <div style={{ marginTop: "20px" }}>
            <table
              style={{
                width: "95%",
              }}
            >
              <tr>
                <td style={{ textAlign: "center" }}>
                  ಗಮನಿಸಿ: ALCONOX- ಸಾಕಷ್ಟು ಪ್ರಮಾಣದ ಹ್ಯಾಂಡ್ ಸ್ಯಾನಿಟೈಜರ್ ಅನ್ನು
                  ಅನ್ವಯಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕೈಗಳನ್ನು ಒಟ್ಟಿಗೆ ಉಜ್ಜಿಕೊಳ್ಳಿ, ಅಂಗೈಗಳು,
                  ಬೆರಳುಗಳು ಮತ್ತು ಉಗುರುಗಳು ಸೇರಿದಂತೆ ನಿಮ್ಮ ಕೈಗಳ ಎಲ್ಲಾ ಬೆರಳುಗಳನ್ನು
                  ಕನಿಷ್ಠ 20 ಸೆಕೆಂಡುಗಳ ಕಾಲ ಉಜ್ಜಲು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.
                </td>
              </tr>
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
              disabled={!isEditable}
              onClick={addRow}
              icon={
                <AiOutlinePlus
                  style={{ color: "#00308F", marginRight: "1px" }}
                />
              }
            >
              Add Row
            </Button>
          </div>
        </div>
      ),
    },

    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "96%",
            }}
          >
            <tr>
              <td
                colSpan="3"
                style={{
                  height: "35px",
                  textAlign: "center",
                  borderRight: "1px solid black",
                }}
              >
                <b>Verified by Production Supervisor</b>
              </td>
              <td colSpan="4" style={{ textAlign: "center" }}>
                <div style={{ marginRight: "20px" }}>
                  <b>Reviewed By Head of the Department/Designee</b>
                </div>
              </td>
            </tr>
            <tr>
              <td
                colSpan="3"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {apiData?.supervisor_status === "SUPERVISOR_APPROVED" && (
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
                        <div>
                          {" "}
                          {apiData && apiData.supervisor_sign && (
                            <span>{apiData.supervisor_sign}</span>
                          )}
                        </div>
                        <div> {formattedSupervisorDate}</div>
                      </div>
                      {getImage !== "" && (
                        <img
                          className="signature"
                          src={getImage}
                          alt="Supervisor"
                        />
                      )}
                    </div>
                    {/* <div>Signature & Date</div> */}
                  </>
                )}

                {/* <span style={{fontSize:'11px',marginLeft:"0px"}}>      Signature & Date</span> */}
              </td>

              <td
                colSpan="4"
                style={{ textAlign: "center", verticalAlign: "bottom" }}
              >
                {(apiData?.hod_status === "HOD_REJECTED" ||
                  apiData?.hod_status === "HOD_APPROVED") && (
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
                        <div>
                          {" "}
                          {apiData && apiData.hod_sign && (
                            <span>{apiData.hod_sign}</span>
                          )}
                        </div>
                        <div>{formattedHODDate}</div>
                      </div>
                      {getImage1 !== "" && (
                        <img className="signature" src={getImage1} alt="HOD" />
                      )}
                    </div>
                  </>
                )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  const shouldShowSaveButton = () => {
    const role = localStorage.getItem("role");
    const supervisorStatus = localStorage.getItem("ROLE_SUPERVISOR");
    const hodStatus = localStorage.getItem("HOD_STATUS");

    return (
      role === "ROLE_SUPERVISOR" &&
      supervisorStatus !== "SUPERVISOR_APPROVED" &&
      hodStatus !== "HOD_APPROVED"
    );
  };
  const handleLogout = () => {
    navigate("/Precot");
  };
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const isHOD = () => {
    return (
      localStorage.getItem("role") === "ROLE_HOD" || role === "ROLE_DESIGNEE"
    );
  };

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-41/Summary");
  };
  const formatName = "Bleaching Hand Sanitization Report AB Bale Press Machine";

  const unit = "UNIT-H";

  const entriesPerPage = 10;
  const chunkedSanitizationList = [];

  if (apiData && apiData.sanitizationList) {
    for (let i = 0; i < apiData.sanitizationList.length; i += entriesPerPage) {
      chunkedSanitizationList.push(
        apiData.sanitizationList.slice(i, i + entriesPerPage)
      );
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <div>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width="fit-content"
        style={{
          padding: "1em",
        }}
      >
        <Row>
          <Col>
            <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
          </Col>

          <Col
            style={{
              marginLeft: "1em",
            }}
          >
            <p>{localStorage.getItem("username")}</p>
            <p
              style={{
                fontSize: "x-small",
              }}
            >
              {localStorage.getItem("role")}
            </p>
          </Col>
        </Row>

        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "0",
            margin: "0",
          }}
          items={
            localStorage.getItem("role") == "ROLE_QA"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Generation
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Generate"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "5",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Raw Material Isuue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "6",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => navigate("/Precot")}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => navigate("/Precot")}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
          }
        />
      </Drawer>
      <BleachingHeader
        unit="Unit-H"
        formName="Bleaching Hand Sanitization Report AB Bale Press Machine"
        formatNo="PH-PRD01/F-010"
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
            }}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
          >
            &nbsp;Back
          </Button>,
          role === "ROLE_HOD" ||
          role === "ROLE_QA" ||
          role === "ROLE_QC" ||
          role === "ROLE_DESIGNEE" ? (
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
                key="save"
                type="primary"
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButton2(),
                }}
              >
                Save
              </Button>
              <Button
                loading={submitLoading}
                key="submit"
                type="primary"
                onClick={handleSubmit}
                shape="round"
                icon={<GrDocumentStore color="#00308F" />}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
              >
                Submit
              </Button>
            </>
          ),
          // shouldShowSaveAndSubmitButtons() && (
          //   <>
          //     <Button
          //       loading={saveLoading}
          //       type="primary"
          //       style={{
          //         backgroundColor: "#E5EEF9",
          //         color: "#00308F",
          //         fontWeight: "bold",
          //       }}
          //       onClick={handleSave}
          //       shape="round"
          //       icon={<IoSave color="#00308F" />}
          //       disabled={!isEditable}
          //     >
          //       &nbsp;Save
          //     </Button>
          //     <Button
          //      loading={submitLoading}
          //       type="primary"
          //       style={{
          //         backgroundColor: "#E5EEF9",
          //         color: "#00308F",
          //         fontWeight: "bold",
          //       }}
          //       onClick={handleSubmit}
          //       shape="round"
          //       icon={<IoSave color="#00308F" />}
          //       disabled={!isEditable}
          //     >
          //       &nbsp;Submit
          //     </Button>

          //   </>
          // ),
          //   <Button
          //   type="primary"
          //   style={{
          //     backgroundColor: "#E5EEF9",
          //     color: "#00308F",
          //     fontWeight: "bold",
          //     display: isHODApproved ? "inline-block" : "none",
          //   }}
          //   shape="round"
          //   icon={<IoPrint color="#00308F" />}
          //   onClick={handlePrint}
          // >
          //   &nbsp;Print
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
            onClick={() => {
              // eslint-disable-next-line no-unused-expressions
              confirm("Are you sure want to Logout") == true
                ? navigate("/Precot")
                : null;
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
            rows={4} // Adjust the number of rows as needed
            style={{ width: "100%" }} // Adjust the width as needed
          />
        </div>
      </Modal>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <Input
          addonBefore="Format No"
          defaultValue="PD01/F-41"
          size="small"
          disabled
        />
        <Input
          addonBefore="Revision No"
          defaultValue="02"
          size="small"
          disabled
        />
        <Input
          addonBefore="Ref.SOP No"
          defaultValue="HRD01-D-05"
          size="small"
          disabled
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {/* <Form
          layout="horizontal"
          style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
        >
          <Form.Item label="Date" style={{ marginBottom: 0 }}>
            <p style={{ margin: 0 }}>{newDate}</p>
          </Form.Item> */}
        <Form
          layout="horizontal"
          style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <Form.Item label="Date" style={{ marginBottom: 0 }}>
            <p style={{ margin: 0 }}>{formatDate(newDate)}</p>
          </Form.Item>
          <Form.Item label="Shift" style={{ marginBottom: 0 }}>
            <p style={{ margin: 0 }}>{shift}</p>
          </Form.Item>
        </Form>
      </div>
      <div id="section-to-print" style={{ padding: "10px" }}>
        <style>
          {`
      @media print {
        @page {
          size: landscape;
        }
        body {
          -webkit-print-color-adjust: exact;
        }
        #section-to-print {
          page-break-after: always;
        }
      }
    `}
        </style>

        {chunkedSanitizationList.map((sanitizationChunk, pageIndex) => (
          <table
            style={{
              width: "90%",
              borderCollapse: "collapse",
              pageBreakBefore: pageIndex > 1 ? "always" : "auto",
              marginTop: "10px",
            }}
            key={pageIndex}
          >
            <br></br>

            <tbody>
              <tr>
                <th
                  colSpan="12"
                  rowSpan="4"
                  style={{ height: "80px", textAlign: "center" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br />
                  <br />
                  Unit H
                </th>
                <th
                  colSpan="46"
                  rowSpan="4"
                  style={{ textAlign: "center", height: "80px" }}
                >
                  Bleaching Hand Sanitization Report <br />
                  (AB Bale Press Machine)
                </th>
                <th colSpan="10" style={{ border: "1px solid black" }}>
                  Format No.:
                </th>
                <td colSpan="22" style={{ border: "1px solid black" }}>
                  PRD01/F-41
                </td>
              </tr>
              <tr>
                <th colSpan="10" style={{ border: "1px solid black" }}>
                  Revision No.:
                </th>
                <td colSpan="22" style={{ border: "1px solid black" }}>
                  01
                </td>
              </tr>
              <tr>
                <th colSpan="10" style={{ border: "1px solid black" }}>
                  Ref.SOP No.:
                </th>
                <td colSpan="22" style={{ border: "1px solid black" }}>
                  HRD01-D-05
                </td>
              </tr>
              <tr>
                <th colSpan="10" style={{ border: "1px solid black" }}>
                  Page No.:
                </th>
                <td colSpan="22" style={{ border: "1px solid black" }}>
                  {pageIndex + 1} of {chunkedSanitizationList.length}
                </td>
              </tr>
              <tr>
                <td colSpan="90" style={{ border: "none", height: "2%" }}></td>
                <br></br>
              </tr>
              <tr>
                <th
                  colSpan="90"
                  style={{ height: "20px", border: "1px solid black" }}
                >
                  Date:{formatDate(newDate)}
                </th>
                {/* <th colSpan="88" style={{ height: "20px", border: '1px solid black' }}>{formatDate(newDate)}</th> */}
              </tr>

              <tr>
                <th
                  colSpan="7"
                  style={{
                    border: "1px solid black",
                    height: "20px",
                    textAlign: "center",
                  }}
                >
                  S.No
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  Shift
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  ID No
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  1st Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  2nd Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  3rd Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  4th Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  5th Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  6th Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  7th Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  8th Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  Remarks
                </th>
              </tr>
              {sanitizationChunk.map((entry, index) => (
                <tr key={index}>
                  <td
                    colSpan="7"
                    style={{
                      border: "1px solid black",
                      height: "10px",
                      textAlign: "center",
                    }}
                  >
                    {index + 1 + pageIndex * entriesPerPage}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {apiData.shift}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.idNumber}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour1 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour2 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour3 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour4 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour5 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour6 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour7 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour8 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.remarks}
                  </td>
                </tr>
              ))}

              <>
                <tr>
                  <td colSpan="90" style={{ border: "1px solid black" }}>
                    <div style={{ lineHeight: "1.0" }}>
                      ಗಮನಿಸಿ: ALCONOX- ಸಾಕಷ್ಟು ಪ್ರಮಾಣದ ಹ್ಯಾಂಡ್ ಸ್ಯಾನಿಟೈಜರ್ ಅನ್ನು
                      ಅನ್ವಯಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕೈಗಳನ್ನು ಒಟ್ಟಿಗೆ ಉಜ್ಜಿಕೊಳ್ಳಿ,
                      ಅಂಗೈಗಳು, ಬೆರಳುಗಳು ಮತ್ತು ಉಗುರುಗಳು
                    </div>
                    <div style={{ lineHeight: "1.5" }}>
                      ಸೇರಿದಂತೆ ನಿಮ್ಮ ಕೈಗಳ ಎಲ್ಲಾ ಬೆರಳುಗಳನ್ನು ಕನಿಷ್ಠ 20 ಸೆಕೆಂಡುಗಳ
                      ಕಾಲ ಉಜ್ಜಲು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="45"
                    style={{
                      height: "10px",
                      textAlign: "center",
                      border: "1px solid black",
                    }}
                  >
                    <b>Verified by Production Supervisor</b>
                  </td>
                  <td
                    colSpan="45"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    <b>Reviewed by Head of the Department/Designee</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="45"
                    style={{
                      height: "100px",
                      textAlign: "center",
                      verticalAlign: "bottom",
                      border: "1px solid black",
                    }}
                  >
                    <div>
                      {apiData && apiData.supervisor_sign && (
                        <span>{apiData.supervisor_sign}</span>
                      )}
                      <br></br>
                      {formattedSupervisorDate}
                    </div>
                    Sign & Date
                  </td>
                  <td
                    colSpan="45"
                    style={{
                      textAlign: "center",
                      verticalAlign: "bottom",
                      border: "1px solid black",
                    }}
                  >
                    <div>
                      {apiData && apiData.hod_sign && (
                        <span>{apiData.hod_sign}</span>
                      )}
                      <br></br>
                      {formattedHODDate}
                    </div>
                    Sign & Date
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="90"
                    style={{ border: "1px solid black", border: "none" }}
                  ></td>
                </tr>
                <tr>
                  <th
                    colSpan="15"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Particular
                  </th>
                  <th
                    colSpan="30"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Prepared by
                  </th>
                  <th
                    colSpan="20"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Reviewed by
                  </th>
                  <th
                    colSpan="25"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Approved by
                  </th>
                </tr>
                <tr>
                  <th colSpan="15" style={{ border: "1px solid black" }}>
                    Name
                  </th>
                  <td colSpan="30" style={{ border: "1px solid black" }}></td>
                  <td colSpan="20" style={{ border: "1px solid black" }}></td>
                  <td colSpan="25" style={{ border: "1px solid black" }}></td>
                </tr>
                <tr>
                  <th colSpan="15" style={{ border: "1px solid black" }}>
                    Signature & Date
                  </th>
                  <td colSpan="30" style={{ border: "1px solid black" }}></td>
                  <td colSpan="20" style={{ border: "1px solid black" }}></td>
                  <td colSpan="25" style={{ border: "1px solid black" }}></td>
                </tr>
              </>
            </tbody>
          </table>
        ))}
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        style={{ marginTop: "1%" }}
      />
    </div>
  );
};

export default Bleaching_f41;
