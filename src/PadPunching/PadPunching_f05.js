
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, Input, Row, Select, Tabs, Modal, Spin, message, Tooltip, Menu, Avatar, Drawer ,Radio} from "antd";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BleachingHeader from '../Components/BleachingHeader.js';
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

const PadPunching_f05 = () => {
  const navigate = useNavigate();
  const role=localStorage.getItem("role")
  const location = useLocation();
  const { state } = location;
  const { date,machineName} = state || {};
  const token = localStorage.getItem("token");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const roleauth = localStorage.getItem("role");
  const [cleaningRecordByDate, setCleaningRecordByDate] = useState("");
  const [listId, setListId] = useState('');
  const dateObject = new Date(date);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = dateObject.getFullYear();
  const monthIndex = dateObject.getMonth();
  const [cleanedBy, setcleanedBy] = useState("");
  console.log("formated year",year);
  console.log("formated month",month);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const handleBulkYes = () => {
    setPunchingUnitParts("Y");
    setPadPusher("Y");
    setPadEjector("Y");
    setPadTransportWagon("Y");
    setCleaningGrease("Y");
    setCriticalSensors("Y");
    setRollUnwinding("Y");
    setSealingBag("Y");
    setTrimCollection("Y");
    setChillerUnit("Y");
    setCleaningCarrier("Y");
    setBagMagzine("Y");   
  };
  const handleBulkNo = () => {
    setPunchingUnitParts("N");
    setPadPusher("N");
    setPadEjector("N");
    setPadTransportWagon("N");
    setCleaningGrease("N");
    setCriticalSensors("N");
    setRollUnwinding("N");
    setSealingBag("N");
    setTrimCollection("N");
    setChillerUnit("N");
    setCleaningCarrier("N");
    setBagMagzine("N");
   
  };
  
  const handleCleanedBy = (event) => {
    const value = event.target.value;
    setcleanedBy(value);
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
}, [cleaningRecordByDate, API.prodUrl, token]);

useEffect(() => {
  const token = localStorage.getItem("token");
  const username = cleaningRecordByDate?.hod_sign;
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
        setGetImage2(url);
      })
      .catch((err) => {
        console.log("Error in fetching image:", err);
      });
  }
}, [cleaningRecordByDate, API.prodUrl, token]);

const formattedDate1 = `${day}/${month}/${year}`;

const [PunchingUnitParts, setPunchingUnitParts] = useState("");
const [PadPusher, setPadPusher] = useState("");
const [PadEjector, setPadEjector] = useState("");
const [PadTransportWagon, setPadTransportWagon] = useState("");
const [CleaningGrease, setCleaningGrease] = useState("");
const [CriticalSensors, setCriticalSensors] = useState("");
const [RollUnwinding, setRollUnwinding] = useState("");
const [SealingBag, setSealingBag] = useState("");

    // key 1 onchange functions
      const handlePunchingUnitParts = (e) => {
        setPunchingUnitParts(e.target.value);
      };
      const handlePadPuncher = (e) => {
        setPadPusher(e.target.value);
      };
      const handlePadEjector = (e) => {
        setPadEjector(e.target.value);
      };
      const handlePadTransportWagon = (e) => {
        setPadTransportWagon(e.target.value);
      };
      const handleCleaningGrease = (e) => {
        setCleaningGrease(e.target.value);
      };
      const handleCriticalSensors = (e) => {
        setCriticalSensors(e.target.value);
      };
      const handleRollUnwinding = (e) => {
        setRollUnwinding(e.target.value);
      };
      const handleSeaingBag = (e) => {
        setSealingBag(e.target.value);
      };

    const [TrimCollection, setTrimCollection] = useState("");
    const [ChillerUnit, setChillerUnit] = useState("");
    const [CleaningCarrier, setCleaningCarrier] = useState("");
    const [BagMagzine, setBagMagzine] = useState("");
  
        // key 2 onchange functions
      const handleTrimCollection = (e) => {
        setTrimCollection(e.target.value);
      };
      const handleChillerUnit = (e) => {
        setChillerUnit(e.target.value);
      };
      const handleCleaningCarrier = (e) => {
        setCleaningCarrier(e.target.value);
      };
      const handleBagMagzine = (e) => {
        setBagMagzine(e.target.value);
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
      console.error("Error saving Machine Cleaning Record :", error);
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
        formatName: "Machine Cleaning Check List",
        formatNo: "PH-PRD03/F-005",
        revisionNo: 2,
        refSopNo:  "PH-PRD04-D-04",
        unit: "Unit H",
        listId:listId,
        date:date,
        month:monthName,
        year:year,
        machineName:machineName,
        frequency:"Once in a Shift",

        punchingUnitParts:PunchingUnitParts,
        padPusher: PadPusher,
        padEjector:PadEjector,
        padTransportWagon:PadTransportWagon,
        cleaningOfGrease:CleaningGrease,
        criticalSensors:CriticalSensors,
        rollUnwindingConveyor:RollUnwinding,
        sealingBagOutFeedConveyor:SealingBag,
        trimCollectionTank:TrimCollection,
        chillerUnitFilter:ChillerUnit,
        cleaningCarrier:CleaningCarrier,
        bagMagazine:BagMagzine,
        cleanedBy:cleanedBy,
        remarks:remarks,
             
     };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/MachineCleaning/SaveMachineCleaning`,
        payload,
        { headers }
      );
    
      console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate('/Precot/PadPunching/F-05/Summary');
      }, 1500)
      message.success('Machine Cleaning Record Saved Successfully..');


    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save Machine Cleaning Record  !!");

    } finally {
      setSaveLoading(false);
    }
  };
  
  const sendContaminationCheck = async () => {
    setSubmitLoading(true)
    if(cleanedBy =="null" || cleanedBy==""){
      message.warning("Cleaned By Name Required");
      setSubmitLoading(false);
      return;
    }
    try {
      const payload = {
        formatName: "Machine Cleaning Check List",
        formatNo: "PH-PRD03/F-005",
        revisionNo: 2,
        refSopNo:  "PH-PRD04-D-04",
        unit: "Unit H",
        listId:listId,
        date:date,
        month:monthName,
        year:year,
        machineName:machineName,
        frequency:"Once in a Shift",

        punchingUnitParts:PunchingUnitParts,
        padPusher: PadPusher,
        padEjector:PadEjector,
        padTransportWagon:PadTransportWagon,
        cleaningOfGrease:CleaningGrease,
        criticalSensors:CriticalSensors,
        rollUnwindingConveyor:RollUnwinding,
        sealingBagOutFeedConveyor:SealingBag,
        trimCollectionTank:TrimCollection,
        chillerUnitFilter:ChillerUnit,
        cleaningCarrier:CleaningCarrier,
        bagMagazine:BagMagzine,
        cleanedBy:cleanedBy,
        remarks:remarks,
             
     };
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };


    const response = await axios.post(
      `${ API.prodUrl}/Precot/api/PadPunching/Service/MachineCleaning/SubmitMachineCleaning`,
      payload,
      { headers }
    );
  
    setTimeout(() => {
      navigate('/Precot/PadPunching/F-05/Summary');
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
    navigate("/Precot/PadPunching/F-05/Summary");
  };

  useEffect(() => {

    fetchDetailsByDateShiftMachine();
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

    const res = await axios.put(`${ API.prodUrl}/Precot/api/PadPunching/Service/MachineCleaning/approveOrReject`,
      {
        id : listId,
        status: "Approve"
    },
        { headers }
      )
      .then((res) => {
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/PadPunching/F-05/Summary");
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
        `${ API.prodUrl}/Precot/api/PadPunching/Service/MachineCleaning/approveOrReject`,
        {
          id: listId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/PadPunching/F-05/Summary");
      })
      .catch((err) => {
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
 
 const fetchDetailsByDateShiftMachine = async () => {
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/PadPunching/Service/MachineCleaning/getByDateShiftMachine?date=${date}&machineName=${machineName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setCleaningRecordByDate(response.data);
      if(((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.supervisor_status !=="SUPERVISOR_APPROVED"))||((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.hod_status =="HOD_REJECTED"))){
        message.error("Supervisor Yet Not Approved");
        setTimeout(() => {
         navigate('/Precot/PadPunching/F-05/Summary');
       }, 1500)
    }
      console.log("  ;;;  ;;; ;; ",cleaningRecordByDate.foFeedRoller)
      console.log("seted planing response",response.data.recordId);
       
     if (response.data &&response.data.message!=="No data" ) {
        const data = response.data;
        console.log("set response date for all fields", data)
        setListId(response.data.listId);
        setPunchingUnitParts(response.data.punchingUnitParts || 'NA');
        setPadPusher(response.data.padPusher || 'NA');
        setPadEjector(response.data.padEjector || 'NA');
        setPadTransportWagon(response.data.padTransportWagon || 'NA');
        setCleaningGrease(response.data.cleaningOfGrease || 'NA');
        setCriticalSensors(response.data.criticalSensors || 'NA');
        setRollUnwinding(response.data.rollUnwindingConveyor || 'NA');
        setSealingBag(response.data.sealingBagOutFeedConveyor || 'NA');
  
        setTrimCollection(response.data.trimCollectionTank || 'NA');
        setChillerUnit(response.data.chillerUnitFilter || 'NA');
        setCleaningCarrier(response.data.cleaningCarrier || 'NA');
        setBagMagzine(response.data.bagMagazine || 'NA');
        setcleanedBy(response.data.cleanedBy);
        setRemarks(response.data.remarks||'NA');
  
     
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
      label: <p>Machine Cleaning Record/1</p>,
      children: (
        <div>
            {/* colums = 100 */}
          <table  style={{ width: "100%", margin: "auto" }}>
           <tr >
            <th colSpan="50" style={{textAlign:"center", height:"35px"}}>Cleaning Area</th>
            <th  colSpan="50" style={{textAlign:"center", height:"35px"}}>Date:<br/>{formattedDate(date)}</th>
                 </tr>
                 <tr >
            <td colSpan="50" style={{textAlign:"center", height:"35px"}}>Punching Unit Parts</td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handlePunchingUnitParts}
              value={PunchingUnitParts}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Pad pusher</td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handlePadPuncher}
              value={PadPusher}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
             <tr >
            <td colSpan="50"style={{textAlign:"center", height:"35px"}}>Pad Ejector </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handlePadEjector}
               value={PadEjector}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Pad Transport Wagon</td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handlePadTransportWagon}
              value={PadTransportWagon}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Cleaning of Grease (main axle)</td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleCleaningGrease}
               value={CleaningGrease}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                            <tr >
            <td colSpan="50" style={{textAlign:"center", height:"35px"}}>Critical Sensors </td>
             <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleCriticalSensors}
               value={CriticalSensors}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Roll Unwinding Conveyor</td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleRollUnwinding}
               value={RollUnwinding}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Sealing Bag out feed Conveyor </td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleSeaingBag}
               value={SealingBag}
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
      label: <p>Machine Cleaning Record/2</p>,
      children: (
        <div>
            {/* colums = 100 */}
          <table  style={{ width: "100%", margin: "auto" }}>
           <tr >
            <th colSpan="50" style={{textAlign:"center", height:"35px"}}>Cleaning Area </th>
            <th  colSpan="50" style={{textAlign:"center", height:"35px"}}>Date:<br/>{formattedDate(date)}</th>
                 </tr>
                 <tr >
            <td colSpan="50" style={{textAlign:"center", height:"35px"}}>Trim Collection Tank</td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleTrimCollection}
               value={TrimCollection}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Chiller Unit Filter</td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleChillerUnit}
              value={ChillerUnit}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
             <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Cleaning Carrier</td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleCleaningCarrier}
              value={CleaningCarrier}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>Bag Magzine</td>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleBagMagzine}
              value={BagMagzine}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr>
                 <td  colSpan="100" style={{padding:"10px", borderBottom:"none"}} >Remark / Comment (in case of any abnormality observed) :</td>
                 </tr>
                 <tr>
                  <td colSpan="100" style={{height:"55px",borderTop:"none"}}><TextArea
              value={remarks}
              disabled={disable}
              onChange={(e) => setRemarks(e.target.value)}
              rows={4} 
              style={{ width: "100%" }} 
            /></td>
                 </tr>
                                
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
              <td colSpan="50" style={{ textAlign: "center" ,height:"30px"}}>Cleaned by (Trained person) :</td>
              <td colSpan="50" style={{ textAlign: "center" ,height:"30px"}}>Verified by (Supervisor): </td>
              <td colSpan="50" style={{ textAlign: "center" }}>Reviewed by HOD / Designee :</td>

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
                 
                      <Input
            placeholder="Cleaned By"
            value={cleanedBy}
            onChange={handleCleanedBy}
            style={{ width: '100%', height: '100%',border:"none", textAlign:"center" }}
            disabled={disable}
        />
                     
              </td>
              
          
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
        formName="Machine Cleaning Check List"
        formatNo="PH-PRD03/F-005"
        sopNo="PH-PRD04-D-04"
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
            addonBefore="Machine Name:"
            placeholder="Machine Name"
            value={machineName}
            disabled
            style={{ width: '25%', height: '35px' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', gap: '10px', marginTop: '20px' ,marginRight:"10px"}}>
      <button 
  style={{
    backgroundColor: "#E5EEF9",
    color: "#00308F",
    fontWeight: "bold",
    border: "none",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer"
  }} 
  shape="round" 
  onClick={() => handleBulkYes()}
  disabled={disable}
>
  <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: "5px" }} />
  Bulk Yes
</button>
      <button 
  style={{ 
    backgroundColor: "#E5EEF9",
    color: "#00308F",
    fontWeight: "bold",
    border: "none",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer", 
  }} 
  shape="circle" 
  onClick={() => handleBulkNo()}
  disabled={disable}
>
  <FontAwesomeIcon icon={faTimesCircle} style={{ marginRight: "5px" }} />
  Bulk No
</button>
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

export default PadPunching_f05

