/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Tabs, Tooltip } from "antd";
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

const QA_f22 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { year } = state || {};
  console.log("Year", year);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [DetailsByParam, setDetailsByParam] = useState("");
  const [planId, setplanId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage, setGetImage] = useState("");
  const [selectedrow, setselectedrow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const startYear = year ? year.split("-")[0] : null;
  const [rejectRemarks, setRejectRemarks] = useState("");
  const minDate = `${startYear}-04-01`;
  const [loading, setLoading] = useState(false);
  const maxDate = `${startYear}-04-01`;
  console.log("MinDate", startYear);
  const midYear = parseInt(startYear) + 1;
  const endYear = parseInt(midYear) + 1;

  const [rows, setRows] = useState([
    {
      lineId: "",
      NameSupplier: "",
      supplierType: "Packing",
      planApr: "",
      planMay: "",
      planJun: "",
      planJul: "",
      planAug: "",
      planSept: "",
      planOct: "",
      planNov: "",
      planDec: "",
      planJan: "",
      planFeb: "",
      planMar: "",
      planApr1: "",
      planMay1: "",
      planJun1: "",
      planJul1: "",
      planAug1: "",
      planSept1: "",
      planOct1: "",
      planNov1: "",
      planDec1: "",
      planJan1: "",
      planFeb1: "",
      planMar1: "",

      statusApr: "",
      statusMay: "",
      statusJun: "",
      statusJul: "",
      statusAug: "",
      statusSept: "",
      statusOct: "",
      statusNov: "",
      statusDec: "",
      statusJan: "",
      statusFeb: "",
      statusMar: "",

      statusApr1: "",
      statusMay1: "",
      statusJun1: "",
      statusJul1: "",
      statusAug1: "",
      statusSept1: "",
      statusOct1: "",
      statusNov1: "",
      statusDec1: "",
      statusJan1: "",
      statusFeb1: "",
      statusMar1: "",
    },
  ]);

  const monthMap = {
    statusApr: 4,
    statusMay: 5,
    statusJun: 6,
    statusJul: 7,
    statusAug: 8,
    statusSept: 9,
    statusOct: 10,
    statusNov: 11,
    statusDec: 12,
    statusJan: 1,
    statusFeb: 2,
    statusMar: 3,

    statusApr1: 4,
    statusMay1: 5,
    statusJun1: 6,
    statusJul1: 7,
    statusAug1: 8,
    statusSept1: 9,
    statusOct1: 10,
    statusNov1: 11,
    statusDec1: 12,
    statusJan1: 1,
    statusFeb1: 2,
    statusMar1: 3,
  };

  const [rows1, setRows1] = useState([
    {
      lineId: "",
      NameSupplier: "",
      supplierType: "Chemical Supplier",
      planApr: "",
      planMay: "",
      planJun: "",
      planJul: "",
      planAug: "",
      planSept: "",
      planOct: "",
      planNov: "",
      planDec: "",
      planJan: "",
      planFeb: "",
      planMar: "",

      planApr1: "",
      planMay1: "",
      planJun1: "",
      planJul1: "",
      planAug1: "",
      planSept1: "",
      planOct1: "",
      planNov1: "",
      planDec1: "",
      planJan1: "",
      planFeb1: "",
      planMar1: "",

      statusApr: "",
      statusMay: "",
      statusJun: "",
      statusJul: "",
      statusAug: "",
      statusSept: "",
      statusOct: "",
      statusNov: "",
      statusDec: "",
      statusJan: "",
      statusFeb: "",
      statusMar: "",

      statusApr1: "",
      statusMay1: "",
      statusJun1: "",
      statusJul1: "",
      statusAug1: "",
      statusSept1: "",
      statusOct1: "",
      statusNov1: "",
      statusDec1: "",
      statusJan1: "",
      statusFeb1: "",
      statusMar1: "",
    },
  ]);

  const [rows2, setRows2] = useState([
    {
      lineId: "",
      NameSupplier: "",
      supplierType: "Cotton Supplier",
      planApr: "",
      planMay: "",
      planJun: "",
      planJul: "",
      planAug: "",
      planSept: "",
      planOct: "",
      planNov: "",
      planDec: "",
      planJan: "",
      planFeb: "",
      planMar: "",

      planApr1: "",
      planMay1: "",
      planJun1: "",
      planJul1: "",
      planAug1: "",
      planSept1: "",
      planOct1: "",
      planNov1: "",
      planDec1: "",
      planJan1: "",
      planFeb1: "",
      planMar1: "",

      statusApr: "",
      statusMay: "",
      statusJun: "",
      statusJul: "",
      statusAug: "",
      statusSept: "",
      statusOct: "",
      statusNov: "",
      statusDec: "",
      statusJan: "",
      statusFeb: "",
      statusMar: "",

      statusApr1: "",
      statusMay1: "",
      statusJun1: "",
      statusJul1: "",
      statusAug1: "",
      statusSept1: "",
      statusOct1: "",
      statusNov1: "",
      statusDec1: "",
      statusJan1: "",
      statusFeb1: "",
      statusMar1: "",
    },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        NameSupplier: "",
        planApr: "",
        planMay: "",
        planJun: "",
        planJul: "",
        planAug: "",
        planSept: "",
        planOct: "",
        planNov: "",
        planDec: "",
        planJan: "",
        planFeb: "",
        planMar: "",
        planApr1: "",
        planMay1: "",
        planJun1: "",
        planJul1: "",
        planAug1: "",
        planSept1: "",
        planOct1: "",
        planNov1: "",
        planDec1: "",
        planJan1: "",
        planFeb1: "",
        planMar1: "",
      },
    ]);
  };

  const handleAddRow1 = () => {
    setRows1([
      ...rows1,
      {
        NameSupplier: "",
        planApr: "",
        planMay: "",
        planJun: "",
        planJul: "",
        planAug: "",
        planSept: "",
        planOct: "",
        planNov: "",
        planDec: "",
        planJan: "",
        planFeb: "",
        planMar: "",
        planApr1: "",
        planMay1: "",
        planJun1: "",
        planJul1: "",
        planAug1: "",
        planSept1: "",
        planOct1: "",
        planNov1: "",
        planDec1: "",
        planJan1: "",
        planFeb1: "",
        planMar1: "",
      },
    ]);
  };

  const handleAddRow2 = () => {
    setRows2([
      ...rows2,
      {
        NameSupplier: "",
        planApr: "",
        planMay: "",
        planJun: "",
        planJul: "",
        planAug: "",
        planSept: "",
        planOct: "",
        planNov: "",
        planDec: "",
        planJan: "",
        planFeb: "",
        planMar: "",
        planApr1: "",
        planMay1: "",
        planJun1: "",
        planJul1: "",
        planAug1: "",
        planSept1: "",
        planOct1: "",
        planNov1: "",
        planDec1: "",
        planJan1: "",
        planFeb1: "",
        planMar1: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
      setRows(newRows);
    }
  };

  const handleDeleteRow1 = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      const newRows = rows1.filter((_, rowIndex) => rowIndex !== index);
      setRows1(newRows);
    }
  };
  const handleDeleteRow2 = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      const newRows = rows2.filter((_, rowIndex) => rowIndex !== index);
      setRows2(newRows);
    }
  };

  const handleChemicalMaterialChange = (index, field, value) => {
    const newRows = [...rows1];
    if (value === "p") {
      value = value.toUpperCase();
    }
    newRows[index][field] = value;
    setRows1(newRows);
  };

  const handleCottonMaterialChange = (index, field, value) => {
    const newRows = [...rows2];
    if (value === "p") {
      value = value.toUpperCase();
    }
    newRows[index][field] = value;
    setRows2(newRows);
  };

  const handlePackingMaterialChange = (index, field, value) => {
    const newRows = [...rows];
    if (value === "p") {
      value = value.toUpperCase();
    }
    newRows[index][field] = value;
    setRows(newRows);
  };

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  // signature Image
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedrow?.designeeSign;
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
  }, [DetailsByParam, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedrow?.qaManagerMrSign;
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
  }, [DetailsByParam, API.prodUrl, token]);

  const handleKeyDown2 = (event) => {
    if (!["P", "p"].includes(event.key) && event.key.length === 1) {
      event.preventDefault();
    }
  };

  const roleauth = localStorage.getItem("role");
  const disabled =
    (roleauth === "ROLE_MR" || roleauth === "QA_MANAGER") &&
    DetailsByParam?.mr_status === "MR_SUBMITTED";

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const canDisplayAddDelete = () => {
    if (
      (roleauth == "QA_MANAGER" || roleauth == "ROLE_MR") &&
      (DetailsByParam?.mr_status === "MR_SUBMITTED" ||
        DetailsByParam?.mr_status === "MR_SAVED")
    ) {
      return "none";
    }
  };

  // Display Button Based on Role Status

  const canDisplayButtons = () => {
    if (roleauth == "ROLE_DESIGNEE") {
      if (
        selectedrow?.designeeStatus == "DESIGNEE_SUBMITTED" &&
        selectedrow?.qaManagerMrStatus == "QA_MANAGER_MR_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedrow?.designeeStatus == "DESIGNEE_SUBMITTED" &&
          selectedrow?.qaManagerMrStatus == "WAITING_FOR_APPROVAL") ||
        selectedrow?.qaManagerMrStatus == "QA_MANAGER_MR_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "QA_MANAGER" || "ROLE_MR") {
      if (
        selectedrow?.qaManagerMrStatus == "QA_MANAGER_MR_APPROVED" ||
        selectedrow?.qaManagerMrStatus == "QA_MANAGER_MR_REJECTED"
        // emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedrow?.qaManagerMrStatus == "QA_MANAGER_MR_APPROVED" ||
        selectedrow?.qaManagerMrStatus == "QA_MANAGER_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const condition =
    (roleauth === "ROLE_DESIGNEE" &&
      selectedrow?.designeeStatus === "DESIGNEE_SUBMITTED" &&
      selectedrow?.qaManagerMrStatus === "WAITING_FOR_APPROVAL") ||
    selectedrow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED" ||
    ((roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") &&
      (selectedrow?.qaManagerMrStatus === "WAITING_FOR_APPROVAL" ||
        selectedrow?.qaManagerMrStatus === "QA_MANAGER_MR_APPROVED" ||
        selectedrow?.qaManagerMrStatus === "QA_MANAGER_MR_REJECTED"));

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_DESIGNEE") {
      if (
        selectedrow?.designeeStatus == "DESIGNEE_SUBMITTED" &&
        selectedrow?.qaManagerMrStatus == "QA_MANAGER_MR_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        selectedrow?.designeeStatus == "DESIGNEE_SUBMITTED" &&
        (selectedrow?.qaManagerMrStatus == "WAITING_FOR_APPROVAL" ||
          selectedrow?.qaManagerMrStatus == "QA_MANAGER_MR_APPROVED")
      ) {
        return "none";
      }
    } else if (roleauth == "QA_MANAGER" || "ROLE_MR") {
      if (
        selectedrow?.qaManagerMrStatus == "QA_MANAGER_MR_APPROVED" ||
        selectedrow?.qaManagerMrStatus == "QA_MANAGER_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedrow?.qaManagerMrStatus == "QA_MANAGER_MR_APPROVED" ||
        selectedrow?.qaManagerMrStatus == "QA_MANAGER_MR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const handleSave = async () => {
    try {
      await SaveAnnualPlanRecord();
    } catch (error) {
      console.error("Error saving Annual Plan Record:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitAnnualPlanRecord();
    } catch (error) {
      console.error("Error submitting Annual Plan Record..", error);
    }
  };

  const SaveAnnualPlanRecord = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        formatName: "SUPPLIER’S AUDIT PLAN",
        formatNo: "PH-QAD01-F-022",
        revisionNo: 2,
        sopNumber: "PH-QAD01-D-22",
        unit: "Unit H",
        financialYear: year,
        ...(planId && { planId: planId }),

        auditPlanInfoList: [
          ...rows.map((row) => ({
            ...(row.lineId && { info_id: row.lineId }),
            supplierType: "Material Packing",
            supplierName: row.NameSupplier || "NA",
            year1AprilPlan: row.planApr || "NA",
            year1AprilActual: row.statusApr || "null",
            year1MayPlan: row.planMay || "NA",
            year1MayActual: row.statusMay || "null",
            year1JunePlan: row.planJun || "NA",
            year1JuneActual: row.statusJun || "null",
            year1JulyPlan: row.planJul || "NA",
            year1JulyActual: row.statusJul || "null",
            year1AugustPlan: row.planAug || "NA",
            year1AugustActual: row.statusAug || "null",
            year1SeptemberPlan: row.planSept || "NA",
            year1SeptemberActual: row.statusSept || "null",
            year1OctoberPlan: row.planOct || "NA",
            year1OctoberActual: row.statusOct || "null",
            year1NovemberPlan: row.planNov || "NA",
            year1NovemberActual: row.statusNov || "null",
            year1DecemberPlan: row.planDec || "NA",
            year1DecemberActual: row.statusDec || "null",
            year1JanuaryPlan: row.planJan || "NA",
            year1JanuaryActual: row.statusJan || "null",
            year1FebruaryPlan: row.planFeb || "NA",
            year1FebruaryActual: row.statusFeb || "null",
            year1MarchPlan: row.planMar || "NA",
            year1MarchActual: row.statusMar || "null",
            year2AprilPlan: row.planApr1 || "NA",
            year2AprilActual: row.statusApr1 || "null",
            year2MayPlan: row.planMay1 || "NA",
            year2MayActual: row.statusMay1 || "null",
            year2JunePlan: row.planJun1 || "NA",
            year2JuneActual: row.statusJun1 || "null",
            year2JulyPlan: row.planJul1 || "NA",
            year2JulyActual: row.statusJul1 || "null",
            year2AugustPlan: row.planAug1 || "NA",
            year2AugustActual: row.statusAug1 || "null",
            year2SeptemberPlan: row.planSept1 || "NA",
            year2SeptemberActual: row.statusSept1 || "null",
            year2OctoberPlan: row.planOct1 || "NA",
            year2OctoberActual: row.statusOct1 || "null",
            year2NovemberPlan: row.planNov1 || "NA",
            year2NovemberActual: row.statusNov1 || "null",
            year2DecemberPlan: row.planDec1 || "NA",
            year2DecemberActual: row.statusDec1 || "null",
            year2JanuaryPlan: row.planJan1 || "NA",
            year2JanuaryActual: row.statusJan1 || "null",
            year2FebruaryPlan: row.planFeb1 || "NA",
            year2FebruaryActual: row.statusFeb1 || "null",
            year2MarchPlan: row.planMar1 || "NA",
            year2MarchActual: row.statusMar1 || "null",
          })),

          ...rows1.map((row) => ({
            ...(row.lineId && { info_id: row.lineId }),
            supplierType: "chemical Supplier",
            supplierName: row.NameSupplier || "NA",
            year1AprilPlan: row.planApr || "NA",
            year1AprilActual: row.statusApr || "null",
            year1MayPlan: row.planMay || "NA",
            year1MayActual: row.statusMay || "null",
            year1JunePlan: row.planJun || "NA",
            year1JuneActual: row.statusJun || "null",
            year1JulyPlan: row.planJul || "NA",
            year1JulyActual: row.statusJul || "null",
            year1AugustPlan: row.planAug || "NA",
            year1AugustActual: row.statusAug || "null",
            year1SeptemberPlan: row.planSept || "NA",
            year1SeptemberActual: row.statusSept || "null",
            year1OctoberPlan: row.planOct || "NA",
            year1OctoberActual: row.statusOct || "null",
            year1NovemberPlan: row.planNov || "NA",
            year1NovemberActual: row.statusNov || "null",
            year1DecemberPlan: row.planDec || "NA",
            year1DecemberActual: row.statusDec || "null",
            year1JanuaryPlan: row.planJan || "NA",
            year1JanuaryActual: row.statusJan || "null",
            year1FebruaryPlan: row.planFeb || "NA",
            year1FebruaryActual: row.statusFeb || "null",
            year1MarchPlan: row.planMar || "NA",
            year1MarchActual: row.statusMar || "null",
            year2AprilPlan: row.planApr1 || "NA",
            year2AprilActual: row.statusApr1 || "null",
            year2MayPlan: row.planMay1 || "NA",
            year2MayActual: row.statusMay1 || "null",
            year2JunePlan: row.planJun1 || "NA",
            year2JuneActual: row.statusJun1 || "null",
            year2JulyPlan: row.planJul1 || "NA",
            year2JulyActual: row.statusJul1 || "null",
            year2AugustPlan: row.planAug1 || "NA",
            year2AugustActual: row.statusAug1 || "null",
            year2SeptemberPlan: row.planSept1 || "NA",
            year2SeptemberActual: row.statusSept1 || "null",
            year2OctoberPlan: row.planOct1 || "NA",
            year2OctoberActual: row.statusOct1 || "null",
            year2NovemberPlan: row.planNov1 || "NA",
            year2NovemberActual: row.statusNov1 || "null",
            year2DecemberPlan: row.planDec1 || "NA",
            year2DecemberActual: row.statusDec1 || "null",
            year2JanuaryPlan: row.planJan1 || "NA",
            year2JanuaryActual: row.statusJan1 || "null",
            year2FebruaryPlan: row.planFeb1 || "NA",
            year2FebruaryActual: row.statusFeb1 || "null",
            year2MarchPlan: row.planMar1 || "NA",
            year2MarchActual: row.statusMar1 || "null",
          })),

          ...rows2.map((row) => ({
            ...(row.lineId && { info_id: row.lineId }),
            supplierType: "cotton supplier",
            supplierName: row.NameSupplier || "NA",
            year1AprilPlan: row.planApr || "NA",
            year1AprilActual: row.statusApr || "null",
            year1MayPlan: row.planMay || "NA",
            year1MayActual: row.statusMay || "null",
            year1JunePlan: row.planJun || "NA",
            year1JuneActual: row.statusJun || "null",
            year1JulyPlan: row.planJul || "NA",
            year1JulyActual: row.statusJul || "null",
            year1AugustPlan: row.planAug || "NA",
            year1AugustActual: row.statusAug || "null",
            year1SeptemberPlan: row.planSept || "NA",
            year1SeptemberActual: row.statusSept || "null",
            year1OctoberPlan: row.planOct || "NA",
            year1OctoberActual: row.statusOct || "null",
            year1NovemberPlan: row.planNov || "NA",
            year1NovemberActual: row.statusNov || "null",
            year1DecemberPlan: row.planDec || "NA",
            year1DecemberActual: row.statusDec || "null",
            year1JanuaryPlan: row.planJan || "NA",
            year1JanuaryActual: row.statusJan || "null",
            year1FebruaryPlan: row.planFeb || "NA",
            year1FebruaryActual: row.statusFeb || "null",
            year1MarchPlan: row.planMar || "NA",
            year1MarchActual: row.statusMar || "null",
            year2AprilPlan: row.planApr1 || "NA",
            year2AprilActual: row.statusApr1 || "null",
            year2MayPlan: row.planMay1 || "NA",
            year2MayActual: row.statusMay1 || "null",
            year2JunePlan: row.planJun1 || "NA",
            year2JuneActual: row.statusJun1 || "null",
            year2JulyPlan: row.planJul1 || "NA",
            year2JulyActual: row.statusJul1 || "null",
            year2AugustPlan: row.planAug1 || "NA",
            year2AugustActual: row.statusAug1 || "null",
            year2SeptemberPlan: row.planSept1 || "NA",
            year2SeptemberActual: row.statusSept1 || "null",
            year2OctoberPlan: row.planOct1 || "NA",
            year2OctoberActual: row.statusOct1 || "null",
            year2NovemberPlan: row.planNov1 || "NA",
            year2NovemberActual: row.statusNov1 || "null",
            year2DecemberPlan: row.planDec1 || "NA",
            year2DecemberActual: row.statusDec1 || "null",
            year2JanuaryPlan: row.planJan1 || "NA",
            year2JanuaryActual: row.statusJan1 || "null",
            year2FebruaryPlan: row.planFeb1 || "NA",
            year2FebruaryActual: row.statusFeb1 || "null",
            year2MarchPlan: row.planMar1 || "NA",
            year2MarchActual: row.statusMar1 || "null",
          })),
        ],
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/supplierAuditPlan/saveSupplierAuditPlan`,
        payload,
        { headers }
      );
      setTimeout(() => {
        navigate("/Precot/QA/F-22/Summary");
      }, 1500);
      message.success("Annual Plan Record Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to save Annual Plan Record !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitAnnualPlanRecord = async () => {
    setSubmitLoading(true);
    try {
      const payload = {
        formatName: "SUPPLIER’S AUDIT PLAN",
        formatNo: "PH-QAD01-F-022",
        revisionNo: 2,
        sopNumber: "PH-QAD01-D-22",
        unit: "Unit H",
        financialYear: year,
        ...(planId && { planId: planId }),

        auditPlanInfoList: [
          ...rows.map((row) => ({
            ...(row.lineId && { info_id: row.lineId }),
            supplierType: "Material Packing",
            supplierName: row.NameSupplier || "NA",
            year1AprilPlan: row.planApr || "NA",
            year1AprilActual: row.statusApr || "null",
            year1MayPlan: row.planMay || "NA",
            year1MayActual: row.statusMay || "null",
            year1JunePlan: row.planJun || "NA",
            year1JuneActual: row.statusJun || "null",
            year1JulyPlan: row.planJul || "NA",
            year1JulyActual: row.statusJul || "null",
            year1AugustPlan: row.planAug || "NA",
            year1AugustActual: row.statusAug || "null",
            year1SeptemberPlan: row.planSept || "NA",
            year1SeptemberActual: row.statusSept || "null",
            year1OctoberPlan: row.planOct || "NA",
            year1OctoberActual: row.statusOct || "null",
            year1NovemberPlan: row.planNov || "NA",
            year1NovemberActual: row.statusNov || "null",
            year1DecemberPlan: row.planDec || "NA",
            year1DecemberActual: row.statusDec || "null",
            year1JanuaryPlan: row.planJan || "NA",
            year1JanuaryActual: row.statusJan || "null",
            year1FebruaryPlan: row.planFeb || "NA",
            year1FebruaryActual: row.statusFeb || "null",
            year1MarchPlan: row.planMar || "NA",
            year1MarchActual: row.statusMar || "null",
            year2AprilPlan: row.planApr1 || "NA",
            year2AprilActual: row.statusApr1 || "null",
            year2MayPlan: row.planMay1 || "NA",
            year2MayActual: row.statusMay1 || "null",
            year2JunePlan: row.planJun1 || "NA",
            year2JuneActual: row.statusJun1 || "null",
            year2JulyPlan: row.planJul1 || "NA",
            year2JulyActual: row.statusJul1 || "null",
            year2AugustPlan: row.planAug1 || "NA",
            year2AugustActual: row.statusAug1 || "null",
            year2SeptemberPlan: row.planSept1 || "NA",
            year2SeptemberActual: row.statusSept1 || "null",
            year2OctoberPlan: row.planOct1 || "NA",
            year2OctoberActual: row.statusOct1 || "null",
            year2NovemberPlan: row.planNov1 || "NA",
            year2NovemberActual: row.statusNov1 || "null",
            year2DecemberPlan: row.planDec1 || "NA",
            year2DecemberActual: row.statusDec1 || "null",
            year2JanuaryPlan: row.planJan1 || "NA",
            year2JanuaryActual: row.statusJan1 || "null",
            year2FebruaryPlan: row.planFeb1 || "NA",
            year2FebruaryActual: row.statusFeb1 || "null",
            year2MarchPlan: row.planMar1 || "NA",
            year2MarchActual: row.statusMar1 || "null",
          })),

          ...rows1.map((row) => ({
            ...(row.lineId && { info_id: row.lineId }),
            supplierType: "chemical Supplier",
            supplierName: row.NameSupplier || "NA",
            year1AprilPlan: row.planApr || "NA",
            year1AprilActual: row.statusApr || "null",
            year1MayPlan: row.planMay || "NA",
            year1MayActual: row.statusMay || "null",
            year1JunePlan: row.planJun || "NA",
            year1JuneActual: row.statusJun || "null",
            year1JulyPlan: row.planJul || "NA",
            year1JulyActual: row.statusJul || "null",
            year1AugustPlan: row.planAug || "NA",
            year1AugustActual: row.statusAug || "null",
            year1SeptemberPlan: row.planSept || "NA",
            year1SeptemberActual: row.statusSept || "null",
            year1OctoberPlan: row.planOct || "NA",
            year1OctoberActual: row.statusOct || "null",
            year1NovemberPlan: row.planNov || "NA",
            year1NovemberActual: row.statusNov || "null",
            year1DecemberPlan: row.planDec || "NA",
            year1DecemberActual: row.statusDec || "null",
            year1JanuaryPlan: row.planJan || "NA",
            year1JanuaryActual: row.statusJan || "null",
            year1FebruaryPlan: row.planFeb || "NA",
            year1FebruaryActual: row.statusFeb || "null",
            year1MarchPlan: row.planMar || "NA",
            year1MarchActual: row.statusMar || "null",
            year2AprilPlan: row.planApr1 || "NA",
            year2AprilActual: row.statusApr1 || "null",
            year2MayPlan: row.planMay1 || "NA",
            year2MayActual: row.statusMay1 || "null",
            year2JunePlan: row.planJun1 || "NA",
            year2JuneActual: row.statusJun1 || "null",
            year2JulyPlan: row.planJul1 || "NA",
            year2JulyActual: row.statusJul1 || "null",
            year2AugustPlan: row.planAug1 || "NA",
            year2AugustActual: row.statusAug1 || "null",
            year2SeptemberPlan: row.planSept1 || "NA",
            year2SeptemberActual: row.statusSept1 || "null",
            year2OctoberPlan: row.planOct1 || "NA",
            year2OctoberActual: row.statusOct1 || "null",
            year2NovemberPlan: row.planNov1 || "NA",
            year2NovemberActual: row.statusNov1 || "null",
            year2DecemberPlan: row.planDec1 || "NA",
            year2DecemberActual: row.statusDec1 || "null",
            year2JanuaryPlan: row.planJan1 || "NA",
            year2JanuaryActual: row.statusJan1 || "null",
            year2FebruaryPlan: row.planFeb1 || "NA",
            year2FebruaryActual: row.statusFeb1 || "null",
            year2MarchPlan: row.planMar1 || "NA",
            year2MarchActual: row.statusMar1 || "null",
          })),

          ...rows2.map((row) => ({
            ...(row.lineId && { info_id: row.lineId }),
            supplierType: "cotton supplier",
            supplierName: row.NameSupplier || "NA",
            year1AprilPlan: row.planApr || "NA",
            year1AprilActual: row.statusApr || "null",
            year1MayPlan: row.planMay || "NA",
            year1MayActual: row.statusMay || "null",
            year1JunePlan: row.planJun || "NA",
            year1JuneActual: row.statusJun || "null",
            year1JulyPlan: row.planJul || "NA",
            year1JulyActual: row.statusJul || "null",
            year1AugustPlan: row.planAug || "NA",
            year1AugustActual: row.statusAug || "null",
            year1SeptemberPlan: row.planSept || "NA",
            year1SeptemberActual: row.statusSept || "null",
            year1OctoberPlan: row.planOct || "NA",
            year1OctoberActual: row.statusOct || "null",
            year1NovemberPlan: row.planNov || "NA",
            year1NovemberActual: row.statusNov || "null",
            year1DecemberPlan: row.planDec || "NA",
            year1DecemberActual: row.statusDec || "null",
            year1JanuaryPlan: row.planJan || "NA",
            year1JanuaryActual: row.statusJan || "null",
            year1FebruaryPlan: row.planFeb || "NA",
            year1FebruaryActual: row.statusFeb || "null",
            year1MarchPlan: row.planMar || "NA",
            year1MarchActual: row.statusMar || "null",
            year2AprilPlan: row.planApr1 || "NA",
            year2AprilActual: row.statusApr1 || "null",
            year2MayPlan: row.planMay1 || "NA",
            year2MayActual: row.statusMay1 || "null",
            year2JunePlan: row.planJun1 || "NA",
            year2JuneActual: row.statusJun1 || "null",
            year2JulyPlan: row.planJul1 || "NA",
            year2JulyActual: row.statusJul1 || "null",
            year2AugustPlan: row.planAug1 || "NA",
            year2AugustActual: row.statusAug1 || "null",
            year2SeptemberPlan: row.planSept1 || "NA",
            year2SeptemberActual: row.statusSept1 || "null",
            year2OctoberPlan: row.planOct1 || "NA",
            year2OctoberActual: row.statusOct1 || "null",
            year2NovemberPlan: row.planNov1 || "NA",
            year2NovemberActual: row.statusNov1 || "null",
            year2DecemberPlan: row.planDec1 || "NA",
            year2DecemberActual: row.statusDec1 || "null",
            year2JanuaryPlan: row.planJan1 || "NA",
            year2JanuaryActual: row.statusJan1 || "null",
            year2FebruaryPlan: row.planFeb1 || "NA",
            year2FebruaryActual: row.statusFeb1 || "null",
            year2MarchPlan: row.planMar1 || "NA",
            year2MarchActual: row.statusMar1 || "null",
          })),
        ],
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/supplierAuditPlan/submitSupplierAuditPlan`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QA/F-22/Summary");
      }, 1500);

      message.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to submit Distribution and destruction Record!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-22/Summary");
  };

  const handleApprove = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/supplierAuditPlan/approveOrReject`,
        {
          id: planId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);

        message.success(res.data.message);
        navigate("/Precot/QA/F-22/Summary");
      })
      .catch((err) => {
        setLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/supplierAuditPlan/approveOrReject`,
        {
          id: planId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);

        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/QA/F-22/Summary");
      })
      .catch((err) => {
        setLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    fetchDetailsByParam();
  }, []);

  const fetchDetailsByParam = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/supplierAuditPlan/getSupplierAuditPlan?financialYear=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (
        ((roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") &&
          response.data.designeeStatus !== "DESIGNEE_SUBMITTED") ||
        ((roleauth === "QA_MANAGER" || roleauth === "ROLE_MR") &&
          response.data.qaManagerMrStatus === "QA_MANAGER_MR_REJECTED")
      ) {
        message.error("Designee Not Yet Approved");
        setTimeout(() => {
          navigate("/Precot/QA/F-22/Summary");
        }, 1500);
      }

      if (response.data && response.data !== "No data") {
        const data = response.data;
        setselectedrow(response.data);
        setplanId(response.data.planId);

        let tempRows = [];
        let tempRows1 = [];
        let tempRows2 = [];

        const formatDateForDisplay = (dateString) => {
          if (dateString) {
            return dateString.split("T")[0];
          }
          return "";
        };

        data.auditPlanInfoList?.forEach((item) => {
          const row = {
            lineId: item.infoId,
            NameSupplier: item.supplierName,
            supplierType: item.supplierType,
            planApr: item.year1AprilPlan,
            statusApr: formatDateForDisplay(item.year1AprilActual),
            planMay: item.year1MayPlan,
            statusMay: formatDateForDisplay(item.year1MayActual),
            planJun: item.year1JunePlan,
            statusJun: formatDateForDisplay(item.year1JuneActual),
            planJul: item.year1JulyPlan,
            statusJul: formatDateForDisplay(item.year1JulyActual),
            planAug: item.year1AugustPlan,
            statusAug: formatDateForDisplay(item.year1AugustActual),
            planSept: item.year1SeptemberPlan,
            statusSept: formatDateForDisplay(item.year1SeptemberActual),
            planOct: item.year1OctoberPlan,
            statusOct: formatDateForDisplay(item.year1OctoberActual),
            planNov: item.year1NovemberPlan,
            statusNov: formatDateForDisplay(item.year1NovemberActual),
            planDec: item.year1DecemberPlan,
            statusDec: formatDateForDisplay(item.year1DecemberActual),
            planJan: item.year1JanuaryPlan,
            statusJan: formatDateForDisplay(item.year1JanuaryActual),
            planFeb: item.year1FebruaryPlan,
            statusFeb: formatDateForDisplay(item.year1FebruaryActual),
            planMar: item.year1MarchPlan,
            statusMar: formatDateForDisplay(item.year1MarchActual),
            planApr1: item.year2AprilPlan,
            statusApr1: formatDateForDisplay(item.year2AprilActual),
            planMay1: item.year2MayPlan,
            statusMay1: formatDateForDisplay(item.year2MayActual),
            planJun1: item.year2JunePlan,
            statusJun1: formatDateForDisplay(item.year2JuneActual),
            planJul1: item.year2JulyPlan,
            statusJul1: formatDateForDisplay(item.year2JulyActual),
            planAug1: item.year2AugustPlan,
            statusAug1: formatDateForDisplay(item.year2AugustActual),
            planSept1: item.year2SeptemberPlan,
            statusSept1: formatDateForDisplay(item.year2SeptemberActual),
            planOct1: item.year2OctoberPlan,
            statusOct1: formatDateForDisplay(item.year2OctoberActual),
            planNov1: item.year2NovemberPlan,
            statusNov1: formatDateForDisplay(item.year2NovemberActual),
            planDec1: item.year2DecemberPlan,
            statusDec1: formatDateForDisplay(item.year2DecemberActual),
            planJan1: item.year2JanuaryPlan,
            statusJan1: formatDateForDisplay(item.year2JanuaryActual),
            planFeb1: item.year2FebruaryPlan,
            statusFeb1: formatDateForDisplay(item.year2FebruaryActual),
            planMar1: item.year2MarchPlan,
            statusMar1: formatDateForDisplay(item.year2MarchActual),
          };

          // Categorize by supplierType
          const supplierType = item.supplierType.trim().toLowerCase();
          if (supplierType === "material packing") {
            tempRows.push(row);
          } else if (supplierType === "chemical supplier") {
            tempRows1.push(row);
          } else if (supplierType === "cotton supplier") {
            tempRows2.push(row);
          }
        });

        setRows(tempRows);
        setRows1(tempRows1);
        setRows2(tempRows2);
      }
    } catch (error) {
      console.error("Error fetching supplier audit plan:", error);
      message.error(error.message);
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Packing Material Supplier List</p>,
      children: (
        <div>
          <table
            style={{ width: "105%", margin: "auto", tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  S.No.
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  Packing Material Supplier List
                </th>
                {[
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                  "Jan",
                  "Feb",
                  "Mar",
                ].map((month, index) => {
                  let startYearLastTwo = startYear.toString().slice(-2);
                  let MidYearLastTwo = midYear.toString().slice(-2);
                  let endYearLastTwo = endYear.toString().slice(-2);

                  let year;
                  if (index < 9) {
                    year = startYearLastTwo;
                  } else if (index >= 21) {
                    year = endYearLastTwo;
                  } else {
                    year = MidYearLastTwo;
                  }

                  return (
                    <th colSpan="8" style={{ textAlign: "center" }} key={month}>
                      {month}-{year}
                    </th>
                  );
                })}
                <th colSpan="8" style={{ textAlign: "center" }}>
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td colSpan={5} rowSpan={2} style={{ textAlign: "center" }}>
                      {index + 1}
                    </td>
                    <td colSpan={15} rowSpan={2}>
                      <Input
                        className="inp-new"
                        value={row.NameSupplier}
                        disabled={condition}
                        onChange={(e) =>
                          handlePackingMaterialChange(
                            index,
                            "NameSupplier",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      Plan
                    </td>

                    {[
                      "planApr",
                      "planMay",
                      "planJun",
                      "planJul",
                      "planAug",
                      "planSept",
                      "planOct",
                      "planNov",
                      "planDec",
                      "planJan",
                      "planFeb",
                      "planMar",
                      "planApr1",
                      "planMay1",
                      "planJun1",
                      "planJul1",
                      "planAug1",
                      "planSept1",
                      "planOct1",
                      "planNov1",
                      "planDec1",
                      "planJan1",
                      "planFeb1",
                      "planMar1",
                    ].map((monthKey, i) => (
                      <td colSpan={8} key={monthKey}>
                        <Input
                          className="inp-new"
                          value={row[monthKey]}
                          onKeyDown={handleKeyDown2}
                          disabled={condition}
                          onChange={(e) =>
                            handlePackingMaterialChange(
                              index,
                              monthKey,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}

                    <td colSpan={8} rowSpan={2} style={{ textAlign: "center" }}>
                      <button
                        onClick={() => handleDeleteRow(index)}
                        style={{ background: "red", color: "white" }}
                        disabled={condition}
                      >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      Actual
                    </td>
                    {[
                      "statusApr",
                      "statusMay",
                      "statusJun",
                      "statusJul",
                      "statusAug",
                      "statusSept",
                      "statusOct",
                      "statusNov",
                      "statusDec",
                      "statusJan",
                      "statusFeb",
                      "statusMar",
                      "statusApr1",
                      "statusMay1",
                      "statusJun1",
                      "statusJul1",
                      "statusAug1",
                      "statusSept1",
                      "statusOct1",
                      "statusNov1",
                      "statusDec1",
                      "statusJan1",
                      "statusFeb1",
                      "statusMar1",
                    ].map((monthKey, i) => {
                      const selectedMonth = monthMap[monthKey];

                      let year;
                      if (
                        ["statusJan1", "statusFeb1", "statusMar1"].includes(
                          monthKey
                        )
                      ) {
                        year = endYear;
                      } else if (
                        [
                          "statusApr",
                          "statusMay",
                          "statusJun",
                          "statusJul",
                          "statusAug",
                          "statusSept",
                          "statusOct",
                          "statusNov",
                          "statusDec",
                        ].includes(monthKey)
                      ) {
                        year = startYear;
                      } else {
                        year = midYear;
                      }

                      const MinDate = `${year}-${selectedMonth
                        .toString()
                        .padStart(2, "0")}-01`;
                      const lastDay = new Date(
                        year,
                        selectedMonth,
                        0
                      ).getDate();
                      const MaxDate = `${year}-${selectedMonth
                        .toString()
                        .padStart(2, "0")}-${lastDay}`;

                      return (
                        <td colSpan={8} key={monthKey}>
                          <Input
                            className="inp-new"
                            type="date"
                            value={row[monthKey]}
                            disabled={condition}
                            style={{ padding: "0px" }}
                            onChange={(e) =>
                              handlePackingMaterialChange(
                                index,
                                monthKey,
                                e.target.value
                              )
                            }
                            min={MinDate}
                            max={MaxDate}
                          />
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <button
              onClick={handleAddRow}
              disabled={condition}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                padding: "5px",
                display: disabled ? "none" : "block",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          </div>
        </div>
      ),
    },

    {
      key: "2",
      label: <p>Chemical Supplier List</p>,
      children: (
        <div>
          <table
            style={{ width: "105%", margin: "auto", tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  S.No.
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  Packing Material Supplier List
                </th>
                {[
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                  "Jan",
                  "Feb",
                  "Mar",
                ].map((month, index) => {
                  let startYearLastTwo = startYear.toString().slice(-2);
                  let MidYearLastTwo = midYear.toString().slice(-2);
                  let endYearLastTwo = endYear.toString().slice(-2);

                  let year;
                  if (index < 9) {
                    year = startYearLastTwo;
                  } else if (index >= 21) {
                    year = endYearLastTwo;
                  } else {
                    year = MidYearLastTwo;
                  }

                  return (
                    <th colSpan="8" style={{ textAlign: "center" }} key={month}>
                      {month}-{year}
                    </th>
                  );
                })}
                <th colSpan="8" style={{ textAlign: "center" }}>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {rows1.map((row, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td colSpan={5} rowSpan={2} style={{ textAlign: "center" }}>
                      {index + 1}
                    </td>
                    <td colSpan={15} rowSpan={2}>
                      <Input
                        className="inp-new"
                        value={row.NameSupplier}
                        disabled={condition}
                        onChange={(e) =>
                          handleChemicalMaterialChange(
                            index,
                            "NameSupplier",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      Plan
                    </td>

                    {[
                      "planApr",
                      "planMay",
                      "planJun",
                      "planJul",
                      "planAug",
                      "planSept",
                      "planOct",
                      "planNov",
                      "planDec",
                      "planJan",
                      "planFeb",
                      "planMar",
                      "planApr1",
                      "planMay1",
                      "planJun1",
                      "planJul1",
                      "planAug1",
                      "planSept1",
                      "planOct1",
                      "planNov1",
                      "planDec1",
                      "planJan1",
                      "planFeb1",
                      "planMar1",
                    ].map((monthKey, i) => (
                      <td colSpan={8} key={monthKey}>
                        <Input
                          className="inp-new"
                          value={row[monthKey]}
                          disabled={condition}
                          onKeyDown={handleKeyDown2}
                          onChange={(e) =>
                            handleChemicalMaterialChange(
                              index,
                              monthKey,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}

                    <td
                      colSpan={8}
                      rowSpan={2}
                      style={{ textAlign: "center" }}
                      disabled={condition}
                    >
                      <button
                        onClick={() => handleDeleteRow1(index)}
                        style={{ background: "red", color: "white" }}
                        disabled={condition}
                      >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      Actual
                    </td>
                    {[
                      "statusApr",
                      "statusMay",
                      "statusJun",
                      "statusJul",
                      "statusAug",
                      "statusSept",
                      "statusOct",
                      "statusNov",
                      "statusDec",
                      "statusJan",
                      "statusFeb",
                      "statusMar",
                      "statusApr1",
                      "statusMay1",
                      "statusJun1",
                      "statusJul1",
                      "statusAug1",
                      "statusSept1",
                      "statusOct1",
                      "statusNov1",
                      "statusDec1",
                      "statusJan1",
                      "statusFeb1",
                      "statusMar1",
                    ].map((monthKey, i) => {
                      const selectedMonth = monthMap[monthKey];

                      let year;
                      if (
                        ["statusJan1", "statusFeb1", "statusMar1"].includes(
                          monthKey
                        )
                      ) {
                        year = endYear;
                      } else if (
                        [
                          "statusApr",
                          "statusMay",
                          "statusJun",
                          "statusJul",
                          "statusAug",
                          "statusSept",
                          "statusOct",
                          "statusNov",
                          "statusDec",
                        ].includes(monthKey)
                      ) {
                        year = startYear;
                      } else {
                        year = midYear;
                      }

                      const MinDate = `${year}-${selectedMonth
                        .toString()
                        .padStart(2, "0")}-01`;
                      const lastDay = new Date(
                        year,
                        selectedMonth,
                        0
                      ).getDate();
                      const MaxDate = `${year}-${selectedMonth
                        .toString()
                        .padStart(2, "0")}-${lastDay}`;

                      return (
                        <td colSpan={8} key={monthKey}>
                          <Input
                            className="inp-new"
                            type="date"
                            value={row[monthKey]}
                            style={{ padding: "0px" }}
                            disabled={condition}
                            onChange={(e) =>
                              handleChemicalMaterialChange(
                                index,
                                monthKey,
                                e.target.value
                              )
                            }
                            min={MinDate}
                            max={MaxDate}
                          />
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <button
              onClick={handleAddRow1}
              disabled={condition}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                padding: "5px",
                display: disabled ? "none" : "block",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Cotton Supplier List</p>,
      children: (
        <div>
          <table
            style={{ width: "105%", marginLeft: "0px", tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th colSpan="5" style={{ textAlign: "center" }}>
                  S.No.
                </th>
                <th colSpan="20" style={{ textAlign: "center" }}>
                  Packing Material Supplier List
                </th>
                {[
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                  "Jan",
                  "Feb",
                  "Mar",
                ].map((month, index) => {
                  let startYearLastTwo = startYear.toString().slice(-2);
                  let MidYearLastTwo = midYear.toString().slice(-2);
                  let endYearLastTwo = endYear.toString().slice(-2);

                  let year;
                  if (index < 9) {
                    year = startYearLastTwo;
                  } else if (index >= 21) {
                    year = endYearLastTwo;
                  } else {
                    year = MidYearLastTwo;
                  }

                  return (
                    <th colSpan="8" style={{ textAlign: "center" }} key={month}>
                      {month}-{year}
                    </th>
                  );
                })}
                <th colSpan="8" style={{ textAlign: "center" }}>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {rows2.map((row, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td colSpan={5} rowSpan={2} style={{ textAlign: "center" }}>
                      {index + 1}
                    </td>
                    <td colSpan={15} rowSpan={2} style={{ padding: 0 }}>
                      <Input
                        className="inp-new"
                        value={row.NameSupplier}
                        disabled={condition}
                        style={{ border: "none" }}
                        onChange={(e) =>
                          handleCottonMaterialChange(
                            index,
                            "NameSupplier",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      Plan
                    </td>

                    {[
                      "planApr",
                      "planMay",
                      "planJun",
                      "planJul",
                      "planAug",
                      "planSept",
                      "planOct",
                      "planNov",
                      "planDec",
                      "planJan",
                      "planFeb",
                      "planMar",
                      "planApr1",
                      "planMay1",
                      "planJun1",
                      "planJul1",
                      "planAug1",
                      "planSept1",
                      "planOct1",
                      "planNov1",
                      "planDec1",
                      "planJan1",
                      "planFeb1",
                      "planMar1",
                    ].map((monthKey, i) => (
                      <td colSpan={8} key={monthKey}>
                        <Input
                          className="inp-new"
                          value={row[monthKey]}
                          onKeyDown={handleKeyDown2}
                          disabled={condition}
                          onChange={(e) =>
                            handleCottonMaterialChange(
                              index,
                              monthKey,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}

                    <td colSpan={8} rowSpan={2} style={{ textAlign: "center" }}>
                      <button
                        onClick={() => handleDeleteRow2(index)}
                        style={{ background: "red", color: "white" }}
                        disabled={condition}
                      >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      Actual
                    </td>
                    {[
                      "statusApr",
                      "statusMay",
                      "statusJun",
                      "statusJul",
                      "statusAug",
                      "statusSept",
                      "statusOct",
                      "statusNov",
                      "statusDec",
                      "statusJan",
                      "statusFeb",
                      "statusMar",
                      "statusApr1",
                      "statusMay1",
                      "statusJun1",
                      "statusJul1",
                      "statusAug1",
                      "statusSept1",
                      "statusOct1",
                      "statusNov1",
                      "statusDec1",
                      "statusJan1",
                      "statusFeb1",
                      "statusMar1",
                    ].map((monthKey, i) => {
                      const selectedMonth = monthMap[monthKey];

                      let year;
                      if (
                        ["statusJan1", "statusFeb1", "statusMar1"].includes(
                          monthKey
                        )
                      ) {
                        year = endYear;
                      } else if (
                        [
                          "statusApr",
                          "statusMay",
                          "statusJun",
                          "statusJul",
                          "statusAug",
                          "statusSept",
                          "statusOct",
                          "statusNov",
                          "statusDec",
                        ].includes(monthKey)
                      ) {
                        year = startYear;
                      } else {
                        year = midYear;
                      }

                      const MinDate = `${year}-${selectedMonth
                        .toString()
                        .padStart(2, "0")}-01`;
                      const lastDay = new Date(
                        year,
                        selectedMonth,
                        0
                      ).getDate();
                      const MaxDate = `${year}-${selectedMonth
                        .toString()
                        .padStart(2, "0")}-${lastDay}`;

                      return (
                        <td colSpan={8} key={monthKey}>
                          <Input
                            className="inp-new"
                            type="date"
                            style={{ padding: "0px" }}
                            value={row[monthKey]}
                            disabled={condition}
                            onChange={(e) =>
                              handleCottonMaterialChange(
                                index,
                                monthKey,
                                e.target.value
                              )
                            }
                            min={MinDate}
                            max={MaxDate}
                          />
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <button
              onClick={handleAddRow2}
              disabled={condition}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                padding: "5px",
                display: disabled ? "none" : "block",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add Row
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <td
                colSpan="15"
                style={{
                  textAlign: "center",
                }}
              >
                Designee:Signature & Date
              </td>
              <td
                colSpan="15"
                style={{
                  textAlign: "center",
                }}
              >
                QA Manager/MR: Signature & Date
              </td>
            </tr>

            <tr>
              <td
                colSpan="15"
                style={{
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                  borderRight: "1px solid black",
                }}
              >
                {selectedrow &&
                  selectedrow?.designeeStatus === "DESIGNEE_SUBMITTED" && (
                    <div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Designee Sign"
                          style={{
                            width: "70px",
                            height: "50px",
                            marginLeft: "10px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                      <br />

                      {selectedrow && selectedrow.designeeSign && (
                        <span>{selectedrow.designeeSign}</span>
                      )}
                      <br />
                      {formattedDate(selectedrow?.designeeSubmitOn)}
                    </div>
                  )}
                {/* Signature & Date */}
              </td>

              <td
                colSpan="15"
                style={{ textAlign: "center", verticalAlign: "bottom" }}
              >
                {((selectedrow &&
                  selectedrow?.qaManagerMrStatus ===
                    "QA_MANAGER_MR_REJECTED") ||
                  (selectedrow &&
                    selectedrow?.qaManagerMrStatus ===
                      "QA_MANAGER_MR_APPROVED")) && (
                  <div>
                    {getImage && (
                      <img
                        src={getImage}
                        alt="Manager Sign"
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
                    <br />
                    {selectedrow && selectedrow.qaManagerMrSign && (
                      <span>{selectedrow.qaManagerMrSign}</span>
                    )}
                    <br />
                    {formattedDate(selectedrow?.qaManagerMrSubmitOn)}
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

  const buttonsArray = [
    ...(role === "QA_MANAGER" || role === "ROLE_MR"
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
      : []),
    ...(role === "ROLE_DESIGNEE"
      ? [
          <Button
            key="save"
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
          </Button>,
          <Button
            key="submit"
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
          </Button>,
        ]
      : []),
    <Button
      key="back"
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
        if (confirm("Are you sure you want to logout?")) {
          localStorage.removeItem("token");
          navigate("/Precot");
        }
      }}
    >
      Logout
    </Button>,
    <Tooltip
      key="user"
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
        formName="SUPPLIER’S AUDIT PLAN"
        formatNo="PH-QAD01-F-022"
        sopNo="PH-QAD01-D-18"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={buttonsArray}
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
          addonBefore="Year:"
          placeholder="Year"
          value={year}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
      </div>
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

export default QA_f22;
