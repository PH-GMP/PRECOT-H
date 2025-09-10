import { Button, Col, Input, Row, Select, Tabs, Modal, Spin, message, Tooltip, Menu, Avatar, Drawer } from "antd";
import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import BleachingHeader from '../Components/BleachingHeader';
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from 'react-router-dom';
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from 'moment';
import API from "../baseUrl.json";



// import gif from '../Assests/gif.gif'
import logo from "../Assests/logo.png";
// import  './sutharsana.css';

import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import Padpunching_f09_summary from "./Padpunching_f04_Summary.js";

const  Padpunching_f00 = () => {
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [machin_alloc, setMachinAlloc] = useState('');
  const [open, setOpen] = useState(false);
  const [NewSave, setNewSave] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(''); 
  const [selectedNumber2, setSelectedNumber2] = useState('');
  const [selectedNumber3, setSelectedNumber3] = useState('');
  const [selectedNumber4, setSelectedNumber4] = useState('');
  const initial=useRef(false);
  const [date, setDate] = useState('')
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState("");
  const[OrderDetails, SetOrderDetails] = useState("");
  const [pOrders, setPOrders] = useState([]);
  const [selectedPOrder, setSelectedPOrder] = useState('');
  const [selectedPOrder1, setSelectedPOrder1] = useState('');
  const [selectedPOrder2, setSelectedPOrder2] = useState('');
  const [selectedPOrder3, setSelectedPOrder3] = useState('');
  const [selectedPOrder4, setSelectedPOrder4] = useState('');
  const [selectedPOrder5, setSelectedPOrder5] = useState('');
  const [selectedPOrder6, setSelectedPOrder6] = useState('');
  const [selectedPOrder7, setSelectedPOrder7] = useState('');
  const [productName, setProductName] = useState(""); 
  const [productName1, setProductName1] = useState(""); 
  const [productName2, setProductName2] = useState(""); 
  const [productName3, setProductName3] = useState(""); 
  const [productName4, setProductName4] = useState(""); 
  const [productName5, setProductName5] = useState(""); 
  const [productName6, setProductName6] = useState(""); 
  const [productName7, setProductName7] = useState(""); 
  const[ Stoppage,SetStoppage]= useState(""); 
  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  console.log(roleauth);
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [SupervisorSign, setSupervisorSign] = useState('');
  const [HodSign, setHodSign] = useState('');
  const [SupervisorSubmitOn, setSupervisorSubmitOn] = useState();

  const [HodSubmitOn, setHodSubmitOn] = useState('');
  const [OperatorSign, setOperatorSign] = useState('');
  const [OperatorSubmitOn, setOperatorSubmitOn] = useState('');
  const [remarkreason, setRemarkReason] = useState('');
  const [HodStatus, setHodStatus] = useState('');
  const [ReportDetails, setReportDetails] = useState([]);
  const [emptyarraycheck, setemptyarraycheck] = useState("");


  const handleMachinAllocChange = (e) => {
    setMachinAlloc(e.target.value); 
  };

  

  const handlePOrderChange = (e) => {
    const selectedOrder = e.target.value;
    setSelectedPOrder(selectedOrder);

    const selectedProduct = pOrders.find(
      (order) => order.POrder === selectedOrder
    );
    if (selectedProduct) {
      setProductName(selectedProduct.ProdDesc);
    } else {
      setProductName("");
    }
  };

  
  const handlePOrderChange1 = (e) => {
    const selectedOrder = e.target.value;
    setSelectedPOrder1(selectedOrder);

    const selectedProduct = pOrders.find(
      (order) => order.POrder === selectedOrder
    );
    if (selectedProduct) {
      setProductName1(selectedProduct.ProdDesc);
    } else {
      setProductName1("");
    }
  };

  
  const handlePOrderChange2 = (e) => {
    const selectedOrder = e.target.value;
    setSelectedPOrder2(selectedOrder);

    const selectedProduct = pOrders.find(
      (order) => order.POrder === selectedOrder
    );
    if (selectedProduct) {
      setProductName2(selectedProduct.ProdDesc);
    } else {
      setProductName2("");
    }
  };

  
  const handlePOrderChange3 = (e) => {
    const selectedOrder = e.target.value;
    setSelectedPOrder3(selectedOrder);

    const selectedProduct = pOrders.find(
      (order) => order.POrder === selectedOrder
    );
    if (selectedProduct) {
      setProductName3(selectedProduct.ProdDesc);
    } else {
      setProductName3("");
    }
  };

  
 
 

  console.log("supervisor", selectedRow?.operator_status)

  const roleBase = localStorage.getItem("role")


  const [getImage3, setGetImage3] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.operator_sign
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
          setGetImage3(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow,API.prodUrl]);


  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.hod_sign;
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
          setGetImage2(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [selectedRow,API.prodUrl]);


  const canEdit = () => {
    if (roleauth === "ROLE_OPERATOR") {
      return !(
        selectedRow &&
        selectedRow?.operator_status === "OPERATOR_APPROVED" &&
        selectedRow?.hod_status === "WAITING_FOR_APPROVAL"||
        selectedRow?.hod_status === "HOD_APPROVED"
      );
    } else if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      return !(
        selectedRow &&
        (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status === "HOD_APPROVED" ||
          selectedRow?.hod_status === "HOD_REJECTED")
      );
    } else {
      return true;
    }
  };
  
  const isEditable = canEdit();



  const canDisplayButtons = () => {
    if (roleauth == "ROLE_OPERATOR") {
      if (
        selectedRow?.operator_status == "OPERATOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.operator_status == "OPERATOR_APPROVED" &&
          selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
          selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED" 
       // emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED"  ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

 
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_OPERATOR") {
      if (
        selectedRow?.operator_status == "OPERATOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"||
        selectedRow?.hod_status == "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else if (
        selectedRow?.operator_status == "OPERATOR_APPROVED" &&
       
        (selectedRow?.hod_status == "" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none";
      }
    }
     else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } 
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/PadPunching/Service/LogBook/approveOrReject`,
        {
          id: OverallID,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Padpunching/F-00/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    
    console.log("print screen works");
 
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", 
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/PadPunching/Service/LogBook/approveOrReject`,
        {
          id: OverallID,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Padpunching/F-00/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };




  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState('');

  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [OverallID, setOverallID] = useState('');

  const { Option } = Select;
  const { state } = location;
  const { newdate, shiftvalue } = state || {};
  // const { batch } = state || {};
  // const { bale } = state || {};
  console.log("bmr form create screen", newdate);
  console.log("bmr form create screen", shiftvalue);
 

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [opens, setOpens] = useState(false);

  const [placement, setPlacement] = useState("left");


  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }




  useEffect(() => {
    if (newdate) {

      setDate(newdate);

      console.log("PHNo create", newdate);
    }

    if (shiftvalue) {
      setShift(shiftvalue);
      console.log("Supplier create", shiftvalue);
    }
  
  })

  const handleTextareaChange = (event) => {
    setRemarkReason(event.target.value);
  };


  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${year}-${month}-${day}`;


  const token = localStorage.getItem("token");


  const handlePrint = () => {
    window.print();
  };


  const handleShiftChange = (value) => {
    console.log(" Shift ", value);
    setShift(value);
    // setGotobtn(false);
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




  const handleSave = () => {
    setSaveLoading(true);
    console.log("Date1", token);

    // const isValid = () => {
    //   if (!STD_THICKNESS) return "STD THICKNESS is required";
    //   if (!STD_ROLL_DIA) return "STD ROLL DIA is required";
    //   return null;
    // };

    // const validationMessage = isValid();
    // if (validationMessage) {
    //   setSaveLoading(false);
    //   message.error(validationMessage);
    //   return;
    // }


    if (NewSave) {
      const payload = {
        unit: "Unit H",
        formatNo: "PH-PRD05/F-003",
        formatName: "Log Book - Bag Making",
        sopNumber: "PH-PRD05-D-03",
        revisionNo: "01",
        shift: shift,
        date: date,
        remarks:remarkreason,
        reason:rejectRemarks,
        machineAllocationAndProductionDetail:machin_alloc,
        machineNo1:"BAG MAKING MACHINE -01",
        machineNo2:"BAG MAKING MACHINE -02",
        manpowerAllocation1:selectedNumber,
        manpowerAllocation2:selectedNumber2,
        orderNo1:selectedPOrder,
        orderNo2:selectedPOrder1,
        orderNo3:selectedPOrder2,
        orderNo4:selectedPOrder3,
        productName1:productName,
        productName2:productName1,
        productName3:productName2,
        productName4:productName3,
        };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };


      axios
        .post(
          `${API.prodUrl}/Precot/api/PadPunching/Service/LogBook/SaveLogBookBagMakingF003`,
          payload,
          { headers }
        )
        .then((res) => {
          console.log("Response", res.data);
          message.success("Form Saved Successfully");
          navigate('/Precot/Padpunching/F-00/Summary');
        })
        .catch((err) => {
          console.log("Error", err);
          message.error(err.response.data.message);
        })
        .finally(() => {
          setSaveLoading(false);
        });
    } else {
      const payload = {
        unit: "Unit H",
        formatNo: "PH-PRD05/F-003",
        formatName: "Log Book - Bag Making",
        sopNumber: "PH-PRD05-D-03",
        revisionNo: "01",
        shift: shift,
        date: date,
        remarks:remarkreason,
        reason:rejectRemarks,
        logBookId:OverallID,
        machineAllocationAndProductionDetail:machin_alloc,
        machineNo1:"BAG MAKING MACHINE -01",
        machineNo2:"BAG MAKING MACHINE -02",
        manpowerAllocation1:selectedNumber,
        manpowerAllocation2:selectedNumber2,
        orderNo1:selectedPOrder,
        orderNo2:selectedPOrder1,
        orderNo3:selectedPOrder2,
        orderNo4:selectedPOrder3,
        productName1:productName,
        productName2:productName1,
        productName3:productName2,
        productName4:productName3,
       };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${API.prodUrl}/Precot/api/PadPunching/Service/LogBook/SaveLogBookBagMakingF003`,
          payload,
          { headers }
        )
        .then((res) => {
          console.log("Response", res.data);
          message.success("Form Saved Successfully");
          navigate('/Precot/Padpunching/F-00/Summary');
        })
        .catch((err) => {
          console.log("Error", err);
          const errorMessage = err.response.message;
          message.error(err.response.data.message);
        })
        .finally(() => {
          setSaveLoading(false);
        });
    }
  };


  const submitData = () => {
    setSubmitLoading(true);
    console.log("Date1", token);
   
   
    const finalRemarks = (remarkreason?.trim() || '') === '' ? 'NA' : remarkreason.trim();
 
    // Set default 'NA' for empty fields
    const finalManpowerAllocation1 = (selectedNumber?.trim() || '') === '' ? 'NA' : selectedNumber.trim();
    const finalManpowerAllocation2 = (selectedNumber2?.trim() || '') === '' ? 'NA' : selectedNumber2.trim();
    const finalOrderNo1 = (selectedPOrder?.trim() || '') === '' ? 'NA' : selectedPOrder.trim();
    const finalOrderNo2 = (selectedPOrder1?.trim() || '') === '' ? 'NA' : selectedPOrder1.trim();
    const finalOrderNo3 = (selectedPOrder2?.trim() || '') === '' ? 'NA' : selectedPOrder2.trim();
    const finalOrderNo4 = (selectedPOrder3?.trim() || '') === '' ? 'NA' : selectedPOrder3.trim();
 
    const finalProductName1 = (productName?.trim() || '') === '' ? 'NA' : productName.trim();
    const finalProductName2 = (productName1?.trim() || '') === '' ? 'NA' : productName1.trim();
    const finalProductName3 = (productName2?.trim() || '') === '' ? 'NA' : productName2.trim();
    const finalProductName4 = (productName3?.trim() || '') === '' ? 'NA' : productName3.trim();
if (NewSave) {
      const payload = {
        unit: "Unit H",
        formatNo: "PH-PRD05/F-003",
        formatName: "Log Book - Bag Making",
        sopNumber: "PH-PRD05-D-03",
        revisionNo: "01",
        shift: shift,
        date: date,
        remarks:finalRemarks,
        reason:rejectRemarks,
        machineAllocationAndProductionDetail:machin_alloc,
        machineNo1:"BAG MAKING MACHINE -01",
        machineNo2:"BAG MAKING MACHINE -02",
        manpowerAllocation1:finalManpowerAllocation1,
        manpowerAllocation2:finalManpowerAllocation2,
        orderNo1:finalOrderNo1,
        orderNo2:finalOrderNo2,
        orderNo3:finalOrderNo3,
        orderNo4:finalOrderNo4,
        productName1:finalProductName1,
        productName2:finalProductName2,
        productName3:finalProductName3,
        productName4:finalProductName4,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
 
      axios
        .post(
          `${API.prodUrl}/Precot/api/PadPunching/Service/LogBook/SubmitLogBookBagMakingF003`,
          payload,
          { headers }
        )
        .then((res) => {
          console.log("Response", res.data);
          message.success("Form Submitted Successfully");
          navigate('/Precot/Padpunching/F-00/Summary');
        })
        .catch((err) => {
          console.log("Error", err);
          message.error(err.response.data.message);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    } else {
      const payload = {
        unit: "Unit H",
        formatNo: "PH-PRD05/F-003",
        formatName: "Log Book - Bag Making",
        sopNumber: "PH-PRD05-D-03",
        revisionNo: "01",
        shift: shift,
        date: date,
        remarks:finalRemarks,
        reason:rejectRemarks,
        logBookId:OverallID,
        machineAllocationAndProductionDetail:machin_alloc,
        machineNo1:"BAG MAKING MACHINE -01",
        machineNo2:"BAG MAKING MACHINE -02",
        manpowerAllocation1:finalManpowerAllocation1,
        manpowerAllocation2:finalManpowerAllocation2,
        orderNo1:finalOrderNo1,
        orderNo2:finalOrderNo2,
        orderNo3:finalOrderNo3,
        orderNo4:finalOrderNo4,
        productName1:finalProductName1,
        productName2:finalProductName2,
        productName3:finalProductName3,
        productName4:finalProductName4,
    };
 
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
 
      axios
        .post(
          `${API.prodUrl}/Precot/api/PadPunching/Service/LogBook/SubmitLogBookBagMakingF003`,
          payload,
          { headers }
        )
        .then((res) => {
          console.log("Response", res.data);
          message.success("Form Submitted Successfully");
          navigate('/Precot/Padpunching/F-00/Summary');
        })
        .catch((err) => {
          console.log("Error", err);
          message.error(err.response.data.message);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    }
  };





  const handleBack = () => {
    navigate("/Precot/Padpunching/F-00/Summary");
  };


  useEffect(() => {
  
    checkBmrExists();

}, []);

const checkBmrExists = async () => {
    const formattedDate = moment(newdate, "DD/MM/YYYY").format("YYYY-MM-DD");
    const numberShift = convertShiftValue(shiftvalue);
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/padpunching/api/LogBookBagMakingStoppage?PackDt=${formattedDate}&ShiftID=${numberShift}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      SetStoppage(response.data);
      
      if (response.data && response.data.length > 0) {
        const data = response.data;
        console.log("data", data);
        console.log("inside data", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
  
    checkBmrExist();

}, []);

 

  const checkBmrExist = async () => {

    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/padpunching/api/LogBooks-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response shift", response.data);
      setPOrders(response.data);
    


} catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
  
    fetchGet();

}, []);

  const fetchGet = async () => {
    
    const { newdate, shiftvalue } = state || {};


    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/PadPunching/Service/LogBook/getByDateShiftMachineNo?date=${newdate}&shift=${shiftvalue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response Fecthget", response.data);
      if(((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.operator_status !=="OPERATOR_APPROVED")) ||((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.hod_status =="HOD_REJECTED"))){
        message.error("Operator Not Yet  Approved");
        setTimeout(() => {
         navigate('/Precot/Padpunching/F-00/Summary');
       }, 1500)
        }
      response.data.length == 0 ? setNewSave(true) : setNewSave(false);
      setSelectedPOrder(response.data.orderNo1)
      setSelectedPOrder1(response.data.orderNo2)
      setSelectedPOrder2(response.data.orderNo3)
      setSelectedPOrder3(response.data.orderNo4)
      setSelectedPOrder4(response.data.orderNo5)
      setSelectedNumber(response.data.manpowerAllocation1)
      setSelectedNumber2(response.data.manpowerAllocation2)
      setProductName(response.data.productName1)
      setProductName1(response.data.productName2)
      setProductName2(response.data.productName3)
      setProductName3(response.data.productName4)
      setProductName4(response.data.productName5)
      setRemarkReason(response.data.remarks)
      setOverallID(response.data.logBookId)
      setMachinAlloc(response.data.machineAllocationAndProductionDetail)
      setSelectedRow(response.data);
      console.log("selectedRow", response.data)
      setHodSign(response.data.hod_sign);
      setHodStatus(response.data.hod_status);
      setHodSubmitOn(response.data.hod_submit_on);

      setemptyarraycheck(response.data.length);
      setOperatorSign(response.data.operator_sign);

      // setOperatorstatus(response.data.operator_status);
      setOperatorSubmitOn(response.data.operator_submitted_on);
    
     } catch (error) {
      console.error("Error fetching data:", error);
    }
  };









  const formattedOperatorDate =selectedRow?.operator_submitted_on
  
    ? moment(selectedRow?.operator_submitted_on).format('DD/MM/YYYY HH:mm')
    : '';

    console.log("Formated Date",formattedOperatorDate)


    console.log("formatedSubmited ", formattedOperatorDate)
  const formattedSupervisorDate = SupervisorSubmitOn
    ? moment(SupervisorSubmitOn).format('DD/MM/YYYY HH:mm')
    : '';

  const formattedhodDate = HodSubmitOn
    ? moment(HodSubmitOn).format('DD/MM/YYYY HH:mm')
    : '';

   

    const handleNumberChange = (e) => {
      setSelectedNumber(e.target.value); 
     
    };

    const handleNumberChange2 = (e) => {
        setSelectedNumber2(e.target.value); 
    };
      const handleNumberChange3 = (e) => {
       
        setSelectedNumber3(e.target.value); 
       
      };
      const handleNumberChange4 = (e) => {
       
        setSelectedNumber4(e.target.value); 
       
      };

    console.log("selected Number1",selectedNumber)
    console.log("selected Number2",selectedNumber2)
    console.log("selected Number3",selectedNumber3)
    console.log("selected Number4",selectedNumber4)

  const items = [
    {
      key: "1",
      label: <p>Machine Allocation & Production Details:</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "100%", margin: "auto" ,tableLayout:'fixed'}}>
            <thead>
              
            </thead>

            <tbody>
            <tr>
            <td colspan="18" style={{textAlign: "left" ,padding:'7px',fontWeight:'bold'}}>A . Machine Allocation & Production Details:
            <input 
              type="text" 
              value={machin_alloc} 
              onChange={handleMachinAllocChange}
              style={{ width: '90%', padding: '5px', fontWeight: 'bold', border:'none',outline:'none' }}
              />
            </td>
            
        </tr>

        <tr>
            <td colspan="3" style={{textAlign: "center",padding:'5px'}}>Machine No.</td>
            <td colspan="2" style={{textAlign: "center"}}>Manpower Allocation</td>
            <td colspan="3" style={{textAlign: "center"}}>ORDER NO</td>
            <td colspan="10" style={{textAlign: "center"}}>Product Name</td>
        </tr>

        <tr>
            <td colspan="3" rowspan="2" style={{textAlign: "center"}}>BAG MAKING MACHINE -01</td>
            <td colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
  <input 
    list="numberLov" 
    style={{ width: '80%', height: '60%', border: 'none', outline: 'none' }} 
    placeholder="Search..." 
    value={selectedNumber} 
    disabled={!isEditable} 
    onChange={handleNumberChange} 
    onInput={(e) => {
      const value = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = value;
      handleNumberChange(e);  
    }}
  />
  <datalist id="numberLov" style={{ width: '50%' }}>
    {Array.from({ length: 100 }, (_, i) => (
      <option key={i} value={i}>{i}</option>
    ))}
  </datalist>
</td>
            <td colspan="3"  style={{textAlign: "center"}}>
            <input
              list="pOrderLov"
              style={{ width: '80%', height: '60%', border: 'none', outline: 'none' }}
              placeholder="Select OrderNumber..."
              value={selectedPOrder}
              disabled={!isEditable} 
              onChange={handlePOrderChange}
              onInput={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                e.target.value = value;
                handlePOrderChange(e);  
              }}
            />
            <datalist id="pOrderLov" style={{ width: '50%' }}>
              {pOrders.map((order, index) => (
                <option key={index} value={order.POrder}>{order.POrder}</option>
              ))}
            </datalist>
            </td>
            <td colspan="5" style={{textAlign: "center", padding:'7px'}}>Running</td>
            <td colspan="5"style={{textAlign: "center"}} >{productName}</td>
        </tr>


        <tr>
        <td colspan="3"  style={{textAlign: "center"}} >
        <input
              list="pOrderLov"
              style={{ width: '80%', height: '60%', border: 'none', outline: 'none' }}
              placeholder="Select OrderNumber..."
              value={selectedPOrder1}
              disabled={!isEditable} 
              onChange={handlePOrderChange1}
              onInput={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                e.target.value = value;
                handlePOrderChange1(e);  
              }}
            />
            <datalist id="pOrderLov" style={{ width: '50%' }}>
              {pOrders.map((order, index) => (
                <option key={index} value={order.POrder}>{order.POrder}</option>
              ))}
            </datalist>
            </td>
            <td colspan="5" style={{textAlign: "center", padding:'7px'}}>Next</td>
            <td colspan="5" style={{textAlign: "center"}} >{productName1}</td>
        </tr>

        {/* <tr>
        <td colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
        <input 
        list="numberLov" 
        style={{ width: '80%', height: '60%', border: 'none', outline: 'none' }} 
        placeholder="Search..." 
        value={selectedNumber2} 
        onChange={handleNumberChange2} 
      />
      <datalist id="numberLov" style={{ width: '50%' }}>
        {Array.from({ length: 100 }, (_, i) => (
          <option key={i} value={i}>{i}</option>
        ))}
      </datalist>
</td>
        <td colspan="3"  style={{textAlign: "center" }}>
        <input
              list="pOrderLov"
              style={{ width: '80%', height: '60%', border: 'none', outline: 'none' }}
              placeholder="Select OrderNumber..."
              value={selectedPOrder2}
              onChange={handlePOrderChange2}
            />
            <datalist id="pOrderLov" style={{ width: '50%' }}>
              {pOrders.map((order, index) => (
                <option key={index} value={order.POrder}>{order.POrder}</option>
              ))}
            </datalist>
        </td>
            <td colspan="5" style={{textAlign: "center", padding:'7px'}}>Running</td>
            <td colspan="5" style={{textAlign: "center",}}>{productName2}</td>
        </tr>

        <tr>
        <td colspan="3"  style={{textAlign: "center" }}>
        <input
              list="pOrderLov"
              style={{ width: '80%', height: '60%', border: 'none', outline: 'none' }}
              placeholder="Select OrderNumber..."
              value={selectedPOrder3}
              onChange={handlePOrderChange3}
            />
            <datalist id="pOrderLov" style={{ width: '50%' }}>
              {pOrders.map((order, index) => (
                <option key={index} value={order.POrder}>{order.POrder}</option>
              ))}
            </datalist>
        </td>
        
        <td colspan="5" style={{textAlign: "center", padding:'7px'}}>Next</td>
        <td colspan="5" style={{textAlign: "center",}}>{productName3}</td>
    </tr> */}



    <tr>
            <td colspan="3" rowspan="4" style={{textAlign: "center"}}>BAG MAKING MACHINE -02</td>
            <td colSpan="2" rowSpan="2" style={{ textAlign: "center" }} >
            <input 
        list="numberLov" 
        style={{ width: '80%', height: '60%', border: 'none', outline: 'none' }} 
        disabled={!isEditable} 
        placeholder="Search..." 
        value={selectedNumber2} 
        onChange={handleNumberChange2} 
        onInput={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, '');
          e.target.value = value;
          handleNumberChange2(e);  
        }}
      />
      <datalist id="numberLov" style={{ width: '50%' }}>
        {Array.from({ length: 100 }, (_, i) => (
          <option key={i} value={i}>{i}</option>
        ))}
      </datalist>
</td>
            <td colspan="3"  style={{textAlign: "center"}}  > <input
              list="pOrderLov"
              style={{ width: '80%', height: '60%', border: 'none', outline: 'none' }}
              disabled={!isEditable} 
              placeholder="Select OrderNumber..."
              value={selectedPOrder2}
              onChange={handlePOrderChange2}
              onInput={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                e.target.value = value;
                handlePOrderChange2(e);  
              }}
            />
            <datalist id="pOrderLov" style={{ width: '50%' }}>
              {pOrders.map((order, index) => (
                <option key={index} value={order.POrder}>{order.POrder}</option>
              ))}
            </datalist></td>
            <td colspan="5" style={{textAlign: "center",padding:'7px'}}>Running</td>
            <td colspan="5"style={{textAlign: "center"}} >{productName2}</td>
        </tr>


        <tr>
        <td colspan="3"  style={{textAlign: "center"}} > <input
              list="pOrderLov"
              style={{ width: '80%', height: '60%', border: 'none', outline: 'none' }}
              placeholder="Select OrderNumber..."
              value={selectedPOrder3}
              disabled={!isEditable} 
              onChange={handlePOrderChange3}
              onInput={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                e.target.value = value;
                handlePOrderChange3(e);  
              }}
            />
            <datalist id="pOrderLov" style={{ width: '50%' }}>
              {pOrders.map((order, index) => (
                <option key={index} value={order.POrder}>{order.POrder}</option>
              ))}
            </datalist></td>
        
            <td colspan="5" style={{textAlign: "center",padding:'7px'}}>Next</td>
            <td colspan="5" style={{textAlign: "center"}} >{productName3}</td>
        </tr>

        {/* <tr>
        <td colSpan="2" rowSpan="2" style={{ textAlign: "center" }}>
        <input 
        list="numberLov" 
        style={{ width: '80%', height: '60%', border: 'none', outline: 'none' }} 
        placeholder="Search..." 
        value={selectedNumber4} 
        onChange={handleNumberChange4} 
      />
      <datalist id="numberLov" style={{ width: '50%' }}>
        {Array.from({ length: 100 }, (_, i) => (
          <option key={i} value={i}>{i}</option>
        ))}
      </datalist>
</td>
        
        <td colspan="3"  style={{textAlign: "center"}}> <input
              list="pOrderLov"
              style={{ width: '80%', height: '60%', border: 'none', outline: 'none' }}
              placeholder="Select OrderNumber..."
              value={selectedPOrder6}
              onChange={handlePOrderChange6}
            />
            <datalist id="pOrderLov" style={{ width: '50%' }}>
              {pOrders.map((order, index) => (
                <option key={index} value={order.POrder}>{order.POrder}</option>
              ))}
            </datalist></td>
       
            <td colspan="5" style={{textAlign: "center", padding:'7px'}}>Running</td>
            <td colspan="5" style={{textAlign: "center"}}>{productName6}</td>
        </tr>

        <tr>
<td colspan="3" style={{textAlign: "center"}} >
        <input
              list="pOrderLov"
              style={{ width: '80%', height: '60%', border: 'none', outline: 'none' }}
              placeholder="Select OrderNumber..."
              value={selectedPOrder7}
              onChange={handlePOrderChange7}
            />
            <datalist id="pOrderLov" style={{ width: '50%' }}>
              {pOrders.map((order, index) => (
                <option key={index} value={order.POrder}>{order.POrder}</option>
              ))}
            </datalist>
            </td>
        
        <td colspan="5" style={{textAlign: "center",padding:'7px'}}>Next</td>
        <td colspan="5" style={{textAlign: "center"}}>{productName7}</td>
    </tr> */}

            </tbody>
            
          </table>

        
        </div>
      ),
    }, 
    {
        key: "2",
        label: <p>Stopage Details</p>,
        children: (
          <div>
            <table className="f18table" style={{ width: "80%", margin: "auto" ,tableLayout:'fixed'}}>
              <thead>
                
              </thead>
  
             
              <tr>
        <td colspan="18"> STOPAGE DETAILS :</td>
     </tr>
     <br/>
  <thead>
     <tr>
   <td colspan="5" style={{textAlign: "center"}}>Nature Of Problem </td>
   <td colspan="4" style={{textAlign: "center"}}>Stop. Time</td>
   <td colspan="5" style={{textAlign: "center"}}>Restart Time</td>
   <td colspan="4" style={{textAlign: "center"}}>Idle Time(in Min)</td>
</tr>
</thead>

<tbody>
  {Array.isArray(Stoppage) && Stoppage.map((stoppage, index) => (
    <tr key={index}>
      <td colSpan="5" style={{ textAlign: "center" }}>{stoppage.Scause}</td>
      <td colSpan="4" style={{ textAlign: "center" }}>{stoppage.FTime}</td>
      <td colSpan="5" style={{ textAlign: "center" }}>{stoppage.TTime}</td>
      <td colSpan="4" style={{ textAlign: "center" }}>{stoppage.TotHrs}</td>
    </tr>
  ))}
</tbody>



<div style={{ width: "100%", margin: '0 auto' }}>
  <div style={{ padding: '10px 0' }}>
    <label
      htmlFor="remarksTextarea"
      style={{
        fontWeight: 'bold',
        fontSize: '16px',
        textTransform: 'uppercase',
        display: 'block', 
        paddingBottom: '5px',
      }}
    >
      Remarks:
    </label>
    <textarea
      id="remarksTextarea"
      style={{ width:'550px', height: '100px', outline: 'none', resize: 'none' }}
      value={remarkreason}
      onChange={handleTextareaChange}
      disabled={!isEditable}
    />
  </div>
</div>


     


            
  
              
            </table>
  
          
          </div>
        ),
      }, 

    {
      key: "3",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table className="f18table" style={{ width: "90%", margin: "auto",tableLayout:'fixed' }}>
            <tr >
              
              <td colSpan="15" style={{
                textAlign: 'center',
              }}>
                Operator Sign & Date 
              </td>
              <td colSpan="15" style={{
                textAlign: 'center',
              }}>
                HOD / Designee Sign & Date
              </td>

            </tr>


            <tr>
              
             
                  <td colSpan="15" style={{
                    fontSize: "17pt",
                    textAlign: 'center',
                    height: '70px',
                    fontFamily: "Times New Roman, Times, serif"
                  }}
                    disabled={
                      !isEditable
                    }
                  >
                {(selectedRow?.operator_status === "OPERATOR_REJECTED" ||
                selectedRow?.operator_status === "OPERATOR_APPROVED") && (

                    <div>
                      {selectedRow?.operator_sign}

                      <br />
                      {formattedOperatorDate}<br />
                      {(selectedRow?.operator_status === "OPERATOR_APPROVED" ||
                        selectedRow?.operator_status  === "OPERATOR_REJECTED" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED") &&
                        getImage3 && (
                          <img
                            src={getImage3}
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
                    </div>
                  )}
                  </td>
                


              <td colSpan="15" style={{
                fontSize: "17pt",
                textAlign: 'center',
                height: '70px',
                fontFamily: "Times New Roman, Times, serif"

              }}
                disabled={
                  !isEditable
                }
              >
                {(selectedRow?.hod_status === "HOD_APPROVED" ||
                  selectedRow?.hod_status === "HOD_REJECTED") && (
                    <div>
                      {HodSign}

                      <br />
                      {formattedhodDate}<br />
                      {(selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED") &&
                        getImage2 && (
                          <img
                            src={getImage2}
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
                    </div>
                  )}
              </td>

            </tr>

          </table>
        </div>
      ),
    }]



  return (
    <div>



      <BleachingHeader
        unit="Unit-H"
        formName={"LOG BOOK - BAG MAKING"}
        formatNo={"PH-PRD05/F-003"}
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }


        buttonsArray={[

          <Button
            key="back"
            type="primary"
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
          >
            Back
          </Button>,
          ...(role === "ROLE_HOD" ||
           
            role === "ROLE_QC" ||
            role === "ROLE_DESIGNEE" ? [
            <Button
              key="approve"
              loading={saveLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayButtons(),
              }}
              onClick={handleApprove}
              shape="round"
              icon={<img src={approveIcon} alt="Approve Icon" />}
            >
              &nbsp;Approve
            </Button>,
            <Button
              key="reject"
              loading={saveLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayButtons(),
              }}
              icon={<img src={rejectIcon} alt="Reject Icon" />}
              onClick={handleRejectModal}
              shape="round"
            >
              &nbsp;Reject
            </Button>
          ] : [
            <Button
            key="save"
            loading={saveLoading}
            type="primary"
         onClick={handleSave}
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display:canDisplayButton2(),
            }}
            shape="round"
            icon={<IoSave color="#00308F" />}
          >
            Save
          </Button>,
            <Button
              key="submit"
              loading={submitLoading}
              type="primary"
           onClick={submitData}
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayButtons(),
              }}
              icon={<GrDocumentStore color="#00308F" />}
              shape="round"
            >
              Submit
            </Button>
          ]),
          <Button
            key="logout"
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            shape="round"
            icon={<BiLock color="#00308F" />}
            onClick={() => {
              if (window.confirm("Are you sure want to logout")) {
                localStorage.removeItem("token");
                navigate("/Precot"); 
              }
            }}
          >
            Logout
          </Button>,
          <Tooltip
            key="user-info"
            trigger="click"
            style={{ backgroundColor: "#fff" }}
            title={
              <div>
                <h3>{localStorage.getItem("username")}</h3>
                <p>{localStorage.getItem("role")}</p>
              </div>
            }
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#E5EEF9" }}
              shape="circle"
              icon={<FaUserCircle color="#00308F" size={20} />}
            />
          </Tooltip>,

          <Modal
            key="reject-modal"
            title="Reject"
            open={showModal}
            onOk={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
            destroyOnClose={true}
            footer={[
              <Button
                key="submit-reject"
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                }}
                shape="round"
                onClick={handleReject}
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
              <label style={{ marginRight: "8px" }}>Remarks:</label>
              <TextArea
                value={rejectRemarks}
                onChange={(e) => setRejectRemarks(e.target.value)}
                rows={4}
                style={{ width: "100%" }}
              />

            </div>
          </Modal>

        ]}


      />
      <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
      

      <div style={{ display: 'flex',gap: '10px', marginTop: '10px' , marginBottom: '10px'}}>
        
       


      <Input
          addonBefore="Date"
          placeholder="Date"

          value={date}
          readOnly
          onChange={handleDateChange}
          style={{ width: '20%', marginLeft:"20px", height: '20px' }}

        />

<Input
          addonBefore="Shift"
          placeholder="Shift"

          value={shift}
          readOnly
          
          style={{ width: '20%', marginLeft:"20px", height: '20px' }}

        />




      </div>


     



      <Tabs
        defaultActiveKey="1"
        items={items}
        // onChange={onChange}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />

    </div>
  )
}

export default Padpunching_f00;

