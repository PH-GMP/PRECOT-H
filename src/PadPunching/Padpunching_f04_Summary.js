/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Select, Descriptions, Menu, Avatar, Drawer } from "antd";
import BleachingHeader from "../Components/BleachingHeader.js";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png";
import { Tooltip } from "antd";
import moment from "moment";
import API from "../baseUrl.json";
import { FaUserCircle } from "react-icons/fa";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import BleContaminationCheckEdit from "./BleContaminationCheckEdit_f05";
import { FaLock } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { Tabs, Button, Col, Input, Row, message } from "antd";
import { BiLock, BiNavigation } from "react-icons/bi";
import { IoChevronBackSharp, IoPrint } from "react-icons/io5";
import { VscGoToFile, VscGoToSearch } from "react-icons/vsc";
import { GoArrowLeft } from "react-icons/go";
import { jwtDecode } from "jwt-decode";
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";
// import Padpunching_f25_summary from "./Padpunching_f25_Summary.js";

const Padpunching_f04_summary = () => {
  const [open, setOpen] = useState(false);

  const [newDate, setNewDate] = useState("");

  const [modalData, setmodalData] = useState();
  const [newData, setnewData] = useState();
  const [ContaminationData, setContaminationData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderNoPayload, setorderNoPayload] = useState();
  const [OrderNo, setOrderNo] = useState();
  const [Supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");
  const [showDateInput, setShowDateInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [PrintByDate, setPrintByDate] = useState(null);
  const [printResponseData, setPrintResponseData] = useState([]);
  console.log("printResponseData", printResponseData);
  const [messageApi, contextHolder] = message.useMessage();
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [shiftLov, setShiftLov] = useState([]);
  const [reason, setReason] = useState(false);
  const [shiftPrint, setShiftPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [orderNumberPrint, setOrderNumberPrint] = useState("");

  const GlobalStyle = createGlobalStyle`
 @media print {
   @page {
     size: portrait;
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

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData[0]?.supervisor_sign;
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
          setGetImage(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username1 = printResponseData[1]?.supervisor_sign;
    if (username1) {
      console.log("usernameparams1", username1);

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${username1}`,
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
          setGetImage1(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl]);

  console.log("get image", getImage);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username2 = printResponseData[2]?.supervisor_sign;
    if (username2) {
      console.log("usernameparams2", username2);

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
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
          setGetImage2(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl]);

  console.log("get image2", getImage2);

  const [getImage3, setGetImage3] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username3 = printResponseData[2]?.hod_sign;
    if (username3) {
      console.log("usernameparams3", username3);

      axios
        .get(
          `${API.prodUrl}/Precot/api/Format/Service/image?username=${username3}`,
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
          setGetImage3(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,API.prodUrl]);

  console.log("get image", getImage);

  const [gotobtn, setGotobtn] = useState(true);

  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const role = userRole;

  const formatDateToDDMMYYYY = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (newDate) {
      const formattedDate = formatDateToDDMMYYYY(newDate);
      setDate(formattedDate); // Save formatted date in date state
    }
  }, [newDate]);

  const handlePrint = () => {
    setShowModal(true);
    console.log("print screen works");
  };
  const printDateSubmit = () => {
    // checkDateExists();
  };
  const handleDateChange = (event) => {
    setPrintByDate(event.target.value);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleDatePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);
    fetchPrintValue(value); // Pass the date directly
  };

  useEffect(() => {
    setIsButtonDisabled(!datePrint); // Disable button if datePrint is empty
  }, [datePrint]);

  const fetchPrintValue = (value) => {
    try {
      const formattedDate = moment(value, "YYYY-MM-DD").format("DD/MM/YYYY");
      axios
        .get(
          `${API.prodUrl}/Precot/api/PadPunching/Service/PackingDetails/getByDatePrint?date=${formattedDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("Full response:", res.data);
          if (res.data && res.data.message !== "No data") {
            setPrintResponseData(res.data);
            console.log("Print response:", res.data);
            setIsButtonDisabled(false); // Enable the button if data is found
          } else {
            message.error("No data found...!");
            setIsButtonDisabled(true); // Disable the button if no data is found
          }
        })
        .catch((err) => {
          console.log("Error", err);
          setIsButtonDisabled(true); // Disable the button if an error occurs
        });
    } catch (error) {
      console.error("Error in fetchPrintValue:", error);
      setIsButtonDisabled(true);
    }
  };

  const fetchOrderbasedHeadersPrint = (value) => {
    setOrderNumberPrint(value);
  };

  const Shift = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
  ];

  const printSubmit = () => {
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
        console.log(data);

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

  const handleShiftChange = (value) => {
    console.log(" Shift ", value);
    setShift(value);
    setGotobtn(false);
  };

  const goTo = () => {
    if (newDate == "" || newDate == null) {
      message.warning("Please Select Date");
      return;
    } else if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    }
    navigate("/Precot/Padpunching/F-04", {
      state: {
        newdate: date,
        shiftvalue: shift,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        let apiUrl = "";
        if (role === "ROLE_SUPERVISOR") {
          apiUrl = `${API.prodUrl}/Precot/api/PadPunching/Service/PackingDetails/getPackingDetailsSummary`;
        } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
          apiUrl = `${API.prodUrl}/Precot/api/PadPunching/Service/PackingDetails/getPackingDetailsSummary`;
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

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();

        console.log("Fetched data:", data);

        if (!data || !Array.isArray(data)) {
          throw new Error("Data is not an array or undefined");
        }

        setnewData(data);
        setmodalData(data);

        setContaminationData(
          data.map((item) => ({
            key: item.header_id, // Assuming header_id is unique
            formatName: item.formatName,
            formatNo: item.formatNo,
            revisionNo: item.revisionNo,
            date: item.date,
            orderNo: item.orderNo,
            reason: item.reason,
            productName: item.productName,
            shift: item.shift,
            operator_status: item.operator_status,
            status: item.status,
            hod_status: item.hod_status,
            supervisor_status: item.supervisor_status,
            mailstatus: item.mail_status,
            details: item.details.map((detail) => ({
              lineId: detail.lineId,
              julianCode: detail.julianCode,
              machineName: detail.machineName,
              noOfBags: detail.noOfBags,
              noOfBagsCarton: detail.noOfBagsCarton,
              noOfCartons: detail.noOfCartons,
              poNo: detail.poNo,
            })),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of ContaminationData) {
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
  }, [ContaminationData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Precot");
  };

  useEffect(() => {
    console.log("modal", modalData);
  }, [modalData]);

  const handleModalClose = () => {
    setShowModal(false);
    setShiftPrint(null);
    setDatePrint(null);
    setOrderNumberPrint(null);
  };

  const handleEdit = (record) => {
    console.log("recorddd", record);

    const { date, shift } = record;

    navigate("/Precot/Padpunching/F-04", {
      state: {
        newdate: date,
        shiftvalue: shift,
      },
    });
  };

  const formattedSupervisorDate0 = printResponseData[0]?.supervisor_submit_on
    ? moment(printResponseData[0]?.supervisor_submit_on).format(
        "DD/MM/YYYY HH:mm"
      )
    : "";

  const formattedSupervisorDate1 = printResponseData[1]?.supervisor_submit_on
    ? moment(printResponseData[1]?.supervisor_submit_on).format(
        "DD/MM/YYYY HH:mm"
      )
    : "";

  const formattedSupervisorDate2 = printResponseData[2]?.supervisor_submit_on
    ? moment(printResponseData[2]?.supervisor_submit_on).format(
        "DD/MM/YYYY HH:mm"
      )
    : "";

  const formattedhodDate = printResponseData[2]?.hod_submit_on
    ? moment(printResponseData[2]?.hod_submit_on).format("DD/MM/YYYY HH:mm")
    : "";

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new window.Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const baseColumns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    // {
    //     title: "Machine Name",
    //     dataIndex: "machineName",
    //     key: "machineName",
    //     align: 'center',
    //   },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "formatDate",
      align: "center",
      //render: (text) => formatDate(text),
    },
    // {
    //   title: "Product Name",
    //   dataIndex: "productName",
    //   key: "productName",
    //   align:'center'
    // },

    {
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "HOD/Designee  Status",
      dataIndex: "hod_status",
      key: "hod_status",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "actions",
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

  let columns = [...baseColumns];

  // Insert the "Reason" column before the "Action" column if `reason` exists
  if (reason) {
    const actionIndex = columns.findIndex((col) => col.key === "actions");
    columns.splice(actionIndex, 0, Reason);
  }

  let numberOfPages = Math.ceil(printResponseData.length / 1);

  console.log("pr", printResponseData?.stdGsm);

  const rowsPerPage = 15;

  // Flatten the data to get individual row items
  const allRows = printResponseData.flatMap((responseData) =>
    responseData.details.map((detail) => ({
      shift: responseData.shift,
      julianCode: detail.julianCode,
      machineName: detail.machineName,
      productName: detail.productName,
      poNo: detail.poNo,
      bmrNo: detail.bmrNo,
      noOfBagsCarton: detail.noOfBagsCarton,
      noOfCartons: detail.noOfCartons,
      noOfBags: detail.noOfBags,
    }))
  );

  // Calculate total pages
  const totalPages = Math.ceil(allRows.length / rowsPerPage);

  // Function to chunk data into pages
  const chunkedData = [];
  for (let i = 0; i < totalPages; i++) {
    chunkedData.push(allRows.slice(i * rowsPerPage, (i + 1) * rowsPerPage));
  }

  return (
    <div>
      {contextHolder}

      <GlobalStyle />
      <div id="section-to-print">
        {chunkedData.map((pageData, pageIndex) => (
          <table key={pageIndex} style={{ width: "85%", tableLayout: "fixed" }}>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="18"></td>
            </tr>
            <thead style={{ marginTop: "100px" }}>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="18"></td>
              </tr>
              <tr>
                <td
                  colSpan="3"
                  rowSpan="4"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br />
                  Unit H
                </td>
                <td
                  colSpan="9"
                  rowSpan="4"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Daily Production Packing Details
                </td>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Format No.:
                </td>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  PH-PRD03/F-004
                </td>
              </tr>

              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Revision No.:
                </td>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  01
                </td>
              </tr>

              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Ref. SOP No.:
                </td>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  PH-PRD04-D-03
                </td>
              </tr>

              <tr>
                <td colSpan="3">Page No.:</td>
                <td colSpan="3">
                  {pageIndex + 1} of {totalPages}
                </td>
              </tr>

              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="18"></td>
              </tr>

              <tr>
                <td
                  colSpan="10"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  DEPARTMENT NAME: PAD PUNCHING{" "}
                </td>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "left",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Date:{printResponseData[0]?.date}
                </td>
              </tr>

              <tr>
                <td
                  colSpan="1"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Shift
                </td>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Julian Code
                </td>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Machine Name
                </td>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Product Name
                </td>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  PO NO
                </td>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  BMR NO. / ORDER NO.
                </td>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  No. of Bags / Carton
                </td>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  No. of Cartons
                </td>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  No. of Bags
                </td>
              </tr>
            </thead>

            <tbody>
              {/* {printResponseData.map((responseData, responseIndex) => (
    responseData.details.map((detail, index) => (
      <tr key={`${responseIndex}-${index}`}> */}
              {pageData.map((detail, index) => (
                <tr key={index}>
                  <td
                    colSpan="1"
                    style={{ textAlign: "center", fontSize: "12pt" }}
                  >
                    {detail.shift}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", fontSize: "12pt" }}
                  >
                    {detail.julianCode}
                  </td>
                  <td
                    colSpan="3"
                    style={{ textAlign: "center", fontSize: "12pt" }}
                  >
                    {detail.machineName}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", fontSize: "12pt" }}
                  >
                    {detail.productName}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", fontSize: "12pt" }}
                  >
                    {detail.poNo}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", fontSize: "12pt" }}
                  >
                    {detail.bmrNo}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", fontSize: "12pt" }}
                  >
                    {detail.noOfBagsCarton}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", fontSize: "12pt" }}
                  >
                    {detail.noOfCartons}
                  </td>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", fontSize: "12pt" }}
                  >
                    {detail.noOfBags}
                  </td>
                </tr>
              ))}

              <br />
              {pageIndex + 1 === totalPages && (
                <>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      Shift
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      1
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      2
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      3
                    </td>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      Total
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      Total No. of Carton Packed
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {printResponseData[0]?.noOfBagsPacked || 0}
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {printResponseData[1]?.noOfBagsPacked || 0}
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {printResponseData[2]?.noOfBagsPacked || 0}
                    </td>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {(Number(printResponseData[0]?.noOfBagsPacked) || 0) +
                        (Number(printResponseData[1]?.noOfBagsPacked) || 0) +
                        (Number(printResponseData[2]?.noOfBagsPacked) || 0)}
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      Total No. of Bags Packed
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {printResponseData[0]?.noOfCartonPacked || 0}
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {printResponseData[1]?.noOfCartonPacked || 0}
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {printResponseData[2]?.noOfCartonPacked || 0}
                    </td>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {(Number(printResponseData[0]?.noOfCartonPacked) || 0) +
                        (Number(printResponseData[1]?.noOfCartonPacked) || 0) +
                        (Number(printResponseData[2]?.noOfCartonPacked) || 0)}
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan="5"
                      rowSpan="2"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      Remarks:{printResponseData[0]?.remarks}
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      Prod. Supervisor Sign & Date
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      Prod. Supervisor Sign & Date
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      Prod. Supervisor Sign & Date
                    </td>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      HOD / Designee Sign & Date
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {printResponseData[0]?.supervisor_sign ||
                      formattedSupervisorDate0
                        ? `${printResponseData[0]?.supervisor_sign || ""} ${
                            formattedSupervisorDate0 || ""
                          }`.trim()
                        : "NA"}
                      <br />
                      {printResponseData[0]?.supervisor_sign &&
                        formattedSupervisorDate0 &&
                        getImage && (
                          <img
                            src={getImage}
                            alt="Supervisor Sign"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {printResponseData[1]?.supervisor_sign ||
                      formattedSupervisorDate1
                        ? `${printResponseData[1]?.supervisor_sign || ""} ${
                            formattedSupervisorDate1 || ""
                          }`.trim()
                        : "NA"}
                      <br />
                      {printResponseData[1]?.supervisor_sign &&
                        formattedSupervisorDate1 &&
                        getImage1 && (
                          <img
                            src={getImage1}
                            alt="Supervisor Sign"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                    </td>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {printResponseData[2]?.supervisor_sign ||
                      formattedSupervisorDate2
                        ? `${printResponseData[2]?.supervisor_sign || ""} ${
                            formattedSupervisorDate2 || ""
                          }`.trim()
                        : "NA"}
                      <br />
                      {printResponseData[2]?.supervisor_sign &&
                        formattedSupervisorDate2 &&
                        getImage2 && (
                          <img
                            src={getImage2}
                            alt="Supervisor Sign"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                    </td>

                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        fontSize: "12pt",
                        fontFamily: "Times New Roman, Times, serif",
                      }}
                    >
                      {printResponseData[2]?.hod_sign || formattedhodDate
                        ? `${printResponseData[2]?.hod_sign || ""} ${
                            formattedhodDate || ""
                          }`.trim()
                        : "NA"}
                      <br />
                      {printResponseData[2]?.hod_sign &&
                        formattedhodDate &&
                        getImage3 && (
                          <img
                            src={getImage3}
                            alt="Supervisor Sign"
                            style={{
                              width: "70px",
                              height: "50px",
                              marginLeft: "20px",
                              objectFit: "contain",
                              mixBlendMode: "multiply",
                              justifyContent: "space-evenly",
                            }}
                          />
                        )}
                    </td>
                  </tr>
                </>
              )}
            </tbody>

            <br />

            <tfoot>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="18"></td>
              </tr>

              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="18"></td>
              </tr>
              <tr>
                <td
                  colspan="3"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Particulars
                </td>
                <td
                  colspan="5"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Prepared by
                </td>
                <td
                  colspan="5"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Reviewed by
                </td>
                <td
                  colspan="5"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Approved by
                </td>
              </tr>
              <tr>
                <td
                  colspan="3"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Name
                </td>
                <td
                  colspan="5"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                ></td>
                <td
                  colspan="5"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                ></td>
                <td
                  colspan="5"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                ></td>
              </tr>
              <tr>
                <td
                  colspan="3"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  Signature & Date
                </td>
                <td
                  colspan="5"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                ></td>
                <td
                  colspan="5"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                ></td>
                <td
                  colspan="5"
                  style={{
                    textAlign: "center",
                    fontSize: "12pt",
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                ></td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>

      <div>
        <BleachingHeader
          unit="Unit-H"
          formName="Daily Production Packing Details"
          formatNo="PH-PRD03/F-004"
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
              onClick={handleBack}
              shape="round"
              icon={<GoArrowLeft color="#00308F" />}
            >
              Back
            </Button>,
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                marginRight: "10px",
                // display: printBtnStatus ? "block" : "none",
              }}
              shape="round"
              icon={<IoPrint color="#00308F" />}
              onClick={handlePrint}
            >
              &nbsp;Print
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
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "16px",
          }}
        >
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="Medium"
            format="DD/MM/YYYY"
            value={newDate}
            style={{
              fontWeight: "bold",
              width: "135px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
            onChange={(e) => setNewDate(e.target.value)}
            max={getCurrentDate()}
          />

          <Select
            showSearch
            value={shift}
            onChange={handleShiftChange}
            style={{
              backgroundColor: "#E5EEF9",
              fontWeight: "bold",
              margin: "10px",
              marginLeft: "70px",
              width: "200px", // Adjust the width as needed
            }}
            placeholder="Shift"
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

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              backgroundColor: "#E5EEF9",
              margin: "10px",
              marginLeft: "10px",
            }}
            shape="round"
            icon={<BiNavigation color={"#00308F"} />}
            onClick={goTo}
          >
            Go To
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={ContaminationData} />

      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            shape="round"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={printSubmit}
            disabled={isButtonDisabled}
          >
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
            Date:
          </label>

          <Input
            onChange={handleDatePrint}
            type="date"
            value={datePrint}
            size="small"
            // max ={ formattedToday }
            style={{ width: "50%", height: "30px" }}
          />
        </div>
        {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ marginRight: '8px', width: '30%' , textAlign:'center' }}>Shift:</label>
 
                <Select
                   showSearch
                   value={shiftPrint}
                   
                   style={{ width: '50%' }}
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
     
              </div> */}
      </Modal>
    </div>
  );
};

export default Padpunching_f04_summary;
