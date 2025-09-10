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
import Bleaching_f41_edit from "./Bleaching_f41_edit";
import BleachingHeader from "../Components/BleachingHeader";
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
// import "./Giridharan.css";
import API from "../baseUrl.json";
import moment from "moment";

const { Option } = Select;

const Bleaching_f41_summary = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  // console.log("selected row", selectedRow);
  const [reason,setReason] = useState(false);
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
  const formattedDatesupervisor = () => {
    if (printResponseData?.[0]?.supervisor_submit_on) {
      const date = moment(printResponseData?.[0]?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDate = printResponseData?.[0]?.date
    ? new Date(printResponseData[0].date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";
  const formattedDateHod = () => {
    if (printResponseData?.[0]?.hod_submit_on) {
      const date = moment(printResponseData?.[0]?.hod_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  const entriesPerPage = 8;
  const chunkedSanitizationList = [];
  if (
    printResponseData &&
    printResponseData.length > 0 &&
    printResponseData[0].sanitizationList
  ) {
    for (
      let i = 0;
      i < printResponseData[0].sanitizationList.length;
      i += entriesPerPage
    ) {
      chunkedSanitizationList.push(
        printResponseData[0].sanitizationList.slice(i, i + entriesPerPage)
      );
    }
  } else {
    console.warn(
      "printResponseData or sanitizationList is undefined or empty."
    );
  }

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
  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.supervisor_sign;
    if (username) {
      // console.log("usernameparams", username);

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
    }
  }, [printResponseData,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.[0]?.hod_sign;
    if (username) {
      // console.log("usernameparams", username);

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
    }
  }, [printResponseData,API.prodUrl, token]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const role = localStorage.getItem("role");

  //       const response = await fetch(
  //         `${API.prodUrl}/Precot/api/Format/Service/getAllFormatSummary`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //           body: JSON.stringify({
  //             formatNo: "PRD01/F10",
  //             depertmentId: 1,
  //           }),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok.");
  //       }

  //       const data = await response.json();

  //       // Filter data based on role
  //       let filteredData = data;
  //       if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
  //         filteredData = data.filter(
  //           (item) =>
  //             item.supervisor_status !== "SUPERVISOR_SAVED" &&
  //             item.hod_status !== "HOD_APPROVED"
  //         );
  //       } else if (role === "ROLE_SUPERVISOR") {
  //         filteredData = data.filter(
  //           (item) => item.supervisor_status !== "HOD_APPROVED"
  //         );
  //       }

  //       setCakingData(filteredData);
  //       setFilteredData(filteredData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
 
        // Determine the API endpoint based on the role
        let apiUrl = "";
        if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
          apiUrl = `${API.prodUrl}/Precot/api/bleaching/Service/HandSanitizationSummaryForHod`;
        } else if (role === "ROLE_SUPERVISOR") {
          apiUrl = `${API.prodUrl}/Precot/api/bleaching/Service/HandSanitizationSummaryForSupervisor`;
        }
 
        if (!apiUrl) {
          throw new Error("Invalid role or API URL not set.");
        }
 
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
 
        // if(response.data.status === "No Data"){
        //   // console.log(" Response " , response.data.status);
        // }
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        
        const data = await response.json();
        if(data.status === "No Data"){
return;
        }else{
          // Process the data if any filtering is required
          setCakingData(data);
          setFilteredData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
 
    fetchData();
  }, []);
  useEffect(() => {
    const findReason = () => {
      for (const data of cakingData) {
          if (data.hod_status === "HOD_REJECTED") {
              setReason(true);
              break;
          }
      }
    };
    findReason();
  }, [cakingData]);

  const printDateSubmit = () => {
    window.print();
  };

  const handlePrint = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("Shift details fetched:", res.data);
        // const shifts = res.data.map((shift) => shift.value);
        // setAvailableShifts(shifts);
        setShiftOptions(res.data);
      })
      .catch((err) => {
        // console.log("Error fetching shifts:", err);
      });
  }, []);

  const handleViewDetails = (record) => {
    setSelectedRow(record);
    setIsModalVisible(true);
  };
  const handleDatePrint = (event) => {
    const value = event.target.value;

    setPrintDate(value);
  };

  const handleGoToChange = () => {
    if (newDate == "" || newDate == null) {
      message.warning("Please Select Date");
      return;
    } else if (shift == "" || shift == null) {
      message.warning("Please Select Shift");
      return;
    }

    // console.log("e5dr6ft7gy8iuo ", newDate, shift);
    navigate("/Precot/Bleaching/F-41", {
      state: {
        date: newDate,
        shiftvalue: shift,
      },
    });
  };

  const handleEdit = (record) => {
    // console.log("values", record);
    const { shift, date } = record;
    navigate("/Precot/Bleaching/F-41/edit", {
      state: {
        shift: shift,
        date41: date,
      },
    });
    // console.log("precot", shift, date);

    const x = cakingData.filter((x, i) => {
      return record.formatNo == formatNo;
      navigate("/Precot/Bleaching/F-41");
    });
    setNewStatus(x);
    setModalData(record);
    setNewModal(true);
  };

  const handleShiftChange = (value) => {
    // console.log(" Shift ", value);
    setShift(value);
    setGotobtn(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPrintShift(null);
    setPrintDate(null);
  };
  useEffect(() => {
    // console.log("print response data", printResponseData);
  }, [printResponseData]);

  const handlePrintChange = (value) => {
    try {
      setPrintShift(value);
      axios
        .post(
          `${API.prodUrl}/Precot/api/bleaching/Service/getHandSanitizationByShiftAnddate`,
          {
            date: printDate,
            shift: value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const printres = res.data;
            // console.log("print resssss", res.data[0]);
            // console.log("printtt", printres);
            setPrintResponseData(printres);
          } else {
            setPrintResponseData([]);
            message.error("no data found...!");
          }
        })
        .catch((err) => {
          // console.log("Error", err);
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

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
    render: (text) => (text ? text : 'N/A')
  };
   
  let columns;
  if (reason) {
    columns = [
      ...baseColumns.slice(0, 5),
      Reason,                  
      ...baseColumns.slice(5),    
    ];
  } else {
    columns = baseColumns;
  }

  let sanitizationList = [];
  if (selectedRow && selectedRow.sanitizationList) {
    sanitizationList = selectedRow.sanitizationList.slice(0, 1);
    while (sanitizationList.length < 1) {
      sanitizationList.push({});
    }
  }

  const formatNo = "PRD01/F-41";
  const revisionNo = "02";
  const sopNo = "HRD01-D-05";
  const unit = "UNIT-H";

  return (
    <div>
      <div id="section-to-print">
        <style>
          {`
      @media print {
        @page {
          size: landscape;
        }
        // body {
        //   -webkit-print-color-adjust: exact;
        // }
        body {
      -webkit-print-color-adjust: exact;
      width: 100%;
      height: 100%;
      transform: scale(0.9); /* Adjust scale as needed */
      transform-origin: top left right bottom; /* Adjust the origin if needed */
    }
        #section-to-print {
          page-break-after: always;
        }
      }
    `}
        </style>

        {chunkedSanitizationList.map((sanitizationChunk, pageIndex) => (
          <table
            style={{
              width: "90%",
              borderCollapse: "collapse",
              pageBreakBefore: pageIndex > 1 ? "always" : "auto",
              marginTop: "20px",
            }}
            key={pageIndex}
          >
            <tbody>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="90"></td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="90"></td>
              </tr>
              <tr>
                <th
                  colSpan="12"
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
                  colSpan="46"
                  rowSpan="4"
                  style={{ textAlign: "center", height: "80px" }}
                >
                  Bleaching Hand Sanitization Report <br />
                  (AB Bale Press Machine)
                </th>
                <th colSpan="10" style={{ border: "1px solid black" }}>
                  Format No.:
                </th>
                <td colSpan="22" style={{ border: "1px solid black" }}>
                PH-PRD01/F-010
                </td>
              </tr>
              <tr>
                <th colSpan="10" style={{ border: "1px solid black" }}>
                  Revision No.:
                </th>
                <td colSpan="22" style={{ border: "1px solid black" }}>
                  01
                </td>
              </tr>
              <tr>
                <th colSpan="10" style={{ border: "1px solid black" }}>
                  Ref.SOP No.:
                </th>
                <td colSpan="22" style={{ border: "1px solid black" }}>
                 PH-HRD01-D-03
                </td>
              </tr>
              <tr>
                <th colSpan="10" style={{ border: "1px solid black" }}>
                  Page No.:
                </th>
                <td colSpan="22" style={{ border: "1px solid black" }}>
                  {pageIndex + 1} of {chunkedSanitizationList.length}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="90"
                  style={{ border: "none", height: "10px" }}
                ></td>
                <br></br>
              </tr>
              <tr>
                <th
                  colSpan="90"
                  style={{ height: "20px", border: "1px solid black" }}
                >
                  Date: {formattedDate}
                </th>
                {/* <th colSpan="88" style={{ height: "20px", border: '1px solid black' }}>{formatDate(newDate)}</th> */}
              </tr>

              <tr>
                <th
                  colSpan="7"
                  style={{
                    border: "1px solid black",
                    height: "20px",
                    textAlign: "center",
                  }}
                >
                  S.No.
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  Shift
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  ID No
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  1st Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  2nd Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  3rd Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  4th Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  5th Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  6th Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  7th Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  8th Hour
                </th>
                <th
                  colSpan="7"
                  style={{ border: "1px solid black", textAlign: "center" }}
                >
                  Remarks
                </th>
              </tr>
              {sanitizationChunk.map((entry, index) => (
                <tr key={index}>
                  <td
                    colSpan="7"
                    style={{
                      border: "1px solid black",
                      height: "10px",
                      textAlign: "center",
                    }}
                  >
                    {index + 1 + pageIndex * entriesPerPage}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {printResponseData?.[0]?.shift}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.idNumber}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour1 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour2 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour3 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour4 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour5 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour6 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour7 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.hour8 === "Y" ? "✓" : "✗"}
                  </td>
                  <td
                    colSpan="7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {entry.remarks}
                  </td>
                </tr>
              ))}

              <>
                <tr>
                  <td colSpan="90" style={{ border: "1px solid black" }}>
                    <div style={{ lineHeight: "1.0" }}>
                      ಗಮನಿಸಿ: ALCONOX- ಸಾಕಷ್ಟು ಪ್ರಮಾಣದ ಹ್ಯಾಂಡ್ ಸ್ಯಾನಿಟೈಜರ್ ಅನ್ನು
                      ಅನ್ವಯಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕೈಗಳನ್ನು ಒಟ್ಟಿಗೆ ಉಜ್ಜಿಕೊಳ್ಳಿ,
                      ಅಂಗೈಗಳು, ಬೆರಳುಗಳು ಮತ್ತು ಉಗುರುಗಳು
                    </div>
                    <div style={{ lineHeight: "1.5" }}>
                      ಸೇರಿದಂತೆ ನಿಮ್ಮ ಕೈಗಳ ಎಲ್ಲಾ ಬೆರಳುಗಳನ್ನು ಕನಿಷ್ಠ 20 ಸೆಕೆಂಡುಗಳ
                      ಕಾಲ ಉಜ್ಜಲು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.
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
                    <b>Verified by Production Supervisor</b>
                    <br></br>
                    <br></br>
                    <img className="signature"
                  src={getImage}
                  alt="Supervisor"
                  
                />
                    <div>
                      {printResponseData[0] &&
                        printResponseData[0].supervisor_sign && (
                          <span>{printResponseData[0].supervisor_sign}</span>
                        )}
                      <br></br>
                      {formattedDatesupervisor()}
                    </div>
                              </td>
                  <td
                    colSpan="45"
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      height: "15%",
                    }}
                  >
                    <b>Reviewed by Head of the Department/Designee</b>
                    <br></br>
                    <br></br>
                    <div>
                      {printResponseData[0] &&
                        printResponseData[0].hod_sign && (
                          <span>{printResponseData[0].hod_sign}</span>
                        )}
                      <br></br>
                      {formattedDateHod()}
                    </div>
                    {getImage1 !== "" && (
                    <img className="signature"
                  src={getImage1}
                  alt="HOD"
                  
                />
                )}
                  </td>
                </tr>
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
                    Particular
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
              </>
            </tbody>
          </table>
        ))}
      </div>
      {contextHolder}
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width="fit-content"
        style={{
          padding: "1em",
        }}
      >
        <Row>
          <Col>
            <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
          </Col>

          <Col
            style={{
              marginLeft: "1em",
            }}
          >
            <p>{localStorage.getItem("username")}</p>
            <p
              style={{
                fontSize: "x-small",
              }}
            >
              {localStorage.getItem("role")}
            </p>
          </Col>
        </Row>

        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "0",
            margin: "0",
          }}
          items={
            localStorage.getItem("role") == "ROLE_QA"
              ? [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Generation
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Generate"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "4",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "5",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Raw Material Isuue
                      </b>
                    ),
                    onClick: () => navigate("/Precot/RawMaterialIssue"),
                  },
                  {
                    key: "6",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => navigate("/Precot")}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
              : [
                  {
                    key: "1",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Form Browser
                      </b>
                    ),
                    onClick: () => navigate("/Precot/choosenScreen"),
                  },
                  {
                    key: "2",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Mapping
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Bleaching_Mapping"),
                  },
                  {
                    key: "3",
                    icon: <IoCreate color="#151718" />,
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Closing
                      </b>
                    ),
                    onClick: () => navigate("/Precot/Closing"),
                  },
                  {
                    key: "4",
                    icon: (
                      <FaLock
                        color="#151718"
                        onClick={() => navigate("/Precot")}
                      />
                    ),
                    label: (
                      <b
                        style={{
                          color: "#151718",
                        }}
                      >
                        Logout
                      </b>
                    ),
                    onClick: () => navigate("/Precot"),
                  },
                ]
          }
        />
      </Drawer>
      <BleachingHeader
        unit="Unit-H"
        formName="BLEACHING HAND SANITIZATION REPORT (AB BALE PRESS MACHINE)"
        formatNo="PH-PRD01/F-010"
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
        <Bleaching_f41_edit data={modalData} status={newStatus} />
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
            disabled={!printShift}
          >
            Submit
          </Button>,
        ]}
      >
        {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            width: "100%",
          }}
        >
          {/* <label style={{ marginRight: '8px',width:"40%" ,textAlign:"center" }}>Date:</label> */}
          <Input
            addonBefore="Date"
            placeholder="Date"
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
          <label style={{ textAlign: "center" }}>Shift:</label>

          <Select
            addonBefore="Shift"
            placeholder="Select Shift"
            value={printShift}
            onChange={handlePrintChange}
            style={{ fontWeight: "bold", marginright: "70px", width: "60%" }}
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

export default Bleaching_f41_summary;
