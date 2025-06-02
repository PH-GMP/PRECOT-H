/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Select, Descriptions, Menu, Avatar, Drawer } from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png"
import {
  Tooltip,
} from "antd";
import moment from 'moment';
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
import { Tabs, Button, Col, Input, Row, message } from 'antd';
import { BiLock, BiNavigation } from "react-icons/bi";
import { IoChevronBackSharp, IoPrint, } from "react-icons/io5";
import { VscGoToFile, VscGoToSearch } from "react-icons/vsc";
import { GoArrowLeft } from 'react-icons/go';
import { jwtDecode } from 'jwt-decode';
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";
// import Padpunching_f25_summary from "./Padpunching_f25_Summary.js";

const Padpunching_f05_f001_summary = () => {


  const [open, setOpen] = useState(false);


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
  const [SecondResponseData, setSecondResponseData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [shiftLov, setShiftLov] = useState([]);
  const [reason, setReason] = useState(false);
  const [shiftPrint, setShiftPrint] = useState("");
  const [datePrint, setDatePrint] = useState("");
  const [orderNumberPrint, setOrderNumberPrint] = useState("");

  console.log("SecondResponse", SecondResponseData)

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData[0]?.operator_sign;
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
          setGetImage(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData, API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = printResponseData[0]?.hod_sign;
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
          setGetImage1(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printResponseData, API.prodUrl]);

  console.log("get image", getImage);




  const [gotobtn, setGotobtn] = useState(true);


  const onClose = () => {
    setOpen(false);
  }
  const showDrawer = () => {
    setOpen(true);
  };


  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const role = userRole;


  const formatDateToDDMMYYYY = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
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


  }
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

  const handleDatePrint = (event) => {
    const value = event.target.value;
    setDatePrint(value);

  };
  const formattedDate = moment(datePrint, "YYYY-MM-DD").format("DD/MM/YYYY");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (datePrint && shiftPrint) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [datePrint, shiftPrint]);
  //   const fetchPrintValue = (value) => {
  //     try {
  //       setShiftPrint(value);
  //       setIsButtonDisabled(false); 

  //       axios.get(
  //         `${ API.prodUrl}/Precot/api/PadPunching/Service/findByDateShiftPrintApi?date=${formattedDate}&shift=${value}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log("Full response:", res.data);
  //         if (res.data && res.data.message !== "No data") {
  //           setPrintResponseData(res.data);
  //           console.log("Print response:", res.data);
  //           setIsButtonDisabled(false); // Enable the button if data is found
  //         } else {
  //           message.error("No data found...!");
  //           setIsButtonDisabled(true); // Disable the button if no data is found
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Error", err);
  //         setIsButtonDisabled(true); // Disable the button if an error occurs
  //       });
  //     } catch (error) {
  //       console.error('Error in fetchPrintValue:', error);
  //       setIsButtonDisabled(true); 
  //     }
  //   };

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
  const fetchPrintValue = async (value) => {
    try {
      setShiftPrint(value);
      setIsButtonDisabled(false);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const formattedDate = moment(datePrint, "YYYY-MM-DD").format("DD/MM/YYYY");

      // First API call
      const response1 = await axios.get(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/findByDateShiftPrintApi?date=${formattedDate}&shift=${value}`,
        { headers }
      );

      // Check if response1.data is an array and if it's not empty
      if (Array.isArray(response1.data) && response1.data.length > 0) {
        setPrintResponseData(response1.data);
        console.log("Print response (API 1):", response1.data);

        const numberShift = convertShiftValue(value);

        // Second API call
        const response2 = await axios.get(
          `${ API.prodUrl}/Precot/api/padpunching/api/bag-details?date=${datePrint}&shift=${numberShift}`,
          { headers }
        );

        if (response2.data) {
          setSecondResponseData(response2.data);
          console.log("Print response (API 2):", response2.data);
          setIsButtonDisabled(false); // Enable the button if data is valid
        } else {
          message.error("No data found Bag Making Daily Production!");
          setIsButtonDisabled(true); // Disable the button if no data found
        }
      } else {
        message.error("No data found!");
        setIsButtonDisabled(true); // Disable the button if data is an empty array or invalid
      }
    } catch (error) {
      console.error('Error in fetchPrintValue:', error);
      message.error('Error fetching data');
      setIsButtonDisabled(true); // Disable the button if an error occurs
    }
  };



  const fetchOrderbasedHeadersPrint = (value) => {

    setOrderNumberPrint(value);
  }

  const Shift = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },


  ];



  const printSubmit = () => {
    window.print()
  }


  useEffect(() => {
    const fetchShiftOptions = async () => {
      try {
        const response = await fetch(`${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
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
    navigate("/Precot/Padpunching/F-05_f001", {
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
        if (role === "ROLE_OPERATOR") {
          apiUrl = `${ API.prodUrl}/Precot/api/PadPunching/Service/getSummaryBagMakingDailyProduction`;
        } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
          apiUrl = `${ API.prodUrl}/Precot/api/PadPunching/Service/getSummaryBagMakingDailyProduction`;
        }
        else {
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
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Ensure this dependency array is correct for your use case


  useEffect(() => {
    const findReason = () => {
      for (const data of ContaminationData) {
        if (data.hod_status === "HOD_REJECTED") {
          setReason(true);
          break;
        }
      }
    };
    findReason();
  }, [ContaminationData]);

  const handleLogout = () => {

    localStorage.removeItem('token');
    navigate('/Precot');
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
    console.log("recorddd", record)

    const {
      date,
      shift,
    } = record;


    navigate('/Precot/Padpunching/F-05_f001', {
      state: {
        newdate: date,
        shiftvalue: shift,
      },
    });

  };

  const handleBack = () => {
    navigate("/Precot/choosenScreen");
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new window.Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
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
    //   title: "Order No",
    //   dataIndex: "orderNo",
    //   key: "orderNo",
    //   align: 'center',
    // },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      align: 'center',

    },
    {
      title: "Date",
      dataIndex: "date",
      key: "formatDate",
      align: 'center',
      //render: (text) => formatDate(text),
    },
    // {
    //   title: "Product Name",
    //   dataIndex: "productName",
    //   key: "productName",
    //   align:'center'
    // },

    {
      title: "Operator Status",
      dataIndex: "operator_status",
      key: "operator_status",
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
            style={{ width: "100%" }}>
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

  let numberOfPages = Math.ceil(printResponseData.length / 1);

  console.log("pr", printResponseData?.stdGsm)

  const recordsPerPage = 8;
  const totalPages = Math.ceil(SecondResponseData.length / recordsPerPage);

  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * recordsPerPage;
    return data.slice(start, start + recordsPerPage);
  };
  return (

    <div>
      {contextHolder}

      <GlobalStyle />
      <div id="section-to-print">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <div
            key={pageIndex}
            style={{ marginTop: "40px", pageBreakAfter: "always" }}
          >
            <table style={{ width: "85%", tableLayout: 'fixed', marginTop: '50px' }}>


              <br />
              <thead>

                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="11"></td>
                </tr>
                <tr>
                  <td colSpan="2" rowSpan="4" style={{ textAlign: 'center', width: "10%", fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>
                    <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
                    <br />
                    Unit H
                  </td>
                  <th colSpan="5" rowSpan="4" style={{ height: "60px", textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>
                    Bag Making Daily Production Details
                  </th>
                  <td colSpan="2" style={{ fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>Format No.:</td>
                  <td colSpan="2" style={{ fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>PH-PRD05/F-001</td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>Revision No.:</td>
                  <td colSpan="2" style={{ fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>01</td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>Ref sopNo.:</td>
                  <td colSpan="2" style={{ fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>PH-PRD05-D-03</td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>PageNo.:</td>
                  <td colSpan="2" style={{ fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>{pageIndex + 1} of {totalPages}</td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="11"></td>
                </tr>
              </thead>


              <tr>
                <td colSpan="7" style={{ fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>
                  Date: {printResponseData[0]?.date}
                </td>
                <td colSpan="4" style={{ fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>
                  Shift: {printResponseData[0]?.shift}
                </td>

              </tr>



              <tr>
                <td colSpan="2" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>Machine Name</td>
                <td colSpan="3" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>Order No.</td>
                <td colSpan="2" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>Product Name</td>
                <td colSpan="2" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>Type Of  Bags</td>
                <td colSpan="2" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: "12pt" }}>No of Bags Production qty.</td>

              </tr>

              <tbody>
                {/* {SecondResponseData?.length > 0 &&
    SecondResponseData.map((detail, index) => (
      <tr key={index}> */}
                {paginateData(SecondResponseData, pageIndex + 1).map(
                  (detail, index) => (
                    <tr key={index}>
                      <td colSpan="2" style={{ textAlign: "center", fontSize: '12pt', padding: '8px', fontFamily: "Times New Roman, Times, serif " }}>
                        {detail.MachineName}
                      </td>
                      <td colSpan="3" style={{ textAlign: "center", fontSize: '12pt', padding: '8px', fontFamily: "Times New Roman, Times, serif " }}>
                        {detail.OrderNo}
                      </td>
                      <td colSpan="2" style={{ textAlign: "center", fontSize: '12pt', padding: '8px', fontFamily: "Times New Roman, Times, serif " }}>
                        {detail.ProductName}
                      </td>
                      <td colSpan="2" style={{ textAlign: "center", fontSize: '12pt', padding: '8px', fontFamily: "Times New Roman, Times, serif " }}>
                        {detail.Typeofpad}
                      </td>
                      <td colSpan="2" style={{ textAlign: "center", fontSize: '12pt', padding: '8px', fontFamily: "Times New Roman, Times, serif " }}>
                        {detail.ProductionQty}
                      </td>
                    </tr>
                  ))}
              </tbody>
              {pageIndex + 1 === totalPages && (
                <>
                  <tr>
                    <td colSpan="11" style={{ textAlign: "left", padding: '8px', fontWeight: 'bold', fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }}>
                      Total Production Details in Bags: {printResponseData[0]?.totalProductionDetailsInBag}
                    </td>
                  </tr>


                  <tr>

                    <td colSpan="4" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }}> Operator Sign & Date</td>
                    <td colSpan="4" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }}> HOD / Designee Sign & Date</td>
                    <td colSpan="3" rowSpan="2" style={{ textAlign: "left", fontSize: '12pt', wordWrap: "break-word", overflowWrap: "break-word", fontFamily: "Times New Roman, Times, serif " }}><h5>Remarks:</h5>{printResponseData[0]?.remarks}</td>
                  </tr>
                  <tr>



                    <td colSpan="4" style={{ textAlign: 'center', verticalAlign: 'buttom', fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }}>

                      {printResponseData[0]?.operator_sign}<br />
                      {
                        printResponseData[0]?.operator_submitted_on
                          ? new Intl.DateTimeFormat('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          }).format(new Date(printResponseData[0]?.operator_submitted_on))
                          : ""
                      }<br />
                      {getImage && (
                        <img
                          src={getImage}
                          alt="Operator Sign"
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


                    <td colSpan="4" style={{ height: '40px', textAlign: 'center', verticalAlign: 'buttom', fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }}>

                      {printResponseData[0]?.hod_sign}<br />
                      {
                        printResponseData[0]?.hod_submit_on
                          ? new Intl.DateTimeFormat('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          }).format(new Date(printResponseData[0]?.hod_submit_on))
                          : ""
                      }<br />
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="Hod Sign"
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
              <br />

              <tfoot>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="11"></td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }} >Particulars</td>
                  <td colSpan="3" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }}>Prepared by</td>
                  <td colSpan="3" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }}>Reviewed by</td>
                  <td colSpan="3" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }}>Approved by</td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }} >Name</td>
                  <td colSpan="3" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }}></td>
                  <td colSpan="3" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }}></td>
                  <td colSpan="3" style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif ", fontSize: '12pt' }}></td>
                </tr>
                <tr>
                  <td colSpan="2"  >Signature & Date</td>
                  <td colSpan="3" style={{ textAlign: "center" }}></td>
                  <td colSpan="3" style={{ textAlign: "center" }}></td>
                  <td colSpan="3" style={{ textAlign: "center" }}></td>
                </tr>

                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} colSpan="11"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>



      <div>
        <BleachingHeader
          unit="Unit-H"
          formName="BAG MAKING DAILY PRODUCTION DETAILS"
          formatNo="PH-PRD05/F-001"
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
        <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />

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
            style={{ fontWeight: "bold", width: "135px", marginTop: "10px", marginLeft: '10px' }}
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
              marginLeft: "10px"
            }}
            shape="round"
            icon={< BiNavigation color={"#00308F"} />}
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
          <Button key="submit" type="primary" shape="round" style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
          }} onClick={printSubmit} disabled={isButtonDisabled}  >
            Submit
          </Button>,
        ]}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <label style={{ marginRight: '8px', width: '30%', textAlign: 'center' }}>Date:</label>

          <Input

            onChange={handleDatePrint}
            type="date"
            value={datePrint}
            size="small"
            // max ={ formattedToday }
            style={{ width: '50%', height: '30px' }}

          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <label style={{ marginRight: '8px', width: '30%', textAlign: 'center' }}>Shift:</label>

          <Select
            showSearch
            value={shiftPrint}
            onChange={fetchPrintValue}
            style={{ width: '50%' }}
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

        </div>


      </Modal>



    </div>
  );
};

export default Padpunching_f05_f001_summary;
