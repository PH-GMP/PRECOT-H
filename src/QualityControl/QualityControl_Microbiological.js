/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from "react";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

import { FaLock, FaTrash } from "react-icons/fa6";
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
  Table,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import jwtDecode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../baseUrl.json";
import { BiLock, BiNavigation } from "react-icons/bi";
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
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import TextArea from "antd/es/input/TextArea";
const { confirm } = Modal;
const Micro = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("username");
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const initialized = useRef(false);
  const [id, setId] = useState("");
  const [formatName, setFormatName] = useState("");
  const [formatNo, setFormatNo] = useState("");
  const [revisionNo, setRevisionNo] = useState("");
  const [sopNo, setSopNo] = useState("");
  const [unit, setUnit] = useState("");
  const [formNo, setFormNo] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newMonth, setNewMonth] = useState("");
  const [newYear, setNewYear] = useState("");

  const [printData, setPrintData] = useState("");
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { date } = state || {};
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

  // State to manage rows
  const [details, setRows] = useState([
    {
      id: "",
      sampledDate: state.date,
      arNumber: "",
      location: "",
      employeeNo: "",
      tvcCount: "",
      tfcCount: "",
      testCompletionDate: "",
      remark: "",
    },
  ]);

  // Function to add a new row
  const addRow = () => {
    setRows([
      ...details,
      {
        sampledDate: state.date,
        arNumber: "",
        location: "",
        employeeNo: "",
        tvcCount: "",
        tfcCount: "",
        testCompletionDate: "",
        remark: "",
      },
    ]);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const { formNo } = state || {};
    console.log("format No : ", formNo);
    setFormNo(formNo);

    if (formNo === "PH-QCL01-AR-F-008") {
      setFormatName("Floor Swab Microbiological Analysis Report");
      setFormatNo("PH-QCL01-AR-F-008");
      setRevisionNo("03");
      setSopNo("PH-QCL01-D-05");
      setUnit("Unit H");
    }

    if (formNo === "PH-QCL01-AR-F-009") {
      setFormatName("Handler's Swab Microbiological Analysis Report");
      setFormatNo("PH-QCL01-AR-F-009");
      setRevisionNo("03");
      setSopNo("PH-QCL01-D-05");
      setUnit("Unit H");
    }
    if (formNo === "PH-QCL01-AR-F-010") {
      setFormatName("Machine Swab Microbiological Analysis Report");
      setFormatNo("PH-QCL01-AR-F-010");
      setRevisionNo("03");
      setSopNo("PH-QCL01-D-05");
      setUnit("Unit H");
    }
  }, []);

  useEffect(() => {
    const { date } = state || {};
    setRows((prevRows) => {
      // Modify a specific field in the first row (for example)
      const updatedRows = prevRows.map((row, index) =>
        index === 0
          ? { ...row, sampledDate: date } // Updating sampledDate in the first row
          : row
      );
      return updatedRows;
    });
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const { formNo, date } = state || {};
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      if (formNo === "PH-QCL01-AR-F-008") {
        axios
          .get(
            // `${    API.prodUrl}/Precot/api/qc/SwabMicroAnalysisF8F9F10/GetByFormatId`,
            `${ API.prodUrl}/Precot/api/qc/SwabMicroAnalysisF8F9F10/GetByDateF008MonthYear`,
            // `${    API.prodUrl}/Precot/api/qc/SwabMicroAnalysisF8F9F10/GetById/${id}`,
            {
              headers,
              params: {
                sampleDateF008: date,
                month: monthName,
                year: year,
              },
            }
          )
          .then((response) => {
            if (!response.data.length == 0) {
              console.log("Response Value ", response.data);
              if (response.data[0].formatNo === formNo) {
                console.log("sfasfas");
                setId(response.data[0].id),
                  setRows(
                    response.data[0].details.map((item) => ({
                      id: item.id,
                      sampledDate: response.data[0].sampledDateF008 || "", // Defaulting to empty string if not available
                      arNumber: item.arNumber,
                      location: item.location,
                      tvcCount: item.totalViableCount,
                      tfcCount: item.totalFungalCount,
                      testCompletionDate: item.testCompletionDate,
                      remark: item.remark,
                    }))
                  );
              }

              setPrintData(response.data[0]);

              if (role === "QA_MANAGER" || role === "QC_MANAGER") {
                if (
                  (response.data[0]?.microbiologist_status ===
                    "MICROBIOLOGIST_APPROVED" &&
                    response.data[0]?.qc_status === "QC_REJECTED") ||
                  (response.data[0]?.microbiologist_status ===
                    "MICROBIOLOGIST_APPROVED" &&
                    response.data[0]?.qc_status === "QA_REJECTED")
                ) {
                  message.warning("Microbiologist Not Yet Approved");
                  setTimeout(() => {
                    navigate("/Precot/QualityControl/Microbiology/Summary", {
                      state: {
                        formNo: formNo,
                      },
                    });
                  }, 1500);
                }
              }

              if (
                role == "ROLE_MICROBIOLOGIST" &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "CHEMIST_SUBMITTED") &&
                response.data[0].qc_status == "WAITING_FOR_APPROVAL"
              ) {
                console.log("condition 1");
                setSaveBtnStatus(false);
                setSubmitBtnStatus(false);
                setDisable(true);
              } else if (
                role == "ROLE_MICROBIOLOGIST" &&
                (response.data[0].microbiologist_status == "" ||
                  response.data[0].microbiologist_status == null) &&
                (response.data[0].qc_status == "" ||
                  response.data[0].qc_status == null)
              ) {
                console.log("condition check");
                setSaveBtnStatus(true);
                setSubmitBtnStatus(true);
                setDisable(false);
              } else if (
                role == "ROLE_MICROBIOLOGIST" &&
                response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_SAVED" &&
                (response.data[0].qc_status == "" ||
                  response.data[0].qc_status == null)
              ) {
                setSaveBtnStatus(true);
                setSubmitBtnStatus(true);
                setDisable(false);
              } else if (
                role == "ROLE_MICROBIOLOGIST" &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "MICROBIOLOGIST_SUBMITTED") &&
                (response.data[0].qc_status == "QC_REJECTED" ||
                  response.data[0].qc_status == "QA_REJECTED")
              ) {
                setSaveBtnStatus(false);
                setSubmitBtnStatus(true);
                setDisable(false);
              } else if (
                (role == "QC_MANAGER" || role == "QA_MANAGER") &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "MICROBIOLOGIST_SUBMITTED") &&
                response.data[0].qc_status == "WAITING_FOR_APPROVAL"
              ) {
                setSaveBtnStatus(true);
                setSubmitBtnStatus(true);
                setDisable(true);
              } else if (
                (role == "QC_MANAGER" || role == "QA_MANAGER") &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "MICROBIOLOGIST_SUBMITTED") &&
                (response.data[0].qc_status == "QC_REJECTED" ||
                  response.data[0].qc_status == "QA_REJECTED")
              ) {
                setSaveBtnStatus(false);
                setSubmitBtnStatus(false);
                setDisable(true);
              } else if (
                (role == "QC_MANAGER" ||
                  role == "QA_MANAGER" ||
                  role == "ROLE_MICROBIOLOGIST") &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "MICROBIOLOGIST_SUBMITTED") &&
                (response.data[0].qc_status == "QC_APPROVED" ||
                  response.data[0].qc_status == "QA_APPROVED")
              ) {
                setSaveBtnStatus(false);
                setSubmitBtnStatus(false);
                setDisable(true);
              }
            } else {
              console.log(" need to check the Condition");
              if (role == "ROLE_MICROBIOLOGIST") {
                console.log("condition check");
                setSaveBtnStatus(true);
                setSubmitBtnStatus(true);
                setDisable(false);
              }

              if (role == "QC_MANAGER" || role == "QA_MANAGER") {
                console.log("condition check");
                setSaveBtnStatus(false);
                setSubmitBtnStatus(false);
                setDisable(true);
              }
            }
          })

          .catch((err) => {});
      }

      if (formNo === "PH-QCL01-AR-F-009") {
        axios
          .get(
            // `${    API.prodUrl}/Precot/api/qc/SwabMicroAnalysisF8F9F10/GetByFormatId`,
            `${ API.prodUrl}/Precot/api/qc/SwabMicroAnalysisF8F9F10/GetByDateF009MonthYear`,
            // `${    API.prodUrl}/Precot/api/qc/SwabMicroAnalysisF8F9F10/GetById/${id}`,
            {
              headers,
              params: {
                sampleDateF009: date,
                month: monthName,
                year: year,
              },
            }
          )
          .then((response) => {
            if (!response.data.length == 0) {
              console.log("Response Value ", response.data);
              if (response.data[0].formatNo === formNo) {
                console.log("sfasfas");
                setId(response.data[0].id),
                  setRows(
                    response.data[0].details.map((item) => ({
                      id: item.id,
                      sampledDate: response.data[0].sampledDateF009 || "", // Defaulting to empty string if not available
                      arNumber: item.arNumber,
                      location: item.location,
                      employeeNo: item.employeeIdNo,
                      tvcCount: item.totalViableCount,
                      tfcCount: item.totalFungalCount,
                      testCompletionDate: item.testCompletionDate,
                      remark: item.remark,
                    }))
                  );
                // setRows(mappedDetails);
              }
              setPrintData(response.data[0]);

              if (role === "QA_MANAGER" || role === "QC_MANAGER") {
                if (
                  (response.data[0]?.microbiologist_status ===
                    "MICROBIOLOGIST_APPROVED" &&
                    response.data[0]?.qc_status === "QC_REJECTED") ||
                  (response.data[0]?.microbiologist_status ===
                    "MICROBIOLOGIST_APPROVED" &&
                    response.data[0]?.qc_status === "QA_REJECTED")
                ) {
                  message.warning("Microbiologist Not Yet Approved");
                  setTimeout(() => {
                    navigate("/Precot/QualityControl/Microbiology/Summary", {
                      state: {
                        formNo: formNo,
                      },
                    });
                  }, 1500);
                }
              }

              if (
                role == "ROLE_MICROBIOLOGIST" &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "CHEMIST_SUBMITTED") &&
                response.data[0].qc_status == "WAITING_FOR_APPROVAL"
              ) {
                console.log("condition 1");
                setSaveBtnStatus(false);
                setSubmitBtnStatus(false);
                setDisable(true);
              } else if (
                role == "ROLE_MICROBIOLOGIST" &&
                (response.data[0].microbiologist_status == "" ||
                  response.data[0].microbiologist_status == null) &&
                (response.data[0].qc_status == "" ||
                  response.data[0].qc_status == null)
              ) {
                console.log("condition check");
                setSaveBtnStatus(true);
                setSubmitBtnStatus(true);
                setDisable(false);
              } else if (
                role == "ROLE_MICROBIOLOGIST" &&
                response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_SAVED" &&
                (response.data[0].qc_status == "" ||
                  response.data[0].qc_status == null)
              ) {
                setSaveBtnStatus(true);
                setSubmitBtnStatus(true);
                setDisable(false);
              } else if (
                role == "ROLE_MICROBIOLOGIST" &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "MICROBIOLOGIST_SUBMITTED") &&
                (response.data[0].qc_status == "QC_REJECTED" ||
                  response.data[0].qc_status == "QA_REJECTED")
              ) {
                setSaveBtnStatus(false);
                setSubmitBtnStatus(true);
                setDisable(false);
              } else if (
                (role == "QC_MANAGER" || role == "QA_MANAGER") &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "MICROBIOLOGIST_SUBMITTED") &&
                response.data[0].qc_status == "WAITING_FOR_APPROVAL"
              ) {
                setSaveBtnStatus(true);
                setSubmitBtnStatus(true);
                setDisable(true);
              } else if (
                (role == "QC_MANAGER" || role == "QA_MANAGER") &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "MICROBIOLOGIST_SUBMITTED") &&
                (response.data[0].qc_status == "QC_REJECTED" ||
                  response.data[0].qc_status == "QA_REJECTED")
              ) {
                setSaveBtnStatus(false);
                setSubmitBtnStatus(false);
                setDisable(true);
              } else if (
                (role == "QC_MANAGER" ||
                  role == "QA_MANAGER" ||
                  role == "ROLE_MICROBIOLOGIST") &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "MICROBIOLOGIST_SUBMITTED") &&
                (response.data[0].qc_status == "QC_APPROVED" ||
                  response.data[0].qc_status == "QA_APPROVED")
              ) {
                setSaveBtnStatus(false);
                setSubmitBtnStatus(false);
                setDisable(true);
              }
            } else {
              console.log(" need to check the Condition");
              if (role == "ROLE_MICROBIOLOGIST") {
                console.log("condition check");
                setSaveBtnStatus(true);
                setSubmitBtnStatus(true);
                setDisable(false);
              }

              if (role == "QC_MANAGER" || role == "QA_MANAGER") {
                console.log("condition check");
                setSaveBtnStatus(false);
                setSubmitBtnStatus(false);
                setDisable(true);
              }
            }
          })
          .catch((err) => {});
      }

      if (formNo === "PH-QCL01-AR-F-010") {
        axios
          .get(
            // `${    API.prodUrl}/Precot/api/qc/SwabMicroAnalysisF8F9F10/GetByFormatId`,
            `${ API.prodUrl}/Precot/api/qc/SwabMicroAnalysisF8F9F10/GetByDateF010MonthYear`,
            // `${    API.prodUrl}/Precot/api/qc/SwabMicroAnalysisF8F9F10/GetById/${id}`,
            {
              headers,
              params: {
                sampleDateF010: date,
                month: monthName,
                year: year,
              },
            }
          )
          .then((response) => {
            if (!response.data.length == 0) {
              console.log("Response Value ", response.data);
              if (response.data[0].formatNo === formNo) {
                console.log("sfasfas");
                setId(response.data[0].id),
                  setRows(
                    response.data[0].details.map((item) => ({
                      id: item.id,
                      sampledDate: response.data[0].sampledDateF010 || "", // Defaulting to empty string if not available
                      arNumber: item.arNumber,
                      location: item.location,
                      tvcCount: item.totalViableCount,
                      tfcCount: item.totalFungalCount,
                      testCompletionDate: item.testCompletionDate,
                      remark: item.remark,
                    }))
                  );
                // setRows(mappedDetails);
              }
              setPrintData(response.data[0]);

              if (role === "QA_MANAGER" || role === "QC_MANAGER") {
                if (
                  (response.data[0]?.microbiologist_status ===
                    "MICROBIOLOGIST_APPROVED" &&
                    response.data[0]?.qc_status === "QC_REJECTED") ||
                  (response.data[0]?.microbiologist_status ===
                    "MICROBIOLOGIST_APPROVED" &&
                    response.data[0]?.qc_status === "QA_REJECTED")
                ) {
                  message.warning("Microbiologist Not Yet Approved");
                  setTimeout(() => {
                    navigate("/Precot/QualityControl/Microbiology/Summary", {
                      state: {
                        formNo: formNo,
                      },
                    });
                  }, 1500);
                }
              }

              if (
                role == "ROLE_MICROBIOLOGIST" &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "CHEMIST_SUBMITTED") &&
                response.data[0].qc_status == "WAITING_FOR_APPROVAL"
              ) {
                console.log("condition 1");
                setSaveBtnStatus(false);
                setSubmitBtnStatus(false);
                setDisable(true);
              } else if (
                role == "ROLE_MICROBIOLOGIST" &&
                (response.data[0].microbiologist_status == "" ||
                  response.data[0].microbiologist_status == null) &&
                (response.data[0].qc_status == "" ||
                  response.data[0].qc_status == null)
              ) {
                console.log("condition check");
                setSaveBtnStatus(true);
                setSubmitBtnStatus(true);
                setDisable(false);
              } else if (
                role == "ROLE_MICROBIOLOGIST" &&
                response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_SAVED" &&
                (response.data[0].qc_status == "" ||
                  response.data[0].qc_status == null)
              ) {
                setSaveBtnStatus(true);
                setSubmitBtnStatus(true);
                setDisable(false);
              } else if (
                role == "ROLE_MICROBIOLOGIST" &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "MICROBIOLOGIST_SUBMITTED") &&
                (response.data[0].qc_status == "QC_REJECTED" ||
                  response.data[0].qc_status == "QA_REJECTED")
              ) {
                setSaveBtnStatus(false);
                setSubmitBtnStatus(true);
                setDisable(false);
              } else if (
                (role == "QC_MANAGER" || role == "QA_MANAGER") &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "MICROBIOLOGIST_SUBMITTED") &&
                response.data[0].qc_status == "WAITING_FOR_APPROVAL"
              ) {
                setSaveBtnStatus(true);
                setSubmitBtnStatus(true);
                setDisable(true);
              } else if (
                (role == "QC_MANAGER" || role == "QA_MANAGER") &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "MICROBIOLOGIST_SUBMITTED") &&
                (response.data[0].qc_status == "QC_REJECTED" ||
                  response.data[0].qc_status == "QA_REJECTED")
              ) {
                setSaveBtnStatus(false);
                setSubmitBtnStatus(false);
                setDisable(true);
              } else if (
                (role == "QC_MANAGER" ||
                  role == "QA_MANAGER" ||
                  role == "ROLE_MICROBIOLOGIST") &&
                (response.data[0].microbiologist_status ==
                  "MICROBIOLOGIST_APPROVED" ||
                  response.data[0].microbiologist_status ==
                    "MICROBIOLOGIST_SUBMITTED") &&
                (response.data[0].qc_status == "QC_APPROVED" ||
                  response.data[0].qc_status == "QA_APPROVED")
              ) {
                setSaveBtnStatus(false);
                setSubmitBtnStatus(false);
                setDisable(true);
              }
            } else {
              console.log(" need to check the Condition");
              if (role == "ROLE_MICROBIOLOGIST") {
                console.log("condition check");
                setSaveBtnStatus(true);
                setSubmitBtnStatus(true);
                setDisable(false);
              }

              if (role == "QC_MANAGER" || role == "QA_MANAGER") {
                console.log("condition check");
                setSaveBtnStatus(false);
                setSubmitBtnStatus(false);
                setDisable(true);
              }
            }
          })
          .catch((err) => {});
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printData.microbiologist_sign;
    if (username) {
      // console.log("usernameparams", username);

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
  }, [printData,  API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printData.qc_sign;
    if (username) {
      // console.log("usernameparams", username);

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
  }, [printData,  API.prodUrl, token]);

  let formattedMicroDate;
  if (printData.microbiologist_submit_on) {
    formattedMicroDate = moment(printData.microbiologist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedMicroDate = ""; // Or any other default value or error handling
  }
  let formattedQCDate;
  if (printData.qc_submit_on) {
    formattedQCDate = moment(printData.qc_submit_on).format("DD/mm/YYYY HH:mm");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCDate = ""; // Or any other default value or error handling
  }

  // Function to handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...details];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleInputChange100 = (index, field, value) => {
    const updatedRows = [...details];
    updatedRows[index][field] = value;
    setRows(updatedRows); // Update the state only if the value is valid
  };

  const handleInputChange1000 = (index, field, value) => {
    // const value = e.target.value;
    const updatedRows = [...details];
    updatedRows[index][field] = value;
    setRows(updatedRows); // Update the state only if the value is valid
  };

  const handleKeyDown = (e) => {
    const isAlphanumeric = /^[a-zA-Z0-9.]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", " ", "_"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handleKeyPress = (e) => {
    const allowedKeys = /[0-9.]/;
    const specialKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    // Check if the pressed key is allowed
    if (!allowedKeys.test(e.key) && !specialKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }
  };

  const handleKeyPress1000 = (e) => {
    const allowedKeys = /[0-9.]/;
    const specialKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    // Check if the pressed key is allowed
    if (!allowedKeys.test(e.key) && !specialKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }
  };

  // const handleKeyPress100 = (e) => {
  //   const allowedKeys = /[0-9.]/;
  //   const specialKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

  //   // Check if the pressed key is allowed
  //   if (!allowedKeys.test(e.key) && !specialKeys.includes(e.key)) {
  //     e.preventDefault();
  //     return;
  //   }
  // };

  const handleKeyPress100 = (e) => {
    const allowedKeys = /[0-9.]/;
    const specialKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    // Check if the pressed key is allowed
    if (!allowedKeys.test(e.key) && !specialKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    // Get the current value and the new input
    const currentValue = e.target.value;
    const newValue = currentValue + e.key;

    // Check if the new value is a valid number and within the range 0 < value < 100
    const numericValue = parseFloat(newValue);
    if (numericValue >= 100 || numericValue < 0 || isNaN(numericValue)) {
      e.preventDefault(); // Block input if the value is out of range or invalid
    }
  };

  const onChange = (key) => {
    console.log(key);
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/qc/ApproveSwabMicrobiologicalAnalysis`,
        {
          id: id,
          formatNo: formNo,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/QualityControl/Microbiology/Summary", {
          state: {
            formNo: formNo,
          },
        });
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

  // const deleteRow = (index) => {
  //   if (details.length === 1) {
  //     alert("At least one row is required.", details.length);
  //     return;
  //   }

  //   window.confirm({
  //     title: "Are you sure you want to delete this row?",
  //     content: "This action cannot be undone.",
  //     onOk() {
  //       setRows((prevDetails) => prevDetails.filter((_, i) => i !== index));
  //     },
  //     onCancel() {
  //       console.log("User canceled deletion.");
  //     },
  //   });
  // };

  const deleteRow = (index) => {
    if (details.length === 1) {
      alert("At least one row is required.");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (!isConfirmed) return;

    const updatedRows = details.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    if (!rejectRemarks) {
      message.warning("Please Enter the Reason!");
      setSaveLoading(false);
      return;
    }

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/qc/ApproveSwabMicrobiologicalAnalysis`,
        {
          id: id,
          formatNo: formNo,
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
        setTimeout(() => {
          navigate("/Precot/QualityControl/Microbiology/Summary", {
            state: {
              formNo: formNo,
            },
          });
        }, 1500);
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

  const handleSave = () => {
    setSaveLoading(true);
    let payload = {};

    const v = details.map((detail) => ({
      id: detail.id,
      arNumber: detail.arNumber,
      location: detail.location,
      employeeIdNo: detail.employeeNo,
      totalViableCount: detail.tvcCount,
      totalFungalCount: detail.tfcCount,
      testCompletionDate: detail.testCompletionDate,
      remark: detail.remark,
    }));
    console.log("Values change ", v);
    console.log("id", id);

    if (formNo == "PH-QCL01-AR-F-008") {
      payload = {
        id: id,
        formatName: formatName,
        formatNo: formatNo,
        revisionNo: revisionNo,
        refSopNo: sopNo,
        unit: unit,
        sampledDateF008: date,
        month: monthName,
        year: year,
        details: details.map((detail) => ({
          id: detail.id,
          arNumber: detail.arNumber,
          location: detail.location,
          // employeeIdNo: detail.employeeNo,
          totalViableCount: detail.tvcCount,
          totalFungalCount: detail.tfcCount,
          testCompletionDate: detail.testCompletionDate,
          remark: detail.remark || "NA",
        })),
      };
    }
    if (formNo == "PH-QCL01-AR-F-009") {
      payload = {
        id: id,
        formatName: formatName,
        formatNo: formatNo,
        revisionNo: revisionNo,
        refSopNo: sopNo,
        unit: unit,
        sampledDateF009: date,
        month: monthName,
        year: year,
        details: details.map((detail) => ({
          id: detail.id,
          arNumber: detail.arNumber,
          location: detail.location,
          employeeIdNo: detail.employeeNo,
          totalViableCount: detail.tvcCount,
          totalFungalCount: detail.tfcCount,
          testCompletionDate: detail.testCompletionDate,
          remark: detail.remark || "NA",
        })),
      };
    }
    if (formNo == "PH-QCL01-AR-F-010") {
      payload = {
        id: id,
        formatName: formatName,
        formatNo: formatNo,
        revisionNo: revisionNo,
        refSopNo: sopNo,
        unit: unit,
        sampledDateF010: date,
        month: monthName,
        year: year,
        details: details.map((detail) => ({
          id: detail.id,
          arNumber: detail.arNumber,
          location: detail.location,
          // employeeIdNo: detail.employeeNo,
          totalViableCount: detail.tvcCount,
          totalFungalCount: detail.tfcCount,
          testCompletionDate: detail.testCompletionDate,
          remark: detail.remark || "NA",
        })),
      };
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(
        `${ API.prodUrl}/Precot/api/qc/SaveSwabMicroAnalysisF8F9F10`,
        payload,
        {
          headers,
        }
      )
      .then((response) => {
        message.success("Microbiological Forms Save Successfully");
        setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/Microbiology/Summary", {
            state: {
              formNo: formNo,
            },
          });
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSaveLoading(false);
      });
  };

  const handleSubmit = () => {
    setSubmitLoading(true);

    // Validation for mandatory fields
    let isValid = true;

    details.forEach((detail, index) => {
      if (
        !detail.arNumber ||
        !detail.location ||
        !detail.tvcCount ||
        !detail.tfcCount ||
        !detail.testCompletionDate
      ) {
        isValid = false;
        let errorMessage = "";
        if (!detail.arNumber)
          errorMessage = "Please fill in Ar-Number field.\n";
        if (!detail.location) errorMessage = "Please fill in Location field.\n";
        if (!detail.tvcCount)
          errorMessage = "Please fill in Total Viable Count field.\n";
        if (!detail.tfcCount)
          errorMessage = "Please fill in Total Fungal Count field.\n";
        if (!detail.testCompletionDate)
          errorMessage = "Please fill in Test Completion Date field.\n";
        console.log("checking");
        message.error(errorMessage);
        return false;
      }
    });

    if (!isValid) {
      setSubmitLoading(false);
      return; // Stop execution if validation fails
    }

    let payload = {};
    if (formNo == "PH-QCL01-AR-F-008") {
      payload = {
        id: id,
        formatName: formatName,
        formatNo: formatNo,
        revisionNo: revisionNo,
        refSopNo: sopNo,
        unit: unit,
        sampledDateF008: date,
        month: monthName,
        year: year,
        details: details.map((detail) => ({
          id: detail.id,
          arNumber: detail.arNumber,
          location: detail.location,
          // employeeIdNo: detail.employeeNo,
          totalViableCount: detail.tvcCount,
          totalFungalCount: detail.tfcCount,
          testCompletionDate: detail.testCompletionDate,
          remark: detail.remark || "NA",
        })),
      };
    }
    if (formNo == "PH-QCL01-AR-F-009") {
      payload = {
        id: id,
        formatName: formatName,
        formatNo: formatNo,
        revisionNo: revisionNo,
        refSopNo: sopNo,
        unit: unit,
        sampledDateF009: date,
        month: monthName,
        year: year,
        details: details.map((detail) => ({
          id: detail.id,
          arNumber: detail.arNumber,
          location: detail.location,
          employeeIdNo: detail.employeeNo,
          totalViableCount: detail.tvcCount,
          totalFungalCount: detail.tfcCount,
          testCompletionDate: detail.testCompletionDate,
          remark: detail.remark || "NA",
        })),
      };
    }
    if (formNo == "PH-QCL01-AR-F-010") {
      payload = {
        id: id,
        formatName: formatName,
        formatNo: formatNo,
        revisionNo: revisionNo,
        refSopNo: sopNo,
        unit: unit,
        sampledDateF010: date,
        month: monthName,
        year: year,
        details: details.map((detail) => ({
          id: detail.id,
          arNumber: detail.arNumber,
          location: detail.location,
          // employeeIdNo: detail.employeeNo,
          totalViableCount: detail.tvcCount,
          totalFungalCount: detail.tfcCount,
          testCompletionDate: detail.testCompletionDate,
          remark: detail.remark || "NA",
        })),
      };
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(
        `${ API.prodUrl}/Precot/api/qc/SubmitSwabMicroAnalysisARF8F9F10`,
        payload,
        { headers }
      )
      .then((response) => {
        message.success("Microbiological Forms Submitted Successfully");
        setSubmitLoading(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/Microbiology/Summary", {
            state: {
              formNo: formNo,
            },
          });
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSubmitLoading(false);
      });
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/Microbiology/Summary", {
      state: {
        formNo: formNo,
      },
    });
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

  const items = [
    {
      key: "1",
      label: <p>Microbiological Analysis Report</p>,
      children: (
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Sampled & Tested / Incubation Start on
                </th>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  A.R Number
                </th>
                {formNo === "PH-QCL01-AR-F-008" && (
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    location
                  </th>
                )}
                {(formNo === "PH-QCL01-AR-F-009" ||
                  formNo === "PH-QCL01-AR-F-010") && (
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    location / machine
                  </th>
                )}
                {formNo === "PH-QCL01-AR-F-009" && (
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    Employee ID NO
                  </th>
                )}
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                  colSpan="2"
                >
                  Test Parameters & Specification
                </th>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Test Completion Date
                </th>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Remark
                </th>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Action
                </th>
                {/* <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>Actions</th> */}
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                ></th>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                ></th>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                ></th>
                {formNo === "PH-QCL01-AR-F-009" && (
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                      backgroundColor: "#f0f0f0",
                    }}
                  ></th>
                )}
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Total Viable Count (TVC - cfu/cm²) (Limit ≤1000)
                </th>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Total Fungal Count (TFC - cfu/cm²) (Limit ≤100)
                </th>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                ></th>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                ></th>
                <th
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                ></th>
                {/* <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', backgroundColor: '#f0f0f0' }}></th> */}
              </tr>
            </thead>
            <tbody>
              {details.map((row, index) => (
                <tr key={index}>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      className="inp-new"
                      // type="date"
                      value={formatDate(row.sampledDate)}
                      disabled={disable}
                      // onChange={(e) => handleInputChange(index, 'sampledDate', e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      className="inp-new"
                      type="text"
                      value={row.arNumber}
                      onChange={(e) =>
                        handleInputChange(index, "arNumber", e.target.value)
                      }
                      disabled={disable}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      className="inp-new"
                      type="text"
                      value={row.location}
                      onChange={(e) =>
                        handleInputChange(index, "location", e.target.value)
                      }
                      disabled={disable}
                    />
                  </td>
                  {formNo === "PH-QCL01-AR-F-009" && (
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      <input
                        className="inp-new"
                        type="text"
                        value={row.employeeNo}
                        onChange={(e) =>
                          handleInputChange(index, "employeeNo", e.target.value)
                        }
                        onKeyDown={handleKeyPress}
                        disabled={disable}
                      />
                    </td>
                  )}
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      className="inp-new"
                      type="number"
                      value={row.tvcCount}
                      onChange={(e) =>
                        handleInputChange1000(index, "tvcCount", e.target.value)
                      }
                      onBlur={(e) => {
                        if (e.target.value > 1000) {
                          message.info("Tvc Count entered more than 1000");
                        }
                      }}
                      onKeyDown={handleKeyPress}
                      disabled={disable}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      className="inp-new"
                      type="number"
                      value={row.tfcCount}
                      onChange={(e) =>
                        handleInputChange100(index, "tfcCount", e.target.value)
                      }
                      onBlur={(e) => {
                        if (e.target.value > 100) {
                          message.info("Tfc Count entered more than 100");
                        }
                      }}
                      onKeyDown={handleKeyPress}
                      disabled={disable}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      className="inp-new"
                      type="date"
                      value={row.testCompletionDate}
                      min={row.sampledDate}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "testCompletionDate",
                          e.target.value
                        )
                      }
                      disabled={disable}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      className="inp-new"
                      type="text"
                      value={row.remark}
                      onChange={(e) =>
                        handleInputChange(index, "remark", e.target.value)
                      }
                      disabled={disable}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      type="primary"
                      danger
                      icon={<FaTrash style={{ fontSize: "10px" }} />}
                      onClick={() => deleteRow(index)}
                      disabled={disable}
                      style={{
                        padding: "2px 4px",
                        fontSize: "10px",
                        height: "24px",
                        backgroundColor: "#ff4d4f",
                        borderColor: "#ff4d4f",
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                  {/* <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>
                    <Button type="primary" danger onClick={() => deleteRow(index)}>Delete</Button>
                  </td> */}
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
              marginTop: "10px",
            }}
            onClick={addRow}
            disabled={disable}
          >
            <AiOutlinePlus style={{ marginRight: "5px" }} />
            Add Row
          </Button>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
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
                {/* <b>Tested by (Microbiologist) : Sign and Date </b> */}
                <b>Tested by (Microbiologist) </b>
              </td>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                {/* <b>Approved by (QC In-Charge) : Sign and Date </b> */}
                <b>Approved by (QC/QA Manager)</b>
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
                <br />
                {getImage !== "" && (
                  <img className="signature" src={getImage} alt="Micro" />
                )}
                <br />
                {printData.microbiologist_sign} <br />
                {formattedMicroDate}
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
                {getImage1 !== "" && (
                  <img className="signature" src={getImage1} alt="QC" />
                )}
                <br />
                {printData.qc_sign} <br />
                {formattedQCDate}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div>
      <>
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
              // onClick={showDrawer}
            ></Button>
          }
          buttonsArray={[
            role === "QC_MANAGER" || role === "QA_MANAGER" ? (
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
                  loading={submitLoading}
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
                    //   display: canDisplayButton2(),
                    display: saveBtnStatus ? "block" : "none",
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

            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              shape="round"
              icon={<BiLock color="#00308F" />}
              // onClick={handleLogout}
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
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          style={{ marginTop: "1%" }}
        />
      </>
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
    </div>
  );
};

export default Micro;
