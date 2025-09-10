import { Button, Col, Input, Row, Tabs, Select, message, Tooltip } from "antd";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Radio, Form, DatePicker } from "antd";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import { useNavigate, useLocation } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";
import { BiFontSize, BiLock } from "react-icons/bi";
import { IoChevronBackSharp, IoCreate, IoSave } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { GrDocumentStore } from "react-icons/gr";
import moment from "moment";
import gif from "../Assests/gif.gif";
import { Table, Modal, Drawer, Menu, Avatar } from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { GoArrowLeft } from "react-icons/go";
import { LoadingOutlined, PrinterOutlined } from "@ant-design/icons";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const Spunlace_f02 = () => {
  const [values, setValues] = useState("");
  const [getImageOP, setGetImageOP] = useState("");
  const [getImageSUP, setGetImageSUP] = useState("");
  const [getImageHOD, setGetImageHOD] = useState("");
  const [bo_striper_roller_speed, setbo_striper_roller_speed] = useState("");
  const [bo_spiked_lattice_speed, setbo_spiked_lattice_speed] = useState("");
  const [bo_wiper_roller_speed, setbo_wiper_roller_speed] = useState("");
  const [bo_transport_fan_speed, setbo_transport_fan_speed] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [scale_setting_1, setscale_setting_1] = useState("");
  const [scale_setting_2, setscale_setting_2] = useState("");
  const [total_weight_1, settotal_weight_1] = useState("");
  const [total_weight_2, settotal_weight_2] = useState("");
  const [wbo_1_1, setwbo_1_1] = useState("");
  const [wbo_1_2, setwbo_1_2] = useState("");
  const [wbo_2_1, setwbo_2_1] = useState("");
  const [wbo_2_2, setwbo_2_2] = useState("");
  const [reiter_chute_feed_roller_speed, setreiter_chute_feed_roller_speed] =
    useState("");
  const [
    reiter_chute_feed_roller_speed_2,
    setreiter_chute_feed_roller_speed_2,
  ] = useState("");
  const [feed_roller_speed_rc, setfeed_roller_speed_rc] = useState("");
  const [feed_roller_speed_rc_2, setfeed_roller_speed_rc_2] = useState("");
  const [licker_in_speed, setlicker_in_speed] = useState("");
  const [licker_in_speed_2, setlicker_in_speed_2] = useState("");
  const [flat_speed, setflat_speed] = useState("");
  const [flat_speed_2, setflat_speed_2] = useState("");
  const [Condenser_roller_speed_R1, setCondenser_roller_speed_R1] =
    useState("");
  const [Condenser_roller_speed_R2, setCondenser_roller_speed_R2] =
    useState("");
  const [id, setid] = useState("");
  const [PW_Observation, setPW_Observation] = useState("");
  const { Option } = Select;
  const [wbo_stripper_roller_speed_1, setwbo_stripper_roller_speed_1] =
    useState("");
  const [wbo_stripper_roller_speed_2, setwbo_stripper_roller_speed_2] =
    useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [wbo_spiked_lattice_speed_1, setwbo_spiked_lattice_speed_1] =
    useState("");
  const [wbo_spiked_lattice_speed_2, setwbo_spiked_lattice_speed_2] =
    useState("");
  const [wbo_wiper_roller_speed_1, setwbo_wiper_roller_speed_1] = useState("");
  const [wbo_wiper_roller_speed_2, setwbo_wiper_roller_speed_2] = useState("");
  const [cmo_feed_roller_speed, setcmo_feed_roller_speed] = useState("");
  const [transport_fan_speed, settransport_fan_speed] = useState("");
  const [feed_roller_speed_for, setfeed_roller_speed_for] = useState("");
  const [transport_fan_speed_for, settransport_fan_speed_for] = useState("");
  const [feed_roller_speed_foa, setfeed_roller_speed_foa] = useState("");
  const [transport_fan_speed_foa, settransport_fan_speed_foa] = useState("");
  const [feed_roller_speed_por, setfeed_roller_speed_por] = useState("");
  const [feed_roller_speed_por_2, setfeed_roller_speed_por_2] = useState("");
  const [transport_fan_speed_por, settransport_fan_speed_por] = useState("");
  const [transport_fan_speed_por2, settransport_fan_speed_por2] = useState("");
  const [feed_roller_speed_foa_2, setfeed_roller_speed_foa_2] = useState("");
  const [transport_fan_speed_foa_2, settransport_fan_speed_foa_2] =
    useState("");
  const [feed_roller_speed_for_ALC_1, setfeed_roller_speed_for_ALC_1] =
    useState("");
  const [feed_roller_speed_poa, setfeed_roller_speed_poa] = useState("");
  const [feed_roller_speed_poa_2, setfeed_roller_speed_poa_2] = useState("");
  const [transport_fan_speed_poa, settransport_fan_speed_poa] = useState("");
  const [transport_fan_speed_poa_2, settransport_fan_speed_poa_2] =
    useState("");
  const [condenser_roller_speed, setcondenser_roller_speed] = useState("");
  const [condenser_roller_speed_2, setcondenser_roller_speed_2] = useState("");
  const [reiter_card_1_delivery_speed, setreiter_card_1_delivery_speed] =
    useState("");
  const [reiter_card_1_delivery_speed_2, setreiter_card_1_delivery_speed_2] =
    useState("");
  const [alc_k1_roller_speed, setalc_k1_roller_speed] = useState("");
  const [alc_k1_roller_speed_2, setalc_k1_roller_speed_2] = useState("");
  const [alc_k2_roller_speed, setalc_k2_roller_speed] = useState("");
  const [alc_k2_roller_speed_2, setalc_k2_roller_speed_2] = useState("");

  const [alc_k3_roller_speed, setalc_k3_roller_speed] = useState("");
  const [alc_k3_roller_speed_2, setalc_k3_roller_speed_2] = useState("");

  const [collecting_belt_speed, setcollecting_belt_speed] = useState("");
  const [collecting_belt_speed_2, setcollecting_belt_speed_2] = useState("");
  const [SB_draining, setSB_draining] = useState("");
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
  const [alc_top_chute_pressure, setalc_top_chute_pressure] = useState("");
  const [alc_top_chute_pressure_2, setalc_top_chute_pressure_2] = useState("");
  const [alc_bottom_chute_pressure, setalc_bottom_chute_pressure] =
    useState("");
  const [alc_bottom_chute_pressure_2, setalc_bottom_chute_pressure_2] =
    useState("");
  const [alc_feed_roller_speed, setalc_feed_roller_speed] = useState("");
  const [alc_feed_roller_speed_2, setalc_feed_roller_speed_2] = useState("");
  const [turbo_roller_speed, setturbo_roller_speed] = useState("");
  const [turbo_roller_speed_2, setturbo_roller_speed_2] = useState("");
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
  // const [shift, setShift] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finish, setFinish] = useState("");
  const [batchno, setbatchno] = useState([]);
  const [endTime, setEndTime] = useState("");
  const [finishlov, setfinishLOV] = useState([]);
  const [finisharraylist, setfinisharray] = useState("Select Finish");
  const [availableBMRno, setAvailableBMRno] = useState([]);
  const [availableBMRnoLov, setAvailableBMRnoLov] = useState("Select BMRNo");
  const [remarks, setremarks] = useState("");
  const [shiftInchargeFlag, setshiftInchargeFlag] = useState(false);
  const [hodIncharge, sethodIncharge] = useState(false);
  const [supervisor, setsupervisor] = useState(false);
  const [availableshift, setAvailableShifts] = useState([]);
  const [availableshiftlov, setAvailableShiftslov] = useState("Select Shift");
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
  const [dateprint, setprintdate] = useState("");
  const numbers = [1, 2, 3];
  const [selectedRow, setSelectedRow] = useState(null);
  const finisharray = ["Crispy", "Soft"];
  const [saveLoading, setSaveLoading] = useState(false);
  const [dateprintsec, setisdateprintsec] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const [customername, setcustomername] = useState("");
  const [Mixing, setMixing] = useState("");
  const [Material, setMaterial] = useState("");
  const [STD_GSM, setSTD_GSM] = useState("");
  const [MaterialCode, setMaterialCode] = useState("");
  const [Pattern, setpattern] = useState("");
  const [Moisture, setMoisture] = useState("");
  const [Thickness, setThickness] = useState("");
  const initial = useRef(false);
  const roleBase = localStorage.getItem("role");
  const onChange = (key) => {
    // console.log(key);
  };
  const [saveBtnStatus, setSaveBtnStatus] = useState(true);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const location = useLocation();

  const { state } = location;

  const { date, shift, order_no } = state || {};
  const datefomrat = moment(date).format("DD/MM/YYYY");
  // console.log("dateformat", datefomrat, date.shift, order_no);
  const McNo = [1, 2, 3, 4, 5];
  // Function to handle submitting
  const isPrintEnabled =
    selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
    selectedRow?.hod_status === "HOD_APPROVED" &&
    selectedRow?.operator_status === "OPERATOR_APPROVED";
  const handleChange = (event) => {
    settotal_weight_1(event.target.value);
    const value = event.target.value;
    if (value === "OK") {
      setbo_wiper_roller_speed("NA");
    } else {
      setbo_wiper_roller_speed("OK");
    }
  };
  const handleKeyDown = (e) => {
    // Prevent entering 'e', '.', '-', '+', etc.
    if (
      e.key === "e" ||
      e.key === "E" ||
      e.key === "." ||
      e.key === "-" ||
      e.key === "+"
    ) {
      e.preventDefault();
    }
  };
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
    } else if (roleBase == "ROLE_SUPERVISOR") {
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
        selectedRow?.supervisor_status == "SUPERVISOR_REJECTED" &&
        selectedRow?.hod_status == "WAITING_FOR_APPROVAL"
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
      if (selectedRow?.operator_status == "OPERATOR_APPROVED") {
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
        (selectedRow &&
          selectedRow?.operator_status === "OPERATOR_APPROVED" &&
          (selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" ||
            selectedRow?.supervisor_status === "WAITING_FOR_APPROVAL") &&
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
        "HOD_APPROVED"
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
  const isEditable = canEdit();
  const fetchDatabatchByOrderdetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/spulance/orderDetails?order=${order_no}`,
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
      // setwidth(response.data[0].width);

      setMaterialCode(response.data[0].material);
      setpattern(response.data[0].patternDescription);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDataOrderNodetails_f2 = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/spulance/getdetailsbyParamF002?date=${date}&shift=${shift}&order_no=${order_no}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // console.log("resvalue of data ", res.data.bo_spiked_lattice_speed);

          setbo_striper_roller_speed(res.data.bo_spiked_lattice_speed);

          if (res.data.length === 0 || res.data == undefined) {
            // console.log('The array is empty');
          } else {
            // console.log('The array is not empty', res.data.operator_submitted_on);
            if (res.data.hod_submit_on) {
              const dateformat_hod = moment(res.data.hod_submit_on).format(
                "DD/MM/YYYY HH:mm"
              );
              sethodsigndate(dateformat_hod);
            } else {
              sethodsigndate("");
            }
            if (res.data.supervisor_submit_on) {
              const dateformat_supervisor = moment(
                res.data.supervisor_submit_on
              ).format("DD/MM/YYYY HH:mm");
              setsupersigndate(dateformat_supervisor);
            } else {
              setsupersigndate("");
            }
            if (res.data.operator_submitted_on) {
              const dateformat_op = moment(
                res.data.operator_submitted_on
              ).format("DD/MM/YYYY HH:mm");
              setoperator_signsignaturedate(dateformat_op);
            } else {
              setoperator_signsignaturedate("");
            }
          }

          if (
            res.data &&
            (res.data.length > 0 || res.data.length == undefined)
          ) {
            const select = res.data;
            // console.log("value of payload", res.data.moisture);

            setSelectedRow(res.data);
            setid(res.data.opening_id);
            setbo_striper_roller_speed(res.data.bo_striper_roller_speed);
            setbo_spiked_lattice_speed(res.data.bo_spiked_lattice_speed);
            setbo_wiper_roller_speed(res.data.bo_wiper_roller_speed);
            setbo_transport_fan_speed(res.data.bo_transport_fan_speed);
            setscale_setting_1(res.data.scale_setting_1);
            setscale_setting_2(res.data.scale_setting_2);
            settotal_weight_1(res.data.total_weight_1);
            settotal_weight_2(res.data.total_weight_2);
            setwbo_1_1(res.data.wbo_1_1);
            setwbo_1_2(res.data.wbo_1_2);
            setwbo_2_1(res.data.wbo_2_1);
            setwbo_2_2(res.data.wbo_2_2);
            setwbo_stripper_roller_speed_1(
              res.data.wbo_stripper_roller_speed_1
            );
            setwbo_stripper_roller_speed_2(
              res.data.wbo_stripper_roller_speed_2
            );
            setwbo_spiked_lattice_speed_1(res.data.wbo_spiked_lattice_speed_1);
            setwbo_spiked_lattice_speed_2(res.data.wbo_spiked_lattice_speed_2);
            setwbo_wiper_roller_speed_1(res.data.wbo_wiper_roller_speed_1);
            setwbo_wiper_roller_speed_2(res.data.wbo_wiper_roller_speed_2);
            setcmo_feed_roller_speed(res.data.cmo_feed_roller_speed);
            settransport_fan_speed(res.data.transport_fan_speed);
            setfeed_roller_speed_for(res.data.feed_roller_speed_for);
            settransport_fan_speed_for(res.data.transport_fan_speed_for);
            setfeed_roller_speed_foa(res.data.feed_roller_speed_foa);
            setfeed_roller_speed_foa_2(res.data.feed_roller_speed_foa_2);
            settransport_fan_speed_foa(res.data.transport_fan_speed_foa);
            settransport_fan_speed_foa_2(res.data.transport_fan_speed_foa_2);
            setfeed_roller_speed_por(res.data.feed_roller_speed_por);
            setfeed_roller_speed_por_2(res.data.feed_roller_speed_por_2);
            settransport_fan_speed_por(res.data.transport_fan_speed_por);
            settransport_fan_speed_por2(res.data.transport_fan_speed_por_2);
            setfeed_roller_speed_poa(res.data.feed_roller_speed_poa);
            setfeed_roller_speed_poa_2(res.data.feed_roller_speed_poa_2);
            settransport_fan_speed_poa(res.data.transport_fan_speed_poa);
            settransport_fan_speed_poa_2(res.data.transport_fan_speed_poa_2);
            setreiter_chute_feed_roller_speed(
              res.data.reiter_chute_feed_roller_speed
            );
            setreiter_chute_feed_roller_speed_2(
              res.data.reiter_chute_feed_roller_speed_2
            );
            setfeed_roller_speed_rc(res.data.feed_roller_speed_rc);
            setfeed_roller_speed_rc_2(res.data.feed_roller_speed_rc_2);
            setlicker_in_speed(res.data.licker_in_speed);
            setlicker_in_speed_2(res.data.licker_in_speed_2);
            setflat_speed(res.data.flat_speed);
            setflat_speed_2(res.data.flat_speed_2);
            setcondenser_roller_speed(res.data.condenser_roller_speed);
            setcondenser_roller_speed_2(res.data.condenser_roller_speed_2);
            setreiter_card_1_delivery_speed(
              res.data.reiter_card_1_delivery_speed
            );
            setreiter_card_1_delivery_speed_2(
              res.data.reiter_card_1_delivery_speed_2
            );
            setalc_top_chute_pressure(res.data.alc_top_chute_pressure);
            setalc_top_chute_pressure_2(res.data.alc_top_chute_pressure_2);
            setalc_bottom_chute_pressure(res.data.alc_bottom_chute_pressure);
            setalc_bottom_chute_pressure_2(
              res.data.alc_bottom_chute_pressure_2
            );
            setalc_feed_roller_speed(res.data.alc_feed_roller_speed);
            setalc_feed_roller_speed_2(res.data.alc_feed_roller_speed_2);
            setalc_k1_roller_speed(res.data.alc_k1_roller_speed);
            setalc_k1_roller_speed_2(res.data.alc_k1_roller_speed_2);
            setalc_k2_roller_speed(res.data.alc_k2_roller_speed);
            setalc_k2_roller_speed_2(res.data.alc_k2_roller_speed_2);
            setalc_k3_roller_speed(res.data.alc_k3_roller_speed);
            setalc_k3_roller_speed_2(res.data.alc_k3_roller_speed_2);
            setturbo_roller_speed(res.data.turbo_roller_speed);
            setturbo_roller_speed_2(res.data.turbo_roller_speed_2);
            setpress_roller_speed(res.data.press_roller_speed);
            setpress_roller_speedd_2(res.data.press_roller_speed_2);
            setmesh_belt_speed(res.data.mesh_belt_speed);
            setmesh_belt_speed_2(res.data.mesh_belt_speed_2);
            setcollecting_belt_speed(res.data.collecting_belt_speed);
            setcollecting_belt_speed_2(res.data.collecting_belt_speed_2);

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
            setoperator_submit_on(res.data.operator_submitted_on);
            setoperator_submit_by(res.data.operator_submitted_by);
            setoperator_submit_id(res.data.operator_submitted_id);
            setoperator_sign(res.data.operator_sign);

            if (roleBase === "ROLE_SUPERVISOR") {
              if (
                res.data?.supervisor_status === "SUPERVISOR_REJECTED" ||
                res.data?.hod_status === "HOD_REJECTED"
              ) {
                message.warning(
                  "Operator Not Yet Approved or Previous Stage Rejected"
                );
                setTimeout(() => {
                  navigate("/Precot/Spunlace/F-02/Summary");
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
                message.warning(
                  "Operator Not Yet Approved or Previous Stage Rejected"
                );
                setTimeout(() => {
                  navigate("/Precot/Spunlace/F-02/Summary");
                }, 1500);
              }
            }

            // console.log("value of res ", res.data.length);
            setemptyarraycheck(res.data.length);

            //opimage
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.operator_sign}`,
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

            //---------------------------------------
            //supimage
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.supervisor_sign}`,
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

            //---------------------------------------
            //opimage
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${res.data?.hod_sign}`,
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

            //---------------------------------------
          } else {
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

  const canDisplayPrint = () => {
    // console.log("ss", selectedRow?.supervisor_status);
    if (roleBase == "ROLE_SUPERVISOR") {
      if (
        selectedRow?.supervisor_status == "SUPERVISOR_APPROVED" &&
        selectedRow?.operator_status == "OPERATOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "block";
      }
      return "none";
    } else if (roleBase == "ROLE_OPERATOR") {
      if (
        selectedRow?.supervisor_status == "OPERATOR_APPROVED" &&
        selectedRow?.operator_status == "OPERATOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "block";
      }
      return "none";
    } else if (roleBase == "ROLE_HOD" || roleBase == "ROLE_DESIGNEE") {
      if (
        selectedRow?.supervisor_status == "HOD_APPROVED" &&
        selectedRow?.operator_status == "OPERATOR_APPROVED" &&
        selectedRow?.hod_status == "HOD_APPROVED"
      ) {
        return "block";
      }
      return "none";
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
  const handleChange_bo_wiper_roller_speed = (event) => {
    setbo_wiper_roller_speed(event.target.value);
  };
  const handleBlur_range_1300_1500_licker_in_speed = () => {
    if (licker_in_speed < 1300 || licker_in_speed > 1500) {
      message.error(
        "Please enter a number between 1300 and 1500 for Licker in Speed R1"
      );
    }
  };
  const handleBlur_range_015_20_flat_speedR1 = () => {
    if (flat_speed < 0.15 || flat_speed > 2.0) {
      message.error(
        "Please enter a number between  0.15 and 2.0  for  Flat Speed  R1"
      );
    }
  };
  const handleBlur_condenser_roller_speed = () => {
    if (condenser_roller_speed < 1 || condenser_roller_speed > 2) {
      message.error(
        "Please enter a number between 01 and 03  for  Condenser Roller Speed"
      );
    }
  };
  const handleBlur_condenser_roller_speed_2 = () => {
    if (condenser_roller_speed_2 < 1 || condenser_roller_speed_2 > 2) {
      message.error(
        "Please enter a number between 01 and 03  for  Condenser Roller Speed 2"
      );
    }
  };
  const handleBlur_range_60_100_alc_bottom_chute_pressure = () => {
    if (alc_bottom_chute_pressure < 50 || alc_bottom_chute_pressure > 150) {
      message.error(
        "Please enter a number between  50 and 150  for ALC - Bottom chute pressure AC1"
      );
    }
  };
  const handleBlur_range_60_100_alc_bottom_chute_pressure_2 = () => {
    if (alc_bottom_chute_pressure_2 < 50 || alc_bottom_chute_pressure_2 > 150) {
      message.error(
        "Please enter a number between  50 and 150  for   ALC - Bottom chute pressure AC2"
      );
    }
  };

  const handleBlur_range_06_15_reiter_card_1_delivery_speed = () => {
    if (
      reiter_card_1_delivery_speed < 0.6 ||
      reiter_card_1_delivery_speed > 1.5
    ) {
      message.error(
        "Please enter a number between  0.6 and 1.5  for  Reiter card 1 delivery speed"
      );
    }
  };
  const handleBlur_range_450_600_alc_top_chute_pressure = () => {
    if (alc_top_chute_pressure < 300 || alc_top_chute_pressure > 1000) {
      message.error(
        "Please enter a number between  300 and 1000 for  AlC - Top chute pressure ACL-1"
      );
    }
  };
  const handleBlur_range_450_600_alc_top_chute_pressure_2 = () => {
    if (alc_top_chute_pressure_2 < 450 || alc_top_chute_pressure_2 > 600) {
      message.error(
        "Please enter a number between  300 and 1000 for  AlC - Top chute pressure ACL-2"
      );
    }
  };
  const handleBlur_range_06_15_reiter_card_1_delivery_speed_2 = () => {
    if (
      reiter_card_1_delivery_speed_2 < 0.6 ||
      reiter_card_1_delivery_speed_2 > 1.5
    ) {
      message.error(
        "Please enter a number between  0.6 and 1.5  for  Reiter card 2 delivery speed"
      );
    }
  };
  const handleBlur_range_015_20_flat_speedR2 = () => {
    if (flat_speed_2 < 0.15 || flat_speed_2 > 2.0) {
      message.error(
        "Please enter a number between 0.15 and 2.0 for Flat Speed R1"
      );
    }
  };
  const handleInputlicker_in_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setlicker_in_speed(inputValue);
    // }
  };
  const handleBlur_range_1300_1500_licker_in_speed_2 = () => {
    if (licker_in_speed_2 < 950 || licker_in_speed_2 > 1150) {
      message.error(
        "Please enter a number between 950 and 1150 for Licker in Speed R2"
      );
    }
  };
  const handleInputlicker_in_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setlicker_in_speed_2(inputValue);
    // }
  };

  const handleSubmit = async () => {
    try {
      spunlace_02_submit();

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

  const updateButtonStates = () => {
    // Default to disabled
    setSaveBtnStatus(true);
    setSubmitBtnStatus(true);

    if (
      roleBase === "ROLE_SUPERVISOR" ||
      roleBase === "ROLE_HOD" ||
      roleBase === "ROLE_OPERATOR"
    ) {
      if (
        selectedRow?.supervisor_status === "SAVED" ||
        selectedRow?.hod_status === "SAVED" ||
        selectedRow?.operator_status === "SAVED"
      ) {
        setSaveBtnStatus(false);
        setSubmitBtnStatus(false);
      } else if (
        selectedRow?.supervisor_status === "SUBMITTED" ||
        selectedRow?.hod_status === "SUBMITTED" ||
        selectedRow?.operator_status === "SUBMITTED"
      ) {
        setSaveBtnStatus(true);
        setSubmitBtnStatus(true);
      }
    }
  };

  const handleBlur_range50_100 = () => {
    // const numericValue = Number(value);
    if (bo_striper_roller_speed < 50 || bo_striper_roller_speed > 100) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Range Should be between 50 to 100 for BO- Striper roller speed"
      );
    }
  };
  const handleBlur_range950_1150feed_roller_speed_rc = () => {
    if (feed_roller_speed_rc < 950 || feed_roller_speed_rc > 1150) {
      message.error(
        "Please enter a number between 950 and 1150 for feed_roller_speed_rc R1  "
      );
    }
  };
  const handleInputfeed_roller_speed_rc = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 4) {
    setfeed_roller_speed_rc(inputValue);
    // }
  };
  const handleBlur_range950_1150feed_roller_speed_rc_2 = () => {
    if (feed_roller_speed_rc_2 < 950 || feed_roller_speed_rc_2 > 1150) {
      message.error(
        "Please enter a number between 950 and 1150 for Feed roller speed R2 "
      );
    }
  };
  const handleInputfeed_roller_speed_rc_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 4) {
    setfeed_roller_speed_rc_2(inputValue);
    // }
  };
  const handleBlur_range1300_1500Licker_in_speedR1 = () => {
    if (feed_roller_speed_rc_2 < 950 || feed_roller_speed_rc_2 > 1150) {
      message.error(
        "Please enter a number between 950 and 1150 for Feed roller speed R2 "
      );
    }
  };
  const handleBlur_range1300_1500Licker_in_speedR2 = () => {
    if (licker_in_speed_2 < 1300 || licker_in_speed_2 > 1500) {
      message.error(
        "Please enter a number between 1300 and 1500 for Licker in speed R2 "
      );
    }
  };
  const handleInput_Licker_in_speedR1 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 4) {
    setlicker_in_speed(inputValue);
    // }
  };
  const handleInput_Licker_in_speedR2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 4) {
    setlicker_in_speed_2(inputValue);
    // }
  };
  const handleInput_Flat_speedR1 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (
    // /^\d*\.?\d*$/.test(inputValue) &&
    // inputValue.replace(".", "").length <= 3
    // ) {
    setflat_speed(inputValue);
    // }
  };
  const handleInput_Flat_speedR2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (
    // /^\d*\.?\d*$/.test(inputValue) &&
    // inputValue.replace(".", "").length <= 3
    // ) {
    setflat_speed_2(inputValue);
    // }
  };
  const handleInput_condenser_roller_speed = (e) => {
    const inputValue = e.target.value;
    // Limit to two digits
    // if (inputValue.length <= 2) {
    setcondenser_roller_speed(inputValue);
    // }
  };
  const handleInput_condenser_roller_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (
    // /^\d*\.?\d*$/.test(inputValue) &&
    // inputValue.replace(".", "").length <= 2
    // ) {
    setcondenser_roller_speed_2(inputValue);
    // }
  };
  const handleInput_reiter_card_1_delivery_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (
    // /^\d*\.?\d*$/.test(inputValue) &&
    // inputValue.replace(".", "").length <= 2
    // ) {
    setreiter_card_1_delivery_speed(inputValue);
    // }
  };
  const handleInput_alc_bottom_chute_pressure = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setalc_bottom_chute_pressure(inputValue);
    // }
  };
  const handleInput_alc_bottom_chute_pressure_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setalc_bottom_chute_pressure_2(inputValue);
    // }
  };

  const handleInput_reiter_card_1_delivery_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (
    // /^\d*\.?\d*$/.test(inputValue) &&
    // inputValue.replace(".", "").length <= 2
    // ) {
    setreiter_card_1_delivery_speed_2(inputValue);
    // }
  };
  const handleInput_alc_top_chute_pressure = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setalc_top_chute_pressure(inputValue);
    // }
  };
  const handleInput_alc_top_chute_pressure_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setalc_top_chute_pressure_2(inputValue);
    // }
  };
  const handleBlur_range50_100Spiked = () => {
    if (bo_spiked_lattice_speed < 50 || bo_spiked_lattice_speed > 100) {
      message.error(
        "Range Should be between 50 to 100 for BO- SPIKED lattice speed"
      );
    }
  };
  const handleBlur_range50_100bo_wiper_roller_speed = () => {
    if (bo_wiper_roller_speed < 50 || bo_wiper_roller_speed > 100) {
      message.error(
        "Please enter a number between 50 and 100 for BO-Wiper roller speed "
      );
    }
  };
  const handleBlur_range950_1150Chute_feed_Roller_speedR1 = () => {
    if (
      reiter_chute_feed_roller_speed < 950 ||
      reiter_chute_feed_roller_speed > 1150
    ) {
      message.error(
        "Please enter a number between 950 and 1150 for Reiter Chute feed Roller speed R1  "
      );
    }
  };
  const handleInputChute_feed_Roller_speedR1 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 4) {
    setreiter_chute_feed_roller_speed(inputValue);
    // }
  };
  const handleBlur_range950_1150Chute_feed_Roller_speedR2 = () => {
    if (
      reiter_chute_feed_roller_speed_2 < 950 ||
      reiter_chute_feed_roller_speed_2 > 1150
    ) {
      message.error(
        "Please enter a number between 950 and 1150 for Reiter Chute feed Roller speed R1  "
      );
    }
  };
  const handleInputChute_feed_Roller_speedR2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 4) {
    setreiter_chute_feed_roller_speed_2(inputValue);
    // }
  };

  const handleBlur_range65_100bo_transport_fan_speed = () => {
    if (bo_transport_fan_speed < 60 || bo_transport_fan_speed > 100) {
      message.error(
        "Please enter a number between 60 and 100 for BO Transport FAN Speed"
      );
    }
  };
  const handleBlur_range2000_3000wbo_1_1 = () => {
    if (wbo_1_1 > 4999) {
      message.error(
        "Please enter a number between 0 and 4999 for Weight of Weight 1"
      );
    }
  };
  const handleBlur_range2000_3000wbo_1_2 = () => {
    if (wbo_1_2 > 4999) {
      message.error(
        "Please enter a number between 0 and 4999 for Weight of Weight 1"
      );
    }
  };

  const handleBlur_range1200_2200WBO2 = () => {
    if (wbo_2_1 < 1200 || wbo_2_1 > 2200) {
      message.error(
        "Please enter a number between 1200 and 2200 for WBO-2 of WBO-1"
      );
    }
  };
  const handleBlur_range1200_2200WBO23 = () => {
    if (wbo_2_2 < 1200 || wbo_2_2 > 2200) {
      message.error(
        "Please enter a number between 1200 and 2200 for WBO-2 of WBO-2 "
      );
    }
  };
  const handle_blur_wbo_stripper = () => {
    if (wbo_stripper_roller_speed_1 < 50 || wbo_stripper_roller_speed_1 > 100) {
      message.error(
        "Please enter a number between 50 and 100 for WBO - Stripper roller speed of WBO-1"
      );
    }
  };

  const handle_blur_wbo_spiked = () => {
    if (wbo_spiked_lattice_speed_1 < 50 || wbo_spiked_lattice_speed_1 > 100) {
      message.error(
        "Please enter a number between 50 and 100 for WBO - SPIKED roller speed of WBO-1"
      );
    }
  };
  const handle_blur_wbo_wiper = () => {
    if (wbo_wiper_roller_speed_1 < 50 || wbo_wiper_roller_speed_1 > 100) {
      message.error(
        "Please enter a number between 50 and 100 for WBO - Wiper roller speed of WBO1"
      );
    }
  };
  const handle_blur_cmo_feed_roller_speed = () => {
    if (cmo_feed_roller_speed < 0 || cmo_feed_roller_speed > 100) {
      message.error("Please enter a number 0 to 100 for CMO Feed roller speed");
    }
  };
  const handle_blur_feed_roller_speed_for = () => {
    if (feed_roller_speed_for < 50 || feed_roller_speed_for > 100) {
      message.error(
        "Please enter a number between 50 and 100 for Fine Opener Reiter -Feed roller speed"
      );
    }
  };
  const handle_blur_transport_fan_speed_for = () => {
    if (transport_fan_speed_for < 60 || transport_fan_speed_for > 100) {
      message.error(
        "Please enter a number between 60 and 100 for Fine Opener Reiter -Transport Fan speed"
      );
    }
  };
  const handle_blur_feed_roller_speed_foa = () => {
    if (feed_roller_speed_foa < 50 || feed_roller_speed_foa > 100) {
      message.error(
        "Please enter a number between 50 and 100 for Fine Opener Reiter -Fine Opener ALC1"
      );
    }
  };
  const handle_blur_transport_fan_speed_foa = () => {
    if (transport_fan_speed_foa < 50 || transport_fan_speed_foa > 100) {
      message.error(
        "Please enter a number between 50 and 100 for Fine Opener ALC - Transport Fan speed ALC1"
      );
    }
  };
  const handle_blur_feed_roller_speed_por = () => {
    if (feed_roller_speed_por < 0 || feed_roller_speed_por > 30) {
      message.error(
        "Please enter a number between 0 and 30   for Pre-Opener -Reiter - Feed roller speed R-1"
      );
    }
  };
  const handle_blur_feed_roller_speed_for__PO_ALC_1 = () => {
    if (feed_roller_speed_poa < 0 || feed_roller_speed_poa > 30) {
      message.error(
        "Please enter a number between 0 and 30   for Pre-Opener -ALC - Transport Fan speed ALC-1"
      );
    }
  };
  const handle_blur_transport_fan_speed_poa = () => {
    if (transport_fan_speed_poa < 60 || transport_fan_speed_poa > 100) {
      message.error(
        "Please enter a number between 60 and 100 for Pre-Opener -ALC - Feed roller speed ALC-1"
      );
    }
  };
  const handle_blur_transport_fan_speed_poa_2 = () => {
    if (transport_fan_speed_poa_2 < 60 || transport_fan_speed_poa_2 > 100) {
      message.error(
        "Please enter a number between 60 and 100 for Pre-Opener -ALC - Transport Fan speed ALC-2"
      );
    }
  };
  const handle_blur_feed_roller_speed_for__PO_ALC_2 = () => {
    if (feed_roller_speed_poa_2 < 1.5 || feed_roller_speed_poa_2 > 30) {
      message.error(
        "Please enter a number between 1.5 and 30 for Pre-Opener -ALC - Feed roller speed ALC-2"
      );
    }
  };
  const handle_blur_feed_roller_speed_por_2 = () => {
    if (feed_roller_speed_por_2 < 0 || feed_roller_speed_por_2 > 30) {
      message.error(
        "Please enter a number between 0 and 30   for Pre-Opener -Reiter - Feed roller speed R-12"
      );
    }
  };
  const handle_blur_transport_fan_speed_foa_2 = () => {
    if (transport_fan_speed_foa_2 < 50 || transport_fan_speed_foa_2 > 100) {
      message.error(
        "Please enter a number between 80 and 100 for Fine Opener ALC -Transport Fan speed ALC2"
      );
    }
  };
  const handle_blur_transport_fan_speed_por = () => {
    if (transport_fan_speed_por < 85 || transport_fan_speed_por > 100) {
      message.error(
        "Please enter a number between 85 and 100 for Pre-Opener -Reiter -Transport Fan speed R1-2"
      );
    }
  };
  const handle_blur_alc_feed_roller_speed = () => {
    if (alc_feed_roller_speed < 0 || alc_feed_roller_speed > 143) {
      message.error(
        "Please enter a number between 0 and 143 for ALC - Feed Roller speed ALC1"
      );
    }
  };
  const handle_blur_alc_k1_roller_speed = () => {
    if (alc_k1_roller_speed < 0 || alc_k1_roller_speed > 143) {
      message.error(
        "Please enter a number between 0 and 143 for ALC - K1 Roller speed ALC-1"
      );
    }
  };
  const handle_blur_alc_k2_roller_speed = () => {
    if (alc_k2_roller_speed < 0 || alc_k2_roller_speed > 360) {
      message.error(
        "Please enter a number between 0 and 360 for ALC - K2 Roller speed ALC-1"
      );
    }
  };

  const handle_blur_alc_k3_roller_speed = () => {
    if (alc_k3_roller_speed < 0 || alc_k3_roller_speed > 1290) {
      message.error(
        "Please enter a number between 0 and 1290 for ALC - K3 Roller speed ALC-1"
      );
    }
  };

  const handle_blur_turbo_roller_speed = () => {
    if (turbo_roller_speed < 1000 || turbo_roller_speed > 4400) {
      message.error(
        "Please enter a number between 1000 and 4400 for ALC - Turbo Roller speed ALC-1"
      );
    }
  };
  const handle_blur_press_roller_speed = () => {
    if (press_roller_speed < 35 || press_roller_speed > 78.7) {
      message.error(
        "Please enter a number between 35 and 78.6 for ALC - Press Roller Speed ALC-1"
      );
    }
  };
  const handle_blur_mesh_belt_speed = () => {
    if (mesh_belt_speed < 0 || mesh_belt_speed > 100) {
      message.error(
        "Please enter a number between 0 and 100 for ALC - Mesh belt speed ALC-1"
      );
    }
  };
  const handle_blur_collecting_belt_speed = () => {
    if (collecting_belt_speed < 0 || collecting_belt_speed > 100) {
      message.error(
        "Please enter a number between 0 and 100 for ALC - Collecting belt speed ALC-1"
      );
    }
  };
  const handle_blur_collecting_belt_speed_2 = () => {
    if (collecting_belt_speed_2 < 0 || collecting_belt_speed_2 > 100) {
      message.error(
        "Please enter a number between 0 and 100 for ALC - Collecting belt speed ALC-2"
      );
    }
  };
  const handle_blur_mesh_belt_speed_2 = () => {
    if (mesh_belt_speed_2 < 0 || mesh_belt_speed_2 > 100) {
      message.error(
        "Please enter a number between 0 and 100 for ALC - Mesh belt speed ALC-2"
      );
    }
  };
  const handle_blur_press_roller_speed_2 = () => {
    if (press_roller_speed_2 < 35 || press_roller_speed_2 > 78.7) {
      message.error(
        "Please enter a number between 35 and 78.6 for ALC - Press Roller Speed  ALC-2"
      );
    }
  };
  const handle_blur_turbo_roller_speed_2 = () => {
    if (turbo_roller_speed_2 < 1000 || turbo_roller_speed_2 > 4400) {
      message.error(
        "Please enter a number between 1000 and 4400 for ALC - Turbo Roller speed ALC-2"
      );
    }
  };

  const handle_blur_alc_k1_2_roller_speed = () => {
    if (alc_k1_roller_speed_2 < 40 || alc_k1_roller_speed_2 > 80) {
      message.error(
        "Please enter a number between 40 and 80 for ALC - K2 Roller speed ALC-2"
      );
    }
  };
  const handle_blur_alc_k2_roller_speed_2 = () => {
    if (alc_k2_roller_speed_2 < 0 || alc_k2_roller_speed_2 > 360) {
      message.error(
        "Please enter a number between 0 and 360 for ALC - K2 Roller speed ALC-2"
      );
    }
  };
  const handle_blur_alc_k3_roller_speed_2 = () => {
    if (alc_k3_roller_speed_2 < 0 || alc_k3_roller_speed_2 > 1290) {
      message.error(
        "Please enter a number between 0 and 1290 for ALC - K3 Roller speed ALC-2"
      );
    }
  };
  const handle_blur_alc_feed_roller_speed_2 = () => {
    if (alc_feed_roller_speed_2 < 0 || alc_feed_roller_speed_2 > 7) {
      message.error(
        "Please enter a number between 0 and 7 for  ALC - K1 Roller speed ALC-2"
      );
    }
  };
  const handle_blur_transport_fan_speed_por2 = () => {
    if (transport_fan_speed_por2 < 85 || transport_fan_speed_por2 > 100) {
      message.error(
        "Please enter a number between 85 and 100 for Pre-Opener -Reiter -Transport Fan speed R1-2"
      );
    }
  };
  const handle_blur_feed_roller_speed_foa_2 = () => {
    if (feed_roller_speed_foa_2 < 50 || feed_roller_speed_foa_2 > 100) {
      message.error(
        "Please enter a number between 50 and 100 for Fine Opener Reiter -Transport Fan speed"
      );
    }
  };
  const handle_blur_transport_fan_speed = () => {
    if (transport_fan_speed < 65 || transport_fan_speed > 100) {
      message.error(
        "Please enter a number between 65 and 100 for Transport fan speed"
      );
    }
  };
  const handle_blur_wbo_wiper2 = () => {
    if (wbo_wiper_roller_speed_2 < 50 || wbo_wiper_roller_speed_2 > 100) {
      message.error(
        "Please enter a number between 50 and 100 for WBO - Wiper roller speed of WBO-2"
      );
    }
  };
  const handle_surfacelevel = () => {
    if (FC_surfacePH < 0 || FC_surfacePH > 5) {
      message.error(
        "Please enter a number between 0. and 5 Surface Activity actual "
      );
    }
  };
  const handle_rangeHW2 = () => {
    if (HW_waterFill2 < 19 || HW_waterFill2 > 29) {
      message.error("Please enter a number between 19 and 29 for Hot Wash 02");
    }
  };
  const handleBlur_range80to120 = () => {
    // const numericValue = Number(value);
    if (wbo_stripper_roller_speed_1 < 80 || wbo_stripper_roller_speed_1 > 120) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 80 and 120 for Scouring & Bleaching"
      );
    }
  };
  const handleBlur_range28to42 = () => {
    // const numericValue = Number(value);
    if (CH_caustic < 28 || CH_caustic > 42) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 28 and 42 for Caustic soda Flakes"
      );
    }
  };
  const handleBlur_range10to12 = () => {
    // const numericValue = Number(value);
    if (CH_haipaloene < 10 || CH_haipaloene > 12) {
      //alert("Please enter a number between 19 and 29");
      message.error("Please enter a number between 10 and 12 for Haipolene");
    }
  };
  const handleBlur_range7to16 = () => {
    // const numericValue = Number(value);
    if (CH_sarofom < 7.0 || CH_sarofom > 16.0) {
      //alert("Please enter a number between 19 and 29");
      message.error("Please enter a number between 7.0 and 16.0 for Sarofom");
    }
  };
  const handleBlur_range50to70 = () => {
    // const numericValue = Number(value);
    if (CH_Hydrogen < 50 || CH_Hydrogen > 70) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 50 and 70 for Hydrogen peroxide"
      );
    }
  };
  const handleBlur_range1to3 = () => {
    // const numericValue = Number(value);
    if (CH_setilon < 1.5 || CH_setilon > 3.5) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 1.5 and 3.5 for Setilon KN / bo_wiper_roller_speed 9490"
      );
    }
  };
  const handleBlur_range6to9 = () => {
    // const numericValue = Number(value);
    if (CH_citric < 6 || CH_citric > 9) {
      //alert("Please enter a number between 19 and 29");
      message.error("Please enter a number between 6 and 9 for Citric acid");
    }
  };
  const handleBlur_range15to25 = () => {
    // const numericValue = Number(value);
    if (FC_waterFill < 15 || FC_waterFill > 25) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 15 and 25 for FinalCold Wash"
      );
    }
  };
  const handleBlur_range24to36 = () => {
    // const numericValue = Number(value);
    if (NW_waterFill < 24 || NW_waterFill > 36) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 24 and 36 for Neutralizing Wash"
      );
    }
  };
  const fetchDataLOV_BMRNO = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/bleaching/generation/getMappingBmr`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAvailableBMRno(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/Spunlace/F-02/Summary");
  };

  const spunlace_02 = () => {
    const isValid = () => {
      // if (!id) return "Header ID is required";
      // if (!bo_striper_roller_speed) return "BO- Striper roller speed is required";
      // if (!bo_spiked_lattice_speed) return "BO- SPIKED lattice speed is required";

      // if (!bo_wiper_roller_speed) return "BO-Wiper roller speed is required";
      // if (!bo_transport_fan_speed) return "BO Transport FAN Speed is required";

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
      header_id: id,
      unit: "Unit H",
      formatName: "PROCESS SETUP VERIFICATION OPENING LINE",
      formatNo: "PH-PRD02/F-002",
      revisionNo: "01",
      sopNumber: "PH-PRD02-D-03",
      opening_id: id,

      date: date,
      shift: shift,
      order_no: order_no,
      mixing: Mixing,
      customer_name: customername,
      std_gsm: STD_GSM,
      material_code: MaterialCode,

      bo_striper_roller_speed: bo_striper_roller_speed,
      bo_spiked_lattice_speed: bo_spiked_lattice_speed,
      bo_wiper_roller_speed: bo_wiper_roller_speed,
      bo_transport_fan_speed: bo_transport_fan_speed,
      scale_setting_1: scale_setting_1,
      scale_setting_2: scale_setting_2,
      total_weight_1: total_weight_1,
      total_weight_2: total_weight_2,
      wbo_1_1: wbo_1_1,
      wbo_1_2: wbo_1_2,
      wbo_2_1: wbo_2_1,
      wbo_2_2: wbo_2_2,
      wbo_stripper_roller_speed_1: wbo_stripper_roller_speed_1,
      wbo_stripper_roller_speed_2: wbo_stripper_roller_speed_2,
      wbo_spiked_lattice_speed_1: wbo_spiked_lattice_speed_1,
      wbo_spiked_lattice_speed_2: wbo_spiked_lattice_speed_2,
      wbo_wiper_roller_speed_1: wbo_wiper_roller_speed_1,
      wbo_wiper_roller_speed_2: wbo_wiper_roller_speed_2,
      cmo_feed_roller_speed: cmo_feed_roller_speed,
      transport_fan_speed: transport_fan_speed,
      feed_roller_speed_for: feed_roller_speed_for || "NA",
      transport_fan_speed_for: transport_fan_speed_for,
      feed_roller_speed_foa: feed_roller_speed_foa,
      feed_roller_speed_foa_2: feed_roller_speed_foa_2,
      transport_fan_speed_foa: transport_fan_speed_foa,
      transport_fan_speed_foa_2: transport_fan_speed_foa_2,

      feed_roller_speed_por: feed_roller_speed_por,
      feed_roller_speed_por_2: feed_roller_speed_por_2,

      transport_fan_speed_por: transport_fan_speed_por,
      transport_fan_speed_por_2: transport_fan_speed_por2,

      feed_roller_speed_poa: feed_roller_speed_poa,
      feed_roller_speed_poa_2: feed_roller_speed_poa_2,

      transport_fan_speed_poa: transport_fan_speed_poa,
      transport_fan_speed_poa_2: transport_fan_speed_poa_2,
      reiter_chute_feed_roller_speed: reiter_chute_feed_roller_speed,
      reiter_chute_feed_roller_speed_2: reiter_chute_feed_roller_speed_2,
      feed_roller_speed_rc: feed_roller_speed_rc,
      feed_roller_speed_rc_2: feed_roller_speed_rc_2,
      licker_in_speed: licker_in_speed,
      licker_in_speed_2: licker_in_speed_2,
      flat_speed: flat_speed,
      flat_speed_2: flat_speed_2,
      condenser_roller_speed: condenser_roller_speed,
      condenser_roller_speed_2: condenser_roller_speed_2,
      reiter_card_1_delivery_speed: reiter_card_1_delivery_speed,
      reiter_card_1_delivery_speed_2: reiter_card_1_delivery_speed_2,
      alc_top_chute_pressure: alc_top_chute_pressure || "NA",
      alc_top_chute_pressure_2: alc_top_chute_pressure_2 || "NA",
      alc_bottom_chute_pressure: alc_bottom_chute_pressure || "NA",
      alc_bottom_chute_pressure_2: alc_bottom_chute_pressure_2 || "NA",
      alc_feed_roller_speed_2: alc_feed_roller_speed_2 || "NA",
      alc_feed_roller_speed: alc_feed_roller_speed || "NA",
      alc_k1_roller_speed: alc_k1_roller_speed || "NA",
      alc_k1_roller_speed_2: alc_k1_roller_speed_2 || "NA",
      alc_k2_roller_speed: alc_k2_roller_speed || "NA",
      alc_k2_roller_speed_2: alc_k2_roller_speed_2 || "NA",
      alc_k3_roller_speed: alc_k3_roller_speed || "NA",
      alc_k3_roller_speed_2: alc_k3_roller_speed_2 || "NA",
      turbo_roller_speed: turbo_roller_speed || "NA",
      turbo_roller_speed_2: turbo_roller_speed_2 || "NA",
      press_roller_speed: press_roller_speed || "NA",
      press_roller_speed_2: press_roller_speed_2 || "NA",
      mesh_belt_speed: mesh_belt_speed || "NA",
      mesh_belt_speed_2: mesh_belt_speed_2 || "NA",
      collecting_belt_speed: collecting_belt_speed_2 || "NA",
      collecting_belt_speed_2: collecting_belt_speed_2 || "NA",
      condenser_roller_speed_2: condenser_roller_speed_2 || "NA",

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
      operator_submitted_on: operator_submit_on,
      operator_submitted_by: operator_submit_by,
      operator_submitted_id: operator_submit_id,
      operator_sign: operator_sign,
    };

    // Make the POST request to the API endpoint
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(
        `${API.prodUrl}/Precot/api/spulance/saveProcessSetupVerificationOpeningLineF002`,
        payload,
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        message.success("Form Saved successfully");

        // console.log("messsage", res);
        navigate("/Precot/Spunlace/F-02/Summary");
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
      spunlace_02();

      setSaveBtnStatus(true); // Example to disable after saving
      setSubmitBtnStatus(true);
      // alert("Bleaching job card Saved successfully!");
      //  message.success("Bleaching job card Saved successfully!");
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  };

  //SAve API

  const spunlace_02_submit = () => {
    const isValid = () => {
      // if (!id) return "Header ID is required";
      if (!bo_striper_roller_speed)
        return "BO- Striper roller speed  is required";

      if (!bo_spiked_lattice_speed)
        return "BO- SPIKED lattice speed  is required";
      if (!bo_wiper_roller_speed) return "BO-Wiper roller speed is required";
      if (!bo_transport_fan_speed) return "BO Transport FAN Speed is required";
      if (!scale_setting_1) return "SCALE SETTING WBO-1 No is required";
      if (!scale_setting_2) return "SCALE SETTING WBO-2 is required";
      if (!total_weight_1) return "TOTAL WEIGHT WBO1 is required";
      // if (!total_weight_2) return "TOTAL WEIGHT WBO2 is required";
      if (!wbo_1_1) return "WBO-1 of WBO1 is required";
      if (!wbo_1_2) return "WBO-1 of WBO2 is required";
      // if (!wbo_2_1) return "WBO-2 of WBO-1 is required";
      // if (!wbo_2_2) return "WBO-2 of WBO-2 is required";
      if (!wbo_stripper_roller_speed_1)
        return "WBO - Stripper roller speed WBO1  is required";
      if (!wbo_stripper_roller_speed_2)
        return "WBO - Stripper roller speed WBO2 are required";
      if (!wbo_spiked_lattice_speed_1)
        return "WBO - SPIKED lattice speed WBO1 is required";
      if (!wbo_spiked_lattice_speed_2)
        return "WBO - SPIKED lattice speed WBO2 is required";
      if (!wbo_wiper_roller_speed_1)
        return "WBO - Wiper roller speed WBO1 is required";
      if (!wbo_wiper_roller_speed_2)
        return "WBO - Wiper roller speed WBO2 is required";
      if (!cmo_feed_roller_speed) return "CMO Feed roller speed  is required";
      if (!transport_fan_speed) return "Transport fan speed are required";
      if (!feed_roller_speed_for)
        return "Fine Opener Reiter- Feed roller speed is required";
      if (!transport_fan_speed_for)
        return "Fine Opener Reiter -  Transport Fan speed is required";
      if (!feed_roller_speed_foa)
        return "Fine Opener ALC - Feed roller speed ALC1 is required";
      if (!feed_roller_speed_foa_2)
        return "Fine Opener ALC - Feed roller speed ALC2 is required";
      if (!transport_fan_speed_foa)
        return "Fine Opener ALC - Transport Fan speed ALC1 is required";
      if (!transport_fan_speed_foa_2)
        return "Fine Opener ALC - Transport Fan speed ALC2 is required";
      if (!feed_roller_speed_por)
        return "Pre-Opener -Reiter -Feed roller speed -R-1 is required";
      if (!feed_roller_speed_por_2)
        return "Pre-Opener -Reiter -Feed roller speed -R1-2 is required";

      if (!feed_roller_speed_poa)
        return "Pre-Opener -ALC -Feed roller speed-ALC 1 is required";
      if (!feed_roller_speed_poa_2)
        return "Pre-Opener -ALC -Feed roller speed-ALC 2 is required";
      if (!transport_fan_speed_poa)
        return "Pre-Opener -ALC -Transport Fan speed -ALC 1  is required";
      if (!transport_fan_speed_poa_2)
        return "Pre-Opener -ALC -Transport Fan speed -ALC 2  is required";

      if (!reiter_chute_feed_roller_speed)
        return "REITER CARDING - Reiter Chute feed Roller speed -R1 is required";
      if (!reiter_chute_feed_roller_speed_2)
        return "REITER CARDING -Reiter Chute feed Roller speed -R2 is required";
      if (!feed_roller_speed_rc)
        return "REITER CARDING - Feed roller speed - R1 is required";
      if (!feed_roller_speed_rc_2)
        return "REITER CARDING -Feed roller speed -R2 is required";
      if (!licker_in_speed)
        return "REITER CARDING -Licker in speed R1 is required";
      if (!licker_in_speed_2)
        return "REITER CARDING - Licker in speed R2 is required";
      if (!flat_speed) return "REITER CARDING -Flat speed R1 is required";
      if (!flat_speed_2) return "REITER CARDING -Flat speed R2 is required";
      if (!condenser_roller_speed)
        return "REITER CARDING -Condenser roller speed R1 is required";
      if (!condenser_roller_speed_2)
        return "SREITER CARDING  -Condenser roller speed R2 is required";

      if (!reiter_card_1_delivery_speed)
        return "SREITER CARDING - Reiter Card -1 Delivery speed (Doffer) -R1  is required";
      if (!reiter_card_1_delivery_speed_2)
        return "SSREITER CARDING -Reiter Card -1 Delivery speed (Doffer) -R2 is required";

      // if (!alc_top_chute_pressure) return "AIR LAY CARDING - Top chute pressure -ACL-1 is required";
      // if (!alc_top_chute_pressure_2) return "AIR LAY CARDING - Top chute pressure -ACL-2 is required";
      // if (!alc_bottom_chute_pressure) return "AIR LAY CARDING - Bottom chute pressure -ACL-1 is required";
      // if (!alc_bottom_chute_pressure_2) return "AIR LAY CARDING -Bottom chute pressure -ACL-2 is required";
      // if (!alc_feed_roller_speed) return "AIR LAY CARDING - Feed Roller speed -ACL-1 is required";
      // if (!alc_feed_roller_speed_2) return "AIR LAY CARDING  - Feed Roller speed -ACL-2 is required";
      // if (!alc_k1_roller_speed) return "AIR LAY CARDING -K1 Roller speed -ACL-1 is required";
      // if (!alc_k1_roller_speed_2) return "AIR LAY CARDING -K1 Roller speed -ACL-2 is required";
      // if (!alc_k2_roller_speed) return "AIR LAY CARDING -K2 Roller speed -ACL-1 is required";
      // if (!alc_k2_roller_speed_2) return "AIR LAY CARDING -K2 Roller speed -ACL-2 is required";
      // if (!alc_k3_roller_speed) return "AIR LAY CARDING -K3 Roller speed -ACL-1 is required";
      // if (!alc_k3_roller_speed_2) return "AIR LAY CARDING -K3 Roller speed -ACL-2 is required";
      // if (!turbo_roller_speed) return "AIR LAY CARDING -Turbo Roller speed -ACL-1 is required";
      // if (!turbo_roller_speed_2) return "AIR LAY CARDING -Turbo Roller -ACl-2 speed is required";
      // if (!press_roller_speed) return "AIR LAY CARDING  -Press roller speed -ACL-1 is required";
      // if (!press_roller_speed_2) return "AIR LAY CARDING  -Press roller speed -ACL-2 is required";
      // if (!mesh_belt_speed) return "AIR LAY CARDING -Mesh belt speed -ACL-1 is required";
      // if (!mesh_belt_speed_2) return "AIR LAY CARDING -Mesh belt speed -ACL-2 is required";
      // if (!collecting_belt_speed) return "AIR LAY CARDING -Collecting belt speed -ACL-1 is required";
      // if (!collecting_belt_speed_2) return "AIR LAY CARDING -Collecting belt speed -ACL-2 is required";
      if (!condenser_roller_speed)
        return "REITER CARDING - Condenser roller speed -R-1 is required";
      if (!collecting_belt_speed_2)
        return "REITER CARDING -Condenser roller speed -R-2-1is required";
      return null;
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    setSaveLoading(true);
    const remarkToSave = CH_remark.trim() === "" ? "Nill" : CH_remark;
    // Format the payload according to the API documentation
    const payload = {
      header_id: id,
      unit: "Unit H",
      formatName: "PROCESS SETUP VERIFICATION OPENING LINE",
      formatNo: "PH-PRD02/F-002",
      revisionNo: "01",
      sopNumber: "PH-PRD02-D-03",
      opening_id: id,

      date: date,
      shift: shift,
      order_no: order_no,
      mixing: Mixing,
      customer_name: customername,
      std_gsm: STD_GSM,
      material_code: MaterialCode,

      bo_striper_roller_speed: bo_striper_roller_speed,
      bo_spiked_lattice_speed: bo_spiked_lattice_speed,
      bo_wiper_roller_speed: bo_wiper_roller_speed,
      bo_transport_fan_speed: bo_transport_fan_speed,
      scale_setting_1: scale_setting_1,
      scale_setting_2: scale_setting_2,
      total_weight_1: total_weight_1,
      total_weight_2: total_weight_2,
      wbo_1_1: wbo_1_1,
      wbo_1_2: wbo_1_2,
      wbo_2_1: wbo_2_1,
      wbo_2_2: wbo_2_2,
      wbo_stripper_roller_speed_1: wbo_stripper_roller_speed_1,
      wbo_stripper_roller_speed_2: wbo_stripper_roller_speed_2,
      wbo_spiked_lattice_speed_1: wbo_spiked_lattice_speed_1,
      wbo_spiked_lattice_speed_2: wbo_spiked_lattice_speed_2,
      wbo_wiper_roller_speed_1: wbo_wiper_roller_speed_1,
      wbo_wiper_roller_speed_2: wbo_wiper_roller_speed_2,
      cmo_feed_roller_speed: cmo_feed_roller_speed,
      transport_fan_speed: transport_fan_speed,
      feed_roller_speed_for: feed_roller_speed_for || "NA",
      transport_fan_speed_for: transport_fan_speed_for,
      feed_roller_speed_foa: feed_roller_speed_foa,
      feed_roller_speed_foa_2: feed_roller_speed_foa_2,
      transport_fan_speed_foa: transport_fan_speed_foa,
      transport_fan_speed_foa_2: transport_fan_speed_foa_2,

      feed_roller_speed_por: feed_roller_speed_por,
      feed_roller_speed_por_2: feed_roller_speed_por_2,

      transport_fan_speed_por: transport_fan_speed_por,
      transport_fan_speed_por_2: transport_fan_speed_por2,

      feed_roller_speed_poa: feed_roller_speed_poa,
      feed_roller_speed_poa_2: feed_roller_speed_poa_2,

      transport_fan_speed_poa: transport_fan_speed_poa,
      transport_fan_speed_poa_2: transport_fan_speed_poa_2,
      reiter_chute_feed_roller_speed: reiter_chute_feed_roller_speed,
      reiter_chute_feed_roller_speed_2: reiter_chute_feed_roller_speed_2,
      feed_roller_speed_rc: feed_roller_speed_rc,
      feed_roller_speed_rc_2: feed_roller_speed_rc_2,
      licker_in_speed: licker_in_speed,
      licker_in_speed_2: licker_in_speed_2,
      flat_speed: flat_speed,
      flat_speed_2: flat_speed_2,
      condenser_roller_speed: condenser_roller_speed,
      condenser_roller_speed_2: condenser_roller_speed_2,
      reiter_card_1_delivery_speed: reiter_card_1_delivery_speed,
      reiter_card_1_delivery_speed_2: reiter_card_1_delivery_speed_2,
      alc_top_chute_pressure: alc_top_chute_pressure || "NA",
      alc_top_chute_pressure_2: alc_top_chute_pressure_2 || "NA",
      alc_bottom_chute_pressure: alc_bottom_chute_pressure || "NA",
      alc_bottom_chute_pressure_2: alc_bottom_chute_pressure_2 || "NA",
      alc_feed_roller_speed_2: alc_feed_roller_speed_2 || "NA",
      alc_feed_roller_speed: alc_feed_roller_speed || "NA",
      alc_k1_roller_speed: alc_k1_roller_speed || "NA",
      alc_k1_roller_speed_2: alc_k1_roller_speed_2 || "NA",
      alc_k2_roller_speed: alc_k2_roller_speed || "NA",
      alc_k2_roller_speed_2: alc_k2_roller_speed_2 || "NA",
      alc_k3_roller_speed: alc_k3_roller_speed || "NA",
      alc_k3_roller_speed_2: alc_k3_roller_speed_2 || "NA",
      turbo_roller_speed: turbo_roller_speed || "NA",
      turbo_roller_speed_2: turbo_roller_speed_2 || "NA",
      press_roller_speed: press_roller_speed || "NA",
      press_roller_speed_2: press_roller_speed_2 || "NA",
      mesh_belt_speed: mesh_belt_speed || "NA",
      mesh_belt_speed_2: mesh_belt_speed_2 || "NA",
      collecting_belt_speed: collecting_belt_speed_2 || "NA",
      collecting_belt_speed_2: collecting_belt_speed_2 || "NA",

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
      operator_submitted_on: operator_submit_on,
      operator_submitted_by: operator_submit_by,
      operator_submitted_id: operator_submit_id,
      operator_sign: operator_sign,
    };

    // Make the POST request to the API endpoint
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(
        `${API.prodUrl}/Precot/api/spulance/submitProcessSetupVerificationOpeningLineF002`,
        payload,
        { headers }
      )
      .then((res) => {
        // setSaveLoading(false);
        message.success("Form Submitted successfully");
        // console.log("messsage", res);

        // message.success("LaydownChecklist Submitted successfully");
        navigate("/Precot/Spunlace/F-02/Summary");
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
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setbo_striper_roller_speed(inputValue);
    // }
  };
  const handle_blur_wbo_stripper2 = () => {
    if (wbo_stripper_roller_speed_2 < 50 || wbo_stripper_roller_speed_2 > 100) {
      message.error(
        "Please enter a number between 50 and 100 for WBO - Stripper roller speed WBO-2"
      );
    }
  };

  const handleInputwbo_stripper2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setwbo_stripper_roller_speed_2(inputValue);
    // }
  };

  const handleChange_WBO_stripper2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setwbo_stripper_roller_speed_2(inputValue);
    // }
  };
  const handleChangeBOspiked = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setbo_spiked_lattice_speed(inputValue);
    // }
  };
  const handleChangeBOtrans = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setbo_transport_fan_speed(inputValue);
    // }
  };
  const handleChangewbo_1_1 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setwbo_1_1(inputValue);
    // }
  };
  const handleChangewbo_1_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 4) {
    setwbo_1_2(inputValue);
    // }
  };
  const handleInputwbo_stripper = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setwbo_stripper_roller_speed_1(inputValue);
    // }
  };
  const handleInput_wbo_stripper = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setwbo_stripper_roller_speed_1(inputValue);
    // }
  };
  const handleChange_WBO_stripper = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setwbo_stripper_roller_speed_1(inputValue);
    // }
  };
  const handleInput_wbo_wipper = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setwbo_wiper_roller_speed_1(inputValue);
    // }
  };
  const handleInput_cmo_feed_roller_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setcmo_feed_roller_speed(inputValue);
    // }
  };
  const handleInput_feed_roller_speed_for = (e) => {
    const inputValue = e.target.value;

    // const validNumeric = /^\d*\.?\d*$/;
    // const validNA = /^NA?$/;

    // // Limit to two digits
    // if (
    //   (validNumeric.test(inputValue) &&
    //     inputValue.replace(".", "").length <= 2) ||
    //   (validNA.test(inputValue) && inputValue.length <= 2)
    // ) {
    setfeed_roller_speed_for(inputValue);
    // }
  };
  const handleInput_transport_fan_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    settransport_fan_speed(inputValue);
    // }
  };
  const handleInput_transport_fan_speed_FOR = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    settransport_fan_speed_for(inputValue);
    // }
  };
  const handleInput_feed_roller_speed_foa = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setfeed_roller_speed_foa(inputValue);
    // }
  };
  const handleInput_transport_fan_speed_foa = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    settransport_fan_speed_foa(inputValue);
    // }
  };
  const handleInput_feed_roller_speed_por = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setfeed_roller_speed_por(inputValue);
    // }
  };

  const handleInput_feed_roller_speed_poa = (e) => {
    const inputValue = e.target.value;

    setfeed_roller_speed_poa(inputValue);
  };
  const handleInput_transport_fan_speed_poa = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    settransport_fan_speed_poa(inputValue);
    // }
  };
  const handleInput_transport_fan_speed_poa_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    settransport_fan_speed_poa_2(inputValue);
    // }
  };
  const handleInput_feed_roller_speed_poa_2 = (e) => {
    const inputValue = e.target.value;

    // // Limit to two digits
    // if (
    //   /^\d*\.?\d*$/.test(inputValue) &&
    //   inputValue.replace(".", "").length <= 2
    // ) {
    setfeed_roller_speed_poa_2(inputValue);
    // }
  };
  const handleInput_feed_roller_speed_por_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setfeed_roller_speed_por_2(inputValue);
    // }
  };
  const handleInput_transport_fan_speed_foa_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    settransport_fan_speed_foa_2(inputValue);
    // }
  };

  const handleInput_transport_fan_speed_por = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    settransport_fan_speed_por(inputValue);
    // }
  };
  const handleInput_alc_feed_roller_speed = (e) => {
    const inputValue = e.target.value;

    // const validNumeric = /^\d*\.?\d*$/;

    // const validNA = /^[NA]*$/;

    // if (
    //   (validNumeric.test(inputValue) &&
    //     inputValue.replace(".", "").length <= 2) ||
    //   (validNA.test(inputValue) && inputValue.length <= 3)
    // ) {
    setalc_feed_roller_speed(inputValue);
    // }
  };

  const handleInput_alc_feed_roller_speed_2 = (e) => {
    const inputValue = e.target.value;

    // const validNumeric = /^\d*\.?\d*$/;

    // const validNA = /^[NA]*$/;

    // if (
    //   (validNumeric.test(inputValue) &&
    //     inputValue.replace(".", "").length <= 2) ||
    //   (validNA.test(inputValue) && inputValue.length <= 3)
    // ) {
    setalc_feed_roller_speed_2(inputValue);
    // }
  };
  const handleInput_alc_k1_roller_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setalc_k1_roller_speed(inputValue);
    // }
  };
  const handleInput_alc_k2_roller_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setalc_k2_roller_speed(inputValue);
    // }
  };
  const handleInput_alc_k3_roller_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setalc_k3_roller_speed(inputValue);
    // }
  };
  const handleInput_turbo_roller_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 4) {
    setturbo_roller_speed(inputValue);
    // }
  };
  const handleInput_press_roller_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setpress_roller_speed(inputValue);
    // }
  };
  const handleInput_mesh_belt_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setmesh_belt_speed(inputValue);
    // }
  };
  const handleInput_collecting_belt_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setcollecting_belt_speed(inputValue);
    // }
  };
  const handleInput_collecting_belt_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setcollecting_belt_speed_2(inputValue);
    // }
  };
  const handleInput_mesh_belt_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setmesh_belt_speed_2(inputValue);
    // }
  };
  const handleInput_press_roller_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setpress_roller_speedd_2(inputValue);
    // }
  };
  const handleInput_alc_k1_roller_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setalc_k1_roller_speed_2(inputValue);
    // }
  };
  const handleInput_alc_k2_roller_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setalc_k2_roller_speed_2(inputValue);
    // }
  };

  const handleInput_alc_k3_roller_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setalc_k3_roller_speed_2(inputValue);
    // }
  };
  const handleInput_turbo_roller_speed_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 4) {
    setturbo_roller_speed_2(inputValue);
    // }
  };
  const handleInput_transport_fan_speed_por2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    settransport_fan_speed_por2(inputValue);
    // }
  };
  const handleInput_feed_roller_speed_foa_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setfeed_roller_speed_foa_2(inputValue);
    // }
  };
  const handleInput_wbo_wipper2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setwbo_wiper_roller_speed_2(inputValue);
    // }
  };
  const handleInput_wbo_spiked = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setwbo_spiked_lattice_speed_1(inputValue);
    // }
  };
  const handleInputwbo_2_1 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 4) {
    setwbo_2_1(inputValue);
    // }
  };
  const handle_blur_wbo_spiked2 = () => {
    if (wbo_spiked_lattice_speed_2 < 50 || wbo_spiked_lattice_speed_2 > 100) {
      message.error(
        "Please enter a number between 50 and 100 for WBO - SPIKED roller speed -WBO2"
      );
    }
  };
  const handleInput_wbo_spiked2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setwbo_spiked_lattice_speed_2(inputValue);
    // }
  };
  const handleChange_WBO_spiked2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setwbo_spiked_lattice_speed_2(inputValue);
    // }
  };
  const handleChange_feed_roller_speed_for = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setfeed_roller_speed_for(inputValue);
    // }
  };
  const handleChange_feed_roller_speed_for_FOR = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    settransport_fan_speed_for(inputValue);
    // }
  };
  const handleChange_feed_roller_speed_foa = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setfeed_roller_speed_foa(inputValue);
    // }
  };
  const handleChange_transport_fan_speed_foa = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    settransport_fan_speed_foa(inputValue);
    // }
  };
  const handleChange_feed_roller_speed_por = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setfeed_roller_speed_por(inputValue);
    // }
  };
  const handleChange_feed_roller_speed_for_PO_ALC = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setfeed_roller_speed_poa(inputValue);
    // }
  };
  const handleChange_transport_fan_speed_poa = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    settransport_fan_speed_poa(inputValue);
    // }
  };
  const handleChange_transport_fan_speed_poa_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    settransport_fan_speed_poa_2(inputValue);
    // }
  };
  const handleChange_feed_roller_speed_poa_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setfeed_roller_speed_poa_2(inputValue);
    // }
  };
  const handleChange_feed_roller_speed_por_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setfeed_roller_speed_por_2(inputValue);
    // }
  };
  const handleChange_transport_fan_speed_foa_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    settransport_fan_speed_foa_2(inputValue);
    // }
  };
  const handleChange_transport_fan_speed_por = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    settransport_fan_speed_por(inputValue);
    // }
  };
  const handleChange_transport_fan_speed_por2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    settransport_fan_speed_por2(inputValue);
    // }
  };
  const handleChange_feed_roller_speed_foa_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 3) {
    setfeed_roller_speed_foa_2(inputValue);
    // }
  };
  const handleChange_WBO_spiked = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setwbo_spiked_lattice_speed_1(inputValue);
    // }
  };
  const handleChange_WBO_wiper = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setwbo_wiper_roller_speed_1(inputValue);
    // }
  };
  const handleChange_cmo_feed_roller_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setcmo_feed_roller_speed(inputValue);
    // }
  };
  const handleChange_transport_fan_speed = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    settransport_fan_speed(inputValue);
    // }
  };
  const handleChange_WBO_wiper2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setwbo_wiper_roller_speed_2(inputValue);
    // }
  };
  const handleChangewbo_2_2 = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 2) {
    setwbo_2_2(inputValue);
    // }
  };
  const handleInputwbo_2_2S = (e) => {
    const inputValue = e.target.value;

    // Limit to two digits
    // if (/^[\dNA]*$/.test(inputValue) && inputValue.length <= 4) {
    setwbo_2_2(inputValue);
    // }
  };
  // const handleKeyPress = (e) => {
  //   const allowedKeys = /[0-9]/;
  //   const specialKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

  //   if (!allowedKeys.test(e.key) && e.key !== 'N' && e.key !== 'A' && !specialKeys.includes(e.key)) {
  //     e.preventDefault();
  //     return;
  //   }

  //   if (values.length >= 2 && !specialKeys.includes(e.key)) {
  //     e.preventDefault();
  //   }
  //   if (values.length === 0 && e.key === 'N') {
  //     return;
  //   }
  //   if (values.length === 1 && e.key === 'A' && values[0] === 'N') {
  //     return;
  //   }
  // };

  const handleKeyPress = (e) => {
    const allowedKeys = /[0-9.]/; // Allow digits and the decimal point
    const specialKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    // Allow special keys
    if (specialKeys.includes(e.key)) {
      return;
    }

    // Allow the sequence "NA"
    if (e.target.value.length === 0 && e.key === "N") {
      return;
    }
    if (
      e.target.value.length === 1 &&
      e.key === "A" &&
      e.target.value[0] === "N"
    ) {
      return;
    }

    // Prevent further input if "NA" is already entered
    if (e.target.value === "NA") {
      e.preventDefault();
      return;
    }

    // Allow numbers and the decimal point
    if (!allowedKeys.test(e.key)) {
      e.preventDefault();
      return;
    }

    // Prevent input beyond 100
    const newValue = e.target.value + e.key;
    if (parseFloat(newValue) > 100) {
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
  const handleInputwbo_1_1 = (e) => {
    // console.log("handle value", e);
    let inputValue = e.target.value;

    // Ensure input is numeric and limit to two digits
    if (!isNaN(inputValue) && inputValue.length > 4) {
      inputValue = inputValue.slice(0, 4);
    }

    // Update state with formatted value
    setwbo_1_1(inputValue);
  };
  const handleInputwbo_1_2 = (e) => {
    // console.log("handle value", e);
    let inputValue = e.target.value;

    // Ensure input is numeric and limit to two digits
    if (!isNaN(inputValue) && inputValue.length > 4) {
      inputValue = inputValue.slice(0, 4);
    }

    // Update state with formatted value
    setwbo_1_2(inputValue);
  };
  const handleInputwbo_1_21200_2200 = (e) => {
    // console.log("handle value", e);
    let inputValue = e.target.value;

    // Ensure input is numeric and limit to two digits
    if (!isNaN(inputValue) && inputValue.length > 4) {
      inputValue = inputValue.slice(0, 4);
    }

    // Update state with formatted value
    setwbo_2_1(inputValue);
  };
  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/spulance/ProcessSetupVerificationOpeningLineF002/approveOrReject`,
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
        navigate("/Precot/Spunlace/F-02/Summary");
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
        `${API.prodUrl}/Precot/api/spulance/ProcessSetupVerificationOpeningLineF002/approveOrReject`,
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
        navigate("/Precot/Spunlace/F-02/Summary");
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
  const handleInput_Spiked = (e) => {
    // console.log("handle value", e);
    let inputValue = e.target.value;

    // Ensure input is numeric and limit to two digits
    if (!isNaN(inputValue) && inputValue.length > 3) {
      inputValue = inputValue.slice(0, 3);
    }

    // Update state with formatted value
    setwbo_spiked_lattice_speed_1(inputValue);
  };
  const handleInputbotranstfan = (e) => {
    // console.log("handle value", e);
    let inputValue = e.target.value;

    // Ensure input is numeric and limit to two digits
    if (!isNaN(inputValue) && inputValue.length > 3) {
      inputValue = inputValue.slice(0, 3);
    }

    // Update state with formatted value
    setbo_transport_fan_speed(inputValue);
  };
  const handleInputbowiper = (e) => {
    // console.log("handle value", e);
    let inputValue = e.target.value;

    // Ensure input is numeric and limit to two digits
    if (!isNaN(inputValue) && inputValue.length > 3) {
      inputValue = inputValue.slice(0, 3);
    }

    // Update state with formatted value
    setbo_wiper_roller_speed(inputValue);
  };

  useEffect(() => {
    if (!initial.current) {
      initial.current = true;
      // const roleBase = localStorage.getItem("role");
      fetchDatabatchByOrderdetails();

      fetchDataOrderNodetails_f2();

      axios
        .get(`${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log("Shift details fetched:", res.data);
          const shifts = res.data.map((shift) => shift.value);
          setAvailableShifts(shifts);
        });
    }
  }, [token]);

  // console.log("getImage2", getImageOP, getImageSUP, getImageHOD);
  const items = [
    {
      key: "1",
      label: <p>PROCESS SETUP VERIFICATION OPENING LINE</p>,
      children: (
        <div style={{ width: "100%" }}>
          <table>
            <thead>
              <tr>
                <th colSpan={7}>DESCRIPTION</th>
                <th colSpan={5}>Std.</th>
                <th colSpan={1}>UNIT</th>
                <th colSpan={6}>SETUP SPEED</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} style={{ paddingLeft: "5px" }}>
                  BO- Striper roller speed
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  50 -100
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={6}>
                  <Input
                    type="text"
                    value={bo_striper_roller_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range50_100}
                    onKeyDown={handleKeyPress}
                    onInput={handleChangeBOStriper}
                    onChange={handleChangeBOStriper}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={7} style={{ paddingLeft: "5px" }}>
                  BO- SPIKED lattice speed
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  50 -100
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={6}>
                  <Input
                    type="text"
                    value={bo_spiked_lattice_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range50_100Spiked}
                    onKeyDown={handleKeyPress}
                    onInput={handleChangeBOspiked}
                    onChange={handleChangeBOspiked}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={7} style={{ paddingLeft: "5px" }}>
                  BO-Wiper roller speed
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  50 -100
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={6}>
                  <Input
                    type="text"
                    value={bo_wiper_roller_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range50_100bo_wiper_roller_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInputbowiper}
                    onChange={handleInputbowiper}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={7} style={{ paddingLeft: "5px" }}>
                  BO Transport FAN Speed
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  60 -100
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={6}>
                  <Input
                    type="text"
                    value={bo_transport_fan_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range65_100bo_transport_fan_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInputbotranstfan}
                    onChange={handleInputbotranstfan}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={13} style={{ paddingLeft: "5px" }}>
                  WBO
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  WBO-1
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  WBO-2
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  SCALE SETTING
                </td>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  RATIO
                </td>

                <td colSpan={5} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={scale_setting_1}
                    style={{ textAlign: "center" }}
                    onKeyDown={(e) => {
                      if (
                        e.key === "e" ||
                        e.key === "E" ||
                        e.key === "-" ||
                        e.key === "+" ||
                        (!/[0-9NA.]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Tab" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight")
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => setscale_setting_1(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="text"
                    value={scale_setting_2}
                    style={{ textAlign: "center" }}
                    onKeyDown={(e) => {
                      if (
                        e.key === "e" ||
                        e.key === "E" ||
                        e.key === "-" ||
                        e.key === "+" ||
                        (!/[0-9NA.]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Tab" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight")
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => setscale_setting_2(e.target.value)}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  TOTAL WEIGHT
                </td>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  GRAMS/CYCLE
                </td>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={total_weight_1}
                    style={{ textAlign: "center" }}
                    onChange={(e) => settotal_weight_1(e.target.value)}
                    onKeyDown={(e) => {
                      if (
                        e.key === "e" ||
                        e.key === "E" ||
                        e.key === "-" ||
                        e.key === "+" ||
                        (!/[0-9NA.]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Tab" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight")
                      ) {
                        e.preventDefault();
                      }
                    }}
                    disabled={!isEditable}
                  />
                </td>
                {/* <td colSpan={2} style={{ textAlign: "center" }}>  <Input type="text"
                  value={total_weight_2}
                  style={{ textAlign: "center" }}
                  onChange={(e) => settotal_weight_2(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === 'e' ||
                      e.key === 'E' ||
                      e.key === '-' ||
                      e.key === '+' ||
                      (!/[0-9.]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
                    ) {
                      e.preventDefault();
                    }
                  }}
                  disabled={!isEditable} /></td> */}
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  Weight
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  0-4999
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Grams
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="text"
                    value={wbo_1_1}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range2000_3000wbo_1_1}
                    onKeyDown={handleKeyPress}
                    onInput={handleInputwbo_1_1}
                    onChange={handleChangewbo_1_1}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={wbo_1_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range2000_3000wbo_1_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleChangewbo_1_2}
                    onChange={handleChangewbo_1_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  WBO - Stripper roller speed
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  50 - 100
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={wbo_stripper_roller_speed_1}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_wbo_stripper}
                    onKeyDown={handleKeyPress}
                    onInput={handleInputwbo_stripper}
                    onChange={handleInputwbo_stripper}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={wbo_stripper_roller_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_wbo_stripper2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInputwbo_stripper2}
                    onChange={handleInputwbo_stripper2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  WBO - SPIKED lattice speed
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  50 - 100
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={wbo_spiked_lattice_speed_1}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_wbo_spiked}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_wbo_spiked}
                    onChange={handleInput_wbo_spiked}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={wbo_spiked_lattice_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_wbo_spiked2}
                    onKeyDown={handleKeyPress}
                    onInput={handleChange_WBO_spiked2}
                    onChange={handleChange_WBO_spiked2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  WBO - Wiper roller speed
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  50 - 100
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={wbo_wiper_roller_speed_1}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_wbo_wiper}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_wbo_wipper}
                    onChange={handleInput_wbo_wipper}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={wbo_wiper_roller_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_wbo_wiper2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_wbo_wipper2}
                    onChange={handleInput_wbo_wipper2}
                    disabled={!isEditable}
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
      label: <p>PROCESS SETUP VERIFICATION OPENING LINE -2</p>,
      children: (
        <div>
          <table>
            <thead>
              <tr>
                <th colSpan={4}>DESCRIPTION</th>
                <th colSpan={4}>Std.</th>
                <th colSpan={5}>UNIT</th>
                <th colSpan={7}>SETUP SPEED</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  CMO Feed roller speed
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  0-100
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={cmo_feed_roller_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_cmo_feed_roller_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_cmo_feed_roller_speed}
                    onChange={handleInput_cmo_feed_roller_speed}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  CMO beater speed
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  65-100
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={transport_fan_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_transport_fan_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_transport_fan_speed}
                    onChange={handleInput_transport_fan_speed}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={20} style={{ paddingLeft: "5px" }}>
                  Fine Opener Reiter
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  Feed roller speed
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  50-100
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={feed_roller_speed_for}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_feed_roller_speed_for}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_feed_roller_speed_for}
                    onChange={handleInput_feed_roller_speed_for}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  Transport Fan speed{" "}
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  60-100
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={transport_fan_speed_for}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_transport_fan_speed_for}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_transport_fan_speed_FOR}
                    onChange={handleInput_transport_fan_speed_FOR}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={8} style={{ paddingLeft: "5px" }}>
                  Fine Opener ALC
                </td>
                {/* <td  colSpan={3} style={{paddingLeft:"5px"}}></td>
              <td  colSpan={2} style={{paddingLeft:"5px"}}></td> */}
                <td colSpan={6} style={{ textAlign: "center" }}>
                  ALC-1
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  ALC-2
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  Feed roller speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  50-100
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={feed_roller_speed_foa}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_feed_roller_speed_foa}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_feed_roller_speed_foa}
                    onChange={handleInput_feed_roller_speed_foa}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={feed_roller_speed_foa_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_feed_roller_speed_foa_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_feed_roller_speed_foa_2}
                    onChange={handleChange_feed_roller_speed_foa_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  Transport Fan speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  50-100
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={transport_fan_speed_foa}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_transport_fan_speed_foa}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_transport_fan_speed_foa}
                    onChange={handleChange_transport_fan_speed_foa}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={transport_fan_speed_foa_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_transport_fan_speed_foa_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_transport_fan_speed_foa_2}
                    onChange={handleInput_transport_fan_speed_foa_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={8} style={{ paddingLeft: "5px" }}>
                  Pre-Opener -Reiter
                </td>
                {/* <td  colSpan={3} style={{paddingLeft:"5px"}}></td>
              <td  colSpan={2} style={{paddingLeft:"5px"}}></td> */}
                <td colSpan={6} style={{ textAlign: "center" }}>
                  R-1{" "}
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  R1-2
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  Feed roller speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  0-30
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={feed_roller_speed_por}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_feed_roller_speed_por}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_feed_roller_speed_por}
                    onChange={handleChange_feed_roller_speed_por}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={feed_roller_speed_por_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_feed_roller_speed_por_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_feed_roller_speed_por_2}
                    onChange={handleInput_feed_roller_speed_por_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              {/* <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>Transport Fan </td>
                <td colSpan={3} style={{ textAlign: "center" }}>85-100</td>
                <td colSpan={2} style={{ textAlign: "center" }}>%</td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={transport_fan_speed_por}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_transport_fan_speed_por}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_transport_fan_speed_por}
                    onChange={handleChange_transport_fan_speed_por}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={transport_fan_speed_por2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_transport_fan_speed_por2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_transport_fan_speed_por2}
                    onChange={handleInput_transport_fan_speed_por2}
                    disabled={!isEditable}
                  />
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      ),
    },

    {
      key: "4",
      label: <p>PROCESS SETUP VERIFICATION OPENING LINE -3</p>,
      children: (
        <div>
          <table>
            <thead>
              <th colSpan={4}>DESCRIPTION</th>
              <th colSpan={4}>Std.</th>
              <th colSpan={5}>UNIT</th>
              <th colSpan={7}>SETUP SPEED</th>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} style={{ paddingLeft: "5px" }}>
                  Pre-Opener -ALC
                </td>
                {/* <td  colSpan={3} style={{paddingLeft:"5px"}}></td>
              <td  colSpan={2} style={{paddingLeft:"5px"}}></td> */}
                <td colSpan={6} style={{ textAlign: "center" }}>
                  ALC-1
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  ALC-2
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  Feed roller speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  0-30
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={feed_roller_speed_poa}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_feed_roller_speed_for__PO_ALC_1}
                    // onInput={handleInput_feed_roller_speed_poa}
                    onChange={handleInput_feed_roller_speed_poa}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={feed_roller_speed_poa_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_feed_roller_speed_for__PO_ALC_2}
                    // onKeyDown={(e) => {
                    //   if (
                    //     e.key == "e" ||
                    //     e.key === "E" ||
                    //     e.key === "-" ||
                    //     e.key === "+" ||
                    //     (!/[0-9.]/.test(e.key) &&
                    //       e.key !== "Backspace" &&
                    //       e.key !== "Tab" &&
                    //       e.key !== "ArrowLeft" &&
                    //       e.key !== "ArrowRight")
                    //   ) {
                    //     e.preventDefault();
                    //   }
                    // }}
                    onInput={handleInput_feed_roller_speed_poa_2}
                    onChange={handleInput_feed_roller_speed_poa_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  Transport Fan speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  60-100
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  %
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={transport_fan_speed_poa}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_transport_fan_speed_poa}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_transport_fan_speed_poa}
                    onChange={handleInput_transport_fan_speed_poa}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={transport_fan_speed_poa_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_transport_fan_speed_poa_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_transport_fan_speed_poa_2}
                    onChange={handleInput_transport_fan_speed_poa_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={14} style={{ paddingLeft: "5px" }}>
                  REITER CARDING
                </td>
                {/* <td  colSpan={3} style={{paddingLeft:"5px"}}></td>
              <td  colSpan={2} style={{paddingLeft:"5px"}}></td> */}
                <td colSpan={3} style={{ textAlign: "center" }}>
                  R-1
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  R-2
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  Reiter Chute feed Roller speed
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  950- 1150
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  RPM
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="text"
                    value={reiter_chute_feed_roller_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range950_1150Chute_feed_Roller_speedR1}
                    onKeyDown={handleKeyPress}
                    onInput={handleInputChute_feed_Roller_speedR1}
                    onChange={handleInputChute_feed_Roller_speedR1}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={reiter_chute_feed_roller_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range950_1150Chute_feed_Roller_speedR2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInputChute_feed_Roller_speedR2}
                    onChange={handleInputChute_feed_Roller_speedR2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  Feed roller speed
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  950- 1150
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  RPM
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="text"
                    value={feed_roller_speed_rc}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range950_1150feed_roller_speed_rc}
                    onKeyDown={handleKeyPress}
                    onInput={handleInputfeed_roller_speed_rc}
                    onChange={handleInputfeed_roller_speed_rc}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={feed_roller_speed_rc_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range950_1150feed_roller_speed_rc_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInputfeed_roller_speed_rc_2}
                    onChange={handleInputfeed_roller_speed_rc_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  Licker in speed{" "}
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  1300 - 1500
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  RPM
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="text"
                    value={licker_in_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range_1300_1500_licker_in_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_Licker_in_speedR1}
                    onChange={handleInput_Licker_in_speedR1}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={licker_in_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range1300_1500Licker_in_speedR2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_Licker_in_speedR2}
                    onChange={handleInput_Licker_in_speedR2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  Flat speed{" "}
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  0.15 - 2.0
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="text"
                    value={flat_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range_015_20_flat_speedR1}
                    onInput={handleInput_Flat_speedR1}
                    onChange={handleInput_Flat_speedR1}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={flat_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range_015_20_flat_speedR2}
                    onInput={handleInput_Flat_speedR2}
                    onChange={handleInput_Flat_speedR2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  Condenser roller speed
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  1-3
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="text"
                    value={condenser_roller_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_condenser_roller_speed}
                    //onKeyDown={handleKeyPress}
                    // onInput={handleInput_condenser_roller_speed}
                    onChange={handleInput_condenser_roller_speed}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={condenser_roller_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_condenser_roller_speed_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_condenser_roller_speed_2}
                    onChange={handleInput_condenser_roller_speed_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  Reiter Card -1 Delivery speed (Doffer)
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  0.6 - 1.5
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="text"
                    value={reiter_card_1_delivery_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range_06_15_reiter_card_1_delivery_speed}
                    onInput={handleInput_reiter_card_1_delivery_speed}
                    onChange={handleInput_reiter_card_1_delivery_speed}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED") ||
                      (roleBase === "ROLE_HOD" &&
                        selectedRow?.hod_status === "HOD_APPROVED") ||
                      (roleBase === "ROLE_OPERATOR" &&
                        selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                      (roleBase === "ROLE_DESIGNEE" &&
                        selectedRow?.hod_status === "HOD_APPROVED")
                    }
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={reiter_card_1_delivery_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={
                      handleBlur_range_06_15_reiter_card_1_delivery_speed_2
                    }
                    onInput={handleInput_reiter_card_1_delivery_speed_2}
                    onChange={handleInput_reiter_card_1_delivery_speed_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={14} style={{ paddingLeft: "5px" }}>
                  AIR LAY CARDING
                </td>
                {/* <td  colSpan={3} style={{paddingLeft:"5px"}}></td>
              <td  colSpan={2} style={{paddingLeft:"5px"}}></td> */}
                <td colSpan={3} style={{ textAlign: "center" }}>
                  ACL-1
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  ALC-2
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  AlC - Top chute pressure
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  300-1000
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="text"
                    value={alc_top_chute_pressure}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range_450_600_alc_top_chute_pressure}
                    onInput={handleInput_alc_top_chute_pressure}
                    onChange={handleInput_alc_top_chute_pressure}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={alc_top_chute_pressure_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range_450_600_alc_top_chute_pressure_2}
                    onInput={handleInput_alc_top_chute_pressure_2}
                    onChange={handleInput_alc_top_chute_pressure_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ paddingLeft: "5px" }}>
                  ALC - Bottom chute pressure
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  50-150
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="text"
                    value={alc_bottom_chute_pressure}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range_60_100_alc_bottom_chute_pressure}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_alc_bottom_chute_pressure}
                    onChange={handleInput_alc_bottom_chute_pressure}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    value={alc_bottom_chute_pressure_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handleBlur_range_60_100_alc_bottom_chute_pressure_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_alc_bottom_chute_pressure_2}
                    onChange={handleInput_alc_bottom_chute_pressure_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "5",
      label: <p>PROCESS SETUP VERIFICATION OPENING LINE -4</p>,
      children: (
        <div>
          <table>
            <thead>
              <th colSpan={4}>DESCRIPTION</th>
              <th colSpan={4}>Std.</th>
              <th colSpan={5}>UNIT</th>
              <th colSpan={7}>SETUP SPEED</th>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} style={{ paddingLeft: "5px" }}>
                  AIR LAY CARDING
                </td>
                {/* <td  colSpan={3} style={{paddingLeft:"5px"}}></td>
              <td  colSpan={2} style={{paddingLeft:"5px"}}></td> */}
                <td colSpan={6} style={{ textAlign: "center" }}>
                  ACL-1
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  ALC-2
                </td>
              </tr>

              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  ALC - Feed Roller speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  0 - 7
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={alc_feed_roller_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_alc_feed_roller_speed}
                    // onKeyDown={(e) => {
                    //   if (
                    //     e.key === 'e' ||
                    //     e.key === 'E' ||
                    //     e.key === '-' ||
                    //     e.key === '+' ||
                    //     (!/[0-9.]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
                    //   ) {
                    //     e.preventDefault();
                    //   }
                    // }}
                    // onInput={handleInput_alc_feed_roller_speed}
                    onChange={handleInput_alc_feed_roller_speed}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={alc_feed_roller_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_alc_feed_roller_speed_2}
                    // onKeyDown={(e) => {
                    //   if (
                    //     e.key === 'e' ||
                    //     e.key === 'E' ||
                    //     e.key === '-' ||
                    //     e.key === '+' ||
                    //     (!/[0-9.]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
                    //   ) {
                    //     e.preventDefault();
                    //   }
                    // }}
                    // onInput={handleInput_alc_feed_roller_speed_2}
                    onChange={handleInput_alc_feed_roller_speed_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  ALC - K1 Roller speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  0 - 143
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={alc_k1_roller_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_alc_k1_roller_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_alc_k1_roller_speed}
                    onChange={handleInput_alc_k1_roller_speed}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={alc_k1_roller_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_alc_k1_2_roller_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_alc_k1_roller_speed_2}
                    onChange={handleInput_alc_k1_roller_speed_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  ALC - K2 Roller speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  0 - 360
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={alc_k2_roller_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_alc_k2_roller_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_alc_k2_roller_speed}
                    onChange={handleInput_alc_k2_roller_speed}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={alc_k2_roller_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_alc_k2_roller_speed_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_alc_k2_roller_speed_2}
                    onChange={handleInput_alc_k2_roller_speed_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  ALC - K3 Roller speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  0 - 1290
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={alc_k3_roller_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_alc_k3_roller_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_alc_k3_roller_speed}
                    onChange={handleInput_alc_k3_roller_speed}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={alc_k3_roller_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_alc_k3_roller_speed_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_alc_k3_roller_speed_2}
                    onChange={handleInput_alc_k3_roller_speed_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  ALC - Turbo Roller speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  1000 - 4400
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={turbo_roller_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_turbo_roller_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_turbo_roller_speed}
                    onChange={handleInput_turbo_roller_speed}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={turbo_roller_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_turbo_roller_speed_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_turbo_roller_speed_2}
                    onChange={handleInput_turbo_roller_speed_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  ALC - Press roller speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  35 - 78.6
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={press_roller_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_press_roller_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_press_roller_speed}
                    onChange={handleInput_press_roller_speed}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={press_roller_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_press_roller_speed_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_press_roller_speed_2}
                    onChange={handleInput_press_roller_speed_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  ALC - Mesh belt speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  0 - 100
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={mesh_belt_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_mesh_belt_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_mesh_belt_speed}
                    onChange={handleInput_mesh_belt_speed}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={mesh_belt_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_mesh_belt_speed_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_mesh_belt_speed_2}
                    onChange={handleInput_mesh_belt_speed_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ paddingLeft: "5px" }}>
                  Collecting belt speed
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  0 -100
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  MPM
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={collecting_belt_speed}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_collecting_belt_speed}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_collecting_belt_speed}
                    onChange={handleInput_collecting_belt_speed}
                    disabled={!isEditable}
                  />
                </td>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <Input
                    type=""
                    value={collecting_belt_speed_2}
                    style={{ textAlign: "center", width: "100%" }}
                    onBlur={handle_blur_collecting_belt_speed_2}
                    onKeyDown={handleKeyPress}
                    onInput={handleInput_collecting_belt_speed_2}
                    onChange={handleInput_collecting_belt_speed_2}
                    disabled={!isEditable}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "6",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
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
                <b style={{ fontSize: "11px" }}>
                  Production Supervisor Sign & Date{" "}
                </b>
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
                  height: "60px",
                  textAlign: "center",
                }}
                disabled={
                  (roleBase === "ROLE_SUPERVISOR" &&
                    selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                  (roleBase === "ROLE_HOD" &&
                    selectedRow?.hod_status === "HOD_APPROVED") ||
                  (roleBase === "ROLE_OPERATOR" &&
                    selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                  (roleBase === "ROLE_DESIGNEE" &&
                    selectedRow?.hod_status === "HOD_APPROVED")
                }
              >
                {selectedRow?.operator_status === "OPERATOR_APPROVED" && (
                  <>
                    <div>{selectedRow?.operator_sign}</div>
                    <div>{operator_signsignaturedate}</div>

                    {getImageOP && (
                      <>
                        <br />
                        <img
                          src={getImageOP}
                          alt="logo"
                          className="signature"
                        />
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
                  height: "60px",
                }}
                disabled={
                  (roleBase === "ROLE_SUPERVISOR" &&
                    selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                  (roleBase === "ROLE_HOD" &&
                    selectedRow?.hod_status === "HOD_APPROVED") ||
                  (roleBase === "ROLE_OPERATOR" &&
                    selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                  (roleBase === "ROLE_DESIGNEE" &&
                    selectedRow?.hod_status === "HOD_APPROVED")
                }
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

              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  height: "60px",
                  textAlign: "center",
                }}
                disabled={
                  (roleBase === "ROLE_SUPERVISOR" &&
                    selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
                  (roleBase === "ROLE_HOD" &&
                    selectedRow?.hod_status === "HOD_APPROVED") ||
                  (roleBase === "ROLE_OPERATOR" &&
                    selectedRow?.operator_status === "OPERATOR_APPROVED") ||
                  (roleBase === "ROLE_DESIGNEE" &&
                    selectedRow?.hod_status === "HOD_APPROVED")
                }
              >
                {(selectedRow?.hod_status === "HOD_APPROVED" ||
                  selectedRow?.hod_status === "HOD_REJECTED") && (
                  <>
                    <div>{selectedRow?.hod_sign}</div>
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
            </tr>
          </table>
          {/* Container for buttons positioned at the right */}
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
        formName="PROCESS SETUP VERIFICATION OPENING LINE"
        formatNo="PH-PRD02/F-002"
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
          ...(roleBase === "ROLE_HOD" ||
          roleBase === "ROLE_SUPERVISOR" ||
          roleBase === "ROLE_QC" ||
          roleBase === "ROLE_DESIGNEE"
            ? [
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
                  icon={<img src={approveIcon} alt="Approve Icon" />}
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
                </Button>,
              ]
            : [
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
              <td colSpan="2">Shift</td>
              <td colSpan="4">{print && print.shift}</td>
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
                    <div>Setilon KN : {print && print.total_weight_1}</div>
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Input
          addonBefore="Date"
          placeholder="Date"
          value={datefomrat}
          disabled
          style={{ width: "100%", height: "35px" }}
        />
        <Input
          addonBefore="Shift"
          placeholder="Shift"
          value={shift}
          disabled
          style={{ width: "100%", height: "35px" }}
        />
        <Input
          addonBefore="Order No"
          placeholder="Order No"
          value={order_no}
          disabled
          style={{ width: "100%", height: "35px" }}
        />
        <Input
          addonBefore="Mixing"
          placeholder="Mixing"
          value={Mixing}
          disabled
          style={{ width: "100%", height: "35px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Input
          addonBefore="Customer Name"
          placeholder="Customer Name"
          value={customername}
          disabled
          style={{ width: "100%", height: "35px" }}
        />
        <Input
          addonBefore="Material Code"
          placeholder="Material Code"
          value={MaterialCode}
          disabled
          style={{ width: "100%", height: "35px" }}
        />

        <Input
          addonBefore="STD GSM"
          placeholder="STD GSM"
          value={STD_GSM}
          disabled
          style={{ width: "100%", height: "35px" }}
        />
      </div>
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>

        <div style={containerStyle}>
          <div style={beforeStyle}>Shift</div>
          <Select
            style={{ width: '100%', height: '40x', borderRadius: "0px", border: "1px solid #dddd", backgroundColor: "white" }}
            placeholder="Select Shift No"
            value={availableshiftlov}
            onChange={setAvailableShiftslov}
            disabled={
              (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
              (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
              (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
              (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
            }
          >
            {availableshift.map((shiftvalue, index) => (
              <Option key={index} value={shiftvalue}>
                {shiftvalue}
              </Option>
            ))}
          </Select>

        </div>




        <div style={containerStyle}>
          <div style={beforeStyle_finish}>Finishing</div>
          <Select
            style={{ width: '100%', height: '40x', borderRadius: "0px", border: "1px solid #dddd", backgroundColor: "white" }}
            placeholder="Select Finish"
            value={finisharraylist}
            onChange={setfinisharray}
            disabled={
              (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
              (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
              (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
              (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
            }
          >
            {finishlov.map((finish, index) => (
              <Option key={index} value={finish}>
                {finish}
              </Option>
            ))}
          </Select>

        </div>



        <div style={containerStyle}>
          <div style={machineno_finish}>M/C No</div>
          <Select
            style={{ width: '100%', height: '40x', borderRadius: "0px", border: "1px solid #dddd", backgroundColor: "white" }}
            placeholder="Select Machine No"
            value={availablemclov}
            onChange={setAvailableMAClov}
            disabled={
              (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
              (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
              (roleBase === "ROLE_OPERATOR" && selectedRow?.operator_status === "OPERATOR_APPROVED") ||
              (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
            }
            showSearch
          >
            {availableMachineLov.map((MacLOV, index) => (
              <Option key={index} value={MacLOV}>
                {MacLOV}
              </Option>
            ))}
          </Select>


        </div>


      </div> */}
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

export default Spunlace_f02;
