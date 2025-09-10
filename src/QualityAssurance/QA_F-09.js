import { Button, Col, Input, Row, Tabs, Select, message, Tooltip } from "antd";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CloseOutlined } from "@ant-design/icons";
import { Radio, Form, DatePicker } from "antd";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";

import { useNavigate, useLocation } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";

import { BiFontSize, BiLock } from "react-icons/bi";
import { CheckOutlined } from "@ant-design/icons";
import { IoChevronBackSharp, IoCreate, IoSave } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { GrDocumentStore } from "react-icons/gr";
import moment from "moment";
import gif from "../Assests/gif.gif";
import { Table, Modal, Drawer, Menu, Avatar } from "antd";
import { FaLock, FaTrash } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { GoArrowLeft } from "react-icons/go";
import { LoadingOutlined, PrinterOutlined } from "@ant-design/icons";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_F09 = () => {
  const [count, setcount] = useState("");
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const [bo_striper_roller_speed, setbo_striper_roller_speed] = useState("");
  const [production_date, setproduction_date] = useState("");
  const [month, setmonth] = useState("");
  const [year, setyear] = useState("");
  const [bo_complaint_Reeived_date, setbo_complaint_Reeived_date] =
    useState("");
  const [deletedIds, setDeletedIds] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [customer_name, setcustomer_name] = useState("");
  const [trainingSessionNo, settrainingSessionNo] = useState("");
  const [topicName, settopicName] = useState("");
  const [sopNumber, setsopNumber] = useState("");
  const [revisionNumber, setrevisionNumber] = useState("");
  const [Container_No, setContainer_No] = useState("");
  const [Production_date, setProduction_date] = useState("");
  const [Complaint_Sample_Received, setComplaint_Sample_Received] =
    useState("");
  const [referenceImageBase64, setReferenceImageBase64] = useState("");
  const [AssReferenceImageBase64, setAssReferenceImageBase64] = useState("");

  const [reiter_chute_feed_roller_speed, setreiter_chute_feed_roller_speed] =
    useState("");
  const [
    reiter_chute_feed_roller_speed_2,
    setreiter_chute_feed_roller_speed_2,
  ] = useState("");
  const [feed_roller_speed_rc, setfeed_roller_speed_rc] = useState("");
  const [Action_Taken, setAction_Taken] = useState("");
  const [marks, setmarks] = useState("");
  const [venue, setvenue] = useState("");
  const [traineeName, settraineeName] = useState("");
  const [trainerName, settrainerName] = useState("");
  const [traineeID, settraineeID] = useState("");
  const [corrective_action, setcorrective_action] = useState("");

  const [id, setid] = useState("");
  const [verification_for_effectiveness, setverification_for_effectiveness] =
    useState("");
  const { Option } = Select;
  const [Packing, setPacking] = useState("");
  const [Contamination, setContamination] = useState("");
  const [Critical, setCritical] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [departmentName, setdepartmentName] = useState("");
  const [Less_Qty, setLess_Qty] = useState("");
  const [Major, setMajor] = useState("");
  const [Chemical, setChemical] = useState("");
  const [date, setdate] = useState("");
  const [complaint_Reeived_date, setcomplaint_Reeived_date] = useState("");
  const [others, setothers] = useState("");
  const [complaint_Reeived_date_for, setcomplaint_Reeived_date_for] =
    useState("");
  const [minor, setminor] = useState("");
  const [complaint_Reeived_date_foa, setcomplaint_Reeived_date_foa] =
    useState("");
  const [feed_roller_speed_por, setfeed_roller_speed_por] = useState("");
  const [feed_roller_speed_por_2, setfeed_roller_speed_por_2] = useState("");
  const [complaint_Reeived_date_por, setcomplaint_Reeived_date_por] =
    useState("");
  const [complaint_Reeived_date_por2, setcomplaint_Reeived_date_por2] =
    useState("");
  const [minor_2, setminor_2] = useState("");
  const [complaint_Reeived_date_foa_2, setcomplaint_Reeived_date_foa_2] =
    useState("");
  const [deaprtment_list, setdepartment_list] = useState([]);
  const [feed_roller_speed_poa, setfeed_roller_speed_poa] = useState("");
  const [feed_roller_speed_poa_2, setfeed_roller_speed_poa_2] = useState("");
  const [complaint_Reeived_date_poa, setcomplaint_Reeived_date_poa] =
    useState("");
  const [complaint_Reeived_date_poa_2, setcomplaint_Reeived_date_poa_2] =
    useState("");
  const [Nature_of_Non_Conformity, setNature_of_Non_Conformity] = useState("");
  const [Nature_of_Non_Conformity_2, setNature_of_Non_Conformity_2] =
    useState("");
  const [reiter_card_1_delivery_speed, setreiter_card_1_delivery_speed] =
    useState("");
  const [reiter_card_1_delivery_speed_2, setreiter_card_1_delivery_speed_2] =
    useState("");
  const [why1, setwhy1] = useState("");
  const [why2, setwhy2] = useState("");
  const [why3, setwhy3] = useState("");
  const [why4, setwhy4] = useState("");
  const [why5, setwhy5] = useState("");
  const [why5_2, setwhy5_2] = useState("");

  const [collecting_belt_speed, setcollecting_belt_speed] = useState("");
  const [collecting_belt_speed_2, setcollecting_belt_speed_2] = useState("");
  const [Invoice_No, setInvoice_No] = useState("");
  const [SB_Observation, setSB_Observation] = useState("");
  const [HW_waterFill, setHW_waterFill] = useState("");
  const [HW_temp, setHW_temp] = useState("");
  const [HW_circulation, setHW_circulation] = useState("");
  const [HW_draining, setHW_draining] = useState("");
  const [HW_Observation, setHW_Observation] = useState("");
  const [HW_Observation2, setHW_Observation2] = useState("");
  const [HW_waterFill2, setHW_waterFill2] = useState("");
  const [HW_temp2, setHW_temp2] = useState("");

  const [HW_circulation2, setHW_circulation2] = useState("");
  const [HW_draining2, setHW_draining2] = useState("");
  const [NW_waterFill, setNW_waterFill] = useState("");
  const [NW_cheTransfer, setNW_cheTransfer] = useState("");
  const [NW_temp, setNW_temp] = useState("");
  const [NW_circulation, setNW_circulation] = useState("");
  const [NW_draining, setNW_draining] = useState("");
  const [NW_Observation, setNW_Observation] = useState("");
  const [FC_waterFill, setFC_waterFill] = useState("");

  const [department, setdepartment] = useState("");
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
  const [alc_top_chute_pressure, setalc_top_chute_pressure] = useState("");
  const [productId, setproductId] = useState("");

  const [alc_bottom_chute_pressure, setalc_bottom_chute_pressure] =
    useState("");
  const [alc_bottom_chute_pressure_2, setalc_bottom_chute_pressure_2] =
    useState("");
  const [alc_feed_roller_speed, setalc_feed_roller_speed] = useState("");
  const [alc_feed_roller_speed_2, setalc_feed_roller_speed_2] = useState("");
  const [turbo_roller_speed, setturbo_roller_speed] = useState("");
  const [Responsibility, setResponsibility] = useState("");
  const [press_roller_speed, setpress_roller_speed] = useState("");
  const [press_roller_speed_2, setpress_roller_speedd_2] = useState("");
  const [mesh_belt_speed, setmesh_belt_speed] = useState("");
  const [mesh_belt_speed_2, setmesh_belt_speed_2] = useState("");
  const [HOD_sign, setHOD_sign] = useState("");
  const [HOD_date, setHOD_date] = useState("");
  const [QA_sign, setQA_sign] = useState("");
  const [QA_date, setQA_date] = useState("");
  const [loading, setLoading] = useState(true);
  const [bmrNumber, setBmrNumber] = useState("");
  const [mcNumber, setMcNumber] = useState("");
  const [newDate, setNewDate] = useState("");
  const [batchNolist, setBatchNolist] = useState("Select BatchNo");
  // const [ccfno, setccfno] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finish, setFinish] = useState("");
  const [batchno, setbatchno] = useState([]);
  const [endTime, setEndTime] = useState("");
  const [finishlov, setfinishLOV] = useState([]);
  const [finisharraylist, setfinisharray] = useState("Select Finish");
  const [availableBMRno, setAvailableBMRno] = useState([]);
  const [availableBMRnoLov, setAvailableBMRnoLov] = useState("Select BMRNo");
  const [remarks, setremarks] = useState("");
  const [ccfnoInchargeFlag, setccfnoInchargeFlag] = useState(false);
  const [hodIncharge, sethodIncharge] = useState(false);
  const [supervisor, setsupervisor] = useState(false);
  const [availableccfno, setAvailableccfnos] = useState([]);
  const [availableccfnolov, setAvailableccfnoslov] = useState("Select ccfno");
  const [availableMachineLov, setAvailableMachineLov] = useState([]);
  const [availablemclov, setAvailableMAClov] = useState("Select M/C No");
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
  const [operator_signsignaturedate, setoperator_signsignaturedate] =
    useState("");
  const [hodsign, sethodsigndate] = useState("");
  const [sample_received_on, setsample_received_on] = useState("");
  const numbers = [1, 2, 3];
  const [availableshift, setAvailableShifts] = useState([]);
  const [availableshiftlov, setAvailableShiftslov] =
    useState("Select Department");
  const [availabledepartment, setAvailabledepartment] =
    useState("Select Department");
  const [selectedRow, setSelectedRow] = useState(null);
  const finisharray = ["Crispy", "Soft"];
  const [saveLoading, setSaveLoading] = useState(false);
  const [dateprintsec, setisdateprintsec] = useState(false);
  const [complaint_replied_on, setcomplaint_replied_on] = useState("");
  const [customername, setcustomername] = useState("");
  const [Mixing, setMixing] = useState("");
  const [Material, setMaterial] = useState("");
  const [STD_GSM, setSTD_GSM] = useState("");
  const [MaterialCode, setMaterialCode] = useState("");
  const [Pattern, setpattern] = useState("");
  const [Target_Date, setTarget_Date] = useState("");
  const [financialYear, setfinancialYear] = useState("");
  const initial = useRef(false);
  const roleBase = localStorage.getItem("role");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);
  const handleOpenModal2 = () => setIsModalVisible2(true);
  const handleCloseModal2 = () => setIsModalVisible2(false);
  const onChange = (key) => {
    // console.log(key);
  };
  const [saveBtnStatus, setSaveBtnStatus] = useState(true);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const location = useLocation();
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };
  const [rows, setRows] = useState([
    {
      date: "",
      batchNo: "",
      productName: "",
      quantity: "",
      uom: "",
      reasonForDisposal: "",
    },
  ]);
  const { state } = location;

  const { datevalue, depno } = state || {};
  const { traningid, traineesession } = state || {};
  const datefomrat = moment(datevalue).format("DD/MM/YYYY");

  const [formData, setFormData] = useState({
    unit: "Unit H",
    formatName: "TRAINING QUESSIONNAIRE",
    formatNo: "PH-QAD01/F-009",
    revisionNo: 1,
    sopNumber: "PH-QAD01-D-15",
    year: "",
    month: "",
    trainingDate: "",
    trainingSessionNumber: "",
    topicName: "",
    trainingSopNumber: "",
    trainingRevisionNumber: "",
    departmentName: "",
    trainerName: "",
    traineeName: "",
    traineeIdNumber: "",
    venue: "",
    marks: "",
    questionsBase64: "",
    assessmentBase64: "",
  });
  console.log("dateformat", datevalue, depno);
  const McNo = [1, 2, 3, 4, 5];
  // Function to handle submitting
  const isPrintEnabled =
    selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
    selectedRow?.qa_mr_status === "QA_MANAGER_APPROVED" &&
    selectedRow?.operator_status === "OPERATOR_APPROVED";

  const today = new Date().toISOString().split("T")[0];
  const containerStyle = {
    position: "relative",
    marginLeft: isMobile ? "50px" : "60px",
  };
  const handleStartTimeBlur = () => {
    validateTimes(startTime, endTime);
  };
  const handleLogout = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("You want to log out")) {
      navigate("/Precot");
    }
  };
  const validateTimes = (start, end) => {
    // console.log(start, end);

    const startMoment = moment(start, "HH:mm");
    const endMoment = moment(end, "HH:mm");

    if (startMoment.isSameOrAfter(endMoment)) {
      message.error("End time must be after start time.");
      setEndTime(""); // Reset end time if validation fails
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
  const canDisplayButtons_reject = () => {};

  // Handle add new row
  const handleAddRow = () => {
    const newRow = {
      item_description: "",
      identification_no: "",
      verification_frequency: "",
      location: "",
      remarks: "",
    }; // New empty row
    setRows([...rows, newRow]);
  };

  // Handle delete row
  const handleDeleteRow = async (index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );

    if (isConfirmed) {
      const id = rows[index].line_id;

      if (id) {
        // Add the `line_id` to the deletedIds array
        setDeletedIds((prevDeletedIds) => [...prevDeletedIds, id]);
      }

      // Remove the row locally regardless of `line_id` value
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
      alert("Row deleted successfully.");
    }
  };
  // Function to delete rows by IDs in deletedIds
  const deleteRows = async () => {
    for (const id of deletedIds) {
      try {
        const response = await fetch(
          `${API.prodUrl}/Precot/api/QA/Service/api/deleteProductDispositionLogBook?id=${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error(`Failed to delete row with ID: ${id}`);
        }
      } catch (error) {
        console.error(`Error deleting row with ID: ${id}`, error);
      }
    }
    // Clear deletedIds after deletion
    setDeletedIds([]);
  };
  // Handle input change for each row
  const handleInputChange = (field, value, index) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  const canDisplayButtons = () => {
    if (
      roleBase === "ROLE_HOD" ||
      roleBase === "HR_EXECUTIVE" ||
      roleBase === "QA_MANAGER" ||
      roleBase === "ROLE_MR"
    ) {
      if (selectedRow?.hodDesigneeStatus == "HOD_DESIGNEE_SUBMITTED") {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
    }
  };
  const canDisplayButton2 = () => {
    if (
      roleBase === "ROLE_HOD" ||
      roleBase === "HR_EXECUTIVE" ||
      roleBase === "QA_MANAGER" ||
      roleBase === "ROLE_MR"
    ) {
      if (selectedRow?.hodDesigneeStatus == "HOD_DESIGNEE_SUBMITTED") {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
    }
  };
  const canEdit = () => {
    if (
      roleBase === "ROLE_HOD" ||
      roleBase === "HR_EXECUTIVE" ||
      roleBase === "QA_MANAGER" ||
      roleBase === "ROLE_MR"
    ) {
      if (selectedRow?.hodDesigneeStatus === "HOD_DESIGNEE_SUBMITTED") {
        return "false"; // Return false for this specific condition
      }
    }
  };
  const isEditable = canEdit();

  const fetchData_date = async () => {
    try {
      setLoading(true);

      axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/trainingQuestionnaire/getTrainingQuestionnaire?trainingSessionNumber=${traineesession}&traineeIdNumber=${traningid} `,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log("response VALUE", res.data);
          // if(roleBase==="ROLE_HOD"|| roleBase==="ROLE_DESIGNEE" )
          // {
          //   if( res.data?.message==="No data")
          //   {
          //     navigate("/Precot/QA/F-09/Summary");
          //     message.error("No Data found to approve");
          //   }
          // }
          // console.log("resvalue of data ", res.data.bo_spiked_lattice_speed);

          if (res.data?.length === 0 || res.data == undefined) {
            // console.log('The array is empty');
          } else {
            // console.log('The array is not empty', res.data.body?.operator_submitted_on);
            if (res.data?.hodDesigneeSubmitOn) {
              const dateformat_hod = moment(
                res.data?.hodDesigneeSubmitOn
              ).format("DD/MM/YYYY HH:mm");
              sethodsigndate(dateformat_hod);
            } else {
              sethodsigndate("");
            }
            if (res.data?.qa_mr_submit_on) {
              const dateformat_supervisor = moment(
                res.data?.qa_mr_submit_on
              ).format("DD/MM/YYYY HH:mm");
              setsupersigndate(dateformat_supervisor);
            } else {
              setsupersigndate("");
            }
          }

          if (
            res.data &&
            (res.data?.length > 0 || res.data?.length == undefined)
          ) {
            setAvailableShiftslov(res.data?.department);
            // setproductId(res.data?.productId);
            setid(res.data?.questionnaireId);
            setSelectedRow(res.data);
            setdate(res.data?.trainingDate);
            settopicName(res.data?.topicName);
            setsopNumber(res.data?.trainingSopNumber);
            setrevisionNumber(res.data?.trainingRevisionNumber);
            setAvailabledepartment(res.data?.departmentName);
            settrainerName(res.data?.trainerName);
            settraineeName(res.data?.traineeName);
            settraineeID(res.data?.traineeIdNumber);
            setvenue(res.data?.venue);
            setmarks(res.data?.marks);
            setReferenceImageBase64(res.data?.questions);
            setAssReferenceImageBase64(res.data?.assessmentOfQuestionnaire);

            setemptyarraycheck(res.data.body?.length);

            //---------------------------------------
            //supimage
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.hodDesigneeSign}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  responseType: "arraybuffer",
                }
              )
              .then((res) => {
                // console.log("Response:", res.data.body);
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
          }
        });

      // Assuming the response data structure matches the payload structure you provided
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const beforeStyle = {
    content: isMobile ? '"Choose:"' : '"Select:"',
    zIndex: "9",

    position: "absolute",
    backgroundColor: "#fafafa",
    border: "1px solid #dddd",
    left: "-45px",
    borderRadius: "5px 0px 1px 5px",
    top: "50%",
    padding: "7px",
    transform: "translateY(-50%)",
    marginRight: "8px",
    fontSize: isMobile ? "12px" : "14px",
    color: isMobile ? "#f00" : "#000",
  };
  const beforeStyle_finish = {
    content: isMobile ? '"Choose:"' : '"Select:"',
    zIndex: "9",

    position: "absolute",
    backgroundColor: "#fafafa",
    border: "1px solid #dddd",
    left: "-68px",
    borderRadius: "5px 0px 1px 5px",
    top: "50%",
    padding: "7px",
    transform: "translateY(-50%)",
    marginRight: "8px",
    fontSize: isMobile ? "12px" : "14px",
    color: isMobile ? "#f00" : "#000",
  };
  const machineno_finish = {
    content: isMobile ? '"Choose:"' : '"Select:"',
    zIndex: "9",

    position: "absolute",
    backgroundColor: "#fafafa",
    border: "1px solid #dddd",
    left: "-57px",
    borderRadius: "5px 0px 1px 5px",
    top: "50%",
    padding: "7px",
    transform: "translateY(-50%)",
    marginRight: "8px",
    fontSize: isMobile ? "12px" : "14px",
    color: isMobile ? "#f00" : "#000",
  };

  const handleSubmit = async () => {
    try {
      listofsharptools_submit();
      await deleteRows();
      setSaveBtnStatus(true);
      setSubmitBtnStatus(true);

      //// console.log("Date Format :",new Date(INcharge_Date).toLocaleDateString() + " " +new Date(INcharge_Date).toLocaleDateString )
      // alert("Bleaching job card submitted successfully!");
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  };
  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-09/Summary");
  };

  const sharptools_save = () => {
    const isValid = () => {};
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }

    // alert(department);
    setSaveLoading(true);

    const date_month = moment(date, "YYYY-MM-DD");
    const year = date_month.year();
    const month = date_month.format("MMMM");

    const payload = {
      unit: "Unit H",
      formatName: "TRAINING QUESSIONNAIRE",
      formatNo: "PH-QAD01/F-009",
      revisionNo: 1,
      questionnaireId: id,
      sopNumber: "PH-QAD01-D-15",
      year: year,
      month: month,
      trainingDate: date,
      trainingSessionNumber: traineesession,
      topicName: topicName,
      trainingSopNumber: sopNumber,
      trainingRevisionNumber: revisionNumber,
      departmentName: department,
      trainerName: trainerName,
      traineeName: traineeName,
      traineeIdNumber: traningid,
      venue: venue,
      marks: marks,
      questionsBase64: referenceImageBase64,
      assessmentBase64: AssReferenceImageBase64,
    };

    console.log("payload values", payload);
    // Make the POST request to the API endpoint
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/trainingQuestionnaire/saveTrainingQuestionnaire`,
        payload,
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        message.success("Form Saved successfully");

        // console.log("messsage", res);
        navigate("/Precot/QA/F-09/Summary");
        // message.success("LaydownChecklist Submitted successfully");
      })
      .catch((err) => {
        setSaveLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSave = async () => {
    // Here you can add your logic for saving the data
    try {
      sharptools_save();
      await deleteRows();
      setSaveBtnStatus(true); // Example to disable after saving
      setSubmitBtnStatus(true);
      // alert("Bleaching job card Saved successfully!");
      //  message.success("Bleaching job card Saved successfully!");
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  };

  //SAve API

  const listofsharptools_submit = () => {
    const isValid = () => {
      if (!date) return "Date  is required";
      // if (!traineesession) return "Traineesession  is required";
      if (!topicName) return "TopicName  is required";
      if (!sopNumber) return "SopNumber  is required";
      if (!revisionNumber) return "RevisionNumber  is required";
      // if (!availabledepartment) return "Department  is required";
      if (!trainerName) return "TrainerName  is required";
      if (!traineeName) return "TraineeName  is required";
      if (!venue) return "Venue  is required";
      if (!marks) return "Marks is required";
      if (!referenceImageBase64) return "Questions Image  is required";
      if (!AssReferenceImageBase64) return "Assessment Image is required";
      return null;
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    setSaveLoading(true);

    // alert(department);
    setSaveLoading(true);
    const date_month = moment(date, "YYYY-MM-DD");
    const year = date_month.year();
    const month = date_month.format("MMMM");
    // Format the payload according to the API documentation
    const payload = {
      unit: "Unit H",
      formatName: "TRAINING QUESSIONNAIRE",
      formatNo: "PH-QAD01/F-009",
      revisionNo: 1,
      questionnaireId: id,
      sopNumber: "PH-QAD01-D-15",
      year: year,
      month: month,
      trainingDate: date,
      trainingSessionNumber: traineesession,
      topicName: topicName,
      trainingSopNumber: sopNumber,
      trainingRevisionNumber: revisionNumber,
      departmentName: department,
      trainerName: trainerName,
      traineeName: traineeName,
      traineeIdNumber: traningid,
      venue: venue,
      marks: marks,
      questionsBase64: referenceImageBase64,
      assessmentBase64: AssReferenceImageBase64,
    };

    // Make the POST request to the API endpoint
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/trainingQuestionnaire/submitTrainingQuestionnaire`,
        payload,
        { headers }
      )
      .then((res) => {
        // setSaveLoading(false);
        message.success("Form Submitted successfully");
        // console.log("messsage", res);

        // message.success("LaydownChecklist Submitted successfully");
        navigate("/Precot/QA/F-09/Summary");
      })
      .catch((err) => {
        // setSaveLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleChangeBOStriper = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setbo_striper_roller_speed(inputValue);
    }
  };
  const handle_blur_wbo_stripper2 = () => {
    if (Contamination < 50 || Contamination > 100) {
      message.error(
        "Please enter a number between 50 and 100 for WBO - Stripper roller speed WBO-2"
      );
      setContamination("");
    }
  };

  const handleInputwbo_stripper2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setContamination(inputValue);
    }
  };

  const handleChange_WBO_stripper2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setContamination(inputValue);
    }
  };

  const handleChangeContainer_No = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
      setContainer_No(inputValue);
    }
  };
  const handleInputwbo_stripper = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setPacking(inputValue);
    }
  };
  const handleInput_wbo_stripper = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setPacking(inputValue);
    }
  };
  const handleChange_WBO_stripper = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setPacking(inputValue);
    }
  };
  const handleInput_wbo_wipper = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setMajor(inputValue);
    }
  };
  const handleInput_date = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setdate(inputValue);
    }
  };

  const handleInput_complaint_Reeived_date = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setcomplaint_Reeived_date(inputValue);
    }
  };
  const handleInput_complaint_Reeived_date_FOR = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setcomplaint_Reeived_date_for(inputValue);
    }
  };
  const handleInput_minor = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setminor(inputValue);
    }
  };
  const handleInput_complaint_Reeived_date_foa = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setcomplaint_Reeived_date_foa(inputValue);
    }
  };
  const handleInput_feed_roller_speed_por = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setfeed_roller_speed_por(inputValue);
    }
  };
  const handleInput_feed_roller_speed_poa = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (
      /^\d*\.?\d*$/.test(inputValue) &&
      inputValue.replace(".", "").length <= 2
    ) {
      setfeed_roller_speed_poa(inputValue);
    }
  };
  const handleInput_complaint_Reeived_date_poa = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setcomplaint_Reeived_date_poa(inputValue);
    }
  };
  const handleInput_complaint_Reeived_date_poa_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setcomplaint_Reeived_date_poa_2(inputValue);
    }
  };
  const handleInput_feed_roller_speed_poa_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (
      /^\d*\.?\d*$/.test(inputValue) &&
      inputValue.replace(".", "").length <= 2
    ) {
      setfeed_roller_speed_poa_2(inputValue);
    }
  };
  const handleInput_feed_roller_speed_por_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setfeed_roller_speed_por_2(inputValue);
    }
  };
  const handleInput_complaint_Reeived_date_foa_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setcomplaint_Reeived_date_foa_2(inputValue);
    }
  };

  const handleInput_complaint_Reeived_date_por = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setcomplaint_Reeived_date_por(inputValue);
    }
  };
  const handleInput_alc_feed_roller_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (
      /^\d*\.?\d*$/.test(inputValue) &&
      inputValue.replace(".", "").length <= 2
    ) {
      setalc_feed_roller_speed(inputValue);
    }
  };
  const handleInput_alc_feed_roller_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (
      /^\d*\.?\d*$/.test(inputValue) &&
      inputValue.replace(".", "").length <= 2
    ) {
      setalc_feed_roller_speed_2(inputValue);
    }
  };
  const handleInput_why1 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setwhy1(inputValue);
    }
  };
  const handleInput_why3 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setwhy3(inputValue);
    }
  };
  const handleInput_why5 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setwhy5(inputValue);
    }
  };
  const handleInput_turbo_roller_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
      setturbo_roller_speed(inputValue);
    }
  };
  const handleInput_press_roller_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setpress_roller_speed(inputValue);
    }
  };
  const handleInput_mesh_belt_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setmesh_belt_speed(inputValue);
    }
  };
  const handleInput_collecting_belt_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setcollecting_belt_speed(inputValue);
    }
  };
  const handleInput_collecting_belt_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setcollecting_belt_speed_2(inputValue);
    }
  };
  const handleInput_mesh_belt_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setmesh_belt_speed_2(inputValue);
    }
  };
  const handleInput_press_roller_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setpress_roller_speedd_2(inputValue);
    }
  };
  const handleInput_why2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 2) {
      setwhy2(inputValue);
    }
  };
  // Handle image change and convert to Base64
  const handleImageChange = async (event) => {
    const { name, files } = event.target;
    if (name === "referenceImage" && files.length > 0) {
      const file = files[0];
      const base64 = await convertToBase64(file);
      setReferenceImageBase64(base64);
    }
  };
  const handleImageChange2 = async (event) => {
    const { name, files } = event.target;
    if (name === "referenceImage" && files.length > 0) {
      const file = files[0];
      const base64 = await convertToBase64(file);
      setAssReferenceImageBase64(base64);
    }
  };
  // Helper function to convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 part
      reader.onerror = (error) => reject(error);
    });
  };
  const handleInput_why5_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
      setwhy5_2(inputValue);
    }
  };

  const handleKeyPress_space = (e) => {
    if (
      !/[0-9a-zA-Z./]/.test(e.key) && // Removed '_' and '-'
      e.key !== " " && // Allow space bar
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab" &&
      e.key !== "Enter"
    ) {
      e.preventDefault();
    }
  };
  const handleInput = (e) => {
    // console.log("handle value", e);
    let inputValue = e.target.value;

    // Ensure input is numeric and limit to two digits
    if (!isNaN(inputValue) && inputValue.length > 3) {
      inputValue = inputValue.slice(0, 3);
    }

    // Update state with formatted value
    setbo_striper_roller_speed(inputValue);
  };

  const handleInputContainer_No = (e) => {
    // console.log("handle value", e);
    let inputValue = e.target.value;

    // Ensure input is numeric and limit to two digits
    if (!isNaN(inputValue) && inputValue.length > 4) {
      inputValue = inputValue.slice(0, 4);
    }

    // Update state with formatted value
    setContainer_No(inputValue);
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectProductDispositionLogBook`,
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
        navigate("/Precot/QA/F-49/Summary");
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
        `${API.prodUrl}/Precot/api/QA/Service/api/approveOrRejectProductDispositionLogBook`,
        {
          id: id,
          status: "Reject",
          remarks: Critical,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res.data.body.message);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/QA/F-49/Summary");
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

  const handleInputbotranstfan = (e) => {
    // console.log("handle value", e);
    let inputValue = e.target.value;

    // Ensure input is numeric and limit to two digits
    if (!isNaN(inputValue) && inputValue.length > 3) {
      inputValue = inputValue.slice(0, 3);
    }

    // Update state with formatted value
    setbo_complaint_Reeived_date(inputValue);
  };

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      // const roleBase = localStorage.getItem("role");

      fetchData_date();
      fetchdata_departmentid();
    }
  }, [token]);
  const fetchdata_departmentid = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Format/Service/getListofDepartment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let dep_id = localStorage.getItem("departmentId");

      const foundDepartment = response.data?.find((dept) => {
        console.log("Inside department list:", dept.id); // Log each department ID
        console.log("value of department", dep_id);
        const numericDepId = Number(dep_id);

        if (dept.id === numericDepId) {
          console.log("ID found:", dept.id); // Log if ID is found

          return true; // Return true to indicate a match
        } else {
          console.log("ID not found:", dept.id); // Log if ID is not found
          return false; // Return false to continue searching
        }
      });
      console.log(foundDepartment);
      if (foundDepartment) {
        setdepartment(foundDepartment.department);

        // setbatchno2(foundDepartment.department);
      } else {
        setdepartment("Department not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log("getImage2", getImageOP, getImageSUP, getImageHOD);
  const items = [
    {
      key: "1",
      label: <p>TRAINING QUESTIONNNAIRE</p>,
      children: (
        <div style={{ width: "100%" }}>
          <table>
            <tr>
              <td colspan="20">Date:</td>
              <td colspan="80">
                <Input
                  type="date"
                  style={{ textAlign: "center", width: "100%" }}
                  max={getCurrentDate()}
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                  disabled={isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colspan="20" style={{ paddingLeft: "5px" }}>
                Training Session No.:
              </td>
              <td colspan="80">
                <Input
                  type="text"
                  name="trainingSessionNo"
                  value={traineesession}
                  onChange={(e) => settrainingSessionNo(e.target.value)}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td colspan="20" style={{ paddingLeft: "5px" }}>
                Topic Name:
              </td>
              <td colspan="80">
                <Input
                  type="text"
                  name="topicName"
                  value={topicName}
                  onChange={(e) => settopicName(e.target.value)}
                  disabled={isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colspan="20" style={{ paddingLeft: "5px" }}>
                SOP Number:
              </td>
              <td colspan="30">
                <Input
                  type="text"
                  name="sopNumber"
                  value={sopNumber}
                  onChange={(e) => setsopNumber(e.target.value)}
                  disabled={isEditable}
                />
              </td>
              <td colspan="20" style={{ paddingLeft: "5px" }}>
                Revision Number:
              </td>
              <td colspan="30">
                <Input
                  type="text"
                  name="revisionNumber"
                  value={revisionNumber}
                  onChange={(e) => setrevisionNumber(e.target.value)}
                  disabled={isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colspan="20" style={{ paddingLeft: "5px" }}>
                Department Name:
              </td>
              <td colspan="80">
                <label style={{ padding: "10px" }}>{department}</label>
                {/* <Select
            style={{ width: "100%", height: '40x', borderRadius: "0px", border: "1px solid #dddd", backgroundColor: "white" }}
            placeholder="Select Department"
            value={availabledepartment}
            onChange={setAvailabledepartment}

          >
            {deaprtment_list?.map((shiftvalue, index) => (
              <Option key={index} value={shiftvalue}>
                {shiftvalue}
              </Option>
            ))}
          </Select>  */}
                {/* <Input type="text"
       name="departmentName"
       value={departmentName}
       onChange={(e) => setdepartmentName(e.target.value)}
       disabled={isEditable}
       /> */}
              </td>
            </tr>
            <tr>
              <td colspan="20" style={{ paddingLeft: "5px" }}>
                Name of the Trainer:
              </td>
              <td colspan="80">
                <Input
                  type="text"
                  name="trainerName"
                  value={trainerName}
                  onChange={(e) => settrainerName(e.target.value)}
                  disabled={isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colspan="20" style={{ paddingLeft: "5px" }}>
                Trainee Name:
              </td>
              <td colspan="80">
                <Input
                  type="text"
                  name="traineeName"
                  value={traineeName}
                  onChange={(e) => settraineeName(e.target.value)}
                  disabled={isEditable}                                          
                />
              </td>
            </tr>
            <tr>
              <td colspan="20" style={{ paddingLeft: "5px" }}>
                Trainee ID Number:
              </td>
              <td colspan="80">
                <Input
                  type="text"
                  name="traineeID"
                  value={traningid}
                  onChange={(e) => settraineeID(e.target.value)}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td colspan="20" style={{ paddingLeft: "5px" }}>
                Venue:
              </td>
              <td colspan="40">
                <Input
                  type="text"
                  name="venue"
                  value={venue}
                  onChange={(e) => setvenue(e.target.value)}
                  disabled={isEditable}
                />
              </td>
              <td colspan="20" style={{ paddingLeft: "5px" }}>
                Marks:
              </td>
              <td colspan="20">
                <Input
                  type="text"
                  name="marks"
                  value={marks}
                  onChange={(e) => setmarks(e.target.value)}
                  disabled={isEditable}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="50">
                Attach an Image for Questions:
                <Input
                  type="file"
                  name="referenceImage"
                  style={{ width: "100%", padding: "5px" }}
                  onChange={handleImageChange}
                  disabled={isEditable}
                />
              </td>
              <td colSpan="50">
                {referenceImageBase64 && (
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={`data:image/png;base64,${referenceImageBase64}`}
                      alt="Reference Preview"
                      title="Click to view the image"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "10px",
                        cursor: "pointer", // Indicate that it's clickable
                      }}
                      onClick={handleOpenModal} // Open modal on click
                    />
                  </div>
                )}
                <Modal
                  visible={isModalVisible}
                  onCancel={handleCloseModal}
                  footer={null}
                  centered
                  width="80%" // Adjust width as needed
                >
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={`data:image/png;base64,${referenceImageBase64}`}
                      alt="Full Reference Preview"
                      style={{
                        width: "100%",
                        maxWidth: "60%",
                        textAlign: "center",
                      }} // Full width inside modal
                    />
                  </div>
                </Modal>
              </td>
            </tr>
            <tr>
              <td colSpan="50">
                Attach an Image for Assessment Question:
                <Input
                  type="file"
                  name="referenceImage"
                  style={{ width: "100%", padding: "5px" }}
                  onChange={handleImageChange2}
                  disabled={isEditable}
                />
              </td>
              <td colSpan="50">
                {AssReferenceImageBase64 && (
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={`data:image/png;base64,${AssReferenceImageBase64}`}
                      alt="Reference Preview"
                      title="Click to view the image"
                      style={{
                        width: "100px",
                        height: "100px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={handleOpenModal2} // Open modal on click
                    />
                  </div>
                )}
                <Modal
                  visible={isModalVisible2}
                  onCancel={handleCloseModal2}
                  footer={null}
                  centered
                  width="80%" // Adjust width as needed
                >
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={`data:image/png;base64,${AssReferenceImageBase64}`}
                      alt="Full Reference Preview"
                      style={{
                        width: "100%",
                        maxWidth: "60%",
                        textAlign: "center",
                      }} // Full width inside modal
                    />
                  </div>
                </Modal>
              </td>
            </tr>
            <tbody>
              <tr></tr>
            </tbody>
            <div
              style={{
                textalign: "center",
                paddingLeft: "15px",
                width: "100%",
                paddingTop: "10px",
                cursor: isEditable ? "not-allowed" : "pointer",
              }}
            ></div>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table>
            <tbody>
              <tr>
                <td colspan={100}>Verified by</td>
              </tr>
              <tr>
                <td colspan={100}>
                  {selectedRow?.hodDesigneeStatus ===
                    "HOD_DESIGNEE_SUBMITTED" && (
                    <>
                      <div>{selectedRow?.hodDesigneeSign}</div>
                      <div>{hodsign}</div>

                      {getImageHOD && (
                        <>
                          <br />
                          <img
                            src={getImageHOD}
                            alt="logo"
                            className="signature"
                          />
                        </>
                      )}
                    </>
                  )}
                </td>
                <td colspan={50}>
                  {(selectedRow?.qa_mr_status === "QA_MR_APPROVED" ||
                    selectedRow?.qa_mr_status === "QA_MR_REJECTED") && (
                    <>
                      <div>{selectedRow?.qa_mr_sign}</div>
                      <div>{supersigndate}</div>

                      {getImageSUP && (
                        <>
                          <br />
                          <img
                            src={getImageSUP}
                            alt="logo"
                            className="signature"
                          />
                        </>
                      )}
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];
  return (
    <div>
      {/* <Drawer
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
            localStorage.getItem("role") == "ROLE_OPERATOR"
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
                  onClick: () => navigate("/Precot/Mapping"),
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
                  icon: <IoCreate color="#151718" />,
                  label: (
                    <b
                      style={{
                        color: "#151718",
                      }}
                    >
                      Raw Material Isuue
                    </b>
                  ),
                  onClick: () => navigate("/Precot/RawMaterialIssue"),
                },
                {
                  key: "6",
                  icon: (
                    <FaLock
                      color="#151718"
                      onClick={() => navigate("/Precot")}
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
                  onClick: () => navigate("/Precot/Mapping"),
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
                      onClick={() => navigate("/Precot")}
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
      </Drawer> */}
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="TRAINING QUESTIONNNAIRE"
        formatNo="PH-QAD01/F-009"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
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
          roleBase === "ROLE_HOD" ||
          roleBase === "HR_EXECUTIVE" ||
          roleBase === "QA_MANAGER" ||
          roleBase === "ROLE_MR"
            ? [
                <Button
                  key="save"
                  loading={saveLoading}
                  type="primary"
                  onClick={handleSave}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButton2(),
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
                </Button>,
              ]
            : [],
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
                value={Critical}
                onChange={(e) => setCritical(e.target.value)}
                rows={4}
                style={{ width: "100%" }}
              />
            </div>
          </Modal>,
        ]}
      />
      <div id="section-to-print" style={{ padding: "5px" }}>
        <br />

        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid #0000",
            padding: "5px",
          }}
        >
          <thead
            style={{ marginTop: "10px", width: "100%", marginBottom: "10px" }}
          >
            <tr>
              <td colSpan="2" rowSpan="4">
                <div style={{ textAlign: "center" }}>
                  {" "}
                  <img
                    src={logo}
                    alt="logo"
                    style={{ width: "40px", height: "20px" }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>UNIT H</div>
              </td>
              <td colSpan="4" rowSpan="4" style={{ textAlign: "center" }}>
                {" "}
                BLEACHING JOB CARD <br></br> PRD01/F-13
              </td>
              <td colSpan="3">Format No:</td>
              <td colSpan="3">PRD01/F-13</td>
            </tr>
            <tr>
              <td colSpan="3">Revision No:</td>
              <td colSpan="3">04</td>
            </tr>
            <tr>
              <td colSpan="3">Ref. SOP No:</td>
              <td colSpan="3">PRD01-D-12</td>
            </tr>
            <tr>
              <td colSpan="3">Page No:</td>
              <td colSpan="3">Page No 1 of 1</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2">BMR No</td>
              <td colSpan="4">{print && print.bmr_no}</td>
              <td colSpan="3">M/c No</td>
              <td colSpan="3">{print && print.mc_no}</td>
            </tr>
            <tr>
              <td colSpan="2">Date</td>
              <td colSpan="4">{dateprintsec}</td>
              <td colSpan="3">Batch No</td>
              <td colSpan="3">{print && print.sub_batch_no}</td>
            </tr>
            <tr>
              <td colSpan="2">date</td>
              <td colSpan="4">{print && print.date}</td>
              <td colSpan="3">Start Time</td>
              <td colSpan="3">{print && print.start_time}</td>
            </tr>
            <tr>
              <td colSpan="2">Finish</td>
              <td colSpan="4">{print && print.finish}</td>
              <td colSpan="3">End Time</td>
              <td colSpan="3">{print && print.end_time}</td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                S.No
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Process Name
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Chemicals Name
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Activity
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Standard Time in Minutes
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual Time in Minutes
              </td>
              <td
                colSpan="3"
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Observations
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                1
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Pre - Wetting
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 70
                ℃, Circulation @ 70 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                24 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="4"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.wetting}
              </td>
              <td
                colSpan="3"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {print && print.wetting_act_temp}
                <span style={{ fontSize: "11px" }}>℃</span>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="8"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                2
              </td>
              <td
                colSpan="1"
                rowspan="8"
                style={{
                  border: "1px solid",
                }}
              >
                Sourcing & Bleaching
              </td>
              <td
                colSpan="2"
                rowspan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Caustic Soda Flakes, Haipolene & Sarofom & Hydrogen peroxide
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 60
                ℃, Chemical transferring, Temperature raising to 110 ℃,
                Circulation @ 110 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="8"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                100 +/- 20
              </td>
              <td
                colSpan="2"
                rowSpan="8"
                style={{
                  border: "1px solid",
                }}
              >
                {print && print.scouring}
              </td>
              <td
                colSpan="3"
                rowspan="8"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {print && print.scouring_act_temp}
                <span style={{ fontSize: "11px" }}>℃</span>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                3
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Hot Wash 01
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 95
                ℃, Circulation @ 95 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                24 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="4"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {print && print.hotwash_one}
              </td>
              <td
                colSpan="3"
                rowspan="4"
                contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :{" "}
                {print && print.hotwash_one_act_temp}
                <span style={{ fontSize: "11px" }}>℃ </span>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

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
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                4
              </td>
              <td
                colSpan="1"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Hot Wash 02
              </td>
              <td
                colSpan="2"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Temperature raising to 90
                ℃, Circulation @ 90 +/- 5 ℃ and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                {" "}
                24 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="4"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {print && print.hotwash_two}
              </td>
              <td
                colSpan="3"
                rowspan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {print && print.hotwash_two_act_temp}
                <span style={{ fontSize: "11px" }}> ℃</span>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            {/* Nutralizing Wash */}

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                5
              </td>
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Nutralizing Wash
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Citric Acid, Sarofom, Setilon KN or bo_wiper_roller_speed 9490
                (for Crispy finish Only)
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Chemical transferring,
                Temperature raising to 70 ℃, Circulation @ 70 +/- 5 ℃ and
                Draining
              </td>
              <td
                colSpan="1"
                rowSpan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                30 +/- 6
              </td>
              <td
                colSpan="2"
                rowSpan="5"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {print && print.newtralizing}
              </td>
              <td
                colSpan="3"
                rowspan="5"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Actual temperature during circulation :
                {print && print.newtralizing_act_temp}
                <span style={{ fontSize: "11px" }}>℃</span>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            {/* PH */}
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            >
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                6
              </td>
              <td
                colSpan="1"
                rowspan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Final Cloud{" "}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                NA
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                Water Filling and level maintaining, Circulation @ Normal
                temperature, Surface Activity, pH conformation and Draining
              </td>
              <td
                colSpan="1"
                rowSpan="5"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                20 +/- 5
              </td>
              <td
                colSpan="2"
                rowSpan="5"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {print && print.newtralizing}
              </td>
              <td
                colSpan="3"
                rowspan="5"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                {/* <span style={{ textAlign: "center" }}>  {print && print.newtralizing_act_temp}</span> */}
                pH actual:
                <span style={{ textAlign: "center" }}>
                  {" "}
                  {print && print.final_process_ph_temp}{" "}
                </span>
                <div>
                  Surface Activity actual:
                  <span>{print && print.final_process_act_temp}</span>
                </div>
                {/* <span style={{ textAlign: "center" }}>  

              </span> */}
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
              }}
            ></tr>
            <tr
              style={{
                fontSize: "14px",
                padding: "4px",
                textAlign: "center",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              <td colSpan="11" style={{ textAlign: "center" }}>
                Chemical Consumption details (Batch Weight range 1250 ± 50 Kg)
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}> Chemical Name</b>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}>Standards</b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}>Actual</b>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}> Unit</b>
              </td>
            </tr>

            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Caustic soda Flakes</p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>28-42</p>
              </td>
              <td
                colSpan="1"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {print && print.caustic_soda_flakes}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Haipolene</p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>10-12</p>
              </td>
              <td
                colSpan="1"
                //  contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {print && print.haipolene}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Sarofom </p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>7.0-16.0</p>
              </td>
              <td
                colSpan="1"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {print && print.sarofom}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Hydrogen peroxide </p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>50-70</p>
              </td>
              <td
                colSpan="1"
                // contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {print && print.hydrogen_peroxide}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>liters</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <div>
                  {" "}
                  <p style={{ fontSize: "11px" }}>
                    <div>
                      Setilon KN : {print && print.customer_complaint_ref}
                    </div>
                    <div>
                      bo_wiper_roller_speed 9490 :{" "}
                      {print && print.bo_wiper_roller_speed}
                    </div>
                  </p>
                </div>
                {/* <div>     <p style={{fontSize:"11px"}}>  bo_wiper_roller_speed 9490</p>
                 
                </div> */}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>1.5-3.5</p>
              </td>
              <td
                colSpan="1"
                //contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {print && print.setilon_bo_wiper_roller_speed_actual}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <td
                colSpan="4"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>Citric acid</p>
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>6.5-9.5 </p>
              </td>
              <td
                colSpan="1"
                //contentEditable="false"
                style={{
                  border: "1px solid",
                  //   paddingLeft: "1em",
                  //   paddingRight: "1em",
                }}
              >
                {print && print.citric_acid}
              </td>
              <td
                colSpan="2"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <p style={{ fontSize: "11px" }}>kgs</p>
              </td>
            </tr>
            <tr>
              <td colSpan="11">
                <b style={{ fontSize: "11px" }}>
                  Note: Setilon KN or bo_wiper_roller_speed 9490 chemicals
                  should be added only for Crispy finish.
                </b>
              </td>
            </tr>
            <tr>
              <td colSpan="11">
                {" "}
                Remarks:
                {print && print.remarks}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Production Supervisor
              </td>
              <td colSpan="3" style={{ textAlign: "center" }}>
                HOD / Designees
              </td>
              <td colSpan="3" style={{ textAlign: "center" }}>
                QA
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <div align="center">
                  {print && print.supervisor_sign}
                  <br />
                  {supersigndate}
                </div>
              </td>
              <td colSpan="4">
                <div align="center">
                  {print && print.hod_sign}
                  <br />
                  {hodsign}
                </div>
              </td>
              <td colSpan="2">
                {" "}
                <div align="center">
                  {print && print.operator_sign}
                  <br />
                  {operator_signsignaturedate}
                </div>
              </td>
            </tr>
            {/* <tr>
          <td colSpan="5">jjj</td>
          <td colSpan="4">jjjj</td>
          <td colSpan="4">ooo</td>
          </tr> */}
          </tfoot>
        </table>

        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid black",
            width: "100%",
            marginTop: "5px",
          }}
        >
          <tbody>
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
                  textAlign: "center",
                }}
              >
                <b style={{ fontSize: "11px", textAlign: "center" }}>
                  Production Supervisor{" "}
                </b>
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
                <b style={{ fontSize: "11px", textAlign: "center" }}>
                  HOD / Designees
                </b>
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
                <b style={{ fontSize: "11px", textAlign: "center" }}>QA </b>
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
                  height: "60px",
                }}
              >
                <div align="center">
                  {print && print.supervisor_sign}
                  <br />
                  {supersigndate}
                </div>
                {/* <div style={{ fontSize: "11px" }}>Signature</div>
              <div style={{ fontSize: "11px" }}>Date </div> */}
              </td>

              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  height: "60px",
                  textAlign: "center",
                }}
              >
                <div align="center">
                  {print && print.hod_sign}
                  <br />
                  {hodsign}
                </div>
                {/* <div style={{ fontSize: "11px" }}>Signature</div>
              <div style={{ fontSize: "11px" }}>Date </div> */}
              </td>

              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  height: "60px",
                  textAlign: "center",
                }}
              >
                <div align="center">
                  {print && print.operator_sign}
                  <br />
                  {operator_signsignaturedate}
                </div>

                {/* <div style={{ fontSize: "11px" }}>Signature</div>
              <div style={{ fontSize: "11px" }}>Date </div> */}
              </td>
            </tr>
          </tbody>
        </table>

        <table style={{ marginTop: 20 }}>
          <tr>
            <th colSpan="5">Particular</th>
            <th colSpan="5" style={{ textAlign: "center" }}>
              <centre>Prepared by</centre>
            </th>
            <th colSpan="5" style={{ textAlign: "center" }}>
              <centre>Reviewed by</centre>
            </th>
            <th colSpan="5" style={{ textAlign: "center" }}>
              <centre>Approved by</centre>
            </th>
          </tr>
          <tr>
            <th colSpan="5">Name</th>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <th colSpan="5">Signature & Date</th>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
            <td colSpan="5"></td>
          </tr>
        </table>
      </div>
      ,
      <Tabs
        defaultActiveKesy="1"
        items={items}
        onChange={onChange}
        style={{
          display: "flex",
          width: "90%",
          position: "relative",
          left: "2%",
        }}
      />
      ,
    </div>
  );
};

export default QA_F09;
