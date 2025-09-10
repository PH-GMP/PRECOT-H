
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, Input, Row, Select, Tabs, Modal, Spin, message, Tooltip, Menu, Avatar, Drawer ,Radio} from "antd";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BleachingHeader from '../Components/BleachingHeader';
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from 'react-router-dom';
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from 'moment';
import API from "../baseUrl.json";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { DeleteOutlined,PlusOutlined } from '@ant-design/icons';
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import TextArea from "antd/es/input/TextArea";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const PadPunching_14= () => {
  const navigate = useNavigate();
  const role=localStorage.getItem("role")
  const location = useLocation();
  const { state } = location;
  const { date,shift,machineName,productName} = state || {};
  const token = localStorage.getItem("token");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const roleauth = localStorage.getItem("role");
  const [BagMakingDetails, setBagMakingDetails] = useState("");
  const [bagId, setBagId] = useState('');
  const dateObject = new Date(date);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = dateObject.getFullYear();
  console.log("selected shift",shift);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const showDrawer = () => { setOpen(true);};
  const onClose = () => {setOpen(false);}
  const [open, setOpen] = useState(false);
  const [SideSealing, setSideSealing] = useState("");
  const [ThreadSealing, setThreadSealing] = useState("");
  const [ThreadSealingPressure, setThreadSealingPressure] = useState("");
  const [MainAir, setMainAir] = useState("");

  

// Length of Bag
const [LengthOfBagSpe, setLengthOfBagSpe] = useState("");
const [LengthOfBag1, setLengthOfBag1] = useState("");
const [LengthOfBag2, setLengthOfBag2] = useState("");
const [LengthOfBag3, setLengthOfBag3] = useState("");
const [LengthOfBag4, setLengthOfBag4] = useState("");
const [LengthOfBag5, setLengthOfBag5] = useState("");
const [LengthOfBag6, setLengthOfBag6] = useState("");
const [LengthOfBag7, setLengthOfBag7] = useState("");
const [LengthOfBag8, setLengthOfBag8] = useState("");

// Width of Bag
const [WidthOfBagSpe, setWidthOfBagSpe] = useState("");
const [WidthOfBag1, setWidthOfBag1] = useState("");
const [WidthOfBag2, setWidthOfBag2] = useState("");
const [WidthOfBag3, setWidthOfBag3] = useState("");
const [WidthOfBag4, setWidthOfBag4] = useState("");
const [WidthOfBag5, setWidthOfBag5] = useState("");
const [WidthOfBag6, setWidthOfBag6] = useState("");
const [WidthOfBag7, setWidthOfBag7] = useState("");
const [WidthOfBag8, setWidthOfBag8] = useState("");

// buttom Gusset Size
const [ButtomGussetSpe, setButtomGussetSpe] = useState("");
const [ButtomGusset1, setButtomGusset1] = useState("");
const [ButtomGusset2, setButtomGusset2] = useState("");
const [ButtomGusset3, setButtomGusset3] = useState("");
const [ButtomGusset4, setButtomGusset4] = useState("");
const [ButtomGusset5, setButtomGusset5] = useState("");
const [ButtomGusset6, setButtomGusset6] = useState("");
const [ButtomGusset7, setButtomGusset7] = useState("");
const [ButtomGusset8, setButtomGusset8] = useState("");

// Top Gusset Size
const [TopGussetSpe, setTopGussetSpe] = useState("");
const [TopGusset1, setTopGusset1] = useState("");
const [TopGusset2, setTopGusset2] = useState("");
const [TopGusset3, setTopGusset3] = useState("");
const [TopGusset4, setTopGusset4] = useState("");
const [TopGusset5, setTopGusset5] = useState("");
const [TopGusset6, setTopGusset6] = useState("");
const [TopGusset7, setTopGusset7] = useState("");
const [TopGusset8, setTopGusset8] = useState("");

// Film Thickness in micron
const [FilmThicknessSpe, setFilmThicknessSpe] = useState("");
const [FilmThickness1, setFilmThickness1] = useState("");
const [FilmThickness2, setFilmThickness2] = useState("");
const [FilmThickness3, setFilmThickness3] = useState("");
const [FilmThickness4, setFilmThickness4] = useState("");
const [FilmThickness5, setFilmThickness5] = useState("");
const [FilmThickness6, setFilmThickness6] = useState("");
const [FilmThickness7, setFilmThickness7] = useState("");
const [FilmThickness8, setFilmThickness8] = useState("");

// Empty Bag Weight
const [EmptyBagSpe, setEmptyBagSpe] = useState("");
const [EmptyBag1, setEmptyBag1] = useState("");
const [EmptyBag2, setEmptyBag2] = useState("");
const [EmptyBag3, setEmptyBag3] = useState("");
const [EmptyBag4, setEmptyBag4] = useState("");
const [EmptyBag5, setEmptyBag5] = useState("");
const [EmptyBag6, setEmptyBag6] = useState("");
const [EmptyBag7, setEmptyBag7] = useState("");
const [EmptyBag8, setEmptyBag8] = useState("");
const formattedDate1 = `${day}/${month}/${year}`;

const handleKeyDown1 = (e) => {
  if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key ==='.'|| e.key === 'E') {
    e.preventDefault();
  }
}; 
const handleKeyDown2 = (e) => {
  const isAlphanumeric = /^[a-zA-Z0-9.]$/;

  if (!isAlphanumeric.test(e.key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
  }
};
const handle_SideSealing = () => {
  if (SideSealing < 190 || SideSealing > 220) {
      message.error("Please enter a valid number between 190 and 220 for Side Sealing Temperature");
      setSideSealing("");
  } 
};
  const handle_ThreadSealing = () => {
    if (ThreadSealing < 120 || ThreadSealing > 155) {
      message.error("Please enter a number between 120 and 155 for Thread Sealing Temperature");
      setThreadSealing("");
    }
  };
  const handle_ThreadSealingPressure= () => {
    if (ThreadSealingPressure < 1.0 || ThreadSealingPressure > 2.5) {
      message.error("Please enter a number between 1.0 and 2.5 for Thread Sealing Pressure");
      setThreadSealingPressure("");
    }
  };
  const handle_MainAir = () => {
    if (MainAir < 5 || MainAir > 7) {
      message.error("Please enter a number between 5 and 7 for Main Air Pressure");
      setMainAir("");
    }
  };

useEffect(() => {
  const token = localStorage.getItem("token");
  const username = BagMakingDetails?.operator_sign;
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
        setGetImage1(url);
      })
      .catch((err) => {
        console.log("Error in fetching image:", err);
      });
  }
}, [BagMakingDetails,API.prodUrl, token]);

useEffect(() => {
  const token = localStorage.getItem("token");
  const username = BagMakingDetails?.hod_sign;
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
}, [BagMakingDetails,API.prodUrl, token]);

const disable=
  (roleauth === "ROLE_OPERATOR" &&
    BagMakingDetails?.operator_status ===
      "OPERATOR_APPROVED" &&
      BagMakingDetails?.hod_status === "WAITING_FOR_APPROVAL") ||
      BagMakingDetails?.hod_status === "HOD_APPROVED" ||
  (roleauth === "ROLE_HOD" &&
    (BagMakingDetails?.hod_status === "WAITING_FOR_APPROVAL" ||
      BagMakingDetails?.hod_status === "HOD_APPROVED" ||
      BagMakingDetails?.hod_status === "HOD_REJECTED")) ||
  (roleauth === "ROLE_DESIGNEE" &&
    (BagMakingDetails?.hod_status === "WAITING_FOR_APPROVAL" ||
      BagMakingDetails?.hod_status === "HOD_APPROVED" ||
      BagMakingDetails?.hod_status === "HOD_REJECTED"))

// Formated Dates
const formattedDate = (date) => {
  if (date) {
    const dateObject = moment(date);
    if (dateObject.isValid()) {
      return dateObject.format('DD/MM/YYYY');
    }
  }
  return '';
};
  const formattedDateHod = () => {
    if (BagMakingDetails?.hod_submit_on) {
      const date = moment(BagMakingDetails?.hod_submit_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };
  const formattedDateOperator = () => {
    if ( BagMakingDetails?.operator_submitted_on) {
      const date = moment( BagMakingDetails?.operator_submitted_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };

// Display Button Based on Role Status
const canDisplayButtons = () => {
  if (roleauth == "ROLE_OPERATOR") {
    if (
      BagMakingDetails?.operator_status == "OPERATOR_APPROVED" &&
      BagMakingDetails?.hod_status == "HOD_REJECTED"
    ) {
      return "block";
    } else if (
      (BagMakingDetails?.operator_status == "OPERATOR_APPROVED" &&
        BagMakingDetails?.hod_status == "WAITING_FOR_APPROVAL") ||
        BagMakingDetails?.hod_status == "HOD_APPROVED"
    ) {
      return "none";
    }
  } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
    if (
      BagMakingDetails?.hod_status == "HOD_APPROVED" ||
      BagMakingDetails?.hod_status == "HOD_REJECTED" ||
      emptyarraycheck == 0
    ) {
      return "none";
    }
    return "block";
  } else {
    if (
      BagMakingDetails?.hod_status == "HOD_APPROVED" ||
      BagMakingDetails?.hod_status == "HOD_REJECTED"
    ) {
      return "none";
    }
    return "block";
  }
};
const canDisplayButton2 = () => {
  if (roleauth == "ROLE_OPERATOR") {
    if (
      BagMakingDetails?.operator_status == "OPERATOR_APPROVED" &&
      BagMakingDetails?.hod_status == "HOD_REJECTED"
    ) {
      return "none"; 
    } else if (
      BagMakingDetails?.operator_status == "OPERATOR_APPROVED" &&
      (BagMakingDetails?.hod_status == "WAITING_FOR_APPROVAL" ||
        BagMakingDetails?.hod_status == "HOD_APPROVED")
    ) {
      return "none";
    }
  } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
    if (
      BagMakingDetails?.hod_status == "HOD_APPROVED" ||
      BagMakingDetails?.hod_status == "HOD_REJECTED" ||
      emptyarraycheck == 0
    ) {
      return "none"; 
    }
    return "block"; 
  } else {
    if (
      BagMakingDetails?.hod_status == "HOD_APPROVED" ||
      BagMakingDetails?.hod_status == "HOD_REJECTED"
    ) {
      return "none"; 
    }
    return "block"; 
  }
};

// Save & Submit Api
  const handleSave = async () => {
    try {
      await saveBagMakingRecord();
    } catch (error) {
      console.error("Error saving Machine Cleaning Record :", error);
    }

  };
  const handleSubmit = async () => {

    try {
      await SubmitBagMakingRecord();
    } catch (error) {
      console.error("Error submitting Logbook - Spunlace Planning:", error);
    }

  };

  const saveBagMakingRecord = async () => {
    setSaveLoading(true);
      try {
      const payload = {
        formatName: "Bag Making - Specification Details",
        formatNo: "PH-PRD05/F-002",
        revisionNo: 1,
        refSopNo:  "PH-PRD05-D-03",
        unit: "Unit H",
        date: date,
        shift:shift,
        bagId:bagId,
        machineName:machineName,
        productName:productName,    
        details :[{
          sideSealTemp:SideSealing,
          threadSealTemp:ThreadSealing,
          threadSealPressure:ThreadSealingPressure,
          mainAirPressure:MainAir,
          lenSpecification:LengthOfBagSpe,
          length1:LengthOfBag1,
          length2:LengthOfBag2,
          length3:LengthOfBag3,
          length4:LengthOfBag4,
          length5:LengthOfBag5,
          length6:LengthOfBag6,
          length7:LengthOfBag7,
          length8:LengthOfBag8,
          widthSpecification:WidthOfBagSpe,
          widht1:WidthOfBag1,
          widht2:WidthOfBag2,
          widht3:WidthOfBag3,
          widht4:WidthOfBag4,
          widht5:WidthOfBag5,
          widht6:WidthOfBag6,
          widht7:WidthOfBag7,
          widht8:WidthOfBag8,
          bottomGussetSpecification:ButtomGussetSpe,
          bottomGusset1:ButtomGusset1,
          bottomGusset2:ButtomGusset2,
          bottomGusset3:ButtomGusset3,
          bottomGusset4:ButtomGusset4,
          bottomGusset5:ButtomGusset5,
          bottomGusset6:ButtomGusset6,
          bottomGusset7:ButtomGusset7,
          bottomGusset8:ButtomGusset8,
          topGussetSpecification:TopGussetSpe,
          topGusset1:TopGusset1,
          topGusset2:TopGusset2,
          topGusset3:TopGusset3,
          topGusset4:TopGusset4,
          topGusset5:TopGusset5,
          topGusset6:TopGusset6,
          topGusset7:TopGusset7,
          topGusset8:TopGusset8,
          filmThicknessSpecification:FilmThicknessSpe,
          filmThickness1:FilmThickness1,
          filmThickness2:FilmThickness2,
          filmThickness3:FilmThickness3,
          filmThickness4:FilmThickness4,
          filmThickness5:FilmThickness5,
          filmThickness6:FilmThickness6,
          filmThickness7:FilmThickness7,
          filmThickness8:FilmThickness8,
          emptyBagWtSpecification:EmptyBagSpe,
          emptyBagWt1:EmptyBag1,
          emptyBagWt2:EmptyBag2,
          emptyBagWt3:EmptyBag3,
          emptyBagWt4:EmptyBag4,
          emptyBagWt5:EmptyBag5,
          emptyBagWt6:EmptyBag6,
          emptyBagWt7:EmptyBag7,
          emptyBagWt8:EmptyBag8,


        }
        ] ,
        remarks:remarks
     };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/PadPunching/Service/BagMaking/SaveBagMakingF014`,
        payload,
        { headers }
      );
    
      console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate('/Precot/PadPunching/F-14/Summary');
      }, 1500)
      message.success('Pad Punching Record Saved Successfully..');


    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save Pad Punching Record  !!");

    } finally {
      setSaveLoading(false);
    }
  };
  
  const SubmitBagMakingRecord = async () => {
    setSubmitLoading(true)
    if(SideSealing =="null" || SideSealing==""){
      message.warning("Side Sealing Temperature Required");
      setSubmitLoading(false);
      return;
    }
    if(ThreadSealing =="null" || ThreadSealing==""){
      message.warning("Thread Sealing Temperature Required");
      setSubmitLoading(false);
      return;
    }
    if(ThreadSealingPressure =="null" || ThreadSealingPressure==""){
      message.warning("Thread Sealing Pressure Required");
      setSubmitLoading(false);
      return;
    }
    if(MainAir =="null" || MainAir==""){
      message.warning("Main Air Pressure Required");
      setSubmitLoading(false);
      return;
    }
    try {
      const payload = {
        formatName: "Bag Making - Specification Details",
        formatNo: "PH-PRD05/F-002",
        revisionNo: 1,
        refSopNo:  "PH-PRD05-D-03",
        unit: "Unit H",
        date: date,
        shift:shift,
        bagId:bagId,
        machineName:machineName,
        productName:productName,    
        details :[{
          sideSealTemp:SideSealing,
          threadSealTemp:ThreadSealing,
          threadSealPressure:ThreadSealingPressure,
          mainAirPressure:MainAir,
          lenSpecification:LengthOfBagSpe,
          length1:LengthOfBag1,
          length2:LengthOfBag2,
          length3:LengthOfBag3,
          length4:LengthOfBag4,
          length5:LengthOfBag5,
          length6:LengthOfBag6,
          length7:LengthOfBag7,
          length8:LengthOfBag8,
          widthSpecification:WidthOfBagSpe,
          widht1:WidthOfBag1,
          widht2:WidthOfBag2,
          widht3:WidthOfBag3,
          widht4:WidthOfBag4,
          widht5:WidthOfBag5,
          widht6:WidthOfBag6,
          widht7:WidthOfBag7,
          widht8:WidthOfBag8,
          bottomGussetSpecification:ButtomGussetSpe,
          bottomGusset1:ButtomGusset1,
          bottomGusset2:ButtomGusset2,
          bottomGusset3:ButtomGusset3,
          bottomGusset4:ButtomGusset4,
          bottomGusset5:ButtomGusset5,
          bottomGusset6:ButtomGusset6,
          bottomGusset7:ButtomGusset7,
          bottomGusset8:ButtomGusset8,
          topGussetSpecification:TopGussetSpe,
          topGusset1:TopGusset1,
         topGusset2:TopGusset2,
          topGusset3:TopGusset3,
          topGusset4:TopGusset4,
          topGusset5:TopGusset5,
          topGusset6:TopGusset6,
          topGusset7:TopGusset7,
          topGusset8:TopGusset8,
          filmThicknessSpecification:FilmThicknessSpe,
          filmThickness1:FilmThickness1,
          filmThickness2:FilmThickness2,
          filmThickness3:FilmThickness3,
          filmThickness4:FilmThickness4,
          filmThickness5:FilmThickness5,
          filmThickness6:FilmThickness6,
          filmThickness7:FilmThickness7,
          filmThickness8:FilmThickness8,
          emptyBagWtSpecification:EmptyBagSpe,
          emptyBagWt1:EmptyBag1,
          emptyBagWt2:EmptyBag2,
          emptyBagWt3:EmptyBag3,
          emptyBagWt4:EmptyBag4,
          emptyBagWt5:EmptyBag5,
          emptyBagWt6:EmptyBag6,
          emptyBagWt7:EmptyBag7,
          emptyBagWt8:EmptyBag8,
        }
        ] ,
        remarks:remarks
     };
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };


    const response = await axios.post(
      `${API.prodUrl}/Precot/api/PadPunching/Service/BagMaking/SubmitBagMakingF014`,
      payload,
      { headers }
    );
  
    setTimeout(() => {
      navigate('/Precot/PadPunching/F-14/Summary');
    }, 1500)

    message.success(response.data.message);


  } catch (error) {
    console.error("Error:", error);
    message.error(error.response.data.message);

    throw new Error("Failed to submit Machine Cleaning Record !!");

  } finally {
    setSubmitLoading(false);
  }
};

  const handleBack = () => {
    navigate("/Precot/PadPunching/F-14/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
  }, []);

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
    // Add any other print-related logic here
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", 
    };

    const res = await axios.put(`${API.prodUrl}/Precot/api/PadPunching/Service/BagMaking/approveOrReject`,
      {
         id : bagId,
        status: "Approve"
    },
        { headers }
      )
      .then((res) => {
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/PadPunching/F-14/Summary");
      })
      .catch((err) => {
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", 
    };
    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setSubmitLoading(false);
      return;
    }
    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/PadPunching/Service/BagMaking/approveOrReject`,
        {
          id: bagId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/PadPunching/F-14/Summary");
      })
      .catch((err) => {
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
 
 const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/PadPunching/Service/BagMaking/getByDateShift?date=${date}&shift=${shift}&machineName=${machineName}&productName=${productName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setBagMakingDetails(response.data);
      if(((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.operator_status !=="OPERATOR_APPROVED"))||((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.hod_status =="HOD_REJECTED"))){
        message.error("Operator Yet Not Approved");
        setTimeout(() => {
         navigate('/Precot/PadPunching/F-14/Summary');
       }, 1500)
    }
       
     if (response.data &&response.data.message!=="No data" ) {
        const data = response.data;
        console.log("set response date for all fields", data)
        setBagId(response.data.bagId);
       setSideSealing(response.data.details[0].sideSealTemp);
       setThreadSealing(response.data.details[0].threadSealTemp);
       setThreadSealingPressure(response.data.details[0].threadSealPressure);
       setMainAir(response.data.details[0].mainAirPressure);
       setLengthOfBagSpe(response.data.details[0].lenSpecification||'NA');
       setLengthOfBag1(response.data.details[0].length1||0);
       setLengthOfBag2(response.data.details[0].length2||0);
       setLengthOfBag3(response.data.details[0].length3||0);
       setLengthOfBag4(response.data.details[0].length4||0);
       setLengthOfBag5(response.data.details[0].length5||0);
       setLengthOfBag6(response.data.details[0].length6||0);
       setLengthOfBag7(response.data.details[0].length7||0);
       setLengthOfBag8(response.data.details[0].length8||0);

       setWidthOfBagSpe(response.data.details[0].widthSpecification||'NA');
       setWidthOfBag1(response.data.details[0].widht1||0);
       setWidthOfBag2(response.data.details[0].widht2||0);
       setWidthOfBag3(response.data.details[0].widht3||0);
       setWidthOfBag4(response.data.details[0].widht4||0);
       setWidthOfBag5(response.data.details[0].widht5||0);
       setWidthOfBag6(response.data.details[0].widht6||0);
       setWidthOfBag7(response.data.details[0].widht7||0);
       setWidthOfBag8(response.data.details[0].widht8||0);

       setButtomGussetSpe(response.data.details[0].bottomGussetSpecification||'NA');
       setButtomGusset1(response.data.details[0].bottomGusset1||0);
       setButtomGusset2(response.data.details[0].bottomGusset2||0);
       setButtomGusset3(response.data.details[0].bottomGusset3||0);
       setButtomGusset4(response.data.details[0].bottomGusset4||0);
       setButtomGusset5(response.data.details[0].bottomGusset5||0);
       setButtomGusset6(response.data.details[0].bottomGusset6||0);
       setButtomGusset7(response.data.details[0].bottomGusset7||0);
       setButtomGusset8(response.data.details[0].bottomGusset8||0);

       setTopGussetSpe(response.data.details[0].topGussetSpecification ||'NA');
       setTopGusset1(response.data.details[0].topGusset1||0);
       setTopGusset2(response.data.details[0].topGusset2||0);
       setTopGusset3(response.data.details[0].topGusset3||0);
       setTopGusset4(response.data.details[0].topGusset4||0);
       setTopGusset5(response.data.details[0].topGusset5||0);
       setTopGusset6(response.data.details[0].topGusset6||0);
       setTopGusset7(response.data.details[0].topGusset7||0);
       setTopGusset8(response.data.details[0].topGusset8||0);

       setFilmThicknessSpe(response.data.details[0].filmThicknessSpecification||'NA');
       setFilmThickness1(response.data.details[0].filmThickness1 ||0);
       setFilmThickness2(response.data.details[0].filmThickness2||0);
       setFilmThickness3(response.data.details[0].filmThickness3||0);
       setFilmThickness4(response.data.details[0].filmThickness4||0);
       setFilmThickness5(response.data.details[0].filmThickness5||0);
       setFilmThickness6(response.data.details[0].filmThickness6||0);
       setFilmThickness7(response.data.details[0].filmThickness7||0);
       setFilmThickness8(response.data.details[0].filmThickness8||0);

       setEmptyBagSpe(response.data.details[0].emptyBagWtSpecification||'NA');
       setEmptyBag1(response.data.details[0].emptyBagWt1||0);
       setEmptyBag2(response.data.details[0].emptyBagWt2||0);
       setEmptyBag3(response.data.details[0].emptyBagWt3||0);
       setEmptyBag4(response.data.details[0].emptyBagWt4||0);
       setEmptyBag5(response.data.details[0].emptyBagWt5||0);
       setEmptyBag6(response.data.details[0].emptyBagWt6||0);
       setEmptyBag7(response.data.details[0].emptyBagWt7||0);
       setEmptyBag8(response.data.details[0].emptyBagWt8||0);

       setRemarks(response.data.remarks||'NA')
      } else {

      }
    } catch (error) {
      console.error('Error checking BMR existence:', error);
      message.error(error.message);
    } finally {

    }

  };

  const items = [
    {
      key: "1",
      label: <p>PROCESS CONTROL</p>,
      children: (
        <div>
            {/* colums = 100 */}
          <table  style={{ width: "100%", margin: "auto",marginTop:"20px" }}>
            <tr >
                <th colSpan="10"  style={{textAlign:"center", height:"35px"}}>Sr. No.</th>
                <th colSpan="20" style={{textAlign:"center"}}>Process Parameter & Units</th>
                <th colSpan="20" style={{textAlign:"center"}}>Standards</th>
                <th colSpan="20" style={{textAlign:"center"}}>Units</th>
                <th colSpan="30" style={{textAlign:"center"}}>Actual Observations</th>

            </tr>
            <tr >
                <td colSpan="10"  style={{textAlign:"center", height:"25px"}}>1</td>
                <td colSpan="20" style={{textAlign:"center"}}>Side Sealing Temperature</td>
                <td colSpan="20" style={{textAlign:"center"}}>190 - 220</td>
                <td colSpan="20" style={{textAlign:"center"}}>℃</td>
                <td colSpan="30" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={SideSealing}
                  type="number"
                  onChange={(e) => setSideSealing(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none", 
                  }}
                  onBlur={handle_SideSealing}
                  onKeyDown={handleKeyDown1}
                  disabled={disable}
                /></td>

            </tr>
            <tr >
                <td colSpan="10"  style={{textAlign:"center", height:"25px"}}>2</td>
                <td colSpan="20" style={{textAlign:"center"}}>Thread Sealing Temperature</td>
                <td colSpan="20" style={{textAlign:"center"}}>120 - 155</td>
                <td colSpan="20" style={{textAlign:"center"}}>℃</td>
                <td colSpan="30" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={ThreadSealing}
                  onChange={(e) => setThreadSealing(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onBlur={handle_ThreadSealing}
                  type="number"
                  onKeyDown={handleKeyDown1}
                  disabled={disable}
                /></td>

            </tr>
            <tr >
                <td colSpan="10"  style={{textAlign:"center", height:"25px"}}>3</td>
                <td colSpan="20" style={{textAlign:"center"}}>Thread Sealing Pressure</td>
                <td colSpan="20" style={{textAlign:"center"}}>1.0 - 2.5</td>
                <td colSpan="20" style={{textAlign:"center"}}>KG</td>
                <td colSpan="30" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={ThreadSealingPressure}
                  onChange={(e) => setThreadSealingPressure(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onBlur={handle_ThreadSealingPressure}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
            </tr>
            <tr >
                <td colSpan="10"  style={{textAlign:"center", height:"25px"}}>4</td>
                <td colSpan="20" style={{textAlign:"center"}}>Main Air Pressure</td>
                <td colSpan="20" style={{textAlign:"center"}}>5 - 7</td>
                <td colSpan="20" style={{textAlign:"center"}}>BAR</td>
                <td colSpan="30" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={MainAir}
                  onChange={(e) => setMainAir(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onBlur={handle_MainAir}
                  type="number"
                  onKeyDown={handleKeyDown1}
                  disabled={disable}
                /></td>

            </tr>
          </table>
     
        </div>
      ),
    },
    {
      key: "2",
      label: <p>PRODUCT CONTROL</p>,
      children: (
        <div>
            {/* colums = 100 */}
          <table  style={{ width: "100%", margin: "auto",marginTop:"20px"}}>
          <tr >
            <td colSpan="70" style={{border:"none"}}></td>
            <th colSpan="100" style={{textAlign:"center",border:"none"}}> {"Actual Observations"}</th></tr> 
          <tr >
                <th colSpan="10"  style={{textAlign:"center", height:"35px"}}>Sr. No.</th>
                <th colSpan="30" style={{textAlign:"center"}}>Parameter</th>
                <th colSpan="30" style={{textAlign:"center"}}>Specification</th>
                <th colSpan="5" style={{textAlign:"center"}}>1</th>
                <th colSpan="5" style={{textAlign:"center"}}>2</th>
                <th colSpan="5" style={{textAlign:"center"}}>3</th>
                <th colSpan="5" style={{textAlign:"center"}}>4</th>
                <th colSpan="5" style={{textAlign:"center"}}>5</th>
                <th colSpan="5" style={{textAlign:"center"}}>6</th>
                <th colSpan="5" style={{textAlign:"center"}}>7</th>
                <th colSpan="5" style={{textAlign:"center"}}>8</th>
               
            </tr>
            <tr>
             <td colSpan="10"  style={{textAlign:"center", height:"25px"}}>1</td>
                <td colSpan="30" style={{textAlign:"center"}}>Length of Bag</td>
                <td colSpan="30" style={{textAlign:"center"}}><input
                  className="inp-new"
                   value={LengthOfBagSpe}
                  onChange={(e) => setLengthOfBagSpe(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={LengthOfBag1}
                  onChange={(e) => setLengthOfBag1(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={LengthOfBag2}
                  onChange={(e) => setLengthOfBag2(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={LengthOfBag3}
                  onChange={(e) => setLengthOfBag3(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={LengthOfBag4}
                  onChange={(e) => setLengthOfBag4(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={LengthOfBag5}
                  onChange={(e) => setLengthOfBag5(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={LengthOfBag6}
                  onChange={(e) => setLengthOfBag6(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={LengthOfBag7}
                  onChange={(e) => setLengthOfBag7(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={LengthOfBag8}
                  onChange={(e) => setLengthOfBag8(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
            </tr>
            <tr>
             <td colSpan="10"  style={{textAlign:"center", height:"25px"}}>2</td>
                <td colSpan="30" style={{textAlign:"center"}}>Width of  Bag</td>
                <td colSpan="30" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={WidthOfBagSpe}
                  onChange={(e) => setWidthOfBagSpe(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={WidthOfBag1}
                  onChange={(e) => setWidthOfBag1(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={WidthOfBag2}
                  onChange={(e) => setWidthOfBag2(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={WidthOfBag3}
                  onChange={(e) => setWidthOfBag3(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={WidthOfBag4}
                  onChange={(e) => setWidthOfBag4(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={WidthOfBag5}
                  onChange={(e) => setWidthOfBag5(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={WidthOfBag6}
                  onChange={(e) => setWidthOfBag6(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={WidthOfBag7}
                  onChange={(e) => setWidthOfBag7(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={WidthOfBag8}
                  onChange={(e) => setWidthOfBag8(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
            </tr>
            <tr>
             <td colSpan="10"  style={{textAlign:"center", height:"25px"}}>3</td>
                <td colSpan="30" style={{textAlign:"center"}}>Bottom Gusset Size</td>
                <td colSpan="30" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={ButtomGussetSpe}
                  onChange={(e) => setButtomGussetSpe(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={ButtomGusset1}
                  onChange={(e) => setButtomGusset1(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={ButtomGusset2}
                  onChange={(e) => setButtomGusset2(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={ButtomGusset3}
                  onChange={(e) => setButtomGusset3(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={ButtomGusset4}
                  onChange={(e) => setButtomGusset4(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={ButtomGusset5}
                  onChange={(e) => setButtomGusset5(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={ButtomGusset6}
                  onChange={(e) => setButtomGusset6(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={ButtomGusset7}
                  onChange={(e) => setButtomGusset7(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={ButtomGusset8}
                  onChange={(e) => setButtomGusset8(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
            </tr>
            <tr>
             <td colSpan="10"  style={{textAlign:"center", height:"25px"}}>4</td>
                <td colSpan="30" style={{textAlign:"center"}}>Top Gusset Size</td>
                <td colSpan="30" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={TopGussetSpe}
                  onChange={(e) => setTopGussetSpe(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={TopGusset1}
                  onChange={(e) => setTopGusset1(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={TopGusset2}
                  onChange={(e) => setTopGusset2(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={TopGusset3}
                  onChange={(e) => setTopGusset3(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={TopGusset4}
                  onChange={(e) => setTopGusset4(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={TopGusset5}
                  onChange={(e) => setTopGusset5(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={TopGusset6}
                  onChange={(e) => setTopGusset6(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={TopGusset7}
                  onChange={(e) => setTopGusset7(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={TopGusset8}
                  onChange={(e) => setTopGusset8(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
            </tr>
            <tr>
             <td colSpan="10"  style={{textAlign:"center", height:"25px"}}>5</td>
                <td colSpan="30" style={{textAlign:"center"}}>Film Thickness in micron</td>
                <td colSpan="30" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={FilmThicknessSpe}
                  onChange={(e) => setFilmThicknessSpe(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={FilmThickness1}
                  onChange={(e) => setFilmThickness1(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={FilmThickness2}
                  onChange={(e) => setFilmThickness2(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={FilmThickness3}
                  onChange={(e) => setFilmThickness3(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={FilmThickness4}
                  onChange={(e) => setFilmThickness4(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={FilmThickness5}
                  onChange={(e) => setFilmThickness5(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={FilmThickness6}
                  onChange={(e) => setFilmThickness6(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={FilmThickness7}
                  onChange={(e) => setFilmThickness7(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={FilmThickness8}
                  onChange={(e) => setFilmThickness8(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
            </tr>
            <tr>
             <td colSpan="10"  style={{textAlign:"center", height:"25px"}}>6</td>
                <td colSpan="30" style={{textAlign:"center"}}>Empty Bag Weight</td>
                <td colSpan="30" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={EmptyBagSpe}
                  onChange={(e) => setEmptyBagSpe(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={EmptyBag1}
                  onChange={(e) => setEmptyBag1(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={EmptyBag2}
                  onChange={(e) => setEmptyBag2(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={EmptyBag3}
                  onChange={(e) => setEmptyBag3(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={EmptyBag4}
                  onChange={(e) => setEmptyBag4(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={EmptyBag5}
                  onChange={(e) => setEmptyBag5(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={EmptyBag6}
                  onChange={(e) => setEmptyBag6(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={EmptyBag7}
                  onChange={(e) => setEmptyBag7(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
                <td colSpan="5" style={{textAlign:"center"}}><input
                  className="inp-new"
                  value={EmptyBag8}
                  onChange={(e) => setEmptyBag8(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown2}
                  disabled={disable}
                /></td>
            </tr>
            <tr>
            <th  colSpan="110" style={{ height:"50px", textAlign: "left",verticalAlign:"top", padding:"5px" }}>Remarks:    <textarea
                 value={remarks}
                 className="inp-new"
                 onChange={(e) => setRemarks(e.target.value)}
                 style={{ width: "100%", height: "50px", resize: "none" ,border:"none", textAlign:"left" }}
                 disabled={disable}
              /><br/></th></tr>
                                
          </table>
     
        </div>
      ),
    }, 
  {
      key: "4",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr >
              {/* <td colSpan="34" style={{ height: "35px", textAlign: "center" }}>Performed by Operator</td> */}
              <td colSpan="50" style={{ textAlign: "center" ,height:"30px"}}>Operator Sign & Date</td>
              <td colSpan="50" style={{ textAlign: "center" }}>HOD / Designee Sign & Date</td>

            </tr>
            <tr >
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {BagMakingDetails?.operator_status === "OPERATOR_APPROVED" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div>{BagMakingDetails?.operator_sign}</div>
                        <div>{formattedDateOperator()}</div>
                      </div>
                      {getImage1 && (
                      <img
                        src={getImage1}
                        alt="Operator Sign"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "center",
                        }}
                      /> )}
                    </div>
                    {/* <div>Signature & Date</div> */}
                  </>
                )}

               
              </td>
              
              <td
                colSpan="50"
                style={{ textAlign: "center", 
                // verticalAlign: "bottom" 
                }}
              >
                {(BagMakingDetails?.hod_status === "HOD_REJECTED" || 
                BagMakingDetails?.hod_status === "HOD_APPROVED") && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          {" "}
                          <div>{BagMakingDetails?.hod_sign}</div>
                          <div>{formattedDateHod()}</div>
                        </div>
                        {getImage2 && (
                        <img
                          src={getImage2}
                          alt="HOD Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        /> )}
                      </div>                    </>
                  )}
              </td>

            </tr>

          </table>
        </div>
      ),
    }]


  return (
    <div>
        <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
          <BleachingHeader
        unit="Unit-H"
        formName="Bag Making - Specification Details"
        formatNo="PH-PRD05/F-002"
        sopNo="PH-PRD05-D-03"
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
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
            }}
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
          </Button>,

          role === "ROLE_HOD" ||
          role === "ROLE_QA" ||
          role === "ROLE_QC" ||
          role === "ROLE_DESIGNEE" ? (
            <>
              <Button
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
                icon={ <img src={approveIcon} alt="Approve Icon" />}
              >
                &nbsp;Approve
              </Button>
              <Button
                loading={submitLoading}
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
            </>
          ) : (
            <>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButton2(),
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                loading={submitLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ),

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

      {/* date row */}
      <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: '10px', marginTop: '20px' ,marginLeft:"10px"}}>
        <Input
            addonBefore="Date:"
            placeholder="Date"
            value={formattedDate1}
            disabled
            style={{ width: '20%', height: '35px' }}
        />
       <Input
            addonBefore="Shift:"
            placeholder="Shift"
            value={shift}
            disabled
            style={{ width: '10%', height: '35px' }}
        />
      <Input
            addonBefore="Machine Name:"
            placeholder="MachineName"
            value={machineName}
            disabled
            style={{ width: '30%', height: '35px' }}
        />
        <Input
            addonBefore="Product Name:"
            placeholder="ProductName"
            value={productName}
            disabled
            style={{ width: '30%', height: '35px' }}
        />
      </div>

        <Modal
          title="Reject"
          open={showModal}
          onOk={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
          destroyOnClose={true}
          showSearch
          footer={[
            <Button
              key="submit"
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

export default PadPunching_14

