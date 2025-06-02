/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  DatePicker,
  Select,
  Input,
  Form,
  Col,
  Drawer,
  Row,
  Menu,
  Avatar,
  message,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BiLock } from "react-icons/bi";
// import Spunlace_f25_edit from "./Spunlace_f25_edit";
import BleachingHeader from "../Components/BleachingHeader.js";
import { createGlobalStyle } from "styled-components";
import axios from "axios";
import { IoSave, IoPrint, IoCreate } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { Tooltip } from "antd";
import { MdLockOutline } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { BiEdit, BiNavigation } from "react-icons/bi";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import { jwtDecode } from "jwt-decode";
import logo from "../Assests/logo.png";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import API from "../baseUrl.json";
import moment from "moment";
const { Option } = Select;

const QC_f04_Summary = () => {
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
      // transform-origin: top right; /* Adjust the origin if needed */
      // transform-origin: bottom top ;
      transform-origin: bottom top;
      // transform-origin: top left;

    }
  }
`;

  const token = localStorage.getItem("token");
  const [selectedRow, setSelectedRow] = useState(null);
  console.log("selected row", selectedRow);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [BMROptions, setBMROptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [bmr, setBmr] = useState("");
  const [getImage, setGetImage] = useState("");
  const [tableData, setTableData] = useState([]);
  const [bmrPrint, setBMRPrint] = useState("");
  const [cakingData, setCakingData] = useState([]);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.[0]?.details?.forEach((item, index) => {
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
            setGetImage1((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          })
          .finally(() => {
            if (index === printResponseData.length - 1) {
            }
          });
      }
    });
  }, [printResponseData,      API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    printResponseData?.[0]?.details.forEach((item, index) => {
      const username = printResponseData[0]?.manager_sign;
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
            setGetImage2((prevImages) => ({
              ...prevImages,
              [index]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          })
          .finally(() => {
            if (index === printResponseData.length - 1) {
            }
          });
      }
    });
  }, [printResponseData,      API.prodUrl, token]);

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDatewithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const handlePrint = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      let apiUrl = "";
      if (role === "ROLE_CHEMIST") {
        apiUrl = `${    API.prodUrl}/Precot/api/qc/RawCottonConsolidatedF004/GetAll`;
      } else if (role === "QA_MANAGER" || role === "QC_MANAGER") {
        apiUrl = `${    API.prodUrl}/Precot/api/qc/RawCottonConsolidatedF004/getAllQcNotSubmitted`;
      } else {
        throw new Error("Role not found in localStorage.");
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (
        role === "ROLE_CHEMIST" ||
        role === "QA_MANAGER" ||
        role === "QC_MANAGER"
      ) {
        setCakingData(data);
      }
      if (data && data.length >= 0) {
        setTableData(
          data.map((item, index) => ({
            key: item.header_id,
            year: item.year,
            bleachingBmrNo: item.bleachingBmrNo,
            chemist_status: item.chemist_status,
            manager_status: item.manager_status,
            id: item.id,
            reason: item.reason,
            sno: index + 1,
          }))
        );
      } else {
        message.error(data.message);
        setTimeout(() => {
          navigate("/Precot/choosenScreen");
        }, 1500);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.data.message);
    } finally {
    }
  };

  const handleBMRPrintChange = (value) => {
    setBMRPrint(value);
  };

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // bmr list
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .get(`${    API.prodUrl}/Precot/api/qc/RawCottonConsolidatedF004/bmrNoList`, {
        headers,
      })
      .then((response) => {
        setBMROptions(response.data);
      })
      .catch(() => {});
  }, []);

  const handleGoToChange = () => {
    if (bmr == "" || bmr == null) {
      message.warning("Please Select BMR No");
      return;
    }
    navigate("/Precot/QC/F-04", {
      state: {
        bmr: bmr,
      },
    });
  };

  const handleEdit = (record) => {
    const { bleachingBmrNo } = record;
    navigate("/Precot/QC/F-04", {
      state: {
        bmr: bleachingBmrNo,
      },
    });
  };

  const handleBMRChange = (value) => {
    setBmr(value);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setBMRPrint(null);
  };

  const printSubmit = () => {
    if (bmrPrint == "" || bmrPrint == null) {
      message.warning("Please Select BMR Number");
      return;
    }
    fetchPrintValue();
  };
  useEffect(() => {
    if (printResponseData?.length > 0) {
      setTimeout(() => {
        window.print();
        handleModalClose();
      }, 2000);
    }
  }, [printResponseData]);
  const fetchPrintValue = () => {
    try {
      axios
        .get(
          `${    API.prodUrl}/Precot/api/qc/RawCottonConsolidatedF004/GetReportForPrint?bleachingBmrNo=${bmrPrint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (Array.isArray(res.data)) {
            const printResponseData = res.data;
            setPrintResponseData(printResponseData);
          } else {
            message.error("No Data");
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const baseColumns = [
    {
      title: "S.No",
      key: "serial",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "BMR Number",
      dataIndex: "bleachingBmrNo",
      key: "bleachingBmrNo",
      align: "center",
    },
    {
      title: "Chemist Status",
      dataIndex: "chemist_status",
      key: "chemist_status",
      align: "center",
    },
    {
      title: "QA Manager/ QC Manager Status",
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
    columns = [...baseColumns.slice(0, 4), Reason, ...baseColumns.slice(4)];
  } else {
    columns = baseColumns;
  }
  useEffect(
    () => {
      const findReason = () => {
        for (const data of cakingData) {
          if (
            data.manager_status === "QA_REJECTED" ||
            data.manager_status === "QC_REJECTED"
          ) {
            setReason(true);
            break;
          }
        }
      };
      findReason();
    },
    [cakingData]
    // []
  );

  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        <table
          style={{
            width: "90%",
            borderCollapse: "collapse",
            marginTop: "20px",
            // tableLayout: "fixed"
          }}
        >
          <thead>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="90"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="90"></td>
            </tr>
            <tr>
              <th
                colSpan="15"
                rowSpan="4"
                style={{ height: "80px", textAlign: "center" }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "100px", height: "auto" }}
                />
                <br />
                <br />
                Unit H
              </th>
              <th
                colSpan="43"
                rowSpan="4"
                style={{ textAlign: "center", height: "80px" }}
              >
                RAW COTTON CONSOLIDATED ANALYTICAL REPORT
              </th>
              <th colSpan="10" style={{ border: "1px solid black" }}>
                Format No.:
              </th>
              <td colSpan="22" style={{ border: "1px solid black" }}>
                PH-QCL01/F-004
              </td>
            </tr>
            <tr>
              <th colSpan="10" style={{ border: "1px solid black" }}>
                Revision No.:
              </th>
              <td colSpan="22" style={{ border: "1px solid black" }}>
                02
              </td>
            </tr>
            <tr>
              <th colSpan="10" style={{ border: "1px solid black" }}>
                Ref.SOP No.:
              </th>
              <td colSpan="22" style={{ border: "1px solid black" }}>
                PH-QCL01-D-05
              </td>
            </tr>
            <tr>
              <th colSpan="10" style={{ border: "1px solid black" }}>
                Page No.:
              </th>
              <td colSpan="22" style={{ border: "1px solid black" }}>
                {1} of {printResponseData?.length}
              </td>
            </tr>
            <tr>
              <td colSpan="90" style={{ border: "none", height: "10px" }}></td>
              <br></br>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th
                colSpan="90"
                style={{ height: "20px", border: "1px solid black" }}
              >
                BMR Number: {bmrPrint}
              </th>
            </tr>

            <tr>
              <th
                colSpan="30"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {" "}
                Specification
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                No Intense Blue Fluorescence Spots
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                CN min.20, VC min.25
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                CN(2.8-4.5), VC (3.5-8.0),CN2: min.10
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                VC:max.700, CN: max.1000,
                <br /> CN2:max.5000
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                CN (12-21), VC( Long (12-21),
                <br />
                Medium(25-39), Short(13-20)),
                <br /> CN-2: min 10
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                VC: min.15, CN: min 10, CN2: min 8
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                VC: min.13, CN: min 7, CN2: min 6
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                VC:max.25, CN: max.85, CN2:max.85
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                VC:max.45, CN: max.90, CN2:max.90
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                VC & CN: max.1.50, CN2: max.0.50
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                VC ,CN,CN2: max. 0.75
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                VC ,CN,CN2: max. 8.0
              </th>
              <th
                colSpan="3"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                CN: max.0.6, VC :max. 3.5 , CN2:NA
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Remarks
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Reported by (Chemist)
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  transform: "rotate(180deg)",
                  writingMode: "vertical-rl",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Approved by
              </th>
            </tr>
            <tr>
              <th colSpan="3">AR. No</th>
              <th colSpan="3">Date of Receipt</th>
              <th colSpan="3">Tested Date</th>
              <th colSpan="3">MB NO</th>
              <th colSpan="3">Supplier</th>
              <th colSpan="3">Station</th>
              <th colSpan="3">Verity</th>
              <th colSpan="3">Invoice No.</th>
              <th colSpan="3">No. Bales</th>
              <th colSpan="3">Quantity Kg</th>
              <th colSpan="3">
                Fluore
                <br />
                scence
              </th>
              <th colSpan="3">
                White <br /> ness
                <br />
                (Berger <br />
                10 deg /D65)
              </th>
              <th colSpan="3">
                Micro
                <br />
                naire µg/in
              </th>
              <th colSpan="3">
                Neps count
                <br />
                /gm
              </th>
              <th colSpan="3">
                UQL in
                <br /> mm
              </th>
              <th colSpan="3">
                L(w)
                <br />
                mm
              </th>
              <th colSpan="3">L(n) mm</th>
              <th colSpan="3">SFC (w) (%)</th>
              <th colSpan="3">SFC(n)(%)</th>
              <th colSpan="3">Ash (%)</th>
              <th colSpan="3">E.S.S. Ext. x(%)</th>
              <th colSpan="3">
                Moisture
                <br /> (%)
              </th>
              <th colSpan="3">
                Trash
                <br />
                (%)
              </th>
            </tr>
            {printResponseData?.[0]?.details?.map((detail, index) => (
              <tr key={index}>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.arNo}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {formattedDate(detail.dateOfReceipt)}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {formattedDate(detail.testedDate)}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.mbNo}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.supplier}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.station}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.verity}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.invoiceNo}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.noOfBale}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.quantity}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.flourescence}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.whiteness}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.micronaire}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.nepsCount}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.uql}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.lengthByWeightMm}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.lengthByNoMm}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.sfc_w}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.sfc_n}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.ash}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.ess_ext}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.moisture}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.trash}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {detail.remark}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {printResponseData?.[0]?.chemist_sign}
                  <br />
                  {formattedDatewithTime(
                    printResponseData?.[0]?.chemist_submit_on
                  )}
                  <br />
                  {getImage1[index] && (
                    <img
                      src={getImage1[index]}
                      alt="chemist Sign"
                      style={{
                        width: "60px",
                        height: "60px",
                        marginLeft: "20px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        justifyContent: "center",
                        transform: "rotate(90deg)",
                        writingMode: "vertical-rl",
                      }}
                    />
                  )}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {printResponseData?.[0]?.manager_sign}
                  <br />
                  {formattedDatewithTime(
                    printResponseData?.[0]?.manager_submit_on
                  )}
                  <br />
                  {getImage2[index] && (
                    <img
                      src={getImage2[index]}
                      alt="Manager Sign"
                      style={{
                        width: "60px",
                        height: "60px",
                        marginLeft: "20px",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        justifyContent: "center",
                        transform: "rotate(90deg)",
                        writingMode: "vertical-rl",
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="90"
                style={{ border: "1px solid black", border: "none" }}
              ></td>
            </tr>
            <tr>
              <th
                colSpan="15"
                style={{ textAlign: "center", border: "1px solid black" }}
              >
                Particulars
              </th>
              <th
                colSpan="30"
                style={{ textAlign: "center", border: "1px solid black" }}
              >
                Prepared by
              </th>
              <th
                colSpan="20"
                style={{ textAlign: "center", border: "1px solid black" }}
              >
                Reviewed by
              </th>
              <th
                colSpan="25"
                style={{ textAlign: "center", border: "1px solid black" }}
              >
                Approved by
              </th>
            </tr>
            <tr>
              <th colSpan="15" style={{ border: "1px solid black" }}>
                Name
              </th>
              <td colSpan="30" style={{ border: "1px solid black" }}></td>
              <td colSpan="20" style={{ border: "1px solid black" }}></td>
              <td colSpan="25" style={{ border: "1px solid black" }}></td>
            </tr>
            <tr>
              <th colSpan="15" style={{ border: "1px solid black" }}>
                Signature & Date
              </th>
              <td colSpan="30" style={{ border: "1px solid black" }}></td>
              <td colSpan="20" style={{ border: "1px solid black" }}></td>
              <td colSpan="25" style={{ border: "1px solid black" }}></td>
            </tr>
          </tfoot>
        </table>
      </div>
      {contextHolder}

      <BleachingHeader
        unit="Unit-H"
        formName="RAW COTTON CONSOLIDATED ANALYTICAL REPORT"
        formatNo="PH-QCL01/F-004"
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
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={() => navigate("/Precot/choosenScreen")}
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
              if (confirm("You Want to logged out")) {
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
          <PrecotSidebar
            open={open}
            onClose={onClose}
            role={localStorage.getItem("role")}
          />,
        ]}
      />

      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <span> Select BMR No :</span>
        <Select
          placeholder="Select BMR"
          value={bmr}
          showSearch
          onChange={handleBMRChange}
          style={{ width: 120, fontWeight: "bold" }}
        >
          {BMROptions.map((bmr) => (
            <Option key={bmr.id} value={bmr.value}>
              {bmr.value}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            marginLeft: "20px",
          }}
          shape="round"
          icon={<BiNavigation color="#00308F" />}
          onClick={handleGoToChange}
        >
          Go To
        </Button>
      </div>

      <Table
        bordered
        style={{ textAlign: "center" }}
        columns={columns}
        dataSource={tableData}
      />

      <Modal
        title="Edit Form"
        visible={newModal}
        onCancel={() => setNewModal(false)}
        width="100vw"
      >
        {/* <Spunlace_f25_edit data={modalData} status={newStatus} /> */}
      </Modal>
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        destroyOnClose={true}
        footer={[
          <Button key="submit" type="primary" onClick={printSubmit}>
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
          <label
            style={{ marginRight: "8px", width: "30%", textAlign: "center" }}
          >
            BMR number:
          </label>
          <Select
            placeholder="Select BMR Number"
            value={bmrPrint}
            onChange={handleBMRPrintChange}
            style={{ width: "50%", fontWeight: "bold" }}
          >
            {BMROptions.map((bmr) => (
              <Option key={bmr.id} value={bmr.value}>
                {bmr.value}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default QC_f04_Summary;
