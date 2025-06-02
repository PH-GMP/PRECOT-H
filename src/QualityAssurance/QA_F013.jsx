/* eslint-disable no-restricted-globals */

import { Button, Input, message, Modal, Select, Tabs, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
import BleachingHeader from "../Components/BleachingHeader.js";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import {
  convertDate,
  getDepartmentId,
  handleKeyDown,
  printDateFormat,
  slashFormatDate,
} from "../util/util.js";

const QA_F013 = () => {
  const navigateSummary = "/Precot/QA/QA_F013_Summary";
  const role = localStorage.getItem("role");
  const departmentId = localStorage.getItem("departmentId");
  const localUsername = localStorage.getItem("username");
  const { state } = useLocation();
  const { TextArea } = Input;
  const [rejectModal, setRejectModal] = useState(false);
  const [eSign, setESign] = useState({
    firstAuditorSign: "",
    auditeeSign: "",
    level3_auditor_sign: "",
    qaMrSign: "",
  });
  const [rejectReason, setRejectReason] = useState();
  const navigate = useNavigate();
  const initialized = useRef(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = [
      "firstAuditorSign",
      "auditeeSign",
      "secondAuditorSign",
      "qaMrSign",
    ];
    signatureKeys.forEach((key) => {
      if (formData) {
        const username = formData[key];

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
              setESign((prevSign) => ({
                ...prevSign,
                [key]: url,
              }));
            })
            .catch((err) => {});
        }
      }
    });
  }, [formData && formData.firstAuditorSign]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const token = localStorage.getItem("token");
      const fetchData = () => {
        // const month = "October";
        // const year = "2024";

        const ncr = formData.ncrNo;
        const year = formData.auditYear;
        const iar = formData.iarNo;
        const department = formData.department;

        axios
          .get(
            `${API.prodUrl}/Precot/api/QA/Service/internalAuditNCReport/getAuditNCReport?year=${year}&iarNo=${iar}&department=${department}&ncrNo=${ncr}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
              },
            }
          )
          .then((response) => {
            if (response.data.length > 0) {
              setFormData(response.data[0]);
            }

            navigateBack(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error); // Handle any errors
          })
          .finally(() => {});
      };
      fetchData();
    }
  }, []);

  const checkLevel1MandatoryFields = () => {
    const { clauseNo, natureOfNonConformity, severity } = formData;
    const missingFields = [];
    if (!clauseNo) missingFields.push("clauseNo");
    if (!natureOfNonConformity) missingFields.push("Nature of Non conformity");
    if (!severity) missingFields.push("Severity");

    return missingFields;
  };

  const checkLevel2MandatoryFields = () => {
    const { correctivePreventiveAction } = formData;
    const missingFields = [];
    if (!correctivePreventiveAction)
      missingFields.push("Corrective and Preventive Action");

    return missingFields;
  };

  const checkLevel3MandatoryFields = () => {
    const { nameOfAuditor, ncrClosingDate } = formData;
    const missingFields = [];
    if (!nameOfAuditor) missingFields.push("Name of Auditor");
    if (!ncrClosingDate) missingFields.push("NCR Closing Date");

    return missingFields;
  };

  const checkLevel4MandatoryFields = () => {
    const { correctiveActionFoundToBe, ncrIs, ncrClosedOnTime } = formData;
    const missingFields = [];
    if (!correctiveActionFoundToBe) missingFields.push("Corrective Action");
    if (!ncrIs) missingFields.push("NCR is");
    if (!ncrClosedOnTime) missingFields.push("NCR Closed on Time");

    return missingFields;
  };

  const checkLevelBasisValidation = (level) => {
    let missingFields = [];
    // switch (getCurrentLevel()) {
    switch (level) {
      case "level1":
        missingFields = checkLevel1MandatoryFields();
        break;
      case "level2":
        missingFields = checkLevel2MandatoryFields();
        break;
      case "level3":
        missingFields = checkLevel3MandatoryFields();
        break;
      case "level4":
        missingFields = checkLevel4MandatoryFields();
        break;
    }
    return missingFields;
  };

  const [formData, setFormData] = useState({
    unit: "UNIT H",
    formatName: "Internal Audit NC Report",
    formatNo: "PH-QAD01-F-013",
    revisionNo: 2,
    sopNumber: "PH-QAD01-D-17",
    auditYear: state === null ? "" : state.year,
    iarNo: state === null ? "" : state.iar,
    reportDate: state === null ? "" : state.date,
    department: state === null ? "" : state.department,
    ncrNo: state === null ? "" : state.ncr,
    clauseNo: "",
    natureOfNonConformity: "",
    severity: "",
    agreedCompletionDate: "",
    signatureOfAuditor: null,
    signatureOfAuditee: null,
    corrections: "",
    rootCause1: "",
    rootCause2: "",
    rootCause3: "",
    rootCause4: "",
    rootCause5: "",
    correctivePreventiveAction: "",
    verificationOfActionTaken: "",
    auditorComments: "",
    ncrClosingDate: "",
    nameOfAuditor: "",
    statusOfNC: "",
    correctiveActionFoundToBe: "",
    ncrIs: "",
    ncrClosedOnTime: "",
    reason: null,
    firstAuditorStatus: null,
    firstAuditorSaveOn: null,
    firstAuditorSaveBy: null,
    firstAuditorSaveId: null,
    firstAuditorSubmitOn: null,
    firstAuditorSubmitBy: null,
    firstAuditorSubmitId: null,
    firstAuditorSign: null,
    auditeeStatus: "AUDITEE_SAVED",
    auditeeSaveOn: null,
    auditeeSaveBy: null,
    auditeeSaveId: null,
    auditeeSubmitOn: null,
    auditeeSubmitBy: null,
    auditeeSubmitId: null,
    auditeeSign: null,
    secondAuditorStatus: null,
    secondAuditorSaveOn: null,
    secondAuditorSaveBy: null,
    secondAuditorSaveId: null,
    secondAuditorSubmitOn: null,
    secondAuditorSubmitBy: null,
    secondAuditorSubmitId: null,
    secondAuditorSign: null,
    qaMrStatus: "QA_MR_SAVED",
    qaMrSubmitStatus: null,
    qaMrSaveOn: "",
    qaMrSaveBy: "",
    qaMrSaveId: "",
    qaMrSubmitOn: null,
    qaMrSubmitBy: null,
    qaMrSubmitId: null,
    qaMrSign: null,
  });

  const callSaveApi = (level) => {
    setStatusLoader(true);
    if (formData.ncrNo === "") {
      message.warning("NCR Number is mandatory");
      setStatusLoader(false);
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditNCReport/saveAuditNCReport?level=${level}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        navigate("/Precot/QA/QA_F013_Summary");
        message.success("Saved succesfully!");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };

  const callSubmitApi = (level) => {
    setStatusLoader(true);

    const token = localStorage.getItem("token");
    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditNCReport/submitAuditNCReport?level=${level}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        message.success(response.data.message);
        navigate(navigateSummary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };

  const canDisableFirstItem = () => {
    const departmentId = localStorage.getItem("departmentId");
    const auditeeDepartmentId = getDepartmentId(formData.department);
    if (role === "ROLE_HOD") {
      // for auditor only it enables
      if (departmentId != auditeeDepartmentId) {
        if (formData.qaMrStatus === "QA_MR_REJECTED") {
          return false;
        }

        if (formData.firstAuditorStatus === "FIRST_AUDITOR_SUBMITTED") {
          return true;
        }
      }
      // for auditee it is diabled
      else {
        return true;
      }
    } else {
      return true;
    }
  };

  const canDisableSecondItem = () => {
    const departmentId = localStorage.getItem("departmentId");
    const auditeeDepartmentId = getDepartmentId(formData.department);

    if (departmentId != auditeeDepartmentId) {
      return true;
    }

    if (
      departmentId == auditeeDepartmentId &&
      formData.auditeeStatus === "AUDITEE_SUBMITTED"
    ) {
      return true;
    }

    return false;
  };

  const canDisableThirdItem = () => {
    // after second auditor submitted need to disable those fields
    if (formData.secondAuditorStatus === "SECOND_AUDITOR_SUBMITTED") {
      return true;
    }

    // If auditee is submitted
    if (formData.auditeeStatus === "AUDITEE_SUBMITTED") {
      // need to display the fields only to auditor
      if (localUsername === formData.firstAuditorSubmitBy) {
        return false;
      }
      // and disable for other auditor
      return true;
    }

    return true;
  };

  const canDisableFourItem = () => {
    // QA_MANAGER
    // ROLE_MR
    if (role === "QA_MANAGER" || role === "ROLE_MR") {
      if (formData.qaMrSubmitStatus === "QA_MR_SUBMITTED") {
        return true;
      }
      return false;
    } else {
      return true;
    }
  };

  // new idea start

  const canDisplayRejectButton = () => {
    if (role === "QA_MANAGER" || role === "ROLE_MR") {
      if (formData.qaMrStatus === "WAITING_FOR_APPROVAL") {
        return "block";
      } else {
        return "none";
      }
    } else {
      return "none";
    }
  };

  const canDisplayApproveButton = () => {
    if (role === "QA_MANAGER" || role === "ROLE_MR") {
      if (formData.qaMrStatus === "WAITING_FOR_APPROVAL") {
        return "block";
      } else {
        return "none";
      }
    } else {
      return "none";
    }
  };

  const canDisplayTab1SaveButtons = () => {
    // FIRST_AUDITOR_SUBMITTED
    if (formData.firstAuditorStatus === "FIRST_AUDITOR_SUBMITTED") {
      return "none";
    } else {
      return "block";
    }
  };

  const canDisplayTab1SubmitButtons = () => {
    if (formData.qaMrStatus === "QA_MR_REJECTED") {
      return "block";
    }
    if (formData.firstAuditorStatus === "FIRST_AUDITOR_SUBMITTED") {
      return "none";
    } else {
      return "block";
    }
  };

  const canDisplayTab2SaveButtons = () => {
    const departmentId = localStorage.getItem("departmentId");
    const auditeeDepartmentId = getDepartmentId(formData.department);

    if (departmentId == auditeeDepartmentId) {
      // After submit flow
      if (
        formData.auditeeStatus === "AUDITEE_SUBMITTED" ||
        formData.qaMrApprovalStatus === "Rejected"
      ) {
        return "none";
      }
      // before submit flow
      if (formData.firstAuditorStatus === "FIRST_AUDITOR_SUBMITTED") {
        return "block";
      } else {
        return "none";
      }
    }
    // return none for other users not than auditee
    else {
      return "none";
    }
  };

  const canDisplayTab2SubmitButtons = () => {
    const departmentId = localStorage.getItem("departmentId");
    const auditeeDepartmentId = getDepartmentId(formData.department);

    if (departmentId == auditeeDepartmentId) {
      // After submit flow
      if (formData.auditeeStatus === "AUDITEE_SUBMITTED") {
        return "none";
      }
      // before submit flow
      if (formData.firstAuditorStatus === "FIRST_AUDITOR_SUBMITTED") {
        return "block";
      } else {
        return "none";
      }
    }
    // return none for other users not than auditee
    else {
      return "none";
    }
  };

  const canDisplayTab3SaveButtons = () => {
    if (role === "ROLE_HOD") {
      const departmentId = localStorage.getItem("departmentId");
      const auditeeDepartmentId = getDepartmentId(formData.department);
      if (departmentId != auditeeDepartmentId) {
        // after submit flow
        if (
          formData.secondAuditorStatus === "SECOND_AUDITOR_SUBMITTED" ||
          formData.qaMrApprovalStatus === "Rejected"
        ) {
          return "none";
        }
        // before submit flow
        if (formData.auditeeStatus === "AUDITEE_SUBMITTED") {
          return "block";
        } else {
          return "none";
        }
      }
      // none for audite
      else {
        return "none";
      }
    }
    // none for other user than hod
    else {
      return "none";
    }
  };

  const canDisplayTab3SubmitButtons = () => {
    if (role === "ROLE_HOD") {
      const departmentId = localStorage.getItem("departmentId");
      const auditeeDepartmentId = getDepartmentId(formData.department);
      if (departmentId != auditeeDepartmentId) {
        // after submit flow
        if (formData.secondAuditorStatus === "SECOND_AUDITOR_SUBMITTED") {
          return "none";
        }
        // before submit flow
        if (formData.auditeeStatus === "AUDITEE_SUBMITTED") {
          return "block";
        } else {
          return "none";
        }
      }
      // none for audite
      else {
        return "none";
      }
    }
    // none for other user than hod
    else {
      return "none";
    }
  };

  const canDisplayTab4SaveButtons = () => {
    if (role === "QA_MANAGER" || role === "ROLE_MR") {
      if (
        formData.qaMrSubmitStatus === "QA_MR_SUBMITTED" ||
        formData.qaMrApprovalStatus === "Rejected"
      ) {
        return "none";
      }
      if (formData.secondAuditorStatus === "SECOND_AUDITOR_SUBMITTED") {
        return "block";
      } else {
        return "none";
      }
    } else {
      return "none";
    }
  };

  const canDisplayTab4SubmitButtons = () => {
    if (role === "QA_MANAGER" || role === "ROLE_MR") {
      if (formData.qaMrSubmitStatus === "QA_MR_SUBMITTED") {
        return "none";
      }
      if (formData.secondAuditorStatus === "SECOND_AUDITOR_SUBMITTED") {
        return "block";
      } else {
        return "none";
      }
    } else {
      return "none";
    }
  };

  const handleSave1 = () => {
    callSaveApi("level1");
  };

  const handleSubmit1 = () => {
    if (formData.ncrNo === "") {
      message.warning("NCR Number is mandatory");
      setStatusLoader(false);
      return;
    }

    const missingFields = checkLevelBasisValidation("level1");

    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        message.warning(`Please fill in the mandatory field: ${field}`);
      });
      setStatusLoader(false);
      return;
    }

    formData.reason = null;
    callSubmitApi("level1");
  };

  const handleSave2 = () => {
    callSaveApi("level2");
  };

  const handleSubmit2 = () => {
    if (formData.ncrNo === "") {
      message.warning("NCR Number is mandatory");
      setStatusLoader(false);
      return;
    }

    const missingFields = checkLevelBasisValidation("level2");

    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        message.warning(`Please fill in the mandatory field: ${field}`);
      });
      setStatusLoader(false);
      return;
    }

    if (!formData.corrections) {
      formData.corrections = "NA";
    }

    if (!formData.rootCause1) {
      formData.rootCause1 = "NA";
    }
    if (!formData.rootCause2) {
      formData.rootCause2 = "NA";
    }
    if (!formData.rootCause3) {
      formData.rootCause3 = "NA";
    }
    if (!formData.rootCause4) {
      formData.rootCause4 = "NA";
    }
    if (!formData.rootCause5) {
      formData.rootCause5 = "NA";
    }

    callSubmitApi("level2");
  };

  const handleSave3 = () => {
    callSaveApi("level3");
  };

  const handleSubmit3 = () => {
    if (formData.ncrNo === "") {
      message.warning("NCR Number is mandatory");
      setStatusLoader(false);
      return;
    }

    const missingFields = checkLevelBasisValidation("level3");

    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        message.warning(`Please fill in the mandatory field: ${field}`);
      });
      setStatusLoader(false);
      return;
    }

    formData.reason = null;
    if (!formData.verificationOfActionTaken) {
      formData.verificationOfActionTaken = "NA";
    }
    if (!formData.auditorComments) {
      formData.auditorComments = "NA";
    }
    callSubmitApi("level3");
  };
  const handleSave4 = () => {
    callSaveApi("level4");
  };

  const handleSubmit4 = () => {
    if (formData.ncrNo === "") {
      message.warning("NCR Number is mandatory");
      setStatusLoader(false);
      return;
    }

    const missingFields = checkLevelBasisValidation("level4");

    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        message.warning(`Please fill in the mandatory field: ${field}`);
      });
      setStatusLoader(false);
      return;
    }

    if (!formData.statusOfNC) {
      formData.statusOfNC = "NA";
    }
    formData.reason = null;
    callSubmitApi("level4");
  };

  // new idea end

  const navigateBack = (data) => {
    if (role === "QA_MANAGER" || role === "ROLE_MR") {
      if (data[0].qaMrStatus === "QA_MR_REJECTED") {
        message.warning("QA / MR not submitted yet");
        navigate(navigateSummary);
        return;
      }
      if (!data.length > 0) {
        message.warning("ROLE QA or ROLE MR unable to initate the form");
        navigate(navigateSummary);
        return;
      }

      if (
        data[0].secondAuditorStatus === null ||
        data[0].secondAuditorStatus === "SECOND_AUDITOR_SAVED"
      ) {
        message.warning("second Level Auditor not Sumbitted Yet");
        navigate(navigateSummary);
        return;
      }
    } else if (role === "ROLE_HOD") {
      const auditeeDepartmentId = getDepartmentId(data[0].department);

      // auditee
      if (departmentId == auditeeDepartmentId) {
        if (data[0].qaMrStatus === "QA_MR_REJECTED") {
          message.warning("Auditor not submitted after Rejection");
          navigate(navigateSummary);
          return;
        }

        if (
          data[0].firstAuditorStatus === null ||
          data[0].firstAuditorStatus === "FIRST_AUDITOR_SAVED"
        ) {
          message.warning("First Level Auditor not Submitted Yet");
          navigate(navigateSummary);
          return;
        }
      }
      // auditors
      else {
        // data.firstAuditorStatus === "FIRST_AUDITOR_SUBMITTED" ||
        // First level auditor
        if (
          data[0].firstAuditorStatus === null ||
          data[0].firstAuditorStatus === "FIRST_AUDITOR_SAVED"
        ) {
          return;
        }

        // second auditor
        if (
          data[0].secondAuditorStatus === null ||
          data[0].secondAuditorStatus === "SECOND_AUDITOR_SAVED"
        ) {
          // first auditor after save
          if (!data[0].auditeeStatus === "AUDITEE_SUBMITTED") {
            message.warning("auditee need to submit before second submit");
            return;
          }
        }
      }
    } else {
      message.warning("You are not anuthorized to view this form");
      navigate(navigateSummary);
      return;
    }
  };

  const handleChange = (value, field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleTabOnChange = (key) => {};

  const handleBlur = () => {
    const pattern = /^\d{2}-\d{2}\/NCR \d{3}$/;
    if (!pattern.test(formData.ncrNo)) {
      message.warning("Invalid format. Expected format is XX-XX/NCR XXX.");
      setFormData((prevFormData) => ({
        ...prevFormData,
        ncrNo: "",
      }));
    }
  };

  const handleApprove = () => {
    setStatusLoader(true);
    const token = localStorage.getItem("token");
    const payload = {
      id: formData["reportId"],
      status: "Approve",
    };
    axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditNCReport/approveOrReject`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        message.success(response.data.message);
        navigate(navigateSummary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };
  const handleReject = () => {
    setStatusLoader(true);
    const token = localStorage.getItem("token");
    const payload = {
      id: formData["reportId"],
      status: "Reject",
      remarks: rejectReason,
    };
    axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/internalAuditNCReport/approveOrReject`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        message.success(response.data.message);
        navigate(navigateSummary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };

  const handleBack = () => {
    navigate("/Precot/QA/QA_F013_Summary");
  };

  const handleOpenRejectModal = () => {
    setRejectModal(true);
  };

  const handleCancel = () => {
    setRejectModal(false);
  };

  const [statusLoader, setStatusLoader] = useState(false);
  const formName = "INTERNAL AUDIT NC REPORT";
  const formatNo = "PH-QAD01-F-013";
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items = [
    {
      key: 1,
      label: <p>Nature of non-confirmity</p>,
      children: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "0.5rem",
              gap: "8px",
            }}
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayTab1SaveButtons(),
                alignItems: "center",
                gap: "8px",
              }}
              shape="round"
              icon={<IoSave color="#00308F" />}
              onClick={handleSave1}
              loading={statusLoader}
            >
              Save
            </Button>

            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayTab1SubmitButtons(),
                alignItems: "center",
                gap: "8px",
              }}
              shape="round"
              icon={<GrDocumentStore color="#00308F" />}
              onClick={handleSubmit1}
              loading={statusLoader}
            >
              Submit
            </Button>
          </div>
          <div>
            <Input
              addonBefore="Date"
              style={{ width: "45%", margin: "5px" }}
              value={slashFormatDate(formData.reportDate)}
              disabled
            />
            <Input
              addonBefore="Department"
              style={{ width: "45%", margin: "5px" }}
              value={formData.department}
              disabled
            />
            <Input
              addonBefore="NCR No"
              value={formData.ncrNo}
              style={{ width: "45%", margin: "5px" }}
              onChange={(e) => handleChange(e.target.value, "ncrNo")}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              disabled
            />
            <Input
              addonBefore="Non Conformity raised against Clause No"
              value={formData.clauseNo}
              style={{ width: "45%", margin: "5px" }}
              onChange={(e) => {
                handleChange(e.target.value, "clauseNo");
              }}
              disabled={canDisableFirstItem()}
            />
            <Input
              addonBefore="Non Conformity raised against Requirement No"
              value={formData.iarNo}
              style={{ width: "45%", margin: "5px" }}
              disabled
            />
          </div>
          <table style={{ width: "100%" }}>
            <tr>
              <td rowspan={2}>
                <p style={{ padding: "2px" }}>Nature of non-confirmity: </p>
                <textarea
                  placeholder="Nature of non-confirmity"
                  rows="9"
                  value={formData.natureOfNonConformity}
                  onChange={(e) =>
                    handleChange(e.target.value, "natureOfNonConformity")
                  }
                  style={{
                    resize: "none",
                    outline: "none",
                    margin: "10px",
                    width: "95%",
                    border: "none",
                  }}
                  disabled={canDisableFirstItem()}
                ></textarea>
              </td>
              <td style={{ width: "15%" }}>
                <span style={{ padding: "5px" }}>severity:</span>
              </td>
              <td>
                <Select
                  placeholder="select severity"
                  style={{ width: "10rem", margin: "10px" }}
                  onChange={(value) => handleChange(value, "severity")}
                  value={formData.severity === "" ? null : formData.severity}
                  disabled={canDisableFirstItem()}
                >
                  <Select.Option value="Major">Major</Select.Option>
                  <Select.Option value="Minor">Minor</Select.Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td>
                <span style={{ padding: "5px" }}>Agreed Completion Date:</span>
              </td>
              <td>
                {/* agreedCompletionDate */}
                <input
                  type="date"
                  style={{ margin: "5px" }}
                  value={convertDate(formData.agreedCompletionDate)}
                  onChange={(e) =>
                    handleChange(e.target.value, "agreedCompletionDate")
                  }
                  disabled={canDisableFirstItem()}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                <p style={{ padding: "15px" }}>Signature of Auditor(s):</p>
                <b>
                  {formData.firstAuditorSign}
                  <br></br>
                  {printDateFormat(formData.firstAuditorSubmitOn)}
                </b>
                <br></br>
                {eSign.firstAuditorSign ? (
                  <img
                    src={eSign.firstAuditorSign}
                    alt="firstAuditorSign"
                    style={{
                      width: "100px",
                      height: "50px",
                      objectFit: "contain",
                      mixBlendMode: "multiply",
                    }}
                  />
                ) : null}
              </td>
            </tr>
          </table>
        </>
      ),
    },
    {
      key: 2,
      label: <p>Root Cause(s)</p>,
      children: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "0.5rem",
              gap: "8px",
            }}
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayTab2SaveButtons(),
                alignItems: "center",
                gap: "8px",
              }}
              shape="round"
              icon={<IoSave color="#00308F" />}
              onClick={handleSave2}
              loading={statusLoader}
            >
              Save
            </Button>

            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayTab2SubmitButtons(),
                alignItems: "center",
                gap: "8px",
              }}
              shape="round"
              icon={<GrDocumentStore color="#00308F" />}
              onClick={handleSubmit2}
              loading={statusLoader}
            >
              Submit
            </Button>
          </div>
          <table style={{ width: "100%" }}>
            <tr>
              <td colSpan={2}>
                <p style={{ padding: "2px" }}>Corrections: </p>
                <textarea
                  placeholder="Corrections"
                  value={formData.corrections}
                  onChange={(e) => handleChange(e.target.value, "corrections")}
                  rows="5"
                  style={{
                    resize: "none",
                    outline: "none",
                    margin: "10px",
                    width: "95%",
                    border: "none",
                  }}
                  disabled={canDisableSecondItem()}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "0.5rem" }}>
                Root Cause:
              </td>
            </tr>
            <tr>
              <td style={{ width: "10%", textAlign: "center" }}>
                <p>Why 1: </p>
              </td>

              <td style={{ width: "90%" }}>
                <Input
                  value={formData.rootCause1}
                  onChange={(e) => handleChange(e.target.value, "rootCause1")}
                  disabled={canDisableSecondItem()}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ textAlign: "center" }}>Why 2: </p>
              </td>
              <td>
                <Input
                  value={formData.rootCause2}
                  onChange={(e) => handleChange(e.target.value, "rootCause2")}
                  disabled={canDisableSecondItem()}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ textAlign: "center" }}>Why 3: </p>
              </td>
              <td>
                <Input
                  value={formData.rootCause3}
                  onChange={(e) => handleChange(e.target.value, "rootCause3")}
                  disabled={canDisableSecondItem()}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ textAlign: "center" }}>Why 4: </p>
              </td>
              <td>
                <Input
                  value={formData.rootCause4}
                  onChange={(e) => handleChange(e.target.value, "rootCause4")}
                  disabled={canDisableSecondItem()}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ textAlign: "center" }}>Why 5: </p>
              </td>
              <td>
                <Input
                  value={formData.rootCause5}
                  onChange={(e) => handleChange(e.target.value, "rootCause5")}
                  disabled={canDisableSecondItem()}
                />
              </td>
            </tr>
            <tr>
              <td style={{ width: "20%", textAlign: "center" }}>
                <p style={{ textAlign: "center" }}>
                  Corrective and Preventive Action:{" "}
                </p>
              </td>
              <td>
                <Input
                  value={formData.correctivePreventiveAction}
                  onChange={(e) =>
                    handleChange(e.target.value, "correctivePreventiveAction")
                  }
                  disabled={canDisableSecondItem()}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                <p style={{ padding: "15px" }}>Signature of Auditee(s):</p>

                {formData.auditeeStatus !== null && (
                  <div>
                    <div>{formData.auditeeSign}</div>

                    <div>{printDateFormat(formData.auditeeSubmitOn)}</div>

                    <div>
                      {eSign.auditeeSign ? (
                        <img
                          src={eSign.auditeeSign}
                          alt="firstAuditorSign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                )}
              </td>
            </tr>
          </table>
        </>
      ),
    },
    {
      key: 3,
      label: <p>Actions and Comments </p>,
      children: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "0.5rem",
              gap: "8px",
            }}
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayTab3SaveButtons(),
                alignItems: "center",
                gap: "8px",
              }}
              shape="round"
              icon={<IoSave color="#00308F" />}
              onClick={handleSave3}
              loading={statusLoader}
            >
              Save
            </Button>

            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayTab3SubmitButtons(),
                alignItems: "center",
                gap: "8px",
              }}
              shape="round"
              icon={<GrDocumentStore color="#00308F" />}
              onClick={handleSubmit3}
              loading={statusLoader}
            >
              Submit
            </Button>
          </div>
          <table style={{ width: "100%" }}>
            <tr>
              <td style={{ width: "20%", textAlign: "center" }}>
                <p>Verification of Action Taken:</p>
              </td>
              <td colSpan={4}>
                <Input
                  value={formData.verificationOfActionTaken}
                  onChange={(e) => {
                    handleChange(e.target.value, "verificationOfActionTaken");
                  }}
                  disabled={canDisableThirdItem()}
                />
              </td>
            </tr>

            <tr>
              <td style={{ width: "20%", textAlign: "center" }}>
                <p>Auditor Comments:</p>
              </td>
              <td colSpan={4}>
                <Input
                  value={formData.auditorComments}
                  onChange={(e) => {
                    handleChange(e.target.value, "auditorComments");
                  }}
                  disabled={canDisableThirdItem()}
                />
              </td>
            </tr>

            <tr>
              <td style={{ width: "20%", textAlign: "center" }}>
                <p>NCR closing Date:</p>
              </td>
              <td>
                <input
                  type="date"
                  value={convertDate(formData.ncrClosingDate)}
                  onChange={(e) =>
                    handleChange(e.target.value, "ncrClosingDate")
                  }
                  disabled={canDisableThirdItem()}
                />
              </td>

              <td style={{ width: "20%", textAlign: "center" }}>
                <p>Name of the Auditor:</p>
              </td>
              <td>
                <Input
                  value={formData.nameOfAuditor}
                  onChange={(e) =>
                    handleChange(e.target.value, "nameOfAuditor")
                  }
                  disabled={canDisableThirdItem()}
                />
              </td>
            </tr>
            <tr>
              <td style={{ width: "20%", textAlign: "center" }}>
                <p>Signature:</p>
              </td>
              <td colSpan={4} style={{ textAlign: "center" }}>
                {formData.secondAuditorStatus !== null && (
                  <div>
                    <div>{formData.secondAuditorSign}</div>
                    <div>{printDateFormat(formData.secondAuditorSubmitOn)}</div>

                    <div>
                      {eSign.secondAuditorSign ? (
                        <img
                          src={eSign.secondAuditorSign}
                          alt="firstAuditorSign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                )}
              </td>
            </tr>
          </table>
        </>
      ),
    },
    {
      key: 4,
      label: <p>Conclusion</p>,
      children: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "0.5rem",
              gap: "8px",
            }}
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayTab4SaveButtons(),
                alignItems: "center",
                gap: "8px",
              }}
              shape="round"
              icon={<IoSave color="#00308F" />}
              onClick={handleSave4}
              loading={statusLoader}
            >
              Save
            </Button>

            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayTab4SubmitButtons(),
                alignItems: "center",
                gap: "8px",
              }}
              shape="round"
              icon={<GrDocumentStore color="#00308F" />}
              onClick={handleSubmit4}
              loading={statusLoader}
            >
              Submit
            </Button>
          </div>
          <table style={{ width: "100%" }}>
            <tr>
              <td style={{ width: "30%" }}>
                <p style={{ margin: "3px" }}>
                  Final conclusion / status of NC:{" "}
                </p>
              </td>
              <td>
                <Input
                  value={formData.statusOfNC}
                  onChange={(e) => handleChange(e.target.value, "statusOfNC")}
                  disabled={canDisableFourItem()}
                />
              </td>
            </tr>

            <tr>
              <td style={{ width: "30%" }}>
                <p style={{ margin: "3px" }}>
                  Corrective Action taken is found to be:{" "}
                </p>
              </td>
              <td>
                <Select
                  placeholder="Corrective Action"
                  disabled={canDisableFourItem()}
                  value={
                    formData.correctiveActionFoundToBe === ""
                      ? null
                      : formData.correctiveActionFoundToBe
                  }
                  onChange={(value) =>
                    handleChange(value, "correctiveActionFoundToBe")
                  }
                >
                  <Select.Option value="Effective">Effective</Select.Option>
                  <Select.Option value="Not Effective">
                    Not Effective
                  </Select.Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td style={{ width: "30%" }}>
                <p style={{ margin: "3px" }}>NCR is : </p>
              </td>
              <td>
                <Select
                  placeholder="select open/closed"
                  disabled={canDisableFourItem()}
                  value={formData.ncrIs === "" ? null : formData.ncrIs}
                  onChange={(value) => handleChange(value, "ncrIs")}
                >
                  <Select.Option value="Open">Open</Select.Option>
                  <Select.Option value="Closed">Closed</Select.Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td style={{ width: "30%" }}>
                <p style={{ margin: "3px" }}>
                  NCR closed within agreed / acceptable time frame:{" "}
                </p>
              </td>
              <td>
                <Select
                  placeholder="select yes/no"
                  disabled={canDisableFourItem()}
                  value={
                    formData.ncrClosedOnTime === ""
                      ? null
                      : formData.ncrClosedOnTime
                  }
                  onChange={(value) => handleChange(value, "ncrClosedOnTime")}
                >
                  <Select.Option value="Yes">Yes</Select.Option>
                  <Select.Option value="No">No</Select.Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                <p>Signature of QA / MR</p>

                {formData.qaMrStatus !== null && (
                  <div>
                    <div>{formData.qaMrSign}</div>
                    <div>{printDateFormat(formData.qaMrSubmitOn)}</div>

                    <div>
                      {eSign.qaMrSign ? (
                        <img
                          src={eSign.qaMrSign}
                          alt="firstAuditorSign"
                          style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <p style={{ margin: "2px" }}>
                  Note : NC shall be closed within 30 days from the date of
                  audit, by taking necessary corrective/ Preventive Actions as
                  per Procedure
                </p>
              </td>
            </tr>
          </table>
        </>
      ),
    },
  ];

  return (
    <>
      <BleachingHeader
        formName={formName}
        formatNo={formatNo}
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
              display: canDisplayApproveButton(),
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={<img src={approveIcon} alt="Approve Icon" color="#00308F" />}
            onClick={handleApprove}
            loading={statusLoader}
          >
            Approve
          </Button>,

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: canDisplayRejectButton(),
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_PCI_TRAINED_PERSON" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={handleOpenRejectModal}
            loading={statusLoader}
          >
            Reject
          </Button>,
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
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
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <Modal
        title="Reason For Reject"
        open={rejectModal}
        onCancel={handleCancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handleReject}
            loading={statusLoader}
          >
            Reject
          </Button>,
        ]}
      >
        <label>Reason : </label>
        <br></br>
        <br></br>
        <TextArea
          type="textArea"
          style={{ height: "100px" }}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        ></TextArea>
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
        onChange={handleTabOnChange}
      />
    </>
  );
};

export default QA_F013;
