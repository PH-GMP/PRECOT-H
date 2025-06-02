/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Input,
  Row,
  Tabs,
  Select,
  Form,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
  Modal,
} from "antd";
import BleachingHeader from "../Components/BleachingHeader";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../baseUrl.json";
import { BiLock } from "react-icons/bi";
import { IoMdPrint } from "react-icons/io";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaBackward, FaUserCircle } from "react-icons/fa";
import { IoCaretBackCircleSharp } from "react-icons/io5";
import moment from "moment";
import logo from "../Assests/logo.png";
import { GoArrowLeft } from "react-icons/go";
import gif from "../Assests/gif.gif";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
// const { Option } = Select;

const Bleaching_f36 = () => {
  const [newDate, setNewDate] = useState("");
  const [shiftNum, setShiftNum] = useState("");
  const [slbId, setSlbId] = useState("");
  const [remarks, setRemarks] = useState("N/A");
  const [Cakepress1, setCakepress1] = useState("");
  const [Cakepress2, setCakepress2] = useState("");
  const [Kier01, setKier01] = useState("");
  const [Kier02, setKier02] = useState("");
  const [Kier03, setKier03] = useState("");
  const [Hydro01, setHydro01] = useState("");
  const [Hydro02, setHydro02] = useState("");
  const [CakeOpener, setCakeOpener] = useState("");
  // const [BalePress,setBalePress] = useState("");
  const [NoofBale, setNoofBale] = useState("");
  const [WeightingBale, setWeightingBale] = useState("");
  const [shiftget, setShiftGet] = useState([]);
  const [shiftstatus, setShiftStatus] = useState("");
  const [status, setStatus] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [routePath, setRoutePath] = useState("");
  // const [approverStatus, setApproverStatus] = useState("");
  const [supervisor_status, setSupervisorStatus] = useState("NULL");
  const [hod_status, setHodStatus] = useState("NULL");
  const [hod_submitted_on, setHodSubmittedOn] = useState("");
  const [productionSupervisorSign, setProductionSupervisorSign] = useState("");
  const [loading, setLoading] = useState(false);
  // const [supervisor, setSupervisor] = useState("");
  // const [hod, setHod] = useState("");
  const [apiStatus, setApistatus] = useState("");
  const [hod_sign, setHodSign] = useState("");
  // const [hod_approved_on, setHodApprovedOn] = useState("");
  // const [prinBtnDisable, setprinBtnDisable] = useState(true);
  const [newData, setNewData] = useState();
  const [fromTime, setFormTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [btnSubmitSaveState, setBtnSubmitSaveState] = useState(false);
  const [hodSubmitSaveState, setHodSubmitSaveState] = useState(false);

  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [printBtnStatus, setPrintBtnStatus] = useState(false);

  const [mail_status, setMailStatus] = useState("");
  const [supervisor_sign, setSupervisorSign] = useState("");
  const [supervisor_saved_on, setSupervisorSavedOn] = useState("");
  const [supervisor_saved_by, setSupervisorSavedBy] = useState("");
  const [supervisor_saved_id, setSupervisorSavedId] = useState(0);
  const [supervisor_submit_on, setSupervisorSubmitOn] = useState("");
  const [supervisor_submit_by, setSupervisorSubmitBy] = useState("");
  const [supervisor_submit_id, setSupervisorSubmitId] = useState(0);
  // const [supervisor_sign, setSupervisorSign] = useState("");
  // const [hod_sign, setHodSign] = useState("");
  const [hod_saved_on, setHodSavedOn] = useState("");
  const [hod_saved_by, setHodSavedBy] = useState("");
  const [hod_saved_id, setHodSavedId] = useState(0);
  const [hod_submit_on, setHodSubmitOn] = useState("");
  const [hod_submit_by, setHodSubmitBy] = useState("");
  const [hod_submit_id, setHodSubmitId] = useState(0);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [disable, setDisable] = useState(false);

  const [error, setError] = useState("");

  // const [signHodname, setSignHodname] = useState("");

  // const [isSupervisorIn, setIsSupervisorIn] = useState(false);
  // const [isHodLoggedIn, setIsHodLoggedIn] = useState(false);

  // const [dataSource, setDataSource] = useState(
  //   Array.from({ length: 5 }, () => ({
  //     machineName: "",
  //     fromTime: "",
  //     toTime: "",
  //     reason: "",
  //   }))
  // );

  const [wordCount, setWordCount] = useState(0);
  // setInitialDate(new Date(newData).toISOString().substring(0, 10));
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [formatchange, setFormatChange] = useState("");
  const formatName = "SHIFT LOG BOOK";
  const formatNo = "PH-PRD01/F-013";
  const revisionNo = "02";
  const sopNo = "QAD01-D-55";
  const unit = "UNIT-H";
  // const bmrNumber = "";

  // const [MachineName , setMachineName] = useState("");
  // const [ From ,setFrom] = useState("");
  // const [To,setTo] = useState("");
  // const [Reason,setReason ] =useState ("");
  // const [shift, setShift] = useState("");

  // Shift state....
  const [shift, setShift] = useState("");
  const [shiftOptions, setShiftOptions] = useState([]);

  const [stoppagestatus, setStoppageStatus] = useState(false);
  const [stoppageDetails, setStoppageDetails] = useState([]);

  const [balePackstatus, setBalePackStatus] = useState(false);
  const [balePackDetails, setBalePackDetails] = useState("");

  // laydown state...
  const [BMR, setLayDown] = useState("");
  const [layDownOptions, setLayDownOptions] = useState([]);

  const { Option } = Select;

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const userName = localStorage.getItem("username");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // const bmr = localStorage.getItem("bmr");
  // // console.log("USerName ", userName);

  const isHod = role === "ROLE_HOD";

  const { state } = useLocation();

  const [getImage, setGetImage] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = supervisor_sign;
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
          setGetImage(url);
        })
        .catch((err) => {
          // console.log("Error in fetching image:", err);
        });
    }
  }, [supervisor_sign, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = hod_sign;
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
  }, [hod_sign, API.prodUrl, token]);

  // // console.log(" date" , date);
  // // console.log(" shift value",shiftvalue);

  // // console.log("role" , role);

  // Function to format the date
  const Dateformat = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatStoppageDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
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
        return shift; // Return the original value if it doesn't match any case
    }
  };

  const handleChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length <= 100) {
      setRemarks(e.target.value);
      setWordCount(words.length);
    }
  };

  // const handleNoofBaleChanges = (e) => {
  //   let value = e.target.value;
  //   // Allow only numeric values
  //   if (/^\d*$/.test(value)) {
  //     setNoofBale(value);
  //     setError("");
  //   } else {
  //     setError('Please enter a valid number".');
  //   }
  // };

  // const handleWeightingBale = (e) => {
  //   const value = e.target.value;
  //   // Allow only numeric values
  //   if (/^\d*\.?\d*$/.test(value)) {
  //     setWeightingBale(value);
  //     setError("");
  //   } else {
  //     setError('Please enter a valid number".');
  //   }
  // };

  const handleCakePress1 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    // Allow partial input that could lead to a valid format
    const partialRegex = /^(\d{0,2}\/?\d{0,4})$/;

    if (regex.test(value) && partialRegex.test(value)) {
      setCakepress1(value);
    }
    // console.log("cakepress1", value);
  };

  const handleCakePress2 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    // Allow partial input that could lead to a valid format
    const partialRegex = /^(\d{0,2}\/?\d{0,4})$/;

    if (regex.test(value) && partialRegex.test(value)) {
      setCakepress2(value);
    }
    // console.log("cakepress1", Cakepress1);
  };

  const handleKier1 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    // Allow partial input that could lead to a valid format
    const partialRegex = /^(\d{0,2}\/?\d{0,4})$/;

    if (regex.test(value) && partialRegex.test(value)) {
      setKier01(value);
    }
    // console.log("cakepress1", Cakepress1);
  };
  const handleKier2 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    // Allow partial input that could lead to a valid format
    const partialRegex = /^(\d{0,2}\/?\d{0,4})$/;

    if (regex.test(value) && partialRegex.test(value)) {
      setKier02(value);
    }
    // console.log("cakepress1", Cakepress1);
  };
  const handleKier3 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    // Allow partial input that could lead to a valid format
    const partialRegex = /^(\d{0,2}\/?\d{0,4})$/;

    if (regex.test(value) && partialRegex.test(value)) {
      setKier03(value);
    }
    // console.log("cakepress1", Cakepress1);
  };

  const handleHydro1 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    // Allow partial input that could lead to a valid format
    const partialRegex = /^(\d{0,2}\/?\d{0,4})$/;

    if (regex.test(value) && partialRegex.test(value)) {
      setHydro01(value);
    }
    // console.log("cakepress1", Cakepress1);
  };

  const handleHydro2 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    // Allow partial input that could lead to a valid format
    const partialRegex = /^(\d{0,2}\/?\d{0,4})$/;

    if (regex.test(value) && partialRegex.test(value)) {
      setHydro02(value);
    }
    // console.log("cakepress1", Cakepress1);
  };

  const handleCakeOpener = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    // Allow partial input that could lead to a valid format
    const partialRegex = /^(\d{0,2}\/?\d{0,4})$/;

    if (regex.test(value) && partialRegex.test(value)) {
      setCakeOpener(value);
    }
    // console.log("cakepress1", Cakepress1);
  };

  const handleNoofBaleChanges = (e) => {
    let value = e.target.value;
    setNoofBale(value);
  };

  const handleWeightingBale = (e) => {
    const value = e.target.value;

    setWeightingBale(value);
  };

  // LayDown No Get api for show the LayDown values.....
  useEffect(() => {
    // Fetch shift options from the API
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const fetchLayDown = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/bleaching/generation/getMappingBmr`,
          { headers }
        );
        setLayDownOptions(response.data);
        // console.log("Laydown No", response.data);
      } catch (error) {
        console.error("Error fetching laydown:", error);
      }
    };
    fetchLayDown();
  }, []);

  useEffect(() => {
    // Fetch shift options from the API
    const { date, shiftvalue } = state || {};

    const numericShiftValue = convertShiftValue(shiftvalue);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const fetchShifts = async () => {
      try {
        const response = await axios.post(
          `${ API.prodUrl}/Precot/api/bleach/findStoppageByDateAndShift`,
          {
            pack_dt: date,
            shift_id: numericShiftValue,
          },
          { headers }
        );

        if (response.data.status === "No Data") {
          setStoppageStatus(false);
        } else {
          setStoppageStatus(true);
          setStoppageDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);

  useEffect(() => {
    // Fetch shift options from the API
    const { date, shiftvalue } = state || {};

    const numericShiftValue = convertShiftValue(shiftvalue);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const fetchBalePackDetails = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/bleaching/summary/getNoOfBaleAndWt`,
          {
            headers,
            params: {
              date: date,
              shift: numericShiftValue,
            },
          }
        );

        if (response.data.status === "No Data") {
          setBalePackDetails(false);
        } else {
          setBalePackDetails(true);
          setBalePackDetails(response.data);
          setNoofBale(response.data.BaleCount);
          setWeightingBale(response.data.TotalNetWeight);
          console.log("Bale Pack", response.data);
        }
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchBalePackDetails();
  }, []);

  useEffect(() => {
    //    // console.log(" date" , date);
    // // console.log(" shift value",shiftvalue);
    const { date, shiftvalue } = state || {};
    // console.log("date", date);
    // console.log("shift", shiftvalue);
    setNewDate(date);
    setShift(shiftvalue);
    // // console.log("New Date", new Date(date).toISOString().substring(0, 10));

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${ API.prodUrl}/Precot/api/bleach/findByDateAndShift`,
        { date: date, shift: shiftvalue },
        { headers }
      )
      .then((response) => {
        handleApiResponse(response.data);
        // console.log("Hod ", response.data[0].hod_status);
        // console.log("supervisor", response.data[0].supervisor_status);
        // if (
        //   localStorage.getItem("role") == "ROLE_SUPERVISOR" &&
        //   response.data[0].status == "No Data"
        // ) {
        //   setSaveBtnStatus(true);
        //   setSubmitBtnStatus(true);
        //   setPrintBtnStatus(false);
        // } else if (
        //   (localStorage.getItem("role") == "ROLE_SUPERVISOR" &&
        //     response.data[0].hod_status == "") ||
        //   ("null" && response.data[0].supervisor_status == "SUPERVISOR_SAVED")
        // ) {
        //   setSaveBtnStatus(true);
        //   setSubmitBtnStatus(true);
        //   setPrintBtnStatus(false);
        // } else if (
        //   localStorage.getItem("role") == "ROLE_SUPERVISOR" &&
        //   response.data[0].hod_status == "" &&
        //   response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
        // ) {
        //   setSaveBtnStatus(false);
        //   setSubmitBtnStatus(false);
        //   setPrintBtnStatus(false);
        //   setDisable(true);
        // } else if (
        //   localStorage.getItem("role") == "ROLE_SUPERVISOR" &&
        //   response.data[0].hod_status == "WAITING_FOR_APPROVAL" &&
        //   response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
        // ) {
        //   setSaveBtnStatus(false);
        //   setSubmitBtnStatus(false);
        //   setPrintBtnStatus(false);
        //   setDisable(true);
        // } else if (
        //   // || localStorage.getItem("role") == "ROLE_DESIGNEE"
        //   localStorage.getItem("role") == "ROLE_HOD" &&
        //   response.data[0].hod_status == "" &&
        //   response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
        // ) {
        //   setSaveBtnStatus(true);
        //   setSubmitBtnStatus(true);
        //   setPrintBtnStatus(false);
        //   setDisable(false);
        // } else if (
        //   localStorage.getItem("role") == "ROLE_HOD" &&
        //   response.data[0].hod_status == "WAITING_FOR_APPROVAL" &&
        //   response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
        // ) {
        //   setSaveBtnStatus(true);
        //   setSubmitBtnStatus(true);
        //   setPrintBtnStatus(false);
        //   setDisable(false);
        // } else if (
        //   localStorage.getItem("role") == "ROLE_HOD" &&
        //   response.data[0].hod_status == "HOD_SAVED" &&
        //   response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
        // ) {
        //   setSaveBtnStatus(true);
        //   setSubmitBtnStatus(true);
        //   setPrintBtnStatus(false);
        // } else if (
        //   localStorage.getItem("role") == "ROLE_HOD" &&
        //   response.data[0].hod_status == "" &&
        //   response.data[0].supervisor_status == ""
        // ) {
        //   setSaveBtnStatus(false);
        //   setSubmitBtnStatus(false);
        //   setPrintBtnStatus(false);
        //   setDisable(true);
        // } else if (
        //   // || localStorage.getItem("role") == "ROLE_DESIGNEE"
        //   localStorage.getItem("role") == "ROLE_DESIGNEE" &&
        //   response.data[0].hod_status == "" &&
        //   response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
        // ) {
        //   setSaveBtnStatus(true);
        //   setSubmitBtnStatus(true);
        //   setPrintBtnStatus(false);
        //   setDisable(false);
        // } else if (
        //   localStorage.getItem("role") == "ROLE_DESIGNEE" &&
        //   response.data[0].hod_status == "WAITING_FOR_APPROVAL" &&
        //   response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
        // ) {
        //   setSaveBtnStatus(true);
        //   setSubmitBtnStatus(true);
        //   setPrintBtnStatus(false);
        //   setDisable(false);
        // } else if (
        //   localStorage.getItem("role") == "ROLE_DESIGNEE" &&
        //   response.data[0].hod_status == "HOD_SAVED" &&
        //   response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
        // ) {
        //   setSaveBtnStatus(true);
        //   setSubmitBtnStatus(true);
        //   setPrintBtnStatus(false);
        // } else if (
        //   localStorage.getItem("role") == "ROLE_DESIGNEE" &&
        //   response.data[0].hod_status == "" &&
        //   response.data[0].supervisor_status == ""
        // ) {
        //   setSaveBtnStatus(false);
        //   setSubmitBtnStatus(false);
        //   setPrintBtnStatus(false);
        //   setDisable(true);
        // } else if (
        //   response.data[0].hod_status == "HOD_APPROVED" &&
        //   response.data[0].supervisor_status == "SUPERVISOR_APPROVED"
        // ) {
        //   // // console.log("hod status " ,"supervisor status ")
        //   setSaveBtnStatus(false);
        //   setSubmitBtnStatus(false);
        //   setPrintBtnStatus(true);
        //   setDisable(true);
        // }
        const isRole = (roleCheck) => role === roleCheck;
        const isStatus = (key, value) => response.data[0][key] === value;
        // const isStatus = (data, key, value) => data[key] === value;

        const response1 = {
          data: [
            {
              status: "No Data",
              supervisor_status: "",
              hod_status: "",
            },
          ],
        };

        // Initial state
        setSaveBtnStatus(false);
        setSubmitBtnStatus(false);
        setPrintBtnStatus(false);
        setDisable(true);
        // setRemarkDisable(false);
        if (isRole("ROLE_SUPERVISOR")) {
          if (
            isStatus("supervisor_status", "SUPERVISOR_APPROVED") &&
            isStatus("hod_status", "")
          ) {
            setDisable(true);
          } else if (
            isStatus("supervisor_status", "SUPERVISOR_APPROVED") &&
            isStatus("hod_status", "")
          ) {
            setSubmitBtnStatus(true);
            setDisable(false);
          } else if (
            isStatus("supervisor_status", "SUPERVISOR_APPROVED") &&
            isStatus("hod_status", "HOD_REJECTED")
          ) {
            setSubmitBtnStatus(true);
            setDisable(false);
          } else if (
            isStatus("supervisor_status", "SUPERVISOR_SAVED") &&
            isStatus("hod_status", "")
          ) {
            setSaveBtnStatus(true);
            setSubmitBtnStatus(true);
            setDisable(false);
          } else if (isStatus("status", "No Data")) {
            setSaveBtnStatus(true);
            setSubmitBtnStatus(true);
            setDisable(false);
          }
        } else if (isRole("ROLE_HOD")) {
          if (
            isStatus("hod_status", "WAITING_FOR_APPROVAL") &&
            isStatus("supervisor_status", "SUPERVISOR_APPROVED")
          ) {
            setSubmitBtnStatus(true);
            setDisable(true);
          } else if (
            isStatus("hod_status", "HOD_REJECTED") &&
            isStatus("supervisor_status", "SUPERVISOR_APPROVED")
          ) {
            setSubmitBtnStatus(false);
            setDisable(true);
          } else if (
            isStatus("hod_status", "HOD_APPROVED") &&
            isStatus("supervisor_status", "SUPERVISOR_APPROVED")
          ) {
            setSubmitBtnStatus(false);
            setDisable(true);
          } else if (
            isStatus("hod_status", "") &&
            isStatus("hr_status", "") &&
            isStatus("supervisor_status", "")
          ) {
          }
        } else if (isRole("ROLE_DESIGNEE")) {
          if (
            isStatus("hod_status", "WAITING_FOR_APPROVAL") &&
            isStatus("supervisor_status", "SUPERVISOR_APPROVED")
          ) {
            setSubmitBtnStatus(true);
            setDisable(false);
          } else if (
            isStatus("hod_status", "") &&
            isStatus("supervisor_status", "")
          ) {
          }
        } else if (
          isStatus("hod_status", "HOD_APPROVED") &&
          isStatus("supervisor_status", "SUPERVISOR_APPROVED")
        ) {
          setPrintBtnStatus(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/Precot/Bleaching/F-36/Summary");
      });
  }, []);

  const handleApiResponse = (data) => {
    setApistatus(data.status);

    if (data[0].status === "No Data") {
      handleNoDataResponse();
    } else {
      handleDataResponse(data);
    }
  };

  const handleApprove = async () => {
    const { date, shiftvalue, slb_id } = state || {};
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/bleach/approveOrRejectHOD`,
        {
          id: slb_id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-36/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    // console.log("print screen works");
    // Add any other print-related logic here
  };
  const handleReject = async () => {
    const { date, shiftvalue, slb_id } = state || {};
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setSaveLoading(false);
      return;
    }

    const res = await axios
      .put(
        `${ API.prodUrl}/Precot/api/bleach/approveOrRejectSanitizationMechineAndSurfaceDetails`,
        {
          id: slb_id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-36/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleNoDataResponse = (data) => {
    // setPrinBtnDisable(true);
    setShiftStatus("No Data");
    // setNewDate();
    setSlbId("");
    setLayDown("");
    setCakepress1("");
    setCakepress2("");
    setKier01("");
    setKier02("");
    setKier03("");
    setHydro01("");
    setHydro02("");
    setCakeOpener("");
    // setNoofBale("");
    // setWeightingBale("");
    setRemarks("N/A");
    setMailStatus("");
    setSupervisorStatus("");
    setSupervisorSavedOn("");
    setSupervisorSavedBy("");
    setSupervisorSavedId("");
    setSupervisorSubmitOn("");
    setSupervisorSubmitBy("");
    setSupervisorSubmitId("");
    setSupervisorSign("");
    setHodStatus("");
    setHodSavedOn("");
    setHodSavedBy("");
    setHodSavedId("");
    setHodSubmitOn("");
    setHodSubmitBy("");
    setHodSubmitId("");
    setHodSign("");
  };

  const handleDataResponse = (data) => {
    const shiftData = data[0];
    // setPrinBtnDisable(false);
    setShiftGet(data);
    setSlbId(data[0].slb_id);
    setNewDate(data[0].date);
    setLayDown(data[0].bmrNumber);
    setCakepress1(data[0].cakePress1);
    setCakepress2(data[0].cakePress2);
    setKier01(data[0].kier1);
    setKier02(data[0].kier2);
    setKier03(data[0].kier3);
    setHydro01(data[0].hydro1);
    setHydro02(data[0].hydro2);
    setCakeOpener(data[0].cakeopenerDryerAbBalePress);
    setNoofBale(data[0].noOfBales);
    setWeightingBale(data[0].weightInKg);
    setRemarks(data[0].remarks);
    setMailStatus(data[0].mail_status);
    setSupervisorStatus(data[0].supervisor_status);
    setSupervisorSavedOn(data[0].supervisor_saved_on);
    setSupervisorSavedBy(data[0].supervisor_saved_by);
    setSupervisorSavedId(data[0].supervisor_saved_id);
    setSupervisorSubmitOn(data[0].supervisor_submit_on);
    setSupervisorSubmitBy(data[0].supervisor_submit_by);
    setSupervisorSubmitId(data[0].supervisor_submit_id);
    setSupervisorSign(data[0].supervisor_sign);
    setHodStatus(data[0].hod_status);
    setHodSavedOn(data[0].hod_saved_on);
    setHodSavedBy(data[0].hod_saved_by);
    setHodSavedId(data[0].hod_saved_id);
    setHodSubmitOn(data[0].hod_submit_on);
    setHodSubmitBy(data[0].hod_submit_by);
    setHodSubmitId(data[0].hod_submit_id);
    setHodSign(data[0].hod_sign);

    setNewData(data);
  };

  const handlelogDown = (value) => {
    // console.log("BMR_NO", value);
    setLayDown(value);
  };

  const goTo = () => {
    navigate(routePath);
  };

  const handlePrint = () => {
    window.print();
  };

  // const [rows, setRows] = useState(5);
  const [rows, setRows] = useState(5); // Initialize with 5

  // Function to handle submitting
  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      await submitshiftlogbook();
      setSubmitLoading(false);
      setTimeout(() => {
        navigate("/Precot/Bleaching/F-36/Summary");
      }, 2000);
    } catch (error) {
      console.error("Error submitting Shift job Book:", error);
      message.error(error.res.data.message);
      setSubmitLoading(false);
    }
  };

  // Function to handle submitting
  const handleSave = async () => {
    // setSaveLoading(true);
    // // console.log("Datasource", dataSource);
    try {
      // // console.log("Apistatus", apiStatus);

      switch (apiStatus) {
        case "No Data":
          await sendshiftlogbook();
          break;
        default:
          await sendshiftlogbookId();
      }
      // setSaveLoading(false);
      //// console.log("Date Format :",new Date(INcharge_Date).toLocaleDateString() + " " +new Date(INcharge_Date).toLocaleDateString )
      // alert("Shift job Book submitted successfully!");
    } catch (error) {
      console.error("Error submitting Shift job Book:", error);
      // setSaveLoading(false);
      // message.error(error.response.data.message);
    }
  };

  const sendshiftlogbookId = async () => {
    setLoading(true);
    try {
      // Format the payload according to the API documentation
      if (
        !BMR
        // !BMR ||
        // !Cakepress1 ||
        // !Cakepress2 ||
        // !Kier01 ||
        // !Kier02 ||
        // !Kier03 ||
        // !Hydro01 ||
        // !Hydro02 ||
        // !CakeOpener ||
        // !NoofBale ||
        // !WeightingBale
      ) {
        let errorMessage = "";
        if (!BMR) errorMessage += "Please fill in BMR field .\n";
        // if (!Cakepress1) errorMessage += "Please fill in Cakepress1 field .\n";
        // if (!Cakepress2) errorMessage += "Please fill in Cakepress2 field .\n";
        // if (!Kier01) errorMessage += "Please fill in Kier01 field.\n";
        // if (!Kier02) errorMessage += "Please fill in Kier02 field.\n";
        // if (!Kier03) errorMessage += "Please fill in Kier03 field.\n";
        // if (!Hydro01) errorMessage += "Please fill in Hydro01 field.\n";
        // if (!Hydro02) errorMessage += "Please fill in Hydro02 field.\n";
        // if (!CakeOpener) errorMessage += "Please fill in CakeOpener field.\n";
        // if (!NoofBale) errorMessage += "Please fill in NoofBale field.\n";
        // if (!WeightingBale)
        //   errorMessage += "Please fill in WeightingBale field.\n";

        messageApi.open({
          type: "error",
          content: errorMessage,
        });
        return false;
        setLoading(false);
      }

      // Make the POST request to the API endpoint
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      // Make the POST request to the API endpoint with headers
      const response = await axios
        .post(
          `${ API.prodUrl}/Precot/api/bleach/createOrUpdateShiftlogBookF36`,
          {
            slb_id: slbId,
            unit: unit,
            formatName: formatName,
            formatNo: formatNo,
            sopNumber: sopNo,
            revisionNo: revisionNo,
            // bmrNumber: bmr,
            date: newDate,
            shift: shift,
            cakePress1: Cakepress1,
            cakePress2: Cakepress2,
            bmrNumber: BMR,
            kier1: Kier01,
            kier2: Kier02,
            kier3: Kier03,
            hydro1: Hydro01,
            hydro2: Hydro02,
            cakeopenerDryerAbBalePress: CakeOpener,
            noOfBales: NoofBale,
            weightInKg: WeightingBale,
            remarks: remarks,
            // productionSupervisorSign: productionSupervisorSign,
            supervisor_status: supervisor_status,
            hod_status: hod_status,
            mail_status: mail_status,
            supervisor_saved_on: supervisor_saved_on,
            supervisor_saved_by: supervisor_saved_by,
            supervisor_saved_id: supervisor_saved_id,
            supervisor_submit_on: supervisor_submit_on,
            supervisor_submit_by: supervisor_submit_by,
            supervisor_submit_id: supervisor_submit_id,
            supervisor_sign: supervisor_sign,
            hod_saved_on: hod_saved_on,
            hod_saved_by: hod_saved_by,
            hod_saved_id: hod_saved_id,
            hod_submit_on: hod_submit_on,
            hod_submit_by: hod_submit_by,
            hod_submit_id: hod_submit_id,
            hod_sign: hod_sign,
          },
          { headers }
        )
        .then((res) => {
          message.success({
            content: "ShiftLog Book Details Save Successfully",
          });
          setTimeout(() => {
            navigate("/Precot/Bleaching/F-36/Summary");
          }, 2000);
        })
        .catch((err) => {
          // console.log("Erorr", err);
          message.error(err.response.data.message);
        });
      // console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to send Shift Job Book");
    } finally {
      setLoading(false);
    }
  };

  // Payload..
  const sendshiftlogbook = async () => {
    setLoading(true);
    try {
      // Format the payload according to the API documentation

      if (
        !BMR
        // !Cakepress1 ||
        // !Cakepress2 ||
        // !Kier01 ||
        // !Kier02 ||
        // !Kier03 ||
        // !Hydro01 ||
        // !Hydro02 ||
        // !CakeOpener ||
        // !NoofBale ||
        // !WeightingBale
      ) {
        let errorMessage = "";
        if (!BMR) errorMessage += "Please fill in BMR field .\n";
        // if (!Cakepress1) errorMessage += "Please fill in Cakepress1 field .\n";
        // if (!Cakepress2) errorMessage += "Please fill in Cakepress2 field .\n";
        // if (!Kier01) errorMessage += "Please fill in Kier01 field.\n";
        // if (!Kier02) errorMessage += "Please fill in Kier02 field.\n";
        // if (!Kier03) errorMessage += "Please fill in Kier03 field.\n";
        // if (!Hydro01) errorMessage += "Please fill in Hydro01 field.\n";
        // if (!Hydro02) errorMessage += "Please fill in Hydro02 field.\n";
        // if (!CakeOpener) errorMessage += "Please fill in CakeOpener field.\n";
        // if (!NoofBale) errorMessage += "Please fill in NoofBale field.\n";
        // if (!WeightingBale)
        //   errorMessage += "Please fill in WeightingBale field.\n";

        // setLoading(false);
        messageApi.open({
          type: "error",
          content: errorMessage,
        });
        return false;
        setLoading(false);
      }
      // return true;
      // Make the POST request to the API endpoint
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      // Make the POST request to the API endpoint with headers
      const response = await axios
        .post(
          `${ API.prodUrl}/Precot/api/bleach/createOrUpdateShiftlogBookF36`,
          {
            unit: unit,
            formatName: formatName,
            formatNo: formatNo,
            sopNumber: sopNo,
            revisionNo: revisionNo,
            date: newDate,
            shift: shift,
            cakePress1: Cakepress1,
            cakePress2: Cakepress2,
            bmrNumber: BMR,
            kier1: Kier01,
            kier2: Kier02,
            kier3: Kier03,
            hydro1: Hydro01,
            hydro2: Hydro02,
            cakeopenerDryerAbBalePress: CakeOpener,
            noOfBales: NoofBale,
            weightInKg: WeightingBale,
            remarks: remarks,
            supervisor_status: supervisor_status,
            hod_status: hod_status,
            mail_status: mail_status,
            supervisor_saved_on: supervisor_saved_on,
            supervisor_saved_by: supervisor_saved_by,
            supervisor_saved_id: supervisor_saved_id,
            supervisor_submit_on: supervisor_submit_on,
            supervisor_submit_by: supervisor_submit_by,
            supervisor_submit_id: supervisor_submit_id,
            supervisor_sign: supervisor_sign,
            hod_saved_on: hod_saved_on,
            hod_saved_by: hod_saved_by,
            hod_saved_id: hod_saved_id,
            hod_submit_on: hod_submit_on,
            hod_submit_by: hod_submit_by,
            hod_submit_id: hod_submit_id,
            hod_sign: hod_sign,
          },
          { headers }
        )
        .then((res) => {
          message.success({
            content: "ShiftLog Book Details Save Successfully",
          });
          setTimeout(() => {
            navigate("/Precot/Bleaching/F-36/Summary");
          }, 2000);
        })
        .catch((err) => {
          // console.log("Erorr", err);
          message.error({
            content: err.res.data.message,
          });
        });
      // console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to send Shift Job Book");
    } finally {
      setLoading(false);
    }
  };

  // Comman Submitted payload...
  const submitshiftlogbook = async () => {
    try {
      if (
        !BMR ||
        !Cakepress1 ||
        !Cakepress2 ||
        !Kier01 ||
        !Kier02 ||
        !Kier03 ||
        !Hydro01 ||
        !Hydro02 ||
        !CakeOpener ||
        !NoofBale ||
        !WeightingBale
      ) {
        let errorMessage = "";

        if (!BMR) errorMessage += "Please fill in BMR field .\n";
        if (!Cakepress1) errorMessage += "Please fill in Cakepress1 field .\n";
        if (!Cakepress2) errorMessage += "Please fill in Cakepress2 field .\n";
        if (!Kier01) errorMessage += "Please fill in Kier01 field.\n";
        if (!Kier02) errorMessage += "Please fill in Kier02 field.\n";
        if (!Kier03) errorMessage += "Please fill in Kier03 field.\n";
        if (!Hydro01) errorMessage += "Please fill in Hydro01 field.\n";
        if (!Hydro02) errorMessage += "Please fill in Hydro02 field.\n";
        if (!CakeOpener) errorMessage += "Please fill in CakeOpener field.\n";
        if (!NoofBale) errorMessage += "Please fill in No of Bale field.\n";
        if (!WeightingBale)
          errorMessage += "Please fill in Weight Bale field.\n";

        messageApi.open({
          type: "error",
          content: errorMessage,
        });
        return false;
      }
      // Format the payload according to the API documentation
      const payload = {
        slb_id: slbId,
        unit: unit,
        formatName: formatName,
        formatNo: formatNo,
        sopNumber: sopNo,
        revisionNo: revisionNo,
        date: newDate,
        shift: shift,
        cakePress1: Cakepress1,
        cakePress2: Cakepress2,
        bmrNumber: BMR,
        kier1: Kier01,
        kier2: Kier02,
        kier3: Kier03,
        hydro1: Hydro01,
        hydro2: Hydro02,
        cakeopenerDryerAbBalePress: CakeOpener,
        noOfBales: NoofBale,
        weightInKg: WeightingBale,
        remarks: remarks,
        supervisor_status: supervisor_status,
        hod_status: hod_status,
        mail_status: mail_status,
        supervisor_saved_on: supervisor_saved_on,
        supervisor_saved_by: supervisor_saved_by,
        supervisor_saved_id: supervisor_saved_id,
        supervisor_submit_on: supervisor_submit_on,
        supervisor_submit_by: supervisor_submit_by,
        supervisor_submit_id: supervisor_submit_id,
        supervisor_sign: supervisor_sign,
        hod_saved_on: hod_saved_on,
        hod_saved_by: hod_saved_by,
        hod_saved_id: hod_saved_id,
        hod_submit_on: hod_submit_on,
        hod_submit_by: hod_submit_by,
        hod_submit_id: hod_submit_id,
        hod_sign: hod_sign,
        // stoppageList: filteredDataSource,
      };

      // Make the POST request to the API endpoint
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      // Make the POST request to the API endpoint with headers
      const response = await axios
        .put(
          `${ API.prodUrl}/Precot/api/bleach/approveOrRejectShiftlogBookF36Details`,
          payload,
          {
            headers,
          }
        )
        .then((res) => {
          message.success({
            content: res.data.message,
          });
          setTimeout(() => {
            navigate("/Precot/Bleaching/F-36/Summary");
          }, 2000);
        })
        // .then((res) => {
        //   navigate("/Precot/Bleaching/F-36/Summary");
        // })
        .catch((err) => {
          // console.log("Erorr", err);
          message.error(err.response.data.message);
        });
      // // console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      // throw new Error(error);
    }
  };

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-36/Summary");
  };

  // const formattedSupervisorDate = moment(supervisor_submit_on).format("DD/MM/YYYY");
  const formattedDate = moment(newDate).format("DD/MM/YYYY");
  let formattedSupervisorDate;
  if (supervisor_submit_on) {
    formattedSupervisorDate =
      moment(supervisor_submit_on).format("DD/MM/YYYY HH:mm");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedSupervisorDate = ""; // Or any other default value or error handling
  }
  let formattedHODDate;
  if (hod_submit_on) {
    formattedHODDate = moment(hod_submit_on).format("DD/MM/YYYY HH:mm");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedHODDate = ""; // Or any other default value or error handling
  }
  // const formattedHODDate = moment(hod_submit_on).format("DD/MM/YYYY");

  // const combinedSupervisorValue = `${supervisor_sign}, ${formattedSupervisorDate}`;
  // const combinedHodValue = `${hod_sign} , ${formattedHODDate}`;

  const items = [
    {
      key: "1",
      label: (
        <p>
          {" "}
          <b>Machine Wise Running Details </b>
        </p>
      ),
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
              height: "100%",
            }}
          >
            <tr>
              <td colSpan="7" style={{ height: "25px", textAlign: "left" }}>
                <b>Machine wise running details (at the time of handover): </b>
              </td>
            </tr>
            <tr>
              <td colSpan="3" style={{ height: "15px" }}>
                <b>Blow-room/Carding</b>
              </td>
              {/* <td colSpan="3" >Lay down No.:</td> */}
              <td colSpan="4" style={{ textAlign: "left" }}>
                <Form>
                  <Form.Item label=" BMR No :">
                    {/* <p>{localStorage.getItem("bmr")}</p> */}
                    <Select
                      placeholder="Select BMR No"
                      value={BMR}
                      onChange={handlelogDown}
                      style={{ width: 120, fontWeight: "bold" }}
                      disabled={disable}
                      required
                      showSearch
                    >
                      {layDownOptions.map((BMR) => (
                        <Option key={BMR.BMR_NO} value={BMR.BMR_NO}>
                          {BMR.BMR_NO}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form>
              </td>
            </tr>
            <tr>
              {/* <td colSpan="4">Cake press#01:</td> */}
              <td align="center">
                <b>
                  Cake Press#01:{" "}
                  <span style={{ color: "#FF0000", fontWeight: "bold" }}>
                    *
                  </span>{" "}
                </b>
              </td>
              <td colSpan="2">
                {" "}
                <input
                  className="inp-new"
                  style={{
                    padding: 10,
                    margin: 0,
                    width: "90%",
                    height: 12,
                    border: "none",
                  }}
                  // disabled={btnSubmitSaveState && hodSubmitSaveState }
                  required
                  disabled={disable}
                  value={Cakepress1}
                  // onChange={(e) => setCakepress1(e.target.value)}
                  onChange={handleCakePress1}
                />
              </td>
              <td align="center">
                <b>
                  Cake Press#02:{" "}
                  <span style={{ color: "#FF0000", fontWeight: "bold" }}>
                    *
                  </span>
                </b>
              </td>
              <td colSpan="3">
                <input
                  className="inp-new"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  // disabled={btnSubmitSaveState && hodSubmitSaveState }
                  // disabled={
                  //   status === "SUBMITTED" ||
                  //   (shiftget.data && shiftget.data[0].supervisiorStatus === "SUPERVISOR_SUBMITTED" && !isHodLoggedIn) ||
                  //   (shiftget.data && shiftget.data[0].hodMailStatus === "HOD_SUBMITTED")
                  // }
                  required
                  disabled={disable}
                  value={Cakepress2}
                  // onChange={(e) => setCakepress2(e.target.value)}
                  onChange={handleCakePress2}
                />
              </td>
            </tr>
            <tr>
              {/* <td colSpan ="2"> Kier#01 </td>
                <td colSpan ="3"> Kier#02 </td>
                <td colSpan ="2"> Kier#03 </td> */}
              <td align="center">
                <b>
                  Kier#01:{" "}
                  <span style={{ color: "#FF0000", fontWeight: "bold" }}>
                    *
                  </span>{" "}
                </b>{" "}
              </td>
              <td>
                {/* {" "} */}
                <input
                  className="inp-new"
                  style={{
                    padding: 10,
                    margin: 0,
                    width: "80%",
                    height: 12,
                    border: "none",
                  }}
                  // disabled={btnSubmitSaveState && hodSubmitSaveState }
                  required
                  disabled={disable}
                  value={Kier01}
                  onChange={(e) => setKier01(e.target.value)}
                  // onChange={handleKier1}
                />
              </td>
              <td align="center">
                <b>
                  Kier#02:{" "}
                  <span style={{ color: "#FF0000", fontWeight: "bold" }}>
                    *
                  </span>
                </b>
              </td>
              <td colSpan="2">
                {" "}
                <input
                  className="inp-new"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "80%",
                    height: 12,
                    border: "none",
                  }}
                  // disabled={btnSubmitSaveState && hodSubmitSaveState }
                  required
                  disabled={disable}
                  value={Kier02}
                  onChange={(e) => setKier02(e.target.value)}
                  // onChange={handleKier2}
                />
              </td>
              <td align="center">
                <b>
                  Kier#03:{" "}
                  <span style={{ color: "#FF0000", fontWeight: "bold" }}>
                    *
                  </span>
                </b>{" "}
              </td>
              <td>
                <input
                  className="inp-new"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  // disabled={btnSubmitSaveState && hodSubmitSaveState }
                  required
                  disabled={disable}
                  value={Kier03}
                  onChange={(e) => setKier03(e.target.value)}
                  // onChange={handleKier3}
                />{" "}
              </td>
            </tr>
            <tr>
              <td align="center">
                <b>
                  Hydro#01:{" "}
                  <span style={{ color: "#FF0000", fontWeight: "bold" }}>
                    *
                  </span>
                </b>
              </td>
              <td colSpan="2">
                <input
                  className="inp-new"
                  style={{
                    padding: 10,
                    margin: 0,
                    width: "80%",
                    height: 12,
                    border: "none",
                  }}
                  // disabled={btnSubmitSaveState && hodSubmitSaveState }
                  required
                  disabled={disable}
                  value={Hydro01}
                  onChange={(e) => setHydro01(e.target.value)}
                  // onChange={handleHydro1}
                />
              </td>
              <td align="center">
                <b>
                  Hydro#02:{" "}
                  <span style={{ color: "#FF0000", fontWeight: "bold" }}>
                    *
                  </span>
                </b>{" "}
              </td>
              <td colSpan="3">
                <input
                  className="inp-new"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  // disabled={btnSubmitSaveState && hodSubmitSaveState }
                  required
                  disabled={disable}
                  value={Hydro02}
                  onChange={(e) => setHydro02(e.target.value)}
                  // onChange={handleHydro2}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                <b>
                  Cake Opener, Dryer & AB Bale Press :{" "}
                  <span style={{ color: "#FF0000", fontWeight: "bold" }}>
                    *
                  </span>{" "}
                </b>
              </td>
              <td colSpan="5">
                <input
                  className="inp-new"
                  style={{
                    padding: 10,
                    margin: 0,
                    width: "60%",
                    height: 12,
                    border: "none",
                  }}
                  // disabled={btnSubmitSaveState && hodSubmitSaveState }
                  required
                  disabled={disable}
                  value={CakeOpener}
                  onChange={(e) => setCakeOpener(e.target.value)}
                  // onChange={handleCakeOpener}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="7">
                {" "}
                <b>Bale Press Machine Production details:</b>
              </td>
            </tr>

            <tr>
              <td align="center">
                <b>
                  No. of Bales:{" "}
                  <span style={{ color: "#FF0000", fontWeight: "bold" }}>
                    *
                  </span>
                </b>{" "}
              </td>
              <td colSpan="2">
                <input
                  className="inp-new"
                  style={{
                    padding: 10,
                    marginLeft: 0,
                    width: "30%",
                    height: 12,
                    border: "none",
                  }}
                  // disabled={btnSubmitSaveState && hodSubmitSaveState }
                  required
                  disabled={disable}
                  value={NoofBale}
                  onChange={handleNoofBaleChanges}
                />
              </td>
              {/* <tr>
                <td>
                  <b>PDE</b>
                </td>
              </tr> */}
              <td align="center">
                <b>
                  {" "}
                  Weight in Kgs:{" "}
                  <span style={{ color: "#FF0000", fontWeight: "bold" }}>
                    *
                  </span>
                </b>
              </td>
              <td colSpan="3">
                <input
                  className="inp-new"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "40%",
                    height: 12,
                    border: "none",
                  }}
                  // disabled={btnSubmitSaveState && hodSubmitSaveState }
                  required
                  disabled={disable}
                  value={WeightingBale}
                  onChange={handleWeightingBale}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <p>
          {" "}
          <b>Stoppage Details</b>
        </p>
      ),
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            {/* <tr>
                <td colSpan = "7"> <b>Stoppage details:</b></td>
            </tr>
     */}
            <tr>
              <td rowSpan="2" colSpan="2" style={{ textAlign: "center" }}>
                <b> Machine Name</b>{" "}
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <b> Time </b>
              </td>
              <td rowSpan="2" colSpan="3" style={{ textAlign: "center" }}>
                <b> Reasons</b>
              </td>
              <td rowSpan="2" colSpan="3" style={{ textAlign: "center" }}>
                <b> Remarks</b>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>
                {" "}
                <b>From </b>
              </td>
              <td style={{ textAlign: "center" }}>
                <b> To </b>
              </td>
            </tr>
            {/* [...Array(rows)].map((_, index) */}

            {stoppageDetails.map((data, index) => (
              <tr key={index}>
                {/* <td colSpan="2" contentEditable="true"></td>
              <td  contentEditable="true"></td>
              <td contentEditable="true"></td>
              <td colSpan="3" contentEditable="true"></td> */}
                <td colSpan="2" style={{ height: "25px", width: "20px" }}>
                  <input
                    className="inp-new"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    value={data.mcn}
                    // onChange={(e) =>
                    //   handleInputChange(index, "mcn", e.target.value)
                    // }
                  />
                </td>
                <td style={{ height: "25px", width: "80px" }}>
                  <input
                    className="inp-new"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    type="text"
                    disabled={disable}
                    value={data.f_time}
                    // onChange={(e) =>
                    //   handleInputChange(index, "fromTime", e.target.value)
                    // }
                  />
                </td>
                <td style={{ height: "25px", width: "80px" }}>
                  <input
                    className="inp-new"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    type="text"
                    disabled={disable}
                    value={data.t_time}
                    // onChange={(e) =>
                    //   handleInputChange(index, "toTime", e.target.value)
                    // }
                  />
                  {/* {generateToTimeOptions(fromTime).map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))} */}
                </td>
                
                <td colSpan="3" style={{ height: "25px" }}>
                  <input
                    className="inp-new"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    disabled={disable}
                    value={data.reason}
                    // onChange={(e) =>
                    //   handleInputChange(index, "reason", e.target.value)
                    // }
                  />
                </td>
                <td colSpan="3" style={{ height: "25px" }}>
                  <input
                    className="inp-new"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: 12,
                      border: "none",
                    }}
                    disabled={disable}
                    value={data.remarks}
                    // onChange={(e) =>
                    //   handleInputChange(index, "reason", e.target.value)
                    // }
                  />
                </td>
              </tr>
            ))}
          </table>
          {/* //     <button onClick={handleAdd}>Add Row</button> */}
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <p>
          {" "}
          <b> Remarks </b>
        </p>
      ),
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              // border: "1px solid black",
              width: "100%",
            }}
          >
            {/* <tr> */}
            {/* <td colSpan ="7"style={{ height: "125px"}}> Remarks:</td> */}
            {/* <Input
                className="inp-new"
                addonBefore="Remarks"
                placeholder="Remarks"
                size="large"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                style={{ fontWeight: "bold" }}
              /> */}
            <div className="text-input-container">
              <textarea
                className="text-input"
                // disabled={btnSubmitSaveState && hodSubmitSaveState }
                disabled={disable}
                value={remarks}
                onChange={handleChange}
                placeholder="Enter up to 100 words"
              />
            </div>
            {/* </tr> */}
          </table>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <p>
          {" "}
          <b> Reviews </b>
        </p>
      ),
      children: (
        <div
          style={{
            width: "100%",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tr>
              <td colSpan="3" style={{ height: "35px", textAlign: "center" }}>
                <b>Performed by Production Supervisor</b>
              </td>

              <td colSpan="4" style={{ textAlign: "center" }}>
                <b>Reviewed By Head of the Department/Designee</b>
              </td>
            </tr>
            <tr>
              <td
                colSpan="3"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {supervisor_status === "SUPERVISOR_APPROVED" && (
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
                        <div>{supervisor_sign}</div>
                        <div> {formattedSupervisorDate}</div>
                      </div>
                      {getImage !== "" && (
                        <img
                          className="signature"
                          src={getImage}
                          alt="Supervisor"
                        />
                      )}
                    </div>
                    {/* <div>Signature & Date</div> */}
                  </>
                )}

                {/* <span style={{fontSize:'11px',marginLeft:"0px"}}>      Signature & Date</span> */}
              </td>
              <td
                colSpan="4"
                style={{ textAlign: "center", verticalAlign: "bottom" }}
              >
                {(hod_status === "HOD_REJECTED" ||
                  hod_status === "HOD_APPROVED") && (
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
                        <div> {hod_sign} </div>
                        <div> {formattedHODDate}</div>
                      </div>
                      {getImage1 !== "" && (
                        <img className="signature" src={getImage1} alt="HOD" />
                      )}
                    </div>
                  </>
                )}
              </td>
            </tr>
          </table>

          <div
            style={{
              marginLeft: "0px", // or set to a value that suits your layout
              display: "flex", // ensure the button stays inline
              justifyContent: "flex-end",
            }}
          >
            {/* <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: "blue",
                color: "white",
                // marginLeft: "0px", // or set to a value that suits your layout
                // display: "flex", // ensure the button stays inline
                // justifyContent:"flex-end"
              }}
              type="primary"
            >
              Approve
            </Button> */}
          </div>
        </div>
      ),
    },
  ];

  // }

  return (
    <div>
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
              : role === "ROLE_SUPERVISOR" ||
                role === "ROLE_HOD" ||
                role === "ROLE_DESIGNEE"
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
      {contextHolder}
      {loading == true ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            backgroundColor: "rgba(233,242,234,.8)",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={gif} alt="loading" />
        </div>
      ) : null}
      <BleachingHeader
        unit="Unit-H"
        formName="SHIFT LOG BOOK"
        formatNo="PH-PRD01/F-013"
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
          //     display: printBtnStatus ? "block" : "none",
          //   }}
          //   shape="round"
          //   icon={<IoPrint color="#00308F" />}
          //   onClick={() => window.print()}
          // >
          //   &nbsp;Print
          // </Button>,
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
                  display: submitBtnStatus ? "block" : "none",
                }}
                onClick={handleApprove}
                shape="round"
                icon={<img src={approveIcon} alt="Approve Icon" />}
              >
                &nbsp;Approve
              </Button>
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: submitBtnStatus ? "block" : "none",
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
                shape="round"
                onClick={handleSubmit}
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
            // icon={<IoCaretBackCircleSharp color="#00308F" />}
            icon={<GoArrowLeft color="#00308F" />}
            onClick={handleBack}
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

      <Form
        layout="horizontal"
        style={{ display: "flex", alignItems: "center", gap: "20px" }}
      >
        <Form.Item label="Date" style={{ marginBottom: 0 }}>
          <p style={{ margin: 0 }}>{formattedDate}</p>
        </Form.Item>
        <Form.Item label="Shift" style={{ marginBottom: 0 }}>
          <p style={{ margin: 0 }}>{shift}</p>
        </Form.Item>
      </Form>
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
      {/* print started here */}
      <div id="section-to-print">
        <header className="no-print" />
        <main>
          <table style={{ width: "90%", margin: "auto" }}>
            <thead>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none", height: "10px" }} colSpan="7"></td>
              </tr>
              <tr>
                <td
                  rowSpan="4"
                  style={{
                    textAlign: "center",
                    width: "10%",
                    verticalAlign: "bottom",
                  }}
                >
                  <td style={{ width: "30%", border: "none" }}>
                    <img src={logo} alt="hj" width="100%" />{" "}
                  </td>
                  Unit H
                </td>
                <td rowspan="4" colSpan="4" style={{ textAlign: "center" }}>
                  Shift Log Book{" "}
                </td>
                <td>Format No.:</td>
                <td>{newData && newData[0].formatNo}</td>
              </tr>
              <tr>
                <td>Revision No.:</td>
                <td>{newData && newData[0].revisionNo}</td>
              </tr>
              <tr>
                <td>Ref.SOP No.:</td>
                <td>{newData && newData[0].sopNumber}</td>
              </tr>
              <tr>
                <td>Page No.:</td>
                <td>1 of 1</td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }}></td>
              </tr>
            </thead>
            <br />
            <tbody>
              <tr>
                <td colspan="4" style={{ height: "35px" }}>
                  Date:{formattedDate}
                </td>
                {/* <td colspan="2">{newData && newData[0].date}</td> */}
                {/* <td colspan="2">{formattedDate}</td> */}
                <td colspan="4">Shift:{newData && newData[0].shift}</td>
                {/* <td colspan="2">{newData && newData[0].shift}</td> */}
              </tr>

              <tr>
                <td colSpan="7" style={{ height: "25px", textAlign: "left" }}>
                  <b>
                    Machine wise running details (at the time of handover):{" "}
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="7" style={{ height: "25px", textAlign: "left" }}>
                  Blow-room/Carding{" "}
                  <span>BMR No : {newData && newData[0].bmrNumber}</span>
                </td>
                {/* <td colSpan="3"> BMR No : {newData && newData[0].bmrNumber}</td> */}
              </tr>
              <tr>
                <td colSpan="4">
                  Cake Press#01 : {newData && newData[0].cakePress1}
                </td>
                <td colSpan="3">
                  Cake Press#02 : {newData && newData[0].cakePress2}
                </td>
              </tr>
              <tr>
                <td colSpan="2"> Kier#01 : {newData && newData[0].kier1}</td>
                <td colSpan="2"> Kier#02 : {newData && newData[0].kier2}</td>
                <td colSpan="3"> Kier#03 : {newData && newData[0].kier3}</td>
              </tr>
              <tr>
                <td colSpan="4"> Hydro#01 : {newData && newData[0].hydro1}</td>
                <td colSpan="3"> Hydro#02 : {newData && newData[0].hydro2}</td>
              </tr>
              <tr>
                <td colSpan="7">
                  <b>
                    Cake Opener, Dryer & AB Bale Press :{" "}
                    {newData && newData[0].cakeopenerDryerAbBalePress}
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="7" style={{ height: "25px", textAlign: "left" }}>
                  {" "}
                  <b>Bale Press Machine Production details :</b>
                </td>
              </tr>

              <tr>
                <td colSpan="4">
                  {" "}
                  No. of Bales : {newData && newData[0].noOfBales}{" "}
                </td>
                <td colSpan="3">
                  {" "}
                  Weight in Kgs : {newData && newData[0].weightInKg}
                </td>
              </tr>

              <tr>
                <td colSpan="7">
                  {" "}
                  <b>Stoppage details:</b>
                </td>
              </tr>

              <tr>
                <td rowSpan="2" colSpan="2" style={{ textAlign: "center" }}>
                  {" "}
                  Machine Name{" "}
                </td>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {" "}
                  Time
                </td>
                <td rowSpan="2" colSpan="3" style={{ textAlign: "center" }}>
                  {" "}
                  Reasons
                </td>
                <td rowSpan="2" colSpan="3" style={{ textAlign: "center" }}>
                  {" "}
                  Remarks
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> From </td>
                <td style={{ textAlign: "center" }}> To</td>
              </tr>

              {stoppagestatus == true ? (
                <>
                  {stoppageDetails &&
                    stoppageDetails.map((line, index) => (
                      <tr key={index}>
                        <td colSpan="2">{line.mcn}</td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {line.f_time}
                        </td>
                        <td colSpan="1" style={{ textAlign: "center" }}>
                          {line.t_time}
                        </td>
                        <td colSpan="3">{line.reason}</td>
                        <td colSpan="3">{line.remarks}</td>
                      </tr>
                    ))}
                </>
              ) : (
                <div
                  style={{
                    height: "30pt",
                  }}
                ></div>
              )}

              <tr colSpan="15" style={{ height: "35px", textAlign: "center" }}>
                <td colSpan="7"> Remarks :{newData && newData[0].remarks}</td>
              </tr>

              <tr>
                <td colSpan="3" style={{ height: "35px", textAlign: "center" }}>
                  Performed by Production Supervisor
                </td>

                <td colSpan="4" style={{ textAlign: "center" }}>
                  Reviewed By Head of the Department/Designee
                </td>
              </tr>
              <tr>
                <td
                  colSpan="3"
                  style={{
                    height: "80px",
                    textAlign: "center",
                    marginBottom: "auto",
                    verticalAlign: "bottom",
                  }}
                >
                  {newData && newData[0].supervisor_sign}
                  <br></br>
                  {formattedSupervisorDate}
                  <br></br>
                  Sign & Date
                </td>

                <td
                  colSpan="4"
                  style={{ textAlign: "center", verticalAlign: "bottom" }}
                >
                  {newData && newData[0].hod_sign}
                  <br></br>
                  {formattedHODDate}
                  <br></br>
                  Sign & Date
                </td>
              </tr>
              <tr style={{ border: "none" }}>
                <td style={{ border: "none" }} colSpan="7"></td>
              </tr>
            </tbody>

            <br />
            {/* </table> */}

            {/* <table style={{ width: "100%", margin: "auto" }}> */}
            <tfoot>
              <tr>
                <td colSpan="2">Particulars</td>
                <td colSpan="2">Prepard by</td>
                <td colSpan="2">Reviewed by</td>
                <td>Approved by</td>
              </tr>

              <tr>
                <td colSpan="2">Name</td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="2">Signature & Date</td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </main>
        <footer className="no-print" />
      </div>
      {/* print ended here */}
    </div>
  );
};

export default Bleaching_f36;
