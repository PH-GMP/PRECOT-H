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

// import "./Giridharan.css";
import API from "../baseUrl.json";
import moment from "moment";
import Padpunching_f25_edit from "./Padpunching_f24_edit.js";

const { Option } = Select;

const Padpunching_f25_summary = () => {
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

  const [selectedRow, setSelectedRow] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  console.log("selected row", selectedRow);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  // const [availableShifts, setAvailableShifts] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [cakingData, setCakingData] = useState([]);
  const [searchDate, setSearchDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [selectedShift, setSelectedShift] = useState("");
  const [shiftSelections, setShiftSelections] = useState(Array(1).fill(""));
  const [shift, setShift] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [printDate, setPrintDate] = useState("");
  const [printShift, setPrintShift] = useState("");
  const [gotobtn, setGotobtn] = useState(true);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [messageApi, contextHolder] = message.useMessage();
  const [printResponseData, setPrintResponseData] = useState(null);
  const [reason, setReason] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const [getImage, setGetImage] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if printResponseData exists and is an array
    if (Array.isArray(printResponseData)) {
      printResponseData.forEach((item, pageIndex) => {
        const username = item?.supervisor_sign;

        if (username) {
          console.log("usernameparamsSuper", username);

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
              console.log("Response:", res.data);
              const base64 = btoa(
                new Uint8Array(res.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              );
              const url = `data:image/jpeg;base64,${base64}`;

              // Update state with image URL for specific index
              setGetImage((prevImages) => ({
                ...prevImages,
                [pageIndex]: url, // Use index to associate URL with its position
              }));
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
        }
      });
    }
  }, [ API.prodUrl, printResponseData]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if printResponseData exists and is an array
    if (Array.isArray(printResponseData)) {
      printResponseData.forEach((item, pageIndex) => {
        const username = item?.hod_sign;

        if (username) {
          console.log("usernameparams", username);

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
                [pageIndex]: url,
              }));
            })
            .catch((err) => {
              console.log("Error in fetching image:", err);
            });
        }
      });
    }
  }, [printResponseData, API.prodUrl]);

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const formattedDateOnly = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY ");
      }
    }
    return "";
  };
  const entriesPerPage = 15;
  const chunkedSanitizationList = [];

  console.log("printResponseData:", printResponseData);

  if (
    printResponseData &&
    Array.isArray(printResponseData) &&
    printResponseData.length > 0
  ) {
    for (let j = 0; j < printResponseData.length; j++) {
      const currentItem = printResponseData[j];
      console.log(`Processing item ${j + 1}`, currentItem);

      if (currentItem && Array.isArray(currentItem.sanitizationList)) {
        console.log(
          "Sanitization list is valid and has length:",
          currentItem.sanitizationList.length
        );

        for (
          let i = 0;
          i < currentItem.sanitizationList.length;
          i += entriesPerPage
        ) {
          console.log(
            `Processing slice from index ${i} to ${
              i + entriesPerPage
            } for item ${j + 1}`
          );
          chunkedSanitizationList.push(
            currentItem.sanitizationList.slice(i, i + entriesPerPage)
          );
        }

        console.log(
          `Chunked Sanitization List for item ${j + 1}:`,
          chunkedSanitizationList
        );
      } else {
        console.warn(
          `sanitizationList for item ${
            j + 1
          } is undefined, not an array, or empty.`
        );
      }
    }
  } else {
    console.warn("printResponseData is undefined, not an array, or empty.");
  }

  console.log;
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const [showModal, setShowModal] = useState(false);
  let formattedSupervisorDate;

  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        let apiUrl = `${ API.prodUrl}/Precot/api/punching/getHandSanitationSummaryF24`;

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

        setCakingData(data);

        setFilteredData(
          data.map((item) => ({
            key: item.header_id, // Assuming header_id is unique
            formatName: item.formatName,
            formatNo: item.formatNo,
            revisionNo: item.revisionNo,
            date: item.date,
            orderNo: item.order_no,

            productName: item.product_name,

            shift: item.shift,

            status: item.status,
            hod_status: item.hod_status,
            supervisor_status: item.supervisor_status,
            mailstatus: item.mail_status,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error.response);
        //alert(error)
        message.error(error.response?.data?.message || "An error occurred");
        // Set the flag to true after showing the error message
        // setSummary([]); // Set an empty array in case of error
        //navigate("/Precot/choosenScreen");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const findReason = () => {
      for (const data of filteredData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [filteredData]);

  const printDateSubmit = () => {
    window.print();
  };

  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Shift details fetched:", res.data);
        // const shifts = res.data.map((shift) => shift.value);
        // setAvailableShifts(shifts);
        setShiftOptions(res.data);
      })
      .catch((err) => {
        console.log("Error fetching shifts:", err);
      });
  }, []);

  const handleViewDetails = (record) => {
    setSelectedRow(record);
    setIsModalVisible(true);
  };
  const handleDatePrint = (event) => {
    const value = event.target.value;
    setPrintDate(value);

    // Fetch data for the given date and the currently selected shift (if any)
    fetchData(value, printShift);
  };

  const handlePrintChange = (shiftValue) => {
    setPrintShift(shiftValue);

    // Fetch data for the currently selected date and the newly selected shift
    fetchData(printDate, shiftValue);
  };

  const fetchData = (date, shiftValue) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage.");
      message.error("No token found. Please log in again.");
      setIsSubmitDisabled(true);
      return;
    }

    try {
      let apiUrl = `${
       API.prodUrl
      }/Precot/api/punching/getHandSanitationPrintF24?date=${date || ""}`;

      if (shiftValue) {
        apiUrl += `&shift=${shiftValue}`;
      }

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const printres = res.data;
          /*
                 res.data.map((x,i) => {
                   return <Print>
                       <p>Shift {x.shift}</p>
                       {
                       x.sanitizationList.map
                       }
                   </Print>
                  })
                */
          if (printres && printres.message === "No data") {
            message.error("No data found for the selected shift and/or date.");
            setIsSubmitDisabled(true);
          } else if (printres && Object.keys(printres).length > 0) {
            setPrintResponseData(printres);
            setIsSubmitDisabled(false);
          } else {
            message.error("No data found for the selected shift and/or date.");
            setIsSubmitDisabled(true);
          }
        })
        .catch((err) => {
          console.error("Error in axios get request:", err.response || err);
          message.error("Failed to fetch data. Please try again later.");
          setIsSubmitDisabled(true);
        });
    } catch (error) {
      console.error("Error in fetchData:", error);
      message.error("An unexpected error occurred. Please try again later.");
      setIsSubmitDisabled(true);
    }
  };
  console.log("Pret", printResponseData);
  const handleGoToChange = () => {
    if (newDate == "" || newDate == null) {
      message.warning("Please Select Date");
      return;
    } else if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    }

    console.log("e5dr6ft7gy8iuo ", newDate, shift);
    navigate("/Precot/Padpunching/F-06", {
      state: {
        date: newDate,
        shiftvalue: shift,
      },
    });
  };

  const handleEdit = (record) => {
    console.log("values", record);
    const { shift, date } = record;
    navigate("/Precot/Padpunching/F-06/edit", {
      state: {
        shift: shift,
        date41: date,
      },
    });
    console.log("precot", shift, date);

    const x = cakingData.filter((x, i) => {
      return record.formatNo == formatNo;
      navigate("/Precot/Padpunching/F-24");
    });
    setNewStatus(x);
    setModalData(record);
    setNewModal(true);
  };

  const handleShiftChange = (value) => {
    console.log(" Shift ", value);
    setShift(value);
    setGotobtn(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPrintShift(null);
    setPrintDate(null);
  };
  useEffect(() => {
    console.log("print response data", printResponseData);
  }, [printResponseData]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    if (printDate && printShift) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [printDate]);
  //   const handlePrintChange = (shiftValue) => {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //         console.error("No token found in localStorage.");
  //         message.error("No token found. Please log in again.");
  //         return;
  //     }

  //     console.log("Token:", token);

  //     try {
  //         setPrintShift(shiftValue);

  //         // Construct the API URL based on whether printDate is defined
  //         let apiUrl = `${ API.prodUrl}/Precot/api/punching/getHandSanitationPrintF24?date=${printDate}`;
  //         if (shiftValue) {
  //             apiUrl += `&shift=${shiftValue}`;
  //         }

  //         axios
  //             .get(apiUrl, {
  //                 headers: {
  //                     Authorization: `Bearer ${token}`,
  //                     "Content-Type": "application/json",
  //                 },
  //             })
  //             .then((res) => {
  //                 const printres = res.data;
  //                 console.log("API Response:", printres);

  //                 if (printres && printres.message === "No data") {
  //                     message.error("No data found.");
  //                 } else if (printres && Object.keys(printres).length > 0) {
  //                     setPrintResponseData(printres);
  //                 } else {
  //                     message.error("No data found for the selected shift and/or date.");
  //                 }
  //             })
  //             .catch((err) => {
  //                 console.error("Error in axios get request:", err.response || err);
  //                 message.error("Failed to fetch data. Please try again later.");
  //             });
  //     } catch (error) {
  //         console.error("Error in handlePrintChange:", error);
  //         message.error("An unexpected error occurred. Please try again later.");
  //     }
  // };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };
  // const handlePrint = () => {
  //   window.print();
  // };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const baseColumns = [
    {
      title: "S.No",
      key: "serial",
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
      title: "Supervisor Status",
      dataIndex: "supervisor_status",
      key: "supervisor_status",
      align: "center",
    },
    {
      title: "Hod/Designee Status",
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

  let columns = [...baseColumns];

  // Insert the "Reason" column before the "Action" column if `reason` exists
  if (reason) {
    const actionIndex = columns.findIndex((col) => col.key === "actions");
    columns.splice(actionIndex, 0, Reason);
  }

  let sanitizationList = [];
  if (selectedRow && selectedRow.sanitizationList) {
    sanitizationList = selectedRow.sanitizationList.slice(0, 1);
    while (sanitizationList.length < 1) {
      sanitizationList.push({});
    }
  }

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const formatNo = "PH-PRD02/F-025";
  const revisionNo = "01";
  const sopNo = "PH-HRD01-D-0";
  const unit = "UNIT-H";

  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        <style></style>
        {printResponseData &&
          printResponseData.map((x, pageIndex) => {
            // Split the sanitization list into chunks of 21 items each
            const sanitizationChunks = chunkArray(x.sanitizationList, 20);
            const totalPages = sanitizationChunks.length;
            let itemNumber = 1; // Initialize item number for each page

            return sanitizationChunks.map((chunk, chunkIndex) => {
              const isFirstChunk = chunkIndex === 0;
              const isLastChunk = chunkIndex === sanitizationChunks.length - 1;
              const currentPageNumber =
                pageIndex * sanitizationChunks.length + chunkIndex + 1;
              return (
                <table
                  style={{
                    width: "90%",
                    borderCollapse: "collapse",
                    pageBreakBefore: chunkIndex > 0 ? "always" : "auto",
                    marginTop: "20px",
                    tableLayout: "fixed",
                  }}
                  key={`${pageIndex}-${chunkIndex}`}
                >
                  <thead>
                    {/* Header Rows */}
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
                        Hand Sanitisation Report
                      </th>
                      <th colSpan="17" style={{ border: "1px solid black" }}>
                        Format No.:
                      </th>
                      <td colSpan="15" style={{ border: "1px solid black" }}>
                        PH-HRD01-F-023
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="17" style={{ border: "1px solid black" }}>
                        Revision No.:
                      </th>
                      <td colSpan="15" style={{ border: "1px solid black" }}>
                        01
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="17" style={{ border: "1px solid black" }}>
                        Ref.SOP No.:
                      </th>
                      <td colSpan="15" style={{ border: "1px solid black" }}>
                        PH-HRD04-D-03
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="17" style={{ border: "1px solid black" }}>
                        Page No.:
                      </th>
                      <td colSpan="15" style={{ border: "1px solid black" }}>
                        {currentPageNumber} of{" "}
                        {totalPages * printResponseData.length}
                      </td>
                    </tr>
                  </thead>
                  <br />
                  <br />
                  <tbody>
                    <tr>
                      <th
                        colSpan="49"
                        style={{ height: "20px", border: "1px solid black" }}
                      >
                        Date: <span>{formattedDateOnly(x.date)}</span>
                      </th>
                      <th colSpan="41" style={{ border: "1px solid black" }}>
                        Shift: <span>{x.shift}</span>
                      </th>
                    </tr>
                    {/* Sanitization List Entries */}
                    {chunk.map((entry, index) => (
                      <tr key={index}>
                        <td
                          colSpan="9"
                          style={{
                            border: "1px solid black",
                            height: "10px",
                            textAlign: "center",
                          }}
                        >
                          {itemNumber++} {/* Increment item number */}
                        </td>
                        {/* <td
                          colSpan="10"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {entry.name || ""}
                        </td> */}
                        <td
                          colSpan="9"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {entry.idNumber || ""}
                        </td>
                        <td
                          colSpan="9"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {entry.hour1 === "Y" ? "✓" : "✗"}
                        </td>
                        <td
                          colSpan="9"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {entry.hour2 === "Y" ? "✓" : "✗"}
                        </td>
                        <td
                          colSpan="9"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {entry.hour3 === "Y" ? "✓" : "✗"}
                        </td>
                        <td
                          colSpan="9"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {entry.hour4 === "Y" ? "✓" : "✗"}
                        </td>
                        <td
                          colSpan="9"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {entry.hour5 === "Y" ? "✓" : "✗"}
                        </td>
                        <td
                          colSpan="9"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {entry.hour6 === "Y" ? "✓" : "✗"}
                        </td>
                        <td
                          colSpan="9"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {entry.hour7 === "Y" ? "✓" : "✗"}
                        </td>
                        <td
                          colSpan="9"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {entry.hour8 === "Y" ? "✓" : "✗"}
                        </td>
                      </tr>
                    ))}
                    {/* Footer Row */}
                    {isLastChunk && (
                      <>
                        <tr>
                          <td
                            colSpan="90"
                            style={{ border: "1px solid black" }}
                          >
                            <div style={{ lineHeight: "1.0" }}>
                              ಗಮನಿಸಿ: ALCONOX- ಸಾಕಷ್ಟು ಪ್ರಮಾಣದ ಹ್ಯಾಂಡ್
                              ಸ್ಯಾನಿಟೈಜರ್ ಅನ್ನು ಅನ್ವಯಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕೈಗಳನ್ನು
                              ಒಟ್ಟಿಗೆ ಉಜ್ಜಿಕೊಳ್ಳಿ, ಅಂಗೈಗಳು,
                            </div>
                            <div style={{ lineHeight: "1.5" }}>
                              ಬೆರಳುಗಳು ಮತ್ತು ಉಗುರುಗಳು ಸೇರಿದಂತೆ ನಿಮ್ಮ ಕೈಗಳ ಎಲ್ಲಾ
                              ಬೆರಳುಗಳನ್ನು ಕನಿಷ್ಠ 20 ಸೆಕೆಂಡುಗಳ ಕಾಲ ಉಜ್ಜಲು
                              ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="45"
                            style={{
                              height: "10px",
                              textAlign: "center",
                              border: "1px solid black",
                              height: "15%",
                            }}
                          >
                            <b>
                              Verified by (Supervisor) Production Signature &
                              Date
                            </b>
                            <br />
                            <br />
                            <div>
                              {printResponseData &&
                                printResponseData[pageIndex]
                                  ?.supervisor_sign && (
                                  <span>
                                    {
                                      printResponseData[pageIndex]
                                        ?.supervisor_sign
                                    }
                                  </span>
                                )}
                              <br />
                              {formattedDate(
                                printResponseData[pageIndex]
                                  ?.supervisor_submit_on
                              )}
                              <br />
                              {getImage[pageIndex] && (
                                <img
                                  src={getImage[pageIndex]}
                                  alt="Supervisor Sign"
                                  style={{
                                    width: "22%",
                                    height: "8%",
                                    marginLeft: "20px",
                                    objectFit: "contain",
                                    mixBlendMode: "multiply",
                                    justifyContent: "space-evenly",
                                  }}
                                />
                              )}
                            </div>
                            Sign & Date
                          </td>
                          <td
                            colSpan="45"
                            style={{
                              textAlign: "center",
                              border: "1px solid black",
                              height: "15%",
                            }}
                          >
                            <b>Reviewed by Head of the Department / Designee</b>
                            <br />
                            <br />
                            <div>
                              {printResponseData &&
                                printResponseData[pageIndex]?.hod_sign && (
                                  <span>
                                    {printResponseData[pageIndex]?.hod_sign}
                                  </span>
                                )}
                              <br />
                              {formattedDate(
                                printResponseData[pageIndex]?.hod_submit_on
                              )}
                              <br />
                              {getImage1[pageIndex] && (
                                <img
                                  src={getImage1[pageIndex]}
                                  alt="Hod Sign"
                                  style={{
                                    width: "22%",
                                    height: "8%",
                                    marginLeft: "20px",
                                    objectFit: "contain",
                                    mixBlendMode: "multiply",
                                    justifyContent: "space-evenly",
                                  }}
                                />
                              )}
                            </div>
                            Sign & Date
                          </td>
                        </tr>
                      </>
                    )}
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
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      >
                        Particulars
                      </th>
                      <th
                        colSpan="30"
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      >
                        Prepared by
                      </th>
                      <th
                        colSpan="20"
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      >
                        Reviewed by
                      </th>
                      <th
                        colSpan="25"
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      >
                        Approved by
                      </th>
                    </tr>
                    <tr>
                      <th
                        colSpan="15"
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      >
                        Name
                      </th>
                      <th
                        colSpan="30"
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      ></th>
                      <th
                        colSpan="20"
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      ></th>
                      <th
                        colSpan="25"
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      ></th>
                    </tr>
                    <tr>
                      <th
                        colSpan="15"
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      >
                        Signature & Date
                      </th>
                      <th
                        colSpan="30"
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      ></th>
                      <th
                        colSpan="20"
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      ></th>
                      <th
                        colSpan="25"
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      ></th>
                    </tr>
                  </tfoot>
                </table>
              );
            });
          })}
      </div>

      {contextHolder}

      <BleachingHeader
        unit="Unit-H"
        formName="Hand Sanitisation Report"
        formatNo="PH-HRD01-F-023"
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
            // icon={<IoIosArrowBack style={{ color: "#00308F" }} />}
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            width: "20%",
            alignItems: "center",
          }}
        >
          <Input
            addonBefore="Date"
            placeholder="Date"
            type="date"
            size="small"
            value={newDate}
            style={{ fontWeight: "bold", marginRight: "1em" }}
            onChange={(e) => setNewDate(e.target.value)}
            max={getCurrentDate()}
          />
          <label>Shift:</label>
          <Select
            placeholder="Select Shift"
            value={shift}
            onChange={handleShiftChange}
            style={{ width: 120, fontWeight: "bold", marginright: "60px" }}
          >
            {shiftOptions.map((shift) => (
              <Option key={shift.id} value={shift.value}>
                {shift.value}
              </Option>
            ))}
          </Select>

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiNavigation color="#00308F" />}
            onClick={handleGoToChange}
          >
            Go To
          </Button>
        </div>
      </div>

      <Table
        bordered
        style={{ textAlign: "center" }}
        columns={columns}
        dataSource={apiData || cakingData}
      />

      <Modal
        title="Edit Form"
        visible={newModal}
        onCancel={() => setNewModal(false)}
        width="100vw"
      >
        <Padpunching_f25_edit data={modalData} status={newStatus} />
      </Modal>
      <Modal
        title="Print"
        open={showModal}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        destroyOnClose={true}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={printDateSubmit}
            disabled={isSubmitDisabled}
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
            width: "100%",
          }}
        >
          <label>Date:</label>
          <Input
            type="date"
            size="small"
            value={printDate}
            style={{ fontWeight: "bold", marginRight: "1em", width: "60%" }}
            onChange={handleDatePrint}
            max={getCurrentDate()}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            width: "100%",
          }}
        >
          <label>Shift:</label>

          <Select
            placeholder="Select Shift"
            value={printShift}
            onChange={(value) => handlePrintChange(value)}
            style={{ fontWeight: "bold", marginRight: "70px", width: "60%" }}
          >
            {shiftOptions.map((shift) => (
              <Option key={shift.id} value={shift.value}>
                {shift.value}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default Padpunching_f25_summary;
