/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import {
  InputNumber,
  Dropdown,
  Space,
  Input,
  Form,
  DatePicker,
  Button,
  Tabs,
  message,
  Tooltip,
  Modal,
  Row,
  Col,
  Select,
} from "antd";
import BleachingHeader from "../Components/BleachingHeader.js";
import { useNavigate, useLocation } from "react-router-dom";
import { IoSave } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { GoArrowLeft } from "react-icons/go";
import { BiLock } from "react-icons/bi";
import API from "../baseUrl.json";
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import { TbMenuDeep } from "react-icons/tb";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { FaUserCircle } from "react-icons/fa";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const QualityControl_ARF_011 = () => {
  const { TextArea } = Input;
  const [tabNo, setTabNo] = useState("1");
  const [statusLoader, setStatusLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { fumigation } = location.state;
  const initialized = useRef(false);
  const { TabPane } = Tabs;
  const [rejectModal, setRejectModal] = useState(false);
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const today = new Date().toISOString().split("T")[0];
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });

  const [formData, setFormData] = useState({
    test_id: "",
    format: "FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR",
    format_no: "PH-QCL01-AR-F-011",
    ref_sop_no: "PH-QCL01-D-05 & PH-QCL01-D-11",
    revision_no: "02",
    chemist_status: "",
    chemist_saved_on: "",
    chemist_saved_by: "",
    chemist_saved_id: "",
    chemist_submit_on: "",
    chemist_submit_by: "",
    chemist_submit_id: "",
    chemist_sign: "",
    solution_prepared_by: "",
    micro_status: "",
    micro_saved_on: "",
    micro_saved_by: "",
    micro_saved_id: "",
    micro_submit_on: "",
    micro_submit_by: "",
    micro_submit_id: "",
    micro_sign: "",

    qc_status: "",
    qc_submit_on: "",
    qc_submit_by: "",
    qc_submit_id: "",
    qc_sign: "",

    reason: "",
    report_date: "",
    fumigation_date: "",
    chemical_name: "",
    qc_status_micro: "",
    dilution: "",
    fumigation_name: "",
    obser: [
      {
        id: "",
        no_mc_used: "",
        railway_time_from: "",
        railway_time_to: "",
        total: "",
        before_fumigation: "",
        after_fumigation: "",
        analytical_request_number: "",
        total_viable_before: "",
        total_viable_after: "",
        viable_reduction: "",
        total_fungal_before: "",
        total_fungal_after: "",
        fungal_reduction: "",
        remark: "",

        bl_no_mc_used: "",
        bl_railway_time_from: "",
        bl_railway_time_to: "",
        bl_total: "",
        bl_before_fumigation: "",
        bl_after_fumigation: "",
        bl_analytical_request_number: "",
        bl_total_viable_before: "",
        bl_total_viable_after: "",
        bl_viable_reduction: "",
        bl_total_fungal_before: "",
        bl_total_fungal_after: "",
        bl_fungal_reduction: "",
        bl_remark: "",

        bl_blrc_no_mc_used: "",
        bl_blrc_railway_time_from: "",
        bl_blrc_railway_time_to: "",
        bl_blrc_total: "",
        bl_blrc_before_fumigation: "",
        bl_blrc_after_fumigation: "",
        bl_blrc_analytical_request_number: "",
        bl_blrc_total_viable_before: "",
        bl_blrc_total_viable_after: "",
        bl_blrc_viable_reduction: "",
        bl_blrc_total_fungal_before: "",
        bl_blrc_total_fungal_after: "",
        bl_blrc_fungal_reduction: "",
        bl_blrc_remark: "",

        bl_wbp_no_mc_used: "",
        bl_wbp_railway_time_from: "",
        bl_wbp_railway_time_to: "",
        bl_wbp_total: "",
        bl_wbp_before_fumigation: "",
        bl_wbp_after_fumigation: "",
        bl_wbp_analytical_request_number: "",
        bl_wbp_total_viable_before: "",
        bl_wbp_total_viable_after: "",
        bl_wbp_viable_reduction: "",
        bl_wbp_total_fungal_before: "",
        bl_wbp_total_fungal_after: "",
        bl_wbp_fungal_reduction: "",
        bl_wbp_remark: "",

        bl_ba_no_mc_used: "",
        bl_ba_railway_time_from: "",
        bl_ba_railway_time_to: "",
        bl_ba_total: "",
        bl_ba_before_fumigation: "",
        bl_ba_after_fumigation: "",
        bl_ba_analytical_request_number: "",
        bl_ba_total_viable_before: "",
        bl_ba_total_viable_after: "",
        bl_ba_viable_reduction: "",
        bl_ba_total_fungal_before: "",
        bl_ba_total_fungal_after: "",
        bl_ba_fungal_reduction: "",
        bl_ba_remark: "",

        fg_no_mc_used: "",
        fg_railway_time_from: "",
        fg_railway_time_to: "",
        fg_total: "",
        fg_before_fumigation: "",
        fg_after_fumigation: "",
        fg_analytical_request_number: "",
        fg_total_viable_before: "",
        fg_total_viable_after: "",
        fg_viable_reduction: "",
        fg_total_fungal_before: "",
        fg_total_fungal_after: "",
        fg_fungal_reduction: "",
        fg_remark: "",

        vmi_no_mc_used: "",
        vmi_railway_time_from: "",
        vmi_railway_time_to: "",
        vmi_total: "",
        vmi_before_fumigation: "",
        vmi_after_fumigation: "",
        vmi_analytical_request_number: "",
        vmi_total_viable_before: "",
        vmi_total_viable_after: "",
        vmi_viable_reduction: "",
        vmi_total_fungal_before: "",
        vmi_total_fungal_after: "",
        vmi_fungal_reduction: "",
        vmi_remark: "",

        vmi_bmop_no_mc_used: "",
        vmi_bmop_railway_time_from: "",
        vmi_bmop_railway_time_to: "",
        vmi_bmop_total: "",
        vmi_bmop_before_fumigation: "",
        vmi_bmop_after_fumigation: "",
        vmi_bmop_analytical_request_number: "",
        vmi_bmop_total_viable_before: "",
        vmi_bmop_total_viable_after: "",
        vmi_bmop_viable_reduction: "",
        vmi_bmop_total_fungal_before: "",
        vmi_bmop_total_fungal_after: "",
        vmi_bmop_fungal_reduction: "",
        vmi_bmop_remark: "",

        vmi_ace2pa_no_mc_used: "",
        vmi_ace2pa_railway_time_from: "",
        vmi_ace2pa_railway_time_to: "",
        vmi_ace2pa_total: "",
        vmi_ace2pa_before_fumigation: "",
        vmi_ace2pa_after_fumigation: "",
        vmi_ace2pa_analytical_request_number: "",
        vmi_ace2pa_total_viable_before: "",
        vmi_ace2pa_total_viable_after: "",
        vmi_ace2pa_viable_reduction: "",
        vmi_ace2pa_total_fungal_before: "",
        vmi_ace2pa_total_fungal_after: "",
        vmi_ace2pa_fungal_reduction: "",
        vmi_ace2pa_remark: "",

        jet_no_mc_used: "",
        jet_railway_time_from: "",
        jet_railway_time_to: "",
        jet_total: "",
        jet_before_fumigation: "",
        jet_after_fumigation: "",
        jet_analytical_request_number: "",
        jet_total_viable_before: "",
        jet_total_viable_after: "",
        jet_viable_reduction: "",
        jet_total_fungal_before: "",
        jet_total_fungal_after: "",
        jet_fungal_reduction: "",
        jet_remark: "",

        jet_rw_no_mc_used: "",
        jet_rw_railway_time_from: "",
        jet_rw_railway_time_to: "",
        jet_rw_total: "",
        jet_rw_before_fumigation: "",
        jet_rw_after_fumigation: "",
        jet_rw_analytical_request_number: "",
        jet_rw_total_viable_before: "",
        jet_rw_total_viable_after: "",
        jet_rw_viable_reduction: "",
        jet_rw_total_fungal_before: "",
        jet_rw_total_fungal_after: "",
        jet_rw_fungal_reduction: "",
        jet_rw_remark: "",

        jet_bma_no_mc_used: "",
        jet_bma_railway_time_from: "",
        jet_bma_railway_time_to: "",
        jet_bma_total: "",
        jet_bma_before_fumigation: "",
        jet_bma_after_fumigation: "",
        jet_bma_analytical_request_number: "",
        jet_bma_total_viable_before: "",
        jet_bma_total_viable_after: "",
        jet_bma_viable_reduction: "",
        jet_bma_total_fungal_before: "",
        jet_bma_total_fungal_after: "",
        jet_bma_fungal_reduction: "",
        jet_bma_remark: "",

        spun_no_mc_used: "",
        spun_railway_time_from: "",
        spun_railway_time_to: "",
        spun_total: "",
        spun_before_fumigation: "",
        spun_after_fumigation: "",
        spun_analytical_request_number: "",
        spun_total_viable_before: "",
        spun_total_viable_after: "",
        spun_viable_reduction: "",
        spun_total_fungal_before: "",
        spun_total_fungal_after: "",
        spun_fungal_reduction: "",
        spun_remark: "",

        spl_rb_no_mc_used: "",
        spl_rb_railway_time_from: "",
        spl_rb_railway_time_to: "",
        spl_rb_total: "",
        spl_rb_before_fumigation: "",
        spl_rb_after_fumigation: "",
        spl_rb_analytical_request_number: "",
        spl_rb_total_viable_before: "",
        spl_rb_total_viable_after: "",
        spl_rb_viable_reduction: "",
        spl_rb_total_fungal_before: "",
        spl_rb_total_fungal_after: "",
        spl_rb_fungal_reduction: "",
        spl_rb_remark: "",

        lab_no_mc_used: "",
        lab_railway_time_from: "",
        lab_railway_time_to: "",
        lab_total: "",
        lab_before_fumigation: "",
        lab_after_fumigation: "",
        lab_analytical_request_number: "",
        lab_total_viable_before: "",
        lab_total_viable_after: "",
        lab_viable_reduction: "",
        lab_total_fungal_before: "",
        lab_total_fungal_after: "",
        lab_fungal_reduction: "",
        lab_remark: "",

        chan_no_mc_used: "",
        chan_railway_time_from: "",
        chan_railway_time_to: "",
        chan_total: "",
        chan_before_fumigation: "",
        chan_after_fumigation: "",
        chan_analytical_request_number: "",
        chan_total_viable_before: "",
        chan_total_viable_after: "",
        chan_viable_reduction: "",
        chan_total_fungal_before: "",
        chan_total_fungal_after: "",
        chan_fungal_reduction: "",
        chan_remark: "",

        chn_lcr_no_mc_used: "",
        chn_lcr_railway_time_from: "",
        chn_lcr_railway_time_to: "",
        chn_lcr_total: "",
        chn_lcr_before_fumigation: "",
        chn_lcr_after_fumigation: "",
        chn_lcr_analytical_request_number: "",
        chn_lcr_total_viable_before: "",
        chn_lcr_total_viable_after: "",
        chn_lcr_viable_reduction: "",
        chn_lcr_total_fungal_before: "",
        chn_lcr_total_fungal_after: "",
        chn_lcr_fungal_reduction: "",
        chn_lcr_remark: "",
        action_decided: "",
        result: "",
        isEffective: "",
      },
    ],
  });

  const [eSign, setESign] = useState({
    chemist_sign: "",
    micro_sign: "",
    qc_sign: "",
  });

  useEffect(() => {
    const signatureKeys = ["chemist_sign", "micro_sign", "qc_sign"];
    signatureKeys.forEach((key) => {
      const username = formData[key];
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
            setESign((prevSign) => ({
              ...prevSign,
              [key]: url,
            }));
          })
          .catch((err) => {
            console.log("Error in fetching image:", err);
          });
      }
    });
  }, [token, formData.chemist_sign, formData.micro_sign, formData.qc_sign]);

  useEffect(() => {
    if (role == "ROLE_MICROBIOLOGIST") {
      setTabNo("8");
    }
  }, [role]);

  useEffect(() => {
    if (!initialized.current) {
      if (role == "QA_MANAGER" || role == "QC_MANAGER") {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${    API.prodUrl}/Precot/api/chemicaltest/ARF011/?date=${fumigation}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length == 0) {
            if (role == "QA_MANAGER" || role == "QC_MANAGER") {
              message.warning("Chemist or Microbiologist Yet To Approve");
              setTimeout(() => {
                navigate("/Precot/QualityControl/ARF011/Summary");
              }, [1000]);
            }
          }
          if (response.data.length > 0) {
            const data = response.data[0];
            statusFunction(data);
            console.log(data);
            setFormData((prevState) => ({
              ...prevState,
              ...data,
              obser:
                data.obser && data.obser.length > 0
                  ? [{ ...prevState.obser[0], ...data.obser[0] }]
                  : prevState.obser,
            }));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  const statusFunction = (data) => {
    if (role == "ROLE_CHEMIST" && data.chemist_status == "CHEMIST_APPROVED") {
      setStatus((prevState) => ({
        ...prevState,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_CHEMIST" &&
      data.chemist_status == "CHEMIST_APPROVED" &&
      (data.qc_status == "WAITING_FOR_APPROVAL" ||
        data.qc_status == "QA_APPROVED" ||
        data.qc_status == "QC_APPROVED" ||
        data.qc_status == "" ||
        data.qc_status == null)
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
      data.micro_status == "MICROBIOLOGIST_APPROVED"
    ) {
      setStatus((prevState) => ({
        ...prevState,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_MICROBIOLOGIST" &&
      data.micro_status == "MICROBIOLOGIST_APPROVED" &&
      (data.qc_status == "WAITING_FOR_APPROVAL" ||
        data.qc_status == "QA_APPROVED" ||
        data.qc_status == "QC_APPROVED" ||
        data.qc_status == "" ||
        data.qc_status == null)
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
      (data.chemist_status != "CHEMIST_APPROVED" ||
        data.micro_status !== "MICROBIOLOGIST_APPROVED")
    ) {
      message.warning("Chemist or Microbiologist Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityControl/ARF011/Summary");
      }, 1000);
    }

    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (data.qc_status == "QA_APPROVED" || data.qc_status == "QC_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }

    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (data.qc_status == "QC_REJECTED" || data.qc_status == "QA_REJECTED")
    ) {
      message.warning("Chemist or Microbiologist Yet To Submit");
      setTimeout(() => {
        navigate("/Precot/QualityControl/ARF011/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const handleSave = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST") {
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${    API.prodUrl}/Precot/api/chemicaltest/ARF011/save/fumigationReport`;
      payload = {
        test_id: formData.test_id,
        format: "FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR",
        unit: "UNIT H",
        format_no: "PH-QCL01-AR-F-011",
        ref_sop_no: "PH-QCL01-D-05 & PH-QCL01-D-11",
        revision_no: "02",
        reason: formData.reason,
        report_date: formData.report_date,
        fumigation_date: fumigation,
        chemical_name: formData.chemical_name,
        qc_status_micro: formData.qc_status_micro,
        solution_prepared_by: formData.solution_prepared_by,
        dilution: formData.dilution,
        fumigation_name: formData.fumigation_name,
        obser: [
          {
            id: formData.obser[0].id,
            test_id: formData.obser[0].test_id,
            no_mc_used: formData.obser[0].no_mc_used,
            railway_time_from: formData.obser[0].railway_time_from,
            railway_time_to: formData.obser[0].railway_time_to,
            total: formData.obser[0].total,
            before_fumigation: formData.obser[0].before_fumigation,
            after_fumigation: formData.obser[0].after_fumigation,
            analytical_request_number:
              formData.obser[0].analytical_request_number,
            total_viable_before: formData.obser[0].total_viable_before,
            total_viable_after: formData.obser[0].total_viable_after,
            viable_reduction: formData.obser[0].viable_reduction,
            total_fungal_before: formData.obser[0].total_fungal_before,
            total_fungal_after: formData.obser[0].total_fungal_after,
            fungal_reduction: formData.obser[0].fungal_reduction,
            remark: formData.obser[0].remark,
            bl_no_mc_used: formData.obser[0].bl_no_mc_used,
            bl_railway_time_from: formData.obser[0].bl_railway_time_from,
            bl_railway_time_to: formData.obser[0].bl_railway_time_to,
            bl_total: formData.obser[0].bl_total,
            bl_analytical_request_number:
              formData.obser[0].bl_analytical_request_number,
            bl_total_viable_before: formData.obser[0].bl_total_viable_before,
            bl_total_viable_after: formData.obser[0].bl_total_viable_after,
            bl_viable_reduction: formData.obser[0].bl_viable_reduction,
            bl_total_fungal_before: formData.obser[0].bl_total_fungal_before,
            bl_total_fungal_after: formData.obser[0].bl_total_fungal_after,
            bl_fungal_reduction: formData.obser[0].bl_fungal_reduction,
            bl_remark: formData.obser[0].bl_remark,
            bl_blrc_no_mc_used: formData.obser[0].bl_blrc_no_mc_used,
            bl_blrc_railway_time_from:
              formData.obser[0].bl_blrc_railway_time_from,
            bl_blrc_railway_time_to: formData.obser[0].bl_blrc_railway_time_to,
            bl_blrc_total: formData.obser[0].bl_blrc_total,
            bl_blrc_analytical_request_number:
              formData.obser[0].bl_blrc_analytical_request_number,
            bl_blrc_total_viable_before:
              formData.obser[0].bl_blrc_total_viable_before,
            bl_blrc_total_viable_after:
              formData.obser[0].bl_blrc_total_viable_after,
            bl_blrc_viable_reduction:
              formData.obser[0].bl_blrc_viable_reduction,
            bl_blrc_total_fungal_before:
              formData.obser[0].bl_blrc_total_fungal_before,
            bl_blrc_total_fungal_after:
              formData.obser[0].bl_blrc_total_fungal_after,
            bl_blrc_fungal_reduction:
              formData.obser[0].bl_blrc_fungal_reduction,
            bl_blrc_remark: formData.obser[0].bl_blrc_remark,
            bl_wbp_no_mc_used: formData.obser[0].bl_wbp_no_mc_used,
            bl_wbp_railway_time_from:
              formData.obser[0].bl_wbp_railway_time_from,
            bl_wbp_railway_time_to: formData.obser[0].bl_wbp_railway_time_to,
            bl_wbp_total: formData.obser[0].bl_wbp_total,
            bl_wbp_analytical_request_number:
              formData.obser[0].bl_wbp_analytical_request_number,
            bl_wbp_total_viable_before:
              formData.obser[0].bl_wbp_total_viable_before,
            bl_wbp_total_viable_after:
              formData.obser[0].bl_wbp_total_viable_after,
            bl_wbp_viable_reduction: formData.obser[0].bl_wbp_viable_reduction,
            bl_wbp_total_fungal_before:
              formData.obser[0].bl_wbp_total_fungal_before,
            bl_wbp_total_fungal_after:
              formData.obser[0].bl_wbp_total_fungal_after,
            bl_wbp_fungal_reduction: formData.obser[0].bl_wbp_fungal_reduction,
            bl_wbp_remark: formData.obser[0].bl_wbp_remark,
            bl_ba_no_mc_used: formData.obser[0].bl_ba_no_mc_used,
            bl_ba_railway_time_from: formData.obser[0].bl_ba_railway_time_from,
            bl_ba_railway_time_to: formData.obser[0].bl_ba_railway_time_to,
            bl_ba_total: formData.obser[0].bl_ba_total,
            bl_ba_analytical_request_number:
              formData.obser[0].bl_ba_analytical_request_number,
            bl_ba_total_viable_before:
              formData.obser[0].bl_ba_total_viable_before,
            bl_ba_total_viable_after:
              formData.obser[0].bl_ba_total_viable_after,
            bl_ba_viable_reduction: formData.obser[0].bl_ba_viable_reduction,
            bl_ba_total_fungal_before:
              formData.obser[0].bl_ba_total_fungal_before,
            bl_ba_total_fungal_after:
              formData.obser[0].bl_ba_total_fungal_after,
            bl_ba_fungal_reduction: formData.obser[0].bl_ba_fungal_reduction,
            bl_ba_remark: formData.obser[0].bl_ba_remark,
            fg_no_mc_used: formData.obser[0].fg_no_mc_used,
            fg_railway_time_from: formData.obser[0].fg_railway_time_from,
            fg_railway_time_to: formData.obser[0].fg_railway_time_to,
            fg_total: formData.obser[0].fg_total,
            fg_analytical_request_number:
              formData.obser[0].fg_analytical_request_number,
            fg_total_viable_before: formData.obser[0].fg_total_viable_before,
            fg_total_viable_after: formData.obser[0].fg_total_viable_after,
            fg_viable_reduction: formData.obser[0].fg_viable_reduction,
            fg_total_fungal_before: formData.obser[0].fg_total_fungal_before,
            fg_total_fungal_after: formData.obser[0].fg_total_fungal_after,
            fg_fungal_reduction: formData.obser[0].fg_fungal_reduction,
            fg_remark: formData.obser[0].fg_remark,
            vmi_no_mc_used: formData.obser[0].vmi_no_mc_used,
            vmi_railway_time_from: formData.obser[0].vmi_railway_time_from,
            vmi_railway_time_to: formData.obser[0].vmi_railway_time_to,
            vmi_total: formData.obser[0].vmi_total,
            vmi_analytical_request_number:
              formData.obser[0].vmi_analytical_request_number,
            vmi_total_viable_before: formData.obser[0].vmi_total_viable_before,
            vmi_total_viable_after: formData.obser[0].vmi_total_viable_after,
            vmi_viable_reduction: formData.obser[0].vmi_viable_reduction,
            vmi_total_fungal_before: formData.obser[0].vmi_total_fungal_before,
            vmi_total_fungal_after: formData.obser[0].vmi_total_fungal_after,
            vmi_fungal_reduction: formData.obser[0].vmi_fungal_reduction,
            vmi_remark: formData.obser[0].vmi_remark,
            vmi_bmop_no_mc_used: formData.obser[0].vmi_bmop_no_mc_used,
            vmi_bmop_railway_time_from:
              formData.obser[0].vmi_bmop_railway_time_from,
            vmi_bmop_railway_time_to:
              formData.obser[0].vmi_bmop_railway_time_to,
            vmi_bmop_total: formData.obser[0].vmi_bmop_total,
            vmi_bmop_analytical_request_number:
              formData.obser[0].vmi_bmop_analytical_request_number,
            vmi_bmop_total_viable_before:
              formData.obser[0].vmi_bmop_total_viable_before,
            vmi_bmop_total_viable_after:
              formData.obser[0].vmi_bmop_total_viable_after,
            vmi_bmop_viable_reduction:
              formData.obser[0].vmi_bmop_viable_reduction,
            vmi_bmop_total_fungal_before:
              formData.obser[0].vmi_bmop_total_fungal_before,
            vmi_bmop_total_fungal_after:
              formData.obser[0].vmi_bmop_total_fungal_after,
            vmi_bmop_fungal_reduction:
              formData.obser[0].vmi_bmop_fungal_reduction,
            vmi_bmop_remark: formData.obser[0].vmi_bmop_remark,
            vmi_ace2pa_no_mc_used: formData.obser[0].vmi_ace2pa_no_mc_used,
            vmi_ace2pa_railway_time_from:
              formData.obser[0].vmi_ace2pa_railway_time_from,
            vmi_ace2pa_railway_time_to:
              formData.obser[0].vmi_ace2pa_railway_time_to,
            vmi_ace2pa_total: formData.obser[0].vmi_ace2pa_total,
            vmi_ace2pa_analytical_request_number:
              formData.obser[0].vmi_ace2pa_analytical_request_number,
            vmi_ace2pa_total_viable_before:
              formData.obser[0].vmi_ace2pa_total_viable_before,
            vmi_ace2pa_total_viable_after:
              formData.obser[0].vmi_ace2pa_total_viable_after,
            vmi_ace2pa_viable_reduction:
              formData.obser[0].vmi_ace2pa_viable_reduction,
            vmi_ace2pa_total_fungal_before:
              formData.obser[0].vmi_ace2pa_total_fungal_before,
            vmi_ace2pa_total_fungal_after:
              formData.obser[0].vmi_ace2pa_total_fungal_after,
            vmi_ace2pa_fungal_reduction:
              formData.obser[0].vmi_ace2pa_fungal_reduction,
            vmi_ace2pa_remark: formData.obser[0].vmi_ace2pa_remark,

            jet_no_mc_used: formData.obser[0].jet_no_mc_used,
            jet_railway_time_from: formData.obser[0].jet_railway_time_from,
            jet_railway_time_to: formData.obser[0].jet_railway_time_to,
            jet_total: formData.obser[0].jet_total,
            jet_analytical_request_number:
              formData.obser[0].jet_analytical_request_number,
            jet_total_viable_before: formData.obser[0].jet_total_viable_before,
            jet_total_viable_after: formData.obser[0].jet_total_viable_after,
            jet_viable_reduction: formData.obser[0].jet_viable_reduction,
            jet_total_fungal_before: formData.obser[0].jet_total_fungal_before,
            jet_total_fungal_after: formData.obser[0].jet_total_fungal_after,
            jet_fungal_reduction: formData.obser[0].jet_fungal_reduction,
            jet_remark: formData.obser[0].jet_remark,
            jet_rw_no_mc_used: formData.obser[0].jet_rw_no_mc_used,
            jet_rw_railway_time_from:
              formData.obser[0].jet_rw_railway_time_from,
            jet_rw_railway_time_to: formData.obser[0].jet_rw_railway_time_to,
            jet_rw_total: formData.obser[0].jet_rw_total,
            jet_rw_analytical_request_number:
              formData.obser[0].jet_rw_analytical_request_number,
            jet_rw_total_viable_before:
              formData.obser[0].jet_rw_total_viable_before,
            jet_rw_total_viable_after:
              formData.obser[0].jet_rw_total_viable_after,
            jet_rw_viable_reduction: formData.obser[0].jet_rw_viable_reduction,
            jet_rw_total_fungal_before:
              formData.obser[0].jet_rw_total_fungal_before,
            jet_rw_total_fungal_after:
              formData.obser[0].jet_rw_total_fungal_after,
            jet_rw_fungal_reduction: formData.obser[0].jet_rw_fungal_reduction,
            jet_rw_remark: formData.obser[0].jet_rw_remark,

            jet_bma_no_mc_used: formData.obser[0].jet_bma_no_mc_used,
            jet_bma_railway_time_from:
              formData.obser[0].jet_bma_railway_time_from,
            jet_bma_railway_time_to: formData.obser[0].jet_bma_railway_time_to,
            jet_bma_total: formData.obser[0].jet_bma_total,
            jet_bma_analytical_request_number:
              formData.obser[0].jet_bma_analytical_request_number,
            jet_bma_total_viable_before:
              formData.obser[0].jet_bma_total_viable_before,
            jet_bma_total_viable_after:
              formData.obser[0].jet_bma_total_viable_after,
            jet_bma_viable_reduction:
              formData.obser[0].jet_bma_viable_reduction,
            jet_bma_total_fungal_before:
              formData.obser[0].jet_bma_total_fungal_before,
            jet_bma_total_fungal_after:
              formData.obser[0].jet_bma_total_fungal_after,
            jet_bma_fungal_reduction:
              formData.obser[0].jet_bma_fungal_reduction,
            jet_bma_remark: formData.obser[0].jet_bma_remark,

            spun_no_mc_used: formData.obser[0].spun_no_mc_used,
            spun_railway_time_from: formData.obser[0].spun_railway_time_from,
            spun_railway_time_to: formData.obser[0].spun_railway_time_to,
            spun_total: formData.obser[0].spun_total,
            spun_analytical_request_number:
              formData.obser[0].spun_analytical_request_number,
            spun_total_viable_before:
              formData.obser[0].spun_total_viable_before,
            spun_total_viable_after: formData.obser[0].spun_total_viable_after,
            spun_viable_reduction: formData.obser[0].spun_viable_reduction,
            spun_total_fungal_before:
              formData.obser[0].spun_total_fungal_before,
            spun_total_fungal_after: formData.obser[0].spun_total_fungal_after,
            spun_fungal_reduction: formData.obser[0].spun_fungal_reduction,
            spun_remark: formData.obser[0].spun_remark,
            spl_rb_no_mc_used: formData.obser[0].spl_rb_no_mc_used,
            spl_rb_railway_time_from:
              formData.obser[0].spl_rb_railway_time_from,
            spl_rb_railway_time_to: formData.obser[0].spl_rb_railway_time_to,
            spl_rb_total: formData.obser[0].spl_rb_total,
            spl_rb_analytical_request_number:
              formData.obser[0].spl_rb_analytical_request_number,
            spl_rb_total_viable_before:
              formData.obser[0].spl_rb_total_viable_before,
            spl_rb_total_viable_after:
              formData.obser[0].spl_rb_total_viable_after,
            spl_rb_viable_reduction: formData.obser[0].spl_rb_viable_reduction,
            spl_rb_total_fungal_before:
              formData.obser[0].spl_rb_total_fungal_before,
            spl_rb_total_fungal_after:
              formData.obser[0].spl_rb_total_fungal_after,
            spl_rb_fungal_reduction: formData.obser[0].spl_rb_fungal_reduction,
            spl_rb_remark: formData.obser[0].spl_rb_remark,
            lab_no_mc_used: formData.obser[0].lab_no_mc_used,
            lab_railway_time_from: formData.obser[0].lab_railway_time_from,
            lab_railway_time_to: formData.obser[0].lab_railway_time_to,
            lab_total: formData.obser[0].lab_total,
            lab_analytical_request_number:
              formData.obser[0].lab_analytical_request_number,
            lab_total_viable_before: formData.obser[0].lab_total_viable_before,
            lab_total_viable_after: formData.obser[0].lab_total_viable_after,
            lab_viable_reduction: formData.obser[0].lab_viable_reduction,
            lab_total_fungal_before: formData.obser[0].lab_total_fungal_before,
            lab_total_fungal_after: formData.obser[0].lab_total_fungal_after,
            lab_fungal_reduction: formData.obser[0].lab_fungal_reduction,
            lab_remark: formData.obser[0].lab_remark,
            chan_no_mc_used: formData.obser[0].chan_no_mc_used,
            chan_railway_time_from: formData.obser[0].chan_railway_time_from,
            chan_railway_time_to: formData.obser[0].chan_railway_time_to,
            chan_total: formData.obser[0].chan_total,
            chan_analytical_request_number:
              formData.obser[0].chan_analytical_request_number,
            chan_total_viable_before:
              formData.obser[0].chan_total_viable_before,
            chan_total_viable_after: formData.obser[0].chan_total_viable_after,
            chan_viable_reduction: formData.obser[0].chan_viable_reduction,
            chan_total_fungal_before:
              formData.obser[0].chan_total_fungal_before,
            chan_total_fungal_after: formData.obser[0].chan_total_fungal_after,
            chan_fungal_reduction: formData.obser[0].chan_fungal_reduction,
            chan_remark: formData.obser[0].chan_remark,
            chn_lcr_no_mc_used: formData.obser[0].chn_lcr_no_mc_used,
            chn_lcr_railway_time_from:
              formData.obser[0].chn_lcr_railway_time_from,
            chn_lcr_railway_time_to: formData.obser[0].chn_lcr_railway_time_to,
            chn_lcr_total: formData.obser[0].chn_lcr_total,
            chn_lcr_analytical_request_number:
              formData.obser[0].chn_lcr_analytical_request_number,
            chn_lcr_total_viable_before:
              formData.obser[0].chn_lcr_total_viable_before,
            chn_lcr_total_viable_after:
              formData.obser[0].chn_lcr_total_viable_after,
            chn_lcr_viable_reduction:
              formData.obser[0].chn_lcr_viable_reduction,
            chn_lcr_total_fungal_before:
              formData.obser[0].chn_lcr_total_fungal_before,
            chn_lcr_total_fungal_after:
              formData.obser[0].chn_lcr_total_fungal_after,
            chn_lcr_fungal_reduction:
              formData.obser[0].chn_lcr_fungal_reduction,
            chn_lcr_remark: formData.obser[0].chn_lcr_remark,
            action_decided: formData.obser[0].action_decided,
            result: formData.obser[0].result,
            isEffective: formData.obser[0].isEffective,
          },
        ],
      };
    } else if (role == "QA_MANAGER" || role == "QC_MANAGER") {
      apiurl = `${    API.prodUrl}/Precot/api/chemicaltest/ARF011/approval`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.test_id,
        formatNo: "PH-QCL01-AR-F-011",
        status: "Approve",
      };
    }

    console.log("payload", payload);
    try {
      setStatusLoader(true);
      const requestMethod =
        role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST"
          ? axios.post
          : axios.put;
      const response = await axios.post(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200 || response.status == 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/ARF011/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleRange = () => {
    let isValid = true;
    if (
      formData.obser[0]?.total_viable_before > 1000 &&
      formData.obser[0]?.total_viable_before !== ""
    ) {
      message.warning("Raw Cotton Godown TVC Before. Number greater then 1000");
      handleFieldClear("total_viable_before");
      isValid = false;
    }
    if (
      formData.obser[0]?.total_viable_after > 1000 &&
      formData.obser[0]?.total_viable_after !== ""
    ) {
      validation.add("Raw Cotton Godown TVC After. Number greater then 1000");
      handleFieldClear("total_viable_after");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST") {
      if (role == "ROLE_CHEMIST") {
        const keysToValidate = [
          "chemical_name",
          "dilution",
          "solution_prepared_by",
          "report_date",
        ];

        const getName = (key) => {
          switch (key) {
            case "chemical_name":
              return " Chemical Name";
            case "dilution":
              return "Dilution";
            case "solution_prepared_by":
              return "Solution Prepared by";
            case "report_date":
              return "Report Date:";
          }
        };
        for (const key of keysToValidate) {
          if (formData[key] == "") {
            message.warning(`Please Fill ${getName(key)} Field `);
            return;
          }
        }

        const keysToValidateFormFields = [
          "no_mc_used",
          "railway_time_from",
          "railway_time_to",
          "bl_no_mc_used",
          "bl_railway_time_from",
          "bl_railway_time_to",
          "bl_blrc_no_mc_used",
          "bl_blrc_railway_time_from",
          "bl_blrc_railway_time_to",
          "bl_wbp_no_mc_used",
          "bl_wbp_railway_time_from",
          "bl_wbp_railway_time_to",
          "bl_ba_no_mc_used",
          "bl_ba_railway_time_from",
          "bl_ba_railway_time_to",
          "fg_no_mc_used",
          "fg_railway_time_from",
          "fg_railway_time_to",
          "vmi_no_mc_used",
          "vmi_railway_time_from",
          "vmi_railway_time_to",
          "vmi_bmop_no_mc_used",
          "vmi_bmop_railway_time_from",
          "vmi_bmop_railway_time_to",
          "vmi_ace2pa_no_mc_used",
          "vmi_ace2pa_railway_time_from",
          "vmi_ace2pa_railway_time_to",
          "jet_no_mc_used",
          "jet_railway_time_from",
          "jet_railway_time_to",
          "jet_rw_no_mc_used",
          "jet_rw_railway_time_from",
          "jet_rw_railway_time_to",
          "jet_bma_no_mc_used",
          "jet_bma_railway_time_from",
          "jet_bma_railway_time_to",
          "spun_no_mc_used",
          "spun_railway_time_from",
          "spun_railway_time_to",
          "spl_rb_no_mc_used",
          "spl_rb_railway_time_from",
          "spl_rb_railway_time_to",
          "lab_no_mc_used",
          "lab_railway_time_from",
          "lab_railway_time_to",
          "chan_no_mc_used",
          "chan_railway_time_from",
          "chan_railway_time_to",
          "chn_lcr_no_mc_used",
          "chn_lcr_railway_time_from",
          "chn_lcr_railway_time_to",
        ];

        const getFieldName = (key) => {
          switch (key) {
            case "no_mc_used":
              return "Raw Cotton Godown	Raw Cotton Godown	No. of M/c. used Field";
            case "railway_time_from":
              return "Raw Cotton Godown	Raw Cotton Godown	Fumigation Time From Field";
            case "railway_time_to":
              return "Raw Cotton Godown	Raw Cotton Godown	Fumigation To From Field";
            case "bl_no_mc_used":
              return "Bleaching	Blow Room carding	No. of M/c. used Field";
            case "bl_railway_time_from":
              return "Bleaching	Blow Room carding	Fumigation Time From Field";
            case "bl_railway_time_to":
              return "Bleaching	Blow Room carding	Fumigation Time To Field";
            case "bl_blrc_no_mc_used":
              return "Bleaching	Waste Bale Press No. of M/c. used Field";
            case "bl_blrc_railway_time_from":
              return "Bleaching	Waste Bale Press Fumigation Time From Field";
            case "bl_blrc_railway_time_to":
              return "Bleaching	Waste Bale Press Fumigation Time To Field";
            case "bl_wbp_no_mc_used":
              return "Bleaching	Waste Bleaching Area No. of M/c. used To Field";
            case "bl_wbp_railway_time_from":
              return "Bleaching	Waste Bleaching Area Fumigation Time From Field";
            case "bl_wbp_railway_time_to":
              return "Bleaching	Waste Bleaching Area Fumigation Time To Field";
            case "bl_ba_no_mc_used":
              return "Bleaching	AB Cotton Godown No. of M/c. used To Field";
            case "bl_ba_railway_time_from":
              return "Bleaching	AB Cotton Godown Fumigation Time From Field";
            case "bl_ba_railway_time_to":
              return "Bleaching	AB Cotton Godown Fumigation Time To Field";
            case "fg_no_mc_used":
              return "FG VMI Finished Goods Godown No. of M/c. used Field";
            case "fg_railway_time_from":
              return "FG VMI Finished Goods Godown Fumigation Time From Field";
            case "fg_railway_time_to":
              return "FG VMI Finished Goods Godown Fumigation Time TO Field";
            case "vmi_no_mc_used":
              return "FG VMI Bag making/Old Packing No. of M/c. used Field";
            case "vmi_railway_time_from":
              return "FG VMI Bag making/Old Packing Fumigation Time From Field";
            case "vmi_railway_time_to":
              return "FG VMI Bag making/Old Packing Fumigation Time To Field";
            case "vmi_bmop_no_mc_used":
              return "FG VMI ACE-2 packing Area No. of M/c. used Field";
            case "vmi_bmop_railway_time_from":
              return "FG VMI ACE-2 packing Area Fumigation Time From Field";
            case "vmi_bmop_railway_time_to":
              return "FG VMI ACE-2 packing Area Fumigation Time To Field";
            case "vmi_ace2pa_no_mc_used":
              return "FG VMI FALU 5×6 Packaging	No. of M/c. used Field";
            case "vmi_ace2pa_railway_time_from":
              return "FG VMI FALU 5×6 Packaging	Fumigation Time From Field";
            case "vmi_ace2pa_railway_time_to":
              return "FG VMI FALU 5×6 Packaging	Fumigation Time To Field";
            case "jet_no_mc_used":
              return "Jetlace Roll Storage area	No. of M/c. used Field";
            case "jet_railway_time_from":
              return "Jetlace Roll Storage area	Fumigation Time From Field";
            case "jet_railway_time_to":
              return "Jetlace Roll Storage area	Fumigation Time To Field";
            case "jet_rw_no_mc_used":
              return "Jetlace Roll Winding No. of M/c. used Field";
            case "jet_rw_railway_time_from":
              return "Jetlace Roll Winding Fumigation Time From Field";
            case "jet_rw_railway_time_to":
              return "Jetlace Roll Winding Fumigation Time To Field";
            case "jet_bma_no_mc_used":
              return "Jetlace Ball making area No. of M/c. used Field";
            case "jet_bma_railway_time_from":
              return "Jetlace Ball making area Fumigation Time From Field";
            case "jet_bma_railway_time_to":
              return "Jetlace Ball making area Fumigation Time To Field";
            case "spun_no_mc_used":
              return "Spunlace Roll & Ropple packing No. of M/c. used Field";
            case "spun_railway_time_from":
              return "Spunlace Roll & Ropple packing Fumigation Time From Field";
            case "spun_railway_time_to":
              return "Spunlace Roll & Ropple packing Fumigation Time To Field";
            case "spl_rb_no_mc_used":
              return "RP Bale No. of M/c. used Field";
            case "spl_rb_railway_time_from":
              return "RP Bale Fumigation Time From Field";
            case "spl_rb_railway_time_to":
              return "RP Bale Fumigation Time To Field";
            case "lab_no_mc_used":
              return "lab Microbiological laboratory No. of M/c. used Field";
            case "lab_railway_time_from":
              return "lab Microbiological laboratory Fumigation Time From Field";
            case "lab_railway_time_to":
              return "lab Microbiological laboratory Fumigation Time To Field";
            case "chan_no_mc_used":
              return "Changing Rooms Gents Changing Room No. of M/c. used Field";
            case "chan_railway_time_from":
              return "Changing Rooms Gents Changing Room Fumigation Time From Field";
            case "chan_railway_time_to":
              return "Changing Rooms Gents Changing Room Fumigation Time To Field";
            case "chn_lcr_no_mc_used":
              return "Changing Rooms Ladies Changing roon No. of M/c. used Field";
            case "chn_lcr_railway_time_from":
              return "Changing Rooms Ladies Changing roon Fumigation Time From Field";
            case "chn_lcr_railway_time_to":
              return "Changing Rooms Ladies Changing roon Fumigation Time To Field";
          }
        };

        for (const key of keysToValidateFormFields) {
          if (formData.obser[0][key] == "" || formData.obser[0][key] == null) {
            message.warning(`Please Fill ${getFieldName(key)}`);
            return;
          }
        }
      }

      if (role == "ROLE_MICROBIOLOGIST") {
        const keysToValidateFormFields = [
          "before_fumigation",
          "after_fumigation",
          "analytical_request_number",
          "total_viable_before",
          "total_viable_after",
          "viable_reduction",
          "total_fungal_before",
          "total_fungal_after",
          "fungal_reduction",
          "bl_analytical_request_number",
          "bl_total_viable_before",
          "bl_total_viable_after",
          "bl_viable_reduction",
          "bl_total_fungal_before",
          "bl_total_fungal_after",
          "bl_fungal_reduction",
          "bl_blrc_analytical_request_number",
          "bl_blrc_total_viable_before",
          "bl_blrc_total_viable_after",
          "bl_blrc_viable_reduction",
          "bl_blrc_total_fungal_before",
          "bl_blrc_total_fungal_after",
          "bl_blrc_fungal_reduction",
          "bl_wbp_analytical_request_number",
          "bl_wbp_total_viable_before",
          "bl_wbp_total_viable_after",
          "bl_wbp_viable_reduction",
          "bl_wbp_total_fungal_before",
          "bl_wbp_total_fungal_after",
          "bl_wbp_fungal_reduction",
          "bl_ba_analytical_request_number",
          "bl_ba_total_viable_before",
          "bl_ba_total_viable_after",
          "bl_ba_viable_reduction",
          "bl_ba_total_fungal_before",
          "bl_ba_total_fungal_after",
          "bl_ba_fungal_reduction",
          "fg_analytical_request_number",
          "fg_total_viable_before",
          "fg_total_viable_after",
          "fg_viable_reduction",
          "fg_total_fungal_before",
          "fg_total_fungal_after",
          "fg_fungal_reduction",
          "vmi_analytical_request_number",
          "vmi_total_viable_before",
          "vmi_total_viable_after",
          "vmi_viable_reduction",
          "vmi_total_fungal_before",
          "vmi_total_fungal_after",
          "vmi_fungal_reduction",
          "vmi_bmop_analytical_request_number",
          "vmi_bmop_total_viable_before",
          "vmi_bmop_total_viable_after",
          "vmi_bmop_viable_reduction",
          "vmi_bmop_total_fungal_before",
          "vmi_bmop_total_fungal_after",
          "vmi_bmop_fungal_reduction",
          "vmi_ace2pa_analytical_request_number",
          "vmi_ace2pa_total_viable_before",
          "vmi_ace2pa_total_viable_after",
          "vmi_ace2pa_viable_reduction",
          "vmi_ace2pa_total_fungal_before",
          "vmi_ace2pa_total_fungal_after",
          "vmi_ace2pa_fungal_reduction",
          "jet_analytical_request_number",
          "jet_total_viable_before",
          "jet_total_viable_after",
          "jet_viable_reduction",
          "jet_total_fungal_before",
          "jet_total_fungal_after",
          "jet_fungal_reduction",
          "jet_rw_analytical_request_number",
          "jet_rw_total_viable_before",
          "jet_rw_total_viable_after",
          "jet_rw_viable_reduction",
          "jet_rw_total_fungal_before",
          "jet_rw_total_fungal_after",
          "jet_rw_fungal_reduction",
          "jet_bma_analytical_request_number",
          "jet_bma_total_viable_before",
          "jet_bma_total_viable_after",
          "jet_bma_viable_reduction",
          "jet_bma_total_fungal_before",
          "jet_bma_total_fungal_after",
          "jet_bma_fungal_reduction",
          "spun_analytical_request_number",
          "spun_total_viable_before",
          "spun_total_viable_after",
          "spun_viable_reduction",
          "spun_total_fungal_before",
          "spun_total_fungal_after",
          "spun_fungal_reduction",
          "spl_rb_analytical_request_number",
          "spl_rb_total_viable_before",
          "spl_rb_total_viable_after",
          "spl_rb_viable_reduction",
          "spl_rb_total_fungal_before",
          "spl_rb_total_fungal_after",
          "spl_rb_fungal_reduction",
          "lab_analytical_request_number",
          "lab_total_viable_before",
          "lab_total_viable_after",
          "lab_viable_reduction",
          "lab_total_fungal_before",
          "lab_total_fungal_after",
          "lab_fungal_reduction",
          "chan_analytical_request_number",
          "chan_total_viable_before",
          "chan_total_viable_after",
          "chan_viable_reduction",
          "chan_total_fungal_before",
          "chan_total_fungal_after",
          "chan_fungal_reduction",
          "chn_lcr_analytical_request_number",
          "chn_lcr_total_viable_before",
          "chn_lcr_total_viable_after",
          "chn_lcr_viable_reduction",
          "chn_lcr_total_fungal_before",
          "chn_lcr_total_fungal_after",
          "chn_lcr_fungal_reduction",
        ];

        const getFieldName = (key) => {
          switch (key) {
            case "before_fumigation":
              return "Before Fumigation Header";
            case "after_fumigation":
              return "After Fumigation Header";
            case "analytical_request_number":
              return "Raw Cotton Godown	Raw Cotton Godown	Analytical Reference. Number Field";
            case "total_viable_before":
              return "Raw Cotton Godown	Raw Cotton Godown	TVC before Field";
            case "total_viable_after":
              return "Raw Cotton Godown	Raw Cotton Godown	TVC after Field";
            case "viable_reduction":
              return "Raw Cotton Godown	Raw Cotton Godown	% of Reduction Field";
            case "total_fungal_before":
              return "Raw Cotton Godown	Raw Cotton Godown	TFC Before Field";
            case "total_fungal_after":
              return "Raw Cotton Godown	Raw Cotton Godown	TFC After Field";
            case "fungal_reduction":
              return "Raw Cotton Godown	Raw Cotton Godown % of Reduction Field";
            case "bl_analytical_request_number":
              return "Bleaching	Blow Room carding Analytical Reference. Number Field";
            case "bl_total_viable_before":
              return "Bleaching	Blow Room carding TVC before Field Field";
            case "bl_total_viable_after":
              return "Bleaching	Blow Room carding	TVC after Field";
            case "bl_viable_reduction":
              return "Bleaching	Blow Room carding	% of Reduction Field";
            case "bl_total_fungal_before":
              return "Bleaching	Blow Room carding	TFC Before Field";
            case "bl_total_fungal_after":
              return "Bleaching	Blow Room carding	TFC After Field";
            case "bl_fungal_reduction":
              return "Bleaching	Blow Room carding % of Reduction Field";
            case "bl_blrc_analytical_request_number":
              return "Bleaching	Waste Bale Press Analytical Reference. Number Field";
            case "bl_blrc_total_viable_before":
              return "Bleaching	Waste Bale Press TVC before Field Field";
            case "bl_blrc_total_viable_after":
              return "Bleaching	Waste Bale Press TVC after Field";
            case "bl_blrc_viable_reduction":
              return "Bleaching	Waste Bale Press % of Reduction Field";
            case "bl_blrc_total_fungal_before":
              return "Bleaching	Waste Bale Press TFC Before Field";
            case "bl_blrc_total_fungal_after":
              return "Bleaching	Waste Bale Press TFC After Field";
            case "bl_blrc_fungal_reduction":
              return "Bleaching	Waste Bale Press % of Reduction Field";

            case "bl_wbp_analytical_request_number":
              return "Bleaching	Bleaching Area Analytical Reference. Number Field";
            case "bl_blrc_total_viable_before":
              return "Bleaching	Bleaching Area TVC before Field Field";
            case "bl_blrc_total_viable_after":
              return "Bleaching	Bleaching Area TVC after Field";
            case "bl_blrc_viable_reduction":
              return "Bleaching	Bleaching Area % of Reduction Field";
            case "bl_blrc_total_fungal_before":
              return "Bleaching	Bleaching Area TFC Before Field";
            case "bl_blrc_total_fungal_after":
              return "Bleaching	Bleaching Area TFC After Field";
            case "bl_blrc_fungal_reduction":
              return "Bleaching	Bleaching Area % of Reduction Field";

            case "bl_ba_analytical_request_number":
              return "Bleaching	AB Cotton Godown Analytical Reference. Number Field";
            case "bl_ba_total_viable_before":
              return "Bleaching	AB Cotton Godown TVC before Field Field";
            case "bl_ba_total_viable_after":
              return "Bleaching	AB Cotton Godown TVC after Field";
            case "bl_ba_viable_reduction":
              return "Bleaching	AB Cotton Godown % of Reduction Field";
            case "bl_ba_total_fungal_before":
              return "Bleaching	AB Cotton Godown TFC Before Field";
            case "bl_ba_total_fungal_after":
              return "Bleaching	AB Cotton Godown TFC After Field";
            case "bl_ba_fungal_reduction":
              return "Bleaching	AB Cotton Godown % of Reduction Field";

            case "fg_analytical_request_number":
              return "FG VMI Finished Goods Godown Analytical Reference. Number Field";
            case "fg_total_viable_before":
              return "FG VMI Finished Goods Godown TVC before Field Field";
            case "fg_total_viable_after":
              return "FG VMI Finished Goods Godown TVC after Field";
            case "fg_viable_reduction":
              return "FG VMI Finished Goods Godown % of Reduction Field";
            case "fg_total_fungal_before":
              return "FG VMI Finished Goods Godown TFC Before Field";
            case "fg_total_fungal_after":
              return "FG VMI Finished Goods Godown TFC After Field";
            case "fg_fungal_reduction":
              return "FG VMI Finished Goods Godown % of Reduction Field";

            case "vmi_analytical_request_number":
              return "FG VMI Bag making/Old Packing Analytical Reference. Number Field";
            case "vmi_total_viable_before":
              return "FG VMI Bag making/Old Packing TVC before Field Field";
            case "vmi_total_viable_after":
              return "FG VMI Bag making/Old Packing TVC after Field";
            case "vmi_viable_reduction":
              return "FG VMI Bag making/Old Packing % of Reduction Field";
            case "vmi_total_fungal_before":
              return "FG VMI Bag making/Old Packing TFC Before Field";
            case "vmi_total_fungal_after":
              return "FG VMI Bag making/Old Packing TFC After Field";
            case "vmi_fungal_reduction":
              return "FG VMI Bag making/Old Packing % of Reduction Field";

            case "vmi_bmop_analytical_request_number":
              return "FG VMI ACE-2 packing Area Analytical Reference. Number Field";
            case "vmi_bmop_total_viable_before":
              return "FG VMI ACE-2 packing Area TVC before Field Field";
            case "vmi_bmop_total_viable_after":
              return "FG VMI ACE-2 packing Area TVC after Field";
            case "vmi_bmop_viable_reduction":
              return "FG VMI ACE-2 packing Area % of Reduction Field";
            case "vmi_bmop_total_fungal_before":
              return "FG VMI ACE-2 packing Area TFC Before Field";
            case "vmi_bmop_total_fungal_after":
              return "FG VMI ACE-2 packing Area TFC After Field";
            case "vmi_bmop_fungal_reduction":
              return "FG VMI ACE-2 packing Area % of Reduction Field";

            case "vmi_ace2pa_analytical_request_number":
              return "FG VMI FALU 5×6 Packaging Analytical Reference. Number Field";
            case "vmi_ace2pa_total_viable_before":
              return "FG VMI FALU 5×6 Packaging TVC before Field Field";
            case "vmi_ace2pa_total_viable_after":
              return "FG VMI FALU 5×6 Packaging TVC after Field";
            case "vmi_ace2pa_viable_reduction":
              return "FG VMI FALU 5×6 Packaging % of Reduction Field";
            case "vmi_ace2pa_total_fungal_before":
              return "FG VMI FALU 5×6 Packaging TFC Before Field";
            case "vmi_ace2pa_total_fungal_after":
              return "FG VMI FALU 5×6 Packaging TFC After Field";
            case "vmi_ace2pa_fungal_reduction":
              return "FG VMI FALU 5×6 Packaging % of Reduction Field";

            case "jet_analytical_request_number":
              return "Jetlace Roll Storage area Analytical Reference. Number Field";
            case "jet_total_viable_before":
              return "Jetlace Roll Storage area TVC before Field Field";
            case "jet_total_viable_after":
              return "Jetlace Roll Storage area TVC after Field";
            case "jet_viable_reduction":
              return "Jetlace Roll Storage area % of Reduction Field";
            case "jet_total_fungal_before":
              return "Jetlace Roll Storage area TFC Before Field";
            case "jet_total_fungal_after":
              return "Jetlace Roll Storage area TFC After Field";
            case "jet_fungal_reduction":
              return "Jetlace Roll Storage area % of Reduction Field";

            case "jet_rw_analytical_request_number":
              return "Jetlace Roll Winding Analytical Reference. Number Field";
            case "jet_rw_total_viable_before":
              return "Jetlace Roll Winding TVC before Field Field";
            case "jet_rw_total_viable_after":
              return "Jetlace Roll Winding TVC after Field";
            case "jet_rw_viable_reduction":
              return "Jetlace Roll Winding % of Reduction Field";
            case "jet_rw_total_fungal_before":
              return "Jetlace Roll Winding TFC Before Field";
            case "jet_rw_total_fungal_after":
              return "Jetlace Roll Winding TFC After Field";
            case "jet_rw_fungal_reduction":
              return "Jetlace Roll Winding % of Reduction Field";

            case "jet_bma_analytical_request_number":
              return "Jetlace Ball making area Analytical Reference. Number Field";
            case "jet_bma_total_viable_before":
              return "Jetlace Ball making area TVC before Field Field";
            case "jet_bma_total_viable_after":
              return "Jetlace Ball making area TVC after Field";
            case "jet_bma_viable_reduction":
              return "Jetlace Ball making area % of Reduction Field";
            case "jet_bma_total_fungal_before":
              return "Jetlace Ball making area TFC Before Field";
            case "jet_bma_total_fungal_after":
              return "Jetlace Ball making area TFC After Field";
            case "jet_bma_fungal_reduction":
              return "Jetlace Ball making area % of Reduction Field";

            case "spun_analytical_request_number":
              return "Spunlace Roll & Ropple packing Analytical Reference. Number Field";
            case "spun_total_viable_before":
              return "Spunlace Roll & Ropple packing TVC before Field Field";
            case "spun_total_viable_after":
              return "Spunlace Roll & Ropple packing TVC after Field";
            case "spun_viable_reduction":
              return "Spunlace Roll & Ropple packing % of Reduction Field";
            case "spun_total_fungal_before":
              return "Spunlace Roll & Ropple packing TFC Before Field";
            case "spun_total_fungal_after":
              return "Spunlace Roll & Ropple packing TFC After Field";
            case "spun_fungal_reduction":
              return "Spunlace Roll & Ropple packing % of Reduction Field";

            case "spl_rb_analytical_request_number":
              return "RP Bale Analytical Reference. Number Field";
            case "spl_rb_total_viable_before":
              return "RP Bale TVC before Field Field";
            case "spl_rb_total_viable_after":
              return "RP Bale TVC after Field";
            case "spl_rb_viable_reduction":
              return "RP Bale % of Reduction Field";
            case "spl_rb_total_fungal_before":
              return "RP Bale TFC Before Field";
            case "spl_rb_total_fungal_after":
              return "RP Bale TFC After Field";
            case "spl_rb_fungal_reduction":
              return "RP Bale % of Reduction Field";

            case "lab_analytical_request_number":
              return "lab Microbiological laboratory Analytical Reference. Number Field";
            case "lab_total_viable_before":
              return "lab Microbiological laboratory TVC before Field Field";
            case "lab_total_viable_after":
              return "lab Microbiological laboratory TVC after Field";
            case "lab_viable_reduction":
              return "lab Microbiological laboratory % of Reduction Field";
            case "lab_total_fungal_before":
              return "lab Microbiological laboratory TFC Before Field";
            case "lab_total_fungal_after":
              return "lab Microbiological laboratory TFC After Field";
            case "lab_fungal_reduction":
              return "lab Microbiological laboratory % of Reduction Field";

            case "chan_analytical_request_number":
              return "Changing Rooms Gents Changing Room Analytical Reference. Number Field";
            case "chan_total_viable_before":
              return "Changing Rooms Gents Changing Room TVC before Field Field";
            case "chan_total_viable_after":
              return "Changing Rooms Gents Changing Room TVC after Field";
            case "chan_viable_reduction":
              return "Changing Rooms Gents Changing Room % of Reduction Field";
            case "chan_total_fungal_before":
              return "Changing Rooms Gents Changing Room TFC Before Field";
            case "chan_total_fungal_after":
              return "Changing Rooms Gents Changing Room TFC After Field";
            case "chan_fungal_reduction":
              return "Changing Rooms Gents Changing Room % of Reduction Field";

            case "chn_lcr_analytical_request_number":
              return "Changing Rooms Ladies Changing roon Analytical Reference. Number Field";
            case "chn_lcr_total_viable_before":
              return "Changing Rooms Ladies Changing roon TVC before Field Field";
            case "chn_lcr_total_viable_after":
              return "Changing Rooms Ladies Changing roon TVC after Field";
            case "chn_lcr_viable_reduction":
              return "Changing Rooms Ladies Changing roon % of Reduction Field";
            case "chn_lcr_total_fungal_before":
              return "Changing Rooms Ladies Changing roon TFC Before Field";
            case "chn_lcr_total_fungal_after":
              return "Changing Rooms Ladies Changing roon TFC After Field";
            case "chn_lcr_fungal_reduction":
              return "Changing Rooms Ladies Changing roon % of Reduction Field";
          }
        };

        for (const key of keysToValidateFormFields) {
          if (formData.obser[0][key] == "" || formData.obser[0][key] == null) {
            message.warning(`Please Fill ${getFieldName(key)}`);
            return;
          }
        }
      }

      // if (role == "ROLE_MICROBIOLOGIST") {
      //   if (
      //     formData.micro[0].product == "" ||
      //     formData.micro[0].product == null
      //   ) {
      //     message.warning("Please Select Product Lov");
      //     return;
      //   }
      // }

      succesMsg = "Submitted Successfully ";
      apiurl = `${    API.prodUrl}/Precot/api/chemicaltest/ARF011/Submit/fumigationReport`;
      payload = {
        test_id: formData.test_id,
        format: "FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR",
        unit: "UNIT H",
        format_no: "PH-QCL01-AR-F-011",
        ref_sop_no: "PH-QCL01-D-05 & PH-QCL01-D-11",
        revision_no: "02",
        reason: formData.reason,
        report_date: formData.report_date,
        fumigation_date: fumigation,
        chemical_name: formData.chemical_name,
        qc_status_micro: formData.qc_status_micro,
        solution_prepared_by: formData.solution_prepared_by,
        dilution: formData.dilution,
        fumigation_name: formData.fumigation_name,
        obser: [
          {
            id: formData.obser[0].id,
            test_id: formData.obser[0].test_id,
            no_mc_used: formData.obser[0].no_mc_used,
            railway_time_from: formData.obser[0].railway_time_from,
            railway_time_to: formData.obser[0].railway_time_to,
            total: formData.obser[0].total,
            before_fumigation: formData.obser[0].before_fumigation,
            after_fumigation: formData.obser[0].after_fumigation,
            analytical_request_number:
              formData.obser[0].analytical_request_number,
            total_viable_before: formData.obser[0].total_viable_before,
            total_viable_after: formData.obser[0].total_viable_after,
            viable_reduction: formData.obser[0].viable_reduction,
            total_fungal_before: formData.obser[0].total_fungal_before,
            total_fungal_after: formData.obser[0].total_fungal_after,
            fungal_reduction: formData.obser[0].fungal_reduction,
            remark:
              role == "ROLE_MICROBIOLOGIST" && formData.obser[0].remark == ""
                ? "NA"
                : formData.obser[0].remark,

            bl_no_mc_used: formData.obser[0].bl_no_mc_used,
            bl_railway_time_from: formData.obser[0].bl_railway_time_from,
            bl_railway_time_to: formData.obser[0].bl_railway_time_to,
            bl_total: formData.obser[0].bl_total,
            bl_analytical_request_number:
              formData.obser[0].bl_analytical_request_number,
            bl_total_viable_before: formData.obser[0].bl_total_viable_before,
            bl_total_viable_after: formData.obser[0].bl_total_viable_after,
            bl_viable_reduction: formData.obser[0].bl_viable_reduction,
            bl_total_fungal_before: formData.obser[0].bl_total_fungal_before,
            bl_total_fungal_after: formData.obser[0].bl_total_fungal_after,
            bl_fungal_reduction: formData.obser[0].bl_fungal_reduction,
            bl_remark:
              role == "ROLE_MICROBIOLOGIST" && formData.obser[0].bl_remark == ""
                ? "NA"
                : formData.obser[0].bl_remark,

            bl_blrc_no_mc_used: formData.obser[0].bl_blrc_no_mc_used,
            bl_blrc_railway_time_from:
              formData.obser[0].bl_blrc_railway_time_from,
            bl_blrc_railway_time_to: formData.obser[0].bl_blrc_railway_time_to,
            bl_blrc_total: formData.obser[0].bl_blrc_total,
            bl_blrc_analytical_request_number:
              formData.obser[0].bl_blrc_analytical_request_number,
            bl_blrc_total_viable_before:
              formData.obser[0].bl_blrc_total_viable_before,
            bl_blrc_total_viable_after:
              formData.obser[0].bl_blrc_total_viable_after,
            bl_blrc_viable_reduction:
              formData.obser[0].bl_blrc_viable_reduction,
            bl_blrc_total_fungal_before:
              formData.obser[0].bl_blrc_total_fungal_before,
            bl_blrc_total_fungal_after:
              formData.obser[0].bl_blrc_total_fungal_after,
            bl_blrc_fungal_reduction:
              formData.obser[0].bl_blrc_fungal_reduction,
            bl_blrc_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].bl_blrc_remark == ""
                ? "NA"
                : formData.obser[0].bl_blrc_remark,

            bl_wbp_no_mc_used: formData.obser[0].bl_wbp_no_mc_used,
            bl_wbp_railway_time_from:
              formData.obser[0].bl_wbp_railway_time_from,
            bl_wbp_railway_time_to: formData.obser[0].bl_wbp_railway_time_to,
            bl_wbp_total: formData.obser[0].bl_wbp_total,
            bl_wbp_analytical_request_number:
              formData.obser[0].bl_wbp_analytical_request_number,
            bl_wbp_total_viable_before:
              formData.obser[0].bl_wbp_total_viable_before,
            bl_wbp_total_viable_after:
              formData.obser[0].bl_wbp_total_viable_after,
            bl_wbp_viable_reduction: formData.obser[0].bl_wbp_viable_reduction,
            bl_wbp_total_fungal_before:
              formData.obser[0].bl_wbp_total_fungal_before,
            bl_wbp_total_fungal_after:
              formData.obser[0].bl_wbp_total_fungal_after,
            bl_wbp_fungal_reduction: formData.obser[0].bl_wbp_fungal_reduction,
            bl_wbp_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].bl_wbp_remark == ""
                ? "NA"
                : formData.obser[0].bl_wbp_remark,

            bl_ba_no_mc_used: formData.obser[0].bl_ba_no_mc_used,
            bl_ba_railway_time_from: formData.obser[0].bl_ba_railway_time_from,
            bl_ba_railway_time_to: formData.obser[0].bl_ba_railway_time_to,
            bl_ba_total: formData.obser[0].bl_ba_total,
            bl_ba_analytical_request_number:
              formData.obser[0].bl_ba_analytical_request_number,
            bl_ba_total_viable_before:
              formData.obser[0].bl_ba_total_viable_before,
            bl_ba_total_viable_after:
              formData.obser[0].bl_ba_total_viable_after,
            bl_ba_viable_reduction: formData.obser[0].bl_ba_viable_reduction,
            bl_ba_total_fungal_before:
              formData.obser[0].bl_ba_total_fungal_before,
            bl_ba_total_fungal_after:
              formData.obser[0].bl_ba_total_fungal_after,
            bl_ba_fungal_reduction: formData.obser[0].bl_ba_fungal_reduction,
            bl_ba_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].bl_ba_remark == ""
                ? "NA"
                : formData.obser[0].bl_ba_remark,

            fg_no_mc_used: formData.obser[0].fg_no_mc_used,
            fg_railway_time_from: formData.obser[0].fg_railway_time_from,
            fg_railway_time_to: formData.obser[0].fg_railway_time_to,
            fg_total: formData.obser[0].fg_total,
            fg_analytical_request_number:
              formData.obser[0].fg_analytical_request_number,
            fg_total_viable_before: formData.obser[0].fg_total_viable_before,
            fg_total_viable_after: formData.obser[0].fg_total_viable_after,
            fg_viable_reduction: formData.obser[0].fg_viable_reduction,
            fg_total_fungal_before: formData.obser[0].fg_total_fungal_before,
            fg_total_fungal_after: formData.obser[0].fg_total_fungal_after,
            fg_fungal_reduction: formData.obser[0].fg_fungal_reduction,
            fg_remark:
              role == "ROLE_MICROBIOLOGIST" && formData.obser[0].fg_remark == ""
                ? "NA"
                : formData.obser[0].fg_remark,

            vmi_no_mc_used: formData.obser[0].vmi_no_mc_used,
            vmi_railway_time_from: formData.obser[0].vmi_railway_time_from,
            vmi_railway_time_to: formData.obser[0].vmi_railway_time_to,
            vmi_total: formData.obser[0].vmi_total,
            vmi_analytical_request_number:
              formData.obser[0].vmi_analytical_request_number,
            vmi_total_viable_before: formData.obser[0].vmi_total_viable_before,
            vmi_total_viable_after: formData.obser[0].vmi_total_viable_after,
            vmi_viable_reduction: formData.obser[0].vmi_viable_reduction,
            vmi_total_fungal_before: formData.obser[0].vmi_total_fungal_before,
            vmi_total_fungal_after: formData.obser[0].vmi_total_fungal_after,
            vmi_fungal_reduction: formData.obser[0].vmi_fungal_reduction,
            vmi_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].vmi_remark == ""
                ? "NA"
                : formData.obser[0].vmi_remark,

            vmi_bmop_no_mc_used: formData.obser[0].vmi_bmop_no_mc_used,
            vmi_bmop_railway_time_from:
              formData.obser[0].vmi_bmop_railway_time_from,
            vmi_bmop_railway_time_to:
              formData.obser[0].vmi_bmop_railway_time_to,
            vmi_bmop_total: formData.obser[0].vmi_bmop_total,
            vmi_bmop_analytical_request_number:
              formData.obser[0].vmi_bmop_analytical_request_number,
            vmi_bmop_total_viable_before:
              formData.obser[0].vmi_bmop_total_viable_before,
            vmi_bmop_total_viable_after:
              formData.obser[0].vmi_bmop_total_viable_after,
            vmi_bmop_viable_reduction:
              formData.obser[0].vmi_bmop_viable_reduction,
            vmi_bmop_total_fungal_before:
              formData.obser[0].vmi_bmop_total_fungal_before,
            vmi_bmop_total_fungal_after:
              formData.obser[0].vmi_bmop_total_fungal_after,
            vmi_bmop_fungal_reduction:
              formData.obser[0].vmi_bmop_fungal_reduction,
            vmi_bmop_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].vmi_bmop_remark == ""
                ? "NA"
                : formData.obser[0].vmi_bmop_remark,

            vmi_ace2pa_no_mc_used: formData.obser[0].vmi_ace2pa_no_mc_used,
            vmi_ace2pa_railway_time_from:
              formData.obser[0].vmi_ace2pa_railway_time_from,
            vmi_ace2pa_railway_time_to:
              formData.obser[0].vmi_ace2pa_railway_time_to,
            vmi_ace2pa_total: formData.obser[0].vmi_ace2pa_total,
            vmi_ace2pa_analytical_request_number:
              formData.obser[0].vmi_ace2pa_analytical_request_number,
            vmi_ace2pa_total_viable_before:
              formData.obser[0].vmi_ace2pa_total_viable_before,
            vmi_ace2pa_total_viable_after:
              formData.obser[0].vmi_ace2pa_total_viable_after,
            vmi_ace2pa_viable_reduction:
              formData.obser[0].vmi_ace2pa_viable_reduction,
            vmi_ace2pa_total_fungal_before:
              formData.obser[0].vmi_ace2pa_total_fungal_before,
            vmi_ace2pa_total_fungal_after:
              formData.obser[0].vmi_ace2pa_total_fungal_after,
            vmi_ace2pa_fungal_reduction:
              formData.obser[0].vmi_ace2pa_fungal_reduction,
            vmi_ace2pa_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].vmi_ace2pa_remark == ""
                ? "NA"
                : formData.obser[0].vmi_ace2pa_remark,

            jet_no_mc_used: formData.obser[0].jet_no_mc_used,
            jet_railway_time_from: formData.obser[0].jet_railway_time_from,
            jet_railway_time_to: formData.obser[0].jet_railway_time_to,
            jet_total: formData.obser[0].jet_total,
            jet_analytical_request_number:
              formData.obser[0].jet_analytical_request_number,
            jet_total_viable_before: formData.obser[0].jet_total_viable_before,
            jet_total_viable_after: formData.obser[0].jet_total_viable_after,
            jet_viable_reduction: formData.obser[0].jet_viable_reduction,
            jet_total_fungal_before: formData.obser[0].jet_total_fungal_before,
            jet_total_fungal_after: formData.obser[0].jet_total_fungal_after,
            jet_fungal_reduction: formData.obser[0].jet_fungal_reduction,
            jet_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].jet_remark == ""
                ? "NA"
                : formData.obser[0].jet_remark,

            jet_rw_no_mc_used: formData.obser[0].jet_rw_no_mc_used,
            jet_rw_railway_time_from:
              formData.obser[0].jet_rw_railway_time_from,
            jet_rw_railway_time_to: formData.obser[0].jet_rw_railway_time_to,
            jet_rw_total: formData.obser[0].jet_rw_total,
            jet_rw_analytical_request_number:
              formData.obser[0].jet_rw_analytical_request_number,
            jet_rw_total_viable_before:
              formData.obser[0].jet_rw_total_viable_before,
            jet_rw_total_viable_after:
              formData.obser[0].jet_rw_total_viable_after,
            jet_rw_viable_reduction: formData.obser[0].jet_rw_viable_reduction,
            jet_rw_total_fungal_before:
              formData.obser[0].jet_rw_total_fungal_before,
            jet_rw_total_fungal_after:
              formData.obser[0].jet_rw_total_fungal_after,
            jet_rw_fungal_reduction: formData.obser[0].jet_rw_fungal_reduction,
            jet_rw_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].jet_rw_remark == ""
                ? "NA"
                : formData.obser[0].jet_rw_remark,

            jet_bma_no_mc_used: formData.obser[0].jet_bma_no_mc_used,
            jet_bma_railway_time_from:
              formData.obser[0].jet_bma_railway_time_from,
            jet_bma_railway_time_to: formData.obser[0].jet_bma_railway_time_to,
            jet_bma_total: formData.obser[0].jet_bma_total,
            jet_bma_analytical_request_number:
              formData.obser[0].jet_bma_analytical_request_number,
            jet_bma_total_viable_before:
              formData.obser[0].jet_bma_total_viable_before,
            jet_bma_total_viable_after:
              formData.obser[0].jet_bma_total_viable_after,
            jet_bma_viable_reduction:
              formData.obser[0].jet_bma_viable_reduction,
            jet_bma_total_fungal_before:
              formData.obser[0].jet_bma_total_fungal_before,
            jet_bma_total_fungal_after:
              formData.obser[0].jet_bma_total_fungal_after,
            jet_bma_fungal_reduction:
              formData.obser[0].jet_bma_fungal_reduction,
            jet_bma_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].jet_bma_remark == ""
                ? "NA"
                : formData.obser[0].jet_bma_remark,

            spun_no_mc_used: formData.obser[0].spun_no_mc_used,
            spun_railway_time_from: formData.obser[0].spun_railway_time_from,
            spun_railway_time_to: formData.obser[0].spun_railway_time_to,
            spun_total: formData.obser[0].spun_total,
            spun_analytical_request_number:
              formData.obser[0].spun_analytical_request_number,
            spun_total_viable_before:
              formData.obser[0].spun_total_viable_before,
            spun_total_viable_after: formData.obser[0].spun_total_viable_after,
            spun_viable_reduction: formData.obser[0].spun_viable_reduction,
            spun_total_fungal_before:
              formData.obser[0].spun_total_fungal_before,
            spun_total_fungal_after: formData.obser[0].spun_total_fungal_after,
            spun_fungal_reduction: formData.obser[0].spun_fungal_reduction,
            spun_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].spun_remark == ""
                ? "NA"
                : formData.obser[0].spun_remark,

            spl_rb_no_mc_used: formData.obser[0].spl_rb_no_mc_used,
            spl_rb_railway_time_from:
              formData.obser[0].spl_rb_railway_time_from,
            spl_rb_railway_time_to: formData.obser[0].spl_rb_railway_time_to,
            spl_rb_total: formData.obser[0].spl_rb_total,
            spl_rb_analytical_request_number:
              formData.obser[0].spl_rb_analytical_request_number,
            spl_rb_total_viable_before:
              formData.obser[0].spl_rb_total_viable_before,
            spl_rb_total_viable_after:
              formData.obser[0].spl_rb_total_viable_after,
            spl_rb_viable_reduction: formData.obser[0].spl_rb_viable_reduction,
            spl_rb_total_fungal_before:
              formData.obser[0].spl_rb_total_fungal_before,
            spl_rb_total_fungal_after:
              formData.obser[0].spl_rb_total_fungal_after,
            spl_rb_fungal_reduction: formData.obser[0].spl_rb_fungal_reduction,
            spl_rb_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].spl_rb_remark == ""
                ? "NA"
                : formData.obser[0].spl_rb_remark,

            lab_no_mc_used: formData.obser[0].lab_no_mc_used,
            lab_railway_time_from: formData.obser[0].lab_railway_time_from,
            lab_railway_time_to: formData.obser[0].lab_railway_time_to,
            lab_total: formData.obser[0].lab_total,
            lab_analytical_request_number:
              formData.obser[0].lab_analytical_request_number,
            lab_total_viable_before: formData.obser[0].lab_total_viable_before,
            lab_total_viable_after: formData.obser[0].lab_total_viable_after,
            lab_viable_reduction: formData.obser[0].lab_viable_reduction,
            lab_total_fungal_before: formData.obser[0].lab_total_fungal_before,
            lab_total_fungal_after: formData.obser[0].lab_total_fungal_after,
            lab_fungal_reduction: formData.obser[0].lab_fungal_reduction,
            lab_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].lab_remark == ""
                ? "NA"
                : formData.obser[0].lab_remark,

            chan_no_mc_used: formData.obser[0].chan_no_mc_used,
            chan_railway_time_from: formData.obser[0].chan_railway_time_from,
            chan_railway_time_to: formData.obser[0].chan_railway_time_to,
            chan_total: formData.obser[0].chan_total,
            chan_analytical_request_number:
              formData.obser[0].chan_analytical_request_number,
            chan_total_viable_before:
              formData.obser[0].chan_total_viable_before,
            chan_total_viable_after: formData.obser[0].chan_total_viable_after,
            chan_viable_reduction: formData.obser[0].chan_viable_reduction,
            chan_total_fungal_before:
              formData.obser[0].chan_total_fungal_before,
            chan_total_fungal_after: formData.obser[0].chan_total_fungal_after,
            chan_fungal_reduction: formData.obser[0].chan_fungal_reduction,
            chan_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].chan_remark == ""
                ? "NA"
                : formData.obser[0].chan_remark,

            chn_lcr_no_mc_used: formData.obser[0].chn_lcr_no_mc_used,
            chn_lcr_railway_time_from:
              formData.obser[0].chn_lcr_railway_time_from,
            chn_lcr_railway_time_to: formData.obser[0].chn_lcr_railway_time_to,
            chn_lcr_total: formData.obser[0].chn_lcr_total,
            chn_lcr_analytical_request_number:
              formData.obser[0].chn_lcr_analytical_request_number,
            chn_lcr_total_viable_before:
              formData.obser[0].chn_lcr_total_viable_before,
            chn_lcr_total_viable_after:
              formData.obser[0].chn_lcr_total_viable_after,
            chn_lcr_viable_reduction:
              formData.obser[0].chn_lcr_viable_reduction,
            chn_lcr_total_fungal_before:
              formData.obser[0].chn_lcr_total_fungal_before,
            chn_lcr_total_fungal_after:
              formData.obser[0].chn_lcr_total_fungal_after,
            chn_lcr_fungal_reduction:
              formData.obser[0].chn_lcr_fungal_reduction,
            chn_lcr_remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.obser[0].chn_lcr_remark == ""
                ? "NA"
                : formData.obser[0].chn_lcr_remark,
            action_decided:
              role == "ROLE_CHEMIST" && formData.obser[0].action_decided == ""
                ? "NA"
                : formData.obser[0].action_decided,
            result:
              role == "ROLE_CHEMIST" && formData.obser[0].result == ""
                ? "NA"
                : formData.obser[0].result,
          },
        ],
      };
    } else if (
      role == "QA_EXECUTIVE" ||
      role == "QA_MANAGER" ||
      role == "QC_MANAGER"
    ) {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter the Reason");
        setStatusLoader(false);
        return;
      }
      apiurl = `${    API.prodUrl}/Precot/api/chemicaltest/ARF011/approval`;
      succesMsg = "Rejected Successfully";
      payload = {
        id: formData.test_id,
        status: "Reject",
        formatNo: "",
        remarks: formData.reason,
      };
    }

    console.log("payload", payload);
    try {
      setStatusLoader(true);
      const requestMethod =
        role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST"
          ? axios.post
          : axios.put;
      const response = await axios.post(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200 || response.status == 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/ARF011/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleFieldClear = (name) => {
    setFormData((prevState) => ({
      ...prevState,
      obser: [
        {
          ...prevState.obser[0],
          [name]: "",
        },
      ],
    }));
  };
  const handleFieldClear2 = (name) => {
    setFormData((prevState) => ({
      ...prevState,
      micro: [
        {
          ...prevState.micro[0],
          [name]: "",
        },
      ],
    }));
  };

  // useEffect(() => {
  //   if (
  //     formData.micro[0].tested > formData.micro[0].completion_date &&
  //     formData.micro[0].tested !== "" &&
  //     formData.micro[0].completion_date !== ""
  //   ) {
  //     message.warning("Test Completion Date Should Come After Tested Start On");
  //     handleFieldClear2("completion_date");
  //   }
  //   if (
  //     formData.micro[0].tested == "" &&
  //     formData.micro[0].completion_date !== ""
  //   ) {
  //     handleFieldClear2("completion_date");
  //   }
  // }, [formData.micro[0].tested, formData.micro[0].completion_date]);

  let validation = new Set();

  const handleBlur = () => {
    if (role == "ROLE_MICROBIOLOGIST") {
      if (status.fieldStatus) {
        return;
      }

      if (
        formData.obser[0]?.total_viable_before > 1000 &&
        formData.obser[0]?.total_viable_before !== ""
      ) {
        validation.add(
          "Raw Cotton Godown TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.total_viable_after > 1000 &&
        formData.obser[0]?.total_viable_after !== ""
      ) {
        validation.add("Raw Cotton Godown TVC After. Number greater then 1000");
      }

      if (
        formData.obser[0]?.bl_total_viable_before > 1000 &&
        formData.obser[0]?.bl_total_viable_before !== ""
      ) {
        validation.add(
          "Bleaching Blow Room carding TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.bl_total_viable_after > 1000 &&
        formData.obser[0]?.bl_total_viable_after !== ""
      ) {
        validation.add(
          "Bleaching Blow Room carding TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.bl_blrc_total_viable_before > 1000 &&
        formData.obser[0]?.bl_blrc_total_viable_before !== ""
      ) {
        validation.add(
          "Bleaching Waste Bale Press TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.bl_blrc_total_viable_after > 1000 &&
        formData.obser[0]?.bl_blrc_total_viable_after !== ""
      ) {
        validation.add(
          "Bleaching Waste Bale Press TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.bl_wbp_total_viable_before > 1000 &&
        formData.obser[0]?.bl_wbp_total_viable_before !== ""
      ) {
        validation.add(
          "Bleaching Bleaching Area TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.bl_wbp_total_viable_after > 1000 &&
        formData.obser[0]?.bl_wbp_total_viable_after !== ""
      ) {
        validation.add(
          "Bleaching Bleaching Area TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.bl_ba_total_viable_before > 1000 &&
        formData.obser[0]?.bl_ba_total_viable_before !== ""
      ) {
        validation.add(
          "Bleaching AB Cotton Godown TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.bl_ba_total_viable_after > 1000 &&
        formData.obser[0]?.bl_ba_total_viable_after !== ""
      ) {
        validation.add(
          "Bleaching AB Cotton Godown TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.fg_total_viable_before > 1000 &&
        formData.obser[0]?.fg_total_viable_before !== ""
      ) {
        validation.add(
          "FG VMI Finished Goods Godown TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.fg_total_viable_after > 1000 &&
        formData.obser[0]?.fg_total_viable_after !== ""
      ) {
        validation.add(
          "FG VMI Finished Goods Godown TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.vmi_total_viable_before > 1000 &&
        formData.obser[0]?.vmi_total_viable_before !== ""
      ) {
        validation.add(
          "FG VMI Bag making/Old Packing	 TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.vmi_total_viable_after > 1000 &&
        formData.obser[0]?.vmi_total_viable_after !== ""
      ) {
        validation.add(
          "FG VMI Bag making/Old Packing	 TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.vmi_bmop_total_viable_before > 1000 &&
        formData.obser[0]?.vmi_bmop_total_viable_before !== ""
      ) {
        validation.add(
          "FG VMI ACE-2 packing Area TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.vmi_bmop_total_viable_after > 1000 &&
        formData.obser[0]?.vmi_bmop_total_viable_after !== ""
      ) {
        validation.add(
          "FG VMI ACE-2 packing Area TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.vmi_ace2pa_total_viable_before > 1000 &&
        formData.obser[0]?.vmi_ace2pa_total_viable_before !== ""
      ) {
        validation.add(
          "FG VMI FALU 5×6 Packaging TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.vmi_ace2pa_total_viable_after > 1000 &&
        formData.obser[0]?.vmi_ace2pa_total_viable_after !== ""
      ) {
        validation.add(
          "FG VMI FALU 5×6 Packaging TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.jet_total_viable_before > 1000 &&
        formData.obser[0]?.jet_total_viable_before !== ""
      ) {
        validation.add(
          "Jetlace Roll Storage area TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.jet_total_viable_after > 1000 &&
        formData.obser[0]?.jet_total_viable_after !== ""
      ) {
        validation.add(
          "Jetlace Roll Storage area TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.jet_rw_total_viable_before > 1000 &&
        formData.obser[0]?.jet_rw_total_viable_before !== ""
      ) {
        validation.add(
          "Jetlace Roll Winding TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.jet_rw_total_viable_after > 1000 &&
        formData.obser[0]?.jet_rw_total_viable_after !== ""
      ) {
        validation.add(
          "Jetlace Roll Winding TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.jet_bma_total_viable_before > 1000 &&
        formData.obser[0]?.jet_bma_total_viable_before !== ""
      ) {
        validation.add(
          "Jetlace Ball making area TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.jet_bma_total_viable_after > 1000 &&
        formData.obser[0]?.jet_bma_total_viable_after !== ""
      ) {
        validation.add(
          "Jetlace Ball making area TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.spun_total_viable_before > 1000 &&
        formData.obser[0]?.spun_total_viable_before !== ""
      ) {
        validation.add(
          "Spunlace Roll & Ropple packing TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.spun_total_viable_after > 1000 &&
        formData.obser[0]?.spun_total_viable_after !== ""
      ) {
        validation.add(
          "Spunlace Roll & Ropple packing TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.spl_rb_total_viable_before > 1000 &&
        formData.obser[0]?.spl_rb_total_viable_before !== ""
      ) {
        validation.add("RP Bale TVC Before. Number greater then 1000");
      }
      if (
        formData.obser[0]?.spl_rb_total_viable_after > 1000 &&
        formData.obser[0]?.spl_rb_total_viable_after !== ""
      ) {
        validation.add("RP Bale TVC After. Number greater then 1000");
      }

      if (
        formData.obser[0]?.lab_total_viable_before > 1000 &&
        formData.obser[0]?.lab_total_viable_before !== ""
      ) {
        validation.add(
          "lab Microbiological laboratory TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.lab_total_viable_after > 1000 &&
        formData.obser[0]?.lab_total_viable_after !== ""
      ) {
        validation.add(
          "lab Microbiological laboratory TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.chan_total_viable_before > 1000 &&
        formData.obser[0]?.chan_total_viable_before !== ""
      ) {
        validation.add(
          "Changing Rooms Gents Changing Room TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.chan_total_viable_after > 1000 &&
        formData.obser[0]?.chan_total_viable_after !== ""
      ) {
        validation.add(
          "Changing Rooms Gents Changing Room TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.chn_lcr_total_viable_before > 1000 &&
        formData.obser[0]?.chn_lcr_total_viable_before !== ""
      ) {
        validation.add(
          "Changing Rooms Ladies Changing roon TVC Before. Number greater then 1000"
        );
      }
      if (
        formData.obser[0]?.chn_lcr_total_viable_after > 1000 &&
        formData.obser[0]?.chn_lcr_total_viable_after !== ""
      ) {
        validation.add(
          "Changing Rooms Ladies Changing roon TVC After. Number greater then 1000"
        );
      }

      if (
        formData.obser[0]?.total_fungal_before > 100 &&
        formData.obser[0]?.total_fungal_before !== ""
      ) {
        validation.add("Raw Cotton Godown TFC Before. Number greater then 100");
      }
      if (
        formData.obser[0]?.total_fungal_after > 100 &&
        formData.obser[0]?.total_fungal_after !== ""
      ) {
        validation.add("Raw Cotton Godown TFC After. Number greater then 100");
      }

      if (
        formData.obser[0]?.bl_total_fungal_before > 100 &&
        formData.obser[0]?.bl_total_fungal_before !== ""
      ) {
        validation.add(
          "Bleaching Blow Room carding TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.bl_total_fungal_after > 100 &&
        formData.obser[0]?.bl_total_fungal_after !== ""
      ) {
        validation.add(
          "Bleaching Blow Room carding TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.bl_blrc_total_fungal_before > 100 &&
        formData.obser[0]?.bl_blrc_total_fungal_before !== ""
      ) {
        validation.add(
          "Bleaching Waste Bale Press TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.bl_blrc_total_fungal_after > 100 &&
        formData.obser[0]?.bl_blrc_total_fungal_after !== ""
      ) {
        validation.add(
          "Bleaching Waste Bale Press TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.bl_wbp_total_fungal_before > 100 &&
        formData.obser[0]?.bl_wbp_total_fungal_before !== ""
      ) {
        validation.add(
          "Bleaching Bleaching Area TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.bl_wbp_total_fungal_after > 100 &&
        formData.obser[0]?.bl_wbp_total_fungal_after !== ""
      ) {
        validation.add(
          "Bleaching Bleaching Area TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.bl_ba_total_fungal_before > 100 &&
        formData.obser[0]?.bl_ba_total_fungal_before !== ""
      ) {
        validation.add(
          "Bleaching AB Cotton Godown TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.bl_ba_total_fungal_after > 100 &&
        formData.obser[0]?.bl_ba_total_fungal_after !== ""
      ) {
        validation.add(
          "Bleaching AB Cotton Godown TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.fg_total_fungal_before > 100 &&
        formData.obser[0]?.fg_total_fungal_before !== ""
      ) {
        validation.add(
          "FG VMI Finished Goods Godown TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.fg_total_fungal_after > 100 &&
        formData.obser[0]?.fg_total_fungal_after !== ""
      ) {
        validation.add(
          "FG VMI Finished Goods Godown TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.vmi_total_fungal_before > 100 &&
        formData.obser[0]?.vmi_total_fungal_before !== ""
      ) {
        validation.add(
          "FG VMI Bag making/Old Packing	 TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.vmi_total_fungal_after > 100 &&
        formData.obser[0]?.vmi_total_fungal_after !== ""
      ) {
        validation.add(
          "FG VMI Bag making/Old Packing	 TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.vmi_bmop_total_fungal_before > 100 &&
        formData.obser[0]?.vmi_bmop_total_fungal_before !== ""
      ) {
        validation.add(
          "FG VMI ACE-2 packing Area TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.vmi_bmop_total_fungal_after > 100 &&
        formData.obser[0]?.vmi_bmop_total_fungal_after !== ""
      ) {
        validation.add(
          "FG VMI ACE-2 packing Area TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.vmi_ace2pa_total_fungal_before > 100 &&
        formData.obser[0]?.vmi_ace2pa_total_fungal_before !== ""
      ) {
        validation.add(
          "FG VMI FALU 5×6 Packaging TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.vmi_ace2pa_total_fungal_after > 100 &&
        formData.obser[0]?.vmi_ace2pa_total_fungal_after !== ""
      ) {
        validation.add(
          "FG VMI FALU 5×6 Packaging TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.jet_total_fungal_before > 100 &&
        formData.obser[0]?.jet_total_fungal_before !== ""
      ) {
        validation.add(
          "Jetlace Roll Storage area TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.jet_total_fungal_after > 100 &&
        formData.obser[0]?.jet_total_fungal_after !== ""
      ) {
        validation.add(
          "Jetlace Roll Storage area TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.jet_rw_total_fungal_before > 100 &&
        formData.obser[0]?.jet_rw_total_fungal_before !== ""
      ) {
        validation.add(
          "Jetlace Roll Winding TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.jet_rw_total_fungal_after > 100 &&
        formData.obser[0]?.jet_rw_total_fungal_after !== ""
      ) {
        validation.add(
          "Jetlace Roll Winding TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.jet_bma_total_fungal_before > 100 &&
        formData.obser[0]?.jet_bma_total_fungal_before !== ""
      ) {
        validation.add(
          "Jetlace Ball making area TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.jet_bma_total_fungal_after > 100 &&
        formData.obser[0]?.jet_bma_total_fungal_after !== ""
      ) {
        validation.add(
          "Jetlace Ball making area TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.spun_total_fungal_before > 100 &&
        formData.obser[0]?.spun_total_fungal_before !== ""
      ) {
        validation.add(
          "Spunlace Roll & Ropple packing TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.spun_total_fungal_after > 100 &&
        formData.obser[0]?.spun_total_fungal_after !== ""
      ) {
        validation.add(
          "Spunlace Roll & Ropple packing TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.spl_rb_total_fungal_before > 100 &&
        formData.obser[0]?.spl_rb_total_fungal_before !== ""
      ) {
        validation.add("RP Bale TFC Before. Number greater then 100");
      }
      if (
        formData.obser[0]?.spl_rb_total_fungal_after > 100 &&
        formData.obser[0]?.spl_rb_total_fungal_after !== ""
      ) {
        validation.add("RP Bale TFC After. Number greater then 100");
      }

      if (
        formData.obser[0]?.lab_total_fungal_before > 100 &&
        formData.obser[0]?.lab_total_fungal_before !== ""
      ) {
        validation.add(
          "lab Microbiological laboratory TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.lab_total_fungal_after > 100 &&
        formData.obser[0]?.lab_total_fungal_after !== ""
      ) {
        validation.add(
          "lab Microbiological laboratory TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.chan_total_fungal_before > 100 &&
        formData.obser[0]?.chan_total_fungal_before !== ""
      ) {
        validation.add(
          "Changing Rooms Gents Changing Room TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.chan_total_fungal_after > 100 &&
        formData.obser[0]?.chan_total_fungal_after !== ""
      ) {
        validation.add(
          "Changing Rooms Gents Changing Room TFC After. Number greater then 100"
        );
      }

      if (
        formData.obser[0]?.chn_lcr_total_fungal_before > 100 &&
        formData.obser[0]?.chn_lcr_total_fungal_before !== ""
      ) {
        validation.add(
          "Changing Rooms Ladies Changing roon TFC Before. Number greater then 100"
        );
      }
      if (
        formData.obser[0]?.chn_lcr_total_fungal_after > 100 &&
        formData.obser[0]?.chn_lcr_total_fungal_after !== ""
      ) {
        validation.add(
          "Changing Rooms Ladies Changing roon TFC After. Number greater then 100"
        );
      }

      if (validation.size > 0) {
        validation.forEach((msg) => {
          message.warning(msg);
        });
      }
    }
  };

  let validation2 = new Set();
  const handleBlurMicro = () => {
    if (status.fieldStatus) {
      return;
    }
    if (role == "ROLE_MICROBIOLOGIST") {
      if (
        Number(formData.micro[0].tf_viable_count) > 1000 &&
        formData.micro[0].tf_viable_count !== ""
      ) {
        validation2.add(
          "Total Viable Count should be less than or equal to 1000"
        );
      }
      if (
        Number(formData.micro[0].tf_count) > 100 &&
        formData.micro[0].tf_count !== ""
      ) {
        validation2.add(
          "Total Fungal Count should be less than or equal to 100"
        );
      }
    }

    if (validation2.size > 0) {
      validation2.forEach((msg) => {
        message.warning(msg);
      });
    }
  };

  // const handleArrayInput = (value, name) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     obser: prevState.obser.map((item, i) =>
  //       i == 0 ? { ...item, [name]: value } : item
  //     ),
  //   }));
  // };

  // const handleArrayInput = (value, name) => {
  //   setFormData((prevState) => {
  //     const updatedObser = prevState.obser.map((item, i) => {
  //       if (i === 0) {
  //         const updatedItem = { ...item, [name]: value };

  //         if (updatedItem.railway_time_from && updatedItem.railway_time_to) {
  //           updatedItem.total =  calculateTimeDifference(
  //             updatedItem.railway_time_from,
  //             updatedItem.railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.bl_railway_time_from &&
  //           updatedItem.bl_railway_time_to
  //         ) {
  //           updatedItem.bl_total = calculateTimeDifference(
  //             updatedItem.bl_railway_time_from,
  //             updatedItem.bl_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.bl_blrc_railway_time_from &&
  //           updatedItem.bl_blrc_railway_time_to
  //         ) {
  //           updatedItem.bl_blrc_total = calculateTimeDifference(
  //             updatedItem.bl_blrc_railway_time_from,
  //             updatedItem.bl_blrc_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.bl_wbp_railway_time_from &&
  //           updatedItem.bl_wbp_railway_time_to
  //         ) {
  //           updatedItem.bl_wbp_total = calculateTimeDifference(
  //             updatedItem.bl_wbp_railway_time_from,
  //             updatedItem.bl_wbp_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.bl_ba_railway_time_from &&
  //           updatedItem.bl_ba_railway_time_to
  //         ) {
  //           updatedItem.bl_ba_total = calculateTimeDifference(
  //             updatedItem.bl_ba_railway_time_from,
  //             updatedItem.bl_ba_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.fg_railway_time_from &&
  //           updatedItem.fg_railway_time_to
  //         ) {
  //           updatedItem.fg_total = calculateTimeDifference(
  //             updatedItem.fg_railway_time_from,
  //             updatedItem.fg_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.vmi_railway_time_from &&
  //           updatedItem.vmi_railway_time_to
  //         ) {
  //           updatedItem.vmi_total = calculateTimeDifference(
  //             updatedItem.vmi_railway_time_from,
  //             updatedItem.vmi_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.vmi_bmop_railway_time_from &&
  //           updatedItem.vmi_bmop_railway_time_to
  //         ) {
  //           updatedItem.vmi_bmop_total = calculateTimeDifference(
  //             updatedItem.vmi_bmop_railway_time_from,
  //             updatedItem.vmi_bmop_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.vmi_ace2pa_railway_time_from &&
  //           updatedItem.vmi_ace2pa_railway_time_to
  //         ) {
  //           updatedItem.vmi_ace2pa_total = calculateTimeDifference(
  //             updatedItem.vmi_ace2pa_railway_time_from,
  //             updatedItem.vmi_ace2pa_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.jet_railway_time_from &&
  //           updatedItem.jet_railway_time_to
  //         ) {
  //           updatedItem.jet_total = calculateTimeDifference(
  //             updatedItem.jet_railway_time_from,
  //             updatedItem.jet_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.jet_rw_railway_time_from &&
  //           updatedItem.jet_rw_railway_time_to
  //         ) {
  //           updatedItem.jet_rw_total = calculateTimeDifference(
  //             updatedItem.jet_rw_railway_time_from,
  //             updatedItem.jet_rw_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.jet_bma_railway_time_from &&
  //           updatedItem.jet_bma_railway_time_to
  //         ) {
  //           updatedItem.jet_bma_total = calculateTimeDifference(
  //             updatedItem.jet_bma_railway_time_from,
  //             updatedItem.jet_bma_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.spun_railway_time_from &&
  //           updatedItem.spun_railway_time_to
  //         ) {
  //           updatedItem.spun_total = calculateTimeDifference(
  //             updatedItem.spun_railway_time_from,
  //             updatedItem.spun_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.spl_rb_railway_time_from &&
  //           updatedItem.spl_rb_railway_time_to
  //         ) {
  //           updatedItem.spl_rb_total = calculateTimeDifference(
  //             updatedItem.spl_rb_railway_time_from,
  //             updatedItem.spl_rb_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.lab_railway_time_from &&
  //           updatedItem.lab_railway_time_to
  //         ) {
  //           updatedItem.lab_total = calculateTimeDifference(
  //             updatedItem.lab_railway_time_from,
  //             updatedItem.lab_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.chan_railway_time_from &&
  //           updatedItem.chan_railway_time_to
  //         ) {
  //           updatedItem.chan_total = calculateTimeDifference(
  //             updatedItem.chan_railway_time_from,
  //             updatedItem.chan_railway_time_to
  //           );
  //         }

  //         if (
  //           updatedItem.chn_lcr_railway_time_from &&
  //           updatedItem.chn_lcr_railway_time_to
  //         ) {
  //           updatedItem.chn_lcr_total = calculateTimeDifference(
  //             updatedItem.chn_lcr_railway_time_from,
  //             updatedItem.chn_lcr_railway_time_to
  //           );
  //         }
  //         return updatedItem;
  //       }
  //       return item;
  //     });

  //     return {
  //       ...prevState,
  //       obser: updatedObser,
  //     };
  //   });
  // };

  const handleArrayInput = (value, name) => {
    setFormData((prevState) => {
      const updatedObser = prevState.obser.map((item, index) => {
        if (index === 0) {
          // Assuming updates are for the first row
          const updatedItem = { ...item, [name]: value };

          const calculateAndSetTotal = (
            timeFrom,
            timeTo,
            mcUsed,
            totalField
          ) => {
            if (
              updatedItem[timeFrom] &&
              updatedItem[timeTo] &&
              updatedItem[mcUsed]
            ) {
              const timeDifference = calculateTimeDifference(
                updatedItem[timeFrom],
                updatedItem[timeTo]
              );
              updatedItem[totalField] =
                timeDifference * parseInt(updatedItem[mcUsed] || 0, 10);
            } else {
              updatedItem[totalField] = "";
            }
          };

          const fieldsToCalculate = [
            {
              timeFrom: "railway_time_from",
              timeTo: "railway_time_to",
              mcUsed: "no_mc_used",
              total: "total",
            },
            {
              timeFrom: "bl_railway_time_from",
              timeTo: "bl_railway_time_to",
              mcUsed: "bl_no_mc_used",
              total: "bl_total",
            },
            {
              timeFrom: "bl_blrc_railway_time_from",
              timeTo: "bl_blrc_railway_time_to",
              mcUsed: "bl_blrc_no_mc_used",
              total: "bl_blrc_total",
            },
            {
              timeFrom: "bl_wbp_railway_time_from",
              timeTo: "bl_wbp_railway_time_to",
              mcUsed: "bl_wbp_no_mc_used",
              total: "bl_wbp_total",
            },
            {
              timeFrom: "bl_ba_railway_time_from",
              timeTo: "bl_ba_railway_time_to",
              mcUsed: "bl_ba_no_mc_used",
              total: "bl_ba_total",
            },
            {
              timeFrom: "fg_railway_time_from",
              timeTo: "fg_railway_time_to",
              mcUsed: "fg_no_mc_used",
              total: "fg_total",
            },
            {
              timeFrom: "vmi_railway_time_from",
              timeTo: "vmi_railway_time_to",
              mcUsed: "vmi_no_mc_used",
              total: "vmi_total",
            },
            {
              timeFrom: "vmi_bmop_railway_time_from",
              timeTo: "vmi_bmop_railway_time_to",
              mcUsed: "vmi_bmop_no_mc_used",
              total: "vmi_bmop_total",
            },
            {
              timeFrom: "vmi_ace2pa_railway_time_from",
              timeTo: "vmi_ace2pa_railway_time_to",
              mcUsed: "vmi_ace2pa_no_mc_used",
              total: "vmi_ace2pa_total",
            },
            {
              timeFrom: "jet_railway_time_from",
              timeTo: "jet_railway_time_to",
              mcUsed: "jet_no_mc_used",
              total: "jet_total",
            },
            {
              timeFrom: "jet_rw_railway_time_from",
              timeTo: "jet_rw_railway_time_to",
              mcUsed: "jet_rw_no_mc_used",
              total: "jet_rw_total",
            },
            {
              timeFrom: "jet_bma_railway_time_from",
              timeTo: "jet_bma_railway_time_to",
              mcUsed: "jet_bma_no_mc_used",
              total: "jet_bma_total",
            },
            {
              timeFrom: "spun_railway_time_from",
              timeTo: "spun_railway_time_to",
              mcUsed: "spun_no_mc_used",
              total: "spun_total",
            },
            {
              timeFrom: "spl_rb_railway_time_from",
              timeTo: "spl_rb_railway_time_to",
              mcUsed: "spl_rb_no_mc_used",
              total: "spl_rb_total",
            },
            {
              timeFrom: "lab_railway_time_from",
              timeTo: "lab_railway_time_to",
              mcUsed: "lab_no_mc_used",
              total: "lab_total",
            },
            {
              timeFrom: "chan_railway_time_from",
              timeTo: "chan_railway_time_to",
              mcUsed: "chan_no_mc_used",
              total: "chan_total",
            },
            {
              timeFrom: "chn_lcr_railway_time_from",
              timeTo: "chn_lcr_railway_time_to",
              mcUsed: "chn_lcr_no_mc_used",
              total: "chn_lcr_total",
            },
          ];

          fieldsToCalculate.forEach((field) => {
            calculateAndSetTotal(
              field.timeFrom,
              field.timeTo,
              field.mcUsed,
              field.total
            );
          });

          return updatedItem;
        }
        return item;
      });

      return {
        ...prevState,
        obser: updatedObser,
      };
    });
  };

  const calculateTimeDifference = (from, to) => {
    const fromTime = new Date(`1970-01-01T${from}:00+05:30`);
    const toTime = new Date(`1970-01-01T${to}:00+05:30`);

    let diffMs = toTime - fromTime;

    if (diffMs < 0) {
      diffMs += 24 * 60 * 60 * 1000; // Add 24 hours for overnight differences
    }

    const diffMins = diffMs / (1000 * 60);
    return diffMins.toFixed(0); // Return minutes as integer
  };

  useEffect(() => {
    // ------------------> Calculation Part < ---------------------------------
    let sinkingAvg1 = 0;
    let sinkingAvg2 = 0;
    let sulphateResult = 0;
    let waterResult = 0;
    let EtherResult = 0;
    let lossDryResult = 0;

    sinkingAvg1 =
      ((Number(formData.obser[0]?.abs_1) || 0) +
        (Number(formData.obser[0]?.abs_2) || 0) +
        (Number(formData.obser[0]?.abs_3) || 0)) /
      3;
    handleArrayInput(sinkingAvg1.toFixed(2), "abs_avg");

    sinkingAvg2 =
      ((Number(formData.obser[0]?.abs_4) || 0) +
        (Number(formData.obser[0]?.abs_5) || 0) +
        (Number(formData.obser[0]?.abs_6) || 0)) /
      3;
    handleArrayInput(sinkingAvg2.toFixed(2), "abs_avg_2");

    handleArrayInput(
      (
        Number(formData.obser[0]?.sulphatedFlWtObr || 0) -
        Number(formData.obser[0]?.sulphatedIlWtObr || 0)
      ).toFixed(2),
      "sulphatedBaObr"
    );
    sulphateResult =
      ((Number(formData.obser[0]?.sulphatedFlWtObr || 0) -
        Number(formData.obser[0]?.sulphatedIlWtObr || 0)) *
        100) /
      5;
    handleArrayInput(sulphateResult.toFixed(2), "sulphatedResObr");

    handleArrayInput(
      (
        Number(formData.obser[0]?.WatersolubleFlWtObr || 0) -
        Number(formData.obser[0]?.WatersolubleIlWtObr || 0)
      ).toFixed(2),
      "WatersolubleNmObr"
    );
    waterResult =
      ((Number(formData.obser[0]?.WatersolubleFlWtObr || 0) -
        Number(formData.obser[0]?.WatersolubleIlWtObr || 0)) *
        100) /
      5;
    handleArrayInput(waterResult.toFixed(2), "WatersolubleResObr");

    handleArrayInput(
      (
        Number(formData.obser[0]?.EthersolubleFlWtObr || 0) -
        Number(formData.obser[0]?.EthersolubleIlWtObr || 0)
      ).toFixed(2),
      "EthersolubleYxObr"
    );
    EtherResult =
      ((Number(formData.obser[0]?.EthersolubleFlWtObr || 0) -
        Number(formData.obser[0]?.EthersolubleIlWtObr || 0)) *
        100) /
      5;
    handleArrayInput(EtherResult.toFixed(2), "EthersolubleResObr");

    handleArrayInput(
      (
        Number(formData.obser[0]?.LossondryingIlWtObr || 0) -
        Number(formData.obser[0]?.LossondryingFlWtObr || 0)
      ).toFixed(2),
      "LossondryingKlObr"
    );
    lossDryResult =
      ((Number(formData.obser[0]?.LossondryingIlWtObr || 0) -
        Number(formData.obser[0]?.LossondryingFlWtObr || 0)) *
        100) /
      (Number(formData.obser[0]?.LossondryingIlWtObr) || 1);
    handleArrayInput(lossDryResult.toFixed(2), "LossondryingResObr");
  }, [
    formData.obser[0]?.abs_1,
    formData.obser[0]?.abs_3,
    formData.obser[0]?.abs_3,
    formData.obser[0]?.abs_4,
    formData.obser[0]?.abs_5,
    formData.obser[0]?.abs_6,
    formData.obser[0]?.sulphatedFlWtObr,
    formData.obser[0]?.sulphatedIlWtObr,
    formData.obser[0]?.WatersolubleFlWtObr,
    formData.obser[0]?.WatersolubleIlWtObr,
    formData.obser[0]?.EthersolubleFlWtObr,
    formData.obser[0]?.EthersolubleIlWtObr,
    formData.obser[0]?.LossondryingFlWtObr,
    formData.obser[0]?.LossondryingIlWtObr,
  ]);

  const handleBack = () => {
    navigate("/Precot/QualityControl/ARF011/Summary");
  };
  const handleRejectReason = (e) => {
    const text = e.target.value;
    setFormData((formData) => ({
      ...formData,
      reason: text,
    }));
  };
  const handleInput = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMicroInput = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      micro: prevState.micro.map((item, i) =>
        i == 0 ? { ...item, [name]: value } : item
      ),
    }));
  };

  const handleE = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };
  const rejectFlow = () => {
    setRejectModal(true);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
    setFormData((formData) => ({
      ...formData,
      reason: "",
    }));
  };
  const onClose = () => {
    setOpen(false);
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
  };
  const internalLov = [
    { value: "Internal", label: "Internal" },
    { value: "Export", label: "Export" },
  ];
  const remarkLov = [
    { value: "Pass", label: "Pass" },
    { value: "Fail", label: "Fail" },
  ];

  const productLov = [
    { value: "Accepted", label: "Accepted" },
    { value: "Accepted Under Deviation", label: "Accepted Under Deviation" },
    { value: "Rejected", label: "Rejected" },
  ];
  const product2Lov = [
    { value: "Accepted", label: "Accepted" },
    { value: "Rejected", label: "Rejected" },
  ];
  const product3Lov = [
    { value: "Accepted", label: "Accepted" },
    { value: "Rejected", label: "Rejected" },
    { value: "NA", label: "NA" },
  ];

  const materiaLov = [
    { value: "JP", label: "JP" },
    { value: "BP", label: "BP" },
    { value: "EP", label: "EP" },
    { value: "USP", label: "USP" },
  ];
  const pathogenLov = [
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
  ];

  const handleKeyDownNA = (e) => {
    const { value } = e.target;
    if (
      !/^[0-9.]$/.test(e.key) &&
      e.key !== "N" &&
      e.key !== "A" &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    console.log("Form Data", formData);
  }, [formData]);

  const formatDateAndTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const setTabNumber = (e) => {
    console.log("Tab number", e);
    if (e == "9") {
      return;
    }
    setTabNo(e);
  };

  return (
    <>
      <BleachingHeader
        formName={"FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR"}
        formatNo={"PH-QCL01-AR-F-011"}
        unit={"UNIT H"}
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
              display: status.saveStatus ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={handleSave}
            loading={statusLoader}
          >
            {role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST"
              ? "Save"
              : "Approve"}
          </Button>,

          <Button
            type="primary"
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              display: status.submitStatus ? "none" : "flex",
              alignItems: "center",
              gap: "8px",
            }}
            shape="round"
            icon={
              role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={
              role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST"
                ? handleSubmit
                : rejectFlow
            }
            loading={statusLoader}
          >
            {role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST"
              ? " Submit"
              : "   Reject"}
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
            onClick={handleSubmit}
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
          onChange={handleRejectReason}
        ></TextArea>
      </Modal>
      {(role == "ROLE_CHEMIST" ||
        role == "QA_MANAGER" ||
        role == "QC_MANAGER") &&
        Number(tabNo) <= 4 && (
          <div style={{ margin: "5px", display: "flex" }}>
            <Row gutter={[8, 8]} align="middle">
              <Col xs={20} sm={10} md={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    type="text"
                    addonBefore="Chemical Name:"
                    value={formData.chemical_name}
                    onChange={(e) => {
                      handleInput(e.target.value, "chemical_name");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  />
                </Space>
              </Col>
              <Col xs={20} sm={10} md={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    type="text"
                    addonBefore="Dilution (if): "
                    value={formData.dilution}
                    onChange={(e) => {
                      handleInput(e.target.value, "dilution");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  />
                </Space>
              </Col>

              <Col xs={20} sm={10} md={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    type="text"
                    addonBefore="Solution Prepared by:  "
                    value={formData.solution_prepared_by}
                    onChange={(e) => {
                      handleInput(e.target.value, "solution_prepared_by");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    onKeyDown={(e) => {
                      handleSelectText(e);
                    }}
                    readOnly={status.fieldStatus}
                  />
                </Space>
              </Col>
              <Col xs={20} sm={10} md={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    type="date"
                    addonBefore="Fumigation Date: "
                    value={fumigation}
                    // max={today}
                    // onChange={(e) => {
                    //   handleInput(e.target.value, "fumigation_date");
                    // }}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly
                  />
                </Space>
              </Col>
              <Col xs={20} sm={10} md={7}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    type="date"
                    addonBefore="Report Date:"
                    value={formData.report_date}
                    onChange={(e) => {
                      handleInput(e.target.value, "report_date");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  />
                </Space>
              </Col>
            </Row>
          </div>
        )}
      {(role == "ROLE_MICROBIOLOGIST" ||
        role == "QC_MANAGER" ||
        role == "QA_MANAGER") &&
        Number(tabNo) >= 5 && (
          <div style={{ margin: "5px" }}>
            <Input
              type="date"
              addonBefore="Before Fumigation"
              value={formData.obser?.[0]?.before_fumigation}
              max={today}
              onChange={(e) => {
                handleArrayInput(e.target.value, "before_fumigation");
              }}
              style={{ width: "150px", textAlign: "center" }}
              readOnly={status.fieldStatus}
            />
            <Input
              type="date"
              value={formData.obser?.[0]?.after_fumigation}
              onChange={(e) => {
                handleArrayInput(e.target.value, "after_fumigation");
              }}
              addonBefore="After Fumigation"
              max={today}
              style={{
                width: "150px",
                textAlign: "center",
                marginLeft: "120px",
              }}
              readOnly={status.fieldStatus}
            />
          </div>
        )}
      <Tabs
        defaultActiveKey="1"
        onChange={(e) => {
          setTabNumber(e);
        }}
      >
        {(role == "ROLE_CHEMIST" ||
          role == "QA_MANAGER" ||
          role == "QC_MANAGER") && (
          <>
            <TabPane tab="Fum And Che Test I" key="1">
              <table style={{ width: "90%", marginTop: "-0.5rem" }}>
                <tr>
                  <td
                    rowSpan={2}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    S.No
                  </td>
                  <td rowSpan={2} style={{ textAlign: "center" }}>
                    Department
                  </td>
                  <td rowSpan={2} style={{ textAlign: "center" }}>
                    Area / Location
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    No. of M/c. used
                  </td>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    Fumigation Time
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>From</td>
                  <td style={{ textAlign: "center" }}>To</td>
                  <td style={{ textAlign: "center" }}>Total(Minutes)</td>
                </tr>

                <tr>
                  <td style={{ textAlign: "center" }}>1</td>
                  <td style={{ textAlign: "center" }}>Raw Cotton Godown</td>
                  <td style={{ textAlign: "center" }}>Raw Cotton Godown</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "railway_time_from");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "railway_time_to");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "total");
                      }}
                      readOnly
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>2</td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    Bleaching
                  </td>
                  <td style={{ textAlign: "center" }}>Blow Room carding</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.bl_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.bl_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_railway_time_to");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_total");
                      }}
                      readOnly
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>3</td>
                  <td style={{ textAlign: "center" }}>Waste Bale Press</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_blrc_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_blrc_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.bl_blrc_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_blrc_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.bl_blrc_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_blrc_railway_time_to"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_blrc_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_blrc_total");
                      }}
                      readOnly
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>4</td>
                  <td style={{ textAlign: "center" }}>Bleaching Area</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_wbp_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_wbp_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.bl_wbp_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_wbp_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.bl_wbp_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_wbp_railway_time_to"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_wbp_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_wbp_total");
                      }}
                      readOnly
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>5</td>
                  <td style={{ textAlign: "center" }}>AB Cotton Godown</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_ba_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_ba_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.bl_ba_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_ba_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.bl_ba_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_ba_railway_time_to"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_ba_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_ba_total");
                      }}
                      readOnly
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>6</td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    FG VMI
                  </td>
                  <td style={{ textAlign: "center" }}>Finished Goods Godown</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.fg_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "fg_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.fg_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "fg_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.fg_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "fg_railway_time_to");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.fg_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "fg_total");
                      }}
                      readOnly
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>7</td>
                  <td style={{ textAlign: "center" }}>
                    Bag making/Old Packing
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "vmi_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.vmi_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.vmi_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "vmi_railway_time_to");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "vmi_total");
                      }}
                      readOnly
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>8</td>
                  <td style={{ textAlign: "center" }}>ACE-2 packing Area</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_bmop_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "vmi_bmop_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.vmi_bmop_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_bmop_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.vmi_bmop_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_bmop_railway_time_to"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_bmop_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "vmi_bmop_total");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>9</td>
                  <td style={{ textAlign: "center" }}>FALU 5×6 Packaging</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_ace2pa_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_ace2pa_no_mc_used"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.vmi_ace2pa_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_ace2pa_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.vmi_ace2pa_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_ace2pa_railway_time_to"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_ace2pa_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "vmi_ace2pa_total");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Fum And Che Test II" key="2">
              <table style={{ width: "90%", marginTop: "-0.5rem" }}>
                <tr>
                  <td
                    rowSpan={2}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    S.No
                  </td>
                  <td rowSpan={2} style={{ textAlign: "center" }}>
                    Department
                  </td>
                  <td rowSpan={2} style={{ textAlign: "center" }}>
                    Area / Location
                  </td>
                  <td
                    rowSpan={2}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    No. of M/c. used
                  </td>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    Fumigation Time
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>From</td>
                  <td style={{ textAlign: "center" }}>To</td>
                  <td style={{ textAlign: "center" }}>Total(Minutes)</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>10</td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Jetlace
                  </td>
                  <td style={{ textAlign: "center" }}>Roll Storage area</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "jet_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.jet_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.jet_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "jet_railway_time_to");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "jet_total");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>11</td>
                  <td style={{ textAlign: "center" }}>Roll Winding</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_rw_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "jet_rw_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.jet_rw_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_rw_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.jet_rw_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_rw_railway_time_to"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_rw_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "jet_rw_total");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>12</td>
                  <td style={{ textAlign: "center" }}>Ball making area</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_bma_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "jet_bma_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.jet_bma_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_bma_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.jet_bma_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_bma_railway_time_to"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_bma_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "jet_bma_total");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>13</td>
                  <td style={{ textAlign: "center" }}>Spunlace</td>
                  <td style={{ textAlign: "center" }}>Roll & Ropple packing</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spun_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "spun_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.spun_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spun_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.spun_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spun_railway_time_to"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spun_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "spun_total");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>14</td>
                  <td style={{ textAlign: "center" }}></td>
                  <td style={{ textAlign: "center" }}>RP Bale </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spl_rb_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "spl_rb_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.spl_rb_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spl_rb_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.spl_rb_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spl_rb_railway_time_to"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spl_rb_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "spl_rb_total");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>15</td>
                  <td style={{ textAlign: "center" }}>lab</td>
                  <td style={{ textAlign: "center" }}>
                    Microbiological laboratory
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.lab_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "lab_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.lab_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "lab_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.lab_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "lab_railway_time_to");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.lab_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "lab_total");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>16</td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    Changing Rooms
                  </td>
                  <td style={{ textAlign: "center" }}>Gents Changing Room</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser[0]?.chan_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "chan_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser[0]?.chan_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chan_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser[0]?.chan_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chan_railway_time_to"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser[0]?.chan_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "chan_total");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>17</td>
                  <td style={{ textAlign: "center" }}>Ladies Changing roon</td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chn_lcr_no_mc_used}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "chn_lcr_no_mc_used");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.chn_lcr_railway_time_from}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chn_lcr_railway_time_from"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="time"
                      value={formData.obser?.[0]?.chn_lcr_railway_time_to}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chn_lcr_railway_time_to"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chn_lcr_total}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "chn_lcr_total");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Fum And Che Test III" key="3">
              <table style={{ width: "90%", padding: "10px" }}>
                <tr>
                  <td style={{ padding: "10px" }}>
                    <Input
                      type="text"
                      addonBefore="Result / Overall Conclusion :"
                      value={formData.obser?.[0]?.result}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "result");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                  <td style={{ padding: "10px" }} rowSpan={2}>
                    <Input
                      type="text"
                      addonBefore="Remarks / Action decided (in case of any abnormality) :"
                      value={formData.obser?.[0]?.action_decided}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "action_decided");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>
                    Fumigation done is found to be{" "}
                    <Select
                      onChange={(value) => {
                        handleInput(value, "fumigation_name");
                      }}
                      value={formData.fumigation_name}
                      style={{ width: "180px", textAlign: "center" }}
                    >
                      <Select.Option value="Effective">Effective</Select.Option>
                      <Select.Option value="Not Effective">
                        Not Effective
                      </Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ padding: "10px" }}>
                    Note : Before starting fumigation, please ensure that no
                    products or materials are kept in open condition. Use PPEs
                    while doing fumigation and vacate the area once the fogger
                    machine is started. cfu/plate- Colony forming unit per
                    plate,{" "}
                  </td>
                </tr>
              </table>
            </TabPane>
            {role == "ROLE_CHEMIST" && (
              <TabPane tab="Reviews" key="4">
                <div style={{ height: "40vh" }}>
                  <table style={{ height: "60%", tableLayout: "fixed" }}>
                    <tr>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "30%" }}
                      >
                        Fumigation done by:
                      </td>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "35%" }}
                      >
                        Approved by:
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              {formData.chemist_sign}
                              <br />
                              {formatDateAndTime(formData.chemist_submit_on)}
                            </div>
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            {eSign.chemist_sign ? (
                              <img
                                src={eSign.chemist_sign}
                                alt="Operator eSign"
                                style={{
                                  width: "150px",
                                  height: "70px",
                                  objectFit: "contain",
                                  mixBlendMode: "multiply",
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </td>

                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        {formData.qc_status !== "WAITING_FOR_APPROVAL" &&
                          formData.qc_status !== "" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ textAlign: "center" }}>
                                  {formData.qc_sign}
                                  <br />
                                  {formatDateAndTime(formData.qc_submit_on)}
                                </div>
                              </div>
                              <div style={{ marginLeft: "20px" }}>
                                {eSign.qc_sign ? (
                                  <img
                                    src={eSign.qc_sign}
                                    alt="HOD eSign"
                                    style={{
                                      width: "150px",
                                      height: "70px",
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
                </div>
              </TabPane>
            )}
          </>
        )}
        {(role == "ROLE_MICROBIOLOGIST" ||
          role == "QA_MANAGER" ||
          role == "QC_MANAGER") && (
          <>
            <TabPane
              style={{ marginTop: "-0.3rem" }}
              tab="Micro Test I"
              key="5"
            >
              <table style={{ tableLayout: "fixed", marginTop: "-1rem" }}>
                <tr>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    S.No
                  </td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Department
                  </td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Area / Location
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan={7}
                  >
                    Microbiological Count / Analysis
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={3}>
                    Remark
                  </td>
                </tr>
                <tr>
                  <td
                    rowSpan={2}
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    Analytical Reference. Number{" "}
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan={2}
                  >
                    Total Viable Count (TVC) (≤1000 cfu/plate)
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    rowSpan={2}
                  >
                    % of Reduction
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan={2}
                  >
                    Total Fungal Count (TFC) ( ≤ 100 cfu/plate)
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    rowSpan={2}
                  >
                    % of Reduction
                  </td>
                </tr>

                <tr>
                  <td style={{ textAlign: "center" }}>Before</td>
                  <td style={{ textAlign: "center" }}>After</td>
                  <td style={{ textAlign: "center" }}>Before</td>
                  <td style={{ textAlign: "center" }}>After</td>
                </tr>

                <tr>
                  <td style={{ textAlign: "center" }}>1</td>
                  <td style={{ textAlign: "center" }}>Raw Cotton Godown</td>
                  <td style={{ textAlign: "center" }}>Raw Cotton Godown</td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={formData.obser?.[0]?.analytical_request_number}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "total_viable_before");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "total_viable_after");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "viable_reduction");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "total_fungal_before");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "total_fungal_after");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "fungal_reduction");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>2</td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    Bleaching
                  </td>
                  <td style={{ textAlign: "center" }}>Blow Room carding</td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={formData.obser?.[0]?.bl_analytical_request_number}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_viable_reduction");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_fungal_reduction");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.bl_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>3</td>
                  <td style={{ textAlign: "center" }}>Waste Bale Press</td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={
                        formData.obser?.[0]?.bl_blrc_analytical_request_number
                      }
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_blrc_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_blrc_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_blrc_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_blrc_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_blrc_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_blrc_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_blrc_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_blrc_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_blrc_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_blrc_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_blrc_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_blrc_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_blrc_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.bl_blrc_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_blrc_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>4</td>
                  <td style={{ textAlign: "center" }}>Bleaching Area</td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={
                        formData.obser?.[0]?.bl_wbp_analytical_request_number
                      }
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_wbp_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_wbp_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_wbp_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_wbp_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_wbp_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_wbp_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_wbp_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_wbp_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_wbp_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_wbp_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_wbp_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_wbp_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_wbp_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.bl_wbp_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_wbp_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>5</td>
                  <td style={{ textAlign: "center" }}>AB Cotton Godown</td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={
                        formData.obser?.[0]?.bl_ba_analytical_request_number
                      }
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_ba_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_ba_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_ba_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_ba_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_ba_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_ba_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_ba_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_ba_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_ba_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_ba_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_ba_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.bl_ba_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "bl_ba_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.bl_ba_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "bl_ba_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>6</td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    FG VMI
                  </td>
                  <td style={{ textAlign: "center" }}>Finished Goods Godown</td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.fg_analytical_request_number}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "fg_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.fg_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "fg_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.fg_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "fg_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.fg_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "fg_viable_reduction");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.fg_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "fg_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.fg_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "fg_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.fg_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "fg_fungal_reduction");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.fg_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "fg_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>7</td>
                  <td style={{ textAlign: "center" }}>
                    Bag making/Old Packing
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.vmi_analytical_request_number}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.vmi_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "vmi_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>8</td>
                  <td style={{ textAlign: "center" }}>ACE-2 packing Area</td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={
                        formData.obser?.[0]?.vmi_bmop_analytical_request_number
                      }
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_bmop_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_bmop_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_bmop_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_bmop_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_bmop_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_bmop_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_bmop_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_bmop_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_bmop_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_bmop_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_bmop_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_bmop_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_bmop_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.vmi_bmop_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "vmi_bmop_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>9</td>
                  <td style={{ textAlign: "center" }}>FALU 5×6 Packaging</td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={
                        formData.obser?.[0]
                          ?.vmi_ace2pa_analytical_request_number
                      }
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_ace2pa_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={
                        formData.obser?.[0]?.vmi_ace2pa_total_viable_before
                      }
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_ace2pa_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_ace2pa_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_ace2pa_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_ace2pa_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_ace2pa_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={
                        formData.obser?.[0]?.vmi_ace2pa_total_fungal_before
                      }
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_ace2pa_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_ace2pa_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_ace2pa_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.vmi_ace2pa_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "vmi_ace2pa_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.vmi_ace2pa_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "vmi_ace2pa_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane
              style={{ marginTop: "-0.3rem" }}
              tab="Micro Test II"
              key="6"
            >
              <table style={{ tableLayout: "fixed", marginTop: "-1rem" }}>
                <tr>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    S.No
                  </td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Department
                  </td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Area / Location
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan={7}
                  >
                    Microbiological Count / Analysis
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={3}>
                    Remark
                  </td>
                </tr>
                <tr>
                  <td
                    rowSpan={2}
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    Analytical Reference. Number{" "}
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan={2}
                  >
                    Total Viable Count (TVC) (≤1000 cfu/plate)
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    rowSpan={2}
                  >
                    % of Reduction
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan={2}
                  >
                    Total Fungal Count (TFC) ( ≤ 100 cfu/plate)
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    rowSpan={2}
                  >
                    % of Reduction
                  </td>
                </tr>

                <tr>
                  <td style={{ textAlign: "center" }}>Before</td>
                  <td style={{ textAlign: "center" }}>After</td>
                  <td style={{ textAlign: "center" }}>Before</td>
                  <td style={{ textAlign: "center" }}>After</td>
                </tr>

                <tr>
                  <td style={{ textAlign: "center" }}>10</td>
                  <td rowSpan={3} style={{ textAlign: "center" }}>
                    Jetlace
                  </td>
                  <td style={{ textAlign: "center" }}>Roll Storage area</td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={formData.obser?.[0]?.jet_analytical_request_number}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.jet_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "jet_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>11</td>
                  <td style={{ textAlign: "center" }}>Roll Winding</td>
                  <td>
                    <Input
                      type="text"
                      min={0}
                      style={{ textAlign: "center", width: "100%" }}
                      value={
                        formData.obser?.[0]?.jet_rw_analytical_request_number
                      }
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_rw_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_rw_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_rw_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_rw_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_rw_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_rw_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_rw_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_rw_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_rw_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_rw_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_rw_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_rw_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_rw_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.jet_rw_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "jet_rw_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>12</td>
                  <td style={{ textAlign: "center" }}>Ball making area</td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={
                        formData.obser?.[0]?.jet_bma_analytical_request_number
                      }
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_bma_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_bma_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_bma_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_bma_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_bma_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_bma_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_bma_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_bma_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_bma_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_bma_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_bma_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.jet_bma_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "jet_bma_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.jet_bma_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "jet_bma_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>13</td>
                  <td style={{ textAlign: "center" }}>Spunlace</td>
                  <td style={{ textAlign: "center" }}>Roll & Ropple packing</td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={
                        formData.obser?.[0]?.spun_analytical_request_number
                      }
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spun_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spun_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spun_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spun_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spun_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spun_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spun_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spun_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spun_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spun_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spun_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spun_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spun_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.spun_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "spun_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>14</td>
                  <td style={{ textAlign: "center" }}></td>
                  <td style={{ textAlign: "center" }}>RP Bale </td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={
                        formData.obser?.[0]?.spl_rb_analytical_request_number
                      }
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spl_rb_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spl_rb_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spl_rb_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spl_rb_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spl_rb_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spl_rb_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spl_rb_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spl_rb_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spl_rb_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spl_rb_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spl_rb_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.spl_rb_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "spl_rb_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.spl_rb_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "spl_rb_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>15</td>
                  <td style={{ textAlign: "center" }}>lab</td>
                  <td style={{ textAlign: "center" }}>
                    Microbiological laboratory
                  </td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={formData.obser?.[0]?.lab_analytical_request_number}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "lab_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.lab_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "lab_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.lab_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "lab_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.lab_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "lab_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.lab_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "lab_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.lab_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "lab_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.lab_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "lab_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.lab_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "lab_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>16</td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    Changing Rooms
                  </td>
                  <td style={{ textAlign: "center" }}>Gents Changing Room</td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={
                        formData.obser?.[0]?.chan_analytical_request_number
                      }
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chan_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chan_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chan_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chan_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chan_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chan_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chan_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chan_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chan_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chan_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chan_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chan_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chan_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.chan_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "chan_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>17</td>
                  <td style={{ textAlign: "center" }}>Ladies Changing roon</td>
                  <td>
                    <Input
                      type="text"
                      style={{ textAlign: "center", width: "100%" }}
                      value={
                        formData.obser?.[0]?.chn_lcr_analytical_request_number
                      }
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chn_lcr_analytical_request_number"
                        );
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chn_lcr_total_viable_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chn_lcr_total_viable_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chn_lcr_total_viable_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chn_lcr_total_viable_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chn_lcr_viable_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chn_lcr_viable_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chn_lcr_total_fungal_before}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chn_lcr_total_fungal_before"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chn_lcr_total_fungal_after}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chn_lcr_total_fungal_after"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={0}
                      value={formData.obser?.[0]?.chn_lcr_fungal_reduction}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "chn_lcr_fungal_reduction"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser?.[0]?.chn_lcr_remark}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "chn_lcr_remark");
                      }}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </td>
                </tr>
              </table>
            </TabPane>
            {role == "ROLE_MICROBIOLOGIST" && (
              <TabPane tab="Reviews" key="7">
                <div style={{ height: "40vh" }}>
                  <table style={{ height: "60%", tableLayout: "fixed" }}>
                    <tr>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "30%" }}
                      >
                        Tested by (Microbiologist):
                      </td>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "35%" }}
                      >
                        Approved by:
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              {formData.micro_sign}
                              <br />
                              {formatDateAndTime(formData.micro_submit_on)}
                            </div>
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            {eSign.micro_sign ? (
                              <img
                                src={eSign.micro_sign}
                                alt="Operator eSign"
                                style={{
                                  width: "150px",
                                  height: "70px",
                                  objectFit: "contain",
                                  mixBlendMode: "multiply",
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </td>

                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        {formData.qc_status !== "WAITING_FOR_APPROVAL" &&
                          formData.qc_status !== "" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ textAlign: "center" }}>
                                  {formData.qc_sign}
                                  <br />
                                  {formatDateAndTime(formData.qc_submit_on)}
                                </div>
                              </div>
                              <div style={{ marginLeft: "20px" }}>
                                {eSign.qc_sign ? (
                                  <img
                                    src={eSign.qc_sign}
                                    alt="HOD eSign"
                                    style={{
                                      width: "150px",
                                      height: "70px",
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
                </div>
              </TabPane>
            )}
            {(role == "QA_MANAGER" || role == "QC_MANAGER") && (
              <TabPane tab="Reviews" key="8">
                <div style={{ height: "40vh" }}>
                  <table style={{ height: "60%", tableLayout: "fixed" }}>
                    <tr>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "30%" }}
                      >
                        Fumigation done by:
                      </td>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "30%" }}
                      >
                        Tested by (Microbiologist):
                      </td>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "35%" }}
                      >
                        Approved by:
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              {formData.chemist_sign}
                              <br />
                              {formatDateAndTime(formData.chemist_submit_on)}
                            </div>
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            {eSign.chemist_sign ? (
                              <img
                                src={eSign.chemist_sign}
                                alt="Operator eSign"
                                style={{
                                  width: "150px",
                                  height: "70px",
                                  objectFit: "contain",
                                  mixBlendMode: "multiply",
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              {formData.micro_sign}
                              <br />
                              {formatDateAndTime(formData.micro_submit_on)}
                            </div>
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            {eSign.micro_sign ? (
                              <img
                                src={eSign.micro_sign}
                                alt="Operator eSign"
                                style={{
                                  width: "150px",
                                  height: "70px",
                                  objectFit: "contain",
                                  mixBlendMode: "multiply",
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </td>

                      <td
                        colspan="1"
                        style={{ height: "60%", textAlign: "center" }}
                      >
                        {formData.qc_status !== "WAITING_FOR_APPROVAL" &&
                          formData.qc_status !== "" && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ textAlign: "center" }}>
                                  {formData.qc_sign}
                                  <br />
                                  {formatDateAndTime(formData.qc_submit_on)}
                                </div>
                              </div>
                              <div style={{ marginLeft: "20px" }}>
                                {eSign.qc_sign ? (
                                  <img
                                    src={eSign.qc_sign}
                                    alt="HOD eSign"
                                    style={{
                                      width: "150px",
                                      height: "70px",
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
                </div>
              </TabPane>
            )}
          </>
        )}
      </Tabs>
    </>
  );
};

export default QualityControl_ARF_011;
