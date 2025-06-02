/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Select, Descriptions, Menu, Avatar, Drawer } from "antd";
import BleachingHeader from "../Components/BleachingHeader.js";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import { createGlobalStyle } from "styled-components";
import "../index.css";

import { Tooltip } from "antd";
import moment from "moment";
import API from "../baseUrl.json";
import { FaUserCircle } from "react-icons/fa";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import BleContaminationCheckEdit from "./BleContaminationCheckEdit_f05";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { Tabs, Button, Col, Input, Row, message } from "antd";
import { BiLock, BiNavigation } from "react-icons/bi";
import { IoChevronBackSharp, IoPrint } from "react-icons/io5";
import { VscGoToFile, VscGoToSearch } from "react-icons/vsc";
import { GoArrowLeft } from "react-icons/go";
import { jwtDecode } from "jwt-decode";
import PrecotSidebar from "../Components/PrecotSidebar.js";
// import Padpunching_f25_summary from "./Padpunching_f25_Summary.js";

const QualityControl_f11_Summary = () => {
  const [open, setOpen] = useState(false);
  const [selectYear, setSelectYear] = useState("");
  const [Months, setMonths] = useState("");
  const [eq, setEquiid] = useState("");
  const [printParam, setPrintParam] = useState({
    year: "",

    month: "",
    eqId: "",
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => {
    return {
      value: (currentYear - index).toString(),
      label: (currentYear - index).toString(),
    };
  });

  function updatePageNumbers() {
    const pageNumberElements = document.querySelectorAll(".page-number");
    const pageElements = document.querySelectorAll(".page");

    pageNumberElements.forEach((pageNumberElement, index) => {
      pageNumberElement.textContent = `Page ${index + 1} of ${
        pageElements.length
      }`;
    });
  }

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const [newDate, setNewDate] = useState("");

  const [modalData, setmodalData] = useState();
  const [newData, setnewData] = useState();
  const [ContaminationData, setContaminationData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [date, setDate] = useState("");
  const [showDateInput, setShowDateInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [PrintByDate, setPrintByDate] = useState(null);
  const [printResponseData, setPrintResponseData] = useState([]);
  const [SecondResponseData, setSecondResponseData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  //const [shiftLov, setShiftLov] = useState([]);
  const [reason, setReason] = useState(false);
  const [shiftPrint, setShiftPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [orderNumberPrint, setOrderNumberPrint] = useState("");

  // Generate year options from current year to previous 20 years

  // Generate month options

  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  console.log("SecondResponse", SecondResponseData);

  const [getImage, setGetImage] = useState("");

  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: landscape;
    }
    body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
                      .page-break {
                page-break-after: always;
            }
  }
`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData[0]?.chemist_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [printResponseData,      API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData[0]?.qc_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [printResponseData,      API.prodUrl]);

  console.log("get image", getImage);

  const [gotobtn, setGotobtn] = useState(true);

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const role = userRole;

  const formatDateToDDMMYYYY = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (newDate) {
      const formattedDate = formatDateToDDMMYYYY(newDate);

      setDate(formattedDate); // Save formatted date in date state
    }
  }, [newDate]);

  const handlePrint = () => {
    setShowModal(true);
    console.log("print screen works");
  };
  const printDateSubmit = () => {
    // checkDateExists();
  };
  const handleDateChange = (event) => {
    setPrintByDate(event.target.value);
  };
  let formattedChemistDate = printResponseData[0]?.chemist_submit_on
    ? moment(printResponseData[0].chemist_submit_on).format("DD/MM/YYYY HH:mm")
    : "";

  let formattedQCDate = printResponseData[0]?.qc_submit_on
    ? moment(printResponseData[0].qc_submit_on).format("DD/MM/YYYY HH:mm")
    : "";

  let formattedCalDueDate = printResponseData[0]?.cal_due_date
    ? moment(printResponseData[0].cal_due_date).format("DD/MM/YYYY")
    : "";

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };
  const handleDatePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
  };
  const formattedDate = moment(datePrint, "YYYY-MM-DD").format("DD/MM/YYYY");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const printSubmit = async () => {
    if (
      printParam.year == "" &&
      printParam.month == "" &&
      printParam.eqId == ""
    ) {
      message.warning("Please Select Atleast One ");
      return;
    }

    try {
      const response = await axios.get(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF011/print`,
        {
          params: {
            eq_no: ` ${printParam.eqId}`,
            year: printParam.year.trim(),
            month: printParam.month.trim(),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No data available to print");
        // setPrintButtonLoading(false);
        return;
      }
      console.log(response.data);
      setPrintResponseData(response.data);

      setTimeout(() => {
        window.print();
      }, [2000]);

      // Set the body to print only the section
      //window.print();  // Trigger print
    } catch (error) {
      console.log(" error blocks");
      // setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  // useEffect(() => {
  //   const fetchShiftOptions = async () => {
  //     try {
  //       const response = await fetch(`${    API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = await response.json();
  //       console.log(data);

  //       if (Array.isArray(data)) {
  //           setShiftLov(data);
  //       } else {
  //         console.error("API response is not an array", data);
  //         setShiftLov([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching BMR options:", error);
  //       setShiftLov([]);
  //     }
  //   };

  //   fetchShiftOptions();
  // }, [token]);

  const handleShiftChange = (value) => {
    console.log(" Shift ", value);
    setShift(value);
    setGotobtn(false);
  };

  console.log("Date", newDate);
  console.log("year", selectYear);
  console.log("month", Months);
  console.log("Eq.id", eq);

  const goTo = () => {
    if (Months && selectYear && eq) {
      navigate("/Precot/QualityControl/F-011", {
        state: { Months, selectYear, eq },
      });
    } else {
      // Handle the case where year or month is not selected
      message.error("Please select a Year, Month and EQ.id.");
    }
  };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const token = localStorage.getItem("token");
  //         const role = localStorage.getItem("role");

  //         let apiUrl = "";
  //         if (role === "ROLE_OPERATOR") {
  //           apiUrl = `${    API.prodUrl}/Precot/api/PadPunching/Service/getSummaryBagMakingDailyProduction`;
  //         } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
  //           apiUrl = `${    API.prodUrl}/Precot/api/PadPunching/Service/getSummaryBagMakingDailyProduction`;
  //         }
  //         else {
  //           throw new Error("Role not found in localStorage.");
  //         }

  //         const response = await fetch(apiUrl, {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });

  //         if (!response.ok) {
  //           throw new Error("Network response was not ok.");
  //         }

  //         const data = await response.json();

  //         console.log("Fetched data:", data);

  //         if (!data || !Array.isArray(data)) {
  //           throw new Error("Data is not an array or undefined");
  //         }

  //         setnewData(data);
  //         setmodalData(data);

  //         setContaminationData(
  //           data.map((item) => ({
  //             key: item.header_id, // Assuming header_id is unique
  //             formatName: item.formatName,
  //             formatNo: item.formatNo,
  //             revisionNo: item.revisionNo,
  //             date: item.date,
  //             orderNo:item.orderNo,
  //             reason:item.reason,

  //             productName:item.productName,

  //             shift:item.shift,
  //             operator_status:item.operator_status,
  //             status: item.status,
  //             hod_status: item.hod_status,
  //             supervisor_status: item.supervisor_status,
  //             mailstatus: item.mail_status,
  //           }))
  //         );
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []); // Ensure this dependency array is correct for your use case

  useEffect(() => {
    const findReason = () => {
      for (const data of chemicalTests) {
        if (data.chemist_status === "CHEMIST_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [ContaminationData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Precot");
  };

  useEffect(() => {
    console.log("modal", modalData);
  }, [modalData]);

  const handleModalClose = () => {
    setPrintParam({
      year: "",
      month: "",
      eqId: "",
    });
    setShowModal(false);
    setShiftPrint(null);
    setDatePrint(null);
    setOrderNumberPrint(null);
  };

  //   const handleEdit = (record) => {
  //     console.log("recorddd",record)

  // const {
  //       date,
  //       shift,
  //      } = record;

  //  navigate('/Precot/QC/F013/Summary', {
  //     state: {
  //       newdate:date,
  //       shiftvalue:shift,
  //     },
  // });

  // };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new window.Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [chemicalTests, setChemicalTests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChemicalTests = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${    API.prodUrl}/Precot/api/chemicaltest/CLF011/getAll`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setChemicalTests(response.data);
      } catch (error) {
        message.error("Failed to load chemical tests.");
      } finally {
        setLoading(false);
      }
    };

    fetchChemicalTests();
  }, []);

  const handleEdit = (record) => {
    navigate("/Precot/QualityControl/F-011", {
      state: {
        Months: record.month,
        selectYear: record.year,
        eq: record.eq_id_no,
      },
    });
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1, // Auto-increment S.No.
    },
    {
      title: "Eq. ID",
      dataIndex: "eq_id_no",
      key: "eq_id_no",
      align: "center",
      render: (text) => (text ? text : "N/A"), // Display equipment ID
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => (text ? new Date(text).toLocaleDateString() : "N/A"), // Display formatted date
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Manager Status",
      dataIndex: "qc_status",
      key: "qc_status",
      align: "center",
      render: (text) => (text ? text : " "),
    },

    {
      title: "Action",
      dataIndex: "",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          style={{ width: "100%" }}
        >
          Review
        </Button>
      ),
    },
  ];

  const Reason = {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    align: "center",
    render: (text) => (text ? text : "N/A"),
  };

  let columns = [...baseColumns];

  // If any chemical tests have a "reason", add the Reason column
  if (chemicalTests.some((test) => test.reason)) {
    const actionIndex = columns.findIndex((col) => col.key === "actions");
    columns.splice(actionIndex, 0, Reason);
  }

  const idOptions = [{ value: "PH-E/I-LAB38", label: "PH-E/I-LAB38" }];

  const handlePrintParams = (value, name) => {
    setPrintParam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <div id="section-to-print" className="page-break">
        <style>
          {`
      @media print {
        @page {
          size: landscape;
          scale: 90%;
        }
        body {
          -webkit-print-color-adjust: exact;
          width: 100%;
          height: 100%;
          transform: scale(0.9);
        }
 
        body * {
          visibility: hidden;
        }
 
        #section-to-print, #section-to-print * {
          visibility: visible;
        }
 
        #section-to-print {
          page-break-after: always;
        }
        .page {
          page-break-after: always;
        }
      }
    `}
        </style>

        <table
          className="f18table"
          style={{
            width: "100%",
            margin: "auto",
            tableLayout: "fixed",
            marginTop: "50px",
          }}
        >
          <thead>
            <tr>
              <td
                colspan="5"
                rowSpan="4"
                style={{
                  textAlign: "center",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                  marginTop: "50px",
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                />
                <br />
                Unit H
              </td>
              <th
                colspan="15"
                rowSpan="4"
                style={{
                  textAlign: "center",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                SPECTROPHOTOMETER CM-3600A CALIBRATION REPORT
              </th>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Format No.:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printResponseData[0]?.format_no}
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Revision No.:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printResponseData[0]?.revision_no}
              </td>
            </tr>

            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Ref. SOP No.:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printResponseData[0]?.ref_sop_no}
              </td>
            </tr>

            <tr>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                Page No.:
              </td>
              <td
                colspan="5"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                1 Of 1
              </td>
            </tr>
          </thead>
          <br />
          <br />

          <tbody>
            <tr>
              <td
                colSpan="10"
                style={{
                  textAlign: "left",
                  padding: "10px",
                  border: "1px solid black",
                }}
              >
                Frequency: Monthly
              </td>
              <td
                colSpan="10"
                style={{
                  textAlign: "left",
                  padding: "10px",
                  border: "1px solid black",
                }}
              >
                EQ.ID No: {printResponseData[0]?.eq_id_no}
              </td>
              <td
                colSpan="10"
                style={{
                  textAlign: "left",
                  padding: "10px",
                  border: "1px solid black",
                }}
              >
                Month & Year: {printResponseData[0]?.month}{" "}
                {printResponseData[0]?.year}
              </td>
            </tr>

            <tr>
              <th
                colSpan="5"
                rowSpan="8"
                style={{
                  textAlign: "center",
                  padding: "7px",
                  fontWeight: "bold",
                }}
              >
                Setting for Calibration:{" "}
              </th>
              <th
                colSpan="7"
                rowSpan="2"
                style={{ textAlign: "center", padding: "10px" }}
              >
                Status
              </th>
              <th colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                Previous
              </th>
              <th colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                Current{" "}
              </th>
            </tr>

            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                UV Adjust{" "}
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                {printResponseData[0]?.uv_adjust || "N/A"}
              </td>
            </tr>

            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                Flashes Pre - measure: 1
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                UV Adjustment method -Whiteness (WI){" "}
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                {printResponseData[0]?.uv_adjust_methods || "N/A"}
              </td>
            </tr>

            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                Calibration mode: Reflectance (%R){" "}
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                10 Degree, D65{" "}
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                {printResponseData[0]?.degree || "N/A"}
              </td>
            </tr>

            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                Specular component: Included (SCI){" "}
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                Tint: value (0), Tolerance (0.05){" "}
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                {printResponseData[0]?.tint_value || "N/A"}
              </td>
            </tr>

            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                UV-energy:Included (100%){" "}
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                WI: value (0), Tolerance (0.50){" "}
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                {printResponseData[0]?.wi_value || "N/A"}
              </td>
            </tr>

            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                Illumination Intensity:
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                Low{" "}
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                {printResponseData[0]?.low || "N/A"}
              </td>
            </tr>

            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                Lens position: Large (LAV){" "}
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                Large (LAV){" "}
              </td>
              <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                {printResponseData[0]?.large || "N/A"}
              </td>
            </tr>

            <tr>
              <td colSpan="10" style={{ textAlign: "left", padding: "10px" }}>
                Calibration time :{printResponseData[0]?.cal_time}
              </td>
              <td colSpan="10" style={{ textAlign: "left", padding: "10px" }}>
                Status:{printResponseData[0]?.status}
              </td>
              <td colSpan="10" style={{ textAlign: "left", padding: "10px" }}>
                Calibration next due date:{formattedCalDueDate}
              </td>
            </tr>
            <tr>
              <td
                colSpan="15"
                style={{
                  textAlign: "center",
                  borderBottom: "none",
                }}
              >
                Checked By:
              </td>
              <td
                colSpan="15"
                style={{
                  textAlign: "center",
                  borderBottom: "none",
                }}
              >
                verified By:
              </td>
            </tr>

            <tr>
              <td
                colSpan="15"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  borderTop: "none",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {printResponseData[0]?.chemist_status ===
                  "CHEMIST_APPROVED" && (
                  <>
                    {getImage && (
                      <img
                        className="signature"
                        src={getImage}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {printResponseData[0] && printResponseData[0].chemist_sign}
                    <br />
                    {formattedChemistDate}
                  </>
                )}
              </td>

              <td
                colSpan="15"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  borderTop: "none",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {(printResponseData[0]?.qc_status === "QC_REJECTED" ||
                  printResponseData[0]?.qc_status === "QC_APPROVED" ||
                  printResponseData[0]?.qc_status === "QA_REJECTED" ||
                  printResponseData[0]?.qc_status === "QA_APPROVED" ||
                  printResponseData[0]?.qc_status ===
                    "CHEMIST_DESIGNEE_APPROVED" ||
                  printResponseData[0]?.qc_status ===
                    "CHEMIST_DESIGNEE_REJECTED") && (
                  <>
                    {getImage1 && (
                      <img
                        className="signature"
                        src={getImage1}
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />

                    {printResponseData[0] && printResponseData[0].qc_submit_by}
                    <br />
                    {formattedQCDate}
                  </>
                )}
              </td>
            </tr>
          </tbody>

          <br />
          <br />

          <tfoot>
            <tr>
              <td colspan="8" style={{ textAlign: "center" }}>
                Particulars
              </td>
              <td colspan="7" style={{ textAlign: "center" }}>
                Prepared by
              </td>
              <td colspan="7" style={{ textAlign: "center" }}>
                Reviewed by
              </td>
              <td colspan="8" style={{ textAlign: "center" }}>
                Apporved by
              </td>
            </tr>

            <tr>
              <td colspan="8" style={{ textAlign: "center" }}>
                Name
              </td>
              <td colspan="7" style={{ textAlign: "center" }}></td>
              <td colspan="7" style={{ textAlign: "center" }}></td>
              <td colspan="8" style={{ textAlign: "center" }}></td>
            </tr>

            <tr>
              <td colspan="8" style={{ textAlign: "center" }}>
                Signature & Date
              </td>
              <td colspan="7" style={{ textAlign: "center" }}></td>
              <td colspan="7" style={{ textAlign: "center" }}></td>
              <td colspan="8" style={{ textAlign: "center" }}></td>
            </tr>
          </tfoot>
        </table>
      </div>
      {contextHolder}

      <GlobalStyle />

      <div>
        <BleachingHeader
          unit="Unit-H"
          formName="SPECTROPHOTOMETER CM-3600A CALIBRATION REPORT"
          formatNo="PH-QCL01/F-011 "
          MenuBtn={
            <Button
              type="primary"
              icon={<TbMenuDeep />}
              onClick={showDrawer}
            ></Button>
          }
          buttonsArray={[
            <Button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              onClick={handleBack}
              shape="round"
              icon={<GoArrowLeft color="#00308F" />}
            >
              Back
            </Button>,
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginRight: "10px",
                // display: printBtnStatus ? "block" : "none",
              }}
              shape="round"
              icon={<IoPrint color="#00308F" />}
              onClick={handlePrint}
            >
              &nbsp;Print
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

        <div>
          <Select
            id="yearSelect"
            style={{
              width: "20%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
              marginBottom: "3%",
            }}
            onChange={(value) => setSelectYear(value)}
            placeholder="Select Year"
          >
            <Select.Option value="" disabled selected hidden>
              Select Year
            </Select.Option>
            {years.map((year) => (
              <Select.Option key={year.value} value={year.value}>
                {year.label}
              </Select.Option>
            ))}
          </Select>

          <Select
            id="monthSelect"
            style={{
              width: "20%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
              marginBottom: "3%",
              marginLeft: "30px",
            }}
            // onChange={(value) => setSelectMonth(value)}
            onChange={(value) => setMonths(value)}
            placeholder="Select Month"
          >
            <Select.Option value="" disabled selected hidden>
              Select Month
            </Select.Option>
            {months.map((month) => (
              <Select.Option key={month.value} value={month.value}>
                {month.label}
              </Select.Option>
            ))}
          </Select>
          <Select
            id="EQ.id"
            style={{
              width: "20%",
              height: "36x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
              marginBottom: "3%",
              marginLeft: "30px",
            }}
            // onChange={(value) => setSelectMonth(value)}
            onChange={(value) => setEquiid(value)}
            placeholder="Select EQ.id"
          >
            <Select.Option value="" disabled selected hidden>
              Select Eq.id
            </Select.Option>

            <Select.Option value=" PH-E/I-LAB38">PH-E/I-LAB38</Select.Option>
          </Select>

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              backgroundColor: "#E5EEF9",
              marginBottom: "3%",
              marginLeft: "50px",
            }}
            shape="round"
            icon={<BiNavigation color={"#00308F"} />}
            onClick={goTo}
          >
            Go To
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={chemicalTests}
        rowKey={(record) => record.lab_id} // Assuming lab_id is unique
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        style={{
          gap: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={printSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <label> Year : </label>
        <Select
          options={years}
          value={printParam.year}
          style={{ width: "150px", textAlign: "center" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "year");
          }}
        >
          {" "}
        </Select>
        <br></br>
        <label> Month : </label>
        <Select
          options={months}
          value={printParam.month}
          style={{ width: "150px", textAlign: "center" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "month");
          }}
        >
          {" "}
        </Select>
        <br></br>
        <label> Eq Id : </label>
        <Select
          options={idOptions}
          value={printParam.eqId}
          style={{ width: "150px", textAlign: "center" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "eqId");
          }}
        >
          {" "}
        </Select>
        <br></br>
      </Modal>
    </div>
  );
};

export default QualityControl_f11_Summary;
