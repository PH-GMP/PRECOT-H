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
    Modal,
    Tooltip,
    message,
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
import PrecotSidebar from "../Components/PrecotSidebar.js";
const Spunlace_f24 = () => {
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
    const [smsId, setSmsId] = useState("");
    // const [value, setValue] = useState(1);
    const [sanitizedBy, setSanitizedBy] = useState("");
    const [remarks, setRemarks] = useState("");
    const [date1, setDate1] = useState("");
    const [saveLoading, setSaveLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
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
    const [mailStatus, setMailStatus] = useState(null)
    const [actId1, setActId1] = useState(null);
    const [actId2, setActId2] = useState(null);
    const [actId3, setActId3] = useState(null);
    const [actId4, setActId4] = useState(null);
    const [actId5, setActId5] = useState(null);
    const [actId6, setActId6] = useState(null);
    const [actId7, setActId7] = useState(null);
    const [actId8, setActId8] = useState(null);
    const [activityId, setActivityId] = useState(null);
    const [error, setError] = useState(null);
    const today = new Date().toISOString().split("T")[0];
    const roleauth = localStorage.getItem("role");

    const [slitter, setSlitter] = useState("");
    const [fleeceRoller, setFleeceRoller] = useState("");
    const [fleeceCutter, setFleeceCutter] = useState("");
    const [rollWinder, setRollWinder] = useState("");
    const [shaft, setShaft] = useState("");
    const [trollies, setTrollies] = useState("");
    const [weighing, setWeighing] = useState("");
    const [pallets, setPallets] = useState("");
    const [rejectRemarks, setRejectRemarks] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [bulkState , setBulkState] = useState('');
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const role = localStorage.getItem("role")
    useEffect(() => {
        validateForms();
    }, [date1]);

    const validateForms = () => {
        const dateSelected = date1 !== "";
        setIsSaveEnabled(dateSelected);
    };


    // console.log("date", state.month);
    // const canDisplayButtons = () => {
    //     if (roleauth == "ROLE_SUPERVISOR") {
    //         if (
    //             editResponse &&
    //             editResponse.supervisor_status == "SUPERVISOR_APPROVED"
    //         ) {
    //             return "none";
    //         }
    //         return "block";
    //     } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
    //         if (editResponse && editResponse.hod_status == "HOD_APPROVED") {
    //             return "none";
    //         }
    //         return "block";
    //     } else {
    //         if (editResponse && editResponse.hod_status == "HOD_APPROVED") {
    //             return "none";
    //         }
    //         return "block";
    //     }
    // };
    // console.log(localStorage.getItem("week"));

    const token = localStorage.getItem("token");

    const handleBulkOption = (e) => {
        setSlitter(e.target.value)
        setFleeceRoller(e.target.value)
        setFleeceCutter(e.target.value)
        setRollWinder(e.target.value)
        setShaft(e.target.value)
        setTrollies(e.target.value)
        setWeighing(e.target.value)
        setPallets(e.target.value)
    }

    useEffect(() => {
        if(slitter == "TICK" && fleeceRoller == "TICK" && fleeceCutter == "TICK" && rollWinder == "TICK" && shaft == "TICK" && trollies == "TICK" && weighing == "TICK" && pallets == "TICK"){
            setBulkState("TICK")
        }
        // else if(slitter == "N" && fleeceRoller == "N" && fleeceCutter == "N" && rollWinder == "N" && shaft == "N" && trollies == "N" && weighing == "N" && pallets == "N"){
        //     setBulkState("N")
        // }
        else if(slitter == "NA" && fleeceRoller == "NA" && fleeceCutter == "NA" && rollWinder == "NA" && shaft == "NA" && trollies == "NA" && weighing == "NA" && pallets == "NA"){
            setBulkState("NA")
        }
        else{
            setBulkState("")
        }
    },[slitter , fleeceRoller , fleeceCutter , rollWinder , shaft , trollies , weighing , pallets , bulkState])
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

    const formatDate1 = formatDateUser(date1);
    // console.log("date11", date1);
    // console.log("date11222", formatDate1);
    useEffect(() => {
        fetchBmrOptions();

    }, []); // Empty dependency array means this will only run on mount

    const fetchBmrOptions = async () => {
        setWeek(state.week);

        try {
            const response = await fetch(
                `${API.prodUrl}/Precot/api/spunlace/Service/SanitizationOfMachinesAndSurfaces/findByMonthYearWeek?month=${state.month}&year=${state.year}&week=${state.week}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            // console.log("edit data", data); // Ensure this logs
            seteditResponse(data);
            setRemarks(data.remarks);
            setWeek(data.week);
            setSanitizedBy(data.sanitized_by)
            setSupervisorSign(data.supervisor_sign)
            setHodSign(data.hod_sign)
            setSmsId(data.smsId);
            setSupervisorStatus(data.supervisor_status);
            setSupervisorSavedOn(data.supervisor_save_on);
            setSupervisorSavedBy(data.supervisor_save_by);
            setSupervisorSavedId(data.supervisor_save_id);
            setSupervisorSubmitOn(data.supervisor_submit_on);
            setSupervisorSubmitBy(data.supervisor_submit_by);
            setSupervisorSubmitId(data.supervisor_submit_id);
            setSupervisorSign(data.supervisor_sign);
            setHodSubmitOn(data.hod_submit_on);
            axios
            .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${data.supervisor_sign}`,
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


            ////////////////////////////
            axios
            .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${data.hodSign}`,
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
            //////////////////
            // console.log("")
            if(((roleauth=="ROLE_HOD"|| roleauth=="ROLE_DESIGNEE") &&(data.supervisor_status !=="SUPERVISOR_APPROVED"))||((roleauth=="ROLE_HOD"||roleauth=="ROLE_DESIGNEE") &&(data.hod_status =="HOD_REJECTED"))){
                message.error("Supervisor Not Yet  Approved");
                setTimeout(() => {
                 navigate('/Precot/Spunlace/F-24/Summary');
               }, 1500)
                }
            const dateParts = data.weekAndDate.split("/");
            const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
            setDate1(formattedDate);
            // console.log("date1", data.weekAndDate, "formattedDate", formattedDate);
            if (data && data.activites) {
                const activities = data.activites.reduce((acc, activity) => {
                    switch (activity.activity) {
                        case "Slitter / Cutter & Rollers":
                            acc.slitter = activity.isCompleted === "Yes" ? "TICK" : "NA";
                            break;
                        case "Fleece Transfer Rollers":
                            acc.fleeceRoller = activity.isCompleted === "Yes" ? "TICK" : "NA";
                            break;
                        case "Fleece Cutters":
                            acc.fleeceCutter = activity.isCompleted === "Yes" ? "TICK" : "NA";
                            break;
                        case "Roll Winder":
                            acc.rollWinder = activity.isCompleted === "Yes" ? "TICK" : "NA";
                            break;
                        case "Shaft Removing Platform":
                            acc.shaft = activity.isCompleted === "Yes" ? "TICK" : "NA";
                            break;
                        case "Trollies":
                            acc.trollies = activity.isCompleted === "Yes" ? "TICK" : "NA";
                            break;
                        case "Weighing Scale":
                            acc.weighing = activity.isCompleted === "Yes" ? "TICK" : "NA";
                            break;
                        case "Pallets":
                            acc.pallets = activity.isCompleted === "Yes" ? "TICK" : "NA";
                            break;
                        default:
                            break;
                    }
                    return acc;
                }, {});

                setSlitter(activities.slitter);
                setFleeceRoller(activities.fleeceRoller);
                setFleeceCutter(activities.fleeceCutter);
                setRollWinder(activities.rollWinder);
                setShaft(activities.shaft);
                setTrollies(activities.trollies);
                setWeighing(activities.weighing);
                setPallets(activities.pallets);
                setRemarks(data.remarks);

                if (data && Array.isArray(data.activites)) {
                    // Extract and log each activityId individually
                    data.activites.forEach((activity, index) => {
                        // console.log(`Activity ${index + 1} ID:`, activity.activityId);
                    });

                    // Optionally, if you still want to work with the array of activityIds
                    const activityIds = data.activites.map(activity => activity.activityId);
                    // console.log("All Activity IDs:", activityIds);

                    // Process each activity as needed
                    const processedActivities = data.activites.map(activity => ({
                        activity: activity.activity,
                        activityId: activity.activityId || "", // Ensure unique activityId is assigned
                        isCompleted: activity.isCompleted === "Yes" ? "Yes" : "No",
                        smsId: activity.smsId || null
                    }));

                    // console.log("Processed Activities:", processedActivities);
                    setActivityId(activityIds);
         


                } else {
                    console.error("Data is undefined or activites is not an array.");
                }
                setActivityId(activityId);
               
            } else {
                // console.log("No data found or data is in an unexpected format");
                setSlitter("NA");
                setFleeceRoller("NA");
                setFleeceCutter("NA");
                setRollWinder("NA");
                setShaft("NA");
                setTrollies("NA");
                setWeighing("NA");
                setPallets("NA");
                setRemarks(null);
            }



        } catch (error) {
            console.error("Error fetching BMR options:", error); // Ensure this logs on error
        }
    };


    const months = [
        { label: "January", value: "JAN" },
        { label: "February", value: "FEB" },
        { label: "March", value: "MAR" },
        { label: "April", value: "APR" },
        { label: "May", value: "MAY" },
        { label: "June", value: "JUN" },
        { label: "July", value: "JUL" },
        { label: "August", value: "AUG" },
        { label: "September", value: "SEP" },
        { label: "October", value: "OCT" },
        { label: "November", value: "NOV" },
        { label: "December", value: "DEC" },
    ];

    // Function to convert month abbreviation to numeric value
    const getMonthNumber = (abbr) => {
        const month = months.find(m => m.value === abbr);
        return month ? months.indexOf(month) + 1 : 1; // Default to January if not found
    };

    // Example usage
    const selectedMonthAbbr = state.month; // Example selected month abbreviation
    const stateYear = state.year; // Example state year

    const stateMonth = getMonthNumber(selectedMonthAbbr); // Convert abbreviation to numeric month
    const formattedMonth = String(stateMonth).padStart(2, '0'); // Ensure month is two digits
    const minDate = moment(`${stateYear}-${formattedMonth}`, "YYYY-MM").startOf('month').format("YYYY-MM-DD");
    const maxDate = moment(`${stateYear}-${formattedMonth}`, "YYYY-MM").endOf('month').format("YYYY-MM-DD");

    // Handle date change
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;

        if (moment(selectedDate).isBetween(minDate, maxDate, null, "[]")) {
            setDate1(selectedDate);
        } else {
            message.warning(`Please select a date within ${state.month}/${stateYear}`);
            setDate1(""); // Clear the date if it's out of range
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
        navigate("/Precot/Spunlace/F-24/Summary");
    };
    const [loading, setLoading] = useState("");
    const handleApprove = async () => {
        setSaveLoading(true);

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adjust content type if needed
        };

        const res = await axios
            .put(
                `${API.prodUrl}/Precot/api/spunlace/Service/SanitizationOfMachinesAndSurfaces/approveOrReject`,
                {
                    id: smsId,
                    status: "Approve",
                },
                { headers }
            )
            .then((res) => {
                setSaveLoading(false);
                // console.log("messsage", res);
                // setHodSign(res.data)
                // window.location.reload();
                message.success(res.data.message);
                navigate("/Precot/Spunlace/F-24/Summary");
            })
            .catch((err) => {
                setSaveLoading(false);
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

        const res = await axios
            .put(
                `${API.prodUrl}/Precot/api/spunlace/Service/SanitizationOfMachinesAndSurfaces/approveOrReject`,
                {
                    id: smsId,
                    status: "Reject",
                    remarks: rejectRemarks,
                },
                { headers }
            )
            .then((res) => {
                setSaveLoading(false);
                // console.log("messsage", res.data.message);
                // window.location.reload();
                message.success(res.data.message);
                navigate("/Precot/Spunlace/F-24/Summary");
            })
            .catch((err) => {
                setSaveLoading(false);
                // console.log("Err", err.response.data.message);
                message.error(err.response.data.message);
            })
            .finally(() => {
                setSaveLoading(false);
            });
    };

    const [getImage, setGetImage] = useState("");

 ;

    const [getImage1, setGetImage1] = useState("");



    const handleSave = () => {
        setSaveLoading(true);

        // Check if saving is enabled
        if (!isSaveEnabled) {
            let errorMessage = "Please fill in all mandatory fields:";
            if (!date1) {
                errorMessage += " Date";
            }
            message.error(errorMessage);
            setSaveLoading(false);
            return;
        }



        const remarkToSave = (remarks || "").trim() === "" ? "NA" : remarks;
        const activitiesArray = [
            { id: actId1, description: "Slitter / Cutter & Rollers", state: slitter },
            { id: actId2, description: "Fleece Transfer Rollers", state: fleeceRoller },
            { id: actId3, description: "Fleece Cutters", state: fleeceCutter },
            { id: actId4, description: "Roll Winder", state: rollWinder },
            { id: actId5, description: "Shaft Removing Platform", state: shaft },
            { id: actId6, description: "Trollies", state: trollies },
            { id: actId7, description: "Weighing Scale", state: weighing },
            { id: actId8, description: "Pallets", state: pallets },
        ].map(activity => ({
            activity: activity.description,
            // activityId: activityId || null,
            isCompleted: activity.state === "TICK" ? "Yes" : "No",
            // smsId: smsId || null,
        }));

        // Prepare the payload
        const payload = {
            formatName: "SANITIZATION OF MACHINES & SURFACES",
            formatNo: "PH-PRD02/F-024",
            revisionNo: 1,
            refSopNo: "PH-PRD02-D-04",
            unit: "H",
            department: "Spunlace",
            frequency: "Weekly",
            year: state.year,
            month: state.month,
            weekAndDate: formatDate1,
            remarks: remarkToSave,
            week: state.week,
            smsId: smsId || "",
            mail_status: mailStatus || "",
            sanitized_by: sanitizedBy,
            supervisor_sign: supervisorSign || "",
            supervisor_status: supervisorStatus || "",
            supervisor_save_on: supervisorSavedOn || "",
            supervisor_save_by: supervisorSavedBy || "",
            supervisor_save_id: supervisorSavedId || "",
            supervisor_submit_on: supervisorSubmitOn || "",
            supervisor_submit_by: supervisorSubmitBy || "",
            supervisor_submit_id: supervisorSubmitId || "",
            hod_status: hodStatus || "",
            hod_save_on: hodSavedOn || "",
            hod_save_by: hodSavedBy || "",
            hod_save_id: hodSavedId || "",
            hod_submit_on: hodSubmitOn || "",
            hod_submit_by: hodSubmitBy || "",
            hod_submit_id: hodSubmitId || "",
            hod_sign: hodSign || "",
            activites: activitiesArray,
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
                `${API.prodUrl}/Precot/api/spunlace/Service/SanitizationOfMachinesAndSurfaces/SaveSMS`,
                payload,
                { headers }
            )
            .then((res) => {
                setId(res.data.sms_id);
                // console.log("Response", res.data);
                // console.log("sign", res.data.supervisor_sign);
                setSupervisorSign(res.data.supervisor_sign);
                message.success("successfully saved");
                navigate("/Precot/Spunlace/F-24/Summary");
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
        // isActionButtonEnabled();
    }, [remarks, date1]);

    const formattedDateTime = moment(editResponse?.supervisor_submit_on).format('HH:mm');
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
    const formattedDate = formatDate(supervisorSubmitOn);

    const formattedDateHod = formatDate(hodSubmitOn);

    const handleSubmit = () => {
        //  if (!isSubmitEnabled) return;
        setSubmitLoading(true);
        if (!date1) {
            message.error("Please select a valid date.");
        }

        const remarkToSave = (remarks || "").trim() === "" ? "NA" : remarks;
        const activitiesArray = [
            { id: actId1, description: "Slitter / Cutter & Rollers", state: slitter },
            { id: actId2, description: "Fleece Transfer Rollers", state: fleeceRoller },
            { id: actId3, description: "Fleece Cutters", state: fleeceCutter },
            { id: actId4, description: "Roll Winder", state: rollWinder },
            { id: actId5, description: "Shaft Removing Platform", state: shaft },
            { id: actId6, description: "Trollies", state: trollies },
            { id: actId7, description: "Weighing Scale", state: weighing },
            { id: actId8, description: "Pallets", state: pallets },
        ].
            map(activity => ({
                activity: activity.description,
                activityId: activity.activityId || "",
                isCompleted: activity.state === "TICK" ? "Yes" : "No",
                smsId: smsId || null,
            }));

        // Prepare the payload
        const payload = {
            formatName: "SANITIZATION OF MACHINES & SURFACES",
            formatNo: "PH-PRD02/F-024",
            revisionNo: 1,
            refSopNo: "PH-PRD02-D-04",
            unit: "H",
            department: "Spunlace",
            frequency: "Weekly",
            year: state.year,
            month: state.month,
            weekAndDate: formatDate1,
            remarks: remarkToSave,
            week: state.week,
            smsId: smsId || "",
            mail_status: mailStatus || "",
            sanitized_by: sanitizedBy,
            supervisor_sign: supervisorSign || "",
            supervisor_status: supervisorStatus || "",
            supervisor_save_on: supervisorSavedOn || "",
            supervisor_save_by: supervisorSavedBy || "",
            supervisor_save_id: supervisorSavedId || "",
            supervisor_submit_on: supervisorSubmitOn || "",
            supervisor_submit_by: supervisorSubmitBy || "",
            supervisor_submit_id: supervisorSubmitId || "",
            hod_status: hodStatus || "",
            hod_save_on: hodSavedOn || "",
            hod_save_by: hodSavedBy || "",
            hod_save_id: hodSavedId || "",
            hod_submit_on: hodSubmitOn || "",
            hod_submit_by: hodSubmitBy || "",
            hod_submit_id: hodSubmitId || "",
            hod_sign: hodSign || "",
            activites: activitiesArray,
        };
        const validate = (payload) => {


            if (!payload.month) return "Month is required";
            if (!payload.year) return "Year is required";
            if (!payload.weekAndDate) return "Week and Date are required";
            if (!payload.remarks) return "Remarks are required";
            if (!payload.week) return "Week is required";
            if (!payload.sanitized_by) return "Sanitized by is required";


            for (const activity of payload.activites) {
                // console.log(activity);
                if (
                    (activity.description === "Slitter / Cutter & Rollers" ||
                        activity.description === "Fleece Transfer Rollers" ||
                        activity.description === "Fleece Cutters" ||
                        activity.description === "Roll Winder" ||
                        activity.description === "Shaft removing platform" ||
                        activity.description === "Trollies" ||
                        activity.description === "Weighing Scale" ||
                        activity.description === "Pallets"
                    ) &&
                    (activity.isCompleted == null)
                ) {
                    return `${activity.description} must have both 'completed' and 'not applicable' fields specified.`;
                }
            }

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
                `${API.prodUrl}/Precot/api/spunlace/Service/SanitizationOfMachinesAndSurfaces/SubmitSMS`,
                payload,
                { headers }
            )
            .then((res) => {
                // console.log("Response", res.data);
                setSubmitLoading(false);
                message.success("Sucessfully Submitted");
                navigate("/Precot/Spunlace/F-24/Summary");
            })
            .catch((err) => {
                // console.log("Error", err);
                setSubmitLoading(false);
                message.error(err.response.data.message);
            })
            .finally(() => {
                setSubmitLoading(false);
            });
    };

    const weekChange = (value) => {
        setSelectedWeek(value);
    };

    const canDisplayButtons = () => {
        if (roleauth == "ROLE_SUPERVISOR") {
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
        } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
            if (
                editResponse?.hod_status == "HOD_APPROVED" ||
                editResponse?.hod_status == "HOD_REJECTED"
                // emptyarraycheck == 0
            ) {
                return "none";
            }
            return "block";
        } else {
            if (
                editResponse?.hod_status == "HOD_APPROVED" ||
                editResponse?.hod_status == "HOD_REJECTED"
            ) {
                return "none";
            }
            return "block";
        }
    };

    const canDisplayButton2 = () => {
        if (roleauth == "ROLE_SUPERVISOR") {
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
        } else if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
            if (
                editResponse?.hod_status == "HOD_APPROVED" ||
                editResponse?.hod_status == "HOD_REJECTED" 
            ) {
                return "none"; // Disable button 2
            }
            return "block"; // Enable button 2
        } else {
            if (
                editResponse?.hod_status == "HOD_APPROVED" ||
                editResponse?.hod_status == "HOD_REJECTED"
            ) {
                return "none"; // Disable button 2
            }
            return "block"; // Enable button 2
        }
    };

    const canEdit = () => {

        roleauth === "ROLE_SUPERVISOR" &&
            editResponse?.supervisor_status === "SUPERVISOR_APPROVED" &&
            (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
                editResponse?.hod_status === "HOD_APPROVED") ||
            roleauth === "ROLE_HOD" &&
            (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
                editResponse?.hod_status === "HOD_APPROVED" ||
                editResponse?.hod_status === "HOD_REJECTED") ||
            roleauth === "ROLE_DESIGNEE" &&
            (editResponse?.hod_status === "WAITING_FOR_APPROVAL" ||
                editResponse?.hod_status === "HOD_APPROVED" ||
                editResponse?.hod_status === "HOD_REJECTED")

    }
    const isEditable = canEdit();
    const items = [
        
        {
            key: "1",
            label: "Form",
            children: (
                <>
                            <div style={{ margin: '10px', backgroundColor: 'white', width: '250px', padding: '4px', color: 'black', borderRadius: '8px', border: "1px solid black" }}><span style={{ width: '30px', margin: '10px' }}><b>BULK</b></span>    <Radio.Group
        onChange={(e) => { handleBulkOption(e) }}
        value={bulkState}
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
        style={{ color: 'white' }}
      >
        <Radio value="TICK">Yes</Radio>
        {/* <Radio value="N">No</Radio> */}
        <Radio value="NA">NA</Radio>
      </Radio.Group></div>
      
                    <table align="left" style={{ width: "30%", alignItems: "left" }}>
                        <thead>
                            <tr style={{ height: "5em" }}>
                                <th
                                    style={{
                                        fontSize: "1.2em",
                                        fontWeight: "bold",
                                        // border: "2px solid black",
                                        width: "27%"
                                    }}
                                >
                                    Activity
                                </th>
                                <th
                                    style={{
                                        fontSize: "2em",
                                        fontWeight: "bold",
                                        // border: "2px solid black",
                                        width: "3%"
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
                                                value={state.week}
                                                options={weeks}
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
                                                onChange={handleDateChange}
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
                                        </Form.Item>
                                    </Form>
                                </td>
                            </tr>
                            <tr>
                                {/* style={{ border: "2px solid black" }} */}
                                <td>
                                    <p>Slitter / Cutter & Rollers</p>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            padding: "1em 1em",
                                            // width: "48em",
                                        }}
                                    >
                                        <Radio.Group
                                            value={slitter}
                                            onChange={(e) => setSlitter(e.target.value)}
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
                                        >
                                            <Radio value="TICK">&#x2713;</Radio>
                                            <Radio value="NA">NA</Radio>
                                        </Radio.Group>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Fleece Transfer Rollers</p>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            padding: "1em 1em",
                                            // width: "48em",
                                        }}
                                    >
                                        <Radio.Group
                                            value={fleeceRoller}
                                            onChange={(e) => setFleeceRoller(e.target.value)}
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
                                        >
                                            <Radio value="TICK">&#x2713;</Radio>
                                            <Radio value="NA">NA</Radio>
                                        </Radio.Group>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Fleece Cutters</p>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            padding: "1em 1em",
                                            // width: "48em",
                                        }}
                                    >
                                        <Radio.Group
                                            value={fleeceCutter}
                                            onChange={(e) => setFleeceCutter(e.target.value)}
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
                                        >
                                            <Radio value="TICK">&#x2713;</Radio>
                                            <Radio value="NA">NA</Radio>
                                        </Radio.Group>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Roll Winder</p>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            padding: "1em 1em",
                                            // width: "48em",
                                        }}
                                    >
                                        <Radio.Group
                                            value={rollWinder}
                                            onChange={(e) => setRollWinder(e.target.value)}
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
                                        >
                                            <Radio value="TICK">&#x2713;</Radio>
                                            <Radio value="NA">NA</Radio>
                                        </Radio.Group>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Shaft removing platform</p>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            padding: "1em 1em",
                                            // width: "48em",
                                        }}
                                    >
                                        <Radio.Group
                                            value={shaft}
                                            onChange={(e) => setShaft(e.target.value)}
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
                                        >
                                            <Radio value="TICK">&#x2713;</Radio>
                                            <Radio value="NA">NA</Radio>
                                        </Radio.Group>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Trollies</p>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            padding: "1em 1em",
                                            // width: "48em",
                                        }}
                                    >
                                        <Radio.Group
                                            value={trollies}
                                            onChange={(e) => setTrollies(e.target.value)}
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
                                        >
                                            <Radio value="TICK">&#x2713;</Radio>
                                            <Radio value="NA">NA</Radio>
                                        </Radio.Group>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Weighing Scale</p>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            padding: "1em 1em",
                                            // width: "48em",
                                        }}
                                    >
                                        <Radio.Group
                                            value={weighing}
                                            onChange={(e) => setWeighing(e.target.value)}
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
                                        >
                                            <Radio value="TICK">&#x2713;</Radio>
                                            <Radio value="NA">NA</Radio>
                                        </Radio.Group>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Pallets</p>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            padding: "1em 1em",
                                            // width: "48em",
                                        }}
                                    >
                                        <Radio.Group
                                            value={pallets}
                                            onChange={(e) => setPallets(e.target.value)}
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
                                        >
                                            <Radio value="TICK">&#x2713;</Radio>
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
                <table align="left" style={{ width: 500, alignItems: "left" }}>
                    <p>Remark/Comment</p>
                    <Input.TextArea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        style={{ width: 600, height: 100 }}
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
                </table>
            ),
        },
        {
            key: "3",
            label: "Reviews",
            children: (
                <>
                    <table align="left" style={{ width: "40%", alignItems: "left" }}>
                        <tr>
                            <td
                                style={{
                                    padding: "2em",
                                    borderRight: "1px solid black "
                                }}
                            >
                                <b>Sanitized By</b>
                                <p>(Trained person)</p>
                            </td>
                            <td style={{ textAlign: "center", fontfamily: 'Times New Roman' }}>

                                <Input
                                    className="inp-new"
                                    value={sanitizedBy}
                                    style={{ border: "none", textAlign: "center" }}
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
                            {/* {editResponse?.supervisor_submit_on && (
                                    <div>
                                        {` ${moment(editResponse.supervisor_submit_on).format('HH:mm')}`}
                                    </div>
                                )} */}
                            {/* </td> */}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    padding: "2em",
                                    borderRight: "1px solid "
                                }}
                            >
                                <b>Verified By</b>
                                <p>(Supervisor)</p>
                            </td>
                            <td>
                                <p style={{ textAlign: "center" }}></p>
                                {(editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
                                    editResponse?.supervisor_status === "SUPERVISOR_APPROVED") && (
                                        <textarea
                                            className="inp-new"
                                            value={supervisorSign ? `${supervisorSign}\n ${formattedDate}` : ""}
                                            readOnly
                                            rows="2"
                                            style={{ resize: "none", overflow: "hidden" }}
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
                                    )}
                                {(editResponse?.supervisor_status === "SUPERVISOR_APPROVED" ||
                                    editResponse?.supervisor_status === "SUPERVISOR_REJECTED" ||
                                    editResponse?.hod_status === "HOD_APPROVED" ||
                                    editResponse?.hod_status === "HOD_REJECTED") &&
                                    getImage && (
                                        <img className="signature"
                                            src={getImage}
                                            alt="logo"
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                margin: "0 auto"
                                            }}
                                        />
                                    )}
                            </td>

                        </tr>
                        <tr>
                            <td
                                style={{
                                    padding: "2em",
                                }}
                            >
                                <b>Reviewed by HOD </b>
                                <p>(at least once in a month)</p>
                            </td>
                            <td
                                style={{
                                    // borderRight: "none",
                                }}
                            >
                                {(editResponse?.hod_status === "HOD_APPROVED" ||
                                    editResponse?.hod_status === "HOD_REJECTED") && (
                                        <textarea
                                            className="inp-new"
                                            value={hodSign ? `${hodSign} \n ${formattedDateHod}` : ""}
                                            readOnly
                                            rows="2"
                                            style={{ resize: "none" }}
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
                                    )}
                                {(editResponse?.hod_status === "HOD_APPROVED" ||
                                    editResponse?.hod_status === "HOD_REJECTED"
                                ) &&
                                    getImage1 && (
                                        <img className="signature"
                                            src={getImage1}
                                            alt="logo"
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                margin: "0 auto"
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
    const onChange = (key) => {
        // console.log(key);
    };
    return (
        <div>
 <PrecotSidebar open={open} onClose={onClose} role={localStorage.getItem("role")} />
            <BleachingHeader
                unit="Unit-H"
                formName="SANITIZATION OF MACHINES & SURFACES "
                formatNo="PH-PRD02/F-024"
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
                            <b>Spunlace</b>
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
                        disabled={!rejectRemarks}
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
                    <label style={{ marginRight: "8px" }}>Reason:</label>
                    <TextArea
                        value={rejectRemarks}
                        onChange={(e) => setRejectRemarks(e.target.value)}
                        rows={4} // Adjust the number of rows as needed
                        style={{ width: "100%" }} // Adjust the width as needed
                    />
                </div>
            </Modal>
            <div style={{ paddingBottom: "2em" }}></div>

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

export default Spunlace_f24;