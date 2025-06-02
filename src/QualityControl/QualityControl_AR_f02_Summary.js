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
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import moment from "moment";

const { Option } = Select;

const QualityControl_AR_f02_Summary = () => {
  const [batchNo, setBatchNo] = useState([]);
  const [reason, setReason] = useState(false);
  const [formParams, setFormParams] = useState({
    subBatchNo: "",
    printSubBatchNo: "",
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
          `${    API.prodUrl}/Precot/api/bleaching/generation/fetchBatchNumbers`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        setBatchNo(response.data);
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
            `${    API.prodUrl}/Precot/api/chemicaltest/ARF002/GETALL`,
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
      title: "Sub Batch No",
      dataIndex: "sub_batch_no",
      key: "sub_batch_no",
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
    if (formParams.subBatchNo == "") {
      message.warning("Please Select The Sub Batch");
      return;
    }

    navigate("/Precot/QualityControl/AR-F-002", {
      state: {
        subbatch: formParams.subBatchNo,
      },
    });
  };

  const handleEdit = (record) => {
    navigate("/Precot/QualityControl/AR-F-002", {
      state: {
        subbatch: record.sub_batch_no,
      },
    });
  };

  const handlePrint = async () => {
    if (formParams.printSubBatchNo == "") {
      message.warning("Please Select SubBatch No");
      return;
    }

    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${    API.prodUrl}/Precot/api/chemicaltest/ARF002/print/${formParams.printSubBatchNo}`,
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
                ABSORBENT BLEACHED COTTON ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-002</td>
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
              <td style={{ padding: "0.5em" }}>01 of 03</td>
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
                Sub. Batch No.: {printData.sub_batch_no}{" "}
              </td>
              <td style={{ textAlign: "left" }} rowSpan={2} colSpan={2}>
                Internal/ Export: {printData.internal_export}{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>
                BMR No.: {printData.bmr_no}{" "}
              </td>
              <td style={{ textAlign: "left" }}>
                A.R. No.: {printData.ar_no}{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }} colSpan={2}>
                Sampling Date: {formatDate(printData.samplingDate)}{" "}
              </td>
              <td style={{ textAlign: "left" }} colSpan={2}>
                Finishing: {printData.finishing}{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }} colSpan={2}>
                Tested Date: {formatDate(printData.tested_Date)}{" "}
              </td>
              <td style={{ textAlign: "left" }} colSpan={2}>
                Mixing.: {printData.mixing}{" "}
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "center" }}>Parameter Tested</td>
              <td style={{ textAlign: "center" }}>Specification</td>
              <td style={{ textAlign: "center" }}>Observation</td>
              <td style={{ textAlign: "center" }}>Remark</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                1.Description
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Absorbent Cotton Product
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.descriptionObr
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.descriptionremark
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                2. Identification Test (Under Microscope)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Each fiber consist of single cell, in the form of flattened tube
                with thick round walls and often twisted.
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.identificationObr
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.identificationrmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                3. Fibre Average Length (mm) (manual)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>Min.10</td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.fibre_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.fibre_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                4. Acidity / Alkalinity (pH)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>6 to 8</td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.acid_obs : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.ACID_RMK : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                5. Surface Activity Substances (S.A)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Any foam present must not cover the entire surface of the
                liquid.
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.surface_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.surface_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                6. Foreign Fibers (Under Microscope)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Occasionally a few isolated foreign fibers may be present.
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.Foreign_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.Foreign_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                7. Fluorescence (Under UV){" "}
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>
                No intense blue fluorescence. Few isolated fibers passable
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.Fluorescence_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.Fluorescence_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>8.Neps</td>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Max. 5 ( 2.5 mm in diameter)/ gram
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.Neps_obs : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.Neps_rmk : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                9. Neps count/gram.
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>Max. 2500</td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.Neps_count_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.Neps_count_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Upper Quartile Length.mm by Wt. UQL (w){" "}
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>Min.12</td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.UQL_w_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.UQL_w_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Length by number. mm L(n)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>Min. 7</td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.Ln_obs : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.Ln_rmk : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Length by weight. mm L (w)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>Min.10 </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.Lw_obs : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.Lw_rmk : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Short fiber Content. by number % SFC(n)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>Max. 90</td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.SFC_n_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.SFC_n_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Short fiber Content. by wt. % SFC(w)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>Max.80</td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.SFC_w_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.SFC_w_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                10. Micronaire Value. µg/inch{" "}
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>Min. 2.8</td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.Micronaire_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.Micronaire_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                11. Whiteness Indices (Berger 10deg/D65){" "}
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>Min. 80</td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.Whiteness_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.Whiteness_rmk
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                12. Extractable Colouring Matters{" "}
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Alcohol extract may be slightly yellowish but not blue or green.
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.Extractable_obs
                  : ""}
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.Extractable_rmk
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
                ABSORBENT BLEACHED COTTON ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-002</td>
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
              <td style={{ padding: "0.5em" }}>02 of 03</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "15px" }}></td>
            </tr>
          </table>
          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td style={{ textAlign: "center" }}>Parameter Tested</td>
              <td style={{ textAlign: "center" }}>Specification</td>
              <td style={{ textAlign: "center" }} colSpan={4}>
                Observation
              </td>
              <td style={{ textAlign: "center" }} colSpan={2}>
                Remark
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                13. Absorbency
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>Sample</td>
              <td style={{ textAlign: "center", padding: "5px" }}>1</td>
              <td style={{ textAlign: "center", padding: "5px" }}>2</td>
              <td style={{ textAlign: "center", padding: "5px" }}>3</td>
              <td style={{ textAlign: "center", padding: "5px" }}>Avg.</td>
              <td
                style={{ textAlign: "center", padding: "5px" }}
                colSpan={2}
              ></td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Sinking time (sec.)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Max. 8.0 For BP,USP, EP Max. 10
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.abs_1 : ""}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.abs_2 : ""}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.abs_3 : ""}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.abs_avg : ""}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }} colSpan={2}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.remark_a : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Absorbption Capacity/ W.H.C (g/g)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }}>
                Min.24.0 For JP Min.20 & BP,EP Min.23{" "}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.abs_4 : ""}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.abs_5 : ""}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.abs_6 : ""}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.abs_avg_2
                  : ""}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }} colSpan={2}>
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.remark_b : ""}
              </td>
            </tr>
          </table>
          <table style={{ tableLayout: "fixed" }}>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} rowSpan={4}>
                14. Sulphated Ash (%) RESULT = [(B-A) x100]/ 5 A= Crucible
                Wt.(g) B= Crucible Wt.with 5 g. sample's Ash Content.(g)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} rowSpan={4}>
                Max. 0.20 For JP Max. 0.25 total ash & BP,EP Max. 0.40
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Final Wt.(g)-B
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.sulphatedFlWtObr
                  : ""}
              </td>
              <td
                style={{ textAlign: "center", padding: "5px" }}
                rowSpan={4}
                colSpan={2}
              >
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.remark_c : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Initial Wt.(g)-A
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.sulphatedIlWtObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>B-A</td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.sulphatedBaObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>
                RESULTS(%){" "}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.sulphatedResObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} rowSpan={4}>
                15. Water Soluble Substances % RESULT = [(N-M) x100]/5 M= Beaker
                Wt.(g) N= Beaker Wt.with 5 g. sample's Water Soluble extract.
                (g)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} rowSpan={4}>
                Max. 0.28 For USP Max. 0.35 & BP, EP Max.0.50
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Final Wt.(g)-N
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.WatersolubleFlWtObr
                  : ""}
              </td>
              <td
                style={{ textAlign: "center", padding: "5px" }}
                rowSpan={4}
                colSpan={2}
              >
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.remark_d : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Initial Wt.(g)-M
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.WatersolubleIlWtObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>N-M</td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.WatersolubleNmObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>
                RESULTS(%){" "}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.WatersolubleResObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} rowSpan={4}>
                16. Ether Soluble Substances % RESULT = [(Y-X) x100]/ 5 X= Flask
                Wt.(g) Y= Flask Wt.with 5 g. sample's Ether Soluble extract.(g)
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} rowSpan={4}>
                Max.0.50 For USP Max. 0.70{" "}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Final Wt.(g)-Y
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.EthersolubleFlWtObr
                  : ""}
              </td>
              <td
                style={{ textAlign: "center", padding: "5px" }}
                rowSpan={4}
                colSpan={2}
              >
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.remark_e : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Initial Wt.(g)-X
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.EthersolubleIlWtObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>Y-X</td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.EthersolubleYxObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>
                RESULTS(%){" "}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.EthersolubleResObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }} rowSpan={4}>
                17. Loss on drying (%) /Moisture content (%) RESULT =[(K-L)
                x100]/K, K= Cotton Wt.(g) before dry. L= Cotton Wt.(g) after
                dry.
              </td>
              <td style={{ textAlign: "left", padding: "5px" }} rowSpan={4}>
                Max.8.0
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Initial Wt.(g)-K
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.LossondryingIlWtObr
                  : ""}
              </td>
              <td
                style={{ textAlign: "center", padding: "5px" }}
                rowSpan={4}
                colSpan={2}
              >
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.remark_f : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>
                Final Wt.(g)-L
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.LossondryingFlWtObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>K-L</td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.LossondryingKlObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>
                RESULTS(%){" "}
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.LossondryingResObr
                  : ""}
              </td>
            </tr>
            <tr>
              <td colSpan={6} style={{ padding: "5px" }}>
                Remark(s):{" "}
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.final_remark
                  : ""}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={6} style={{ padding: "5px" }}>
                Note: Parameter No.-9,10 & 11 are for information purpose
                only.Abbreviation: Max-Maximum, Min-Minimum, mm-millimeter,
                Wt-weight, g-gram,sec-Seconds, µg/in-Microgram per inch,
                Avg.-Average, JP - Japanish Pharmacopoeia,BP-British
                Pharmacopoeia, EP - European Pharmacopoeia, US-United States
                Pharmacopoeia.A.R. No-Analytical Reference Number.{" "}
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
                ABSORBENT BLEACHED COTTON ANALYSIS REPORT
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01-AR-F-002</td>
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
              <td style={{ padding: "10px", width: "50%" }}>
                Product:{" "}
                {printData.qaqc?.length > 0 ? printData?.qaqc[0]?.product : ""}{" "}
              </td>
              <td style={{ padding: "10px", width: "50%" }}>
                Material Passes for the Pharmacopoeia:{" "}
                {printData.qaqc?.length > 0
                  ? printData?.qaqc[0]?.materila_passes
                  : ""}{" "}
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
                {printData.micro?.length > 0 &&
                printData?.micro[0]?.sampled_on !== ""
                  ? formatDate(printData?.micro[0]?.sampled_on)
                  : "NA"}
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
                {printData.micro?.length > 0 &&
                printData?.micro[0]?.tested !== ""
                  ? formatDate(printData?.micro[0]?.tested)
                  : "NA"}
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
                {printData.micro?.length > 0
                  ? printData?.micro[0]?.tf_viable_count
                  : "NA"}
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
                {printData.micro?.length > 0
                  ? printData?.micro[0]?.tf_count
                  : "NA"}
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
                {printData.micro?.length > 0
                  ? printData?.micro[0]?.p_field_a
                  : "NA"}
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
                {printData.micro?.length > 0
                  ? printData?.micro[0]?.p_field_b
                  : "NA"}
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
                {printData.micro?.length > 0
                  ? printData?.micro[0]?.p_field_c
                  : "NA"}
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
                {printData.micro?.length > 0
                  ? printData?.micro[0]?.p_field_d
                  : "NA"}
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
                {printData.micro?.length > 0
                  ? printData?.micro[0]?.p_field_e
                  : "NA"}
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
                {printData.micro?.length > 0
                  ? printData?.micro[0]?.moisture
                  : "NA"}
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
                {printData.micro?.length > 0 &&
                printData?.micro[0]?.completion_date !== ""
                  ? formatDate(printData?.micro[0]?.completion_date)
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
                {printData.micro?.length > 0
                  ? printData?.micro[0]?.remarks
                  : "NA"}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                Product:{" "}
                {printData.micro?.length > 0
                  ? printData?.micro[0]?.product
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
        formName={"ABSORBENT BLEACHED COTTON ANALYSIS REPORT"}
        formatNo={"PH-QCL01-AR-F-002"}
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
            Sub Batch No :
          </div>
          <Select
            style={{ width: "200px", textAlign: "center" }}
            showSearch
            options={batchNo}
            value={formParams.subBatchNo}
            onChange={(e) => {
              handleFormParams(e, "subBatchNo");
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
          title="ABSORBENT BLEACHED COTTON ANALYSIS REPORT (Print)"
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
          <label> Sub Batch No : </label>
          <Select
            style={{ width: "200px", textAlign: "center" }}
            showSearch
            options={batchNo}
            value={formParams.printSubBatchNo}
            onChange={(e) => {
              handleFormParams(e, "printSubBatchNo");
            }}
            dropdownStyle={{ textAlign: "center" }}
          ></Select>
        </Modal>
      </div>
    </div>
  );
};

export default QualityControl_AR_f02_Summary;
