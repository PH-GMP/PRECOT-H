/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import {
  Button,
  Input,
  message,
  Modal,
  Radio,
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

const QA_f52 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { reportNo, department } = state || {}; 
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [DetailsByParam, setDetailsByParam] = useState("");
  const [Id, setId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;
  const [showModal, setShowModal] = useState(false);

  // Tab one
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [typeOfMaterial, setTypeOfMaterial] = useState("");
  const [IncidentReportedOn, setIncidentReportedOn] = useState("");
  const [item, setItem] = useState("");
  const [identificationNo, setIdentificationNo] = useState("");
  const [locationIncident, setLocationIncident] = useState("");
  const [reason, setReason] = useState("");
  const [productedOrNot, setProductedOrNot] = useState("");
  const [areaAffected, setAreaAffected] = useState("");
  const [materialLying, setMaterialLying] = useState("");
  const [communicatedTo, setCommunicatedTo] = useState("");
  const [reportedBy, setReportedBy] = useState("");

  // Tab Two
  const [actionStatusOne, setActionStatusOne] = useState("");
  const [actionStatusTwo, setActionStatusTwo] = useState("");
  const [actionStatusThree, setActionStatusThree] = useState("");
  const [actionStatusFour, setActionStatusFour] = useState("");
  const [actionStatusFive, setActionStatusFive] = useState("");
  const [actionStatusSix, setActionStatusSix] = useState("");
  const [verificationSignOne, setVerificationSignOne] = useState("");
  const [verificationSignTwo, setVerificationSignTwo] = useState("");
  const [verificationSignThree, setVerificationSignThree] = useState("");
  const [verificationSignFour, setVerificationSignFour] = useState("");
  const [verificationSignFive, setVerificationSignFive] = useState("");
  const [verificationSignSix, setVerificationSignSix] = useState("");
  const [verificationDateOne, setVerificationDateOne] = useState("");
  const [verificationDateTwo, setVerificationDateTwo] = useState("");
  const [verificationDateThree, setVerificationDateThree] = useState("");
  const [verificationDateFour, setVerificationDateFour] = useState("");
  const [verificationDateFive, setVerificationDateFive] = useState("");
  const [verificationDateSix, setVerificationDateSix] = useState("");
  // Tab three
  const [responsibilityOne, setResponsibilityOne] = useState("");
  const [responsibilityTwo, setResponsibilityTwo] = useState("");
  const [responsibilityThree, setResponsibilityThree] = useState("");
  const [correctiveStatusOne, setCorrectiveStatusOne] = useState("");
  const [correctiveStatusTwo, setCorrectiveStatusTwo] = useState("");
  const [correctiveStatusThree, setCorrectiveStatusThree] = useState("");
  const [remarks, setRemarks] = useState("");
  const [targetDateOne, setTargetDateOne] = useState("");
  const [targetDateTwo, setTargetDateTwo] = useState("");
  const [targetDateThree, setTargetDateThree] = useState("");

  const dateObject = new Date(date);
  const monthIndex = dateObject.getMonth();
  const yearName = dateObject.getFullYear();
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

  const [QaLovs, setQaLovs] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${API.prodUrl}/Precot/api/QA/Service/getAllQADepartmentNames?rollNames=ROLE_QA`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const qaOptions = res.data.map((option) => ({
          value: option.name,
          label: option.name,
        }));
        setQaLovs(qaOptions);
      })
      .catch((err) => {
        console.error("Error fetching QA LOV:", err);
        message.error("Unable to fetch QA due to network error.");
      });
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleKeyDown = (e) => {
    const isAlphanumeric = /^[a-zA-Z.,]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "_", " "].includes(e.key)
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDownNum = (e) => {
    const isAlphanumeric = /^[a-zA-Z.0-9,]$/;

    if (
      !isAlphanumeric.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "_", " "].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const typeOfMaterialOptions = [
    { id: 1, value: "Glass" },
    { id: 2, value: "Hard Plastic" },
    { id: 3, value: "Wood" },
    { id: 4, value: "Ceramics" },
  ];
  
  const formattedDateWithTime = (dateString) => {
    if (dateString) {
      const date = moment(dateString);
      if (date.isValid()) {
        return date.format("DD/MM/YYYY HH:mm");
      }
    }
    return "";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.qa_inspector_sign;
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
  }, [DetailsByParam,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.hod_sign;
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
  }, [DetailsByParam,API.prodUrl, token]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = DetailsByParam?.manager_sign;
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
          setGetImage3(url);
        })
        .catch((err) => {});
    }
  }, [DetailsByParam,API.prodUrl, token]);

  const disabled =
    (role == "ROLE_QA" &&
      DetailsByParam?.qa_inspector_status == "QA_INSPECTOR_APPROVED" &&
      DetailsByParam?.hod_status !== "HOD_REJECTED" &&
      DetailsByParam?.manager_status !== "MANAGER_REJECTED") ||
    role == "ROLE_HOD" ||
    role == "QA_MANAGER" ||
    role == "ROLE_DESIGNEE";

  const canDisplayButtons = () => {
    if (role === "ROLE_QA") {
      if (
        DetailsByParam &&
        DetailsByParam.qa_inspector_status === "QA_INSPECTOR_APPROVED" &&
        DetailsByParam.manager_status !== "MANAGER_REJECTED" &&
        DetailsByParam.hod_status !== "HOD_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else if (
      (role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
      departmentId != 6
    ) {
      if (
        DetailsByParam?.hod_status == "HOD_APPROVED" &&
        DetailsByParam?.manager_status == "MANAGER_REJECTED"
      ) {
        return "block";
      } else if (
        (DetailsByParam?.hod_status == "HOD_APPROVED" &&
          DetailsByParam?.manager_status == "WAITING_FOR_APPROVAL") ||
        DetailsByParam?.manager_status == "MANAGER_APPROVED"
      ) {
        return "none";
      }
    } else if (
      (role == "QA_MANAGER" || role == "ROLE_DESIGNEE") &&
      departmentId == 6
    ) {
      if (
        DetailsByParam?.manager_status == "MANAGER_APPROVED" ||
        DetailsByParam?.manager_status == "MANAGER_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        DetailsByParam?.manager_status == "MANAGER_APPROVED" ||
        DetailsByParam?.manager_status == "MANAGER_REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };
  const canDisplayButton2 = () => {
    if (role == "ROLE_QA") {
      if (DetailsByParam?.qa_inspector_status == "QA_INSPECTOR_APPROVED") {
        return "none";
      }
    } else if (
      role == "QA_MANAGER" ||
      role == "ROLE_HOD" ||
      role == "ROLE_DESIGNEE"
    ) {
      return "none";
    }
  };

  const handleSave = async () => {
    try {
      await SaveRecord();
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

  const SaveRecord = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        format_name: "Breakage Report (GLASS / HARD PLASTIC / WOOD / CERAMIC)",
        format_no: "PH-QAD01/F-052",
        revision_no: 3,
        ref_sop_no: "PH-QAD01-D-47",
        unit: "H",
        id: Id,
        rep_seq_no: reportNo,
        date: date,
        time: time,
        month: monthName,
        year: yearName,
        type_of_material: typeOfMaterial,
        department: department,
        inc_rep_on: IncidentReportedOn,
        item: item,
        identification: identificationNo,
        location: locationIncident,
        incident_reason: reason,
        same_portal: productedOrNot,
        area: areaAffected,
        any_meterial: materialLying,
        communicate_to: communicatedTo,
        reported_by: reportedBy,
        dep_actn_one_status: actionStatusOne,
        dep_actn_one_verifi_status: verificationSignOne,
        dep_actn_two_status: actionStatusTwo,
        dep_actn_two_verifi_status: verificationSignTwo,
        dep_actn_therr_status: actionStatusThree,
        dep_actn_three_verifi_status: verificationSignThree,
        dep_actn_four_status: actionStatusFour,
        dep_actn_four_verifi_status: verificationSignFour,
        dep_actn_five_status: actionStatusFive,
        dep_actn_five_verifi_status: verificationSignFive,
        dep_actn_six_status: actionStatusSix,
        dep_actn_six_verifi_status: verificationSignSix,
        dep_actn_one_verifi_date: verificationDateOne,
        dep_actn_two_verifi_date: verificationDateTwo,
        dep_actn_three_verifi_date: verificationDateThree,
        dep_actn_four_verifi_date: verificationDateFour,
        dep_actn_five_verifi_date: verificationDateFive,
        dep_actn_six_verifi_date: verificationDateSix,
        cor_prev_actn_one_verifi_status: correctiveStatusOne,
        cor_prev_actn_two_verifi_status: correctiveStatusTwo,
        cor_prev_actn_two_three_status: correctiveStatusThree,
        cor_prev_actn_one_name: responsibilityOne,
        cor_prev_actn_two_name: responsibilityTwo,
        cor_prev_actn_three_name: responsibilityThree,
        cor_prev_actn_one_date: targetDateOne,
        cor_prev_actn_two_date: targetDateTwo,
        cor_prev_actn_three_date: targetDateThree,
        remarks: remarks,
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SaveBreakageReport`,
        payload,
        { headers }
      );
      setTimeout(() => {
        navigate("/Precot/QA/F-52/Summary");
      }, 1500);
      message.success("Record Saved Successfully..");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to save Record !!");
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitRecord = async () => {
    setSubmitLoading(true);
    if (!date || date.trim() == "null" || date.trim() == "") {
      message.warning("Date Required");
      setSubmitLoading(false);
      return;
    }
    if (!time || time.trim() == "null" || time.trim() == "") {
      message.warning("Time Required");
      setSubmitLoading(false);
      return;
    }
    if (
      !typeOfMaterial ||
      typeOfMaterial.trim() == "null" ||
      typeOfMaterial.trim() == ""
    ) {
      message.warning("Type of Material Required");
      setSubmitLoading(false);
      return;
    }
    if (
      !IncidentReportedOn ||
      IncidentReportedOn.trim() == "null" ||
      IncidentReportedOn.trim() == ""
    ) {
      message.warning("Incident Reported On Date Required");
      setSubmitLoading(false);
      return;
    }

    try {
      const payload = {
        format_name: "Breakage Report (GLASS / HARD PLASTIC / WOOD / CERAMIC)",
        format_no: "PH-QAD01/F-052",
        revision_no: 3,
        ref_sop_no: "PH-QAD01-D-47",
        unit: "H",
        id: Id,
        rep_seq_no: reportNo,
        date: date,
        time: time,
        month: monthName,
        year: yearName,
        type_of_material: typeOfMaterial,
        department: department,
        inc_rep_on: IncidentReportedOn,
        item: item || "NA",
        identification: identificationNo || "NA",
        location: locationIncident || "NA",
        incident_reason: reason || "NA",
        same_portal: productedOrNot || "NA",
        area: areaAffected || "NA",
        any_meterial: materialLying,
        communicate_to: communicatedTo || "NA",
        reported_by: reportedBy || "NA",
        dep_actn_one_status: actionStatusOne,
        dep_actn_one_verifi_status: verificationSignOne,
        dep_actn_two_status: actionStatusTwo,
        dep_actn_two_verifi_status: verificationSignTwo,
        dep_actn_therr_status: actionStatusThree,
        dep_actn_three_verifi_status: verificationSignThree,
        dep_actn_four_status: actionStatusFour,
        dep_actn_four_verifi_status: verificationSignFour,
        dep_actn_five_status: actionStatusFive,
        dep_actn_five_verifi_status: verificationSignFive,
        dep_actn_six_status: actionStatusSix,
        dep_actn_six_verifi_status: verificationSignSix,
        dep_actn_one_verifi_date: verificationDateOne,
        dep_actn_two_verifi_date: verificationDateTwo,
        dep_actn_three_verifi_date: verificationDateThree,
        dep_actn_four_verifi_date: verificationDateFour,
        dep_actn_five_verifi_date: verificationDateFive,
        dep_actn_six_verifi_date: verificationDateSix,
        cor_prev_actn_one_verifi_status: correctiveStatusOne,
        cor_prev_actn_two_verifi_status: correctiveStatusTwo,
        cor_prev_actn_two_three_status: correctiveStatusThree,
        cor_prev_actn_one_name: responsibilityOne || "NA",
        cor_prev_actn_two_name: responsibilityTwo || "NA",
        cor_prev_actn_three_name: responsibilityThree || "NA",
        cor_prev_actn_one_date: targetDateOne,
        cor_prev_actn_two_date: targetDateTwo,
        cor_prev_actn_three_date: targetDateThree,
        remarks: remarks || "NA",
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/QA/Service/SubmitBreakageReport`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QA/F-52/Summary");
      }, 1500);

      message.success("Submitted Successfully");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
      throw new Error("Failed to submit Record!!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };

  const handleApprove = async () => {
    setSaveLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/BreakageReportapproveOrReject`,
        {
          id: Id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-52/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/BreakageReportapproveOrReject`,
        {
          id: Id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QA/F-52/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleBack = () => {
    navigate("/Precot/QA/F-52/Summary");
  };
  const departmentId = localStorage.getItem("departmentId");
  useEffect(() => {
    fetchDetailsByParam();
  }, []);

  const fetchDetailsByParam = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/BreakageReportParam?reportNo=${reportNo}&department=${department}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setDetailsByParam(response.data);
      if (response.data && response.data.message !== "No Data") {
        const data = response.data;
        setId(data.id);
        setDate(data.date);
        setTime(data.time);
        setIncidentReportedOn(data.inc_rep_on);
        setItem(data.item);
        setTypeOfMaterial(data.type_of_material);
        setIdentificationNo(data.identification);
        setLocationIncident(data.location);
        setReason(data.incident_reason);
        setProductedOrNot(data.same_portal);
        setAreaAffected(data.area);
        setMaterialLying(data.any_meterial);
        setCommunicatedTo(data.communicate_to);
        setReportedBy(data.reported_by);
        setActionStatusOne(data.dep_actn_one_status);
        setActionStatusTwo(data.dep_actn_two_status);
        setActionStatusThree(data.dep_actn_therr_status);
        setActionStatusFour(data.dep_actn_four_status);
        setActionStatusFive(data.dep_actn_five_status);
        setActionStatusSix(data.dep_actn_six_status);
        setVerificationSignOne(data.dep_actn_one_verifi_status);
        setVerificationSignTwo(data.dep_actn_two_verifi_status);
        setVerificationSignThree(data.dep_actn_three_verifi_status);
        setVerificationSignFour(data.dep_actn_four_verifi_status);
        setVerificationSignFive(data.dep_actn_five_verifi_status);
        setVerificationSignSix(data.dep_actn_six_verifi_status);
        setVerificationDateOne(data.dep_actn_one_verifi_date);
        setVerificationDateTwo(data.dep_actn_two_verifi_date);
        setVerificationDateThree(data.dep_actn_three_verifi_date);
        setVerificationDateFour(data.dep_actn_four_verifi_date);
        setVerificationDateFive(data.dep_actn_five_verifi_date);
        setVerificationDateSix(data.dep_actn_six_verifi_date);
        setResponsibilityOne(data.cor_prev_actn_one_name);
        setResponsibilityTwo(data.cor_prev_actn_two_name);
        setResponsibilityThree(data.cor_prev_actn_three_name);
        setTargetDateOne(data.cor_prev_actn_one_date);
        setTargetDateTwo(data.cor_prev_actn_two_date);
        setTargetDateThree(data.cor_prev_actn_three_date);
        setCorrectiveStatusOne(data.cor_prev_actn_one_verifi_status);
        setCorrectiveStatusTwo(data.cor_prev_actn_two_verifi_status);
        setCorrectiveStatusThree(data.cor_prev_actn_two_three_status);
        setRemarks(data.remarks);
      }
      if (
        ((role == "QA_MANAGER" || role == "ROLE_DESIGNEE") &&
          departmentId == "6" &&
          response.data.hod_status !== "HOD_APPROVED") ||
        ((role == "QA_MANAGER" || role == "ROLE_DESIGNEE") &&
          departmentId == "6" &&
          response.data.manager_status == "MANAGER_REJECTED")
      ) {
        message.error("HOD Not Yet Approved");
        setTimeout(() => {
          navigate("/Precot/QA/F-52/Summary");
        }, 1500);
      }
      if (
        ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
          departmentId != "6" &&
          response.data.qa_inspector_status !== "QA_INSPECTOR_APPROVED") ||
        ((role == "ROLE_HOD" || role == "ROLE_DESIGNEE") &&
          departmentId != "6" &&
          (response.data.hod_status == "HOD_REJECTED" ||
            response.data.manager_status == "MANAGER_REJECTED"))
      ) {
        message.error("QA Inspector Not Yet Approved");
        setTimeout(() => {
          navigate("/Precot/QA/F-52/Summary");
        }, 1500);
      }
    } catch (error) {
      console.error("Error checking BMR existence:", error);
      message.error(error.message);
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>A. Incident Details</p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th
                colSpan="50"
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  height: "27px",
                }}
              >
                {" "}
                (i) Incident Reported on:{" "}
              </th>
              <td colSpan="50">
                <Input
                  onChange={(e) => setIncidentReportedOn(e.target.value)}
                  type="datetime-local"
                  value={IncidentReportedOn}
                  max={formattedToday}
                  size="small"
                  disabled={disabled}
                  style={{ width: "100%", textAlign: "center" }}
                />
              </td>
            </tr>
            <tr>
              <th
                colSpan="50"
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  height: "27px",
                }}
              >
                (ii) Item:{" "}
              </th>
              <td colSpan="50">
                <Select
                  showSearch
                  value={item}
                  onChange={(value) => setItem(value)}
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="Search Item"
                  optionFilterProp="children"
                  disabled={disabled}
                >
                  <Select.Option value="" disabled selected>
                    Select Item
                  </Select.Option>
                  {typeOfMaterialOptions.map((option) => (
                    <Select.Option key={option.id} value={option.value}>
                      {option.value}
                    </Select.Option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <th
                colSpan="50"
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  height: "27px",
                }}
              >
                (iii) Identification No.:
              </th>
              <td colSpan="50">
                <Input
                  onChange={(e) => setIdentificationNo(e.target.value)}
                  type="text"
                  value={identificationNo}
                  onKeyDown={handleKeyDownNum}
                  size="small"
                  placeholder="Enter Identification Number"
                  disabled={disabled}
                  style={{ width: "100%", textAlign: "center" }}
                />
              </td>
            </tr>
            <tr>
              <th
                colSpan="50"
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  height: "27px",
                }}
              >
                (iv) Location:{" "}
              </th>
              <td colSpan="50">
                <Input
                  onChange={(e) => setLocationIncident(e.target.value)}
                  type="text"
                  value={locationIncident}
                  size="small"
                  disabled={disabled}
                  placeholder="Enter Location"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
            <tr>
              <th
                colSpan="50"
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  height: "27px",
                }}
              >
                (v) Reason:
              </th>
              <td colSpan="50">
                <Input
                  onChange={(e) => setReason(e.target.value)}
                  type="text"
                  value={reason}
                  size="small"
                  disabled={disabled}
                  placeholder="Enter Your Reason"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
            <tr>
              <th
                colSpan="50"
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  height: "27px",
                }}
              >
                (vi) Whether the same was protected or not:
              </th>
              <td colSpan="50">
                <Radio.Group
                  onChange={(e) => setProductedOrNot(e.target.value)}
                  value={productedOrNot}
                  disabled={disabled}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                  <Radio value="NA">NA</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th
                colSpan="50"
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  height: "27px",
                }}
              >
                (vii) How much area was affected due to shattering of broken
                pieces:
              </th>
              <td colSpan="50">
                <Input
                  onChange={(e) => setAreaAffected(e.target.value)}
                  type="text"
                  value={areaAffected}
                  size="small"
                  disabled={disabled}
                  placeholder="area's Affected"
                  style={{ width: "100%", textAlign: "center" }}
                />
              </td>
            </tr>
            <tr>
              <th
                colSpan="50"
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  height: "27px",
                }}
              >
                (viii) Whether there was any material lying nearby: <br /> (If
                Yes, identify the material with proper labeling, store it
                separately and take action as per above mentioned procedure)
              </th>
              <td colSpan="50">
                <Radio.Group
                  onChange={(e) => setMaterialLying(e.target.value)}
                  value={materialLying}
                  disabled={disabled}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th
                colSpan="50"
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  height: "27px",
                }}
              >
                (ix) Immediately communicated to (Name / Department):{" "}
              </th>
              <td colSpan="50">
                <Input
                  onChange={(e) => setCommunicatedTo(e.target.value)}
                  type="text"
                  value={communicatedTo}
                  size="small"
                  disabled={disabled}
                  placeholder="Communicated To"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
            <tr>
              <th
                colSpan="50"
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  height: "27px",
                }}
              >
                (x) Incident Reported by:{" "}
              </th>
              <td colSpan="50">
                <Input
                  onChange={(e) => setReportedBy(e.target.value)}
                  type="text"
                  value={reportedBy}
                  size="small"
                  disabled={disabled}
                  placeholder="Enter Reported By"
                  style={{ width: "100%", textAlign: "center" }}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>B. Disposition Action</p>,
      children: (
        <div>
          <table
            style={{
              width: "107%",
              margin: "auto",
              tableLayout: "fixed",
              marginBottom: "5px",
            }}
          >
            <tr>
              <th colSpan="5">S. No.</th>
              <th colSpan="40">Check Points</th>
              <th colSpan="20">
                Action Status
                <br />
                (by Dept. In-charge)
              </th>
              <th colSpan="20">Verification(by QA)</th>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "40px", textAlign: "center" }}>
                i
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Whether all the broken parts are properly collected from the
                area or machine?
              </th>
              <td colSpan="20">
                {" "}
                <Radio.Group
                  onChange={(e) => setActionStatusOne(e.target.value)}
                  value={actionStatusOne}
                  disabled={disabled}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                </Radio.Group>
              </td>
              <td colSpan="20">
                <Select
                  showSearch
                  value={verificationSignOne}
                  disabled={disabled}
                  onChange={(value) => setVerificationSignOne(value)}
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="Search Name"
                  optionFilterProp="children"
                >
                  <Select.Option value="" disabled selected>
                    Select Name
                  </Select.Option>
                  {QaLovs.map((option) => (
                    <Select.Option key={option.id} value={option.value}>
                      {option.value}
                    </Select.Option>
                  ))}
                </Select>
                <br />
                <Input
                  onChange={(e) => setVerificationDateOne(e.target.value)}
                  type="date"
                  value={verificationDateOne}
                  max={formattedToday}
                  size="small"
                  disabled={disabled}
                  style={{ width: "100%", textAlign: "center" }}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "40px", textAlign: "center" }}>
                ii
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Whether all the area / machine is cleaned properly?
              </th>
              <td colSpan="20">
                {" "}
                <Radio.Group
                  onChange={(e) => setActionStatusTwo(e.target.value)}
                  value={actionStatusTwo}
                  disabled={disabled}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                </Radio.Group>
              </td>
              <td colSpan="20">
                <Select
                  showSearch
                  disabled={disabled}
                  value={verificationSignTwo}
                  onChange={(value) => setVerificationSignTwo(value)}
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="Search Name"
                  optionFilterProp="children"
                >
                  <Select.Option value="" disabled selected>
                    Select Name
                  </Select.Option>
                  {QaLovs.map((option) => (
                    <Select.Option key={option.id} value={option.value}>
                      {option.value}
                    </Select.Option>
                  ))}
                </Select>
                <br />
                <Input
                  onChange={(e) => setVerificationDateTwo(e.target.value)}
                  type="date"
                  disabled={disabled}
                  value={verificationDateTwo}
                  max={formattedToday}
                  size="small"
                  style={{ width: "100%", textAlign: "center" }}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "40px", textAlign: "center" }}>
                iii
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Whether affected material is removed from the work place?
              </th>
              <td colSpan="20">
                {" "}
                <Radio.Group
                  onChange={(e) => setActionStatusThree(e.target.value)}
                  value={actionStatusThree}
                  disabled={disabled}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                </Radio.Group>
              </td>
              <td colSpan="20">
                <Select
                  showSearch
                  value={verificationSignThree}
                  disabled={disabled}
                  onChange={(value) => setVerificationSignThree(value)}
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="Search Name"
                  optionFilterProp="children"
                >
                  <Select.Option value="" disabled selected>
                    Select Name
                  </Select.Option>
                  {QaLovs.map((option) => (
                    <Select.Option key={option.id} value={option.value}>
                      {option.value}
                    </Select.Option>
                  ))}
                </Select>
                <br />
                <Input
                  onChange={(e) => setVerificationDateThree(e.target.value)}
                  type="date"
                  disabled={disabled}
                  value={verificationDateThree}
                  max={formattedToday}
                  size="small"
                  style={{ width: "100%", textAlign: "center" }}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "40px", textAlign: "center" }}>
                iv
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Whether all the material is inspected properly and found free
                from contamination?
              </th>
              <td colSpan="20">
                {" "}
                <Radio.Group
                  onChange={(e) => setActionStatusFour(e.target.value)}
                  value={actionStatusFour}
                  disabled={disabled}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                </Radio.Group>
              </td>
              <td colSpan="20">
                <Select
                  showSearch
                  value={verificationSignFour}
                  disabled={disabled}
                  onChange={(value) => setVerificationSignFour(value)}
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="Search Name"
                  optionFilterProp="children"
                >
                  <Select.Option value="" disabled selected>
                    Select Name
                  </Select.Option>
                  {QaLovs.map((option) => (
                    <Select.Option key={option.id} value={option.value}>
                      {option.value}
                    </Select.Option>
                  ))}
                </Select>
                <br />
                <Input
                  onChange={(e) => setVerificationDateFour(e.target.value)}
                  type="date"
                  value={verificationDateFour}
                  disabled={disabled}
                  max={formattedToday}
                  size="small"
                  style={{ width: "100%", textAlign: "center" }}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "40px", textAlign: "center" }}>
                v
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Whether all the broken parts and contaminated material is
                disposed off properly?
              </th>
              <td colSpan="20">
                {" "}
                <Radio.Group
                  onChange={(e) => setActionStatusFive(e.target.value)}
                  value={actionStatusFive}
                  disabled={disabled}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                </Radio.Group>
              </td>
              <td colSpan="20">
                <Select
                  showSearch
                  value={verificationSignFive}
                  disabled={disabled}
                  onChange={(value) => setVerificationSignFive(value)}
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="Search Name"
                  optionFilterProp="children"
                >
                  <Select.Option value="" disabled selected>
                    Select Name
                  </Select.Option>
                  {QaLovs.map((option) => (
                    <Select.Option key={option.id} value={option.value}>
                      {option.value}
                    </Select.Option>
                  ))}
                </Select>
                <br />
                <Input
                  onChange={(e) => setVerificationDateFive(e.target.value)}
                  type="date"
                  disabled={disabled}
                  value={verificationDateFive}
                  max={formattedToday}
                  size="small"
                  style={{ width: "100%", textAlign: "center" }}
                />
              </td>
            </tr>
            <tr>
              <th colSpan="5" style={{ height: "40px", textAlign: "center" }}>
                vi
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Whether all the activity is monitored by the departmental
                supervisor and QA Inspector both?
              </th>
              <td colSpan="20">
                {" "}
                <Radio.Group
                  onChange={(e) => setActionStatusSix(e.target.value)}
                  value={actionStatusSix}
                  disabled={disabled}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                </Radio.Group>
              </td>
              <td colSpan="20">
                <Select
                  showSearch
                  disabled={disabled}
                  value={verificationSignSix}
                  onChange={(value) => setVerificationSignSix(value)}
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="Search Name"
                  optionFilterProp="children"
                >
                  <Select.Option value="" disabled selected>
                    Select Name
                  </Select.Option>
                  {QaLovs.map((option) => (
                    <Select.Option key={option.id} value={option.value}>
                      {option.value}
                    </Select.Option>
                  ))}
                </Select>
                <br />
                <Input
                  onChange={(e) => setVerificationDateSix(e.target.value)}
                  type="date"
                  disabled={disabled}
                  value={verificationDateSix}
                  max={formattedToday}
                  size="small"
                  style={{ width: "100%", textAlign: "center" }}
                />
              </td>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "3",
      label: <p>C. Corrective / Preventive </p>,
      children: (
        <div>
          <table
            style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
          >
            <tr>
              <th colSpan="5" style={{ textAlign: "center" }}>
                S. No.
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Actions
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Responsibility / Target Date
              </th>
              <th colSpan="20" style={{ textAlign: "center" }}>
                Status
              </th>
            </tr>
            <tr>
              <th colSpan="5" style={{ textAlign: "center", height: "60px" }}>
                i
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Can the broken glass / hard plastic be replaced with other
                alternate material, to reduce number of glasses? If Yes.{" "}
              </th>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <input
                  onChange={(e) => setResponsibilityOne(e.target.value)}
                  type="text"
                  value={responsibilityOne}
                  size="small"
                  disabled={disabled}
                  className="inp-new"
                  style={{ textAlign: "center" }}
                  placeholder="Enter Name"
                  onKeyDown={handleKeyDown}
                />{" "}
                <br />{" "}
                <Input
                  onChange={(e) => setTargetDateOne(e.target.value)}
                  type="date"
                  disabled={disabled}
                  value={targetDateOne}
                  max={formattedToday}
                  size="small"
                  style={{ width: "100%", textAlign: "center" }}
                />{" "}
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setCorrectiveStatusOne(e.target.value)}
                  value={correctiveStatusOne}
                  disabled={disabled}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th colSpan="5" style={{ textAlign: "center", height: "60px" }}>
                ii
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Whether the broken glass / hard plastic is replaced?
              </th>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <input
                  onChange={(e) => setResponsibilityTwo(e.target.value)}
                  type="text"
                  value={responsibilityTwo}
                  size="small"
                  disabled={disabled}
                  className="inp-new"
                  style={{ textAlign: "center" }}
                  placeholder="Enter Name"
                  onKeyDown={handleKeyDown}
                />{" "}
                <br />{" "}
                <Input
                  onChange={(e) => setTargetDateTwo(e.target.value)}
                  type="date"
                  value={targetDateTwo}
                  max={formattedToday}
                  size="small"
                  disabled={disabled}
                  style={{ width: "100%", textAlign: "center" }}
                />
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setCorrectiveStatusTwo(e.target.value)}
                  value={correctiveStatusTwo}
                  disabled={disabled}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th colSpan="5" style={{ textAlign: "center", height: "60px" }}>
                iii
              </th>
              <th colSpan="40" style={{ textAlign: "center" }}>
                Whether all the concerned personnel are trained properly? If No
                -
              </th>
              <td colSpan="20" style={{ textAlign: "center" }}>
                {" "}
                <input
                  onChange={(e) => setResponsibilityThree(e.target.value)}
                  type="text"
                  value={responsibilityThree}
                  size="small"
                  disabled={disabled}
                  className="inp-new"
                  style={{ textAlign: "center" }}
                  placeholder="Enter Name"
                  onKeyDown={handleKeyDown}
                />{" "}
                <br />{" "}
                <Input
                  onChange={(e) => setTargetDateThree(e.target.value)}
                  type="date"
                  disabled={disabled}
                  value={targetDateThree}
                  max={formattedToday}
                  size="small"
                  style={{ width: "100%", textAlign: "center" }}
                />
              </td>
              <td colSpan="20" style={{ textAlign: "center" }}>
                <Radio.Group
                  onChange={(e) => setCorrectiveStatusThree(e.target.value)}
                  value={correctiveStatusThree}
                  disabled={disabled}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Radio value="Y">Yes</Radio>
                  <Radio value="N">No</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th colSpan="85" style={{ height: "35px", textAlign: "left" }}>
                {" "}
                Remarks:{" "}
                <TextArea
                  value={remarks}
                  disabled={disabled}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={4}
                  style={{ width: "100%" }}
                />
              </th>
            </tr>
          </table>
        </div>
      ),
    },
    {
      key: "4",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "100%", margin: "auto" }}>
            <tr>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                QA Inspector Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                HOD/Designee Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center", height: "30px" }}>
                QA Manager/Designee Sign & Date
              </td>
            </tr>
            <tr>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                {DetailsByParam?.qa_inspector_status ===
                  "QA_INSPECTOR_APPROVED" && (
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
                        <div>{DetailsByParam?.qa_inspector_sign}</div>
                        <div>
                          {formattedDateWithTime(
                            DetailsByParam?.qa_inspector_submitted_on
                          )}
                        </div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="QA Inspector Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </td>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                {(DetailsByParam?.hod_status === "HOD_APPROVED" ||
                  DetailsByParam?.hod_status === "HOD_REJECTED") && (
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
                        <div>{DetailsByParam?.hod_sign}</div>
                        <div>
                          {formattedDateWithTime(
                            DetailsByParam?.hod_submitted_on
                          )}
                        </div>
                      </div>
                      {getImage2 && (
                        <img
                          src={getImage2}
                          alt="HOD/Designee Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </td>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                }}
              >
                {(DetailsByParam?.manager_status === "MANAGER_APPROVED" ||
                  DetailsByParam?.manager_status === "MANAGER_REJECTED") && (
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
                        <div>{DetailsByParam?.manager_sign}</div>
                        <div>
                          {formattedDateWithTime(
                            DetailsByParam?.manager_submitted_on
                          )}
                        </div>
                      </div>
                      {getImage3 && (
                        <img
                          src={getImage3}
                          alt="QA Manager/Designee Sign"
                          style={{
                            width: "60px",
                            height: "60px",
                            marginLeft: "20px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            justifyContent: "center",
                          }}
                        />
                      )}
                    </div>
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
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="Breakage Report (GLASS / HARD PLASTIC / WOOD / CERAMIC)"
        formatNo="PH-QAD01/F-052"
        sopNo="PH-QAD01-D-47"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          role === "ROLE_HOD" ||
          role === "ROLE_DESIGNEE" ||
          role === "QA_MANAGER" ? (
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
          addonBefore="Report No:"
          placeholder="Report Number"
          value={reportNo}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          addonBefore="Department:"
          placeholder="Department"
          value={department}
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          onChange={(e) => setDate(e.target.value)}
          type="date"
          addonBefore="Date:"
          value={date}
          disabled={disabled}
          max={formattedToday}
          size="small"
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />
        <Input
          onChange={(e) => setTime(e.target.value)}
          type="time"
          addonBefore="Time :"
          value={time}
          disabled={disabled}
          size="small"
          style={{ width: "20%", height: "35px", marginLeft: "10px" }}
        />{" "}
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
        <Input.Group style={{ display: "flex", alignItems: "center" }}>
          <Input
            style={{ width: "10%", marginLeft: "6px" }}
            addonBefore="Type of Material:"
            placeholder="Type of Material"
          />
          <Select
            showSearch
            value={typeOfMaterial}
            onChange={(value) => setTypeOfMaterial(value)}
            style={{ width: "16%" }}
            disabled={disabled}
            placeholder="Search Type Of Material"
            optionFilterProp="children"
          >
            <Select.Option value="" disabled selected>
              Select Type of Material
            </Select.Option>
            {typeOfMaterialOptions.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.value}
              </Select.Option>
            ))}
          </Select>
        </Input.Group>
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

export default QA_f52;
