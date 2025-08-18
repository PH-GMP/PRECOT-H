/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Button, Col, Input, Row, Tabs, Select, message, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Radio } from "antd";
import logo from "../Assests/logo.png";
import API from "../baseUrl.json";
import { useNavigate, useLocation } from "react-router-dom";
import BleachingHeader from "../Components/BleachingHeader";
import { BiLock } from "react-icons/bi";
import { IoCreate, IoSave } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { GrDocumentStore } from "react-icons/gr";
import moment from "moment";

import { Modal, Drawer, Menu, Avatar } from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";

import { GoArrowLeft } from "react-icons/go";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";

const Bleaching = () => {
  const [PW_waterFill, setPW_waterFill] = useState("");

  const [persoftal, setpersoftal] = useState("ok");
  const [setilon_kn, setsetilon_kn] = useState("ok");

  const [id, setid] = useState("");
  const [PW_Observation, setPW_Observation] = useState("");
  const { Option } = Select;
  const [SB_waterFill, setSB_waterFill] = useState("");

  const [SB_Observation, setSB_Observation] = useState("");
  const [HW_waterFill, setHW_waterFill] = useState("");

  const [HW_Observation, setHW_Observation] = useState("");
  const [HW_Observation2, setHW_Observation2] = useState("");
  const [HW_waterFill2, setHW_waterFill2] = useState("");

  const [NW_waterFill, setNW_waterFill] = useState("");

  const [NW_Observation, setNW_Observation] = useState("");
  const [FC_waterFill, setFC_waterFill] = useState("");
  const [FC_ciruclationPH, setFC_ciruclationPH] = useState("");
  const [FC_surfacePH, setFC_surfacePH] = useState("");

  const [CH_caustic, setCH_caustic] = useState("");
  const [CH_haipaloene, setCH_haipaloene] = useState("");
  const [CH_sarofom, setCH_sarofom] = useState("");
  const [CH_Hydrogen, setCH_Hydrogen] = useState("");
  const [CH_setilon, setCH_setilon] = useState("");
  const [CH_citric, setCH_citric] = useState("");
  const [CH_remark, setCH_remark] = useState("");

  const [loading, setLoading] = useState(true);

  const [newDate, setNewDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [batchNolist, setBatchNolist] = useState("Select BatchNo");

  const [startTime, setStartTime] = useState("");
  const [batchno, setbatchno] = useState([]);
  const [endTime, setEndTime] = useState("");
  const [finishlov, setfinishLOV] = useState([]);
  const [finisharraylist, setfinisharray] = useState("Select Finish");
  const [availableBMRno, setAvailableBMRno] = useState([]);

  const [shiftInchargeFlag, setshiftInchargeFlag] = useState(false);
  const [hodIncharge, sethodIncharge] = useState(false);
  const [supervisor, setsupervisor] = useState(false);
  const [availableshift, setAvailableShifts] = useState([]);
  const [availableshiftlov, setAvailableShiftslov] = useState("");
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
  const [qa_status, setqa_status] = useState("");
  const [qa_saved_on, setqa_saved_on] = useState("");
  const [qa_saved_by, setqa_saved_by] = useState("");
  const [qa_saved_id, setqa_saved_id] = useState(0);
  const [qa_submit_on, setqa_submit_on] = useState("");
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [qa_submit_by, setqa_submit_by] = useState("");
  const [qa_submit_id, setqa_submit_id] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [qa_sign, setqa_sign] = useState("");
  const [supersigndate, setsupersigndate] = useState(false);
  const [qa_signsignaturedate, setqa_signsignaturedate] = useState("");
  const [hodsign, sethodsigndate] = useState("");

  const [minDate, setminDate] = useState("");
  const numbers = [1, 2, 3];
  const [selectedRow, setSelectedRow] = useState(null);
  const finisharray = ["Crispy", "Soft"];
  const [saveLoading, setSaveLoading] = useState(false);
  const [dateprintsec, setisdateprintsec] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onChange = (key) => {};
  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { subbatch, bmrnos2 } = state || {};
  const handleChange = (event) => {
    setsetilon_kn(event.target.value);
    const value = event.target.value;
    if (value === "OK") {
      setpersoftal("N/A");
    } else {
      setpersoftal("OK");
    }
  };
  const handleKeyDown = (e) => {
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
  const containerStyle = {
    position: "relative",
    marginLeft: isMobile ? "50px" : "60px",
  };
  const handleStartTimeBlur = () => {
    validateTimes(startTime, endTime);
  };
  const [getImage, setGetImage] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.supervisor_sign;
    if (username) {
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
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage(url);
        })
        .catch((err) => {});
    }
  }, [selectedRow?.supervisor_sign, API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.hod_sign;
    if (username) {
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
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage1(url);
        })
        .catch((err) => {});
    }
  }, [selectedRow?.hod_sign, API.prodUrl, token]);

  const [getImage2, setGetImage2] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.qa_sign;
    if (username) {
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
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage2(url);
        })
        .catch((err) => {});
    }
  }, [selectedRow?.qa_sign, API.prodUrl, token]);

  const validateTimes = (start, end) => {
    const startMoment = moment(start, "HH:mm");
    const endMoment = moment(end, "HH:mm");
    if (newDate === endDate) {
      if (startMoment.isSameOrAfter(endMoment)) {
        message.error("End time must be after start time.");
        setEndTime("");
      } else {
      }
    }
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // const roleBase = localStorage.getItem("role");
  // const roleauth = localStorage.getItem("role");
  const [rejectRemarks, setRejectRemarks] = useState("");

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Bleaching/Service/approveRejectF13`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);

        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-13/Summary");
      })
      .catch((err) => {
        setLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };
  const handleReject = async () => {
    setSaveLoading(true);

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
        `${API.prodUrl}/Precot/api/Bleaching/Service/approveRejectF13`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);

        message.success(res.data.message);
        navigate("/Precot/Bleaching/F-13/Summary");
      })
      .catch((err) => {
        setLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
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
  const handleChange_persoftal = (event) => {
    setpersoftal(event.target.value);
  };
  const handleDateChange = (e) => {
    const date = e.target.value;
    setNewDate(date);
  };

  const handleEndDateChange = (e) => {
    const date = e.target.value;
    setEndDate(date);
  };

  const handleStartTimeChange = (e) => {
    const currectstarttime = e.target.value;

    if (lastDateTime == newDate) {
      if (currectstarttime >= MinStartTime) {
        setStartTime(currectstarttime);
      } else {
        message.error(`Time cannot be before ${MinStartTime}`);
        setStartTime(null);
        return;
      }
    }

    setStartTime(currectstarttime);
  };
  const handleSubmit = async () => {
    if (timeCondition()) {
      Modal.confirm({
        title: "Confirm Submission",
        content:
          "The total water fill exceeds the total available minutes. Are you sure you want to proceed?",
        onOk: () => sendBleachingJobCard2(),
        onCancel: () => console.log("Submission cancelled"),
      });
    } else {
      try {
        sendBleachingJobCard2();
      } catch (error) {
        console.error("Error submitting bleaching job card:", error);
      }
    }
  };
  const handlePrint = () => {
    window.print();
  };

  const getMinutes = (time) => {
    if (!time) return 0;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const timeCondition = () => {
    const totalMinutes = getMinutes(endTime) - getMinutes(startTime);
    const totalWaterFill =
      Number(PW_waterFill) +
      Number(SB_waterFill) +
      Number(HW_waterFill) +
      Number(HW_waterFill2) +
      Number(NW_waterFill) +
      Number(FC_waterFill);

    if (totalWaterFill > totalMinutes) {
      return true;
    }
    return false;
  };

  const handleBlur_range19to29 = () => {
    if (timeCondition()) {
      message.error("Total water fill time exceeds available time");
      return;
    }

    // const numericValue = Number(value);
    if (PW_waterFill < 19 || PW_waterFill > 29) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 19 and 29 for Pre - Wetting"
      );
      setPW_waterFill("");
    }
  };
  const handle_rangeHW = () => {
    if (timeCondition()) {
      message.error("Total water fill time exceeds available time");
    }
    if (HW_waterFill < 19 || HW_waterFill > 29) {
      message.error("Please enter a number between 19 and 29 for Hot Wash 01");
      setHW_waterFill("");
    }
  };
  const handle_rangesetPW_Observation = () => {
    if (PW_Observation < 65 || PW_Observation > 75) {
      message.error(
        "Please enter a number between 65 and 75 in Pre - Wetting- Actual temperature during circulation  "
      );
      setPW_Observation("");
    }
  };
  const handle_rangesetSW_Observation = () => {
    if (SB_Observation < 105 || SB_Observation > 115) {
      message.error(
        "Please enter a number between 105 and 115 in Scouring & Bleaching  actual temperature during circulation  "
      );
      setSB_Observation("");
    }
  };
  const handle_rangesetHW_Observation = () => {
    if (HW_Observation < 90 || HW_Observation > 100) {
      message.error(
        "Please enter a number between 90 and 100 Hot Wash 01 actual during circulation  "
      );
      setHW_Observation("");
    }
  };
  const handle_rangesetHW2_Observation = () => {
    if (HW_Observation2 < 85 || HW_Observation2 > 95) {
      message.error(
        "Please enter a number between 85 and 95 Hot Wash 02 actual during circulation  "
      );
      setHW_Observation2("");
    }
  };
  const handle_rangesetNW_Observation = () => {
    if (NW_Observation < 65 || NW_Observation > 75) {
      message.error(
        "Please enter a number between 65 and 75 Neutralizing Wash a during circulation  "
      );
      setNW_Observation("");
    }
  };
  const handle_rangesetFinal = () => {
    if (FC_ciruclationPH < 5.5 || FC_ciruclationPH > 6.5) {
      message.error("Please enter a number between 5.5. and 6.5 pH actual  ");
      setFC_ciruclationPH("");
    }
  };
  const handle_surfacelevel = () => {
    if (FC_surfacePH < 0 || FC_surfacePH > 5) {
      message.error(
        "Please enter a number between 0. and 5 Surface Activity actual "
      );
      setFC_surfacePH("");
    }
  };
  const handle_rangeHW2 = () => {
    if (timeCondition()) {
      message.error("Total water fill time exceeds available time");
    }
    if (HW_waterFill2 < 19 || HW_waterFill2 > 29) {
      message.error("Please enter a number between 19 and 29 for Hot Wash 02");
      setHW_waterFill2("");
    }
  };
  const handleBlur_range80to120 = () => {
    if (timeCondition()) {
      message.error("Total water fill time exceeds available time");
    }
    // const numericValue = Number(value);
    if (SB_waterFill < 80 || SB_waterFill > 120) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 80 and 120 for Scouring & Bleaching"
      );
      setSB_waterFill("");
    }
  };
  const handleBlur_range28to42 = () => {
    // const numericValue = Number(value);
    if (CH_caustic < 28 || CH_caustic > 42) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 28 and 42 for Caustic soda Flakes"
      );
      setCH_caustic("");
    }
  };
  const handleBlur_range10to12 = () => {
    // const numericValue = Number(value);
    if (CH_haipaloene < 10 || CH_haipaloene > 12) {
      //alert("Please enter a number between 19 and 29");
      message.error("Please enter a number between 10 and 12 for Haipolene");
      setCH_haipaloene("");
    }
  };
  const handleBlur_range7to16 = () => {
    // const numericValue = Number(value);
    if (CH_sarofom < 7.0 || CH_sarofom > 16.0) {
      //alert("Please enter a number between 19 and 29");
      message.error("Please enter a number between 7.0 and 16.0 for Sarofom");
      setCH_sarofom("");
    }
  };
  const handleBlur_range50to70 = () => {
    // const numericValue = Number(value);
    if (CH_Hydrogen < 50 || CH_Hydrogen > 70) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 50 and 70 for Hydrogen peroxide"
      );
      setCH_Hydrogen("");
    }
  };
  const handleBlur_range1to3 = () => {
    // const numericValue = Number(value);
    if (CH_setilon < 1.5 || CH_setilon > 3.5) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 1.5 and 3.5 for Setilon KN / Persoftal 9490"
      );
      setCH_setilon("");
    }
  };
  const handleBlur_range6to9 = () => {
    // const numericValue = Number(value);
    if (CH_citric < 6 || CH_citric > 9) {
      //alert("Please enter a number between 19 and 29");
      message.error("Please enter a number between 6 and 9 for Citric acid");
      setCH_citric("");
    }
  };
  const handleBlur_range15to25 = () => {
    if (timeCondition()) {
      message.error("Total water fill time exceeds available time");
    }
    // const numericValue = Number(value);
    if (FC_waterFill < 15 || FC_waterFill > 25) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 15 and 25 for FinalCold Wash"
      );
      setFC_waterFill("");
    }
  };
  const handleBlur_range24to36 = () => {
    if (timeCondition()) {
      message.error("Total water fill time exceeds available time");
    }
    // const numericValue = Number(value);
    if (NW_waterFill < 24 || NW_waterFill > 36) {
      //alert("Please enter a number between 19 and 29");
      message.error(
        "Please enter a number between 24 and 36 for Neutralizing Wash"
      );
      setNW_waterFill("");
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

  const fetchDataBMRdetails = async () => {
    if (role == "ROLE_QA" || role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
      setDisable(true);
    }
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/Bleaching/Service/getBmrbatchNoDetails13?bmr_no=${bmrnos2}&batchNo=${subbatch}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setemptyarraycheck(res.data.length);

          if (res.data.length == 0) {
            if (role == "ROLE_QA") {
              message.warning("Supervisor yet To approve!");
              setTimeout(() => {
                navigate("/Precot/Bleaching/F-13/Summary");
              }, 1000);
              return;
            }
            if (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") {
              message.warning("Supervisor or QA Inspector yet to approve!");
              setTimeout(() => {
                navigate("/Precot/Bleaching/F-13/Summary");
              }, 1000);
              return;
            }
          } else {
            const data = res.data[0];
            if (
              role == "ROLE_QA" &&
              data.supervisor_status != "SUPERVISOR_APPROVED"
            ) {
              message.warning("Supervisor yet to approve!");
              setTimeout(() => {
                navigate("/Precot/Bleaching/F-13/Summary");
              }, 1000);
              return;
            }
            if (
              (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
              (data.supervisor_status != "SUPERVISOR_APPROVED" ||
                data.qa_status != "QA_APPROVED")
            ) {
              message.warning("Supervisor or QA Inspector yet to approve!");
              setTimeout(() => {
                navigate("/Precot/Bleaching/F-13/Summary");
              }, 1000);
              return;
            }

            statusFunction(res.data[0]);

            if (data.hod_submit_on) {
              const datePartsupervisor_submit_onvalue = data.hod_submit_on;
              const formattedHODSubmitted = moment(
                datePartsupervisor_submit_onvalue
              ).format("DD/MM/YYYY HH:mm");
              sethodsigndate(formattedHODSubmitted);
            } else {
              sethodsigndate("");
            }
            if (data.supervisor_submit_on) {
              const datePartsupervisor_submit_on = data.supervisor_submit_on;
              const formattedDatesupervisorSubmitted = moment(
                datePartsupervisor_submit_on
              ).format("DD/MM/YYYY HH:mm");
              setsupersigndate(formattedDatesupervisorSubmitted);
            } else {
              setsupersigndate("");
            }
            if (data.qa_submit_on) {
              const datePartsupervisor_submit_on = data.qa_submit_on;
              const formattedDatesupervisorSubmitted = moment(
                datePartsupervisor_submit_on
              ).format("DD/MM/YYYY HH:mm");
              setqa_signsignaturedate(formattedDatesupervisorSubmitted);
            } else {
              setqa_signsignaturedate("");
            }
          }

          if (res.data && res.data.length > 0) {
            setid(res.data[0].header_id);
            const select = res.data[0];
            printdata(res.data[0]);
            setSelectedRow(res.data[0]);
            setNewDate(select.date);
            setEndDate(select.end_date);
            setAvailableShiftslov(select.shift);
            setfinisharray(select.finish);
            setAvailableMAClov(select.mc_no);
            setBatchNolist(subbatch);
            setStartTime(select.start_time);
            setEndTime(select.end_time);
            setPW_waterFill(select.wetting);
            setSB_waterFill(select.scouring);
            setHW_waterFill(select.hotwash_one);
            setHW_waterFill2(select.hotwash_two);
            setNW_waterFill(select.newtralizing);
            setFC_waterFill(select.final_process);
            setCH_caustic(select.caustic_soda_flakes);
            setCH_haipaloene(select.haipolene);
            setCH_sarofom(select.sarofom);
            setCH_Hydrogen(select.hydrogen_peroxide);
            setCH_setilon(select.setilon_persoftal_actual);
            setCH_citric(select.citric_acid);
            setCH_remark(select.remarks);
            setPW_Observation(select.wetting_act_temp);
            setSB_Observation(select.scouring_act_temp);
            setHW_Observation(select.hotwash_one_act_temp);
            setHW_Observation2(select.hotwash_two_act_temp);
            setNW_Observation(select.newtralizing_act_temp);
            setFC_ciruclationPH(select.final_process_ph_temp);
            setFC_surfacePH(select.final_process_act_temp);
            setsetilon_kn(select.setilon_kn);
            setpersoftal(select.persoftal);
            // setFC_surfacePH(select.setilon_persoftal_actual);
            setmail_status(select.mail_status);
            setsupervisor_status(select.supervisor_status);
            setsupervisor_saved_on(select.supervisor_saved_on);
            setssupervisor_saved_by(select.supervisor_saved_by);
            setssupervisor_saved_id(select.supervisor_saved_id);
            setsupervisor_submit_on(select.supervisor_submit_on);
            setsupervisor_submit_by(select.supervisor_submit_by);
            setsupervisor_submit_id(select.supervisor_submit_id);
            setsupervisor_sign(select.supervisor_sign);
            sethod_status(select.hod_status);
            sethod_saved_on(select.hod_saved_on);
            sethod_saved_by(select.hod_saved_by);
            sethod_saved_id(select.hod_saved_id);
            sethod_submit_on(select.hod_submit_on);
            sethod_submit_by(select.hod_submit_by);
            sethod_submit_id(select.hod_submit_id);
            sethod_sign(select.hod_sign);
            setqa_status(select.qa_status);
            setqa_saved_on(select.qa_saved_on);
            setqa_saved_by(select.qa_saved_by);
            setqa_saved_id(select.qa_saved_id);
            setqa_submit_on(select.qa_submit_on);
            setqa_submit_by(select.qa_submit_by);
            setqa_submit_id(select.qa_submit_id);
            setqa_sign(select.setqa_sign);
            const formattedHODSubmitteddate = moment(select.date).format(
              "DD/MM/YYYY"
            );
            setisdateprintsec(formattedHODSubmitteddate);

            const data = res.data[0];
          } else {
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [disable, saveBtnStatus, submitBtnStatus]);

  const statusFunction = (responseData) => {
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "SUPERVISOR_APPROVED"
    ) {
      setSaveBtnStatus(true);
    }
    if (
      role == "ROLE_SUPERVISOR" &&
      responseData.supervisor_status == "SUPERVISOR_APPROVED" &&
      (responseData.qa_status == "QA_APPROVED" ||
        responseData.qa_status == "WAITING_FOR_APPROVAL") &&
      (responseData.hod_status == "HOD_APPROVED" ||
        responseData.hod_status == "WAITING_FOR_APPROVAL" ||
        responseData.hod_status == "")
    ) {
      setSaveBtnStatus(true);
      setSubmitBtnStatus(true);
      setDisable(true);
    }
    if (role == "ROLE_QA" && responseData.hod_status == "HOD_REJECTED") {
      message.warning("Supervisor Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/Bleaching/F-13/Summary");
      }, 1000);
      setSaveBtnStatus(true);
      setSubmitBtnStatus(true);
    }
    if (
      role == "ROLE_QA" &&
      responseData.qa_status == "QA_APPROVED" &&
      (responseData.hod_status == "HOD_APPROVED" ||
        responseData.hod_status == "WAITING_FOR_APPROVAL")
    ) {
      setSaveBtnStatus(true);
      setSubmitBtnStatus(true);
    }
    if (role == "ROLE_QA" && responseData.qa_status == "QA_REJECTED") {
      message.warning("Supervisor Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/Bleaching/F-13/Summary");
      }, 1000);
      setSaveBtnStatus(true);
      setSubmitBtnStatus(true);
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.qa_status == "WAITING_FOR_APPROVAL"
    ) {
      message.warning("QA Inspector Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/Bleaching/F-13/Summary");
      }, 1000);
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.hod_status == "HOD_APPROVED"
    ) {
      setSaveBtnStatus(true);
      setSubmitBtnStatus(true);
    }
    if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      responseData.hod_status == "HOD_REJECTED"
    ) {
      message.warning("Supervisor Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/Bleaching/F-13/Summary");
      }, 1000);
      setSaveBtnStatus(true);
      setSubmitBtnStatus(true);
    }
  };

  const fetchDatabatchByBleach = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `${API.prodUrl}/Precot/api/bleaching/summary/batchByBleach?bmr_no=${bmrnos2}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
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
    navigate("/Precot/Bleaching/F-13/Summary");
  };

  const sendBleachingJobCard = () => {
    const isValid = () => {
      // if (!id) return "Header ID is required";
      if (!newDate) return "Date is required";
      if (!batchNolist) return "Batch No is required";
      // if (!bmrnos2) return "BMR No is required";
      if (!availableshiftlov) return "Shift is required";
      if (!finisharraylist) return "Finish is required";
      if (!availablemclov) return "MC No is required";

      if (!startTime) return "Start Time is required";
      if (!endTime) return "End Time is required";

      // if (!PW_waterFill) return "Wetting is required";
      // if (!SB_waterFill) return "Scouring is required";
      // if (!HW_waterFill) return "Hotwash One is required";
      // if (!HW_waterFill2) return "Hotwash Two is required";
      // if (!NW_waterFill) return "Neutralizing is required";
      // if (!FC_waterFill) return "Final Process is required";
      // if (!CH_caustic) return "Caustic Soda Flakes are required";
      // if (!CH_haipaloene) return "Haipolene is required";
      // if (!CH_sarofom) return "Sarofom is required";
      // if (!CH_Hydrogen) return "Hydrogen Peroxide is required";
      // if (!CH_setilon) return "Setilon Persoftal Actual is required";
      // if (!CH_citric) return "Citric Acid is required";
      // // if (!CH_remark) return "Remarks are required";
      // if (!PW_Observation) return "Wetting Act Temp is required";
      // if (!SB_Observation) return "Scouring Act Temp is required";
      // if (!HW_Observation) return "Hotwash One Act Temp is required";
      // if (!HW_Observation2) return "Hotwash Two Act Temp is required";
      // if (!NW_Observation) return "Neutralizing Act Temp is required";
      // if (!FC_ciruclationPH) return "Final Process PH Temp is required";
      // if (!FC_surfacePH) return "Final Process Act Temp is required";
      // if (!INcharge_sign) return "Shift Sign is required";
      // if (!INcharge_Date) return "Shift Date is required";
      // if (!HOD_sign) return "Department Sign is required";
      // if (!HOD_date) return "Department Date is required";
      // if (!QA_date) return "QA Date is required";
      // if (!QA_sign) return "QA Sign is required";
      // if (!persoftal) return "Persoftal is required";
      // if (!setilon_kn) return "Setilon KN is required";
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
      formatName: "Bleaching Job Card",
      formatNo: "PRD-(R-01)-F-13",
      revision_no: "",
      ref_sop_no: "",
      bmr_no: bmrnos2,
      date: newDate,
      end_date: endDate,
      shift: availableshiftlov,
      finish: finisharraylist,
      mc_no: availablemclov,
      sub_batch_no: subbatch,
      start_time: startTime,
      end_time: endTime,

      wetting: PW_waterFill,
      scouring: SB_waterFill,
      hotwash_one: HW_waterFill,
      hotwash_two: HW_waterFill2,
      newtralizing: NW_waterFill,
      final_process: FC_waterFill,

      wetting_act_temp: PW_Observation,
      scouring_act_temp: SB_Observation,
      hotwash_one_act_temp: HW_Observation,
      hotwash_two_act_temp: HW_Observation2,
      newtralizing_act_temp: NW_Observation,
      final_process_ph_temp: FC_ciruclationPH,
      final_process_act_temp: FC_surfacePH,

      caustic_soda_flakes: CH_caustic,
      haipolene: CH_haipaloene,
      sarofom: CH_sarofom,
      hydrogen_peroxide: CH_Hydrogen,
      persoftal: persoftal,
      setilon_kn: setilon_kn,
      setilon_persoftal_actual: CH_setilon,
      citric_acid: CH_citric,

      remarks: remarkToSave,

      mail_status: mail_status,
      supervisor_status: supervisor_status,
      supervisor_saved_on: supervisor_saved_on,
      supervisor_saved_by: supervisor_saved_by,
      supervisor_saved_id: supervisor_saved_id,
      supervisor_submit_on: supervisor_submit_on,
      supervisor_submit_by: supervisor_submit_by,
      supervisor_submit_id: supervisor_submit_id,
      supervisor_sign: supervisor_sign,
      hod_status: hod_status,
      hod_saved_on: hod_saved_on,
      hod_saved_by: hod_saved_by,
      hod_saved_id: hod_saved_id,
      hod_submit_on: hod_submit_on,
      hod_submit_by: hod_submit_by,
      hod_submit_id: hod_submit_id,
      hod_sign: hod_sign,
      qa_status: qa_status,
      qa_saved_on: qa_saved_on,
      qa_saved_by: qa_saved_by,
      qa_saved_id: qa_saved_id,
      qa_submit_on: qa_submit_on,
      qa_submit_by: qa_submit_by,
      qa_submit_id: qa_submit_id,
      qa_sign: qa_sign,
    };

    // Make the POST request to the API endpoint
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(
        `${API.prodUrl}/Precot/api/Bleaching/Service/saveBleachingJobCardF13`,
        payload,
        { headers }
      )
      .then((res) => {
        setSaveLoading(false);
        message.success("BLEACHING JOB CARD  Saved successfully");
        fetchDataBMRdetails();

        navigate("/Precot/Bleaching/F-13/Summary");
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
      sendBleachingJobCard();
      // alert("Bleaching job card Saved successfully!");
      //  message.success("Bleaching job card Saved successfully!");
    } catch (error) {
      console.error("Error submitting bleaching job card:", error);
    }
  };

  //SAve API
  const sendBleachingJobCard2 = () => {
    const requiredFields = [
      { field: newDate, message: "Start Date is required" },
      { field: endDate, message: "End Date is required" },
      { field: availableshiftlov, message: "Shift is required" },
      { field: finisharraylist, message: "Finish is required" },
      { field: availablemclov, message: "MC No is required" },
      { field: batchNolist, message: "Batch No is required" },
      { field: subbatch, message: "Sub Batch No is required" },
      { field: startTime, message: "Start Time is required" },
      { field: endTime, message: "End Time is required" },
      { field: PW_waterFill, message: "Wetting is required" },
      { field: SB_waterFill, message: "Scouring is required" },
      { field: HW_waterFill, message: "Hotwash One is required" },
      { field: HW_waterFill2, message: "Hotwash Two is required" },
      { field: NW_waterFill, message: "Neutralizing is required" },
      { field: FC_waterFill, message: "Final Process is required" },
      { field: CH_caustic, message: "Caustic Soda Flakes are required" },
      { field: CH_haipaloene, message: "Haipolene is required" },
      { field: CH_sarofom, message: "Sarofom is required" },
      { field: CH_Hydrogen, message: "Hydrogen Peroxide is required" },
      { field: CH_setilon, message: "Setilon Persoftal Actual is required" },
      { field: CH_citric, message: "Citric Acid is required" },
      { field: PW_Observation, message: "Wetting Act Temp is required" },
      { field: SB_Observation, message: "Scouring Act Temp is required" },
      { field: HW_Observation, message: "Hotwash One Act Temp is required" },
      { field: HW_Observation2, message: "Hotwash Two Act Temp is required" },
      { field: NW_Observation, message: "Neutralizing Act Temp is required" },
      { field: FC_ciruclationPH, message: "Final Process PH Temp is required" },
      { field: FC_surfacePH, message: "Final Process Act Temp is required" },
    ];

    const validationMessages = requiredFields
      .filter(({ field }) => !field)
      .map(({ message }) => message);

    if (validationMessages.length > 0) {
      validationMessages.forEach((msg) => message.warning(msg));
      return; // Stop execution if any field is invalid
    }

    // if (!remarkToSave || remarkToSave.trim() === "") {
    //   message.warning("Remarks are required");
    //   return;
    // }
    // const isValid = () => {
    //   // if (!id) return "Header ID is required";
    //   if (!newDate) return "Date is required";
    //   // if (!bmrnos2) return "BMR No is required";
    //   if (!availableshiftlov) return "Shift is required";
    //   if (!finisharraylist) return "Finish is required";
    //   if (!availablemclov) return "MC No is required";
    //   if (!batchNolist) return "Batch No is required";
    //   if (!startTime) return "Start Time is required";
    //   if (!endTime) return "End Time is required";
    //   if (!PW_waterFill) return "Wetting is required";
    //   if (!SB_waterFill) return "Scouring is required";
    //   if (!HW_waterFill) return "Hotwash One is required";
    //   if (!HW_waterFill2) return "Hotwash Two is required";
    //   if (!NW_waterFill) return "Neutralizing is required";
    //   if (!FC_waterFill) return "Final Process is required";
    //   if (!CH_caustic) return "Caustic Soda Flakes are required";
    //   if (!CH_haipaloene) return "Haipolene is required";
    //   if (!CH_sarofom) return "Sarofom is required";
    //   if (!CH_Hydrogen) return "Hydrogen Peroxide is required";
    //   if (!CH_setilon) return "Setilon Persoftal Actual is required";
    //   if (!CH_citric) return "Citric Acid is required";
    //   // if (!CH_remark) return "Remarks are required";
    //   if (!PW_Observation) return "Wetting Act Temp is required";
    //   if (!SB_Observation) return "Scouring Act Temp is required";
    //   if (!HW_Observation) return "Hotwash One Act Temp is required";
    //   if (!HW_Observation2) return "Hotwash Two Act Temp is required";
    //   if (!NW_Observation) return "Neutralizing Act Temp is required";
    //   if (!FC_ciruclationPH) return "Final Process PH Temp is required";
    //   if (!FC_surfacePH) return "Final Process Act Temp is required";
    //   // if (!INcharge_sign) return "Shift Sign is required";
    //   // if (!INcharge_Date) return "Shift Date is required";
    //   // if (!HOD_sign) return "Department Sign is required";
    //   // if (!HOD_date) return "Department Date is required";
    //   // if (!QA_date) return "QA Date is required";
    //   // if (!QA_sign) return "QA Sign is required";
    //   // if (!persoftal) return "Persoftal is required";
    //   // if (!setilon_kn) return "Setilon KN is required";
    //   return null;
    // };
    // const validationMessage = isValid();
    // if (validationMessage) {
    //   message.error(validationMessage);
    //   return;
    // }
    setSaveLoading(true);
    const remarkToSave = CH_remark.trim() === "" ? "N/A" : CH_remark;
    // Format the payload according to the API documentation
    const payload = {
      header_id: id,
      unit: "Unit H",
      formatName: "Bleaching Job Card",
      formatNo: "PRD01/F-42",
      revision_no: "",
      ref_sop_no: "",
      bmr_no: bmrnos2,
      date: newDate,
      end_date: endDate,
      shift: availableshiftlov,
      finish: finisharraylist,
      mc_no: availablemclov,
      sub_batch_no: subbatch,
      start_time: startTime,
      end_time: endTime,

      wetting: PW_waterFill,
      scouring: SB_waterFill,
      hotwash_one: HW_waterFill,
      hotwash_two: HW_waterFill2,
      newtralizing: NW_waterFill,
      final_process: FC_waterFill,

      wetting_act_temp: PW_Observation,
      scouring_act_temp: SB_Observation,
      hotwash_one_act_temp: HW_Observation,
      hotwash_two_act_temp: HW_Observation2,
      newtralizing_act_temp: NW_Observation,
      final_process_ph_temp: FC_ciruclationPH,
      final_process_act_temp: FC_surfacePH,

      caustic_soda_flakes: CH_caustic,
      haipolene: CH_haipaloene,
      sarofom: CH_sarofom,
      hydrogen_peroxide: CH_Hydrogen,
      persoftal: persoftal,
      setilon_kn: setilon_kn,
      setilon_persoftal_actual: CH_setilon,
      citric_acid: CH_citric,

      remarks: remarkToSave,

      mail_status: mail_status,
      supervisor_status: supervisor_status,
      supervisor_saved_on: supervisor_saved_on,
      supervisor_saved_by: supervisor_saved_by,
      supervisor_saved_id: supervisor_saved_id,
      supervisor_submit_on: supervisor_submit_on,
      supervisor_submit_by: supervisor_submit_by,
      supervisor_submit_id: supervisor_submit_id,
      supervisor_sign: supervisor_sign,
      hod_status: hod_status,
      hod_saved_on: hod_saved_on,
      hod_saved_by: hod_saved_by,
      hod_saved_id: hod_saved_id,
      hod_submit_on: hod_submit_on,
      hod_submit_by: hod_submit_by,
      hod_submit_id: hod_submit_id,
      hod_sign: hod_sign,
      qa_status: qa_status,
      qa_saved_on: qa_saved_on,
      qa_saved_by: qa_saved_by,
      qa_saved_id: qa_saved_id,
      qa_submit_on: qa_submit_on,
      qa_submit_by: qa_submit_by,
      qa_submit_id: qa_submit_id,
      qa_sign: qa_sign,
    };

    // Make the POST request to the API endpoint
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(
        `${API.prodUrl}/Precot/api/Bleaching/Service/submitBleachingJobCardF13`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("BLEACHING JOB CARD Submitted successfully");

        fetchDataBMRdetails();

        navigate("/Precot/Bleaching/F-13/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const [lastDateTime, setLastDateTime] = useState("");
  const [MinStartTime, setminStartTime] = useState("");
  const [rows, setRows] = useState({});
  useEffect(() => {
    const getLastDate = async () => {
      try {
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Bleaching/Service/getLastSubbatchNo13`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedDate = response.data[0].DATE;
        const fetchedStartTime = response.data[0].START_TIME;
        setLastDateTime(fetchedDate);
        setminStartTime(fetchedStartTime);
        setminDate(new Date(fetchedDate));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getLastDate();
  }, []);

  const roleBase = localStorage.getItem("role");
  useEffect(() => {
    fetchDataLOV_BMRNO();
    setAvailableMachineLov(numbers);
    fetchDatabatchByBleach();
    setfinishLOV(finisharray);
    fetchDataBMRdetails();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial window size
    const roleBase = localStorage.getItem("role");
    const roleauth = localStorage.getItem("role");
    axios
      .get(`${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const shifts = res.data.map((shift) => shift.value);
        setAvailableShifts(shifts);
      });
    if (roleBase == "SHIFT IN-CHARGE") {
      setsupervisor(true);
      sethodIncharge(true);
      setshiftInchargeFlag(false);
    } else if (roleBase == "HOD") {
      setsupervisor(true);
      sethodIncharge(false);
      setshiftInchargeFlag(true);
    } else if (roleBase == "QA") {
      setsupervisor(false);
      sethodIncharge(true);
      setshiftInchargeFlag(true);
    } else if (roleBase == "OPERATOR") {
      setsupervisor(true);
      sethodIncharge(true);
      setshiftInchargeFlag(true);
    }
  }, []);

  // const role = localStorage.getItem("role");
  const items = [
    {
      key: "1",
      label: <p>Activity Form - 1</p>,
      children: (
        <div style={{ width: "100%" }}>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid #0000",
              padding: "5px",
            }}
          >
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
                Steps
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
                yibuoio
              >
                <input
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                  type="number"
                  className="inp-new"
                  value={PW_waterFill}
                  onBlur={handleBlur_range19to29}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setPW_waterFill(e.target.value)}
                />
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
                <input
                  value={PW_Observation}
                  onBlur={handle_rangesetPW_Observation}
                  onChange={(e) => setPW_Observation(e.target.value)}
                  className="inp-new"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 35,
                    height: 12,
                    border: "none",
                    borderBottom: "1px solid",
                  }}
                  disabled={disable}
                />
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
                <input
                  className="inp-new"
                  value={SB_waterFill}
                  onChange={(e) => setSB_waterFill(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                  onBlur={handleBlur_range80to120}
                />
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
                <input
                  className="inp-new"
                  value={SB_Observation}
                  onBlur={handle_rangesetSW_Observation}
                  onChange={(e) => setSB_Observation(e.target.value)}
                  disabled={disable}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 35,
                    height: 12,
                    border: "none",
                    borderBottom: "1px solid",
                  }}
                />
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
                <input
                  className="inp-new"
                  value={HW_waterFill}
                  onChange={(e) => setHW_waterFill(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                  onBlur={handle_rangeHW}
                />
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
                <input
                  className="inp-new"
                  onBlur={handle_rangesetHW_Observation}
                  value={HW_Observation}
                  onChange={(e) => setHW_Observation(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 35,
                    height: 12,
                    border: "none",
                    borderBottom: "1px solid",
                  }}
                  disabled={disable}
                />
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
                <input
                  className="inp-new"
                  value={HW_waterFill2}
                  onChange={(e) => setHW_waterFill2(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                  onBlur={handle_rangeHW2}
                />
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
                <input
                  className="inp-new"
                  value={HW_Observation2}
                  onChange={(e) => setHW_Observation2(e.target.value)}
                  onBlur={handle_rangesetHW2_Observation}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 35,
                    height: 12,
                    border: "none",
                    borderBottom: "1px solid",
                  }}
                  disabled={disable}
                />
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
                Citric Acid, Sarofom, Setilon KN or Persoftal 9490 (for Crispy
                finish Only)
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
                <input
                  className="inp-new"
                  value={NW_waterFill}
                  onChange={(e) => setNW_waterFill(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                  onBlur={handleBlur_range24to36}
                />
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
                <input
                  value={NW_Observation}
                  onBlur={handle_rangesetNW_Observation}
                  onChange={(e) => setNW_Observation(e.target.value)}
                  className="inp-new"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 35,
                    height: 12,
                    border: "none",
                    borderBottom: "1px solid",
                  }}
                  disabled={disable}
                />
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
                Final/ Cold Wash{" "}
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
                <input
                  className="inp-new"
                  value={FC_waterFill}
                  onChange={(e) => setFC_waterFill(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                  onBlur={handleBlur_range15to25}
                />
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
                  <input
                    className="inp-new"
                    onBlur={handle_rangesetFinal}
                    value={FC_ciruclationPH}
                    onChange={(e) => setFC_ciruclationPH(e.target.value)}
                    style={{
                      padding: 0,
                      margin: 0,
                      width: 35,
                      height: 12,
                      border: "none",
                      borderBottom: "1px solid",
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                      selectedRow?.hod_status === "HOD_APPROVED" ||
                      roleBase === "ROLE_QA" ||
                      (roleBase === "ROLE_QA" &&
                        (selectedRow?.qa_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.qa_status === "" ||
                          selectedRow?.qa_status === "HOD_APPROVED" ||
                          selectedRow?.qa_status === "QA_REJECTED")) ||
                      (roleBase === "ROLE_HOD" &&
                        (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED")) ||
                      (roleBase === "ROLE_DESIGNEE" &&
                        (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />{" "}
                </span>
                <div> Surface Activity actual:</div>
                <span style={{ textAlign: "center" }}>
                  <input
                    className="inp-new"
                    value={FC_surfacePH}
                    onBlur={handle_surfacelevel}
                    onChange={(e) => setFC_surfacePH(e.target.value)}
                    style={{
                      padding: 0,
                      margin: 0,
                      width: 35,
                      height: 12,
                      border: "none",
                      borderBottom: "1px solid",
                    }}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                      selectedRow?.hod_status === "HOD_APPROVED" ||
                      roleBase === "ROLE_QA" ||
                      (roleBase === "ROLE_QA" &&
                        (selectedRow?.qa_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.qa_status === "" ||
                          selectedRow?.qa_status === "HOD_APPROVED" ||
                          selectedRow?.qa_status === "QA_REJECTED")) ||
                      (roleBase === "ROLE_HOD" &&
                        (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED")) ||
                      (roleBase === "ROLE_DESIGNEE" &&
                        (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  />
                </span>
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
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Chemical Consumption Details / Batch</p>,
      children: (
        <div style={{ width: "100%" }}>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tr
              style={{
                fontSize: "14px",
                padding: "4px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <td>
                Chemical Consumption details (Batch Weight range 1250 ± 50 Kg)
              </td>
            </tr>
          </table>
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
                <b style={{ fontSize: "11px" }}> Standards</b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}> Actual</b>
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
                <input
                  className="inp-new"
                  value={CH_caustic}
                  onChange={(e) => setCH_caustic(e.target.value)}
                  style={{
                    padding: 0,
                    fontSize: "14px",
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                  onBlur={handleBlur_range28to42}
                />
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
                <input
                  className="inp-new"
                  value={CH_haipaloene}
                  onChange={(e) => setCH_haipaloene(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    fontSize: "14px",
                    border: "none",
                  }}
                  disabled={disable}
                  onBlur={handleBlur_range10to12}
                />
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
                <p style={{ fontSize: "11px" }}>Sarofom</p>
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
                <input
                  className="inp-new"
                  value={CH_sarofom}
                  onChange={(e) => setCH_sarofom(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                  onBlur={handleBlur_range7to16}
                />
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
                <input
                  className="inp-new"
                  value={CH_Hydrogen}
                  onChange={(e) => setCH_Hydrogen(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                  onBlur={handleBlur_range50to70}
                />
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
                  <p style={{ fontSize: "11px" }}>Setilon KN /Persoftal 9490</p>
                  <Radio.Group
                    onChange={handleChange}
                    value={setilon_kn}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                      selectedRow?.hod_status === "HOD_APPROVED" ||
                      roleBase === "ROLE_QA" ||
                      (roleBase === "ROLE_QA" &&
                        (selectedRow?.qa_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.qa_status === "" ||
                          selectedRow?.qa_status === "HOD_APPROVED" ||
                          selectedRow?.qa_status === "QA_REJECTED")) ||
                      (roleBase === "ROLE_HOD" &&
                        (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED")) ||
                      (roleBase === "ROLE_DESIGNEE" &&
                        (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  >
                    <Radio value="OK">OK</Radio>
                    <Radio value="N/A">NA</Radio>
                  </Radio.Group>{" "}
                </div>

                <div>
                  {" "}
                  <p style={{ fontSize: "11px" }}> Persoftal 9490</p>
                  <Radio.Group
                    onChange={handleChange_persoftal}
                    value={persoftal}
                    disabled={
                      (roleBase === "ROLE_SUPERVISOR" &&
                        selectedRow?.supervisor_status ===
                          "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                      selectedRow?.hod_status === "HOD_APPROVED" ||
                      roleBase === "ROLE_QA" ||
                      (roleBase === "ROLE_QA" &&
                        (selectedRow?.qa_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.qa_status === "" ||
                          selectedRow?.qa_status === "HOD_APPROVED" ||
                          selectedRow?.qa_status === "QA_REJECTED")) ||
                      (roleBase === "ROLE_HOD" &&
                        (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED")) ||
                      (roleBase === "ROLE_DESIGNEE" &&
                        (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  >
                    <Radio value="OK">OK</Radio>
                    <Radio value="N/A">NA</Radio>
                  </Radio.Group>
                </div>
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
                <input
                  className="inp-new"
                  value={CH_setilon}
                  onChange={(e) => setCH_setilon(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                  onBlur={handleBlur_range1to3}
                />
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
                <p style={{ fontSize: "11px" }}> Citric acid</p>
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
                <input
                  className="inp-new"
                  value={CH_citric}
                  onChange={(e) => setCH_citric(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 12,
                    border: "none",
                  }}
                  disabled={disable}
                  onBlur={handleBlur_range6to9}
                />
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
          </table>

          <table style={{ width: "100%", marginTop: "10px" }}>
            <tr>
              <td colSpan="4">
                <b style={{ fontSize: "11px" }}>
                  Note: Setilon KN or Persoftal 9490 chemicals should be added
                  only for Crispy finish.
                </b>
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                Remarks:
                <textarea
                  value={CH_remark}
                  onChange={(e) => setCH_remark(e.target.value)}
                  style={{
                    margin: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    padding: "1em 0em 1em 0em",
                  }}
                  disabled={disable}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },

    {
      key: "3",
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
                <b style={{ fontSize: "11px" }}>Production Supervisor </b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}>Verified By QA</b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                }}
              >
                <b style={{ fontSize: "11px" }}> HOD / Designees</b>
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
                  height: "40px",
                }}
              >
                {selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && (
                  <>
                    <div>{selectedRow.supervisor_sign}</div>
                    <div>{supersigndate}</div>
                    {/* <div>Signature & Date</div> */}
                    {getImage !== "" && (
                      <img
                        className="signature"
                        src={getImage}
                        alt="Supervisor"
                      />
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
                  height: "40px",
                  textAlign: "center",
                }}
              >
                {selectedRow?.qa_status != "WAITING_FOR_APPROVAL" &&
                  selectedRow?.qa_status != "" && (
                    <>
                      <div>{selectedRow?.qa_sign}</div>
                      <div>{qa_signsignaturedate}</div>
                      {getImage2 !== "" && (
                        <img className="signature" src={getImage2} alt="QA" />
                      )}
                      {/* <span style={{ fontSize: '11px', marginLeft: "0px" }}>Signature & Date</span> */}
                    </>
                  )}
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  height: "40px",
                  textAlign: "center",
                }}
              >
                {selectedRow?.hod_status != "WAITING_FOR_APPROVAL" &&
                  selectedRow?.hod_status != "" && (
                    <>
                      <div>{selectedRow?.hod_sign}</div>
                      <div>{hodsign}</div>
                      {getImage1 !== "" && (
                        <img className="signature" src={getImage1} alt="HOD" />
                      )}
                      {/* <span style={{ fontSize: '11px', marginLeft: "0px" }}>Signature & Date</span> */}
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
            role === "ROLE_QA" || roleBase === "ROLE_QA"
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

      {/* <BleachingHeader
        unit="Unit-H"
        formName="BLEACHING JOB CARD"
        formatNo="PH-PRD01/F-007"
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
        formName="BLEACHING JOB CARD"
        formatNo="PH-PRD01/F-007"
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
                  display: submitBtnStatus ? "none" : "block",
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
                  display: submitBtnStatus ? "none" : "block",
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
                type="primary"
                loading={saveLoading}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: saveBtnStatus ? "none" : "block",
                }}
                onClick={handleSave}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                type="primary"
                loading={saveLoading}
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: submitBtnStatus ? "none" : "block",
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
            // onClick={handleLogout}
            onClick={() => {
              if (confirm("Are you sure want to logout")) {
                localStorage.removeItem("token");
                navigate("/Precot");
              }
            }}
          >
            Logout
          </Button>,

          // <Button
          //   type="primary"
          //   style={{
          //     backgroundColor: "#E5EEF9",
          //     color: "#00308F",
          //     fontWeight: "bold",
          //     display: canDisplayPrint()
          //     // display: submitBtnStatus ? "block" : "none",
          //   }}
          //   icon={<FaPrint  color="#00308F" />}
          //   onClick={handlePrint}
          // >
          //   Print
          // </Button>
          // ,

          // roleBase !== "ROLE_SUPERVISOR" &&   selectedRow?.supervisor_status!=="SUPERVISOR_SAVED" &&  selectedRow?.supervisor_status!=="SUPERVISOR_APPROVED"&&selectedRow?.supervisor_status!=="HOD_SAVED" &&  selectedRow?.supervisor_status!=="HOD_APPROVED"&&(
          //   <div style={{color:"white",backgroundColor:"red",borderRadius:"3px",padding:"2px"}}>{bmrnos2}-BMR not yet Saved</div>
          // ),
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
      <div id="section-to-print" style={{ padding: "5px" }}>
        <br />
        <br />
        <table
          className="laydownchecklist"
          style={{
            fontSize: "11px",
            padding: "5px",
            marginBottom: "6px",
            width: "90%",
          }}
        >
          <tr>
            <td colSpan="4" rowSpan="4" style={{ textAlign: "center" }}>
              <div>
                {" "}
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "40px", height: "20px" }}
                />
              </div>
              <br></br>
              <div>Unit H</div>
            </td>
            <td colSpan="7" rowSpan="4" style={{ textAlign: "center" }}>
              Bleaching Job Card
            </td>
            <td colSpan="3">Format No.:</td>
            <td colSpan="4">PH-PRD01/F-007</td>
          </tr>
          <tr>
            <td colSpan="3">Revision No.:</td>
            <td colSpan="4">01</td>
          </tr>
          <tr>
            <td colSpan="3">Ref. SOP No.:</td>
            <td colSpan="4">PRD01-D-12</td>
          </tr>
          <tr>
            <td colSpan="3">Page No.:</td>
            <td colSpan="4">1 of 1</td>
          </tr>
        </table>
        <br />

        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid #0000",
            padding: "5px",
            width: "90%",
          }}
        >
          <tr>
            <td colSpan="2">BMR No.</td>
            <td colSpan="4">{print && print.bmr_no}</td>
            <td colSpan="3">M/c No</td>
            <td colSpan="3">{print && print.mc_no}</td>
          </tr>
          <tr>
            <td colSpan="2">Date</td>
            <td colSpan="4">{dateprintsec}</td>
            <td colSpan="3"> Sub Batch No</td>
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
              Steps
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
              Water Filling and level maintaining, Temperature raising to 70 ℃,
              Circulation @ 70 +/- 5 ℃ and Draining
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
              Scouring & Bleaching
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
              Water Filling and level maintaining, Temperature raising to 60 ℃,
              Chemical transferring, Temperature raising to 110 ℃, Circulation @
              110 +/- 5 ℃ and Draining
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
              Water Filling and level maintaining, Temperature raising to 95 ℃,
              Circulation @ 95 +/- 5 ℃ and Draining
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
              Water Filling and level maintaining, Temperature raising to 90 ℃,
              Circulation @ 90 +/- 5 ℃ and Draining
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
              Citric Acid, Sarofom, Setilon KN or Persoftal 9490 (for Crispy
              finish Only)
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
              Temperature raising to 70 ℃, Circulation @ 70 +/- 5 ℃ and Draining
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
              Final/Cold Wash{" "}
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
              <span style={{ textAlign: "center" }}>
                {" "}
                {print && print.newtralizing_act_temp}
              </span>
              pH actual:
              <span style={{ textAlign: "center" }}>
                {" "}
                {print && print.final_process_ph_temp}
                {"(Std. 5.5 - 6.5)"}{" "}
              </span>
              <div> Surface Activity actual:</div>
              <span style={{ textAlign: "center" }}>
                {" "}
                {print && print.final_process_act_temp}
                {"(Std. < 5 Sec.)"}
              </span>
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
        </table>

        <br />

        <table style={{ marginTop: "2%", width: "90%" }}>
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

        <br />

        <table style={{ width: "90%" }}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <tr>
            <td colSpan="4" rowSpan="4" style={{ textAlign: "center" }}>
              <div>
                {" "}
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "40px", height: "20px" }}
                />
              </div>
              <div>Unit H</div>
            </td>
            <td colSpan="7" rowSpan="4" style={{ textAlign: "center" }}>
              BLEACHING JOB CARD
            </td>
            <td colSpan="3">Format No.:</td>
            <td colSpan="4">PH-PRD01/F-007</td>
          </tr>
          <tr>
            <td colSpan="3">Revision No.:</td>
            <td colSpan="4">01</td>
          </tr>
          <tr>
            <td colSpan="3">Ref. SOP No.:</td>
            <td colSpan="4">PRD01-D-12</td>
          </tr>
          <tr>
            <td colSpan="3">Page No.:</td>
            <td colSpan="4"> 2 of 2</td>
          </tr>
        </table>
        <br />

        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid black",
            width: "100%",
            marginTop: "10px",
            width: "90%",
          }}
        >
          <tr
            style={{
              fontSize: "14px",
              padding: "4px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <td>
              Chemical Consumption details (Batch Weight range 1250 ± 50 Kg)
            </td>
          </tr>
        </table>
        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid black",
            width: "90%",
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
              <b style={{ fontSize: "11px" }}> Standards</b>
            </td>
            <td
              colSpan="1"
              style={{
                border: "1px solid",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <b style={{ fontSize: "11px" }}> Actual</b>
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
              <p style={{ fontSize: "11px" }}> Caustic soda Flakes</p>
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
                <p style={{ fontSize: "11px" }}>
                  <div>Setilon KN : {print && print.setilon_kn}</div>
                  <div>Persoftal 9490 : {print && print.persoftal}</div>
                </p>
              </div>
              {/* <div>     <p style={{fontSize:"11px"}}>  Persoftal 9490</p>
                 
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
              {print && print.setilon_persoftal_actual}
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
        </table>
        <table style={{ width: "90%", marginTop: "10px" }}>
          <tr>
            <td colSpan="4">
              {" "}
              Remarks:
              {print && print.remarks}
            </td>
          </tr>
          <tr>
            <td colSpan="4">
              <b style={{ fontSize: "11px" }}>
                Note: Setilon KN or Persoftal 9490 chemicals should be added
                only for Crispy finish.
              </b>
            </td>
          </tr>
        </table>
        <table
          style={{
            borderCollapse: "collapse",
            border: "1px solid black",
            width: "90%",
            marginTop: "5px",
          }}
        >
          <thead>
            <tr
              style={{
                border: "1px solid",
                textAlign: "center",
                padding: "1em",
              }}
            >
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  padding: "1em",
                  textAlign: "center",
                  height: "auto", // Set height to auto for header row
                }}
              >
                <b style={{ fontSize: "11px" }}>
                  Performed by Production Supervisor
                </b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  padding: "1em",
                  textAlign: "center",
                  height: "auto", // Set height to auto for header row
                }}
              >
                <b style={{ fontSize: "11px" }}>Reviewed by HOD / Designees</b>
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  padding: "1em",
                  textAlign: "center",
                  height: "auto", // Set height to auto for header row
                }}
              >
                <b style={{ fontSize: "11px" }}>Approved by QA Inspector</b>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  padding: "1em",
                  textAlign: "center",
                  verticalAlign: "top", // Ensure vertical alignment is consistent
                }}
              >
                <div align="center" style={{ minHeight: "80px" }}>
                  {print && print.supervisor_sign}
                  <br />
                  {supersigndate}
                  <br></br>
                  Sign & Date
                </div>
                {/* <div style={{ fontSize: "11px", textAlign: "center" }}>Sign & Date</div> */}
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  padding: "1em",
                  textAlign: "center",
                  verticalAlign: "top", // Ensure vertical alignment is consistent
                }}
              >
                <div align="center" style={{ minHeight: "80px" }}>
                  {print && print.hod_sign}
                  <br />
                  {hodsign}
                  <br></br>
                  Sign & Date
                </div>
                {/* <div style={{ fontSize: "11px", textAlign: "center" }}>Sign & Date</div> */}
              </td>
              <td
                colSpan="1"
                style={{
                  border: "1px solid",
                  padding: "1em",
                  textAlign: "center",
                  verticalAlign: "top", // Ensure vertical alignment is consistent
                }}
              >
                <div align="center">
                  {print && print.qa_sign}
                  <br />
                  {qa_signsignaturedate}
                  <br></br>
                  Sign & Date
                </div>

                {/* <div style={{ fontSize: "11px", textAlign: "center" }}>Sign & Date</div> */}
              </td>
            </tr>
          </tbody>
        </table>

        <br />

        <table style={{ marginTop: 20, width: "90%" }}>
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
          addonBefore="BMR No"
          placeholder="BMR No"
          value={bmrnos2}
          disabled
          style={{ width: "100%", height: "35px" }}
        />
        <Input
          addonBefore="Sub.Batch No"
          placeholder="Sub.Batch No"
          value={subbatch}
          disabled
          style={{ width: "100%", height: "35px" }}
        />
        <Input
          placeholder="Date"
          addonBefore="StartDate"
          max={getCurrentDate()}
          type="date"
          // disabled={
          //   (roleBase === "ROLE_SUPERVISOR" && selectedRow?.supervisor_status === "SUPERVISOR_APPROVED") ||
          //   (roleBase === "ROLE_HOD" && selectedRow?.hod_status === "HOD_APPROVED") ||
          //   (roleBase === "ROLE_QA" && selectedRow?.qa_status === "HOD_APPROVED") ||
          //   (roleBase === "ROLE_DESIGNEE" && selectedRow?.hod_status === "HOD_APPROVED")
          // }
          disabled={disable}
          value={newDate}
          // min={lastDateTime}
          onChange={handleDateChange}
          style={{ width: "100%", height: "35px" }}
        />
        <Input
          placeholder="Start time"
          addonBefore="Start time"
          style={{ width: "100%", height: "35px" }}
          type="time"
          value={startTime}
          disabled={disable}
          onChange={handleStartTimeChange}
        />
        <Input
          placeholder="End Date"
          addonBefore="EndDate"
          type="date"
          disabled={disable}
          value={endDate}
          min={newDate}
          onChange={handleEndDateChange}
          style={{ width: "100%", height: "35px" }}
        />
        <Input
          placeholder="End time"
          addonBefore="End time"
          style={{ width: "100%", height: "35px" }}
          type="time"
          value={endTime}
          onBlur={handleStartTimeBlur}
          disabled={disable}
          onChange={(e) => setEndTime(e.target.value)}
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
        <div style={containerStyle}>
          <div style={beforeStyle}>Shift</div>
          <Select
            style={{
              width: "100%",
              height: "40x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select Shift No"
            value={availableshiftlov}
            onChange={setAvailableShiftslov}
            disabled={disable}
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
            style={{
              width: "100%",
              height: "40x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select Finish"
            value={finisharraylist}
            onChange={setfinisharray}
            disabled={disable}
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
            style={{
              width: "100%",
              height: "40x",
              borderRadius: "0px",
              border: "1px solid #dddd",
              backgroundColor: "white",
            }}
            placeholder="Select Machine No"
            value={availablemclov}
            onChange={setAvailableMAClov}
            disabled={disable}
            showSearch
          >
            {availableMachineLov.map((MacLOV, index) => (
              <Option key={index} value={MacLOV}>
                {MacLOV}
              </Option>
            ))}
          </Select>
        </div>
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

export default Bleaching;
