/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import API from "../baseUrl.json";
import { FaPrint } from "react-icons/fa6";
import {
  Table,
  Button,
  Modal,
  Select,
  Tooltip,
  Menu,
  Row,
  Avatar,
  Col,
  Drawer,
  message,
  Form,
  Input,
  notification,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { BiLock, BiNavigation } from "react-icons/bi";
import BleachingHeader from "../Components/BleachingHeader.js";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoCreate, IoPrint } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { createGlobalStyle } from "styled-components";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import moment from "moment";

const { Option } = Select;

const QualityControl_f20_Summary = () => {
  const [invoiceNo, setInvoiceNo] = useState([]);
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    date: "",
    printDate: "",
  });
  const [printParams, setPrintParams] = useState({
    year: "",
    month: "",
    date: "",
  });
  const initialized = useRef(false);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [isModalPrint, setIsModalPrint] = useState(false);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [summary, setSummaryData] = useState([]);
  const [batchnoprint, setbatchnoprint] = useState([]);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const role = localStorage.getItem("role");
  const [showModal, setShowModal] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [printData, setPrintData] = useState([]);
  const [eSign, setESign] = useState({
    chemist_sign: "",
    micro_sign: "",
    qc_sign: "",
  });
  const [yearLov, setYearLov] = useState([]);
  const [monthLov, setMonthLov] = useState([]);

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
    setMonthLov(months);

    setYearLov(years);
  }, [formParams.year, formParams.month, printParams.year, printParams.month]);

  useEffect(() => {
    const signatureKeys = ["chemist_sign", "micro_sign", "qc_sign"];
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
  }, [token, printData.chemist_sign, printData.micro_sign, printData.qc_sign]);

  useEffect(() => {
    const fetchDatamillbatch = async () => {
      try {
        const response = await axios.get(
          `${    API.prodUrl}/Precot/api/chemicaltest/ARF004/PDE`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const options = response.data
          .filter((option) => option.invoice_no !== "")
          .map((option) => ({
            value: option.invoice_no,
            label: option.invoice_no,
          }));

        setInvoiceNo(options);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDatamillbatch();
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${    API.prodUrl}/Precot/api/chemicaltest/CLF020/getAll`,
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
      for (const data of summary) {
        if (
          data.qc_status == "QC_REJECTED" ||
          data.qc_status == "QA_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summary]);

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
      dataIndex: "testedIncubationStartOn",
      key: "testedIncubationStartOn",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "MicroBiology Status ",
      dataIndex: "micro_status",
      key: "micro_status",
      align: "center",
    },
    {
      title: "Manager Status",
      dataIndex: "qc_status",
      key: "qc_status",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "id",
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

  const showDrawer = () => {
    setOpen(true);
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const formatDates = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleFormParams = (value, name) => {
    setFormParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGo = async () => {
    if (formParams.date == "") {
      message.warning("Please Select The Date");
      return;
    }

    navigate("/Precot/QualityControl/F-020", {
      state: {
        date: formParams.date,
      },
    });
  };

  const handleEdit = (record) => {
    navigate("/Precot/QualityControl/F-020", {
      state: {
        date: record.testedIncubationStartOn,
      },
    });
  };

  const handlePrint = async () => {
    if (
      printParams.year == "" &&
      printParams.month == "" &&
      printParams.date == ""
    ) {
      message.warning("Please Select atleast one field");
      return;
    }
    if (printParams.month !== "" && printParams.year == "") {
      message.warning("Please Select Year");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${    API.prodUrl}/Precot/api/chemicaltest/CLF020/print?year=${printParams.year}&month=${printParams.month}&date=${printParams.date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length == 0) {
        message.warning("No Data Available To Print");
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
  }, [printData]);

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      month: "",
      year: "",
      date: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };
  const handlePrintParams = (value, name) => {
    setPrintParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name == "year" || name == "month") {
      setPrintParams((prevState) => ({
        ...prevState,
        date: "",
      }));
    }
    if (name == "year") {
      setPrintParams((prevState) => ({
        ...prevState,
        month: "",
      }));
    }

    if (name == "date") {
      setPrintParams((prevState) => ({
        ...prevState,
        year: "",
        month: "",
      }));
    }
  };

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

  const entriesPerPage = 3;
  const stoppageReport = [];
  let numberOfPages = Math.ceil((printData.length - 2) / entriesPerPage);

  if (printData || printData.length > 0) {
    for (let i = 2; i < printData.length; i += entriesPerPage) {
      stoppageReport.push(printData.slice(i, i + entriesPerPage));
    }
  }

  return (
    <div>
      <div id="section-to-print">
        <GlobalStyle />
        {printData.length <= 2 && (
          <>
            <div className="page-break">
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tr>
                  <td style={{ border: "none", padding: "30px" }}></td>
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
                    MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS
                  </td>
                  <td style={{ padding: "0.5em" }}>Format No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QCL01/F-20</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Revision No.:</td>
                  <td style={{ padding: "0.5em" }}>03</td>
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
              <table style={{ tableLayout: "center" }}>
                {/* <tr>
                  <td style={{ textAlign: "center" }} colSpan={16}>
                    MICROBIOLOGICAL TEST (Export Batches Only)
                  </td>
                </tr> */}
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Sampled Date
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    A.R. Number
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Tested /Incubation Start on
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Sample Description
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={7}>
                    Test Parameters & Specification{" "}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Test Completion Date{" "}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Remark
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Tested By (Sign & Date)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Accepted (A)/ Rejected ( R )
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Approved By (Sign & Date)
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
                    rowSpan={2}
                  >
                    Total Viable Count (TVC - cfu/g) (Limit ≤1000)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={2}
                  >
                    Total Fungal Count (TFC - cfu/g)(Limit ≤ 100)
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={5}>
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
                      padding: "0px",
                    }}
                  >
                    Gram negative bacteria or Coliform (Should be Absent)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                  >
                    Escherechia coli (E.coli)(Should be Absent)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                  >
                    Staphylococcos aures (S.aur )(Should be Absent)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                  >
                    Pseudomonas aerogenosa (P.aer)(Should be Absent)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                  >
                    Salmonella (Sal.)(Should be Absent)
                  </td>
                </tr>
                {printData.map((row, rowIndex) => (
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
                      {formatDate(row.sampledDate)}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.arNumber}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {formatDate(row.testedIncubationStartOn)}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.sampleDescription}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.totalViableCountTVC}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.totalFungalCountTFC}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.gramNegativeBacteriaColiform}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.ecoli}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.staphylococcusAureus}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.pseudomonasAeruginosa}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.salmonella}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {formatDate(row.testCompletionDate)}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.remark}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.micro_sign} <br />
                      {formatDateAndTime(row.micro_submit_on)}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.acceptedRejected}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.qc_sign}
                      {formatDateAndTime(row.qc_submit_on)}
                    </td>
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
            <div className="page-break">
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tr>
                  <td style={{ border: "none", padding: "30px" }}></td>
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
                    MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS
                  </td>
                  <td style={{ padding: "0.5em" }}>Format No.:</td>
                  <td style={{ padding: "0.5em" }}>PH-QCL01/F-20</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5em" }}>Revision No.:</td>
                  <td style={{ padding: "0.5em" }}>03</td>
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
              <table style={{ tableLayout: "center" }}>
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={16}>
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
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Sampled Date
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    A.R. Number
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Tested /Incubation Start on
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Sample Description
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={7}>
                    Test Parameters & Specification{" "}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Test Completion Date{" "}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Remark
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Tested By (Sign & Date)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Accepted (A)/ Rejected ( R )
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={3}
                  >
                    Approved By (Sign & Date)
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
                    rowSpan={2}
                  >
                    Total Viable Count (TVC - cfu/g) (Limit ≤1000)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                    rowSpan={2}
                  >
                    Total Fungal Count (TFC - cfu/g)(Limit ≤ 100)
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={5}>
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
                      padding: "0px",
                    }}
                  >
                    Gram negative bacteria or Coliform (Should be Absent)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                  >
                    Escherechia coli (E.coli)(Should be Absent)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                  >
                    Staphylococcos aures (S.aur )(Should be Absent)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                  >
                    Pseudomonas aerogenosa (P.aer)(Should be Absent)
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "100px",
                      padding: "0px",
                    }}
                  >
                    Salmonella (Sal.)(Should be Absent)
                  </td>
                </tr>
                {printData.slice(0, 2).map((row, rowIndex) => (
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
                      {formatDate(row.sampledDate)}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.arNumber}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {formatDate(row.testedIncubationStartOn)}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.sampleDescription}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.totalViableCountTVC}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.totalFungalCountTFC}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.gramNegativeBacteriaColiform}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.ecoli}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.staphylococcusAureus}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.pseudomonasAeruginosa}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.salmonella}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {formatDate(row.testCompletionDate)}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.remark}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.micro_sign} <br />
                      {formatDateAndTime(row.micro_submit_on)}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.acceptedRejected}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        height: "100px",
                        padding: "0px",
                      }}
                    >
                      {row.qc_sign} <br />
                      {formatDateAndTime(row.qc_submit_on)}
                    </td>
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
              <div className="page-break">
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tr>
                    <td style={{ border: "none", padding: "30px" }}></td>
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
                      MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS
                    </td>
                    <td style={{ padding: "0.5em" }}>Format No.:</td>
                    <td style={{ padding: "0.5em" }}>PH-QCL01/F-20</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5em" }}>Revision No.:</td>
                    <td style={{ padding: "0.5em" }}>03</td>
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
                <table>
                  {bodyContent.map((row, rowIndex) => (
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
                        {formatDate(row.sampledDate)}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.arNumber}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {formatDate(row.testedIncubationStartOn)}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.sampleDescription}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.totalViableCountTVC}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.totalFungalCountTFC}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.gramNegativeBacteriaColiform}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.ecoli}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.staphylococcusAureus}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.pseudomonasAeruginosa}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.salmonella}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {formatDate(row.testCompletionDate)}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.remark}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.micro_sign} <br />
                        {formatDateAndTime(row.micro_submit_on)}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.acceptedRejected}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          height: "100px",
                          padding: "0px",
                        }}
                      >
                        {row.qc_sign} <br />
                        {formatDateAndTime(row.qc_submit_on)}
                      </td>
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
        formName={"MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS"}
        formatNo={"PH-QCL01/F-20"}
        unit={"UNIT H"}
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
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Date :
          </div>
          <Input
            type="date"
            max={today}
            onChange={(e) => {
              handleFormParams(e.target.value, "date");
            }}
            style={{ width: "150px", textAlign: "center" }}
          ></Input>
          <Button
            key="go"
            onClick={handleGo}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiNavigation color="#00308F" />}
            type="primary"
          >
            Go To
          </Button>
        </div>
        <Table
          bordered
          style={{ textAlign: "center" }}
          columns={columns}
          dataSource={summary}
        />
        <PrecotSidebar
          open={open}
          onClose={onClose}
          role={localStorage.getItem("role")}
        />
        <Modal
          title="MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS (Print)"
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
          <span style={{ marginRight: "20px" }}>Year : &nbsp;&nbsp; </span>{" "}
          <Select
            value={printParams.year}
            options={yearLov}
            onChange={(e) => {
              handlePrintParams(e, "year");
            }}
            style={{ textAlign: "center", width: "200px" }}
            dropdownStyle={{ textAlign: "center" }}
            disabled={printParams.date !== ""}
          ></Select>{" "}
          <br />
          <br />
          <span style={{ marginRight: "20px" }}>Month : </span>{" "}
          <Select
            value={printParams.month}
            options={monthLov}
            onChange={(e) => {
              handlePrintParams(e, "month");
            }}
            style={{ textAlign: "center", width: "200px" }}
            dropdownStyle={{ textAlign: "center" }}
            disabled={printParams.date !== ""}
          ></Select>{" "}
          <br />
          <br />
          <span style={{ marginRight: "28px" }}>Date : </span>{" "}
          <Input
            type="date"
            value={printParams.date}
            onChange={(e) => {
              handlePrintParams(e.target.value, "date");
            }}
            max={today}
            style={{ textAlign: "center", width: "200px" }}
            readOnly={printParams.year !== "" || printParams.month !== ""}
          ></Input>
        </Modal>
      </div>
    </div>
  );
};

export default QualityControl_f20_Summary;
