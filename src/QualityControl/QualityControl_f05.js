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
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader.js";
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
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QualityControl_f05 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [planingDetailsByDate, setPlaningDetailsByDate] = useState("");
  const [planId, setplanId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dateObject = new Date(date);
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();
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
  const [rows, setRows] = useState([{}]);
  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  // signature Image
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.supervisor_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${  API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [planingDetailsByDate,   API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = planingDetailsByDate?.hod_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${  API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [planingDetailsByDate,   API.prodUrl, token]);

  const handleAddRow = () => {
    setRows([...rows, {}]);
  };

  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    }
  };

  const roleauth = localStorage.getItem("role");

  const disabled =
    (roleauth === "ROLE_SUPERVISOR" &&
      planingDetailsByDate?.supervisor_status === "SUPERVISOR_APPROVED" &&
      planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL") ||
    planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
    (roleauth === "ROLE_HOD" &&
      (planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
        planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status === "HOD_REJECTED")) ||
    (roleauth === "ROLE_DESIGNEE" &&
      (planingDetailsByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
        planingDetailsByDate?.hod_status === "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status === "HOD_REJECTED"));

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const canDisplayAddDelete = () => {
    if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      return "none";
    }
  };

  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        planingDetailsByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        planingDetailsByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (planingDetailsByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
          planingDetailsByDate?.hod_status == "WAITING_FOR_APPROVAL") ||
        planingDetailsByDate?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        planingDetailsByDate?.hod_status == "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        planingDetailsByDate?.hod_status == "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        planingDetailsByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        planingDetailsByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      } else if (
        planingDetailsByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (planingDetailsByDate?.hod_status == "WAITING_FOR_APPROVAL" ||
          planingDetailsByDate?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        planingDetailsByDate?.hod_status == "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        planingDetailsByDate?.hod_status == "HOD_APPROVED" ||
        planingDetailsByDate?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const handleRejectModal = () => {
    setShowModal(true);
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${  API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/approveOrReject`,
        {
          id: 2,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QC/F-05/Summary");
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

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${  API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/approveOrReject`,
        {
          id: 2,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QC/F-05/Summary");
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
      await SaveGlassWareBreakage();
    } catch (error) {
      console.error(
        "Error saving ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL Record:",
        error
      );
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitGlasswareBreakage();
    } catch (error) {
      console.error(
        "Error submitting ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL  Record..",
        error
      );
    }
  };

  const SaveGlassWareBreakage = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        formatName: "ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT",
        formatNo: "PH-QCL01/F-005",
        revisionNo: 2,
        refSopNo: "PH-QCL01-D-05",
        unit: "H",
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${  API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/SaveLogbookSpunlacePlanning`,
        payload,
        { headers }
      );
      console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/QC/F-05/Summary");
      }, 1500);
      message.success(
        "ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL  Record Saved Successfully.."
      );
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error(
        "Failed to save ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL  Record !!"
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitGlasswareBreakage = async () => {
    setSubmitLoading(true);
    try {
      const payload = {
        formatName: "ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT",
        formatNo: "PH-QCL01/F-005",
        revisionNo: 2,
        refSopNo: "PH-QCL01-D-05",
        unit: "H",
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${  API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/SubmitLogbookSpunlacePlanning`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QC/F-05/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      message.error(error.response.data.message);
      throw new Error(
        "Failed to submit ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL  Record!!"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QC/F-05/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
  }, []);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${  API.prodUrl}/Precot/api/spunlace/Service/LogbookSpunlacePlanning/getByDate?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setPlaningDetailsByDate(response.data);
      if (
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.supervisor_status !== "SUPERVISOR_APPROVED") ||
        ((roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") &&
          response.data.hod_status == "HOD_REJECTED")
      ) {
        message.error("Supervisor Yet Not Approved");
        setTimeout(() => {
          navigate("/Precot/QC/F-05/Summary");
        }, 1500);
      }

      if (response.data) {
        const data = response.data;
        setplanId(data.planId);
        if (data && data.prodPlanDetails) {
        } else {
          setRows([]);
        }
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
      label: <p>ANALYTICAL REPORT</p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Tested Date
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Regular / Trial batch
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Batch No.
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Mixing
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Softener
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Local / Export
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Physical Appearance
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Odor
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Fiber Identification
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Foreign fibers
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                pH
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Surface Activity
              </th>
              <th
                colSpan="5"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Acidity/ Alkalinity
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Sinking time
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Absorbency ( W.H.C.)
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Sulphate Ash
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Water Soluble Substances
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Ether Soluble Substances
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Drying loss (%)
              </th>
              <th
                colSpan="5"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Fluorescence
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Extractable Colouring Matter
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Neps count/g
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                UQL mm
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                L (n) mm
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                L (w) mm. 9Fiber Average Length
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                SFC (n) %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                SFC (w) %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Micronaire Value
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Whiteness Index
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Total Viable Count (TVC - cfu/g)
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Total Fungal Count (TFC - cfu/g)
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Remarks
              </th>
              <th
                colSpan="5"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Accepted (A)/ Rejected (R)/
                <br />
                Accepted Under Deviation (AD)
              </th>
              <th
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Specification Passed
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Reported by (Chemist)
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Approved by
              </th>
            </tr>
            <tr>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Specification
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                contains no more than
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Odorless
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                100 % cotton
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                occasionally a few isolated
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                6 to 8
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                present must not cover the
              </th>
              <th
                colSpan="5"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No pink colour developed <br />
                with Methyl orange and <br />
                Phenolphthaline.
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                max. 10 Sec.
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 23 g/g
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 0.4 %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max 0.5 %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max 0.5 %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 8.0 %
              </th>
              <th
                colSpan="5"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Few isolated intense blue
                <br /> fibers are allowed.
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Not more intense colour.
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 2500
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 12
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 7
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 10
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 90
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 80
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 2.8
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 80
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Max. 1000
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Max. 100
              </th>
            </tr>

            {/* array....... */}
            {rows.map((row, index) => (
              <tr key={index}>
                <td
                  colSpan="3"
                  style={{ textAlign: "center", height: "20px" }}
                ></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="5" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="5" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="5" style={{ textAlign: "center" }}></td>
                <td colSpan="4" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
                <td colSpan="3" style={{ textAlign: "center" }}></td>
              </tr>
            ))}
          </table>

          <button
            onClick={handleAddRow}
            style={{
              backgroundColor: "green",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              fontSize: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              display: canDisplayAddDelete(),
            }}
          >
            <PlusOutlined style={{ marginRight: "8px" }} />
            Add Row
          </button>
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
        formName="ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT"
        formatNo="PH-QCL01/F-005"
        sopNo="PH-QCL01-D-05"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
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
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Date:"
          placeholder="Date"
          value={date}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Month:"
          placeholder="Month"
          value={monthName}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Year:"
          placeholder="Year"
          value={year}
          disabled
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

export default QualityControl_f05;
