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

// import "./Giridharan.css";
import API from "../baseUrl.json";
import moment from "moment";

const { Option } = Select;

const  QualityControl_f04_Summary= () => {


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
  const [bmrList, setBmrList] = useState([]);
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
  const [batchLov, setBatchLov] = useState([]);
  const [bmr, setBmr] = useState("");
  const [bmrStatus, setBmrStatus] = useState(false);
  const [getImage, setGetImage] = useState("");
  const [bmrStore, setBmrStore] = useState();
  const [findLaydown, setFindLaydown] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.supervisor_sign;
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
          setGetImage(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,      API.prodUrl]);


  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData?.hod_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData,      API.prodUrl]);


  const formattedDatesupervisor = () => {
    if (printResponseData?.supervisor_submit_on) {
      const date = moment(printResponseData?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const formattedDate = printResponseData?.date
    ? new Date(printResponseData.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    : "";
  const formattedDateHod = () => {
    if (printResponseData?.hod_submit_on) {
      const date = moment(printResponseData?.hod_submit_on);
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
    printResponseData &&
    printResponseData.sanitizationList
  ) {
    for (
      let i = 0;
      i < printResponseData.sanitizationList.length;
      i += entriesPerPage
    ) {
      chunkedSanitizationList.push(
        printResponseData.sanitizationList.slice(i, i + entriesPerPage)
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

   // BMR LOV Get api for show the BMR values.....
   useEffect(() => {
    // Fetch shift options from the API
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    // const fetchBMR = async () => {
      // try {
        axios.get(
          `${    API.prodUrl}/Precot/api/qc/RawCottonConsolidatedF004/bmrNoList`,
          { headers }
        ).then((response) => {
          setShiftOptions(response.data);
        }).catch(() => {

        })
        // console.log("Shift Lov ", shiftOptions);
      // } catch (error) {
      //   console.error("Error fetching shifts:", error);
      // }
    // };
    // fetchBMR();
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



  const handleViewDetails = (record) => {
    setSelectedRow(record);
    setIsModalVisible(true);
  };
  const handleDatePrint = (event) => {
    const value = event.target.value;

    setPrintDate(value);
  };


  // useEffect(() => {
  //   axios
  //     .get(`${    API.prodUrl}/Precot/api/bleaching/summary/allBmrAndLaydownLov`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("laydown", res.data);
  //       setBmrStore(res.data);
  //       const a = res.data.map((option) => ({
  //         value: option.bmr_no,
  //         label: option.bmr_no,
  //       }));
  //       setBmrList(a);
  //       setFindLaydown(res.data);
  //       // message.success("Closed BMR Values Fetched Successfully");
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //       messageApi.open({
  //         type: "error",
  //         content: "Unable to fetch BMR due to network error",
  //       });
  //     });
  // }, []); // Ensure useEffect runs only once on component mount
  

  // const onBmrChange = (value) => {
  //   setBmr(value);
  //   const filteredBmr = bmrStore.filter((x, i) => {
  //     return x.bmr_no == value;
  //   });

  //   if (filteredBmr[0].status == "OPEN") {
  //     setBmrStatus(true);
  //   } else if (filteredBmr[0].status == "CLOSED" || "COMPLETED") {
  //     setBmrStatus(false);
  //   }
  //   console.log("BMR-Filter", filteredBmr[0].status);
  //   console.log("value of BMR", value);

  //   axios
  //     .get(`${    API.prodUrl}/Precot/api/bleaching/summary/batchByBleach?bmr_no=${value}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("Resposne of Batch", res.data);
  //       const a = res.data.map((x, i) => {
  //         return {
  //           value: x.value,
  //           label: x.value,
  //         };
  //       });
  //       setBatchLov(a);
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });

  //   const v = findLaydown.filter((x, i) => {
  //     return value == x.bmr_no;
  //   });
  // }
  
  const handleGoToChange = () => {
    console.log("bmr" , shift);
    navigate("/Precot/QualityControl/F-004", {
      state: {
        bmr:shift ,
      },
    });
  };

  const handleEdit = (record) => {
    // console.log("values", record);
    // navigate("/Precot/QualityControl/F-004", {
    //   state: {
    //       bmr :bmr
    //   },
    // });
    // console.log("precot", shift, date);

    const x = cakingData.filter((x, i) => {
      return record.formatNo == formatNo;
      navigate("/Precot/QualityControl/F-004",
        {
            state: {
                bmr :bmr
            },
          }
      );
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
  const handlePrintChange = (value) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage.");
      message.error("No token found. Please log in again.");
      return;
    }

    console.log("Token:", token); // Log the token for debugging purposes

    try {
      setPrintShift(value);

      axios
        .get(
          `${    API.prodUrl}/Precot/api/spunlace/Service/HandSanitizationReport/findByDateShiftPrintApi?date=${printDate}&shift=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const printres = res.data;
          console.log("print resssss", res.data);
          console.log("printtt", printres);

          if (printres && printres.message === "No data") {
            message.error("No data found.");
            setSubmitButtonDisabled(true); // Disable the submit button
          } else if (printres && Object.keys(printres).length > 0) {
            setPrintResponseData(printres);
            setSubmitButtonDisabled(false); // Enable the submit button
          } else {
            message.error("No data found for the selected date and shift.");
            setSubmitButtonDisabled(true); // Disable the submit button
          }
        })
        .catch((err) => {
          console.error("Error in axios get request:", err.response);
          message.error("Failed to fetch data. Please try again later.");
          setSubmitButtonDisabled(true); // Disable the submit button on error
        });
    } catch (error) {
      console.error("Error in handlePrintChange:", error);
      message.error("An unexpected error occurred. Please try again later.");
      setSubmitButtonDisabled(true); // Disable the submit button on unexpected error
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

  let columns = [...baseColumns];

  // Insert the "Reason" column before the "Action" column if `reason` exists
  if (reason) {
    const actionIndex = columns.findIndex(col => col.key === "actions");
    columns.splice(actionIndex, 0, Reason);
  }

  let sanitizationList = [];
  if (selectedRow && selectedRow.sanitizationList) {
    sanitizationList = selectedRow.sanitizationList.slice(0, 1);
    while (sanitizationList.length < 1) {
      sanitizationList.push({});
    }
  }

  const formatNo = "PH-PRD02/F-025";
  const revisionNo = "01";
  const sopNo = "PH-HRD01-D-0";
  const unit = "UNIT-H";

  return (
    <div>
      <GlobalStyle />
      <div id="section-to-print">
        <style>

        </style>

       
          <table
            style={{
              width: "90%",
              borderCollapse: "collapse",
            //   pageBreakBefore: pageIndex > 1 ? "always" : "auto",
              marginTop: "20px",
              tableLayout: "fixed"
            }}
            // key={pageIndex}
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
                <th colSpan="17" style={{ border: "1px solid black" }}>
                  Format No.:
                </th>
                <td colSpan="15" style={{ border: "1px solid black" }}>
                PH-QCL01/F-004
                </td>
              </tr>
              <tr>
                <th colSpan="17" style={{ border: "1px solid black" }}>
                  Revision No.:
                </th>
                <td colSpan="15" style={{ border: "1px solid black" }}>
                  02
                </td>
              </tr>
              <tr>
                <th colSpan="17" style={{ border: "1px solid black" }}>
                  Ref.SOP No.:
                </th>
                <td colSpan="15" style={{ border: "1px solid black" }}>
                PH-QCL01-D-05
                </td>
              </tr>
              <tr>
                <th colSpan="17" style={{ border: "1px solid black" }}>
                  Page No.:
                </th>
                <td colSpan="15" style={{ border: "1px solid black" }}>
              
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
                  colSpan="50"
                  style={{ height: "20px", border: "1px solid black" }}
                >
                  BMR Number
                </th>

                <th
                  colSpan="45"
                  style={{ border: "1px solid black" }}
                >
                 Bleaching BMR Number
                </th>
                {/* <th colSpan="88" style={{ height: "20px", border: '1px solid black' }}>{formatDate(newDate)}</th> */}
              </tr>

             

              <thead style={{width:'80%'}}>
              
                <tr> 
                    <th colSpan="10" style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'center' }}> Specification</th>
                    <th  style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>No Intense Blue Fluorescence Spots</th>
                    <th  style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>CN min.20, VC min.25</th>
                    <th style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>CN(2.8-4.5), VC (3.5-8.0),CN2: min.10</th>
                    <th style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>VC:max.700, CN: max.1000,<br/> CN2:max.5000</th>
                    <th style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>CN  (12-21), VC( Long (12-21),
                     <br/>Medium(25-39),  Short(13-20)),<br/> CN-2: min 10</th>
                    <th style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>VC: min.15, CN: min 10, CN2: min 8</th>
                    <th style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>VC: min.13,  CN: min 7, CN2: min 6</th>
                    <th style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>VC:max.25, CN: max.85, CN2:max.85</th>
                    <th style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>VC:max.45, CN: max.90, CN2:max.90</th>
                    <th style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>VC & CN: max.1.50, CN2: max.0.50</th>
                    <th style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>VC ,CN,CN2: max. 0.75</th>
                    <th style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>VC ,CN,CN2: max. 8.0</th>
                    <th style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'left' }}>CN: max.0.6, VC :max. 3.5 , CN2:NA</th>
                    <th rowSpan="2" style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'center' }}>Remarks</th>
                    <th rowSpan="2" style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'center' }}>Reported by (Chemist)</th>
                    <th rowSpan="2" style={{ transform: 'rotate(180deg)', writingMode: 'vertical-rl', padding: '10px', textAlign: 'center' }}>Approved by</th>
                </tr>


                <tr>
                    <th>AR. No</th>
                    <th>Date of Receipt</th>
                    <th>Tested Date</th>
                    <th>MB NO</th>
                    <th>Supplier</th>
                    <th>Station</th>
                    <th>Verity</th>
                    <th>Invoice No.</th>
                    <th>No. Bales</th>
                    <th>Quantity Kg</th>
                    <th>Fluore<br/>scence</th>
                    <th>White <br/> ness<br/>(Berger <br/>10 deg /D65)</th>
                    <th>Micro<br/>naire µg/in</th>
                    <th>Neps count<br/>/gm</th>
                    <th>UQL in<br/> mm</th>
                    <th>L(w)<br/>mm</th>
                    <th>L(n) mm</th>
                    <th>SFC (w) (%)</th>
                    <th>SFC(n)(%)</th>
                    <th>Ash (%)</th>
                    <th>E.S.S. Ext. x(%)</th>
                    <th>Moisture<br/> (%)</th>
                    <th>Trash<br/>(%)</th>

                </tr>
                {/* <tr>
                <th style={{ textAlign: "center",transform: 'rotate(270deg)',height:'195px', maxWidth: "55px", whiteSpace: "nowrap",    }}>Remarks</th>
                <th style={{ textAlign: "center",transform: 'rotate(270deg)', maxWidth: "35px", whiteSpace: "nowrap",    }}>Delete</th>
                </tr> */}
            </thead>
             

              <>
                
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
                    <b>Production Supervisor Sign & Date</b>
                    <br></br>
                    <br></br>
                    <div>
                      {printResponseData &&
                        printResponseData.supervisor_sign && (
                          <span>{printResponseData.supervisor_sign}</span>
                        )}
                      <br></br>
                      {formattedDatesupervisor()}<br />
                      {getImage && (
                      <img
                        src={getImage}
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
                    <b>HOD/ Designee Sign & Date</b>
                    <br></br>
                    <br></br>
                    <div>
                      {printResponseData &&
                        printResponseData.hod_sign && (
                          <span>{printResponseData.hod_sign}</span>
                        )}
                      <br />
                      {formattedDateHod()} <br />
                      {getImage1 && (
                      <img
                        src={getImage1}
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
    
      </div>
      {contextHolder}
      
      <BleachingHeader
        unit="Unit-H"
        formName="RAW COTTON CONSOLIDATED   REPORT"
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
          <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
        ]}
      />


<div style={{marginTop:'10px',marginBottom:'10px'}}>
<span>
            {" "}
            Select
            BMR No :
          </span>
<Select
          placeholder="Select BMR"
          value={shift}
          onChange={handleShiftChange}
          style={{ width: 120, fontWeight: "bold" }}
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
              marginLeft :"20px"
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
        dataSource={apiData || cakingData}
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
          <Button
            key="submit"
            type="primary"
            onClick={printDateSubmit}
            disabled={submitButtonDisabled}
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
          <label >Date:</label>
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

export default QualityControl_f04_Summary;
