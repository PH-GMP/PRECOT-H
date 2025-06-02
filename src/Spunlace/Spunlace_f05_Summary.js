/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Menu,
  Row,
  Select,
  Table,
  Tooltip,
  message,
  Input,
  Modal,
} from "antd";
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
import { responsiveArray } from "antd/es/_util/responsiveObserver.js";

const Spunlace_f05_summary = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalPrint, setIsModalPrint] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const initialized = useRef(false);
  const [jobOrderLov, setJobOrderLov] = useState("");
  const [jobOrderLov2, setJobOrderLov2] = useState("");
  const [formParams, setFormParams] = useState({
    date: "",
    shift: "",
    orderNo: "",
  });
  const [eSign, setESign] = useState({
    operator_sign: "",
    supervisor_sign: "",
    hod_sign: "",
  });
  const [reason, setReason] = useState(false);
  const [shift, SelectedShift] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [printParams, setPrintParams] = useState({
    printDate: "",
    printOrderNo: "",
    printShift: "",
  });
  const [summaryData, setSummaryData] = useState([]);
  const [printButtonLoading, setPrintButtonLoading] = useState(false);
  const [printData, setPrintData] = useState("");
  const initial = useRef(false);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      if (
        userRole !== "ROLE_OPERATOR" &&
        userRole !== "ROLE_SUPERVISOR" &&
        userRole !== "ROLE_HOD" &&
        userRole !== "ROLE_DESIGNEE"
      ) {
        message.warning(userRole + " does not have access to this form");
        navigate("/Precot/choosenScreen");
      }
    }
  }, [token]);

  useEffect(() => {
    const fetchDataOrderNumber = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/spulance/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log('Job Order Lov:', response.data);
        const options = response.data.map((option) => ({
          value: option.value,
          label: option.value,
        }));
        // console.log(response.data, "Api Response")
        setJobOrderLov(options);
        setJobOrderLov2(options);
      } catch (error) {
        console.error("Error fetching Job Order Options:", error);
      }
    };

    fetchDataOrderNumber();
  }, []);

  useEffect(() => {
    let auth = false;
    if (
      userRole == "ROLE_OPERATOR" ||
      userRole == "ROLE_SUPERVISOR" ||
      userRole == "ROLE_HOD" ||
      userRole == "ROLE_DESIGNEE"
    ) {
      auth = true;
    }
    if (!initialized.current && auth) {
      initialized.current = true;
      const fetchData = async () => {
        try {
          let response;
          let apiUrl;
          if (userRole == "ROLE_OPERATOR") {
            apiUrl = `${ API.prodUrl}/Precot/api/spulance/getOperatorSummeryF005`;
          } else if (
            userRole == "ROLE_SUPERVISOR" ||
            userRole == "ROLE_HOD" ||
            userRole == "ROLE_DESIGNEE"
          ) {
            apiUrl = `${ API.prodUrl}/Precot/api/spulance/getsupervisorHodSummeryF005`;
          }
          response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setSummaryData(response.data);
        } catch (error) {
          message.error(error.esponse.data.message);
        }
      };

      fetchData();
    }
  }, [userRole, token]);

  useEffect(() => {
    const findReason = () => {
      for (const data of summaryData) {
        if (
          data.supervisor_status == "SUPERVISOR_REJECTED" ||
          data.hod_status == "HOD_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [summaryData]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showPrintModal = () => {
    setIsModalPrint(true);
  };

  //---------------------------- Print Function ---------------------------

  useEffect(() => {
    if (Object.keys(printData).length > 0) {
      setTimeout(() => {
        window.print();
        setPrintButtonLoading(false);
      }, 2000);
    }
    setESign((prevState) => ({
      ...prevState,
      operator_sign: null,
      supervisor_sign: null,
      hod_sign: null,
    }));
  }, [printData]);

  const handlePrint = async () => {
    // console.log("Print date", printParams.printDate)
    if (printParams.printDate == "" || printParams.printDate == null) {
      message.warning("Please Select Date");
      return;
    }
    if (printParams.printOrderNo == "" || printParams.printOrderNo == null) {
      message.warning("Please Select Order No");
      return;
    }
    if (printParams.printShift == "" || printParams.printShift == null) {
      message.warning("Please Select Shift");
      return;
    }
    setPrintButtonLoading(true);
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/spulance/getWinderPrintDetailsF005?order_no=${printParams.printOrderNo}&date=${printParams.printDate}&shift=${printParams.printShift}`,
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

      // console.log('Data fetched:', response.data);

      setPrintData(response.data[0]);
    } catch (error) {
      // console.log(" error blocks")
      setPrintButtonLoading(false);
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = ["operator_sign", "supervisor_sign", "hod_sign"];
    signatureKeys.forEach((key) => {
      const username = printData[key];
      if (username) {
        // console.log("usernameparams", username);

        axios
          .get(
            `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              responseType: "arraybuffer",
            }
          )
          .then((res) => {
            // console.log("Response:", res.data);
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
            // console.log("Error in fetching image:", err);
          });
      }
    });
  }, [token, printData]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatPrintDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handlePrintCancel = () => {
    setPrintParams((prevState) => ({
      ...prevState,
      printDate: "",
      printOrderNo: "",
      printShift: "",
    }));
    setPrintButtonLoading(false);
    setIsModalPrint(false);
  };
  const handlePrintDate = (e) => {
    // console.log("Date", e.target.value)
    setPrintParams((prevState) => ({
      ...prevState,
      printDate: e.target.value,
    }));
  };
  const handlePrintOrder = (value) => {
    // console.log("Order", value)
    setPrintParams((prevState) => ({
      ...prevState,
      printOrderNo: value,
    }));
  };
  const handlePrintShift = (value) => {
    // console.log("Shift", value)
    setPrintParams((prevState) => ({
      ...prevState,
      printShift: value,
    }));
  };

  //------------------------------------------------------------------------

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  const handleEdit = (record) => {
    navigate(`/Precot/Spunlace/F-05`, {
      state: {
        orderNo: record.order_no,
        date: record.date,
        shift: record.shift,
      },
    });
  };
  const options = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];

  const handleDate = (e) => {
    setFormParams((prevState) => ({
      ...prevState,
      date: e.target.value,
    }));
  };
  const handleOrderNo = (value) => {
    setFormParams((prevState) => ({
      ...prevState,
      orderNo: value,
    }));
  };
  const handleShift = (selectedOption) => {
    setFormParams((prevState) => ({
      ...prevState,
      shift: selectedOption,
    }));
  };
  const handleOk = () => {
    if (formParams.date == "" || formParams.date == null) {
      message.warning("Please Select Date");
      return;
    } else if (formParams.shift == "" || formParams.shift == null) {
      message.warning("Please Select Shift");
      return;
    } else if (formParams.orderNo == "" || formParams.orderNo == null) {
      message.warning("Please Select Order No");
      return;
    }

    navigate(`/Precot/Spunlace/F-05`, {
      state: {
        date: formParams.date,
        shift: formParams.shift,
        orderNo: formParams.orderNo,
      },
    });
  };
  //   ----------------------------- Summary Table --------------------------
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
      title: "Order No",
      dataIndex: "order_no",
      key: "order_no",
      align: "center",
    },
    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
      align: "center",
    },
    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "Hod Status",
      dataIndex: "hod_status",
      key: "hod_status",
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
    columns = [...baseColumns.slice(0, 7), Reason, ...baseColumns.slice(7)];
  } else {
    columns = baseColumns;
  }

  // ---------------------------------------------------------------------------

  return (
    //id="section-to-print-san"
    <div>
      <div id="section-to-print-san" style={{ margin: "10px", scale: "87%" }}>
        <style>
          {`
      @media print {
        html, body {
    height: 100vh;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden;
  }
      }
    `}
        </style>
        <table>
          <thead>
            <tr>
              <th rowspan="4" style={{ textAlign: "center", width: "20%" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "100px",
                    height: "auto",
                    textAlign: "center",
                  }}
                />
                <br /> Unit H
              </th>
              <th rowspan="4" style={{ textAlign: "center" }}>
                Process Setup Details - Winder
              </th>
              <th style={{}}>Format No.:</th>
              <th style={{ border: "1px solid black" }}>PH-PRD02/F-005</th>
            </tr>
            <tr>
              <th style={{}}>Revision No.:</th>
              <th style={{ border: "1px solid black" }}>01</th>
            </tr>
            <tr>
              <th style={{}}>Ref.SOP No.:</th>
              <th style={{}}>PH-PRD02-D-03</th>
            </tr>
            <tr>
              <th style={{}}>Page No.:</th>
              <th style={{}}>01 of 01</th>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="10"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="10"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="10"></td>
            </tr>
          </thead>
        </table>
        <br></br>
        <table>
          <tbody style={{ height: "50vh" }}>
            <tr>
              <td style={{ height: "30px" }} colSpan={2}>
                Date
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                : {formatDate(printData.date)}
              </td>
              <td colSpan={2}>
                {" "}
                Shift
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                : {printData.shift}
              </td>
            </tr>
            <tr>
              <td style={{ height: "30px" }} colSpan={2}>
                Order No
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                .: {printData.order_no}
              </td>
              <td colSpan={2}>
                Mixing
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                {printData.mixing}{" "}
              </td>
            </tr>
            <tr>
              <td style={{ height: "30px" }} colSpan={2}>
                Product Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                {printData.product_name}
              </td>
              <td colSpan={2}>
                STD GSM
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                {printData.sdt_gsm}
              </td>
            </tr>
            <tr>
              <td style={{ height: "30px" }} colSpan={2}>
                Width in mm &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                {printData.width}
              </td>
              <td colSpan={2}>
                Pattern
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                : {printData.pattern}
              </td>
            </tr>
            <tr>
              <td style={{ height: "30px" }} colSpan={2}>
                Moisture in % &nbsp;&nbsp;&nbsp;&nbsp; : {printData.moisturt}{" "}
              </td>
              <td colSpan={2}>
                Thickness in mm &nbsp; : {printData.thickness}
              </td>
            </tr>
            <tr>
              <th style={{ textAlign: "center", height: "30px" }}>
                Descriptions
              </th>
              <th style={{ textAlign: "center" }}>Standards</th>
              <th style={{ textAlign: "center" }}>Units</th>
              <th style={{ textAlign: "center" }}>Set Parameters</th>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "30px" }}>
                LINE SPEED
              </td>
              <td style={{ textAlign: "center" }}> 18-80</td>
              <td style={{ textAlign: "center" }} rowspan="2">
                MPM
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.line_speed
                  ? Number(printData.line_speed).toFixed(2)
                  : printData.line_speed}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "30px" }}>
                S.ROLLER SPEED
              </td>
              <td style={{ textAlign: "center" }}> 18-80</td>
              <td style={{ textAlign: "center" }}>
                {printData.roller_speed
                  ? Number(printData.roller_speed).toFixed(2)
                  : printData.roller_speed}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "30px" }}>LINE DRAW</td>
              <td style={{ textAlign: "center" }}>-10 - +10</td>
              <td style={{ textAlign: "center" }}>%</td>
              <td style={{ textAlign: "center" }}>
                {printData.line_draw
                  ? Number(printData.line_draw).toFixed(1)
                  : printData.line_draw}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "30px" }}>
                GROUP SPEED
              </td>
              <td style={{ textAlign: "center" }}>18 - 80</td>
              <td style={{ textAlign: "center" }}>MPM</td>
              <td style={{ textAlign: "center" }}>
                {printData.group_speed
                  ? Number(printData.group_speed).toFixed(2)
                  : printData.group_speed}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "30px" }}>
                WIND-GRP DRAW
              </td>
              <td style={{ textAlign: "center" }}>1.0-4.0</td>
              <td style={{ textAlign: "center" }}>%</td>
              <td style={{ textAlign: "center" }}>
                {printData.wind_grp_draw
                  ? Number(printData.wind_grp_draw).toFixed(1)
                  : printData.wind_grp_draw}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "30px" }}>
                WINDING ARMS PRESSURE
              </td>
              <td style={{ textAlign: "center" }}>0.5 - 2.0</td>
              <td style={{ textAlign: "center" }}>BAR</td>
              <td style={{ textAlign: "center" }}>
                {printData.wind_arms_pressuer
                  ? Number(printData.wind_arms_pressuer).toFixed(1)
                  : printData.wind_arms_pressuer}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "30px" }}>
                SROLLS - WINDER DRAW
              </td>
              <td style={{ textAlign: "center" }}>-1.0 - 4.0</td>
              <td style={{ textAlign: "center" }}>%</td>
              <td style={{ textAlign: "center" }}>
                {printData.srolls_winder_draw
                  ? Number(printData.srolls_winder_draw).toFixed(1)
                  : printData.srolls_winder_draw}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "30px" }}>TENSION</td>
              <td style={{ textAlign: "center" }}>0 - 100</td>
              <td style={{ textAlign: "center" }} rowspan="2">
                N/M
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.tension
                  ? Number(printData.tension).toFixed(2)
                  : printData.tension}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "30px" }}>TAPER ON</td>
              <td style={{ textAlign: "center" }}>0 - 100</td>
              <td style={{ textAlign: "center" }}>
                {printData.taper_on
                  ? Number(printData.taper_on).toFixed(2)
                  : printData.taper_on}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "30px" }}>
                TENS PRE-CUT
              </td>
              <td style={{ textAlign: "center" }}>0 - 5</td>
              <td style={{ textAlign: "center" }} rowspan="2">
                %
              </td>
              <td style={{ textAlign: "center" }}>
                {printData.tens_per_cut
                  ? Number(printData.tens_per_cut).toFixed(2)
                  : printData.tens_per_cut}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "30px" }}>
                TENS POST-CUT
              </td>
              <td style={{ textAlign: "center" }}>0 - 15</td>
              <td style={{ textAlign: "center" }}>
                {printData.tens_post_cut
                  ? Number(printData.tens_post_cut).toFixed(2)
                  : printData.tens_post_cut}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", height: "30px" }}>LENGTH</td>
              <td style={{ textAlign: "center" }}>100 - 2000</td>
              <td style={{ textAlign: "center" }}>MTR</td>
              <td style={{ textAlign: "center" }}>
                {printData.length
                  ? Number(printData.length).toFixed(2)
                  : printData.length}
              </td>
            </tr>
            <tr>
              <td
                colspan="1"
                style={{
                  width: "30%",
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
                colSpan={0}
              >
                Operator Sign & Date
              </td>
              <td
                colspan="2"
                style={{
                  width: "30%",
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
              >
                Production Supervisor Sign & Date
              </td>
              <td
                colspan="1"
                style={{
                  width: "30%",
                  textAlign: "center",
                  height: "30px",
                  borderBottom: "none",
                }}
              >
                HOD/Designee Sign & Date
              </td>
            </tr>
            <tr>
              <td
                colspan="1"
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "50px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                }}
              >
                {eSign.operator_sign ? (
                  <img
                    src={eSign.operator_sign}
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
                {printData.operator_sign}
                <br></br>
                {formatPrintDate(printData.operator_submitted_on)}
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
                {eSign.supervisor_sign ? (
                  <img
                    src={eSign.supervisor_sign}
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
                {printData.supervisor_sign}
                <br></br>
                {formatPrintDate(printData.supervisor_submit_on)}
              </td>
              <td
                colspan="1"
                style={{
                  display: "table-cell",
                  verticalAlign: "bottom",
                  height: "50px",
                  fontWeight: "normal",
                  textAlign: "center",
                  borderTop: "none",
                }}
              >
                {eSign.hod_sign ? (
                  <img
                    src={eSign.hod_sign}
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
                {printData.hod_sign}
                <br></br>
                {formatPrintDate(printData.hod_submit_on)}
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="11"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="11"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="11"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="11"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="11"></td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="11"></td>
            </tr>
          </tbody>

          <tfoot>
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
          </tfoot>
        </table>
      </div>
      <BleachingHeader
        formName={"PROCESS SETUP DETAILS - WINDER"}
        formatNo={"PH-PRD02/F-005"}
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

      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <label style={{ marginTop: "8px" }}>Date : </label>
        <Input
          style={{ width: "150px" }}
          type="date"
          onChange={handleDate}
          max={today}
        ></Input>
        <label style={{ marginTop: "8px" }}>Shift : </label>
        <Select
          options={options}
          placeholder="Shift"
          onChange={handleShift}
          style={{
            width: "150px",
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        />
        <label style={{ marginTop: "8px" }}>Order No : </label>
        <Select
          options={jobOrderLov}
          onChange={handleOrderNo}
          showSearch
          style={{
            width: "150px",
            borderRadius: "40px",
            textAlign: "center",
          }}
          dropdownStyle={{
            color: "#00308F",
            textAlign: "center",
          }}
        />
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
      {/* //model */}
      <Modal
        title="Process Setup Details - Winder(Print)"
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
        <label>
          Date
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :{" "}
        </label>
        <Input
          type="date"
          onChange={handlePrintDate}
          style={{
            width: "150px",
            marginLeft: 10,
            textAlign: "center",
          }}
          max={today}
        ></Input>
        <br></br>
        <br></br>
        <label>
          Shift
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          :{" "}
        </label>
        <Select
          options={options}
          onChange={handlePrintShift}
          style={{
            width: "150px",
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
        <br></br> <label> Order No &nbsp;&nbsp;&nbsp;&nbsp; : </label>
        <Select
          options={jobOrderLov2}
          onChange={handlePrintOrder}
          showSearch
          style={{
            width: "150px",
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

      <Table
        bordered
        style={{
          textAlign: "center",
        }}
        columns={columns}
        dataSource={summaryData}
      />
    </div>
  );
};

export default Spunlace_f05_summary;
