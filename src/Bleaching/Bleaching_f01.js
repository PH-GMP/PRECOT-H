/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Menu,
  Radio,
  Row,
  Select,
  Tabs,
  Tooltip,
  message,
  Modal,
} from "antd";
import API from "../baseUrl.json";
import { GoArrowLeft } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import moment from "moment";
import axios from "axios";
import { CgLayoutGrid } from "react-icons/cg";
import { FaLock } from "react-icons/fa6";
import logo from "../Assests/logo.png";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

const Bleaching_f01 = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const { state } = useLocation();
  const navigate = useNavigate();
  const [week, setWeek] = useState("");
  const [errors, setErrors] = useState({});
  const [weekNumber, setWeekNumber] = useState("");
  const [smsId, setSmsId] = useState("");
  // const [value, setValue] = useState(1);
  const [sanitizedBy, setSanitizedBy] = useState("");
  const [cbpState1, setCbpState1] = useState("");
  const [cbpState2, setCbpState2] = useState("");
  const [cbpState3, setCbpState3] = useState("");
  const [cbpState4, setCbpState4] = useState("");
  const [cbpState5, setCbpState5] = useState("");
  const [pusher1, setPusher1] = useState("");
  const [pusher2, setPusher2] = useState("");
  const [pusher3, setPusher3] = useState("");
  const [pusher4, setPusher4] = useState("");
  const [pusher5, setPusher5] = useState("");
  const [ipbp1, setIpbp1] = useState("");
  const [ipbp2, setIpbp2] = useState("");
  const [ipbp3, setIpbp3] = useState("");
  const [ipbp4, setIpbp4] = useState("");
  const [ipbp5, setIpbp5] = useState("");
  const [remarks, setRemarks] = useState("");
  const [date, setDate] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [date3, setDate3] = useState("");
  const [date4, setDate4] = useState("");
  const [date5, setDate5] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [weekSign1, setWeekSign1] = useState("");
  const [weekSign2, setWeekSign2] = useState("");
  const [weekSign3, setWeekSign3] = useState("");
  const [weekSign4, setWeekSign4] = useState("");
  const [weekSign5, setWeekSign5] = useState("");
  // const [week, setweek] = useState("");
  const [weekAndDate, setWeekAndDate] = useState("");
  const [weeksign, setWeeksign] = useState("");

  // const [supervisorSubmitOn, setSupervisorSubmitOn] = useState("");
  const [hodSubmitOn, setHodSubmitOn] = useState("");
  const [hodSubmitBy, setHodSubmitBy] = useState("");
  const [hodSubmitId, setHodSubmitId] = useState("");
  const [hodSign, setHodSign] = useState("");
  const [id, setId] = useState("");
  // console.log("fg", id);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [editResponse, seteditResponse] = useState(null);

  const [disable, setDisable] = useState(false);
  const [mailStatus, setMailStatus] = useState("");
  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [printBtnStatus, setPrintBtnStatus] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sanitizationData, setSanitizationData] = useState(null);
  const [newSave, setNewSave] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const { activitesf01 } = sanitizationData || {};
  // State variables for remarks for each week
  const [supervisorStatus, setSupervisorStatus] = useState(null);
  const [supervisorSavedOn, setSupervisorSavedOn] = useState(null);
  const [supervisorSavedBy, setSupervisorSavedBy] = useState(null);
  const [supervisorSavedId, setSupervisorSavedId] = useState(null);
  const [supervisorSubmitOn, setSupervisorSubmitOn] = useState(null);
  const [supervisorSubmitBy, setSupervisorSubmitBy] = useState(null);
  const [supervisorSubmitId, setSupervisorSubmitId] = useState(null);
  const [supervisorSign, setSupervisorSign] = useState(null);
  const [hodStatus, setHodStatus] = useState(null);
  const [hodSavedOn, setHodSavedOn] = useState(null);
  const [hodSavedBy, setHodSavedBy] = useState(null);
  const [hodSavedId, setHodSavedId] = useState(null);

  const [actId1, setActId1] = useState(null);
  const [actId2, setActId2] = useState(null);
  const [actId3, setActId3] = useState(null);
  const [remarksWeek1, setRemarksWeek1] = useState("NA");
  const [remarksWeek2, setRemarksWeek2] = useState("NA");
  const [remarksWeek3, setRemarksWeek3] = useState("NA");
  const [remarksWeek4, setRemarksWeek4] = useState("NA");
  const [remarksWeek5, setRemarksWeek5] = useState("NA");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [chemical, setChemical] = useState();
  const [batchNumber, setBatchNumber] = useState();
  const [expDate, setExpDate] = useState();

  const roleauth = localStorage.getItem("role");
  const isPrintEnabled =
    selectedRow?.[0]?.supervisor_status === "SUPERVISOR_APPROVED" &&
    selectedRow?.[0]?.hod_status === "HOD_APPROVED";
  // console.log("is print enabled", isPrintEnabled);
  // Function to determine the remark to display
  const getRemarkToShow = () => {
    const remarksArray = [
      remarksWeek1,
      remarksWeek2,
      remarksWeek3,
      remarksWeek4,
      remarksWeek5,
    ];
    const hasComment = remarksArray.some((remark) => remark !== "NA");
    return hasComment ? remarksArray.find((remark) => remark !== "NA") : "NA";
  };

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const role = localStorage.getItem("role");
  useEffect(() => {
    validateForms();
  }, [date1]);

  const validateForms = () => {
    const dateSelected = date1 !== "";
    setIsSaveEnabled(dateSelected);
  };
  const validateForm = () => {
    const activitiesCompleted =
      cbpState1 !== "" && pusher1 !== "" && ipbp1 !== "";
    const dateSelected = date1 !== "";
    const sanitizedPerson = sanitizedBy !== "";

    setIsSubmitEnabled(activitiesCompleted && dateSelected && sanitizedPerson);
  };

  const token = localStorage.getItem("token");
  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = editResponse?.supervisor_sign;
    // console.log("Username", editResponse?.supervisor_sign);
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
  }, [editResponse,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = editResponse?.hod_sign;
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
  }, [editResponse,API.prodUrl, token]);

  const [states, setStates] = useState({
    year: "",
    month: "",
    hod_saved_by: "",
    weekValues: [
      {
        week: "Week 1",
        value: "",
        description: "Conveyor at Bale Press",
        completed: false,
        notApplicable: false,
      },
      {
        week: "Week 2",
        value: "",
        description: "Pusher",
        completed: false,
        notApplicable: false,
      },
      {
        week: "Week 3",
        value: "",
        description: "Inside part of Bale Press box",
        completed: false,
        notApplicable: false,
      },
    ],
  });
  // console.log(localStorage.getItem("week"));

  const [emptyarraycheck, setemptyarraycheck] = useState("");
  useEffect(() => {
    fetchBmrOptions();
  }, []);
  const fetchBmrOptions = async () => {
    setWeek(state.week);
    try {
      const response = await fetch(
        `${API.prodUrl}/Precot/api/bleach/getdateSanitizationMechineAndSurfaceDetails/${state.month}/${state.year}/${state.week}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.log("edit data", data);

      if (data && data.length > 0) {
        data.length == 0 ? setNewSave(true) : setNewSave(false);
        seteditResponse(data[0]);
        // console.log("edited response", editResponse);
        setWeek(data[0].week);
        setChemical(data[0].nameOfTheChemical);
        setBatchNumber(data[0].chemicalBatchNumber);
        setExpDate(data[0].expDate);
        setDate1(data[0].weekAndDate);
        setRemarks(data[0].remarks);
        // console.log("remarks set to", data[0].remarks);
        setSelectedWeek(data[0].week);
        setSmsId(data[0].sms_id);
        setWeeksign(data[0].supervisor_sign);
        setHodSign(data[0].hod_sign);
        setActId1(data[0].activitesf01[0].id);
        setActId2(data[0].activitesf01[1].id);
        setActId3(data[0].activitesf01[2].id);
        setSupervisorStatus(data[0].supervisor_status);
        setSupervisorSavedOn(data[0].supervisor_saved_on);
        setSupervisorSavedBy(data[0].supervisor_saved_by);
        setSupervisorSavedId(data[0].supervisor_saved_id);
        setSupervisorSubmitOn(data[0].supervisor_submit_on);
        setSupervisorSubmitBy(data[0].supervisor_submit_by);
        setSupervisorSubmitId(data[0].supervisor_submit_id);
        setSupervisorSign(data[0].supervisor_sign);
        setMailStatus(data[0].mail_status);
        setSanitizedBy(data[0].sanitized_by);
        // console.log("mail", data[0].mail_status);
        // Update HOD states
        setHodStatus(data[0].hod_status);
        setHodSavedOn(data[0].hod_saved_on);
        setHodSavedBy(data[0].hod_saved_by);
        setHodSavedId(data[0].hod_saved_id);
        setHodSubmitOn(data[0].hod_submit_on);
        setHodSubmitBy(data[0].hod_submit_by);
        setHodSubmitId(data[0].hod_submit_id);
        setHodSign(data[0].hod_sign);
        // // console.log("ACtivites" , data[0].activitesf01);
        if (data[0].activitesf01) {
          const cbpActivity = data[0].activitesf01.find(
            (activity) => activity.description === "Conveyor at Bale Press"
          );
          cbpActivity?.notApplicable
            ? setCbpState1("NA")
            : setCbpState1(cbpActivity?.completed ? "TICK" : "CROSS");

          const pusherActivity = data[0].activitesf01.find(
            (activity) => activity.description === "Pusher"
          );
          pusherActivity?.notApplicable
            ? setPusher1("NA")
            : setPusher1(pusherActivity?.completed ? "TICK" : "CROSS");

          const ipbpActivity = data[0].activitesf01.find(
            (activity) =>
              activity.description === "Inside part of Bale Press box"
          );
          ipbpActivity?.notApplicable
            ? setIpbp1("NA")
            : setIpbp1(ipbpActivity?.completed ? "TICK" : "CROSS");
        }
      } else {
        seteditResponse(null);
        setemptyarraycheck(0);
      }
    } catch (error) {
      console.error("Error fetching BMR options:", error);
    }
  };
  const handleRemarkChange = (e) => {
    setRemarks(e.target.value);
  };
  const weeks = [
    { value: "1", label: "week1" },
    { value: "2", label: "week2" },
    { value: "3", label: "week3" },
    { value: "4", label: "week4" },
    { value: "5", label: "week5" },
  ];

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-01/Summary");
  };

  const canDisplayButtons = () => {
    if (role == "ROLE_SUPERVISOR") {
      if (
        editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "block";
      } else if (
        (editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
          editResponse?.hod_status == "WAITING_FOR_APPROVAL") ||
        editResponse?.hod_status == "HOD_APPROVED"
      ) {
        return "none";
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      // console.log("condition");
      // console.log("STatus", editResponse?.hod_status);
      if (
        (roleauth === "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
        editResponse?.supervisor_status === "SUPERVISOR_APPROVED" &&
        editResponse?.hod_status === "WAITING_FOR_APPROVAL"
      ) {
        return false; // Enable the button
      }
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      } else if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canDisplayButton2 = () => {
    if (role == "ROLE_SUPERVISOR") {
      if (
        editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
        editResponse?.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      } else if (
        editResponse?.supervisor_status == "SUPERVISOR_APPROVED" &&
        (editResponse?.hod_status == "WAITING_FOR_APPROVAL" ||
          editResponse?.hod_status == "HOD_APPROVED")
      ) {
        return "none"; // Enable button 2
      }
    } else if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      if (
        editResponse?.hod_status == "HOD_APPROVED" ||
        editResponse?.hod_status == "HOD_REJECTED"
        // emptyarraycheck == 0
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    } else {
      if (
        editResponse.hod_status == "HOD_APPROVED" ||
        editResponse.hod_status == "HOD_REJECTED"
      ) {
        return "none"; // Disable button 2
      }
      return "block"; // Enable button 2
    }
  };

  // console.log("roleAuth", roleauth);
  // console.log("Edit Response", editResponse);
  const buttonDisable = () => {
    if (
      roleauth === "ROLE_SUPERVISOR" &&
      editResponse?.supervisor_status === "SUPERVISOR_APPROVED" &&
      editResponse?.hod_status === "HOD_REJECTED"
    ) {
      return false; // Enable the fields
    }
    if (roleauth === "ROLE_SUPERVISOR" && editResponse === null) {
      return false;
    }
    if (
      roleauth === "ROLE_SUPERVISOR" &&
      editResponse?.supervisor_status === "SUPERVISOR_SAVED"
    ) {
      return false;
    }
    if (
      (roleauth === "ROLE_SUPERVISOR" &&
        editResponse?.supervisor_status === "SUPERVISOR_APPROVED" &&
        editResponse?.hod_status === "WAITING_FOR_APPROVAL") ||
      editResponse?.hod_status === "HOD_APPROVED" ||
      (roleauth === "ROLE_HOD" &&
        (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
          editResponse?.hod_status === "HOD_APPROVED" ||
          editResponse?.hod_status === "HOD_REJECTED" ||
          emptyarraycheck === 0)) ||
      (roleauth === "ROLE_DESIGNEE" &&
        (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
          editResponse?.hod_status === "HOD_APPROVED" ||
          editResponse?.hod_status === "HOD_REJECTED" ||
          emptyarraycheck === 0))
    ) {
      return true; // Disable the fields
    }

    return true;
  };
  // (roleauth === "ROLE_SUPERVISOR" && editResponse !== null ) ||
  // (roleauth === "ROLE_SUPERVISOR" &&
  //   editResponse?.supervisor_status === "SUPERVISOR_APPROVED" &&
  //   editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
  // editResponse?.hod_status === "HOD_APPROVED" )||
  // (roleauth === "ROLE_HOD" &&
  //   (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
  //     editResponse?.hod_status === "HOD_APPROVED" ||
  //     editResponse?.hod_status === "HOD_REJECTED" ||
  //     emptyarraycheck === 0 ))||
  // (roleauth === "ROLE_DESIGNEE" &&
  //   (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
  //     editResponse?.hod_status === "HOD_APPROVED" ||
  //     editResponse?.hod_status === "HOD_REJECTED" ||
  //     emptyarraycheck === 0 ));

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/bleach/approveOrRejectSanitizationMechineAndSurfaceDetails`,
        {
          id: smsId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-01/Summary");
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
        `${API.prodUrl}/Precot/api/bleach/approveOrRejectSanitizationMechineAndSurfaceDetails`,
        {
          id: smsId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-01/Summary");
      })
      .catch((err) => {
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleSave = () => {
    setSaveLoading(true);
    if (!isSaveEnabled) {
      let errorMessage = "Please fill in all mandatory fields:";
      if (!date1) {
        errorMessage += " Date";
      }
      message.error(errorMessage);
      setSaveLoading(false);
      return;
    }
    const activitiesArray = [];

    // Define activities with their descriptions and corresponding states
    const activities = [
      { id: actId1, description: "Conveyor at Bale Press", state: cbpState1 },
      { id: actId2, description: "Pusher", state: pusher1 },
      {
        id: actId3,
        description: "Inside part of Bale Press box",
        state: ipbp1,
      },
    ];

    // Iterate through activities to push status into activitiesArray
    activities.forEach((activity) => {
      let completed = false;
      let notApplicable = false;
      let not_completed = false;
      if (activity.state === "TICK") {
        completed = true;
      } else if (activity.state === "CROSS") {
        not_completed = true;
      } else if (activity.state === "NA") {
        notApplicable = true;
      }

      // Check if the activity is applicable for the selected week
      if (week) {
        activitiesArray.push({
          id: activity.id,
          description: activity.description,
          completed,
          not_completed,
          notApplicable,
        });
      }
    });
    const remarkToSave = remarks.trim() === "" ? "N/A" : remarks;
    const payload = {
      unit: "Unit H", // Assuming this ID should be hardcoded based on the provided payload
      // formatNo: "PRD01/F-01",
      // formatName: "Sanitization of Machines & Surfaces",
      // sopNumber: "PRD01-D-06",
      formatNo: "PH-PRD01/F-009",
      formatName: "Sanitization of Machines & Surfaces",
      sopNumber: "PH-PRD01-D-04",
      revisionNo: "02",
      department: "Bleaching",
      frequency: "Weekly",
      year: state.year,
      month: state.month,
      nameOfTheChemical: chemical,
      chemicalBatchNumber: batchNumber,
      expDate: expDate,
      weekAndDate: date1,
      remarks: remarkToSave,
      week: week,
      sms_id: smsId || null,
      mail_status: mailStatus,
      sanitized_by: sanitizedBy,
      supervisor_sign: supervisorSign || null,
      supervisor_status: supervisorStatus || null,
      supervisor_saved_on: supervisorSavedOn || null,
      supervisor_saved_by: supervisorSavedBy || null,
      supervisor_saved_id: supervisorSavedId || null,
      supervisor_submit_on: supervisorSubmitOn || null,
      supervisor_submit_by: supervisorSubmitBy || null,
      supervisor_submit_id: supervisorSubmitId || null,
      hod_status: hodStatus || null,
      hod_saved_on: hodSavedOn || null,
      hod_saved_by: hodSavedBy || null,
      hod_saved_id: hodSavedId || null,
      hod_submit_on: hodSubmitOn || null,
      hod_submit_by: hodSubmitBy || null,
      hod_submit_id: hodSubmitId || null,
      hod_sign: hodSign || null,
      activitesf01: activitiesArray,
    };
    if (!date1) {
      message.error("Please select a date.");
      return;
    }
    // console.log("Payload:", JSON.stringify(payload, null, 2));

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/bleach/saveSanitizationMechineAndSurface`,
        payload,
        { headers }
      )
      .then((res) => {
        setId(res.data.sms_id);
        // console.log("Response", res.data);
        // console.log("sign", res.data.supervisor_sign);
        setWeekSign1(res.data.supervisor_sign);
        message.success("successfully saved");
        navigate("/Precot/Bleaching/F-01/Summary");
      })
      .catch((err) => {
        // console.log("Error", err);
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  useEffect(() => {
    isActionButtonEnabled();
  }, [cbpState1, pusher1, ipbp1, remarks, date1]);

  const isActionButtonEnabled = () => {
    const activities = [cbpState1, pusher1, ipbp1];
    const hasValidActivities = activities.some(
      (activity) => activity === "TICK" || activity === "NA"
    );

    return (
      hasValidActivities &&
      remarks.trim() !== "" &&
      date1.trim() !== "" &&
      week.trim() !== ""
    );
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  const formattedDate = formatDate(supervisorSubmitOn);

  const formattedDateHod = formatDate(hodSubmitOn);

  const handleSubmit = () => {
    // if (!isSubmitEnabled) return;
    setSubmitLoading(true);
    const activitiesPayload = [
      {
        id: actId1,
        description: "Conveyor at Bale Press",
        completed: cbpState1 === "TICK",
        not_completed: cbpState1 === "CROSS",
        notApplicable: cbpState1 === "NA",
      },
      {
        id: actId2,
        description: "Pusher",
        completed: pusher1 === "TICK",
        not_completed: pusher1 === "CROSS",
        notApplicable: pusher1 === "NA",
      },
      {
        id: actId3,
        description: "Inside part of Bale Press box",
        completed: ipbp1 === "TICK",
        not_completed: ipbp1 === "CROSS",
        notApplicable: ipbp1 === "NA",
      },
    ];
    const remarkToSave = remarks.trim() === "" ? "N/A" : remarks;
    const payload = {
      unit: "Unit H",
      formatNo: "PH-PRD01/F-009",
      formatName: "Sanitization of Machines & Surfaces",
      sopNumber: "PH-PRD01-D-04",
      revisionNo: "02",
      department: "Bleaching",
      frequency: "Weekly",
      sms_id: smsId,
      month: state.month,
      year: state.year,
      weekAndDate: date1,
      remarks: remarkToSave,
      week: week,
      bmrNumber: "",
      nameOfTheChemical: chemical,
      chemicalBatchNumber: batchNumber,
      expDate: expDate,
      mail_status: mailStatus,
      sanitized_by: sanitizedBy,
      supervisor_sign: supervisorSign,
      supervisor_status: supervisorStatus,
      supervisor_saved_on: supervisorSavedOn,
      supervisor_saved_by: supervisorSavedBy,
      supervisor_saved_id: supervisorSavedId,
      supervisor_submit_on: supervisorSubmitOn,
      supervisor_submit_by: supervisorSubmitBy,
      supervisor_submit_id: supervisorSubmitId,
      hod_status: hodStatus || null,
      hod_saved_on: hodSavedOn || null,
      hod_saved_by: hodSavedBy || null,
      hod_saved_id: hodSavedId || null,
      hod_submit_on: hodSubmitOn || null,
      hod_submit_by: hodSubmitBy || null,
      hod_submit_id: hodSubmitId || null,
      hod_sign: hodSign || null,
      activitesf01: activitiesPayload,
    };
    const validate = (payload) => {
      if (!payload.month) return "Month is required";
      if (!payload.year) return "Year is required";
      if (!payload.weekAndDate) return "Week and Date are required";
      if (!payload.remarks) return "Remarks are required";
      if (!payload.week) return "Week is required";

      if (!payload.sanitized_by) return "Sanitized by is required";

      // for (const activity of payload.activitesf01) {
      //   // console.log(activity);
      //   if (
      //     (activity.description === "Conveyor at Bale Press" ||
      //      activity.description === "Pusher" ||
      //      activity.description === "Inside part of Bale Press box") &&
      //     (activity.completed == false||activity.completed == null || activity.notApplicable == false)
      //   ) {
      //     return `${activity.description} must have both 'completed' and 'not applicable' fields specified.`;
      //   }
      // }

      return null;
    };

    const error = validate(payload);

    if (error) {
      message.error(error);
      setSubmitLoading(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${API.prodUrl}/Precot/api/bleach/submitSanitizationMechineAndSurface`,
        payload,
        { headers }
      )
      .then((res) => {
        // console.log("Response", res.data);
        message.success("Sucessfully Submitted");
        navigate("/Precot/Bleaching/F-01/Summary");
      })
      .catch((err) => {
        // console.log("Error", err);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const weekChange = (value) => {
    setSelectedWeek(value);
  };

  const items = [
    {
      key: "1",
      label: "Form",
      children: (
        <>
          <table align="left" style={{ width: "50%", alignItems: "left" }}>
            <thead>
              <tr style={{ height: "5em" }}>
                <th
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    // border: "2px solid black",
                  }}
                >
                  Activity
                </th>
                <th
                  style={{
                    fontSize: "2em",
                    fontWeight: "bold",
                    // border: "2px solid black",
                  }}
                >
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <Form>
                    <Form.Item label="Week">
                      <Select
                        //  onChange={weekChange}
                        placeholder="Choose week"
                        value={week}
                        options={weeks}
                        // disabled={
                        //   (roleauth === "ROLE_SUPERVISOR" && editResponse?.supervisor_status === "SUPERVISOR_APPROVED") ||
                        //   (roleauth === "ROLE_HOD" && editResponse?.hod_status === "HOD_APPROVED") ||
                        //   (roleauth === "ROLE_DESIGNEE" && editResponse?.hod_status === "HOD_APPROVED")
                        // }
                        // disabled={buttonDisable()}
                        disabled={buttonDisable()}
                      />
                    </Form.Item>
                  </Form>
                </td>

                <td>
                  <Form>
                    <Form.Item>
                      <Input
                        type="date"
                        value={date1}
                        max={today}
                        onChange={(e) => setDate1(e.target.value)}
                        disabled={buttonDisable()}
                      />
                    </Form.Item>
                  </Form>
                </td>
              </tr>
              <tr>
                {/* style={{ border: "2px solid black" }} */}
                <td>
                  <p>Conveyor at Bale Press</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={cbpState1}
                      onChange={(e) => setCbpState1(e.target.value)}
                      disabled={buttonDisable()}
                      // style={{ justifyContent: "space-evenly" }}
                      // style={{ paddingLeft: "2em" }}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Pusher</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={pusher1}
                      onChange={(e) => setPusher1(e.target.value)}
                      disabled={buttonDisable()}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Inside part of Bale Press box</p>
                </td>
                <td>
                  <div
                    style={{
                      padding: "1em 1em",
                      // width: "48em",
                    }}
                  >
                    <Radio.Group
                      value={ipbp1}
                      onChange={(e) => setIpbp1(e.target.value)}
                      disabled={buttonDisable()}
                    >
                      <Radio value="TICK">&#x2713;</Radio>
                      <Radio value="CROSS">&#x2715;</Radio>
                      <Radio value="NA">NA</Radio>
                    </Radio.Group>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
    {
      key: "2",
      label: "Remarks",
      children: (
        <table align="left" style={{ width: 600, alignItems: "left" }}>
          <p>Remarks</p>
          <Input.TextArea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            disabled={
              (roleauth === "ROLE_SUPERVISOR" &&
                editResponse?.supervisor_status === "SUPERVISOR_APPROVED" &&
                editResponse?.hod_status === "WAITING_FOR_APPROVAL") ||
              editResponse?.hod_status === "HOD_APPROVED" ||
              (roleauth === "ROLE_HOD" &&
                (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
                  editResponse?.hod_status === "HOD_APPROVED" ||
                  editResponse?.hod_status === "HOD_REJECTED")) ||
              (roleauth === "ROLE_DESIGNEE" &&
                (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
                  editResponse?.hod_status === "HOD_APPROVED" ||
                  editResponse?.hod_status === "HOD_REJECTED"))
            }
          />
        </table>
      ),
    },
    {
      key: "3",
      label: "Reviews",
      children: (
        <>
          <table align="left" style={{ width: 600, alignItems: "left" }}>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid black ",
                }}
              >
                <b>Sanitized By</b>
                <p>(Trained person)</p>
              </td>
              <td
                style={
                  {
                    // borderRight: "none",
                  }
                }
              >
                <input
                  className="inp-new"
                  value={sanitizedBy}
                  onChange={(e) => setSanitizedBy(e.target.value)}
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      editResponse?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                      editResponse?.hod_status === "WAITING_FOR_APPROVAL") ||
                    editResponse?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
                        editResponse?.hod_status === "HOD_APPROVED" ||
                        editResponse?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
                        editResponse?.hod_status === "HOD_APPROVED" ||
                        editResponse?.hod_status === "HOD_REJECTED"))
                  }
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "2em",
                  borderRight: "1px solid ",
                }}
              >
                <b>Verified & Reviewed By</b>
                <p>(Production Supervisor)</p>
              </td>
              <td colSpan="8" style={{ textAlign: "center" }}>
                {supervisorStatus === "SUPERVISOR_APPROVED" && (
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
                        <div>{supervisorSign}</div>
                        <div>{formattedDate}</div>
                      </div>
                      {getImage !== "" && (
                        <img
                          className="signature"
                          src={getImage}
                          alt="Supervisor"
                        />
                      )}
                    </div>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "2em",
                }}
              >
                <b>Reviewed by HOD / Designee</b>
                <p>(at least once in a month)</p>
              </td>
              <td colSpan="8" style={{ textAlign: "center" }}>
                {(hodStatus === "HOD_REJECTED" ||
                  hodStatus === "HOD_APPROVED") && (
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
                        <div>{hodSign}</div>
                        <div>{formattedDateHod}</div>
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
        </>
      ),
    },
  ];
  const onChange = (key) => {
    // console.log(key);
  };
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
      <BleachingHeader
        unit="Unit-H"
        formName="Sanitization of Machines and Surfaces"
        formatNo="PH-PRD01/F-009"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        frequencyComponents={
          <Form
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {" "}
            <Form.Item
              label="Department"
              style={{
                marginRight: "20px",
              }}
            >
              <b>Bleaching</b>
            </Form.Item>
            <Form.Item
              label="Month"
              style={{
                marginRight: "20px",
              }}
            >
              {" "}
              <b>{month}</b>
            </Form.Item>
            <Form.Item
              label="Year"
              style={{
                marginRight: "20px",
              }}
            >
              <b>{year}</b>
            </Form.Item>
            <Form.Item label="Frequency">
              <b>Weekly</b>
            </Form.Item>
          </Form>
        }
        buttonsArray={[
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
                icon={<img src={approveIcon} alt="Approve Icon" />}
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
              {/* <Button
          type="primary"
          style={{
            backgroundColor: "#E5EEF9",
            color: "#00308F",
            fontWeight: "bold",
            display: printBtnStatus ? "block" : "none",
          }}
          shape="round"
          icon={<IoPrint color="#00308F" />}
          onClick={() => window.print()}
        >
          &nbsp;Print
        </Button>, */}
              <Button
                loading={saveLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  marginRight: "20px",
                  display: canDisplayButton2(),
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
                // disabled={!isSaveEnabled}
              >
                Save
              </Button>
              <Button
                loading={submitLoading}
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  marginRight: "20px",
                  display: canDisplayButtons(),
                }}
                onClick={handleSubmit}
                shape="round"
                icon={<GrDocumentStore color="#00308F" />}
                // disabled={!isSubmitEnabled}
              >
                &nbsp;Submit
              </Button>
            </>
          ),
          <Button
            // loading={submitLoading}
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
      <div style={{ paddingBottom: "2em" }}></div>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Input
          type="text"
          addonBefore="Chemical Name"
          value={chemical}
          onChange={(e) => setChemical(e.target.value)}
          disabled={buttonDisable()}
        />
        <Input
          type="text"
          addonBefore="Batch Number"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
          disabled={buttonDisable()}
        />
        <Input
          type="date"
          value={expDate}
          addonBefore="Expire Date"
          onChange={(e) => setExpDate(e.target.value)}
          disabled={buttonDisable()}
        />
      </div>

      <Row>
        <Tabs
          items={items}
          onChange={onChange}
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

export default Bleaching_f01;
