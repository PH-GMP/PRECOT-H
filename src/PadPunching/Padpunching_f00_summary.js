/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Select, Descriptions, Menu, Avatar ,Drawer} from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { TbMenuDeep } from "react-icons/tb";
import logo from "../Assests/logo.png"
import { Tooltip,
} from "antd";
import moment from 'moment';
import API from "../baseUrl.json";
import {  FaUserCircle } from "react-icons/fa";
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
import { Tabs,Button, Col, Input, Row,  message } from 'antd';
import { BiLock, BiNavigation } from "react-icons/bi";
import { IoChevronBackSharp, IoPrint,  } from "react-icons/io5";
import { VscGoToFile, VscGoToSearch } from "react-icons/vsc";
import { GoArrowLeft } from 'react-icons/go';
import { jwtDecode } from 'jwt-decode';
import { createGlobalStyle } from "styled-components";
import PrecotSidebar from "../Components/PrecotSidebar.js";
// import Padpunching_f25_summary from "./Padpunching_f25_Summary.js";
 
const Padpunching_f00_summary = () => {


  const [open, setOpen] = useState(false);


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

  const [newDate, setNewDate] = useState("");
 const[PrintResponse2,setPrintResponse2]= useState("");
  const [modalData, setmodalData] = useState();
  const [newData, setnewData] = useState();
  const [ContaminationData, setContaminationData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderNoPayload, setorderNoPayload] = useState();
  const [OrderNo, setOrderNo] = useState();
  const [Supplier, setSupplier] = useState("");
  const[date,setDate]= useState("");
  const [showDateInput, setShowDateInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [PrintByDate, setPrintByDate] = useState(null);
  const [printResponseData, setPrintResponseData] = useState([]);
  
  const [messageApi, contextHolder] = message.useMessage();
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [orderNumberLov, setOrderNumberLov] = useState([]);
  const [shiftLov, setShiftLov] = useState([]);
  const [reason,setReason] = useState(false);
  const [shiftPrint, setShiftPrint] = useState("");
  const[datePrint,setDatePrint]=useState("");
 const [orderNumberPrint, setOrderNumberPrint] = useState("");

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
   const username =printResponseData[0]?.hod_sign;
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
  const role =userRole;


  const formatDateToDDMMYYYY = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const formattedOperatorDate =printResponseData[0]?.operator_submitted_on
  
  
  ? moment(printResponseData[0]?.operator_submitted_on).format('DD/MM/YYYY HH:mm')
  : '';

  console.log("Formated Date",formattedOperatorDate)

  const formattedhodDate = printResponseData[0]?.hod_submit_on
  ? moment(printResponseData[0]?.hod_submit_on).format('DD/MM/YYYY HH:mm')
  : '';

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
  const printDateSubmit=()=>{
    // checkDateExists();
    
   
  }
  const handleDateChange = (event) => {
    setPrintByDate(event.target.value);
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
  const formattedDate = moment(datePrint,"YYYY-MM-DD" ).format("DD/MM/YYYY");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 

  console.log("datePrint",datePrint)

  useEffect(() => {
    if (datePrint && shiftPrint) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [ datePrint, shiftPrint]);
  // const fetchPrintValue = (value) => {
  //   try {
  //     setShiftPrint(value);
  //     setIsButtonDisabled(false); 

  //     axios.get(
  //       `${ API.prodUrl}/Precot/api/PadPunching/Service/LogBook/getByDateShiftPrint?date=${formattedDate}&shift=${value}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("Full response:", res.data);
  //       if (res.data && res.data.message !== "No data") {
  //         setPrintResponseData(res.data);
  //         console.log("Print response:", res.data);
  //         setIsButtonDisabled(false); // Enable the button if data is found
  //       } else {
  //         message.error("No data found...!");
  //         setIsButtonDisabled(true); // Disable the button if no data is found
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //       setIsButtonDisabled(true); // Disable the button if an error occurs
  //     });
  //   } catch (error) {
  //     console.error('Error in fetchPrintValue:', error);
  //     setIsButtonDisabled(true); 
  //   }
  // };

  // const fetchPrintValue = (value) => {
  //   try {
  //     setShiftPrint(value);
  //     setIsButtonDisabled(false);
  
  //     const fetchFirstSet = axios.get(
  //       `${ API.prodUrl}/Precot/api/PadPunching/Service/LogBook/getByDateShiftPrint?date=${formattedDate}&shift=${value}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const numberShift = convertShiftValue(value);
  //     const fetchSecondSet = axios.get(
  //       `${ API.prodUrl}/Precot/api/padpunching/api/LogBookBagMakingStoppage?PackDt=${formattedDate}&ShiftID=${numberShift}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     // Run both requests in parallel
  //     Promise.all([fetchFirstSet, fetchSecondSet])
  //       .then(([firstRes, secondRes]) => {
  //         console.log("First response:", firstRes.data);
  //         console.log("Second response:", secondRes.data);
  
  //         const firstHasData = firstRes.data && firstRes.data.message !== "No data";
  //         const secondHasData = secondRes.data && secondRes.data.message !== "No data";
  
  //         if (firstHasData) {
  //           setPrintResponseData(firstRes.data);
  //         } else {
  //           message.error("No data found in the first response.");
  //           setIsButtonDisabled(true);
  //         }
  
  //         if (secondHasData) {
  //           setPrintResponse2(secondRes.data);
  //         } else {
  //           message.error("No data found in the second response.");
  //           setIsButtonDisabled(true);
  //         }
  
  //         // Only enable the button if both sets have data
  //         if (firstHasData && secondHasData) {
  //           setIsButtonDisabled(false);
  //         } else {
  //           setIsButtonDisabled(true);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error during API calls:", err);
  //         message.error("Failed to fetch data. Please try again later.");
  //         setIsButtonDisabled(true); // Disable the button if an error occurs
  //       });
  //   } catch (error) {
  //     console.error("Error in fetchPrintValue:", error);
  //     setIsButtonDisabled(true);
  //   }
  // };
  
  const fetchPrintValue = (value) => {
    try {
      setShiftPrint(value);
      setIsButtonDisabled(false); // Initially set button to enabled
  
      const fetchFirstSet = axios.get(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/LogBook/getByDateShiftPrint?date=${formattedDate}&shift=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const numberShift = convertShiftValue(value);
      const fetchSecondSet = axios.get(
        `${ API.prodUrl}/Precot/api/padpunching/api/LogBookBagMakingStoppage?PackDt=${datePrint}&ShiftID=${numberShift}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      // Run both API calls in parallel
      Promise.all([fetchFirstSet, fetchSecondSet])
        .then(([firstRes, secondRes]) => {
          console.log("First response:", firstRes.data);
          console.log("Second response:", secondRes.data);
  
          const firstHasData = firstRes.data && firstRes.data.message !== "No data";
          const secondHasData = secondRes.data && secondRes.data.message !== "No data";
  
          // Handle the first response data
          if (firstHasData) {
            setPrintResponseData(firstRes.data); // Set state with the first API response data
          } else {
            message.error("No data found ");
            setIsButtonDisabled(true); // Disable button if no data
          }
  
          // Handle the second response data
          if (secondHasData) {
            setPrintResponse2(secondRes.data); // Set state with the second API response data
          } else {
            message.error("No data found ");
            setIsButtonDisabled(true); // Disable button if no data
          }
  
          // Enable the button only if both responses have data
          if (firstHasData && secondHasData) {
            setIsButtonDisabled(false);
          } else {
            setIsButtonDisabled(true);
          }
        })
        .catch((err) => {
          console.error("Error during API calls:", err);
          message.error("Failed to fetch data. Please try again later.");
          setIsButtonDisabled(true); // Disable the button if an error occurs
        });
    } catch (error) {
      console.error("Error in fetchPrintValue:", error);
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
     navigate("/Precot/PadPunching/F-00", {
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
       if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
          apiUrl = `${ API.prodUrl}/Precot/api/PadPunching/Service/LogBook/getLogBookBagMakingSummary`;
        } else if (role === "ROLE_OPERATOR" ) {
          apiUrl = `${ API.prodUrl}/Precot/api/PadPunching/Service/LogBook/getLogBookBagMakingSummary`;
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
            orderNo:item.orderNo,
            reason:item.reason,

            productName:item.productName,

            shift:item.shift,
            operator_status:item.operator_status,
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
          if (data.hod_status === "HOD_REJECTED"||data.supervisor_status === "SUPERVISOR_REJECTED") {
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
    console.log("recorddd",record)

const { 
      date,
      shift,
     } = record;


 navigate('/Precot/PadPunching/F-00', {
    state: {
      newdate:date,
      shiftvalue:shift,
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
            style={{ width:"100%" }}>
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

  console.log("pr",printResponseData[0]?.orderNo1)

  
  return (
    
    <div>
      {contextHolder}
    
      <GlobalStyle />
      <div id="section-to-print">
      <table style={{width:'90%',tableLayout:'fixed', marginTop:'50px'}}>
      
      <thead style={{marginTop:'50px'}}>
        <tr>
            <td colspan="3" rowSpan="4" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>
            <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", height: "auto" }}
                  /><br/>
              Unit H</td>
            <th colspan="9"  rowSpan="4" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>LOG BOOK - BAG MAKING</th>
            <td colspan="3" style={{textAlign: "left",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>Format No.:</td>
            <td colspan="3" style={{textAlign: "left",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.formatNo}</td>

        </tr>
        <tr>
        <td colspan="3" style={{textAlign: "left",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>Revision No.:</td>
        <td colspan="3" style={{textAlign: "left",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.revisionNo}</td>
        </tr>

        <tr>
        <td colspan="3" style={{textAlign: "left",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>Ref. SOP No.:</td>
        <td colspan="3" style={{textAlign: "left",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.sopNumber}</td>
        </tr>

        <tr>
        <td colspan="3" style={{textAlign: "left",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>Page No.:</td>
        <td colspan="3" style={{textAlign: "left",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}></td>
        </tr>
      </thead>

<br/>
      <tbody>
        <tr>
            <td colspan="8" style={{textAlign: "left",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>A . Machine Allocation & Production Details:</td>
            <td colspan="5" style={{textAlign: "left",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>DATE:{printResponseData[0]?.date}</td>
            <td colspan="5" style={{textAlign: "left",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>SHIFT:{printResponseData[0]?.shift}</td>
        </tr>

        <tr>
            <td colspan="3" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>Machine No.</td>
            <td colspan="2" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>Manpower Allocation</td>
            <td colspan="3" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>ORDER NO</td>
            <td colspan="10" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>Product Name</td>
        </tr>

        <tr>
            <td colspan="3" rowspan="2" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif", padding:'2px'}}>BAG MAKING MACHINE -01</td>
            <td colspan="2" rowspan="2" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.manpowerAllocation1}</td>
            <td colspan="3"  style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.orderNo1}</td>
            <td colspan="5" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif", padding:'7px'}}>Running</td>
            <td colspan="5"style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.productName1}</td>
        </tr>



        <tr>
        
        <td colspan="3"  style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.orderNo2}</td>
            <td colspan="5" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif", padding:'7px'}}>Next</td>
            <td colspan="5" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.productName2}</td>
        </tr>

        



    <tr>
            <td colspan="3" rowspan="2" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>BAG MAKING MACHINE -02</td>
            <td colspan="2" rowSpan="2" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.manpowerAllocation2}</td>
            <td colspan="3"  style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.orderNo3}</td>
            <td colspan="5" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif",padding:'7px'}}>Running</td>
            <td colspan="5"style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.productName3}</td>
        </tr>


       
        <tr>
       
        <td colspan="3" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.orderNo4}</td>
        <td colspan="5" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif", padding:'7px'}}>Next</td>
        <td colspan="5" style={{textAlign: "center",fontSize: "12pt",fontFamily: "Times New Roman, Times, serif"}}>{printResponseData[0]?.productName4}</td>
        </tr>

       

    <br/>
     
     <tr>
        <td colspan="18">B. STOPAGE DETAILS :</td>
     </tr>
     <tr>
   <td colspan="5" style={{textAlign: "center"}}>Nature Of Problem </td>
   <td colspan="4" style={{textAlign: "center"}}>Stop. Time</td>
   <td colspan="5" style={{textAlign: "center"}}>Restart Time</td>
   <td colspan="4" style={{textAlign: "center"}}>Idle Time(in Min)</td>
</tr>

{PrintResponse2 && PrintResponse2.length > 0 && PrintResponse2.map((item, index) => (
      <tr key={index}>
        <td colspan="5" style={{ textAlign: "center" }}>{item.Scause}</td>
        <td colspan="4" style={{ textAlign: "center" }}>{item.FTime}</td>
        <td colspan="5" style={{ textAlign: "center" }}>{item.TTime}</td>
        <td colspan="4" style={{ textAlign: "center" }}>{item.TotHrs}</td>
      </tr>
    ))}

    <tr>
        <td colspan="6" style={{textAlign:'center'}}>Operator Sign & Date</td>
        <td colspan="6" style={{textAlign:'center'}}>HOD / Designee Sign & Date</td>
        <td colspan="6" rowspan="2">Remarks:{printResponseData[0]?.
remarks
}</td>
    </tr>


    <tr>
        <td colspan="6" style={{height:'90px', textAlign:'center'}}>{printResponseData[0]?.operator_sign}
          <br/>
          {formattedOperatorDate}
          <br/>
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
        <td colspan="6" style={{textAlign:'center'}}>{printResponseData[0]?.hod_sign}
        
        <br/>
          {formattedhodDate}
          <br/>
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
</tbody>

     <tr>
      <td colspan="18" style={{border:'none'}}></td>
     </tr>
     <br/>
     <br/>
     
      <tfoot>
        <tr>
        <td colspan="5" style={{textAlign:'center'}}>Particulars</td>
        <td colspan="5" style={{textAlign:'center'}}>Prepared by</td>
        <td colspan="4" style={{textAlign:'center'}}>Reviewed by</td>
        <td colspan="4" style={{textAlign:'center'}}>Apporved by</td>
        </tr>

        <tr>
        <td colspan="5" style={{textAlign:'center'}}>Name</td>
        <td colspan="5" style={{textAlign:'center'}}></td>
        <td colspan="4" style={{textAlign:'center'}}></td>
        <td colspan="4" style={{textAlign:'center'}}></td>
        </tr>
       
        <tr>
        <td colspan="5" style={{textAlign:'center'}}>Signature & Date</td>
        <td colspan="5" style={{textAlign:'center'}}></td>
        <td colspan="4" style={{textAlign:'center'}}></td>
        <td colspan="4" style={{textAlign:'center'}}></td>
        </tr>
      </tfoot>
        
    </table>

    </div>
   


      <div>
      <BleachingHeader
        unit="Unit-H"
        formName="LOG BOOK - BAG MAKING"
        formatNo="PH-PRD05/F-003"
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
              marginRight:"10px",
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
      style={{ fontWeight: "bold", width: "135px",marginTop:"10px",marginLeft:'10px' }}
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
        margin:"10px",
        marginLeft:"70px",
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
          backgroundColor:  "#E5EEF9",
          color: "#00308F",
          fontWeight: "bold",
          backgroundColor: "#E5EEF9",
          margin:"10px",
          marginLeft:"10px"
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
                 <label style={{ marginRight: '8px' , width: '30%' , textAlign:'center'}}>Date:</label>
 
                 <Input
 
                  onChange={handleDatePrint}
                  type="date"
                  value={datePrint}
                  size="small"
                  // max ={ formattedToday }
                  style={{ width: '50%', height:'30px' }}
 
                  />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <label style={{ marginRight: '8px', width: '30%' , textAlign:'center' }}>Shift:</label>
 
                <Select
                   showSearch
                   value={shiftPrint}
                   onChange={fetchPrintValue}
                   style={{ width: '50%' }}
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
     
              </div>
 
 
      </Modal>
 

    
    </div>
  );
};

export default Padpunching_f00_summary;
