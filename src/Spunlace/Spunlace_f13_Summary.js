/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";

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
  Modal,
  Input,
  message,
} from "antd";
import { FaUserCircle } from "react-icons/fa";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import axios from "axios";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import { FaPrint } from "react-icons/fa6";
import { createGlobalStyle } from "styled-components";
import { render } from "@testing-library/react";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Spunlace_f13_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [shift, setShift] = useState("");
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [messageApi, contextHolder] = message.useMessage();
  const [date, setDate] = useState("");
  const [operatorDate, setOperatorDate] = useState("");
  const [operator, setOperator] = useState("");
  const [supervisior, setSupervisor] = useState("");
  const [supervisorDate, setSupervisorDate] = useState("");
  const [hod, setHod] = useState("");
  const [hodStatus, setHodStatus] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [shiftLov, setShiftLov] = useState([]);
  const [selectedOrderNo, setSelectedOrderNo] = useState("");
  const [reason, setReason] = useState(false);

  const [getData, setGetData] = useState([]);
  const [form] = Form.useForm();
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const formatDates = (dateStr) => {
    if (!dateStr) return "";
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const date1 = formatDates(date);
  const date2 = formatDates(selectedDate);

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
      render: (text) => formatDates(text),
    },
    {
      title: "shift",
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },
    {
      title: "Order Number",
      dataIndex: "orderNo",
      key: "orderNo",
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
      dataIndex: "sup_status",
      key: "sup_status",
      align: "center",
    },
    {
      title: "HOD Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      align: "center",
      render: (_, x) => (
        <>
          <Button
            icon={<BiEdit />}
            onClick={() => handleEdit(x)}
            style={{ width: "100%", border: "none" }}
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

  const handlePrint = () => {
    setShowModal(true);

    // console.log("print screen works");
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    const fetchSummary = async (url) => {
      try {
        const res = await axios.get(url, { headers });
        if (res.data && res.data.length !== 0) {
          setReason(true);
        } else {
          setReason(false);
        }

        setGetData(res.data);
        // console.log("edit response", res);
        if (Array.isArray(res.data)) {
          // setReason(true);
          setSummary(
            res.data.map((x, index) => ({
              // Handle potential null or undefined values
              date: x.date || "N/A",
              sup_status: x.supervisor_status || "N/A",
              hod_status: x.hod_status || "N/A",
              operator_status: x.operator_status || "N/A",
              shift: x.shift || "N/A",
              orderNo: x.orderNo || "N/A",
              reason: x.reason || "N/A",
              index: x.index,
            }))
          );
        } else {
          setSummary([]); // Set an empty array if data is not as expected
          // setReason(false);
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]); // Set an empty array in case of error
        navigate("/Precot/Spunlace/F-13/Summary");
      }
    };

    const summaryUrl = `${ API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationRpBalePress/getRpBalePressSummary`;

    if (
      [
        "ROLE_OPERATOR",
        "ROLE_SUPERVISOR",
        "ROLE_HOD",
        "ROLE_DESIGNEE",
      ].includes(userRole)
    ) {
      fetchSummary(summaryUrl);
    }
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of getData) {
        if (
          data.hod_status === "HOD_REJECTED" ||
          data.supervisor_status === "SUPERVISOR_REJECTED"
        ) {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [getData]);

  // console.log("get image", getImage);

  const handleOrderNoChange = (value) => {
    setOrderNo(value);
  };
  const convertShiftValue = (shift) => {
    switch (shift) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      default:
        return shift;
    }
  };
  const numericShiftValue = convertShiftValue(printResponseData.shift);
  // console.log("numericShiftValue", numericShiftValue)

  const handleShiftChange = (value) => {
    // console.log("Shift selected:", value);
    setSelectedShift(value);
  };

  const handleOrderNumberChange = (value) => {
    // console.log("Order number selected:", value);
    setSelectedOrderNo(value);
    handleGet(value);
  };
  // console.log("selectedShift", selectedShift);
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };
  const handleEdit = (x) => {
    // console.log("particular ", x);

    navigate("/Precot/Spunlace/F-13", {
      state: {
        date: x.date,
        shift: x.shift,
        orderNo: x.orderNo,
      },
    });
    // console.log("edit screen", x);
  };

  // console.log("orderNo", orderNo);

  const printDataSubmit = () => {
    if (hodStatus !== "HOD_APPROVED") {
      message.error("HOD approval required before submitting.");
      return;
    }
    window.print();
  };
  const handleCancel = () => {
    setShowModal(false);
    // Reset form fields
    setSelectedDate("");
    setSelectedShift("");
    setSelectedOrderNo("");
    form.resetFields();
  };
  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data);

        if (Array.isArray(data)) {
          setShiftLov(data);
        } else {
          console.error("API response is not an array", data);
          setShiftLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setShiftLov([]);
      }
    };

    fetchShiftOptions();
  }, [token]);

  const handleGet = (selectedOrderNo) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .get(
        `${ API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationRpBalePress/getByDateShiftOrderNoPrintApi?date=${dateformated}&shift=${selectedShift}&orderNo=${selectedOrderNo}`,
        { headers }
      )
      .then((res) => {
        setPrintResponseData(res.data);

        // Fetch Supervisor Sign Image
        axios
          .get(
            `${ API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.supervisor_sign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            setGetImage(`data:image/jpeg;base64,${base64}`);
          })
          .catch((err) => {
            console.error("Error in fetching Supervisor image:", err);
            message.warning("Failed to fetch supervisor's image.");
          });

        // Fetch HOD Sign Image
        axios
          .get(
            `${ API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.hod_sign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            setGetImage1(`data:image/jpeg;base64,${base64}`);
          })
          .catch((err) => {
            console.error("Error in fetching HOD image:", err);
            message.warning("Failed to fetch HOD's image.");
          });

        // Fetch Operator Sign Image
        axios
          .get(
            `${ API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.operator_sign}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            setGetImage2(`data:image/jpeg;base64,${base64}`);
          })
          .catch((err) => {
            console.error("Error in fetching Operator image:", err);
            message.warning("Failed to fetch operator's image.");
          });

        setHodStatus(res.data.hod_status);
      })
      .catch((err) => {
        console.error("Error in main API:", err);
        message.warning(
          err.response?.data?.message ||
            "An error occurred while fetching data. Please try again."
        );
      });
  };

  
  // useEffect(() => {
  //   const fetchOrderNumberOptions = async () => {
  //     try {
  //       const response = await fetch(
  //         `${ API.prodUrl}/Precot/api/spulance/processSetupOrders`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       // console.log(data);

  //       if (Array.isArray(data)) {
  //         setOrderNumberLov(data);
  //       } else {
  //         console.error("API response is not an array", data);
  //         setOrderNumberLov([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching BMR options:", error);
  //       setOrderNumberLov([]);
  //     }
  //   };

  //   fetchOrderNumberOptions();
  // }, [token]);

  useEffect(() => {
    console.log("shift", shift);
    const fetchOrderNumberOptions = async () => {
      let shiftparam = "";
      if (shift == "I") {
        shiftparam = "1";
      } else if (shift == "II") {
        shiftparam = "2";
      } else if (shift == "III") {
        shiftparam = "3";
      }
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/spulance/processSetupOrdersByDate?date=${date}&shift=${shiftparam}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data);

        if (Array.isArray(data)) {
          setOrderNumberLov(data);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setOrderNumberLov([]);
      }
    };
    if (date && shift) {
      fetchOrderNumberOptions();
    }
  }, [date, shift, token]);

  useEffect(() => {
    console.log("selectedShift", selectedShift);
    const fetchOrderNumberOptionsPrint = async () => {
      let shiftparam = "";
      if (selectedShift == "I") {
        shiftparam = "1";
      } else if (selectedShift == "II") {
        shiftparam = "2";
      } else if (selectedShift == "III") {
        shiftparam = "3";
      }
      try {
        const response = await fetch(
          `${ API.prodUrl}/Precot/api/spulance/processSetupOrdersByDate?date=${selectedDate}&shift=${shiftparam}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data);

        if (Array.isArray(data)) {
          setOrderNumberLov(data);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLov([]);
        }
      } catch (error) {
        console.error("Error fetching BMR options:", error);
        setOrderNumberLov([]);
      }
    };
    if (selectedDate && selectedShift) {
      fetchOrderNumberOptionsPrint();
    }
  }, [selectedDate, selectedShift, token]);


  const handleNavigate = () => {
    if (date == "") {
      // setError('Please select a date');
      message.warning("Please Select date");
    } else if (shift == "") {
      message.warning("Please select a shift");
    } else if (orderNo == "") {
      // setError('Please select a date');
      message.warning("Please Select Order No");
    } else {
      navigate("/Precot/Spunlace/F-13", {
        state: { date: date, shift: shift, orderNo: orderNo },
      });
    }
  };
  const shiftchange = (value) => {
    setShift(value);
  };

  const formatDate = (dateStr) => {
    // Check if the date is already in the format dd/MM/yyyy
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  const formattedDatesupervisor = formatDate(
    printResponseData.supervisor_submit_on
  );
  const formatedDateOperator = formatDate(
    printResponseData.operator_submitted_on
  );
  const formattedDateHod = formatDate(printResponseData.hod_submit_on);
  const dateformated = formatDates(selectedDate);
  // console.log("formatedOperator", formatedDateOperator);
  return (
    <div>
      <br />
      <div id="section-to-print">
        <br />
        <table style={{ scale: "90%", marginLeft: "10px" }}>
          <thead>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none", padding: "5px" }} colSpan="15"></td>
            </tr>

            <tr style={{ height: "20px" }}>
              <td rowSpan="4" style={{ textAlign: "center", width: "10%" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "80px", height: "auto" }}
                />
                <br />
                <b style={{ fontFamily: "Times New Roman, Times, serif" }}>
                  Unit H
                </b>
              </td>
              <td rowSpan="4" colSpan="6" style={{ textAlign: "center" }}>
                <b>Process Setup Verification - RP Bale Press</b>{" "}
              </td>
              <td colSpan="1">Format No.:</td>
              {/* <td colSpan="3">PH-PRD02/F-013</td> */}
              <td colSpan="3">PH-PRD02/F-012</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan="1">Revision No.:</td>
              <td colSpan="3">01</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan="1">Ref.SOP No.:</td>
              <td colSpan="3">PH-PRD02-D-03</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan="1">Page No.:</td>
              <td colSpan="3">1 of 1</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }}></td>
            </tr>
          </thead>
          <br />
          <tbody>
            <tr colSpan="15">
              <td colSpan="6" style={{ height: "25px", width: "50%" }}>
                Date: {printResponseData.date}
              </td>
              <td colSpan="9" style={{ height: "25px" }}>
                Shift: {numericShiftValue}
              </td>
            </tr>
            <tr colSpan="15">
              <td colSpan="15" style={{ height: "25px" }}>
                Order No: {printResponseData.orderNo}
              </td>
            </tr>
            <tr colSpan="15">
              <td colSpan="6" style={{ height: "25px" }}>
                Descriptions
              </td>
              <td colSpan="1">Standards</td>
              <td colSpan="2">Units</td>
              <td colSpan="2">Set Parameters</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                Number of twists with Needles
              </td>
              <td colSpan="1">0 to 4</td>
              <td colSpan="2">Nos</td>
              <td colSpan="2">{printResponseData.twistWithNeedles}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                Number of twists without Needles
              </td>
              <td colSpan="1">4 to 10</td>
              <td colSpan="2">Nos</td>
              <td colSpan="2">{printResponseData.twistWithoutNeedles}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                Actual No of Twist
              </td>
              <td colSpan="1">0 to 10</td>
              <td colSpan="2">Nos</td>
              <td colSpan="2">{printResponseData.actualNoOftwist}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                Length of Bale
              </td>
              <td colSpan="1">45 to 65</td>
              <td colSpan="2">cm</td>
              <td colSpan="2">{printResponseData.lenOfBales}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                Actual Length of Bales
              </td>
              <td colSpan="1">45 to 65</td>
              <td colSpan="2">cm</td>
              <td colSpan="2">{printResponseData.actualLenOfBales}</td>
            </tr>
            <tr>
              <td colSpan={15}>SETTINGS PRESS</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                Maximum Pressure Press plate
              </td>
              <td colSpan="1">75 to 100</td>
              <td colSpan="2">Bar</td>
              <td colSpan="2">{printResponseData.pressurePressPlate}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                Maximum Pressure compensator
              </td>
              <td colSpan="1">15 to 30</td>
              <td colSpan="2">Bar</td>
              <td colSpan="2">{printResponseData.pressureCompensator}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                De-pressurized Pressure Press plate
              </td>
              <td colSpan="1">25 to 35</td>
              <td colSpan="2">Bar</td>
              <td colSpan="2">{printResponseData.dePressurizedPressPlate}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                Time out Motor
              </td>
              <td colSpan="1">1 to 4</td>
              <td colSpan="2">min</td>
              <td colSpan="2">{printResponseData.timeOutMotor}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                ODT photo electric switch fill level
              </td>
              <td colSpan="1">2 to 4</td>
              <td colSpan="2">sec</td>
              <td colSpan="2">{printResponseData.odtFillLevel}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                ODT photo electric switch high level
              </td>
              <td colSpan="1">3 to 6</td>
              <td colSpan="2">sec</td>
              <td colSpan="2">{printResponseData.odtHighLevel}</td>
            </tr>
            {/* <tr>
                            <td colSpan={15}>HOPPER SETTING</td>
                        </tr>
                        <tr>
                            <td colspan='6' style={{ height: '25px' }}>Beater speed</td>
                            <td colSpan='1'>1200 to 1500</td>
                            <td colSpan='2'>RPM</td>
                            <td colSpan='2'>{printResponseData.beaterSpeed}</td>
                        </tr>
                        <tr>
                            <td colspan='6' style={{ height: '25px' }}>Feed roller speed</td>
                            <td colSpan='1'>1000 to 1600</td>
                            <td colSpan='2'>RPM</td>
                            <td colSpan='2'>{printResponseData.feedRollerSpeed}</td>
                        </tr>
                        <tr>
                            <td colspan='6' style={{ height: '25px' }}>Transport fan speed  </td>
                            <td colSpan='1'>2600 to 3100</td>
                            <td colSpan='2'>RPM</td>
                            <td colSpan='2'>{printResponseData.transportFanSpeed}</td>
                        </tr> */}

            <tr colSpan="15">
              <td
                colSpan="4"
                style={{
                  height: "50px",
                  textAlign: "center",
                  verticalAlign: "top",
                }}
              >
                Operator Sign & Date: <br />
                {printResponseData.operator_sign} <br />
                {formatedDateOperator}
                <br />
                {getImage2 && (
                  <img
                    className="signature"
                    src={getImage2}
                    alt="logo"
                    // style={{
                    //     width: "80%",
                    //     height: "50%",
                    //     marginLeft: "20px",
                    //     objectFit: "contain",
                    //     mixBlendMode: "multiply",
                    //     justifyContent: "space-evenly",
                    // }}
                  />
                )}
              </td>
              <td
                colSpan="3"
                style={{
                  height: "50px",
                  textAlign: "center",
                  verticalAlign: "top",
                }}
              >
                Prod. Supervisor Sign & Date: <br />
                {printResponseData.supervisor_sign} <br />
                {formattedDatesupervisor}
                <br />
                {getImage && (
                  <img
                    className="signature"
                    src={getImage}
                    alt="logo"
                    // style={{
                    //     width: "80%",
                    //     height: "50%",
                    //     marginLeft: "20px",
                    //     objectFit: "contain",
                    //     mixBlendMode: "multiply",
                    //     justifyContent: "space-evenly",
                    // }}
                  />
                )}
              </td>
              <td
                colSpan="10"
                style={{
                  height: "50px",
                  textAlign: "center",
                  verticalAlign: "top",
                }}
              >
                HOD / Designee Sign & Date: <br />
                {printResponseData.hod_sign} <br />
                {formattedDateHod}
                <br />
                {getImage1 && (
                  <img
                    className="signature"
                    src={getImage1}
                    alt="logo"
                    // style={{
                    //     width: "80%",
                    //     height: "50%",
                    //     marginLeft: "20px",
                    //     objectFit: "contain",
                    //     mixBlendMode: "multiply",
                    //     justifyContent: "space-evenly",
                    // }}
                  />
                )}
              </td>
            </tr>
          </tbody>
          <br />
          <tfoot>
            <br />
            <tr style={{ height: "30px" }}>
              <td colSpan={4}>Particulars</td>
              <td colSpan={2}>Prepared by</td>
              <td colSpan={1}>Reviewed by</td>
              <td colSpan={4}>Approved by</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan={4}>Name</td>
              <td colSpan={2}></td>
              <td colSpan={1}></td>
              <td colSpan={4}></td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan={4}>Signature & Date</td>
              <td colSpan={2}></td>
              <td colSpan={1}></td>
              <td colSpan={4}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="PROCESS SETUP VERIFICATION - RP BALE PRESS"
        formatNo="PH-PRD02/F-012"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          <Button
            type="primary"
            onClick={handlePrint}
            icon={<FaPrint color="#00308F" />}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
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
      <div style={{ paddingBottom: "2em" }}></div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      {/* header code above */}
      <Row>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
            gap: "15px",
          }}
        >
          <Form.Item label=" Date">
            <Input
              type="date"
              value={date}
              max={today}
              placeholder="Choose date"
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Shift">
            <Select
              showSearch
              value={shift}
              onChange={shiftchange}
              style={{ width: "100%" }}
              placeholder="Search Batch No"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Shift
              </Select.Option>
              {shiftLov.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="OrderNo">
            <Select
              showSearch
              value={orderNo}
              onChange={handleOrderNoChange}
              style={{ width: "100%" }}
              placeholder="Search Order Number"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Select Order Number
              </Select.Option>
              {orderNumberLov.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              key="Create"
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
              shape="round"
              icon={<BiNavigation />}
              onClick={handleNavigate}
            >
              Go To
            </Button>
          </Form.Item>
        </Form>
      </Row>
      <div>
        <Table
          bordered
          style={{
            textAlign: "center",
            width: "100%",
          }}
          columns={columns}
          dataSource={summary}
        />
      </div>
      <Modal
        title="Print"
        open={showModal}
        onCancel={handleCancel}
        // onCancel={() => setShowModal(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printDataSubmit}
            disabled={!selectedDate || !selectedShift || !selectedOrderNo}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Select Date"
            name="date"
            rules={[{ required: true, message: "Please select a date!" }]}
            validateStatus={selectedDate ? "success" : ""}
          >
            <Input
              max={today}
              type="date"
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Select Shift"
            name="shift"
            rules={[{ required: true, message: "Please select a shift!" }]}
            validateStatus={selectedShift ? "success" : ""}
          >
            <Select
              showSearch
              value={selectedShift}
              onChange={handleShiftChange}
              style={{ width: "100%" }}
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Shift
              </Select.Option>
              {shiftLov.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Select Order Number"
            name="orderNumber"
            rules={[
              { required: true, message: "Please select an order number!" },
            ]}
            validateStatus={selectedOrderNo ? "success" : ""}
          >
            <Select
              showSearch
              value={selectedOrderNo}
              onChange={handleOrderNumberChange}
              style={{ width: "100%" }}
              placeholder="Search Order Number"
              optionFilterProp="children"
            >
              <Select.Option value="" disabled selected>
                Select Order Number
              </Select.Option>
              {orderNumberLov.map((option) => (
                <Select.Option key={option.id} value={option.value}>
                  {option.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Spunlace_f13_summary;
