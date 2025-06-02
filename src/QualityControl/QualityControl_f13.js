import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Tabs,
  Modal,
  Spin,
  message,
  Tooltip,
  Menu,
  Avatar,
  Drawer,
  InputNumber,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader.js";
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import API from "../baseUrl.json";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";

import Qc_F013_Summary from "./QualityControl_f13_Summary.js";

const QualityControl_f13 = () => {
  const formatName = "Potable Water Analysis Report";
  const formatNo = "PH-QCL01-AR-F-013";
  const revisionNo = "01";
  const sopNo = "PH-QCL01-D-05";
  const unit = "Unit H";

  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [OverallID, setOverallID] = useState("");
  const [disable, setDisable] = useState(false);
  const [saveBtnStatus, setSaveBtnStatus] = useState(false);
  const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [printData, setPrintData] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const initialized = useRef(false);

  const { Option } = Select;

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [opens, setOpens] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
    fieldchemist: false,
    fieldMicro: false,
  });
  // Fields
  const [testOn, setTestOn] = useState("");
  const [id, setId] = useState("");
  const [arNo, setArNo] = useState("");
  const [arNo1, setArNo1] = useState("");
  const [arNo2, setArNo2] = useState("");
  const [arNo3, setArNo3] = useState("");
  const [arNo4, setArNo4] = useState("");
  const [arNo5, setArNo5] = useState("");

  const [phLevel1, setPhLevel1] = useState("");
  const [phLevel2, setPhLevel2] = useState("");
  const [phLevel3, setPhLevel3] = useState("");
  const [phLevel4, setPhLevel4] = useState("");
  const [phLevel5, setPhLevel5] = useState("");

  const [hardness1, setHardness1] = useState("");
  const [hardness2, setHardness2] = useState("");
  const [hardness3, setHardness3] = useState("");
  const [hardness4, setHardness4] = useState("");
  const [hardness5, setHardness5] = useState("");

  const [turbidity1, setTurbidity1] = useState("");
  const [turbidity2, setTurbidity2] = useState("");
  const [turbidity3, setTurbidity3] = useState("");
  const [turbidity4, setTurbidity4] = useState("");
  const [turbidity5, setTurbidity5] = useState("");

  const [totalDissolved1, setTotalDissolved1] = useState("");
  const [totalDissolved2, setTotalDissolved2] = useState("");
  const [totalDissolved3, setTotalDissolved3] = useState("");
  const [totalDissolved4, setTotalDissolved4] = useState("");
  const [totalDissolved5, setTotalDissolved5] = useState("");

  const [interpretation1, setInterpretation1] = useState("");
  const [interpretation2, setInterpretation2] = useState("");
  const [interpretation3, setInterpretation3] = useState("");
  const [interpretation4, setInterpretation4] = useState("");
  const [interpretation5, setInterpretation5] = useState("");

  const [phLevel, setPhLevel] = useState("");
  const [hardness, setHardness] = useState("");
  const [turbidity, setTurbidity] = useState("");
  const [totalDissolved, setTotalDissolved] = useState("");
  const [interpretation, setInterpretation] = useState("");

  const [testCompletion, setTestCompletion] = useState("");
  const [sampleLocation, setSampleLocation] = useState("");

  const [open, setOpen] = useState(false);

  const [NewSave, setNewSave] = useState(false);

  const initial = useRef(false);

  // const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { date, year, month } = state || {};
  const dateObject = new Date(date);
  const day1 = String(dateObject.getDate()).padStart(2, "0");
  const month1 = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year1 = dateObject.getFullYear();
  const monthIndex = dateObject.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[monthIndex];

  const [selectedRow, setSelectedRow] = useState("");
  const [version, setVersion] = useState("");
  const [reason, setreason] = useState("");
  const role = localStorage.getItem("role");
  const roleauth = localStorage.getItem("role");
  console.log(roleauth);
  const [shift, setShift] = useState(null);
  const [years, setyears] = useState(null);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [SupervisorSign, setSupervisorSign] = useState("");
  const [HodSign, setHodSign] = useState("");
  const [SupervisorSubmitOn, setSupervisorSubmitOn] = useState();
  const [HodSubmitOn, setHodSubmitOn] = useState("");
  const [OperatorSubmitOn, setOperatorSubmitOn] = useState("");
  const [remarks, setRemarks] = useState("");

  const [PackingDetails, setPackingDetails] = useState([]);
  const [emptyarraycheck, setemptyarraycheck] = useState("");

  const roleBase = localStorage.getItem("role");
  const [getImage, setGetImage] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");

  useEffect(() => {
    console.log("qcentered");
    const token = localStorage.getItem("token");
    const username = printData?.chemist_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          console.log("Response:", res.data);
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
          console.log("Error in fetching image:", err);
        });
    }
  }, [printData,      API.prodUrl]);

  useEffect(() => {
    console.log("microentered");
    const token = localStorage.getItem("token");
    const username = printData?.micro_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage2(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printData,      API.prodUrl]);

  useEffect(() => {
    console.log("qcentered");
    const token = localStorage.getItem("token");
    const username = printData?.qc_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          console.log("Response:", res.data);
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage3(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [printData,      API.prodUrl]);

  let formattedChemistDate;
  if (printData.chemist_submit_on) {
    formattedChemistDate = moment(printData.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedChemistDate = ""; // Or any other default value or error handling
  }

  let formattedMicroDate;
  if (printData.micro_submit_on) {
    formattedMicroDate = moment(printData.micro_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedMicroDate = ""; // Or any other default value or error handling
  }
  let formattedQCDate;
  if (printData.qc_submit_on) {
    formattedQCDate = moment(printData.qc_submit_on).format("DD/MM/YYYY HH:mm");
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCDate = ""; // Or any other default value or error handling
  }

  // UseEffect for the Get the Details.....
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const role = localStorage.getItem("role");
      console.log("UserRole", role);
      if (role == "ROLE_CHEMIST") {
        console.log("chemist");
        setStatus((formStatus) => ({
          ...formStatus,
          fieldMicro: true,
        }));
      }
      if (role == "ROLE_MICROBIOLOGIST") {
        console.log("MIcro");
        setStatus((formStatus) => ({
          ...formStatus,
          fieldchemist: true,
        }));
      }

      const { date, year, month } = state || {};
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .get(`${    API.prodUrl}/Precot/api/chemicaltest/ARF013`, {
          headers,
          params: {
            year: year1,
            month: monthName,
            date: date,
          },
        })
        .then((response) => {
          if (response.data.length == 0) {
            if (role == "QA_MANAGER" || role == "QC_MANAGER") {
              message.warning("Chemist or Microbiologist Yet To Approve");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-13/Summary");
              }, [1000]);
            }
          }

          console.log("response ", response);

          if (Array.isArray(response.data) && response.data.length > 0) {
            console.log(" Response", response.data);
            console.log("AR ", response.data[0].ar_no_5);
            setId(response.data[0].test_id);
            setArNo(response.data[0].ar_no);
            setArNo1(response.data[0].ar_no_1);
            setArNo2(response.data[0].ar_no_2);
            setArNo3(response.data[0].ar_no_3);
            setArNo4(response.data[0].ar_no_4);
            setArNo5(response.data[0].ar_no_5);

            setPhLevel(response.data[0].ph_level);
            setPhLevel1(response.data[0].ph_level_1);
            setPhLevel2(response.data[0].ph_level_2);
            setPhLevel3(response.data[0].ph_level_3);
            setPhLevel4(response.data[0].ph_level_4);
            setPhLevel5(response.data[0].ph_level_5);

            setHardness(response.data[0].hardness);
            setHardness1(response.data[0].hardness_1);
            setHardness2(response.data[0].hardness_2);
            setHardness3(response.data[0].hardness_3);
            setHardness4(response.data[0].hardness_4);
            setHardness5(response.data[0].hardness_5);

            setTurbidity(response.data[0].turbidity);
            setTurbidity1(response.data[0].turbidity_1);
            setTurbidity2(response.data[0].turbidity_2);
            setTurbidity3(response.data[0].turbidity_3);
            setTurbidity4(response.data[0].turbidity_4);
            setTurbidity5(response.data[0].turbidity_5);

            setTotalDissolved(response.data[0].total_DISSOLVED);

            setTotalDissolved1(response.data[0].total_dissolved_1);
            setTotalDissolved2(response.data[0].total_dissolved_2);
            setTotalDissolved3(response.data[0].total_dissolved_3);
            setTotalDissolved4(response.data[0].total_dissolved_4);
            setTotalDissolved5(response.data[0].total_dissolved_5);
            setInterpretation(response.data[0].interpretation);
            setInterpretation1(response.data[0].interpretation_1);
            setInterpretation2(response.data[0].interpretation_2);
            setInterpretation3(response.data[0].interpretation_3);
            setInterpretation4(response.data[0].interpretation_4);
            setInterpretation5(response.data[0].interpretation_5);

            setTestCompletion(response.data[0].test_completion);
            setSampleLocation(response.data[0].sample_location);
            setRemarks(response.data[0].remarks);

            statusFunction(response.data[0]);

            setPrintData(response.data[0]);
          } else {
            console.log(" Response", response.data);

            setArNo("");
            setArNo1("");
            setArNo2("");
            setArNo3("");
            setArNo4("");
            setArNo5("");
            setPhLevel("");
            setPhLevel1("");
            setPhLevel2("");
            setPhLevel3("");
            setPhLevel4("");
            setPhLevel5("");
            setHardness("");
            setHardness1("");
            setHardness2("");
            setHardness3("");
            setHardness4("");
            setHardness5("");
            setTurbidity("");
            setTurbidity1("");
            setTurbidity2("");
            setTurbidity3("");
            setTurbidity4("");
            setTurbidity5("");
            setTotalDissolved("");
            setTotalDissolved1("");
            setTotalDissolved2("");
            setTotalDissolved3("");
            setTotalDissolved4("");
            setTotalDissolved5("");
            setInterpretation("");
            setInterpretation1("");
            setInterpretation2("");
            setInterpretation3("");
            setInterpretation4("");
            setInterpretation5("");

            setTestCompletion("");
            setSampleLocation("");
          }
        })
        .catch((err) => {});
    }
  }, []);

  const statusFunction = (responseData) => {
    if (
      role == "ROLE_CHEMIST" &&
      responseData.chemist_status == "CHEMIST_APPROVED"
    ) {
      setStatus((prevState) => ({
        ...prevState,
        saveStatus: true,
      }));
    }

    if (
      role == "ROLE_CHEMIST" &&
      responseData.chemist_status == "CHEMIST_APPROVED" &&
      (responseData.qc_status == "WAITING_FOR_APPROVAL" ||
        responseData.qc_status == "QA_APPROVED" ||
        responseData.qc_status == "QC_APPROVED" ||
        responseData.qc_status == "" ||
        responseData.qc_status == null)
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }

    if (
      role == "ROLE_MICROBIOLOGIST" &&
      responseData.micro_status == "MICROBIOLOGIST_APPROVED"
    ) {
      setStatus((prevState) => ({
        ...prevState,
        saveStatus: true,
      }));
    }

    if (
      role == "ROLE_MICROBIOLOGIST" &&
      responseData.micro_status == "MICROBIOLOGIST_APPROVED" &&
      (responseData.qc_status == "WAITING_FOR_APPROVAL" ||
        responseData.qc_status == "QA_APPROVED" ||
        responseData.qc_status == "QC_APPROVED" ||
        responseData.qc_status == "" ||
        responseData.qc_status == null)
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }

    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (responseData.chemist_status != "CHEMIST_APPROVED" ||
        responseData.micro_status !== "MICROBIOLOGIST_APPROVED")
    ) {
      message.warning("Chemist or Microbiologist Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-13/Summary");
      }, 1000);
    }

    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (responseData.qc_status == "QA_APPROVED" ||
        responseData.qc_status == "QC_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }

    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (responseData.qc_status == "QC_REJECTED" ||
        responseData.qc_status == "QA_REJECTED")
    ) {
      message.warning("Chemist or Microbiologist Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-13/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
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
        `${    API.prodUrl}/Precot/api/chemicaltest/ARF013/approval`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res);
        // window.location.reload();
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-13/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // window.print()
    console.log("print screen works");
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
        `${    API.prodUrl}/Precot/api/chemicaltest/ARF013/approval`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        console.log("messsage", res.data.message);
        // window.location.reload();
        message.success(res.data.message);
        // message.success(res.data.message);
        navigate("/Precot/QualityControl/F-13/Summary");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShiftChange = (value) => {
    console.log(" Shift ", value);
    setShift(value);
    // setGotobtn(false);
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
        return shift;
    }
  };

  const handleSave = () => {
    setSaveLoading();
    // const payload = {
    //   test_id: id,
    //   format_no: formatNo,
    //   revision_no: revisionNo,
    //   format: formatName,
    //   ref_sop_no: sopNo,
    //   unit: unit,
    //   sampled_on: date,
    //   year: year1,
    //   month: monthName,
    //   ar_no: arNo,
    //   ar_no_1: arNo1,
    //   ar_no_2: arNo2,
    //   ar_no_3: arNo3,
    //   ar_no_4: arNo4,
    //   ar_no_5: arNo5,
    //   ph_level_1: phLevel1,
    //   ph_level_2: phLevel2,
    //   ph_level_3: phLevel3,
    //   ph_level_4: phLevel4,
    //   ph_level_5: phLevel5,
    //   hardness_1: hardness1,
    //   hardness_2: hardness2,
    //   hardness_3: hardness3,
    //   hardness_4: hardness4,
    //   hardness_5: hardness5,
    //   turbidity_1: turbidity1,
    //   turbidity_2: turbidity2,
    //   turbidity_3: turbidity3,
    //   turbidity_4: turbidity4,
    //   turbidity_5: turbidity5,
    //   total_dissolved_1: totalDissolved1,
    //   total_dissolved_2: totalDissolved2,
    //   total_dissolved_3: totalDissolved3,
    //   total_dissolved_4: totalDissolved4,
    //   total_dissolved_5: totalDissolved5,
    //   interpretation_1: interpretation1,
    //   interpretation_2: interpretation2,
    //   interpretation_3: interpretation3,
    //   interpretation_4: interpretation4,
    //   interpretation_5: interpretation5,
    //   ph_level: phLevel,
    //   hardness: hardness,
    //   turbidity: turbidity,
    //   total_DISSOLVED: totalDissolved,
    //   interpretation: interpretation,
    //   test_completion: testCompletion,
    //   sample_location: sampleLocation,

    // };

    // Adjust the payload based on the role
    let adjustedPayload = {
      test_id: id,
      format_no: formatNo,
      revision_no: revisionNo,
      format: formatName,
      ref_sop_no: sopNo,
      unit: unit,
      sampled_on: date,
      year: year1,
      month: monthName,
      ar_no: arNo,
      ar_no_1: arNo1,
      ar_no_2: arNo2,
      ar_no_3: arNo3,
      ar_no_4: arNo4,
      ar_no_5: arNo5,
      ph_level_1: phLevel1,
      ph_level_2: phLevel2,
      ph_level_3: phLevel3,
      ph_level_4: phLevel4,
      ph_level_5: phLevel5,
      hardness_1: hardness1,
      hardness_2: hardness2,
      hardness_3: hardness3,
      hardness_4: hardness4,
      hardness_5: hardness5,
      turbidity_1: turbidity1,
      turbidity_2: turbidity2,
      turbidity_3: turbidity3,
      turbidity_4: turbidity4,
      turbidity_5: turbidity5,
      total_dissolved_1: totalDissolved1,
      total_dissolved_2: totalDissolved2,
      total_dissolved_3: totalDissolved3,
      total_dissolved_4: totalDissolved4,
      total_dissolved_5: totalDissolved5,
      interpretation_1: interpretation1,
      interpretation_2: interpretation2,
      interpretation_3: interpretation3,
      interpretation_4: interpretation4,
      interpretation_5: interpretation5,
      ph_level: phLevel,
      hardness: hardness,
      turbidity: turbidity,
      total_DISSOLVED: totalDissolved,
      interpretation: interpretation,
      test_completion: testCompletion,
      sample_location: sampleLocation,
    };

    // Role-based validation and adjustments
    if (role === "ROLE_CHEMIST") {
      // Only allow certain fields for chemist
      adjustedPayload = {
        ...adjustedPayload,
        // fields allowed for chemist (example)
        ar_no: arNo,
        ar_no_1: arNo1,
        ar_no_2: arNo2,
        ar_no_3: arNo3,
        ar_no_4: arNo4,
        ar_no_5: arNo5,
        ph_level_1: phLevel1,
        ph_level_2: phLevel2,
        ph_level_3: phLevel3,
        ph_level_4: phLevel4,
        ph_level_5: phLevel5,
        hardness_1: hardness1,
        hardness_2: hardness2,
        hardness_3: hardness3,
        hardness_4: hardness4,
        hardness_5: hardness5,
        turbidity_1: turbidity1,
        turbidity_2: turbidity2,
        turbidity_3: turbidity3,
        turbidity_4: turbidity4,
        turbidity_5: turbidity5,
        total_dissolved_1: totalDissolved1,
        total_dissolved_2: totalDissolved2,
        total_dissolved_3: totalDissolved3,
        total_dissolved_4: totalDissolved4,
        total_dissolved_5: totalDissolved5,
        ph_level: phLevel,
        hardness: hardness,
        turbidity: turbidity,
        total_DISSOLVED: totalDissolved,
        sample_location: sampleLocation,
      };
    } else if (role === "ROLE_MICROBIOLOGIST") {
      // Only allow certain fields for micro
      adjustedPayload = {
        ...adjustedPayload,
        // fields allowed for micro (example)
        test_completion: testCompletion,
        interpretation: interpretation,
        interpretation_1: interpretation1,
        interpretation_2: interpretation2,
        interpretation_3: interpretation3,
        interpretation_4: interpretation4,
        interpretation_5: interpretation5,
      };
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    axios
      .post(
        `${    API.prodUrl}/Precot/api/chemicaltest/ARF013/save/potableWaterARF013Report`,
        adjustedPayload,
        { headers }
      )
      .then((response) => {
        message.success("Potable Water Analysis Report Saved Successfully");
        setSaveLoading(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-13/Summary");
        }, 2000);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setSaveLoading(false);
      });
  };

  const submitData = () => {
    setSubmitLoading(true);

    // Set remarks to "NA" if it's empty or undefined
    const adjustedRemarks = remarks || "NA";

    let adjustedPayload = {
      test_id: id,
      format_no: formatNo,
      revision_no: revisionNo,
      format: formatName,
      ref_sop_no: sopNo,
      unit: unit,
      sampled_on: date,
      year: year1,
      month: monthName,
      ar_no: arNo,
      ar_no_1: arNo1,
      ar_no_2: arNo2,
      ar_no_3: arNo3,
      ar_no_4: arNo4,
      ar_no_5: arNo5,
      ph_level_1: phLevel1,
      ph_level_2: phLevel2,
      ph_level_3: phLevel3,
      ph_level_4: phLevel4,
      ph_level_5: phLevel5,
      hardness_1: hardness1,
      hardness_2: hardness2,
      hardness_3: hardness3,
      hardness_4: hardness4,
      hardness_5: hardness5,
      turbidity_1: turbidity1,
      turbidity_2: turbidity2,
      turbidity_3: turbidity3,
      turbidity_4: turbidity4,
      turbidity_5: turbidity5,
      total_dissolved_1: totalDissolved1,
      total_dissolved_2: totalDissolved2,
      total_dissolved_3: totalDissolved3,
      total_dissolved_4: totalDissolved4,
      total_dissolved_5: totalDissolved5,
      interpretation_1: interpretation1,
      interpretation_2: interpretation2,
      interpretation_3: interpretation3,
      interpretation_4: interpretation4,
      interpretation_5: interpretation5,
      ph_level: phLevel,
      hardness: hardness,
      turbidity: turbidity,
      total_DISSOLVED: totalDissolved,
      interpretation: interpretation,
      test_completion: testCompletion,
      sample_location: sampleLocation,
      remarks: adjustedRemarks,
    };

    // Role-based validation

    if (role === "ROLE_CHEMIST") {
      adjustedPayload = {
        ...adjustedPayload,
        ar_no: arNo || "NA",
        ar_no_1: arNo1 || "NA",
        ar_no_2: arNo2 || "NA",
        ar_no_3: arNo3 || "NA",
        ar_no_4: arNo4 || "NA",
        ar_no_5: arNo5 || "NA",
        ph_level_1: phLevel1 || "NA",
        ph_level_2: phLevel2 || "NA",
        ph_level_3: phLevel3 || "NA",
        ph_level_4: phLevel4 || "NA",
        ph_level_5: phLevel5 || "NA",
        hardness_1: hardness1 || "NA",
        hardness_2: hardness2 || "NA",
        hardness_3: hardness3 || "NA",
        hardness_4: hardness4 || "NA",
        hardness_5: hardness5 || "NA",
        turbidity_1: turbidity1 || "NA",
        turbidity_2: turbidity2 || "NA",
        turbidity_3: turbidity3 || "NA",
        turbidity_4: turbidity4 || "NA",
        turbidity_5: turbidity5 || "NA",
        total_dissolved_1: totalDissolved1 || "NA",
        total_dissolved_2: totalDissolved2 || "NA",
        total_dissolved_3: totalDissolved3 || "NA",
        total_dissolved_4: totalDissolved4 || "NA",
        total_dissolved_5: totalDissolved5 || "NA",
        sample_location: sampleLocation || "NA",
      };
    } else if (role === "ROLE_MICROBIOLOGIST") {
      adjustedPayload = {
        ...adjustedPayload,
        test_completion: testCompletion || "NA",
        interpretation: interpretation || "NA",
        interpretation_1: interpretation1 || "NA",
        interpretation_2: interpretation2 || "NA",
        interpretation_3: interpretation3 || "NA",
        interpretation_4: interpretation4 || "NA",
        interpretation_5: interpretation5 || "NA",
        remarks: adjustedRemarks || "NA",
      };
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${    API.prodUrl}/Precot/api/chemicaltest/ARF013/Submit/potableWaterARF013Report`,
        adjustedPayload,
        { headers }
      )
      .then((res) => {
        console.log("Response", res.data);
        message.success("Potable Water Analysis Report Submitted Successfully");
        navigate("/Precot/QualityControl/F-13/Summary");
      })
      .catch((err) => {
        console.log("Error", err);
        message.error(err.response?.data?.message || "Submission Failed");
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-13/Summary");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this number as needed

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PackingDetails.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(PackingDetails.length / itemsPerPage);

  const handleTextareaChange = (event) => {
    setRemarks(event.target.value);
  };
  // PhLevel
  const handlePHChange = (value) => {
    setPhLevel(value);
  };
  const handle_blur_pH = () => {
    if (phLevel < 6.5 || phLevel > 7.5) {
      message.error("Please enter a number between 6.5 and 7.5 for pH");
    }
  };

  // PhLevel1
  const handlePHChange1 = (value) => {
    setPhLevel1(value);
  };
  const handle_blur_pH1 = () => {
    if (phLevel < 6.5 || phLevel > 7.5) {
      message.error("Please enter a number between 6.5 and 7.5 for pH");
    }
  };
  // PhLevel2
  const handlePHChange2 = (value) => {
    setPhLevel2(value);
  };
  const handle_blur_pH2 = () => {
    if (phLevel < 6.5 || phLevel > 7.5) {
      message.error("Please enter a number between 6.5 and 7.5 for pH");
    }
  };
  // PhLevel3
  const handlePHChange3 = (value) => {
    setPhLevel3(value);
  };
  const handle_blur_pH3 = () => {
    if (phLevel < 6.5 || phLevel > 7.5) {
      message.error("Please enter a number between 6.5 and 7.5 for pH");
    }
  };
  // PhLevel4
  const handlePHChange4 = (value) => {
    setPhLevel4(value);
  };
  const handle_blur_pH4 = () => {
    if (phLevel < 6.5 || phLevel > 7.5) {
      message.error("Please enter a number between 6.5 and 7.5 for pH");
    }
  };

  // PhLevel5
  const handlePHChange5 = (value) => {
    setPhLevel5(value);
  };
  const handle_blur_pH5 = () => {
    if (phLevel < 6.5 || phLevel > 7.5) {
      message.error("Please enter a number between 6.5 and 7.5 for pH");
    }
  };

  // Hardness...
  const handlehardnessChange = (value) => {
    setHardness(value);
  };
  const handle_blur_hardness = () => {
    if (hardness < 0 || hardness > 100) {
      message.error("Please enter a number between 0 and 100 for Hardness");
    }
  };

  // Common function to handle hardness change
  //Hardness
  const handleHardnessChange = (value, setHardnessFn) => {
    setHardnessFn(value);
  };

  // Common function to handle blur event for hardness validation
  const handleBlurHardness = (hardness, setHardnessFn) => {
    if (hardness < 0 || hardness > 99) {
      message.error("Please enter a number between 0 and 99 for Hardness");
      // Reset the value if it is invalid
    }
  };

  // Hardness 1
  const handleHardness1Change = (value) =>
    handleHardnessChange(value, setHardness1);
  const handleBlurHardness1 = () => handleBlurHardness(hardness1, setHardness1);

  // Hardness 2
  const handleHardness2Change = (value) =>
    handleHardnessChange(value, setHardness2);
  const handleBlurHardness2 = () => handleBlurHardness(hardness2, setHardness2);

  // Hardness 3
  const handleHardness3Change = (value) =>
    handleHardnessChange(value, setHardness3);
  const handleBlurHardness3 = () => handleBlurHardness(hardness3, setHardness3);

  // Hardness 4
  const handleHardness4Change = (value) =>
    handleHardnessChange(value, setHardness4);
  const handleBlurHardness4 = () => handleBlurHardness(hardness4, setHardness4);

  // Hardness 5
  const handleHardness5Change = (value) =>
    handleHardnessChange(value, setHardness5);
  const handleBlurHardness5 = () => handleBlurHardness(hardness5, setHardness5);

  // Total Dissolved Solids...
  const handleTDS0Change = (value) => {
    setTotalDissolved(value);
  };
  const handle_blur_TDS = () => {
    if (totalDissolved < 0 || totalDissolved > 499) {
      message.error(
        "Please enter a number between 0 and 499 for Total Dissolved Solids"
      );
    }
  };

  // Total Dissolved Solids....
  const handleTDSChange = (value, setTDSFn) => {
    setTDSFn(value);
  };

  // Common function to handle blur event for hardness validation
  const handleBlurTDS = (totalDissolve, setTDSFn) => {
    if (totalDissolve < 0 || totalDissolve > 499) {
      message.error(
        "Please enter a number between 0 and 499 for Total Dissolved Solids"
      );
    }
  };

  // TDS1
  const handleTDS1Change = (value) =>
    handleTDSChange(value, setTotalDissolved1);
  const handleBlurTDS1 = () =>
    handleBlurTDS(totalDissolved1, setTotalDissolved1);
  // TDS 2
  const handleTDS2Change = (value) =>
    handleTDSChange(value, setTotalDissolved2);
  const handleBlurTDS2 = () =>
    handleBlurTDS(totalDissolved2, setTotalDissolved2);

  // TDS 3
  const handleTDS3Change = (value) =>
    handleTDSChange(value, setTotalDissolved3);
  const handleBlurTDS3 = () =>
    handleBlurTDS(totalDissolved3, setTotalDissolved3);

  // TDS 4
  const handleTDS4Change = (value) =>
    handleTDSChange(value, setTotalDissolved4);
  const handleBlurTDS4 = () =>
    handleBlurTDS(totalDissolved4, setTotalDissolved4);

  // TDS 5
  const handleTDS5Change = (value) =>
    handleTDSChange(value, setTotalDissolved5);
  const handleBlurTDS5 = () =>
    handleBlurTDS(totalDissolved5, setTotalDissolved5);

  const handleTurbidityChange = (value, setTurbidityFn) => {
    setTurbidityFn(value);
  };

  // Common function to handle blur event for hardness validation
  const handleBlurTurbidity = (turbidity, setTurbidityFn) => {
    if (turbidity < 0 || turbidity > 1) {
      message.error("Please enter a number between 0 and 1 for Turbidity");
    }
  };

  //turbidity
  const handleTurbidity0Change = (value) =>
    handleTurbidityChange(value, setTurbidity);
  const handleBlurTurbidity0 = () =>
    handleBlurTurbidity(turbidity, setTurbidity);

  // Turbidity 1
  const handleTurbidity1Change = (value) =>
    handleTurbidityChange(value, setTurbidity1);
  const handleBlurTurbidity1 = () =>
    handleBlurTurbidity(turbidity1, setTurbidity1);

  // Turbidity 2
  const handleTurbidity2Change = (value) =>
    handleTurbidityChange(value, setTurbidity2);
  const handleBlurTurbidity2 = () =>
    handleBlurTurbidity(turbidity2, setTurbidity2);

  // Turbidity 3
  const handleTurbidity3Change = (value) =>
    handleTurbidityChange(value, setTurbidity3);
  const handleBlurTurbidity3 = () =>
    handleBlurTurbidity(turbidity3, setTurbidity3);

  // Turbidity 4
  const handleTurbidity4Change = (value) =>
    handleTurbidityChange(value, setTurbidity4);
  const handleBlurTurbidity4 = () =>
    handleBlurTurbidity(turbidity4, setTurbidity4);

  // Turbidity 5
  const handleTurbidity5Change = (value) =>
    handleTurbidityChange(value, setTurbidity5);
  const handleBlurTurbidity5 = () =>
    handleBlurTurbidity(turbidity5, setTurbidity5);

  const formattedOperatorDate = selectedRow?.operator_submitted_on
    ? moment(selectedRow?.operator_submitted_on).format("DD/MM/YYYY HH:mm")
    : "";

  const formattedhodDate = selectedRow?.hod_submit_on
    ? moment(selectedRow?.hod_submit_on).format("DD/MM/YYYY HH:mm")
    : "";

  const totalProductionQty = currentItems.reduce(
    (total, item) => total + (item.ProductionQty || 0),
    0
  );
  console.log("Total", totalProductionQty);

  const items = [
    {
      key: "1",
      label: <p>Form</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "100%", margin: "auto", tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <td
                  colSpan="5"
                  rowSpan="2"
                  style={{
                    textAlign: "center",
                    padding: "7px",
                    fontWeight: "bold",
                  }}
                >
                  Sampled & Tested /Incubation Start on{" "}
                </td>
                <td colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                  A. R Number
                </td>
                <td colSpan="5" rowSpan="2" style={{ textAlign: "center" }}>
                  Sample Location
                </td>
                <td colSpan="12" style={{ textAlign: "center" }}>
                  Physical and Chemical Test{" "}
                </td>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  Microbiological testing Kit Method{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  pH (6.5 to 7.5){" "}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {" "}
                  Hardness (&lt; 100 ppm)
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  Total Dissolved Solids (&lt; 500 ppm){" "}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  Turbidity ( &lt; 2 NTU) 
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Test Completion Date{" "}
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Interpretation  
                </td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  colSpan="5"
                  rowspan="6"
                  style={{ textAlign: "center", padding: "7px" }}
                >
                  <Input
                    type="date"
                    style={{
                      width: "100%",
                      padding: "2px",
                      textAlign: "center",
                    }}
                    readOnly
                    value={date}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    style={{ width: "95%", border: "none", outline: "none" }}
                    value={arNo}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onInput={(e) => {
                      setArNo(e.target.value);
                    }}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Bleaching
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="6.5"
                    // max="7.5"
                    step="0.1"
                    onChange={handlePHChange}
                    value={phLevel}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 6.5 || value > 7.5) {
                        message.error(
                          "Please enter a number between 6.5 and 7.5 for pH"
                        );
                      }
                    }}
                  />
                  {/* <InputNumber max={5} step={0.1} disabled={disable.physicalAndChemicalTests} onChange={(value) => handleChange('an_re_number', value)} value={payload.an_re_number}/> */}
                </td>

                <td colSpan="3" style={{ textAlign: "center" }}>
                  {" "}
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="99"
                    value={hardness}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) =>
                    //   setHardness(value)}
                    onChange={handlehardnessChange}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 0 || value > 99) {
                        message.error(
                          "Please enter a number between 0 and 99 for Hardness"
                        );
                      }
                    }}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="499"
                    value={totalDissolved}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) => setTotalDissolved(value)}
                    onChange={handleTDS0Change}
                    onBlur={handle_blur_TDS}
                  />
                </td>

                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="1"
                    value={turbidity}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) => setTurbidity(value)}
                    onChange={handleTurbidity0Change}
                    onBlur={handleBlurTurbidity0}
                  />
                </td>
                <td colSpan="4" rowspan="6" style={{ textAlign: "center" }}>
                  <Input
                    type="date"
                    style={{
                      width: "100%",
                      padding: "2px",
                      textAlign: "center",
                    }}
                    min={date}
                    value={testCompletion}
                    readOnly={status.fieldMicro || status.fieldStatus}
                    onChange={(e) => setTestCompletion(e.target.value)}
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    style={{
                      width: "90%",
                      padding: "2px",
                      textAlign: "center",
                      border: "none",
                      outline: "none",
                    }}
                    value={interpretation}
                    readOnly={status.fieldMicro || status.fieldStatus}
                    onChange={(e) => {
                      setInterpretation(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                      // Check if the pressed key is not valid
                      if (
                        !isAlphanumeric.test(e.key) &&
                        ![
                          "Backspace",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "_",
                          " ",
                        ].includes(e.key)
                      ) {
                        e.preventDefault(); // Prevent the default action (character input)
                      }
                    }}
                  />
                </td>
              </tr>

              <tr>
                {/* {Row Two} */}
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    style={{ width: "95%", border: "none", outline: "none" }}
                    value={arNo1}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onInput={(e) => {
                      setArNo1(e.target.value);
                    }}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Spunlace
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="6.5"
                    // max="7.5"
                    step="0.1"
                    value={phLevel1}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onChange={handlePHChange1}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 6.5 || value > 7.5) {
                        message.error(
                          "Please enter a number between 6.5 and 7.5 for pH"
                        );
                      }
                    }}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="99"
                    value={hardness1}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) =>
                    //   setHardness1(value)}
                    onChange={handleHardness1Change}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 0 || value > 99) {
                        message.error(
                          "Please enter a number between 0 and 99 for Hardness"
                        );
                      }
                    }}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="499"
                    value={totalDissolved1}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) => setTotalDissolved1(value)}
                    onChange={handleTDS1Change}
                    onBlur={handleBlurTDS1}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="1"
                    value={turbidity1}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) =>setTurbidity1(value)}
                    onChange={handleTurbidity1Change}
                    onBlur={handleBlurTurbidity1}
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    style={{
                      width: "90%",
                      padding: "2px",
                      textAlign: "center",
                      border: "none",
                      outline: "none",
                    }}
                    value={interpretation1}
                    readOnly={status.fieldMicro || status.fieldStatus}
                    onChange={(e) => {
                      setInterpretation1(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                      // Check if the pressed key is not valid
                      if (
                        !isAlphanumeric.test(e.key) &&
                        ![
                          "Backspace",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "_",
                          " ",
                        ].includes(e.key)
                      ) {
                        e.preventDefault(); // Prevent the default action (character input)
                      }
                    }}
                  />
                </td>
              </tr>
              {/* {Row Three} */}
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    style={{ width: "95%", border: "none", outline: "none" }}
                    value={arNo2}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onInput={(e) => {
                      setArNo2(e.target.value);
                    }}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  VMI
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="6.5"
                    // max="7.5"
                    step="0.1"
                    value={phLevel2}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onChange={handlePHChange2}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 6.5 || value > 7.5) {
                        message.error(
                          "Please enter a number between 6.5 and 7.5 for pH"
                        );
                      }
                    }}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="99"
                    value={hardness2}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) =>  setHardness2(value)}
                    onChange={handleHardness2Change}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 0 || value > 99) {
                        message.error(
                          "Please enter a number between 0 and 99 for Hardness"
                        );
                      }
                    }}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="499"
                    value={totalDissolved2}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) =>
                    //   setTotalDissolved2(value)}
                    onChange={handleTDS2Change}
                    onBlur={handleBlurTDS2}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="1"
                    value={turbidity2}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) =>setTurbidity2(value)}
                    onChange={handleTurbidity2Change}
                    onBlur={handleBlurTurbidity2}
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    style={{
                      width: "90%",
                      padding: "2px",
                      textAlign: "center",
                      border: "none",
                      outline: "none",
                    }}
                    value={interpretation2}
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                      // Check if the pressed key is not valid
                      if (
                        !isAlphanumeric.test(e.key) &&
                        ![
                          "Backspace",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "_",
                          " ",
                        ].includes(e.key)
                      ) {
                        e.preventDefault(); // Prevent the default action (character input)
                      }
                    }}
                    readOnly={status.fieldMicro || status.fieldStatus}
                    onChange={(e) => {
                      setInterpretation2(e.target.value);
                    }}
                  />
                </td>
              </tr>

              {/* {Row four} */}
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    style={{ width: "95%", border: "none", outline: "none" }}
                    value={arNo3}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onInput={(e) => {
                      setArNo3(e.target.value);
                    }}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Canteen
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="6.5"
                    // max="7.5"
                    step="0.1"
                    value={phLevel3}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onChange={handlePHChange3}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 6.5 || value > 7.5) {
                        message.error(
                          "Please enter a number between 6.5 and 7.5 for pH"
                        );
                      }
                    }}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="99"
                    value={hardness3}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) =>  setHardness3(value)}
                    onChange={handleHardness3Change}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 0 || value > 99) {
                        message.error(
                          "Please enter a number between 0 and 99 for Hardness"
                        );
                      }
                    }}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="499"
                    value={totalDissolved3}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) => setTotalDissolved3(value)}
                    onChange={handleTDS3Change}
                    onBlur={handleBlurTDS3}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="1"
                    value={turbidity3}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) =>setTurbidity3(value)}
                    onChange={handleTurbidity3Change}
                    onBlur={handleBlurTurbidity3}
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    style={{
                      width: "90%",
                      padding: "2px",
                      textAlign: "center",
                      border: "none",
                      outline: "none",
                    }}
                    value={interpretation3}
                    readOnly={status.fieldMicro || status.fieldStatus}
                    onChange={(e) => {
                      setInterpretation3(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                      // Check if the pressed key is not valid
                      if (
                        !isAlphanumeric.test(e.key) &&
                        ![
                          "Backspace",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "_",
                          " ",
                        ].includes(e.key)
                      ) {
                        e.preventDefault(); // Prevent the default action (character input)
                      }
                    }}
                  />
                </td>
              </tr>

              {/* {Row five} */}
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    style={{ width: "95%", border: "none", outline: "none" }}
                    value={arNo4}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onInput={(e) => {
                      setArNo4(e.target.value);
                    }}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Can water{" "}
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="6.5"
                    // max="7.5"
                    step="0.1"
                    value={phLevel4}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onChange={handlePHChange4}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 6.5 || value > 7.5) {
                        message.error(
                          "Please enter a number between 6.5 and 7.5 for pH"
                        );
                      }
                    }}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="99"
                    value={hardness4}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) => setHardness4(value)}
                    onChange={handleHardness4Change}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 0 || value > 99) {
                        message.error(
                          "Please enter a number between 0 and 99 for Hardness"
                        );
                      }
                    }}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="499"
                    value={totalDissolved4}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) => setTotalDissolved4(value)}
                    onChange={handleTDS4Change}
                    onBlur={handleBlurTDS4}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="1"
                    value={turbidity4}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) =>setTurbidity4(value)}
                    onChange={handleTurbidity4Change}
                    onBlur={handleBlurTurbidity4}
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    style={{
                      width: "90%",
                      padding: "2px",
                      textAlign: "center",
                      border: "none",
                      outline: "none",
                    }}
                    value={interpretation4}
                    readOnly={status.fieldMicro || status.fieldStatus}
                    onChange={(e) => {
                      setInterpretation4(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                      // Check if the pressed key is not valid
                      if (
                        !isAlphanumeric.test(e.key) &&
                        ![
                          "Backspace",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "_",
                          " ",
                        ].includes(e.key)
                      ) {
                        e.preventDefault(); // Prevent the default action (character input)
                      }
                    }}
                  />
                </td>
              </tr>

              {/* {Row six} */}
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    style={{ width: "95%", border: "none", outline: "none" }}
                    value={arNo5}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onInput={(e) => {
                      setArNo5(e.target.value);
                    }}
                  />
                </td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {/* <input
                    type="text"
                    style={{ width: "95%", border: "none", outline: "none" }}
                    value={sampleLocation}
                    onChange={(e) => setSampleLocation(e.target.value)}
                  /> */}
                  <input
                    type="text"
                    style={{
                      width: "90%",
                      padding: "2px",
                      textAlign: "center",
                      border: "none",
                      outline: "none",
                    }}
                    value={sampleLocation}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onChange={(e) => {
                      const sanitizedValue = e.target.value.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                      );
                      setSampleLocation(sanitizedValue);
                    }}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="6.5"
                    // max="7.5"
                    step="0.1"
                    value={phLevel5}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    onChange={handlePHChange5}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 6.5 || value > 7.5) {
                        message.error(
                          "Please enter a number between 6.5 and 7.5 for pH"
                        );
                      }
                    }}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    value={hardness5}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) => setHardness5(value)}
                    onChange={handleHardness5Change}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (value < 0 || value > 99) {
                        message.error(
                          "Please enter a number between 0 and 99 for Hardness"
                        );
                      }
                    }}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="499"
                    value={totalDissolved5}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) =>
                    //   setTotalDissolved5(value)}
                    onChange={handleTDS5Change}
                    onBlur={handleBlurTDS5}
                  />
                </td>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <InputNumber
                    type="number"
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "95%", border: "none", outline: "none" }}
                    // min="0"
                    // max="1"
                    value={turbidity5}
                    readOnly={status.fieldchemist || status.fieldStatus}
                    // onChange={(value) =>setTurbidity5(value)}
                    onChange={handleTurbidity5Change}
                    onBlur={handleBlurTurbidity5}
                  />
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    style={{
                      width: "90%",
                      padding: "2px",
                      textAlign: "center",
                      border: "none",
                      outline: "none",
                    }}
                    value={interpretation5}
                    readOnly={status.fieldMicro || status.fieldStatus}
                    onChange={(e) => {
                      setInterpretation5(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                      // Check if the pressed key is not valid
                      if (
                        !isAlphanumeric.test(e.key) &&
                        ![
                          "Backspace",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "_",
                          " ",
                        ].includes(e.key)
                      ) {
                        e.preventDefault(); // Prevent the default action (character input)
                      }
                    }}
                  />
                </td>
              </tr>
            </tbody>
            <tr>
              <td colSpan="35" style={{ textAlign: "left", padding: "7px" }}>
                Remarks:
                <input
                  type="text"
                  style={{
                    width: "90%",
                    padding: "2px",
                    textAlign: "left",
                    border: "none",
                    outline: "none",
                  }}
                  disabled={status.fieldMicro || status.fieldStatus}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="35" style={{ textAlign: "left", padding: "7px" }}>
                Note : After incubation media colour remains yellowish brown
                with no haziness and No blackening, water is portable.Medium
                colour changes to yellowish brown with haze. H2S negative
                [Salmonella and Citrobacter absent, other organisms present],
                water is not portable.Medium colour changes to black. H2S
                negative [Salmonella and Citrobacter present, and/or other
                organisms present], water is not portable. Abbreviations:
                A.R-Analytical Reference, ppm-Parts per million, NTU-
                Nephelometric Turbidity unit.
              </td>
            </tr>
          </table>
        </div>
      ),
    },

    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table
            className="f18table"
            style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <td
                colSpan="12"
                style={{
                  textAlign: "center",
                }}
              >
                Tested By (Chemist):
              </td>
              <td
                colSpan="12"
                style={{
                  textAlign: "center",
                }}
              >
                Tested By (Microbiologist):
              </td>
              <td
                colSpan="11"
                style={{
                  textAlign: "center",
                }}
              >
                Approved By : QC/QA Manager{" "}
              </td>
            </tr>

            <tr>
              <td
                colSpan="12"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                <br />
                {getImage !== "" && (
                  <img className="signature" src={getImage} alt="Chemist" />
                )}
                <br />
                {printData.chemist_sign} <br />
                {formattedChemistDate}
              </td>

              <td
                colSpan="12"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                <br />
                {getImage2 !== "" && (
                  <img className="signature" src={getImage2} alt="micro" />
                )}
                <br />
                {printData.micro_sign} <br />
                {formattedMicroDate}
              </td>
              <td
                colSpan="11"
                style={{
                  fontSize: "12pt",
                  textAlign: "center",
                  height: "70px",
                  fontFamily: "Times New Roman, Times, serif",
                }}
              >
                {getImage3 !== "" && (
                  <img className="signature" src={getImage3} alt="QC" />
                )}
                <br />
                {printData.qc_sign} <br />
                {formattedQCDate}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div>
      <BleachingHeader
        unit="Unit-H"
        formName={"POTABLE WATER ANALYSIS REPORT"}
        formatNo={"PH-QCL01-AR-F-013 "}
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
          ...(role === "QC_MANAGER" || role === "QA_MANAGER"
            ? [
                <Button
                  key="approve"
                  loading={saveLoading}
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    // display: canDisplayButtons(),
                    display: status.submitStatus ? "none" : "flex",
                  }}
                  onClick={handleApprove}
                  shape="round"
                  icon={<img src={approveIcon} alt="Approve Icon" />}
                >
                  &nbsp;Approve
                </Button>,
                <Button
                  key="reject"
                  loading={submitLoading}
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    // display: canDisplayButtons(),
                    display: status.submitStatus ? "none" : "flex",
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
                    // display:canDisplayButton2(),
                    display: status.saveStatus ? "none" : "flex",
                  }}
                  shape="round"
                  icon={<IoSave color="#00308F" />}
                >
                  Save
                </Button>,
                <Button
                  key="submit"
                  loading={submitLoading}
                  type="primary"
                  onClick={submitData}
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    // display: canDisplayButtons(),
                    display: status.submitStatus ? "none" : "flex",
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
                navigate("/Precot");
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Input
          addonBefore="Date"
          placeholder="Date"
          value={date}
          readOnly
          // onChange={handleDateChange}
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />

        <Input
          addonBefore="year"
          placeholder="year"
          value={year1}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />

        <Input
          addonBefore="month"
          placeholder="month"
          value={monthName}
          readOnly
          style={{ width: "20%", marginLeft: "20px", height: "20px" }}
        />
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

export default QualityControl_f13;
