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

import BleachingHeader from "../Components/BleachingHeader";
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

const QualityControl_f006 = () => {
  const { Option } = Select;
  const { TextArea } = Input;
  const [tabNo, setTabNo] = useState("1");
  const [statusLoader, setStatusLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { bmrNo, sampledate } = location.state;
  const { date } = location.state;
  const initialized = useRef(false);
  const { TabPane } = Tabs;
  const [rejectModal, setRejectModal] = useState(false);
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const today = new Date().toISOString().split("T")[0];
  const [productOptions, setProductOptions] = useState([]);
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [formData, setFormData] = useState({
    bmr_no: bmrNo,
    edge_pattern: "",
    quantity: "",
    ar_no: "",
    fg_no: "",
    sample_date: sampledate,
    tested_on: "",
    format: "",
    reason: "",
    obser: [
      {
        observation: "",
        remarks: "",
        identification_obs: "",
        identification_rmk: "",
        fibre_average_length_obs: "",
        fibre_average_length_rmk: "",
        acidity_ph_obs: "",
        acidity_ph_rmk: "",
        surface_activ_sub_obs: "",
        surface_activ_sub_rmk: "",
        foreign_fibers_obs: "",
        foreign_fibers_rmk: "",
        fluorescence_obs: "",
        fluorescence_rmk: "",
        neps_obs: "",
        neps_rmk: "",
        neps_count_obs: "",
        neps_count_rmk: "",
        uql_w_obs: "",
        uql_w_rmk: "",
        ln_obs: "",
        ln_rmk: "",
        lw_obs: "",
        lw_rmk: "",
        sfc_n_obs: "",
        sfc_n_rmk: "",
        sfc_w_obs: "",
        sfc_w_rmk: "",
        micronaire_obs: "",
        micronaire_rmk: "",
        whiteness_obs: "",
        whiteness_rmk: "",
        extractable_obs: "",
        extractable_rmk: "",
        sulphatedFlWtObr: "",
        sulphatedIlWtObr: "",
        sulphatedBaObr: "",
        sulphatedResObr: "",
        sulphate_rmk: "",
        watersolubleFlWtObr: "",
        watersolubleIlWtObr: "",
        watersolubleNmObr: "",
        watersolubleResObr: "",
        water_soluble_rmk: "",
        ethersolubleFlWtObr: "",
        ethersolubleIlWtObr: "",
        ethersolubleYxObr: "",
        ethersolubleResObr: "",
        ether_soluble_rmk: "",
        abs_1: "",
        abs_2: "",
        abs_3: "",
        abs_4: "",
        abs_5: "",
        abs_6: "",
        abs_avg: "",
        abs_avg_2: "",
        abs_rmk: "",
        abs2_rmk: "",
        moistureFlWtObr: "",
        moistureIlWtObr: "",
        moistureKlObr: "",
        moistureResultsObr: "",
        moisture_rmk: "",
        final_remark: "",
        product: "",
        material_passes: "",
        product_description: "",
      },
    ],
    micro: [
      {
        sampled_on: "",
        tested_on: "",
        total_viable_count: "",
        total_fungal_count: "",
        gram: "",
        escherechia_coli: "",
        stapylococcus: "",
        pseudonymous_aerogenosa: "",
        salmonella: "",
        test_completion_date: "",
        remark: "",
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
  //   if (formData.obser[0]?.sulphatedResObr > 0.4 && tabNo === "3") {
  //     message.info("Sulphated Obr Result value more than 0.40");
  //   }
  // }, [formData.obser[0]?.sulphatedResObr, tabNo]);

  // useEffect(() => {
  //   console.log("tabNo", tabNo);
  //   if (formData.obser[0]?.watersolubleResObr > 0.5 && tabNo === "4") {
  //     message.info("Watersoluble Obr Result value more than 0.50");
  //   }
  // }, [formData.obser[0]?.watersolubleResObr, tabNo]);

  // useEffect(() => {
  //   console.log("tabNo", tabNo);
  //   if (formData.obser[0]?.ethersolubleResObr > 0.7 && tabNo === "4") {
  //     message.info("Ethersoluble Obr Result value more than 0.70");
  //   }
  // }, [formData.obser[0]?.ethersolubleResObr, tabNo]);

  // useEffect(() => {
  //   console.log("tabNo", tabNo);
  //   if (formData.obser[0]?.moistureResultsObr > 0.8 && tabNo === "5") {
  //     message.info("Moisture Obr Result value more than 8.0");
  //   }
  // }, [formData.obser[0]?.moistureResultsObr, tabNo]);

  useEffect(() => {
    const signatureKeys = ["chemist_sign", "micro_sign", "qc_sign"];
    signatureKeys.forEach((key) => {
      const username = formData[key];
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
          `${API.prodUrl}/Precot/api/punching/bmr/fetchProductionDetailsByBatchNumber?batchNo=${bmrNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.length > 0) {
          const data = response.data[0];
          console.log(",,", data);
          setFormData((prevState) => ({
            ...prevState,
            quantity: data.quantity,
            bmr_no: data.batchNumber,
            product_description: data.product,
            edge_pattern: data.edge,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("sample_date bmr", sampledate, bmrNo);
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
            `${API.prodUrl}/Precot/api/chemicaltest/ARF006?bmr=${bmrNo}&date=${sampledate}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("response", response);
          if (response.data.length == 0) {
            if (role == "QA_MANAGER" || role == "QC_MANAGER") {
              message.warning("Chemist or Microbiologist Yet To Approve");
              setTimeout(() => {
                navigate("/Precot/QualityControl/ARF-006/Summary");
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

  useEffect(() => {
    axios
      .get(`${API.prodUrl}/Precot/api/QcForm/ProductDescription`)
      .then((res) => {
        setProductOptions(res.data); // Adjust based on your API structure
      })
      .catch((err) => {
        console.error("Failed to fetch product descriptions:", err);
      });
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
        data.qc_status == "QC_APPROVED")
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
        data.qc_status == "QC_APPROVED")
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
        navigate("/Precot/QualityControl/ARF-006/Summary");
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
        navigate("/Precot/QualityControl/ARF-006/Summary");
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
      apiurl = `${API.prodUrl}/Precot/api/chemicaltest/ARF006/save/finishedReport`;
      payload = {
        test_id: formData.test_id,
        bmr_no: formData.bmr_no,
        quantity: formData.quantity,
        format: "FINISHED PRODUCT ANALYSIS REPORT",
        unit: "UNIT H",
        format_no: "PH-QCL01-AR-F-006",
        ref_sop_no: "PH-QCL01-D-05",
        revision_no: "04",
        tested_on: formData.tested_on,
        edge_pattern: formData.edge_pattern,
        ar_no: formData.ar_no,
        fg_no: formData.fg_no,
        sample_date: formData.sample_date,
        reason: formData.reason,
        product_description: formData.product_description,
        obser: [
          {
            test_id: formData.test_id,
            obs_id: formData.obser[0].obs_id,
            observation: formData.obser[0].observation,
            remarks:
              role == "ROLE_CHEMIST" && formData.obser[0].remarks == ""
                ? ""
                : formData.obser[0].remarks,
            identification_obs: formData.obser[0].identification_obs,
            identification_rmk:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].identification_rmk == ""
                ? ""
                : formData.obser[0].identification_rmk,
            fibre_average_length_obs:
              formData.obser[0].fibre_average_length_obs,
            fibre_average_length_rmk:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].fibre_average_length_rmk == ""
                ? ""
                : formData.obser[0].fibre_average_length_rmk,
            acidity_ph_obs: formData.obser[0].acidity_ph_obs,
            acidity_ph_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].acidity_ph_rmk == ""
                ? ""
                : formData.obser[0].acidity_ph_rmk,
            surface_activ_sub_obs: formData.obser[0].surface_activ_sub_obs,
            surface_activ_sub_rmk:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].surface_activ_sub_rmk == ""
                ? ""
                : formData.obser[0].surface_activ_sub_rmk,
            foreign_fibers_obs: formData.obser[0].foreign_fibers_obs,
            foreign_fibers_rmk:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].foreign_fibers_rmk == ""
                ? ""
                : formData.obser[0].foreign_fibers_rmk,
            fluorescence_obs: formData.obser[0].fluorescence_obs,
            fluorescence_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].fluorescence_rmk == ""
                ? ""
                : formData.obser[0].fluorescence_rmk,
            neps_obs: formData.obser[0].neps_obs,
            neps_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].neps_rmk == ""
                ? ""
                : formData.obser[0].neps_rmk,
            neps_count_obs: formData.obser[0].neps_count_obs,
            neps_count_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].neps_count_rmk == ""
                ? ""
                : formData.obser[0].neps_count_rmk,
            uql_w_obs: formData.obser[0].uql_w_obs,
            uql_w_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].uql_w_rmk == ""
                ? ""
                : formData.obser[0].uql_w_rmk,
            ln_obs: formData.obser[0].ln_obs,
            ln_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].ln_rmk == ""
                ? ""
                : formData.obser[0].ln_rmk,
            lw_obs: formData.obser[0].lw_obs,
            lw_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].lw_rmk == ""
                ? ""
                : formData.obser[0].lw_rmk,
            sfc_n_obs: formData.obser[0].sfc_n_obs,
            sfc_n_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].sfc_n_rmk == ""
                ? ""
                : formData.obser[0].sfc_n_rmk,
            sfc_w_obs: formData.obser[0].sfc_w_obs,
            sfc_w_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].sfc_w_rmk == ""
                ? ""
                : formData.obser[0].sfc_w_rmk,
            micronaire_obs: formData.obser[0].micronaire_obs,
            micronaire_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].micronaire_rmk == ""
                ? ""
                : formData.obser[0].micronaire_rmk,
            whiteness_obs: formData.obser[0].whiteness_obs,
            whiteness_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].whiteness_rmk == ""
                ? ""
                : formData.obser[0].whiteness_rmk,
            extractable_obs: formData.obser[0].extractable_obs,
            extractable_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].extractable_rmk == ""
                ? ""
                : formData.obser[0].extractable_rmk,
            abs_1: formData.obser[0].abs_1,
            abs_2: formData.obser[0].abs_2,
            abs_3: formData.obser[0].abs_3,
            abs_4: formData.obser[0].abs_4,
            abs_5: formData.obser[0].abs_5,
            abs_6: formData.obser[0].abs_6,
            abs_avg: formData.obser[0].abs_avg,
            abs_avg_2: formData.obser[0].abs_avg_2,
            // abs_rmk: formData.obser[0].abs_rmk,
            // abs2_rmk: formData.obser[0].abs2_rmk,
            abs_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].abs_rmk == ""
                ? ""
                : formData.obser[0].abs_rmk,
            abs2_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].abs2_rmk == ""
                ? ""
                : formData.obser[0].abs2_rmk,
            // remark: formData.obser[0].remark,
            sulphatedFlWtObr: formData.obser[0].sulphatedFlWtObr,
            sulphatedIlWtObr: formData.obser[0].sulphatedIlWtObr,
            sulphatedBaObr: formData.obser[0].sulphatedBaObr,
            sulphatedResObr: formData.obser[0].sulphatedResObr,
            sulphate_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].sulphate_rmk == ""
                ? ""
                : formData.obser[0].sulphate_rmk,
            watersolubleFlWtObr: formData.obser[0].watersolubleFlWtObr,
            watersolubleIlWtObr: formData.obser[0].watersolubleIlWtObr,
            watersolubleNmObr: formData.obser[0].watersolubleNmObr,
            watersolubleResObr: formData.obser[0].watersolubleResObr,
            water_soluble_rmk:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].water_soluble_rmk == ""
                ? ""
                : formData.obser[0].water_soluble_rmk,
            ethersolubleFlWtObr: formData.obser[0].ethersolubleFlWtObr,
            ethersolubleIlWtObr: formData.obser[0].ethersolubleIlWtObr,
            ethersolubleYxObr: formData.obser[0].ethersolubleYxObr,
            ethersolubleResObr: formData.obser[0].ethersolubleResObr,
            ether_soluble_rmk:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].ether_soluble_rmk == ""
                ? ""
                : formData.obser[0].ether_soluble_rmk,
            moistureFlWtObr: formData.obser[0].moistureFlWtObr,
            moistureIlWtObr: formData.obser[0].moistureIlWtObr,
            moistureKlObr: formData.obser[0].moistureKlObr,
            moistureResultsObr: formData.obser[0].moistureResultsObr,
            moisture_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].moisture_rmk == ""
                ? ""
                : formData.obser[0].moisture_rmk,
            final_remark:
              role == "ROLE_CHEMIST" && formData.obser[0].final_remark == ""
                ? ""
                : formData.obser[0].final_remark,
            // sub_batch_no: formData.obser[0].sub_batch_no,
            product: formData.obser[0].product,
            material_passes: formData.obser[0].material_passes,
          },
        ],
        micro: [
          {
            test_id: formData.test_id,
            micro_id: formData.micro[0]?.micro_id,
            sampled_on: formData.micro[0].sampled_on,
            tested_on: formData.micro[0].tested_on,
            total_fungal_count:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].total_fungal_count == ""
                ? ""
                : formData.micro[0].total_fungal_count,
            total_viable_count:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].total_viable_count == ""
                ? ""
                : formData.micro[0].total_viable_count,
            gram:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].gram == ""
                ? ""
                : formData.micro[0].gram,
            escherechia_coli:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].escherechia_coli == ""
                ? ""
                : formData.micro[0].escherechia_coli,
            pseudonymous_aerogenosa:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].pseudonymous_aerogenosa == ""
                ? ""
                : formData.micro[0].pseudonymous_aerogenosa,
            salmonella:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].salmonella == ""
                ? ""
                : formData.micro[0].salmonella,
            stapylococcus:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].stapylococcus == ""
                ? ""
                : formData.micro[0].stapylococcus,
            test_completion_date:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].test_completion_date == ""
                ? ""
                : formData.micro[0].test_completion_date,
            moisture:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].moisture == ""
                ? ""
                : formData.micro[0].moisture,
            // sub_batch_no: bmrNo,
            // completion_date: formData.micro[0].completion_date,
            remark:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].remark == ""
                ? ""
                : formData.micro[0].remark,
            product: formData.micro[0].product,
          },
        ],
      };
    } else if (role == "QA_MANAGER" || role == "QC_MANAGER") {
      apiurl = `${API.prodUrl}/Precot/api/chemicaltest/ARF006/approval`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.test_id,
        formatNo: "PH-QCL01-AR-F-006",
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
          navigate("/Precot/QualityControl/ARF-006/Summary");
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
  //     formData.obser[0]?.fibre_average_length_rmk < 10 &&
  //     formData.obser[0]?.fibre_average_length_rmk !== ""
  //   ) {
  //     message.warning("Fibre Average Observation Should be minimum 10");
  //     handleFieldClear("fibre_average_length_rmk");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.acidity_ph_obs < 6 ||
  //       formData.obser[0]?.acidity_ph_obs > 8) &&
  //     formData.obser[0]?.acidity_ph_obs !== ""
  //   ) {
  //     message.warning("Acidity / Alkalinity (pH) Observation Should be 6 to 8");
  //     handleFieldClear("acidity_ph_obs");
  //     isValid = false;
  //   }
  //   if (formData.obser[0]?.neps_obs > 5 && formData.obser[0]?.neps_obs !== "") {
  //     message.warning("Neps Observation Should be maxium 5");
  //     handleFieldClear("neps_obs");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.neps_count_obs > 5000 &&
  //     formData.obser[0]?.neps_count_obs
  //   ) {
  //     message.warning("Entered Neps count/gram Observation value maximum 5000");
  //     handleFieldClear("uql_w_obs");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.uql_w_obs < 12 &&
  //     formData.obser[0]?.uql_w_obs !== ""
  //   ) {
  //     message.warning("Upper Quartile Length Observation Should be minimum 12");
  //     handleFieldClear("uql_w_obs");
  //     isValid = false;
  //   }
  //   if (formData.obser[0]?.ln_obs < 7 && formData.obser[0]?.ln_obs !== "") {
  //     message.warning("Length by number Observation Should be minimum 7");
  //     handleFieldClear("ln_obs");
  //     isValid = false;
  //   }
  //   if (formData.obser[0]?.lw_obs < 10 && formData.obser[0]?.lw_obs !== "") {
  //     message.warning("Length by weight Observation Should be minimum 10");
  //     handleFieldClear("lw_obs");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.sfc_n_obs > 90 &&
  //     formData.obser[0]?.sfc_n_obs !== ""
  //   ) {
  //     message.warning(
  //       "Short fiber Content. by number Observation Should be maximum 90"
  //     );
  //     handleFieldClear("sfc_n_obs");
  //     isValid = false;
  //   }

  //   if (
  //     formData.obser[0]?.micronaire_obs < 2.8 &&
  //     formData.obser[0]?.micronaire_obs !== ""
  //   ) {
  //     message.warning("Micronaire Value Observation Should be minimum 2.8");
  //     handleFieldClear("micronaire_obs");
  //     isValid = false;
  //   }

  //   if (
  //     formData.obser[0]?.whiteness_obs < 80 &&
  //     formData.obser[0]?.whiteness_obs !== ""
  //   ) {
  //     message.warning("Whiteness Indices Observation Should be minimum 80");
  //     handleFieldClear("whiteness_obs");
  //     isValid = false;
  //   }
  //   if (formData.obser[0]?.abs_1 > 10 && formData.obser[0]?.abs_1 !== "") {
  //     message.warning("Sinking time (sec.) Observation 1");
  //     isValid = false;
  //   }
  //   if (formData.obser[0]?.abs_2 > 10 && formData.obser[0]?.abs_2 !== "") {
  //     message.warning("Sinking time (sec.) Observation 2");
  //     isValid = false;
  //   }
  //   if (formData.obser[0]?.abs_3 > 10 && formData.obser[0]?.abs_3 !== "") {
  //     message.warning("Sinking time (sec.) Observation 3");
  //     isValid = false;
  //   }
  //   if (formData.obser[0]?.abs_4 < 20 && formData.obser[0]?.abs_4 !== "") {
  //     message.warning(
  //       "Absorbption Capacity Observation 1 Should be Greater than 20.0"
  //     );
  //     handleFieldClear("abs_4");
  //     isValid = false;
  //   }
  //   if (formData.obser[0]?.abs_5 < 20 && formData.obser[0]?.abs_5 !== "") {
  //     message.warning(
  //       "Absorbption Capacity Observation 2 Should be Greater than 20.0"
  //     );
  //     handleFieldClear("abs_5");
  //     isValid = false;
  //   }
  //   if (formData.obser[0]?.abs_6 < 20 && formData.obser[0]?.abs_6 !== "") {
  //     message.warning(
  //       "Absorbption Capacity Observation 3 Should be Greater than 20.0"
  //     );
  //     handleFieldClear("abs_6");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.sulphatedFlWtObr > 0.4 &&
  //     formData.obser[0]?.sulphatedFlWtObr !== ""
  //   ) {
  //     message.warning("Sulphated Ash Final Wt.(g)-B Should be Less than 0.4");
  //     handleFieldClear("sulphatedFlWtObr");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.sulphatedIlWtObr > 0.4 &&
  //     formData.obser[0]?.sulphatedIlWtObr !== ""
  //   ) {
  //     message.warning("Sulphated Ash Initial Wt.(g)-A Should be Less than 0.2");
  //     handleFieldClear("sulphatedIlWtObr");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.watersolubleFlWtObr > 0.5 &&
  //     formData.obser[0]?.watersolubleFlWtObr !== ""
  //   ) {
  //     message.warning(
  //       "Water Soluble Substances Final Wt.(g)-N Should be Less than 0.50"
  //     );
  //     handleFieldClear("watersolubleFlWtObr");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.watersolubleIlWtObr > 0.5 &&
  //     formData.obser[0]?.watersolubleIlWtObr !== ""
  //   ) {
  //     message.warning(
  //       "Water Soluble Substances Initial Wt.(g)-M Should be Less than 0.50"
  //     );
  //     handleFieldClear("watersolubleIlWtObr");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.ethersolubleFlWtObr > 0.7 &&
  //     formData.obser[0]?.ethersolubleFlWtObr !== ""
  //   ) {
  //     message.warning(
  //       "Ether Soluble Substances Final Wt.(g)-Y Should be Less than 0.70"
  //     );
  //     handleFieldClear("ethersolubleFlWtObr");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.ethersolubleIlWtObr > 0.7 &&
  //     formData.obser[0]?.ethersolubleIlWtObr !== ""
  //   ) {
  //     message.warning(
  //       "Ether Soluble Substances Initial Wt.(g)-X Should be Less than 0.70"
  //     );
  //     handleFieldClear("ethersolubleIlWtObr");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.moistureFlWtObr >= 8.0 &&
  //     formData.obser[0]?.moistureFlWtObr !== ""
  //   ) {
  //     message.warning(
  //       "Loss on drying Initial Wt.(g)-K Should be Less than 8.0"
  //     );
  //     handleFieldClear("moistureFlWtObr");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.moistureIlWtObr > 8.0 &&
  //     formData.obser[0]?.moistureIlWtObr !== ""
  //   ) {
  //     message.warning("Loss on drying Final Wt.(g)-L Should be Less than 8.0");
  //     handleFieldClear("moistureIlWtObr");
  //     isValid = false;
  //   }

  //   return isValid;
  // };

  const handleSubmit = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST") {
      if (role == "ROLE_CHEMIST") {
        const keysToValidate = [
          "ar_no",
          "edge_pattern",
          "quantity",
          "fg_no",
          "sample_date",
          "tested_on",
        ];

        const getName = (key) => {
          switch (key) {
            case "ar_no":
              return " Ar No";
            case "edge_pattern":
              return "Edge Pattern";
            case "quantity":
              return "Quantity";
            case "fg_no":
              return " Fg No";
            case "sample_date":
              return "Sample date";
            case "tested_on":
              return " Tested date";
          }
        };
        for (const key of keysToValidate) {
          if (formData[key] == "") {
            message.warning(`Please Fill ${getName(key)} Field `);
            return;
          }
        }

        const keysToValidateFormFields = [
          "observation",
          "identification_obs",
          "fibre_average_length_obs",
          "acidity_ph_obs",
          "surface_activ_sub_obs",
          "foreign_fibers_obs",
          "fluorescence_obs",
          "neps_obs",
          "neps_count_obs",
          "uql_w_obs",
          "ln_obs",
          "lw_obs",
          "sfc_n_obs",
          "sfc_w_obs",
          "micronaire_obs",
          "whiteness_obs",
          "extractable_obs",
          "abs_1",
          "abs_2",
          "abs_3",
          "abs_4",
          "abs_5",
          "abs_6",
          "sulphatedFlWtObr",
          "sulphatedIlWtObr",
          "watersolubleFlWtObr",
          "watersolubleIlWtObr",
          "ethersolubleFlWtObr",
          "ethersolubleIlWtObr",
          "moistureFlWtObr",
          "moistureIlWtObr",
          "product",
          "material_passes",
        ];

        const getFieldName = (key) => {
          switch (key) {
            case "observation":
              return "Observation Field";
            case "identification_obs":
              return "Identification Test Observation Field";
            case "fibre_average_length_obs":
              return "Fibre Average Length Observation Field";
            case "acidity_ph_obs":
              return "Acidity / Alkalinity Observation Field";
            case "surface_activ_sub_obs":
              return "Surface Activity Substances Observation Field";
            case "foreign_fibers_obs":
              return "Foreign Fibers Observation Field";
            case "fluorescence_obs":
              return "Fluorescence Observation Field";
            case "neps_obs":
              return "Neps Observation Field";
            case "neps_count_obs":
              return "Neps count/gram Observation Field";
            case "uql_w_obs":
              return "Upper Quartile Length Observation Field";
            case "ln_obs":
              return "Length by number Observation Field";
            case "lw_obs":
              return "Length by weight Observation Field";
            case "sfc_n_obs":
              return "Short fiber Content. by number Observation Field";
            case "sfc_w_obs":
              return "Short fiber Content. by wt Observation Field";
            case "micronaire_obs":
              return "Micronaire Value Observation Field";
            case "whiteness_obs":
              return "Whiteness Indices Observation Field";
            case "extractable_obs":
              return "Extractable Colouring Matters Observation Field";
            case "abs_1":
              return "Sinking time (sec.) Observation 1";
            case "abs_2":
              return "Sinking time (sec.) Observation 2";
            case "abs_3":
              return "Sinking time (sec.) Observation 3";
            case "abs_4":
              return "Absorbption Capacity Observation 4";
            case "abs_5":
              return "Absorbption Capacity Observation 5";
            case "abs_6":
              return "Absorbption Capacity Observation 6";
            case "sulphatedFlWtObr":
              return "Sulphated Ash Final Wt";
            case "sulphatedIlWtObr":
              return "Sulphated Ash Initial Wt";
            case "watersolubleFlWtObr":
              return "Water Soluble Substances  Final Wt ";
            case "watersolubleIlWtObr":
              return "Water Soluble Substances Initial Wt";
            case "ethersolubleFlWtObr":
              return "Ether Soluble Substances Final Wt ";
            case "ethersolubleIlWtObr":
              return "Ether Soluble Substances Initial Wt";
            case "moistureFlWtObr":
              return "Moisture Final Wt ";
            case "moistureIlWtObr":
              return "Moisture Initial Wt";
            case "product":
              return "Product ";
            case "material_passes":
              return "Material Passes for the Pharmacopoeia";
          }
        };

        for (const key of keysToValidateFormFields) {
          if (formData.obser[0][key] == "" || formData.obser[0][key] == null) {
            message.warning(`Please Fill ${getFieldName(key)}`);
            return;
          }
        }
        // if (!handleRange()) {
        //   return;
        // }
      }

      if (role == "ROLE_MICROBIOLOGIST") {
        if (
          formData.micro[0].product == "" ||
          formData.micro[0].product == null
        ) {
          message.warning("Please Select Product Lov");
          return;
        }
      }
      succesMsg = "Submitted Successfully ";
      apiurl = `${API.prodUrl}/Precot/api/chemicaltest/ARF006/Submit/finishedReport`;
      payload = {
        test_id: formData.test_id,
        bmr_no: formData.bmr_no,
        quantity: formData.quantity,
        format: "FINISHED PRODUCT ANALYSIS REPORT",
        unit: "UNIT H",
        format_no: "PH-QCL01-AR-F-006",
        ref_sop_no: "PH-QCL01-D-05",
        revision_no: "04",
        tested_on: formData.tested_on,
        edge_pattern: formData.edge_pattern,
        ar_no: formData.ar_no,
        fg_no: formData.fg_no,
        sample_date: formData.sample_date,
        reason: formData.reason,
        product_description: formData.product_description,
        obser: [
          {
            test_id: formData.test_id,
            obs_id: formData.obser[0].obs_id,
            observation: formData.obser[0].observation,
            remarks:
              role == "ROLE_CHEMIST" && formData.obser[0].remarks == ""
                ? "NA"
                : formData.obser[0].remarks,
            identification_obs: formData.obser[0].identification_obs,
            identification_rmk:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].identification_rmk == ""
                ? "NA"
                : formData.obser[0].identification_rmk,
            fibre_average_length_obs:
              formData.obser[0].fibre_average_length_obs,
            fibre_average_length_rmk:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].fibre_average_length_rmk == ""
                ? "NA"
                : formData.obser[0].fibre_average_length_rmk,
            acidity_ph_obs: formData.obser[0].acidity_ph_obs,
            acidity_ph_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].acidity_ph_rmk == ""
                ? "NA"
                : formData.obser[0].acidity_ph_rmk,
            surface_activ_sub_obs: formData.obser[0].surface_activ_sub_obs,
            surface_activ_sub_rmk:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].surface_activ_sub_rmk == ""
                ? "NA"
                : formData.obser[0].surface_activ_sub_rmk,
            foreign_fibers_obs: formData.obser[0].foreign_fibers_obs,
            foreign_fibers_rmk:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].foreign_fibers_rmk == ""
                ? "NA"
                : formData.obser[0].foreign_fibers_rmk,
            fluorescence_obs: formData.obser[0].fluorescence_obs,
            fluorescence_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].fluorescence_rmk == ""
                ? "NA"
                : formData.obser[0].fluorescence_rmk,
            neps_obs: formData.obser[0].neps_obs,
            neps_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].neps_rmk == ""
                ? "NA"
                : formData.obser[0].neps_rmk,
            neps_count_obs: formData.obser[0].neps_count_obs,
            neps_count_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].neps_count_rmk == ""
                ? "NA"
                : formData.obser[0].neps_count_rmk,
            uql_w_obs: formData.obser[0].uql_w_obs,
            uql_w_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].uql_w_rmk == ""
                ? "NA"
                : formData.obser[0].uql_w_rmk,
            ln_obs: formData.obser[0].ln_obs,
            ln_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].ln_rmk == ""
                ? "NA"
                : formData.obser[0].ln_rmk,
            lw_obs: formData.obser[0].lw_obs,
            lw_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].lw_rmk == ""
                ? "NA"
                : formData.obser[0].lw_rmk,
            sfc_n_obs: formData.obser[0].sfc_n_obs,
            sfc_n_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].sfc_n_rmk == ""
                ? "NA"
                : formData.obser[0].sfc_n_rmk,
            sfc_w_obs: formData.obser[0].sfc_w_obs,
            sfc_w_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].sfc_w_rmk == ""
                ? "NA"
                : formData.obser[0].sfc_w_rmk,
            micronaire_obs: formData.obser[0].micronaire_obs,
            micronaire_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].micronaire_rmk == ""
                ? "NA"
                : formData.obser[0].micronaire_rmk,
            whiteness_obs: formData.obser[0].whiteness_obs,
            whiteness_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].whiteness_rmk == ""
                ? "NA"
                : formData.obser[0].whiteness_rmk,
            extractable_obs: formData.obser[0].extractable_obs,
            extractable_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].extractable_rmk == ""
                ? "NA"
                : formData.obser[0].extractable_rmk,
            abs_1: formData.obser[0].abs_1,
            abs_2: formData.obser[0].abs_2,
            abs_3: formData.obser[0].abs_3,
            abs_4: formData.obser[0].abs_4,
            abs_5: formData.obser[0].abs_5,
            abs_6: formData.obser[0].abs_6,
            abs_avg: formData.obser[0].abs_avg,
            abs_avg_2: formData.obser[0].abs_avg_2,
            // abs_rmk: formData.obser[0].abs_rmk,
            // abs2_rmk: formData.obser[0].abs2_rmk,
            abs_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].abs_rmk == ""
                ? ""
                : formData.obser[0].abs_rmk,
            abs2_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].abs2_rmk == ""
                ? ""
                : formData.obser[0].abs2_rmk,
            // remark: formData.obser[0].remark,
            sulphatedFlWtObr: formData.obser[0].sulphatedFlWtObr,
            sulphatedIlWtObr: formData.obser[0].sulphatedIlWtObr,
            sulphatedBaObr: formData.obser[0].sulphatedBaObr,
            sulphatedResObr: formData.obser[0].sulphatedResObr,
            sulphate_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].sulphate_rmk == ""
                ? "NA"
                : formData.obser[0].sulphate_rmk,
            watersolubleFlWtObr: formData.obser[0].watersolubleFlWtObr,
            watersolubleIlWtObr: formData.obser[0].watersolubleIlWtObr,
            watersolubleNmObr: formData.obser[0].watersolubleNmObr,
            watersolubleResObr: formData.obser[0].watersolubleResObr,
            water_soluble_rmk:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].water_soluble_rmk == ""
                ? "NA"
                : formData.obser[0].water_soluble_rmk,
            ethersolubleFlWtObr: formData.obser[0].ethersolubleFlWtObr,
            ethersolubleIlWtObr: formData.obser[0].ethersolubleIlWtObr,
            ethersolubleYxObr: formData.obser[0].ethersolubleYxObr,
            ethersolubleResObr: formData.obser[0].ethersolubleResObr,
            ether_soluble_rmk:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].ether_soluble_rmk == ""
                ? "NA"
                : formData.obser[0].ether_soluble_rmk,
            moistureFlWtObr: formData.obser[0].moistureFlWtObr,
            moistureIlWtObr: formData.obser[0].moistureIlWtObr,
            moistureKlObr: formData.obser[0].moistureKlObr,
            moistureResultsObr: formData.obser[0].moistureResultsObr,
            moisture_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].moisture_rmk == ""
                ? "NA"
                : formData.obser[0].moisture_rmk,
            final_remark:
              role == "ROLE_CHEMIST" && formData.obser[0].final_remark == ""
                ? "NA"
                : formData.obser[0].final_remark,
            sub_batch_no: formData.obser[0].sub_batch_no,
            product: formData.obser[0].product,
            material_passes: formData.obser[0].material_passes,
          },
        ],
        micro: [
          {
            test_id: formData.test_id,
            micro_id: formData.micro[0]?.micro_id,
            sampled_on: formData.micro[0].sampled_on,
            tested_on: formData.micro[0].tested_on,
            total_fungal_count:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].total_fungal_count == ""
                ? "NA"
                : formData.micro[0].total_fungal_count,
            total_viable_count:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].total_viable_count == ""
                ? "NA"
                : formData.micro[0].total_viable_count,
            gram:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].gram == ""
                ? "NA"
                : formData.micro[0].gram,
            escherechia_coli:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].escherechia_coli == ""
                ? "NA"
                : formData.micro[0].escherechia_coli,
            stapylococcus:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].stapylococcus == ""
                ? "NA"
                : formData.micro[0].stapylococcus,
            pseudonymous_aerogenosa:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].pseudonymous_aerogenosa == ""
                ? "NA"
                : formData.micro[0].pseudonymous_aerogenosa,
            salmonella:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].salmonella == ""
                ? "NA"
                : formData.micro[0].salmonella,
            test_completion_date:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.micro[0].test_completion_date == ""
                ? "NA"
                : formData.micro[0].test_completion_date,
            moisture:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].moisture == ""
                ? "NA"
                : formData.micro[0].moisture,
            // sub_batch_no: bmrNo,
            // completion_date: formData.micro[0].completion_date,
            remark:
              role == "ROLE_MICROBIOLOGIST" && formData.micro[0].remark == ""
                ? "NA"
                : formData.micro[0].remark,
            product: formData.micro[0].product,
            // physicalandchemicaltest: formData.micro[0].physicalandchemicaltest,
          },
        ],
      };
    } else if (
      role == "QA_EXECUTIVE" ||
      role == "QA_MANAGER" ||
      role == "QC_MANAGER"
    ) {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Entered the Reason");
        setStatusLoader(false);
        return;
      }
      apiurl = `${API.prodUrl}/Precot/api/chemicaltest/ARF006/approval`;
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
          navigate("/Precot/QualityControl/ARF-006/Summary");
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

  let validation = new Set();

  const handleBlur = () => {
    if (role == "ROLE_CHEMIST") {
      if (status.fieldStatus) {
        return;
      }

      if (
        formData.obser[0]?.fibre_average_length_obs < 10 &&
        formData.obser[0]?.fibre_average_length_obs !== ""
      ) {
        validation.add(
          "Entered Fibre Average Observation value is less than 10"
        );
      }

      if (tabNo == "1") {
        if (
          (formData.obser[0]?.acidity_ph_obs < 6 ||
            formData.obser[0]?.acidity_ph_obs > 8) &&
          formData.obser[0]?.acidity_ph_obs !== ""
        ) {
          validation.add(
            "Entered Acidity / Alkalinity (pH) Observation value is not between be 6 and 8"
          );
        }
        if (
          formData.obser[0]?.neps_obs > 5 &&
          formData.obser[0]?.neps_obs !== ""
        ) {
          validation.add("Entered Neps Observation value greater than 5");
        }
      }

      if (tabNo == "2") {
        if (
          formData.obser[0]?.neps_count_obs > 5000 &&
          formData.obser[0]?.neps_count_obs
        ) {
          validation.add(
            "Entered Neps count/gram Observation value is greater than 5000"
          );
        }
        if (
          formData.obser[0]?.uql_w_obs < 12 &&
          formData.obser[0]?.uql_w_obs !== ""
        ) {
          validation.add(
            "Entered Upper Quartile Length Observation value is less than 12"
          );
        }
        if (formData.obser[0]?.ln_obs < 7 && formData.obser[0]?.ln_obs !== "") {
          validation.add(
            "Entered Length by number Observation value is less than 7"
          );
        }
        if (
          formData.obser[0]?.lw_obs < 10 &&
          formData.obser[0]?.lw_obs !== ""
        ) {
          validation.add(
            "Entered Length by weight Observation value is less than 10"
          );
        }
        if (
          formData.obser[0]?.sfc_n_obs > 90 &&
          formData.obser[0]?.sfc_n_obs !== ""
        ) {
          validation.add(
            "Entered Short fiber Content. by number Observation value is greater than 90"
          );
        }
        if (formData.obser[0]?.sfc_w_obs > 85 && formData.obser[0]?.sfc_w_obs) {
          validation.add(
            "Entered Short fiber Content. by wt Observation value is greater than 85"
          );
        }
        if (
          formData.obser[0]?.micronaire_obs < 2.8 &&
          formData.obser[0]?.micronaire_obs !== ""
        ) {
          validation.add(
            "Entered Micronaire Value Observation value is less than 2.8"
          );
        }
        if (
          formData.obser[0]?.whiteness_obs < 80 &&
          formData.obser[0]?.whiteness_obs !== ""
        ) {
          validation.add(
            "Entered Whiteness Indices Observation value is less than 80"
          );
        }
      }

      if (tabNo == "3") {
        if (formData.obser[0]?.abs_1 > 10 && formData.obser[0]?.abs_1 !== "") {
          validation.add(
            "Entered Sinking time (sec.) Observation 1 value is greater than 10"
          );
        }
        if (formData.obser[0]?.abs_2 > 10 && formData.obser[0]?.abs_2 !== "") {
          validation.add(
            "Entered Sinking time (sec.) Observation 2 value is greater than 10"
          );
        }
        if (formData.obser[0]?.abs_3 > 10 && formData.obser[0]?.abs_3 !== "") {
          validation.add(
            "Entered Sinking time (sec.) Observation 3 value is greater than 10"
          );
        }
        if (formData.obser[0]?.abs_4 < 20 && formData.obser[0]?.abs_4 !== "") {
          validation.add(
            "Entered  Absorbption Capacity Observation 1 value is less than 20.0"
          );
        }
        if (formData.obser[0]?.abs_5 < 20 && formData.obser[0]?.abs_5 !== "") {
          validation.add(
            "Entered Absorbption Capacity Observation 2 value is less than 20.0"
          );
        }
        if (formData.obser[0]?.abs_6 < 20 && formData.obser[0]?.abs_6 !== "") {
          validation.add(
            "Entered Absorbption Capacity Observation 3 value is less than 20.0"
          );
        }
      }

      // if (
      //   formData.obser[0]?.sulphatedFlWtObr > 0.4 &&
      //   formData.obser[0]?.sulphatedFlWtObr !== ""
      // ) {
      //   validation.add("Sulphated Ash Final Wt.(g)-B Should be Less than 0.4");
      //   handleFieldClear("sulphatedFlWtObr");
      // }
      // if (
      //   formData.obser[0]?.sulphatedIlWtObr > 0.4 &&
      //   formData.obser[0]?.sulphatedIlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Sulphated Ash Initial Wt.(g)-A Should be Less than 0.2"
      //   );
      //   handleFieldClear("sulphatedIlWtObr");
      // }
      // if (
      //   formData.obser[0]?.watersolubleFlWtObr > 0.5 &&
      //   formData.obser[0]?.watersolubleFlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Water Soluble Substances Final Wt.(g)-N Should be Less than 0.50"
      //   );
      //   handleFieldClear("watersolubleFlWtObr");
      // }
      // if (
      //   formData.obser[0]?.watersolubleIlWtObr > 0.5 &&
      //   formData.obser[0]?.watersolubleIlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Water Soluble Substances Initial Wt.(g)-M Should be Less than 0.50"
      //   );
      //   handleFieldClear("watersolubleIlWtObr");
      // }
      // if (
      //   formData.obser[0]?.ethersolubleFlWtObr > 0.7 &&
      //   formData.obser[0]?.ethersolubleFlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Ether Soluble Substances Final Wt.(g)-Y Should be Less than 0.70"
      //   );
      //   handleFieldClear("ethersolubleFlWtObr");
      // }
      // if (
      //   formData.obser[0]?.ethersolubleIlWtObr > 0.7 &&
      //   formData.obser[0]?.ethersolubleIlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Ether Soluble Substances Initial Wt.(g)-X Should be Less than 0.70"
      //   );
      //   handleFieldClear("ethersolubleIlWtObr");
      // }
      // if (
      //   formData.obser[0]?.moistureFlWtObr > 8.0 &&
      //   formData.obser[0]?.moistureFlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Loss on drying Initial Wt.(g)-K Should be Less than 8.0"
      //   );
      //   handleFieldClear("moistureFlWtObr");
      // }
      // if (
      //   formData.obser[0]?.moistureIlWtObr > 8.0 &&
      //   formData.obser[0]?.moistureIlWtObr !== ""
      // ) {
      //   validation.add("Loss on drying Final Wt.(g)-L Should be Less than 8.0");
      //   handleFieldClear("moistureIlWtObr");
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
        Number(formData.micro[0].total_viable_count) > 1000 &&
        formData.micro[0].total_viable_count !== ""
      ) {
        validation2.add(
          "Total Viable Count should be less than or equal to 1000"
        );
      }
      if (
        Number(formData.micro[0].total_fungal_count) > 100 &&
        formData.micro[0].total_fungal_count !== ""
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
      ).toFixed(4),
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
        Number(formData.obser[0]?.watersolubleFlWtObr || 0) -
        Number(formData.obser[0]?.watersolubleIlWtObr || 0)
      ).toFixed(4),
      "watersolubleNmObr"
    );
    waterResult =
      ((Number(formData.obser[0]?.watersolubleFlWtObr || 0) -
        Number(formData.obser[0]?.watersolubleIlWtObr || 0)) *
        100) /
      5;
    handleArrayInput(waterResult.toFixed(2), "watersolubleResObr");

    handleArrayInput(
      (
        Number(formData.obser[0]?.ethersolubleFlWtObr || 0) -
        Number(formData.obser[0]?.ethersolubleIlWtObr || 0)
      ).toFixed(4),
      "ethersolubleYxObr"
    );
    EtherResult =
      ((Number(formData.obser[0]?.ethersolubleFlWtObr || 0) -
        Number(formData.obser[0]?.ethersolubleIlWtObr || 0)) *
        100) /
      5;
    handleArrayInput(EtherResult.toFixed(2), "ethersolubleResObr");

    handleArrayInput(
      (
        Number(formData.obser[0]?.moistureIlWtObr || 0) -
        Number(formData.obser[0]?.moistureFlWtObr || 0)
      ).toFixed(4),
      "moistureKlObr"
    );
    lossDryResult =
      ((Number(formData.obser[0]?.moistureIlWtObr || 0) -
        Number(formData.obser[0]?.moistureFlWtObr || 0)) *
        100) /
      (Number(formData.obser[0]?.moistureIlWtObr) || 1);
    handleArrayInput(lossDryResult.toFixed(2), "moistureResultsObr");
  }, [
    formData.obser[0]?.abs_1,
    formData.obser[0]?.abs_3,
    formData.obser[0]?.abs_3,
    formData.obser[0]?.abs_4,
    formData.obser[0]?.abs_5,
    formData.obser[0]?.abs_6,
    formData.obser[0]?.sulphatedFlWtObr,
    formData.obser[0]?.sulphatedIlWtObr,
    formData.obser[0]?.watersolubleFlWtObr,
    formData.obser[0]?.watersolubleIlWtObr,
    formData.obser[0]?.ethersolubleFlWtObr,
    formData.obser[0]?.ethersolubleIlWtObr,
    formData.obser[0]?.moistureFlWtObr,
    formData.obser[0]?.moistureIlWtObr,
  ]);

  const handleBack = () => {
    navigate("/Precot/QualityControl/ARF-006/Summary");
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
      obser: prevState.obser.map((item, i) =>
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

  // const handleSelectText = (e) => {
  //   if (
  //     !/[0-9a-zA-Z._ ]/.test(e.key) &&
  //     e.key !== "Backspace" &&
  //     e.key !== "Delete" &&
  //     e.key !== "ArrowLeft" &&
  //     e.key !== "ArrowRight" &&
  //     e.key !== "Tab"
  //   ) {
  //     e.preventDefault();
  //   }
  // };
  const internalLov = [
    { value: "Intern", label: "Internal" },
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

  return (
    <>
      <BleachingHeader
        formName={"FINISHED PRODUCT ANALYSIS REPORT"}
        formatNo={"PH-QCL01-AR-F-006"}
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
                    value={bmrNo}
                    addonBefore="BMR No.:"
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly
                  />
                  <Input
                    type="text"
                    addonBefore="Edge & Pattern:"
                    value={formData.edge_pattern}
                    max={today}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly
                  />
                </Space>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    type="number"
                    addonBefore="Quantity:"
                    value={formData.quantity}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly
                  />
                  <Input
                    type="text"
                    addonBefore="A.R No:"
                    value={formData.ar_no}
                    onChange={(e) => {
                      handleInput(e.target.value, "ar_no");
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
                    type="number"
                    addonBefore="FG No:"
                    value={formData.fg_no}
                    onChange={(e) => {
                      handleInput(e.target.value, "fg_no");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    // onKeyDown={(e) => {
                    //   handleSelectText(e);
                    // }}
                    readOnly={status.fieldStatus}
                  />
                  <Select
                    showSearch
                    placeholder="Select Product Description"
                    optionFilterProp="children"
                    value={formData.product_description}
                    onChange={(value) =>
                      setFormData({ ...formData, product_description: value })
                    }
                    style={{ width: "100%", textAlign: "center" }}
                    disabled={status.fieldStatus}
                  >
                    {productOptions.map((item) => (
                      <Option
                        key={item.value || item.id}
                        value={item.value || item.name}
                      >
                        {item.label || item.value}
                      </Option>
                    ))}
                  </Select>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Input
                    type="date"
                    addonBefore="Tested Date: "
                    value={formData.tested_on}
                    style={{ textAlign: "center", marginTop: "-28px" }}
                    max={today}
                    onChange={(e) => {
                      handleInput(e.target.value, "tested_on");
                    }}
                    readOnly={status.fieldStatus}
                  />
                  {/* <Input
                    type="text"
                    addonBefore="Product Description:"
                    value={formData.product_description}
                    max={today}
                    onChange={(e) => {
                      handleInput(e.target.value, "product_description");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  /> */}
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
              addonBefore="Sampling On:"
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
              value={formData.micro[0].tested_on}
              onChange={(e) => {
                handleMicroInput(e.target.value, "tested_on");
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
          setTabNo(e);
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
                      value={formData.obser[0].observation}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "observation");
                      }}
                      // onKeyDown={(e) => {
                      //   handleSelectText(e);
                      // }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.remarks}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "remarks");
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
                      value={formData.obser[0].identification_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "identification_obs");
                      }}
                      // onKeyDown={(e) => {
                      //   handleSelectText(e);
                      // }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.identification_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "identification_rmk");
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
                      type="number"
                      value={formData.obser[0]?.fibre_average_length_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={10}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "fibre_average_length_obs"
                        );
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.fibre_average_length_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "fibre_average_length_rmk");
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
                      value={formData.obser[0]?.acidity_ph_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={6}
                      max={8}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "acidity_ph_obs");
                      }}
                      onKeyDown={handleE}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.acidity_ph_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "acidity_ph_rmk");
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
                      value={formData.obser[0]?.surface_activ_sub_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(
                          e.target.value,
                          "surface_activ_sub_obs"
                        );
                      }}
                      // onKeyDown={(e) => {
                      //   handleSelectText(e);
                      // }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.surface_activ_sub_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "surface_activ_sub_rmk");
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
                      value={formData.obser[0]?.foreign_fibers_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "foreign_fibers_obs");
                      }}
                      // onKeyDown={(e) => {
                      //   handleSelectText(e);
                      // }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.foreign_fibers_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "foreign_fibers_rmk");
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
                      value={formData.obser[0]?.fluorescence_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "fluorescence_obs");
                      }}
                      // onKeyDown={(e) => {
                      //   handleSelectText(e);
                      // }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.fluorescence_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "fluorescence_rmk");
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
                      value={formData.obser[0]?.neps_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      max={5}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "neps_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.neps_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "neps_rmk");
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
                  <td style={{ textAlign: "center" }}>Max. 5000</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.neps_count_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "neps_count_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.neps_count_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "neps_count_rmk");
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
                      value={formData.obser[0]?.uql_w_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={12}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "uql_w_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.uql_w_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "uql_w_rmk");
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
                      value={formData.obser[0]?.ln_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={7}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ln_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.ln_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "ln_rmk");
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
                      value={formData.obser[0]?.lw_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={10}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "lw_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.lw_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "lw_rmk");
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
                      value={formData.obser[0]?.sfc_n_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      max={90}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "sfc_n_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.sfc_n_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "sfc_n_rmk");
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
                  <td style={{ textAlign: "center" }}>Max.85</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.sfc_w_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      max={80}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "sfc_w_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.sfc_w_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "sfc_w_rmk");
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
                      value={formData.obser[0]?.micronaire_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={2.8}
                      step={0.1}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "micronaire_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.micronaire_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "micronaire_rmk");
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
                      value={formData.obser[0]?.whiteness_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      min={80}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "whiteness_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.whiteness_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "whiteness_rmk");
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
                      value={formData.obser[0]?.extractable_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(value) => {
                        handleArrayInput(value, "extractable_obs");
                      }}
                      readOnly={status.fieldStatus}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.extractable_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "extractable_rmk");
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
                  <td rowSpan={2} style={{ textAlign: "center", width: "20%" }}>
                    Remark
                  </td>
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
                  <td style={{ textAlign: "center" }}>Avg</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>Sinking time (sec.)</td>
                  <td style={{ textAlign: "center" }}>
                    Max. 8.0 For BP,USP, EP Max. 10
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      value={formData.obser[0]?.abs_1}
                      max={10}
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
                      value={formData.obser[0]?.abs_2}
                      max={10}
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
                      value={formData.obser[0]?.abs_3}
                      max={10}
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
                      value={formData.obser[0]?.abs_avg}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Select
                      value={formData.obser[0]?.abs_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "abs_rmk");
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
                      value={formData.obser[0]?.abs_4}
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
                      value={formData.obser[0]?.abs_5}
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
                      value={formData.obser[0]?.abs_6}
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
                      value={formData.obser[0]?.abs_avg_2}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Select
                      value={formData.obser[0]?.abs2_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "abs2_rmk");
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
                      //   width: "94px",
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
                      value={formData.obser[0]?.sulphatedFlWtObr}
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
                  <td
                    rowSpan={4}
                    style={{ textAlign: "center", width: "110px" }}
                  >
                    <Select
                      value={formData.obser[0]?.sulphate_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "sulphate_rmk");
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
                      value={formData.obser[0]?.sulphatedIlWtObr}
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
                      value={formData.obser[0]?.sulphatedBaObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>RESULTS(%) </td>
                  <td style={{ textAlign: "center" }}>
                    {/* <Input
                      value={formData.obser[0]?.sulphatedResObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input> */}

                    <div>
                      {/* {formData.obser[0] &&
                        tabNo === "3" &&
                        formData.obser[0]?.sulphatedResObr &&
                        (() => {
                          const value = formData.obser[0]?.sulphatedResObr;
                          if (value > 0.4) {
                            message.info(
                              "Sulphated Obr Result value more than 0.40"
                            );
                          }
                          return value; // Display the value or handle it as needed
                        })()} */}
                      {formData.obser[0]?.sulphatedResObr}
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
                  <td style={{ textAlign: "center", width: "120px" }}>
                    Remarks
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      width: "44px",
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
                      value={formData.obser[0]?.watersolubleFlWtObr}
                      min={0}
                      step={0.01}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "watersolubleFlWtObr");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    <Select
                      value={formData.obser[0]?.water_soluble_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "water_soluble_rmk");
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
                      value={formData.obser[0]?.watersolubleIlWtObr}
                      min={0}
                      step={0.01}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "watersolubleIlWtObr");
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
                      value={formData.obser[0]?.watersolubleNmObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>RESULTS(%) </td>
                  <td style={{ textAlign: "center" }}>
                    {/* <Input
                      value={formData.obser[0]?.watersolubleResObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input> */}

                    <div>
                      {/* {formData.obser[0]?.watersolubleResObr &&
                        tabNo == "4" &&
                        formData.obser[0]?.watersolubleResObr &&
                        (() => {
                          const value = formData.obser[0]?.watersolubleResObr;
                          if (value > 0.5) {
                            message.info(
                              "Watersoluble Obr Result value more than 0.50"
                            );
                          }
                          return value; // Display the value or handle it as needed
                        })()} */}
                      {formData.obser[0]?.watersolubleResObr}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                      width: "44px",
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
                      value={formData.obser[0]?.ethersolubleFlWtObr}
                      min={0}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ethersolubleFlWtObr");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    <Select
                      value={formData.obser[0]?.ether_soluble_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "ether_soluble_rmk");
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
                      value={formData.obser[0]?.ethersolubleIlWtObr}
                      min={0}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ethersolubleIlWtObr");
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
                      value={formData.obser[0]?.ethersolubleYxObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>RESULTS(%)</td>
                  <td style={{ textAlign: "center" }}>
                    {/* <Input
                      value={formData.obser[0]?.ethersolubleResObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                      
                    ></Input> */}

                    <div>
                      {/* {formData.obser[0] &&
                        tabNo == "4" &&
                        formData.obser[0]?.ethersolubleResObr &&
                        (() => {
                          const value = formData.obser[0]?.ethersolubleResObr;
                          if (value > 0.7) {
                            message.info(
                              "Ethersoluble Obr Result value more than 0.70"
                            );
                          }
                          return value; // Display the value or handle it as needed
                        })()} */}
                      {formData.obser[0]?.ethersolubleResObr}
                    </div>
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Phy And Che Test IV" key="5">
              <table>
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                  <td style={{ textAlign: "center" }}>Parameter Tested</td>
                  <td style={{ textAlign: "center" }}>Specification</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    Observation
                  </td>
                  <td style={{ textAlign: "center", width: "140px" }}>
                    Remarks
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
                      value={formData.obser[0]?.moistureIlWtObr}
                      min={0}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "moistureIlWtObr");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td rowSpan={4} style={{ textAlign: "center" }}>
                    <Select
                      value={formData.obser[0]?.moisture_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "moisture_rmk");
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
                      value={formData.obser[0]?.moistureFlWtObr}
                      min={0}
                      step={0.1}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "moistureFlWtObr");
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
                      value={formData.obser[0]?.moistureKlObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>RESULTS(%) </td>
                  <td style={{ textAlign: "center" }}>
                    {/* <Input
                      value={formData.obser[0]?.moistureResultsObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                      
                    ></Input> */}

                    <div>
                      {/* {formData.obser[0] &&
                        tabNo == "5" &&
                        formData.obser[0]?.moistureResultsObr &&
                        (() => {
                          const value = formData.obser[0]?.moistureResultsObr;
                          if (value > 8.0) {
                            message.info(
                              "Moisture Obr Result value more than 8.0"
                            );
                          }
                          return value; // Display the value or handle it as needed
                        })()} */}
                      {formData.obser[0]?.moistureResultsObr}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={6}>
                    Remark(s):{" "}
                    <Input
                      type="text"
                      value={formData.obser[0]?.final_remark}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "final_remark");
                      }}
                      // onKeyDown={(e) => {
                      //   handleSelectText(e);
                      // }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={6}>
                    Note: Parameter No.-9,10 & 11 are for information purpose
                    only. Abbreviation: Max-Maximum, Min-Minimum, mm-millimeter,
                    Wt-weight, g-gram,sec-Seconds, µg/in-Microgram per inch,
                    Avg.-Average, JP-Japanish Pharmacopoeia,BP-British
                    Pharmacopoeia,EP-European Pharmacopoeia, US-United States
                    Pharmacopoeia. L-line, P- plain, HC-Honey Comb, SE- Stitched
                    edge, CE- Closed Edge, OE- Open Edge A.R.No- Analytical
                    Reference Number, CE- Closed Edge, OE- Open Edge A.R.No-
                    Analytical Reference Number
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }} colSpan={3}>
                    Product :
                    <Select
                      value={formData.obser[0]?.product}
                      onChange={(e) => {
                        handleArrayInput(e, "product");
                      }}
                      options={productLov}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{
                        width: "170px",
                        textAlign: "center",
                        marginLeft: "20px",
                      }}
                      disabled={status.fieldStatus}
                    ></Select>{" "}
                  </td>
                  <td style={{ padding: "5px" }} colSpan={3}>
                    Material Passes for the Pharmacopoeia:{" "}
                    <Select
                      value={formData.obser[0]?.material_passes}
                      onChange={(e) => {
                        handleArrayInput(e, "material_passes");
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
              <table>
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
                      value={formData.micro[0].total_viable_count}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleMicroInput(e.target.value, "total_viable_count");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleKeyDownNA}
                      onBlur={handleBlurMicro}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Input
                      type="text"
                      value={formData.micro[0].total_fungal_count}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleMicroInput(e.target.value, "total_fungal_count");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleKeyDownNA}
                      onBlur={handleBlurMicro}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={formData.micro[0].gram}
                      options={pathogenLov}
                      onChange={(e) => {
                        handleMicroInput(e, "gram");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={status.fieldStatus}
                      onBlur={handleBlurMicro}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={formData.micro[0].escherechia_coli}
                      options={pathogenLov}
                      onChange={(e) => {
                        handleMicroInput(e, "escherechia_coli");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={status.fieldStatus}
                      onBlur={handleBlurMicro}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={formData.micro[0].stapylococcus}
                      options={pathogenLov}
                      onChange={(e) => {
                        handleMicroInput(e, "stapylococcus");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={status.fieldStatus}
                      onBlur={handleBlurMicro}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={formData.micro[0].pseudonymous_aerogenosa}
                      options={pathogenLov}
                      onChange={(e) => {
                        handleMicroInput(e, "pseudonymous_aerogenosa");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      style={{ textAlign: "center", width: "100%" }}
                      disabled={status.fieldStatus}
                      onBlur={handleBlurMicro}
                    ></Select>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={formData.micro[0].salmonella}
                      options={pathogenLov}
                      onChange={(e) => {
                        handleMicroInput(e, "salmonella");
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
                      value={formData.micro[0].test_completion_date}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleMicroInput(
                          e.target.value,
                          "test_completion_date"
                        );
                      }}
                      readOnly={status.fieldStatus}
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
                      value={formData.micro[0].remark}
                      style={{ textAlign: "center", width: "70%" }}
                      onChange={(e) => {
                        handleMicroInput(e.target.value, "remark");
                      }}
                      // onKeyDown={(e) => {
                      //   handleSelectText(e);
                      // }}
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

export default QualityControl_f006;
