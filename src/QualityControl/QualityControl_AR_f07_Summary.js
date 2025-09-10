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
import QualityControl_f07 from "./QualityControl_AR_f07.js";
import { createGlobalStyle } from "styled-components";

const QualityControl_AR_f07_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const [printParams, setPrintParams] = useState({
    date: "",
  });
  const [formParams, setFormParams] = useState({
    date: "",
    testType: "",
  });
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState("");
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const role = localStorage.getItem("role");
  const initialized = useRef(false);
  const [eSign, setESign] = useState({
    chemist_sign: "",
    micro_sign: "",
    manager_sign: "",
    micro_sign: "",
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

  useEffect(() => {
    const signatureKeys = [
      "chemist_sign",
      "qa_exe_sign",
      "manager_sign",
      "micro_sign",
    ];
    signatureKeys.forEach((key) => {
      const username = printData[key];
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [
    token,
    printData.chemist_sign,
    printData.qa_exe_sign,
    printData.manager_sign,
    printData.micro_sign,
  ]);
  // --------------------------- Summary Get Api ------------------------------
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${   API.prodUrl}/Precot/api/QcForm/WaterAnalysisSummary`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSummaryData(response.data);
        } catch (error) {
          message.error(error.response.data.message);
        }
      };

      fetchData();
    }
  }, [token, navigate]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (
          data.qa_exe_status == "QA_EXE_REJECTED" ||
          data.manager_status == "QC_REJECTED" ||
          data.manager_status == "QA_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);

  //---------------------------------------------------------------------------

  // ---------------------------- Summary Table Column -------------------------
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
      title: "PHYSICAL AND CHEMICAL TEST",
      align: "center",
      children: [
        {
          title: "Chemist Status",
          dataIndex: "chemist_status",
          key: "chemist_status",
          align: "center",
        },
        {
          title: "Executive Status",
          dataIndex: "qa_exe_status",
          key: "qa_exe_status",
          align: "center",
        },
      ],
    },
    {
      title: "MICROBIOLOGICAL TEST",
      align: "center",
      children: [
        {
          title: "Microbiologist Status",
          dataIndex: "micro_status", // Ensure this matches your data
          key: "micro_status",
          align: "center",
        },
      ],
    },
    {
      title: "QA/QC Status",
      dataIndex: "manager_status",
      key: "manager_status",
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
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
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
  const handleEdit = (record) => {
    navigate(`/Precot/QualityControl/AR-F-007`, {
      state: {
        date: record.date,
      },
    });
  };
  const handleOK = () => {
    if (formParams.date == "") {
      message.warning("Please Select Date");
      return;
    }
    navigate(`/Precot/QualityControl/AR-F-007`, {
      state: {
        date: formParams.date,
      },
    });
  };

  const handlePrint = async () => {
    if (printParams.date == "") {
      message.warning("Please Select Date");
      return;
    }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${   API.prodUrl}/Precot/api/QcForm/WaterAnalysisPrintApi?date=${printParams.date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No data available to print");
        setPrintButtonLoading(false);
        return;
      }

      setPrintData(response.data[0]);
    } catch (error) {
      console.log(" error blocks");
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (Object.keys(printData).length > 0) {
      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
      }, [4000]);
    }
    // setESign(prevState => ({
    //     ...prevState,
    //     chemist_sign: "",
    //     qa_exe_sign: "",
    //     manager_sign: "",

    // }))
  }, [printData]);

  const handleFormParams = (value, name) => {
    setFormParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePrintParams = (value) => {
    setPrintParams((prevState) => ({
      ...prevState,
      date: value,
    }));
  };
  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      date: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

  const testTypes = [
    { value: "PHYSICAL AND CHEMCAL TEST", label: "PHYSICAL AND CHEMCAL TEST" },
    { value: "MICROBIOLOGICAL TEST", label: "MICROBIOLOGICAL TEST" },
  ];
  // const handleTestType =(e) => {
  //     setFormParams(prevState)
  // }

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
    }
  `;

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
  return (
    <>
      <div id="section-to-print">
        <GlobalStyle />
        <div style={{ scale: "87%" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
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
                rowSpan={4}
              >
                WATER ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-007</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>02</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>01 of 09 </td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ width: "100%" }}>
            <tr>
              <td style={{ textAlign: "center", padding: "0px" }} colSpan={26}>
                PHYSICAL AND CHEMCAL TEST
              </td>
              <td style={{ textAlign: "center", padding: "0px" }} colSpan={10}>
                MICROBIOLOGICAL TEST
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "0px" }} colSpan={12}>
                {" "}
                A.R.No: {printData.ar_no}{" "}
              </td>
              <td style={{ textAlign: "left", padding: "0px" }} colSpan={14}>
                Tested Date : {formatDate(printData.date)}{" "}
              </td>
              <td
                style={{
                  writingMode: "vertical-rl",
                  textAlign: "center",
                  transform: "rotate(180deg)",
                  height: "300px",
                }}
                rowSpan={3}
              >
                Sampled on
              </td>
              <td
                style={{
                  padding: "0px",
                  writingMode: "vertical-rl",
                  textAlign: "center",
                  transform: "rotate(180deg)",
                }}
                rowSpan={3}
              >
                Tested /Incubation Start on
              </td>
              <td style={{ textAlign: "center", padding: "0px" }} colSpan={7}>
                Test Parameters & Specification{" "}
              </td>
              <td
                style={{
                  padding: "0px",
                  writingMode: "vertical-rl",
                  textAlign: "center",
                  transform: "rotate(180deg)",
                }}
                rowSpan={3}
              >
                Test Completion Date{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                rowSpan={2}
              >
                Sr.No
              </td>
              <td
                style={{
                  padding: "0px",
                  writingMode: "vertical-rl",
                  textAlign: "center",
                  transform: "rotate(180deg)",
                }}
                rowSpan={2}
              >
                SAMPLE DESCRIPTION
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                colSpan={2}
              >
                pH
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                colSpan={2}
              >
                Hardness <br />
                (ppm)
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                colSpan={2}
              >
                TDS <br /> (ppm)
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                colSpan={2}
              >
                Turbidity
                <br />
                (NTU)
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                colSpan={2}
              >
                FRC
                <br /> (ppm)
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                colSpan={2}
              >
                TSS
                <br /> (ppm)
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                colSpan={2}
              >
                DO
                <br />
                (ppm)
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                colSpan={2}
              >
                COD
                <br />
                (ppm)
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                colSpan={2}
              >
                BOD
                <br />
                (ppm)
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                colSpan={2}
              >
                MLSS
                <br />
                (ppm)
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                colSpan={2}
              >
                MLVSS
                <br />
                (ppm)
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
                colSpan={2}
              >
                SV 30 <br /> (mg/l)
              </td>
              <td
                style={{
                  padding: "0px",
                  writingMode: "vertical-rl",
                  textAlign: "center",
                  transform: "rotate(180deg)",
                }}
                rowSpan={2}
              >
                Total Viable Count TVC -cfu/g (Limit ≤1000)
              </td>
              <td
                style={{
                  padding: "0px",
                  writingMode: "vertical-rl",
                  textAlign: "center",
                  transform: "rotate(180deg)",
                }}
                rowSpan={2}
              >
                Total Fungal Count (TFC-cfu/g) (Limit ≤ 100)
              </td>
              <td style={{ textAlign: "center" }} colSpan={5}>
                Pathogens
              </td>
            </tr>
            <tr>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Std
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Act
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Std
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Act
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Std
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Act
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Std
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Act
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Std
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Act
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Std
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Act
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Std
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Act
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Std
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Act
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Std
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Act
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Std
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Act
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Std
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Act
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Std
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                Act
              </td>
              <td
                style={{
                  padding: "0px",
                  writingMode: "vertical-rl",
                  textAlign: "center",
                  transform: "rotate(180deg)",
                }}
              >
                Gram negative bacteria <br></br> or Coliform(Should be Absent)
              </td>
              <td
                style={{
                  padding: "0px",
                  writingMode: "vertical-rl",
                  textAlign: "center",
                  transform: "rotate(180deg)",
                }}
              >
                {" "}
                Escherechia coli <br></br>(E.coli)(Should be Absent)
              </td>
              <td
                style={{
                  padding: "0px",
                  writingMode: "vertical-rl",
                  textAlign: "center",
                  transform: "rotate(180deg)",
                }}
              >
                Staphylococcos aures <br></br> (S.aur )(Should be Absent)
              </td>
              <td
                style={{
                  padding: "0px",
                  writingMode: "vertical-rl",
                  textAlign: "center",
                  transform: "rotate(180deg)",
                }}
              >
                Pseudomonas aerogenosa <br></br>(P.aer)(Should be Absent)
              </td>
              <td
                style={{
                  padding: "0px",
                  writingMode: "vertical-rl",
                  textAlign: "center",
                  transform: "rotate(180deg)",
                }}
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
                  padding: "0px",
                }}
              >
                {" "}
                1{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Equalization Tank{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 10
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].equalization_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].equalization_hardness_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 3000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].equalization_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].equalization_turbidity_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].equalization_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].equalization_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].equalization_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 2000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].equalization_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 500
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].equalization_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].equalization_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].equalization_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].equalization_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? formatDate(
                      printData.microDetails[0].equalization_sampled
                    ) || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? formatDate(
                      printData.microDetails[0].equalization_incubation
                    ) || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? formatDate(
                      printData.microDetails[0].equalization_test_completion
                    ) || "NA"
                  : "NA"}
              </td>
            </tr>
          </table>
          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="page-break" style={{ scale: "87%" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
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
                rowSpan={4}
              >
                WATER ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-007</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>02 </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>02 of 09 </td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ width: "100%" }}>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                2{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Primary clarifier I/L{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 8
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_il_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_il_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 3000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_il_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_il_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_il_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_il_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_il_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_il_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_il_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_il_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_il_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_il_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                3{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Primary clarifier O/L{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 8
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_ol_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_ol_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 3000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_ol_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_ol_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_ol_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_ol_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_ol_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_ol_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_ol_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_ol_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_ol_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].primary_ol_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                4{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Aeration Tank 1{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 8
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_1_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_1_hardness_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 3000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_1_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_1_turbidity_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_1_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_1_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                1 to 3
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_1_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_1_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_1_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                ≥ 3500
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_1_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                ≥ 2500
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_1_mlvss_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                ≤ 950
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_1_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                5{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Aeration Tank 6{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 8
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_6_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_6_hardness_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 3000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_6_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_6_turbidity_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_6_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_6_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                1 to 3
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_6_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_6_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_6_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                ≥ 3500
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_6_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                ≥ 2500
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_6_mlvss_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                ≤ 950
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].aeration_tant_6_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
          </table>

          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="page-break" style={{ scale: "87%" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
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
                rowSpan={4}
              >
                WATER ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-007</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>02</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>03 of 09 </td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ width: "100%" }}>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                6{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Secondary Clarifier O/L{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                7 to 9
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].secondary_ol_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 200
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].secondary_ol_hardness_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 2500
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].secondary_ol_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].secondary_ol_turbidity_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 2
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].secondary_ol_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 30
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].secondary_ol_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].secondary_ol_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 250
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].secondary_ol_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 20
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].secondary_ol_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].secondary_ol_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].secondary_ol_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].secondary_ol_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                7{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                UF Feed{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6.5 to 8
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].uf_feed_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 200
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].uf_feed_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 3000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].uf_feed_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 50
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].uf_feed_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 2
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].uf_feed_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 20
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].uf_feed_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].uf_feed_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].uf_feed_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].uf_feed_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].uf_feed_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].uf_feed_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].uf_feed_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                8{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                RO-01 Feed{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 8
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_feed_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 200
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_feed_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 5000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_feed_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_feed_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Nil
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_feed_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 10
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_feed_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_feed_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_feed_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_feed_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_feed_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_feed_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_feed_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                9{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                RO-01 Permeate{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 7
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_permeate_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 10
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_permeate_hardness_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 200
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_permeate_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_permeate_turbidity_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_permeate_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_permeate_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_permeate_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_permeate_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_permeate_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_permeate_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_permeate_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_01_permeate_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
          </table>

          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="page-break" style={{ scale: "87%" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
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
                rowSpan={4}
              >
                WATER ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-007</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>02</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>04 of 09 </td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ width: "100%" }}>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                10{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                RO-02 Feed
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 8
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_feed_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 375
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_feed_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 8750
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_feed_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_feed_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_feed_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_feed_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_feed_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_feed_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_feed_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_feed_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_feed_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_feed_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                11{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                RO-02 Permeate
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 7
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_permeate_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 10
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_permeate_hardness_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 250
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_permeate_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_permeate_turbidity_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_permeate_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_permeate_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_permeate_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_permeate_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_permeate_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_permeate_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_permeate_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_02_permeate_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                12{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                RO-03 Feed
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 8
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_feed_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 750
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_feed_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 17500
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_feed_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_feed_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_feed_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_feed_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_feed_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_feed_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_feed_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_feed_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_feed_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_feed_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                13{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                RO-03 Permeate
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 7
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_permeate_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 10
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_permeate_hardness_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 300
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_permeate_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_permeate_turbidity_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_permeate_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_permeate_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_permeate_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_permeate_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_permeate_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_permeate_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_permeate_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_03_permeate_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
          </table>

          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="page-break" style={{ scale: "87%" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
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
                rowSpan={4}
              ></td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-007</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>02</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>05 of 09 </td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ width: "100%" }}>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                14{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                RO-04 Feed
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 8
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_feed_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 1000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_feed_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 21000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_feed_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_feed_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_feed_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_feed_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_feed_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_feed_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_feed_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_feed_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_feed_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_feed_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                15{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                RO-04 Permeate{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 7
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_permeate_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 10
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_permeate_hardness_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 500
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_permeate_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_permeate_turbidity_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_permeate_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_permeate_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_permeate_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_permeate_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_permeate_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_permeate_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_permeate_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_04_permeate_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                16{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                MEE Feed{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 8
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_feed_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 500
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_feed_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 40000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_feed_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_feed_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_feed_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_feed_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_feed_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_feed_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_feed_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_feed_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_feed_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_feed_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                17{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                MEE Condensate{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6.5 to 7.5
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_condensate_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 10
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_condensate_hardness_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 500
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_condensate_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_condensate_turbidity_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_condensate_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_condensate_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_condensate_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_condensate_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_condensate_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_condensate_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_condensate_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_condensate_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
          </table>

          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="page-break" style={{ scale: "87%" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
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
                rowSpan={4}
              >
                WATER ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-007</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>02</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>06 of 09 </td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ width: "100%" }}>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                18{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                MEE Concentrate{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                8.5 to 9.5
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_concentrate_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                NA
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_concentrate_hardness_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"≤"} 150000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_concentrate_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_concentrate_turbidity_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_concentrate_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_concentrate_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_concentrate_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_concentrate_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_concentrate_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_concentrate_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_concentrate_mlvss_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].mee_concentrate_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                19{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                RO Tank{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 7.5
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_tank_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 10
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_tank_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 250
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_tank_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 2
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_tank_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Nil
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_tank_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Nil
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_tank_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_tank_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_tank_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_tank_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_tank_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_tank_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].ro_tank_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ro_tank_total_vaible || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ro_tank_total_fungal || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ro_tank_gram || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ro_tank_escherechia || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ro_tank_staphylococcos || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ro_tank_pseudomonas || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ro_tank_salmonella || "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                20{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Soft water Tank{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 7.5
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].soft_water_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"}10
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].soft_water_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 250
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].soft_water_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 2
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].soft_water_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Nil
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].soft_water_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Nil
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].soft_water_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].soft_water_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].soft_water_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].soft_water_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].soft_water_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].soft_water_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].soft_water_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].soft_water_total_vaible || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].soft_water_total_fungal || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].soft_water_gram || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].soft_water_escherechia || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].soft_water_staphylococcos || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].soft_water_pseudomonas || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].soft_water_salmonella || "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                21{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                KIADB Feed{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 8
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].kiadb_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 500
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].kiadb_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 1000
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].kiadb_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].kiadb_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].kiadb_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].kiadb_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].kiadb_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].kiadb_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].kiadb_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].kiadb_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].kiadb_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].kiadb_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
          </table>

          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="page-break" style={{ scale: "87%" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
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
                rowSpan={4}
              >
                WATER ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-007</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>02</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>07 of 09</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ width: "100%" }}>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                22{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Softner O/L{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6.5 to 8
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].softner_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 10
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].softner_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                {"<"} 250
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].softner_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 2
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].softner_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].softner_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].softner_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].softner_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].softner_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].softner_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].softner_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].softner_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].softner_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                23{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                STP Treated Water{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6.5 to 7.5
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].stp_treated_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].stp_treated_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].stp_treated_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].stp_treated_turbidity_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].stp_treated_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 20
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].stp_treated_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].stp_treated_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 50
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].stp_treated_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"}10
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].stp_treated_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].stp_treated_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].stp_treated_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].stp_treated_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                24{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Bag Filter O/L{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 7.5
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].bag_filter_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"≤"}20
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].bag_filter_hardness_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                ≤ 200{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].bag_filter_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 2
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].bag_filter_turbidity_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                0.1 - 0.3
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].bag_filter_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 2
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].bag_filter_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].bag_filter_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {"<"} 200
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].bag_filter_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].bag_filter_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].bag_filter_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].bag_filter_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].bag_filter_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].bag_filter_total_vaible || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].bag_filter_total_fungal || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].bag_filter_gram || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].bag_filter_escherechia || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].bag_filter_staphylococcos || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].bag_filter_pseudomonas || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].bag_filter_salmonella || "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                25{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Storage Tank{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                6 to 7.5
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].storage_tank_ph_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].storage_tank_hardness_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                 ≤ 200
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].storage_tank_tds_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].storage_tank_turbidity_act ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].storage_tank_frc_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].storage_tank_tss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].storage_tank_do_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].storage_tank_cod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].storage_tank_bod_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].storage_tank_mlss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].storage_tank_mlvss_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].storage_tank_sv_act || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].storage_tank_total_vaible || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].storage_tank_total_fungal || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].storage_tank_gram || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].storage_tank_escherechia || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].storage_tank_staphylococcos ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].storage_tank_pseudomonas || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].storage_tank_salmonella || "NA"
                  : "NA"}
              </td>
            </tr>
          </table>

          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="page-break" style={{ scale: "87%" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
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
                rowSpan={4}
              >
                WATER ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-007</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>02</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>08 of 09</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ width: "100%" }}>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                26
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                Water for Bleaching{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].water_bleaching_total_vaible ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].water_bleaching_total_fungal ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].water_bleaching_gram || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].water_bleaching_escherechia ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].water_bleaching_staphylococcos ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].water_bleaching_pseudomonas ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].water_bleaching_salmonella || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
                rowSpan={4}
              >
                {" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                27
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                PPD- AHU Inlet water to foggers
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_inlet_total_vaible || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_inlet_total_fungal || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_inlet_gram || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_inlet_escherechia || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_inlet_staphylococcos ||
                    "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_inlet_pseudomonas || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_inlet_salmonella || "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                28
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                PPD-AHU Fog chamber outlet water{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_fog_total_vaible || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_fog_total_fungal || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_fog_gram || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_fog_escherechia || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_fog_staphylococcos || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_fog_pseudomonas || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].ppd_ahu_fog_salmonella || "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                29
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                UV inlet water
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_inlet_total_vaible || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_inlet_total_fungal || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_inlet_gram || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_inlet_escherechia || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_inlet_staphylococcos || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_inlet_pseudomonas || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_inlet_salmonella || "NA"
                  : "NA"}
              </td>
            </tr>
          </table>

          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="page-break" style={{ scale: "87%" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
            <tr>
              <td rowSpan={4}>
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
                rowSpan={4}
              >
                WATER ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-007</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>02</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>09 of 09 </td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ width: "100%" }}>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {" "}
                30
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                UV outlet water{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                -
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                }}
              >
                {" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_outlet_total_vaible || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_outlet_total_fungal || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_outlet_gram || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_outlet_escherechia || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_outlet_staphylococcos || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_outlet_pseudomonas || "NA"
                  : "NA"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "0px",
                }}
              >
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].uv_outlet_salmonella || "NA"
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td colSpan={26}>
                {" "}
                Remark :{" "}
                {printData.chemistDetails?.length > 0
                  ? printData.chemistDetails[0].remarks
                  : "NA"}
              </td>
              <td colSpan={10}>
                {" "}
                Remark :{" "}
                {printData.microDetails?.length > 0
                  ? printData.microDetails[0].remarks
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td colSpan={36}>
                PPM= Parts per million, NTU= Nephelometer Turbidity unit , O/L=
                Outlet , I/L= Inlet RO - Reverse osmosis, UV-Ultra violet PPD -
                Pad Punching Department, AHU - Air Handling Unit, cfu/ml- Colony
                forming unit per milliliter, Ab-Absent, Pr- Present, A.R.
                No.-Analytical Reference Number
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
                colSpan={8}
              >
                Tested By (Chemist):{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
                colSpan={8}
              >
                Verified By :{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
                colSpan={10}
              >
                Approved by :
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
                colSpan={5}
              >
                Tested By (Microbiologist):{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
                colSpan={5}
              >
                Approved by :{" "}
              </td>
            </tr>
            <tr>
              <td
                colSpan={8}
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "50px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                }}
              >
                {eSign.chemist_sign ? (
                  <img
                    src={eSign.chemist_sign}
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
                {printData.chemist_sign}
                <br></br>
                {formatDateAndTime(printData.chemist_submit_on)}
              </td>
              <td
                colspan="8"
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "50px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                }}
              >
                {eSign.qa_exe_sign ? (
                  <img
                    src={eSign.qa_exe_sign}
                    alt="eSign"
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br></br>
                {printData.qa_exe_sign}
                <br></br>
                {formatDateAndTime(printData.qa_exe_submit_on)}
              </td>
              <td
                colSpan={10}
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "50px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                }}
              >
                {eSign.manager_sign ? (
                  <img
                    src={eSign.manager_sign}
                    alt="HOD eSign"
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br></br>
                {printData.manager_sign}
                <br></br>
                {formatDateAndTime(printData.manager_submit_on)}
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
                {eSign.micro_sign ? (
                  <img
                    src={eSign.micro_sign}
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
                {printData.micro_sign}
                <br></br>
                {formatDateAndTime(printData.micro_submit_on)}
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
                {eSign.manager_sign ? (
                  <img
                    src={eSign.manager_sign}
                    alt="HOD eSign"
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
                <br></br>
                {printData.manager_sign}
                <br></br>
                {formatDateAndTime(printData.manager_submit_on)}
              </td>
            </tr>
          </table>

          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "15px" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Particulars</td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Prepared By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Reviewed By
                </td>
                <td style={{ padding: "1em", textAlign: "center" }}>
                  Approved By
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "1em" }}>Name</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
              <tr>
                <td style={{ padding: "1em" }}>Signature & Date</td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
                <td style={{ padding: "1em" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <BleachingHeader
        formName={"WATER ANALYSIS REPORT"}
        formatNo={"PH-QCL01-AR-F-007"}
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
        title="Water Analysis Report (Print)"
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
        <span style={{ marginRight: "30px", marginLeft: "10px" }}>Date : </span>
        <Input
          type="date"
          style={{ width: "150px", textAlign: "center", marginLeft: "30px" }}
          max={today}
          onChange={(e) => {
            handlePrintParams(e.target.value);
          }}
        ></Input>
      </Modal>
      <div style={{ margin: "20px" }}>
        <Input
          type="date"
          addonBefore="Date : "
          style={{ textAlign: "center", width: "150px" }}
          max={today}
          onChange={(e) => {
            handleFormParams(e.target.value, "date");
          }}
        ></Input>
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "70px",
          }}
          shape="round"
          icon={<BiNavigation color={"#00308F"} />}
          onClick={handleOK}
        >
          Go To
        </Button>
      </div>
      <Table columns={columns} dataSource={summaryData}></Table>
    </>
  );
};

export default QualityControl_AR_f07_Summary;
