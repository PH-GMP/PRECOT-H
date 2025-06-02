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

const QualityControl_AR_f02 = () => {
  const { TextArea } = Input;
  const [tabNo, setTabNo] = useState("1");
  const [statusLoader, setStatusLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { subbatch } = location.state;
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

  const [dropdownOptions, setDropdownOptions] = useState([]);

  const [formData, setFormData] = useState({
    ar_no: "",
    format: "",
    unit: "",
    format_no: "",
    ref_sop_no: "",
    revision_no: "",
    samplingDate: "",
    tested_Date: "",
    sub_batch_no: "098",
    internal_export: "",
    finishing: "",
    mixing: "",
    remarks: "",
    bmr_no: "",
    result: "",
    product: "",
    reason: "",
    qc_sign: "",
    material_passes: "",
    qaqc: [
      {
        obr: "",
        descriptionremark: "",
        identificationObr: "",
        identificationrmk: "",
        fibre_obs: "",
        fibre_rmk: "",
        acid_obs: "",
        ACID_RMK: "",
        surface_obs: "",
        surface_rmk: "",
        Foreign_obs: "",
        Foreign_rmk: "",
        Fluorescence_obs: "",
        Fluorescence_rmk: "",
        Neps_obs: "",
        Neps_rmk: "",
        Neps_count_obs: "",
        Neps_count_rmk: "",
        UQL_w_obs: "",
        UQL_w_rmk: "",
        Ln_obs: "",
        Ln_rmk: "",
        Lw_obs: "",
        Lw_rmk: "",
        SFC_n_obs: "",
        SFC_n_rmk: "",
        SFC_w_obs: "",
        SFC_w_rmk: "",
        Micronaire_obs: "",
        Micronaire_rmk: "",
        Whiteness_obs: "",
        Whiteness_rmk: "",
        Extractable_obs: "",
        Extractable_rmk: "",
        abs_1: "",
        abs_2: "",
        abs_3: "",
        abs_4: "",
        abs_5: "",
        abs_6: "",
        abs_avg: "",
        abs_avg_2: "",
        remark: "",
        sulphatedFlWtObr: "",
        sulphatedIlWtObr: "",
        sulphatedBaObr: "",
        sulphatedResObr: "",
        WatersolubleFlWtObr: "",
        WatersolubleIlWtObr: "",
        WatersolubleNmObr: "",
        WatersolubleResObr: "",
        EthersolubleFlWtObr: "",
        EthersolubleIlWtObr: "",
        EthersolubleYxObr: "",
        EthersolubleResObr: "",
        LossondryingFlWtObr: "",
        LossondryingIlWtObr: "",
        LossondryingKlObr: "",
        LossondryingResObr: "",
        final_remark: "",
        sub_batch_no: "",
        product: "",
        materila_passes: "",
        remarks_a: "",

        remarks_b: "",

        remarks_c: "",

        remarks_d: "",

        remarks_e: "",

        remarks_f: "",
      },
    ],
    micro: [
      {
        sampled_on: "",
        tested: "",
        tf_count: "",
        tf_viable_count: "",
        p_field_a: "",
        p_field_b: "",
        p_field_c: "",
        p_field_d: "",
        p_field_e: "",
        moisture: "",
        sub_batch_no: "",
        completion_date: "",
        remarks: "",
        product: "",
        physicalandchemicaltest: "",
      },
    ],
  });

  const [eSign, setESign] = useState({
    chemist_sign: "",
    micro_sign: "",
    qc_sign: "",
  });

  // useEffect(() => {
  //   console.log("tabNo", tabNo);
  //   if (formData.qaqc[0]?.LossondryingResObr > 8.0 && tabNo === "5") {
  //     message.warning("Lossondrying Obr Result value more than 8.0");
  //   }
  // }, [formData.qaqc[0]?.LossondryingResObr, tabNo]);

  // useEffect(() => {
  //   if (formData.qaqc[0]?.sulphatedResObr > 0.4 && tabNo === "3") {
  //     message.warning("Sulphated Obr Result value more than 0.40");
  //   }
  // }, [formData.qaqc[0]?.sulphatedResObr, tabNo]);

  // useEffect(() => {
  //   if (formData.qaqc[0]?.WatersolubleResObr > 0.5 && tabNo === "4") {
  //     message.warning("Watersoluble Obr Result value more than 0.50");
  //   }
  // }, [formData.qaqc[0]?.WatersolubleResObr, tabNo]);

  // useEffect(() => {
  //   if (formData.qaqc[0]?.EthersolubleResObr > 0.7 && tabNo === "4") {
  //     message.warning("Ethersoluble Obr Result value more than 0.70");
  //   }
  // }, [formData.qaqc[0]?.EthersolubleResObr, tabNo]);

  useEffect(() => {
    const signatureKeys = ["chemist_sign", "micro_sign", "qc_sign"];
    signatureKeys.forEach((key) => {
      const username = formData[key];
      if (username) {
        console.log("usernameparams", username);

        axios
          .get(
            `${ API.prodUrl}/Precot/api/Format/Service/image?username=${username}`,
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
      setTabNo("7");
    }
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${ API.prodUrl}/Precot/api/bleaching/generation/fetchBleachingdataByBatchNumber?batchNumber=${subbatch}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.length > 0) {
          setDropdownOptions(response.data);
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchData();
  }, []);

  const handleDropdownChange = (e) => {
    const selectedValue = e; // Use optional chaining to safely access `value`
    if (selectedValue) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        bmr_no: selectedValue,
      }));
      fetchProductionDetails(selectedValue);
    } else {
      console.error("Dropdown value is undefined or invalid.");
    }
  };

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
            `${ API.prodUrl}/Precot/api/chemicaltest/ARF002/getchemicalTestbyBatch/${subbatch}`,
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
                navigate("/Precot/QualityControl/AR-F-002/Summary");
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
              qaqc:
                data.qaqc && data.qaqc.length > 0
                  ? [{ ...prevState.qaqc[0], ...data.qaqc[0] }]
                  : prevState.qaqc,
              micro:
                data.micro && data.micro.length > 0
                  ? [{ ...prevState.micro[0], ...data.micro[0] }]
                  : prevState.micro,
            }));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  const fetchProductionDetails = async (bmrNo) => {
    try {
      const response = await axios.get(
        `${ API.prodUrl}/Precot/api/bleaching/summary/getProductionDetailsByBmr?bmr_no=${bmrNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data?.[0]; // Assuming the response is an array with the desired object at index 0
      if (data) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          finishing: data.finishing || "",
          mixing: data.mixing || "",
        }));
      } else {
        console.error("Invalid or empty response data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching production details:", error);
    }
  };

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

    // if (
    //   (role == "QA_MANAGER" || role == "QC_MANAGER") &&
    //   (data.chemist_status != "CHEMIST_APPROVED" ||
    //     data.micro_status !== "MICROBIOLOGIST_APPROVED")
    // ) {
    //   message.warning("Chemist or Microbiologist Yet To Submit");
    //   setTimeout(() => {
    //     navigate("/Precot/QualityControl/AR-F-002/Summary");
    //   }, 1000);
    // }

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
        navigate("/Precot/QualityControl/AR-F-002/Summary");
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
      apiurl = `${ API.prodUrl}/Precot/api/chemicaltest/ARF002/saveChemicalTest`;
      payload = {
        test_id: formData.test_id,
        ar_no: formData.ar_no,
        format: "ABSORBENT BLEACHED COTTON ANALYSIS REPORT",
        unit: "UNIT H",
        format_no: "PH-QCL01-AR-F-002",
        ref_sop_no: "PH-QCL01-D-05",
        revision_no: "06",
        samplingDate: formData.samplingDate,
        tested_Date: formData.tested_Date,
        sub_batch_no: subbatch,
        test_id: formData.test_id,
        internal_export: formData.internal_export,
        finishing: formData.finishing,
        mixing: formData.mixing,
        remarks: formData.remarks,
        bmr_no: formData.bmr_no,
        result: formData.result,
        product: formData.product,
        reason: formData.reason,
        qaqc: [
          {
            test_id: formData.test_id,
            obs_id: formData.qaqc[0].obs_id,
            obr: formData.qaqc[0].descriptionObr,
            descriptionremark:
              role == "ROLE_CHEMIST" && formData.qaqc[0].descriptionremark == ""
                ? "NA"
                : formData.qaqc[0].descriptionremark,
            identificationObr: formData.qaqc[0].identificationObr,
            identificationrmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].identificationrmk == ""
                ? "NA"
                : formData.qaqc[0].identificationrmk,
            fibre_obs: formData.qaqc[0].fibre_obs,
            fibre_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].fibre_rmk == ""
                ? "NA"
                : formData.qaqc[0].fibre_rmk,
            acid_obs: formData.qaqc[0].acid_obs,
            ACID_RMK:
              role == "ROLE_CHEMIST" && formData.qaqc[0].ACID_RMK == ""
                ? "NA"
                : formData.qaqc[0].ACID_RMK,
            surface_obs: formData.qaqc[0].surface_obs,
            surface_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].surface_rmk == ""
                ? "NA"
                : formData.qaqc[0].surface_rmk,
            Foreign_obs: formData.qaqc[0].Foreign_obs,
            Foreign_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Foreign_rmk == ""
                ? "NA"
                : formData.qaqc[0].Foreign_rmk,
            Fluorescence_obs: formData.qaqc[0].Fluorescence_obs,
            Fluorescence_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Fluorescence_rmk == ""
                ? "NA"
                : formData.qaqc[0].Fluorescence_rmk,
            Neps_obs: formData.qaqc[0].Neps_obs,
            Neps_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Neps_rmk == ""
                ? "NA"
                : formData.qaqc[0].Neps_rmk,
            Neps_count_obs: formData.qaqc[0].Neps_count_obs,
            Neps_count_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Neps_count_rmk == ""
                ? "NA"
                : formData.qaqc[0].Neps_count_rmk,
            UQL_w_obs: formData.qaqc[0].UQL_w_obs,
            UQL_w_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].UQL_w_rmk == ""
                ? "NA"
                : formData.qaqc[0].UQL_w_rmk,
            Ln_obs: formData.qaqc[0].Ln_obs,
            Ln_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Ln_rmk == ""
                ? "NA"
                : formData.qaqc[0].Ln_rmk,
            Lw_obs: formData.qaqc[0].Lw_obs,
            Lw_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Lw_rmk == ""
                ? "NA"
                : formData.qaqc[0].Lw_rmk,
            SFC_n_obs: formData.qaqc[0].SFC_n_obs,
            SFC_n_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].SFC_n_rmk == ""
                ? "NA"
                : formData.qaqc[0].SFC_n_rmk,
            SFC_w_obs: formData.qaqc[0].SFC_w_obs,
            SFC_w_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].SFC_w_rmk == ""
                ? "NA"
                : formData.qaqc[0].SFC_w_rmk,
            Micronaire_obs: formData.qaqc[0].Micronaire_obs,
            Micronaire_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Micronaire_rmk == ""
                ? "NA"
                : formData.qaqc[0].Micronaire_rmk,
            Whiteness_obs: formData.qaqc[0].Whiteness_obs,
            Whiteness_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Whiteness_rmk == ""
                ? "NA"
                : formData.qaqc[0].Whiteness_rmk,
            Extractable_obs: formData.qaqc[0].Extractable_obs,
            Extractable_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Extractable_rmk == ""
                ? "NA"
                : formData.qaqc[0].Extractable_rmk,
            abs_1: formData.qaqc[0].abs_1,
            abs_2: formData.qaqc[0].abs_2,
            abs_3: formData.qaqc[0].abs_3,
            abs_4: formData.qaqc[0].abs_4,
            abs_5: formData.qaqc[0].abs_5,
            abs_6: formData.qaqc[0].abs_6,
            abs_avg: formData.qaqc[0].abs_avg,
            abs_avg_2: formData.qaqc[0].abs_avg_2,
            remark: formData.qaqc[0].remark,
            sulphatedFlWtObr: formData.qaqc[0].sulphatedFlWtObr,
            sulphatedIlWtObr: formData.qaqc[0].sulphatedIlWtObr,
            sulphatedBaObr: formData.qaqc[0].sulphatedBaObr,
            sulphatedResObr: formData.qaqc[0].sulphatedResObr,
            WatersolubleFlWtObr: formData.qaqc[0].WatersolubleFlWtObr,
            WatersolubleIlWtObr: formData.qaqc[0].WatersolubleIlWtObr,
            WatersolubleNmObr: formData.qaqc[0].WatersolubleNmObr,
            WatersolubleResObr: formData.qaqc[0].WatersolubleResObr,
            EthersolubleFlWtObr: formData.qaqc[0].EthersolubleFlWtObr,
            EthersolubleIlWtObr: formData.qaqc[0].EthersolubleIlWtObr,
            EthersolubleYxObr: formData.qaqc[0].EthersolubleYxObr,
            EthersolubleResObr: formData.qaqc[0].EthersolubleResObr,
            LossondryingFlWtObr: formData.qaqc[0].LossondryingFlWtObr,
            LossondryingIlWtObr: formData.qaqc[0].LossondryingIlWtObr,
            LossondryingKlObr: formData.qaqc[0].LossondryingKlObr,
            LossondryingResObr: formData.qaqc[0].LossondryingResObr,
            final_remark:
              role == "ROLE_CHEMIST" && formData.qaqc[0].final_remark == ""
                ? "NA"
                : formData.qaqc[0].final_remark,
            sub_batch_no: formData.qaqc[0].sub_batch_no,
            product: formData.qaqc[0].product,
            materila_passes: formData.qaqc[0].materila_passes,
            remarks_a: formData.qaqc[0].remarks_a,
            remarks_b: formData.qaqc[0].remarks_b,
            remarks_c: formData.qaqc[0].remarks_c,
            remarks_d: formData.qaqc[0].remarks_d,
            remarks_e: formData.qaqc[0].remarks_e,
            remarks_f: formData.qaqc[0].remarks_f,
          },
        ],
        micro: [
          {
            test_id: formData.test_id,
            micro_id: formData.micro[0]?.micro_id,
            sampled_on: formData.micro[0].sampled_on,
            tested: formData.micro[0].tested,
            tf_count:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].tf_count == ""
                ? "NA"
                : formData.micro[0].tf_count,
            tf_viable_count:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].tf_viable_count == ""
                ? "NA"
                : formData.micro[0].tf_viable_count,
            p_field_a:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].p_field_a == ""
                ? "NA"
                : formData.micro[0].p_field_a,
            p_field_b:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].p_field_b == ""
                ? "NA"
                : formData.micro[0].p_field_b,
            p_field_c:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].p_field_c == ""
                ? "NA"
                : formData.micro[0].p_field_c,
            p_field_d:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].p_field_d == ""
                ? "NA"
                : formData.micro[0].p_field_d,
            p_field_e:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].p_field_e == ""
                ? "NA"
                : formData.micro[0].p_field_e,
            moisture:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].moisture == ""
                ? "NA"
                : formData.micro[0].moisture,
            sub_batch_no: subbatch,
            completion_date: formData.micro[0].completion_date,
            remarks:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].remarks == ""
                ? "NA"
                : formData.micro[0].remarks,
            product: formData.micro[0].product,
            physicalandchemicaltest: formData.micro[0].physicalandchemicaltest,
          },
        ],
      };
    } else if (role == "QA_MANAGER" || role == "QC_MANAGER") {
      apiurl = `${ API.prodUrl}/Precot/api/chemicaltest/ARF002/approval`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.test_id,
        formatNo: "PH-QCL01-AR-F-002",
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
          navigate("/Precot/QualityControl/AR-F-002/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  // const handleRange = () => {
  //   let isValid = true;
  //   if (
  //     formData.qaqc[0]?.fibre_obs < 10 &&
  //     formData.qaqc[0]?.fibre_obs !== ""
  //   ) {
  //     message.warning("Fibre Average Observation Should be minimum 10");
  //     handleFieldClear("fibre_obs");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.qaqc[0]?.acid_obs < 6 || formData.qaqc[0]?.acid_obs > 8) &&
  //     formData.qaqc[0]?.acid_obs !== ""
  //   ) {
  //     message.warning("Acidity / Alkalinity (pH) Observation Should be 6 to 8");
  //     handleFieldClear("acid_obs");
  //     isValid = false;
  //   }
  //   if (formData.qaqc[0]?.Neps_obs > 5 && formData.qaqc[0]?.Neps_obs !== "") {
  //     message.warning("Neps Observation Should be maxium 5");
  //     handleFieldClear("Neps_obs");
  //     isValid = false;
  //   }
  //   if (
  //     formData.qaqc[0]?.Neps_count_obs > 2500 &&
  //     formData.qaqc[0]?.Neps_count_obs !== ""
  //   ) {
  //     message.warning("Neps count/gram Observation Should be maximum 2500");
  //     handleFieldClear("Neps_count_obs");
  //     isValid = false;
  //   }
  //   if (
  //     formData.qaqc[0]?.UQL_w_obs < 12 &&
  //     formData.qaqc[0]?.UQL_w_obs !== ""
  //   ) {
  //     message.warning("Upper Quartile Length Observation Should be minimum 12");
  //     handleFieldClear("UQL_w_obs");
  //     isValid = false;
  //   }
  //   if (formData.qaqc[0]?.Ln_obs < 7 && formData.qaqc[0]?.Ln_obs !== "") {
  //     message.warning("Length by number Observation Should be minimum 7");
  //     handleFieldClear("Ln_obs");
  //     isValid = false;
  //   }
  //   if (formData.qaqc[0]?.Lw_obs < 10 && formData.qaqc[0]?.Lw_obs !== "") {
  //     message.warning("Length by weight Observation Should be minimum 10");
  //     handleFieldClear("Lw_obs");
  //     isValid = false;
  //   }
  //   if (
  //     formData.qaqc[0]?.SFC_n_obs > 90 &&
  //     formData.qaqc[0]?.SFC_n_obs !== ""
  //   ) {
  //     message.warning(
  //       "Short fiber Content. by number Observation Should be maximum 90"
  //     );
  //     handleFieldClear("SFC_n_obs");
  //     isValid = false;
  //   }
  //   if (
  //     formData.qaqc[0]?.SFC_w_obs > 80 &&
  //     formData.qaqc[0]?.SFC_w_obs !== ""
  //   ) {
  //     message.warning(
  //       "Short fiber Content. by wt Observation Should be maximum 80"
  //     );
  //     handleFieldClear("SFC_w_obs");
  //     isValid = false;
  //   }
  //   if (
  //     formData.qaqc[0]?.Micronaire_obs < 2.8 &&
  //     formData.qaqc[0]?.Micronaire_obs !== ""
  //   ) {
  //     message.warning("Micronaire Value Observation Should be minimum 2.8");
  //     handleFieldClear("Micronaire_obs");
  //     isValid = false;
  //   }

  //   if (
  //     formData.qaqc[0]?.Whiteness_obs < 80 &&
  //     formData.qaqc[0]?.Whiteness_obs !== ""
  //   ) {
  //     message.warning("Whiteness Indices Observation Should be minimum 80");
  //     handleFieldClear("Whiteness_obs");
  //     isValid = false;
  //   }
  //   if (formData.qaqc[0]?.abs_1 > 10 && formData.qaqc[0]?.abs_1 !== "") {
  //     message.warning("Sinking time (sec.) Observation 1 Should be maximum 10");
  //     isValid = false;
  //   }
  //   if (formData.qaqc[0]?.abs_2 > 10 && formData.qaqc[0]?.abs_2 !== "") {
  //     message.warning("Sinking time (sec.) Observation 2 Should be maximum 10");
  //     isValid = false;
  //   }
  //   if (formData.qaqc[0]?.abs_3 > 10 && formData.qaqc[0]?.abs_3 !== "") {
  //     message.warning("Sinking time (sec.) Observation 3 Should be maximum 10");
  //     isValid = false;
  //   }
  //   if (formData.qaqc[0]?.abs_4 < 20 && formData.qaqc[0]?.abs_4 !== "") {
  //     message.warning(
  //       "Absorbption Capacity Observation 1 Should be minimum 20"
  //     );
  //     isValid = false;
  //   }
  //   if (formData.qaqc[0]?.abs_5 < 20 && formData.qaqc[0]?.abs_5 !== "") {
  //     message.warning(
  //       "Absorbption Capacity Observation 2 Should be minimum 20"
  //     );
  //     isValid = false;
  //   }
  //   if (formData.qaqc[0]?.abs_6 < 20 && formData.qaqc[0]?.abs_6 !== "") {
  //     message.warning(
  //       "Absorbption Capacity Observation 3 Should be minimum 20"
  //     );
  //     isValid = false;
  //   }
  //   // if (
  //   //   formData.qaqc[0]?.sulphatedFlWtObr > 0.4 &&
  //   //   formData.qaqc[0]?.sulphatedFlWtObr !== ""
  //   // ) {
  //   //   message.warning("Sulphated Ash Final Wt.(g)-B Should be maximum 0.40");
  //   //   handleFieldClear("sulphatedFlWtObr");
  //   //   isValid = false;
  //   // }
  //   // if (
  //   //   formData.qaqc[0]?.sulphatedIlWtObr > 0.4 &&
  //   //   formData.qaqc[0]?.sulphatedIlWtObr !== ""
  //   // ) {
  //   //   message.warning("Sulphated Ash Initial Wt.(g)-A Should be maximum 0.40");
  //   //   handleFieldClear("sulphatedIlWtObr");
  //   //   isValid = false;
  //   // }
  //   // if (
  //   //   formData.qaqc[0]?.WatersolubleFlWtObr > 0.5 &&
  //   //   formData.qaqc[0]?.WatersolubleFlWtObr !== ""
  //   // ) {
  //   //   message.warning(
  //   //     "Water Soluble Substances Final Wt.(g)-N Should be maximum 0.50"
  //   //   );
  //   //   handleFieldClear("WatersolubleFlWtObr");
  //   //   isValid = false;
  //   // }
  //   // if (
  //   //   formData.qaqc[0]?.WatersolubleIlWtObr > 0.5 &&
  //   //   formData.qaqc[0]?.WatersolubleIlWtObr !== ""
  //   // ) {
  //   //   message.warning(
  //   //     "Water Soluble Substances Initial Wt.(g)-M Should be maximum 0.50"
  //   //   );
  //   //   handleFieldClear("WatersolubleIlWtObr");
  //   //   isValid = false;
  //   // }
  //   // if (
  //   //   formData.qaqc[0]?.EthersolubleFlWtObr > 0.7 &&
  //   //   formData.qaqc[0]?.EthersolubleFlWtObr !== ""
  //   // ) {
  //   //   message.warning(
  //   //     "Ether Soluble Substances Final Wt.(g)-Y Should be maximum 0.70"
  //   //   );
  //   //   handleFieldClear("EthersolubleFlWtObr");
  //   //   isValid = false;
  //   // }
  //   // if (
  //   //   formData.qaqc[0]?.EthersolubleIlWtObr > 0.7 &&
  //   //   formData.qaqc[0]?.EthersolubleIlWtObr !== ""
  //   // ) {
  //   //   message.warning(
  //   //     "Ether Soluble Substances Initial Wt.(g)-X Should be maximum 0.70"
  //   //   );
  //   //   handleFieldClear("EthersolubleIlWtObr");
  //   //   isValid = false;
  //   // }
  //   // if (
  //   //   formData.qaqc[0]?.LossondryingFlWtObr > 8.0 &&
  //   //   formData.qaqc[0]?.LossondryingFlWtObr !== ""
  //   // ) {
  //   //   message.warning("Loss on drying Final Wt.(g)-L Should be maximum 8.0");
  //   //   handleFieldClear("LossondryingFlWtObr");
  //   //   isValid = false;
  //   // }
  //   // if (
  //   //   formData.qaqc[0]?.LossondryingIlWtObr > 8.0 &&
  //   //   formData.qaqc[0]?.LossondryingIlWtObr !== ""
  //   // ) {
  //   //   message.warning("Loss on drying Initial Wt.(g)-K Should be maximum 8.0");
  //   //   handleFieldClear("LossondryingIlWtObr");
  //   //   isValid = false;
  //   // }

  //   return isValid;
  // };

  const handleSubmit = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST") {
      if (role == "ROLE_CHEMIST") {
        const keysToValidate = [
          "ar_no",
          "internal_export",
          "samplingDate",
          "tested_Date",
        ];

        const getName = (key) => {
          switch (key) {
            case "ar_no":
              return " Ar No";
            case "internal_export":
              return "Internal/Export";
            case "samplingDate":
              return "Sampling Date";
            case "tested_Date":
              return " Tested Date";
          }
        };
        for (const key of keysToValidate) {
          if (formData[key] == "") {
            message.warning(`Please Fill ${getName(key)} Field `);
            return;
          }
        }

        const keysToValidateFormFields = [
          "descriptionObr",
          "identificationObr",
          "fibre_obs",
          "acid_obs",
          "surface_obs",
          "Foreign_obs",
          "Fluorescence_obs",
          "Neps_obs",
          "Neps_count_obs",
          "UQL_w_obs",
          "Ln_obs",
          "Lw_obs",
          "SFC_n_obs",
          "SFC_w_obs",
          "Micronaire_obs",
          "Whiteness_obs",
          "Extractable_obs",
          "abs_1",
          "abs_2",
          "abs_3",
          "abs_4",
          "abs_5",
          "abs_6",
          "sulphatedFlWtObr",
          "sulphatedIlWtObr",
          "WatersolubleFlWtObr",
          "WatersolubleIlWtObr",
          "EthersolubleFlWtObr",
          "EthersolubleIlWtObr",
          "LossondryingFlWtObr",
          "LossondryingIlWtObr",
          "product",
          "materila_passes",
        ];

        const getFieldName = (key) => {
          switch (key) {
            case "descriptionObr":
              return "Description Observation Field";
            case "identificationObr":
              return "Identification Test Observation Field";
            case "fibre_obs":
              return "Fibre Average Length Observation Field";
            case "acid_obs":
              return "Acidity / Alkalinity Observation Field";
            case "surface_obs":
              return "Surface Activity Substances Observation Field";
            case "Foreign_obs":
              return "Foreign Fibers Observation Field";
            case "Fluorescence_obs":
              return "Fluorescence Observation Field";
            case "Neps_obs":
              return "Neps Observation Field";
            case "Neps_count_obs":
              return "Neps count/gram Observation Field";
            case "UQL_w_obs":
              return "Upper Quartile Length Observation Field";
            case "Ln_obs":
              return "Length by number Observation Field";
            case "Lw_obs":
              return "Length by weight Observation Field";
            case "SFC_n_obs":
              return "Short fiber Content. by number Observation Field";
            case "SFC_w_obs":
              return "Short fiber Content. by wt Observation Field";
            case "Micronaire_obs":
              return "Micronaire Value Observation Field";
            case "Whiteness_obs":
              return "Whiteness Indices Observation Field";
            case "Extractable_obs":
              return "Extractable Colouring Matters Observation Field";
            case "abs_1":
              return "Sinking time (sec.) Observation 1";
            case "abs_2":
              return "Sinking time (sec.) Observation 2";
            case "abs_3":
              return "Sinking time (sec.) Observation 3";
            case "abs_4":
              return "Absorbption Capacity Observation 1";
            case "abs_5":
              return "Absorbption Capacity Observation 2";
            case "abs_6":
              return "Absorbption Capacity Observation 3";
            case "sulphatedFlWtObr":
              return "Sulphated Ash Final Wt";
            case "sulphatedIlWtObr":
              return "Sulphated Ash Initial Wt";
            case "WatersolubleFlWtObr":
              return "Water Soluble Substances  Final Wt ";
            case "WatersolubleIlWtObr":
              return "Water Soluble Substances Initial Wt";
            case "EthersolubleFlWtObr":
              return "Ether Soluble Substances Final Wt ";
            case "EthersolubleIlWtObr":
              return "Ether Soluble Substances Initial Wt";
            case "LossondryingFlWtObr":
              return "Loss on drying Final Wt ";
            case "LossondryingIlWtObr":
              return "Loss on drying Initial Wt";
            case "product":
              return "Product ";
            case "materila_passes":
              return "Material Passes for the Pharmacopoeia";
          }
        };

        for (const key of keysToValidateFormFields) {
          if (formData.qaqc[0][key] == "" || formData.qaqc[0][key] == null) {
            message.warning(`Please Fill ${getFieldName(key)}`);
            return;
          }
        }
      }

      if (role == "ROLE_MICROBIOLOGIST") {
        if (
          formData.micro[0].product == "" ||
          formData.micro[0].product == null
        ) {
          message.warning("Please Select Product Lov");
          return;
        }
        // if(Number(formData.micro[0].tf_viable_count) > 1000 && formData.micro[0].tf_viable_count !== ""){
        //   message.warning('Total Viable Count should be less than or equal to 1000')
        //   return;

        // }
        // if(Number(formData.micro[0].tf_count) > 100 && formData.micro[0].tf_count !== ""){
        //   message.warning('Total Fungal Count should be less than or equal to 100')
        //   return;
        // }
      }
      succesMsg = "Submitted Successfully ";
      apiurl = `${ API.prodUrl}/Precot/api/chemicaltest/ARF002/submitChemicalTest`;
      payload = {
        test_id: formData.test_id,
        ar_no: formData.ar_no,
        format: "ABSORBENT BLEACHED COTTON ANALYSIS REPORT",
        unit: "UNIT H",
        format_no: "PH-QCL01-AR-F-002",
        ref_sop_no: "PH-QCL01-D-05",
        revision_no: "06",
        samplingDate: formData.samplingDate,
        tested_Date: formData.tested_Date,
        sub_batch_no: subbatch,
        test_id: formData.test_id,
        internal_export: formData.internal_export,
        finishing: formData.finishing,
        mixing: formData.mixing,
        remarks: formData.remarks,
        bmr_no: formData.bmr_no,
        result: formData.result,
        product: formData.product,
        reason: formData.reason,
        qaqc: [
          {
            test_id: formData.test_id,
            obs_id: formData.qaqc[0].obs_id,
            obr: formData.qaqc[0].descriptionObr,
            descriptionremark:
              role == "ROLE_CHEMIST" && formData.qaqc[0].descriptionremark == ""
                ? "NA"
                : formData.qaqc[0].descriptionremark,
            identificationObr: formData.qaqc[0].identificationObr,
            identificationrmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].identificationrmk == ""
                ? "NA"
                : formData.qaqc[0].identificationrmk,
            fibre_obs: formData.qaqc[0].fibre_obs,
            fibre_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].fibre_rmk == ""
                ? "NA"
                : formData.qaqc[0].fibre_rmk,
            acid_obs: formData.qaqc[0].acid_obs,
            ACID_RMK:
              role == "ROLE_CHEMIST" && formData.qaqc[0].ACID_RMK == ""
                ? "NA"
                : formData.qaqc[0].ACID_RMK,
            surface_obs: formData.qaqc[0].surface_obs,
            surface_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].surface_rmk == ""
                ? "NA"
                : formData.qaqc[0].surface_rmk,
            Foreign_obs: formData.qaqc[0].Foreign_obs,
            Foreign_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Foreign_rmk == ""
                ? "NA"
                : formData.qaqc[0].Foreign_rmk,
            Fluorescence_obs: formData.qaqc[0].Fluorescence_obs,
            Fluorescence_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Fluorescence_rmk == ""
                ? "NA"
                : formData.qaqc[0].Fluorescence_rmk,
            Neps_obs: formData.qaqc[0].Neps_obs,
            Neps_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Neps_rmk == ""
                ? "NA"
                : formData.qaqc[0].Neps_rmk,
            Neps_count_obs: formData.qaqc[0].Neps_count_obs,
            Neps_count_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Neps_count_rmk == ""
                ? "NA"
                : formData.qaqc[0].Neps_count_rmk,
            UQL_w_obs: formData.qaqc[0].UQL_w_obs,
            UQL_w_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].UQL_w_rmk == ""
                ? "NA"
                : formData.qaqc[0].UQL_w_rmk,
            Ln_obs: formData.qaqc[0].Ln_obs,
            Ln_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Ln_rmk == ""
                ? "NA"
                : formData.qaqc[0].Ln_rmk,
            Lw_obs: formData.qaqc[0].Lw_obs,
            Lw_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Lw_rmk == ""
                ? "NA"
                : formData.qaqc[0].Lw_rmk,
            SFC_n_obs: formData.qaqc[0].SFC_n_obs,
            SFC_n_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].SFC_n_rmk == ""
                ? "NA"
                : formData.qaqc[0].SFC_n_rmk,
            SFC_w_obs: formData.qaqc[0].SFC_w_obs,
            SFC_w_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].SFC_w_rmk == ""
                ? "NA"
                : formData.qaqc[0].SFC_w_rmk,
            Micronaire_obs: formData.qaqc[0].Micronaire_obs,
            Micronaire_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Micronaire_rmk == ""
                ? "NA"
                : formData.qaqc[0].Micronaire_rmk,
            Whiteness_obs: formData.qaqc[0].Whiteness_obs,
            Whiteness_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Whiteness_rmk == ""
                ? "NA"
                : formData.qaqc[0].Whiteness_rmk,
            Extractable_obs: formData.qaqc[0].Extractable_obs,
            Extractable_rmk:
              role == "ROLE_CHEMIST" && formData.qaqc[0].Extractable_rmk == ""
                ? "NA"
                : formData.qaqc[0].Extractable_rmk,
            abs_1: formData.qaqc[0].abs_1,
            abs_2: formData.qaqc[0].abs_2,
            abs_3: formData.qaqc[0].abs_3,
            abs_4: formData.qaqc[0].abs_4,
            abs_5: formData.qaqc[0].abs_5,
            abs_6: formData.qaqc[0].abs_6,
            abs_avg: formData.qaqc[0].abs_avg,
            abs_avg_2: formData.qaqc[0].abs_avg_2,
            remark: formData.qaqc[0].remark,
            sulphatedFlWtObr: formData.qaqc[0].sulphatedFlWtObr,
            sulphatedIlWtObr: formData.qaqc[0].sulphatedIlWtObr,
            sulphatedBaObr: formData.qaqc[0].sulphatedBaObr,
            sulphatedResObr: formData.qaqc[0].sulphatedResObr,
            WatersolubleFlWtObr: formData.qaqc[0].WatersolubleFlWtObr,
            WatersolubleIlWtObr: formData.qaqc[0].WatersolubleIlWtObr,
            WatersolubleNmObr: formData.qaqc[0].WatersolubleNmObr,
            WatersolubleResObr: formData.qaqc[0].WatersolubleResObr,
            EthersolubleFlWtObr: formData.qaqc[0].EthersolubleFlWtObr,
            EthersolubleIlWtObr: formData.qaqc[0].EthersolubleIlWtObr,
            EthersolubleYxObr: formData.qaqc[0].EthersolubleYxObr,
            EthersolubleResObr: formData.qaqc[0].EthersolubleResObr,
            LossondryingFlWtObr: formData.qaqc[0].LossondryingFlWtObr,
            LossondryingIlWtObr: formData.qaqc[0].LossondryingIlWtObr,
            LossondryingKlObr: formData.qaqc[0].LossondryingKlObr,
            LossondryingResObr: formData.qaqc[0].LossondryingResObr,
            final_remark:
              role == "ROLE_CHEMIST" && formData.qaqc[0].final_remark == ""
                ? "NA"
                : formData.qaqc[0].final_remark,
            sub_batch_no: formData.qaqc[0].sub_batch_no,
            product: formData.qaqc[0].product,
            materila_passes: formData.qaqc[0].materila_passes,
            remarks_a: formData.qaqc[0].remarks_a,
            remarks_b: formData.qaqc[0].remarks_b,
            remarks_c: formData.qaqc[0].remarks_c,
            remarks_d: formData.qaqc[0].remarks_d,
            remarks_e: formData.qaqc[0].remarks_e,
            remarks_f: formData.qaqc[0].remarks_f,
          },
        ],
        micro: [
          {
            test_id: formData.test_id,
            micro_id: formData.micro[0]?.micro_id,
            sampled_on: formData.micro[0].sampled_on,
            tested: formData.micro[0].tested,
            tf_count:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].tf_count == ""
                ? "NA"
                : formData.micro[0].tf_count,
            tf_viable_count:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].tf_viable_count == ""
                ? "NA"
                : formData.micro[0].tf_viable_count,
            p_field_a:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].p_field_a == ""
                ? "NA"
                : formData.micro[0].p_field_a,
            p_field_b:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].p_field_b == ""
                ? "NA"
                : formData.micro[0].p_field_b,
            p_field_c:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].p_field_c == ""
                ? "NA"
                : formData.micro[0].p_field_c,
            p_field_d:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].p_field_d == ""
                ? "NA"
                : formData.micro[0].p_field_d,
            p_field_e:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].p_field_e == ""
                ? "NA"
                : formData.micro[0].p_field_e,
            moisture:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].moisture == ""
                ? "NA"
                : formData.micro[0].moisture,
            sub_batch_no: subbatch,
            completion_date: formData.micro[0].completion_date,
            remarks:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].remarks == ""
                ? "NA"
                : formData.micro[0].remarks,
            product: formData.micro[0].product,
            physicalandchemicaltest: formData.micro[0].physicalandchemicaltest,
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
      apiurl = `${ API.prodUrl}/Precot/api/chemicaltest/ARF002/approval`;
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
          navigate("/Precot/QualityControl/AR-F-002/Summary");
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
      qaqc: [
        {
          ...prevState.qaqc[0],
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

  useEffect(() => {
    if (
      formData.micro[0].tested > formData.micro[0].completion_date &&
      formData.micro[0].tested !== "" &&
      formData.micro[0].completion_date !== ""
    ) {
      message.warning("Test Completion Date Should Come After Tested Start On");
    }
    if (
      formData.micro[0].tested == "" &&
      formData.micro[0].completion_date !== ""
    ) {
    }
  }, [formData.micro[0].tested, formData.micro[0].completion_date]);

  let validation = new Set();

  const handleBlur = () => {
    if (role == "ROLE_CHEMIST") {
      if (status.fieldStatus) {
        return;
      }
      console.log("tabNohandleBlur", tabNo);
      if (tabNo == "2") {
        if (
          formData.qaqc[0]?.Neps_obs > 5 &&
          formData.qaqc[0]?.Neps_obs !== ""
        ) {
          validation.add("Entered Neps Observation value is greater than 5");
        }
        if (
          formData.qaqc[0]?.Neps_count_obs > 2500 &&
          formData.qaqc[0]?.Neps_count_obs !== ""
        ) {
          validation.add(
            "Entered Neps count/gram Observation value is greater than 2500"
          );
        }
        if (
          formData.qaqc[0]?.UQL_w_obs < 12 &&
          formData.qaqc[0]?.UQL_w_obs !== ""
        ) {
          validation.add(
            "Entered Upper Quartile Length Observation value is less than 12"
          );
        }
        if (formData.qaqc[0]?.Ln_obs < 7 && formData.qaqc[0]?.Ln_obs !== "") {
          validation.add(
            "Entered Length by number Observation value is less than 7"
          );
        }
        if (formData.qaqc[0]?.Lw_obs < 10 && formData.qaqc[0]?.Lw_obs !== "") {
          validation.add(
            "Entered Length by weight Observation value is less than 10"
          );
        }
        if (
          formData.qaqc[0]?.SFC_n_obs > 90 &&
          formData.qaqc[0]?.SFC_n_obs !== ""
        ) {
          validation.add(
            "Entered Short fiber Content. by number Observation value is greater than 90"
          );
        }
        if (
          formData.qaqc[0]?.SFC_w_obs > 80 &&
          formData.qaqc[0]?.SFC_w_obs !== ""
        ) {
          validation.add(
            "Entered Short fiber Content. by wt Observation value is greater than 80"
          );
        }
        if (
          formData.qaqc[0]?.Micronaire_obs < 2.8 &&
          formData.qaqc[0]?.Micronaire_obs !== ""
        ) {
          validation.add(
            "Entered Micronaire Value Observation value is less than 2.8"
          );
        }
        if (
          formData.qaqc[0]?.Whiteness_obs < 80 &&
          formData.qaqc[0]?.Whiteness_obs !== ""
        ) {
          validation.add(
            "Entered Whiteness Indices Observation value is less than 80"
          );
        }
      }
      if (tabNo == "3") {
        if (formData.qaqc[0]?.abs_1 > 10 && formData.qaqc[0]?.abs_1 !== "") {
          validation.add(
            "Entered value is more than 10 sec for Sinking time (sec.) Observation 1"
          );
        }
        if (formData.qaqc[0]?.abs_2 > 10 && formData.qaqc[0]?.abs_2 !== "") {
          validation.add(
            "Entered value is more than 10 sec for Sinking time (sec.) Observation 2"
          );
        }
        if (formData.qaqc[0]?.abs_3 > 10 && formData.qaqc[0]?.abs_3 !== "") {
          validation.add(
            "Entered value is more than 10 sec for Sinking time (sec.) Observation 3"
          );
        }
        if (formData.qaqc[0]?.abs_4 < 20 && formData.qaqc[0]?.abs_4 !== "") {
          validation.add(
            "Entered Absorbption Capacity Observation 1 value is less than 20"
          );
        }
        if (formData.qaqc[0]?.abs_5 < 20 && formData.qaqc[0]?.abs_5 !== "") {
          validation.add(
            "Entered Absorbption Capacity Observation 2 value is less than 20"
          );
        }
        if (formData.qaqc[0]?.abs_6 < 20 && formData.qaqc[0]?.abs_6 !== "") {
          validation.add(
            "Entered Absorbption Capacity Observation 3 value is less than 20"
          );
        }
      }

      // if (
      //   formData.qaqc[0]?.sulphatedFlWtObr > 0.4 &&
      //   formData.qaqc[0]?.sulphatedFlWtObr !== ""
      // ) {
      //   validation.add("Sulphated Ash Final Wt.(g)-B Should be maximum 0.4");
      //   handleFieldClear("sulphatedFlWtObr");
      // }
      // if (
      //   formData.qaqc[0]?.sulphatedIlWtObr > 0.4 &&
      //   formData.qaqc[0]?.sulphatedIlWtObr !== ""
      // ) {
      //   validation.add("Sulphated Ash Initial Wt.(g)-A Should be maximum 0.4");
      //   handleFieldClear("sulphatedIlWtObr");
      // }
      // if (
      //   formData.qaqc[0]?.WatersolubleFlWtObr > 0.5 &&
      //   formData.qaqc[0]?.WatersolubleFlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Water Soluble Substances Final Wt.(g)-N Should be maximum 0.50"
      //   );
      //   handleFieldClear("WatersolubleFlWtObr");
      // }
      // if (
      //   formData.qaqc[0]?.WatersolubleIlWtObr > 0.5 &&
      //   formData.qaqc[0]?.WatersolubleIlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Water Soluble Substances Initial Wt.(g)-M Should be maximum 0.50"
      //   );
      //   handleFieldClear("WatersolubleIlWtObr");
      // }
      // if (
      //   formData.qaqc[0]?.EthersolubleFlWtObr > 0.7 &&
      //   formData.qaqc[0]?.EthersolubleFlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Ether Soluble Substances Final Wt.(g)-Y Should be maximum 0.70"
      //   );
      //   handleFieldClear("EthersolubleFlWtObr");
      // }
      // if (
      //   formData.qaqc[0]?.EthersolubleIlWtObr > 0.7 &&
      //   formData.qaqc[0]?.EthersolubleIlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Ether Soluble Substances Initial Wt.(g)-X Should be maximum 0.70"
      //   );
      //   handleFieldClear("EthersolubleIlWtObr");
      // }
      // if (
      //   formData.qaqc[0]?.LossondryingFlWtObr > 8.0 &&
      //   formData.qaqc[0]?.LossondryingFlWtObr !== ""
      // ) {
      //   validation.add("Loss on drying Final Wt.(g)-L Should be maximum 8.0");
      //   handleFieldClear("LossondryingFlWtObr");
      // }
      // if (
      //   formData.qaqc[0]?.LossondryingIlWtObr > 8.0 &&
      //   formData.qaqc[0]?.LossondryingIlWtObr !== ""
      // ) {
      //   validation.add("Loss on drying Initial Wt.(g)-K Should be maximum 8.0");
      //   handleFieldClear("LossondryingIlWtObr");
      // }

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
        validation2.add("Entered Total Viable Count value greater than 1000");
      }
      if (
        Number(formData.micro[0].tf_count) > 100 &&
        formData.micro[0].tf_count !== ""
      ) {
        validation2.add("Entered Total Fungal Count value greater than 100");
      }
    }

    if (validation2.size > 0) {
      validation2.forEach((msg) => {
        message.warning(msg);
      });
    }
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
      ((Number(formData.qaqc[0]?.abs_1) || 0) +
        (Number(formData.qaqc[0]?.abs_2) || 0) +
        (Number(formData.qaqc[0]?.abs_3) || 0)) /
      3;
    handleArrayInput(sinkingAvg1.toFixed(2), "abs_avg");

    sinkingAvg2 =
      ((Number(formData.qaqc[0]?.abs_4) || 0) +
        (Number(formData.qaqc[0]?.abs_5) || 0) +
        (Number(formData.qaqc[0]?.abs_6) || 0)) /
      3;
    handleArrayInput(sinkingAvg2.toFixed(2), "abs_avg_2");

    handleArrayInput(
      (
        Number(formData.qaqc[0]?.sulphatedFlWtObr || 0) -
        Number(formData.qaqc[0]?.sulphatedIlWtObr || 0)
      ).toFixed(4),
      "sulphatedBaObr"
    );
    sulphateResult =
      ((Number(formData.qaqc[0]?.sulphatedFlWtObr || 0) -
        Number(formData.qaqc[0]?.sulphatedIlWtObr || 0)) *
        100) /
      5;
    handleArrayInput(sulphateResult.toFixed(2), "sulphatedResObr");

    handleArrayInput(
      (
        Number(formData.qaqc[0]?.WatersolubleFlWtObr || 0) -
        Number(formData.qaqc[0]?.WatersolubleIlWtObr || 0)
      ).toFixed(4),
      "WatersolubleNmObr"
    );
    waterResult =
      ((Number(formData.qaqc[0]?.WatersolubleFlWtObr || 0) -
        Number(formData.qaqc[0]?.WatersolubleIlWtObr || 0)) *
        100) /
      5;
    handleArrayInput(waterResult.toFixed(2), "WatersolubleResObr");

    handleArrayInput(
      (
        Number(formData.qaqc[0]?.EthersolubleFlWtObr || 0) -
        Number(formData.qaqc[0]?.EthersolubleIlWtObr || 0)
      ).toFixed(4),
      "EthersolubleYxObr"
    );
    EtherResult =
      ((Number(formData.qaqc[0]?.EthersolubleFlWtObr || 0) -
        Number(formData.qaqc[0]?.EthersolubleIlWtObr || 0)) *
        100) /
      5;
    handleArrayInput(EtherResult.toFixed(2), "EthersolubleResObr");

    handleArrayInput(
      (
        Number(formData.qaqc[0]?.LossondryingIlWtObr || 0) -
        Number(formData.qaqc[0]?.LossondryingFlWtObr || 0)
      ).toFixed(2),
      "LossondryingKlObr"
    );
    lossDryResult =
      ((Number(formData.qaqc[0]?.LossondryingIlWtObr || 0) -
        Number(formData.qaqc[0]?.LossondryingFlWtObr || 0)) *
        100) /
      (Number(formData.qaqc[0]?.LossondryingIlWtObr) || 1);
    handleArrayInput(lossDryResult.toFixed(2), "LossondryingResObr");
  }, [
    formData.qaqc[0]?.abs_1,
    formData.qaqc[0]?.abs_3,
    formData.qaqc[0]?.abs_3,
    formData.qaqc[0]?.abs_4,
    formData.qaqc[0]?.abs_5,
    formData.qaqc[0]?.abs_6,
    formData.qaqc[0]?.sulphatedFlWtObr,
    formData.qaqc[0]?.sulphatedIlWtObr,
    formData.qaqc[0]?.WatersolubleFlWtObr,
    formData.qaqc[0]?.WatersolubleIlWtObr,
    formData.qaqc[0]?.EthersolubleFlWtObr,
    formData.qaqc[0]?.EthersolubleIlWtObr,
    formData.qaqc[0]?.LossondryingFlWtObr,
    formData.qaqc[0]?.LossondryingIlWtObr,
  ]);

  const handleBack = () => {
    navigate("/Precot/QualityControl/AR-F-002/Summary");
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

  const handleArrayInput = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      qaqc: prevState.qaqc.map((item, i) =>
        i == 0 ? { ...item, [name]: value } : item
      ),
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
        formName={"ABSORBENT BLEACHED COTTON ANALYSIS REPORT"}
        formatNo={"PH-QCL01-AR-F-002"}
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
        Number(tabNo) <= 6 && (
          <div style={{ margin: "5px", display: "flex" }}>
            <Row gutter={[8, 8]} align="middle">
              <Col xs={24} sm={12} md={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    type="text"
                    value={subbatch}
                    addonBefore="Sub. Batch No.:"
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly
                  />
                  <Input
                    type="date"
                    addonBefore="Sampling Date:"
                    value={formData.samplingDate}
                    max={today}
                    onChange={(e) => {
                      handleInput(e.target.value, "samplingDate");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  />
                </Space>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <label>BMR NO:</label>
                  <Select
                    style={{ width: "100%", textAlign: "center" }}
                    addonBefore=""
                    id="dropdown"
                    showSearch
                    filterOption={false}
                    value={formData.bmr_no}
                    onChange={handleDropdownChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          bmr_no: e.target.value,
                        })); // Set the selected value in the state
                        fetchProductionDetails(e.target.value);
                      }
                    }}
                  >
                    {dropdownOptions.map((option) => (
                      <Select.Option key={option.id} value={option.value}>
                        {option.value}
                      </Select.Option>
                    ))}
                  </Select>

                  <Input
                    type="text"
                    value={formData.finishing}
                    addonBefore="Finishing:"
                    onChange={(e) => {
                      handleInput(e.target.value, "finishing");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  />
                </Space>
              </Col>
              <br></br>
              <Col xs={24} sm={12} md={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    type="text"
                    addonBefore="A.R. No.:"
                    value={formData.ar_no}
                    onChange={(e) => {
                      handleInput(e.target.value, "ar_no");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  />
                  <Input
                    type="date"
                    addonBefore="Tested Date: "
                    value={formData.tested_Date}
                    style={{ textAlign: "center" }}
                    max={today}
                    onChange={(e) => {
                      handleInput(e.target.value, "tested_Date");
                    }}
                    readOnly={status.fieldStatus}
                  />
                </Space>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <label>Internal/ Export: </label>
                    <Select
                      value={formData.internal_export}
                      options={internalLov}
                      onChange={(e) => {
                        handleInput(e, "internal_export");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ width: "170px", textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </div>
                  <Input
                    type="text"
                    value={formData.mixing}
                    addonBefore="Mixing.:"
                    style={{ width: "100%", textAlign: "center" }}
                    onChange={(e) => {
                      handleInput(e.target.value, "mixing");
                    }}
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
        Number(tabNo) >= 7 && (
          <div style={{ margin: "5px" }}>
            <Input
              type="date"
              addonBefore="Sampling Date:"
              value={formData.micro[0].sampled_on}
              max={today}
              onChange={(e) => {
                handleMicroInput(e.target.value, "sampled_on");
              }}
              style={{ width: "150px", textAlign: "center" }}
              readOnly={status.fieldStatus}
            />
            <Input
              type="date"
              value={formData.micro[0].tested}
              onChange={(e) => {
                handleMicroInput(e.target.value, "tested");
              }}
              addonBefore="Tested /Incubation Start on"
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
            <TabPane tab="Phy And Che Test I" key="1">
              <table>
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                  <td style={{ textAlign: "center" }}>Parameter Tested</td>
                  <td style={{ textAlign: "center" }}>Specification</td>
                  <td style={{ textAlign: "center" }}>Observation</td>
                  <td style={{ textAlign: "center", width: "20%" }}>Remark</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>1</td>
                  <td style={{ textAlign: "center" }}>Description</td>
                  <td style={{ textAlign: "center" }}>
                    Absorbent Cotton Product
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.qaqc[0]?.descriptionObr}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "descriptionObr");
                      }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.descriptionremark}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "descriptionremark");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>2</td>
                  <td style={{ textAlign: "center" }}>
                    Identification Test <br />
                    (Under Microscope)
                  </td>
                  <td style={{ textAlign: "center" }}>
                    Each fiber consist of single cell
                    <br />, in the form of flattened tube with thick <br />{" "}
                    round walls and often twisted.
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.qaqc[0]?.identificationObr}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "identificationObr");
                      }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.identificationrmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "identificationrmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>3</td>
                  <td style={{ textAlign: "center" }}>
                    Fibre Average Length (mm) (manual)
                  </td>
                  <td style={{ textAlign: "center" }}>Min.10</td>
                  <td>
                    <Input
                      value={formData.qaqc[0]?.fibre_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={10}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "fibre_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onBlur={(e) => {
                        let value = e.target.value;
                        const firstNumber = parseFloat(value.split("-")[0]);
                        if (!isNaN(firstNumber)) {
                          if (firstNumber < 10) {
                            message.warning("Entered value is less than 10");
                          }
                        }
                      }}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.fibre_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "fibre_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>4</td>
                  <td style={{ textAlign: "center" }}>
                    Acidity / Alkalinity (pH)
                  </td>
                  <td style={{ textAlign: "center" }}>6 to 8</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.acid_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={6}
                      max={8}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "acid_obs");
                      }}
                      onKeyDown={handleE}
                      readOnly={status.fieldStatus}
                      onBlur={(e) => {
                        let value = e.target.value;
                        if (value < 6 || value > 8) {
                          message.warning(
                            "Entered Acidity / Alkalinity (pH) Observation value is not between 6 to 8"
                          );
                        }
                      }}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.ACID_RMK}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "ACID_RMK");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>5</td>
                  <td style={{ textAlign: "center" }}>
                    Surface Activity Substances (S.A)
                  </td>
                  <td style={{ textAlign: "center" }}>
                    Any foam present must not cover the entire surface of the
                    liquid.
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.qaqc[0]?.surface_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "surface_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.surface_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "surface_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>6</td>
                  <td style={{ textAlign: "center" }}>
                    Foreign Fibers (Under Microscope)
                  </td>
                  <td style={{ textAlign: "center" }}>
                    Occasionally a few isolated foreign fibers may be present.
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.qaqc[0]?.Foreign_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "Foreign_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.Foreign_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "Foreign_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>7</td>
                  <td style={{ textAlign: "center" }}>
                    Fluorescence (Under UV){" "}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    No intense blue fluorescence. Few isolated fibers passable
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.qaqc[0]?.Fluorescence_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "Fluorescence_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.Fluorescence_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "Fluorescence_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>8</td>
                  <td style={{ textAlign: "center" }}>Neps</td>
                  <td style={{ textAlign: "center" }}>
                    Max. 5 ( 2.5 mm in diameter)/ gram
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.Neps_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      max={5}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "Neps_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.Neps_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "Neps_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Phy And Che Test II" key="2">
              <table>
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                  <td style={{ textAlign: "center" }}>Parameter Tested</td>
                  <td style={{ textAlign: "center" }}>Specification</td>
                  <td style={{ textAlign: "center" }}>Observation</td>
                  <td style={{ textAlign: "center", width: "20%" }}>Remark</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }} rowSpan={6}>
                    9
                  </td>
                  <td style={{ textAlign: "center" }}>Neps count/gram.</td>
                  <td style={{ textAlign: "center" }}>Max. 2500</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.Neps_count_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      max={2500}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "Neps_count_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.Neps_count_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "Neps_count_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    Upper Quartile Length.mm by Wt. UQL (w){" "}
                  </td>
                  <td style={{ textAlign: "center" }}>Min.12</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.UQL_w_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={12}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "UQL_w_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.UQL_w_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "UQL_w_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    Length by number. mm L(n)
                  </td>
                  <td style={{ textAlign: "center" }}>Min. 7</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.Ln_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={7}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "Ln_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.Ln_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "Ln_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    Length by weight. mm L (w)
                  </td>
                  <td style={{ textAlign: "center" }}>Min.10 </td>
                  <td>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.Lw_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={10}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "Lw_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.Lw_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "Lw_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    Short fiber Content. by number % SFC(n)
                  </td>
                  <td style={{ textAlign: "center" }}>Max. 90</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.SFC_n_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      max={90}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "SFC_n_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.SFC_n_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "SFC_n_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    Short fiber Content. by wt. % SFC(w)
                  </td>
                  <td style={{ textAlign: "center" }}>Max.80</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.SFC_w_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      max={80}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "SFC_w_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.SFC_w_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "SFC_w_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>10</td>
                  <td style={{ textAlign: "center" }}>
                    Micronaire Value. µg/inch{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>Min. 2.8</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.Micronaire_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={2.8}
                      step={0.1}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "Micronaire_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.Micronaire_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "Micronaire_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>11</td>
                  <td style={{ textAlign: "center" }}>
                    Whiteness Indices (Berger 10deg/D65){" "}
                  </td>
                  <td style={{ textAlign: "center" }}>Min. 80</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.Whiteness_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={80}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "Whiteness_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.Whiteness_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "Whiteness_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>12</td>
                  <td style={{ textAlign: "center" }}>
                    Extractable Colouring Matters{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    Alcohol extract may be slightly yellowish but not blue or
                    green.
                  </td>
                  <td>
                    <Select
                      type="text"
                      value={formData.qaqc[0]?.Extractable_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(value) => {
                        handleArrayInput(value, "Extractable_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.Extractable_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "Extractable_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Phy And Che Test III" key="3">
              <table>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      width: "100px",
                    }}
                  >
                    S.No
                  </td>
                  <td style={{ textAlign: "center", width: "20%" }}>
                    Parameter Tested
                  </td>
                  <td style={{ textAlign: "center", width: "20%" }}>
                    Specification
                  </td>
                  <td style={{ textAlign: "center", width: "50%" }} colSpan={4}>
                    Observation
                  </td>
                  <td style={{ textAlign: "center", width: "50%" }}>Remark</td>
                </tr>
                <tr>
                  <td
                    style={{ textAlign: "center", padding: "5px" }}
                    rowSpan={3}
                  >
                    13
                  </td>
                  <td style={{ textAlign: "center", padding: "20px" }}>
                    Absorbency
                  </td>
                  <td style={{ textAlign: "center" }}>Sample</td>
                  <td style={{ textAlign: "center" }}>1</td>
                  <td style={{ textAlign: "center" }}>2</td>
                  <td style={{ textAlign: "center" }}>3</td>
                  <td style={{ textAlign: "center" }}>Avg.</td>
                  <td style={{ textAlign: "center" }}>Remark</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>Sinking time (sec.)</td>
                  <td style={{ textAlign: "center" }}>
                    Max. 8.0 For BP,USP, EP Max. 10
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.abs_1}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "abs_1");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.abs_2}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "abs_2");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.abs_3}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "abs_3");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      value={formData.qaqc[0]?.abs_avg}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.remarks_a}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "170px" }}
                      onChange={(e) => {
                        handleArrayInput(e, "remarks_a");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    Absorbption Capacity/ W.H.C (g/g)
                  </td>
                  <td style={{ textAlign: "center" }}>
                    Min.24.0 For JP Min.20 & BP,EP Min.23{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.abs_4}
                      min={25}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "abs_4");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.abs_5}
                      min={25}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "abs_5");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.abs_6}
                      min={25}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "abs_6");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      value={formData.qaqc[0]?.abs_avg_2}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.qaqc[0]?.remarks_b}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "170px" }}
                      onChange={(e) => {
                        handleArrayInput(e, "remarks_b");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
              </table>
              <table>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      width: "94px",
                      padding: "10px",
                    }}
                    rowSpan={4}
                  >
                    14
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Sulphated Ash (%) <br /> RESULT = [(B-A) x100]/ 5 A=
                    Crucible Wt.(g)
                    <br /> B= Crucible Wt.with 5 g.
                    <br /> sample's Ash Content.(g)
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Max. 0.20 For JP Max. 0.25 total ash & BP,EP Max. 0.40
                  </td>
                  <td style={{ textAlign: "center" }}>Final Wt.(g)-B</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.sulphatedFlWtObr}
                      min={0}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "sulphatedFlWtObr");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td rowSpan={4}>
                    <Select
                      value={formData.qaqc[0]?.remarks_c}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "170px" }}
                      onChange={(e) => {
                        handleArrayInput(e, "remarks_c");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>Initial Wt.(g)-A</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.sulphatedIlWtObr}
                      min={0}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "sulphatedIlWtObr");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>B-A</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      value={formData.qaqc[0]?.sulphatedBaObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>RESULTS(%) </td>
                  <td style={{ textAlign: "center" }}>
                    {/* <Input
                      value={formData.qaqc[0]?.sulphatedResObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                      
                    ></Input> */}

                    <div>
                      {/* {formData.qaqc[0] &&
                        formData.qaqc[0]?.sulphatedResObr &&
                        (() => {
                          const value = formData.qaqc[0]?.sulphatedResObr;
                          if (value > 0.4) {
                           message.warning(
                              "Sulphated Obr Result value more than 0.40"
                            );
                          }
                          return value; // Display the value or handle it as needed
                        })()} */}
                      {formData.qaqc[0]?.sulphatedResObr}
                    </div>
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Phy And Che Test IV" key="4">
              <table>
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                  <td style={{ textAlign: "center" }}>Parameter Tested</td>
                  <td style={{ textAlign: "center" }}>Specification</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    Observation
                  </td>
                  <td style={{ textAlign: "center" }}>Remark</td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      width: "94px",
                      padding: "10px",
                    }}
                    rowSpan={4}
                  >
                    15
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Water Soluble Substances % <br /> RESULT = [(N-M) x100]/5 M=
                    Beaker Wt.(g)
                    <br /> N= Beaker Wt.with 5 g. sample's
                    <br /> Water Soluble extract. (g)
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Max. 0.28 For USP Max. 0.35 & BP, EP Max.0.50
                  </td>
                  <td style={{ textAlign: "center" }}>Final Wt.(g)-N</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.WatersolubleFlWtObr}
                      min={0}
                      step={0.01}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "WatersolubleFlWtObr");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td rowSpan={4}>
                    <Select
                      value={formData.qaqc[0]?.remarks_d}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "170px" }}
                      onChange={(e) => {
                        handleArrayInput(e, "remarks_d");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>Initial Wt.(g)-M</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.WatersolubleIlWtObr}
                      min={0}
                      step={0.01}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "WatersolubleIlWtObr");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>N-M</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      value={formData.qaqc[0]?.WatersolubleNmObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>RESULTS(%) </td>
                  <td style={{ textAlign: "center" }}>
                    {/* <Input
                      value={formData.qaqc[0]?.WatersolubleResObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    
                    ></Input> */}
                    <div>
                      {/* {formData.qaqc[0] &&
                        formData.qaqc[0]?.WatersolubleResObr &&
                        (() => {
                          const value = formData.qaqc[0]?.WatersolubleResObr;
                          if (value > 0.5) {
                           message.warning(
                              "Watersoluble Obr Result value more than 0.50"
                            );
                          }
                          return value; // Display the value or handle it as needed
                        })()} */}
                      {formData.qaqc[0]?.WatersolubleResObr}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      width: "94px",
                      padding: "10px",
                    }}
                    rowSpan={4}
                  >
                    16
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Ether Soluble Substances % <br />
                    RESULT = [(Y-X) x100]/ 5 X= Flask Wt.(g) <br /> Y= Flask
                    Wt.with 5 g. sample's
                    <br /> Ether Soluble extract.(g)
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Max.0.50 For USP Max. 0.70{" "}
                  </td>
                  <td style={{ textAlign: "center" }}>Final Wt.(g)-Y</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.EthersolubleFlWtObr}
                      min={0}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "EthersolubleFlWtObr");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td rowSpan={4}>
                    <Select
                      value={formData.qaqc[0]?.remarks_e}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "170px" }}
                      onChange={(e) => {
                        handleArrayInput(e, "remarks_e");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>Initial Wt.(g)-X</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.EthersolubleIlWtObr}
                      min={0}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "EthersolubleIlWtObr");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>Y-X</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      value={formData.qaqc[0]?.EthersolubleYxObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>RESULTS(%)</td>
                  <td style={{ textAlign: "center" }}>
                    {/* <Input
                      value={formData.qaqc[0]?.EthersolubleResObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input> */}

                    <div>
                      {/* {formData.qaqc[0] &&
                        formData.qaqc[0]?.EthersolubleResObr &&
                        (() => {
                          const value = formData.qaqc[0]?.EthersolubleResObr;
                          if (value > 0.7) {
                           message.warning(
                              "Ethersoluble Obr Result value more than 0.70"
                            );
                          }
                          return value; // Display the value or handle it as needed
                        })()} */}
                      {formData.qaqc[0]?.EthersolubleResObr}
                    </div>
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Phy And Che Test V" key="5">
              <table>
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                  <td style={{ textAlign: "center" }}>Parameter Tested</td>
                  <td style={{ textAlign: "center" }}>Specification</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    Observation
                  </td>
                  <td style={{ textAlign: "center" }}>Remark</td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      width: "94px",
                      padding: "10px",
                    }}
                    rowSpan={4}
                  >
                    17
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Loss on drying (%) <br />
                    /Moisture content (%) RESULT =[(K-L) x100]/K, K= Cotton
                    Wt.(g) before dry.
                    <br />
                    L= Cotton Wt.(g) after dry.
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Max.8.0
                  </td>
                  <td style={{ textAlign: "center" }}>Initial Wt.(g)-K</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.LossondryingIlWtObr}
                      min={0}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "LossondryingIlWtObr");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td rowSpan={4}>
                    <Select
                      value={formData.qaqc[0]?.remarks_f}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "remarks_f");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>Final Wt.(g)-L</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.qaqc[0]?.LossondryingFlWtObr}
                      min={0}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "LossondryingFlWtObr");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>K-L</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      value={formData.qaqc[0]?.LossondryingKlObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>RESULTS(%) </td>
                  <td style={{ textAlign: "center" }}>
                    {/* <Input
                      value={formData.qaqc[0]?.LossondryingResObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                      onBlur={handleBlur}
                    ></Input> */}

                    {/* <div>
                      {formData.qaqc[0] &&
                        formData.qaqc[0]?.LossondryingResObr &&
                        (() => {
                          const value = formData.qaqc[0]?.LossondryingResObr;
                          if (value > 8.0) {
                           message.warning(
                              "Lossondrying Obr Result value more than 8.0"
                            );
                          }
                          return value; // Display the value or handle it as needed
                        })()}
                    </div> */}
                    <div>{formData.qaqc[0]?.LossondryingResObr}</div>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={7}>
                    Remark(s):{" "}
                    <Input
                      type="text"
                      value={formData.qaqc[0]?.final_remark}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "final_remark");
                      }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={7}>
                    Note: Parameter No.-9,10 & 11 are for information purpose
                    only.Abbreviation: Max-Maximum, Min-Minimum, mm-millimeter,
                    Wt-weight, g-gram,sec-Seconds, µg/in-Microgram per inch,
                    Avg.-Average, JP - Japanish Pharmacopoeia,BP-British
                    Pharmacopoeia, EP - European Pharmacopoeia, US-United States
                    Pharmacopoeia.A.R. No-Analytical Reference Number.
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={3}>
                    Product :
                    <Select
                      value={formData.qaqc[0]?.product}
                      onChange={(e) => {
                        handleArrayInput(e, "product");
                      }}
                      options={productLov}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{
                        width: "200px",
                        textAlign: "center",
                        marginLeft: "20px",
                      }}
                      disabled={status.fieldStatus}
                    ></Select>{" "}
                  </td>
                  <td style={{ padding: "5px" }} colSpan={4}>
                    Material Passes for the Pharmacopoeia:{" "}
                    <Select
                      value={formData.qaqc[0]?.materila_passes}
                      onChange={(e) => {
                        handleArrayInput(e, "materila_passes");
                      }}
                      options={materiaLov}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{
                        width: "170px",
                        textAlign: "center",
                        marginLeft: "20px",
                      }}
                      disabled={status.fieldStatus}
                    ></Select>{" "}
                  </td>
                </tr>
              </table>
            </TabPane>
            {role == "ROLE_CHEMIST" && (
              <TabPane tab="Reviews" key="6">
                <div style={{ height: "40vh" }}>
                  <table style={{ height: "60%", tableLayout: "fixed" }}>
                    <tr>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "30%" }}
                      >
                        Tested by (Chemist):
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
            <TabPane tab="Micro Test I" key="7">
              <table style={{ tableLayout: "fixed" }}>
                <tr>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan={7}
                  >
                    Test Parameters & Specification{" "}
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    rowSpan={3}
                  >
                    Moisture (%){" "}
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    rowSpan={3}
                  >
                    Test Completion Date{" "}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    rowSpan={2}
                  >
                    Total Viable Count (TVC - cfu/g) (Limit ≤1000){" "}
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    rowSpan={2}
                  >
                    Total Fungal Count (TFC - cfu/g)(Limit ≤ 100)
                  </td>
                  <td
                    style={{ textAlign: "center", padding: "10px" }}
                    colSpan={5}
                  >
                    {" "}
                    Pathogens{" "}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    Gram negative bacteria or Coliform (Should be Absent){" "}
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    {" "}
                    Escherechia coli (E.coli)(Should be Absent)
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    Staphylococcos aures (S.aur )(Should be Absent)
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    Pseudomonas aerogenosa (P.aer) (Should be Absent)
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    Salmonella (Sal.)(Should be Absent)
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Input
                      type="text"
                      value={formData.micro[0].tf_viable_count}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleMicroInput(e.target.value, "tf_viable_count");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleKeyDownNA}
                      onBlur={handleBlurMicro}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Input
                      type="text"
                      value={formData.micro[0].tf_count}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleMicroInput(e.target.value, "tf_count");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleKeyDownNA}
                      onBlur={handleBlurMicro}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={formData.micro[0].p_field_a}
                      options={pathogenLov}
                      onChange={(e) => {
                        handleMicroInput(e, "p_field_a");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={status.fieldStatus}
                      onBlur={handleBlurMicro}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={formData.micro[0].p_field_b}
                      options={pathogenLov}
                      onChange={(e) => {
                        handleMicroInput(e, "p_field_b");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={status.fieldStatus}
                      onBlur={handleBlurMicro}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={formData.micro[0].p_field_c}
                      options={pathogenLov}
                      onChange={(e) => {
                        handleMicroInput(e, "p_field_c");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={status.fieldStatus}
                      onBlur={handleBlurMicro}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={formData.micro[0].p_field_d}
                      options={pathogenLov}
                      onChange={(e) => {
                        handleMicroInput(e, "p_field_d");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={status.fieldStatus}
                      onBlur={handleBlurMicro}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={formData.micro[0].p_field_e}
                      options={pathogenLov}
                      onChange={(e) => {
                        handleMicroInput(e, "p_field_e");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={status.fieldStatus}
                      onBlur={handleBlurMicro}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Input
                      type="text"
                      value={formData.micro[0].moisture}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleMicroInput(e.target.value, "moisture");
                      }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlurMicro}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Input
                      type="date"
                      value={formData.micro[0].completion_date}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleMicroInput(e.target.value, "completion_date");
                      }}
                      min={formData.micro[0].tested}
                      readOnly={
                        status.fieldStatus || formData.micro[0].tested == ""
                      }
                      onBlur={handleBlurMicro}
                    ></Input>
                  </td>
                </tr>
                <br />
                <tr>
                  <td colSpan={5} rowSpan={2}>
                    Note : cfu/g- Colony forming unit per gram.
                  </td>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", padding: "5px" }}
                  >
                    Remark:{" "}
                    <Input
                      type="text"
                      value={formData.micro[0].remarks}
                      style={{ textAlign: "center", width: "70%" }}
                      onChange={(e) => {
                        handleMicroInput(e.target.value, "remarks");
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ textAlign: "center", padding: "5px" }}
                    colSpan={4}
                  >
                    {" "}
                    Product:{" "}
                    <Select
                      value={formData.micro[0].product}
                      options={product3Lov}
                      onChange={(e) => {
                        handleMicroInput(e, "product");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                      style={{ textAlign: "center", width: "70%" }}
                    ></Select>
                  </td>
                </tr>
              </table>
            </TabPane>
            {role == "ROLE_MICROBIOLOGIST" && (
              <TabPane tab="Reviews" key="8">
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
              <TabPane tab="Reviews" key="9">
                <div style={{ height: "40vh" }}>
                  <table style={{ height: "60%", tableLayout: "fixed" }}>
                    <tr>
                      <td
                        colspan="1"
                        style={{ textAlign: "center", width: "30%" }}
                      >
                        Tested by (Chemist):
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

export default QualityControl_AR_f02;
