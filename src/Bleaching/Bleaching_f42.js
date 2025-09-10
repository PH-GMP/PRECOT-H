/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Avatar,
  Button,
  Col,
  Modal,
  Drawer,
  Input,
  Menu,
  Row,
  Tabs,
  Tooltip,
} from "antd";
import React, { Children, useEffect, useState, useRef } from "react";
import { Select, TimePicker, message, Spin } from "antd"; // Import Select from antd
import { GrDocumentStore } from "react-icons/gr";
import API from "../baseUrl.json";
import gif from "../Assests/gif.gif";
import { FaPrint } from "react-icons/fa6";

import { LoadingOutlined, PrinterOutlined } from "@ant-design/icons";
import axios from "axios";
import { Radio, Form, DatePicker } from "antd";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment"; // Import moment
import BleachingHeader from "../Components/BleachingHeader";
import { IoChevronBackSharp, IoCreate, IoSave } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import logo from "../Assests/logo.png";
import { GoArrowLeft } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock } from "react-icons/fa6";
import { BiLock } from "react-icons/bi";
import BleachingPrintHeader from "../Components/BleachingPrintHeader";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
// Import Ant Design styles
const token = localStorage.getItem("token");
const { Option } = Select; // Destructure Option from Select
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm";

export default function Bleaching_f42() {
  // // console.log("props",props.data[0].bmrNo);
  const [formatNo, setformatNo] = useState("");
  const [id, setid] = useState("");
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [RevisionNo, setrevisionNo] = useState("");
  const [RefsopNo, setRefsopNo] = useState("");
  const [date, setformatDate] = useState("");
  const [Shift, setShift] = useState("");
  const [newData, setnewData] = useState();
  const [laydownNo, setlaydownNo] = useState("");
  const [supervisor_submit_on, setsupervisor_submit_on] = useState("");
  const [hod_submit_on, sethod_submit_on] = useState("");
  const [laydownStartTime, setlaydownStartTime] = useState("");
  const [laydownEndTime, setlaydownEndTime] = useState("");
  const [laydownStartdate, setlaydownStartdate] = useState("");
  const [laydownEnddate, setlaydownEnddate] = useState("");
  const [hodOrDesigneeSign, sethodOrDesigneeSign] = useState("");
  const [supervisorSign, setsupervisorSign] = useState("");
  //TABLE DATA
  const [shiftSelections, setShiftSelections] = useState();
  const [selectedValue, setSelectedValue] = useState("ok");
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [Checkbalecondition, setCheckbalecondition] = useState("");
  const [CheckforkliftClean, setCheckforkliftClean] = useState("");
  const [CheckCleanlaydown, setCheckCleanlaydown] = useState("");
  const [suppliedbales, setsuppliedbales] = useState("");
  const [PackingMaterial, setPackingMaterial] = useState("");
  const [typeofbags, settypeofbags] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [contaminationInspection, setcontaminationInspection] = useState("");
  const [laydownwise, setlaydownwise] = useState("");
  const [referenceSample, setreferenceSample] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [remarks, setremarks] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [reason, setReason] = useState("");
  const [availableShifts, setAvailableShifts] = useState([]);
  const [availableLaydownno, setLaydownNo] = useState([]);
  const [laydownstarttimeprint, setlaydownstarttimeprint] = useState("");
  const [laydownendtimePrint, setlaydownendtimePrint] = useState("");
  const [selectedlaydown, setSelectedlaydown] = useState(null);
  const [Bmrno, setBMRNO] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [toolsForCuttingStraps, setToolForCuttingStarps] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [toolLov, setToolLov] = useState([
    { value: "Cutter", label: "Cutter" },
    { value: "Scissors", label: "Scissors" },
  ]);

  const [ROLE_SUPERVISIOR_STATUS, setrolesupervisior] = useState("");
  const role = localStorage.getItem("role");
  const [ROLE_HOD_STATUS, setroleHOD] = useState("");
  const containerRef = useRef(null); // Ref to a container element
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handlePrint = () => {
    window.print();
  };
  // const location = useLocation();
  //   const { bmrno } = location.state || {};
  //   // console.log("edit bmrno",bmrno);
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [getImage, setGetImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.supervisor_sign;
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
  }, [selectedRow,API.prodUrl, token]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.hod_sign;
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
  }, [selectedRow,API.prodUrl, token]);

  const { state } = location;
  const { bmrnos, bmrnos2 } = state || {};
  // console.log("value check", bmrnos, bmrnos2);
  const roleauth = localStorage.getItem("role");
  // console.log("roleaurth", roleauth);
  const handleStartTimeChange = (time) => {
    // Optionally reset end time if needed
    // setlaydownStartTime(time);
    // Reset end time if it's before the new start time
    const value = time.target.value;
    setlaydownStartTime(value);
    validateTimes(value, laydownEndTime);
    // setlaydownEndTime(null);
  };
  // const handleStartTimeChange = (time, timeString) => {
  //   setlaydownStartTime(time);
  // };
  const handleEndTimeChange = (time) => {
    const value = time.target.value;
    setlaydownEndTime(value);
    validateTimes(laydownStartTime, value);
  };
  const handleChange = (event) => {
    setCheckbalecondition(event.target.value);
  };
  const handleChangeCleanlines = (event) => {
    setCheckforkliftClean(event.target.value);
  };
  const handleCheckCleanlaydown = (event) => {
    setCheckCleanlaydown(event.target.value);
  };
  const handlesuppliedbales = (event) => {
    setsuppliedbales(event.target.value);
  };
  const handlePackingMaterial = (event) => {
    setPackingMaterial(event.target.value);
  };
  const handletypeofbags = (event) => {
    settypeofbags(event.target.value);
  };
  const handleShiftChange = (value) => {
    setSelectedShift(value);
  };
  const handlelaydownChange = (value) => {
    setSelectedlaydown(value);
  };
  const handlesetcontaminationInspection = (event) => {
    setcontaminationInspection(event.target.value);
  };
  const handlelaydownwise = (event) => {
    setlaydownwise(event.target.value);
  };
  const handlereferenceSample = (event) => {
    setreferenceSample(event.target.value);
  };

  const handleToolStrip = (value) => {
    setToolForCuttingStarps(value);
  };

  const onChange = (key) => {
    // console.log(key);
  };

  const handleSelectText = (e) => {
    if (
      !/[0-9a-zA-Z._ ]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }

    if (e.key == "Enter") {
      setToolForCuttingStarps(e.target.value);
    }
  };
  const handleViewDetails = (record) => {
    const x = newData.filter((x, i) => {
      return record.headerID == x.header_id;
    });
    setSelectedRow(x);
  };
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("You want to log out")) {
      navigate("/Precot");
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
  useEffect(() => {
    const storedValue = localStorage.getItem("values");

    if (storedValue) {
      setBMRNO(storedValue);
    }
    // console.log("bmrno", Bmrno);
    // console.log(storedValue);
    const token = localStorage.getItem("token");
    fetchData();
    fetchDatashift();
    checkBmrExists();
  }, []);
  const checkBmrExists = async (bmrNolocal) => {
    try {
      setLoading(true);
      const bmrNolocal = localStorage.getItem("values");
      // console.log("stored bmr inside", bmrNolocal);

      const response = await axios.get(
        `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/LaydownChechListF33/GetByBMR?formatNo=PRD01/F-42&bmrNo=${bmrnos}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response of edit", response.data);
      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        if (data.hod_submit_on) {
          const datePartsupervisor_submit_onvalue = data.hod_submit_on;
          const formattedHODSubmitted = moment(
            datePartsupervisor_submit_onvalue
          ).format("DD/MM/YYYY HH:mm");
          sethod_submit_on(formattedHODSubmitted);
        } else {
          sethod_submit_on(null);
        }

        if (data.supervisor_submit_on) {
          const datePartsupervisor_submit_on = data.supervisor_submit_on;
          const formattedDatesupervisorSubmitted = moment(
            datePartsupervisor_submit_on
          ).format("DD/MM/YYYY HH:mm");
          setsupervisor_submit_on(formattedDatesupervisorSubmitted);
        } else {
          setsupervisor_submit_on(null);
        }

        setemptyarraycheck(response.data.length);

        setSelectedRow(data);
        // console.log("inside data", data);
        //  setformatDate(data.date);
        // console.log("BMRNO list", bmrnos);
        setroleHOD(data.hod_status);
        setrolesupervisior(data.supervisor_status);
        setShift(data.shift);
        setBMRNO(bmrnos);
        setid(data.id);
        setlaydownNo(data.layDownNo);
        setlaydownStartTime(data.layDownStartTime);
        setlaydownEndTime(data.layDownEndTime);
        setlaydownStartdate(data.layDownStartdate);
        setlaydownEnddate(data.layDownEnddate);
        setCheckbalecondition(data.checkBaleCondition);
        setCheckforkliftClean(data.checkForkliftClean);
        setCheckCleanlaydown(data.checkCleanLayDown);
        setsuppliedbales(data.suppliedBales);
        setPackingMaterial(data.packingMaterial);
        settypeofbags(data.typeOfBags);
        setcontaminationInspection(data.contaminationInspection);
        setlaydownwise(data.layDownWise);
        setreferenceSample(data.referenceSample);
        sethodOrDesigneeSign(data.hod_sign);
        setsupervisorSign(data.supervisor_sign);
        setremarks(data.remarks);
        setReason(data.reason);
        setToolForCuttingStarps(data.toolsForCuttingStraps);

        const datelayoutstarttimeformatprint = moment(
          data.laydownStartdate
        ).format("DD/MM/YYYY");
        setlaydownstarttimeprint(datelayoutstarttimeformatprint);
        // const datelayoutendformat= data.laydownendtimePrint.split('T')[0];
        const datelayoutendtimeformatprint = moment(data.layDownEnddate).format(
          "DD/MM/YYYY"
        );
        setlaydownendtimePrint(datelayoutendtimeformatprint);
        // console.log("", laydownstarttimeprint, laydownendtimePrint);
      } else {
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      // message.error('Error checking BMR existence');
    } finally {
      setLoading(false);
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios
        .get(`${API.prodUrl}/Precot/api/LOV/Service/laydownNumberLOV`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // // console.log("Shift details fetched:", res.data);
          const data = res.data.map((laydownno) => laydownno.value);
          setLaydownNo(data);
        });

      // Assuming the response data structure matches the payload structure you provided
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDatashift = async () => {
    try {
      setLoading(true);
      const response = await axios
        .get(`${API.prodUrl}/Precot/api/LOV/Service/shiftDetailsLov`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // // console.log("Shift details fetched:", res.data);
          const data = res.data.map((shift) => shift.value);
          setAvailableShifts(data);
        });

      // Assuming the response data structure matches the payload structure you provided
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  const savelaydownChecklist = () => {
    const isValid = () => {
      if (!bmrnos2) return "BMRNO  is required";
      if (!laydownStartdate) return "LayDownStartdate Process is required";
      if (!laydownEnddate) return "LaydownEnddate  are required";
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    console.log("toolsForCuttingStraps", toolsForCuttingStraps)
    setLoading(true);
    let idvalue;
    const remarkToSave = remarks.trim() === "" ? "N/A" : remarks;
    const payload = {
      id: id,
      formatNo: "PRD01/F-42",
      revisionNo: "02",
      bmrNo: bmrnos,
      refSopNo: "PRD01-D-01",
      FormatName: "PRD01/F-42",
      unit: "H",
      layDownNo: bmrnos2,
      layDownStartTime: laydownStartTime,
      layDownEndTime: laydownEndTime,
      layDownStartdate: laydownStartdate,
      layDownEnddate: laydownEnddate,
      checkBaleCondition: Checkbalecondition,
      checkForkliftClean: CheckforkliftClean,
      checkCleanLayDown: CheckCleanlaydown,
      suppliedBales: suppliedbales,
      // toolsForCuttingStraps: "Cutter",
      packingMaterial: PackingMaterial,
      typeOfBags: typeofbags,
      contaminationInspection: contaminationInspection,
      layDownWise: laydownwise,
      referenceSample: referenceSample,
      remarks: remarkToSave,
      hodOrDesigneeSign: hodOrDesigneeSign,
      supervisorSign: supervisorSign,
      toolsForCuttingStraps: toolsForCuttingStraps,
    };
    console.log("payload", payload)
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/saveLayDownCheckF42`,
        payload,
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success("LaydownChecklist Saved successfully");
        navigate("/Precot/Bleaching/F-42/Summary");
        checkBmrExists();
        // console.log("messsage", res);

        // message.success("LaydownChecklist Submitted successfully");
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
  const submitlaydownChecklist = () => {
    const isValid = () => {
      if (!bmrnos2) return "BMRNO  is required";
      if (!laydownStartdate) return "LayDownStartdate Process is required";
      if (!laydownEnddate) return "LaydownEnddate  are required";
      if (!laydownStartTime) return "LaydownStartTime is required";
      if (!laydownEndTime) return "LaydownEndTime is required";
      if (!Checkbalecondition)
        return "Checking bale conditions(appearence of packing)";
      if (!CheckforkliftClean) return "Check fork lift Clean is required";
      if (!toolsForCuttingStraps) return "Tools for cutting straps is required";
      if (!CheckCleanlaydown)
        return "Checking the cleanliness of lay down place is required";
      if (!suppliedbales)
        return "Type of straps used for supplied bales  is required";
      if (!PackingMaterial)
        return "Type of Packing Material used for cover is required";
      if (!typeofbags)
        return " Type of bags are used to handle waste  are required";
      if (!contaminationInspection)
        return "After the laydown is completed - Contamination inspection done or not  is required";

      if (!laydownwise)
        return "Are samples of Contamination kept lay down wise for future reference is required";
      if (!referenceSample)
        return "Do the reference samples contain the following information like date ,shift ,BMR number is required";
      // if (!remarks) return "remarks is required";
    };
    const validationMessage = isValid();
    if (validationMessage) {
      message.error(validationMessage);
      return;
    }
    // Format the payload according to the API documentation
    const remarkToSave = remarks.trim() === "" ? "N/A" : remarks;
    setSaveLoading(true);
    const payload = {
      id: id,
      formatNo: "PRD01/F-42",
      FormatName: "PRD01/F-42",
      revisionNo: "02",
      refSopNo: "PRD01-D-01",
      bmrNo: bmrnos,
      unit: "H",
      layDownNo: bmrnos2,
      layDownStartTime: laydownStartTime,
      layDownEndTime: laydownEndTime,
      layDownStartdate: laydownStartdate,
      layDownEnddate: laydownEnddate,
      checkBaleCondition: Checkbalecondition,
      checkForkliftClean: CheckforkliftClean,
      checkCleanLayDown: CheckCleanlaydown,
      suppliedBales: suppliedbales,
      // toolsForCuttingStraps: "Cutter",
      packingMaterial: PackingMaterial,
      typeOfBags: typeofbags,
      contaminationInspection: contaminationInspection,
      layDownWise: laydownwise,
      referenceSample: referenceSample,
      remarks: remarkToSave,
      hodOrDesigneeSign: hodOrDesigneeSign,
      supervisorSign: supervisorSign,
      toolsForCuttingStraps: toolsForCuttingStraps,
    };
    console.log("payload", payload)
    // Make the POST request to the API endpoint
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(
        `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/submitLayDownCheckF42`,
        payload,
        { headers }
      )
      .then((res) => {
        setLoading(false);
        // console.log("messsage", res);
        // window.location.reload();
        message.success("LaydownChecklist Submitted successfully");
        navigate("/Precot/Bleaching/F-42/Summary");
      })
      .catch((err) => {
        setLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
        navigate("/Precot/Bleaching/F-42/Summary");
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleBack = () => {
    navigate("/Precot/Bleaching/F-42/Summary");
  };
  const handleStartTimeBlur = () => {
    validateTimes(laydownStartTime, laydownEndTime);
  };

  const handleEndTimeBlur = () => {
    validateTimes(laydownStartTime, laydownEndTime);
  };
  const validateTimes = (start, end) => {
    // console.log(start, end);
    if (start && end) {
      const startTimeDate = moment(start, "HH:mm");
      const endTimeDate = moment(end, "HH:mm");
      // console.log("date vali", laydownStartdate, laydownEnddate);
      if (laydownStartdate == laydownEnddate) {
        if (startTimeDate.isSameOrAfter(endTimeDate)) {
          setErrorMessage("End time must be after start time.");
          message.error("End time must be after start time.");
          setlaydownEndTime(null); // Reset end time if validation fails
        } else {
          setErrorMessage(""); // Clear error message if validation passes
        }
      }
    }
  };
  useEffect(() => {
    const handleToolLov = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/getSharpCutterTools`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const uniqueOptions = [...new Set(response.data)].map((value) => ({
          value: value,
          label: value,
        }));

        setToolLov((prevState) => {
          const allOptions = [...prevState, ...uniqueOptions];
          const uniqueOptionsSet = allOptions.filter(
            (option, index, self) =>
              index === self.findIndex((o) => o.value === option.value)
          );

          return uniqueOptionsSet;
        });
      } catch (error) { }
    };

    handleToolLov();
  }, []);

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/approveLaydown`,
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
        navigate("/Precot/Bleaching/F-42/Summary");
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

    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setSaveLoading(false);
      return;
    }

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/Bleaching/Service/CRUD/approveLaydown`,
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
        navigate("/Precot/Bleaching/F-42/Summary");
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

  const handleSave = async () => {
    try {
      savelaydownChecklist();
    } catch (error) {
      console.error("Error Submitted LaydownChecklist:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      submitlaydownChecklist();
    } catch (error) {
      console.error("Error submitting LaydownChecklist:", error);
    }
  };
  const items = [
    {
      key: "1",
      label: <p>Lay Down Check list Form 1 </p>,
      children: (
        <table
          className="laydownchecklist"
          style={{
            width: "100%",
            tableLayout: "fixed",
            border: "1px solid black",
            borderCollapse: "collapse",
            marginTop: "5px",
            fontSize: "14px !important",
          }}
        >
          <tbody>
            <tr>
              <td colSpan="5">
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  Lay down No:
                </span>{" "}
              </td>
              <td colSpan="5">
                <Input
                  placeholder="Lay down No"
                  name="Bmrno"
                  value={bmrnos2}
                  disabled
                  required
                  autoComplete="off"
                />
                {/* <Select
                  style={{ width: '200px' }}
                  placeholder="Select Lay down No"
                  value={laydownNo}
                  onChange={setlaydownNo}
                >
                  {availableLaydownno.map((laydown, index) => (
                    <Option key={index} value={laydown}>
                      {laydown}
                    </Option>
                  ))}
                </Select> */}
              </td>
              <td colSpan="5">
                {" "}
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  BMR No:
                </span>
              </td>
              <td colSpan="5">
                <Input
                  placeholder="BMRNO"
                  name="Bmrno"
                  value={bmrnos}
                  disabled
                  required
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  Lay down Start Date & time:
                </span>
              </td>
              <td colSpan="6">
                {/* <TimePicker
        format="HH:mm"
        value={laydownStartTime}
        onChange={handleStartTimeChange}
        placeholder="Start Time"
        style={{ marginRight: 10 }}
      /> */}
                {/* <Input
                  placeholder="Lay down StartTime"
                  name="laydownStartTime"
                  value={laydownStartTime}
                  onChange={(e) => setlaydownStartTime(e.target.value)}
                  required
                  type="datetime-local"
                  autoComplete="off"
                /> */}

                <Input
                  placeholder="Date"
                  style={{ width: 160, marginRight: 5 }}
                  value={laydownStartdate}
                  max={today}
                  onChange={(e) => setlaydownStartdate(e.target.value)}
                  required
                  autoComplete="off"
                  type="date"
                  // selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                />
                {/* <DatePicker
                  style={{ marginRight: 10 }}
                  onChange={handleDateChangestartDate}
                
                  value={laydownStartdate}
                  format={dateFormat}
                /> */}
                {/* <TimePicker
      format="HH:mm" // Specify time format
      value={laydownStartTime} // Bind value to state
      onChange={handleStartTimeChange} // Handle time change
      placeholder="Start Time" // Placeholder text
      style={{ marginRight: 10 }} // Optional: Inline style
    /> */}

                <Input
                  placeholder="Time"
                  style={{ width: 140, marginRight: 5 }}
                  value={laydownStartTime}
                  onChange={handleStartTimeChange}
                  onBlur={handleStartTimeBlur}
                  required
                  autoComplete="off"
                  type="time"
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                />
              </td>
              <td colSpan="4">
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  Lay down End Date & time:
                </span>
              </td>
              <td colSpan="6">
                {/* <TimePicker
        format="HH:mm"
        value={laydownEndTime}
        onChange={handleEndTimeChange}
        placeholder="End Time"
        style={{ marginRight: 10 }}
      /> */}
                {/* <DatePicker
                  style={{ marginRight: 10 }}
                  onChange={handleDateChangeEndDate}
                  value={laydownEnddate}
                  
                  format={dateFormat}
                /> */}
                <Input
                  placeholder="Date"
                  name="Date"
                  value={laydownEnddate}
                  onChange={(e) => setlaydownEnddate(e.target.value)}
                  required
                  max={today}
                  autoComplete="off"
                  onBlur={handleStartTimeBlur}
                  type="date"
                  style={{ width: 160, marginRight: 5 }}
                  min={laydownStartdate} // Minimum selectable date is the selected start date
                  // Disable end date input if start date is not selected
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                />
                {/* <TimePicker
                  format="HH:mm"
                  value={laydownEndTime}
                  onChange={handleEndTimeChange}
                  placeholder="End Time"
                  style={{ marginRight: 10 }}
                  disabled={laydownStartTime === ''}
                /> */}
                <Input
                  placeholder="time"
                  style={{ width: 140, marginRight: 5 }}
                  value={laydownEndTime}
                  onChange={(e) => setlaydownEndTime(e.target.value)}
                  required
                  autoComplete="off"
                  type="time"
                  min={laydownStartTime}
                  onBlur={handleEndTimeBlur}
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  S.No
                </span>
              </td>
              <td colSpan="9">
                {" "}
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  Particular's
                </span>
              </td>
              <td
                colSpan="9"
                style={{
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  Status
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  1
                </span>
              </td>
              <td colSpan="9">
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  Checking bale conditions(appearance of packing)
                </span>
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleChange}
                  value={Checkbalecondition}
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                >
                  <Radio
                    value="Ok"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="Not Ok"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Not OK
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  2
                </span>
              </td>
              <td colSpan="9">
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  Checks forklift cleanliness
                </span>
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleChangeCleanlines}
                  value={CheckforkliftClean}
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                >
                  <Radio
                    value="Ok"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="Not Ok "
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Not OK
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  3
                </span>
              </td>
              <td colSpan="9">
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  Checking the cleanliness of lay down place
                </span>
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handleCheckCleanlaydown}
                  value={CheckCleanlaydown}
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                >
                  <Radio
                    value="Ok"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    OK
                  </Radio>
                  <Radio
                    value="Not Ok"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Not OK
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  4
                </span>
              </td>
              <td colSpan="9">
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  Type of straps used for supplied bales
                </span>
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handlesuppliedbales}
                  value={suppliedbales}
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                >
                  <Radio
                    value="Metalrope"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Metal rope
                  </Radio>
                  <Radio
                    value="Plastic"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Plastic
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  5
                </span>
              </td>
              <td colSpan="9">
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  Type tools used for cutting the straps
                </span>
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  <Select
                    value={toolsForCuttingStraps}
                    style={{ textAlign: "center", width: "300px" }}
                    options={toolLov}
                    onChange={(e) => {
                      handleToolStrip(e);
                    }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    disabled={
                      (roleauth === "ROLE_SUPERVISOR" &&
                        selectedRow?.supervisor_status ===
                        "SUPERVISOR_APPROVED" &&
                        selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                      selectedRow?.hod_status === "HOD_APPROVED" ||
                      (roleauth === "ROLE_HOD" &&
                        (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED")) ||
                      (roleauth === "ROLE_DESIGNEE" &&
                        (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                          selectedRow?.hod_status === "HOD_APPROVED" ||
                          selectedRow?.hod_status === "HOD_REJECTED"))
                    }
                  ></Select>
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "11px",
                    marginLeft: "0px",
                    marginLeft: "0px",
                  }}
                >
                  6
                </span>
              </td>
              <td colSpan="9">
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  Type of Packing Material used for cover
                </span>
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handlePackingMaterial}
                  value={PackingMaterial}
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                >
                  <Radio
                    value="Cloth"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Cloth
                  </Radio>
                  <Radio
                    value="HDPE Bag"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    HDPE Bag
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>7</span>
              </td>
              <td colSpan="9">
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  What type of bags are used to handle waste during the lay down
                  process ?
                </span>
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handletypeofbags}
                  value={typeofbags}
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                >
                  <Radio
                    value="Cloth"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Cloth
                  </Radio>
                  <Radio
                    value="HDPE Bag"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    HDPE Bag
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>8</span>
              </td>
              <td colSpan="9">
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  After the laydown is completed - Contamination inspection done
                  or not ?{" "}
                </span>
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handlesetcontaminationInspection}
                  value={contaminationInspection}
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                >
                  <Radio
                    value="Done"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Done
                  </Radio>
                  <Radio
                    value="Not Done"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Not Done
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>9</span>
              </td>
              <td colSpan="9">
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  Are samples of Contamination kept lay down wise for future
                  reference ?
                </span>
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handlelaydownwise}
                  value={laydownwise}
                  // disabled={
                  //   (roleauth === "ROLE_SUPERVISOR" &&
                  //     selectedRow?.supervisor_status ===
                  //       "SUPERVISOR_APPROVED") ||
                  //   (roleauth === "ROLE_HOD" &&
                  //     selectedRow?.hod_status === "HOD_APPROVED") ||
                  //   (roleauth === "ROLE_DESIGNEE" &&
                  //     selectedRow?.hod_status === "HOD_APPROVED")
                  // }
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                >
                  <Radio
                    value="Done"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="Not Done"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>10</span>
              </td>
              <td colSpan="9">
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  Do the reference samples contain the following information
                  like date ,shift ,BMR number?
                </span>
              </td>
              <td colSpan="9" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={handlereferenceSample}
                  value={referenceSample}
                  disabled={
                    (roleauth === "ROLE_SUPERVISOR" &&
                      selectedRow?.supervisor_status ===
                      "SUPERVISOR_APPROVED" &&
                      selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
                    selectedRow?.hod_status === "HOD_APPROVED" ||
                    (roleauth === "ROLE_HOD" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED")) ||
                    (roleauth === "ROLE_DESIGNEE" &&
                      (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                        selectedRow?.hod_status === "HOD_APPROVED" ||
                        selectedRow?.hod_status === "HOD_REJECTED"))
                  }
                >
                  <Radio
                    value="Done"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="Not Done"
                    style={{ fontSize: "11px", marginLeft: "0px" }}
                  >
                    No
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
          </tbody>
        </table>
      ),
    },
    {
      key: "2",
      label: <p>Lay Down Check list Form 2 </p>,
      children: (
        <div>
          <span
            style={{ fontSize: "11px", marginLeft: "0px", fontWeight: "bold" }}
          >
            Remarks:{" "}
          </span>
          <textarea
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
            }}
            name="remarks"
            value={remarks} // Bind the state to the value of the textarea
            onChange={(e) => setremarks(e.target.value)}
            rows="5"
            cols="5"
            required
            autoComplete="off"
            // disabled={selectedRow?.hod_status === "HOD_APPROVED"}
            disabled={
              (roleauth === "ROLE_SUPERVISOR" &&
                selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" &&
                selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
              selectedRow?.hod_status === "HOD_APPROVED" ||
              (roleauth === "ROLE_HOD" &&
                (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                  selectedRow?.hod_status === "HOD_APPROVED" ||
                  selectedRow?.hod_status === "HOD_REJECTED")) ||
              (roleauth === "ROLE_DESIGNEE" &&
                (selectedRow?.hod_status === "WAITING_FOR_APPROVAL" ||
                  selectedRow?.hod_status === "HOD_APPROVED" ||
                  selectedRow?.hod_status === "HOD_REJECTED"))
            }
          />
        </div>
      ),
    },
    {
      key: "3",
      label: <p>Review</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan="3" style={{ height: "35px", textAlign: "center" }}>
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  {" "}
                  Performed by Production Supervisor
                </span>
              </td>

              <td colSpan="3" style={{ textAlign: "center" }}>
                <span style={{ fontSize: "11px", marginLeft: "0px" }}>
                  {" "}
                  Reviewed By Head of the Department/Designee{" "}
                </span>
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
                {selectedRow?.supervisor_status === "SUPERVISOR_APPROVED" && (
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
                        <div>{selectedRow.supervisor_sign}</div>
                        <div>{supervisor_submit_on}</div>
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
                colSpan="3"
                style={{ textAlign: "center", verticalAlign: "bottom" }}
              >
                {(selectedRow?.hod_status === "HOD_REJECTED" ||
                  selectedRow?.hod_status === "HOD_APPROVED") && (
                    <>
                      {/* <input
                value={hodOrDesigneeSign}
                onChange={(e) => sethodOrDesigneeSign(e.target.value)}
                className="borderbuttom" 
                style={{ width: "99%", height: "70px", border: "none",textAlign:"center" }}
                disabled={ selectedRow?.hod_status==="HOD_APPROVED"}
              ></input> */}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          {" "}
                          <div>{selectedRow.hod_sign}</div>
                          <div>{hod_submit_on}</div>
                        </div>
                        {getImage1 !== "" && (
                          <img className="signature" src={getImage1} alt="HOD" />
                        )}
                      </div>
                      {/* <span style={{fontSize:'11px',marginLeft:"0px"}}>Signature & Date</span> */}
                    </>
                  )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* {
        loading == true ?
          <div style={{
            width: '100%',
            height: '100vh',
            position: 'absolute',
            backgroundColor: 'rgba(233,242,234,.8)',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img style={{background:"none"}} src={gif} alt="loading" />
          </div>
          : null
      } */}
      <div class="laydownlist-header">
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
          formName="LAY DOWN CHECK LIST"
          formatNo="PH-PRD01/F-001"
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
                  loading={saveLoading}
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
      <div>
        <div id="section-to-print" style={{ fontSize: "11px", padding: "5px" }}>
          <style>
            {`
      @media print {
        @page {
          size: landscape;
        }
      }
    `}
          </style>

          <table
            className="laydownchecklist"
            style={{
              fontSize: "11px",
              padding: "5px",
              width: "95%",
              marginTop: "2%",
            }}
          >
            <tr>
              <td colSpan="4" rowSpan="5" style={{ textAlign: "center" }}>
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
              <td colSpan="6" rowSpan="5" style={{ textAlign: "center" }}>
                Lay down checklist
              </td>
              <td colSpan="3">Format No.:</td>
              <td colSpan="4">PRD01/F-42</td>
            </tr>
            <tr>
              <td colSpan="3">Revision No.:</td>
              <td colSpan="4">01</td>
            </tr>
            <td colSpan="3">Ref. SOP No.:</td>
            <td colSpan="4">PRD01-D-01</td>
            <tr>
              <td colSpan="3">Page No.:</td>
              <td colSpan="4">01 0f 01</td>
            </tr>
          </table>
          <table
            className="laydownchecklist"
            style={{ fontSize: "11px", padding: "5px", width: "95%" }}
          >
            <tbody>
              <tr>
                <td colSpan="5">Lay down No: </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.layDownNo}
                </td>
                <td colSpan="5">BMRNo: </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.bmrNo}
                </td>
              </tr>
              <tr>
                <td colSpan="5">Lay down Start date </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {laydownstarttimeprint}
                </td>
                <td colSpan="5">Lay down End date</td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {laydownendtimePrint}
                </td>
              </tr>
              <tr>
                <td colSpan="5">Lay down Start Time:</td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.layDownStartTime}
                </td>
                <td colSpan="5">Lay down End Time:</td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.layDownEndTime}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  S.No
                </td>
                <td colSpan="9">Particular's</td>
                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                  }}
                >
                  Status
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  1
                </td>
                <td colSpan="4">Checking bale conditions</td>
                <td colSpan="5">(appearance of packing)</td>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.checkBaleCondition}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  2
                </td>
                <td colSpan="9">Checks forklift cleanliness</td>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.checkForkliftClean}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  3
                </td>
                <td colSpan="9">Checking the cleanliness of lay down place</td>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.checkCleanLayDown}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  4
                </td>
                <td colSpan="9">Type of straps used for supplied bales</td>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.suppliedBales}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  5
                </td>
                <td colSpan="9">Type tools used for cutting the straps</td>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.toolsForCuttingStraps}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  6
                </td>
                <td colSpan="9">Type of Packing Material used for cover</td>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.packingMaterial}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  7
                </td>
                <td colSpan="9">
                  What type of bags are used to handle waste during the lay down
                  process ?
                </td>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.typeOfBags}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  8
                </td>
                <td colSpan="9">
                  After the laydown is completed - Contamination inspection done
                  or not ?{" "}
                </td>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.contaminationInspection}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  9
                </td>
                <td colSpan="9">
                  Are samples of Contamination kept lay down wise for future
                  reference ?
                </td>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.layDownWise}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  10
                </td>
                <td colSpan="9">
                  Do the reference samples contain the following information
                  like date ,shift ,BMR number?
                </td>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  {selectedRow && selectedRow.referenceSample}
                </td>
              </tr>
              <tr>
                <td colSpan="3">Remarks :</td>
                <td colSpan="17">{selectedRow && selectedRow.remarks}</td>
              </tr>
            </tbody>
          </table>
          <table style={{ width: "100%", margin: "auto", width: "95%" }}>
            <tr>
              <td colSpan="10" style={{ height: "35px", textAlign: "center" }}>
                Performed by Production Supervisor
                <br></br>
                <br></br>
                <br></br>
                <div> {selectedRow && selectedRow.supervisor_sign}</div>
                <div> {supervisor_submit_on}</div>
                <div>Sign & Date</div>
              </td>

              <td colSpan="10" style={{ textAlign: "center" }}>
                Reviewed By Head of the Department/Designee
                <br></br>
                <br></br>
                <br></br>
                <div> {selectedRow && selectedRow.hod_sign}</div>
                <div> {hod_submit_on}</div>
                <div>Sign & Date</div>
              </td>
            </tr>
            <tr>
              {/* <td
                  colSpan="10"
                  style={{
                    height: "80px",
                    textAlign: "center",
                    marginBottom: "auto",
                    verticalAlign: "bottom",
                  }}
                >
                  <div>{selectedRow && selectedRow.supervisor_sign}{<br/>}{
  selectedRow?.[0]?.supervisor_submit_on
    ? new Date(selectedRow[0].supervisor_submit_on).toLocaleDateString()
    : ""
}</div>
                  <div>Sign & Date</div>
                </td> */}

              {/* <td
                  colSpan="10"
                  style={{ textAlign: "center", verticalAlign: "bottom" }}
                >
                  <div> {printResponseData?.[0]?.hod_sign}{<br/>}{
  printResponseData?.[0]?.supervisor_submit_on
    ? new Date(printResponseData[0].hod_submit_on).toLocaleDateString()
    : ""
}</div>
                  <div>Sign & Date</div>
                </td> */}
            </tr>
          </table>
          <table style={{ marginTop: 20, width: "95%" }}>
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
      </div>
    </>
  );
}
