/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
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
  Radio,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader";
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment, { max } from "moment";
import API from "../baseUrl.json";
import logo from "../Assests/logo.png";
import { TbMenuDeep } from "react-icons/tb";
import { IoCreate, IoPrint, IoSave } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QC_f07 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date, equipment } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [fetchedDetails, setFetchedDetails] = useState("");
  const [equipmentBasedDetails, setEquipmentBasedDetails] = useState("");
  const [labId, setLabId] = useState("");
  const [obserId, setObserId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dateObject = new Date(date);
  const day = String(dateObject.getDate()).padStart(2, "0");
  const [hasFetched, setHasFetched] = useState(false);

  const month = String(dateObject.getMonth() + 1).padStart(2, "0");

  const year = dateObject.getFullYear();
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
  const [rows, setRows] = useState([{}]);
  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };
  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };
  const formattedDatewithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };
  const [maxWeight, setMaxWeight] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [tolerance, setTolerance] = useState("");
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  const [standeredWtOne, setStanderedWtOne] = useState("");
  const [standeredWtTwo, setStanderedWtTwo] = useState("");
  const [standeredWtThree, setStanderedWtThree] = useState("");
  const [observedReadingOne, setObservedReadingOne] = useState("");
  const [observedReadingTwo, setObservedReadingTwo] = useState("");
  const [observedReadingThree, setObservedReadingThree] = useState("");
  const [customTextmax, setCustomTextmax] = useState("");
  const [customTextmin, setCustomTextmin] = useState("");
  const [customTexttolerance, setCustomTexttolerance] = useState("");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const maxWeightLov = [
    { id: 1, value: "220g" },
    { id: 2, value: "820g" },
    { id: 3, value: "300g" },
  ];
  const minWeightLov = [
    { id: 1, value: "0.001g" },
    { id: 2, value: "0.01g" },
    { id: 3, value: "0.005g" },
    { id: 3, value: "0.1g" },
  ];

  const toleranceLov = [
    { id: 1, value: "0.0003g" },
    { id: 2, value: "0.06g " },
    { id: 3, value: "0.03" },
  ];

  // signature Image
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedDetails?.[0]?.qc_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
          setGetImage1(url);
        })
        .catch((err) => {
          console.log("Error in fetching image:", err);
        });
    }
  }, [fetchedDetails,     API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedDetails?.[0]?.chemist_sign;
    if (username) {
      console.log("usernameparams", username);

      axios
        .get(
          `${   API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
  }, [fetchedDetails,     API.prodUrl, token]);
  // const observationReadingOneOnBlur = () => {
  //   const lowerBound = standeredWtOne - tolerance;
  //   const upperBound = standeredWtOne + tolerance;
  //   if (observedReadingOne > upperBound || observedReadingOne < lowerBound) {
  //     message.error(`Please enter a number between ${lowerBound} and ${upperBound}.`);
  //     setObservedReadingOne("");
  //   }
  // };

  const observationReadingOneOnBlur = () => {
    const standardWeight = parseFloat(standeredWtOne);
    const toleranceValue = parseFloat(tolerance);

    if (isNaN(standardWeight) || isNaN(toleranceValue)) {
      message.error("Standard weight and tolerance must be valid numbers.");
      return;
    }
    const lowerBound = standardWeight - toleranceValue;
    const upperBound = standardWeight + toleranceValue;
    const observedValue = parseFloat(observedReadingOne);
    if (
      isNaN(observedValue) ||
      observedValue > upperBound ||
      observedValue < lowerBound
    ) {
      message.error(
        `Please enter a number between ${lowerBound} and ${upperBound}.`
      );
    }
  };

  const observationReadingTwoOnBlur = () => {
    const standardWeight = parseFloat(standeredWtTwo);
    const toleranceValue = parseFloat(tolerance);

    if (isNaN(standardWeight) || isNaN(toleranceValue)) {
      message.error("Standard weight and tolerance must be valid numbers.");
      return;
    }
    const lowerBound = standardWeight - toleranceValue;
    const upperBound = standardWeight + toleranceValue;
    const observedValue = parseFloat(observedReadingTwo);
    if (
      isNaN(observedValue) ||
      observedValue > upperBound ||
      observedValue < lowerBound
    ) {
      message.error(
        `Please enter a number between ${lowerBound} and ${upperBound}.`
      );
    }
  };
  const observationReadingThreeOnBlur = () => {
    const standardWeight = parseFloat(standeredWtThree);
    const toleranceValue = parseFloat(tolerance);

    if (isNaN(standardWeight) || isNaN(toleranceValue)) {
      message.error("Standard weight and tolerance must be valid numbers.");
      return;
    }
    const lowerBound = standardWeight - toleranceValue;
    const upperBound = standardWeight + toleranceValue;
    const observedValue = parseFloat(observedReadingThree);
    if (
      isNaN(observedValue) ||
      observedValue > upperBound ||
      observedValue < lowerBound
    ) {
      message.error(
        `Please enter a number between ${lowerBound} and ${upperBound}.`
      );
    }
  };

  const roleauth = localStorage.getItem("role");

  const disabled =
    (roleauth === "ROLE_CHEMIST" &&
      fetchedDetails?.[0]?.chemist_status === "CHEMIST_APPROVED" &&
      fetchedDetails?.[0]?.qc_status === "WAITING_FOR_APPROVAL") ||
    fetchedDetails?.[0]?.qc_status === "QA_APPROVED" ||
    fetchedDetails?.[0]?.qc_status === "QC_APPROVED" ||
    (roleauth === "QA_MANAGER" &&
      (fetchedDetails?.[0]?.qc_status === "WAITING_FOR_APPROVAL" ||
        fetchedDetails?.[0]?.qc_status === "QA_APPROVED" ||
        fetchedDetails?.[0]?.qc_status === "QC_APPROVED" ||
        fetchedDetails?.[0]?.qc_status === "QA_REJECTED" ||
        fetchedDetails?.[0]?.qc_status === "QC_REJECTED")) ||
    (roleauth === "QC_MANAGER" &&
      (fetchedDetails?.[0]?.qc_status === "WAITING_FOR_APPROVAL" ||
        fetchedDetails?.[0]?.qc_status === "QA_APPROVED" ||
        fetchedDetails?.[0]?.qc_status === "QC_APPROVED" ||
        fetchedDetails?.[0]?.qc_status === "QC_REJECTED" ||
        fetchedDetails?.[0]?.qc_status === "QA_REJECTED")) ||
    (roleauth === "CHEMIST_DESIGNEE" &&
      (fetchedDetails?.[0]?.qc_status === "WAITING_FOR_APPROVAL" ||
        fetchedDetails?.[0]?.qc_status === "QA_APPROVED" ||
        fetchedDetails?.[0]?.qc_status === "QC_APPROVED" ||
        fetchedDetails?.[0]?.qc_status === "QC_REJECTED" ||
        fetchedDetails?.[0]?.qc_status === "QA_REJECTED"));

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Display Button Based on Role Status
  const canDisplayButtons = () => {
    if (roleauth == "ROLE_CHEMIST") {
      if (
        fetchedDetails?.[0]?.chemist_status == "CHEMIST_APPROVED" &&
        (fetchedDetails?.[0]?.qc_status == "QA_REJECTED" ||
          fetchedDetails?.[0]?.qc_status == "QC_REJECTED")
      ) {
        return "block";
      } else if (
        (fetchedDetails?.[0]?.chemist_status == "CHEMIST_APPROVED" &&
          fetchedDetails?.[0]?.qc_status == "WAITING_FOR_APPROVAL") ||
        fetchedDetails?.[0]?.qc_status == "QA_APPROVED" ||
        fetchedDetails?.[0]?.qc_status == "QC_APPROVED"
      ) {
        return "none";
      }
    } else if (
      roleauth == "QA_MANAGER" ||
      roleauth == "QC_MANAGER" ||
      roleauth == "CHEMIST_DESIGNEE"
    ) {
      if (
        fetchedDetails?.[0]?.qc_status == "QA_APPROVED" ||
        fetchedDetails?.[0]?.qc_status == "QC_APPROVED" ||
        fetchedDetails?.[0]?.qc_status == "QA_REJECTED" ||
        fetchedDetails?.[0]?.qc_status == "QC_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        fetchedDetails?.[0]?.qc_status == "QA_APPROVED" ||
        fetchedDetails?.[0]?.qc_status == "QC_APPROVED" ||
        fetchedDetails?.[0]?.qc_status == "QA_REJECTED" ||
        fetchedDetails?.[0]?.qc_status == "QC_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (roleauth == "ROLE_CHEMIST") {
      if (
        fetchedDetails?.[0]?.chemist_status == "CHEMIST_APPROVED" &&
        (fetchedDetails?.[0]?.qc_status == "QA_REJECTED" ||
          fetchedDetails?.[0]?.qc_status == "QC_REJECTED")
      ) {
        return "none";
      } else if (
        fetchedDetails?.[0]?.chemist_status == "CHEMIST_APPROVED" &&
        (fetchedDetails?.[0]?.qc_status == "WAITING_FOR_APPROVAL" ||
          fetchedDetails?.[0]?.qc_status == "QA_APPROVED" ||
          fetchedDetails?.[0]?.qc_status == "QC_APPROVED")
      ) {
        return "none";
      }
    } else if (
      roleauth == "QA_MANAGER" ||
      roleauth == "QC_MANAGER" ||
      roleauth == "CHEMIST_DESIGNEE"
    ) {
      if (
        fetchedDetails?.[0]?.qc_status == "QA_APPROVED" ||
        fetchedDetails?.[0]?.qc_status == "QC_APPROVED" ||
        fetchedDetails?.[0]?.qc_status == "QA_REJECTED" ||
        fetchedDetails?.[0]?.qc_status == "QC_REJECTED" ||
        emptyarraycheck == 0
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        fetchedDetails?.[0]?.qc_status == "QA_APPROVED" ||
        fetchedDetails?.[0]?.qc_status == "QC_APPROVED" ||
        fetchedDetails?.[0]?.qc_status == "QA_REJECTED" ||
        fetchedDetails?.[0]?.qc_status == "QC_APPROVED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const handleRejectModal = () => {
    setShowModal(true);
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .post(
        `${   API.prodUrl}/Precot/api/chemicaltest/CLF007/approval`,
        {
          id: labId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QC/F-07/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .post(
        `${   API.prodUrl}/Precot/api/chemicaltest/CLF007/approval`,
        {
          id: labId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QC/F-07/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSave = async () => {
    try {
      await SaveReport();
    } catch (error) {
      console.error("Error saving Record:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitRecord();
    } catch (error) {
      console.error("Error submitting Record..", error);
    }
  };

  const SaveReport = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        lab_id: labId,
        format: "WEIGHING SCALE CALIBRATION REPORT ",
        format_no: "PH-QCL01/F-007",
        revision_no: 1,
        ref_sop_no: "PH-QCL01-D-04",
        unit: "H",
        frequency: "Daily",
        eq_id_no: equipment,
        date: date,
        month: monthName,
        year: year,
        text: standeredWtOne,
        number: standeredWtTwo,
        number_b: standeredWtThree,
        tolerance: tolerance,
        balancemaxweight: maxWeight === "Other" ? customTextmax : maxWeight,
        balanceminweight: minWeight === "Other" ? customTextmin : minWeight,
        remark: "",
        obser: [
          {
            id: obserId,
            lab_id: labId,
            status: status,
            remark: remark,
            test_lov: observedReadingOne,
            number_a: observedReadingTwo,
            number_b: observedReadingThree,
          },
        ],
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${   API.prodUrl}/Precot/api/chemicaltest/CLF007/save/wigClf007`,
        payload,
        { headers }
      );
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/QC/F-07/Summary");
      }, 1500);
      message.success("Record Saved Successfully..");
      // Mark record as finalized
    } catch (error) {
      message.error(error.response.data.message);

      throw new Error("Failed to save Record !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitRecord = async () => {
    setSubmitLoading(true);
    if (!status) {
      message.warning("Status Required");
      setSubmitLoading(false);
      return;
    }
    // if(maxWeight =="null" || maxWeight==""){
    //   message.warning("Balance Max. Weight Required");
    //   setSubmitLoading(false);
    //   return;
    // }
    // if(minWeight =="null" || minWeight==""){
    //   message.warning("Balance Min.Weight Required");
    //   setSubmitLoading(false);
    //   return;
    // }
    // if(tolerance =="null" || tolerance==""){
    //   message.warning("Tolerance Required");
    //   setSubmitLoading(false);
    //   return;
    // }
    // if(standeredWtOne =="null" || standeredWtOne==""){
    //   message.warning("Standard Weights Required");
    //   setSubmitLoading(false);
    //   return;
    // }
    // if(standeredWtTwo =="null" || standeredWtTwo==""){
    //   message.warning("Standard Weights Required");
    //   setSubmitLoading(false);
    //   return;
    // }
    // if(standeredWtThree =="null" || standeredWtThree==""){
    //   message.warning("Standard Weights Required");
    //   setSubmitLoading(false);
    //   return;
    // }

    try {
      const payload = {
        lab_id: labId,
        format: "WEIGHING SCALE CALIBRATION REPORT ",
        format_no: "PH-QCL01/F-007",
        revision_no: 1,
        ref_sop_no: "PH-QCL01-D-04",
        unit: "H",
        frequency: "Daily",
        eq_id_no: equipment,
        date: date,
        month: monthName,
        year: year,
        text: standeredWtOne || "NA",
        number: standeredWtTwo || "NA",
        number_b: standeredWtThree || "NA",
        tolerance: tolerance || "NA",
        balancemaxweight: maxWeight || "NA",
        balanceminweight: minWeight || "NA",
        remark: "",
        obser: [
          {
            id: obserId,
            lab_id: labId,
            status: status,
            remark: remark || "NA",
            test_lov: observedReadingOne || "0",
            number_a: observedReadingTwo || "0",
            number_b: observedReadingThree || "0",
          },
        ],
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${   API.prodUrl}/Precot/api/chemicaltest/CLF007/Submit/wigClf007`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QC/F-07/Summary");
      }, 1500);

      message.success("Submitted Successfully..!");
      // Mark record as finalized
    } catch (error) {
      message.error(error.response.data.message);
      throw new Error("Failed to submit Record!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QC/F-07/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
  }, []);

  useEffect(() => {
    console.log("fetchedDetails", fetchedDetails);
    if (!Array.isArray(fetchedDetails) || fetchedDetails.length === 0) {
      console.log("Calling fetchEquipmentBasedDetails...");
      fetchEquipmentBasedDetails();
    } else if (!hasFetched) {
      console.log("Calling fetchDetailsByDate...");
      fetchDetailsByDate();
      setHasFetched(true);
    }
  }, [fetchedDetails, hasFetched]);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${   API.prodUrl}/Precot/api/chemicaltest/CLF007?eq_no=${equipment}&year=${year}&month=${monthName}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);

      if (Array.isArray(response.data) && response.data.length > 0) {
        setFetchedDetails(response.data);
        if (
          ((roleauth == "QA_MANAGER" ||
            roleauth == "QC_MANAGER" ||
            roleauth == "CHEMIST_DESIGNEE") &&
            response.data?.[0]?.chemist_status !== "CHEMIST_APPROVED") ||
          ((roleauth == "QA_MANAGER" ||
            roleauth == "QC_MANAGER" ||
            roleauth == "CHEMIST_DESIGNEE") &&
            (response.data?.[0]?.qc_status == "QA_REJECTED" ||
              response.data?.[0]?.qc_status == "QC_REJECTED"))
        ) {
          message.error("Chemist Yet Not Approved");
          setTimeout(() => {
            navigate("/Precot/QC/F-07/Summary");
          }, 1500);
        }

        if (response.data) {
          const data = response.data[0];
          setLabId(data?.lab_id);
          setMaxWeight(data?.balancemaxweight);
          setMinWeight(data?.balanceminweight);
          setTolerance(data?.tolerance);
          setStanderedWtOne(data?.text);
          setStanderedWtTwo(data?.number);
          setStanderedWtThree(data?.number_b);
          setObservedReadingOne(data?.obser?.[0]?.test_lov);
          setObservedReadingTwo(data?.obser?.[0]?.number_a);
          setObservedReadingThree(data?.obser?.[0]?.number_b);
          setObserId(data?.obser?.[0]?.id);
          setStatus(data?.obser?.[0]?.status);
          setRemark(data?.obser?.[0]?.remark);
        }
      }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };

  const fetchEquipmentBasedDetails = async () => {
    console.log("pde setting");
    try {
      const response = await axios.get(
        `${   API.prodUrl}/Precot/api/chemicaltest/CLF007/PDE?eq_no=${equipment}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setStanderedWtOne(response.data[0].stdw1);
      setStanderedWtTwo(response.data[0].stdw2);
      setStanderedWtThree(response.data[0].stdw3);
      setMaxWeight(response.data[0].biMaxWT);
      setMinWeight(response.data[0].biMinWT);
    } catch (error) {
      message.error(error.message);
    }
  };

  const items = [
    {
      key: "1",
      label: <p>WEIGHING SCALE CALIBRATION</p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th
                colSpan="5"
                rowSpan="2"
                style={{ textAlign: "center", height: "25px" }}
              >
                S.No.
              </th>
              <th colSpan="15" style={{ textAlign: "center", height: "25px" }}>
                Standard Weights in g/Kg{" "}
              </th>
              <td colSpan="15" style={{ textAlign: "center" }}>
                <Input
                  className="inp-new"
                  value={standeredWtOne}
                  onChange={(e) => setStanderedWtOne(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 30,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown}
                  type="text"
                />
              </td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                <Input
                  className="inp-new"
                  value={standeredWtTwo}
                  onChange={(e) => setStanderedWtTwo(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 30,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown}
                  type="text"
                />
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                <Input
                  className="inp-new"
                  value={standeredWtThree}
                  onChange={(e) => setStanderedWtThree(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 30,
                    border: "none",
                  }}
                  onKeyDown={handleKeyDown}
                  type="text"
                />
              </td>
              <th colSpan="15" rowSpan="2" style={{ textAlign: "center" }}>
                Remark{" "}
              </th>
              <th colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                Status{" "}
              </th>
            </tr>
            <tr>
              <th colSpan="15" style={{ textAlign: "center", height: "25px" }}>
                Date{" "}
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Observed readings{" "}
              </th>
            </tr>
            <tr>
              <td colSpan="5" style={{ textAlign: "center", height: "3  0px" }}>
                1
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                {formattedDate(date)}
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                <Input
                  className="inp-new"
                  value={observedReadingOne}
                  disabled={disabled}
                  onChange={(e) => setObservedReadingOne(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 30,
                    border: "none",
                  }}
                  onBlur={observationReadingOneOnBlur}
                  type="text"
                />
              </td>
              <td colSpan="10" style={{ textAlign: "center" }}>
                <Input
                  className="inp-new"
                  value={observedReadingTwo}
                  disabled={disabled}
                  onChange={(e) => setObservedReadingTwo(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 30,
                    border: "none",
                  }}
                  onBlur={observationReadingTwoOnBlur}
                  type="text"
                />
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                <Input
                  className="inp-new"
                  value={observedReadingThree}
                  disabled={disabled}
                  onChange={(e) => setObservedReadingThree(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 30,
                    border: "none",
                  }}
                  onBlur={observationReadingThreeOnBlur}
                  type="text"
                />
              </td>
              <td colSpan="15" style={{ textAlign: "center" }}>
                <Input
                  className="inp-new"
                  value={remark}
                  disabled={disabled}
                  onChange={(e) => setRemark(e.target.value)}
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: 30,
                    border: "none",
                  }}
                  type="text"
                />
              </td>
              <td colSpan="10">
                <Radio.Group
                  onChange={handleStatusChange}
                  value={status}
                  style={{ marginLeft: "9px" }}
                  disabled={disabled}
                >
                  <Radio value="Y">OK</Radio>
                  <Radio value="N">NOT OK</Radio>
                </Radio.Group>
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
          <table style={{ width: "60%", margin: "auto" }}>
            <tr>
              <th colSpan="15" style={{ textAlign: "center", height: "30px" }}>
                Calibrated By{" "}
              </th>
              <th colSpan="15" style={{ textAlign: "center" }}>
                Verified By{" "}
              </th>
            </tr>
            <tr>
              <td colSpan="15" style={{ textAlign: "center", height: "100px" }}>
                {getImage2 && (
                  <img
                    src={getImage2}
                    alt={`QA Chemist Sign`}
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: "10px",
                      objectFit: "contain",
                      marginTop: "20px",
                    }}
                  />
                )}
                <br />
                {fetchedDetails?.[0]?.chemist_sign}
                <br />
                {formattedDatewithTime(fetchedDetails?.[0]?.chemist_submit_on)}
              </td>
              <td colSpan="15" style={{ textAlign: "center", height: "100px" }}>
                {getImage1 && (
                  <img
                    src={getImage1}
                    alt={`QA Manager Sign`}
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: "10px",
                      objectFit: "contain",
                      marginTop: "20px",
                    }}
                  />
                )}
                <br />
                {fetchedDetails?.[0]?.qc_sign}
                <br />
                {formattedDatewithTime(fetchedDetails?.[0]?.qc_submit_on)}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="WEIGHING SCALE CALIBRATION REPORT "
        formatNo="PH-QCL01/F-007"
        sopNo="PH-QCL01-D-04"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "QA_MANAGER" ||
          role === "ROLE_QA" ||
          role === "CHEMIST_DESIGNEE" ||
          role === "QC_MANAGER" ? (
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
            onClick={handleBack}
            shape="round"
            icon={<GoArrowLeft color="#00308F" />}
          >
            &nbsp;Back
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

      {/* Unique Param Row*/}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Input
          addonBefore="Month & Year:"
          placeholder="Month & Year"
          value={`${monthName} / ${year}`}
          style={{ width: "100%", height: "35px" }}
        />
        <Input
          addonBefore="Equipment Name:"
          placeholder="Equipment Name"
          value={equipment}
          style={{ width: "100%", height: "35px" }}
        />
        <Input
          addonBefore="Frequency:"
          value={"Daily"}
          style={{ width: "90%", height: "35px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {/* <Input.Group compact>
          <div style={{ width: '32%' }}>
            <Input addonBefore="Balance Max. Wt:" style={{ width: '100%', height: '35px' }} disabled />
          </div>
          <div style={{ width: '68%' }}>
            <Select
              value={maxWeight}
              onChange={handleMaxWeightChange}
              style={{ width: '100%', height: '36x', borderRadius: "0px", border: "1px solid #dddd", backgroundColor: "white" }}
              disabled={disabled}
            >
              <Select.Option value="" disabled selected>
              Select Balance Max. Weight
            </Select.Option>
            {maxWeightLov.map((option) => (
           <Select.Option key={option.id} value={option.value}>
           {option.value}
          </Select.Option>
          ))}
          <option value="Other">Other</option>
            </Select>
            {maxWeight === 'Other' && (
    <Input
      type="text"
      className="inp-new"
      value={customTextmax}
      onChange={(e) => setCustomTextmax(e.target.value)}
      placeholder="Enter Max wt."
      style={{ width: '100%', height: '36x', borderRadius: "0px", border: "1px solid #dddd", backgroundColor: "white" ,marginLeft:"2px"}}
    />
  )}
          </div>
        </Input.Group>
        <Input.Group compact>
          <div style={{ width: '31%' }}>
            <Input addonBefore="Balance Min. Wt:" style={{ width: '100%', height: '35px' }} disabled />
          </div>
          <div style={{ width: '69%' }}>
            <Select
              value={minWeight}
              onChange={handleMinWeightChange}
              style={{ width: '100%', height: '36x', borderRadius: "0px", border: "1px solid #dddd", backgroundColor: "white" }}
              disabled={disabled}
            >
              <Select.Option value="" disabled selected>
              Select Balance Min. Weight
            </Select.Option>
            {minWeightLov.map((option) => (
           <Select.Option key={option.id} value={option.value}>
           {option.value}
          </Select.Option>
          ))}
          <option value="Other">Other</option>
            </Select>

            {minWeight=== 'Other' && (
        <Input
        className="inp-new"
          type="text"
          value={customTextmin}
          onChange={(e) => setCustomTextmin(e.target.value)}
          placeholder="Enter Min Wt."
          style={{ width: '100%', height: '36x', borderRadius: "0px", border: "1px solid #dddd", backgroundColor: "white" ,marginLeft:"2px"}}
        />
      )}

          </div>
        </Input.Group>
        <Input.Group compact>
          <div style={{ width: '20%' }}>
            <Input addonBefore="Tolerance:" style={{ width: '100%', height: '35px' }} disabled />
          </div>
          <div style={{ width: '80%' }}>
            <Select
              value={tolerance}
              onChange={handleToleranceChange}
              style={{ width: '100%', height: '36x', borderRadius: "0px", border: "1px solid #dddd", backgroundColor: "white" }}
              disabled={disabled}
            >
              <Select.Option value="" disabled selected>
              Select Tolerance
            </Select.Option>
            {toleranceLov.map((option) => (
           <Select.Option key={option.id} value={option.value}>
           {option.value}
          </Select.Option>
          ))}
          <option value="Other">Other</option>
         
            </Select>
            {tolerance === 'Other' && (
        <Input
        className="inp-new"
          type="text"
          value={customTexttolerance}
          onChange={(e) => setCustomTexttolerance(e.target.value)}
          style={{ width: '100%', height: '36x', borderRadius: "0px", border: "1px solid #dddd", backgroundColor: "white" ,marginLeft:"2px"}}
          placeholder="Enter Tolerance"
        />
      )}
          </div>
        </Input.Group> */}
        <Input
          addonBefore="Balance Max. Weight:"
          value={maxWeight}
          onChange={(e) => {
            setMaxWeight(e.target.value);
          }}
          type="text"
          style={{ width: "90%", height: "35px" }}
        />
        <Input
          addonBefore="Balance Min.Weight:"
          value={minWeight}
          onChange={(e) => {
            setMinWeight(e.target.value);
          }}
          style={{ width: "90%", height: "35px" }}
        />
        <Input
          addonBefore="Tolerance:"
          value={tolerance}
          type="text"
          onChange={(e) => {
            setTolerance(e.target.value);
          }}
          style={{ width: "90%", height: "35px" }}
        />
      </div>
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
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </Modal>

      <Tabs
        defaultActiveKey="1"
        items={items}
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

export default QC_f07;
