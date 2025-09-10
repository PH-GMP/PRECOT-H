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

import { BiLock } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdPrint } from "react-icons/io";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaBackward, FaUserCircle } from "react-icons/fa";
import { IoCaretBackCircleSharp } from "react-icons/io5";
import logo from "../Assests/logo.png";
import { GoArrowLeft } from "react-icons/go";
import moment from "moment";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import API from "../baseUrl.json";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

const { Option } = Select;

const Bleaching_f36_edit = (props) => {
  const [newDate, setNewDate] = useState("");

  const [remarks, setRemarks] = useState("");
  const [Cakepress1, setCakepress1] = useState("");
  const [Cakepress2, setCakepress2] = useState("");
  const [Kier01, setKier01] = useState("");
  const [Kier02, setKier02] = useState("");
  const [Kier03, setKier03] = useState("");
  const [Hydro01, setHydro01] = useState("");
  const [Hydro02, setHydro02] = useState("");
  const [CakeOpener, setCakeOpener] = useState("");
  const [BalePress, setBalePress] = useState("");
  const [NoofBale, setNoofBale] = useState("");
  const [WeightingBale, setWeightingBale] = useState("");
  const [shiftget, setShiftGet] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [newData, setNewData] = useState();
  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [printBtnStatus, setPrintBtnStatus] = useState(false);

  const [mail_status, setMailStatus] = useState("");
  const [supervisor_sign, setSupervisorSign] = useState("");
  const [supervisor_saved_on, setSupervisorSavedOn] = useState("");
  const [supervisor_saved_by, setSupervisorSavedBy] = useState("");
  const [supervisor_saved_id, setSupervisorSavedId] = useState("");
  const [supervisor_submit_on, setSupervisorSubmitOn] = useState("");
  const [supervisor_submit_by, setSupervisorSubmitBy] = useState("");
  const [supervisor_submit_id, setSupervisorSubmitId] = useState("");
  const [supervisor_status, setSupervisorStatus] = useState("");
  const [hod_status, setHodStatus] = useState("");
  const [hod_sign, setHodSign] = useState("");
  const [hod_saved_on, setHodSavedOn] = useState("");
  const [hod_saved_by, setHodSavedBy] = useState("");
  const [hod_saved_id, setHodSavedId] = useState("");
  const [hod_submit_on, setHodSubmitOn] = useState("");
  const [hod_submit_by, setHodSubmitBy] = useState("");
  const [hod_submit_id, setHodSubmitId] = useState("");
  const [error, setError] = useState("");
  const [shift, setShift] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");

  // laydown state...
  const [BMR, setLayDown] = useState(null);
  const [layDownOptions, setLayDownOptions] = useState([]);

  // Stoppage Details
  const [stoppagestatus, setStoppageStatus] = useState("");
  const [stoppageDetails, setStoppageDetails] = useState([]);

  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const formatName = "SHIFT LOG BOOK";
  const formatNo = "PH-PRD01/F-013";
  const revisionNo = "02";
  const sopNo = "QAD01-D-55";
  const unit = "UNIT-H";

  const formattedDate = moment(newDate).format("DD/MM/YYYY");

  const { Option } = Select;

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [wordCount, setWordCount] = useState(0);

  const { state } = useLocation();

  // const handleShiftChange = (value) => {
  //     setShift(value);
  //   };

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
  const [getImage, setGetImage] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = supervisor_sign;
    if (username) {
      // console.log("usernameparams", username);

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
  }, [supervisor_sign,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = hod_sign;
    if (username) {
      // console.log("usernameparams", username);

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
  }, [hod_sign,API.prodUrl, token]);

  const handleChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length <= 100) {
      setRemarks(e.target.value);
      setWordCount(words.length);
    }
  };

  const handleNoofBaleChanges = (e) => {
    let value = e.target.value;
    setNoofBale(value);
  };

  const handleWeightingBale = (e) => {
    const value = e.target.value;

    setWeightingBale(value);
  };

  const handleCakePress1 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    if (regex.test(value)) {
      setCakepress1(value);
    }
    // console.log("cakepress1", Cakepress1);
  };

  const handleCakePress2 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    if (regex.test(value)) {
      setCakepress2(value);
    }
    // console.log("cakepress1", Cakepress1);
  };

  const handleKier1 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    if (regex.test(value)) {
      setKier01(value);
    }
    // console.log("cakepress1", Cakepress1);
  };
  const handleKier2 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    if (regex.test(value)) {
      setKier02(value);
    }
    // console.log("cakepress1", Cakepress1);
  };
  const handleKier3 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    if (regex.test(value)) {
      setKier03(value);
    }
    // console.log("cakepress1", Cakepress1);
  };

  const handleHydro1 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    if (regex.test(value)) {
      setHydro01(value);
    }
    // console.log("cakepress1", Cakepress1);
  };

  const handleHydro2 = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    if (regex.test(value)) {
      setHydro02(value);
    }
    // console.log("cakepress1", Cakepress1);
  };

  const handleCakeOpener = (event) => {
    const { value } = event.target;
    // Allow only numbers and slash (/)
    const regex = /^[0-9/]*$/;
    if (regex.test(value)) {
      setCakeOpener(value);
    }
    // console.log("cakepress1", Cakepress1);
  };

  const handlelogDown = (value) => {
    setLayDown(value);
  };

  useEffect(() => {
    // Fetch shift options from the API
    const { date, shiftvalue, slb_id } = state || {};

    // console.log("shift",shiftvalue)
    // console.log("Date",date)
    const numericShiftValue = convertShiftValue(shiftvalue);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };
    const fetchShifts = async () => {
      try {
        const response = await axios.post(
          `${API.prodUrl}/Precot/api/bleach/findStoppageByDateAndShift`,
          {
            pack_dt: date,
            shift_id: numericShiftValue,
          },
          { headers }
        );

        if (response.data.status === "No Data") {
          setStoppageStatus("No Data");
        } else {
          setStoppageDetails(response.data);
        }
        // console.log("stoppage details Lov ", stoppagestatus);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };
    fetchShifts();
  }, []);

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-36/Summary");
  };

  useEffect(() => {
    // // console.log("props Data : ", props.data);
    const { date, shiftvalue, slb_id } = state || {};
    // console.log("first Id", slb_id);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .get(
        `${API.prodUrl}/Precot/api/bleach/getShiftlogBookF36Details/${slb_id}`,
        { headers }
      )
      .then((res) => {
        // // console.log("response", res.data);
        // // console.log("cakePress1" ,res.data.cakePress1)
        // // console.log(" Hod status",res.data.hod_status)
        // // console.log("Supervisor ",res.data.supervisor_status)
        setNewDate(res.data.date);
        setShift(res.data.shift);
        setCakepress1(res.data.cakePress1);
        setCakepress2(res.data.cakePress2);
        setLayDown(res.data.bmrNumber);
        setKier01(res.data.kier1);
        setKier02(res.data.kier2);
        setKier03(res.data.kier3);
        setHydro01(res.data.hydro1);
        setHydro02(res.data.hydro2);
        setCakeOpener(res.data.cakeopenerDryerAbBalePress);
        setNoofBale(res.data.noOfBales);
        setWeightingBale(res.data.weightInKg);
        setMailStatus(res.data.mail_status);
        setSupervisorStatus(res.data.supervisor_status);
        setSupervisorSavedOn(res.data.supervisor_saved_on);
        setSupervisorSavedBy(res.data.supervisor_saved_by);
        setSupervisorSavedId(res.data.supervisor_saved_id);
        setSupervisorSubmitOn(res.data.supervisor_submit_on);
        setSupervisorSubmitBy(res.data.supervisor_submit_by);
        setSupervisorSubmitId(res.data.supervisor_submit_id);
        setSupervisorSign(res.data.supervisor_sign);
        setHodStatus(res.data.hod_status);
        setHodSavedOn(res.data.hod_saved_on);
        setHodSavedBy(res.data.hod_saved_by);
        setHodSavedId(res.data.hod_saved_id);
        setHodSubmitOn(res.data.hod_submit_on);
        setHodSubmitBy(res.data.hod_submit_by);
        setHodSubmitId(res.data.hod_submit_id);
        setHodSign(res.data.hod_sign);
        setRemarks(res.data.remarks);

        const isRole = (roleCheck) => role === roleCheck;
        const isStatus = (key, value) => res.data[key] === value;

        // Initial state
        setSubmitBtnStatus(false);
        setPrintBtnStatus(false);
        setDisable(true);

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
            (isStatus("hod_status", "HOD_REJECTED") ||
              isStatus("hod_status", "HOD_APPROVED")) &&
            isStatus("supervisor_status", "SUPERVISOR_APPROVED")
          ) {
            console.log("hod Condition");
            // console.log("hod status" , hod_status);
            // console.log("Supervisor status" , supervisor_status);
            setSubmitBtnStatus(false);
            setDisable(true);
          }
          // else if (isStatus("hod_status", "HOD_APPROVED")  && isStatus("supervisor_status", "SUPERVISOR_APPROVED")) {
          //   setSubmitBtnStatus(true);
          //   setDisable(true);

          // }
          else if (
            isStatus("hod_status", "") &&
            isStatus("supervisor_status", "")
          ) {
            setSubmitBtnStatus(false);
            setDisable(true);
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
        setNewData(res.data);
        // console.log("new Data", res.data);
      })
      .catch((err) => {
        // console.log("error", err);
      });

    // // console.log("Props Data", props.data);
  }, [props]);

  const handleApprove = async () => {
    const { date, shiftvalue, slb_id } = state || {};
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/bleach/approveOrRejectHOD`,
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
        `${API.prodUrl}/Precot/api/bleach/approveOrRejectHOD`,
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

  // Function to handle submitting
  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      await submitshiftlogbook();
      //// console.log("Date Format :",new Date(INcharge_Date).toLocaleDateString() + " " +new Date(INcharge_Date).toLocaleDateString )
      // alert("Shift job Book submitted successfully!");
      setSubmitLoading(false);
    } catch (error) {
      console.error("Error submitting Shift job Book:", error);
      setSubmitLoading(false);
    }
  };

  const submitshiftlogbook = async () => {
    try {
      // Format the payload according to the API documentation

      const { date, shiftvalue, slb_id } = state || {};

      function hasEmptyValues(obj) {
        return Object.values(obj).some((value) => value === "");
      }

      // Make the POST request to the API endpoint
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      // Make the POST request to the API endpoint with headers
      const response = await axios
        .put(
          `${API.prodUrl}/Precot/api/bleach/approveOrRejectShiftlogBookF36Details`,
          {
            slb_id: slb_id,
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
          messageApi.open({
            type: "success",
            content: res.data.message,
          });
          setTimeout(() => {
            navigate("/Precot/Bleaching/F-36/Summary");
          }, 2000);
        })
        .catch((err) => {
          // console.log("Erorr", err);
        });
      // console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to send Shift Job Book");
    }
  };

  // Function to handle save
  const handleSave = async () => {
    // setSaveLoading(true);
    try {
      await saveshiftlogbook();
      //// console.log("Date Format :",new Date(INcharge_Date).toLocaleDateString() + " " +new Date(INcharge_Date).toLocaleDateString )
      // alert("Shift job Book submitted successfully!");
      // setSaveLoading(false);
    } catch (error) {
      console.error("Error submitting Shift job Book:", error);
      // setSaveLoading(false);
    }
  };

  const saveshiftlogbook = async () => {
    try {
      // Format the payload according to the API documentation
      const { date, shiftvalue, slb_id } = state || {};
      function hasEmptyValues(obj) {
        return Object.values(obj).some((value) => value === "");
      }

      // Make the POST request to the API endpoint
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust content type if needed
      };

      // Make the POST request to the API endpoint with headers
      const response = await axios
        .post(
          `${API.prodUrl}/Precot/api/bleach/createOrUpdateShiftlogBookF36`,
          {
            slb_id: slb_id,
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
          messageApi.open({
            type: "success",
            content: "ShiftLog Book Details Save Successfully",
          });
          setTimeout(() => {
            navigate("/Precot/Bleaching/F-36/Summary");
          }, 2000);
          // window.location.reload();
        })
        .catch((err) => {
          // console.log("Erorr", err);
          message.error(err.response.data.message);
        });
      // console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to send Shift Job Book");
    }
  };

  // const formattedSupervisorDate = moment(supervisor_submit_on).format("DD/MM/YYYY");
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

  const combinedSupervisorValue = `${supervisor_sign}, ${formattedSupervisorDate}`;
  const combinedHodValue = `${hod_sign} , ${formattedHODDate}`;

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
              <td colSpan="4">
                <Form>
                  <Form.Item label="BMR No :">
                    <p>{BMR}</p>
                    {/* <Select
                      placeholder="Select BMR No"
                      value={BMR}
                      onChange={handlelogDown}
                      style={{ width: 120, fontWeight: "bold" }}
                      disabled={disable}
                    >
                      
                      {layDownOptions.map((BMR) => (
                        <Option key={BMR.BMR_NO} value={BMR.BMR_NO}>
                          {BMR.BMR_NO}
                        </Option>
                      ))}
                    </Select>  */}
                  </Form.Item>
                </Form>
              </td>
            </tr>
            <tr>
              {/* <td colSpan="4">Cake press#01:</td> */}
              <td align="center">
                <b>Cake Press#01:</b>
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
                  disabled={disable}
                  value={Cakepress1}
                  // onChange={(e) => setCakepress1(e.target.value)}
                  onChange={handleCakePress1}
                />
              </td>
              <td align="center">
                <b>Cake Press#02:</b>
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
                  disabled={disable}
                  value={Cakepress2}
                  // onChange={(e) => setCakepress2(e.target.value)}
                  onChange={handleCakePress2}
                />
              </td>
            </tr>
            <tr>
              <td align="center">
                <b>Kier#01</b>{" "}
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
                  disabled={disable}
                  value={Kier01}
                  // onChange={(e) => setKier01(e.target.value)}
                  onChange={handleKier1}
                />
              </td>
              <td align="center">
                <b>Kier#02</b>
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
                  disabled={disable}
                  value={Kier02}
                  // onChange={(e) => setKier02(e.target.value)}
                  onChange={handleKier2}
                />
              </td>
              <td align="center">
                <b>Kier#03</b>{" "}
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
                  disabled={disable}
                  value={Kier03}
                  // onChange={(e) => setKier03(e.target.value)}
                  onChange={handleKier3}
                />{" "}
              </td>
            </tr>
            <tr>
              <td align="center">
                <b>Hydro#01:</b>
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
                  disabled={disable}
                  value={Hydro01}
                  // onChange={(e) => setHydro01(e.target.value)}
                  onChange={handleHydro1}
                />
              </td>
              <td align="center">
                <b>Hydro#02:</b>{" "}
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
                  disabled={disable}
                  value={Hydro02}
                  // onChange={(e) => setHydro02(e.target.value)}
                  onChange={handleHydro2}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                <b>Cake Opener, Dryer & AB Bale Press : </b>
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
                  disabled={disable}
                  value={CakeOpener}
                  // onChange={(e) => setCakeOpener(e.target.value)}
                  onChange={handleCakeOpener}
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
                <b>No. of Bales:</b>{" "}
              </td>
              <td colSpan="3">
                <input
                  className="inp-new"
                  style={{
                    padding: 10,
                    margin: 0,
                    width: "30%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                  value={NoofBale}
                  onChange={handleNoofBaleChanges}
                />
              </td>
              <td align="center">
                <b> Weight in Kgs:</b>
              </td>
              <td colSpan="2">
                <input
                  className="inp-new"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "40%",
                    height: 12,
                    border: "none",
                  }}
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

            {stoppageDetails.map((data, index) => (
              <tr key={index}>
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
                    disabled="none"
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
                    // disabled={disable}
                    value={data.f_time}
                    disabled="none"
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
                    value={data.t_time}
                    disabled="none"
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
                    value={data.reason}
                    disabled="none"
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
                    value={data.remarks}
                    disabled="none"
                  />
                </td>
              </tr>
            ))}
          </table>
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
              border: "1px solid black",
              width: "100%",
            }}
          >
            <div className="text-input-container">
              <textarea
                className="text-input"
                disabled={disable}
                value={remarks}
                onChange={handleChange}
                placeholder="Enter up to 100 words"
              />
            </div>
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
              // border: "1px solid black",
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
          ></div>
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
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
            //  icon={<IoCaretBackCircleSharp color="#00308F" />}
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
      <div id="section-to-print">
        <header className="no-print" />
        <main>
          <table style={{ width: "100%", margin: "auto", marginTop: "20px" }}>
            <tr>
              <td
                rowSpan="4"
                style={{
                  textAlign: "center",
                  width: "10%",
                  verticalAlign: "bottom",
                }}
              >
                <td
                  style={{
                    width: "40%",
                    verticalAlign: "top",
                    border: "none",
                    textAlign: "center",
                  }}
                >
                  <img src={logo} alt="hj" width="76%" />{" "}
                </td>
                Unit H
              </td>
              <td
                rowspan="4"
                colSpan="4"
                style={{ textAlign: "center", width: "60%" }}
              >
                SHIFT LOG BOOK{" "}
              </td>
              <td>Format No:</td>
              <td>{newData && newData.formatNo}</td>
            </tr>
            <tr>
              <td>Revision No:</td>
              <td>{newData && newData.revisionNo}</td>
            </tr>
            <tr>
              <td>Ref,SOP No:</td>
              <td>{newData && newData.sopNumber}</td>
            </tr>
            <tr>
              <td>Page No:</td>
              <td>1 of 1</td>
            </tr>

            <br></br>
            <tr>
              <td style={{ height: "35px" }}>Date:</td>
              <td colspan="2">{formattedDate}</td>
              <td colspan="2">Shift:</td>
              <td colspan="2">{newData && newData.shift}</td>
            </tr>

            <tr>
              <td colSpan="7" style={{ height: "25px", textAlign: "left" }}>
                <b>Machine wise running details (at the time of handover): </b>
              </td>
            </tr>
            <tr>
              <td colSpan="4">Blow-room/Carding</td>
              <td colSpan="3">BMR No : {newData && newData.bmrNumber}</td>
            </tr>
            <tr>
              <td colSpan="4">
                Cake press#01 : {newData && newData.cakePress1}
              </td>
              <td colSpan="3">
                Cake Press#02 : {newData && newData.cakePress2}
              </td>
            </tr>
            <tr>
              <td colSpan="2"> Kier#01 : {newData && newData.kier1}</td>
              <td colSpan="2"> Kier#02 : {newData && newData.kier2}</td>
              <td colSpan="3"> Kier#03 : {newData && newData.kier3}</td>
            </tr>
            <tr>
              <td colSpan="4"> Hydro#01 : {newData && newData.hydro1}</td>
              <td colSpan="3"> Hydro#02 : {newData && newData.hydro2}</td>
            </tr>
            <tr>
              <td colSpan="7">
                <b>
                  Cake Opener, Dryer & AB Bale Press :{" "}
                  {newData && newData.cakeopenerDryerAbBalePress}
                </b>
              </td>
            </tr>
            <tr>
              <td colSpan="7">
                {" "}
                <b>Bale Press Machine Production details :</b>
              </td>
            </tr>

            <tr>
              <td colSpan="4">
                {" "}
                No. of Bales : {newData && newData.noOfBales}{" "}
              </td>
              <td colSpan="3">
                {" "}
                Weight in Kgs : {newData && newData.weightInKg}
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
                  height: "50pt",
                }}
              ></div>
            )}

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
                {newData && newData.supervisor_sign}
                {/* {newData && newData.supervisor_submitted_on}
                Signature & Date */}
              </td>

              <td
                colSpan="4"
                style={{ textAlign: "center", verticalAlign: "bottom" }}
              >
                {newData && newData.hod_sign}
                {/* {newData && newData.hod_submitted_on}
                Signature & Date */}
              </td>
            </tr>
            <tr>
              <td colspan="7" style={{ height: "10px" }}></td>
            </tr>
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
          </table>
        </main>
        <footer className="no-print" />
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
  );
};

export default Bleaching_f36_edit;
