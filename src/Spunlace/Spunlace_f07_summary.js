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

const Spunlace_f07_summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [shift, setShift] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [printResponseData, setPrintResponseData] = useState([]);
  const [role, setRole] = useState("");
  const [printMonth, setPrintMonth] = useState("");
  const [printYear, setPrintYear] = useState("");
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
  const [shiftLov, setShiftLov] = useState([]);
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [orderNo, setOrderNo] = useState("");
  const [selectedOrderNo, setSelectedOrderNo] = useState("");
  const [hod_status, setHod_status] = useState("");
  const [reason, setReason] = useState(false);
  const [form] = Form.useForm();
  const [getData, setGetData] = useState([]);
  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const formatDates = (dateString) => {
    if (!dateString) return "";
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateString)) {
      return dateString;
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const date1 = formatDates(selectedDate);

  //     const GlobalStyle = createGlobalStyle`
  //     @media print {
  //       @page {
  //         size: landscape;
  //       }
  //     }
  //   `;
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

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      // render: (text, record, index) => index + 1,
      render: (text, record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
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

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };
  const handleOrderNumberChange = (value) => {
    // console.log("Order number selected:", value);
    setSelectedOrderNo(value);
    fetchBmrOptions(value);
    handleGet(value);
  };

  const handlePrint = () => {
    setShowModal(true);

    // console.log("print screen works");
  };
  const handleBack = () => {
    navigate("/Precot/choosenScreen");
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
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    const fetchSummary = async (url) => {
      try {
        const res = await axios.get(url, { headers });
        // console.log("edit response", res.data.orderNo);
        if (res.data && res.data.length !== 0) {
          setReason(true);
        } else {
          setReason(false);
        }

        res.data.forEach((item, index) => {
          // console.log(`orderNo for item ${index}:`, item.orderNo);
        });
        setGetData(res.data);
        if (Array.isArray(res.data)) {
          setSummary(
            res.data.map((x, index) => ({
              // Handle potential null or undefined values
              date: x.date || "N/A",
              sup_status: x.supervisor_status || "N/A",
              hod_status: x.hod_status || "N/A",
              shift: x.shift || "N/A",
              orderNo: x.orderNo || "N/A",
              operator_status: x.operator_status || "N/A",
              reason: x.reason || "N/A",
            }))
          );
        } else {
          setSummary([]); // Set an empty array if data is not as expected
        }
      } catch (err) {
        console.error("Error fetching summary data", err);
        setSummary([]); // Set an empty array in case of error
        navigate("/Precot/Spunlace/F-07/Summary");
      }
    };

    const summaryUrl = `${API.prodUrl}/Precot/api/spunlace/Service/RejectionReport/supervisorSummary`;

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
  const numericShiftValue = convertShiftValue(selectedShift);
  // console.log("numericShiftValue", numericShiftValue);
  const convertToRomanShift = (shift) => {
    switch (shift) {
      case 1:
        return "I";
      case 2:
        return "II";
      case 3:
        return "III";
      default:
        return shift;
    }
  };

  const romanShiftValue = convertToRomanShift(selectedShift);
  // console.log("romanShiftValue", romanShiftValue);

  const handleShiftChange = (value) => {
    // console.log("values -----------------", value);
    setShift(value);
    setSelectedShift(value);
  };
  // console.log("selectedShift", selectedShift);
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };
  const shiftchange = (value) => {
    setShift(value);
  };
  // console.log("selectedDtae", selectedDate);

  const handleEdit = (x) => {
    // console.log("particular ", x);
    navigate("/Precot/Spunlace/F-07", {
      state: {
        date: x.date,
        shift: x.shift,
        orderNo: x.orderNo,
      },
    });
    // console.log("edit screen", x);
    // console.log("order Number123", x.orderNo);
  };

  const printDataSubmit = () => {
    if (hod_status !== "HOD_APPROVED") {
      message.error("HOD approval required before submitting.");
      return;
    }
    if (!printResponseData || printResponseData.length === 0) {
      // message.error("No data available to print.");
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

  useEffect(() => {
    console.log("shift", shift);
    const fetchOrderNumberOptions = async () => {
      let shiftparam = "";
      if (shift == "I") {
        shiftparam = "1";
      } else if (shift == "II") {
        shiftparam = "2";
      } else {
        shiftparam = "3";
      }
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/spulance/orderGoodsByDate?date=${date}&shift=${shiftparam}`,
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
      } else {
        shiftparam = "3";
      }
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/spulance/orderGoodsByDate?date=${selectedDate}&shift=${shiftparam}`,
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

  const fetchBmrOptions = async (selectedOrderNo) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .get(
        `${API.prodUrl}/Precot/api/spunlace/Service/RejectionReport/getByDateAndShiftPrintApi?date=${selectedDate}&shift=${selectedShift}&orderNo=${selectedOrderNo}`,
        // `${API.prodUrl}/Precot/api/spunlace/Service/RejectionReport/getByDateAndShift?date=2024-06-01&shift=I`,
        { headers }
      )
      .then((res) => {
        const data = res.data;
        // console.log("edit data", data);
        setOperator(data.operator_sign);
        setOperatorDate(data.operator_submit_on);
        setSupervisor(data.supervisor_sign);
        setSupervisorDate(data.supervisor_submit_on);
        setHod(data.hod_sign);
        setHodDate(data.hod_submit_on);
        setHod_status(data.hod_status);

        //op
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${data.operator_sign}`,
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
            setGetImage2(url);
          })
          .catch((err) => {
            // console.log("Error in fetching image:", err);
          });
        //////////////
        //op
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${data.supervisor_sign}`,
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
            setGetImage(url);
          })
          .catch((err) => {
            // console.log("Error in fetching image:", err);
          });
        //////////////
        //op
        axios
          .get(
            `${API.prodUrl}/Precot/api/Format/Service/image?username=${data.hod_sign}`,
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
            setGetImage1(url);
          })
          .catch((err) => {
            // console.log("Error in fetching image:", err);
          });
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  };
  const handleOrderNoChange = (value) => {
    setOrderNo(value);
  };

  localStorage.setItem("orderno", orderNo);
  // console.log("orderNoSel", orderNo);
  const handleGet = (selectedOrderNo) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .get(
        `${
       API.prodUrl
        }/Precot/api/spulance/splRejection?date=${selectedDate}&shift=${convertShiftValue(
          selectedShift
        )}&order=${selectedOrderNo}`,
        { headers }
      )
      .then((res) => {
        // console.log("Response", res.data);

        if (res.data && res.data.length > 0) {
          setPrintResponseData(res.data);

          // setPrintLaydown(value);
        } else {
          setPrintResponseData([]);
          message.error("no data found...!");

          return;
        }
      })
      .catch((err) => {
        // console.log("Error", err);

        setPrintResponseData([]);
      });
  };
  const handleNavigate = () => {
    if (date == "") {
      // setError('Please select a date');
      message.warning("Please Select date");
    } else if (shift == "") {
      message.warning("Please select a shift");
    } else if (orderNo == "") {
      message.warning("Please select a Order No.");
    } else {
      navigate("/Precot/Spunlace/F-07", {
        state: { date: date, shift: shift, orderNo: orderNo },
      });
    }
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
  const formattedDatesupervisor = formatDate(supervisorDate);
  const formatedDateOperator = formatDate(operatorDate);
  const formattedDateHod = formatDate(hodDate);

  const recordsPerPage = 8;
  const totalPages = Math.ceil(printResponseData.length / recordsPerPage);

  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };
  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            style={{ marginTop: "40px", pageBreakAfter: "always" }}
          >
            <table style={{ scale: "100%", marginTop: "30px" }} key={pageIndex}>
              <thead>
                <tr style={{ border: "none" }}>
                  <td
                    style={{ border: "none", padding: "5px" }}
                    colSpan="10"
                  ></td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td
                    style={{ border: "none", padding: "5px" }}
                    colSpan="10"
                  ></td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td
                    style={{ border: "none", padding: "5px" }}
                    colSpan="10"
                  ></td>
                </tr>
                <tr style={{ height: "20px" }}>
                  <td rowSpan="4" style={{ textAlign: "center", width: "10%" }}>
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "80px", height: "auto" }}
                    />
                    <b style={{ fontFamily: "Times New Roman, Times, serif" }}>
                      Unit H
                    </b>
                  </td>
                  <td rowspan="4" colSpan="10" style={{ textAlign: "center" }}>
                    <b>Daily Rejection Report - Spunlace</b>{" "}
                  </td>
                  <td colSpan="2">Format No.:</td>
                  <td colSpan="2">PH-PRD02/F-007</td>
                </tr>
                <tr style={{ height: "30px" }}>
                  <td colSpan="2">Revision No.:</td>
                  <td colSpan="2">01</td>
                </tr>
                <tr style={{ height: "30px" }}>
                  <td colSpan="2">Ref.SOP No.:</td>
                  <td colSpan="2">PH-PRD02-D-03 </td>
                </tr>
                <tr style={{ height: "30px" }}>
                  <td colSpan="2">Page No.:</td>
                  <td colSpan="2">
                    {pageIndex + 1} of {totalPages}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }}></td>
                </tr>
              </thead>
              <br />
              <tbody>
                <tr>
                  <th colSpan={10}>Date :{date1}</th>
                  <th colSpan={5}>Shift :{numericShiftValue} </th>
                </tr>
                <tr colSpan="11">
                  <th
                    colSpan="1"
                    style={{ height: "15px", textAlign: "center" }}
                  >
                    Sl. No
                  </th>
                  <th
                    colSpan="5"
                    style={{ height: "15px", textAlign: "center" }}
                  >
                    Product Name
                  </th>
                  <th
                    colSpan="1"
                    style={{ height: "15px", textAlign: "center" }}
                  >
                    Pattern
                  </th>
                  <th
                    colSpan="1"
                    style={{ height: "15px", textAlign: "center" }}
                  >
                    Order No.
                  </th>
                  <th
                    colSpan="1"
                    style={{ height: "15px", textAlign: "center" }}
                  >
                    Shaft No.
                  </th>
                  <th
                    colSpan="1"
                    style={{ height: "15px", textAlign: "center" }}
                  >
                    Roll No.
                  </th>
                  <th
                    colSpan="1"
                    style={{ height: "15px", textAlign: "center" }}
                  >
                    Length <br />
                    In Mtrs
                  </th>
                  <th
                    colSpan="1"
                    style={{ height: "15px", textAlign: "center" }}
                  >
                    Net Wt. <br /> in Kg
                  </th>
                  <th
                    colSpan="1"
                    style={{ height: "15px", textAlign: "center" }}
                  >
                    Roll <br /> Gsm
                  </th>
                  <th
                    colSpan="1"
                    style={{ height: "15px", textAlign: "center" }}
                  >
                    Moisture <br />
                    In %
                  </th>
                  <th
                    colSpan="1"
                    style={{ height: "15px", textAlign: "center" }}
                  >
                    Roll Dia <br /> In Mm
                  </th>
                </tr>
                {/* {[...Array(10)].map((_, index) => ( */}
                {paginateData(printResponseData, pageIndex + 1).map(
                  (item, index) => (
                    <tr colSpan="15" key={index}>
                      <td
                        colSpan="1"
                        style={{ height: "15px", textAlign: "center" }}
                      >
                        {index + 1 + pageIndex * recordsPerPage}
                      </td>
                      <td
                        colSpan="5"
                        style={{ height: "15px", textAlign: "center" }}
                      >
                        {item.customerName || "N/A"}
                      </td>
                      <td
                        colSpan="1"
                        style={{ height: "15px", textAlign: "center" }}
                      >
                        {item.pattern || "N/A"}
                      </td>
                      <td
                        colSpan="1"
                        style={{ height: "15px", textAlign: "center" }}
                      >
                        {item.orderNo || "N/A"}
                      </td>
                      <td
                        colSpan="1"
                        style={{ height: "15px", textAlign: "center" }}
                      >
                        {item.shaftNo || "N/A"}
                      </td>
                      <td
                        colSpan="1"
                        style={{ height: "15px", textAlign: "center" }}
                      >
                        {item.baleNo || "N/A"}
                      </td>
                      <td
                        colSpan="1"
                        style={{ height: "15px", textAlign: "center" }}
                      >
                        {item.length || "N/A"}
                      </td>
                      <td
                        colSpan="1"
                        style={{ height: "15px", textAlign: "center" }}
                      >
                        {item.totalWeight || "N/A"}
                      </td>
                      <td
                        colSpan="1"
                        style={{ height: "15px", textAlign: "center" }}
                      >
                        {item.gsm || "N/A"}
                      </td>
                      <td
                        colSpan="1"
                        style={{ height: "15px", textAlign: "center" }}
                      >
                        {item.moisture || "N/A"}
                      </td>
                      <td
                        colSpan="1"
                        style={{ height: "15px", textAlign: "center" }}
                      >
                        {item.diameter || "N/A"}
                      </td>
                    </tr>
                  )
                )}

                {pageIndex + 1 === totalPages && (
                  <>
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          height: "28px",
                          marginTop: "20",
                          textAlign: "center",
                        }}
                      >
                        Operator Sign & Date
                      </td>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        Production Supervisor Sign & Date
                      </td>
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        HOD / Designee Sign & Date
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          height: "28px",
                          textAlign: "center",
                          marginBottom: "auto",
                          verticalAlign: "bottom",
                        }}
                      >
                        {operator && (
                          <>
                            {operator}
                            <br />
                            {formatedDateOperator}
                            <br />
                            {getImage2 && (
                              <img
                                className="signature"
                                src={getImage2}
                                alt="logo"
                                // style={{
                                //     width: "60px",
                                //     height: "auto",
                                //     verticalAlign: "middle",
                                // }}
                              />
                            )}
                          </>
                        )}
                      </td>
                      <td
                        colSpan={5}
                        style={{ textAlign: "center", verticalAlign: "bottom" }}
                      >
                        {supervisior && (
                          <>
                            {supervisior}
                            <br />
                            {formattedDatesupervisor}
                            <br />
                            {getImage && (
                              <img
                                className="signature"
                                src={getImage}
                                alt="logo"
                                // style={{
                                //     width: "60px",
                                //     height: "auto",
                                //     verticalAlign: "middle",
                                // }}
                              />
                            )}
                          </>
                        )}
                      </td>
                      <td
                        colSpan={6}
                        style={{ textAlign: "center", verticalAlign: "bottom" }}
                      >
                        {hod && (
                          <>
                            {hod}
                            <br />
                            {formattedDateHod}
                            <br />
                            {getImage1 && (
                              <img
                                className="signature"
                                src={getImage1}
                                alt="logo"
                                // style={{
                                //     width: "60px",
                                //     height: "auto",
                                //     verticalAlign: "middle",
                                // }}
                              />
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
              <br />
              <tfoot>
                <br />
                <tr style={{ height: "30px" }}>
                  <td colSpan={6}>Particulars</td>
                  <td colSpan={3}>Prepard by</td>
                  <td colSpan={3}>Reviewed by</td>
                  <td colSpan={3}>Approved by</td>
                </tr>

                <tr style={{ height: "30px" }}>
                  <td colSpan={6}>Name</td>
                  <td colSpan={3}></td>
                  <td colSpan={3}></td>
                  <td colSpan={3}></td>
                </tr>
                <tr style={{ height: "30px" }}>
                  <td colSpan={6}>Signature & Date</td>
                  <td colSpan={3}></td>
                  <td colSpan={3}></td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>

      <BleachingHeader
        unit="Unit-H"
        formName="DAILY REJECTION REPORT - SPUNLACE"
        formatNo="PH-PRD02/F-007"
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
                Order Number
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
          // pagination={{ pageSize: 5 }}
          pagination={{
            ...pagination,
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize });
            },
          }}
          onChange={handleTableChange}
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
            // help={!selectedDate ? "Please select a date!" : ""}
          >
            <Input
              type="date"
              max={today}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Select Shift"
            name="shift"
            rules={[{ required: true, message: "Please select a shift!" }]}
            validateStatus={selectedShift ? "success" : ""}
            // help={!selectedShift ? "Please select a shift!" : ""}
          >
            <Select
              showSearch
              value={selectedShift}
              max={today}
              onChange={handleShiftChange}
              style={{ width: "100%" }}
              optionFilterProp="children"
              placeholder="Shift"
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
export default Spunlace_f07_summary;
