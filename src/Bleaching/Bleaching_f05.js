/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */

import React, { useEffect } from 'react';

import { useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { Modal,Tabs, Button, Col, Input, Row, Tooltip, message, Form ,Avatar,Menu,Drawer} from 'antd';
import { Select, } from 'antd';
import { FaLock } from "react-icons/fa6";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import BleachingHeader from '../Components/BleachingHeader';
import API from "../baseUrl.json";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { IoCreate,IoPrint, IoSave } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { BiLock } from 'react-icons/bi';
import { GrDocumentStore } from 'react-icons/gr';
import { IoChevronBackSharp } from "react-icons/io5";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import moment from 'moment';
import TextArea from 'antd/es/input/TextArea';
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
function Bleaching_f05() {
  const location = useLocation();
  const { Option } = Select;
  const navigate = useNavigate();
  const [Date, setDate] = useState("");
  const [PHNo, setPHNo] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Supplier, setSupplier] = useState("");
  const [Hair_Cont, setHair_Cont] = useState("");
  const [Hair_Sam, setHair_Sam] = useState("");
  const [Jute_Cont, setJute_Cont] = useState("");
  const [Jute_Sam, setJute_Sam] = useState("");
  const [Thread_Cont, setThread_Cont] = useState("");
  const [Thread_Sam, setThread_Sam] = useState("");
  const [Wrapper_Cont, setWrapper_Cont] = useState("");
  const [Wrapper_Sam, setWrapper_Sam] = useState("");
  const [Metal_Cont, setMetal_Cont] = useState("");
  const [Metal_Sam, setMetal_Sam] = useState("");
  const [Rust_Cont, setRust_Cont] = useState("");
  const [Rust_Sam, setRust_Sam] = useState("");
  const [Plastic_Cont, setPlastic_Cont] = useState("");
  const role=localStorage.getItem("role")
  const [Plastic_Sam, setPlastic_Sam] = useState("");
  const [BlackCot_Cont, setBlackCot_Cont] = useState("");
  const [BlackCot_Sam, setBlackCot_Sam] = useState("");
  const [OilCot_Cont, setOilCot_Cont] = useState("");
  const [OilCot_Sam, setOilCot_Sam] = useState("");
  const [YellowCot_Cont, setYellowCot_Cont] = useState("");
  const [open, setOpen] = useState(false);
  const [YellowCot_Sam, setYellowCot_Sam] = useState("");
  const [Sid, setSid] = useState("");
  const [Soil_Cont, setSoil_Cont] = useState("");
  const [Soil_Sam, setSoil_Sam] = useState("");
  const [Paper_Cont, setPaper_Cont] = useState("");
  const [Paper_Sam, setPaper_Sam] = useState("");
  const [Stick_Cont, setStick_Cont] = useState("");
  const [Stick_Sam, setStick_Sam] = useState("");
  const [Feather_Cont, setFeather_Cont] = useState("");
  const [Feather_Sam, setFeather_Sam] = useState("");
  const [Cloth_Cont, setCloth_Cont] = useState("");
  const [Cloth_Sam, setCloth_Sam] = useState("");
  const [WhitePoly_Cont, setWhitePoly_Cont] = useState("");
  const [WhitePoly_Sam, setWhitePoly_Sam] = useState("");
  const [ColorPoly_Cont, setColorPoly_Cont] = useState("");
  const [ColorPoly_Sam, setColorPoly_Sam] = useState("");
  const [Rubber_Cont, setRubber_Cont] = useState("");
  const [Rubber_Sam, setRubber_Sam] = useState("");
  const [Total_Cont, setTotal_Cont] = useState("");
  const [Total_Sam, setTotal_Sam] = useState("");

  const [Status, setStatus] = useState("");
  const [mailStatus, setmailStatus] = useState("");
  const [phLovPayload, setPhLovPayload] = useState()
  const [phLovPayloadFiltered, setPhLovPayloadFiltered] = useState()
  const [supervisor, setSupervisor] = useState("")
  const [tableClicked, setTableClicked] = useState(false);
  const [NewSave, setNewSave] = useState(false);
  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [printBtnStatus, setPrintBtnStatus] = useState(false);
  const [disable, setDisable] = useState(false);
  const [Id, setId] = useState(false);
  const [hodApproverStatus, setHod_status] = useState(false);
  const [isHodLoggedIn, setIsHodLoggedIn] = useState(false);
  const [supervisorStatus, setSupervisorStatus] = useState(false);
  const [HodDate, setHodDate] = useState(false);

  const [SupervisorDate, setSupervisorDate] = useState(false);
  const [supervisorSavedOn, setSupervisorSavedOn] = useState("");
  const [supervisorSavedBy, setSupervisorSavedBy] = useState("");
  const [supervisorSavedId, setSupervisorSavedId] = useState("");
  const [supervisorSubmitOn, setSupervisorSubmitOn] = useState("");

  const [supervisorSubmitBy, setSupervisorSubmitBy] = useState("");
  const [supervisorSubmitId, setSupervisorSubmitId] = useState("");
  const [SupervisorSign, setSupervisorSign] = useState("");
  const [HodStatus, setHodStatus] = useState("");
  const [HodSavedOn, setHodSavedOn] = useState("");
  const [HodSavedBy, setHodSavedBy] = useState("");
  const [HodSavedId, setHodSavedId] = useState("");
  const [HodSubmitOn, setHodSubmitOn] = useState("");
  const [HodSubmitBy, setHodSubmitBy] = useState("");
  const [HodSubmitId, setHodSubmitId] = useState("");
  const [HodSign, setHodSign] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  
  // const [selectedRow, setSelectedRow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  
  const roleauth = localStorage.getItem("role");
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const token = localStorage.getItem("token");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const formatDateToDDMMYYYY = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
  };

  // Function to format date from DD/MM/YYYY to YYYY-MM-DD for the input element
  const formatDateToYYYYMMDD = (inputDate) => {
    const [day, month, year] = inputDate.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value; // This will be in YYYY-MM-DD format
    const formattedDate = formatDateToDDMMYYYY(selectedDate); // Convert to DD/MM/YYYY
    setDate(formattedDate); // Set the date in DD/MM/YYYY format
  };



  
  
  useEffect(() => {
    if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [role]);

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = SupervisorSign;
    if (username) {
      // // console.loglog("usernameparams", username);

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
          // // console.loglog("Response:", res.data);
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
          // // console.loglog("Error in fetching image:", err);
        });
    }
  }, [selectedRow, API.prodUrl, token]);


  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = HodSign;
    if (username) {
      // // console.loglog("usernameparams", username);

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
          // // console.loglog("Response:", res.data);
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
          // // console.loglog("Error in fetching image:", err);
        });
    }
  }, [selectedRow, API.prodUrl, token]);

  
  const [availablequantitylistLoveLov, setAvailablequantitylistLov] = useState([]);
  const quantityNumbers = [
    {label:"0.5",value:"0.5"},
    {label:"1.0",value:"1.0"},
    {label:"1.5",value:"1.5"},
    {label:"2.0",value:"2.0"},
    {label:"2.5",value:"2.5"},
    {label:"3.0",value:"3.0"},
    {label:"3.5",value:"3.5"},
    {label:"4.0",value:"4.0"},
    {label:"4.5",value:"4.5"},
    {label:"5.0",value:"5.0"},
  ]
  const numbers = [1, 2, 3];
  const { state } = location;


  
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const { phnos } = state || {};
  const { supplier } = state || {};
  const { date } = state || {};
  useEffect(() => {
    setAvailablequantitylistLov(numbers);
    if (phnos || supplier || date) {
      if (phnos) {
        setPHNo(phnos);
        // // console.loglog("PHNo create", phnos);
      }
      if (supplier) {
        setSupplier(supplier);
        // // console.loglog("Supplier create", supplier);
      }
      // if (date) {
      //   setDate(date);
      //   // // console.loglog("Date create", date);
      // }
    }
  }, [phnos, supplier, date]);

  const handleBack = () => {
navigate("/Precot/Bleaching/F-05/Summary")
  };

  useEffect(() => {
    if (phnos) {
      checkBmrExists(phnos);
    }
  }, [phnos]);
  const containerStyle = {
    position: 'relative',
    marginLeft:  '50px' ,
  };
  const beforeStyle  = {
    content:  '"Select:"',
    zIndex: "9",
 
    position: 'absolute',
    backgroundColor: "#fafafa",
    border: "1px solid #dddd",
    left: "-48px",
    borderRadius: "5px 0px 1px 5px",
    top: '48%',
    padding: "7px",
    transform: 'translateY(-50%)',
    marginRight: '8px',
    fontSize:  '14px',
    color:  '#000',
  };
  const checkBmrExists = async (PHNo) => {

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/bleaching/Service/BleachContRawCotton/GetByPhNo?phNo=${PHNo}`,
        {

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // // console.loglog("response", response.data);
      if (response.data && response.data.length > 0) {
        // setIsEdit(true);

        setSelectedRow(response.data);
        const data = response.data;
        // // console.loglog("data", data);
        response.data.length == 0 ? setNewSave(true) : setNewSave(false);
        // // console.loglog("inside data", data);
        setId(data[0].id);
        setDate(data[0].date);
        setQuantity(data[0].quantity);
        setPHNo(data[0].phNo);
        setSupplier(data[0].supplierName);
        setHair_Cont(data[0].noOfHair ? data[0].noOfHair : '0');
        // setHair_Sam(data[0].refHair ? data[0].refHair : '0');
        setJute_Cont(data[0].noOfJute ? data[0].noOfJute : '0');
        // setJute_Sam(data[0].refJute ? data[0].refJute : '0');
        setThread_Cont(data[0].noOfColourThread ? data[0].noOfColourThread : '0');
        // setThread_Sam(data[0].refColourThread ? data[0].refColourThread : '0');
        setWrapper_Cont(data[0].noOfWrapper ? data[0].noOfWrapper : '0');
        // setWrapper_Sam(data[0].refWrapper ? data[0].refWrapper : '0');
        setMetal_Cont(data[0].noOfMetal ? data[0].noOfMetal : '0');
        // setMetal_Sam(data[0].refMetal ? data[0].refMetal : '0');
        setRust_Cont(data[0].noOfRust ? data[0].noOfRust : '0');
        // setRust_Sam(data[0].refRust ? data[0].refRust : '0');
        setPlastic_Cont(data[0].noOfPlastic ? data[0].noOfPlastic : '0');
        // setPlastic_Sam(data[0].refPlastic ? data[0].refPlastic : '0');
        setBlackCot_Cont(data[0].noOfBlackCotton ? data[0].noOfBlackCotton : '0');
        // setBlackCot_Sam(data[0].refBlackCotton ? data[0].refBlackCotton : '0');
        setOilCot_Cont(data[0].noOfOilCotton ? data[0].noOfOilCotton : '0');
        // setOilCot_Sam(data[0].refOilCotton ? data[0].refOilCotton : '0');
        setYellowCot_Cont(data[0].noOfYellowCotton ? data[0].noOfYellowCotton : '0');
        // setYellowCot_Sam(data[0].refYellowCotton ? data[0].refYellowCotton : '0');
        setSoil_Cont(data[0].noOfSoil ? data[0].noOfSoil : '0');
        // setSoil_Sam(data[0].refSoil ? data[0].refSoil : '0');
        setPaper_Cont(data[0].noOfPaper ? data[0].noOfPaper : '0');
        // setPaper_Sam(data[0].refPaper ? data[0].refPaper : '0');
        setStick_Cont(data[0].noOfStick ? data[0].noOfStick : '0');
        // setStick_Sam(data[0].refStick ? data[0].refStick : '0');
        setFeather_Cont(data[0].noOfFeather ? data[0].noOfFeather : '0');
        // setFeather_Sam(data[0].refFeather ? data[0].refFeather : '0');
        setCloth_Cont(data[0].noOfCloth ? data[0].noOfCloth : '0');
        // setCloth_Sam(data[0].refCloth ? data[0].refCloth : '0');
        setWhitePoly_Cont(data[0].noOfwhitePolyPropylene ? data[0].noOfwhitePolyPropylene : '0');
        // setWhitePoly_Sam(data[0].refWhitePolyPropylene ? data[0].refWhitePolyPropylene : '0');
        setColorPoly_Cont(data[0].noOfColourPolyPropylene ? data[0].noOfColourPolyPropylene : '0');
        // setColorPoly_Sam(data[0].refColourPolyPropylene ? data[0].refColourPolyPropylene : '0');
        setRubber_Cont(data[0].noOfRubberPiece ? data[0].noOfRubberPiece : '0');
        // setRubber_Sam(data[0].refRubberPiece ? data[0].refRubberPiece : '0');
        setTotal_Cont(data[0].total ? data[0].total : '0');
       
        setSupervisorStatus(data[0].supervisor_status);
        setHodSign(data[0].hod_sign);
        setSupervisorSign(data[0].supervisor_sign);
        setHod_status(data[0].hod_status);
        setHodDate(data[0].hod_submit_on);
        setSupervisorDate(data[0].supervisor_submit_on);
        setmailStatus(data[0].mail_status);
        setSupervisorStatus(data[0].supervisor_status);
        setSupervisorSavedOn(data[0].supervisor_saved_on);
        setSupervisorSavedBy(data[0].supervisor_saved_by);
        setSupervisorSavedId(data[0].supervisor_saved_id);
        setSupervisorSubmitOn(data[0].supervisor_submit_on);
        setSupervisorSubmitBy(data[0].supervisor_submit_by);
        setSupervisorSubmitId(data[0].supervisor_submit_id);
        setSupervisorSign(data[0].supervisor_sign);

        //////////////////////////////
        setHodStatus(data[0].hod_status);
        setHodSavedOn(data[0].hod_saved_on);
        setHodSavedBy(data[0].hod_saved_by);
        setHodSavedId(data[0].hod_saved_id);
        setHodSubmitOn(data[0].hod_submit_on);
        setHodSubmitBy(data[0].hod_submit_by);
        setHodSubmitId(data[0].hod_submit_id);
        setHodSign(data[0].hod_sign);
        setSelectedRow(data[0]);
        // // console.loglog("SelectedRow" , data[0]);

      } else {
        // Handle the case where no data is found
      }

      response.data.length === 0 ? setNewSave(true) : setNewSave(false);
  
      const role = localStorage.getItem("role");
      const hodStatus = response.data[0]?.hod_status;
      const supervisorStatus = response.data[0]?.supervisor_status;
  
    


      if (role === "ROLE_SUPERVISOR") {
        if (response.data.length === 0) {
          setSaveBtnStatus(true);
          setSubmitBtnStatus(true);
          setPrintBtnStatus(false);
        } else if (
          hodStatus === "" &&
          supervisorStatus === "SUPERVISOR_APPROVED"
        ) {
          setSaveBtnStatus(false);
          setSubmitBtnStatus(false);
          setPrintBtnStatus(false);
          setDisable(true);
        } else if (
          hodStatus === "WAITING_FOR_APPROVAL" &&
          supervisorStatus === "SUPERVISOR_APPROVED"
        ) {
          setSaveBtnStatus(false);
          setSubmitBtnStatus(false);
          setPrintBtnStatus(false);
          setDisable(true);
        } else if (
          hodStatus === "" &&
          supervisorStatus === "SUPERVISOR_SAVED"
        ) {
          setSaveBtnStatus(true);
          setSubmitBtnStatus(true);
          setPrintBtnStatus(false);
        } else if (
          hodStatus === "HOD_REJECTED"
        ) {
          setSaveBtnStatus(false);
          setSubmitBtnStatus(true);
          setPrintBtnStatus(false);
          setDisable(false);
        }
      } else if (role === "ROLE_HOD" || role === "ROLE_DESIGNEE") {
        if (
          hodStatus === "" &&
          supervisorStatus === "SUPERVISOR_APPROVED"
        ) {
          setSaveBtnStatus(true);
          setSubmitBtnStatus(true);
          setPrintBtnStatus(true);
          setDisable(true);
        } else if (
          hodStatus === "WAITING_FOR_APPROVAL" &&
          supervisorStatus === "SUPERVISOR_APPROVED"
        ) {
          setSaveBtnStatus(false);
          setSubmitBtnStatus(false);
          setPrintBtnStatus(true);
          setDisable(true);
        } else if (
          hodStatus === "HOD_SAVED" &&
          supervisorStatus === "SUPERVISOR_APPROVED"
        ) {
          setSaveBtnStatus(true);
          setSubmitBtnStatus(true);
          setPrintBtnStatus(true);
        } else if (
          hodStatus === "" &&
          supervisorStatus === ""
        ) {
          setSaveBtnStatus(true);
          setSubmitBtnStatus(true);
          setPrintBtnStatus(true);
          setDisable(true);
        } else if (
          hodStatus === "HOD_APPROVED" ||
          hodStatus === "HOD_REJECTED"
        ) {
          setSaveBtnStatus(true);
          setSubmitBtnStatus(true);
          setPrintBtnStatus(true);
          setDisable(true);
        }
      }
      
      if (
        hodStatus === "HOD_APPROVED" &&
        supervisorStatus === "SUPERVISOR_APPROVED"
      ) {
        setSaveBtnStatus(false);
        setSubmitBtnStatus(false);
        setPrintBtnStatus(true);
        setDisable(true);
      }
      
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      // message.error(error.response.data.message);
    } finally {
      
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
        `${ API.prodUrl}/Precot/api/bleaching/Service/approveRawcottonF05`,
        {
          id: Id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // // console.loglog("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-05/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // // console.loglog("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };


  const formatDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // // console.loglog("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    if(!rejectRemarks) {
      message.warning('Please Enter the Remarks!');
      setSaveLoading(false);
      return;
    }

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/bleaching/Service/approveRawcottonF05`,
        {
          id: Id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // // console.loglog("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-05/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // // console.loglog("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  

  const handleSubmit = async () => {

    if (!Quantity) {
      message.error('Please fill in the mandatory Quantity field.');
      setSubmitLoading(false);
      return;
    }
    setSubmitLoading(true);
    
    if (NewSave) {
      try {
        await sendContaminationCheck();
       
        setSaveLoading(false);
        
      } catch (error) {
        console.error("Error submitting Contamination Check:", error);
        message.error(error.response.data.message);
        setSaveLoading(false);
      }
    } else {
      try {
        await updateContaminationCheck2();
       
      } catch (error) {
        console.error("Error updating Contamination Check:", error);
        message.error(error.response.data.message);
        setSaveLoading(false);
      }
    }


  };

  const canDisplayButtons = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
          selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if((selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "WAITING_FOR_APPROVAL")){
          return;
        }
      else if (
        selectedRow?.hod_status === "HOD_APPROVED" ||
        selectedRow?.hod_status === "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        // // console.loglog("VAlidation")
        return "none";
      }
      return "block";

    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" &&
        selectedRow?.supervisor_status != "SUPERVISOR_APPROVED"
      ) {
        return "none";
      } else if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  
  // const canDisplayButtons = () => {
  //   if (roleauth == "ROLE_SUPERVISOR") {
  //     if (
  //       selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
  //       selectedRow?.hod_status == "HOD_REJECTED"
  //     ) {
  //       return "block";
  //     } else if (
  //       (selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
  //         selectedRow?.hod_status == "WAITING_FOR_APPROVAL") ||
  //       selectedRow?.hod_status == "HOD_APPROVED"
  //     ) {
  //       return "none";
  //     }
  //   } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
  //     if (
  //       selectedRow?.hod_status == "HOD_APPROVED" ||
  //       selectedRow?.hod_status == "HOD_REJECTED" ||
  //       emptyarraycheck == 0
  //     ) {
  //       return "none";
  //     }
  //     return "block";
  //   } else {
  //     if (
  //       selectedRow?.hod_status == "HOD_APPROVED" ||
  //       selectedRow?.hod_status == "HOD_REJECTED" 
  //     ) {
  //       return "none";
  //     }
  //     return "block";
  //   }
  // };

  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (selectedRow?.hod_status == "WAITING_FOR_APPROVAL" ||
          selectedRow?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        selectedRow?.hod_status == "HOD_APPROVED" ||
        selectedRow?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };
  const sendContaminationCheck = async () => {
 
    try {

      const isValid = () => {
        if (!Quantity) return "Quantity  is required";}

        const validationMessage = isValid();
        if (validationMessage) {
          message.error(validationMessage);
          return;
        }

      const payload = {
        unit: "Unit H",
        formatName,
        formatNo,
        revisionNo,
        refSopNo: sopNo,
        date: Date,
        phNo: PHNo,
        quantity: Quantity,
        supplierName: Supplier,
        noOfHair: Hair_Cont,
        refHair: Hair_Sam,
        noOfJute: Jute_Cont,
        refJute: Jute_Sam,
        noOfColourThread: Thread_Cont,
        refColourThread: Thread_Sam,
        noOfWrapper: Wrapper_Cont,
        refWrapper: Wrapper_Sam,
        refMetal: Metal_Sam,
        noOfMetal: Metal_Cont,
        noOfRust: Rust_Cont,
        refRust: Rust_Sam,
        noOfPlastic: Plastic_Cont,
        refPlastic: Plastic_Sam,
        noOfBlackCotton: BlackCot_Cont,
        refBlackCotton: BlackCot_Sam,
        noOfOilCotton: OilCot_Cont,
        refOilCotton: OilCot_Sam,
        noOfSoil: Soil_Cont,
        refOfSoil: Soil_Sam,

        noOfYellowCotton: YellowCot_Cont,
        refYellowcotton: YellowCot_Sam,
        noOfPaper: Paper_Cont,
        refPaper: Paper_Sam,
        noOfStick: Stick_Cont,
        refStick: Stick_Sam,
        noOfFeather: Feather_Cont,
        refFeather: Feather_Sam,
        noOfCloth: Cloth_Cont,
        refCloth: Cloth_Sam,

        noOfwhitePolyPropylene: WhitePoly_Cont,
        refWhitePolyPropylene: WhitePoly_Sam,
        noOfColourPolyPropylene: ColorPoly_Cont,
        refColourPolyPropylene: ColorPoly_Sam,
        noOfRubberPiece: Rubber_Cont,
        refRubberPiece: Rubber_Sam,
        supervisor_sign: SupervisorSign,
        hod_sign: HodSign,
        status: Status,
        total: Total_Cont,
        refTotal: Total_Sam,
        mail_status: mailStatus,
        supervisor_status: supervisorStatus,
        supervisor_saved_on: supervisorSavedOn,
        supervisor_saved_by: supervisorSavedBy,
        supervisor_saved_id: supervisorSavedId,
        supervisor_submit_on: supervisorSubmitOn,
        supervisor_submit_by: supervisorSubmitBy,
        supervisor_submit_id: supervisorSubmitId,
        hod_status: HodStatus,
        hod_saved_on: HodSavedOn,
        hod_saved_by: HodSavedBy,
        hod_saved_id: HodSavedId,
        hod_submit_on: HodSubmitOn,
        hod_submit_by: HodSubmitBy,
        hod_submit_id: HodSubmitId,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/bleaching/Service/BleachContRawCotton/SubmitBleachContRawCotton`,
        payload,
        { headers }
      );

      // // console.loglog("API Response:", response.data);
      message.success(response.data.message);
      setSubmitLoading(false);
      navigate('/Precot/Bleaching/F-05/Summary');
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response?.data?.message || "An error occurred");
    }
  };

  const formattedDate = moment(date, 'D.MM.YYYY').format('MM/DD/YYYY ');

  const updateContaminationCheck2 = async () => {
    try {
      const payload = {
        unit: "Unit H",
        id: Id,
        formatName,
        formatNo,
        revisionNo,
        refSopNo: sopNo,
        date: Date,
        phNo: PHNo,
        quantity: Quantity,
        supplierName: Supplier,
        noOfHair: Hair_Cont,
        refHair: Hair_Sam,
        noOfJute: Jute_Cont,
        refJute: Jute_Sam,
        noOfColourThread: Thread_Cont,
        refColourThread: Thread_Sam,
        noOfWrapper: Wrapper_Cont,
        refWrapper: Wrapper_Sam,

        refMetal: Metal_Sam,
        noOfMetal: Metal_Cont,
        noOfRust: Rust_Cont,
        refRust: Rust_Sam,
        noOfPlastic: Plastic_Cont,
        refPlastic: Plastic_Sam,
        noOfBlackCotton: BlackCot_Cont,
        refBlackCotton: BlackCot_Sam,
        noOfOilCotton: OilCot_Cont,
        refOilCotton: OilCot_Sam,
        noOfSoil: Soil_Cont,
        refOfSoil: Soil_Sam,

        noOfYellowCotton: YellowCot_Cont,
        refYellowcotton: YellowCot_Sam,
        noOfPaper: Paper_Cont,
        refPaper: Paper_Sam,
        noOfStick: Stick_Cont,
        refStick: Stick_Sam,
        noOfFeather: Feather_Cont,
        refFeather: Feather_Sam,
        noOfCloth: Cloth_Cont,
        refCloth: Cloth_Sam,
        noOfwhitePolyPropylene: WhitePoly_Cont,
        refWhitePolyPropylene: WhitePoly_Sam,
        noOfColourPolyPropylene: ColorPoly_Cont,
        refColourPolyPropylene: ColorPoly_Sam,
        noOfRubberPiece: Rubber_Cont,
        refRubberPiece: Rubber_Sam,
        supervisor_sign: SupervisorSign,
        hod_sign: HodSign,
        status: Status,
        total: Total_Cont,
        refTotal: Total_Sam,
        mail_status: mailStatus,
        supervisor_status: supervisorStatus,
        supervisor_saved_on: supervisorSavedOn,
        supervisor_saved_by: supervisorSavedBy,
        supervisor_saved_id: supervisorSavedId,
        supervisor_submit_on: supervisorSubmitOn,
        supervisor_submit_by: supervisorSubmitBy,
        supervisor_submit_id: supervisorSubmitId,
        hod_status: HodStatus,
        hod_saved_on: HodSavedOn,
        hod_saved_by: HodSavedBy,
        hod_saved_id: HodSavedId,
        hod_submit_on: HodSubmitOn,
        hod_submit_by: HodSubmitBy,
        hod_submit_id: HodSubmitId,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
       `${ API.prodUrl}/Precot/api/bleaching/Service/BleachContRawCotton/SubmitBleachContRawCotton`,
        payload,
        { headers }
      );

      // // console.loglog("API Response:", response.data);
      message.success(response.data.message);
      setSubmitLoading(false);
      navigate('/Precot/Bleaching/F-05/Summary');
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response?.data?.message || "An error occurred");
    }
  };


  const handleSave = async () => {
    if (!Quantity) {
      message.error('Please fill in the mandatory Quantity field.');
      setSaveLoading(false);
      return;
    }
    setSaveLoading(true);
    if (NewSave) {
      try {
        await sendContaminationCheck2();
        
        setSaveLoading(false);
        
    
          
      
  
      } catch (error) {
        console.error("Error submitting Contamination Check:", error);
        message.error(error.response.data.message);
        setSaveLoading(false);

      }
    } else {
      try {
        await updateContaminationCheck();
       
      } catch (error) {
        console.error("Error updating Contamination Check:", error);
        message.error(error.response.data.message);
        setSaveLoading(false);
      }
    }
  };

  const sendContaminationCheck2 = async () => {
 
    try {

      const isValid = () => {
        if (!Quantity) return "Quantity  is required";}

        const validationMessage = isValid();
        if (validationMessage) {
          message.error(validationMessage);
          return;
        }

      const payload = {
        unit: "Unit H",
        formatName,
        formatNo,
        revisionNo,
        refSopNo: sopNo,
        date: Date,
        phNo: PHNo,
        quantity: Quantity,
        supplierName: Supplier,
        noOfHair: Hair_Cont,
        refHair: Hair_Sam,
        noOfJute: Jute_Cont,
        refJute: Jute_Sam,
        noOfColourThread: Thread_Cont,
        refColourThread: Thread_Sam,
        noOfWrapper: Wrapper_Cont,
        refWrapper: Wrapper_Sam,
        refMetal: Metal_Sam,
        noOfMetal: Metal_Cont,
        noOfRust: Rust_Cont,
        refRust: Rust_Sam,
        noOfPlastic: Plastic_Cont,
        refPlastic: Plastic_Sam,
        noOfBlackCotton: BlackCot_Cont,
        refBlackCotton: BlackCot_Sam,
        noOfOilCotton: OilCot_Cont,
        refOilCotton: OilCot_Sam,
        noOfSoil: Soil_Cont,
        refOfSoil: Soil_Sam,

        noOfYellowCotton: YellowCot_Cont,
        refYellowcotton: YellowCot_Sam,
        noOfPaper: Paper_Cont,
        refPaper: Paper_Sam,
        noOfStick: Stick_Cont,
        refStick: Stick_Sam,
        noOfFeather: Feather_Cont,
        refFeather: Feather_Sam,
        noOfCloth: Cloth_Cont,
        refCloth: Cloth_Sam,

        noOfwhitePolyPropylene: WhitePoly_Cont,
        refWhitePolyPropylene: WhitePoly_Sam,
        noOfColourPolyPropylene: ColorPoly_Cont,
        refColourPolyPropylene: ColorPoly_Sam,
        noOfRubberPiece: Rubber_Cont,
        refRubberPiece: Rubber_Sam,
        supervisor_sign: SupervisorSign,
        hod_sign: HodSign,
        status: Status,
        total: Total_Cont,
        refTotal: Total_Sam,
        mail_status: mailStatus,
        supervisor_status: supervisorStatus,
        supervisor_saved_on: supervisorSavedOn,
        supervisor_saved_by: supervisorSavedBy,
        supervisor_saved_id: supervisorSavedId,
        supervisor_submit_on: supervisorSubmitOn,
        supervisor_submit_by: supervisorSubmitBy,
        supervisor_submit_id: supervisorSubmitId,
        hod_status: HodStatus,
        hod_saved_on: HodSavedOn,
        hod_saved_by: HodSavedBy,
        hod_saved_id: HodSavedId,
        hod_submit_on: HodSubmitOn,
        hod_submit_by: HodSubmitBy,
        hod_submit_id: HodSubmitId,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${ API.prodUrl}/Precot/api/bleaching/Service/BleachContRawCotton/SaveBleachContRawCotton`,
        payload,
        { headers }
      );

      // // console.loglog("API Response:", response.data);
      message.success("Form Saved Succesfullly");
      setSubmitLoading(false);
      navigate('/Precot/Bleaching/F-05/Summary');
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response?.data?.message || "An error occurred");
    }
  };

  const isDisabled = role === "ROLE_HOD" || role === "ROLE_DESIGNEE";


  const updateContaminationCheck = async () => {
    try {
      const payload = {
        unit: "Unit H",
        id: Id,
        formatName,
        formatNo,
        revisionNo,
        refSopNo: sopNo,
        date: Date,
        phNo: PHNo,
        quantity: Quantity,
        supplierName: Supplier,
        noOfHair: Hair_Cont,
        refHair: Hair_Sam,
        noOfJute: Jute_Cont,
        refJute: Jute_Sam,
        noOfColourThread: Thread_Cont,
        refColourThread: Thread_Sam,
        noOfWrapper: Wrapper_Cont,
        refWrapper: Wrapper_Sam,

        refMetal: Metal_Sam,
        noOfMetal: Metal_Cont,
        noOfRust: Rust_Cont,
        refRust: Rust_Sam,
        noOfPlastic: Plastic_Cont,
        refPlastic: Plastic_Sam,
        noOfBlackCotton: BlackCot_Cont,
        refBlackCotton: BlackCot_Sam,
        noOfOilCotton: OilCot_Cont,
        refOilCotton: OilCot_Sam,
        noOfSoil: Soil_Cont,
        refOfSoil: Soil_Sam,

        noOfYellowCotton: YellowCot_Cont,
        refYellowcotton: YellowCot_Sam,
        noOfPaper: Paper_Cont,
        refPaper: Paper_Sam,
        noOfStick: Stick_Cont,
        refStick: Stick_Sam,
        noOfFeather: Feather_Cont,
        refFeather: Feather_Sam,
        noOfCloth: Cloth_Cont,
        refCloth: Cloth_Sam,
        noOfwhitePolyPropylene: WhitePoly_Cont,
        refWhitePolyPropylene: WhitePoly_Sam,
        noOfColourPolyPropylene: ColorPoly_Cont,
        refColourPolyPropylene: ColorPoly_Sam,
        noOfRubberPiece: Rubber_Cont,
        refRubberPiece: Rubber_Sam,
        supervisor_sign: SupervisorSign,
        hod_sign: HodSign,
        status: Status,
        total: Total_Cont,
        refTotal: Total_Sam,
        mail_status: mailStatus,
        supervisor_status: supervisorStatus,
        supervisor_saved_on: supervisorSavedOn,
        supervisor_saved_by: supervisorSavedBy,
        supervisor_saved_id: supervisorSavedId,
        supervisor_submit_on: supervisorSubmitOn,
        supervisor_submit_by: supervisorSubmitBy,
        supervisor_submit_id: supervisorSubmitId,
        hod_status: HodStatus,
        hod_saved_on: HodSavedOn,
        hod_saved_by: HodSavedBy,
        hod_saved_id: HodSavedId,
        hod_submit_on: HodSubmitOn,
        hod_submit_by: HodSubmitBy,
        hod_submit_id: HodSubmitId,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
       `${ API.prodUrl}/Precot/api/bleaching/Service/BleachContRawCotton/SaveBleachContRawCotton`,
        payload,
        { headers }
      );

      // // console.loglog("API Response:", response.data);
      message.success("Form Saved Successfully");
      setSubmitLoading(false);
      navigate('/Precot/Bleaching/F-05/Summary');
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response?.data?.message || "An error occurred");
    }
  };



  const onChange = (key) => {
    // // console.loglog(key);
  };


  useEffect(() => {
    const fetchPhLovPayload = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ API.prodUrl}/Precot/api/LOV/Service/PhBasedSupplierLOV`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = response.data.map(item => ({
          id: item.id,
          value: item.value,
          label: item.label,
          description: item.description,
        }));
        setPhLovPayload(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error(error.response.data.message);
      }
    };

    fetchPhLovPayload();
  }, []);


  const calculateTotal = () => {
    let total = 0;

    const hairInput = document.getElementById('hair-input');
    if (hairInput) {
      total += parseInt(hairInput.value || '0');
    }

    const juteInput = document.getElementById('jute-input');
    if (juteInput) {
      total += parseInt(juteInput.value || '0');
    }

    const colourThreadInput = document.getElementById('colour-thread-input');
    if (colourThreadInput) {
      total += parseInt(colourThreadInput.value || '0');
    }

    const wrapperInput = document.getElementById('wrapper-input');
    if (wrapperInput) {
      total += parseInt(wrapperInput.value || '0');
    }

    const metalInput = document.getElementById('metal-input');
    if (metalInput) {
      total += parseInt(metalInput.value || '0');
    }

    const rustInput = document.getElementById('rust-input');
    if (rustInput) {
      total += parseInt(rustInput.value || '0');
    }

    const plasticInput = document.getElementById('plastic-input');
    if (plasticInput) {
      total += parseInt(plasticInput.value || '0');
    }

    const blkCottonInput = document.getElementById('blk-cotton-input');
    if (blkCottonInput) {
      total += parseInt(blkCottonInput.value || '0');
    }

    const oilCottonInput = document.getElementById('oil-cotton-input');
    if (oilCottonInput) {
      total += parseInt(oilCottonInput.value || '0');
    }

    const soilInput = document.getElementById('soil-input');
    if (soilInput) {
      total += parseInt(soilInput.value || '0');
    }
   
    const yellowCottonInput = document.getElementById('yellow-cotton-input');
    if (yellowCottonInput) {
      total += parseInt(yellowCottonInput.value || '0');
    }

    const paperInput = document.getElementById('paper-input');
    if (paperInput) {
      total += parseInt(paperInput.value || '0');
    }

    const stickInput = document.getElementById('stick-input');
    if (stickInput) {
      total += parseInt(stickInput.value || '0');
    }

    const featherInput = document.getElementById('feather-input');
    if (featherInput) {
      total += parseInt(featherInput.value || '0');
    }

    const clothInput = document.getElementById('cloth-input');
    if (clothInput) {
      total += parseInt(clothInput.value || '0');
    }

    const whitePolyPropInput = document.getElementById('white-poly-prop-input');
    if (whitePolyPropInput) {
      total += parseInt(whitePolyPropInput.value || '0');
    }

    const colourPolyPropInput = document.getElementById('colour-poly-prop-input');
    if (colourPolyPropInput) {
      total += parseInt(colourPolyPropInput.value || '0');
    }

    const rubberPieceInput = document.getElementById('rubber-piece-input');
    if (rubberPieceInput) {
      total += parseInt(rubberPieceInput.value || '0');
    }

    const totalInput = document.getElementById('total-input');
    if (totalInput) {
      totalInput.value = total.toString();
    }
    setTotal_Cont(total.toString());
  };



  const handleKeyDown = (e) => {
    e.preventDefault(); // Prevent any key press
  };

  const phOnChange = (y) => {
    //  setSupplier(barkavi)
    // // // console.loglog("hh", phLovPayload.filter((x, i) => {
    //   return y == x.value
    // }))

    const a = phLovPayload.filter((x, i) => {
      return y == x.value
    })
    setPHNo(a[0].value)
    setSupplier(a[0].description)

  }

  const formattedSupervisorDate = supervisorSubmitOn
  ? moment(supervisorSubmitOn).format('DD/MM/YYYY HH:mm')
  : '';

  const formattedhodDate = HodSubmitOn
  ? moment(HodSubmitOn).format('DD/MM/YYYY HH:mm')
  : '';

  const isHodLoggedn = true;

  const items = [
    {
      key: "1",
      label: <p>Activity Form - 1</p>,
      children: (
       <div>
      <table onClick={() => setTableClicked(true)}>
        <tbody>
          <tr>
            <th colSpan="1" style={{ width: '99px', height: '35px' }}>S.No.</th>
            <th colSpan="4">Types of Contamination</th>
            <th colSpan="5">No of Contamination</th>
          </tr>
          <tr>
            <td colSpan="1" align="center">1</td>
            <td colSpan="4" align="center">Hair</td>
            <td colSpan="5">
              <input
                className="inp-new"
                value={Hair_Cont}
                id="hair-input"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setHair_Cont(value);
                    calculateTotal();
                  }
                }}
                
                disabled={disable}

                style={{
                  padding: 0,
                  margin: 0,
                  height: '32px',
                  width: '100%',
                  border: "none",
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="1" align="center">2</td>
            <td colSpan="4" align="center">Jute</td>
            <td colSpan="5">
              <input
                className="inp-new"
                value={Jute_Cont}
                id="jute-input"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setJute_Cont(value);
                    calculateTotal();
                  }
                }}
                disabled={disable}
                style={{
                  padding: 0,
                  margin: 0,
                  height: '32px',
                  width: '100%',
                  border: "none",
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="1" align="center">3</td>
            <td colSpan="4" align="center">Colour Threads</td>
            <td colSpan="5">
              <input
                id="colour-thread-input"
                className="inp-new"
                value={Thread_Cont}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setThread_Cont(value);
                    calculateTotal();
                  }
                }}
                disabled={disable}
                style={{
                  padding: 0,
                  margin: 0,
                  height: '32px',
                  width: '100%',
                  border: "none",
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="1" align="center">4</td>
            <td colSpan="4" align="center">Strapper</td>
            <td colSpan="5">
              <input
                id="wrapper-input"
                className="inp-new"
                value={Wrapper_Cont}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setWrapper_Cont(value);
                    calculateTotal();
                  }
                }}
                disabled={disable}
                style={{
                  padding: 0,
                  margin: 0,
                  height: '32px',
                  width: '100%',
                  border: "none",
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="1" align="center">5</td>
            <td colSpan="4" align="center">Metal piece</td>
            <td colSpan="5">
              <input
                id="metal-input"
                className="inp-new"
                value={Metal_Cont}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setMetal_Cont(value);
                    calculateTotal();
                  }
                }}
                disabled={disable}
                style={{
                  padding: 0,
                  margin: 0,
                  height: '32px',
                  width: '100%',
                  border: "none",
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="1" align="center">6</td>
            <td colSpan="4" align="center">Brown/Rusty cotton</td>
            <td colSpan="5">
              <input
                id="rust-input"
                className="inp-new"
                value={Rust_Cont}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setRust_Cont(value);
                    calculateTotal();
                  }
                }}
                disabled={disable}
                style={{
                  padding: 0,
                  margin: 0,
                  height: '32px',
                  width: '100%',
                  border: "none",
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="1" align="center">7</td>
            <td colSpan="4" align="center">Plastic</td>
            <td colSpan="5">
              <input
                className="inp-new"
                id="plastic-input"
                value={Plastic_Cont}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setPlastic_Cont(value);
                    calculateTotal();
                  }
                }}
                disabled={disable}
                style={{
                  padding: 0,
                  margin: 0,
                  height: '32px',
                  width: '100%',
                  border: "none",
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="1" align="center">8</td>
            <td colSpan="4" align="center">Black Cotton</td>
            <td colSpan="5">
              <input
                className="inp-new"
                id="blk-cotton-input"
                value={BlackCot_Cont}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setBlackCot_Cont(value);
                    calculateTotal();
                  }
                }}
                disabled={disable}
                style={{
                  padding: 0,
                  margin: 0,
                  height: '32px',
                  width: '100%',
                  border: "none",
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="1" align="center">9</td>
            <td colSpan="4" align="center">Oil cotton</td>
            <td colSpan="5">
              <input
                className="inp-new"
                id="oil-cotton-input"
                value={OilCot_Cont}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setOilCot_Cont(value);
                    calculateTotal();
                  }
                }}
                disabled={disable}
                style={{
                  padding: 0,
                  margin: 0,
                  height: '32px',
                  width: '100%',
                  border: "none",
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="1" align="center">10</td>
            <td colSpan="4" align="center">Soil</td>
            <td colSpan="5">
              <input
                className="inp-new"
                value={Soil_Cont}
                id="soil-input"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setSoil_Cont(value);
                    calculateTotal();
                  }
                }}
                disabled={disable}
                style={{
                  padding: 0,
                  margin: 0,
                  height: '32px',
                  width: '100%',
                  border: "none",
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      ),
    },
    {
      key: "2",
      label: <p>Activity Form - 2</p>,
      children: (
        <div>
          <table onClick={() => setTableClicked(true)}>
            <tbody>
              <tr >
                <td colSpan="1" style={{ Width: '99px', height: '35px', fontWeight: 'bold' , textAlign:'center'}}>S.No.</td>
                <td colSpan="4" style={{ fontWeight: '900', textAlign: 'center' }}>Types of Contamination</td>
                <td colSpan="5" style={{ fontWeight: '900', textAlign: 'center' }}>No of Contamination</td>
                {/* <td colSpan="5" style={{ fontWeight: '900', textAlign: 'center' }}>Ref Sample</td> */}
              </tr>
              <tr>

                <td colSpan="1" align="center">11</td>
                <td colSpan="4" align="center">Yellow Cotton</td>
                <td colSpan="5"><input
                  className="inp-new"
                  id="yellow-cotton-input"
                  value={YellowCot_Cont}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === '' || /^[0-9\b]+$/.test(value)) {
                      setYellowCot_Cont(value);
                      calculateTotal();
                    }


                  }}
                  disabled={disable}

                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>

              </tr>

              <tr>
                <td colSpan="1" align="center">12</td>
                <td colSpan="4" align="center">Paper</td>
                <td colSpan="5"><input
                  className="inp-new"
                  id="paper-input"
                  value={Paper_Cont}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === '' || /^[0-9\b]+$/.test(value)) {
                      setPaper_Cont(value);
                      calculateTotal();
                    }


                  }}
                  disabled={disable}

                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>

              </tr>
              <tr>
                <td colSpan="1" align="center">13</td>
                <td colSpan="4" align="center">Stick</td>
                <td colSpan="5"><input
                  className="inp-new"
                  id="stick-input"
                  value={Stick_Cont}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === '' || /^[0-9\b]+$/.test(value)) {
                      setStick_Cont(value);
                      calculateTotal();
                    }


                  }}
                  disabled={disable}

                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>

              </tr>
              <tr>
                <td colSpan="1" align="center">14</td>
                <td colSpan="4" align="center">Feather</td>
                <td colSpan="5"><input
                  className="inp-new"
                  id="feather-input"

                  value={Feather_Cont}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === '' || /^[0-9\b]+$/.test(value)) {
                      setFeather_Cont(value);
                      calculateTotal();
                    }


                  }}
                  disabled={disable}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>

              </tr>
              <tr>
                <td colSpan="1" align="center">15</td>
                <td colSpan="4" align="center">Cloth</td>
                <td colSpan="5"><input
                  id="cloth-input"
                  className="inp-new"

                  value={Cloth_Cont}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === '' || /^[0-9\b]+$/.test(value)) {
                      setCloth_Cont(value);
                      calculateTotal();
                    }


                  }}
                  disabled={disable}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>

              </tr>
              <tr>
                <td colSpan="1" align="center">16</td>
                <td colSpan="4" align="center">White Poly Propylene</td>
                <td colSpan="5"><input
                  className="inp-new"
                  id="white-poly-prop-input"
                  value={WhitePoly_Cont}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === '' || /^[0-9\b]+$/.test(value)) {
                      setWhitePoly_Cont(value);
                      calculateTotal();
                    }


                  }}
                  disabled={disable}

                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>

              </tr>
              <tr>
                <td colSpan="1" align="center">17</td>
                <td colSpan="4" align="center">Color Poly Propylene</td>
                <td colSpan="5"><input
                  className="inp-new"
                  id="colour-poly-prop-input"

                  value={ColorPoly_Cont}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === '' || /^[0-9\b]+$/.test(value)) {
                      setColorPoly_Cont(value);
                      calculateTotal();
                    }


                  }}
                  disabled={disable}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>

              </tr>
              <tr>
                <td colSpan="1" align="center">18</td>
                <td colSpan="4" align="center">Rubber Piece</td>
                <td colSpan="5"><input
                  className="inp-new"
                  id="rubber-piece-input"

                  value={Rubber_Cont}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === '' || /^[0-9\b]+$/.test(value)) {
                      setRubber_Cont(value);
                      calculateTotal();
                    }


                  }}
                  disabled={disable}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>

              </tr>
              <tr>
                <td colSpan="1" align="center">19</td>
                <td colSpan="4" align="center">Total</td>
                <td colSpan="5"><input
                  className="inp-new"
                  id="total-input"

                  value={Total_Cont}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === '' || /^[0-9\b]+$/.test(value)) {
                      setTotal_Cont(value);
                      calculateTotal();
                    }


                  }}
                  disabled={disable}
                  style={{
                    padding: 0,
                    margin: 0,
                    height: '32px',
                    width: '100%',
                    border: "none",
                  }}
                /></td>
              </tr>

            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Review</p>,
      children: (
        <div>
          <table onClick={() => setTableClicked(true)}>

            <tr>
              <td colSpan="7" style={{ fontWeight: '900', textAlign: 'center' }}>Performed by Production Supervisor </td>
              <td colSpan="8" style={{ fontWeight: '900', textAlign: 'center' }}>Reviewed by Head of the Department / Designee </td>
            </tr>
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', height: "40px" }}>
              {supervisorStatus === "SUPERVISOR_APPROVED" && (
                  <>
                {SupervisorSign}
                <div>
                  {/* {supervisorSubmitOn ? new window.Date(supervisorSubmitOn).toISOString().substring(0, 10) : ''} */}
                  {formattedSupervisorDate}
                  <br></br>
                  {getImage !== "" && (
                  <img className="signature"
                          src={getImage}
                          alt="Supervisor"
                          
                        />)}
                </div>
                </>
              )}
              </td>
              <td colSpan="8" style={{ height: '100px', textAlign: 'center' }}>
              {(HodStatus === "HOD_REJECTED" ||
                  HodStatus === "HOD_APPROVED") && (
                  <>
                {HodSign}
                <div>
                  {formattedhodDate}
                  <br></br>
                  {getImage1 !== "" && (
                  <img className="signature"
                          src={getImage1}
                          alt="HOD"
                         
                        />)}
                </div>
                </>
                  )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },

  ];

  const formatName = "Contamination Checking Report(Raw Cotton)"
  const formatNo = "PR01/F-05"
  const revisionNo = "02"
  const sopNo = "PRD01-D-09"
  return (
    <div>
      <div id="section-to-print">
        <br/>
        <br/>
        <table style={{
            height:'1000px',
            width:"90%"
          }}>

          <thead>
          <tr style={{ border: "none" }}>
        <td style={{ border: "none" }} colSpan="15"></td>
          </tr>
          
            <tr>
              <td colSpan="3" rowSpan="4" style={{ textAlign: 'center' }}>
                <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
                <br></br>
                <br></br>
                Unit H</td>
              <td colSpan="6" rowSpan="4" style={{ textAlign: 'center' }}>Contamination Checking Report<br />
                (Raw Cotton)
              </td>
              <td colSpan="3"
              >Format No.:</td>
              <td colSpan="3">PH-PRD01/F-004</td>
            </tr>
            <tr>
              <td colSpan="3">Revision No.:</td>
              <td colSpan="3">01</td>
            </tr>
            <td colSpan="3">Ref SOP No.:</td>
            <td colSpan="3">PRD01-D-09</td>
            <tr>
              <td colSpan="3">Page NO.:</td>
              <td colSpan="3">1 of 1</td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="15"></td>
            </tr>
            </thead>
              <br/>
            <tbody>

            <tr>
              {/* <td colSpan="7">Date: {Date}</td> */}
              <td colSpan="7">Date: {formattedDate}</td>
              <td colSpan="8">PH No:{PHNo}</td>
            </tr>
            <tr>
              <td colSpan="7">Sample Quantity in Kg:{Quantity}</td>
              <td colSpan="8">Supplier Name:{Supplier}</td>

            </tr>
            <tr>
              <td colSpan="1" style={{ Width: '99px', height: '35px', textAlign: 'center'}}>S.No</td>
              <td colSpan="4" style={{textAlign:'center'}}>Types of Contamination</td>
              <td colSpan="5" style={{textAlign:'center'}}>No of Contamination</td>
              <td colSpan="5" style={{textAlign:'center'}}>Ref.Sample</td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}} >1</td>
              <td colSpan="4"  style={{textAlign:'center'}}>Hair</td>
              <td colSpan="5" style={{textAlign:'center'}} >
                {Hair_Cont}
              </td>
              <td colSpan="5" style={{textAlign:'center'}}>
                {Hair_Sam}
              </td>
            </tr>
            <tr>
              <td colSpan="1"style={{textAlign:'center'}}>2</td>
              <td colSpan="4" style={{textAlign:'center'}}>Jute</td>
              <td colSpan="5" style={{textAlign:'center'}}>
                {Jute_Cont}
              </td>
              <td colSpan="5" style={{textAlign:'center'}}>
                {Jute_Sam}
              </td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>3</td>
              <td colSpan="4" style={{textAlign:'center'}}>Colour Threads </td>
              <td colSpan="5" style={{textAlign:'center'}}>
                {Thread_Cont}
              </td>
              <td colSpan="5" style={{textAlign:'center'}}>
                {Thread_Sam}
              </td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>4</td>
              <td colSpan="4" style={{textAlign:'center'}}>Strapper</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Wrapper_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Wrapper_Sam}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>5</td>
              <td colSpan="4" style={{textAlign:'center'}}>Metal piece </td>
              <td colSpan="5" style={{textAlign:'center'}}>{Metal_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Metal_Sam}</td>
            </tr>
            <tr>
              <td colSpan="1"style={{textAlign:'center'}}>6</td>
              <td colSpan="4" style={{textAlign:'center'}}>Brown/Rusty cotton </td>
              <td colSpan="5" style={{textAlign:'center'}}>{Rust_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Rust_Sam}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>7</td>
              <td colSpan="4" style={{textAlign:'center'}}>Plastic</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Plastic_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Plastic_Sam}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>8</td>
              <td colSpan="4" style={{textAlign:'center'}}>Black Cotton</td>
              <td colSpan="5" style={{textAlign:'center'}}>{BlackCot_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{BlackCot_Sam}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>9</td>
              <td colSpan="4" style={{textAlign:'center'}}>Oil cotton</td>
              <td colSpan="5" style={{textAlign:'center'}}>{OilCot_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{OilCot_Sam}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>10</td>
              <td colSpan="4"style={{textAlign:'center'}}>Soils</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Soil_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Soil_Sam}</td>
            </tr>


            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>11</td>
              <td colSpan="4" style={{textAlign:'center'}}>Yellow Cotton</td>
              <td colSpan="5" style={{textAlign:'center'}}>{YellowCot_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{YellowCot_Sam}</td>
            </tr>

            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>12</td>
              <td colSpan="4" style={{textAlign:'center'}}>Paper</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Paper_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Paper_Sam}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>13</td>
              <td colSpan="4" style={{textAlign:'center'}}>Stick</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Stick_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Stick_Sam}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>14</td>
              <td colSpan="4" style={{textAlign:'center'}} >Feather</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Feather_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Feather_Sam}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>15</td>
              <td colSpan="4" style={{textAlign:'center'}}>Cloth</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Cloth_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Cloth_Sam}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>16</td>
              <td colSpan="4" style={{textAlign:'center'}}>White Poly Propylene </td>
              <td colSpan="5" style={{textAlign:'center'}}>{WhitePoly_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{WhitePoly_Sam}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>17</td>
              <td colSpan="4" style={{textAlign:'center'}}>Colour Poly Propylene </td>
              <td colSpan="5" style={{textAlign:'center'}}>{ColorPoly_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{ColorPoly_Sam}</td>
            </tr>
            <tr>
              <td colSpan="1" style={{textAlign:'center'}}>18</td>
              <td colSpan="4" style={{textAlign:'center'}}>Rubber piece</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Rubber_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}>{Rubber_Sam}</td>
            </tr>
            <tr>
              {/* <td colSpan="1" style={{textAlign:'center'}}>19</td> */}
              <td colSpan="5" style={{textAlign:'center'}}>Total</td>
              <td colSpan="5" style={{textAlign:'center'}}> {Total_Cont}</td>
              <td colSpan="5" style={{textAlign:'center'}}> {Total_Sam}</td>
            </tr>
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>Performed by Production Supervisor</td>
              <td colSpan="8" style={{ textAlign: 'center' }}>Reviewed by Head of the Department / Designee</td>
            </tr>
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', verticalAlign: 'buttom' }}>
                <div align="center">{SupervisorSign} <br/>
              {formattedSupervisorDate}
              <br></br>
              Sign&Date
              </div>
              </td>
              <td colSpan="8" style={{ height: '40px', textAlign: 'center', verticalAlign: 'buttom' }}>
                <div align="center">{HodSign} <br/>
              {formattedhodDate}
              <br></br>
              Sign&Date
              </div>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td style={{ border: "none" }} colSpan="15"></td>
            </tr>
            </tbody>
            <br/>
            <tfoot>
            <tr>
              <td colSpan="3">Particular </td>
              <td colSpan="4">prepared By</td>
              <td colSpan="4">Reviewed By</td>
              <td colSpan="4">Approved By</td>

            </tr>

            <tr>
              <td colSpan="3">Name </td>
              <td colSpan="4"></td>
              <td colSpan="4"></td>
              <td colSpan="4"></td>

            </tr>
            <tr>
              <td colSpan="3">Signature & Date</td>
              <td colSpan="4"></td>
              <td colSpan="4"></td>
              <td colSpan="4"></td>

            </tr>
            </tfoot>
       
        </table>
      </div>

      <div>

        

        <BleachingHeader
          unit="Unit-H"
          formName=" Contamination Checking Report"
          formatNo="PH-PRD01/F-004"
          MenuBtn={
            <Button
              type="primary"
              icon={<TbMenuDeep />}
              onClick={showDrawer}
            ></Button>
          }

          buttonsArray={[
            // <Button
            //   type="primary"
            //   style={{
            //     backgroundColor: "#E5EEF9",
            //     color: "#00308F",
            //     fontWeight: "bold",
            //     // display: printBtnStatus ? "block" : "none",
            //   }}
            //   shape="round"
            //   icon={<IoPrint color="#00308F" />}
            //   onClick={() => window.print()}
            // >
            //   &nbsp;Print
            // </Button>,
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                // display: saveBtnStatus ? "block" : "none",
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
                display: saveBtnStatus ? "block" : "none",

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
                display: submitBtnStatus ? "block" : "none",

              }}
              onClick={handleSubmit}
              shape="round"
              icon={<GrDocumentStore color="#00308F" />}
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
              rows={4} // Adjust the number of rows as needed
              style={{ width: "100%" }} // Adjust the width as needed
            />
          </div>
        </Modal>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "1em",
            marginBottom: "1em",
            marginLeft: '50em'
          }}
        >



        </Row>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              marginRight: "1em",
              display: "flex",
            }}
          >




          </div>
          <div
            style={{
              width: "100%",
              marginRight: "1em",
              display: "flex",
            }}>

            <Input
              addonBefore="PHNO"
              placeholder="PHNO"
              size="Medium"
              style={{width:'200px'}}
              value={PHNo}
              onChange={phOnChange}
              readOnly
              list="PHNO"

            />


            {/* <Select
            placeholder={'PH NO:'}
            id="ph-select"
            options={phLovPayload}

            onChange={phOnChange}
            size="medium"

          /> */}



            <Input
              addonBefore="SupplierName"
              placeholder="SupplierName"
              type="text"

              
              style={{width:"400px"}}
              value={Supplier}
              onChange={(e) => setSupplier(e.target.value)}
              readOnly
            />
<div style={containerStyle}>
<div style={beforeStyle}>Sample Quantity in Kg:</div>

  <Select
          addonBefore=""
          disabled={disable}
          required
          value={Quantity}
          style={{marginLeft:'5px',padding:"5px 20px 0px",paddingTop:"0PX",width:"200px",height:"35px", textAlign:'right'}}
          onChange={setQuantity}
          options={quantityNumbers}
        />
 
</div>


<Input
      addonBefore="Date"
      placeholder="Date"
      type="date"
      size="Medium"
      disabled={disable}
      style={{width:'200px'}}
      value={Date ? formatDateToYYYYMMDD(Date) : ''} 
      onChange={handleDateChange}
    />
          </div>


        </div>
        <div>
          <Tabs items={items} onChange={onChange} />
        </div>
      </div>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        width="fit-content"
        style={{
          padding: "1em",
        }}
      >
        <Row>
          <Col>
            <Avatar>{localStorage.getItem("username").at(0)}</Avatar>
          </Col>

          <Col
            style={{
              marginLeft: "1em",
            }}
          >
            <p>{localStorage.getItem("username")}</p>
            <p
              style={{
                fontSize: "x-small",
              }}
            >
              {localStorage.getItem("role")}
            </p>
          </Col>
        </Row>

        <Menu
  theme="dark"
  mode="inline"
  // defaultSelectedKeys={["1"]}
  style={{
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "0",
    margin: "0",
  }}
  items={
    role === "ROLE_QA"
      ? [
          {
            key: "1",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Form Browser
              </b>
            ),
            onClick: () => navigate("/Precot/choosenScreen"),
          },
          {
            key: "2",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Generation
              </b>
            ),
            onClick: () => navigate("/Precot/Generate"),
          },
          {
            key: "3",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Mapping
              </b>
            ),
            onClick: () => navigate("/Precot/Bleaching_Mapping"),
          },
          {
            key: "4",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Closing
              </b>
            ),
            onClick: () => navigate("/Precot/Closing"),
          }
         ,
          {
            key: "5",
            icon: (
              <FaLock
                color="#151718"
                onClick={() => {
          if (confirm("Are you sure want to logout")) {
            localStorage.removeItem("token");
            navigate("/Precot");
          }
        }}
              />
            ),
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Logout
              </b>
            ),
            onClick: () => navigate("/Precot"),
          },
        ]
      : role === "ROLE_SUPERVISOR" || role === "ROLE_HOD" || role === "ROLE_DESIGNEE"
      ? [
          {
            key: "1",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Form Browser
              </b>
            ),
            onClick: () => navigate("/Precot/choosenScreen"),
          },
          {
            key: "2",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Mapping
              </b>
            ),
            onClick: () => navigate("/Precot/Bleaching_Mapping"),
          },
          {
            key: "3",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Closing
              </b>
            ),
            onClick: () => navigate("/Precot/Closing"),
          },
          {
            key: "4",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Chemical Issue
              </b>
            ),
            onClick: () => navigate("/Precot/RawMaterialIssue"),
          },
          {
            key: "5",
            icon: (
              <FaLock
                color="#151718"
                onClick={() => {
          if (confirm("Are you sure want to logout")) {
            localStorage.removeItem("token");
            navigate("/Precot");
          }
        }}
              />
            ),
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Logout
              </b>
            ),
            onClick: () => navigate("/Precot"),
          },
        ]
      : [
          {
            key: "1",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Form Browser
              </b>
            ),
            onClick: () => navigate("/Precot/choosenScreen"),
          },
          {
            key: "2",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Mapping
              </b>
            ),
            onClick: () => navigate("/Precot/Bleaching_Mapping"),
          },
          {
            key: "3",
            icon: <IoCreate color="#151718" />,
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Closing
              </b>
            ),
            onClick: () => navigate("/Precot/Closing"),
          },
          {
            key: "4",
            icon: (
              <FaLock
                color="#151718"
                onClick={() => {
          if (confirm("Are you sure want to logout")) {
            localStorage.removeItem("token");
            navigate("/Precot");
          }
        }}
              />
            ),
            label: (
              <b
                style={{
                  color: "#151718",
                }}
              >
                Logout
              </b>
            ),
            onClick: () => navigate("/Precot"),
          },
        ]
  }
/>
      </Drawer>
    </div>
  );
}

export default Bleaching_f05;