/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "../Assests/logo.png";
import {
  Table,
  Modal,
  Select,
  InputGroup,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
} from "antd";

import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";

import { useNavigate, useLocation } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader.js";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { Tabs, Button, Col, Input, Row } from "antd";
import { IoCreate, IoPrint } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import moment from "moment";
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QualityControl_f25_Summary = () => {
  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: potrait;
    } 
      table {
      width: 100%;
      margin:auto;
    }
       #section-to-print {
        width: 100%;
        page-break-after: always,
         tableLayout: "fixed";
      }
    body {
        -webkit-print-color-adjust: exact;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
  }
`;
  const initialized = useRef(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const [GlasswareBreakage, setGlasswareBreakage] = useState([]);
  const [formData, setFormData] = useState("");
  const [Lotno, setLotno] = useState("");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [showModal, setShowModal] = useState(false);
  const [datePrint, setDatePrint] = useState("");
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [cakingData, setCakingData] = useState([]);
  const [lotNumbers, setLotNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const [totalPages, setTotalPages] = useState(3); // Set this based on your data

  // Example function to go to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const [selectedPrintYear, setSelectedPrintYear] = useState(null);
  const [SelectedLotNo, setSelectedLotNo] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [summary, setSummaryData] = useState([]);
  const [eSign, setESign] = useState({
    chemist_sign: "",
    microbiologist_sign: "",
    qc_sign: "",
  });
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle null, undefined, or empty strings

    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date)) return "Invalid Date";

    // Format the date in dd/mm/yyyy format
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  useEffect(() => {
    const signatureKeys = ["chemist_sign", "microbiologist_sign", "qc_sign"];

    if (printResponseData) {
      // Add null check for printResponseData
      signatureKeys.forEach((key) => {
        const username = printResponseData[key];
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
              setESign((prevSign) => ({
                ...prevSign,
                [key]: url,
              }));
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
        }
      });
    }
  }, [token, printResponseData]);

  let formattedMicroDate;
  if (printResponseData?.microbiologist_submit_on) {
    formattedMicroDate = moment(
      printResponseData?.microbiologist_submit_on
    ).format("DD/MM/YYYY HH:mm");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedMicroDate = ""; // Or any other default value or error handling
  }

  let formattedChemistDate;
  if (printResponseData?.chemist_submit_on) {
    formattedChemistDate = moment(printResponseData?.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where chemist_submit_on is null or undefined
    formattedChemistDate = ""; // Or any other default value or error handling
  }
  let formattedQCDate;
  if (printResponseData?.qc_submit_on) {
    formattedQCDate = moment(printResponseData?.qc_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCDate = ""; // Or any other default value or error handling
  }

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  const handleSelectText = (e, name) => {
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    }
  };

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }

  // Generate month options
  const months = [
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.supervisor_sign;
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
  }, [printResponseData,      API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.hod_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,      API.prodUrl, token]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handlePrint = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setDatePrint(null);
    setSelectedLotNo(null);
    setSelectedPrintYear(null);
  };
  useEffect(() => {
    const findReason = () => {
      for (const data of summary) {
        if (
          data.qc_status === "QC_REJECTED" ||
          data.qc_status === "QA_REJECTED"
        ) {
          setReason(true);
          break;
        } else {
          setReason(false);
        }
      }
    };
    findReason();
  }, [summary]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${    API.prodUrl}/Precot/api/qc/ShelfLifePeriodReport/PrintForF026`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "json",
          }
        );
        const data = response.data;

        console.log("data", data);

        // Extract and filter unique lot numbers
        const uniqueLotNos = Array.from(
          new Set(data.map((item) => item.lotNumber))
        ); // Assuming lot_no is the field for lot numbers
        console.log("uniqueLotNos:", uniqueLotNos);

        // Set the unique lot numbers in state
        setLotNumbers(uniqueLotNos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData when the component mounts
    fetchData();
  }, []);

  const handlePrintDateChange = (event) => {
    setDatePrint(event.target.value);
  };

  //   handle edit

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };
  const handlePrintYearChange = (value) => {
    setSelectedPrintYear(value);
  };

  //   summary table Get api

  // Table Summary
  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Lot.No",
      dataIndex: "lotNumber",
      key: "lotNumber",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Date",
      dataIndex: "testingDate", // Matches the date field in your payload
      key: "testingDate",
      align: "center",
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
    {
      title: "Chemist Status",
      dataIndex: "chemist_status", // Field for Micro/Chemist Status
      key: "chemist_status",
      align: "center",
      render: (text) => (text ? text : "N/A"), // Handle null values
    },
    {
      title: "Microbiologist Status",
      dataIndex: "microbiologist_status", // Field for Micro/Chemist Status
      key: "microbiologist_status",
      align: "center",
      render: (text) => (text ? text : "N/A"), // Handle null values
    },
    {
      title: "Manager Status",
      dataIndex: "qc_status", // Field for Manager Status
      key: "qc_status",
      align: "center",
      render: (text) => (text ? text : "N/A"), // Handle null values
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ width: "100%" }}
          >
            Review
          </Button>
        </>
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

  // Set columns conditionally based on the presence of "reason" field
  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 6), Reason, ...baseColumns.slice(6)];
  } else {
    columns = baseColumns;
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const fetchData = async () => {
        try {
          let response;

          if (role === "ROLE_CHEMIST" || role === "ROLE_MICROBIOLOGIST") {
            response = await axios.get(
              `${    API.prodUrl}/Precot/api/qc/ShelfLifePeriodReport/GetAll`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else if (role === "QC_MANAGER" || role === "QA_MANAGER") {
            response = await axios.get(
              `${    API.prodUrl}/Precot/api/qc/ShelfLifePeriodReport/getAllQcNotSubmitted`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }

          if (response) {
            setSummaryData(response.data);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [role, token, navigate]);

  const printSubmit = () => {
    // if (!selectedPrintYear || !SelectedLotNo) {
    //   message.error("Year and Lot Number are mandatory");
    //   return;
    // }
    fetchPrintData();
  };

  const fetchPrintData = () => {
    try {
      axios
        .get(
          // `${    API.prodUrl}/Precot/api/qc/ShelfLifePeriodReport/PrintForF026?lotNo=${SelectedLotNo}&year=${selectedPrintYear}`,
          `${    API.prodUrl}/Precot/api/qc/ShelfLifePeriodReport/PrintForF026?lotNo=${SelectedLotNo}&year=${selectedPrintYear}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            setPrintResponseData(res.data[0]);
            setTimeout(() => {
              window.print();
              handleModalClose();
            }, 3000);
          } else {
            setPrintResponseData(null);
            message.error(res.data.message || "No data available");
          }
        })
        .catch((err) => {
          message.error("Failed to fetch print data. Please try again.");
        });
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  //   goto button
  const goTo = () => {
    if (date == "" || date == null) {
      message.warning("Please Select test Date");
      return;
    }

    if (Lotno == "" || Lotno == null) {
      message.warning("Please type a Lotno");
    }
    navigate("/precot/QualityControl/F-025", {
      state: {
        date: date,

        Ltno: Lotno,
      },
    });
  };
  const handleEdit = (record) => {
    console.log("edit selected id", record.date, record.Ltno);

    console.log("x", record);

    navigate("/precot/QualityControl/F-025", {
      state: {
        Ltno: record.lotNumber,
        date: record.testingDate,
      },
    });
  };

  return (
    <div>
      <GlobalStyle />

      <div id="section-to-print">
        <div>
          <table
            style={{ marginTop: "10px", scale: "94%", tableLayout: "fixed" }}
          >
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <td colSpan="15" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="70" rowSpan="4" style={{ textAlign: "center" }}>
                  SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING
                  REPORT DATA
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">PH-QCL01/F-025</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="15">02</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="15">PH-QCL01-D-05</td>
              <tr>
                <td colSpan="15">Page No.:</td>
                <td colSpan="15"> 1 of 4</td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <th colSpan="115" style={{ textAlign: "center" }}>
                  PHYSICAL PROPERTIES TEST
                </th>
                {/* <th colSpan="70" style={{ textAlign: "center" }}>
                  PHYSICAL & CHEMICAL PROPERTIES TEST
                </th> */}
              </tr>
              <tr>
                <th colSpan="115" style={{ textAlign: "center" }}>
                  PRODUCT DETAILS
                </th>
              </tr>
              <tr>
                <td colSpan="45" style={{ textAlign: "center" }}>
                  Customer
                </td>
                <td colSpan="70" style={{ textAlign: "center" }}>
                  {printResponseData?.customer || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  FIBER IDENTIFICATION
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  100% Cotton
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {" "}
                  {Array.isArray(printResponseData?.physicalAndChemicalTests) &&
                  printResponseData?.physicalAndChemicalTests[0]
                    ?.fiberIdentificationResult
                    ? printResponseData?.physicalAndChemicalTests[0]
                        ?.fiberIdentificationResult
                    : "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.fiberIdentificationRemarks || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="45" style={{ textAlign: "center" }}>
                  Brand
                </td>
                <td colSpan="70" style={{ textAlign: "center" }}>
                  {printResponseData?.brand || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  ODOUR
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  Absent
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.odurResult || "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.odurRemarks || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="45" style={{ textAlign: "center" }}>
                  Product Description
                </td>
                <td colSpan="70" style={{ textAlign: "center" }}>
                  {printResponseData?.productDescription || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  FOREIGN FIBERS
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  -
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.foreignFibersResult || "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.foreignFibersRemarks || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="45" style={{ textAlign: "center" }}>
                  Pattern
                </td>
                <td colSpan="70" style={{ textAlign: "center" }}>
                  {printResponseData?.pattern || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  FLUORESCENCE
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  Nil
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.flourescenceResult || "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.flourescenceRemark || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="45" style={{ textAlign: "center" }}>
                  Lot Number
                </td>
                <td colSpan="70" style={{ textAlign: "center" }}>
                  {printResponseData?.lotNumber || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  SINKING TIME (sec)
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {" "}
                  &lt;10 sec
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.sinkingTimeResult || "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.sinkingTimeRemark || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="45" style={{ textAlign: "center" }}>
                  Production Date
                </td>
                <td colSpan="70" style={{ textAlign: "center" }}>
                  {formatDate(printResponseData?.productionDate) || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  ABSORBANCY (g/g)
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  &gt;23g/g
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.absorbancyResult || "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.absorbancyRemark || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="45" style={{ textAlign: "center" }}>
                  Testing Date
                </td>
                <td colSpan="70" style={{ textAlign: "center" }}>
                  {formatDate(printResponseData?.testingDate)}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  pH
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  6.0-8.0
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]?.phResult ||
                    "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]?.phRemark ||
                    "N/A"}
                </td> */}
              </tr>
              {/* dimension */}
              <tr>
                <td
                  colSpan="30"
                  rowSpan="9"
                  style={{ textAlign: "center", paddingTop: "100px" }}
                >
                  DIMENSION (mm)
                </td>
                <td colSpan="20" rowSpan="3" style={{ textAlign: "center" }}>
                  TRIALS
                </td>
                <td colSpan="16" style={{ textAlign: "center" }}>
                  Length
                </td>
                <td colSpan="16" style={{ textAlign: "center" }}>
                  Width
                </td>
                <td colSpan="16" style={{ textAlign: "center" }}>
                  Height/Diameter
                </td>
                <td colSpan="17" rowSpan="3" style={{ textAlign: "center" }}>
                  STATUS
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  SURFACE ACTIVITY
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  Foam must not cover surface
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.surfaceActivityResult || "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.surfaceActivityRemark || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="12">STD :</td>
                <td colSpan="12">
                  {printResponseData?.dimensionLengthStd || "N/A"}
                </td>
                <td colSpan="12">
                  {printResponseData?.dimensionWidthStd || "N/A"}
                </td>
                <td colSpan="12">
                  {printResponseData?.dimensionHeightStd || "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  ACTUAL
                </td>

                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  WHITENESS INDICES (Berger)
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  &gt;80
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.whitenessIndicesResult || "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.whitenessIndicesRemark || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T1
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT1Length || "N/A"}
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT1Width || "N/A"}
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT1Height || "N/A"}
                </td>
                <td colSpan="17">
                  {printResponseData?.dimensionT1Status || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  Ash Content %
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  &lt;0.4
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.ashContentResult || "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.ashContentRemark || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T2
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT2Length || "N/A"}
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT2Width || "N/A"}
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT2Height || "N/A"}
                </td>
                <td colSpan="17">
                  {printResponseData?.dimensionT2Status || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  Water Soluble Substances %
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  &lt;0.5
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.waterSolubleResult || "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.waterSolubleRemark || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T3
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT3Length || "N/A"}
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT3Width || "N/A"}
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT3Height || "N/A"}
                </td>
                <td colSpan="17">
                  {printResponseData?.dimensionT3Status || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  Ether Soluble Substances %
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  &lt;0.5
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.etherSoluableResult || "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.etherSouluableRemark || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T4
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT4Length || "N/A"}
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT4Width || "N/A"}
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT4Height || "N/A"}
                </td>
                <td colSpan="17">
                  {printResponseData?.dimensionT4Status || "N/A"}
                </td>
                {/* <td colSpan="17" rowSpan="3" style={{ textAlign: "center" }}>
                  Micronaire Value
                </td>
                <td colSpan="17" rowSpan="3" style={{ textAlign: "center" }}>
                  -
                </td>
                <td colSpan="18" rowSpan="3" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.micronaireValueResult || "N/A"}
                </td>
                <td colSpan="18" rowSpan="3" style={{ textAlign: "center" }}>
                  {printResponseData?.physicalAndChemicalTests?.[0]
                    ?.micronaireValueRemark || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T5
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT5Length || "N/A"}
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT5Width || "N/A"}
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionT5Height || "N/A"}
                </td>
                <td colSpan="17">
                  {printResponseData?.dimensionT5Status || "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  Avg.
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionAvgLength || "N/A"}
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionAvgWidth || "N/A"}
                </td>
                <td colSpan="16">
                  {printResponseData?.dimensionAvgHeight || "N/A"}
                </td>
                <td colSpan="17">
                  {printResponseData?.dimensionAvgStatus || "N/A"}
                </td>
              </tr>
              {/* weight */}
              <tr>
                <td colSpan="30" rowSpan="9" style={{ textAlign: "center" }}>
                  WEIGHT(g)
                </td>
                <td colSpan="20" rowSpan="2" style={{ textAlign: "center" }}>
                  TRIALS
                </td>
                <td colSpan="65">
                  STD : {printResponseData?.weightStd || "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  ACTUAL
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  STATUS
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  DESCRIPTIONS
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  Sub Parameters or Specification
                </td>
                <td colSpan="18" rowSpan="4" style={{ textAlign: "center" }}>
                  TEST RESULTS
                </td>
                <td colSpan="18" rowSpan="4" style={{ textAlign: "center" }}>
                  STATUS
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T1
                </td>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  {printResponseData?.weightT1Actual || "N/A"}
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.weightT1Status || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  Sample tested on
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {formatDate(
                    printResponseData?.microbiologicalTests?.[0]?.sampleTestedOn
                  ) || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T2
                </td>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  {printResponseData?.weightT2Actual || "N/A"}
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.weightT2Status || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  Test completed on
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {formatDate(
                    printResponseData?.microbiologicalTests?.[0]
                      ?.testCompletedOn
                  ) || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T3
                </td>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  {printResponseData?.weightT3Actual || "N/A"}
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.weightT3Status || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  Sample Description
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]
                    ?.sampleDescription || "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T4
                </td>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  {printResponseData?.weightT4Actual || "N/A"}
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.weightT4Status || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  TVC (cfu/gm)
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  &lt;1000
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]?.tvcResult ||
                    "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]?.tvcStatus ||
                    "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T5
                </td>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  {printResponseData?.weightT5Actual || "N/A"}
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.weightT5Status || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  TFC (cfu/gm)
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  &lt;100
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]?.tfcResult ||
                    "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]?.tfcStatus ||
                    "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  Avg.
                </td>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  {printResponseData?.weightAvgActual || "N/A"}
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.weightAvgStatus || "N/A"}
                </td>
                {/* <td colSpan="17" rowSpan="9" style={{ textAlign: "center" }}>
                  Pathogens
                </td>
                <td colSpan="17" rowSpan="2" style={{ textAlign: "center" }}>
                  Coliforms (Absent)
                </td>
                <td colSpan="18" rowSpan="2" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]
                    ?.coloformsResult || "N/A"}
                </td>
                <td colSpan="18" rowSpan="2" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]
                    ?.coloformsStatus || "N/A"}
                </td> */}
              </tr>
            </tbody>
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
            <br />
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <th colSpan="25">Particulars</th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Approved by
                </th>
              </tr>
              <tr>
                <th colSpan="25">Name</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
              </tr>
              <tr>
                <th colSpan="25">Signature & Date</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div>
          <table
            style={{ marginTop: "10px", scale: "94%", tableLayout: "fixed" }}
          >
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <td colSpan="15" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="70" rowSpan="4" style={{ textAlign: "center" }}>
                  SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING
                  REPORT DATA
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">PH-QCL01/F-025</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="15">02</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="15">PH-QCL01-D-05</td>
              <tr>
                <td colSpan="15">Page No.:</td>
                <td colSpan="15"> 2 of 4</td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <td colSpan="30" rowSpan="8" style={{ textAlign: "center" }}>
                  THICKNESS(mm)
                </td>
                <td colSpan="20" rowSpan="2" style={{ textAlign: "center" }}>
                  TRIALS
                </td>
                <td colSpan="65">
                  STD : {printResponseData?.thicknessStd || "N/A"}{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  ACTUAL
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  STATUS
                </td>
                {/* <td colSpan="17" rowSpan="2" style={{ textAlign: "center" }}>
                  E-coli (Absent)
                </td>
                <td colSpan="18" rowSpan="2" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]?.ecoliResult ||
                    "N/A"}
                </td>
                <td colSpan="18" rowSpan="2" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]?.ecoliStatus ||
                    "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T1
                </td>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  {printResponseData?.thicknessT1Actual || "N/A"}
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.thicknessT1Status || "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T2
                </td>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  {printResponseData?.thicknessT2Actual || "N/A"}
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.thicknessT2Status || "N/A"}
                </td>
                {/* <td colSpan="17" rowSpan="2" style={{ textAlign: "center" }}>
                  S.aur (Absent)
                </td>
                <td colSpan="18" rowSpan="2" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]?.saurResult ||
                    "N/A"}
                </td>
                <td colSpan="18" rowSpan="2" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]?.saurStatus ||
                    "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T3
                </td>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  {printResponseData?.thicknessT3Actual || "N/A"}
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.thicknessT3Status || "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T4
                </td>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  {printResponseData?.thicknessT4Actual || "N/A"}
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.thicknessT4Status || "N/A"}
                </td>
                {/* <td colSpan="17" rowSpan="2" style={{ textAlign: "center" }}>
                  P.aur (Absent)
                </td>
                <td colSpan="18" rowSpan="2" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]?.paurResult ||
                    "N/A"}
                </td>
                <td colSpan="18" rowSpan="2" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]?.paurStatus ||
                    "N/A"}
                </td> */}
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  T5
                </td>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  {printResponseData?.thicknessT5Actual || "N/A"}
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.thicknessT5Status || "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan="20" style={{ textAlign: "center" }}>
                  Avg.
                </td>
                <td colSpan="48" style={{ textAlign: "center" }}>
                  {printResponseData?.thicknessAvgActual || "N/A"}
                </td>
                <td colSpan="17" style={{ textAlign: "center" }}>
                  {printResponseData?.thicknessAvgStatus || "N/A"}
                </td>
                {/* <td colSpan="17" style={{ textAlign: "center" }}>
                  Salmonella (Absent)
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]
                    ?.salmonellaResult || "N/A"}
                </td>
                <td colSpan="18" style={{ textAlign: "center" }}>
                  {printResponseData?.microbiologicalTests?.[0]
                    ?.salmonellaStatus || "N/A"}
                </td> */}
              </tr>
              {/* <tr>
                <td
                  colSpan={115}
                  style={{ textAlign: "start", padding: "5px" }}
                >
                  Tested By:
                </td>
              </tr> */}
            </tbody>
            <br />
            <tr>
              <td style={{ textAlign: "center" }} colSpan={115}>
                PHYSICAL AND CHEMCAL TEST
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }} colSpan={60}>
                Sampling Date:{" "}
                {formatDate(
                  printResponseData?.physicalAndChemicalTests[0]?.samplingDate
                ) || "NA"}{" "}
              </td>
              <td style={{ textAlign: "left" }} colSpan={55}>
                Tested Date:{" "}
                {formatDate(
                  printResponseData?.physicalAndChemicalTests[0]?.testedDate
                ) || "NA"}{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={29}>
                Parameter Tested
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                Specification
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                Observation
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                Remark
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                1.Description
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Absorbent Cotton Product
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.descriptionObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.descriptionRemarks || "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                2. Identification Test (Under Microscope)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Each fiber consist of single cell, in the form of flattened tube
                with thick round walls and often twisted.
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.identificationObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.identificationRemarks || "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                3. Fibre Average Length (mm) (manual)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Min.10
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.fibreObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]?.fibreRemarks ||
                  "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                4. Acidity / Alkalinity (pH)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                6 to 8
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.acidityObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.acidityRemarks || "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                5. Surface Activity Substances (S.A)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Any foam present must not cover the entire surface of the
                liquid.
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.surfaceActivityObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.surfaceActivityRemarks || "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                6. Foreign Fibers (Under Microscope)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Occasionally a few isolated foreign fibers may be present.
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.foreignFibersObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.foreignFibersRemarks || "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                7. Fluorescence (Under UV){" "}
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                No intense blue fluorescence. Few isolated fibers passable
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.fluorescenceObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.fluorescenceRemarks || "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                8.Neps
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Max. 5 ( 2.5 mm in diameter)/ gram
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.nepsObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]?.nepsRemarks ||
                  "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                9. Neps count/gram.
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Max. 2500
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.nepsCountGramObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.nepsCountGramRemarks || "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Upper Quartile Length.mm by Wt. UQL (w){" "}
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Min.12
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.upperQuartileObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.upperQuartileRemarks || "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Length by number. mm L(n)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Min. 7
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.lengthByNumberObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.lengthByNumberRemarks || "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Length by weight. mm L (w)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Min.10{" "}
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.lengthByWeightObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.lengthByWeightRemarks || "NA"}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Short fiber Content. by number % SFC(n)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                Max. 90
              </td>
              <td style={{ textAlign: "center" }} colSpan={29}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.shortFiberContentByNumberObservation || "NA"}
              </td>
              <td style={{ textAlign: "center" }} colSpan={28}>
                {printResponseData?.physicalAndChemicalTests[0]
                  ?.shortFiberContentByNumberRemarks || "NA"}
              </td>
            </tr>

            <br />
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <th colSpan="25">Particulars</th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Approved by
                </th>
              </tr>
              <tr>
                <th colSpan="25">Name</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
              </tr>
              <tr>
                <th colSpan="25">Signature & Date</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div>
          <table
            style={{ marginTop: "10px", scale: "94%", tableLayout: "fixed" }}
          >
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <td colSpan="15" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="70" rowSpan="4" style={{ textAlign: "center" }}>
                  SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING
                  REPORT DATA
                </th>
                <td colSpan="15">Format No.:</td>
                <td colSpan="15">PH-QCL01/F-025</td>
              </tr>
              <tr>
                <td colSpan="15">Revision No.:</td>
                <td colSpan="15">02</td>
              </tr>
              <td colSpan="15">Ref. SOP No.:</td>
              <td colSpan="15">PH-QCL01-D-05</td>
              <tr>
                <td colSpan="15">Page No.:</td>
                <td colSpan="15"> 3 of 4</td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                  Short fiber Content. by wt. % SFC(w)
                </td>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                  Max.80
                </td>
                <td style={{ textAlign: "center" }} colSpan={29}>
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.shortFiberContentByWtObservation || "NA"}
                </td>
                <td style={{ textAlign: "center" }} colSpan={28}>
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.shortFiberContentByWtRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                  10. Micronaire Value. µg/inch{" "}
                </td>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                  Min. 2.8
                </td>
                <td style={{ textAlign: "center" }} colSpan={29}>
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.micronaireObservation || "NA"}
                </td>
                <td style={{ textAlign: "center" }} colSpan={28}>
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.micronaireRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                  11. Whiteness Indices (Berger 10deg/D65){" "}
                </td>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                  Min. 80
                </td>
                <td style={{ textAlign: "center" }} colSpan={29}>
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.whitenessIndicesObservation || "NA"}
                </td>
                <td style={{ textAlign: "center" }} colSpan={28}>
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.whitenessIndicesRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                  12. Extractable Colouring Matters{" "}
                </td>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={29}>
                  Alcohol extract may be slightly yellowish but not blue or
                  green.
                </td>
                <td style={{ textAlign: "center" }} colSpan={29}>
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.extractableColouringObservation || "NA"}
                </td>
                <td style={{ textAlign: "center" }} colSpan={28}>
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.extractableColouringRemarks || "NA"}
                </td>
              </tr>

              <tr>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={19}>
                  13. Absorbency
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  Sample
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  Trail 1
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  Trail 2
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  Trail 3
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  Avg.
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  Remarks
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={19}>
                  Sinking time (sec.)
                </td>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={16}>
                  Max. 8.0 For BP,USP, EP Max. 10
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.sinkingTrail1 || "NA"}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.sinkingTrail2 || "NA"}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.sinkingTrail3 || "NA"}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.sinkingTrailAvg || "NA"}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.sinkingTrailRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={19}>
                  Absorbption Capacity/ W.H.C (g/g)
                </td>
                <td style={{ textAlign: "left", padding: "5px" }} colSpan={16}>
                  Min.24.0 For JP Min.20 & BP,EP Min.23{" "}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.absorbptionTrail1 || "NA"}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.absorbptionTrail2 || "NA"}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.absorbptionTrail3 || "NA"}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.absorbptionTrailAvg || "NA"}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={16}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.absorbptionTrailRemarks || "NA"}
                </td>
              </tr>

              <tr>
                <td
                  style={{ textAlign: "left", padding: "5px" }}
                  rowSpan={4}
                  colSpan={23}
                >
                  14. Sulphated Ash (%) RESULT = [(B-A) x100]/ 5 A= Crucible
                  Wt.(g) B= Crucible Wt.with 5 g. sample's Ash Content.(g)
                </td>
                <td
                  style={{ textAlign: "left", padding: "5px" }}
                  rowSpan={4}
                  colSpan={23}
                >
                  Max. 0.20 For JP Max. 0.25 total ash & BP,EP Max. 0.40
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  Final Wt.(g)-B
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.sulphatedAshFinal || "NA"}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  rowSpan={4}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.sulphatedAshRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  Initial Wt.(g)-A
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.sulphatedAshInitial || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  B-A
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.sulphatedAshBa || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  RESULTS(%){" "}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.sulphatedAshResult || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "left", padding: "5px" }}
                  rowSpan={4}
                  colSpan={23}
                >
                  15. Water Soluble Substances % RESULT = [(N-M) x100]/5 M=
                  Beaker Wt.(g) N= Beaker Wt.with 5 g. sample's Water Soluble
                  extract. (g)
                </td>
                <td
                  style={{ textAlign: "left", padding: "5px" }}
                  rowSpan={4}
                  colSpan={23}
                >
                  Max. 0.28 For USP Max. 0.35 & BP, EP Max.0.50
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  Final Wt.(g)-N
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.waterSolubleFinal || "NA"}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  rowSpan={4}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.waterSolubleRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  Initial Wt.(g)-M
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.waterSolubleInitial || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  N-M
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.waterSolubleBa || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  RESULTS(%){" "}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.waterSolubleResult || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "left", padding: "5px" }}
                  rowSpan={4}
                  colSpan={23}
                >
                  16. Ether Soluble Substances % RESULT = [(Y-X) x100]/ 5 X=
                  Flask Wt.(g) Y= Flask Wt.with 5 g. sample's Ether Soluble
                  extract.(g)
                </td>
                <td
                  style={{ textAlign: "left", padding: "5px" }}
                  rowSpan={4}
                  colSpan={23}
                >
                  Max.0.50 For USP Max. 0.70{" "}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  Final Wt.(g)-Y
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.etherSolubleFinal || "NA"}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  rowSpan={4}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.etherSolubleRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  Initial Wt.(g)-X
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.etherSolubleInitial || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  Y-X
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.etherSolubleBa || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  RESULTS(%){" "}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.etherSolubleResult || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "left", padding: "5px" }}
                  rowSpan={4}
                  colSpan={23}
                >
                  17. Loss on drying (%) /Moisture content (%) RESULT =[(K-L)
                  x100]/K, K= Cotton Wt.(g) before dry. L= Cotton Wt.(g) after
                  dry.
                </td>
                <td
                  style={{ textAlign: "left", padding: "5px" }}
                  rowSpan={4}
                  colSpan={23}
                >
                  Max.8.0
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  Initial Wt.(g)-K
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.lossOnDryingInitial || "NA"}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  rowSpan={4}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.lossOnDryingRemarks || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  Final Wt.(g)-L
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.lossOnDryingFinal || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  K-L
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.lossOnDryingBa || "NA"}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  RESULTS(%){" "}
                </td>
                <td
                  style={{ textAlign: "center", padding: "5px" }}
                  colSpan={23}
                >
                  {printResponseData?.physicalAndChemicalTests[0]
                    ?.lossOnDryingResult || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan={115} style={{ padding: "5px" }}>
                  Remark(s):{" "}
                  {printResponseData?.physicalAndChemicalTests[0]?.remarks ||
                    "NA"}{" "}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="60"
                  style={{ textAlign: "center", verticalAlign: "top" }}
                >
                  TESTED BY (Chemist):
                  <div>
                    {eSign.chemist_sign && (
                      <img
                        className="signature"
                        src={eSign.chemist_sign}
                        alt="Chemist Sign"
                        style={{ display: "block", margin: "0 auto" }}
                      />
                    )}
                    <div>{printResponseData?.chemist_submit_by}</div>
                    <div>{formattedChemistDate}</div>
                  </div>
                </td>
                {/* <td
                  colSpan="40"
                  style={{ textAlign: "center", verticalAlign: "top" }}
                >
                  TESTED BY (Micro):
                  <div>
                    {eSign.microbiologist_sign && (
                      <img
                        className="signature"
                        src={eSign.microbiologist_sign}
                        alt="Microbiologist Sign"
                        style={{ display: "block", margin: "0 auto" }}
                      />
                    )}
                    <div>{printResponseData?.microbiologist_submit_by}</div>
                    <div>{formattedMicroDate}</div>
                  </div>
                </td> */}
                <td
                  colSpan="55"
                  style={{ textAlign: "center", verticalAlign: "top" }}
                >
                  APPROVED BY:
                  <div>
                    {eSign.qc_sign && (
                      <img
                        className="signature"
                        src={eSign.qc_sign}
                        alt="Manager Sign"
                        style={{ display: "block", margin: "0 auto" }}
                      />
                    )}
                    <div>{printResponseData?.qc_submit_by}</div>
                    <div>{formattedQCDate}</div>
                  </div>
                </td>
              </tr>
            </tbody>
            <br />
            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="115"></td>
              </tr>
              <tr>
                <th colSpan="25">Particulars</th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                <th colSpan="30" style={{ textAlign: "center" }}>
                  Approved by
                </th>
              </tr>
              <tr>
                <th colSpan="25">Name</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
              </tr>
              <tr>
                <th colSpan="25">Signature & Date</th>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
                <td colSpan="30"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div>
          <table
            style={{ marginTop: "10px", scale: "94%", tableLayout: "fixed" }}
          >
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="300"></td>
              </tr>
              <tr>
                <td colSpan="50" rowspan="4 " style={{ textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br></br>
                  Unit H
                </td>
                <th colSpan="150" rowSpan="4" style={{ textAlign: "center" }}>
                  SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING
                  REPORT DATA
                </th>
                <td colSpan="50">Format No.:</td>
                <td colSpan="50">PH-QCL01/F-025</td>
              </tr>
              <tr>
                <td colSpan="50">Revision No.:</td>
                <td colSpan="50">02</td>
              </tr>
              <td colSpan="50">Ref. SOP No.:</td>
              <td colSpan="50">PH-QCL01-D-05</td>
              <tr>
                <td colSpan="50">Page No.:</td>
                <td colSpan="50"> 4 of 4</td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }} colSpan={300}>
                  MICROBIOLOGICAL TEST (Export Batches Only)
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  rowSpan={3}
                  colSpan={25}
                >
                  Sampled on
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  rowSpan={3}
                  colSpan={25}
                >
                  Tested /Incubation Start on
                </td>
                <td style={{ textAlign: "center" }} colSpan={200}>
                  Test Parameters & Specification{" "}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  rowSpan={3}
                  colSpan={25}
                >
                  Moisture (%)
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  rowSpan={3}
                  colSpan={25}
                >
                  Test Completion Date{" "}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  rowSpan={2}
                  colSpan={25}
                >
                  Total Viable Count (TVC - cfu/g) (Limit ≤1000)
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  rowSpan={2}
                  colSpan={25}
                >
                  Total Fungal Count (TFC - cfu/g)(Limit ≤ 100)
                </td>
                <td style={{ textAlign: "center" }} colSpan={150}>
                  Pathogens{" "}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={30}
                >
                  Gram negative bacteria or Coliform (Should be Absent)
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={30}
                >
                  Escherechia coli (E.coli)(Should be Absent)
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={30}
                >
                  Staphylococcos aures (S.aur )(Should be Absent)
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={30}
                >
                  Pseudomonas aerogenosa (P.aer)(Should be Absent)
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={30}
                >
                  Salmonella (Sal.)(Should be Absent)
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={25}
                >
                  {formatDate(
                    printResponseData?.microbiologicalTests[0]?.sampledOn
                  ) || "NA"}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={25}
                >
                  {formatDate(
                    printResponseData?.microbiologicalTests[0]
                      ?.testIncubationStartOn
                  ) || "NA"}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={25}
                >
                  {printResponseData?.microbiologicalTests[0]
                    ?.totalViableCount || "NA"}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={25}
                >
                  {printResponseData?.microbiologicalTests[0]
                    ?.totalFungalCount || "NA"}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={30}
                >
                  {printResponseData?.microbiologicalTests[0]
                    ?.gramNegativeBacteriaOrColiform || "NA"}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={30}
                >
                  {printResponseData?.microbiologicalTests[0]
                    ?.escherichiaColi || "NA"}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={30}
                >
                  {printResponseData?.microbiologicalTests[0]
                    ?.staphylococcusAureus || "NA"}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={30}
                >
                  {printResponseData?.microbiologicalTests[0]
                    ?.pseudomonasAeruginosa || "NA"}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={30}
                >
                  {printResponseData?.microbiologicalTests[0]?.salmonella ||
                    "NA"}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={25}
                >
                  {printResponseData?.microbiologicalTests[0]
                    ?.moisturePercentage || "NA"}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    height: "100px",
                    padding: "10px",
                  }}
                  colSpan={25}
                >
                  {formatDate(
                    printResponseData?.microbiologicalTests[0]
                      ?.testCompletionDate
                  ) || "NA"}
                </td>
              </tr>
              <tr>
                <td colSpan={150}>
                  {" "}
                  Note : cfu/g- Colony forming unit per gram.
                </td>
                <td colSpan={150}>
                  {" "}
                  Remark:{" "}
                  {printResponseData?.microbiologicalTests[0]?.remark ||
                    "NA"}{" "}
                </td>
              </tr>
              {/* <tr>
                <td colSpan={5}>
                  Product:{" "}
                  {printResponseData?.microbiologicalTests[0]?.product
                    || "NA"}{" "}
                </td>
              </tr> */}
              <tr>
                <td style={{ textAlign: "center" }} colSpan={150}>
                  Tested by (Microbiologist):
                  <div>
                    {eSign.microbiologist_sign ? (
                      <img
                        src={eSign.microbiologist_sign}
                        alt="Operator eSign"
                        style={{
                          width: "100px",
                          height: "80px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                    <div>{printResponseData?.microbiologist_submit_by}</div>
                    <div>{formattedMicroDate}</div>
                  </div>
                </td>
                <td style={{ textAlign: "center" }} colSpan={150}>
                  Approved by:
                  <div>
                    {eSign.qc_sign && (
                      <img
                        className="signature"
                        src={eSign.qc_sign}
                        alt="Manager Sign"
                        style={{ display: "block", margin: "0 auto" }}
                      />
                    )}
                    <div>{printResponseData?.qc_submit_by}</div>
                    <div>{formattedQCDate}</div>
                  </div>
                </td>
              </tr>
              {/* <tr>
                <td
                  colSpan={6}
                  style={{
                    display: "table-cell",
                    verticalAlign: "bottom",
                    height: "50px",
                    fontWeight: "normal",
                    textAlign: "center",
                    borderTop: "none",
                  }}
                >
                  {eSign.microbiologist_sign ? (
                    <img
                      src={eSign.microbiologist_sign}
                      alt="Operator eSign"
                      style={{
                        width: "100px",
                        height: "80px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                      }}
                    />
                  ) : null}
                  <br></br>
                  {printResponseData?.microbiologist_sign}
                  <br></br>
                  {formatDateAndTime(
                    printResponseData?.microbiologist_submit_on
                  )}
                </td>
                <td
                  colSpan={5}
                  style={{
                    display: "table-cell",
                    verticalAlign: "bottom",
                    height: "50px",
                    fontWeight: "normal",
                    textAlign: "center",
                    borderTop: "none",
                  }}
                >
                  {eSign.qc_sign ? (
                    <img
                      src={eSign.qc_sign}
                      alt="qc eSign"
                      style={{
                        width: "100px",
                        height: "80px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                      }}
                    />
                  ) : null}
                  <br></br>
                  {printResponseData?.qc_sign}
                  <br></br>
                  {formatDateAndTime(printResponseData?.qc_submit_on)}
                </td>
              </tr> */}
            </tbody>
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
            <br /> <br />
            <br /> <br /> <br /> <br />
            <br /> <br />
            <tfoot style={{ marginTop: "100px" }}>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="300"></td>
              </tr>
              <tr>
                <th colSpan="75">Particulars</th>
                <th colSpan="75" style={{ textAlign: "center" }}>
                  Prepared by
                </th>
                <th colSpan="75" style={{ textAlign: "center" }}>
                  Reviewed by
                </th>
                <th colSpan="75" style={{ textAlign: "center" }}>
                  Approved by
                </th>
              </tr>
              <tr>
                <th colSpan="75">Name</th>
                <td colSpan="75"></td>
                <td colSpan="75"></td>
                <td colSpan="75"></td>
              </tr>
              <tr>
                <th colSpan="75">Signature & Date</th>
                <td colSpan="75"></td>
                <td colSpan="75"></td>
                <td colSpan="75"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* HEADER */}

      <div style={{ marginBottom: "40px", marginTop: "20px" }}>
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <BleachingHeader
          unit="Unit-H"
          formName="SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA"
          formatNo="PH-QCL01/F-025"
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
              icon={<IoPrint color="#00308F" />}
              onClick={handlePrint}
              shape="round"
            >
              Print
            </Button>,

            <Button
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
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

        {/* Go To Row */}

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            marginTop: "10px",
            marginBottom: "10px",
            justifyContent: "start",
          }}
        >
          <Input
            placeholder="Enter Lot.No."
            style={{ marginLeft: "40px", height: "28px", width: "135px" }}
            onChange={(e) => setLotno(e.target.value)} // Set the typed lot number
            onKeyDown={(e) => handleSelectText(e, "lotNo")}
          />

          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="small"
            format="DD/MM/YYYY"
            value={date}
            onChange={handleDateChange}
            style={{ fontWeight: "bold", width: "135px" }}
            max={getCurrentDate()}
          />

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
            Go to
          </Button>
        </div>
      </div>
      {/* Table...Summary */}
      <div>
        <Table
          bordered
          style={{ textAlign: "center" }}
          columns={columns}
          dataSource={summary}
        />
      </div>

      {/* SUMMARY PRINT */}
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ marginRight: "8px", textAlign: "start" }}>
            Select Lot No.:
          </label>
          <Select
            placeholder="Select Lot No."
            style={{ marginLeft: "0px", height: "28px" }}
            value={SelectedLotNo || undefined} // Control the value with state
            onChange={(value) => setSelectedLotNo(value)} // Set the selected lot number
          >
            {lotNumbers.map((lot) => (
              <Select.Option key={lot} value={lot}>
                {lot}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ marginRight: "8px", textAlign: "start" }}>
            Select Year:
          </label>
          <Select
            style={{ width: "135px", height: "28px", color: "black" }}
            value={selectedPrintYear}
            onChange={handlePrintYearChange}
            placeholder="Select Year"
          >
            {years.map((year) => (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default QualityControl_f25_Summary;  