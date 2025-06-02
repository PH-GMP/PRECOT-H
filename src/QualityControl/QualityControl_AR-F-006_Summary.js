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
  Input,
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
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import moment from "moment";

const { Option } = Select;

const QualityControl_f006_Summary = () => {
  const [batchNo, setBatchNo] = useState([]);
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    bmrNo: "",
    samplingDate: "",
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
          `${    API.prodUrl}/Precot/api/punching/bmr/fetchProductionDetails`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        setBatchNo(response.data);
        console.log(response.data);
        const filteredBatchNos = response.data.filter(
          (batch) =>
            batch.value !== "Failed to Get Batch for Production Details"
        );

        setBatchNo(filteredBatchNos);
        console.log(filteredBatchNos);
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
            `${    API.prodUrl}/Precot/api/chemicaltest/ARF006/getAll`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSummaryData(response.data);
          console.log("Data", summary);
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
      title: "BMR No",
      dataIndex: "bmr_no",
      key: "bmr_no",
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
    console.log("namevalue", name, value);
    setFormParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("namevalue", name, value);
  };

  const handleGo = async () => {
    console.log("date", formParams.samplingDate, formParams.bmrNo);
    if (formParams.bmrNo == "") {
      message.warning("Please Select The BMR Number");
      return;
    }

    if (formParams.samplingDate == "") {
      message.warning("Please Select The Sampling Date");
      return;
    }

    navigate("/Precot/QualityControl/ARF-006", {
      state: {
        bmrNo: formParams.bmrNo,
        sampledate: formParams.samplingDate,
      },
    });
  };

  const handleEdit = (record) => {
    navigate("/Precot/QualityControl/ARF-006", {
      state: {
        bmrNo: record.bmr_no,
        sampledate: record.sample_date,
      },
    });
  };

  const handlePrint = async () => {
    if (formParams.bmrNo == "") {
      message.warning("Please Select BMR No");
      return;
    }

    if (formParams.samplingDate == "") {
      message.warning("Please Select sampling date");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${    API.prodUrl}/Precot/api/chemicaltest/ARF006/print?bmr=${formParams.bmrNo}&date=${formParams.samplingDate}`,
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
      printSubBatchNo: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };

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
        <style>
          {`
      @media print {
         @page {
      size: landscape;
       margin: 0;
    }
    body {
      -webkit-print-color-adjust: exact;
      transform: scale(0.8); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
  html, body {  
    margin: 0px !important;
    padding: 0px !important;
  }
      #section-to-print table th,
  #section-to-print table td {
    border: 1px solid black;
    text-align: left;
    padding:2px;
    font-size: 12px !important;
    font-family: "Times New Roman", Times, serif;
  }
                .page-break {
                page-break-after: always;
            }
      }
    `}
        </style>
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
                FINISHED PRODUCT ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-006</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>04</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>01 of 03</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>

          <table style={{ tableLayout: "fixed", marginTop: "-1rem" }}>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={11}>
                PHYSICAL AND CHEMCAL TEST
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }} colSpan={4}>
                Product Description:{printData.product_description}
              </td>
              <td rowSpan={2} style={{ textAlign: "center" }}>
                Parameter Tested
              </td>
              <td rowSpan={2} style={{ textAlign: "center" }}>
                Specification
              </td>
              <td rowSpan={2} style={{ textAlign: "center" }} colSpan={4}>
                Observation
              </td>
              <td rowSpan={4} style={{ textAlign: "center" }}>
                Remark
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }} colSpan={2}>
                Edge & Pattern: {printData.edge_pattern}{" "}
              </td>
              <td style={{ textAlign: "left" }} colSpan={2}>
                Quantity: {printData.quantity}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "left" }}>
                A.R. No.: {printData.ar_no}{" "}
              </td>
              <td colSpan={2} rowSpan={2} style={{ textAlign: "left" }}>
                FG No: {printData.fg_no}{" "}
              </td>
              <td rowSpan={2} style={{ textAlign: "left", padding: "5px" }}>
                13. Absorbency
              </td>
              <td rowSpan={2} style={{ textAlign: "center", padding: "5px" }}>
                Sample
              </td>
              <td rowSpan={2} style={{ textAlign: "center", padding: "5px" }}>
                1
              </td>
              <td rowSpan={2} style={{ textAlign: "center", padding: "5px" }}>
                2
              </td>
              <td rowSpan={2} style={{ textAlign: "center", padding: "5px" }}>
                3
              </td>
              <td rowSpan={2} style={{ textAlign: "center", padding: "5px" }}>
                Avg.
              </td>
            </tr>
            <tr>
              <td colSpan={2}>BMR No.</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }} colSpan={2}>
                Sampling Date: {formatDate(printData.sample_date)}{" "}
              </td>
              <td style={{ textAlign: "left" }} colSpan={2}>
                Tested Date: {formatDate(printData.tested_on)}{" "}
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Sinking time (Sec.)
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Max. 8.0 For BP,USP EP Max.10
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.abs_1}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.abs_2}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.abs_3}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.abs_avg}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.abs_rmk}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Parameter Tested {formatDate(printData.samplingDate)}{" "}
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Specification {printData.finishing}{" "}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Observation
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>Remark</td>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Absorbption Capacity/ W.H.C (g/g)
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Min.24.0 For JP Min.20 & BP,EP Min.23
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.abs_4}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.abs_5}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.abs_6}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.abs_avg_2}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.abs2_rmk}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                1.Description{" "}
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Absorbent Cotton Product
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.observation}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.remarks}
              </td>
              <td rowSpan={3} style={{ textAlign: "left", padding: "5px" }}>
                14. Sulphated Ash (%) RESULT = [(B-A) x100]/ 5 A= Crucible
                Wt.(g) B= Crucible
              </td>
              <td rowSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                Max.0.20 For JP Max. 0.25 total ash & BP,EP Max.0.4
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Final Wt.(g)-B
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.sulphatedFlWtObr}
              </td>
              <td rowSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.sulphate_rmk}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                2. Identification Test (Under Microscope)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Each fiber consist of single cell, in the form of flattened tube
                with thick round walls and often twisted.{" "}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {" "}
                {printData.obser?.[0]?.identification_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {" "}
                {printData.obser?.[0]?.identification_rmk}
              </td>

              <td style={{ textAlign: "center", padding: "5px" }}>
                Initial Wt.(g)-A
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.sulphatedIlWtObr}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                3. Fibre Average Length (mm.)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Min.10
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.fibre_average_length_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.fibre_average_length_rmk}
              </td>

              <td style={{ textAlign: "center", padding: "5px" }}>B-A</td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.sulphatedBaObr}
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
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginTop: "-1rem",
            }}
          >
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
                FINISHED PRODUCT ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-006</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>04</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>02 of 03</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "fixed", marginTop: "-1rem" }}>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                (manual)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}></td>
              <td style={{ textAlign: "center", padding: "5px" }}></td>
              <td style={{ textAlign: "center", padding: "5px" }}></td>

              <td rowSpan={2} style={{ textAlign: "center", padding: "5px" }}>
                Wt.with 5 g. sample's Ash Content.(g)
              </td>
              <td
                rowSpan={2}
                style={{ textAlign: "center", padding: "5px" }}
              ></td>
              <td style={{ textAlign: "center", padding: "5px" }}></td>
              <td
                colSpan={3}
                style={{ textAlign: "center", padding: "5px" }}
              ></td>
              <td
                rowSpan={2}
                style={{ textAlign: "center", padding: "5px" }}
              ></td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                4. Acidity / Alkalinity (pH)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                6 to 8
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.acidity_ph_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.acidity_ph_rmk}
              </td>

              <td style={{ textAlign: "center", padding: "5px" }}>
                RESULTS (%)
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.sulphate_rmk}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                5. Surface Activitive Substances (S.A)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Any foam present must not cover the entire surface of the
                liquid.
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.surface_activ_sub_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.surface_activ_sub_rmk}
              </td>
              <td rowSpan={4} style={{ textAlign: "left", padding: "5px" }}>
                15. Water Soluble Substances (%) RESULT = [(N-M) x100]/ 5 M=
                Beaker Wt.(g) N= Beaker Wt.with 5 g. sample's Water Soluble
                extract.(g)
              </td>
              <td rowSpan={4} style={{ textAlign: "center", padding: "5px" }}>
                Max. 0.28 For USP Max.0.35 & BP, EP Max.0.5
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Final Wt.(g)-N
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.watersolubleFlWtObr}
              </td>
              <td rowSpan={4} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.water_soluble_rmk}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                6. Foreign Fibers (Under Microscope)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Occasionally a few isolated foreign fibers may be present.
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.foreign_fibers_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.foreign_fibers_rmk}
              </td>

              <td style={{ textAlign: "center", padding: "5px" }}>
                Initial Wt.(g)-M
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.watersolubleIlWtObr}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                7. Fluorescence (Under UV)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                No intense blue fluorescence. Few isolated fibers passable
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.fluorescence_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.fluorescence_rmk}
              </td>

              <td style={{ textAlign: "center", padding: "5px" }}>N-M</td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.watersolubleNmObr}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                8.Neps
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Max. 5 ( 2.5 mm in diameter)/ gram
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.neps_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.neps_rmk}
              </td>

              <td style={{ textAlign: "center", padding: "5px" }}>
                RESULTS (%){" "}
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.watersolubleResObr}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                9. Neps. count/gram.
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Max. 5000
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.neps_count_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.neps_count_rmk}
              </td>
              <td rowSpan={3} style={{ textAlign: "left", padding: "5px" }}>
                16. Ether Soluble Substances (%) RESULT = [(Y-X) x100]/ 5 X=
                Flask
              </td>
              <td rowSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                Max.0.50 For USP Max.0.7
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Final Wt.(g)-Y
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.ethersolubleFlWtObr}
              </td>
              <td rowSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.ether_soluble_rmk}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Upper Quartile Length.mm by wt. - UQL (w)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Min.12
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.uql_w_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.uql_w_rmk}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Initial Wt.(g)-X
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.ethersolubleIlWtObr}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Length by number. mm L(n)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Min. 7
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.ln_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.ln_rmk}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>Y-X</td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.ethersolubleYxObr}
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
                FINISHED PRODUCT ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-006</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Revision No.:</td>
              <td style={{ padding: "0.5em" }}>04</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Ref. SOP No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-D-05</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5em" }}>Page No.:</td>
              <td style={{ padding: "0.5em" }}>02 of 03</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}></td>
              <td style={{ textAlign: "center" }} colSpan={1}></td>
              <td style={{ textAlign: "center", padding: "5px" }}></td>
              <td style={{ textAlign: "center", padding: "5px" }}></td>

              <td rowSpan={2} style={{ textAlign: "center", padding: "5px" }}>
                Wt.(g) Y= Flask Wt.with 5 g. sample's Ether Soluble extract.(g)
              </td>
              <td
                rowSpan={2}
                style={{ textAlign: "center", padding: "5px" }}
              ></td>
              <td style={{ textAlign: "center", padding: "5px" }}></td>
              <td
                colSpan={3}
                style={{ textAlign: "center", padding: "5px" }}
              ></td>
              <td
                rowSpan={2}
                style={{ textAlign: "center", padding: "5px" }}
              ></td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Length by weight. mm L (w)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Min.10
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.lw_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.lw_rmk}
              </td>

              <td style={{ textAlign: "center", padding: "5px" }}>
                RESULTS (%)
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.ethersolubleResObr}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Short fiber Content. by number % SFC(n)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Max. 90
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.sfc_n_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.sfc_n_rmk}
              </td>
              <td rowSpan={4} style={{ textAlign: "left", padding: "5px" }}>
                17. Loss on drying (%) / Moisture content (%) RESULT =[(K-L)
                x100]/ K, K= Cotton Wt.(g) before dry. L= Cotton Wt.(g) after
                dry.
              </td>
              <td rowSpan={4} style={{ textAlign: "center", padding: "5px" }}>
                Max.8.0
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Initial Wt.(g)-K
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.moistureIlWtObr}
              </td>
              <td rowSpan={4} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.moisture_rmk}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Short fiber Content. by wt. % SFC(w)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Max. 85
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.sfc_w_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.sfc_w_rmk}
              </td>

              <td style={{ textAlign: "center", padding: "5px" }}>
                Final Wt.(g)-L
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.moistureFlWtObr}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                10. Micronair Value. µg/inch
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Min. 2.8
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.micronaire_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.micronaire_rmk}
              </td>

              <td style={{ textAlign: "center", padding: "5px" }}>K-L</td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.moistureKlObr}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                11. Whiteness Indices (Berger 10deg/D65)
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Min. 80
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.whiteness_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.whiteness_rmk}
              </td>

              <td style={{ textAlign: "center", padding: "5px" }}>
                RESULTS (%)
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.moisture_rmk}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={1}>
                12. Extractable Colouring Matters
              </td>
              <td style={{ textAlign: "center" }} colSpan={1}>
                Alcohol extract may be slightly yellowish but not blue or green.
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.extractable_obs}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.obser?.[0]?.extractable_rmk}
              </td>
              <td colSpan={7} style={{ textAlign: "left", padding: "5px" }}>
                Remark(s): {printData.obser?.[0]?.extractable_rmk}
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
                FINISHED PRODUCT ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-006</td>
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
              <td style={{ padding: "0.5em" }}>03 of 03</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table>
            <tr>
              <td colSpan={2} style={{ width: "100%" }}>
                Note: Parameter No.-9,10 & 11 are for information purpose only.
                Abbreviation: Max-Maximum, Min-Minimum, mm-millimeter,
                Wt-weight, g-gram,sec-Seconds, µg/in-Microgram per inch,
                Avg.-Average, JP-Japanish Pharmacopoeia,BP-British
                Pharmacopoeia,EP-European Pharmacopoeia, US-United States
                Pharmacopoeia. L-line, P- plain, HC-Honey Comb, SE- Stitched
                edge, CE- Closed Edge, OE- Open Edge A.R.No- Analytical
                Reference Number
              </td>
            </tr>
            <tr>
              <td colSpan={1} style={{ padding: "10px", width: "50%" }}>
                Product: {printData.obser?.[0]?.product}
              </td>
              <td colSpan={1} style={{ padding: "10px", width: "50%" }}>
                Material Passes for the Pharmacopoeia:{" "}
                {printData.obser?.[0]?.material_passes}
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
                Approved by:{" "}
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
                FINISHED PRODUCT ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-006</td>
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
              <td style={{ padding: "0.5em" }}>03 of 03</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "center" }}>
            <tr>
              <td style={{ border: "none", padding: "20px" }}> </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={11}>
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
              >
                Tested /Incubation Start on
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
                  padding: "10px",
                }}
                rowSpan={3}
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
                  padding: "10px",
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
                  padding: "10px",
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
                  padding: "10px",
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
                  padding: "10px",
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
                  padding: "10px",
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
                  padding: "10px",
                }}
              >
                {formatDate(printData.micro?.[0]?.sampled_on)}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                {formatDate(printData.micro?.[0]?.tested_on)}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                {printData.micro?.[0]?.total_viable_count}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                {printData.micro?.[0]?.total_fungal_count}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                {printData.micro?.[0]?.gram}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                {printData.micro?.[0]?.escherechia_coli}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                {printData.micro?.[0]?.stapylococcus}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                {printData.micro?.[0]?.pseudonymous_aerogenosa}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                {printData.micro?.[0]?.Salmonella}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                {printData.micro?.[0]?.Moisture}
              </td>
              <td
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: "100px",
                  padding: "10px",
                }}
              >
                {formatDate(printData.micro?.[0]?.test_completion_date)}
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
                FINISHED PRODUCT ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-006</td>
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
              <td style={{ padding: "0.5em" }}>03 of 03</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "center" }}>
            <tr>
              <td style={{ border: "none", padding: "20px" }}> </td>
            </tr>
            <tr>
              <td rowSpan={2} colSpan={6}>
                {" "}
                Note : cfu/g- Colony forming unit per gram.
              </td>
              <td colSpan={5}> Remark: {printData.micro?.[0]?.remark}</td>
            </tr>
            <tr>
              <td colSpan={5}>Product: {printData.micro?.[0]?.product}</td>
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
                Approved by:{" "}
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
                      width: "50px",
                      height: "50px",
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

          <table style={{ width: "-2rem" }}>
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
        formName={"FINISHED PRODUCT ANALYSIS REPORT"}
        formatNo={"PH-QCL01-AR-F-006"}
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
            BMR No :
          </div>
          <Select
            style={{ width: "200px", textAlign: "center" }}
            showSearch
            options={batchNo}
            value={formParams.bmrNo}
            onChange={(e) => {
              handleFormParams(e, "bmrNo");
            }}
            dropdownStyle={{ textAlign: "center" }}
          ></Select>

          <div
            htmlFor="sampling-date"
            style={{
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Sampling Date:
          </div>

          {/* Input Field for Sampling Date */}
          <Input
            id="sampling-date"
            type="date"
            value={formParams.samplingDate || ""} // Ensure no uncontrolled input warnings
            style={{
              width: "200px",
              textAlign: "center",
            }}
            // max={new Date().toISOString().split("T")[0]} // Prevent future dates
            onChange={(e) => {
              handleFormParams(e.target.value, "samplingDate");
            }}
          />

          {/* Sampling Date Input
  <div
    style={{
      fontSize: "14px",
    }}
  >
    Sampling Date:
  </div>
  <Input
    type="date"
    value={formParams.sample_date} // Bind it to the appropriate state
    style={{
      textAlign: "center",
      width: "150px",
    }}
    max={new Date().toISOString().split("T")[0]} // Prevent future dates
    onChange={(e) => {
      handleFormParams(e.target.value, "sample_date");
    }}
    readOnly={status.fieldStatus}
  /> */}

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
          title="FINISHED PRODUCT ANALYSIS REPORT (Print)"
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
          <label>BMR Number : </label>
          <Select
            style={{ width: "200px", textAlign: "center" }}
            showSearch
            options={batchNo}
            value={formParams.bmrNo}
            onChange={(e) => {
              handleFormParams(e, "bmrNo");
            }}
            dropdownStyle={{ textAlign: "center" }}
          ></Select>
          <label>Sampling Date: </label>
          <Input
            type="date"
            value={formParams.samplingDate}
            onChange={(e) => handleFormParams(e.target.value, "samplingDate")}
            style={{ width: "200px", textAlign: "center", marginTop: "10px" }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default QualityControl_f006_Summary;
