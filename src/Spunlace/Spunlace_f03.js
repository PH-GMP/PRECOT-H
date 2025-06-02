/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, Input, Row, Tabs, Select, message, Tooltip } from "antd";
import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { Radio, Form, DatePicker } from "antd";
import logo from "../Assests/logo.png"
import API from "../baseUrl.json";
import { useNavigate, useLocation } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";
import { BiFontSize, BiLock } from "react-icons/bi";
import { IoChevronBackSharp, IoCreate, IoSave } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { GrDocumentStore } from "react-icons/gr";
import moment from 'moment';
import gif from '../Assests/gif.gif'
import { FaPrint } from "react-icons/fa6";
import { Table, Modal, Drawer, Menu, Avatar } from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { GoArrowLeft } from "react-icons/go";
import {
    LoadingOutlined,

    PrinterOutlined,
} from "@ant-design/icons";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Spunlace_03 = () => {
    const initial = useRef(false);
    const [getImageOP, setGetImageOP] = useState("");
    const [getImageSUP, setGetImageSUP] = useState("");
    const [getImageHOD, setGetImageHOD] = useState("");
    const [rejectRemarks, setRejectRemarks] = useState("");
    const [J_1_Conveyor_speed, setJ_1_Conveyor_speed] = useState("");
    const [JP_Conveyor_speed, setJP_Conveyor_speed] = useState("");
    const [INJ_PW_Pressure, setINJ_PW_Pressure] = useState("ok");
    const [INJ_01_Pressure, setINJ_01_Pressure] = useState("ok");
    const [INJ_IPA_Pressure, setINJ_IPA_Pressure] = useState("");
    const [INJ_11_Pressure, setINJ_11_Pressure] = useState("");
    const [INJ_12_Pressure, setINJ_12_Pressure] = useState("");
    const [id, setid] = useState("");
    const [PW_Observation, setPW_Observation] = useState("");
    const { Option } = Select;
    const [INJ_21_Pressure, setINJ_21_Pressure] = useState("");
    const [INJ_PW_STRIP, setINJ_PW_STRIP] = useState("");
    const [VACCUM, setVACCUM] = useState("");
    const [INJ_01_Strip, setINJ_01_Strip] = useState("Select INJ-01 Strip Specification");
    const [INJ_IPA_Strip, setINJ_IPA_Strip] = useState("Select INJ_IPA Strip Specification");
    const [INJ_11_Strip , setINJ_11_Strip] = useState("Select INJ_11  Strip Specification");
    const [INJ_12_Strip , setINJ_12_Strip] = useState("Select INJ_12  Strip Specification");
    const [INJ_21_Strip , setINJ_21_Strip] = useState("Select INJ_21  Strip Specification");
    const [CPA_Drum_speed, setCPA_Drum_speed] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [C_1_Drum_speed, setC_1_Drum_speed] = useState("");
    const [C_2_Drum_speed, setC_2_Drum_speed] = useState("");
    const [J2S_Conveyer_speed, setJ2S_Conveyer_speed] = useState("");
    const [MDU_TENSION_DRAFTA, setMDU_TENSION_DRAFTA] = useState("");
    const [MDU_TENSION_DRAFTB, setMDU_TENSION_DRAFTB] = useState("");
    const [MDL_TENSION_DRAFTA, setMDL_TENSION_DRAFTA] = useState("");
    const [MDL_TENSION_DRAFTB, setMDL_TENSION_DRAFTB] = useState("");
    const [MDL_SpeedA, setMDL_SpeedA] = useState("");
    const [MDL_SpeedB, setMDL_SpeedB] = useState("");
    const [TTUA, setTTUA] = useState("");
    const [TTUB, setTTUB] = useState("");
    const [TTLA, setTTLA] = useState("");
    const [TTLB, setTTLB] = useState("");
    const [MDU_SpeedA, setMDU_SpeedA] = useState("");
    const [MDU_SpeedB, setMDU_SpeedB] = useState("");
    const [MFU_speedA, setMFU_speedA] = useState("");
    const [MFU_speedB, setMFU_speedB] = useState("");
    const [MFL_speedA, setMFL_speedA] = useState("");
    const [MFL_speedB, setMFL_speedB] = useState("");
    const [TOP_Damper_InletA, setTOP_Damper_InletA] = useState("");
    const [TOP_Damper_InletB, setTOP_Damper_InletB] = useState("");
    const [TOP_Damper_outletA, setTOP_Damper_outletA] = useState("");
    const [TOP_Damper_outletB, setTOP_Damper_outletB] = useState("");
    const [Bottom_Damper_InletA, setBottom_Damper_InletA] = useState("");
    const [Bottom_Damper_InletB, setBottom_Damper_InletB] = useState("");
    const [Bottom_Damper_OutletA, setBottom_Damper_OutletA] = useState("");
    const [Bottom_Damper_OutletB, setBottom_Damper_OutletB] = useState("");
    const [MDL_Speed2, setMDL_Speed2] = useState("");
    const [Boiler_TemperatureA, setBoiler_TemperatureA] = useState("");
    // const [Boiler_TemperatureB, setBoiler_TemperatureB] = useState("");
    const [HW_circulation2, setHW_circulation2] = useState("");
    const [HW_draining2, setHW_draining2] = useState("");
    const [NW_waterFill, setNW_waterFill] = useState("");
    const [NW_cheTransfer, setNW_cheTransfer] = useState("");
    const [NW_temp, setNW_temp] = useState("");
    const [NW_circulation, setNW_circulation] = useState("");
    const [NW_draining, setNW_draining] = useState("");
    const [NW_Observation, setNW_Observation] = useState("");
    const [FC_waterFill, setFC_waterFill] = useState("");
    const [FC_circulation, setFC_circulation] = useState("");
    const [FC_ciruclationPH, setFC_ciruclationPH] = useState("");
    const [FC_surface, setFC_surface] = useState("");
    const [FC_surfacePH, setFC_surfacePH] = useState("");
    const [FC_Draining, setFC_Draining] = useState("");
    const [FC_Observation, setFC_Observation] = useState("");
    const [CH_caustic, setCH_caustic] = useState("");
    const [CH_haipaloene, setCH_haipaloene] = useState("");
    const [CH_sarofom, setCH_sarofom] = useState("");
    const [CH_Hydrogen, setCH_Hydrogen] = useState("");
    const [CH_setilon, setCH_setilon] = useState("");
    const [CH_citric, setCH_citric] = useState("");
    const [CH_remark, setCH_remark] = useState("");
    const [INcharge_sign, setINcharge_sign] = useState("");
    const [INcharge_Date, setINcharge_Date] = useState("");
    const [HOD_sign, setHOD_sign] = useState("");
    const [HOD_date, setHOD_date] = useState("");
    const [QA_sign, setQA_sign] = useState("");
    const [QA_date, setQA_date] = useState("");
    const [loading, setLoading] = useState(true);
    const [bmrNumber, setBmrNumber] = useState("");
  
    const [newDate, setNewDate] = useState("");
    const [batchNolist, setBatchNolist] = useState("Select BatchNo");
    //   const [shift, setShift] = useState("");
    const [startTime, setStartTime] = useState("");
      const [orderNo, setOrderNo] = useState("");
    const [customername, setcustomername] = useState("");
    const [Mixing, setMixing] = useState("");
    const [Material, setMaterial] = useState("");
    const [STD_GSM, setSTD_GSM] = useState("");
    const [Pattern, setpattern] = useState("");
    const [width, setwidth] = useState("");
    const [Moisture, setMoisture] = useState("");
    const [Thickness, setThickness] = useState("");
    const [batchno, setbatchno] = useState([]);
    const [endTime, setEndTime] = useState("");
    const [finishlov, setfinishLOV] = useState([]);
    const [finisharraylist, setfinisharray] = useState('Select Finish');
    const [availableBMRno, setAvailableBMRno] = useState([]);
    const [availableBMRnoLov, setAvailableBMRnoLov] = useState('Select BMRNo');
    const [remarks, setremarks] = useState("");
    const [shiftInchargeFlag, setshiftInchargeFlag] = useState(false);
    const [hodIncharge, sethodIncharge] = useState(false);
    const [supervisor, setsupervisor] = useState(false);
    const [availableshift, setAvailableShifts] = useState([]);
    const [availableshiftlov, setAvailableShiftslov] = useState('Select Shift');
    const [availableMachineLov, setAvailableMachineLov,] = useState([]);
    const [availablemclov, setAvailableMAClov] = useState('Select M/C No');
    const [value, setValue] = useState("");
    const [print, printdata] = useState("");
    const [mail_status, setmail_status] = useState("");
    const [supervisor_status, setsupervisor_status] = useState("");
    const [supervisor_saved_on, setsupervisor_saved_on] = useState("");
    const [supervisor_saved_by, setssupervisor_saved_by] = useState("");
    const [supervisor_saved_id, setssupervisor_saved_id] = useState(0);
    const [supervisor_submit_on, setsupervisor_submit_on] = useState("");
    const [supervisor_submit_by, setsupervisor_submit_by] = useState("");
    const [supervisor_submit_id, setsupervisor_submit_id] = useState(0);
    const [supervisor_sign, setsupervisor_sign] = useState("");
    const [hod_saved_on, sethod_saved_on] = useState("");
    const [hod_status, sethod_status] = useState("");
    const [hod_saved_by, sethod_saved_by] = useState("");
    const [hod_saved_id, sethod_saved_id] = useState(0);
    const [hod_submit_on, sethod_submit_on] = useState("");
    const [hod_submit_by, sethod_submit_by] = useState("");
    const [hod_submit_id, sethod_submit_id] = useState(0);
    const [hod_sign, sethod_sign] = useState("");
    const [operator_status, setoperator_status] = useState("");
    const [operator_saved_on, setoperator_saved_on] = useState("");
    const [operator_saved_by, setoperator_saved_by] = useState("");
    const [operator_saved_id, setoperator_saved_id] = useState(0);
    const [operator_submit_on, setoperator_submit_on] = useState("");
    const [emptyarraycheck, setemptyarraycheck] = useState("");
    const [operator_submit_by, setoperator_submit_by] = useState("");
    const [operator_submit_id, setoperator_submit_id] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [operator_sign, setoperator_sign] = useState("");
    const [supersigndate, setsupersigndate] = useState(false);
    const [operator_signsignaturedate, setoperator_signsignaturedate] = useState("");
    const [hodsign, sethodsigndate] = useState("");
    const [dateprint, setprintdate] = useState("");
    const numbers = [1, 2, 3];
    const [selectedRow, setSelectedRow] = useState(null);
    const finisharray = ['Crispy', 'Soft'];
    const [saveLoading, setSaveLoading] = useState(false);
    const [dateprintsec, setisdateprintsec] = useState(false);
    const roleBase = localStorage.getItem("role");
    const onChange = (key) => {
        // console.log(key);
    };
    const values_Specification = [
        { value: "1J6", label: "1J6" },
        { value: "1J7", label: "1J7" },
        { value: "1J18", label: "1J18" },
        { value: "2J14", label: "2J14" },
        { value: "NA", label:"NA"},
    ];
    const [saveBtnStatus, setSaveBtnStatus] = useState(true);
    const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const location = useLocation();

    const { state } = location;

    const { date, shift, order_no } = state || {};
    const datefomrat = moment(date).format("DD/MM/YYYY");
    // console.log("dateformat", datefomrat);
    // console.log("values", date, shift, order_no);
    const McNo = [1, 2, 3, 4, 5];
    // Function to handle submitting
    const isPrintEnabled =
        selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status === "HOD_APPROVED" && selectedRow?.operator_status === "QA_APPROVED";
    const handlechange_INJ_01 = (value) => {


        setINJ_01_Strip(value);
    };
    const handlechange_INJ_IPA_Strip = (value) => {


        setINJ_IPA_Strip(value);
    };
    const handlechange_INJ_11_Strip = (value) => {


        setINJ_11_Strip(value);
    };
    const handlechange_INJ_12_Strip = (value) => {


        setINJ_12_Strip(value);
    };
    const handlechange_INJ_21_Strip = (value) => {


        setINJ_21_Strip(value);
    };
    const handleChange = (event) => {
        setINJ_PW_Pressure(event.target.value);
        const value = event.target.value;
        if (value === "OK") {
            setINJ_PW_Pressure("N/A");
        } else {
            setINJ_PW_Pressure("OK")
        }
    };
    const handleKeyDown = (e) => {
        // Prevent entering 'e', '.', '-', '+', etc.
        if (
            e.key === 'e' || e.key === 'E' || e.key === '.' || e.key === '-' || e.key === '+'
        ) {
            e.preventDefault();
        }
    };
    const today = new Date().toISOString().split('T')[0];
    const containerStyle = {
        position: 'relative',
        marginLeft: isMobile ? '50px' : '60px',
    };
    const handleStartTimeBlur = () => {
        validateTimes(startTime, endTime);
    };
    const handleRejectModal = () => {
        setShowModal(true);
        // window.print()
        // console.log("print screen works");
        // Add any other print-related logic here
      };
    const handleLogout = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("You want to log out")) {
            navigate("/Precot");
        }
    };
    const validateTimes = (start, end) => {
        // console.log(start, end);

        const startMoment = moment(start, 'HH:mm');
        const endMoment = moment(end, 'HH:mm');

        if (startMoment.isSameOrAfter(endMoment)) {
            message.error("End time must be after start time.");
            setEndTime(''); // Reset end time if validation fails
        } else {
            // Clear error message if validation passes
        }



    };

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const canDisplayButtons = () => {
        if (roleBase === "ROLE_OPERATOR") {
          if (
            selectedRow &&
            selectedRow?.operator_status === "OPERATOR_APPROVED" &&
            selectedRow?.hod_status !== "HOD_REJECTED" &&
            selectedRow?.supervisor_status !== "SUPERVISOR_REJECTED"
          ) {
            return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
          }
          return "block";
        }
        else if (roleBase == "ROLE_SUPERVISOR") {
          if (
            selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
            selectedRow?.hod_status === "HOD_REJECTED"
          ) {
            return "block";
          } else if (
            (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
              selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
            selectedRow?.hod_status == "HOD_APPROVED"
          ) {
            return "none";
          } else if (
            (selectedRow?.supervisor_status == "SUPERVISOR_REJECTED" &&
              selectedRow?.hod_status == "WAITING_FOR_APPROVAL")
          ) {
            return "none";
          }
        } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
          if (
            selectedRow?.supervisor_status === "SUPERVISOR_REJECTED" ||
            selectedRow?.hod_status == "HOD_APPROVED" ||
            selectedRow?.hod_status == "HOD_REJECTED"
          ) {
            return "none";
          }
          return "block";
        } else {
          if (
            selectedRow?.hod_status == "HOD_APPROVED" ||
            selectedRow?.hod_status == "HOD_REJECTED"
          ) {
            return "none";
          }
          return "block";
        }
      };
      const canDisplayButton2 = () => {
        if (roleBase == "ROLE_OPERATOR") {
          if (
            selectedRow?.operator_status == "OPERATOR_APPROVED"
          ) {
            return "none"; 
          } else if (
            selectedRow?.operator_status == "OPERATOR_APPROVED" &&
            selectedRow?.supervisor_status == "WAITING_FOR_APPROVAL" &&
            (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
              selectedRow?.hod_status == "HOD_APPROVED")
          ) {
            return "none"; 
          }
        }
        if (roleBase == "ROLE_SUPERVISOR") {
          if (
            selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
            selectedRow?.hod_status == "HOD_REJECTED"
          ) {
            return "none"; 
          } else if (
            selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
            (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
              selectedRow?.hod_status == "HOD_APPROVED")
          ) {
            return "none"; 
          }
        } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
          if (
            selectedRow?.hod_status == "HOD_APPROVED" ||
            selectedRow?.hod_status == "HOD_REJECTED" ||
            emptyarraycheck == 0
          ) {
            return "none"; 
          }
          return "block"; 
        } else {
          if (
            selectedRow?.hod_status == "HOD_APPROVED" ||
            selectedRow?.hod_status == "HOD_REJECTED"
          ) {
            return "none"; 
          }
          return "block"; 
        }
      };
      const canEdit = () => {
        if (roleBase === "ROLE_OPERATOR") {
          return !(
            selectedRow &&
            selectedRow?.operator_status === "OPERATOR_APPROVED" &&
            selectedRow?.supervisor_status !== "SUPERVISOR_REJECTED" &&
            selectedRow?.hod_status !== "HOD_REJECTED"
          );
        } else if (roleBase === "ROLE_SUPERVISOR") {
          return !(
            selectedRow &&
            selectedRow?.operator_status === "OPERATOR_APPROVED" &&
            (selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" ||
              selectedRow?.supervisor_status === "WAITING_FOR_APPROVAL") &&
              selectedRow?.hod_status === "WAITING_FOR_APPROVAL" || "HOD_APPROVED"
          );
        } else if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
          return !(
            selectedRow &&
            (selectedRow?.hod_status === "HOD_APPROVED" ||
              selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
              selectedRow?.hod_status === "HOD_REJECTED")
          );
        } else {
          return false;
        }
      };
      const handleReject = async () => {
        setSaveLoading(true);
      
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Adjust content type if needed
        };
      
        const res = await axios
          .put(
            `${ API.prodUrl}/Precot/api/spulance/ProcessSetupJetLaceF003/approveOrReject`,
            {
              id: id,
              status: "Reject",
              remarks: rejectRemarks,
            },
            { headers }
          )
          .then((res) => {
            setLoading(false);
            // console.log("messsage", res.data.message);
            // window.location.reload();
            message.success(res.data.message);
            navigate("/Precot/Spunlace/F-03/Summary");
          })
          .catch((err) => {
            setLoading(false);
            // console.log("Err", err.response.data.message);
            message.error(err.response.data.message);
          })
          .finally(() => {
            setSaveLoading(false);
          });
      };
      const handleApprove = async () => {
        setSaveLoading(true);
      
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Adjust content type if needed
        };
      
        const res = await axios
          .put(
            `${ API.prodUrl}/Precot/api/spulance/ProcessSetupJetLaceF003/approveOrReject`,
            {
              id: id,
              status: "Approve",
            },
            { headers }
          )
          .then((res) => {
            setLoading(false);
            // console.log("messsage", res);
            // window.location.reload();
            message.success(res.data.message);
            navigate("/Precot/Spunlace/F-03/Summary");
          })
          .catch((err) => {
            setLoading(false);
            // console.log("Err", err.response.data.message);
            message.error(err.response.data.message);
          })
          .finally(() => {
            setSaveLoading(false);
          });
      };
      const isEditable = canEdit();
    const canDisplayPrint = () => {
        // console.log("ss", selectedRow?.supervisor_status);
        if (roleBase == "ROLE_SUPERVISOR") {
            if (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" && selectedRow?.operator_status == "OPERATOR_APPROVED" && selectedRow?.hod_status == "HOD_APPROVED") {
                return "block";
            }
            return "none";
        } else if (roleBase == "ROLE_OPERATOR") {
            if (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" && selectedRow?.operator_status == "OPERATOR_APPROVED" && selectedRow?.hod_status == "HOD_APPROVED") {
                return "block";
            }
            return "none";
        }
        else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
            if (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" && selectedRow?.operator_status == "OPERATOR_APPROVED" && selectedRow?.hod_status == "HOD_APPROVED") {
                return "block";
            }
            return "none";
        }

    }

 
    const beforeStyle = {
        content: isMobile ? '"Choose:"' : '"Select:"',
        zIndex: "9",

        position: 'absolute',
        backgroundColor: "#fafafa",
        border: "1px solid #dddd",
        left: "-45px",
        borderRadius: "5px 0px 1px 5px",
        top: '50%',
        padding: "7px",
        transform: 'translateY(-50%)',
        marginRight: '8px',
        fontSize: isMobile ? '12px' : '14px',
        color: isMobile ? '#f00' : '#000',
    };
    const beforeStyle_finish = {
        content: isMobile ? '"Choose:"' : '"Select:"',
        zIndex: "9",

        position: 'absolute',
        backgroundColor: "#fafafa",
        border: "1px solid #dddd",
        left: "-68px",
        borderRadius: "5px 0px 1px 5px",
        top: '50%',
        padding: "7px",
        transform: 'translateY(-50%)',
        marginRight: '8px',
        fontSize: isMobile ? '12px' : '14px',
        color: isMobile ? '#f00' : '#000',
    };
    const machineno_finish = {
        content: isMobile ? '"Choose:"' : '"Select:"',
        zIndex: "9",

        position: 'absolute',
        backgroundColor: "#fafafa",
        border: "1px solid #dddd",
        left: "-57px",
        borderRadius: "5px 0px 1px 5px",
        top: '50%',
        padding: "7px",
        transform: 'translateY(-50%)',
        marginRight: '8px',
        fontSize: isMobile ? '12px' : '14px',
        color: isMobile ? '#f00' : '#000',
    };


    const handleSubmit = async () => {
        try {
            sendProcessSetup2();

         

        } catch (error) {
            console.error("Error submitting bleaching job card:", error);
        }
    };
    const handlePrint = () => {
        window.print();
    };

 
    const handleKeyPress = (e) => {
        const allowedKeys = /[0-9.]/;
        const specialKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

        // Check if the pressed key is allowed
        if (!allowedKeys.test(e.key) && !specialKeys.includes(e.key)) {
            e.preventDefault();
            return;
        }


    };
    const handle_blur_J_1_Conveyor_speed = () => {
        if (J_1_Conveyor_speed < 0 || J_1_Conveyor_speed > 75) {
            message.error("Please enter a number between 0 and 75 for J-1 Conveyor speed");
            setJ_1_Conveyor_speed("");
        }
    };
    const handleInput_J_1_Conveyor_speed = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        // if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
        //     setJ_1_Conveyor_speed(inputValue);
        // }

        if ( inputValue.length <= 2) {
            setJ_1_Conveyor_speed(inputValue);
        }
    };
    const handleChange_J_1_Conveyor_speed = (e) => {
        const inputValue = e.target.value;

        // if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
        //     setJ_1_Conveyor_speed(inputValue);
        // }

        if (inputValue.length <= 2) {
            setJ_1_Conveyor_speed(inputValue);
        }
    };
    //
    const handle_blur_JP_Conveyor_speed = () => {
        if (JP_Conveyor_speed < 0 || JP_Conveyor_speed > 75) {
            message.error("Please enter a number between 0 and 75 for JP Conveyor speed");
            setJP_Conveyor_speed("");
        }
    };
    const handleInput_JP_Conveyor_speed = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 2) {
            setJP_Conveyor_speed(inputValue);
        }
    };
    const handleChange_JP_Conveyor_speed = (e) => {
        const inputValue = e.target.value;

        if ( inputValue.length <= 2) {
            setJP_Conveyor_speed(inputValue);
        }
    };
    const handle_blur_INJ_PW_Pressure = () => {
        if (INJ_PW_Pressure < 0 || INJ_PW_Pressure > 10) {
            message.error("Please enter a number between 0 and 10 for INJ-PW Pressure");
            setINJ_PW_Pressure("");
        }
    };
    const handleInput_INJ_PW_Pressure = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 2) {
            setINJ_PW_Pressure(inputValue);
        }
    };
    const handleChange_INJ_PW_Pressure = (e) => {
        const inputValue = e.target.value;

        if ( inputValue.length <= 2) {
            setINJ_PW_Pressure(inputValue);
        }
    };
    const handle_blur_INJ_01_Pressure = () => {
        if (INJ_01_Pressure < 0 || INJ_01_Pressure > 120) {
            message.error("Please enter a number between 0 and 120 for INJ-01 Pressure");
            setINJ_01_Pressure("");
        }
    };
    const handleInput_INJ_01_Pressure = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 2) {
            setINJ_01_Pressure(inputValue);
        }
    };
    const handle_blur_INJ_IPA_Pressure = () => {
        if (INJ_IPA_Pressure < 0 || INJ_IPA_Pressure > 120) {
            message.error("Please enter a number between 0 and 120 for INJ-IPA Pressure");
            setINJ_IPA_Pressure("");
        }
    };
    const handleInput_INJ_IPA_Pressure = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 2) {
            setINJ_IPA_Pressure(inputValue);
        }

    };
    const handle_blur_INJ_11_Pressure = () => {
        if (INJ_11_Pressure < 0 || INJ_11_Pressure > 120) {
            message.error("Please enter a number between 0  and 120 for INJ-11 Pressure");
            setINJ_11_Pressure("");
        }
    };
    const handleInput_INJ_11_Pressure = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 2) {
            setINJ_11_Pressure(inputValue);
        }

    };
    const handle_blur_INJ_12_Pressure = () => {
        if (INJ_12_Pressure < 0 || INJ_12_Pressure > 120) {
            message.error("Please enter a number between 0 and 120 for INJ-12 Pressure");
            setINJ_12_Pressure("");
        }
    };
    const handleInput_INJ_12_Pressure = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 2) {
            setINJ_12_Pressure(inputValue);
        }

    };
    const handle_blur_INJ_21_Pressure = () => {
        if (INJ_21_Pressure < 0 || INJ_21_Pressure > 120) {
            message.error("Please enter a number between 0 and 120 for INJ-21 Pressure");
            setINJ_21_Pressure("");
        }
    };
    const handleInput_IINJ_21_Pressure = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 2) {
            setINJ_21_Pressure(inputValue);
        }

    };
       const handle_blur_CPA_Drum_speed = () => {
        if (CPA_Drum_speed < 0 || CPA_Drum_speed > 80) {
            message.error("Please enter a number between 0 and 80 for  CPA Drum speed");
            setCPA_Drum_speed("");
        }
    };
    const handleInput_C_1_Drum_speed = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 5) {
            setC_1_Drum_speed(inputValue);
        }

    };
    const handle_blur_C_1_Drum_speed = () => {
        if (C_1_Drum_speed < 0 || C_1_Drum_speed > 80) {
            message.error("Please enter a number between 0 and 80 for  C-1 Drum_speed");
            setC_1_Drum_speed("");
        }
    };
    const handleInput_CPA_Drum_speed = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 5) {
            setCPA_Drum_speed(inputValue);
        }

    };
    const handle_blur_C_2_Drum_speed = () => {
        if (C_2_Drum_speed < 0 || C_2_Drum_speed > 80) {
            message.error("Please enter a number between 0 and 80 for  C-2 Drum_speed");
            setC_2_Drum_speed("");
        }
    };
    const handleInput_C_2_Drum_speed = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 5) {
            setC_2_Drum_speed(inputValue);
        }

    };
    const handle_blur_J2S_Conveyer_speed = () => {
        if (J2S_Conveyer_speed < 0 || J2S_Conveyer_speed > 80) {
            message.error("Please enter a number between 0 and 80 for J2S Conveyer speed");
            setJ2S_Conveyer_speed("");
        }
    };
    const handleInput_J2S_Conveyer_speed = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 5) {
            setJ2S_Conveyer_speed(inputValue);
        }

    };
    const handle_blur_MDU_TENSION_DRAFTA = () => {
        if (MDU_TENSION_DRAFTA < 0 || MDU_TENSION_DRAFTA > 120) {
            message.error("Please enter a number between 0 and 120 for  MDU TENSION DRAFT A");
            setMDU_TENSION_DRAFTA("");
        }
    };
    const handleInput_MDU_TENSION_DRAFTA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
   
            setMDU_TENSION_DRAFTA(inputValue);
         

    };
    const handle_blur_MDL_TENSION_DRAFTA = () => {
        if (MDL_TENSION_DRAFTA < 0 || MDL_TENSION_DRAFTA > 120) {
            message.error("Please enter a number between 0 and 120 for  MDL TENSION DRAFT A");
            setMDL_TENSION_DRAFTA("");
        }
    };
    const handleInput_MDL_TENSION_DRAFTA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
    //    if ( inputValue.length <= 3) {
            setMDL_TENSION_DRAFTA(inputValue);
      //  }

    };
    const handle_blur_MDL_SpeedA = () => {
        if (MDL_SpeedA < 0 || MDL_SpeedA > 120) {
            message.error("Please enter a number between 0 and 120 for  MDL TENSION DRAFT A");
            setMDL_SpeedA("");
        }
    };
    const handleInput_MDL_SpeedA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
      //  if ( inputValue.length <= 2) {
            setMDL_SpeedA(inputValue);
       // }

    };
    const handle_blur_MDL_SpeedB = () => {
        if (MDL_SpeedB < 0 || MDL_SpeedB > 120) {
            message.error("Please enter a number between 0 and 120 for  MDL Speed B");
            setMDL_SpeedB("");
        }
    };
    const handleInput_MDL_SpeedB = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
     //   if ( inputValue.length <= 2) {
            setMDL_SpeedB(inputValue);
       // }

    };
    //
    const handle_blur_MDU_SpeedA = () => {
        if (MDU_SpeedA < 0 || MDU_SpeedA > 120) {
            message.error("Please enter a number between 0 and 120 for  MDU SPEED A");
            setMDU_SpeedA("");
        }
    };
    const handleInput_MDU_SpeedA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
      //  if ( inputValue.length <= 2) {
            setMDU_SpeedA(inputValue);
        //}

    };
    const handle_blur_TTUA = () => {
        if (TTUA < 0 || TTUA > 200) {
            message.error("Please enter a number between 0 and 200 for  TTU A");
            setTTUA("");
        }
    };
    const handleInput_TTUA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
      //  if ( inputValue.length <= 3) {
            setTTUA(inputValue);
        //}

    };
    const handle_blur_TTUB = () => {
        if (TTUB < 0 || TTUB > 200) {
            message.error("Please enter a number between 145 and 190 for  TTU B");
            setTTUB("");
        }
    };
    const handleInput_TTUB= (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
       // if ( inputValue.length <= 3) {
            setTTUB(inputValue);
       // }

    };
    const handle_blur_TTLA = () => {
        if (TTLA < 0 || TTLA > 200) {
            message.error("Please enter a number between 145 and 190 for  TTL A");
            setTTLA("");
        }
    };
    const handleInput_TTLA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
       // if ( inputValue.length <= 3) {
            setTTLA(inputValue);
       // }

    };
    const handle_blur_TTLB = () => {
        if (TTLB < 0 || TTLB > 200) {
            message.error("Please enter a number between 145 and 190 for  TTL B");
            setTTLB("");
        }
    };
    const handleInput_TTLB = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
       // if ( inputValue.length <= 3) {
            setTTLB(inputValue);
       // }

    };
    const handle_blur_MFUA = () => {
        if (MFU_speedA < 50 || MFU_speedA > 100) {
            message.error("Please enter a number between 50 and 100 for  MFU SPEED A");
            setMFU_speedA("");
        }
    };
    const handleInput_MFUA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        //if ( inputValue.length <= 3) {
            setMFU_speedA(inputValue);
        //}

    };
    const handle_blur_MFUB = () => {
        if (MFU_speedB < 50 || MFU_speedB> 100) {
            message.error("Please enter a number between 50 and 100 for  MFU SPEED B");
            setMFU_speedB("");
        }
    };
    const handleInput_MFUB = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
     //   if ( inputValue.length <= 3) {
            setMFU_speedB(inputValue);
       // }

    };
    //
    const handle_blur_MFLA = () => {
        if (MFL_speedA < 50 || MFL_speedA > 100) {
            message.error("Please enter a number between 50 and 100 for  MFL Speed A");
            setMFL_speedA("");
        }
    };
    const handleInput_MFLA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        //if ( inputValue.length <= 3) {
            setMFL_speedA(inputValue);
        //}

    };
    const handle_blur_TOP_Damper_InletA = () => {
        if (TOP_Damper_InletA < 0 || TOP_Damper_InletA > 100) {
            message.error("Please enter a number between 0 and 100 for  TOP Damper Inlet A");
            setTOP_Damper_InletA("");
        }
    };
    const handleInput_TOP_Damper_InletA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
       // if ( inputValue.length <= 3) {
            setTOP_Damper_InletA(inputValue);
       // }

    };
    //
    const handle_blur_TOP_Damper_outletA = () => {
        if (TOP_Damper_outletA < 0 || TOP_Damper_outletA > 100) {
            message.error("Please enter a number between 0 and 100 for  TOP Damper Outlet A");
            setTOP_Damper_outletA("");
        }
    };
    const handleInput_TOP_Damper_outletA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
       // if ( inputValue.length <= 3) {
            setTOP_Damper_outletA(inputValue);
       // }

    };
    //
    const handle_blur_Bottom_Damper_InletA = () => {
        if (Bottom_Damper_InletA < 0 || Bottom_Damper_InletA > 100) {
            message.error("Please enter a number between 0 and 100 for  Bottom_Damper_Inlet A");
            setBottom_Damper_InletA("");
        }
    };
    const handleInput_Bottom_Damper_InletA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
       // if ( inputValue.length <= 3) {
            setBottom_Damper_InletA(inputValue);
       // }

    };
    //
    const handle_blur_Bottom_Damper_OutletA = () => {
        if (Bottom_Damper_OutletA < 0 || Bottom_Damper_OutletA > 100) {
            message.error("Please enter a number between 0 and 100 for  Bottom Damper Outlet A");
            setBottom_Damper_OutletA("");
        }
    };
    const handleInput_Bottom_Damper_OutletA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
       // if ( inputValue.length <= 3) {
            setBottom_Damper_OutletA(inputValue);
       // }

    };
    //
    const handle_blur_Boiler_TemperatureA = () => {
        if (Boiler_TemperatureA < 180 || Boiler_TemperatureA > 250) {
            message.error("Please enter a number between 180 and 250 for  Bottom_Damper_Outlet A");
            setBoiler_TemperatureA("");
        }
    };
    const handleInput_Boiler_TemperatureA = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        //if ( inputValue.length <= 3) {
            setBoiler_TemperatureA(inputValue);
       // }

    };
    //
    // const handle_blur_Boiler_TemperatureB = () => {
    //     if (Boiler_TemperatureB < 200 || Boiler_TemperatureB > 250) {
    //         message.error("Please enter a number between 200 and 250 for  Boiler Temperature B");
    //         setBoiler_TemperatureB("");
    //     }
    // };
    // const handleInput_Boiler_TemperatureB = (e) => {
    //     const inputValue = e.target.value;

    //     // Limit to two digits
    //     //if ( inputValue.length <= 3) {
    //         setBoiler_TemperatureB(inputValue);
    //   //  }

    // };
    //
    const handle_blur_Bottom_Damper_OutletB = () => {
        if (Bottom_Damper_OutletB < 0 || Bottom_Damper_OutletB > 100) {
            message.error("Please enter a number between 0 and 100 for  Bottom Damper Outlet B");
            setBottom_Damper_OutletB("");
        }
    };
    const handleInput_Bottom_Damper_OutletB = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
       // if ( inputValue.length <= 3) {
            setBottom_Damper_OutletB(inputValue);
        //}

    };
    //
    const handle_blur_Bottom_Damper_InletB = () => {
        if (Bottom_Damper_InletB < 0 || Bottom_Damper_InletB > 100) {
            message.error("Please enter a number between 0 and 100 for  Bottom Damper Inlet B");
            setBottom_Damper_InletB("");
        }
    };
    const handleInput_Bottom_Damper_InletB = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
       // if ( inputValue.length <= 3) {
            setBottom_Damper_InletB(inputValue);
       // }

    };
    //
    const handle_blur_TOP_Damper_outletB = () => {
        if (TOP_Damper_outletB < 0 || TOP_Damper_outletB > 100) {
            message.error("Please enter a number between 0 and 100 for  TOP Damper Outlet B");
            setTOP_Damper_outletB("");
        }
    };
    const handleInput_TOP_Damper_outletB = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
       // if ( inputValue.length <= 3) {
            setTOP_Damper_outletB(inputValue);
       // }

    };
    const handle_blur_TOP_Damper_InletB = () => {
        if (TOP_Damper_InletB < 0 || TOP_Damper_InletB > 100) {
            message.error("Please enter a number between 0 and 100 for  TOP Damper Inlet B");
            setTOP_Damper_InletB("");
        }
    };
    const handleInput_TOP_Damper_InletB = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
      //  if ( inputValue.length <= 3) {
            setTOP_Damper_InletB(inputValue);
       // }

    };
    const handle_blur_MFLB = () => {
        if (MFL_speedB < 50 || MFL_speedB > 100) {
            message.error("Please enter a number between 50 and 100 for  MFL Speed B");
            setMFL_speedB("");
        }
    };
    const handleInput_MFLB = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
      //  if ( inputValue.length <= 3) {
            setMFL_speedB(inputValue);
       // }

    };
    const handle_blur_MDU_SpeedB = () => {
        if (MDU_SpeedB < 0 || MDU_SpeedB > 120) {
            message.error("Please enter a number between 18 and 75 for  MDU Speed B");
            setMDU_SpeedB("");
        }
    };
    const handleInput_MDU_SpeedB = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        //if ( inputValue.length <= 2) {
            setMDU_SpeedB(inputValue);
        //}

    };
    const handle_blur_MDL_TENSION_DRAFTB = () => {
        if (MDL_TENSION_DRAFTB < 0 || MDL_TENSION_DRAFTB > 120) {
            message.error("Please enter a number between 0 and 120 for  MDU TENSION DRAFT B");
            setMDL_TENSION_DRAFTB("");
        }
    };
    const handleInput_MDL_TENSION_DRAFTB = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
       // if ( inputValue.length <= 3) {
            setMDL_TENSION_DRAFTB(inputValue);
       // }

    };
    const handle_blur_MDU_TENSION_DRAFTB = () => {
        if (MDU_TENSION_DRAFTB < 0 || MDU_TENSION_DRAFTB > 120) {
            message.error("Please enter a number between 85 and 120 for  MDU TENSION DRAFT B");
            setMDU_TENSION_DRAFTB("");
        }
    };
    const handleInput_MDU_TENSION_DRAFTB = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits

            setMDU_TENSION_DRAFTB(inputValue);
    

    };
    const handle_blur_INJ_PW_STRIP = () => {
        if (INJ_PW_STRIP < 2 || INJ_PW_STRIP > 9) {
            message.error("Please enter a number between 2 and 9 for INJ-PW STRIP");
            setINJ_PW_STRIP("");
        }
    };
    const handleInput_INJ_PW_STRIP = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 2) {
            setINJ_PW_STRIP(inputValue);
        }

    };
    const handle_blur_VACCUM = () => {
        if (VACCUM < 50 || VACCUM > 100) {
            message.error("Please enter a number between 50 and 100 for INJ-PW STRIP");
            setVACCUM("");
        }
    };
    const handleInput_VACCUM = (e) => {
        const inputValue = e.target.value;

        // Limit to two digits
        if ( inputValue.length <= 2) {
            setVACCUM(inputValue);
        }

    };


  
    

    const fetchDataOrderNodetails_f3 = async () => {
       
        try {
            setLoading(true);
            axios
                .get(
                    `${ API.prodUrl}/Precot/api/spulance/getdetailsbyParamF003?date=${date}&shift=${shift}&order_no=${order_no}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                  
                    // console.log("resvalue", res.data.length);
                 
                  
                   


                    if (res.data.length === 0 || res.data==undefined) {
                        // console.log('The array is empty');
                    } else {
                        // console.log('The array is not empty',res.data.operator_submitted_on);
                        if (res.data.hod_submit_on) {
                            const datePartsupervisor_submit_onvalue = res.data.hod_submit_on.split('T')[0];
                            const formattedHODSubmitted = moment(res.data.hod_submit_on).format("DD/MM/YYYY HH:mm");
                            sethodsigndate(formattedHODSubmitted);

                        } else {
                            sethodsigndate("");
                        }
                        if (res.data.supervisor_submit_on) {
                            const datePartsupervisor_submit_on = res.data.supervisor_submit_on.split('T')[0];
                            const formattedDatesupervisorSubmitted = moment( res.data.supervisor_submit_on).format("DD/MM/YYYY HH:mm");;
                            setsupersigndate(formattedDatesupervisorSubmitted);
                        } else {

                            setsupersigndate("");
                        }
                        if (res.data.operator_submitted_on) {
                            
                            const datePartsupervisor_submit_on = res.data.operator_submitted_on.split('T')[0];
                            const formattedDatesupervisorSubmitted = moment(res.data.operator_submitted_on).format("DD/MM/YYYY HH:mm");;
                            setoperator_signsignaturedate(formattedDatesupervisorSubmitted);
                        } else {

                            setoperator_signsignaturedate("");
                        }
                    }

                    if (res.data && ((res.data.length > 0 ) || (res.data.length==undefined) )) {
                       
                        const select = res.data;
                        console.log("value of payload",res.data.j1_conveyor_speed);
                       
                        setSelectedRow(res.data);
                        setid(res.data.process_id);
                        setMoisture(res.data.moisture);
                        setThickness(res.data.thickness);
                        setJ_1_Conveyor_speed(res.data.j1_conveyor_speed);
                        setJP_Conveyor_speed(res.data.jp_conveyor_speed);
                        setINJ_PW_Pressure(res.data.inj_pw_pressure);
                        setINJ_01_Pressure(res.data.inj_01_pressure);
                        setINJ_IPA_Pressure(res.data.inj_ipa_pressure);
                        setINJ_11_Pressure(res.data.inj_11_pressure);
                        setINJ_12_Pressure(res.data.inj_12_pressure);
                        setINJ_21_Pressure(res.data.inj_21_pressure);
                        setINJ_PW_STRIP(res.data.inj_pw_strip);
                        setVACCUM(res.data.vaccum);
                        setINJ_01_Strip(res.data.inj_01_strip_specification);
                        setINJ_IPA_Strip(res.data.inj_ipa_strip_specification);
                        setINJ_11_Strip(res.data.inj_11_strip_specification);
                        setINJ_12_Strip(res.data.inj_12_strip_specification);
                        setINJ_21_Strip(res.data.inj_21_strip_specification);
                        setCPA_Drum_speed(res.data.cpa_drum_speed);
                        setC_1_Drum_speed(res.data.c1_drum_speed);
                        setC_2_Drum_speed(res.data.c2_drum_speed);
                        setJ2S_Conveyer_speed(res.data.j2s_conveyer_speed);
                        setMDU_TENSION_DRAFTA(res.data.mdu_tension_draft_a);
                        setMDU_TENSION_DRAFTB(res.data.mdu_tension_draft_b);
                        setMDL_TENSION_DRAFTA(res.data.mdl_tension_draft_a);
                        setMDL_TENSION_DRAFTB(res.data.mdl_tension_draft_b);
                        setMDL_SpeedA(res.data.mdl_speed_a);
                        setMDL_SpeedB(res.data.mdl_speed_b);
                        setMDU_SpeedA(res.data.mdu_speed_a);
                        setMDU_SpeedB(res.data.mdu_speed_b);
                        setTTUA(res.data.ttu_a);
                        setTTUB(res.data.ttu_b);
                        setTTLA(res.data.ttl_a);
                        setTTLB(res.data.ttl_b);
                        setMFL_speedA(res.data.mfl_speed_a);
                        setMFL_speedB(res.data.mfl_speed_b);
                        setMFU_speedA(res.data.mfu_speed_a);
                        setMFU_speedB(res.data.mfu_speed_b);
                        setTOP_Damper_InletA(res.data.top_damper_inlet_a);
                        setTOP_Damper_InletB(res.data.top_damper_inlet_b);
                        setTOP_Damper_outletA(res.data.top_damper_outlet_a);
                        setTOP_Damper_outletB(res.data.top_damper_outlet_b);
                        setBottom_Damper_InletA(res.data.bottom_damper_inlet_a);
                        setBottom_Damper_InletB(res.data.bottom_damper_inlet_b);
                        setBottom_Damper_OutletA(res.data.bottom_damper_outlet_a);
                        setBottom_Damper_OutletB(res.data.bottom_damper_outlet_b);
                        setBoiler_TemperatureA(res.data.boiler_temperature_a);
                        // setBoiler_TemperatureB(res.data.boiler_temperature_b);
                        setmail_status(res.data.mail_status);
                        setsupervisor_status(res.data.supervisor_status);
                        setsupervisor_saved_on(res.data.supervisor_save_on);
                        setssupervisor_saved_by(res.data.supervisor_save_by);
                        setssupervisor_saved_id(res.data.supervisor_save_id);
                        setsupervisor_submit_on(res.data.supervisor_submit_on);
                        setsupervisor_submit_by(res.data.supervisor_submit_by);
                        setsupervisor_submit_id(res.data.supervisor_submit_id);
                        setsupervisor_sign(res.data.supervisor_sign);
                        sethod_status(res.data.hod_status);
                        sethod_saved_on(res.data.hod_save_on);
                        sethod_saved_by(res.data.hod_save_by);
                        sethod_saved_id(res.data.hod_save_id);
                        sethod_submit_on(res.data.hod_submit_on);
                        sethod_submit_by(res.data.hod_submit_by);
                        sethod_submit_id(res.data.hod_submit_id);
                        sethod_sign(res.data.hod_sign);
                        setoperator_status(res.data.operator_status);
                        setoperator_saved_on(res.data.operator_save_on);
                        setoperator_saved_by(res.data.operator_save_by);
                        setoperator_saved_id(res.data.operator_save_id);
                        setoperator_submit_on(res.data.operator_submit_on);
                        setoperator_submit_by(res.data.operator_submit_by);
                        setoperator_submit_id(res.data.operator_submit_id);
                        setoperator_sign(res.data.operator_sign);
    
    
                        if (roleBase === "ROLE_SUPERVISOR") {
                            if (
                              res.data?.supervisor_status === "SUPERVISOR_REJECTED" ||
                              res.data?.hod_status === "HOD_REJECTED"
                            ) {
                              message.warning("Operator Not Yet Approved or Previous Stage Rejected");
                              setTimeout(() => {
                                navigate('/Precot/Spunlace/F-03/Summary');
                              }, 1500);
                            }
                          }
              
                          if (roleBase === "ROLE_HOD" || roleBase === "ROLE_DESIGNEE") {
                            if (
                              res.data?.operator_status !== "OPERATOR_APPROVED" ||
                              res.data?.supervisor_status !== "SUPERVISOR_APPROVED" ||
                              res.data?.supervisor_status === "SUPERVISOR_REJECTED" ||
                              res.data?.hod_status === "HOD_REJECTED"
                            ) {
                              message.warning("Operator Not Yet Approved or Previous Stage Rejected");
                              setTimeout(() => {
                                navigate('/Precot/Spunlace/F-03/Summary');
                              }, 1500);
                            }
                          }
              
    
    
                        // console.log("value of res ", res.data.length);
                        setemptyarraycheck(res.data.length);
                     
                       
                 //op image
                 axios
        .get(
          `${ API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.operator_sign}`,
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
          setGetImageOP(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
                 //
       //Sup image
       axios
       .get(
         `${ API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.supervisor_sign}`,
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
         setGetImageSUP(url);
       })
       .catch((err) => {
         // console.log("Error in fetching image:", err);
       });
                //

                 //Sup image
       axios
       .get(
         `${ API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.hod_sign}`,
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
         setGetImageHOD(url);
       })
       .catch((err) => {
         // console.log("Error in fetching image:", err);
       });
                //   

                    } else { }




                    
                });

            // Assuming the response data structure matches the payload structure you provided
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchDatabatchByBleach = async () => {
        try {
            setLoading(true);
            axios
                .get(
                    `${ API.prodUrl}/Precot/api/bleaching/summary/batchByBleach?bmr_no=${order_no}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    // // console.log("Shift details fetched:", res.data);
                    const data = res.data.map((laydownno) => laydownno.value);
                    setbatchno(data);

                });


        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    const handleBack = () => {
        navigate("/Precot/Spunlace/F-03/Summary");
    };

    const sendProcessSetup = () => {
        const isValid = () => {
           
            if (!Moisture) return "Moisture is required";
            if (!Thickness) return "Thickness No is required";
          
            return null;
        };
        const validationMessage = isValid();
        if (validationMessage) {
            message.error(validationMessage);
            return;
        }
        setSaveLoading(true);
       
        // Format the payload according to the API documentation
        const payload = {
            process_id: id,
            unit: "Unit H",          
            formatName:"PROCESS SETUP DETAILS JETLACE & DRYER ",
           formatNo:"PH-PRD02/F-003",
           sopNumber:"PH-PRD02-D-03",           
           revisionNo: "01",

            date: date,
            shift: shift,
            order_no: order_no,
            mixing: Mixing,
            customer_name: customername,
            std_gsm: STD_GSM,
            width:width,
            pattern: Pattern,
            moisture: Moisture,
            thickness:Thickness,
            j1_conveyor_speed:  J_1_Conveyor_speed === "" ? "NA" : J_1_Conveyor_speed,
            jp_conveyor_speed: JP_Conveyor_speed === "" ? "NA" : JP_Conveyor_speed,
            inj_pw_pressure: INJ_PW_Pressure === "" ? "NA" : INJ_PW_Pressure,
            inj_01_pressure: INJ_01_Pressure === "" ? "NA" : INJ_01_Pressure,
            inj_ipa_pressure: INJ_IPA_Pressure === "" ? "NA" : INJ_IPA_Pressure,
            inj_11_pressure: INJ_11_Pressure === "" ? "NA" : INJ_11_Pressure ,
            inj_12_pressure: INJ_12_Pressure === "" ? "NA" : INJ_12_Pressure,
            inj_21_pressure: INJ_21_Pressure === "" ? "NA" : INJ_21_Pressure,
            inj_pw_strip: INJ_PW_STRIP === "" ? "NA" : INJ_PW_STRIP,
            vaccum: VACCUM === "" ? "NA" : VACCUM,
            inj_01_strip_specification: INJ_01_Strip === "" ? "NA" : INJ_01_Strip,
            inj_ipa_strip_specification: INJ_IPA_Strip === "" ? "NA" : INJ_IPA_Strip,
            inj_11_strip_specification: INJ_11_Strip === "" ? "NA" : INJ_11_Strip,
            inj_12_strip_specification: INJ_12_Strip === "" ? "NA" : INJ_12_Strip,
            inj_21_strip_specification: INJ_21_Strip === "" ? "NA" : INJ_21_Strip,
            cpa_drum_speed: CPA_Drum_speed === "" ? "NA" : CPA_Drum_speed,
            c1_drum_speed: C_1_Drum_speed === "" ? "NA" : C_1_Drum_speed,
            c2_drum_speed: C_2_Drum_speed === "" ? "NA" : C_2_Drum_speed,
            j2s_conveyer_speed:J2S_Conveyer_speed === "" ? "NA" : J2S_Conveyer_speed,
            mdu_tension_draft_a: MDU_TENSION_DRAFTA === "" ? "NA":MDU_TENSION_DRAFTA,
            mdl_tension_draft_a: MDL_TENSION_DRAFTA === "" ? "NA" : MDL_TENSION_DRAFTA,
            mdl_speed_a: MDL_SpeedA === "" ? "NA" : MDL_SpeedA,
            mdu_speed_a: MDU_SpeedA === "" ? "NA" : MDU_SpeedA,
            ttu_a: TTUA === "" ? "NA" : TTUA,
            ttl_a: TTLA === "" ? "NA" : TTLA,
            mfu_speed_a: MFU_speedA === "" ? "NA" : MFU_speedA,
            mfl_speed_a: MFL_speedA === "" ? "NA" : MFL_speedA,
            top_damper_inlet_a: TOP_Damper_InletA === "" ? "NA" : TOP_Damper_InletA,
            top_damper_outlet_a: TOP_Damper_outletA === "" ? "NA" : TOP_Damper_outletA,
            bottom_damper_inlet_a: Bottom_Damper_InletA === "" ? "NA" : Bottom_Damper_InletA,
            bottom_damper_outlet_a: Bottom_Damper_OutletA === "" ? "NA" : Bottom_Damper_OutletA,
            boiler_temperature_a: Boiler_TemperatureA === "" ? "NA" : Boiler_TemperatureA,
            mdu_tension_draft_b: MDU_TENSION_DRAFTB === "" ? "NA" : MDU_TENSION_DRAFTB,
            mdl_tension_draft_b: MDL_TENSION_DRAFTB === "" ? "NA" : MDL_TENSION_DRAFTB, 
            mdl_speed_b: MDL_SpeedB === "" ? "NA" : MDL_SpeedB,
            mdu_speed_b: MDU_SpeedB === "" ? "NA" : MDU_SpeedB,
            ttu_b: TTUB === "" ? "NA" : TTUB,
            ttl_b: TTLB === "" ? "NA" : TTLB,
            mfu_speed_b: MFU_speedB === "" ? "NA" : MFU_speedB,
            mfl_speed_b: MFL_speedB === "" ? "NA" : MFL_speedB,
            top_damper_inlet_b: TOP_Damper_InletB === "" ? "NA" : TOP_Damper_InletB,
            top_damper_outlet_b: TOP_Damper_outletB === "" ? "NA" : TOP_Damper_outletB,
            bottom_damper_inlet_b: Bottom_Damper_InletB === "" ? "NA":Bottom_Damper_InletB,
            bottom_damper_outlet_b: Bottom_Damper_OutletB === "" ? "NA" : Bottom_Damper_OutletB,
            // boiler_temperature_b: Boiler_TemperatureB === "" ? "NA" : Boiler_TemperatureB,


            supervisor_status: supervisor_status,
            supervisor_save_on: supervisor_saved_on,
            supervisor_save_by: supervisor_saved_by,
            supervisor_save_id: supervisor_saved_id,
            supervisor_submit_on: supervisor_submit_on,
            supervisor_submit_by: supervisor_submit_by,
            supervisor_submit_id: supervisor_submit_id,
            supervisor_sign: supervisor_sign,
            hod_status: hod_status,
            hod_save_on: hod_saved_on,
            hod_save_by: hod_saved_by,
            hod_save_id: hod_saved_id,
            hod_submit_on: hod_submit_on,
            hod_submit_by: hod_submit_by,
            hod_submit_id: hod_submit_id,
            hod_sign: hod_sign,
            operator_status: operator_status,
            operator_save_on: operator_saved_on,
            operator_save_by: operator_saved_by,
            operator_save_id: operator_saved_id,
            operator_submit_on: operator_submit_on,
            operator_submit_by: operator_submit_by,
            operator_submit_id: operator_submit_id,
            operator_sign: operator_sign
        };

        // Make the POST request to the API endpoint
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adjust content type if needed
        };

        // Make the POST request to the API endpoint with headers
        axios.post(
            `${ API.prodUrl}/Precot/api/spulance/saveProcessSetupJetLaceF003`,
            payload,
            { headers }
        ).then((res) => {
            setSaveLoading(false);
            message.success("Form Saved Successfully");
           // fetchDataOrderNodetails_f3();
            // console.log("messsage", res);
            navigate("/Precot/Spunlace/F-03/Summary");
            // message.success("LaydownChecklist Submitted successfully");

        }).catch((err) => {
            setSaveLoading(false);

            message.error(err.response.data.message);
        }).finally(() => {
            setSaveLoading(false);
        })
    };

    const handleSave = async () => {
     
        // Here you can add your logic for saving the data
        try {
            sendProcessSetup();

            setSaveBtnStatus(true);  // Example to disable after saving
            setSubmitBtnStatus(true);
            // alert("Bleaching job card Saved successfully!");
            //  message.success("Bleaching job card Saved successfully!");
        } catch (error) {
            console.error("Error submitting bleaching job card:", error);
        }
    };

    //SAve API

    const sendProcessSetup2 = () => {
        const isValid = () => {
          
            if (!Moisture) return "Moisture is required";
            
            if (!Thickness) return "Thickness is required";
            if (!J_1_Conveyor_speed) return "J_1 Conveyor speed is required";
            if (!JP_Conveyor_speed) return "JP Conveyor speed No is required";
            if (!INJ_PW_Pressure) return "INJPW Pressure No is required";
            if (!INJ_01_Pressure) return "INJ_01_Pressure Time is required";
            if (!INJ_IPA_Pressure) return "INJ_IPA_Pressure Time is required";
            if (!INJ_11_Pressure) return "INJ_11_Pressure is required";
            if (!INJ_12_Pressure) return "INJ_12_Pressure is required";
            if (!INJ_21_Pressure) return "INJ_21_Pressure One is required";
            if (!INJ_PW_STRIP) return "INJ_PW_STRIP Two is required";
            if (!VACCUM) return "VACCUM is required";
            if (!INJ_01_Strip) return "INJ_01_Strip is required";
            if (!INJ_IPA_Strip) return "INJ_IPA_Strip are required";
            if (!INJ_11_Strip) return "INJ_11_Strip is required";
            if (!INJ_12_Strip) return "INJ_12_Strip is required";
            if (!INJ_21_Strip) return "INJ_21_Strip is required";
            if (!CPA_Drum_speed) return "CPA_Drum_speed is required";
            if (!C_1_Drum_speed) return "C_1_Drum_speed is required";
             if (!C_2_Drum_speed) return "C_2_Drum_speed are required";
            if (!J2S_Conveyer_speed) return "J2S_Conveyer_speed is required";
           
            if (!MDU_TENSION_DRAFTA) return "MDU_TENSION_DRAFTA is required";
            if (!MDL_TENSION_DRAFTA) return "MDL_TENSION_DRAFTAis required";
            if (!MDL_SpeedA) return "MDL_SpeedA is required";
            if (!MDU_SpeedA) return "MDU_SpeedA is required";
            if (!TTUA) return "TTUA is required";
            if (!TTLA) return "TTLA is required";
            if (!MFU_speedA) return "MFU_speedA is required";
            if (!MFL_speedA) return "MFL_speedA is required";
            if (!TOP_Damper_InletA) return "TOP_Damper_InletA is required";
            if (!TOP_Damper_outletA) return "TOP_Damper_outletAis required";
            if (!Bottom_Damper_InletA) return "Bottom_Damper_InletA is required";
             if (!Bottom_Damper_OutletA) return "Bottom_Damper_OutletA  is required";
             if (!Boiler_TemperatureA) return "Boiler_TemperatureA is required";
             if (!MDU_TENSION_DRAFTB) return "MDU_TENSION_DRAFTB is required";
             if (!MDL_TENSION_DRAFTB) return "MDU_TENSION_DRAFTB is required";
             if (!MDL_SpeedB) return "MDU_TENSION_DRAFTB is required";
             if (!MDU_SpeedB) return "MDU_SpeedB is required";
             if (!TTUB) return "TTUB is required";
             if (!TTLB) return "TTLB is required";
             if (!MFU_speedB) return "MFU_speedB is required";
             if (!MFL_speedB) return "MFL_speedB is required";
             if (!TOP_Damper_InletB) return "TOP_Damper_InletB is required";
             if (!TOP_Damper_outletB) return "TOP_Damper_outletB is required";
             if (!Bottom_Damper_InletB) return "Bottom_Damper_InletB is required";
             if (!Bottom_Damper_OutletB) return "Bottom_Damper_OutletB is required";
            //  if (!Boiler_TemperatureB) return "Boiler_TemperatureB is required";

            return null;
        };
        const validationMessage = isValid();
        if (validationMessage) {
            message.error(validationMessage);
            return;
        }
        setSaveLoading(true);
        const remarkToSave = CH_remark.trim() === "" ? "N/A" : CH_remark;
        // Format the payload according to the API documentation
        const payload = {
            process_id: id,
            unit: "Unit H",          
            formatName:"PROCESS SETUP DETAILS JETLACE & DRYER ",
           formatNo:"PH-PRD02/F-003",
           sopNumber:"PH-PRD02-D-03",           
           revisionNo: "01",

            date: date,
            shift: shift,
            order_no: order_no,
            mixing: Mixing,
            customer_name: customername,
            std_gsm: STD_GSM,
            width:width,
            pattern: Pattern,
            moisture: Moisture,
            thickness:Thickness,
            // j1_conveyor_speed: J_1_Conveyor_speed,
            // jp_conveyor_speed: JP_Conveyor_speed,
            // inj_pw_pressure: INJ_PW_Pressure,
            // inj_01_pressure: INJ_01_Pressure,
            // inj_ipa_pressure: INJ_IPA_Pressure,
            // inj_11_pressure: INJ_11_Pressure,
            // inj_12_pressure: INJ_12_Pressure,
            // inj_21_pressure: INJ_21_Pressure,
            // inj_pw_strip: INJ_PW_STRIP,
            // vaccum: VACCUM,
            // inj_01_strip_specification: INJ_01_Strip,
            // inj_ipa_strip_specification: INJ_IPA_Strip,
            // inj_11_strip_specification: INJ_11_Strip ,
            // inj_12_strip_specification: INJ_12_Strip,
            // inj_21_strip_specification: INJ_21_Strip,
            // cpa_drum_speed: CPA_Drum_speed,
            // c1_drum_speed: C_1_Drum_speed,
            // c2_drum_speed: C_2_Drum_speed,
            // j2s_conveyer_speed:J2S_Conveyer_speed,
            // mdu_tension_draft_a: MDU_TENSION_DRAFTA,
            // mdl_tension_draft_a: MDL_TENSION_DRAFTA,
            // mdl_speed_a: MDL_SpeedA,
            // mdu_speed_a: MDU_SpeedA,
            // ttu_a: TTUA,
            // ttl_a: TTLA,
            // mfu_speed_a: MFU_speedA,
            // mfl_speed_a: MFL_speedA,
            // top_damper_inlet_a: TOP_Damper_InletA,
            // top_damper_outlet_a: TOP_Damper_outletA,
            // bottom_damper_inlet_a: Bottom_Damper_InletA,
            // bottom_damper_outlet_a: Bottom_Damper_OutletA,
            // boiler_temperature_a: Boiler_TemperatureA,
            // mdu_tension_draft_b: MDU_TENSION_DRAFTB,
            // mdl_tension_draft_b: MDL_TENSION_DRAFTB,
            // mdl_speed_b: MDL_SpeedB,
            // mdu_speed_b: MDU_SpeedB,
            // ttu_b: TTUB,
            // ttl_b: TTLB,
            // mfu_speed_b: MFU_speedB,
            // mfl_speed_b: MFL_speedB,
            // top_damper_inlet_b: TOP_Damper_InletB,
            // top_damper_outlet_b: TOP_Damper_outletB,
            // bottom_damper_inlet_b: Bottom_Damper_InletB,
            // bottom_damper_outlet_b: Bottom_Damper_OutletB,
            // boiler_temperature_b: Boiler_TemperatureB,

            j1_conveyor_speed:  J_1_Conveyor_speed === "" ? "NA" : J_1_Conveyor_speed,
            jp_conveyor_speed: JP_Conveyor_speed === "" ? "NA" : JP_Conveyor_speed,
            inj_pw_pressure: INJ_PW_Pressure === "" ? "NA" : INJ_PW_Pressure,
            inj_01_pressure: INJ_01_Pressure === "" ? "NA" : INJ_01_Pressure,
            inj_ipa_pressure: INJ_IPA_Pressure === "" ? "NA" : INJ_IPA_Pressure,
            inj_11_pressure: INJ_11_Pressure === "" ? "NA" : INJ_11_Pressure ,
            inj_12_pressure: INJ_12_Pressure === "" ? "NA" : INJ_12_Pressure,
            inj_21_pressure: INJ_21_Pressure === "" ? "NA" : INJ_21_Pressure,
            inj_pw_strip: INJ_PW_STRIP === "" ? "NA" : INJ_PW_STRIP,
            vaccum: VACCUM === "" ? "NA" : VACCUM,
            inj_01_strip_specification: INJ_01_Strip === "" ? "NA" : INJ_01_Strip,
            inj_ipa_strip_specification: INJ_IPA_Strip === "" ? "NA" : INJ_IPA_Strip,
            inj_11_strip_specification: INJ_11_Strip === "" ? "NA" : INJ_11_Strip,
            inj_12_strip_specification: INJ_12_Strip === "" ? "NA" : INJ_12_Strip,
            inj_21_strip_specification: INJ_21_Strip === "" ? "NA" : INJ_21_Strip,
            cpa_drum_speed: CPA_Drum_speed === "" ? "NA" : CPA_Drum_speed,
            c1_drum_speed: C_1_Drum_speed === "" ? "NA" : C_1_Drum_speed,
            c2_drum_speed: C_2_Drum_speed === "" ? "NA" : C_2_Drum_speed,
            j2s_conveyer_speed:J2S_Conveyer_speed === "" ? "NA" : J2S_Conveyer_speed,
            mdu_tension_draft_a: MDU_TENSION_DRAFTA === "" ? "NA":MDU_TENSION_DRAFTA,
            mdl_tension_draft_a: MDL_TENSION_DRAFTA === "" ? "NA" : MDL_TENSION_DRAFTA,
            mdl_speed_a: MDL_SpeedA === "" ? "NA" : MDL_SpeedA,
            mdu_speed_a: MDU_SpeedA === "" ? "NA" : MDU_SpeedA,
            ttu_a: TTUA === "" ? "NA" : TTUA,
            ttl_a: TTLA === "" ? "NA" : TTLA,
            mfu_speed_a: MFU_speedA === "" ? "NA" : MFU_speedA,
            mfl_speed_a: MFL_speedA === "" ? "NA" : MFL_speedA,
            top_damper_inlet_a: TOP_Damper_InletA === "" ? "NA" : TOP_Damper_InletA,
            top_damper_outlet_a: TOP_Damper_outletA === "" ? "NA" : TOP_Damper_outletA,
            bottom_damper_inlet_a: Bottom_Damper_InletA === "" ? "NA" : Bottom_Damper_InletA,
            bottom_damper_outlet_a: Bottom_Damper_OutletA === "" ? "NA" : Bottom_Damper_OutletA,
            boiler_temperature_a: Boiler_TemperatureA === "" ? "NA" : Boiler_TemperatureA,
            mdu_tension_draft_b: MDU_TENSION_DRAFTB === "" ? "NA" : MDU_TENSION_DRAFTB,
            mdl_tension_draft_b: MDL_TENSION_DRAFTB === "" ? "NA" : MDL_TENSION_DRAFTB, 
            mdl_speed_b: MDL_SpeedB === "" ? "NA" : MDL_SpeedB,
            mdu_speed_b: MDU_SpeedB === "" ? "NA" : MDU_SpeedB,
            ttu_b: TTUB === "" ? "NA" : TTUB,
            ttl_b: TTLB === "" ? "NA" : TTLB,
            mfu_speed_b: MFU_speedB === "" ? "NA" : MFU_speedB,
            mfl_speed_b: MFL_speedB === "" ? "NA" : MFL_speedB,
            top_damper_inlet_b: TOP_Damper_InletB === "" ? "NA" : TOP_Damper_InletB,
            top_damper_outlet_b: TOP_Damper_outletB === "" ? "NA" : TOP_Damper_outletB,
            bottom_damper_inlet_b: Bottom_Damper_InletB === "" ? "NA":Bottom_Damper_InletB,
            bottom_damper_outlet_b: Bottom_Damper_OutletB === "" ? "NA" : Bottom_Damper_OutletB,
            // boiler_temperature_b: Boiler_TemperatureB === "" ? "NA" : Boiler_TemperatureB,
            supervisor_status: supervisor_status,
            supervisor_save_on: supervisor_saved_on,
            supervisor_save_by: supervisor_saved_by,
            supervisor_save_id: supervisor_saved_id,
            supervisor_submit_on: supervisor_submit_on,
            supervisor_submit_by: supervisor_submit_by,
            supervisor_submit_id: supervisor_submit_id,
            supervisor_sign: supervisor_sign,
            hod_status: hod_status,
            hod_save_on: hod_saved_on,
            hod_save_by: hod_saved_by,
            hod_save_id: hod_saved_id,
            hod_submit_on: hod_submit_on,
            hod_submit_by: hod_submit_by,
            hod_submit_id: hod_submit_id,
            hod_sign: hod_sign,
            operator_status: operator_status,
            operator_save_on: operator_saved_on,
            operator_save_by: operator_saved_by,
            operator_save_id: operator_saved_id,
            operator_submit_on: operator_submit_on,
            operator_submit_by: operator_submit_by,
            operator_submit_id: operator_submit_id,
            operator_sign: operator_sign
        };

        // Make the POST request to the API endpoint
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adjust content type if needed
        };

        // Make the POST request to the API endpoint with headers
        axios.post(
            `${ API.prodUrl}/Precot/api/spulance/submitProcessSetupJetLaceF003`,
            payload,
            { headers }
        ).then((res) => {
            // setSaveLoading(false);
            message.success("Form Submitted Succcessfully");
            // console.log("messsage", res);
            fetchDataOrderNodetails_f3();
            // message.success("LaydownChecklist Submitted successfully");
            navigate("/Precot/Spunlace/F-03/Summary");
        }).catch((err) => {
            // setSaveLoading(false);

            message.error(err.response.data.message);
        }).finally(() => {
            setSaveLoading(false);
        })



    };
    // const roleBase = localStorage.getItem("role");
    useEffect(() => {
        if (!initial.current) {
            initial.current = true;
        fetchDatabatchByOrderdetails();      
    
        fetchDataOrderNodetails_f3();
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial window size

        axios
            .get(
                `${ API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                // console.log("Shift details fetched:", res.data);
                const shifts = res.data.map((shift) => shift.value);
                setAvailableShifts(shifts);
            })
        }
    }, []);
    const fetchDatabatchByOrderdetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${ API.prodUrl}/Precot/api/spulance/orderDetails?order=${order_no}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = response.data.map((laydownno) => laydownno.value);
            setOrderNo(data);
            // console.log("orderNo", response.data[0]);
            setcustomername(response.data[0].customerName);
            setMixing(response.data[0].mix);
            setSTD_GSM(response.data[0].gsm);
            setwidth(response.data[0].width);
           // setMoisture(response.data[0].moisture);
           // setThickness(response.data[0].thickness);
            setMaterial(response.data[0].material);
            setpattern(response.data[0].patternDescription);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const items = [
        {
            key: "1",
            label: <p>PROCESS SETUP VERIFICATION OPENING LINE -1</p>,
            children: (
                <div style={{ width: "100%" }}>
                    <table style={{ borderCollapse: "collapse", border: "1px solid #0000", padding: "5px" }}  >
                        <thead>
                            <th colSpan={5}>Descriptions</th>
                            <th colSpan={5}>Standards</th>
                            <th colSpan={5}>Units</th>
                            <th colSpan={5}>Set Parameters</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>  J-1 Conveyor speed </td>
                                <td colSpan={5} style={{ textAlign: "center" }}>0 -75</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>MPM </td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={J_1_Conveyor_speed}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_J_1_Conveyor_speed}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_J_1_Conveyor_speed}
                                    onChange={handleChange_J_1_Conveyor_speed}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>JP Conveyor speed</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>0 -75</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>MPM</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={JP_Conveyor_speed}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_JP_Conveyor_speed}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_JP_Conveyor_speed}
                                    onChange={handleChange_JP_Conveyor_speed}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-PW Pressure</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>0 -10</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>BAR</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={INJ_PW_Pressure}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_PW_Pressure}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_INJ_PW_Pressure}
                                    onChange={handleChange_INJ_PW_Pressure}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-01 Pressure</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>0-120</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>BAR</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={INJ_01_Pressure}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_01_Pressure}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_INJ_01_Pressure}
                                    onChange={handleInput_INJ_01_Pressure}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-IPA Pressure</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>0-120</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>BAR</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={INJ_IPA_Pressure}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_IPA_Pressure}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_INJ_IPA_Pressure}
                                    onChange={handleInput_INJ_IPA_Pressure}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-11 Pressure</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>0-120</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>BAR</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={INJ_11_Pressure}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_11_Pressure}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_INJ_11_Pressure}
                                    onChange={handleInput_INJ_11_Pressure}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-12 Pressure</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>0-120</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>BAR</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={INJ_12_Pressure}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_12_Pressure}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_INJ_12_Pressure}
                                    onChange={handleInput_INJ_12_Pressure}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-21 Pressure</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>0-120</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>BAR</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={INJ_21_Pressure}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_21_Pressure}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_IINJ_21_Pressure}
                                    onChange={handleInput_IINJ_21_Pressure}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-PW STRIP Specification</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>2T9</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>NA</td>
                                <td style={{ textAlign: "center" }} colSpan={5}>
                                     {/* <Input
                                    type="text"
                                    value={INJ_PW_STRIP}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_PW_STRIP}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_INJ_PW_STRIP}
                                    onChange={handleInput_INJ_PW_STRIP}
                                    disabled={!isEditable}
                                /> */}
                                2T9
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>VACCUM</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>60-94</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>%</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={VACCUM}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_VACCUM}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_VACCUM}
                                    onChange={handleInput_VACCUM}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            ),
        },
        {
            key: "2",
            label: <p>PROCESS SETUP VERIFICATION OPENING LINE -2</p>,
            children: (
                <div style={{ width: "100%" }}>
                    <table style={{ borderCollapse: "collapse", border: "1px solid black", width: "100%" }}>
                        <thead>
                            <th colSpan={5}>Descriptions</th>
                            <th colSpan={5}>Standards</th>
                            <th colSpan={5}>Units</th>
                            <th colSpan={5}>Set Parameters</th>
                        </thead>

                        <tr>
                            <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-01 Strip Specification</td>
                            <td colSpan={5} style={{ textAlign: "center" }}>1J6, 1J7, 1J18, 2J14</td>
                            <td colSpan={5} style={{ textAlign: "center" }}>NA </td>
                            <td colSpan={5}>
                                <Select
                                    placeholder="Choose INJ-01 Strip Specification"
                                    style={{
                                        width: '100%',  // Adjust the width as needed
                                    }}
                                    value={INJ_01_Strip}
                                    onChange={handlechange_INJ_01}
                                    options={values_Specification}
                                    disabled={!isEditable}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-IPA Strip Specification</td>
                            <td colSpan={5} style={{ textAlign: "center" }}>1J6, 1J7, 1J18, 2J14</td>
                            <td colSpan={5} style={{ textAlign: "center" }}>NA </td>
                            <td colSpan={5}>
                                <Select
                                    placeholder="Choose INJ-01 Strip Specification"
                                    style={{
                                        width: '100%',  // Adjust the width as needed
                                    }}
                                    value={INJ_IPA_Strip}
                                    onChange={handlechange_INJ_IPA_Strip}
                                    options={values_Specification}
                                    disabled={!isEditable}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-11 Strip Specification</td>
                            <td colSpan={5} style={{ textAlign: "center" }}>1J6, 1J7, 1J18, 2J14</td>
                            <td colSpan={5} style={{ textAlign: "center" }}>NA </td>
                            <td colSpan={5}>
                                <Select
                                    placeholder="Choose INJ-01 Strip Specification"
                                    style={{
                                        width: '100%',  // Adjust the width as needed
                                    }}
                                    value={INJ_11_Strip}
                                    onChange={handlechange_INJ_11_Strip}
                                    options={values_Specification}
                                    disabled={!isEditable}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-12 Strip Specification</td>
                            <td colSpan={5} style={{ textAlign: "center" }}>1J6, 1J7, 1J18, 2J14</td>
                            <td colSpan={5} style={{ textAlign: "center" }}>NA </td>
                            <td colSpan={5}>
                                <Select
                                    placeholder="Choose INJ-01 Strip Specification"
                                    style={{
                                        width: '100%',  // Adjust the width as needed
                                    }}
                                    value={INJ_12_Strip}
                                    onChange={handlechange_INJ_12_Strip}
                                    options={values_Specification}
                                    disabled={!isEditable}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-21 Strip Specification</td>
                            <td colSpan={5} style={{ textAlign: "center" }}>1J6, 1J7, 1J18, 2J14</td>
                            <td colSpan={5} style={{ textAlign: "center" }}>NA </td>
                            <td colSpan={5}>
                                <Select
                                    placeholder="Choose INJ-01 Strip Specification"
                                    style={{
                                        width: '100%',  // Adjust the width as needed
                                    }}
                                    value={INJ_21_Strip}
                                    onChange={handlechange_INJ_21_Strip}
                                    options={values_Specification}
                                    disabled={!isEditable}
                                />
                            </td>
                        </tr>
                        <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>CPA Drum speed</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>0-80</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>MPM</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={CPA_Drum_speed}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_CPA_Drum_speed}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_CPA_Drum_speed}
                                    onChange={handleInput_CPA_Drum_speed}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>C-1 Drum speed</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>0-80</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>MPM</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={C_1_Drum_speed}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_C_1_Drum_speed}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_C_1_Drum_speed}
                                    onChange={handleInput_C_1_Drum_speed}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>C-2 Drum speed</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>0-80</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>MPM</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={C_2_Drum_speed}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_C_2_Drum_speed}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_C_2_Drum_speed}
                                    onChange={handleInput_C_2_Drum_speed}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>J2S-Conveyer speed</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>0-80</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>MPM</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={J2S_Conveyer_speed}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_J2S_Conveyer_speed}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_J2S_Conveyer_speed}
                                    onChange={handleInput_J2S_Conveyer_speed}
                                    disabled={!isEditable}
                                /></td>
                            </tr>
                          
                    </table>




                </div>
            ),
        },
       
        {
            key: "3",
            label: <p>PROCESS SETUP VERIFICATION OPENING LINE -3</p>,
            children: (
                <div>
                   <table style={{ borderCollapse: "collapse", border: "1px solid black", width: "100%" }}>
                        <thead>
                            <th colSpan={4}>Descriptions</th>
                            <th colSpan={3}>Standards</th>
                            <th colSpan={3}>Units</th>
                            
                            <th colSpan={8}>Set Parameters</th>
                        </thead>
                        <tr>
                            <td colSpan={10} style={{paddingLeft:"5px"}}>DRYER</td>
                            <td colSpan={5} style={{textAlign:"center"}}>A</td>
                            <td colSpan={5}  style={{textAlign:"center"}}>B</td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>MDU TENSION/DRAFT</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>0-120</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>%</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={MDU_TENSION_DRAFTA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_MDU_TENSION_DRAFTA}
                                   // onKeyDown={handleKeyPress}
                                    // onInput={handleInput_MDU_TENSION_DRAFTA}
                                    onChange={handleInput_MDU_TENSION_DRAFTA}
                                    disabled={!isEditable}
                                    // min="85"
                                    // max="120"
                                /></td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={MDU_TENSION_DRAFTB}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_MDU_TENSION_DRAFTB}
                                    //onKeyDown={handleKeyPress}
                                    //onInput={handleInput_MDU_TENSION_DRAFTB}
                                    onChange={handleInput_MDU_TENSION_DRAFTB}
                                    disabled={!isEditable}
                                /></td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>MDL TENSION/DRAFT</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>0-120</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>%</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={MDL_TENSION_DRAFTA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_MDL_TENSION_DRAFTA}
                                    //onKeyDown={handleKeyPress}
                                    //onInput={handleInput_MDL_TENSION_DRAFTA}
                                    onChange={handleInput_MDL_TENSION_DRAFTA}
                                    disabled={!isEditable}
                                /></td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={MDL_TENSION_DRAFTB}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_MDL_TENSION_DRAFTB}
                                  //  onKeyDown={handleKeyPress}
                                    //onInput={handleInput_MDL_TENSION_DRAFTB}
                                    onChange={handleInput_MDL_TENSION_DRAFTB}
                                    disabled={!isEditable}
                                /></td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>MDL SPEED</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>0-120</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>%</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={MDL_SpeedA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_MDL_SpeedA}
                                   // onKeyDown={handleKeyPress}
                                    //onInput={handleInput_MDL_SpeedA}
                                    onChange={handleInput_MDL_SpeedA}
                                    disabled={!isEditable}
                                /></td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={MDL_SpeedB}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_MDL_SpeedB}
                                   // onKeyDown={handleKeyPress}
                                   // onInput={handleInput_MDL_SpeedB}
                                    onChange={handleInput_MDL_SpeedB}
                                    disabled={!isEditable}
                                /></td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>MDU SPEED</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>0-120</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>%</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={MDU_SpeedA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_MDU_SpeedA}
                                    //onKeyDown={handleKeyPress}
                                  //  onInput={handleInput_MDU_SpeedA}
                                    onChange={handleInput_MDU_SpeedA}
                                    disabled={!isEditable}
                                /></td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={MDU_SpeedB}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_MDU_SpeedB}
                                   // onKeyDown={handleKeyPress}
                                   // onInput={handleInput_MDU_SpeedB}
                                    onChange={handleInput_MDU_SpeedB}
                                    disabled={!isEditable}
                                /></td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>TTU</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>0-200</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>C</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={TTUA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_TTUA}
                                   // onKeyDown={handleKeyPress}
                                    //onInput={handleInput_TTUA}
                                    onChange={handleInput_TTUA}
                                    disabled={!isEditable}
                                /></td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={TTUB}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_TTUB}
                                    //onKeyDown={handleKeyPress}
                                   // onInput={handleInput_TTUB}
                                    onChange={handleInput_TTUB}
                                    disabled={!isEditable}
                                /></td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>TTL</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>0-200</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>C</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={TTLA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_TTLA}
                                   // onKeyDown={handleKeyPress}
                                   // onInput={handleInput_TTLA}
                                    onChange={handleInput_TTLA}
                                    disabled={!isEditable}
                                /></td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={TTLB}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_TTLB}
                                    //onKeyDown={handleKeyPress}
                                  //  onInput={handleInput_TTLB}
                                    onChange={handleInput_TTLB}
                                    disabled={!isEditable}
                                /></td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>MFU speed</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>50-100</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>%</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={MFU_speedA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_MFUA}
                                    //onKeyDown={handleKeyPress}
                                    //onInput={handleInput_MFUA}
                                    onChange={handleInput_MFUA}
                                    disabled={!isEditable}
                                /></td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={MFU_speedB}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_MFUB}
                                   // onKeyDown={handleKeyPress}
                                   // onInput={handleInput_MFUB}
                                    onChange={handleInput_MFUB}
                                    disabled={!isEditable}
                                /></td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>MFL speed</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>50-100</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>%</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={MFL_speedA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_MFLA}
                                  //  onKeyDown={handleKeyPress}
                                   // onInput={handleInput_MFLA}
                                    onChange={handleInput_MFLA}
                                    disabled={!isEditable}
                                /></td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={MFL_speedB}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_MFLB}
                                   // onKeyDown={handleKeyPress}
                                   // onInput={handleInput_MFLB}
                                    onChange={handleInput_MFLB}
                                    disabled={!isEditable}
                                /></td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>TOP Damper Inlet</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>0-100</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>%</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={TOP_Damper_InletA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_TOP_Damper_InletA}
                                   // onKeyDown={handleKeyPress}
                                   // onInput={handleInput_TOP_Damper_InletA}
                                    onChange={handleInput_TOP_Damper_InletA}
                                    disabled={!isEditable}
                                /></td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={TOP_Damper_InletB}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_TOP_Damper_InletB}
                                   // onKeyDown={handleKeyPress}
                                   // onInput={handleInput_TOP_Damper_InletB}
                                    onChange={handleInput_TOP_Damper_InletB}
                                    disabled={!isEditable}
                                />
                                </td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>TOP Damper Outlet</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>0-100</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>%</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={TOP_Damper_outletA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_TOP_Damper_outletA}
                                    //onKeyDown={handleKeyPress}
                                   // onInput={handleInput_TOP_Damper_outletA}
                                    onChange={handleInput_TOP_Damper_outletA}
                                    disabled={!isEditable}
                                /></td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={TOP_Damper_outletB}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_TOP_Damper_outletB}
                                    //onKeyDown={handleKeyPress}
                                   // onInput={handleInput_TOP_Damper_outletB}
                                    onChange={handleInput_TOP_Damper_outletB}
                                    disabled={!isEditable}
                                />
                                </td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>Bottom Damper Inlet</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>0-100</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>%</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={Bottom_Damper_InletA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_Bottom_Damper_InletA}
                                    ///onKeyDown={handleKeyPress}
                                   // onInput={handleInput_Bottom_Damper_InletA}
                                    onChange={handleInput_Bottom_Damper_InletA}
                                    disabled={!isEditable}
                                /></td>
                                <td colSpan={5}><Input
                                    type="number"
                                    value={Bottom_Damper_InletB}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_Bottom_Damper_InletB}
                                   // onKeyDown={handleKeyPress}
                                   // onInput={handleInput_Bottom_Damper_InletB}
                                    onChange={handleInput_Bottom_Damper_InletB}
                                    disabled={!isEditable}
                                />
                                </td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>Bottom Damper Outlet</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>0-100</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>%</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={Bottom_Damper_OutletA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_Bottom_Damper_OutletA}
                                   // onKeyDown={handleKeyPress}
                                   // onInput={handleInput_Bottom_Damper_OutletA}
                                    onChange={handleInput_Bottom_Damper_OutletA}
                                    disabled={!isEditable}
                                /></td>
                                <td colSpan={5}><Input
                                    type="number"
                                    value={Bottom_Damper_OutletB}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_Bottom_Damper_OutletB}
                                   // onKeyDown={handleKeyPress}
                                   // onInput={handleInput_Bottom_Damper_OutletB}
                                    onChange={handleInput_Bottom_Damper_OutletB}
                                    disabled={!isEditable}
                                />
                                </td>
                        </tr>
                        <tr>
                                <td colSpan={4} style={{ paddingLeft: "5px" }}>Boiler Temperature</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>180-250</td>
                                <td colSpan={3} style={{ textAlign: "center" }}>C</td>
                                <td colSpan={10}> <Input
                                    type="number"
                                    value={Boiler_TemperatureA}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_Boiler_TemperatureA}
                                   // onKeyDown={handleKeyPress}
                                   // onInput={handleInput_Boiler_TemperatureA}
                                    onChange={handleInput_Boiler_TemperatureA}
                                    disabled={!isEditable}
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
                    <table
                        style={{ borderCollapse: "collapse", border: "1px solid black", width: "100%" }}
                    >
                        
                        <tr
                            style={{
                                border: "1px solid",
                                textAlign: "center",
                                paddingLeft: "1em",
                                paddingRight: "1em",
                            }}
                        >
                               <td
                                colSpan="1"
                                style={{
                                    border: "1px solid",
                                    paddingLeft: "1em",
                                    paddingRight: "1em",
                                }}
                            >
                                <b style={{ fontSize: "11px" }}>Operator Sign & Date </b>
                            </td>
                            <td
                                colSpan="1"
                                style={{
                                    border: "1px solid",
                                    paddingLeft: "1em",
                                    paddingRight: "1em",
                                }}
                            >
                                <b style={{ fontSize: "11px" }}   >Production Supervisor Sign & Date </b>
                            </td>
                            <td
                                colSpan="1"
                                style={{
                                    border: "1px solid",
                                    paddingLeft: "1em",
                                    paddingRight: "1em",
                                }}
                            >
                                <b style={{ fontSize: "11px" }}>HOD / Designee Sign & Date</b>
                            </td>
                         
                        </tr>

                        <tr>
                            
                        <td
                                colSpan="1"
                                style={{
                                    border: "1px solid",
                                    paddingLeft: "1em",
                                    paddingRight: "1em",
                                  
                                    textAlign: "center",
                                    
                                }}
                               
                            >   
                             
                                      
                             {selectedRow?.operator_status === "OPERATOR_APPROVED" && (
  <>
    <div>{selectedRow?.operator_sign}</div>
    <div>{operator_signsignaturedate}</div>

    {getImageOP && (
      <>
        <br />
        <img src={getImageOP} alt="logo" className="signature" />
      </>
    )}
  </>
)}


                                  
                            </td>
                            <td
                                colSpan="1"
                                style={{
                                    border: "1px solid",
                                    paddingLeft: "1em",
                                    paddingRight: "1em",
                                    textAlign: "center",
                                   
                                }}
                                
                            >
                                


                                {(selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" ||
  selectedRow?.supervisor_status === "SUPERVISOR_REJECTED" ||
  selectedRow?.hod_status === "HOD_APPROVED" ||
  selectedRow?.hod_status === "HOD_REJECTED") && (
  <>
    <div>{selectedRow?.supervisor_sign}</div>
    <div>{supersigndate}</div>

    {getImageSUP && (
      <>
        <br />
        <img src={getImageSUP} alt="logo" className="signature" />
      </>
    )}
  </>
)}
                            </td>

                            <td
                                colSpan="1"
                                style={{
                                    border: "1px solid",
                                    paddingLeft: "1em",
                                    paddingRight: "1em",
                                  
                                    textAlign: "center",
                                }}
                                
                            >
                               
                               {(selectedRow?.hod_status === "HOD_APPROVED" || selectedRow?.hod_status === "HOD_REJECTED") && (
  <>
    <div>{selectedRow?.hod_sign}</div>
    <div>{hodsign}</div>

    {getImageHOD && (
      <>
        <br />
        <img src={getImageHOD} alt="logo" className="signature" />
      </>
    )}
  </>
)}


                                  
                            </td>


                        </tr>


                    </table>
                    {/* Container for buttons positioned at the right */}
                </div>
            ),
        },
    ];
    return (

        <div>

<PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
            {/* <BleachingHeader
        unit="Unit-H"
        formName="BLEACHING JOB CARD"
        formatNo="PRD01/F-13"
        buttonsArray={[
          <Button
            onClick={handleSave}
            style={{ marginRight: "10px" }}
            type="primary"
          >
            Save
          </Button>,
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "10px",
            }}
            type="primary"
          >
            Submit
          </Button>,
          <Button
            onClick={handleBack}
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "10px",
            }}
            type="primary"
          >
            Back
          </Button>,
          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              // display: submitBtnStatus ? "block" : "none",
            }}
            //  icon={<PrinterOutlined />}
            onClick={handlePrint}
          >
            Print
          </Button>
        ]}
      /> */}

            <BleachingHeader
                unit="Unit-H"
                formName="PROCESS SETUP DETAILS JETLACE & DRYER"
                formatNo="PH-PRD02/F-003"
                MenuBtn={
                    <Button
                        type="primary"
                        icon={<TbMenuDeep />}
                        onClick={showDrawer}
                    ></Button>
                }
                buttonsArray ={[

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
                  ...(roleBase === "ROLE_HOD" ||
                    roleBase === "ROLE_SUPERVISOR" ||
                    roleBase === "ROLE_QC" ||
                    roleBase === "ROLE_DESIGNEE" ? [
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
                      icon={ <img src={approveIcon} alt="Approve Icon" />}
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
                      loading={saveLoading}
                      type="primary"
                      onClick={handleSubmit}
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
                        navigate("/Precot"); // Ensure navigate is defined or imported
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
            <div id="section-to-print" style={{ padding: "5px" }}>
            {Array.isArray(print) &&print.map((item, index) => (
                  <table  key={index} style={{ borderCollapse: "collapse", border: "1px solid #0000", padding: "5px", width:"95%" ,marginTop:"3%" }}  >
                  <thead style={{marginTop:"10px",width:"100%",marginBottom:"10px"}}> <br></br><br></br>
                  <tr>
                    <td  colSpan="2" rowSpan="4">
                    <div style={{textAlign:"center"}}>   <img src={logo} alt="logo" style={{ width: "40px", height: "20px" }} /></div>
                    <div style={{textAlign:"center"}} >Unit H</div>
                    </td>
                    <td  colSpan="4" rowSpan="4" style={{textAlign:"center"}}>  Bleaching Job Card <br></br> PRD01/F-13</td>
                    <td  colSpan="3">Format No:</td>
                    <td  colSpan="3">PRD01/F-13</td>
                  </tr>
                  <tr>
                    <td colSpan="3">Revision No:</td>
                    <td colSpan="3">04</td>
                  </tr>
                  <tr>
                    <td colSpan="3">Ref. SOP No:</td>
                    <td colSpan="3">PRD01-D-12</td>
        
                  </tr>
                  <tr >
                    <td colSpan="3">Page No:</td>
                    <td colSpan="3">  {index + 1}of {print.length } </td>
                   
                  </tr>
                      
                </thead>
                <tbody>
                <table style={{ borderCollapse: "collapse", border: "1px solid #0000", padding: "5px" }}  >
                        <thead>
                            <th colSpan={5}>Descriptions</th>
                            <th colSpan={5}>Standards</th>
                            <th colSpan={5}>Units</th>
                            <th colSpan={5}>Set Parameters</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>  J-1 Conveyor speed </td>
                                <td colSpan={5} style={{ textAlign: "center" }}>18 -75</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>MPM </td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={J_1_Conveyor_speed}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_J_1_Conveyor_speed}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_J_1_Conveyor_speed}
                                    onChange={handleChange_J_1_Conveyor_speed}
                                    disabled={
                                        (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                                        (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
                                        (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                                        (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
                                      }
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>JP Conveyor speed</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>18 -75</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>MPM</td>
                                <td colSpan={5}> <Input
                                    type="text"
                                    value={JP_Conveyor_speed}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_JP_Conveyor_speed}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_JP_Conveyor_speed}
                                    onChange={handleChange_JP_Conveyor_speed}
                                    disabled={
                                        (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                                        (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
                                        (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                                        (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
                                      }
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-PW Pressure</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>5 -10</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>BAR</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={INJ_PW_Pressure}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_PW_Pressure}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_INJ_PW_Pressure}
                                    onChange={handleChange_INJ_PW_Pressure}
                                    disabled={
                                        (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                                        (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
                                        (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                                        (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
                                      }
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-01 Pressure</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>8-60</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>BAR</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={INJ_01_Pressure}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_01_Pressure}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_INJ_01_Pressure}
                                    onChange={handleInput_INJ_01_Pressure}
                                    disabled={
                                        (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                                        (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
                                        (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                                        (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
                                      }
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-IPA Pressure</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>8-90</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>BAR</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={INJ_IPA_Pressure}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_IPA_Pressure}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_INJ_IPA_Pressure}
                                    onChange={handleInput_INJ_IPA_Pressure}
                                    disabled={
                                        (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                                        (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
                                        (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                                        (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
                                      }
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-11 Pressure</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>8-90</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>BAR</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={INJ_11_Pressure}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_11_Pressure}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_INJ_11_Pressure}
                                    onChange={handleInput_INJ_11_Pressure}
                                    disabled={
                                        (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                                        (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
                                        (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                                        (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
                                      }
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-12 Pressure</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>8-90</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>BAR</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={INJ_12_Pressure}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_12_Pressure}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_INJ_12_Pressure}
                                    onChange={handleInput_INJ_12_Pressure}
                                    disabled={
                                        (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                                        (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
                                        (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                                        (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
                                      }
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-21 Pressure</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>8-90</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>BAR</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={INJ_21_Pressure}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_21_Pressure}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_IINJ_21_Pressure}
                                    onChange={handleInput_IINJ_21_Pressure}
                                    disabled={
                                        (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                                        (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
                                        (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                                        (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
                                      }
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>INJ-PW STRIP</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>6-10</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>2T9</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={INJ_PW_STRIP}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_INJ_PW_STRIP}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_INJ_PW_STRIP}
                                    onChange={handleInput_INJ_PW_STRIP}
                                    disabled={
                                        (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                                        (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
                                        (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                                        (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
                                      }
                                /></td>
                            </tr>
                            <tr>
                                <td colSpan={5} style={{ paddingLeft: "5px" }}>VACCUM</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>60-94</td>
                                <td colSpan={5} style={{ textAlign: "center" }}>%</td>
                                <td colSpan={5}> <Input
                                    type="number"
                                    value={VACCUM}
                                    style={{ textAlign: "center", width: "100%" }}
                                    onBlur={handle_blur_VACCUM}
                                    onKeyDown={handleKeyPress}
                                    onInput={handleInput_VACCUM}
                                    onChange={handleInput_VACCUM}
                                    disabled={
                                        (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                                        (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
                                        (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                                        (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
                                      }
                                /></td>
                            </tr>
                        </tbody>
                    </table>

                </tbody>
                </table>
                  ))}
            </div>




            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <Input
                    addonBefore="Date"
                    placeholder="Date"

                    value={datefomrat}
                    
                    disabled
                    style={{ width: '100%', height: '35px' }}

                />
                <Input
                    addonBefore="Shift"
                    placeholder="Shift"

                    value={shift}

                    disabled
                    style={{ width: '100%', height: '35px' }}

                />
                <Input
                    addonBefore="Order No"
                    placeholder="Order No"

                    value={order_no}

                    disabled
                    style={{ width: '100%', height: '35px' }}

                />
                <Input
                    addonBefore="Mixing"
                    placeholder="Mixing"

                    value={Mixing}

                    disabled
                    style={{ width: '100%', height: '35px' }}

                />
                <Input
                    addonBefore="Customer Name"
                    placeholder="Customer Name"

                    value={customername}

                    disabled
                    style={{ width: '100%', height: '35px' }}

                />



            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>

                <Input
                    addonBefore="STD GSM"
                    placeholder="STD GSM"

                    value={STD_GSM}

                    disabled
                    style={{ width: '100%', height: '35px' }}

                />
                <Input
                    addonBefore="Width"
                    placeholder="Width"

                    value={width}

                    disabled
                    style={{ width: '100%', height: '35px' }}

                />
                <Input
                    addonBefore="Pattern"
                    placeholder="Pattern"

                    value={Pattern}

                    disabled
                    style={{ width: '100%', height: '35px' }}

                />

                <Input
                    addonBefore="Moisture"
                    placeholder="Moisture"

                    type="number"

                    value={Moisture}
                    onChange={(e) => setMoisture(e.target.value)}
                    onKeyDown={(e) => {
                        if (
                            e.key === 'e' || 
                            e.key === 'E' || 
                            e.key === '-' || 
                            e.key === '+' || 
                            e.key === ',' || 
                            (!/[0-9.]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
                        ) {
                            e.preventDefault();
                        }
                    }}
                    style={{ width: '100%', height: '35px' }}
                    disabled={!isEditable}

                />
                <Input
                    addonBefore="Thickness"
                    placeholder="Thickness"
                     type="number"
                    value={Thickness}
                    onKeyDown={(e) => {
                        if (
                            e.key === 'e' || 
                            e.key === 'E' || 
                            e.key === '-' || 
                            e.key === '+' || 
                            e.key === ',' || 
                            (!/[0-9.]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
                        ) {
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => setThickness(e.target.value)}
                    style={{ width: '100%', height: '35px' }}
                    disabled={!isEditable}
                />

            </div>
            <Tabs

                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                style={{
                    display: "flex",
                    width: "90%",
                    position: "relative",
                    left: "2%",
                }}
            />
        </div>
    );
};

export default Spunlace_03;
