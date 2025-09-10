/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Select, Table, Tooltip, message, Input, Modal } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  BiBorderLeft,
  BiBorderNone,
  BiBorderRight,
  BiLock,
  BiNavigation,
} from "react-icons/bi";
import BleachingTail from "../Components/BleachingTail.js";
import BleachingHeader from "../Components/BleachingHeader.js";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { GrAdd } from "react-icons/gr";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import "../index.css";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { createGlobalStyle } from "styled-components";

const QA_F_041_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    date: "",
    changeControl: "",
  });
  const [printParams, setPrintParams] = useState({
    year: "",
    month: "",
    changeControlNumber: "",
    deptName: "",
  });
  const [printLov, setPrintLov] = useState({
    monthLov: [],
    yearLov: [],
  });
  const [hodLov, setHodLov] = useState([]);
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const initialized = useRef(false);
  const [departmentList, setdepartmentList] = useState();
  const [eSign, setESign] = useState({
    qaManagerSubmitByTab2: "",
    qaManagerSubmitByTab3: "",
    qcSign: "",
    developmentSign: "",
    bleachingSign: "",
    SpunlaceSign: "",
    cottonBudsSign: "",
    padPunchingSign: "",
    qaSign: "",
    engineeringComments: "",
    ppcSign: "",
    wareHouseSign: "",
    othersSign: "",
    qaManagerSubmitByTab5: "",
    qaManagerSubmitByTab6: "",
    qaManagerSubmitByTab7: "",
    hodSubmitByTab8: "",
    qaManagerSubmitByTab8: "",
    hodSubmitByTab9: "",
    hodSubmitByTab10: "",
    hodSubmitByTab11: "",
    qaManagerSubmitByTab12: "",
  });
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const changeControlToLOV = [
    { value: "SOP", label: "SOP" },
    { value: "VENDOR", label: "VENDOR" },
    { value: "NEW DOCUMENT", label: "NEW DOCUMENT" },
    { value: "SPECIFICATION", label: "SPECIFICATION" },
    { value: "FACILITY", label: "FACILITY" },
    { value: "DRAWINGS", label: "DRAWINGS" },
    { value: "METHOD/STP", label: "METHOD/STP" },
    { value: "PROTOCOL", label: "PROTOCOL" },
    {
      value: "BATCH MANUFACTURING RECORD",
      label: "BATCH MANUFACTURING RECORD",
    },
    { value: "EQUIPMENT/UTILITY", label: "EQUIPMENT/UTILITY" },
    { value: "OTHERS IF ANY (SPECIFY)", label: "OTHERS IF ANY (SPECIFY)" },
  ];

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    let years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push({ value: year, label: year.toString() });
    }
    const currentMonth = new Date().getMonth() + 1;
    const allMonths = [
      { value: "01", label: "JAN" },
      { value: "02", label: "FEB" },
      { value: "03", label: "MAR" },
      { value: "04", label: "APR" },
      { value: "05", label: "MAY" },
      { value: "06", label: "JUN" },
      { value: "07", label: "JUL" },
      { value: "08", label: "AUG" },
      { value: "09", label: "SEP" },
      { value: "10", label: "OCT" },
      { value: "11", label: "NOV" },
      { value: "12", label: "DEC" },
    ];

    const filteredMonthBasedOnYear = allMonths.filter(
      (month) => parseInt(month.value) <= currentMonth
    );
    const months =
      printParams.year == currentYear ? filteredMonthBasedOnYear : allMonths;
    setPrintLov((prevState) => ({
      ...prevState,
      yearLov: years,
      monthLov: months,
    }));
  }, [printParams.year]);

  useEffect(() => {
    const fetchUserDataAndImages = () => {
      hodLov.forEach((user) => {
        console.log(user);
        const { value } = user;
        console.log(value);

        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${value}`,
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
            setESign((prevSign) => ({
              ...prevSign,
              [value]: url,
            }));
          })
          .catch((err) => {
            console.log("Error fetching image for", value, err);
          });
      });
    };
    fetchUserDataAndImages();
  }, [token, hodLov]);
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const fetchShifts = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
          { headers }
        );
        const a = response.data.map((x, i) => {
          return {
            value: x.department,
            label: x.department,
          };
        });
        setdepartmentList(a);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);

  useEffect(() => {
    const hodLovApi = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QA/Service/ChangeControlForm/changeControlNumberLov`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const uniqueValues = response.data
          .filter((item) => item.value.trim() !== "")
          .reduce((acc, current) => {
            const isDuplicate = acc.some(
              (item) => item.value === current.value
            );
            if (!isDuplicate) {
              acc.push(current);
            }
            return acc;
          }, []);

        setHodLov(uniqueValues);
      } catch (error) {
        console.error("Error fetching Job Order Options:", error);
      }
    };

    hodLovApi();
  }, [token]);

  // useEffect(() => {
  //   const hodLovApi = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API.prodUrl}/Precot/api/QA/Service/ChangeControlForm/changeControlNumberLov`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log("Log", response.data);
  //       setHodLov(response.data);
  //     } catch (error) {
  //       console.error("Error fetching Job Order Options:", error);
  //     }
  //   };

  //   hodLovApi();
  // }, [token]);

  const fetchSignature = async (sign, key) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/image?username=${sign}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          responseType: "arraybuffer",
        }
      );
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const url = `data:image/jpeg;base64,${base64}`;
      setESign((prevSign) => ({
        ...prevSign,
        [key]: url,
      }));
    } catch (err) {
      console.log("Error fetching image:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = [
      "qa_inspector_sign",
      "qa_mr_sign",
      "qaManagerSubmitByTab2",
      "qaManagerSubmitByTab3",
      "qcSign",
      "wareHouseSign",
      "developmentSign",
      "bleachingSign",
      "SpunlaceSign",
      "cottonBudsSign",
      "padPunchingSign",
      "qaSign",
      "engineeringComments",
      "ppcSign",
      "othersSign",
      "qaManagerSubmitByTab5",
      "qaManagerSubmitByTab6",
      "qaManagerSubmitByTab7",
      "hodSubmitByTab8",
      "qaManagerSubmitByTab8",
      "hodSubmitByTab9",
      "hodSubmitByTab10",
      "hodSubmitByTab11",
      "qaManagerSubmitByTab12",
    ];
    signatureKeys.forEach((key) => {
      const username = printData[key];
      if (username) {
        console.log("usernameparams", username);

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
  }, [token, printData]);
  // --------------------------- Summary Get Api ------------------------------
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const role = localStorage.getItem("role");
          let apiUrl;
          if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
            apiUrl = `${API.prodUrl}/Precot/api/QA/Service/ChangeControlForm/HodSummary`;
          } else if (role === "QA_MANAGER" || role === "ROLE_DESIGNEE") {
            apiUrl = `${API.prodUrl}/Precot/api/QA/Service/ChangeControlForm/QaSummary`;
          }

          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setSummaryData(response.data);
          console.log("resdata", response.data);
        } catch (error) {
          message.error(error.response?.data?.message || "Error fetching data");
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (data.qa_mr_status == "QA_MR_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "Change Control to",
      dataIndex: "changeControlTo",
      key: "changeControlTo",
      align: "center",
    },
    {
      title: "QA Manager/Designee",
      dataIndex: "statusTab12",
      key: "statusTab12",
      align: "center",
    },
    {
      title: "Hod Status",
      dataIndex: "statusTab11",
      key: "statusTab11",
      align: "center",
    },
    {
      title: "Actions",
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

  let columns;
  if (reason) {
    columns = [...baseColumns.slice(0, 4), Reason, ...baseColumns.slice(4)];
  } else {
    columns = baseColumns;
  }
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
  const handleEdit = (record) => {
    navigate(`/Precot/QualityAssurance/QA_F_041`, {
      state: {
        date: record.date,
        changeControl: record.changeControlTo,
      },
    });
  };

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

  const handlePrint = async () => {
    if (printParams.year == "" || printParams.year == null) {
      message.warning("Please Select The Year");
      return;
    }
    if (printParams.month == "" || printParams.month == null) {
      message.warning("Please Select The month");
      return;
    }
    if (
      printParams.changeControlNumber == "" ||
      printParams.changeControlNumber == null
    ) {
      message.warning("Please Select The Change Control Number");
      return;
    }
    if (printParams.deptName == "" || printParams.deptName == null) {
      message.warning("Please Select The Department name");
      return;
    }

    const monthName = monthNames[parseInt(printParams.month) - 1];

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/ChangeControlForm/print?month=${monthName}&year=${printParams.year}&department=${printParams.deptName}&changeControlNumber=${printParams.changeControlNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message == "No data") {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }

      const uniqueSigns = new Set();

      // const fetchSignatures = async () => {
      //   for (const entry of response.data) {
      //     const {
      //       hodSubmitByTab8,
      //       qaManagerSubmitByTab2,
      //       qaManagerSubmitByTab3,
      //       qcSign,
      //       developmentSign,
      //       bleachingSign,
      //       SpunlaceSign,
      //     } = entry;

      //     if (
      //       qaManagerSubmitByTab2 &&
      //       !uniqueSigns.has(qaManagerSubmitByTab2)
      //     ) {
      //       uniqueSigns.add(qaManagerSubmitByTab2);
      //       fetchSignature(qaManagerSubmitByTab2, qaManagerSubmitByTab2);
      //     }
      //     if (
      //       qaManagerSubmitByTab3 &&
      //       !uniqueSigns.has(qaManagerSubmitByTab3)
      //     ) {
      //       uniqueSigns.add(qaManagerSubmitByTab3);
      //       fetchSignature(qaManagerSubmitByTab3, qaManagerSubmitByTab3);
      //     }
      //     if (qcSign && !uniqueSigns.has(qcSign)) {
      //       uniqueSigns.add(qcSign);
      //       fetchSignature(qcSign, qcSign);
      //     }
      //     if (developmentSign && !uniqueSigns.has(developmentSign)) {
      //       uniqueSigns.add(developmentSign);
      //       fetchSignature(developmentSign, developmentSign);
      //     }
      //     if (
      //       bleachingSign &&
      //       !uniqueSigns.has(bleachingSign)
      //     ) {
      //       uniqueSigns.add(bleachingSign);
      //       fetchSignature(bleachingSign, bleachingSign);
      //     }
      //     if (
      //       qaManagerSubmitByTab2 &&
      //       !uniqueSigns.has(qaManagerSubmitByTab2)
      //     ) {
      //       uniqueSigns.add(qaManagerSubmitByTab2);
      //       fetchSignature(qaManagerSubmitByTab2, qaManagerSubmitByTab2);
      //     }
      //     if (
      //       qaManagerSubmitByTab2 &&
      //       !uniqueSigns.has(qaManagerSubmitByTab2)
      //     ) {
      //       uniqueSigns.add(qaManagerSubmitByTab2);
      //       fetchSignature(qaManagerSubmitByTab2, qaManagerSubmitByTab2);
      //     }
      //     if (
      //       qaManagerSubmitByTab2 &&
      //       !uniqueSigns.has(qaManagerSubmitByTab2)
      //     ) {
      //       uniqueSigns.add(qaManagerSubmitByTab2);
      //       fetchSignature(qaManagerSubmitByTab2, qaManagerSubmitByTab2);
      //     }
      //     if (
      //       qaManagerSubmitByTab2 &&
      //       !uniqueSigns.has(qaManagerSubmitByTab2)
      //     ) {
      //       uniqueSigns.add(qaManagerSubmitByTab2);
      //       fetchSignature(qaManagerSubmitByTab2, qaManagerSubmitByTab2);
      //     }
      //     if (
      //       qaManagerSubmitByTab2 &&
      //       !uniqueSigns.has(qaManagerSubmitByTab2)
      //     ) {
      //       uniqueSigns.add(qaManagerSubmitByTab2);
      //       fetchSignature(qaManagerSubmitByTab2, qaManagerSubmitByTab2);
      //     }
      //     if (
      //       qaManagerSubmitByTab2 &&
      //       !uniqueSigns.has(qaManagerSubmitByTab2)
      //     ) {
      //       uniqueSigns.add(qaManagerSubmitByTab2);
      //       fetchSignature(qaManagerSubmitByTab2, qaManagerSubmitByTab2);
      //     }
      //     if (hodSubmitByTab8 && !uniqueSigns.has(hodSubmitByTab8)) {
      //       uniqueSigns.add(hodSubmitByTab8);
      //       fetchSignature(hodSubmitByTab8, hodSubmitByTab8);
      //     }
      //   }
      // };

      const fetchSignatures = async () => {
        try {
          const uniqueSigns = new Set();

          for (const entry of response.data) {
            Object.keys(eSign).forEach((signKey) => {
              const signValue = entry[signKey];

              if (signValue && !uniqueSigns.has(signValue)) {
                uniqueSigns.add(signValue);
                fetchSignature(signValue, signValue);
              }
            });
          }

          setPrintData(response.data);
        } catch (error) {
          console.log("Error in fetchSignatures:", error);
          setPrintButtonLoading(false);
          message.error(error.response?.data?.message || "An error occurred");
        }
      };

      await fetchSignatures();

      setPrintData(response.data);
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (printData.length > 0) {
      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
      }, [4000]);
    }
  }, [printData]);

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      year: "",
      month: "",
      changeControlNumber: "",
      deptName: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  const handleGo = () => {
    if (formParams.date == "") {
      message.warning("Please Select The Date");
      return;
    }
    if (formParams.changeControl == "") {
      message.warning("Please Select The Change Control No");
      return;
    }
    navigate(`/Precot/QualityAssurance/QA_F_041`, {
      state: {
        date: formParams.date,
        changeControl: formParams.changeControl,
      },
    });
  };

  const handleParams = (value, key, state) => {
    if (state == "form") {
      setFormParams((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    }
  };
  const handlePrintParams = (value, name) => {
    setPrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name == "year") {
      setPrintParams((prevState) => ({
        ...prevState,
        month: "",
      }));
    }
  };
  const GlobalStyle = createGlobalStyle`
    @media print {
      @page {
        size: Portrait;
      }
      body {
        -webkit-print-color-adjust: exact;
        width: 100%;
        height: 100%;
        transform: scale(0.9); /* Adjust scale as needed */
        transform-origin: top left right bottom; /* Adjust the origin if needed */
      }
    }
                      .page-break {
                page-break-after: always;
            }
  `;
  return (
    <>
      <div id="section-to-print">
        <GlobalStyle />
        {printData.map((data, pageIndex) => (
          <div className="page-break">
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "fixed",
              }}
            >
              <thead>
                <tr>
                  <td style={{ border: "none", padding: "20px" }}></td>
                </tr>
                <tr>
                  <td rowSpan={4} colSpan={1}>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={logo}
                        alt="Logo"
                        style={{
                          width: "80px",
                          height: "auto",
                          textAlign: "center",
                        }}
                      />
                      <br></br>
                      <br></br>

                      <p style={{ fontFamily: "Times New Roman" }}> Unit H</p>
                    </div>
                  </td>

                  <td
                    style={{
                      padding: "0.5em",
                      textAlign: "center",
                      fontWeight: "bold",
                      width: "60%",
                    }}
                    colSpan={4}
                    rowSpan={4}
                  >
                    CHANGE CONTROL FORM
                  </td>
                  <td style={{ padding: "0.5em" }}>Format No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QAD01/F-041</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Revision No.:</td>
                  <td style={{ padding: "0.5em" }}>01</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QAD01-D-37</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Page No.:</td>
                  <td style={{ padding: "0.5em" }}></td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
              </thead>
              <tbody style={{ width: "100%" }}>
                <tr>
                  <td style={{ width: "10%" }} colSpan={7}>
                    1. INITIATION OF PROPOSAL FOR CHANGE (TO BE FILLED BY
                    INITIATING DEPARTMENT)
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>Initiating Department </td>
                  <td colSpan={4}>{data.department}</td>
                </tr>
                <tr>
                  <td colSpan={3}>Date of initiation </td>
                  <td colSpan={4}>{formatDate(data.date)}</td>
                </tr>
                <tr>
                  <td colSpan={3}>Type of change control </td>
                  <td colSpan={4}>{data.typeOfChangeControl}</td>
                </tr>
                <tr>
                  <td style={{ width: "10%" }} colSpan={7}>
                    Change Related to:
                  </td>
                </tr>
                <tr>
                  <td>SOP</td>
                  <td style={{ textAlign: "center" }}>
                    {data.changeControlTo === "SOP" ? "✓" : "NA"}
                  </td>
                  <td>VENDOR</td>
                  <td style={{ textAlign: "center" }}>
                    {data.changeControlTo === "VENDOR" ? "✓" : "NA"}
                  </td>
                  <td colSpan={2}>NEW DOCUMENT</td>
                  <td style={{ textAlign: "center" }}>
                    {data.changeControlTo === "NEW DOCUMENT" ? "✓" : "NA"}
                  </td>
                </tr>
                <tr>
                  <td>SPECIFICATION</td>
                  <td style={{ textAlign: "center" }}>
                    {data.changeControlTo === "SPECIFICATION" ? "✓" : "NA"}
                  </td>
                  <td>FACILITY</td>
                  <td style={{ textAlign: "center" }}>
                    {data.changeControlTo === "FACILITY" ? "✓" : "NA"}
                  </td>
                  <td colSpan={2}>DRAWINGS</td>
                  <td style={{ textAlign: "center" }}>
                    {data.changeControlTo === "DRAWINGS" ? "✓" : "NA"}
                  </td>
                </tr>
                <tr>
                  <td>METHOD/STP</td>
                  <td style={{ textAlign: "center" }}>
                    {data.changeControlTo === "METHOD/STP" ? "✓" : "NA"}
                  </td>
                  <td>PROTOCOL</td>
                  <td style={{ textAlign: "center" }}>
                    {data.changeControlTo === "PROTOCOL" ? "✓" : "NA"}
                  </td>
                  <td rowSpan={2} colSpan={2}>
                    BATCH MANUFACTURING RECORD
                  </td>
                  <td rowSpan={2} style={{ textAlign: "center" }}>
                    {data.changeControlTo === "BATCH MANUFACTURING RECORD"
                      ? "✓"
                      : "NA"}
                  </td>
                </tr>
                <tr>
                  <td>OTHERS IF ANY (SPECIFY):</td>
                  <td style={{ textAlign: "center" }}>
                    {data.changeControlTo === "OTHERS IF ANY (SPECIFY)"
                      ? "✓"
                      : "NA"}
                  </td>
                  <td>EQUIPMENT / UTILITY</td>
                  <td style={{ textAlign: "center" }}>
                    {data.changeControlTo === "EQUIPMENT/UTILITY" ? "✓" : "NA"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Existing procedure/Standard procedure: <br />
                    {data.existingProcedure}
                  </td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Proposed Change: <br />
                    {data.proposedChange}
                  </td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Reason/ Justification for change: <br />
                    {data.reasonForChange}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    Attachments (if any) <br />
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={4}>
                    {data.attachments}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td colSpan={7}>2.CHANGE CONTROL NUMBER ALLOTMENT BY QA:</td>
                </tr>
                <tr>
                  <td colSpan={3}> Change control Number</td>
                  <td style={{ textAlign: "center" }} colSpan={4}>
                    {data.changeControlNumber}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    Change control number assigned/allotted by QA (Sign & Date)
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={4}>
                    {data.qaManagerSubmitByTab2} <br />
                    {formatDateAndTime(data.qaManagerSubmitOnTab2)} <br />
                    {eSign[data.qaManagerSubmitByTab2] ? (
                      <img
                        src={eSign[data.qaManagerSubmitByTab2]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>Target date for change control closer</td>
                  <td style={{ textAlign: "center" }} colSpan={4}>
                    {formatDate(data.targetDate)}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td colSpan={7}>3.QA ASSESSMENT FOR THE PROPOSED CHANGE:</td>
                </tr>
                <tr>
                  <td colSpan={3}>Categorization of change</td>
                  <td style={{ textAlign: "center" }} colSpan={4}>
                    {data.categoryOfChange}
                  </td>
                </tr>
                <tr>
                  <td rowSpan={4} colSpan={3}>
                    Risk assessment (risk if the change is implemented)
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={4}>
                    {data.riskAssessment}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Product</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {data.product}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Facility</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {data.facility}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Equipment</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {data.equipment}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>Training requirements</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {data.trainingRequirements}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {data.trainingRequirementsText}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>Approval by contract giver</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {data.approvalByContractGiver}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    {data.approvalByContractGiverText}
                  </td>
                </tr>
                <tr>
                  <td colSpan={7}>Comments: {data.commentsTab3}</td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Assessment done by (QA) Sign & date: <br />{" "}
                    {data.qaManagerSubmitByTab3} <br />
                    {formatDateAndTime(data.qaManagerSubmitOnTab3)} <br />
                    {eSign[data.qaManagerSubmitByTab3] ? (
                      <img
                        src={eSign[data.qaManagerSubmitByTab3]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    4.CHANGE-CROSS FUNCTIONAL DEPARTMENT REVIEW & APPROVAL:
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Department</td>
                  <td colSpan={3}>Comments</td>
                  <td colSpan={2}>Sign & Date</td>
                </tr>
                <tr>
                  <td colSpan={2}>Quality Control</td>
                  <td colSpan={3}>{data.qcComments}</td>
                  <td colSpan={2}>
                    {" "}
                    {data.qcSign} <br />
                    {/* {formatDateAndTime(data.qaManagerSubmitOnTab2)} <br /> */}
                    {eSign[data.qcSign] ? (
                      <img
                        src={eSign[data.qcSign]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Development</td>
                  <td colSpan={3}>{data.developmentComments}</td>
                  <td colSpan={2}>
                    {" "}
                    {data.developmentSign} <br />
                    {/* {formatDateAndTime(data.qaManagerSubmitOnTab2)} <br /> */}
                    {eSign[data.developmentSign] ? (
                      <img
                        src={eSign[data.developmentSign]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Bleaching</td>
                  <td colSpan={3}>{data.bleachingComments}</td>
                  <td colSpan={2}>
                    {" "}
                    {data.bleachingSign} <br />
                    {/* {formatDateAndTime(data.qaManagerSubmitOnTab2)} <br /> */}
                    {eSign[data.bleachingSign] ? (
                      <img
                        src={eSign[data.bleachingSign]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Spunlace</td>
                  <td colSpan={3}>{data.SpunlaceComments}</td>
                  <td colSpan={2}>
                    {" "}
                    {data.SpunlaceSign} <br />
                    {/* {formatDateAndTime(data.qaManagerSubmitOnTab2)} <br /> */}
                    {eSign[data.SpunlaceSign] ? (
                      <img
                        src={eSign[data.SpunlaceSign]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Cotton Buds</td>
                  <td colSpan={3}>{data.cottonBudsComments}</td>
                  <td colSpan={2}>
                    {" "}
                    {data.cottonBudsSign} <br />
                    {/* {formatDateAndTime(data.qaManagerSubmitOnTab2)} <br /> */}
                    {eSign[data.cottonBudsSign] ? (
                      <img
                        src={eSign[data.cottonBudsSign]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Pad punching</td>
                  <td colSpan={3}>{data.padPunchingComments}</td>
                  <td colSpan={2}>
                    {" "}
                    {data.padPunchingSign} <br />
                    {/* {formatDateAndTime(data.qaManagerSubmitOnTab2)} <br /> */}
                    {eSign[data.padPunchingSign] ? (
                      <img
                        src={eSign[data.padPunchingSign]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Quality Assurance</td>
                  <td colSpan={3}>{data.qaComments}</td>
                  <td colSpan={2}>
                    {" "}
                    {data.qaSign} <br />
                    {/* {formatDateAndTime(data.qaManagerSubmitOnTab2)} <br /> */}
                    {eSign[data.qaSign] ? (
                      <img
                        src={eSign[data.qaSign]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>PPC</td>
                  <td colSpan={3}>{data.ppcComments}</td>
                  <td colSpan={2}>
                    {" "}
                    {data.ppcSign} <br />
                    {/* {formatDateAndTime(data.qaManagerSubmitOnTab2)} <br /> */}
                    {eSign[data.ppcSign] ? (
                      <img
                        src={eSign[data.ppcSign]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Engineering</td>
                  <td colSpan={3}>{data.engineeringComments}</td>
                  <td colSpan={2}>
                    {" "}
                    {data.engineeringSign} <br />
                    {/* {formatDateAndTime(data.qaManagerSubmitOnTab2)} <br /> */}
                    {eSign[data.engineeringSign] ? (
                      <img
                        src={eSign[data.engineeringSign]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Warehouse</td>
                  <td colSpan={3}>{data.wareHouseComments}</td>
                  <td colSpan={2}>
                    {" "}
                    {data.wareHouseSign} <br />
                    {/* {formatDateAndTime(data.qaManagerSubmitOnTab2)} <br /> */}
                    {eSign[data.wareHouseSign] ? (
                      <img
                        src={eSign[data.wareHouseSign]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Others if any:</td>
                  <td colSpan={3}>{data.othersComments}</td>
                  <td colSpan={2}>
                    {" "}
                    {data.othersSign} <br />
                    {/* {formatDateAndTime(data.qaManagerSubmitOnTab2)} <br /> */}
                    {eSign[data.othersSign] ? (
                      <img
                        src={eSign[data.othersSign]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Note: For departments not affected by the changes shall be
                    made not applicable (NA)
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={7}>
                    QUALITY ASSURANCE ASSESSMENT & CREATION OF ACTION ITEM
                  </td>
                </tr>
                <tr>
                  <td colSpan={7}>Action Item: {data.actionItem}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>Action Item No.</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    Action item Description
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    Responsible Department
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    Responsible person
                  </td>
                </tr>
                {data.details?.map((dataArr, pageIndex) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>{pageIndex + 1}</td>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      {dataArr.actionItemDescription}
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      {dataArr.resposibleDepartment}
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={2}>
                      {dataArr.responsiblePerson}
                    </td>
                  </tr>
                ))}

                <tr>
                  <td colSpan={7}>
                    QA Manager/ Designee Sign & date:{" "}
                    {data.qaManagerSubmitByTab5} &{" "}
                    {formatDateAndTime(data.qaManagerSubmitOnTab5)}
                    {eSign[data.qaManagerSubmitByTab5] ? (
                      <img
                        src={eSign[data.qaManagerSubmitByTab5]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}{" "}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    Additional comments/Changes (Prior to approval of change
                    control by QA) <br />
                    {data.additionalComments}
                  </td>
                  <td colSpan={3}>
                    SIGN & DATE <br />
                    {data.qaManagerSubmitByTab5} &{" "}
                    {formatDateAndTime(data.qaManagerSubmitOnTab5)}
                    {eSign[data.qaManagerSubmitByTab5] ? (
                      <img
                        src={eSign[data.qaManagerSubmitByTab5]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}{" "}
                  </td>
                </tr>
                <tr>
                  <td colSpan={7} style={{ border: "none", padding: "10px" }}>
                    {" "}
                    Note: IF the space given is not sufficient, prepare an
                    annexure as same as annexure to change control. The same
                    shall be enclosed along with the change control.
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    6.APPROVAL BY CONTRACT GIVER (IF REQUIRED):
                  </td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Comments: <br />
                    {data.commentsTab6}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Approved by (Name)</td>
                  <td colSpan={2}>{data.qaManagerSubmitByTab6}</td>
                  <td colSpan={1}>Sign & Date:</td>
                  <td colSpan={2}>
                    {data.qaManagerSubmitByTab6} <br />
                    {formatDateAndTime(data.qaManagerSubmitOnTab6)}
                    {eSign[data.qaManagerSubmitByTab6] ? (
                      <img
                        src={eSign[data.qaManagerSubmitByTab6]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td colSpan={7}>7.APPROVAL BY QA- Manager /DESIGNEE:</td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Comments: <br />
                    {data.commentsTab7}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Approved by (Name)</td>
                  <td colSpan={2}>{data.qaManagerSubmitByTab7}</td>
                  <td colSpan={1}>Sign & Date:</td>
                  <td colSpan={2}>
                    {data.qaManagerSubmitByTab7} <br />
                    {formatDateAndTime(data.qaManagerSubmitOnTab7)}
                    {eSign[data.qaManagerSubmitByTab7] ? (
                      <img
                        src={eSign[data.qaManagerSubmitByTab7]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Change control closure date extension request (If Any)
                    (Initiator)
                  </td>
                </tr>
                <tr>
                  {" "}
                  <td colSpan={7}>Date of Request: {data.dateOfRequest}</td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Justification for extension of date: <br />
                    {data.justificationForDateExtension}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    Prepared by (HOD/ Designee of Initiator department): <br />
                    {data.hodSubmitByTab8} <br />
                    {formatDateAndTime(data.hodSubmitOnTab8)} <br />
                    {eSign[data.hodSubmitByTab8] ? (
                      <img
                        src={eSign[data.hodSubmitByTab8]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                  <td colSpan={3}>
                    Approved by (QA Manager/ Designee)
                    <br />
                    {data.qaManagerSubmitByTab8} <br />
                    {formatDateAndTime(data.qaManagerSubmitOnTab8)} <br />
                    {eSign[data.qaManagerSubmitByTab8] ? (
                      <img
                        src={eSign[data.qaManagerSubmitByTab8]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Implementation changes: {data.implementationChanges}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <td colSpan={7}>
                    Initiator / Implementer: <br />
                    {data.hodSubmitByTab9} <br />
                    {formatDateAndTime(data.hodSubmitOnTab9)}
                    {eSign.hodSubmitByTab9 ? (
                      <img
                        src={eSign.hodSubmitByTab9}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Supporting Documents: {data.suppportingDocuments}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <td colSpan={7}>
                    Initiator / Implementer <br />
                    {data.hodSubmitByTab10} <br />
                    {formatDateAndTime(data.hodSubmitOnTab10)}
                    {eSign[data.hodSubmitByTab10] ? (
                      <img
                        src={eSign[data.hodSubmitByTab10]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Implementation verification & Closure of Change Control{" "}
                    <br />
                    {data.implementationVerification}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <td colSpan={7}>
                    Reviewed & Approved by HOD (Initiating Department): <br />
                    {data.hodSubmitByTab11} <br />
                    {formatDateAndTime(data.hodSubmitOnTab11)}
                    {eSign[data.hodSubmitByTab11] ? (
                      <img
                        src={eSign[data.hodSubmitByTab11]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    Closure of Change Control <br />
                    {data.closureOfChangeControl}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <td colSpan={7}>
                    Approved by (HOD Quality Assurance) <br />
                    {data.qaManagerSubmitByTab12} <br />
                    {formatDateAndTime(data.qaManagerSubmitOnTab12)} <br />
                    {eSign[data.qaManagerSubmitByTab12] ? (
                      <img
                        src={eSign[data.qaManagerSubmitByTab12]}
                        alt="Operator eSign"
                        style={{
                          width: "150px",
                          height: "70px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ border: "none", padding: "10px" }}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Particulars</td>
                  <td
                    style={{ padding: "1em", textAlign: "center" }}
                    colSpan={2}
                  >
                    Prepared By
                  </td>
                  <td
                    style={{ padding: "1em", textAlign: "center" }}
                    colSpan={2}
                  >
                    Reviewed By
                  </td>
                  <td
                    style={{ padding: "1em", textAlign: "center" }}
                    colSpan={2}
                  >
                    Approved By
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Name</td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                </tr>
                <tr>
                  <td style={{ padding: "1em" }}>Signature & Date</td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                  <td style={{ padding: "1em" }} colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>
      <BleachingHeader
        formName={"CHANGE CONTROL FORM"}
        formatNo={"PH-QAD01/F-041"}
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
            icon={<FaPrint color="#00308F" />}
            onClick={showPrintModal}
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
        title="CHANGE CONTROL FORM (Print)"
        open={isModalPrint}
        onCancel={handlePrintCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handlePrintCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handlePrint}
            loading={printButtonLoading}
          >
            OK
          </Button>,
        ]}
      >
        <span style={{ marginRight: "10px", marginLeft: "10px" }}>
          {" "}
          Year :{" "}
        </span>
        <Select
          options={printLov.yearLov}
          value={printParams.year}
          style={{ textAlign: "center", width: "200px" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "year");
          }}
        ></Select>

        <br></br>
        <br />
        <span style={{ marginRight: "10px", marginLeft: "2px" }}>
          {" "}
          Month :{" "}
        </span>
        <Select
          options={printLov.monthLov}
          value={printParams.month}
          style={{ textAlign: "center", width: "200px" }}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "month");
          }}
        ></Select>
        <br></br>
        <br />
        <span style={{ marginRight: "2px", marginLeft: "2px" }}>
          {" "}
          Change Control :{" "}
        </span>
        <Select
          value={printParams.changeControlNumber}
          onChange={(e) => {
            handlePrintParams(e, "changeControlNumber");
          }}
          options={hodLov}
          dropdownStyle={{ textAlign: "center" }}
          style={{ textAlign: "center", width: "200px" }}
        ></Select>
        <br></br>
        <br />
        <span style={{ marginRight: "2px", marginLeft: "2px" }}>
          {" "}
          Department Name:{" "}
        </span>
        <Select
          value={printParams.deptName}
          options={departmentList && departmentList}
          onChange={(e) => {
            handlePrintParams(e, "deptName");
          }}
          dropdownStyle={{ textAlign: "center" }}
          style={{ textAlign: "center", width: "200px" }}
        ></Select>
      </Modal>
      <div style={{ margin: "10px" }}>
        Date :
        <Input
          type="date"
          style={{ marginLeft: "5px", width: "150px", textAlign: "center" }}
          max={today}
          onChange={(e) => {
            handleParams(e.target.value, "date", "form");
          }}
        ></Input>
        <label style={{ marginLeft: "1rem" }}>Change Control to: </label>
        <Select
          // value={changeControl}
          options={changeControlToLOV}
          onChange={(e) => {
            handleParams(e, "changeControl", "form");
          }}
          dropdownStyle={{ textAlign: "center" }}
          style={{ width: "270px", textAlign: "center" }}
          //   disabled={status.fieldStatus}
        ></Select>
        <Button
          key="go"
          onClick={handleGo}
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "10px",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          type="primary"
        >
          Go To
        </Button>
      </div>
      <Table columns={columns} dataSource={summaryData}></Table>
    </>
  );
};

export default QA_F_041_Summary;
