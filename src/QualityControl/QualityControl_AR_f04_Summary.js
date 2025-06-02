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

const QualityControl_AR_f04_Summary = () => {
  const [invoiceNo, setInvoiceNo] = useState([]);
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    invoiceNo: "",
    printInvoiceNo: "",
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
  const [printData, setPrintData] = useState("");
  const [eSign, setESign] = useState({
    chemist_sign: "",
    micro_sign: "",
    qc_sign: "",
  });

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
            `${    API.prodUrl}/Precot/api/chemicaltest/ARF004/getAll`,
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
      title: "Invoice No",
      dataIndex: "invoice_no",
      key: "invoice_no",
      align: "center",
    },

    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
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
    columns = [...baseColumns.slice(0, 5), Reason, ...baseColumns.slice(5)];
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
    if (formParams.invoiceNo == "") {
      message.warning("Please Select The Invoice No");
      return;
    }

    navigate("/Precot/QualityControl/AR-F-004", {
      state: {
        invoiceNo: formParams.invoiceNo,
      },
    });
  };

  const handleEdit = (record) => {
    navigate("/Precot/QualityControl/AR-F-004", {
      state: {
        invoiceNo: record.invoice_no,
      },
    });
  };

  const handlePrint = async () => {
    if (formParams.printInvoiceNo == "") {
      message.warning("Please Select The Invoice No");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${    API.prodUrl}/Precot/api/chemicaltest/ARF004/print?invoice=${formParams.printInvoiceNo}`,
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
      }, [2000]);
    }
  }, [printData]);

  const handlePrintCancel = () => {
    setFormParams((prevState) => ({
      ...prevState,
      printInvoiceNo: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
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
  return (
    <div>
      <div id="section-to-print">
        <GlobalStyle />
        <div className="page-break">
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
                EXFOLIATING FABRIC ANALYSIS REPORT{" "}
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-004</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>06</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>01 of 06</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>

          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={4}>
                PHYSICAL AND CHEMCAL TEST
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }} colSpan={2}>
                Supplier : {printData.supplier}{" "}
              </td>
              <td style={{ textAlign: "left" }} rowSpan={2} colSpan={2}>
                Description : {printData.description}{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }} colSpan={2}>
                A.R.No : {printData.ar_no}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={1} style={{}}>
                Tested On: {formatDate(printData.tested_on)}{" "}
              </td>
              <td style={{}}>Invoice No./ Date: {printData.invoice_no} </td>
              <td colSpan={2} style={{}}>
                No.of Rolls : {printData.no_rolls}
              </td>
            </tr>
            <tr>
              <td colSpan={1} style={{}}>
                Sample Size:{printData.sample_size}{" "}
              </td>
              <td style={{}}>PO.No./Date : {printData.po_no} </td>
              <td colSpan={2} style={{}}>
                Quantity (kg) : {printData.quantity}{" "}
              </td>
            </tr>
          </table>
          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td style={{ textAlign: "center", width: "10%" }}>
                Parameter Tested
              </td>
              <td style={{ textAlign: "center", width: "10%" }}>
                Specification
              </td>
              <td style={{ textAlign: "center" }} colSpan={11}>
                Observation
              </td>
              <td style={{ textAlign: "center", width: "10%" }}>Remark</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                1.Identification Test [with 66 % Sulfuric acid]
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                100% Cotton
              </td>
              <td style={{ textAlign: "center" }} colSpan={11}>
                {printData.obser?.length > 0 ? printData?.obser[0]?.obr : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.remarks
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }} colSpan={2}>
                Tested Roll Number
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ide_test_1
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ide_test_2
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ide_test_3
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ide_test_4
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ide_test_5
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ide_test_6
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ide_test_7
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ide_test_8
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ide_test_9
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ide_test_10
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ide_test_avg
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ide_test_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                2.Width Of fabric
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                for 60''.Min. 1520 mm for 57'' Min.1447.8 mm
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.wid_fab_1
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.wid_fab_2
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.wid_fab_3
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.wid_fab_4
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.wid_fab_5
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.wid_fab_6
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.wid_fab_7
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.wid_fab_8
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.wid_fab_9
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.wid_fab_10
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.wid_fab_cal
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.wid_rmk
                  : ""}
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
                EXFOLIATING FABRIC ANALYSIS REPORT{" "}
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-004</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>06</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>02 of 06</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td style={{ textAlign: "center", width: "10%" }}>
                Parameter Tested
              </td>
              <td style={{ textAlign: "center", width: "10%" }}>
                Specification
              </td>
              <td style={{ textAlign: "center" }} colSpan={11}>
                Observation
              </td>
              <td style={{ textAlign: "center", width: "10%" }}>Remark</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>3.GSM</td>
              <td style={{ textAlign: "center", padding: "5px" }}>162 ±5%</td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0 ? printData?.obser[0]?.gsm_1 : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0 ? printData?.obser[0]?.gsm_2 : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0 ? printData?.obser[0]?.gsm_3 : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0 ? printData?.obser[0]?.gsm_4 : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0 ? printData?.obser[0]?.gsm_5 : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0 ? printData?.obser[0]?.gsm_6 : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0 ? printData?.obser[0]?.gsm_7 : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0 ? printData?.obser[0]?.gsm_8 : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0 ? printData?.obser[0]?.gsm_9 : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0 ? printData?.obser[0]?.gsm_10 : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.gsm_cal
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.gsm_rmk
                  : ""}
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                4.Thickness (mm)
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>1.1 ± 0.1</td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.thk_mm_1
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.thk_mm_2
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.thk_mm_3
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.thk_mm_4
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.thk_mm_5
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.thk_mm_6
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.thk_mm_7
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.thk_mm_8
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.thk_mm_9
                  : ""}
              </td>
              <td
                style={{
                  transform: "rotate(270deg)",
                  textAlign: "center",
                  padding: "0px",
                  height: "100px",
                }}
              >
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.thk_mm_10
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.thk_cal
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.thk_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                5.No. of ply of thread
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                03 or 04 ply
              </td>
              <td style={{ textAlign: "center", padding: "5px" }} colSpan={11}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ply_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ply_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                6.Whiteness Indices [Berger 10deg/D65]{" "}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>Min.60</td>
              <td style={{ textAlign: "center", padding: "5px" }} colSpan={11}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.whiteness_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.whiteness_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                7.Fluorescence [Under UV]
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                No intense blue fluorescence fibers, a few isolated fibers may
                pass
              </td>
              <td style={{ textAlign: "center", padding: "5px" }} colSpan={11}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fluorescence_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.fluorescence_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>8.pH</td>
              <td style={{ textAlign: "center", padding: "5px" }}>6 to 8</td>
              <td style={{ textAlign: "center", padding: "5px" }} colSpan={11}>
                {printData.obser?.length > 0 ? printData?.obser[0]?.ph_obs : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ph_remark
                  : ""}
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
                EXFOLIATING FABRIC ANALYSIS REPORT{" "}
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-004</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>06</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>03 of 06</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td style={{ textAlign: "center", width: "30%" }}>
                Parameter Tested
              </td>
              <td style={{ textAlign: "center", width: "10%" }}>
                Specification
              </td>
              <td style={{ textAlign: "center" }} colSpan={2}>
                Observation
              </td>
              <td style={{ textAlign: "center", width: "10%" }}>Remark</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                9.Presence of Starch
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                No Blue Colour
              </td>
              <td style={{ textAlign: "center", padding: "5px" }} colSpan={2}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.starch_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.starch_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                10.Absorbency (g/g)
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>Min. 4.0</td>
              <td style={{ textAlign: "center", padding: "5px" }} colSpan={2}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.absorbency_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.absorbency_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                11.Sinking Time (Sec)
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>Max. 60</td>
              <td style={{ textAlign: "center", padding: "5px" }} colSpan={2}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.sinking_time_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.sinking_time_remark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                12.Sulphate Ash content (%) RESULT = [(B-A) x100]/ 5 A= Crucible
                Wt.(g) B= Crucible Wt with 5 g. sample`s Ash Content. (g)
              </td>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                Max. 0.40
              </td>
              <td style={{ textAlign: "center" }}>Final Wt.(g)-B</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.sulphatedFlWtObr
                  : ""}
              </td>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.sulphate_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>Initial Wt.(g)-A</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.sulphatedIlWtObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>B-A</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.sulphatedBaObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>RESULTS </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.sulphatedResObr
                  : ""}
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
                EXFOLIATING FABRIC ANALYSIS REPORT{" "}
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-004</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>06</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>04 of 06</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td style={{ textAlign: "center", width: "30%" }}>
                Parameter Tested
              </td>
              <td style={{ textAlign: "center", width: "10%" }}>
                Specification
              </td>
              <td style={{ textAlign: "center" }} colSpan={2}>
                Observation
              </td>
              <td style={{ textAlign: "center", width: "10%" }}>Remark</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                13. Water Soluble Substances (%) RESULT = [(N-M) x100]/ 5 M=
                Beaker Wt.(g) N= Beaker Wt.with 5 g. sample's Water Soluble
                extract. (g)
              </td>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                Max. 0.50
              </td>
              <td style={{ textAlign: "center" }}>Final Wt.(g)-N</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.watersolubleFlWtObr
                  : ""}
              </td>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.water_soluble_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>Initial Wt.(g)-M</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.watersolubleIlWtObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>N-M</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.watersolubleNmObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>RESULTS </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.watersolubleResObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                14. Ether Soluble Extract (%) RESULT = [(Y-X) x100]/ 5 X= Flask
                Wt.(g) Y= Flask Wt with 5 g. sample`s Ether soluble extract.(g)
              </td>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                Max.0.50
              </td>
              <td style={{ textAlign: "center" }}>Final Wt.(g)-Y</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ethersolubleFlWtObr
                  : ""}
              </td>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ether_soluble_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>Initial Wt.(g)-X</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ethersolubleIlWtObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>Y-X</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ethersolubleYxObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>RESULTS</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.ethersolubleResObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                15. Moisture content (%) RESULT = [(K-L) x100]/ K, K= Cotton
                Wt.(g) before dry.L= Cotton Wt.(g) after dry.
              </td>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                Max.8.0
              </td>
              <td style={{ textAlign: "center" }}>Initial Wt.(g)-K</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.moistureIlWtObr
                  : ""}
              </td>
              <td style={{ textAlign: "center" }} rowSpan={4}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.moisture_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>Final Wt.(g)-L</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.moistureFlWtObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>K-L</td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.moistureKlObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>RESULTS </td>
              <td style={{ textAlign: "center" }}>
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.moistureResultsObr
                  : ""}
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
                EXFOLIATING FABRIC ANALYSIS REPORT{" "}
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-004</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>06</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>05 of 06</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table>
            <tr>
              <td style={{ padding: "5px" }} colSpan={5}>
                Remark(s):{" "}
                {printData.obser?.length > 0
                  ? printData?.obser[0]?.final_remark
                  : ""}{" "}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "5px" }} colSpan={5}>
                (Note: Parameter No.10 & 11 are for information purpose only) .
                Abbreviations: A.R. No- Analytical Reference Number, No.-Number,
                Max.-Maximum, Min.-Minimum, mm-millimeter, Wt.-weight,kg-Kilo
                gram, g.-gram, sec.-Seconds
              </td>
            </tr>
            <tr>
              <td style={{ padding: "5px" }} colSpan={5}>
                <span style={{ float: "left" }}>
                  Lot Status :{" "}
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.lot_status || "NA"
                    : ""}
                </span>
                <span style={{ marginLeft: "100px" }}>
                  Accepted Quantity(Kg): {printData.accepted_quantity || "NA"}{" "}
                </span>
                <span style={{ marginLeft: "100px" }}>
                  Accepted Under Deviation Quantity (Kg):{" "}
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.accept_qty || "NA"
                    : "NA"}{" "}
                </span>
                <span style={{ float: "right", marginRight: "40px" }}>
                  Rejected Quantity(Kg):{" "}
                  {printData.obser?.length > 0
                    ? printData?.obser[0]?.rej_qty || "NA"
                    : "NA"}{" "}
                </span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  borderBottom: "none",
                  width: "50%",
                }}
              >
                Tested by (Chemist):{" "}
              </td>
              <td
                style={{
                  textAlign: "center",
                  borderBottom: "none",
                  width: "50%",
                }}
              >
                Approved By (QC Head):{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "30px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                  width: "50%",
                }}
              >
                {eSign.chemist_sign ? (
                  <img
                    src={eSign.chemist_sign}
                    alt="chemist eSign"
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
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "30px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                  width: "50%",
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
                {printData.qc_sign}
                <br></br>
                {formatDateAndTime(printData.qc_submit_on)}
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
                EXFOLIATING FABRIC ANALYSIS REPORT{" "}
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-004</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>06</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>06 of 06</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "center" }}>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={11}>
                MICROBIOLOGICAL TEST (Export Batches Only)
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} rowSpan={3}>
                Sampled on
              </td>
              <td style={{ textAlign: "center" }} rowSpan={3}>
                Tested /Incubation Start on{" "}
              </td>
              <td style={{ textAlign: "center" }} colSpan={7}>
                Test Parameters & Specification{" "}
              </td>
              <td style={{ textAlign: "center" }} rowSpan={3}>
                Test Completion Date{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                Total Viable Count (TVC - cfu/g) (Limit ≤1000)
              </td>
              <td style={{ textAlign: "center" }} rowSpan={2}>
                Total Fungal Count (TFC - cfu/g)(Limit ≤ 100)
              </td>
              <td style={{ textAlign: "center" }} colSpan={5}>
                Pathogens{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>
                Gram negative bacteria or Coliform (Should be Absent)
              </td>
              <td style={{ textAlign: "center" }}>
                Escherechia coli (E.coli)(Should be Absent)
              </td>
              <td style={{ textAlign: "center" }}>
                Staphylococcos aures (S.aur )(Should be Absent)
              </td>
              <td style={{ textAlign: "center" }}>
                Pseudomonas aerogenosa (P.aer)(Should be Absent)
              </td>
              <td style={{ textAlign: "center" }}>
                Salmonella (Sal.)(Should be Absent)
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>
                {printData.microbilogytestf004?.length > 0
                  ? formatDate(printData?.microbilogytestf004[0]?.sampled_on)
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.microbilogytestf004?.length > 0
                  ? formatDate(printData?.microbilogytestf004[0]?.tested_on)
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.microbilogytestf004?.length > 0
                  ? printData?.microbilogytestf004[0]?.total_viable_count
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.microbilogytestf004?.length > 0
                  ? printData?.microbilogytestf004[0]?.total_fungal_count
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.microbilogytestf004?.length > 0
                  ? printData?.microbilogytestf004[0]?.gram
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.microbilogytestf004?.length > 0
                  ? printData?.microbilogytestf004[0]?.escherechia_coli
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.microbilogytestf004?.length > 0
                  ? printData?.microbilogytestf004[0]?.stapylococcus
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.microbilogytestf004?.length > 0
                  ? printData?.microbilogytestf004[0]?.pseudonymous_aerogenosa
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.microbilogytestf004?.length > 0
                  ? printData?.microbilogytestf004[0]?.salmonella
                  : "NA"}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.microbilogytestf004?.length > 0
                  ? formatDate(
                      printData?.microbilogytestf004[0]?.test_completion_date
                    )
                  : "NA"}
              </td>
            </tr>
            <tr>
              <td rowSpan={2} colSpan={6}>
                {" "}
                Note : cfu/g- Colony forming unit per gram.
              </td>
              <td colSpan={5}>
                {" "}
                Remark:{" "}
                {printData.microbilogytestf004?.length > 0
                  ? printData?.microbilogytestf004[0]?.remark
                  : "NA"}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                Product:{" "}
                {printData.microbilogytestf004?.length > 0
                  ? printData?.microbilogytestf004[0]?.product
                  : "NA"}{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "center", borderBottom: "none" }}
                colSpan={6}
              >
                Tested by (Microbiologist):{" "}
              </td>
              <td
                style={{ textAlign: "center", borderBottom: "none" }}
                colSpan={5}
              >
                Approved By (QC Head):{" "}
              </td>
            </tr>
            <tr>
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
                {printData.qc_sign}
                <br></br>
                {formatDateAndTime(printData.qc_submit_on)}
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
        formName={"EXFOLIATING FABRIC ANALYSIS REPORT "}
        formatNo={"PH-QCL01-AR-F-004"}
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
            Invoice No :
          </div>
          <Select
            style={{ width: "200px", textAlign: "center" }}
            showSearch
            options={invoiceNo}
            value={formParams.invoiceNo}
            onChange={(e) => {
              handleFormParams(e, "invoiceNo");
            }}
            dropdownStyle={{ textAlign: "center" }}
          ></Select>
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
          title="EXFOLIATING FABRIC ANALYSIS REPORT  (Print)"
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
          <label> Invoice No : </label>
          <Select
            style={{ width: "200px", textAlign: "center" }}
            showSearch
            options={invoiceNo}
            value={formParams.printInvoiceNo}
            onChange={(e) => {
              handleFormParams(e, "printInvoiceNo");
            }}
            dropdownStyle={{ textAlign: "center" }}
          ></Select>
        </Modal>
      </div>
    </div>
  );
};

export default QualityControl_AR_f04_Summary;
