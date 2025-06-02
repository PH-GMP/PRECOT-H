/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  message,
  Row,
  Select,
  Tabs,
  Tooltip
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
const Engineering_FC003 = () => {
  const { Option } = Select;
  const { state } = useLocation();
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
 
  const [date, setDate] = useState("");
 
  const navigate = useNavigate();
 
  const [operatorDate, setOperatorDate] = useState("");
 
  const [supervisior, setSupervisor] = useState("");
  const [supervisorDate, setSupervisorDate] = useState("");
  const [hod, setHod] = useState("");
  const [engineerIssuerSubmitOn, setEngineerIssuerSubmitOn] = useState("");
 
  const [supervisorStatus, setSupervisorStatus] = useState("");
 
  const [open, setOpen] = useState(false);
 
  const getCurrentTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; 
    const localTime = new Date(now.getTime() - offset);
    return localTime.toISOString().slice(0, 16);  
  };
  const departmentMap = {
    "1": "Bleaching",
    "2": "Spunlace",
    "3": "Pad_Punching",
    "4": "Dry_Goods",
    "5": "Lab",  
    "6": "Quality Assurance",
    "7": "PPC",
    "8": "Store",
    "11": "ETP"  
  };
  const departmentId = localStorage.getItem("departmentId");

  const todaytime = getCurrentTime();
  const [id, setId] = useState('');
  const [department, setDepartment] = useState("");
  const [issuerDepartment, setIssuerDepartment] = useState("");
  const [bisNo, setBisNo] = useState("");
  const [bmrNo, setBmrNo] = useState("");
  const [bmrOptions, setBmrOptions] = useState([]);
  const [receiverDepartment, setReceiverDepartment] = useState("");
  const [equipmentAttended, setEquipmentAttended] = useState("");
  const [breakdownDetails, setBreakdownDetails] = useState("");
  const [spareUsedIfAny, setSpareUsedIfAny] = useState("");
  const [firstInformationTime, setFirstInformationTime] = useState("");
  const [estimatedRepairTime, setEstimatedRepairTime] = useState("");
  const [repairStartTime, setRepairStartTime] = useState("");
  const [repairEndTime, setRepairEndTime] = useState("");
  const [machineStartTime, setMachineStartTime] = useState("");
  const [processStopTime, setProcessStopTime] = useState("");
  const [breakdownStopTime, setBreakdownStopTime] = useState("");
  const [reasonsForBreakdown, setReasonsForBreakdown] = useState("");
  const [equipmentName, setEquipmentName] = useState('');
  const [engineerIssuerSign, setEngineerIssuerSign] = useState('');
  const [receiverSign, setReceiverSign] = useState('');
  const [receiverSubmiton, setReceiverSubmiton] = useState('');
  const today = new Date().toISOString().split("T")[0];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }
  const handleBack = () => {
    navigate("/Precot/Engineering/FC-003/Summary");
  };
 
  useEffect(() => {
    if (departmentId) {
      setIssuerDepartment(departmentMap[departmentId] || "");
    }
  }, [departmentId]);

  const receiversDepartmentchange = (value) => {
    setReceiverDepartment(value);
  }
  const [editResponse, setEditResponse] = useState(null);
  const roleauth = localStorage.getItem("role");

  const formatDateUser = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDate = (dateStr) => {
    // Check if the date is already in the format dd/MM/yyyy
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(dateStr)) {
      return dateStr;
    }

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };


  const date1 = formatDateUser(state.date);
  const formattedDatesupervisor = formatDate(supervisorDate);
  const formatedDateOperator = formatDate(operatorDate);
  const formattedDateHod = formatDate(engineerIssuerSubmitOn);
  const formattedDateEngineer = formatDate(receiverSubmiton);
  // console.loglog("date1", date1);
  // console.loglog("shift", state.shift);
  const token = localStorage.getItem("token");
  // console.loglog(token);

  const departmantLOV = [
    "Bleaching",
    "Spunlace",
    "Pad_Punching",
    "Dry_Goods",
    "Cotton Buds",
    "Lab",
    // "Boiler",
    // "ETP"
  ];
  const assignedDepartmentLOV = [
    "Engineering",
    "Mechanical",
    "Electrical",
    "Utility - Steam",
    "Utility - Water",
    "Utility - Air"
  ]
  const departmentchange = (value) => {
    setBmrNo('');
    setIssuerDepartment(value);
    setBmrOptions([]);
  };

  useEffect(() => {
    if (issuerDepartment) {
      // Fetch BMR options from API for the selected department
      axios.get(`${ API.prodUrl}/Precot/api/Engineering/getProductionDetails?department=${issuerDepartment}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          const data = response.data.filter(item => item); // Remove empty strings
          const uniqueOptions = [...new Set(data)];

          if (uniqueOptions.length === 0) {
            setBmrOptions([]); // Clear BMR options if response is empty
          } else {
            setBmrOptions(uniqueOptions); // Set unique options if data exists
          }
        })
        .catch(error => {
          console.error("Error fetching BMR options:", error);
          setBmrOptions([]); // Clear BMR options in case of an error
        });
    } else {
      setBmrOptions([]); // Clear BMR options if no department is selected
    }
  }, [issuerDepartment]); // Add issuerDepartment as a dependency


  useEffect(() => {
    fetchBmrOptions();

    // approval();
  }, []);
  const fetchBmrOptions = async () => {
    try {
      const response = await fetch(
        `${ API.prodUrl}/Precot/api/Engineering/getBreakdown?date=${state.date}&bisNo=${state.bisNo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.loglog("edit data", data);


      if (data) {
        setEditResponse(data[0]);
        console.log(data)
        // Map response data to state variables
        setId(data[0].id);
        setDepartment(data[0].department);
        setIssuerDepartment(data[0].issuerDepartment);
        setBisNo(data[0].bisNo);
        setBmrNo(data[0].bmrNo);
        setReceiverDepartment(data[0].receiverDepartment);
        setEquipmentAttended(data[0].equipmentAttended);
        setBreakdownDetails(data[0].breakdownDetails);
        setSpareUsedIfAny(data[0].spareUsedIfAny);
        setFirstInformationTime(data[0].firstInformationTime);
        setEstimatedRepairTime(data[0].estimatedRepairTime);
        setRepairStartTime(data[0].repairStartTime);
        setRepairEndTime(data[0].repairEndTime);
        setMachineStartTime(data[0].machineStartTime);
        setProcessStopTime(data[0].processStopTime);
        setBreakdownStopTime(data[0].breakdownStopTime);
        setReasonsForBreakdown(data[0].reasonsForBreakdown);
        setEquipmentName(data[0].equipmentName);
        setEngineerIssuerSign(data[0].engineerIssuerSign);
        setReceiverSign(data[0].receiverSign);
        setReceiverSubmiton(data[0].receiverSubmiton);
        setDate(formatDate(data[0].date));
        setSupervisor(data[0].supervisorSign);
        setSupervisorDate(data[0].supervisorSubmitOn);
        setHod(data[0].receiverSign);
        setEngineerIssuerSubmitOn(data[0].engineerIssuerSubmitOn);
        setSupervisorStatus(data[0].supervisorStatus);
       }

      
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };


 


  const canEdit = () => {
    if (roleauth === "ROLE_OPERATOR") {
      return !(
        editResponse &&
        editResponse.operator_status === "OPERATOR_APPROVED" &&
        editResponse.supervisor_status !== "SUPERVISOR_REJECTED" &&
        editResponse.hod_status !== "HOD_REJECTED"
      );
    } else if (roleauth === "ROLE_SUPERVISOR") {
      return !(
        editResponse &&
        editResponse.operator_status === "OPERATOR_APPROVED" &&
        (editResponse.supervisor_status === "SUPERVISOR_APPROVED" ||
          editResponse.supervisor_status === "WAITING_FOR_APPROVAL") &&
        editResponse.hod_status === "WAITING_FOR_APPROVAL" || "HOD_APPROVED"
      );
    } else if (roleauth === "ROLE_HOD" || roleauth === "ROLE_DESIGNEE") {
      return !(
        editResponse &&
        (editResponse.hod_status === "HOD_APPROVED" ||
          editResponse.hod_status === "WAITING_FOR_APPROVAL" ||
          editResponse.hod_status === "HOD_REJECTED")
      );
    } else {
      return false;
    }
  };


  // Determine if inputs are editable
  const isEditable = canEdit();

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = supervisior;
    if (username) {
      

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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = engineerIssuerSign;
    if (username) {
      

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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse, API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = receiverSign;
    if (username) {
      

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
          // console.loglog("Response:", res.data);
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
          // console.loglog("Error in fetching image:", err);
        });
    }
  }, [editResponse, API.prodUrl, token]);



  const handleSave = () => {
    setSaveLoading(true);
    const payload = {
      id: id || null,
      format: "BREAKDOWN INTIMATION SLIP",
      format_no: "PH-ENG01/FC-003",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-02",
      unit: "H",
      date: state.date,
      issuerDepartment: issuerDepartment,
      bisNo: state.bisNo,
      bmrNo: bmrNo,
      receiverDepartment: receiverDepartment,
      firstInformationTime: firstInformationTime,
      machineStartTime: machineStartTime,
      processStopTime: processStopTime,
      breakdownStopTime: breakdownStopTime,
      repairStartTime: repairStartTime,
      repairEndTime: repairEndTime,
      equipmentAttended: equipmentAttended,
      breakdownDetails: breakdownDetails,
      equipmentName: equipmentName,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${ API.prodUrl}/Precot/api/Engineering/Breakdown/Save`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully Saved");
        navigate("/Precot/Engineering/FC-003/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setSaveLoading(false);
        message.error(err.response.data.message);
      }).finally(() => {
        setSaveLoading(false);

      });
  }
  const isFormValid = () => {
    return (
      receiverDepartment &&
      firstInformationTime &&
      breakdownDetails &&
      bmrNo &&
      equipmentName
    );
  };


  const handleSubmit = () => {
    if (!isFormValid()) {
      message.error("Please fill all required fields.");
      return;
    }
    setSubmitLoading(true);
    const payload = {
      id: id || null,
      format: "BREAKDOWN INTIMATION SLIP",
      format_no: "PH-ENG01/FC-003",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-02",
      unit: "H",
      date: state.date,
      issuerDepartment: issuerDepartment,
      bisNo: state.bisNo,
      bmrNo: bmrNo || "NA",
      receiverDepartment: receiverDepartment,
      firstInformationTime: firstInformationTime,
      machineStartTime: machineStartTime,
      processStopTime: processStopTime,
      breakdownStopTime: breakdownStopTime,
      repairStartTime: repairStartTime,
      repairEndTime: repairEndTime,
      equipmentAttended: equipmentAttended,
      breakdownDetails: breakdownDetails,
      equipmentName: equipmentName,
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${ API.prodUrl}/Precot/api/Engineering/Breakdown/Submit`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully submitted");
        navigate("/Precot/Engineering/FC-003/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);

      });
  };
  const isEstimateValid = () => {
    return (
      estimatedRepairTime
    );
  };


  const handleAcceptanceSubmit = () => {
    if (!isEstimateValid()) {
      message.error("Please fill all required fields.");
      return;
    }
    setSubmitLoading(true);
    const payload = {
      id: id || null,
      format: "BREAKDOWN INTIMATION SLIP",
      format_no: "PH-ENG01/FC-003",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-02",
      unit: "H",
      date: state.date,
      issuerDepartment: issuerDepartment,
      bisNo: state.bisNo,
      bmrNo: bmrNo || "NA",
      receiverDepartment: receiverDepartment,
      firstInformationTime: firstInformationTime,
      machineStartTime: machineStartTime,
      processStopTime: processStopTime,
      breakdownStopTime: breakdownStopTime,
      estimatedRepairTime: estimatedRepairTime,
      repairStartTime: repairStartTime,
      repairEndTime: repairEndTime,
      equipmentAttended: equipmentAttended,
      breakdownDetails: breakdownDetails,
      equipmentName: equipmentName,
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        ` ${ API.prodUrl}/Precot/api/Engineering/Breakdown/EngineerSubmit`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.loglog("Response", res.data);
        message.success("Sucessfully submitted");
        navigate("/Precot/Engineering/FC-003/Summary");
      })
      .catch((err) => {
        // console.loglog("Error", err);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);

      });
  };
  const isReceiverFormValid = () => {
    return (
      equipmentAttended &&
      spareUsedIfAny &&
      reasonsForBreakdown &&
      repairStartTime &&
      repairEndTime
    );
  };

  const handleReceiverSubmit = () => {

    if (!isReceiverFormValid()) {
      message.error("Please fill all required fields.");
      return;
    }
    setSubmitLoading(true);
    const payload = {
      id: id || null,
      format: "BREAKDOWN INTIMATION SLIP",
      format_no: "PH-ENG01/FC-003",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-02",
      unit: "H",
      date: state.date,
      issuerDepartment: issuerDepartment,
      bisNo: state.bisNo,
      bmrNo: bmrNo || "NA",
      receiverDepartment: receiverDepartment,
      firstInformationTime: firstInformationTime,
      machineStartTime: machineStartTime,
      processStopTime: processStopTime,
      breakdownStopTime: breakdownStopTime,
      spareUsedIfAny: spareUsedIfAny,
      reasonsForBreakdown: reasonsForBreakdown,
      estimatedRepairTime: estimatedRepairTime,
      equipmentAttended: equipmentAttended,
      repairStartTime: repairStartTime,
      repairEndTime: repairEndTime,
      breakdownDetails: breakdownDetails,
      equipmentName: equipmentName,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${ API.prodUrl}/Precot/api/Engineering/Breakdown/ReceiverSubmit`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Successfully submitted by receiver");
        navigate("/Precot/Engineering/FC-003/Summary");
      })
      .catch((err) => {
        setSubmitLoading(false);
        message.error(err.response?.data?.message || "Submission failed");
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
  const isClosureFormValid = () => {
    return (
      machineStartTime
    );
  };

  const handleClosureSubmit = () => {

    if (!isClosureFormValid()) {
      message.error("Please Provide the Machine Start Time.");
      return;
    }
    setSubmitLoading(true);
    const payload = {
      id: id || null,
      format: "BREAKDOWN INTIMATION SLIP",
      format_no: "PH-ENG01/FC-003",
      revisionNo: "01",
      ref_sop_no: "PH-ENG01-D-02",
      unit: "H",
      date: state.date,
      issuerDepartment: issuerDepartment,
      bisNo: state.bisNo,
      bmrNo: bmrNo || "NA",
      receiverDepartment: receiverDepartment,
      firstInformationTime: firstInformationTime,
      machineStartTime: machineStartTime,
      processStopTime: processStopTime,
      breakdownStopTime: breakdownStopTime,
      spareUsedIfAny: spareUsedIfAny,
      reasonsForBreakdown: reasonsForBreakdown,
      estimatedRepairTime: estimatedRepairTime,
      equipmentAttended: equipmentAttended,
      breakdownDetails: breakdownDetails,
      equipmentName: equipmentName,
      repairStartTime: repairStartTime,
      repairEndTime: repairEndTime,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${ API.prodUrl}/Precot/api/Engineering/Breakdown/CloserSubmit`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Successfully submitted by receiver");
        navigate("/Precot/Engineering/FC-003/Summary");
      })
      .catch((err) => {
        setSubmitLoading(false);
        message.error(err.response?.data?.message || "Submission failed");
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
  const handleStartTimeChange = (e) => {
    const startTime = e.target.value;   
    if (repairEndTime && new Date(startTime) > new Date(repairEndTime)) {
      setRepairStartTime('');
      setBreakdownStopTime('');
      message.warning('Start time cannot be after the end time.');
    } else {
      setRepairStartTime(startTime);
      calculateBreakdownStopTime(startTime, repairEndTime);
    }
  };

  const handleEndTimeChange = (e) => {
    const endTime = e.target.value;
    if (repairStartTime && new Date(endTime) < new Date(repairStartTime)) {
      setRepairEndTime('');
      setBreakdownStopTime('');
      message.warning('End time cannot be before the start time.');
    } else {
      setRepairEndTime(endTime);
      calculateBreakdownStopTime(repairStartTime, endTime);
    }
  };

  const calculateBreakdownStopTime = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffInMilliseconds = endDate - startDate; 
      const totalMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
      const minutes = (totalMinutes % 60).toString().padStart(2, '0');
      setBreakdownStopTime(`${hours}:${minutes}`);
    } else {
      setBreakdownStopTime('');
    }
  };

  const handleFirstInformationTimeChange = (e) => {
    const firstTime = e.target.value;
    setFirstInformationTime(firstTime);
    calculateProcessStopTime(firstTime, machineStartTime);
  };

  const handleMachineStartTimeChange = (e) => {
    const startTime = e.target.value;
    setMachineStartTime(startTime);
    calculateProcessStopTime(firstInformationTime, startTime);
  };

  const calculateProcessStopTime = (firstTime, startTime) => {
    if (firstTime && startTime) {
      const firstDate = new Date(firstTime);
      const startDate = new Date(startTime);
      if (startDate < firstDate) {
        setProcessStopTime('');
        message.warning('Machine Start Time cannot be before First Information Time.');
        return;
      }
      const diffInMilliseconds = startDate - firstDate;
      const totalMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
      const minutes = (totalMinutes % 60).toString().padStart(2, '0');
      setProcessStopTime(`${hours}:${minutes}`);
    } else {
      setProcessStopTime('');
    }
  };


  const items = [
    {
      key: "1",
      label: <p>USER INTIMATION</p>,
      children: (
        <div>
          <table align="left" style={{ width: "70%", margin: "auto" }}>
            <tr>
              <td colSpan={25} style={{ textAlign: 'center', height: '35px' }}>Date</td>
              <td colSpan={25} style={{ textAlign: 'center', height: '35px' }}><input className="inp-new" type="date" value={state.date} disabled /></td>
              <td colSpan={25} style={{ textAlign: 'center', height: '35px' }}>BIS No. </td>
              <td colSpan={25} style={{ textAlign: 'center', height: '35px' }}><input className="inp-new" type="text" value={state.bisNo} disabled /></td>
            </tr>
            <tr>
              <td colSpan={25} style={{ textAlign: 'center', height: '35px' }}>Issuer Department</td>
              <td colSpan={25} style={{ textAlign: 'center', height: '35px' }}>
                <Select
                  showSearch
                  value={issuerDepartment}
                  onChange={departmentchange}
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  disabled
                >
                  {departmantLOV.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </td>
              <td colSpan={25} style={{ textAlign: 'center', height: '35px' }}>BMR No.</td>
              <td colSpan={25} style={{ textAlign: 'center', height: '35px' }}>
                <Select
                  className="inp-new"
                  value={bmrNo}
                  onChange={setBmrNo}
                  style={{ width: '100%' }}
                  allowClear
                  disabled={!issuerDepartment || supervisorStatus === "SUPERVISOR_APPROVED" || roleauth !== "ROLE_SUPERVISOR"}
                >
                  {bmrOptions.map((option, index) => (
                    <Option key={index} value={option}>{option}</Option>
                  ))}
                </Select></td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: 'center', height: '35px' }}>Receiver Department</td>
              <td colSpan={50} style={{ textAlign: 'center', height: '35px' }}>
                <Select
                  showSearch
                  value={receiverDepartment}
                  onChange={receiversDepartmentchange}
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  disabled={supervisorStatus === "SUPERVISOR_APPROVED" || (roleauth !== "ROLE_SUPERVISOR")}
                >
                  {assignedDepartmentLOV.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: 'center', height: '35px' }}>First Information time</td>
              <td colSpan={50} style={{ textAlign: 'center', height: '35px' }}>
                <input
                  className="inp-new"
                  type="datetime-local"
                  value={firstInformationTime}
                  max={todaytime}
                  onChange={(e) => handleFirstInformationTimeChange(e)}
                  disabled={supervisorStatus === "SUPERVISOR_APPROVED" || (roleauth !== "ROLE_SUPERVISOR")}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: 'center', height: '35px' }}>Equipment Name</td>
              <td colSpan={50} style={{ textAlign: 'center', height: '35px' }}>
                <input
                  className="inp-new"
                  type="text"
                  value={equipmentName}
                  onChange={(e) => setEquipmentName(e.target.value)}
                  disabled={supervisorStatus === "SUPERVISOR_APPROVED" || (roleauth !== "ROLE_SUPERVISOR")}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: 'center', height: '35px' }}>Breakdown Details </td>
              <td colSpan={50} style={{ textAlign: 'left', height: '35px' }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  style={{ textAlign: 'left', width: '100%', height: 'auto' }}
                  value={breakdownDetails}
                  onChange={(e) => setBreakdownDetails(e.target.value)}
                  disabled={supervisorStatus === "SUPERVISOR_APPROVED" || (roleauth !== "ROLE_SUPERVISOR")}
                /></td>
            </tr>
            <tr>
              <td colSpan={50} >
                <p style={{ fontWeight: 'bold', marginBottom: '0.5em', textAlign: 'center', verticalAlign: 'center' }}>Issuer Department</p>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5em', textAlign: 'center', verticalAlign: 'center' }}>Sign & Date</p>
              </td>
              <td colSpan={50} style={{ padding: '1em', verticalAlign: 'top', textAlign: 'center' }}>
                {editResponse?.supervisorStatus === "SUPERVISOR_APPROVED" && (
                  <>
                    <textarea
                      className="inp-new"
                      value={supervisior ? `${supervisior}\n ${formattedDatesupervisor}` : ""}
                      readOnly
                      rows="2"
                      style={{
                        resize: 'none',
                        overflow: 'hidden',
                        width: '90%',
                        padding: '0.5em',
                        borderRadius: '5px',
                        // border: '1px solid #ccc',
                        marginBottom: '0.5em',
                        textAlign: 'center'
                      }}
                    />
                    {getImage && (
                      <img
                        className="signature"
                        src={getImage}
                        alt="Signature"
                        style={{
                          display: 'block',
                          margin: '0 auto',
                          maxWidth: '150px',
                          maxHeight: '150px'
                        }}
                      />
                    )}
                  </>
                )}
              </td>
            </tr>
          </table>
        </div>
      )
    },
    {
      key: "2",
      label: <p>RECEIVER INTIMATION</p>,
      children: (
        <div>
          <table align="left" style={{ width: "70%", margin: "auto" }}>
            <tr>
              <td colSpan={50} style={{ textAlign: 'center', height: '35px' }}>Estimated Repair Time </td>
              <td colSpan={50} style={{ textAlign: 'left', height: '35px' }}>
                <input
                  className="inp-new"
                  type="text"
                  placeholder="HH:MM"
                  style={{ width: '100%', height: 'auto' }}
                  value={estimatedRepairTime}
                  onChange={(e) => setEstimatedRepairTime(e.target.value)}
                  onBlur={() => {
                    const timeRegex = /^(?:[01]?\d|2[0-3]):[0-5]\d$/;
                    if (!timeRegex.test(estimatedRepairTime) && estimatedRepairTime) {
                      message.warning("Please enter a valid time in the format HH:MM, e.g., 00:00.");
                      setEstimatedRepairTime("");
                    }
                  }}
                  disabled={
                    !(supervisorStatus === "SUPERVISOR_APPROVED" &&
                      (roleauth === "ROLE_ENGINEER" || roleauth === "ROLE_CIVIL" || roleauth === "ROLE_MECHANICAL" || roleauth=="ROLE_ELECTRICAL")) ||
                    editResponse?.engineerIssuerStatus === "ACCEPTED"
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5em', textAlign: 'center' }}>Receiver Department</p>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5em', textAlign: 'center' }}>Sign & Date</p>
              </td>
              <td colSpan={50} style={{ padding: '1em', verticalAlign: 'top', textAlign: 'center' }}>
                {(editResponse?.supervisorStatus === "SUPERVISOR_REJECTED" || editResponse?.supervisorStatus === "SUPERVISOR_APPROVED") && (
                  <textarea
                    className="inp-new"
                    value={engineerIssuerSign ? `${engineerIssuerSign}\n ${formattedDateHod}` : ""}
                    readOnly
                    rows="2"
                    style={{
                      resize: 'none',
                      overflow: 'hidden',
                      width: '100%',
                      padding: '0.5em',
                      borderRadius: '5px',
                      // border: '1px solid #ccc',
                      marginBottom: '0.5em',
                      textAlign: 'center'
                    }}
                  />
                )}
                {(editResponse?.supervisorStatus === "SUPERVISOR_APPROVED" ||
                  editResponse?.supervisorStatus === "SUPERVISOR_REJECTED"
                ) &&
                  getImage1 && (
                    <img
                      className="signature"
                      src={getImage1}
                      alt="Signature"
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        maxWidth: '150px',
                        maxHeight: '50px'
                      }}
                    />
                  )}
              </td>
            </tr>

          </table >
        </div>
      )
    },
    {
      key: "3",
      label: <p>ENGINEERING EXECUTION</p>,
      children: (
        <div>
          <table align="left" style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan={16} style={{ textAlign: 'center', height: '35px' }}>Equipment Attended </td>
              <td colSpan={84} style={{ textAlign: 'left', height: '35px' }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  style={{ textAlign: 'left' }}
                  value={equipmentAttended}
                  onChange={(e) => setEquipmentAttended(e.target.value)}
                  disabled={
                    !(editResponse?.engineerIssuerStatus === "ACCEPTED" &&
                      (roleauth === "ROLE_ENGINEER" || roleauth === "ROLE_CIVIL" || roleauth === "ROLE_MECHANICAL")) ||
                    editResponse?.receiverstatus === "RECEIVER_APPROVED"
                  }
                /></td>
            </tr>

            <tr>
              <td colSpan={16} style={{ textAlign: 'center', height: '35px' }}>Spare used if any </td>
              <td colSpan={84} style={{ textAlign: 'left', height: '35px' }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  style={{ textAlign: 'left', width: '100%', height: 'auto' }}
                  value={spareUsedIfAny}
                  onChange={(e) => setSpareUsedIfAny(e.target.value)}
                  disabled={
                    !(editResponse?.engineerIssuerStatus === "ACCEPTED" &&
                      (roleauth === "ROLE_ENGINEER" || roleauth === "ROLE_CIVIL" || roleauth === "ROLE_MECHANICAL")) ||
                    editResponse?.receiverstatus === "RECEIVER_APPROVED"
                  }
                /></td>
            </tr>
            <tr>
              <td colSpan={16} style={{ textAlign: 'center', height: '35px' }}>Repair start time </td>
              <td colSpan={16} style={{ textAlign: 'left', height: '35px' }}>
                <input
                  className="inp-new"
                  type="datetime-local"
                  max={todaytime}
                  style={{ width: '100%', height: 'auto' }}
                  value={repairStartTime}
                  onChange={(e) => handleStartTimeChange(e)}
                  disabled={
                    !(editResponse?.engineerIssuerStatus === "ACCEPTED" &&
                      (roleauth === "ROLE_ENGINEER" || roleauth === "ROLE_CIVIL" || roleauth === "ROLE_MECHANICAL")) ||
                    editResponse?.receiverstatus === "RECEIVER_APPROVED"
                  }
                /></td>
              {/* </tr>
            <tr> */}
              <td colSpan={16} style={{ textAlign: 'center', height: '35px' }}>Repair end time </td>
              <td colSpan={16} style={{ textAlign: 'left', height: '35px' }}>
                <input
                  className="inp-new"
                  type="datetime-local"
                  max={todaytime}
                  style={{ width: '100%', height: 'auto' }}
                  value={repairEndTime}
                  onChange={(e) => handleEndTimeChange(e)}
                  disabled={
                    !(editResponse?.engineerIssuerStatus === "ACCEPTED" &&
                      (roleauth === "ROLE_ENGINEER" || roleauth === "ROLE_CIVIL" || roleauth === "ROLE_MECHANICAL")) ||
                    editResponse?.receiverstatus === "RECEIVER_APPROVED"
                  }
                /></td>
            </tr>
            <tr>
              <td colSpan={16} style={{ textAlign: 'center', height: '45px' }}>Breakdown Stop Time</td>
              <td colSpan={84} style={{ textAlign: 'center', height: '45px' }}>
                <input
                  className="inp-new"
                  type="text"
                  value={breakdownStopTime}
                  // onChange={(e) => setBreakdownStopTime(e.target.value)}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td colSpan={16} style={{ textAlign: 'center', height: '35px' }}>Reasons for Breakdown</td>
              <td colSpan={84} style={{ textAlign: 'left', height: '35px' }}>
                <TextArea
                  className="inp-new"
                  type="text"
                  style={{ textAlign: 'left', paddingLeft: '3em', width: '100%', height: 'auto' }}
                  value={reasonsForBreakdown}
                  onChange={(e) => setReasonsForBreakdown(e.target.value)}
                  disabled={
                    !(editResponse?.engineerIssuerStatus === "ACCEPTED" &&
                      (roleauth === "ROLE_ENGINEER" || roleauth === "ROLE_CIVIL" || roleauth === "ROLE_MECHANICAL")) ||
                    editResponse?.receiverstatus === "RECEIVER_APPROVED"
                  }
                /></td>
            </tr>
          </table>
        </div>
      )
    },
    {
      key: "4",
      label: <p>USER CLOSURE</p>,
      children: (
        <>
          <table align="left" style={{ width: '70%', borderCollapse: 'collapse', marginTop: '1em' }}>
            <tr>
              <td colSpan={50} style={{ textAlign: 'center', height: '45px' }}>Machine start time</td>
              <td colSpan={50} style={{ textAlign: 'center', height: '45px' }}>
                <input
                  className="inp-new"
                  type="datetime-local"
                  max={todaytime}
                  value={machineStartTime}
                  onChange={(e) => handleMachineStartTimeChange(e)}
                  disabled={
                    editResponse?.closureStatus === "APPROVED" ||
                    !(editResponse?.receiverstatus === "RECEIVER_APPROVED" && roleauth === "ROLE_SUPERVISOR")
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={50} style={{ textAlign: 'center', height: '45px' }}>Process Stop Time</td>
              <td colSpan={50} style={{ textAlign: 'center', height: '45px' }}>
                <input
                  className="inp-new"
                  type="time"
                  value={processStopTime}
                  onChange={(e) => setProcessStopTime(e.target.value)}
                  disabled
                />
              </td>
            </tr>
            <br />
            {/*           
          </table>
        </>
      )
    },
    {
      key: "5",
      label: "REVIEWS",
      children: (
        <>
          <table align="left" style={{ width: '100%', maxWidth: '600px', borderCollapse: 'collapse', marginTop: '1em' }}> */}
            <tr >
              <td colSpan={50}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5em', textAlign: 'center', verticalAlign: 'center' }}>Issuer Department</p>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5em', textAlign: 'center' }}>Sign & Date</p>
              </td>
              <td colSpan={50} style={{ padding: '1em', verticalAlign: 'top', textAlign: 'center' }}>
                {editResponse?.supervisorStatus === "SUPERVISOR_APPROVED" && (
                  <>
                    <textarea
                      className="inp-new"
                      value={receiverSign ? `${receiverSign}\n ${formattedDateEngineer}` : ""}
                      readOnly
                      rows="2"
                      style={{
                        resize: 'none',
                        overflow: 'hidden',
                        width: '90%',
                        padding: '0.5em',
                        borderRadius: '5px',
                        // border: '1px solid #ccc',
                        marginBottom: '0.5em',
                        textAlign: 'center'
                      }}
                    />
                    {getImage2 && (
                      <img
                        className="signature"
                        src={getImage2}
                        alt="Signature"
                        style={{
                          display: 'block',
                          margin: '0 auto',
                          maxWidth: '150px',
                          maxHeight: '150px'
                        }}
                      />
                    )}
                  </>
                )}
              </td>
            </tr>
            <tr >
              <td colSpan={50}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5em', textAlign: 'center' }}>Receiver Department</p>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5em', textAlign: 'center' }}>Sign & Date</p>
              </td>
              <td style={{ padding: '1em', verticalAlign: 'top', textAlign: 'center' }}>
                {(editResponse?.supervisor_status === "SUPERVISOR_REJECTED" || editResponse?.supervisor_status === "SUPERVISOR_APPROVED") && (
                  <textarea
                    className="inp-new"
                    value={hod ? `${hod}\n ${formattedDateHod}` : ""}
                    readOnly
                    rows="2"
                    style={{
                      resize: 'none',
                      overflow: 'hidden',
                      width: '100%',
                      padding: '0.5em',
                      borderRadius: '5px',
                      // border: '1px solid #ccc',
                      marginBottom: '0.5em',
                      textAlign: 'center'
                    }}
                  />
                )}
                {(editResponse?.supervisor_status === "SUPERVISOR_APPROVED" ||
                  editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
                  editResponse?.hod_status === "HOD_APPROVED" ||
                  editResponse?.hod_status === "HOD_REJECTED") &&
                  getImage && (
                    <img
                      className="signature"
                      src={getImage}
                      alt="Signature"
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        maxWidth: '150px',
                        maxHeight: '50px'
                      }}
                    />
                  )}
              </td>
            </tr>
          </table>

        </>
      ),
    },
  ];


  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName="BREAKDOWN INTIMATION SLIP"
        formatNo="PH-ENG01/FC-003"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }

        buttonsArray={[

          roleauth === "ROLE_SUPERVISOR" && editResponse?.supervisorStatus !== "SUPERVISOR_APPROVED" && (
            <Button
              key="save"
              loading={saveLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              onClick={handleSave}
              shape="round"
              icon={<IoSave color="#00308F" />}
            >
              &nbsp;Save
            </Button>
          ),
          roleauth === "ROLE_SUPERVISOR" && editResponse?.supervisorStatus !== "SUPERVISOR_APPROVED" && (
            <Button
              key="submit"
              loading={submitLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              onClick={handleSubmit}
              shape="round"
              icon={<GrDocumentStore color="#00308F" />}
            >
              &nbsp;Submit
            </Button>
          ),
          (roleauth === "ROLE_ENGINEER" || roleauth === "ROLE_ELECTRICAL" || roleauth === "ROLE_MECHANICAL") &&
          editResponse?.supervisorStatus === "SUPERVISOR_APPROVED" &&
          editResponse?.engineerIssuerStatus !== "ACCEPTED" && (
            <Button
              key="engineerSubmit"
              loading={submitLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<GrDocumentStore color="#00308F" />}
              onClick={handleAcceptanceSubmit}
              shape="round"
            >
              &nbsp;Submit
            </Button>
          ),
          (roleauth === "ROLE_ENGINEER" || roleauth === "ROLE_ELECTRICAL" || roleauth === "ROLE_MECHANICAL") &&
          editResponse?.engineerIssuerStatus === "ACCEPTED" &&
          editResponse?.receiverstatus !== "RECEIVER_APPROVED" && (
            <Button
              key="receiverSubmit"
              loading={submitLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<GrDocumentStore color="#00308F" />}
              onClick={handleReceiverSubmit}
              shape="round"
            >
              &nbsp;Submit
            </Button>
          ),
          roleauth === "ROLE_SUPERVISOR" &&
          editResponse?.receiverstatus === "RECEIVER_APPROVED" &&
          (
            <Button
              key="closureSubmit"
              loading={submitLoading}
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
              }}
              icon={<GrDocumentStore color="#00308F" />}
              onClick={handleClosureSubmit}
              shape="round"
            >
              &nbsp;Submit
            </Button>
          ),
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginRight: "20px",
            }}
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
            shape="round"
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
      <div style={{ paddingBottom: "2em" }}></div>
      <Row>
        <Tabs
          items={items}
          //onChange={onChange}
          style={{
            width: "90%",
            position: "relative",
            left: "2%",
          }}
        />
      </Row>


    </div>
  );
};

export default Engineering_FC003;
