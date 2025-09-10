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
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader";
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate, useLocation } from "react-router-dom";
import { BiEdit, BiLock, BiNavigation } from "react-icons/bi";
import { FaLock, FaUserCircle } from "react-icons/fa";
import moment from "moment";
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

const QC_f05 = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const location = useLocation();
  const { state } = location;
  const { bmr } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [fetchedDetails, setFetchedDetails] = useState("");
  const [PDEDetails, setPDEDetails] = useState("");
  const [paId, setpaId] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [ABDetails, setABDetails] = useState([]);
  const [ABDetailsClient, setABDetailsClient] = useState([]);

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

  // signature Image
  const [getImage, setGetImage] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedDetails?.[0]?.chemist_sign;
    if (username) {
      console.log("usernameparams", username);

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
  }, [fetchedDetails,API.prodUrl]);

  const [getImage1, setGetImage1] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = fetchedDetails?.[0]?.qc_sign;
    if (username) {
      console.log("usernameparams", username);

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
  }, [fetchedDetails,API.prodUrl]);

  const handleAddRow = () => {
    setRows([...rows, {}]);
  };

  const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    }
  };

  const roleauth = localStorage.getItem("role");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const canDisplayAddDelete = () => {
    if (roleauth == "ROLE_HOD" || roleauth == "ROLE_DESIGNEE") {
      return "none";
    }
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
    } else if (roleauth == "QA_MANAGER" || roleauth == "QC_MANAGER") {
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
    } else if (roleauth == "QA_MANAGER" || roleauth == "QC_MANAGER") {
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
        `${API.prodUrl}/Precot/api/chemicaltest/CLF005/approval`,
        {
          id: paId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QC/F-05/Summary");
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
        `${API.prodUrl}/Precot/api/chemicaltest/CLF005/approval`,
        {
          id: paId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/Precot/QC/F-05/Summary");
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
      await SaveABReport();
    } catch (error) {
      console.error(
        "Error saving ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL Record:",
        error
      );
    }
  };
  const handleSubmit = async () => {
    try {
      await SubmitABReport();
    } catch (error) {
      console.error(
        "Error submitting ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL  Record..",
        error
      );
    }
  };

  const SaveABReport = async () => {
    setSaveLoading(true);
    try {
      console.log("ad details working", ABDetails);
      const payload = {
        pa_id: paId,
        bmr: bmr,
        regularOrTrialBatch: "Random",
        batchNo: "",
        testedDate: "",
        remarks: "",
        absorb: ABDetails.map((record, index) => ({
          ...(fetchedDetails.length !== 0 && { pa_id: paId }),
          test_id: record.test_id,
          format: "ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT",
          format_no: "PH-QCL01/F-005",
          revision_no: 2,
          ref_sop_no: "PH-QCL01-D-05",
          unit: "H",
          testedDate: record.testedDate || record.specification,
          bmr: record.bmr,
          regularOrTrialBatch: record.regularOrTrialBatch,
          batchNo: record.batchNo || ABDetailsClient[index].batchno,
          mixing: record.mixing || ABDetailsClient[index].mixing,
          softener: record.softener || ABDetailsClient[index].softner,
          localOrExport:
            record.localOrExport || ABDetailsClient[index].local_export,
          physicalAppearance: record.physicalAppearance || record.physicalApp,
          odor: record.odor,
          fiberIdentification: record.fiberIdentification || record.fibre_obs,
          foreignFibers: record.foreignFibers || record.foreign_obs,
          ph: record.ph || record.acid_obs,
          surfaceActivity: record.surfaceActivity || record.surface_obs,
          acidityOrAlkalinity: record.acidityOrAlkalinity || record.acidRmk,
          sinkingTime: record.sinkingTime || record.abs_avg,
          absorbencyWhC: record.absorbencyWhC || record.abs_avg_2,
          sulphateAsh: record.sulphateAsh || record.sulphatedResObr,
          waterSolubleSubstances:
            record.waterSolubleSubstances || record.watersolubleResObr,
          etherSolubleSubstances:
            record.etherSolubleSubstances || record.ethersolubleResObr,
          dryingLoss: record.dryingLoss || record.dryingloss,
          fluorescence: record.fluorescence || record.fluronce,
          extractableColouringMatter:
            record.extractableColouringMatter || record.extractable,
          nepsCountPerG: record.nepsCountPerG || record.neps_count_rmk,
          uqlMm: record.uqlMm || record.uQL_w_rmk,
          lnmm: record.lnmm || record.ln_rmk,
          lwmm: record.lwmm || record.lw_rmk,
          fiberAverageLength: record.fiberAverageLength || record.fibre_obs,
          sfcN: record.sfcN || record.sFC_n_obs,
          sfcW: record.sfcW || record.sFC_w_obs,
          micronaireValue: record.micronaireValue || record.micronaire_obs,
          whitenessIndex: record.whitenessIndex || record.whiteness_obs,
          totalViableCountTvc:
            record.totalViableCountTvc || record.totalViableCount,
          totalFungalCountTfc:
            record.totalFungalCountTfc || record.totalfungalCount,
          remarks: record.remarks || record.remark,
          accepted: record.accepted || record.acceptedProduct,
          specificationPassed: record.specificationPassed,
          reportedBy: "",
          approvedBy: "",
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/chemicaltest/CLF005/save/absorbentbleachedcotton`,
        payload,
        { headers }
      );
      console.log("API Response:", response.data.id);
      localStorage.setItem("id", response.data.id);
      setTimeout(() => {
        navigate("/Precot/QC/F-05/Summary");
      }, 1500);
      message.success(
        "ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL  Record Saved Successfully.."
      );
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);

      throw new Error(
        "Failed to save ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL  Record !!"
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const SubmitABReport = async () => {
    setSubmitLoading(true);
    try {
      const payload = {
        pa_id: paId,
        bmr: bmr,
        regularOrTrialBatch: "Regular",
        batchNo: "",
        testedDate: "",
        remarks: "",
        absorb: ABDetails.map((record, index) => ({
          test_id: record.test_id,
          pa_id: paId,
          format: "ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT",
          format_no: "PH-QCL01/F-005",
          revision_no: 2,
          ref_sop_no: "PH-QCL01-D-05",
          unit: "H",
          testedDate: record.testedDate || record.specification,
          bmr: record.bmr,
          regularOrTrialBatch: record.regularOrTrialBatch,
          batchNo: record.batchNo || ABDetailsClient[index].batchno,
          mixing: record.mixing || ABDetailsClient[index].mixing,
          softener: record.softener || ABDetailsClient[index].softner,
          localOrExport:
            record.localOrExport || ABDetailsClient[index].local_export,
          physicalAppearance: record.physicalAppearance || record.physicalApp,
          odor: record.odor,
          fiberIdentification: record.fiberIdentification || record.fibre_obs,
          foreignFibers: record.foreignFibers || record.foreign_obs,
          ph: record.ph || record.acid_obs,
          surfaceActivity: record.surfaceActivity || record.surface_obs,
          acidityOrAlkalinity: record.acidityOrAlkalinity || record.acidRmk,
          sinkingTime: record.sinkingTime || record.abs_avg,
          absorbencyWhC: record.absorbencyWhC || record.abs_avg_2,
          sulphateAsh: record.sulphateAsh || record.sulphatedResObr,
          waterSolubleSubstances:
            record.waterSolubleSubstances || record.watersolubleResObr,
          etherSolubleSubstances:
            record.etherSolubleSubstances || record.ethersolubleResObr,
          dryingLoss: record.dryingLoss || record.dryingloss,
          fluorescence: record.fluorescence || record.fluronce,
          extractableColouringMatter:
            record.extractableColouringMatter || record.extractable,
          nepsCountPerG: record.nepsCountPerG || record.neps_count_rmk,
          uqlMm: record.uqlMm || record.uQL_w_rmk,
          lnmm: record.lnmm || record.ln_rmk,
          lwmm: record.lwmm || record.lw_rmk,
          fiberAverageLength: record.fiberAverageLength || record.fibre_obs,
          sfcN: record.sfcN || record.sFC_n_obs,
          sfcW: record.sfcW || record.sFC_w_obs,
          micronaireValue: record.micronaireValue || record.micronaire_obs,
          whitenessIndex: record.whitenessIndex || record.whiteness_obs,
          totalViableCountTvc:
            record.totalViableCountTvc || record.totalViableCount,
          totalFungalCountTfc:
            record.totalFungalCountTfc || record.totalfungalCount,
          remarks: record.remarks || record.remark,
          accepted: record.accepted || record.acceptedProduct,
          specificationPassed: record.specificationPassed,
          reportedBy: "",
          approvedBy: "",
        })),
      };

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `${API.prodUrl}/Precot/api/chemicaltest/CLF005/submit/absorbentbleachedcotton`,
        payload,
        { headers }
      );

      setTimeout(() => {
        navigate("/Precot/QC/F-05/Summary");
      }, 1500);

      message.success("Submitted Successfully");
    } catch (error) {
      message.error(error.response.data.message);
      throw new Error(
        "Failed to submit ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL  Record!!"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/Precot/QC/F-05/Summary");
  };

  useEffect(() => {
    fetchDetailsByDate();
  }, []);

  const fetchDetailsByDate = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/chemicaltest/CLF005?id=${bmr}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setemptyarraycheck(response.data.length);
      setFetchedDetails(response.data);
      if (
        ((roleauth == "QA_MANAGER" || roleauth == "QC_MANAGER") &&
          response.data?.[0]?.chemist_status !== "CHEMIST_APPROVED") ||
        ((roleauth == "QA_MANAGER" || roleauth == "QC_MANAGER") &&
          (response.data?.[0]?.qc_status == "QA_REJECTED" ||
            response.data?.[0]?.qc_status == "QC_REJECTED"))
      ) {
        message.error("Chemist Yet Not Approved");
        setTimeout(() => {
          navigate("/Precot/QC/F-05/Summary");
        }, 1500);
      }

      if (response.data && response.data.length > 0) {
        setABDetails(response.data[0].absorb);
        setpaId(response.data[0].pa_id);
      } else {
        fetchDetailsPDE();
        fetchDetailsPDEClient();
      }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };

  const fetchDetailsPDE = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/chemicaltest/ARF002/getchemicalTestbyBatch/PDE?sub_batch_id=${bmr}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        setABDetails(response.data);
      } else {
      }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };
  const fetchDetailsPDEClient = async () => {
    try {
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/chemicaltest/CLF005/PDE?bmr=${bmr}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        setABDetailsClient(response.data);
      } else {
      }
    } catch (error) {
      message.error(error.message);
    } finally {
    }
  };

  const items = [
    {
      key: "1",
      label: <p>ANALYTICAL REPORT</p>,
      children: (
        <div>
          <table
            style={{
              width: "107%",
              margin: "auto",
              tableLayout: "fixed",
              marginBottom: "40px",
            }}
          >
            <tr>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Tested Date
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Regular / Trial batch
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Batch No.
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Mixing
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Softener
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Local / Export
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Physical Appearance
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Odor
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Fiber Identification
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Foreign fibers
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                pH
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Surface Activity
              </th>
              <th
                colSpan="5"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Acidity/ Alkalinity
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Sinking time
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Absorbency ( W.H.C.)
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Sulphate Ash
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Water Soluble Substances
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Ether Soluble Substances
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Drying loss (%)
              </th>
              <th
                colSpan="5"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Fluorescence
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Extractable Colouring Matter
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Neps count/g
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                UQL mm
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                L (n) mm
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                L (w) mm. 9Fiber Average Length
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                SFC (n) %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                SFC (w) %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Micronaire Value
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Whiteness Index
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Total Viable Count (TVC - cfu/g)
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Total Fungal Count (TFC - cfu/g)
              </th>
              <th
                colSpan="3"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Remarks
              </th>
              <th
                colSpan="5"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Accepted (A)/ Rejected (R)/
                <br />
                Accepted Under Deviation (AD)
              </th>
              <th
                colSpan="4"
                rowSpan="2"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Specification Passed
              </th>
            </tr>
            <tr>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Specification
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                contains no more than
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Odorless
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                100 % cotton
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                occasionally a few isolated
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                6 to 8
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                present must not cover the
              </th>
              <th
                colSpan="5"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No pink colour developed <br />
                with Methyl orange and <br />
                Phenolphthaline.
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                max. 10 Sec.
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 23 g/g
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 0.4 %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max 0.5 %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max 0.5 %
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 8.0 %
              </th>
              <th
                colSpan="5"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Few isolated intense blue
                <br /> fibers are allowed.
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Not more intense colour.
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 2500
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 12
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 7
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 10
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 90
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                max. 80
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 2.8
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                min. 80
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Max. 1000
              </th>
              <th
                colSpan="3"
                style={{
                  textAlign: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Max. 100
              </th>
            </tr>

            {/* array....... */}
            {ABDetails?.map((detail, index) => (
              <tr key={index}>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {formattedDate(detail.specification || detail.testedDate)}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.subBatchNo || detail.batchNo}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {ABDetailsClient?.[index]?.batchno || detail.batchNo}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {ABDetailsClient?.[index]?.mixing || detail.mixing}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {ABDetailsClient?.[index]?.softner || detail.softener}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {ABDetailsClient?.[index]?.local_export ||
                    detail.localOrExport}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.physicalApp || detail.physicalAppearance}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  NA
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.fibre_obs || detail.fiberIdentification}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.foreign_obs || detail.foreignFibers}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.acid_obs || detail.ph}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.surface_obs || detail.surfaceActivity}
                </td>
                <td
                  colSpan="5"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.acidRmk || detail.acidityOrAlkalinity}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.abs_avg || detail.sinkingTime}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.abs_avg_2 || detail.absorbencyWhC}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.sulphatedResObr || detail.sulphateAsh}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.watersolubleResObr || detail.waterSolubleSubstances}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.ethersolubleResObr || detail.etherSolubleSubstances}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.dryingloss || detail.dryingLoss}
                </td>
                <td
                  colSpan="5"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.fluronce || detail.fluorescence}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.extractable || detail.extractableColouringMatter}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.neps_count_rmk || detail.nepsCountPerG}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.uQL_w_rmk || detail.uqlMm}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.ln_rmk || detail.lnmm}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.lw_rmk || detail.lwmm}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.sFC_n_obs || detail.sfcN}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.sFC_w_obs || detail.sfcW}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.micronaire_obs || detail.micronaireValue}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.whiteness_obs || detail.whitenessIndex}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.totalViableCount || detail.totalViableCountTvc}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.totalfungalCount || detail.totalFungalCountTfc}
                </td>
                <td
                  colSpan="3"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.remark || detail.remarks}
                </td>
                <td
                  colSpan="5"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  {detail.acceptedProduct || detail.accepted}
                </td>
                <td
                  colSpan="4"
                  style={{
                    transform: "rotate(180deg)",
                    writingMode: "vertical-rl",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  NA
                </td>
              </tr>
            ))}
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: <p>Reviews</p>,
      children: (
        <div>
          <table style={{ width: "80%", margin: "auto", tableLayout: "fixed" }}>
            <tr>
              <td
                colSpan="50"
                style={{ height: "35px", textAlign: "center", width: "30%" }}
              >
                Reported by(Chemist) Sign & Date
              </td>
              <td colSpan="50" style={{ textAlign: "center", width: "35%" }}>
                Approved by(QC Manager & QA Manager) Sign & Date
              </td>
            </tr>
            <tr>
              <td
                colSpan="50"
                style={{
                  height: "80px",
                  textAlign: "center",
                  marginBottom: "auto",
                  // verticalAlign: "bottom",
                }}
              >
                {fetchedDetails?.[0]?.chemist_status === "CHEMIST_APPROVED" && (
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
                        <div>{fetchedDetails?.[0]?.chemist_sign}</div>
                        <div>
                          {formattedDatewithTime(
                            fetchedDetails?.[0]?.chemist_submit_on
                          )}
                        </div>
                      </div>
                      {getImage && (
                        <img
                          src={getImage}
                          alt="chemist Sign"
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
                  // verticalAlign: "bottom",
                }}
              >
                {(fetchedDetails?.[0]?.qc_status === "QC_APPROVED" ||
                  fetchedDetails?.[0]?.qc_status === "QA_APPROVED" ||
                  fetchedDetails?.[0]?.qc_status === "QA_REJECTED" ||
                  fetchedDetails?.[0]?.qc_status === "QC_REJECTED") && (
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
                        <div>{fetchedDetails?.[0]?.qc_sign}</div>
                        <div>
                          {formattedDate(fetchedDetails?.[0]?.qc_submit_on)}
                        </div>
                      </div>
                      {getImage1 && (
                        <img
                          src={getImage1}
                          alt="QA manager Sign"
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
        formName="ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT"
        formatNo="PH-QCL01/F-005"
        sopNo="PH-QCL01-D-05"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth == "QA_MANAGER" || roleauth == "QC_MANAGER" ? (
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
          addonBefore="BMR Number:"
          placeholder="BMR No"
          value={bmr}
          style={{ width: "20%", height: "35px" }}
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

export default QC_f05;
