
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

const Spunlace_f23 = () => {
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
  const [WBOFeedTable, setWBOFeedTable] = useState("");
  const [WBOMiddleTable, setWBOMiddleTable] = useState("");
  const [FoPoFeedRoller, setFoPoFeedRoller] = useState("");
  const [FoPoBeater, setFoPoBeater] = useState("");
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [FoPoPerforatedPlates, setFoPoPerforatedPlates] = useState("");
  const [RieterChuteCleaning, setRieterChuteCleaning] = useState("");
  const [RieterFlastsCleaning, setRieterFlastsCleaning] = useState("");
  const [RieterDofferCleaning, setRieterDofferCleaning] = useState("");
  const dateObject = new Date(date);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = dateObject.getFullYear();
  const monthIndex = dateObject.getMonth();
  const [bulkState, setBulkState] = useState('');
  
  // console.log("formated year",year);
  // console.log("formated month",month);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = monthNames[monthIndex];
  // console.log("converted month",monthName);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const showDrawer = () => {
    setOpen(true);
};
const onClose = () => {
    setOpen(false);
}
const [open, setOpen] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");
  const username = cleaningRecordByDate?.supervisor_sign;
  if (username) {
    // console.log("usernameparams", username);

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
}, [cleaningRecordByDate, API.prodUrl, token]);

useEffect(() => {
  const token = localStorage.getItem("token");
  const username = cleaningRecordByDate?.hod_sign;
  if (username) {
    // console.log("usernameparams", username);

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
        // console.log("Response:", res.data);
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
        // console.log("Error in fetching image:", err);
      });
  }
}, [cleaningRecordByDate, API.prodUrl, token]);

const formattedDate1 = `${day}/${month}/${year}`;

    // key 1 onchange functions
      const handleWBOFeedTable = (e) => {
        setWBOFeedTable(e.target.value);
      };
      const handleWBOMiddleTable = (e) => {
        setWBOMiddleTable(e.target.value);
      };
      const handleFoPoFeedRoller = (e) => {
        setFoPoFeedRoller(e.target.value);
      };
      const handleFoPoBeater = (e) => {
        setFoPoBeater(e.target.value);
      };
      const handleFoPoPerforatedPlates = (e) => {
        setFoPoPerforatedPlates(e.target.value);
      };
      const handleRieterChuteCleaning = (e) => {
        setRieterChuteCleaning(e.target.value);
      };
      const handleRieterFlastsCleaning = (e) => {
        setRieterFlastsCleaning(e.target.value);
      };
      const handleRieterDofferCleaning = (e) => {
        setRieterDofferCleaning(e.target.value);
      };
    const [ALCChuteCleaning, setALCChuteCleaning] = useState("");
    const [ALCSideMicrodustCleaning, setALCSideMicrodustCleaning] = useState("");
    const [ALCMeshbeltCleaning, setALCMeshbeltCleaning] = useState("");
    const [ALCExhaustMeshCleaning, setALCExhaustMeshCleaning] = useState("");
    const [ALCCollectingBeltCleaning, setALCCollectingBeltCleaning] = useState("");
    const [ALCPlatform, setALCPlatform] = useState("");
    const [JetlaceJBelts, setJetlaceJBelts] = useState("");
    const [JetlaceCDrums, setJetlaceCDrums] = useState("");
        // key 2 onchange functions
      const handleALCChuteCleaning = (e) => {
        setALCChuteCleaning(e.target.value);
      };
      const handleALCSideMicrodustCleaning = (e) => {
        setALCSideMicrodustCleaning(e.target.value);
      };
      const handleALCMeshbeltCleaning = (e) => {
        setALCMeshbeltCleaning(e.target.value);
      };
      const handleALCExhaustMeshCleaning = (e) => {
        setALCExhaustMeshCleaning(e.target.value);
      };
      const handleALCCollectingBeltCleaning = (e) => {
        setALCCollectingBeltCleaning(e.target.value);
      };
      const handleALCPlatform = (e) => {
        setALCPlatform(e.target.value);
      };
      const handleJetlaceJBelts = (e) => {
        setJetlaceJBelts(e.target.value);
      };
      const handleJetlaceCDrums = (e) => {
        setJetlaceCDrums(e.target.value);
      };
      // key 3 variables
      const [DryerFeedRollers, setDryerFeedRollers] = useState("");
      const [DryerDrums, setDryerDrums] = useState("");
      const [WinderSRollers, setWinderSRollers] = useState("");
      const [WinderDrum, setWinderDrum] = useState("");
      const [RpBalePressFeedRoller, setRpBalePressFeedRoller] = useState("");
      const [RpBaleBeater, setRpBaleBeater] = useState("");
      const [RpBalePerforatedPlates, setRpBalePerforatedPlates] = useState("");

       // key 3 onchange functions
      const handleDryerFeedRollers = (e) => {
        setDryerFeedRollers(e.target.value);
      };
      const handleDryerDrums = (e) => {
        setDryerDrums(e.target.value);
      };
      const handleWinderSRollers = (e) => {
        setWinderSRollers(e.target.value);
      };
      const handleWinderDrum = (e) => {
        setWinderDrum(e.target.value);
      };
      const handleRpBalePressFeedRoller = (e) => {
        setRpBalePressFeedRoller(e.target.value);
      };
      const handleRpBaleBeater = (e) => {
        setRpBaleBeater(e.target.value);
      };
      const handleRpBalePerforatedPlates = (e) => {
        setRpBalePerforatedPlates(e.target.value);
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

const handleBulkOption = (e) => {
  setWBOFeedTable(e.target.value);
  setWBOMiddleTable(e.target.value);
  setFoPoFeedRoller(e.target.value);
  setFoPoBeater(e.target.value);
  setFoPoPerforatedPlates(e.target.value);
  setRieterChuteCleaning(e.target.value);
  setRieterFlastsCleaning(e.target.value);
  setRieterDofferCleaning(e.target.value);

  setALCChuteCleaning(e.target.value);
  setALCSideMicrodustCleaning(e.target.value);
  setALCMeshbeltCleaning(e.target.value);
  setALCExhaustMeshCleaning(e.target.value);
  setALCCollectingBeltCleaning(e.target.value);
  setALCPlatform(e.target.value);
  setJetlaceJBelts(e.target.value);
  setJetlaceCDrums(e.target.value);

  setRpBalePerforatedPlates(e.target.value);
  setRpBaleBeater(e.target.value);
  setRpBalePressFeedRoller(e.target.value);
  setWinderDrum(e.target.value);
  setWinderSRollers(e.target.value);
  setDryerDrums(e.target.value);
  setDryerFeedRollers(e.target.value);
}

useEffect(() => {
  if(WBOFeedTable == "Y" && WBOMiddleTable == "Y" && FoPoFeedRoller == "Y" && FoPoBeater == "Y" && FoPoPerforatedPlates == "Y" && RieterChuteCleaning == "Y" && RieterFlastsCleaning == "Y" && RieterDofferCleaning == "Y" &&
    JetlaceCDrums == "Y" && JetlaceJBelts == "Y" && ALCPlatform == "Y" && ALCCollectingBeltCleaning == "Y" && ALCExhaustMeshCleaning == "Y" && ALCMeshbeltCleaning == "Y" && ALCSideMicrodustCleaning == "Y" && ALCChuteCleaning == "Y" &&
    RpBalePerforatedPlates == "Y" && RpBaleBeater == "Y" && RpBalePressFeedRoller == "Y" && WinderDrum == "Y" && WinderSRollers == "Y" && DryerDrums == "Y" && DryerFeedRollers == "Y"

  ){
    setBulkState("Y")
  }
  else if(WBOFeedTable == "N" && WBOMiddleTable == "N" && FoPoFeedRoller == "N" && FoPoBeater == "N" && FoPoPerforatedPlates == "N" && RieterChuteCleaning == "N" && RieterFlastsCleaning == "N" && RieterDofferCleaning == "N" &&
    JetlaceCDrums == "N" && JetlaceJBelts == "N" && ALCPlatform == "N" && ALCCollectingBeltCleaning == "N" && ALCExhaustMeshCleaning == "N" && ALCMeshbeltCleaning == "N" && ALCSideMicrodustCleaning == "N" && ALCChuteCleaning == "N" &&
    RpBalePerforatedPlates == "N" && RpBaleBeater == "N" && RpBalePressFeedRoller == "N" && WinderDrum == "N" && WinderSRollers == "N" && DryerDrums == "N" && DryerFeedRollers == "N"

  ){
    setBulkState("N")
  }
  else if(WBOFeedTable == "NA" && WBOMiddleTable == "NA" && FoPoFeedRoller == "NA" && FoPoBeater == "NA" && FoPoPerforatedPlates == "NA" && RieterChuteCleaning == "NA" && RieterFlastsCleaning == "NA" && RieterDofferCleaning == "NA" &&
    JetlaceCDrums == "NA" && JetlaceJBelts == "NA" && ALCPlatform == "NA" && ALCCollectingBeltCleaning == "NA" && ALCExhaustMeshCleaning == "NA" && ALCMeshbeltCleaning == "NA" && ALCSideMicrodustCleaning == "NA" && ALCChuteCleaning == "NA" &&
    RpBalePerforatedPlates == "NA" && RpBaleBeater == "NA" && RpBalePressFeedRoller == "NA" && WinderDrum == "NA" && WinderSRollers == "NA" && DryerDrums == "NA" && DryerFeedRollers == "NA"
  ){
    setBulkState("NA")
  }
  else {
    setBulkState('')
  }
},[WBOFeedTable , WBOMiddleTable , FoPoFeedRoller , FoPoBeater , FoPoPerforatedPlates , RieterChuteCleaning , RieterFlastsCleaning , RieterDofferCleaning ,
  JetlaceCDrums , JetlaceJBelts , ALCPlatform , ALCCollectingBeltCleaning , ALCExhaustMeshCleaning , ALCMeshbeltCleaning , ALCSideMicrodustCleaning , ALCChuteCleaning ,
  RpBalePerforatedPlates , RpBaleBeater , RpBalePressFeedRoller , WinderDrum , WinderSRollers , DryerDrums , DryerFeedRollers , bulkState])
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
// console.log("record id",WBOFeedTable)

  const saveMachineCleaningRecord = async () => {
    setSaveLoading(true);
      try {
      const payload = {
        formatName: "MACHINE CLEANING RECORD (Weekly)",
        formatNo: "PH-PRD02/F-023",
        revisionNo: 1,
        refSopNo: "PH-PRD02-D-04",
        unit: "H",
        recordId:recordId,
        date: date,
        month:monthName,
        year:year,
        boFeedTable:WBOFeedTable,
        boMidTable:WBOMiddleTable,
        foFeedRoller:FoPoFeedRoller,
        foBeater:FoPoBeater,
        foPerforatedPlate:FoPoPerforatedPlates,
        rieterFlatsClean:RieterFlastsCleaning,
        rieterChuteClean:RieterChuteCleaning,
        rieterDofferClean:RieterDofferCleaning,
        // ---------------------------------------
        alcChuteClean:ALCChuteCleaning,
        alcMicrodustClean:ALCSideMicrodustCleaning,
        alcMeshBeltClean:ALCMeshbeltCleaning,
        alcExhaustHMeshClean:ALCExhaustMeshCleaning,
        alcCollectngBeltClean:ALCCollectingBeltCleaning,
        alcPlatform:ALCPlatform,
        jetlaceBelts:JetlaceJBelts,
        jetlaceDrums:JetlaceCDrums,
        // -------------------------------------
        dryerFeedRollers:DryerFeedRollers,
        dryerDrums:DryerDrums,
        winderSRollers:WinderSRollers,
        winderDrum:WinderDrum,
        rpFeedRoller:RpBalePressFeedRoller,
        rpBeater:RpBaleBeater,
        rpPerforatedPlates:RpBalePerforatedPlates

     };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/spunlace/Service/MachineCleaningRecord/SaveMachineCleaningRecord`,
        payload,
        { headers }
      );
    
      // console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate('/Precot/Spunlace/F-23/Summary');
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
    try {
      const payload = {
        formatName: "MACHINE CLEANING RECORD (Weekly)",
        formatNo: "PH-PRD02/F-023",
        revisionNo: 1,
        refSopNo: "PH-PRD02-D-04",
        unit: "H",
        recordId:recordId,
        date: date,
        month:monthName,
        year:year,
        boFeedTable:WBOFeedTable,
        boMidTable:WBOMiddleTable,
        foFeedRoller:FoPoFeedRoller,
        foBeater:FoPoBeater,
        foPerforatedPlate:FoPoPerforatedPlates,
        rieterFlatsClean:RieterFlastsCleaning,
        rieterChuteClean:RieterChuteCleaning,
        rieterDofferClean:RieterDofferCleaning,
        // ---------------------------------------
        alcChuteClean:ALCChuteCleaning,
        alcMicrodustClean:ALCSideMicrodustCleaning,
        alcMeshBeltClean:ALCMeshbeltCleaning,
        alcExhaustHMeshClean:ALCExhaustMeshCleaning,
        alcCollectngBeltClean:ALCCollectingBeltCleaning,
        alcPlatform:ALCPlatform,
        jetlaceBelts:JetlaceJBelts,
        jetlaceDrums:JetlaceCDrums,
        // -------------------------------------
        dryerFeedRollers:DryerFeedRollers,
        dryerDrums:DryerDrums,
        winderSRollers:WinderSRollers,
        winderDrum:WinderDrum,
        rpFeedRoller:RpBalePressFeedRoller,
        rpBeater:RpBaleBeater,
        rpPerforatedPlates:RpBalePerforatedPlates

     };
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };


    const response = await axios.post(
      `${ API.prodUrl}/Precot/api/spunlace/Service/MachineCleaningRecord/SubmitMachineCleaningRecord`,
      payload,
      { headers }
    );
  
    setTimeout(() => {
      navigate('/Precot/Spunlace/F-23/Summary');
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
    navigate("/Precot/Spunlace/F-23/Summary");
  };

  useEffect(() => {

    fetchDetailsByDate();
  }, []);
  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", 
    };

    const res = await axios.put(`${ API.prodUrl}/Precot/api/spunlace/Service/MachineCleaningRecord/approveOrReject`,
      {
        id : recordId,
        status: "Approve"
    },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-23/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
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
      setSaveLoading(false);
      return;
    }
    

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/spunlace/Service/MachineCleaningRecord/approveOrReject`,
        {
          id: recordId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res.data.message);
        message.success(res.data.message);
        navigate("/Precot/Spunlace/F-23/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
 
 const fetchDetailsByDate = async () => {
    try {
      // const dateapi =moment(date).format('DD/MM/YYYY');
      // console.log("stored Date inside Api", date);

      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/spunlace/Service/MachineCleaningRecord/getByDate?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response (details based on date)", response.data);
      setemptyarraycheck(response.data.length);
      setCleaningRecordByDate(response.data);
      if(((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.supervisor_status !=="SUPERVISOR_APPROVED"))||((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(response.data.hod_status =="HOD_REJECTED"))){
        message.error("Supervisor Yet Not Approved");
        setTimeout(() => {
         navigate('/Precot/Spunlace/F-23/Summary');
       }, 1500)
    }
      // console.log("  ;;;  ;;; ;; ",cleaningRecordByDate.foFeedRoller)
      // console.log("seted planing response",response.data.recordId);
       
     if (response.data &&response.data.message!=="No data" ) {
        const data = response.data;
        // console.log("set response date for all fields", data)
        setRecordId(response.data.recordId);
        setWBOFeedTable(response.data.boFeedTable || 'NA');
        setWBOMiddleTable(response.data.boMidTable || 'NA');
        setFoPoFeedRoller(response.data.foFeedRoller || 'NA');
        setFoPoBeater(response.data.foBeater || 'NA');
        setFoPoPerforatedPlates(response.data.foPerforatedPlate || 'NA');
        setRieterFlastsCleaning(response.data.rieterFlatsClean || 'NA');
        setRieterChuteCleaning(response.data.rieterChuteClean || 'NA');
        setRieterDofferCleaning(response.data.rieterDofferClean || 'NA');
  
        setALCSideMicrodustCleaning(response.data.alcMicrodustClean || 'NA');
        setALCMeshbeltCleaning(response.data.alcMeshBeltClean || 'NA');
        setALCExhaustMeshCleaning(response.data.alcExhaustHMeshClean || 'NA');
        setALCCollectingBeltCleaning(response.data.alcCollectngBeltClean || 'NA');
        setALCPlatform(response.data.alcPlatform || 'NA');
        setALCChuteCleaning(response.data.alcChuteClean || 'NA');
        setJetlaceJBelts(response.data.jetlaceBelts || 'NA');
        setJetlaceCDrums(response.data.jetlaceDrums || 'NA');   
  
        setDryerFeedRollers(response.data.dryerFeedRollers || 'NA');
        setDryerDrums(response.data.dryerDrums || 'NA');
        setWinderSRollers(response.data.winderSRollers || 'NA');
        setWinderDrum(response.data.winderDrum || 'NA');
        setRpBalePressFeedRoller(response.data.rpFeedRoller || 'NA');
        setRpBaleBeater(response.data.rpBeater || 'NA');
        setRpBalePerforatedPlates(response.data.rpPerforatedPlates ||'NA');  
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
      label: <p>Machine Details/1</p>,
      children: (
        <div>
            {/* colums = 100 */}
          <table  style={{ width: "100%", margin: "auto" }}>
           <tr >
            <th colSpan="25" style={{textAlign:"center", height:"35px"}}>Machines</th>
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Cleaning Parts</th>
            <th  colSpan="50" style={{textAlign:"center", height:"35px"}}>Date:<br/>{formattedDate(date)}</th>
                 </tr>
                 <tr >
            <th colSpan="25" rowSpan="2" style={{textAlign:"center", height:"35px"}}>B/O, WBO 1 & 2</th>
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Feed Table</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleWBOFeedTable}
              value={WBOFeedTable}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Middle Table</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleWBOMiddleTable}
              value={WBOMiddleTable}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 {/* [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] */}
                 <tr >
            <th colSpan="25" rowSpan="3" style={{textAlign:"center", height:"35px"}}>FO/PO</th>
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Feed Roller</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleFoPoFeedRoller}
               value={FoPoFeedRoller}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Beater</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleFoPoBeater}
              value={FoPoBeater}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Perforated Plates</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleFoPoPerforatedPlates}
               value={FoPoPerforatedPlates}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 {/* [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] */}
                 <tr >
            <th colSpan="25" rowSpan="3" style={{textAlign:"center", height:"35px"}}>RIETER 1 & 2</th>
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Chute Cleaning</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleRieterChuteCleaning}
               value={RieterChuteCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Flats Cleaning</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleRieterFlastsCleaning}
               value={RieterFlastsCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Doffer Cleaning</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleRieterDofferCleaning}
               value={RieterDofferCleaning}
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
            <th colSpan="25" style={{textAlign:"center", height:"35px"}}>Machines</th>
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Cleaning Parts</th>
            <th  colSpan="50" style={{textAlign:"center", height:"35px"}}>Date:<br/>{formattedDate(date)}</th>
                 </tr>
                 <tr >
            <th colSpan="25" rowSpan="6" style={{textAlign:"center", height:"35px"}}>ALC1 & ALC2</th>
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Chute Cleaning</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleALCChuteCleaning}
               value={ALCChuteCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Side Microdust Cleaning</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleALCSideMicrodustCleaning}
              value={ALCSideMicrodustCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
             <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Mesh Belt Cleaning</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleALCMeshbeltCleaning}
              value={ALCMeshbeltCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Exhaust Mesh Cleaning</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleALCExhaustMeshCleaning}
              value={ALCExhaustMeshCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Collecting Belt Cleaning</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleALCCollectingBeltCleaning}
              value={ALCCollectingBeltCleaning}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Platform</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleALCPlatform}
              value={ALCPlatform}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 {/* [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] */}
                 <tr >
            <th colSpan="25" rowSpan="2" style={{textAlign:"center", height:"35px"}}>JETLACE</th>
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>J1,JP,J2S Belts</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleJetlaceJBelts}
              value={JetlaceJBelts}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>C1,C2 Drums</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleJetlaceCDrums}
              value={JetlaceCDrums}
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
            <th colSpan="25" style={{textAlign:"center", height:"35px"}}>Machines</th>
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Cleaning Parts</th>
            <th  colSpan="50" style={{textAlign:"center", height:"35px"}}>Date:<br/>{formattedDate(date)}</th>
                 </tr>
                 <tr >
            <th colSpan="25" rowSpan="2" style={{textAlign:"center", height:"35px"}}>DRYER A & B</th>
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Feed Rollers</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleDryerFeedRollers}
              value={DryerFeedRollers}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Drums</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleDryerDrums}
              value={DryerDrums}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
            {/* [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] */}
                 <tr >
            <th colSpan="25" rowSpan="2" style={{textAlign:"center", height:"35px"}}>WINDER</th>
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>S Rollers</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleWinderSRollers}
              value={WinderSRollers}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Drum</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleWinderDrum}
              value={WinderDrum}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 {/* [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] */}
                 <tr >
            <th colSpan="25" rowSpan="3" style={{textAlign:"center", height:"35px"}}>RP BalePress</th>
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Feed Roller</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleRpBalePressFeedRoller}
              value={RpBalePressFeedRoller}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Beater</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleRpBaleBeater}
              value={RpBaleBeater}
              disabled={disable}
            >
              <Radio value="Y">Yes</Radio>
              <Radio value="N">No</Radio>
              <Radio value="NA">NA</Radio>
            </Radio.Group></td>
                 </tr>
                 <tr >
            <th  colSpan="25" style={{textAlign:"center", height:"35px"}}>Perforated Plates</th>
            <td  colSpan="50" style={{textAlign:"center", height:"35px"}}>
            <Radio.Group
              onChange={handleRpBalePerforatedPlates}
              value={RpBalePerforatedPlates}
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
        formName="MACHINE CLEANING RECORD (Weekly)"
        formatNo="PH-PRD02/F-023"
        sopNo="PH-PRD02-D-04"
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
              <div style={{ margin: '10px', backgroundColor: 'white', width: '250px', padding: '4px', color: 'black', borderRadius: '8px', border: "1px solid black" }}><span style={{ width: '30px', margin: '10px' }}><b>BULK</b></span>    <Radio.Group
        onChange={(e) => { handleBulkOption(e) }}
        value={bulkState}
        disabled={disable}
        style={{ color: 'white' }}
      >
        <Radio value="Y">Yes</Radio>
        <Radio value="N">No</Radio>
        <Radio value="NA">NA</Radio>
      </Radio.Group></div>
      
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

export default Spunlace_f23
