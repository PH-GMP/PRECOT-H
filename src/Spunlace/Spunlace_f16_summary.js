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

const Spunlace_f16_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [shift, setShift] = useState("");

  const [placement, setPlacement] = useState("left");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [productName, setProductName] = useState("");
  const [gsm, setGsm] = useState("");
  const [width, setWidth] = useState("");
  const [unwinder, setUnwinder] = useState("");
  const [rewinder, setRewinder] = useState("");
  const [cutterTrim, setCutterTrim] = useState("");
  const [layonTrim, setLayonTrim] = useState("");
  const [noOfFlagsInRoll, setNoOfFlagsInRoll] = useState("");
  const [pressureAtMinDia, setPressureAtMinDia] = useState("");
  const [uwData, setUwData] = useState("");
  const [tension, setTension] = useState("");
  const [diameter, setDiameter] = useState("");
  const [mixing, setMixing] = useState("");
  const [pattern, setPattern] = useState("");
  const [moisture, setMoisture] = useState("");
  const [thickness, setThickness] = useState("");
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
  const [hodDate, setHodDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [shiftLov, setShiftLov] = useState([]);
  const [selectedOrderNo, setSelectedOrderNo] = useState("");
  const [hodStatus, setHodStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);
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

  const GlobalStyle = createGlobalStyle`
  @media print {
    @page {
      size: landscape;
    }
  }
`;

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
      dataIndex: "op_status",
      key: "op_status",
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

    // console.loglog("print screen works");
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
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
        // console.loglog("edit response", res);
        if (Array.isArray(res.data)) {
          setSummary(
            res.data.map((x, index) => ({
              // Handle potential null or undefined values
              date: x.date || "N/A",
              sup_status: x.supervisor_status || "N/A",
              hod_status: x.hod_status || "N/A",
              shift: x.shift || "N/A",
              orderNo: x.orderNo || "N/A",
              op_status: x.operator_status || "N/A",
              reason: x.reason || "N/A",
              index: x.index,
            }))
          );
        } else {
          setSummary([]); // Set an empty array if data is not as expected
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]);
        navigate("/Precot/Spunlace/F-16/Summary");
      }
    };

    const summaryUrl = `${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationSliterWinder/getSliterWinderSummary`;

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
  // console.loglog("numericShiftValue", numericShiftValue)

  const handleShiftChange = (value) => {
    // console.loglog("Shift selected:", value);
    setSelectedShift(value);
  };

  const handleOrderNumberChange = (value) => {
    // console.loglog("Order number selected:", value);
    setSelectedOrderNo(value);
    handleGet(value);
  };
  // console.loglog("selectedShift", selectedShift);
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };
  const handleEdit = (x) => {
    // console.loglog("particular ", x);
    navigate("/Precot/Spunlace/F-16", {
      state: {
        date: x.date,
        shift: x.shift,
        orderNo: x.orderNo,
      },
    });
    // console.loglog("edit screen", x);
  };

  // console.loglog("orderNo", orderNo);
  const handleCancel = () => {
    setShowModal(false);
    // Reset form fields
    setSelectedDate("");
    setSelectedShift("");
    setSelectedOrderNo("");
    form.resetFields();
  };
  const printDataSubmit = () => {
    if (hodStatus !== "HOD_APPROVED") {
      message.error("HOD approval required before submitting.");
      return;
    }
    window.print();
  };

  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.loglog(data);

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
        `${API.prodUrl}/Precot/api/spunlace/Service/ProcessSetupVerificationSliterWinder/getByDateShiftOrderNoPrintApi?date=${dateformated}&shift=${selectedShift}&orderNo=${selectedOrderNo}`,
        { headers }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        setPrintResponseData(res.data);
        setHodStatus(res.data.hod_status);
      })
      .catch((err) => {
        // console.loglog("Error", err);
      });
  };
  //   useEffect(() => {
  //     const fetchOrderNumberOptions = async () => {
  //       try {
  //         const response = await fetch(
  //           `${API.prodUrl}/Precot/api/spulance/OrderLovsliterwinder`,
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         const data = await response.json();
  //         // console.loglog("API Response:", data);

  //         if (Array.isArray(data)) {
  //           const trimmedData = data.map((item) => item.trim());
  //           // console.loglog("Trimmed Order Numbers:", trimmedData);
  //           setOrderNumberLov(trimmedData);
  //         } else {
  //           console.error("API response is not an array", data);
  //           setOrderNumberLov([]);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching order options:", error);
  //         setOrderNumberLov([]);
  //       }
  //     };

  //     fetchOrderNumberOptions();
  //   }, [token]);

  useEffect(() => {
    const fetchOrderNumberOptions = async () => {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/spulance/OrderLovsliterwinder`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.loglog("API Response:", data);

        if (Array.isArray(data)) {
          const trimmedData = data.map((item) => item.trim());
          // console.loglog("Trimmed Order Numbers:", trimmedData);
          setOrderNumberLov(trimmedData);
        } else {
          console.error("API response is not an array", data);
          setOrderNumberLov([]);
        }
      } catch (error) {
        console.error("Error fetching order options:", error);
        setOrderNumberLov([]);
      }
    };
    fetchOrderNumberOptions();
  }, []);

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
      navigate("/Precot/Spunlace/F-16", {
        state: { date: date, shift: shift, orderNo: orderNo },
      });
    }
  };
  const shiftchange = (value) => {
    setShift(value);
  };

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData.supervisor_sign;
    if (username) {
      // console.loglog("usernameparams", username);

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
          // console.loglog("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage(url);
        })
        .catch((err) => {
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData.hod_sign;
    if (username) {
      // console.loglog("usernameparams", username);

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
          // console.loglog("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage1(url);
        })
        .catch((err) => {
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData.operator_sign;
    if (username) {
      // console.loglog("usernameparams", username);

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
          // console.loglog("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage2(url);
        })
        .catch((err) => {
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl, token]);

  // console.loglog("get image", getImage);

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
  // console.loglog("formatedOperator", formatedDateOperator);
  return (
    <div>
      <div id="section-to-print">
        <table style={{ marginTop: "30px", scale: "95%" }}>
          <thead>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none", padding: "5px" }} colSpan="15"></td>
            </tr>

            <tr style={{ height: "20px" }}>
              <td
                colSpan="2"
                rowSpan="4"
                style={{ textAlign: "center", width: "10%" }}
              >
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
              <td rowSpan="4" colSpan="5" style={{ textAlign: "center" }}>
                <b>Process Setup Verification Sliter Winder </b>{" "}
              </td>
              <td colSpan="1">Format No.:</td>
              <td colSpan="3">PH-PRD02/F-015</td>
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
                DATE: {printResponseData.date}
              </td>
              <td colSpan="9" style={{ height: "25px" }}>
                SHIFT: {numericShiftValue}
              </td>
            </tr>
            <tr colSpan="15">
              <td colSpan="6" style={{ height: "25px" }}>
                ORDER NO: {printResponseData.orderNo}
              </td>
              <td colSpan="9" style={{ height: "25px" }}>
                MIXING: {printResponseData.mixing}
              </td>
            </tr>
            <tr colSpan="15">
              <td colSpan="6" style={{ height: "25px" }}>
                PRODUCT NAME: {printResponseData.productName}
              </td>
              <td colSpan="9" style={{ height: "25px" }}>
                PATTERN: {printResponseData.pattern}
              </td>
            </tr>
            <tr colSpan="15">
              <td colSpan="6" style={{ height: "25px" }}>
                GSM: {printResponseData.gsm}
              </td>
              <td colSpan="9" style={{ height: "25px" }}>
                MOISTURE: {printResponseData.moisture}
              </td>
            </tr>
            <tr colSpan="15">
              <td colSpan="6" style={{ height: "25px" }}>
                WIDTH: {printResponseData.width}
              </td>
              <td colSpan="9" style={{ height: "25px" }}>
                THICKNESS: {printResponseData.thickness}
              </td>
            </tr>

            <tr colSpan="15">
              <td colSpan="6" style={{ height: "25px" }}>
                Descriptions
              </td>
              <td colSpan="1">Standards</td>
              <td colSpan="2">Units</td>
              <td colSpan="2">SET VALUE</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                UNWINDER
              </td>
              <td colSpan="1">20 to 50</td>
              <td colSpan="2">N</td>
              <td colSpan="2">{printResponseData.unwinder}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                REWINDER
              </td>
              <td colSpan="1">20 to 50</td>
              <td colSpan="2">N</td>
              <td colSpan="2">{printResponseData.rewinder}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                CUTTER TRIM
              </td>
              <td colSpan="1">2 to 10</td>
              <td colSpan="2">%</td>
              <td colSpan="2">{printResponseData.cutterTrim}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                LAYON TRIM
              </td>
              <td colSpan="1">2 to 10</td>
              <td colSpan="2">%</td>
              <td colSpan="2">{printResponseData.layonTrim}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                NO OF FLAGS IN ROLL
              </td>
              <td colSpan="1">1 to 10</td>
              <td colSpan="2">Nos</td>
              <td colSpan="2">{printResponseData.noOfFlags}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                PRESSURE AT MIN. DIA
              </td>
              <td colSpan="1">0.0 to 20.0</td>
              <td colSpan="2">%</td>
              <td colSpan="2">{printResponseData.pressure}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                UW DATA
              </td>
              <td colSpan="1">0 to 100</td>
              <td colSpan="2">%</td>
              <td colSpan="2">{printResponseData.uwData}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                TENSION
              </td>
              <td colSpan="1">20 to 50</td>
              <td colSpan="2">N</td>
              <td colSpan="2">{printResponseData.tension}</td>
            </tr>
            <tr>
              <td colspan="6" style={{ height: "25px" }}>
                DIAMETER
              </td>
              <td colSpan="1">100 TO 1400</td>
              <td colSpan="2">MM</td>
              <td colSpan="2">{printResponseData.diameter}</td>
            </tr>
            <tr colSpan="15">
              <td colSpan="4" style={{ height: "100px", textAlign: "center" }}>
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
                    //     width: "60%",
                    //     height: "30%",
                    //     marginLeft: "20px",
                    //     objectFit: "contain",
                    //     mixBlendMode: "multiply",
                    //     justifyContent: "space-evenly",
                    // }}
                  />
                )}
              </td>
              <td colSpan="3" style={{ height: "100px", textAlign: "center" }}>
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
                    //     width: "60%",
                    //     height: "30%",
                    //     marginLeft: "20px",
                    //     objectFit: "contain",
                    //     mixBlendMode: "multiply",
                    //     justifyContent: "space-evenly",
                    // }}
                  />
                )}
              </td>
              <td colSpan="10" style={{ height: "100px", textAlign: "center" }}>
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
                    //     width: "60%",
                    //     height: "30%",
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
              <td colSpan={2}>Reviewed by</td>
              <td colSpan={4}>Approved by</td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan={4}>Name</td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={4}></td>
            </tr>
            <tr style={{ height: "30px" }}>
              <td colSpan={4}>Signature & Date</td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={4}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="PROCESS SETUP VERIFICATION SLITER WINDER"
        formatNo="PH-PRD02/F-015"
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <div style={{ paddingBottom: "2em" }}></div>

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
          <Form.Item label="Date">
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
          <Form.Item label="OrderNo.:">
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
              {orderNumberLov.length > 0 ? (
                orderNumberLov.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))
              ) : (
                <Select.Option value="" disabled>
                  No options available
                </Select.Option>
              )}
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
              placeholder="Select Shift"
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
              {/* <Select.Option value="" disabled selected>
                                Select Order Number
                            </Select.Option> */}
              {orderNumberLov.length > 0 ? (
                orderNumberLov.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))
              ) : (
                <Select.Option value="" disabled>
                  No options available
                </Select.Option>
              )}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Spunlace_f16_summary;
