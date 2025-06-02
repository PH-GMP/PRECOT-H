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

const QualityControl_f26A_Summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [reason, setReason] = useState(false);
  const [printParams, setPrintParams] = useState({
    customerName: "",
    productName: "",
  });
  const token = localStorage.getItem("token");
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState("");
  const [summaryData, setSummaryData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [formLov, setFormLov] = useState({
    customerLov: [],
    productLov: [],
    printProductLov: [],
  });
  const [formParams, setFormParams] = useState({
    customerName: "",
    productName: "",
  });
  const [eSign, setESign] = useState({
    chemist_sign: "",
    qa_exe_sign: "",
    manager_sign: "",
  });

  const initialized = useRef(false);

  useEffect(() => {
    const customerLovApi = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/QcForm/CustomerName`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const options = response.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        console.log(response.data, "Api Response");
        setFormLov((prevState) => ({
          ...prevState,
          customerLov: options,
        }));
      } catch (error) {
        console.error("Error fetching Job Order Options:", error);
      }
    };

    customerLovApi();
  }, [token]);

  const productLovApi = async (value, type) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QcForm/ProductName?customer=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Job Order Lov:", response.data);
      const options = response.data.map((option) => ({
        value: option.value,
        label: option.value,
      }));

      if (type == "Form") {
        console.log("Condition Entered");
        setFormLov((prevState) => ({
          ...prevState,
          productLov: options,
        }));
      }
    } catch (error) {
      console.error("Error fetching Job Order Options:", error);
    }
  };

  const productLovApiPrint = async (value, type) => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QcForm/ProductF26?customer=${value}&formNo=F26A`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Job Order Lov:", response.data);
      const options = response.data.map((option) => ({
        value: option.value,
        label: option.value,
      }));

      if (type == "print") {
        setFormLov((prevState) => ({
          ...prevState,
          printProductLov: options,
        }));
      }
    } catch (error) {
      console.error("Error fetching Job Order Options:", error);
    }
  };

  useEffect(() => {
    const signatureKeys = ["chemist_sign", "qa_exe_sign", "manager_sign"];
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
  }, [
    token,
    printData.chemist_sign,
    printData.qa_exe_sign,
    printData.manager_sign,
  ]);

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

  // --------------------------- Summary Get Api ------------------------------
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/QcForm/F26ACottonPadSummary`,
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
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      align: "center",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      align: "center",
    },
    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },
    {
      title: "QA Exe Status",
      dataIndex: "qa_exe_status",
      key: "qa_exe_status",
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

  const handleOk = () => {
    if (formParams.customerName == "") {
      message.warning("Please Select Customer");
      return;
    }
    if (formParams.productName == "") {
      message.warning("Please Select The Product");
      return;
    }
    navigate(`/Precot/QualityControl/F-026A`, {
      state: {
        customerName: formParams.customerName,
        productName: formParams.productName,
      },
    });
  };
  const handleEdit = (record) => {
    navigate(`/Precot/QualityControl/F-026A`, {
      state: {
        customerName: record.customer,
        productName: record.product,
      },
    });
  };

  const handleSelect = (e, name) => {
    if (name == "customerName") {
      productLovApi(e, "Form");
    }
    setFormParams((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };
  const handlePrintParams = (e, name) => {
    if (name == "customerName") {
      setPrintParams((prevState) => ({
        ...prevState,
        productName: "",
      }));
      productLovApiPrint(e, "print");
    }
    setPrintParams((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  const handlePrint = async () => {
    if (printParams.customerName == "") {
      message.warning("Please Choose The Customer");
      return;
    }
    if (printParams.productName == "") {
      message.warning("Please Choose The Product");
      return;
    }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QcForm/PrintApiF26A?product=${printParams.productName}&customer=${printParams.customerName}`,
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
      customerName: "",
      productName: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
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
    <>
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
      #section-to-print-san table th,
  #section-to-print-san table td {
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
                CERTIFICATE OF ANALYSIS FOR COTTON PADS
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01/F-026A</td>
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
              <td style={{ padding: "0.5em" }}>01 of 02</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
          </table>
          <table style={{ height: "100%" }}>
            <tr>
              <td colSpan={3}>Date </td>
              <td colSpan={3}>{formatDate(printData.date)}</td>
            </tr>
            <tr>
              <td colSpan={3}>Product </td>
              <td colSpan={3}>{printData.product}</td>
            </tr>
            <tr>
              <td colSpan={3}>Customer </td>
              <td colSpan={3}>{printData.customer}</td>
            </tr>
            <tr>
              <td colSpan={3}>Invoice No. </td>
              <td colSpan={3}>{printData.invoice_no}</td>
            </tr>
            <tr>
              <td colSpan={3}>Lot No. </td>
              <td colSpan={3}>{printData.lot_no}</td>
            </tr>
            <tr>
              <td colSpan={3}>Product Dimension </td>
              <td colSpan={3}>{printData.product_dimension}</td>
            </tr>
            <tr>
              <td colSpan={3}>Pattern </td>
              <td colSpan={3}>{printData.pattern}</td>
            </tr>
            <tr>
              <td colSpan={3}>Edge </td>
              <td colSpan={3}>{printData.edge}</td>
            </tr>
            <tr>
              <th style={{ textAlign: "center" }}> S.No</th>
              <th style={{ textAlign: "center" }}> Test Type </th>
              <th style={{ textAlign: "center" }}>Standard</th>
              <th style={{ textAlign: "center" }}>Specification/Tolerance</th>
              <th style={{ textAlign: "center" }}> Actual/ Observation </th>
              <th style={{ textAlign: "center" }}>Remark</th>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 1 </td>
              <td style={{ textAlign: "left" }}>GSM</td>
              <td style={{ textAlign: "center" }}>{printData.gsm_standard}</td>
              <td style={{ textAlign: "center" }}>± 10%</td>
              <td style={{ textAlign: "center" }}>{printData.gsm_actual}</td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.gsm_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 2 </td>
              <td style={{ textAlign: "left" }}>No. of pads per bag</td>
              <td style={{ textAlign: "center" }}>100</td>
              <td style={{ textAlign: "center" }}>-0 /+2 </td>
              <td style={{ textAlign: "center" }}>
                {printData.no_of_pad_actual}
              </td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.no_of_pad_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 3 </td>
              <td style={{ textAlign: "left" }}>
                Gross weight of the bag with pads (g)
              </td>
              <td style={{ textAlign: "center" }}>60</td>
              <td style={{ textAlign: "center" }}> ± 10 %</td>
              <td style={{ textAlign: "center" }}>
                {printData.gross_weight_actual}
              </td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.gross_weight_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 4 </td>
              <td style={{ textAlign: "left" }}>Packing Material</td>
              <td style={{ textAlign: "center" }} colSpan={4}>
                {" "}
                {printData.packing_material}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 5 </td>
              <td style={{ textAlign: "left" }}>Fibre Identification</td>
              <td style={{ textAlign: "center" }}>EP</td>
              <td style={{ textAlign: "center" }}>100% Cotton</td>
              <td style={{ textAlign: "center" }}>{printData.fibre_actual}</td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.fibre_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 6 </td>
              <td style={{ textAlign: "left" }}>Surface active Substances</td>
              <td style={{ textAlign: "center" }}>EP</td>
              <td style={{ textAlign: "center" }}>
                Any Foam Present must not cover the entire surface of the liquid
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.surface_actual}
              </td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.surface_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 7 </td>
              <td style={{ textAlign: "left" }}>Sinking time in water (sec)</td>
              <td style={{ textAlign: "center" }}>EP</td>
              <td style={{ textAlign: "center" }}>{"<"} 10</td>
              <td style={{ textAlign: "center" }}>
                {printData.sinking_actual}
              </td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.sinking_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 8 </td>
              <td style={{ textAlign: "left" }}>Absorption Capacity (g/g)</td>
              <td style={{ textAlign: "center" }}>EP</td>
              <td style={{ textAlign: "center" }}> ≥ 23</td>
              <td style={{ textAlign: "center" }}>
                {printData.absorption_actual}
              </td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.absorption_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 9 </td>
              <td style={{ textAlign: "left" }}>
                Whiteness Index (Berger 10deg/D65)
              </td>
              <td style={{ textAlign: "center" }}>-</td>
              <td style={{ textAlign: "center" }}>≥ 80</td>
              <td style={{ textAlign: "center" }}>
                {printData.whiteness_actual}
              </td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.whiteness_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 10 </td>
              <td style={{ textAlign: "left" }}>pH</td>
              <td style={{ textAlign: "center" }}>EP</td>
              <td style={{ textAlign: "center" }}> 6 - 8</td>
              <td style={{ textAlign: "center" }}>{printData.ph_actual}</td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.ph_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 11 </td>
              <td style={{ textAlign: "left" }}>Loss on drying (% )</td>
              <td style={{ textAlign: "center" }}>EP</td>
              <td style={{ textAlign: "center" }}> {"<"}8.0</td>
              <td style={{ textAlign: "center" }}>{printData.loss_actual}</td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.loss_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 12 </td>
              <td style={{ textAlign: "left" }}>Fluorescence</td>
              <td style={{ textAlign: "center" }}>EP</td>
              <td style={{ textAlign: "center" }}>
                No intense blue fluorescence . Few isolated fibers passable
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.fluorescence_actual}
              </td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.fluorescence_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 13 </td>
              <td style={{ textAlign: "left" }}>Water Soluble Substance (%)</td>
              <td style={{ textAlign: "center" }}>EP</td>
              <td style={{ textAlign: "center" }}>{"<"}0.50</td>
              <td style={{ textAlign: "center" }}>{printData.water_actual}</td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.water_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 14 </td>
              <td style={{ textAlign: "left" }}>Ether Soluble Substance (%)</td>
              <td style={{ textAlign: "center" }}>EP</td>
              <td style={{ textAlign: "center" }}> {"<"}0.50</td>
              <td style={{ textAlign: "center" }}>{printData.ether_actual}</td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.ether_remarks}
              </td>
            </tr>
          </table>
          <table>
            <thead>
              <tr>
                <td style={{ border: "none", padding: "10px" }}></td>
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
                CERTIFICATE OF ANALYSIS FOR COTTON PADS
              </td>
              <td style={{ padding: "0.5em" }}>Format No.:</td>
              <td style={{ padding: "0.5em" }}>PH-QCL01/F-026A</td>
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
              <td style={{ padding: "0.5em" }}>02 of 02</td>
            </tr>
            <tr>
              <td style={{ border: "none", padding: "10px" }}></td>
            </tr>
          </table>
          <table style={{ height: "100%" }}>
            <tr>
              <th style={{ textAlign: "center" }}> S.No</th>
              <th style={{ textAlign: "center" }}> Test Type </th>
              <th style={{ textAlign: "center" }}>Standard</th>
              <th style={{ textAlign: "center" }}>Specification/Tolerance</th>
              <th style={{ textAlign: "center" }}> Actual/ Observation </th>
              <th style={{ textAlign: "center" }}>Remark</th>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 15 </td>
              <td style={{ textAlign: "left" }}>Sulphated ash (%)</td>
              <td style={{ textAlign: "center" }}> EP</td>
              <td style={{ textAlign: "center" }}> {"<"} 0.40 </td>
              <td style={{ textAlign: "center" }}>
                {printData.sulphated_actual}
              </td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.sulphated_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 16 </td>
              <td style={{ textAlign: "left" }}>Total viable count (cfu/g)</td>
              <td style={{ textAlign: "center" }}>
                {printData.total_viable_standard}
              </td>
              <td style={{ textAlign: "center" }}>{"<"} 1000</td>
              <td style={{ textAlign: "center" }}>
                {printData.total_viable_actual}
              </td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.total_viable_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 17 </td>
              <td style={{ textAlign: "left" }}>Total fungal count (cfu/g)</td>
              <td style={{ textAlign: "center" }}>
                {printData.total_fungal_standard}
              </td>
              <td style={{ textAlign: "center" }}>{"<"} 100</td>
              <td style={{ textAlign: "center" }}>
                {printData.total_vfungal_actual}
              </td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.total_fungal_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 18 </td>
              <td style={{ textAlign: "left" }}>Pathogen (cfu/g)</td>
              <td style={{ textAlign: "center" }}>
                {printData.pathogen_standard}
              </td>
              <td style={{ textAlign: "center" }}>Absent</td>
              <td style={{ textAlign: "center" }}>
                {printData.pathogen_actual}
              </td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.pathogen_remarks}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}> 19 </td>
              <td style={{ textAlign: "left" }}>Odor</td>
              <td style={{ textAlign: "center" }}>-</td>
              <td style={{ textAlign: "center" }}> Odorless</td>
              <td style={{ textAlign: "center" }}>{printData.odor_actual}</td>
              <td style={{ textAlign: "center", padding: "0px" }}>
                {printData.odor_remarks}
              </td>
            </tr>
            <tr>
              <td colSpan={6}>
                Note: For product testing " Edana" and "Pharmacopoeia standards"
                are followed.
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
                colSpan={2}
              >
                Prepared By.
              </td>
              <td
                style={{
                  width: "30%",
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
                colSpan={2}
              >
                Verified By.
              </td>
              <td
                style={{
                  width: "30%",
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
                colSpan={2}
              >
                Approved By.
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
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
                colspan="2"
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
                colSpan={2}
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
                <td style={{ border: "none", padding: "10px" }}></td>
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
        formName={"CERTIFICATE OF ANALYSIS FOR COTTON PADS"}
        formatNo={"PH-QCL01/F-026A"}
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
        title="COA FOR COTTON PADS (Print)"
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
        <label> Customer &nbsp;&nbsp;&nbsp;&nbsp; : </label>
        <br />
        <Select
          options={formLov.customerLov}
          value={printParams.customerName}
          onChange={(e) => {
            handlePrintParams(e, "customerName");
          }}
          showSearch
          style={{
            width: "300px",
            marginLeft: 10,
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        />
        <br></br>
        <br></br>
        <label>
          Product &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
        </label>
        <br />
        <Select
          options={formLov.printProductLov}
          value={printParams.productName}
          onChange={(e) => {
            handlePrintParams(e, "productName");
          }}
          style={{
            width: "300px",
            marginLeft: 10,
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        />
      </Modal>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <label style={{ marginTop: "8px" }}>Customer : </label>
        <Select
          options={formLov.customerLov}
          style={{ width: "400px", textAlign: "center" }}
          value={formParams.customerName}
          onChange={(e) => {
            handleSelect(e, "customerName");
          }}
          dropdownStyle={{ textAlign: "center" }}
          showSearch
        ></Select>
        <label style={{ marginTop: "8px" }}>Product : </label>
        <Select
          options={formLov.productLov}
          style={{ width: "250px", textAlign: "center" }}
          value={formParams.productName}
          onChange={(e) => {
            handleSelect(e, "productName");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSelect(e.target.value, "productName");
            }
          }}
          dropdownStyle={{ textAlign: "center" }}
          showSearch
          filterOption={false}
        ></Select>
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

export default QualityControl_f26A_Summary;
