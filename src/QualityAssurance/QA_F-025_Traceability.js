/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Input,
  message,
  Modal,
  Select,
  Tabs,
  Tooltip
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { IoSave } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import API from "../baseUrl.json";
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QA_f25 = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { date, departments, BMRNo } = state || {};
  const [Customer, SetCustomer] = useState(""); 
  const [Po_No, SetPo_No] = useState("");
  const [TQ_Cartons, SetTQ_Cartons] = useState("");
  const [TQ_Bags, SetTQ_Bags] = useState("");
  const [QD_Cartons, SetQD_Cartons] = useState("");
  const [QD_Bags, SetQD_Bags] = useState(""); 
  const [endTime, setEndTime] = useState(null);
  const [Reason_Traceability, setReason_Traceability] = useState("");
  const [peoples_involved, Setpeoples_involved] = useState("");
  const [Team_Members, SetTeam_Members] = useState("");
  const [QA_Cartons, SetQA_Cartons] = useState("");
  const [QA_Bags, SetQA_Bags] = useState("");
  const [timeDifference, setTimeDifference] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [BmrNO, setBmrNo] = useState(""); 
  const [conclusion, setConclusion] = useState(null); 
  const validateTimes = (start, end) => {
    const startMoment = moment(start, "HH:mm");
    const endMoment = moment(end, "HH:mm");

    if (endMoment.isSameOrBefore(startMoment)) {
      message.error("End time must be after start time.");
      setEndTime(""); // Reset end time if validation fails
      setTimeDifference(""); // Clear time difference
    } else {
      const diffMinutes = endMoment.diff(startMoment, "minutes");
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      setTimeDifference(`${hours} hours and ${minutes} minutes`);
    }
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    setEndTime(""); // Reset end time when start time changes
    setTimeDifference(""); // Clear time difference when start time changes
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    validateTimes(startTime, newEndTime); // Validate and calculate the difference
  };

  const handleConclusionChange = (value) => {
    setConclusion(value);
  };

  const [getImage, setGetImage] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false); 
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [Methodology, SetMethodology] = useState("");
  const [Product, SetProduct] = useState("");
  const [Lot_No, SetLot_No] = useState("");
  const [ProblemFaced, SetProblemFaced] = useState("");
  const [ActionTaken, SetActionTaken] = useState("");
  const [Recommendation, SetRecommendation] = useState("");
  const [id, setid] = useState("");

  const year = date ? date.split("-")[0] : "";
  const monthNumber = date ? date.split("-")[1] : "";

  const month = monthNumber
    ? [
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
      ][parseInt(monthNumber, 10) - 1]
    : "";
  const [showModal, setShowModal] = useState(false);
  const dateObject = new Date(date);
  const day = String(dateObject.getDate()).padStart(2, "0"); 
  const [selectedRow, setSelectedRow] = useState("");

  const formattedDate = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return "";
  };

  const [selectedTime, setSelectedTime] = useState(null);

  

  const canDisplayButtons = () => {
    (role === "QA_MANAGER" &&
      (selectedRow.qaManagerOrDesigneeStatus === "" ||
        selectedRow.qaManagerOrDesigneeStatus ===
          "DESIGNEE_OR_QA_MANAGER_SAVED" ||
        selectedRow.qaManagerOrDesigneeStatus === "QA_MANAGER_MR_REJECTED")) ||
      role === "ROLE_DESIGNEE";
  };

  const canShowSubmitButton =
    (role === "QA_MANAGER" &&
      (selectedRow.message === "No data" ||
        selectedRow.qaManagerOrDesigneeStatus === "" ||
        selectedRow.qaManagerOrDesigneeStatus ===
          "DESIGNEE_OR_QA_MANAGER_SAVED" ||
        selectedRow.qaManagerOrDesigneeStatus === "QA_MANAGER_MR_REJECTED" ||
        selectedRow.qaManagerOrMrStatus === "QA_MANAGER_MR_REJECTED")) ||
    (role === "ROLE_DESIGNEE" &&
      (selectedRow.qaManagerOrDesigneeStatus !==
        "DESIGNEE_OR_QA_MANAGER_SUBMITTED" ||
        selectedRow.qaManagerOrMrStatus === "QA_MANAGER_MR_REJECTED"));

  const canShowSaveButton =
    (role === "QA_MANAGER" &&
      (selectedRow.message === "No data" ||
        selectedRow.qaManagerOrDesigneeStatus === "" ||
        selectedRow.qaManagerOrDesigneeStatus ===
          "DESIGNEE_OR_QA_MANAGER_SAVED")) ||
    (role === "ROLE_DESIGNEE" &&
      selectedRow.qaManagerOrDesigneeStatus !==
        "DESIGNEE_OR_QA_MANAGER_SUBMITTED");

  const disabledCondition =
    (role === "QA_MANAGER" &&
      selectedRow.qaManagerOrDesigneeStatus ===
        "DESIGNEE_OR_QA_MANAGER_SUBMITTED" &&
      selectedRow.qaManagerOrMrStatus !== "QA_MANAGER_MR_REJECTED") ||
    (role === "ROLE_MR" &&
      selectedRow.qaManagerOrDesigneeStatus ===
        "DESIGNEE_OR_QA_MANAGER_SUBMITTED") ||
    (role === "ROLE_DESIGNEE" &&
      selectedRow.qaManagerOrDesigneeStatus ===
        "DESIGNEE_OR_QA_MANAGER_SUBMITTED" &&
      selectedRow.qaManagerOrMrStatus !== "QA_MANAGER_MR_REJECTED");

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.qaManagerOrDesigneeSign;
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
        .catch((err) => {
          
        });
    }
  }, [selectedRow,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = selectedRow?.qaManagerOrMrSign;
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
        .catch((err) => {
          
        });
    }
  }, [selectedRow,API.prodUrl, token]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };

  let formatted_qa_designee_managerDate;
  if (selectedRow?.qaManagerOrDesigneeSubmitOn) {
    formatted_qa_designee_managerDate = moment(
      selectedRow?.qaManagerOrDesigneeSubmitOn
    ).format("DD/MM/YYYY HH:mm");
  } else {
    formatted_qa_designee_managerDate = "";
  }

  let formatted_qa_MR_managerDate;
  if (selectedRow?.qaManagerOrMrApprovedOn) {
    formatted_qa_MR_managerDate = moment(
      selectedRow?.qaManagerOrMrApprovedOn
    ).format("DD/MM/YYYY HH:mm");
  } else {
    formatted_qa_MR_managerDate = "";
  }

  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/qa/SummaryOfTraceability/approveOrReject`,
        {
          id: id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-25/Summary");
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
      .put(
        `${API.prodUrl}/Precot/api/qa/SummaryOfTraceability/approveOrReject`,
        {
          id: id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-25/Summary");
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
      await SaveManagement();
    } catch (error) {
      console.error("Error saving Management Of Incidence:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitManagementOfIncidence();
    } catch (error) {
      console.error("Error submitting Management Of Incidence..", error);
    }
  };

  const SaveManagement = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        unit: "Unit-H",
        formatName: "SUMMARY OF TRACEABILITY",
        formatNo: "PH-QAD01/F-025",
        revisionNo: "01",
        sopNumber: "PH-QAD01-D-23",
        date: date,
        year: year,
        month: month,
        department: departments,
        reasonForTraceability: Reason_Traceability,
        methodologyForSelecting: Methodology,
        noOfPeopleInvolved: peoples_involved,
        teamMembers: Team_Members,
        totalTimeTakenToCompleteTheStudy: timeDifference,
        start_time: startTime === "" ? "NA" : startTime,
        endTime: endTime === "" ? "NA" : endTime,
        bmrNo: BMRNo === "" ? "NA" : BMRNo,
        customer: Customer === "" ? "NA" : Customer,
        product: Product === "" ? "NA" : Product,
        batchNo: Lot_No === "" ? "NA" : Lot_No,
        poNo: Po_No === "" ? "NA" : Po_No,
        totalQuantityQartons: TQ_Cartons === "" ? "NA" : TQ_Cartons,
        totalQuantityBags: TQ_Bags === "" ? "NA" : TQ_Bags,
        quantityDispachedCartons: QD_Cartons === "" ? "NA" : QD_Cartons,
        quantityDispachedBags: QD_Bags === "" ? "NA" : QD_Bags,
        quantityAvailableInFgBags: QA_Bags === "" ? "NA" : QA_Bags,
        quantityAvailableInFgCartons: QA_Cartons === "" ? "NA" : QA_Cartons,
        problemFaced: ProblemFaced,
        actionTaken: ActionTaken,
        suggestion: Recommendation,
        finalConclusion: conclusion,
        reason: "",
        ...(id && { id: id }),
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/qa/saveSummaryOfTraceability`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QA/F-25/Summary");
      }, 1500);
      message.success("Report Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error("Failed to save  Report !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const validateForm = () => {
    if (!startTime || startTime.length === 0) {
      message.error("Please Enter the start time");
      return false;
    }

    if (!endTime || endTime.length === 0) {
      message.error("Please Enter the end time");
      return false;
    }

    return true;
  };

  const SubmitManagementOfIncidence = async () => {
    setSubmitLoading(true);

    if (!validateForm()) {
      setSubmitLoading(false);
      return;
    }

    try {
      const payload = {
        unit: "Unit-H",
        formatName: "SUMMARY OF TRACEABILITY",
        formatNo: "PH-QAD01/F-025",
        revisionNo: "01",
        sopNumber: "PH-QAD01-D-23",
        date: date,
        year: year,
        month: month,
        department: departments,
        reasonForTraceability:
          Reason_Traceability === "" ||
          Reason_Traceability === null ||
          Reason_Traceability === undefined
            ? "NA"
            : Reason_Traceability,
        methodologyForSelecting:
          Methodology === "" ||
          Methodology === null ||
          Methodology === undefined
            ? "NA"
            : Methodology,
        noOfPeopleInvolved:
          peoples_involved === "" ||
          peoples_involved === null ||
          peoples_involved === undefined
            ? "NA"
            : peoples_involved,
        teamMembers:
          Team_Members === "" ||
          Team_Members === null ||
          Team_Members === undefined
            ? "NA"
            : Team_Members,
        totalTimeTakenToCompleteTheStudy:
          timeDifference === "" ||
          timeDifference === null ||
          timeDifference === undefined
            ? "NA"
            : timeDifference,
        start_time:
          startTime === "" || startTime === null || startTime === undefined
            ? "NA"
            : startTime,
        endTime:
          endTime === "" || endTime === null || endTime === undefined
            ? "NA"
            : endTime,
        bmrNo:
          BMRNo === "" || BMRNo === null || BMRNo === undefined ? "NA" : BMRNo,
        customer:
          Customer === "" || Customer === null || Customer === undefined
            ? "NA"
            : Customer,
        product:
          Product === "" || Product === null || Product === undefined
            ? "NA"
            : Product,
        batchNo:
          Lot_No === "" || Lot_No === null || Lot_No === undefined
            ? "NA"
            : Lot_No,
        poNo:
          Po_No === "" || Po_No === null || Po_No === undefined ? "NA" : Po_No,
        totalQuantityQartons:
          TQ_Cartons === "" || TQ_Cartons === null || TQ_Cartons === undefined
            ? "NA"
            : TQ_Cartons,
        totalQuantityBags:
          TQ_Bags === "" || TQ_Bags === null || TQ_Bags === undefined
            ? "NA"
            : TQ_Bags,
        quantityDispachedCartons:
          QD_Cartons === "" || QD_Cartons === null || QD_Cartons === undefined
            ? "NA"
            : QD_Cartons,
        quantityDispachedBags:
          QD_Bags === "" || QD_Bags === null || QD_Bags === undefined
            ? "NA"
            : QD_Bags,
        quantityAvailableInFgBags:
          QA_Bags === "" || QA_Bags === null || QA_Bags === undefined
            ? "NA"
            : QA_Bags,
        quantityAvailableInFgCartons:
          QA_Cartons === "" || QA_Cartons === null || QA_Cartons === undefined
            ? "NA"
            : QA_Cartons,
        problemFaced:
          ProblemFaced === "" ||
          ProblemFaced === null ||
          ProblemFaced === undefined
            ? "NA"
            : ProblemFaced,
        actionTaken:
          ActionTaken === "" ||
          ActionTaken === null ||
          ActionTaken === undefined
            ? "NA"
            : ActionTaken,
        suggestion:
          Recommendation === "" ||
          Recommendation === null ||
          Recommendation === undefined
            ? "NA"
            : Recommendation,
        finalConclusion:
          conclusion === "" || conclusion === null || conclusion === undefined
            ? "NA"
            : conclusion,
        reason: rejectRemarks,
        ...(id && { id: id }),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/qa/submitSummaryOfTraceability`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QA/F-25/Summary");
      }, 1500);
      message.success("Report Submitted Successfully");
    } catch (error) {
      message.error(error.response.data.message);
      throw new Error("Failed to submit Report!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-25/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
    fetchBmrDetails();
  }, []);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/getdetailsbySummaryOfTraceability?date=${date}&department=${departments}&bmrNo=${BMRNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.body) {
        setReason_Traceability(response.data.body.reasonForTraceability);
        SetMethodology(response.data.body.methodologyForSelecting);
        Setpeoples_involved(response.data.body.noOfPeopleInvolved);
        SetTeam_Members(response.data.body.teamMembers);
        setTimeDifference(response.data.body.totalTimeTakenToCompleteTheStudy);
        setStartTime(response.data.body.start_time);
        setEndTime(response.data.body.endTime);
        setBmrNo(response.data.body.bmrNo);
        SetCustomer(response.data.body.customer);
        SetProduct(response.data.body.product);
        SetLot_No(response.data.body.batchNo);
        SetPo_No(response.data.body.poNo);
        SetTQ_Cartons(response.data.body.totalQuantityQartons);
        SetTQ_Bags(response.data.body.totalQuantityBags);
        SetQD_Bags(response.data.body.quantityDispachedBags);
        SetQD_Cartons(response.data.body.quantityDispachedCartons);
        SetQA_Bags(response.data.body.quantityAvailableInFgBags);
        SetQA_Cartons(response.data.body.quantityAvailableInFgCartons);
        SetProblemFaced(response.data.body.problemFaced);
        SetActionTaken(response.data.body.actionTaken);
        SetRecommendation(response.data.body.suggestion);
        setConclusion(response.data.body.finalConclusion);
        setSelectedRow(response.data.body);
        setid(response.data.body.id);
      } else {
      }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };

  const fetchBmrDetails = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/qa/SummaryOfTraceabilityBMRDetails?department=${departments}&batchNo=${BMRNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      SetCustomer(response.data[0]?.customer);
      SetProduct(response.data[0]?.product);
      SetLot_No(response.data[0]?.lotNo);
      SetPo_No(response.data[0]?.poNo);
      SetTQ_Bags(response.data[0]?.bags);
      SetTQ_Cartons(response.data[0]?.cartons);
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>Summary of Traceability</p>,
      children: (
        <div>
          <table style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}>
            <tr>
              <th colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                Parameter
              </th>
              <th colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                Details
              </th>
            </tr>
            <tr>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                Traceability Study conducted on
              </td>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                <input
                  type="Date"
                  className="inp-New"
                  value={date}
                  disabled={disabledCondition}
                  readOnly
                  style={{ border: "none", outline: "none", height: "20px" }}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                Reason for conducting Traceability study
              </td>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                <input
                  type="text"
                  value={Reason_Traceability}
                  onChange={(e) => setReason_Traceability(e.target.value)}
                  disabled={disabledCondition}
                  className="inp-New"
                  style={{
                    width: "90%",
                    border: "none",
                    outline: "none",
                    height: "20px",
                    fontSize: "12px",
                  }}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                Methodology for selecting Product & Lot No
              </td>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                <input
                  type="text"
                  value={Methodology}
                  onChange={(e) => SetMethodology(e.target.value)}
                  disabled={disabledCondition}
                  className="inp-New"
                  style={{
                    width: "90%",
                    border: "none",
                    outline: "none",
                    height: "20px",
                    fontSize: "12px",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                No. of Peoples involved :
              </td>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                <input
                  type="text"
                  value={peoples_involved}
                  onChange={(e) => Setpeoples_involved(e.target.value)}
                  disabled={disabledCondition}
                  className="inp-New"
                  style={{
                    width: "90%",
                    border: "none",
                    outline: "none",
                    height: "20px",
                    fontSize: "12px",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                Team Members :
              </td>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                <input
                  type="text"
                  value={Team_Members}
                  disabled={disabledCondition}
                  onChange={(e) => SetTeam_Members(e.target.value)}
                  className="inp-New"
                  style={{
                    width: "90%",
                    border: "none",
                    outline: "none",
                    height: "20px",
                    fontSize: "12px",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td
                colSpan="20"
                rowSpan="2"
                style={{ textAlign: "center", padding: "2px" }}
              >
                Total Time taken to complete the study:
              </td>
              <td
                colSpan="20"
                style={{ textAlign: "center", padding: "2px", height: "20px" }}
                disabled={disabledCondition}
              >
                {timeDifference}
              </td>
            </tr>
            <tr>
              <td colSpan="10" style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  placeholder="Start time"
                  addonBefore="Start time"
                  style={{ width: "100%", height: "35px" }}
                  type="time"
                  disabled={disabledCondition}
                  value={startTime}
                  onChange={handleStartTimeChange}
                />
              </td>
              <td colSpan="10" style={{ textAlign: "center", padding: "2px" }}>
                <Input
                  placeholder="End time"
                  addonBefore="End time"
                  style={{ width: "100%", height: "35px" }}
                  type="time"
                  disabled={disabledCondition}
                  value={endTime}
                  onChange={handleEndTimeChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                BMR No.:
              </td>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                <input
                  type="text"
                  value={BMRNo}
                  readonly
                  disabled={disabledCondition}
                  className="inp-New"
                  style={{
                    width: "90%",
                    border: "none",
                    outline: "none",
                    height: "20px",
                  }}
                />
              </td>
            </tr>

            {(departments === "Dry_Goods" ||
              departments === "Pad_Punching" ||
              departments === "Cotton_Buds") && (
              <tr>
                <td
                  colSpan="20"
                  style={{ textAlign: "center", padding: "2px" }}
                >
                  Customer
                </td>
                <td
                  colSpan="20"
                  style={{ textAlign: "center", padding: "2px" }}
                >
                  <input
                    type="text"
                    value={Customer}
                    readonly
                    disabled={disabledCondition}
                    readOnly
                    onChange={(e) => SetCustomer(e.target.value)}
                    className="inp-New"
                    style={{
                      width: "90%",
                      border: "none",
                      outline: "none",
                      height: "20px",
                      fontSize: "12px",
                    }}
                  />
                </td>
              </tr>
            )}

            <tr>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                Product:
              </td>
              <td colSpan="20" style={{ textAlign: "center", padding: "2px" }}>
                <input
                  type="text"
                  value={Product}
                  disabled={disabledCondition}
                  readOnly
                  onChange={(e) => SetProduct(e.target.value)}
                  className="inp-New"
                  style={{
                    width: "90%",
                    border: "none",
                    outline: "none",
                    height: "20px",
                    fontSize: "12px",
                  }}
                />
              </td>
            </tr>

            {(departments === "Bleaching" || departments === "Spunlace") && (
              <>
                <tr>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    Start Batch
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    <input
                      type="text"
                      value={Po_No}
                      readOnly
                      disabled={disabledCondition}
                      className="inp-New"
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    End Batch
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    <input
                      type="text"
                      value={Lot_No}
                      readOnly
                      disabled={disabledCondition}
                      className="inp-New"
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </td>
                </tr>
              </>
            )}

            {(departments === "Dry_Goods" ||
              departments === "Pad_Punching" ||
              departments === "Cotton_Buds") && (
              <>
                <tr>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    Lot No. / Batch No. :
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    <input
                      type="text"
                      value={Lot_No}
                      readOnly
                      disabled={disabledCondition}
                      className="inp-New"
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    PO No.:
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    <input
                      type="text"
                      value={Po_No}
                      readOnly
                      disabled={disabledCondition}
                      className="inp-New"
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </td>
                </tr>
              </>
            )}
          </table>
        </div>
      ),
    },

    {
      key: "2",
      label: <p>Summary of Traceability</p>,
      children: (
        <div>
          <table style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}>
            {(departments === "Bleaching" || departments === "Spunlace") && (
              <>
                <tr>
                  <td
                    colSpan="15"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    Total Quantity :
                  </td>

                  <td
                    colSpan="25"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    <input
                      type="text"
                      value={TQ_Cartons}
                      readOnly
                      disabled={disabledCondition}
                      onChange={(e) => SetTQ_Cartons(e.target.value)}
                      className="inp-New"
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="15"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    Quantity Dispatched/Consume :
                  </td>

                  <td
                    colSpan="25"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    <input
                      type="text"
                      value={QD_Cartons}
                      disabled={disabledCondition}
                      onChange={(e) => SetQD_Cartons(e.target.value)}
                      className="inp-New"
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </td>
                </tr>
              </>
            )}

            {(departments === "Dry_Goods" ||
              departments === "Pad_Punching" ||
              departments === "Cotton_Buds") && (
              <>
                <tr>
                  <td
                    colSpan="10"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    Total Quantity :
                  </td>
                  <td
                    colSpan="10"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    No. of Cartons
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    <input
                      type="text"
                      value={TQ_Cartons}
                      disabled={disabledCondition}
                      readOnly
                      onChange={(e) => SetTQ_Cartons(e.target.value)}
                      className="inp-New"
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="10"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    No. of Bags
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    <input
                      type="text"
                      value={TQ_Bags}
                      disabled={disabledCondition}
                      readOnly
                      onChange={(e) => SetTQ_Bags(e.target.value)}
                      className="inp-New"
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="10"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    Quantity Dispatched :
                  </td>
                  <td
                    colSpan="10"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    No. of Cartons
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    <input
                      type="text"
                      value={QD_Cartons}
                      disabled={disabledCondition}
                      onChange={(e) => SetQD_Cartons(e.target.value)}
                      className="inp-New"
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="10"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    No. of Bags
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    <input
                      type="text"
                      value={QD_Bags}
                      disabled={disabledCondition}
                      onChange={(e) => SetQD_Bags(e.target.value)}
                      className="inp-New"
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="10"
                    rowSpan="2"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    Quantity Available in FG Godown :
                  </td>
                  <td
                    colSpan="10"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    No. of Cartons
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    <input
                      type="text"
                      value={QA_Cartons}
                      disabled={disabledCondition}
                      onChange={(e) => SetQA_Cartons(e.target.value)}
                      className="inp-New"
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="10"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    No. of Bags
                  </td>
                  <td
                    colSpan="20"
                    style={{ textAlign: "center", padding: "2px" }}
                  >
                    <input
                      type="text"
                      value={QA_Bags}
                      disabled={disabledCondition}
                      onChange={(e) => SetQA_Bags(e.target.value)}
                      className="inp-New"
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    />
                  </td>
                </tr>
              </>
            )}

            <tr>
              <td
                colSpan="40"
                style={{ textAlign: "left", padding: "2px", height: "30px" }}
              >
                Problem faced during conducting the traceability study (Explain
                in details) :
                <input
                  type="text"
                  value={ProblemFaced}
                  disabled={disabledCondition}
                  onChange={(e) => SetProblemFaced(e.target.value)}
                  className="inp-New"
                  style={{
                    width: "90%",
                    border: "none",
                    outline: "none",
                    fontSize: "12px",
                  }}
                />
              </td>
            </tr>

            <tr>
              <td
                colSpan="40"
                style={{ textAlign: "left", padding: "2px", height: "30px" }}
              >
                Action Taken to resolve the problem :
                <input
                  type="text"
                  value={ActionTaken}
                  disabled={disabledCondition}
                  onChange={(e) => SetActionTaken(e.target.value)}
                  className="inp-New"
                  style={{
                    width: "90%",
                    border: "none",
                    outline: "none",
                    fontSize: "12px",
                  }}
                />
              </td>
            </tr>

            <tr>
              <td
                colSpan="20"
                style={{ textAlign: "left", padding: "2px", height: "30px" }}
              >
                Recommendation / Suggestion (if any)
                <input
                  type="text"
                  value={Recommendation}
                  disabled={disabledCondition}
                  onChange={(e) => SetRecommendation(e.target.value)}
                  className="inp-New"
                  style={{
                    width: "90%",
                    border: "none",
                    outline: "none",
                    height: "30px",
                    fontSize: "12px",
                  }}
                />
              </td>

              <td
                colSpan="20"
                style={{ textAlign: "left", padding: "2px", height: "30px" }}
              >
                Final Conclusion : Traceability study was found to be
                <Select
                  value={conclusion}
                  onChange={handleConclusionChange}
                  disabled={disabledCondition}
                  placeholder="Select"
                  style={{ width: 150 }}
                >
                  <Option value="Effective">Effective</Option>
                  <Option value="Not Effective">Not Effective</Option>
                </Select>
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
            className="f18table"
            style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <td
                colSpan="15"
                style={{
                  textAlign: "center",
                }}
              >
                Prepared by:Signature & Date
              </td>
              <td
                colSpan="15"
                style={{
                  textAlign: "center",
                }}
              >
                Reviewed by: Signature & Date
              </td>
            </tr>

            <tr>
              <td
                colSpan="15"
                style={{
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                  borderRight: "1px solid black",
                }}
              >
                {selectedRow &&
                  selectedRow?.qaManagerOrDesigneeStatus ===
                    "DESIGNEE_OR_QA_MANAGER_SUBMITTED" && (
                    <div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="QA Manager/Designee"
                          style={{
                            width: "70px",
                            height: "50px",
                            marginLeft: "10px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "space-evenly",
                          }}
                        />
                      )}
                      <br />

                      {selectedRow &&
                        selectedRow.qaManagerOrDesigneeSubmitBy && (
                          <span>{selectedRow.qaManagerOrDesigneeSubmitBy}</span>
                        )}
                      <br />
                      {formatted_qa_designee_managerDate}
                    </div>
                  )}
                {/* Signature & Date */}
              </td>

              <td
                colSpan="15"
                style={{ textAlign: "center", verticalAlign: "bottom" }}
              >
                {((selectedRow &&
                  selectedRow?.qaManagerOrMrStatus ===
                    "QA_MANAGER_MR_REJECTED") ||
                  (selectedRow &&
                    selectedRow?.qaManagerOrMrStatus ===
                      "QA_MANAGER_MR_APPROVED")) && (
                  <div>
                    {getImage && (
                      <img
                        src={getImage}
                        alt="QA Manager/MR"
                        style={{
                          width: "70px",
                          height: "50px",
                          marginLeft: "20px",
                          objectFit: "contain",
                          mixBlendMode: "multiply",
                          justifyContent: "space-evenly",
                        }}
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.qaManagerOrMrSign && (
                      <span>{selectedRow.qaManagerOrMrSign}</span>
                    )}
                    <br />
                    {formatted_qa_MR_managerDate}
                  </div>
                )}
                {/* Signature & Date */}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  const buttonsArray = [
    canShowSaveButton && (
      <Button
        key="save"
        loading={saveLoading}
        type="primary"
        style={{
          backgroundColor: "#E5EEF9",
          color: "#00308F",
          fontWeight: "bold",
        }}
        onClick={handleSave}
        shape="round"
        icon={<IoSave color="#00308F" />}
      >
        &nbsp;Save
      </Button>
    ),

    canShowSubmitButton && (
      <Button
        key="submit"
        loading={submitLoading}
        type="primary"
        style={{
          backgroundColor: "#E5EEF9",
          color: "#00308F",
          fontWeight: "bold",
        }}
        icon={<GrDocumentStore color="#00308F" />}
        onClick={handleSubmit}
        shape="round"
      >
        &nbsp;Submit
      </Button>
    ),

    ((role === "QA_MANAGER" &&
      selectedRow.qaManagerOrDesigneeStatus ===
        "DESIGNEE_OR_QA_MANAGER_SUBMITTED") ||
      role === "ROLE_MR") &&
      selectedRow.qaManagerOrMrStatus !== "QA_MANAGER_MR_REJECTED" &&
      selectedRow.qaManagerOrMrStatus !== "QA_MANAGER_MR_APPROVED" && (
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
        </Button>
      ),

    ((role === "QA_MANAGER" &&
      selectedRow.qaManagerOrDesigneeStatus ===
        "DESIGNEE_OR_QA_MANAGER_SUBMITTED") ||
      role === "ROLE_MR") &&
      selectedRow.qaManagerOrMrStatus !== "QA_MANAGER_MR_REJECTED" &&
      selectedRow.qaManagerOrMrStatus !== "QA_MANAGER_MR_APPROVED" && (
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
        </Button>
      ),

    // Back Button
    <Button
      key="back"
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

    // Logout Button
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
        if (window.confirm("Are you sure you want to logout?")) {
          localStorage.removeItem("token");
          navigate("/Precot");
        }
      }}
    >
      Logout
    </Button>,

    // Tooltip with Username and Role
    <Tooltip
      key="tooltip"
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
  ];

  // Rendering the buttons array in JSX
  <>
    {buttonsArray.map(
      (button, index) =>
        button && <React.Fragment key={index}>{button}</React.Fragment>
    )}
  </>;

  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="SUMMARY OF TRACEABILITY"
        formatNo="PH-QAD01/F-025"
        sopNo="PH-QAD01-D-22"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={buttonsArray}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          width: "100%",
          marginLeft: "20px",
          maxWidth: "100%",
          overflowX: "hidden",
        }}
      >
        <Input
          addonBefore="Date:"
          placeholder="Date"
          value={formattedDate(date)}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          addonBefore="Department"
          placeholder="Department"
          value={departments}
          readOnly
          style={{ width: "30%", height: "35px" }}
        />
        <Input
          addonBefore="BMR "
          placeholder="BMR "
          type="text"
          value={BMRNo}
          style={{ width: "30%", height: "35px" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "22px",
          width: "100%",
          marginLeft: "20px",
          maxWidth: "100%",
        }}
      ></div>
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

export default QA_f25;
