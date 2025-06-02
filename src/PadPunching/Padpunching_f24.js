/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
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
import BleachingHeader from "../Components/BleachingHeader.js";
import API from "../baseUrl.json";
import { Tooltip } from "antd";
import { FaUserCircle } from "react-icons/fa";
import {
  IoPrint,
  IoSave,
  IoLockClosedOutline,
  IoCreate,
} from "react-icons/io5";
import PrecotSidebar from "../Components/PrecotSidebar.js";
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

const Padpunching_f25 = (props) => {
  const [loading, setLoading] = useState(false);
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
  const [rejectRemarks, setRejectRemarks] = useState("");

  const [handSanitizationId, sethandSanitizationId] = useState("");
  const [supervisorSavedOn, setSupervisorSavedOn] = useState("");
  const [supervisorSavedBy, setSupervisorSavedBy] = useState("");
  const [supervisorSavedId, setSupervisorSavedId] = useState("");
  const [supervisorSubmitOn, setSupervisorSubmitOn] = useState("");
  const [supervisorSubmitBy, setSupervisorSubmitBy] = useState("");
  const [supervisorSubmitId, setSupervisorSubmitId] = useState("");
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
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [rows, setRows] = useState([{}]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const initial = useRef(false);
  const token = localStorage.getItem("token");
  const [idNumbersOptions, setIdNumbersOptions] = useState([]); // To store fetched idNumber values
  const [NameOptions, setNameOptions] = useState([]); // To store fetched idNumber values

  const fetchIDNo = async () => {
    console.log("fetchIDNo valled");
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/bleaching/generation/fetchHandSanitationIdNumbers?department=3`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        }
      );
      console.log("fetchIDNo valled312e12");

      if (response.data && Array.isArray(response.data)) {
        console.log("fetchIDNo valled213333333");

        setIdNumbersOptions(response.data); // Assuming response.data is an array
      } else {
        console.error("Unexpected API response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchName = async () => {
    console.log("fetchIDNo valled");
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/bleaching/generation/fetchHandSanitationName`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        }
      );
      console.log("fetchIDNo valled312e12");

      if (response.data && Array.isArray(response.data)) {
        console.log("fetchIDNo valled213333333");

        setNameOptions(response.data); // Assuming response.data is an array
      } else {
        console.error("Unexpected API response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchIDNo();
    fetchName();
  }, []);

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

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = apiData?.supervisor_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          console.log("Response:", res.data);
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [apiData, API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = apiData?.hod_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          console.log("Response:", res.data);
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [apiData, API.prodUrl]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const roleauth = localStorage.getItem("role");

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
        //  emptyarraycheck == 0
      ) {
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

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/punching/approveHandSanitationF24`,
        {
          id: handSanitizationId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Padpunching/F-06/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
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
        `${ API.prodUrl}/Precot/api/punching/approveHandSanitationF24`,
        {
          id: handSanitizationId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Padpunching/F-06/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const addRow = () => {
    setRows([...rows, {}]);
    setIdNumbers([...idNumbers, ""]);
    setHourSelections([...hourSelections, Array(8).fill("")]);
    setRemarks([...remarks, ""]);
    // setNames([...names, ""]);
  };

  const { state } = useLocation();
  const [availableShifts, setAvailableShifts] = useState([]);
  const [idNumbers, setIdNumbers] = useState(Array(1).fill(""));
  const [remarks, setRemarks] = useState(Array(1).fill(""));
  const [names, setNames] = useState(Array(1).fill(""));
  const navigate = useNavigate();
  // const [hourSelections, setHourSelections] = useState( Array(8).fill(Array(8).fill("")) );
  const [hourSelections, setHourSelections] = useState(
    Array(rows.length).fill(Array(8).fill(""))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
      .get(`${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Shift details fetched:", res.data);
        const shifts = res.data.map((shift) => shift.value);
        setAvailableShifts(shifts);
      })
      .catch((err) => {
        console.log("Error fetching shifts:", err);
      });
  }, []);
  const handleIdChange = (rowIndex, value) => {
    {
      const updatedIds = idNumbers.map((id, index) =>
        index === rowIndex ? value : id
      );
      setIdNumbers(updatedIds);
    }
  };

  const handleNameChange = (rowIndex, value) => {
    const updatedNames = names.map((name, index) =>
      index === rowIndex ? value : name
    );
    setNames(updatedNames);
  };

  const handleRemarksChange = (rowIndex, value) => {
    const updatedRemarks = remarks.map((remark, index) =>
      index === rowIndex ? value : remark
    );
    setRemarks(updatedRemarks);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const validateForm = () => {
    console.log("ID Numbers:", idNumbers);
    console.log("Hour Selections:", hourSelections);
    console.log("name Selections:", names);

    // if (!names || names.length === 0) {
    //   message.error("At least one name is required");
    //   return false;
    // }

    if (!idNumbers || idNumbers.length === 0) {
      message.error("At least one ID number is required");
      return false;
    }

    // for (let i = 0; i < names.length; i++) {
    //   if (!names[i]) {
    //     message.error(`Name is required for row ${i + 1}`);
    //     return false;
    //   }
    // }

    for (let i = 0; i < idNumbers.length; i++) {
      if (!idNumbers[i]) {
        message.error(`ID number is required for row ${i + 1}`);
        return false;
      }

      for (let j = 0; j < 8; j++) {
        console.log(
          `Hour selection for row ${i + 1}, ${getHourLabel(j)}:`,
          hourSelections[i][j]
        );
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
      formatNo: "PH-HRD03/F-006",
      formatName: "Hand Sanitisation Report",
      revisionNo: "02",
      sopNumber: "PH-HRD04-D-03",
      handSanitizationId: handSanitizationId,
      date: newDate,
      status: "DRAFT",
      approverStatus: "PENDING",
      shift: shift,

      sanitizationList: hourSelections.map((row, rowIndex) => ({
        serialNumber: rowIndex + 1,
        idNumber: idNumbers[rowIndex],
        // name: names[rowIndex],
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
        `${ API.prodUrl}/Precot/api/punching/saveHandSanitationF24`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Form Saved Successfully");
      setShiftSelections(Array(8).fill(""));
      setIdNumbers(Array(3).fill(""));
      setRemarks(Array(3).fill(""));
      setHourSelections(Array(8).fill(Array(8).fill("")));
      setDate("");
      navigate("/Precot/Padpunching/F-06/Summary");
      console.log(response.data);
      setSaveLoading(false);
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized. Please log in again.");
      } else {
        message.error(error.response.data.message);
      }
      setSaveLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

    if (!validateForm()) {
      setSubmitLoading(false);

      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("No token found. Please log in again.");
      return;
    }
    console.log("shiftSelections:", shiftSelections);
    const sanitizedRemarks = remarks.map((remark) =>
      remark.trim() !== "" ? remark : "N/A"
    );
    const payload = {
      unit: "Unit H",
      formatNo: "PH-HRD03/F-006",
      formatName: "Hand Sanitisation Report",
      revisionNo: "02",
      sopNumber: "PH-HRD04-D-03",
      date: newDate,
      shift: shift,

      sanitizationList: hourSelections.map((row, rowIndex) => {
        const shift =
          typeof shiftSelections[rowIndex] === "string"
            ? shiftSelections[rowIndex]
            : JSON.stringify(shiftSelections[rowIndex]);
        return {
          serialNumber: rowIndex + 1,
          idNumber: idNumbers[rowIndex],
          // name: names[rowIndex],
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
    console.log("Payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/punching/submitHandSanitationF24`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Form Submitted Successfully");
      setShiftSelections(Array(8).fill(""));
      setIdNumbers(Array(3).fill(""));
      setRemarks(Array(3).fill(""));
      setHourSelections(Array(8).fill(Array(8).fill("")));
      setDate("");
      navigate("/Precot/Padpunching/F-06/Summary");
      console.log(response.data);
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
    if (!initial.current) {
      initial.current = true;
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const { date, shiftvalue } = state || {};
    setNewDate(date);
    setShift(shiftvalue);
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/punching/getHandSanitationF24?date=${date}&shift=${shiftvalue}`,

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

      console.log("API Response:", responseData);

      if (
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          responseData.supervisor_status !== "SUPERVISOR_APPROVED") ||
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.hod_status == "HOD_REJECTED")
      ) {
        message.error("Supervisor Not Yet  Approved");
        setTimeout(() => {
          navigate("/Precot/Padpunching/F-06/Summary");
        }, 1500);
      }
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
        setDataExists(true);
        setSupervisorSubmitOn(responseData.supervisor_submit_on);
        setHodSubmitOn(response.hodSubmitOn);

        setSupervisorSign(response.data.supervisor_sign);
        setHodSign(response.data.hod_sign);
        // setNames(sanitizationList.map((item) => item.name));
        setSupervisorSubmitOn(response.data.supervisor_submit_on);
        setSupervisorSubmitBy(response.data.supervisor_submit_by);
        setSupervisorSubmitId(response.data.supervisor_submit_id);
        setSupervisorSavedOn(response.data.supervisor_saved_on);
        setSupervisorSavedBy(response.data.supervisor_saved_by);
        setSupervisorSavedId(response.data.supervisor_saved_id);
        setHodSubmitOn(response.data.hod_submit_on);
        setHodSubmitBy(response.data.hod_submit_by);
        setHodSubmitId(response.data.hod_submit_id);
        setHodSavedOn(response.data.hod_saved_on);
        setHodSavedId(response.data.hod_saved_id);
        setHodSavedBy(response.data.hod_saved_by);

        setIdNumbers(sanitizationList.map((item) => item.idNumber));
        setRemarks(sanitizationList.map((item) => item.remarks));
        setHourSelections(newHourSelections);
        const { supervisor_status, hod_status } = responseData;
        setIsHODApproved(responseData.hod_status === "HOD_APPROVED");
        setIsEditable(
          !supervisor_status === "SUPERVISOR_APPROVED" &&
            (hod_status === "HOD_APPROVED" || hod_status === "HOD_SAVED")
        );
      } else {
        setDataExists(false);
        setIdNumbers([""]);
        setRemarks([""]);
        setHourSelections([Array(8).fill("No")]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // message.error(error.response.data);
      navigate("/Precot/Padpunching/F-06/Summary");
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
    // setNames(names.filter((_, index) => index !== rowIndex));
  };

  const handleDelete = (rowIndex) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmed) {
      deleteRow(rowIndex);
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Sanitisation Form</p>,
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
                  S.No
                </th>
                {/* <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  Name
                </th> */}
                <th
                  style={{
                    border: "1px solid black",
                    minWidth: "95px",
                    width: "95px",
                  }}
                >
                  ID-No
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
                {/* <th style={{ border: "1px solid black", minWidth: "95px", width: "90px" }}>Remarks</th> */}
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
                          border: "none",
                          outline: "none",
                        }}
                        value={rowIndex + 1}
                        readOnly
                      />
                    </td>
                    {/* <td>
                      <Select
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleNameChange(rowIndex, e.target.value);
                          }
                        }}
                        value={names[rowIndex]}
                        disabled={!isEditable}
                        onChange={(value) => handleNameChange(rowIndex, value)}
                        style={{ width: "180px" }}
                        filterOption={false}
                        showSearch
                      >
                        {NameOptions.map(({ id, value }) => (
                          <Select.Option key={id} value={value}>
                            {value}
                          </Select.Option>
                        ))}
                      </Select>
                    </td> */}

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
                          outline: "none",
                        }}
                        value={idNumbers[rowIndex]}
                        onChange={(e) =>
                          handleIdChange(rowIndex, e.target.value)
                        }
                        disabled={!isEditable}
                      /> */}
                      <Select
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleIdChange(rowIndex, e.target.value);
                          }
                        }}
                        value={idNumbers[rowIndex]}
                        // value={row.idNumber}
                        disabled={!isEditable}
                        onChange={(value) => handleIdChange(rowIndex, value)}
                        style={{ width: "180px" }}
                        filterOption={false}
                        showSearch
                      >
                        {idNumbersOptions.map(({ id, value }) => (
                          <Select.Option key={id} value={value}>
                            {value}
                          </Select.Option>
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
                    {/* <td style={{ border: "1px solid black", minWidth: "95px", width: "95px" }}>
                    <input
                      type="text"
                      style={{
                        width: "90%",
                        height: "20px",
                        textAlign: "center",
                        border: "none",
                        outline:"none",
                      }}
                      value={remarks[rowIndex]}
                      onChange={(e) => handleRemarksChange(rowIndex, e.target.value)}
                      disabled={!isEditable}
                    />
                  </td> */}
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
                        onClick={() => handleDelete(rowIndex)}
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
              width: "70%",
              tableLayout: "fixed",
            }}
          >
            <tr>
              <td
                colSpan="4"
                style={{
                  height: "35px",
                  textAlign: "center",
                  borderRight: "1px solid black",
                }}
              >
                <b>Verified by (Supervisor) Production Signature & Date</b>
              </td>
              <td colSpan="4" style={{ textAlign: "center" }}>
                <div style={{ marginRight: "20px" }}>
                  <b>Reviewed by Head of the Department / Designee</b>
                </div>
              </td>
            </tr>
            <tr>
              <td
                colSpan="4"
                style={{
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                  borderRight: "1px solid black",
                }}
              >
                {apiData &&
                  apiData.supervisor_status === "SUPERVISOR_APPROVED" && (
                    <div>
                      {apiData && apiData.supervisor_sign && (
                        <span>{apiData.supervisor_sign}</span>
                      )}
                      <br />
                      {formattedSupervisorDate}
                      <br />
                      <br />
                      {getImage && (
                        <img
                          src={getImage}
                          alt="Supervisor Sign"
                          style={{
                            width: "70px",
                            height: "50px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                    </div>
                  )}
                {/* Signature & Date */}
              </td>

              <td
                colSpan="4"
                style={{ textAlign: "center", verticalAlign: "bottom" }}
              >
                {((apiData && apiData?.hod_status === "HOD_REJECTED") ||
                  (apiData && apiData?.hod_status === "HOD_APPROVED")) && (
                  <div>
                    {apiData && apiData.hod_sign && (
                      <span>{apiData.hod_sign}</span>
                    )}
                    <br />
                    {formattedHODDate}
                    <br />
                    <br />
                    {getImage1 && (
                      <img
                        src={getImage1}
                        alt="Hod Sign"
                        style={{
                          width: "70px",
                          height: "50px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "space-evenly",
                        }}
                      />
                    )}
                  </div>
                )}
                {/* Signature & Date */}
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
    navigate("/Precot/Padpunching/F-06/Summary");
  };
  const formatName = "Hand Sanitisation Report";

  const unit = "UNIT-H";

  const entriesPerPage = 12;
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
      {/* <Drawer
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
                  onClick: () => navigate("/Precot/Mapping"),
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
                  onClick: () => navigate("/Precot/Mapping"),
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
      </Drawer> */}
      <BleachingHeader
        unit="Unit-H"
        formName="Hand Sanitisation Report"
        formatNo="PH-HRD03/F-006"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            key="back"
            type="primary"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
          >
            Back
          </Button>,
          ...(role === "ROLE_HOD" ||
          role === "ROLE_QA" ||
          role === "ROLE_QC" ||
          role === "ROLE_DESIGNEE"
            ? [
                <Button
                  key="approve"
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
                </Button>,
                <Button
                  key="reject"
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
                </Button>,
              ]
            : [
                <Button
                  key="save"
                  loading={saveLoading}
                  type="primary"
                  onClick={handleSave}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButton2(),
                  }}
                  shape="round"
                  icon={<IoSave color="#00308F" />}
                >
                  Save
                </Button>,
                <Button
                  key="submit"
                  loading={submitLoading}
                  type="primary"
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  icon={<GrDocumentStore color="#00308F" />}
                  shape="round"
                >
                  Submit
                </Button>,
              ]),
          <Button
            key="logout"
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
                navigate("/Precot"); // Ensure navigate is defined or imported
              }
            }}
          >
            Logout
          </Button>,
          <Tooltip
            key="user-info"
            trigger="click"
            style={{ backgroundColor: "#fff" }}
            title={
              <div>
                <h3>{localStorage.getItem("username")}</h3>
                <p>{localStorage.getItem("role")}</p>
              </div>
            }
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#E5EEF9" }}
              shape="circle"
              icon={<FaUserCircle color="#00308F" size={20} />}
            />
          </Tooltip>,
          <PrecotSidebar
            open={open}
            onClose={onClose}
            role={localStorage.getItem("role")}
          />,
          <Modal
            key="reject-modal"
            title="Reject"
            open={showModal}
            onOk={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
            destroyOnClose={true}
            footer={[
              <Button
                key="submit-reject"
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
          </Modal>,
        ]}
      />

      <div
        style={{
          display: "flex",
          flex: "1",
          justifyContent: "center",
          width: "500px",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <Input
          addonBefore="Date"
          size="Medium"
          value={formatDate(newDate)}
          readOnly
        />
        <Input addonBefore="Shift" size="Medium" value={shift} readOnly />
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

export default Padpunching_f25;
