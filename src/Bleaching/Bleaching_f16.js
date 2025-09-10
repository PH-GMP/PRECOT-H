
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

const Bleaching_f16 = () => {
  const navigate = useNavigate();
  const role=localStorage.getItem("role")
  const location = useLocation();
  const { state } = location;
  const { date} = state || {};
  const token = localStorage.getItem("token");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const roleauth = localStorage.getItem("role");
  const [cleaningRecordByDate, setCleaningRecordByDate] = useState("");
  const [recordId, setRecordId] = useState('');
  const dateObject = new Date(date);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = dateObject.getFullYear();
  const monthIndex = dateObject.getMonth();
  console.log("formated year",year);
  console.log("formated month",month);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const handleBulkYes = () => {
    setBlendomateCleaning("Y");
    setMetalDetectorCleaning("Y");
    setClCleaning("Y");
    setMPMFilling("Y");
    setAppliedUnit("Y");
    setERMMachine("Y");
    setCCPUnit("Y");
    setDustexUnit("Y");
    setHennatexCondencer("Y");
    setCakePressMachineCleaning("Y");
    setKierMachineCleaning("Y");
    setHydroMachineCleaning("Y");
    setOpenerMachineCleaning("Y");
    setDryerMaching("Y");
    setMetalDetectorCleaning2("Y");
    setRieterMacbineCleaning("Y");
    setAppliedUnit2("Y");
    setBalePressCleaning("Y");
    setMTFUnit("Y");
    
  };
  const handleBulkNo = () => {
    setBlendomateCleaning("N");
    setMetalDetectorCleaning("N");
    setClCleaning("N");
    setMPMFilling("N");
    setAppliedUnit("N");
    setERMMachine("N");
    setCCPUnit("N");
    setDustexUnit("N");
    setHennatexCondencer("N");
    setCakePressMachineCleaning("N");
    setKierMachineCleaning("N");
    setHydroMachineCleaning("N");
    setOpenerMachineCleaning("N");
    setDryerMaching("N");
    setMetalDetectorCleaning2("N");
    setRieterMacbineCleaning("N");
    setAppliedUnit2("N");
    setBalePressCleaning("N");
    setMTFUnit("N");
  };
  const monthName = monthNames[monthIndex];
  console.log("converted month",monthName);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const showDrawer = () => { setOpen(true);};
const onClose = () => {setOpen(false);}
const [open, setOpen] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");
  const username = cleaningRecordByDate?.supervisor_sign;
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
}, [cleaningRecordByDate,API.prodUrl, token]);

useEffect(() => {
  const token = localStorage.getItem("token");
  const username = cleaningRecordByDate?.hod_sign;
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
}, [cleaningRecordByDate,API.prodUrl, token]);

const formattedDate1 = `${day}/${month}/${year}`;

const [BlendomateCleaning, setBlendomateCleaning] = useState("");
const [MetalDetectorCleaning, setMetalDetectorCleaning] = useState("");
const [ClCleaning, setClCleaning] = useState("");
const [MPMFilling, setMPMFilling] = useState("");
const [AppliedUnit, setAppliedUnit] = useState("");
const [ERMMachine, setERMMachine] = useState("");
const [CCPUnit, setCCPUnit] = useState("");
const [DustexUnit, setDustexUnit] = useState("");

    // key 1 onchange functions
      const handleBlendomateCleaning = (e) => {
        setBlendomateCleaning(e.target.value);
      };
      const handleMetalDetectorCleaning = (e) => {
        setMetalDetectorCleaning(e.target.value);
      };
      const handleClCleaning = (e) => {
        setClCleaning(e.target.value);
      };
      const handleMPMFilling = (e) => {
        setMPMFilling(e.target.value);
      };
      const handleAppliedUnit = (e) => {
        setAppliedUnit(e.target.value);
      };
      const handleERMMachine = (e) => {
        setERMMachine(e.target.value);
      };
      const handleCCPUnit = (e) => {
        setCCPUnit(e.target.value);
      };
      const handleDustexUnit = (e) => {
        setDustexUnit(e.target.value);
      };

    const [HennatexCondencer, setHennatexCondencer] = useState("");
    const [CakePressMachineCleaning, setCakePressMachineCleaning] = useState("");
    const [KierMachineCleaning, setKierMachineCleaning] = useState("");
    const [HydroMachineCleaning, setHydroMachineCleaning] = useState("");
    const [OpenerMachineCleaning, setOpenerMachineCleaning] = useState("");
    const [DryerMaching, setDryerMaching] = useState("");
    const [MetalDetectorCleaning2, setMetalDetectorCleaning2] = useState("");
    const [RieterMacbineCleaning, setRieterMacbineCleaning] = useState("");
        // key 2 onchange functions
      const handleHennatexCondencer = (e) => {
        setHennatexCondencer(e.target.value);
      };
      const handleCakePressmachineCleaning = (e) => {
        setCakePressMachineCleaning(e.target.value);
      };
      const handleKierMachineCleaning = (e) => {
        setKierMachineCleaning(e.target.value);
      };
      const handleHydroMachineCleaning = (e) => {
        setHydroMachineCleaning(e.target.value);
      };
      const handleOpenerMachineCleaning = (e) => {
        setOpenerMachineCleaning(e.target.value);
      };
      const handleDryerMaching = (e) => {
        setDryerMaching(e.target.value);
      };
      const handleMetalDetectorCleaning2 = (e) => {
        setMetalDetectorCleaning2(e.target.value);
      };
      const handleRieterMacbineCleaning = (e) => {
        setRieterMacbineCleaning(e.target.value);
      };
      // key 3 variables
      const [AppliedUnit2, setAppliedUnit2] = useState("");
      const [BalePressCleaning, setBalePressCleaning] = useState("");
      const [MTFUnit, setMTFUnit] = useState("");
      
       // key 3 onchange functions
      const handleAppliedUnit2 = (e) => {
        setAppliedUnit2(e.target.value);
      };
      const handleBalePressCleaning = (e) => {
        setBalePressCleaning(e.target.value);
      };
      const handleMTFUnit = (e) => {
        setMTFUnit(e.target.value);
      };
      

//   const disabled=(roleauth === "ROLE_SUPERVISOR" && planingDetailsByDate?.supervisor_status === "SUPERVISOR_APPROVED") ||
//   (roleauth === "ROLE_HOD" && planingDetailsByDate?.hod_status === "HOD_APPROVED");
const disable=
  (roleauth === "ROLE_SUPERVISOR" &&
    cleaningRecordByDate?.supervisor_status ===
      "SUPERVISOR_APPROVED" &&
      cleaningRecordByDate?.hod_status === "WAITING_FOR_APPROVAL") ||
      cleaningRecordByDate?.hod_status === "HOD_APPROVED" ||
  (roleauth === "ROLE_HOD" &&
    (cleaningRecordByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
      cleaningRecordByDate?.hod_status === "HOD_APPROVED" ||
      cleaningRecordByDate?.hod_status === "HOD_REJECTED")) ||
  (roleauth === "ROLE_DESIGNEE" &&
    (cleaningRecordByDate?.hod_status === "WAITING_FOR_APPROVAL" ||
      cleaningRecordByDate?.hod_status === "HOD_APPROVED" ||
      cleaningRecordByDate?.hod_status === "HOD_REJECTED"))

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
    if (cleaningRecordByDate?.hod_submit_on) {
      const date = moment(cleaningRecordByDate?.hod_submit_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };
  const formattedDatesupervisor = () => {
    if ( cleaningRecordByDate?.supervisor_submit_on) {
      const date = moment( cleaningRecordByDate?.supervisor_submit_on);
      if (date.isValid()) {
        return date.format('DD/MM/YYYY HH:mm');
      }
    }
    return '';
  };

// Display Button Based on Role Status
const canDisplayButtons = () => {
  if (roleauth == "ROLE_SUPERVISOR") {
    if (
      cleaningRecordByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
      cleaningRecordByDate?.hod_status == "HOD_REJECTED"
    ) {
      return "block";
    } else if (
      (cleaningRecordByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
        cleaningRecordByDate?.hod_status == "WAITING_FOR_APPROVAL") ||
        cleaningRecordByDate?.hod_status == "HOD_APPROVED"
    ) {
      return "none";
    }
  } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
    if (
      cleaningRecordByDate?.hod_status == "HOD_APPROVED" ||
      cleaningRecordByDate?.hod_status == "HOD_REJECTED" ||
      emptyarraycheck == 0
    ) {
      return "none";
    }
    return "block";
  } else {
    if (
      cleaningRecordByDate?.hod_status == "HOD_APPROVED" ||
      cleaningRecordByDate?.hod_status == "HOD_REJECTED"
    ) {
      return "none";
    }
    return "block";
  }
};
const canDisplayButton2 = () => {
  if (roleauth == "ROLE_SUPERVISOR") {
    if (
      cleaningRecordByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
      cleaningRecordByDate?.hod_status == "HOD_REJECTED"
    ) {
      return "none"; 
    } else if (
      cleaningRecordByDate?.supervisor_status == "SUPERVISOR_APPROVED" &&
      (cleaningRecordByDate?.hod_status == "WAITING_FOR_APPROVAL" ||
        cleaningRecordByDate?.hod_status == "HOD_APPROVED")
    ) {
      return "none";
    }
  } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
    if (
      cleaningRecordByDate?.hod_status == "HOD_APPROVED" ||
      cleaningRecordByDate?.hod_status == "HOD_REJECTED" ||
      emptyarraycheck == 0
    ) {
      return "none"; 
    }
    return "block"; 
  } else {
    if (
      cleaningRecordByDate?.hod_status == "HOD_APPROVED" ||
      cleaningRecordByDate?.hod_status == "HOD_REJECTED"
    ) {
      return "none"; 
    }
    return "block"; 
  }
};

// Save & Submit Api
  const handleSave = async () => {
    try {
      await saveMachineCleaningRecord();
    } catch (error) {
      console.error("Error saving Machine Cleaning Checklist :", error);
    }

  };
  const handleSubmit = async () => {

    try {
      await sendContaminationCheck();
    } catch (error) {
      console.error("Error submitting Logbook - Spunlace Planning:", error);
    }

  };

  const saveMachineCleaningRecord = async () => {
    setSaveLoading(true);
      try {
      const payload = {
        formatName: "MACHINE CLEANING CHECKLIST (DAILY)",
        formatNo: "PH-PRD01/F-016",
        revisionNo: 1,
        refSopNo:  "PH-PRD01-D-03",
        unit: "H",
        recordId:recordId,
        date: date,
        month:monthName,
        year:year,
        blendomateCleaning:BlendomateCleaning,
        metalDetectorCleaning1:MetalDetectorCleaning,
        clPUnitCleaning:ClCleaning,
        mpmFillingBoxCleaning:MPMFilling,
        appliedUnitFilterBagCleaning1:AppliedUnit,
        ermMachineCleaning:ERMMachine,
        ccpUnitCleaning:CCPUnit,
        dustexUnitCleaning:DustexUnit,
        // ---------------------------------------
        hennatexUnitCleaning:HennatexCondencer,
        cakePressCleaning:CakePressMachineCleaning,
        kierMachineCleaning:KierMachineCleaning,
        hydroMachineCleaning:HydroMachineCleaning,
        openerMachineCleaning:OpenerMachineCleaning,
        dryerMachineCleaning:DryerMaching,
        metalDetectorCleaning2:MetalDetectorCleaning2,
        rieterMachineCleaning:RieterMacbineCleaning,
        // -------------------------------------
        appliedUnitFilterBagCleaning2:AppliedUnit2,
        balePressCleaning:BalePressCleaning,
        mtfUnitCleaning:MTFUnit,
        remarks:remarks
     };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/bleaching/Service/MachineCleaningRecord/SaveMachineCleaningRecord`,
        payload,
        { headers }
      );
    
      console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate('/Precot/Bleaching/F-16/Summary');
      }, 1500)
      message.success('Machine Cleaning Checklist Saved Successfully..');


    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save Machine Cleaning Checklist  !!");

    } finally {
      setSaveLoading(false);
    }
  };
  
  const sendContaminationCheck = async () => {
    setSubmitLoading(true)
    try {
      const payload = {
        formatName: "MACHINE CLEANING CHECKLIST (DAILY)",
        formatNo: "PH-PRD01/F-016",
        revisionNo: 1,
        refSopNo:  "PH-PRD01-D-03",
        unit: "H",
        recordId:recordId,
        date: date,
        month:monthName,
        year:year,
        blendomateCleaning:BlendomateCleaning,
        metalDetectorCleaning1:MetalDetectorCleaning,
        clPUnitCleaning:ClCleaning,
        mpmFillingBoxCleaning:MPMFilling,
        appliedUnitFilterBagCleaning1:AppliedUnit,
        ermMachineCleaning:ERMMachine,
        ccpUnitCleaning:CCPUnit,
        dustexUnitCleaning:DustexUnit,
        // ---------------------------------------
        hennatexUnitCleaning:HennatexCondencer,
        cakePressCleaning:CakePressMachineCleaning,
        kierMachineCleaning:KierMachineCleaning,
        hydroMachineCleaning:HydroMachineCleaning,
        openerMachineCleaning:OpenerMachineCleaning,
        dryerMachineCleaning:DryerMaching,
        metalDetectorCleaning2:MetalDetectorCleaning2,
        rieterMachineCleaning:RieterMacbineCleaning,
        // -------------------------------------
        appliedUnitFilterBagCleaning2:AppliedUnit2,
        balePressCleaning:BalePressCleaning,
        mtfUnitCleaning:MTFUnit,
        remarks:remarks

     };
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };


    const response = await axios.post(
      `${API.prodUrl}/Precot/api/bleaching/Service/MachineCleaningRecord/SubmitMachineCleaningRecord`,
      payload,
      { headers }
    );
  
    setTimeout(() => {
      navigate('/Precot/Bleaching/F-16/Summary');
    }, 1500)

    message.success(response.data.message);


  } catch (error) {
    console.error("Error:", error);
    message.error(error.response.data.message);

    throw new Error("Failed to submit Machine Cleaning Checklist !!");

  } finally {
    setSubmitLoading(false);
  }
};

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-16/Summary");
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

    const res = await axios.put(`${API.prodUrl}/Precot/api/bleaching/Service/MachineCleaningRecord/approveOrReject`,
      {
        id : recordId,
        status: "Approve"
    },
        { headers }
      )
      .then((res) => {
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-16/Summary");
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
        `${API.prodUrl}/Precot/api/bleaching/Service/MachineCleaningRecord/approveOrReject`,
        {
          id: recordId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-16/Summary");
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
      // const dateapi =moment(date).format('DD/MM/YYYY');
      console.log("stored Date inside Api", date);

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/Service/MachineCleaningRecord/getByDate?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response (details based on date)", response.data);
      setemptyarraycheck(response.data.length);
      setCleaningRecordByDate(response.data);
      if(((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.supervisor_status !=="SUPERVISOR_APPROVED"))||((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.hod_status =="HOD_REJECTED"))){
        message.error("Supervisor Yet Not Approved");
        setTimeout(() => {
         navigate('/Precot/Bleaching/F-16/Summary');
       }, 1500)
    }
      console.log("  ;;;  ;;; ;; ",cleaningRecordByDate.foFeedRoller)
      console.log("seted planing response",response.data.recordId);
       
     if (response.data &&response.data.message!=="No data" ) {
        const data = response.data;
        console.log("set response date for all fields", data)
        setRecordId(response.data.recordId);
        setBlendomateCleaning(response.data.blendomateCleaning || 'NA');
        setMetalDetectorCleaning(response.data.metalDetectorCleaning1 || 'NA');
        setClCleaning(response.data.clPUnitCleaning || 'NA');
        setMPMFilling(response.data.mpmFillingBoxCleaning || 'NA');
        setAppliedUnit(response.data.appliedUnitFilterBagCleaning1 || 'NA');
        setERMMachine(response.data.ermMachineCleaning || 'NA');
        setCCPUnit(response.data.ccpUnitCleaning || 'NA');
        setDustexUnit(response.data.dustexUnitCleaning || 'NA');
  
        setHennatexCondencer(response.data.hennatexUnitCleaning || 'NA');
        setCakePressMachineCleaning(response.data.cakePressCleaning || 'NA');
        setKierMachineCleaning(response.data.kierMachineCleaning || 'NA');
        setHydroMachineCleaning(response.data.hydroMachineCleaning || 'NA');
        setOpenerMachineCleaning(response.data.openerMachineCleaning || 'NA');
        setDryerMaching(response.data.dryerMachineCleaning || 'NA');
        setMetalDetectorCleaning2(response.data.metalDetectorCleaning2 || 'NA');
        setRieterMacbineCleaning(response.data.rieterMachineCleaning || 'NA');   
  
        setAppliedUnit2(response.data.appliedUnitFilterBagCleaning2 || 'NA');
        setBalePressCleaning(response.data.balePressCleaning || 'NA');
        setMTFUnit(response.data.mtfUnitCleaning || 'NA');
        setRemarks(response.data.remarks||'N/A')
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
      label: <p>Machine Cleaning Checklist</p>,
      children: (
        <div>
            {/* colums = 100 */}
          <table  style={{ width: "100%", margin: "auto" }}>
           <tr >
            <th colSpan="50" style={{textAlign:"center", height:"35px"}}>Cleaning Area</th>
            <th  colSpan="50" style={{textAlign:"center", height:"35px"}}>Date:<br/>{formattedDate(date)}</th>
                 </tr>
                 <tr >
            <td colSpan="50" style={{textAlign:"center", height:"35px"}}>Blendomate cleaning</td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleBlendomateCleaning}
              value={BlendomateCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Metal Detector cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleMetalDetectorCleaning}
              value={MetalDetectorCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
             <tr >
            <td colSpan="50"style={{textAlign:"center", height:"35px"}}>CL-P Unit  1 & 2  cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleClCleaning}
               value={ClCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>MPM filling box, delivery line and bottom of floor 1 & 2 cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleMPMFilling}
              value={MPMFilling}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Applied unit camera, Filtter bag 1 & 2 cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleAppliedUnit}
               value={AppliedUnit}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                            <tr >
            <td colSpan="50" style={{textAlign:"center", height:"35px"}}>ERM Machine filling box, feed roller and driven side body cleaning </td>
             <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleERMMachine}
               value={ERMMachine}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>CCP - unit camera, Filter bag 1 & 2 cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleCCPUnit}
               value={CCPUnit}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Dustex Unit - 1 & 2 cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleDustexUnit}
               value={DustexUnit}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>


               
          </table>
     
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Machine Details/2</p>,
      children: (
        <div>
            {/* colums = 100 */}
          <table  style={{ width: "100%", margin: "auto" }}>
           <tr >
            <th colSpan="50" style={{textAlign:"center", height:"35px"}}>Cleaning Area </th>
            <th  colSpan="50" style={{textAlign:"center", height:"35px"}}>Date:<br/>{formattedDate(date)}</th>
                 </tr>
                 <tr >
            <td colSpan="50" style={{textAlign:"center", height:"35px"}}>Hennatex condencer unit cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleHennatexCondencer}
               value={HennatexCondencer}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Cake press Machine cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleCakePressmachineCleaning}
              value={CakePressMachineCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
             <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Kier machine cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleKierMachineCleaning}
              value={KierMachineCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Hydro machine cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleHydroMachineCleaning}
              value={HydroMachineCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Opener Machine cleaning</td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleOpenerMachineCleaning}
              value={OpenerMachineCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Dryer Maching & 6 chamber filter cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleDryerMaching}
              value={DryerMaching}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td colSpan="50" style={{textAlign:"center", height:"35px"}}>Metal Detector cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleMetalDetectorCleaning2}
              value={MetalDetectorCleaning2}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Rieter Machine Cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleRieterMacbineCleaning}
              value={RieterMacbineCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                                
          </table>
     
        </div>
      ),
    }, 
    {
      key: "3",
      label: <p>Machine Details/3</p>,
      children: (
        <div>
            {/* colums = 100 */}
          <table  style={{ width: "100%", margin: "auto" }}>
           <tr >
            <th colSpan="50" style={{textAlign:"center", height:"35px"}}>Cleaning Area</th>
            <th  colSpan="50" style={{textAlign:"center", height:"35px"}}>Date:<br/>{formattedDate(date)}</th>
                 </tr>
                 <tr >
            <td colSpan="50" style={{textAlign:"center", height:"35px"}}>Applied unit camera, Filtter bag 1 & 2 cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleAppliedUnit2}
              value={AppliedUnit2}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Bale Press Cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleBalePressCleaning}
              value={BalePressCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td colSpan="50" style={{textAlign:"center", height:"35px"}}>MTF Unit cleaning </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleMTFUnit}
              value={MTFUnit}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr>
                 <td  colSpan="100" style={{padding:"10px", borderBottom:"none"}} >Remark / Comment (in case of any abnormality observed) : </td>
                 </tr>
                 <tr>
                  <td colSpan="100" style={{height:"55px",borderTop:"none"}}><TextArea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={4} 
              style={{ width: "100%" }} 
            /></td>
                 </tr>
                      
          </table>
     
        </div>
      ),
    }, {
      key: "4",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr >
              {/* <td colSpan="34" style={{ height: "35px", textAlign: "center" }}>Performed by Operator</td> */}
              <td colSpan="50" style={{ textAlign: "center" ,height:"30px"}}>Production Supervisor Sign & Date</td>
              <td colSpan="50" style={{ textAlign: "center" }}>HOD / Designee Sign & Date</td>

            </tr>
            <tr >
              {/* <td colSpan="50" style={{ textAlign: "center",height:"100px" }}>{cleaningRecordByDate?.supervisor_sign}<br/>{formattedDatesupervisor()}
              </td> */}
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {cleaningRecordByDate?.supervisor_status === "SUPERVISOR_APPROVED" && (
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
                        <div>{cleaningRecordByDate?.supervisor_sign}</div>
                        <div>{formattedDatesupervisor()}</div>
                      </div>
                      {getImage1 && (
                      <img
                        src={getImage1}
                        alt="Supervisor Sign"
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
              {/* <td colSpan="50" style={{ textAlign: "center"}}>{cleaningRecordByDate?.hod_sign}<br/>{formattedDateHod()}
              </td> */}
              
              <td
                colSpan="50"
                style={{ textAlign: "center", 
                // verticalAlign: "bottom" 
                }}
              >
                {(cleaningRecordByDate?.hod_status === "HOD_REJECTED" || 
                cleaningRecordByDate?.hod_status === "HOD_APPROVED") && (
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
                          <div>{cleaningRecordByDate?.hod_sign}</div>
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
        formName="MACHINE CLEANING CHECKLIST (DAILY)"
        formatNo="PH-PRD01/F-016"
        sopNo="PH-PRD01-D-03 "
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
      
      
      </div>

      <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', gap: '10px', marginTop: '20px' ,marginRight:"10px"}}>
      <button style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              border: "none",
              padding:"5px"
            }} shape="round" onClick={() => handleBulkYes()}>Bulk Yes</button>
      <button  style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              border: "none",
              padding:"5px"
            }} shape="circle" onClick={() => handleBulkNo()}>Bulk No</button>
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

export default Bleaching_f16

