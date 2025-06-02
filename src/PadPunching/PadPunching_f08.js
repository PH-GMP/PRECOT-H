/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Tabs,
  Modal,
  Spin,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
  Radio,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader";
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import API from "../baseUrl.json";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import TextArea from "antd/es/input/TextArea";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const PadPunching_f08 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { machineName, week, month08, year08 } = state || {};
  const token = localStorage.getItem("token");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const roleauth = localStorage.getItem("role");
  const [cleaningRecordByDate, setCleaningRecordByDate] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sanitizationId, setsanitizationId] = useState("");
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const handleKeyDown2 = (e) => {
    const isAlphanumeric = /^[a-zA-Z0-9.]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getStyles = () => {
    if (windowWidth <= 480) {
      return {
        backgroundColor: "#8080800d",
        padding: "20px",
        textAlign: "center",
      };
    } else if (windowWidth <= 900) {
      return {
        backgroundColor: "#8080800d",
        padding: "20px",
        textAlign: "center",
      };
    } else {
      return {
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        gap: "10px",
        marginTop: "5px",
        marginRight: "10px",
      };
    }
  };

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [filteredOptionsChe, setFilteredOptionsChe] = useState([]);
  const [receiverOptions, setReceiverOptions] = useState([]);
  const [receiverOptionsChe, setReceiverOptionsChe] = useState([]);

  useEffect(() => {
    const fetchReciever = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/PadPunching/Service/chemicalName`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const options = response.data.map((item) => ({
          label: item.value || "Unknown",
          value: item.value,
        }));
        setReceiverOptions(options);
        setFilteredOptions(options);
      } catch (error) {
        console.error("Error fetching product names:", error);
      }
    };

    fetchReciever();
  }, []);


  useEffect(() => {
    const fetchRecieverChe = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/PadPunching/Service/chemicalBatchNumber`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const options = response.data.map((item) => ({
          label: item.value || "Unknown",
          value: item.value,
        }));
        setReceiverOptionsChe(options);
        setFilteredOptionsChe(options);
      } catch (error) {
        console.error("Error fetching product names:", error);
      }
    };

    fetchRecieverChe();
  }, []);

  const handleBulkYes = () => {
    setRollFeeding("Y");
    setPunchingTools("Y");
    setToolDies("Y");
    setTravelRollers("Y");
    setCarriersWagonMagazine("Y");
    setPushers("Y");
    setChute("Y");
    setCuttingTable("Y");
    setCuttingBlades("Y");
    setAllPackingTables("Y");
  };
  const handleBulkNo = () => {
    setRollFeeding("N");
    setPunchingTools("N");
    setToolDies("N");
    setTravelRollers("N");
    setCarriersWagonMagazine("N");
    setPushers("N");
    setChute("N");
    setCuttingTable("N");
    setCuttingBlades("N");
    setAllPackingTables("N");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = cleaningRecordByDate?.supervisor_sign;
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
  }, [cleaningRecordByDate, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = cleaningRecordByDate?.hod_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [cleaningRecordByDate, API.prodUrl, token]);

  const [RollFeeding, setRollFeeding] = useState("");
  const [PunchingTools, setPunchingTools] = useState("");
  const [ToolDies, setToolDies] = useState("");
  const [TravelRollers, setTravelRollers] = useState("");
  const [CarriersWagonMagazine, setCarriersWagonMagazine] = useState("");
  const [Pushers, setPushers] = useState("");
  const [Chute, setChute] = useState("");
  const [CuttingTable, setCuttingTable] = useState("");
  const [CuttingBlades, setCuttingBlades] = useState("");
  const [AllPackingTables, setAllPackingTables] = useState("");
  const [remarks, setRemarks] = useState("");
  const [cleanedBy, setcleanedBy] = useState("");
  const [nameOfChemical, setNameoftheChemical] = useState("");
  const [chemicalBatchNumber, setChemicalBatchNo] = useState("");
  const [ExpDate, setExpDate] = useState("");
  const [Date, setDate] = useState("");

  // key 1 onchange functions
  const handleRollFeeding = (e) => {
    setRollFeeding(e.target.value);
  };
  const handlePunchingTools = (e) => {
    setPunchingTools(e.target.value);
  };
  const handleToolDies = (e) => {
    setToolDies(e.target.value);
  };
  const handleTravelRollers = (e) => {
    setTravelRollers(e.target.value);
  };
  const handleCarrierWagonMagazine = (e) => {
    setCarriersWagonMagazine(e.target.value);
  };
  const handlePunchers = (e) => {
    setPushers(e.target.value);
  };
  const handleChute = (e) => {
    setChute(e.target.value);
  };
  const handleCuttingTable = (e) => {
    setCuttingTable(e.target.value);
  };
  const handleCuttingBlades = (e) => {
    setCuttingBlades(e.target.value);
  };
  const handleAllPackingTables = (e) => {
    setAllPackingTables(e.target.value);
  };
  const handleCleanedBy = (event) => {
    const value = event.target.value;
    setcleanedBy(value);
  };

  const handleNameofChemicalChange = (event) => {
    const value = event.target.value;
    setNameoftheChemical(value);
  };
  const handleChemicalBatchNoChange = (event) => {
    const value = event.target.value;
    setChemicalBatchNo(value);
  };
  const handleExpDateChange = (event) => {
    const value = event.target.value;
    setExpDate(value);
  };
  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };

  const handleSelectText = (e, name) => {
    // if (
    //   !/[0-9a-zA-Z._ ]/.test(e.key) &&
    //   e.key !== "Backspace" &&
    //   e.key !== "Delete" &&
    //   e.key !== "ArrowLeft" &&
    //   e.key !== "ArrowRight" &&
    //   e.key !== "Tab"
    // ) {
    //   e.preventDefault();
    // }

    if (e.key === "Enter") {
      setNameoftheChemical(e.target.value);
    }
  };

  // const handleSelectTextChe = (e, name) => {
  //   if (
  //     !/[0-9a-zA-Z._ ]/.test(e.key) &&
  //     e.key !== "Backspace" &&
  //     e.key !== "Delete" &&
  //     e.key !== "ArrowLeft" &&
  //     e.key !== "ArrowRight" &&
  //     e.key !== "Tab"
  //   ) {
  //     e.preventDefault();
  //   }

  //   if (e.key === "Enter") {
  //     setChemicalBatchNo(e.target.value);
  //   }
  // };

  const handleSelectTextChe = (e, name) => {
    if (e.key === "Enter") {
      setChemicalBatchNo(e.target.value);
    }
  };
  
  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredOptions(receiverOptions);
    } else {
      const filtered = receiverOptions.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  
  const handleSearchChe = (searchText) => {
    if (!searchText) {
      setFilteredOptionsChe(receiverOptionsChe);
    } else {
      const filtered = receiverOptionsChe.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredOptionsChe(filtered);
    }
  };

  //   const disabled=(roleauth === "ROLE_SUPERVISOR" && planingDetailsByDate?.supervisor_status === "SUPERVISOR_APPROVED") ||
  //   (roleauth === "ROLE_HOD" && planingDetailsByDate?.hod_status === "HOD_APPROVED");
  const disable =
    (roleauth === "ROLE_SUPERVISOR" &&
      cleaningRecordByDate?.supervisor_status === "SUPERVISOR_APPROVED" &&
      cleaningRecordByDate?.hod_status === "WAITING_FOR_APPROVAL") ||
    cleaningRecordByDate?.hod_status === "HOD_APPROVED" ||
    (roleauth === "ROLE_HOD" &&
      (cleaningRecordByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
        cleaningRecordByDate?.hod_status === "HOD_APPROVED" ||
        cleaningRecordByDate?.hod_status === "HOD_REJECTED")) ||
    (roleauth === "ROLE_DESIGNEE" &&
      (cleaningRecordByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
        cleaningRecordByDate?.hod_status === "HOD_APPROVED" ||
        cleaningRecordByDate?.hod_status === "HOD_REJECTED"));

  // Formated Date
  const formattedDateHod = () => {
    if (cleaningRecordByDate?.hod_submit_on) {
      const date = moment(cleaningRecordByDate?.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDatesupervisor = () => {
    if (cleaningRecordByDate?.supervisor_submit_on) {
      const date = moment(cleaningRecordByDate?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        cleaningRecordByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        cleaningRecordByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (cleaningRecordByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
          cleaningRecordByDate?.hod_status == "WAITING_FOR_APPROVAL") ||
        cleaningRecordByDate?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        cleaningRecordByDate?.hod_status == "HOD_APPROVED" ||
        cleaningRecordByDate?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        cleaningRecordByDate?.hod_status == "HOD_APPROVED" ||
        cleaningRecordByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        cleaningRecordByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        cleaningRecordByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        cleaningRecordByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (cleaningRecordByDate?.hod_status == "WAITING_FOR_APPROVAL" ||
          cleaningRecordByDate?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        cleaningRecordByDate?.hod_status == "HOD_APPROVED" ||
        cleaningRecordByDate?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        cleaningRecordByDate?.hod_status == "HOD_APPROVED" ||
        cleaningRecordByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  // Save & Submit Api
  const handleSave = async () => {
    try {
      await saveMachineSanitizationRecord();
    } catch (error) {
      console.error("Error saving Machine Cleaning Record :", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await submitMachineSanitizationRecord();
    } catch (error) {
      console.error("Error submitting Logbook - Spunlace Planning:", error);
    }
  };

  const saveMachineSanitizationRecord = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        formatName: "Sanitization Of Machines & Surfaces",
        formatNo: "PH-PRD03/F-008",
        revisionNo: 1,
        sopNumber: "PH-PRD04-D-04",
        unit: "Unit H",
        sanitizationId: sanitizationId,

        machineName: machineName,
        weekNo: week,
        month: month08,
        year: year08,
        nameOfChemical: nameOfChemical,
        chemicalBatchNumber: chemicalBatchNumber,
        expDate: ExpDate,
        date: Date,
        rollFeedingAreaConveyor: RollFeeding,
        punchingTools: PunchingTools,
        toolsDiesSurfaces: ToolDies,
        travelRollers: TravelRollers,
        carriersWagonMagazine: CarriersWagonMagazine,
        pushers: Pushers,
        chuteForFalu: Chute,
        cuttingTable: CuttingTable,
        cuttingBlades: CuttingBlades,
        allPackingTables: AllPackingTables,
        remarks: remarks,
        sanitizedBy: cleanedBy,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/SaveSanitisationOfMachinesAndSurfaces`,
        payload,
        { headers }
      );

      console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/PadPunching/F-08/Summary");
      }, 1500);
      message.success("sanitization Record Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save sanitization Record  !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const submitMachineSanitizationRecord = async () => {
    setSubmitLoading(true);
    if (nameOfChemical == "null" || nameOfChemical == "") {
      message.warning("Name of the Chemical Required");
      setSubmitLoading(false);
      return;
    }
    if (chemicalBatchNumber == "null" || chemicalBatchNumber == "") {
      message.warning("Chemical Batch Number Required");
      setSubmitLoading(false);
      return;
    }
    if (ExpDate == "null" || ExpDate == "") {
      message.warning("Exp. Date  Required");
      setSubmitLoading(false);
      return;
    }
    if (cleanedBy == "null" || cleanedBy == "") {
      message.warning("Sanitized By Name Required");
      setSubmitLoading(false);
      return;
    }
    try {
      const payload = {
        formatName: "Sanitization Of Machines & Surfaces",
        formatNo: "PH-PRD03/F-008",
        revisionNo: 1,
        sopNumber: "PH-PRD04-D-04",
        unit: "Unit H",
        sanitizationId: sanitizationId,

        machineName: machineName,
        weekNo: week,
        month: month08,
        year: year08,
        nameOfChemical: nameOfChemical,
        chemicalBatchNumber: chemicalBatchNumber,
        expDate: ExpDate,
        date: Date,
        rollFeedingAreaConveyor: RollFeeding,
        punchingTools: PunchingTools,
        toolsDiesSurfaces: ToolDies,
        travelRollers: TravelRollers,
        carriersWagonMagazine: CarriersWagonMagazine,
        pushers: Pushers,
        chuteForFalu: Chute,
        cuttingTable: CuttingTable,
        cuttingBlades: CuttingBlades,
        allPackingTables: AllPackingTables,
        remarks: remarks,
        sanitizedBy: cleanedBy,
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/SubmitSanitisationOfMachinesAndSurfaces`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/PadPunching/F-08/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to submit Sanitization Record !!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/PadPunching/F-08/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
  }, []);
  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/approveOrRejectSanitisationOfMachinesAndSurfaces`,
        {
          id: sanitizationId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/PadPunching/F-08/Summary");
      })
      .catch((err) => {
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setSubmitLoading(false);
      return;
    }
    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/approveOrRejectSanitisationOfMachinesAndSurfaces`,
        {
          id: sanitizationId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/PadPunching/F-08/Summary");
      })
      .catch((err) => {
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/findByMachineNameWeekNoMonthAndYear/SanitisationOfMachinesAndSurfaces?machineName=${machineName}&weekNo=${week}&month=${month08}&year=${year08}
`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response (details based on date)", response.data);
      setemptyarraycheck(response.data.length);
      setCleaningRecordByDate(response.data);
      if (
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.supervisor_status !== "SUPERVISOR_APPROVED") ||
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.hod_status == "HOD_REJECTED")
      ) {
        message.error("Supervisor Yet Not Approved");
        setTimeout(() => {
          navigate("/Precot/Bleaching/F-08/Summary");
        }, 1500);
      }
      console.log("seted planing response", response.data.sanitizationId);

      if (response.data && response.data.message !== "No data") {
        const data = response.data;
        console.log("set response date for all fields", data);
        setsanitizationId(response.data.sanitizationId);
        setRollFeeding(response.data.rollFeedingAreaConveyor || "NA");
        setPunchingTools(response.data.punchingTools || "NA");
        setNameoftheChemical(response.data.nameOfChemical || "NA");
        setChemicalBatchNo(response.data.chemicalBatchNumber || "NA");
        setExpDate(response.data.expDate);
        setDate(response.data.date);
        setToolDies(response.data.toolsDiesSurfaces || "NA");
        setTravelRollers(response.data.travelRollers || "NA");
        setCarriersWagonMagazine(response.data.carriersWagonMagazine || "NA");
        setPushers(response.data.pushers || "NA");
        setChute(response.data.chuteForFalu || "NA");
        setCuttingTable(response.data.cuttingTable || "NA");
        setCuttingBlades(response.data.cuttingBlades || "NA");
        setAllPackingTables(response.data.allPackingTables || "NA");
        setcleanedBy(response.data.sanitizedBy);
        setRemarks(response.data.remarks || "NA");
      } else {
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      message.error(error.message);
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Activities</p>,
      children: (
        <div>
          {/* colums = 100 */}
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <th colSpan="5" style={{ height: "35px" }}>
                Sr. No.{" "}
              </th>
              <th colSpan="15">Activity</th>
              <th colSpan="30"></th>
              <th colSpan="5">Sr. No. </th>
              <th colSpan="15">Activity</th>
              <th colSpan="30"></th>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                1
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Roll Feeding Area / conveyor{" "}
              </td>
              <td colSpan="30">
                {" "}
                <Radio.Group
                  onChange={handleRollFeeding}
                  value={RollFeeding}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="5" style={{ textAlign: "center" }}>
                6{" "}
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Pushers
              </td>
              <td colSpan="30">
                {" "}
                <Radio.Group
                  onChange={handlePunchers}
                  value={Pushers}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                2
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Punching Tools{" "}
              </td>
              <td colSpan="30">
                {" "}
                <Radio.Group
                  onChange={handlePunchingTools}
                  value={PunchingTools}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="5" style={{ textAlign: "center" }}>
                7
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Chute (for FALU){" "}
              </td>
              <td colSpan="30">
                {" "}
                <Radio.Group
                  onChange={handleChute}
                  value={Chute}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                3
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Tool / Dies surfaces{" "}
              </td>
              <td colSpan="30">
                {" "}
                <Radio.Group
                  onChange={handleToolDies}
                  value={ToolDies}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="5" style={{ textAlign: "center" }}>
                8
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Cutting Table (for 5x6/Puffs)
              </td>
              <td colSpan="30">
                {" "}
                <Radio.Group
                  onChange={handleCuttingTable}
                  value={CuttingTable}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                4
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Travel Rollers{" "}
              </td>
              <td colSpan="30">
                {" "}
                <Radio.Group
                  onChange={handleTravelRollers}
                  value={TravelRollers}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="5" style={{ textAlign: "center" }}>
                9{" "}
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Cutting Blades{" "}
              </td>
              <td colSpan="30">
                {" "}
                <Radio.Group
                  onChange={handleCuttingBlades}
                  value={CuttingBlades}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ height: "35px", textAlign: "center" }}>
                5
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                Carriers / Wagon / Magazine
              </td>
              <td colSpan="30">
                {" "}
                <Radio.Group
                  onChange={handleCarrierWagonMagazine}
                  value={CarriersWagonMagazine}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
              <td colSpan="5" style={{ textAlign: "center" }}>
                10
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                All packing Tables{" "}
              </td>
              <td colSpan="30">
                {" "}
                <Radio.Group
                  onChange={handleAllPackingTables}
                  value={AllPackingTables}
                  disabled={disable}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td
                colSpan="100"
                style={{ padding: "10px", borderBottom: "none" }}
              >
                Remark / Comment (in case of any abnormality observed) :{" "}
              </td>
            </tr>
            <tr>
              <td colSpan="100" style={{ height: "55px", borderTop: "none" }}>
                <TextArea
                  value={remarks}
                  disabled={disable}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={3}
                  style={{ width: "100%" }}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              {/* <td colSpan="34" style={{ height: "35px", textAlign: "center" }}>Performed by Operator</td> */}
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                Sanitized by Trained person :
              </td>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                Verified by Production Supervisor :{" "}
              </td>
              <td colSpan="50" style={{ textAlign: "center" }}>
                Reviewed by HOD/ Designee :
              </td>
            </tr>
            <tr>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                <Input
                  placeholder="Sanitized By"
                  value={cleanedBy}
                  onChange={handleCleanedBy}
                  disabled={disable}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    textAlign: "center",
                  }}
                />
              </td>

              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {cleaningRecordByDate?.supervisor_status ===
                  "SUPERVISOR_APPROVED" && (
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
                        <div>{cleaningRecordByDate?.supervisor_sign}</div>
                        <div>{formattedDatesupervisor()}</div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Supervisor Sign"
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
                    {/* <div>Signature & Date</div> */}
                  </>
                )}
              </td>

              <td
                colSpan="50"
                style={{
                  textAlign: "center",
                  // verticalAlign: "bottom"
                }}
              >
                {(cleaningRecordByDate?.hod_status === "HOD_REJECTED" ||
                  cleaningRecordByDate?.hod_status === "HOD_APPROVED") && (
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
                        <div>{cleaningRecordByDate?.hod_sign}</div>
                        <div>{formattedDateHod()}</div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="HOD Sign"
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
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="Sanitization Of Machines & Surfaces "
        formatNo="PH-PRD03/F-008"
        sopNo="PH-PRD04-D-04"
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
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
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

      {/* date row */}
      <div>
        <div style={getStyles()}>
          <Input
            addonBefore="Machine Name:"
            placeholder="Machine Name"
            value={machineName}
            disabled
            style={{ width: "100%", height: "35px" }}
          />
          <Input
            addonBefore="Week:"
            placeholder="Week"
            value={week}
            disabled
            style={{ width: "100%", height: "35px" }}
          />
          <Input
            addonBefore="Month:"
            placeholder="Month"
            value={month08}
            disabled
            style={{ width: "100%", height: "35px" }}
          />
          <Input
            addonBefore="Year:"
            placeholder="Year"
            value={year08}
            disabled
            style={{ width: "100%", height: "35px" }}
          />
        </div>
      </div>
      <div>
        <div style={getStyles()}>
          {/* <Input
            value={nameOfChemical}
            onChange={handleNameofChemicalChange}
            addonBefore="Name of the Chemical:"
            style={{
              padding: 3,
              margin: 0,
              width: "100%",
            }}
            disabled={disable}
            onKeyDown={handleKeyDown2}
          /> */}
          <Col style={{ marginLeft: "0.5rem" }} span={2}>
            <label>Name of the Chemical:</label>
          </Col>
          <Col span={3}>
            <Select
              style={{ width: "100%", marginLeft: "-1rem" }}
              value={nameOfChemical}
              onInputKeyDown={(e) => {
                handleSelectText(e, "nameOfChemical");
              }}
              onChange={(e) => setNameoftheChemical(e)}
              dropdownStyle={{ textAlign: "center" }}
              onSearch={handleSearch}
              showSearch
              filterOption={false}
              onKeyDown={(e) => {
                handleSelectText(e, "nameOfChemical");
              }}
            >
              {filteredOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Col>
          {/* <Input
            value={chemicalBatchNumber}
            onChange={handleChemicalBatchNoChange}
            addonBefore="Chemical Batch Number:"
            style={{
              padding: 3,
              margin: 0,
              width: "100%",
            }}
            disabled={disable}
            onKeyDown={handleKeyDown2}
          /> */}
          <Col style={{ marginLeft: "0.5rem" }} span={2}>
            <label>Chemical Batch Number:</label>
          </Col>
          <Col span={3}>
            <Select
              style={{ width: "100%" }}
              value={chemicalBatchNumber}
              onInputKeyDown={(e) => {
                handleSelectTextChe(e, "chemicalBatchNumber");
              }}
              onChange={(e) => setChemicalBatchNo(e)}
              dropdownStyle={{ textAlign: "center" }}
              onSearch={handleSearchChe}
              showSearch
              filterOption={false}
              onKeyDown={(e) => {
                handleSelectTextChe(e, "chemicalBatchNumber");
              }}
            >
              {filteredOptionsChe.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Input
            value={ExpDate}
            onChange={handleExpDateChange}
            addonBefore="Exp. Date:"
            type="date"
            style={{
              padding: 3,
              margin: 0,
              width: "100%",
            }}
            disabled={disable}
          />
          <Input
            value={Date}
            onChange={handleDateChange}
            addonBefore="Date:"
            type="date"
            style={{
              padding: 3,
              margin: 0,
              width: "100%",
            }}
            disabled={disable}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          gap: "10px",
          marginTop: "5px",
          marginRight: "5px",
        }}
      >
        <button
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            border: "none",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          shape="round"
          onClick={() => handleBulkYes()}
          disabled={disable}
        >
          <FontAwesomeIcon
            icon={faCheckCircle}
            style={{ marginRight: "5px" }}
          />
          Bulk Yes
        </button>
        <button
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            border: "none",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          shape="circle"
          onClick={() => handleBulkNo()}
          disabled={disable}
        >
          <FontAwesomeIcon
            icon={faTimesCircle}
            style={{ marginRight: "5px" }}
          />
          Bulk No
        </button>
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
        // onChange={onChange}
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

export default PadPunching_f08;
