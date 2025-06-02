/* eslint-disable no-restricted-globals */

import {
  Button,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Tabs,
  Tooltip,
} from "antd";
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
  dry_goods_lov,
  getFinancialYear,
  getFullMonthFromNumber,
  getMonthNumberFromDate,
  getPadPunchingMachineLov,
  getYear,
  handleKeyDown,
  printDateFormat,
  slashFormatDate,
} from "../util/util.js";

const QA_F020 = () => {
  const role = localStorage.getItem("role");
  const naviagateSummary = "/Precot/QA/QA_F020_Summary";
  const { Option } = Select;
  const { state } = useLocation();
  const { TextArea } = Input;
  const [rejectModal, setRejectModal] = useState(false);
  const [tabERejectModal, setTabERejectModal] = useState(false);
  const [padpunchingLov, setPadPunchingLov] = useState([]);
  const [statusLoader, setStatusLoader] = useState(false);
  const [eSign, setESign] = useState({
    qaInspectorA: "",
    productionSupervisorA: "",
    productionSupervisorBCD: "",
    productionSupervisorSign: "",
    qaInspectorSign: "",
    productionHeadSign: "",
    qaManagerSign: "",
    qaInspectorE: "",
  });
  const [rejectReason, setRejectReason] = useState();
  const navigate = useNavigate();
  const initialized = useRef(false);
  const [open, setOpen] = useState(false);
  function getYearAndMonth(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear(); // Extract the year
    const month = dateObj.toLocaleString("default", { month: "long" }); // Get full month name
    return { year, month };
  }
  const { year, month } = getYearAndMonth(state.date);

  const [bmrList, setBmrList] = useState([
    {
      value: "24-25/CCF/001",
      id: 1,
    },
  ]);

  const [formData, setFormData] = useState({
    tabName: "",
    tabStatus: "",
    action: "",
    format_name: "NON –CONFORMITY REPORT",
    format_no: "PH-QAD01-F-020",
    revision_no: 2,
    sop_number: "PH-QAD01-D-20",
    unit: "H",
    ncrNumber: "",
    bmrNumber: "",
    product: "",
    department: "",
    machineName: "",
    date: "",
    time: "",
    batchNo: "",
    financialYear: "",
    year: "",
    month: "",
    nonConfirmityNature: "",
    classificationMinor: "",
    classificationMajor: "",
    classificationCritical: "",
    category: "",
    quantityhold: "",
    qaInspectorA: "",
    qaInspectorIdA: "",
    qaInspectorDateA: "",
    productionSupervisorA: "",
    productionSupervisorIdA: "",
    productionSupervisorDateA: "",
    tabStatusA: "",
    correctionTaken: "",
    rootCause: "",
    why1: "",
    why2: "",
    why3: "",
    why4: "",
    why5: "",
    capa: "",
    capaDate: "",
    productionSupervisorBCD: "",
    productionSupervisorIdBCD: "",
    productionSupervisorDateBCD: "",
    qaInspectorBCD: "",
    qaInspectorIdBCD: "",
    qaInspectorDateBCD: "",
    tabStatusBCD: "",
    tabInternalStatus: "",
    verificationCorrection: "",
    dateTabE: "",
    reprocess: "",
    diverted: "",
    acceptedDeviation: "",
    rejected: "",
    qtyAccepted: "",
    qtyRejected: "",
    dispositionDateTime: "",
    qaInspectorE: "",
    qaInspectorIdE: "",
    qaInspectorDateE: "",
    tabStatusE: "",
    productionSupervisorSubmittedBy: "",
    qaInspectorSubmittedBy: "",
    productionHeadSubmittedBy: "",
    qaManagerSubmittedBy: "",
    productionSupervisorSign: "",
    qaInspectorSign: "",
    productionHeadSign: "",
    qaManagerSign: "",
    productionSupervisorStatus: "",
    qaInspectorStatus: "",
    productionHeadStatus: "",
    qaManagerStatus: "",
    productionSupervisorSubmittedDate: "",
    qaInspectorSubmittedDate: "",
    productionHeadSubmittedDate: "",
    qaManagerSubmittedDate: "",
    productionSupervisorSubmittedId: "",
    qaInspectorSubmittedId: "",
    productionHeadSubmittedId: "",
    qaManagerSubmittedId: "",
    status: "",
    reason: null,
  });

  const handleChange = (field, value) => {
    setFormData((prevformData) => ({
      ...prevformData,
      [field]: value,
    }));
  };

  const customSelectChange = (field, e) => {
    if (!formData.nonConfirmityNature) {
      handleKeyDown(e);

      if (e.key === "Enter" || e.type === "blur") {
        setFormData((prevformData) => ({
          ...prevformData,
          [field]: e.target.value,
        }));
      }
    }
  };

  const handleRadioChange = (field, value) => {
    setFormData((prevformData) => ({
      ...prevformData,
      [field]: value,
    }));
  };

  const callSaveApi = () => {
    const token = localStorage.getItem("token");
    if (formData.action !== "SAVED") {
      formData.action = "SAVED";
    }
    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/NonConformityReport/Save`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        message.success("saved succesfully!");
        navigate(naviagateSummary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };

  const callSaveAndApproveApi = () => {
    const token = localStorage.getItem("token");
    if (formData.action !== "APPROVED") {
      formData.action = "APPROVED";
    }
    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/NonConformityReport/Save`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        message.success("Approved succesfully!");
        navigate(naviagateSummary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };

  const callSaveAndRejectApi = () => {
    const token = localStorage.getItem("token");
    if (formData.action !== "REJECTED") {
      formData.action = "REJECTED";
    }
    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/NonConformityReport/Save`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        message.success("Rejected succesfully!");
        navigate(naviagateSummary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };

  const callSubmitApi = () => {
    const token = localStorage.getItem("token");
    if (formData.action !== "SUBMITTED") {
      formData.action = "SUBMITTED";
    }
    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/NonConformityReport/Save`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFormData(response.data);
        message.success("Submitted succesfully!");
        navigate(naviagateSummary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };

  const getBMRUrl = (department) => {
    let url = [];
    switch (department) {
      case "BLEACHING":
        url.push(`${API.prodUrl}/Precot/api/QA/Service/bleachingBmrLov`);
        break;
      case "SPUNLACE":
        url.push(
          `${API.prodUrl}/Precot/api/spunlace/summary/01.GetBatchNoSpulanceBmr`
        );
        url.push(`${API.prodUrl}/Precot/api/spulance/processSetupOrders`);
        break;
      case "DRY_GOODS":
        url.push(`${API.prodUrl}/Precot/api/cottonBall/fetchBatchNo`);
        url.push(`${API.prodUrl}/Precot/api/cottonPleat/fetchBatchNo`);
        url.push(`${API.prodUrl}/Precot/api/CottonWoolRall/fetchBatchNo`);
        break;
      case "PAD_PUNCHING":
        url.push(
          `${API.prodUrl}/Precot/api/punching/bmr/fetchProductionDetails`
        );
        break;
    }
    return url;
  };

  const canDisplayTab1SaveButtons = () => {
    if (role === "ROLE_QA" || role === "ROLE_CHEMIST") {
      if (formData.tabStatusA === "SUBMITTED") {
        return "none";
      }

      return "block";
    }
    return "none";
  };

  const canDisplayTab1Buttons = () => {
    if (role === "ROLE_QA" || role === "ROLE_CHEMIST") {
      if (formData.qaManagerStatus === "QA_MR_REJECTED") {
        return "block";
      }

      if (formData.productionHeadStatus === "PRODUCTION_HEAD_REJECTED") {
        return "block";
      }

      if (
        formData.productionSupervisorStatus === "PRODUCTION_SUPERVISOR_REJECTED"
      ) {
        return "block";
      }

      if (
        formData.tabStatusA === "SUBMITTED" &&
        formData.tabStatusE !== "REJECTED"
      ) {
        return "none";
      }

      return "block";
    }
    return "none";
  };

  const canDisplayTab2SaveButtons = () => {
    if (role === "ROLE_SUPERVISOR") {
      // level 4
      if (
        formData.productionSupervisorStatus === "PRODUCTION_SUPERVISOR_REJECTED"
      ) {
        return "none";
      }
      // level 3
      if (
        formData.tabInternalStatus === "REJECTED" ||
        formData.tabInternalStatus === "APPROVED"
      ) {
        return "none";
      }

      if (formData.tabStatusBCD === "SUBMITTED") {
        return "none";
      }

      if (formData.tabStatusA === "SUBMITTED") {
        return "block";
      }

      return "block";
    }
    return "none";
  };

  const canDisplayTab2Buttons = () => {
    if (role === "ROLE_SUPERVISOR") {
      if (formData.tabStatusBCD === "SUBMITTED") {
        return "none";
      }

      if (formData.tabStatusA === "SUBMITTED") {
        return "block";
      }

      return "block";
    }
    return "none";
  };

  const canDisplayTab3Buttons = () => {
    if (role === "ROLE_QA" || role === "ROLE_CHEMIST") {
      if (
        formData.tabStatusE === "APPROVED" ||
        formData.tabStatusE === "REJECTED"
      ) {
        return "none";
      }

      if (formData.tabStatusBCD === "SUBMITTED") {
        return "block";
      }
    }
    return "none";
  };

  const canDisplayApproveButtons = () => {
    if (role === "ROLE_SUPERVISOR") {
      if (
        formData.tabStatusE === "APPROVED" &&
        (formData.productionSupervisorStatus === "" ||
          formData.productionSupervisorStatus === "WAITING_FOR_APPROVAL")
      ) {
        return "block";
      }
      return "none";
    } else if (role === "ROLE_HOD") {
      if (
        formData.productionHeadStatus === "PRODUCTION_HEAD_APPROVED" ||
        formData.productionHeadStatus === "PRODUCTION_HEAD_REJECTED"
      ) {
        return "none";
      } else {
        return "block";
      }
    } else if (role === "QA_MANAGER" || role === "QC_MANAGER") {
      if (
        formData.qaManagerStatus === "QA_MR_APPROVED" ||
        formData.qaManagerStatus === "QA_MR_REJECTED"
      ) {
        return "none";
      } else {
        return "block";
      }
    } else {
      return "none";
    }
  };

  const canDisableTab1 = () => {
    if (role === "ROLE_QA" || role === "ROLE_CHEMIST") {
      // final level qa manager
      if (formData.qaManagerStatus === "QA_MR_REJECTED") {
        return false;
      }

      if (formData.productionHeadStatus === "PRODUCTION_HEAD_REJECTED") {
        return false;
      }

      if (
        formData.productionSupervisorStatus === "PRODUCTION_SUPERVISOR_REJECTED"
      ) {
        return false;
      }
      if (
        formData.tabStatusA === "SUBMITTED" &&
        formData.tabStatusE !== "REJECTED"
      ) {
        return true;
      }
      return false;
    }

    return true;
  };

  const canDisableTab2 = () => {
    if (role === "ROLE_SUPERVISOR") {
      if (formData.tabStatusBCD === "SUBMITTED") {
        return true;
      }

      if (formData.tabStatusA === "SUBMITTED") {
        return false;
      }

      return true;
    }
    return true;
  };

  const canDisableTab3 = () => {
    if (role === "ROLE_QA" || role === "ROLE_CHEMIST") {
      if (
        formData.tabStatusE === "APPROVED" ||
        formData.tabStatusE === "REJECTED"
      ) {
        return true;
      }

      if (formData.tabStatusBCD === "SUBMITTED") {
        return false;
      }
    }
    return true;
  };

  const navigateBack = (responseData) => {
    if (role === "ROLE_QA" || role === "ROLE_CHEMIST") {
    } else if (role === "ROLE_SUPERVISOR") {
      // QA_MR_REJECTED

      if (responseData.qaManagerStatus === "QA_MR_REJECTED") {
        navigate(naviagateSummary);
        message.warning("yet to approve!");
        return;
      }
      if (responseData.productionHeadStatus === "PRODUCTION_HEAD_REJECTED") {
        navigate(naviagateSummary);
        message.warning("yet to approve!");
        return;
      }
      if (
        responseData.productionSupervisorStatus ===
        "PRODUCTION_SUPERVISOR_REJECTED"
      ) {
        navigate(naviagateSummary);
        message.warning("yet to approve!");
        return;
      }
      if (responseData.qaInspectorStatus === "QA_INSPECTOR_REJECTED") {
        navigate(naviagateSummary);
        message.warning("yet to approve!");
        return;
      }

      if (responseData.tabStatusE === "REJECTED") {
        navigate(naviagateSummary);
        message.warning("yet to approve!");
        return;
      }

      if (responseData.tabStatusA !== "SUBMITTED") {
        navigate(naviagateSummary);
        message.warning("QA Inspetor/ QC chemist is not submitted!");
        return;
      }
    } else if (role === "ROLE_HOD") {
      if (responseData.qaManagerStatus === "QA_MR_REJECTED") {
        navigate(naviagateSummary);
        message.warning("QA / MR rejected. Before your level need to approve!");
        return;
      }

      if (responseData.tabStatusE !== "APPROVED") {
        navigate(naviagateSummary);
        message.warning("QA Inspetor/ QC chemist is not Approved!");
        return;
      }
    } else if (role === "QA_MANAGER" || role === "QC_MANAGER") {
      if (responseData.qaManagerStatus === "QA_MR_REJECTED") {
        navigate(naviagateSummary);
        message.warning("Production head is not Approved!");
        return;
      }

      if (responseData.productionHeadStatus !== "PRODUCTION_HEAD_APPROVED") {
        navigate(naviagateSummary);
        message.warning("Production Head is not Approved!");
        return;
      }
    } else {
      message.warning("Not Authorized to view this form");
      return;
    }
  };

  const handleSave1 = () => {
    setStatusLoader(true);

    if (!formData.financialYear) {
      formData.financialYear = getFinancialYear(formData.date);
    }
    if (!formData.year) {
      formData.year = getYear(formData.date);
    }
    if (!formData.month) {
      formData.month = getFullMonthFromNumber(
        getYear(formData.date),
        getMonthNumberFromDate(formData.date)
      );
    }

    if (formData.action !== "SAVED") {
      formData.action = "SAVED";
    }

    formData.tabName = "A";
    callSaveApi();
  };
  const handleSave2 = () => {
    setStatusLoader(true);

    if (formData.action !== "SAVED") {
      formData.action = "SAVED";
    }
    formData.tabName = "BCD";

    callSaveApi();
  };

  const handleSaveAndApprove = () => {
    setStatusLoader(true);

    if (!formData.dateTabE) {
      message.warning("Date is mandatory!");
      setStatusLoader(false);
      return;
    }

    if (!formData.reprocess) {
      formData.reprocess = "NA";
    }

    if (!formData.diverted) {
      formData.diverted = "NA";
    }
    if (!formData.acceptedDeviation) {
      formData.acceptedDeviation = "NA";
    }
    if (!formData.rejected) {
      formData.rejected = "NA";
    }
    if (!formData.verificationCorrection) {
      formData.verificationCorrection = "NA";
    }

    if (!formData.qtyAccepted) {
      formData.qtyAccepted = 0;
    }
    if (!formData.qtyRejected) {
      formData.qtyRejected = 0;
    }

    // as it is tab a
    formData.tabName = "E";

    callSaveAndApproveApi();
  };

  const handleSaveAndReject = () => {
    setStatusLoader(true);
    formData.tabName = "E";
    callSaveAndRejectApi();
  };

  const handleSubmit1 = () => {
    setStatusLoader(true);
    if (!formData.bmrNumber) {
      message.warning("Must Fill field BMR number");
      setStatusLoader(false);
      return;
    }
    if (!formData.product) {
      message.warning("Must Fill field Product");
    }

    if (!formData.batchNo) {
      message.warning("Must Fill field FG No/ Batch No");
      setStatusLoader(false);
      return;
    }
    if (!formData.nonConfirmityNature) {
      message.warning("Must Select / Fill Nature of non conformity");
      setStatusLoader(false);
      return;
    }
    if (!formData.quantityhold) {
      message.warning("Must Fill quantity on Hold field");
      setStatusLoader(false);
      return;
    }
    if (
      formData.department === "DRY_GOODS" ||
      formData.department === "PAD_PUNCHING"
    ) {
      if (!formData.machineName) {
        message.warning("Must Fill Machine Name");
        setStatusLoader(false);
        return;
      }
    }

    if (!formData.classificationMinor) {
      formData.classificationMinor = "NA";
    }
    if (!formData.classificationMajor) {
      formData.classificationMajor = "NA";
    }
    if (!formData.classificationCritical) {
      formData.classificationCritical = "NA";
    }

    if (!formData.financialYear) {
      formData.financialYear = getFinancialYear(formData.date);
    }
    if (!formData.year) {
      formData.year = getYear(formData.date);
    }
    if (!formData.month) {
      formData.month = getFullMonthFromNumber(
        getMonthNumberFromDate(formData.date)
      );
    }

    formData.reason = null;
    formData.tabName = "A";
    callSubmitApi();
  };
  const handleSubmit2 = () => {
    setStatusLoader(true);

    formData.tabName = "BCD";

    if (!formData.capaDate) {
      message.warning("Capa Date is Mandatory");
      setStatusLoader(false);
      return;
    }

    if (!formData.correctionTaken) {
      formData.correctionTaken = "NA";
    }
    if (!formData.rootCause) {
      formData.rootCause = "NA";
    }
    if (!formData.why1) {
      formData.why1 = "NA";
    }
    if (!formData.why2) {
      formData.why2 = "NA";
    }
    if (!formData.why3) {
      formData.why3 = "NA";
    }
    if (!formData.why4) {
      formData.why4 = "NA";
    }
    if (!formData.why5) {
      formData.why5 = "NA";
    }
    if (!formData.capa) {
      formData.capa = "NA";
    }
    callSubmitApi();
  };

  const handleApprove = () => {
    setStatusLoader(true);
    const token = localStorage.getItem("token");
    const payload = {
      id: formData["id"],
      status: "Approve",
    };
    axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/NonConformityReport/approveOrReject`,
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
        navigate(naviagateSummary);
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
      id: formData["id"],
      status: "Reject",
      remarks: rejectReason,
    };
    axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/NonConformityReport/approveOrReject`,
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
        navigate(naviagateSummary);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  };

  const handleBack = () => {
    navigate("/Precot/QA/QA_F020_Summary");
  };

  const handleOpenRejectModal = () => {
    setRejectModal(true);
  };
  const handleTabEOpenRejectModal = () => {
    setTabERejectModal(true);
  };

  const handleCancel = () => {
    setRejectModal(false);
  };

  const handleTabECancel = () => {
    setTabERejectModal(false);
  };

  const formName =
    "Non Conformity Report (For Machine Process/ WIP/ Finished Products)";
  const formatNo = "PH-QAD01-F-020";
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
              icon={
                role == "ROLE_PCI_TRAINED_PERSON" ? (
                  <IoSave color="#00308F" />
                ) : (
                  <img src={approveIcon} alt="Approve Icon" color="#00308F" />
                )
              }
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
                display: canDisplayTab1Buttons(),
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
              onClick={handleSubmit1}
              loading={statusLoader}
            >
              Submit
            </Button>
          </div>
          <table>
            <tr>
              <td style={{ padding: "0.4rem", width: "10rem" }}>NCR No:</td>
              <td colSpan={2} style={{ padding: "0.4rem" }}>
                {formData.ncrNumber}
              </td>
              <td colSpan={2} style={{ padding: "0.4rem", width: "10rem" }}>
                BMR No:
              </td>

              <td style={{ padding: "0.4rem" }}>
                <Select
                  value={!formData.bmrNumber ? null : formData.bmrNumber}
                  options={bmrList}
                  placeholder="Select BMR No"
                  onChange={(value) => handleChange("bmrNumber", value)}
                  style={{ width: "10rem" }}
                  showSearch
                  disabled={canDisableTab1()}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.4rem" }}>Product:</td>
              <td colSpan={2} style={{ padding: "0.4rem" }}>
                <Input
                  value={formData.product}
                  onChange={(e) => handleChange("product", e.target.value)}
                  placeholder="Enter Product"
                  disabled={canDisableTab1()}
                />
              </td>
              <td colSpan={2} style={{ padding: "0.4rem" }}>
                Date & Time
              </td>
              <td style={{ padding: "0.4rem" }}>
                {slashFormatDate(formData.date)} & {formData.time}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.4rem" }}>Department / Process:</td>
              <td style={{ padding: "0.4rem", width: "100px" }}>
                {formData.department}
              </td>
              <td style={{ padding: "0.4rem" }}>Machine Name:</td>
              <td style={{ padding: "0.4rem", width: "100px" }}>
                {formData.department === "BLEACHING" ||
                formData.department === "SPUNLACE" ? (
                  <Input value={formData.department} disabled />
                ) : (
                  <Select
                    placeholder="select Machine Name"
                    options={
                      (formData.department === "PAD_PUNCHING" &&
                        padpunchingLov) ||
                      (formData.department === "DRY_GOODS" &&
                        dry_goods_lov()) ||
                      []
                    }
                    value={
                      formData.machineName !== "" ? formData.machineName : null
                    }
                    onChange={(value) => handleChange("machineName", value)}
                    disabled={canDisableTab1()}
                    style={{ width: "10rem" }}
                  />
                )}
              </td>
              <td style={{ padding: "0.4rem" }}>FG No / Batch No:</td>
              <td style={{ padding: "0.4rem", width: "100px" }}>
                <Input
                  value={formData.batchNo}
                  onChange={(e) => handleChange("batchNo", e.target.value)}
                  placeholder="Enter Batch No"
                  disabled={canDisableTab1()}
                  onKeyDown={handleKeyDown}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <p style={{ padding: "2px" }}>
                  A. Nature of non-confirmity (in detail):{" "}
                </p>
                <Select
                  placeholder="Select nature of non conformity"
                  value={
                    formData.nonConfirmityNature
                      ? formData.nonConfirmityNature
                      : null
                  }
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    handleChange("nonConfirmityNature", value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleChange("nonConfirmityNature", e.target.value);
                    }
                  }}
                  onBlur={(e) => customSelectChange("nonConfirmityNature", e)}
                  disabled={canDisableTab1()}
                  showSearch
                >
                  <Option value="Grammage">Grammage</Option>
                  <Option value="Less qty">Less qty</Option>
                  <Option value="Chemical">Chemical</Option>
                  <Option value="Packing">Packing</Option>
                  <Option value="Product Strength">Product Strength</Option>
                  <Option value="Less count">Less count</Option>

                  <Option value="Contamination">Contamination</Option>
                </Select>
              </td>
              <td colSpan={2}>
                <p style={{ margin: "5px" }}>Classfication:</p>
                <div
                  style={{
                    margin: "5px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "4rem" }}>Minor</div>
                  <div>
                    <Radio.Group
                      onChange={(e) =>
                        handleRadioChange("classificationMinor", e.target.value)
                      }
                      value={formData.classificationMinor}
                      disabled={canDisableTab1()}
                    >
                      <Radio value={"Yes"}>Yes</Radio>
                      <Radio value={"No"}>No</Radio>
                      <Radio value={"NA"}>NA</Radio>
                    </Radio.Group>
                  </div>
                </div>

                <div
                  style={{
                    margin: "5px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "4rem" }}>Major</div>
                  <div>
                    <Radio.Group
                      onChange={(e) =>
                        handleRadioChange("classificationMajor", e.target.value)
                      }
                      value={formData.classificationMajor}
                      disabled={canDisableTab1()}
                    >
                      <Radio value={"Yes"}>Yes</Radio>
                      <Radio value={"No"}>No</Radio>
                      <Radio value={"NA"}>NA</Radio>
                    </Radio.Group>
                  </div>
                </div>

                <div
                  style={{
                    margin: "5px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "4rem" }}>Critical</div>
                  <div>
                    <Radio.Group
                      value={formData.classificationCritical}
                      onChange={(e) =>
                        handleRadioChange(
                          "classificationCritical",
                          e.target.value
                        )
                      }
                      disabled={canDisableTab1()}
                    >
                      <Radio value={"Yes"}>Yes</Radio>
                      <Radio value={"No"}>No</Radio>
                      <Radio value={"NA"}>NA</Radio>
                    </Radio.Group>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.4rem" }}>
                Quantity on Hold:
                <Input
                  style={{ margin: "5px" }}
                  value={formData.quantityhold}
                  onChange={(e) => handleChange("quantityhold", e.target.value)}
                  disabled={canDisableTab1()}
                />
              </td>
              <td
                colSpan={5}
                style={{ padding: "0.4rem", textAlign: "center" }}
              >
                QA / QC (sign):
                {formData.tabStatusA === "SUBMITTED" && (
                  <div>
                    <div style={{ marginTop: "0.3rem" }}>
                      <b> {formData.qaInspectorA}</b>
                    </div>

                    <div>
                      <b>{printDateFormat(formData.qaInspectorDateA)}</b>
                    </div>

                    <div>
                      {eSign.qaInspectorA ? (
                        <img
                          src={eSign.qaInspectorA}
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
      key: 2,
      label: <p>Correction Taken</p>,
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
              icon={
                role == "ROLE_PCI_TRAINED_PERSON" ? (
                  <IoSave color="#00308F" />
                ) : (
                  <img src={approveIcon} alt="Approve Icon" color="#00308F" />
                )
              }
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
                display: canDisplayTab2Buttons(),
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
              onClick={handleSubmit2}
              loading={statusLoader}
            >
              Submit
            </Button>
          </div>
          <table>
            <tr>
              <td colSpan={2}>
                <p style={{ padding: "2px" }}>B. Correction Taken: </p>
                <textarea
                  placeholder="Correction Taken"
                  rows="4"
                  style={{
                    resize: "none",
                    outline: "none",
                    margin: "10px",
                    width: "95%",
                    border: "none",
                  }}
                  value={formData.correctionTaken}
                  onChange={(e) =>
                    handleChange("correctionTaken", e.target.value)
                  }
                  disabled={canDisableTab2()}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div
                  style={{
                    padding: "2px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ whiteSpace: "nowrap", marginRight: "10px" }}>
                    C. Root Cause:
                  </span>
                  <Input
                    placeholder="Root Cause"
                    value={formData.rootCause}
                    onChange={(e) => handleChange("rootCause", e.target.value)}
                    disabled={canDisableTab2()}
                  />
                </div>

                <Input
                  addonBefore="Why1"
                  placeholder="Enter value for Why1"
                  value={formData.why1}
                  onChange={(e) => handleChange("why1", e.target.value)}
                  disabled={canDisableTab2()}
                />
                <Input
                  addonBefore="Why2"
                  placeholder="Enter value for Why2"
                  value={formData.why2}
                  onChange={(e) => handleChange("why2", e.target.value)}
                  disabled={canDisableTab2()}
                />
                <Input
                  addonBefore="Why3"
                  placeholder="Enter value for Why3"
                  value={formData.why3}
                  onChange={(e) => handleChange("why3", e.target.value)}
                  disabled={canDisableTab2()}
                />
                <Input
                  addonBefore="Why4"
                  placeholder="Enter value for Why4"
                  value={formData.why4}
                  onChange={(e) => handleChange("why4", e.target.value)}
                  disabled={canDisableTab2()}
                />
                <Input
                  addonBefore="Why5"
                  placeholder="Enter value for Why5"
                  value={formData.why5}
                  onChange={(e) => handleChange("why5", e.target.value)}
                  disabled={canDisableTab2()}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <p style={{ padding: "2px" }}>
                  D. Corrective Action & Preventive Action:{" "}
                </p>
                <textarea
                  placeholder="corrective Action & Preventive Action"
                  rows="4"
                  style={{
                    resize: "none",
                    outline: "none",
                    margin: "10px",
                    width: "95%",
                    border: "none",
                  }}
                  value={formData.capa}
                  onChange={(e) => handleChange("capa", e.target.value)}
                  disabled={canDisableTab2()}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <span style={{ margin: "2px" }}>Date: </span>
                <input
                  type="date"
                  value={formData.capaDate}
                  onChange={(e) => handleChange("capaDate", e.target.value)}
                  disabled={canDisableTab2()}
                />
              </td>
              <td style={{ padding: "0.5rem", textAlign: "center" }}>
                <p>Production Supervisor (sign) :</p>
                {formData.tabStatusBCD !== "" && (
                  <div>
                    <div style={{ marginTop: "0.3rem" }}>
                      <b> {formData.productionSupervisorA}</b>
                    </div>

                    <div>
                      <b>
                        {printDateFormat(formData.productionSupervisorDateA)}
                      </b>
                    </div>

                    <div>
                      {eSign.productionSupervisorA ? (
                        <img
                          src={eSign.productionSupervisorA}
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
      label: <p>Verification of Corrective /Corrective Action(s) Taken</p>,
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
                display: canDisplayTab3Buttons(),
                alignItems: "center",
                gap: "8px",
              }}
              shape="round"
              icon={
                role == "ROLE_PCI_TRAINED_PERSON" ? (
                  <IoSave color="#00308F" />
                ) : (
                  <img src={approveIcon} alt="Approve Icon" color="#00308F" />
                )
              }
              onClick={handleSaveAndApprove}
              loading={statusLoader}
            >
              Approve
            </Button>

            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayTab3Buttons(),
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
              onClick={handleTabEOpenRejectModal}
              loading={statusLoader}
            >
              Reject
            </Button>
          </div>
          <table>
            <tr>
              <td colSpan={6}>
                <div>
                  <p>Disposition:</p>
                </div>
                <div>
                  <div
                    style={{
                      margin: "5px",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "12rem" }}>
                      To be Reprocess / Rework
                    </div>
                    <div>
                      <Radio.Group
                        onChange={(e) =>
                          handleRadioChange("reprocess", e.target.value)
                        }
                        value={formData.reprocess}
                        disabled={canDisableTab3()}
                      >
                        <Radio value={"Yes"}>Yes</Radio>
                        <Radio value={"No"}>No</Radio>
                        <Radio value={"NA"}>NA</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                  {/* To be diverted */}
                  <div
                    style={{
                      margin: "5px",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "12rem" }}>To be diverted</div>
                    <div>
                      <Radio.Group
                        onChange={(e) =>
                          handleRadioChange("diverted", e.target.value)
                        }
                        value={formData.diverted}
                        disabled={canDisableTab3()}
                      >
                        <Radio value={"Yes"}>Yes</Radio>
                        <Radio value={"No"}>No</Radio>
                        <Radio value={"NA"}>NA</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                  {/* Accepted under Deviation */}
                  <div
                    style={{
                      margin: "5px",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "12rem" }}>
                      Accepted under Deviation
                    </div>
                    <div>
                      <Radio.Group
                        onChange={(e) =>
                          handleRadioChange("acceptedDeviation", e.target.value)
                        }
                        value={formData.acceptedDeviation}
                        disabled={canDisableTab3()}
                      >
                        <Radio value={"Yes"}>Yes</Radio>
                        <Radio value={"No"}>No</Radio>
                        <Radio value={"NA"}>NA</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                  {/* rejected */}
                  <div
                    style={{
                      margin: "5px",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "12rem" }}>Rejected</div>
                    <div>
                      <Radio.Group
                        onChange={(e) =>
                          handleRadioChange("rejected", e.target.value)
                        }
                        value={formData.rejected}
                        disabled={canDisableTab3()}
                      >
                        <Radio value={"Yes"}>Yes</Radio>
                        <Radio value={"No"}>No</Radio>
                        <Radio value={"NA"}>NA</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem" }}>
                <p style={{ margin: "2px" }}>Date:</p>
              </td>
              <td style={{ padding: "0.5rem" }}>
                <input
                  type="date"
                  value={formData.dateTabE}
                  onChange={(e) => handleChange("dateTabE", e.target.value)}
                  disabled={canDisableTab3()}
                />
              </td>
              <td style={{ padding: "0.5rem" }}>
                <p style={{ margin: "2px" }}>Qty.Accepted:</p>
              </td>
              <td style={{ padding: "0.5rem" }}>
                <Input
                  value={formData.qtyAccepted}
                  onChange={(e) => handleChange("qtyAccepted", e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={canDisableTab3()}
                />
              </td>
              <td style={{ padding: "0.5rem" }}>
                <p style={{ margin: "2px" }}>Qty.Rejected:</p>
              </td>
              <td style={{ padding: "0.5rem" }}>
                <Input
                  value={formData.qtyRejected}
                  onChange={(e) => handleChange("qtyRejected", e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={canDisableTab3()}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={6}>
                <p style={{ padding: "2px" }}>
                  E. Verification of Correction/ Corrective Action(s) Taken:{" "}
                </p>
                <textarea
                  placeholder="Verification of Correction/  Corrective Action(s) Taken"
                  rows="9"
                  style={{
                    resize: "none",
                    outline: "none",
                    margin: "10px",
                    width: "95%",
                    border: "none",
                  }}
                  value={formData.verificationCorrection}
                  onChange={(e) =>
                    handleChange("verificationCorrection", e.target.value)
                  }
                  disabled={canDisableTab3()}
                ></textarea>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    {formData.tabStatusE !== "" && (
                      <div>
                        <div style={{ marginTop: "0.3rem" }}>
                          <b> {formData.qaInspectorE}</b>
                        </div>

                        <div>
                          <b>{printDateFormat(formData.qaInspectorDateE)}</b>
                        </div>

                        <div>
                          {eSign.qaInspectorE ? (
                            <img
                              src={eSign.qaInspectorE}
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
                    <p style={{ margin: "2px" }}>(sign - QA/QC )</p>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </>
      ),
    },
    {
      key: 6,
      label: <p>Signature</p>,
      children: (
        <>
          <table>
            <tr>
              <td
                colSpan={2}
                style={{ padding: "0.5rem", textAlign: "center" }}
              >
                <p style={{ margin: "2px" }}>Production (Sign): </p>
                {formData.productionSupervisorStatus !== "" &&
                  formData.productionSupervisorStatus !==
                    "WAITING_FOR_APPROVAL" && (
                    <div>
                      <div style={{ marginTop: "0.3rem" }}>
                        <b> {formData.productionSupervisorSign}</b>
                      </div>

                      <div>
                        <b>
                          {printDateFormat(
                            formData.productionSupervisorSubmittedDate
                          )}
                        </b>
                      </div>

                      <div>
                        {eSign.productionSupervisorSign ? (
                          <img
                            src={eSign.productionSupervisorSign}
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

              <td
                colSpan={2}
                style={{ padding: "0.5rem", textAlign: "center" }}
              >
                <p style={{ margin: "2px" }}>QA/QC (Sign): </p>
                {formData.tabStatusE !== "" && (
                  <div>
                    <div style={{ marginTop: "0.3rem" }}>
                      <b> {formData.qaInspectorE}</b>
                    </div>

                    <div>
                      <b>{printDateFormat(formData.qaInspectorDateE)}</b>
                    </div>

                    <div>
                      {eSign.qaInspectorE ? (
                        <img
                          src={eSign.qaInspectorE}
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
              <td
                colSpan={2}
                style={{ padding: "0.5rem", textAlign: "center" }}
              >
                <p style={{ margin: "2px" }}>Production Head: </p>
                {formData.productionHeadStatus !== "" &&
                  formData.productionHeadStatus !== "WAITING_FOR_APPROVAL" && (
                    <div>
                      <div style={{ marginTop: "0.3rem" }}>
                        <b> {formData.productionHeadSign}</b>
                      </div>

                      <div>
                        <b>
                          {printDateFormat(
                            formData.productionHeadSubmittedDate
                          )}
                        </b>
                      </div>

                      <div>
                        {eSign.productionHeadSign ? (
                          <img
                            src={eSign.productionHeadSign}
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
              <td style={{ padding: "0.5rem", textAlign: "center" }}>
                <p style={{ margin: "2px" }}>QA/QC Head: </p>
                {formData.qaManagerStatus !== "" &&
                  formData.qaManagerStatus !== "WAITING_FOR_APPROVAL" && (
                    <div>
                      <div style={{ marginTop: "0.3rem" }}>
                        <b> {formData.qaManagerSign}</b>
                      </div>

                      <div>
                        <b>
                          {printDateFormat(formData.qaManagerSubmittedDate)}
                        </b>
                      </div>

                      <div>
                        {eSign.qaManagerSign ? (
                          <img
                            src={eSign.qaManagerSign}
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
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const signatureKeys = [
      "qaInspectorA",
      "productionSupervisorA",
      "productionSupervisorBCD",
      "productionSupervisorSign",
      "qaInspectorSign",
      "productionHeadSign",
      "qaManagerSign",
      "qaInspectorE",
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
  }, [formData.qaInspectorA]);

  const fetchBmrNo = (url) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    // Return the axios promise so that we can chain `.then()` later
    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
        },
      })
      .then((response) => {
        // Log the response data
        return response.data; // Return the data so it can be used in `.then()` later
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle any errors
        return []; // Return empty array if there's an error
      });
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      (async () => {
        const machineLov = await getPadPunchingMachineLov();

        setPadPunchingLov(machineLov);
      })();

      const bmrUrls = getBMRUrl(state.department);

      let data = [];
      bmrUrls.map((url, index) => {
        // Call fetchBmrNo and chain `.then()` to get the result
        fetchBmrNo(url).then((result) => {
          // Concatenate the result to the `data` array
          data = data.concat(result);

          setBmrList(data);
        });

        // This log will happen before the `.then()` because of async behavior
      });

      const fetchData = () => {
        const token = localStorage.getItem("token"); // Get the token from localStorage

        axios
          .get(
            `${API.prodUrl}/Precot/api/QA/Service/NonConformityReport/getByparam?ncrNo=${state.ncrNo}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
              },
            }
          )
          .then((response) => {
            navigateBack(response.data);
            if (response.data.message !== "No data") {
              setFormData(response.data);
            } else {
              if (
                state.department === "BLEACHING" ||
                state.department === "SPUNLACE"
              ) {
              }
              setFormData((prevData) => ({
                ...prevData,
                date: state.date,
                department: state.department,
                time: state.time,
                machineName:
                  state.department === "BLEACHING" ||
                  state.department === "SPUNLACE"
                    ? state.department
                    : "",
              }));
              fetchNcrNumber();
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error); // Handle any errors
          })
          .finally(() => {});
      };

      const fetchNcrNumber = () => {
        if (formData.ncrNumber === "") {
          const token = localStorage.getItem("token"); // Get the token from localStorage

          // Return the axios promise so that we can chain `.then()` later
          return axios
            .get(
              `${API.prodUrl}/Precot/api/qa/number/generation?formNumber=PH-QAD01-F-020`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
                },
              }
            )
            .then((response) => {
              setFormData((prevData) => ({
                ...prevData,
                ncrNumber: response.data,
              }));
            })
            .catch((error) => {
              console.error("Error fetching data:", error); // Handle any errors
            });
        }
      };

      fetchData();
    }
  }, []);

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
              display: canDisplayApproveButtons(),
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_QA" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
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
              display: canDisplayApproveButtons(),
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

      {/* reject modal for tabE */}

      <Modal
        title="Reason For Reject"
        open={tabERejectModal}
        onCancel={handleTabECancel}
        width={380}
        destroyOnClose={true}
        footer={[
          <Button key="cancel" onClick={handleTabECancel}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            onClick={handleSaveAndReject}
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
          value={formData.reason}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              reason: e.target.value,
            }))
          }
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
      />
    </>
  );
};

export default QA_F020;
