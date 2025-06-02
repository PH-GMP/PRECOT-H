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
import { createGlobalStyle } from "styled-components";
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
import { GrAdd, GrFormUpload } from "react-icons/gr";
import { FaPrint } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import "../index.css";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { Label } from "recharts";

const QualityControl_f16_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    date: "",
    shift: "",
    chemical: "",
  });
  const [printParams, setPrintParams] = useState({
    date: "",
    shift: "",
    chemical: "",
  });
  const [eSign, setESign] = useState({
    chemist_sign: "",
    qa_exe_sign: "",
    manager_sign: "",
  });
  const [chemicalLov, setChemicalLov] = useState([]);
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const initialized = useRef(false);
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
    const chemicalLovApi = async () => {
      try {
        const response = await axios.get(
          `${    API.prodUrl}/Precot/api/QcForm/PrintApiF016?`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const options = response.data.map((option) => ({
          value: option.to_be_name_of_solution,
          label: option.to_be_name_of_solution,
        }));

        console.log(response.data, "Api Response");
        setChemicalLov(options);
      } catch (error) {
        console.error("Error fetching Job Order Options:", error);
      }
    };

    chemicalLovApi();
  }, [token]);

  useEffect(() => {
    const signatureKeys = ["chemist_sign", "qa_exe_sign", "manager_sign"];
    signatureKeys.forEach((key) => {
      const username = printData[key];
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
  }, [
    token,
    printData.chemist_sign,
    printData.qa_exe_sign,
    printData.manager_sign,
  ]);

  // --------------------------- Summary Get Api ------------------------------
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${    API.prodUrl}/Precot/api/QcForm/F016StandardOfChemicalSummary`,
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
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },
    {
      title: "Chemical",
      dataIndex: "to_be_name_of_solution",
      key: "to_be_name_of_solution",
      align: "center",
    },
    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },
    {
      title: "Manager Status",
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
    columns = [...baseColumns.slice(0, 6), Reason, ...baseColumns.slice(6)];
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
    navigate(`/Precot/QualityControl/F-016`, {
      state: {
        date: record.date,
        shift: record.shift,
        chemical: record.to_be_name_of_solution,
      },
    });
  };
  const handleOk = () => {
    if (formParams.date == "") {
      message.warning("Please Select Date");
      return;
    }
    if (formParams.shift == "") {
      message.warning("Please Select Shift");
      return;
    }
    if (formParams.chemical == "") {
      message.warning("Please Select The Chemical");
      return;
    }
    navigate(`/Precot/QualityControl/F-016`, {
      state: {
        date: formParams.date,
        shift: formParams.shift,
        chemical: formParams.chemical,
      },
    });
  };
  const handleFormParams = (value, name) => {
    setFormParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePrintParams = (value, name) => {
    setPrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePrint = async () => {
    // if (
    //   printParams.date == "" &&
    //   printParams.shift == "" &&
    //   printParams.chemical == ""
    // ) {
    //   message.warning("Please Select Atleast One Field");
    //   return;
    // }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${    API.prodUrl}/Precot/api/QcForm/PrintApiF016?date=${printParams.date}&shift=${printParams.shift}&chemical=${printParams.chemical}`,
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

      setPrintData(response.data);
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
      }, [2000]);
    }
    setESign((prevState) => ({
      ...prevState,
      chemist_sign: "",
      qa_exe_sign: "",
      manager_sign: "",
    }));
  }, [printData]);

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      date: "",
      shift: "",
      chemical: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };
  const shiftLov = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];
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
  const entriesPerPage = 4;
  const stoppageReport = [];

  let numberOfPages = Math.ceil((printData.length - 2) / entriesPerPage);

  if (printData && printData.length > 0) {
    for (let i = 2; i < printData.length; i += entriesPerPage) {
      stoppageReport.push(printData.slice(i, i + entriesPerPage));
    }
  }

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

  const breakAfterTwo = (str) => {
    const words = str.split(" ");
    const result = [];
    for (let i = 0; i < words.length; i += 2) {
      result.push(
        <React.Fragment key={i}>
          {words[i]} {words[i + 1] || ""}
          <br />
        </React.Fragment>
      );
    }
    return result;
  };

  return (
    <>
      <div id="section-to-print">
        <GlobalStyle />
        {printData.length <= 2 && (
          <>
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
                    STANDARIZATION OF CHEMICAL SOLUTION
                  </td>
                  <td style={{ padding: "0.5em" }}>Format No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QCL01/F-016</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Revision No.:</td>
                  <td style={{ padding: "0.5em" }}>01</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Page No.:</td>
                  <td style={{ padding: "0.5em" }}>1 of 1</td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "15px" }}></td>
                </tr>
              </table>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      S.No
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      Date
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      Shift
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={4}>
                      Standardized Solution (Know Solution)
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={3}>
                      Standardized Solution (To be prepared)
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={4}>
                      Burette Solution Reading in ml
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        height: "120px",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      Normality of the
                      <br /> Prepared Solution (N1)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                      }}
                      rowSpan={2}
                    >
                      Lot No.
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      Prep.and Stand.
                      <br /> Done By.
                      <br /> (Sign and Date)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      Expiry Date
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      Approved By (HOD)
                    </td>
                    {/* <td style={{writingMode: 'vertical-rl',transform: 'rotate(180deg)',textAlign:'center',padding:'0px'}} rowSpan={2}>Discarded By<br/>  (Sign and Date)</td> */}
                  </tr>
                  <tr>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        height: "200px",
                        padding: "0px",
                      }}
                    >
                      Name of the
                      <br /> Solution
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Lot Number
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Volume of the
                      <br /> Solution taken
                      <br /> (ml)(V2)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Normality
                      <br /> (N2)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Name of the
                      <br /> Solution
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Weight of the
                      <br /> chemical (gm)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Volume of the
                      <br /> Solution Prepared (ml)
                    </td>
                    {/* <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Volume of the
                      <br /> Sample Solution
                      <br /> taken(ml) (V1)
                    </td> */}
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Trial. 01
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Trial. 02
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Trial. 03
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Average (V1)
                    </td>
                  </tr>
                </thead>
                {printData?.map((row, rowIndex) => (
                  <tr>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                        height: "100px",
                      }}
                    >
                      {rowIndex + 1}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {formatDate(row.date)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {row.shift}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {breakAfterTwo(row.name_of_solution)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.standardized_lot_number).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.volume_of_solution).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.normality).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {breakAfterTwo(row.to_be_name_of_solution)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.to_be_weight_of_chemical).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.to_be_volume_of_solution).toFixed(2)}
                    </td>
                    {/* <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.volume_of_sample_solution).toFixed(2)}
                    </td> */}
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.trail_01).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.trail_02).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.trail_03).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.average).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.normal_of_req_solution).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {breakAfterTwo(row.lot_no)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                        verticalAlign: "bottom",
                      }}
                    >
                      {row.chemist_sign}
                      <br></br>
                      {formatDateAndTime(row.chemist_submit_on)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {formatDate(row.expiry_date)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                        verticalAlign: "bottom",
                      }}
                    >
                      {row.manager_sign}
                      <br></br>
                      {formatDateAndTime(row.manager_submit_on)}
                    </td>
                    {/* <td style={{writingMode: 'vertical-rl',transform: 'rotate(180deg)',textAlign:'center',padding:'0px'}}></td> */}
                  </tr>
                ))}
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
          </>
        )}
        {printData.length > 2 && (
          <>
            <GlobalStyle />
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
                    STANDARIZATION OF CHEMICAL SOLUTION
                  </td>
                  <td style={{ padding: "0.5em" }}>Format No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QCL01/F-016</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Revision No.:</td>
                  <td style={{ padding: "0.5em" }}>01</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Page No.:</td>
                  <td style={{ padding: "0.5em" }}>1 of {numberOfPages + 1}</td>
                </tr>
                <tr>
                  <td style={{ border: "none", padding: "15px" }}></td>
                </tr>
              </table>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      S.No
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      Date
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      Shift
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={4}>
                      Standardized Solution (Know Solution)
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={4}>
                      Standardized Solution (To be prepared)
                    </td>
                    <td style={{ textAlign: "center" }} colSpan={4}>
                      Burette Solution Reading in ml
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        height: "120px",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      Normality of the
                      <br /> required Solution
                      <br /> (N1)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                      }}
                      rowSpan={2}
                    >
                      Lot No.
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      Prep.and Stand.
                      <br /> Done By.
                      <br /> (Sign and Date)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      Expiry Date
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                      rowSpan={2}
                    >
                      Approved By (HOD)
                    </td>
                    {/* <td style={{writingMode: 'vertical-rl',transform: 'rotate(180deg)',textAlign:'center',padding:'0px'}} rowSpan={2}>Discarded By<br/>  (Sign and Date)</td> */}
                  </tr>
                  <tr>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        height: "200px",
                        padding: "0px",
                      }}
                    >
                      Name of the Solution
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Weight of the
                      <br /> chemical (gm/kg)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Volume of the
                      <br /> SolutionPrepared (ml)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Normality
                      <br /> (N2)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Name of the
                      <br /> Solution
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Weight of the
                      <br /> chemical (gm/kg)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Volume of the
                      <br /> Solution Prepared (ml)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Volume of the
                      <br /> Sample Solution
                      <br /> taken(ml) (V1)
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Trial. 01
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Trial. 02
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Trial. 03
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      Average (V2)
                    </td>
                  </tr>
                </thead>
                {printData?.slice(0, 2).map((row, rowIndex) => (
                  <tr>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                        height: "100px",
                      }}
                    >
                      {rowIndex + 1}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {formatDate(row.date)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {row.shift}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {breakAfterTwo(row.name_of_solution)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.weight_of_chemical).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.volume_of_solution).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.normality).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {breakAfterTwo(row.to_be_name_of_solution)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.to_be_weight_of_chemical).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.to_be_volume_of_solution).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.volume_of_sample_solution).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.trail_01).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.trail_02).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.trail_03).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.average).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {Number(row.normal_of_req_solution).toFixed(2)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {breakAfterTwo(row.lot_no)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        verticalAlign: "bottom",
                        padding: "0px",
                      }}
                    >
                      {row.chemist_sign}
                      <br></br>
                      {formatDateAndTime(row.chemist_submit_on)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {formatDate(row.expiry_date)}
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        textAlign: "center",
                        verticalAlign: "bottom",
                        padding: "0px",
                      }}
                    >
                      {row.manager_sign}
                      <br></br>
                      {formatDateAndTime(row.manager_submit_on)}
                    </td>
                    {/* <td style={{writingMode: 'vertical-rl',transform: 'rotate(180deg)',textAlign:'center',padding:'0px'}}></td> */}
                  </tr>
                ))}
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
            {stoppageReport.map((bodyContent, pageIndex) => (
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
                      STANDARIZATION OF CHEMICAL SOLUTION
                    </td>
                    <td style={{ padding: "0.5em" }}>Format No.:</td>
                    <td style={{ padding: "0.5em" }}>PH-QCL01/F-016</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Revision No.:</td>
                    <td style={{ padding: "0.5em" }}>01</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
                    <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Page No.:</td>
                    <td style={{ padding: "0.5em" }}>
                      {pageIndex + 2} of {numberOfPages + 1}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "none", padding: "15px" }}></td>
                  </tr>
                </table>
                <table style={{ width: "100%" }}>
                  {bodyContent.map((row, rowIndex) => (
                    <tr>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "2px",
                          height: "100px",
                          width: "8px",
                        }}
                      >
                        {pageIndex == 0
                          ? rowIndex + 1 + 2
                          : rowIndex + 1 + pageIndex * 4 + 2}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {formatDate(row.date)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {row.shift}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {breakAfterTwo(row.name_of_solution)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {Number(row.weight_of_chemical).toFixed(2)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {Number(row.volume_of_solution).toFixed(2)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {Number(row.normality).toFixed(2)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {breakAfterTwo(row.to_be_name_of_solution)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {Number(row.to_be_weight_of_chemical).toFixed(2)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {Number(row.to_be_volume_of_solution).toFixed(2)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {Number(row.volume_of_sample_solution).toFixed(2)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {Number(row.trail_01).toFixed(2)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {Number(row.trail_02).toFixed(2)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {Number(row.trail_03).toFixed(2)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {Number(row.average).toFixed(2)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {Number(row.normal_of_req_solution).toFixed(2)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {breakAfterTwo(row.lot_no)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                          verticalAlign: "bottom",
                          width: "60px",
                        }}
                      >
                        {row.chemist_sign}
                        <br></br>
                        {formatDateAndTime(row.chemist_submit_on)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                        }}
                      >
                        {formatDate(row.expiry_date)}
                      </td>
                      <td
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textAlign: "center",
                          padding: "0px",
                          verticalAlign: "bottom",
                          width: "60px",
                        }}
                      >
                        {row.manager_sign}
                        <br></br>
                        {formatDateAndTime(row.manager_submit_on)}
                      </td>
                      {/* <td style={{writingMode: 'vertical-rl',transform: 'rotate(180deg)',textAlign:'center',padding:'4px'}}></td> */}
                    </tr>
                  ))}
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
            ))}
          </>
        )}
      </div>
      <BleachingHeader
        formName={"STANDARIZATION OF CHEMICAL SOLUTION"}
        formatNo={"PH-QCL01/F-016"}
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
        title="Standardization Of Chemical Solution (Print)"
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
        <label style={{ marginTop: "8px" }}>
          <span style={{ marginRight: "15px" }}>
            Date :<span style={{ padding: "15px" }}></span>{" "}
          </span>
        </label>
        <Input
          type="date"
          style={{ width: "200px" }}
          value={printParams.date}
          onChange={(e) => {
            handlePrintParams(e.target.value, "date");
          }}
          max={today}
        ></Input>
        <br></br>
        <br></br>
        <label style={{ marginTop: "8px" }}>
          <span style={{ marginRight: "15px" }}>
            Shift :<span style={{ padding: "15px" }}></span>{" "}
          </span>
        </label>
        <Select
          options={shiftLov}
          style={{ width: "200px", textAlign: "center" }}
          value={printParams.shift}
          dropdownStyle={{ textAlign: "center" }}
          onChange={(e) => {
            handlePrintParams(e, "shift");
          }}
        ></Select>
        <br></br>
        <br></br>
        <label style={{ marginTop: "8px" }}>
          <span style={{ marginRight: "5px" }}>
            Chemical :<span style={{ padding: "5px" }}></span>{" "}
          </span>
        </label>
        <Select
          options={chemicalLov}
          style={{ width: "200px", textAlign: "center" }}
          value={printParams.chemical}
          onChange={(e) => {
            handlePrintParams(e, "chemical");
          }}
          dropdownStyle={{ textAlign: "center" }}
          showSearch
        ></Select>
      </Modal>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          width: "100%",
        }}
      >
        <Input
          type="date"
          addonBefore="Date : "
          style={{ width: "150px" }}
          value={formParams.date}
          onChange={(e) => {
            handleFormParams(e.target.value, "date");
          }}
          max={today}
        ></Input>
        <div>
          <label style={{ marginTop: "8px", marginLeft: "50px" }}>
            Shift :{" "}
          </label>
          <Select
            options={shiftLov}
            style={{ width: "150px", textAlign: "center" }}
            value={formParams.shift}
            dropdownStyle={{ textAlign: "center" }}
            onChange={(e) => {
              handleFormParams(e, "shift");
            }}
          ></Select>
        </div>
        <label style={{ marginTop: "8px" }}>Chemical : </label>
        <Select
          style={{ width: "260px", textAlign: "center" }}
          value={formParams.chemical}
          onChange={(e) => {
            handleFormParams(e, "chemical");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFormParams(e.target.value, "chemical");
            }
          }}
          dropdownStyle={{ textAlign: "center" }}
          showSearch
        >
          <Select.Option value="Caustic Soda Flakes (NaOH)">
            Caustic Soda Flakes (NaOH)
          </Select.Option>
          <Select.Option value="Hydrochloric acid (HCl)">
            Hydrochloric acid (HCl)
          </Select.Option>
          <Select.Option value="Potassium Permanganate  (KMnO4)">
            Potassium Permanganate (KMnO4)
          </Select.Option>
          <Select.Option value="Sodium Thiosulphate (Na2S2O3)">
            Sodium Thiosulphate (Na2S2O3)
          </Select.Option>
          <Select.Option value="Ferrous Ammonium Sulphate Fe[NH4] 2.[S04]2">
            Ferrous Ammonium Sulphate Fe[NH4] 2.[S04]2
          </Select.Option>
        </Select>
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }}
          shape="round"
          icon={<BiNavigation color={"#00308F"} />}
          onClick={handleOk}
        >
          Go To
        </Button>
      </div>
      <Table columns={columns} dataSource={summaryData}></Table>
    </>
  );
};

export default QualityControl_f16_Summary;
