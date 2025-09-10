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

const QualityControl_AR_f04 = () => {
  const { TextArea } = Input;
  const [tabNo, setTabNo] = useState("1");
  const [statusLoader, setStatusLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { invoiceNo } = location.state;
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

  const [messageShown, setMessageShown] = useState(false); // To track if the message is shown

  const [formData, setFormData] = useState({
    // "test_id": 12345,
    invoice_no: "",
    po_no: "",
    ar_no: "",
    description: "",
    supplier: "",
    no_rolls: "",
    quantity: "",
    tested_on: "",
    sample_size: "",
    format: "",
    format_no: "",
    ref_sop_no: "",
    revision_no: "",
    accepted_quantity: "",
    accepted_deviation_quantity: "",
    reject_quantity: "",
    prepared_by: "",
    reason: "",
    obser: [
      {
        // "obs_id": 123,
        // "test_id": 456,
        obr: "",
        remarks: "",
        ide_test_1: "",
        ide_test_2: "",
        ide_test_3: "",
        ide_test_4: "",
        ide_test_5: "",
        ide_test_6: "",
        ide_test_7: "",
        ide_test_8: "",
        ide_test_9: "",
        ide_test_10: "",
        ide_test_rmk: "",
        wid_fab_1: "",
        wid_fab_2: "",
        wid_fab_3: "",
        wid_fab_4: "",
        wid_fab_5: "",
        wid_fab_6: "",
        wid_fab_7: "",
        wid_fab_8: "",
        wid_fab_9: "",
        wid_fab_10: "",
        wid_fab_cal: "",
        wid_rmk: "",
        gsm_1: "",
        gsm_2: "",
        gsm_3: "",
        gsm_4: "",
        gsm_5: "",
        gsm_6: "",
        gsm_7: "",
        gsm_8: "",
        gsm_9: "",
        gsm_10: "",
        gsm_cal: "",
        gsm_rmk: "",
        thk_mm_1: "",
        thk_mm_2: "",
        thk_mm_3: "",
        thk_mm_4: "",
        thk_mm_5: "",
        thk_mm_6: "",
        thk_mm_7: "",
        thk_mm_8: "",
        thk_mm_9: "",
        thk_mm_10: "",
        thk_cal: " ",
        thk_rmk: "",
        ply_obs: "",
        ply_remark: "",
        whiteness_obs: "",
        whiteness_remark: "",
        fluorescence_obs: "",
        fluorescence_remark: "",
        ph_obs: "",
        ph_remark: "",
        starch_obs: "",
        starch_remark: "",
        absorbency_obs: "",
        absorbency_remark: "",
        sinking_time_obs: "",
        sinking_time_remark: "",
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
        moistureFlWtObr: "",
        moistureIlWtObr: "",
        moistureKlObr: "",
        moistureResultsObr: "",
        moisture_rmk: "",
        final_remark: "",
        lot_status: "",
        accept_qty: "",
        rej_qty: "",
        ide_test_avg: "",
      },
    ],
    microbilogytestf004: [
      {
        // "micro_id": 789,
        // "test_id": 456,
        sampled_on: "",
        tested_on: "",
        total_viable_count: "",
        total_fungal_count: "",
        gram: "",
        escherechia_coli: "",
        pseudonymous_aerogenosa: "",
        salmonella: "",
        stapylococcus: "",
        test_completion_date: "",
        remark: "",
        product: "",
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
  //   if (formData.obser[0]?.watersolubleResObr > 0.5 && tabNo === "3") {
  //     message.info("Watersoluble Obr Result value more than 0.50");
  //   }
  // }, [formData.obser[0]?.watersolubleResObr, tabNo]);

  // useEffect(() => {
  //   console.log("tabNo", tabNo);
  //   if (formData.obser[0]?.ethersolubleResObr > 0.5 && tabNo === "4") {
  //     message.info("Ethersoluble Obr Result value more than 0.50");
  //   }
  // }, [formData.obser[0]?.ethersolubleResObr, tabNo]);

  // useEffect(() => {
  //   console.log("tabNo", tabNo);
  //   if (formData.obser[0]?.moistureResultsObr > 8.0 && tabNo === "4") {
  //     message.info("Sulphated Obr Result value more than 8.0");
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
          `${   API.prodUrl}/Precot/api/chemicaltest/ARF004/PDEData?pde=${invoiceNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length > 0) {
          const data = response.data[0];
          setFormData((prevState) => ({
            ...prevState,
            supplier: data.supplier || "NA",
            description: data.description || "NA",
            po_no: data.pono || "NA",
            quantity: data.quantity || "NA",
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
            `${   API.prodUrl}/Precot/api/chemicaltest/ARF004/getByInvoice?invoice=${invoiceNo}`,
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
                navigate("/Precot/QualityControl/AR-F-004/Summary");
              }, [1000]);
            }
          }

          if (response.data.length > 0) {
            const data = response.data[0];
            console.log("forms Data", data);
            statusFunction(data);
            console.log(data);
            setFormData((prevState) => ({
              ...prevState,
              ...data,
              obser:
                data.obser && data.obser.length > 0
                  ? [{ ...prevState.obser[0], ...data.obser[0] }]
                  : prevState.obser,
              microbilogytestf004:
                data.microbilogytestf004 && data.microbilogytestf004.length > 0
                  ? [
                      {
                        ...prevState.microbilogytestf004[0],
                        ...data.microbilogytestf004[0],
                      },
                    ]
                  : prevState.microbilogytestf004,
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
        navigate("/Precot/QualityControl/AR-F-004/Summary");
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
        navigate("/Precot/QualityControl/AR-F-004/Summary");
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
      apiurl = `${   API.prodUrl}/Precot/api/chemicaltest/ARF004/saveChemicalTest`;

      payload = {
        test_id: formData.test_id,
        invoice_no: invoiceNo,
        po_no: formData.po_no,
        ar_no: formData.ar_no,
        description: formData.description,
        supplier: formData.supplier,
        no_rolls: formData.no_rolls,
        quantity: formData.quantity,
        tested_on: formData.tested_on,
        sample_size: formData.sample_size,
        format: "EXFOLIATING FABRIC ANALYSIS REPORT ",
        format_no: "PH-QCL01-AR-F-004",
        ref_sop_no: "PH-QCL01-D-05",
        revision_no: "04",
        accepted_quantity: formData.accepted_quantity,
        accepted_deviation_quantity: formData.accepted_deviation_quantity,
        reject_quantity: formData.reject_quantity,
        prepared_by: formData.prepared_by,
        reason: formData.reason,
        obser: [
          {
            obs_id: formData.obser[0].obs_id,
            test_id: formData.test_id,
            obr: formData.obser[0].obr,
            remarks:
              role == "ROLE_CHEMIST" && formData.obser[0].remarks == ""
                ? "NA"
                : formData.obser[0].remarks,
            ide_test_1: formData.obser[0].ide_test_1,
            ide_test_2: formData.obser[0].ide_test_2,
            ide_test_3: formData.obser[0].ide_test_3,
            ide_test_4: formData.obser[0].ide_test_4,
            ide_test_5: formData.obser[0].ide_test_5,
            ide_test_6: formData.obser[0].ide_test_6,
            ide_test_7: formData.obser[0].ide_test_7,
            ide_test_8: formData.obser[0].ide_test_8,
            ide_test_9: formData.obser[0].ide_test_9,
            ide_test_10: formData.obser[0].ide_test_10,
            ide_test_avg: formData.obser[0].ide_test_avg,
            ide_test_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].ide_test_rmk == ""
                ? "NA"
                : formData.obser[0].ide_test_rmk,
            wid_fab_1: formData.obser[0].wid_fab_1,
            wid_fab_2: formData.obser[0].wid_fab_2,
            wid_fab_3: formData.obser[0].wid_fab_3,
            wid_fab_4: formData.obser[0].wid_fab_4,
            wid_fab_5: formData.obser[0].wid_fab_5,
            wid_fab_6: formData.obser[0].wid_fab_6,
            wid_fab_7: formData.obser[0].wid_fab_7,
            wid_fab_8: formData.obser[0].wid_fab_8,
            wid_fab_9: formData.obser[0].wid_fab_9,
            wid_fab_10: formData.obser[0].wid_fab_10,
            wid_fab_cal: formData.obser[0].wid_fab_cal,
            wid_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].wid_rmk == ""
                ? "NA"
                : formData.obser[0].wid_rmk,
            gsm_1: formData.obser[0].gsm_1,
            gsm_2: formData.obser[0].gsm_2,
            gsm_3: formData.obser[0].gsm_3,
            gsm_4: formData.obser[0].gsm_4,
            gsm_5: formData.obser[0].gsm_5,
            gsm_6: formData.obser[0].gsm_6,
            gsm_7: formData.obser[0].gsm_7,
            gsm_8: formData.obser[0].gsm_8,
            gsm_9: formData.obser[0].gsm_9,
            gsm_10: formData.obser[0].gsm_10,
            gsm_cal: formData.obser[0].gsm_cal,
            gsm_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].gsm_rmk == ""
                ? "NA"
                : formData.obser[0].gsm_rmk,
            thk_mm_1: formData.obser[0].thk_mm_1,
            thk_mm_2: formData.obser[0].thk_mm_2,
            thk_mm_3: formData.obser[0].thk_mm_3,
            thk_mm_4: formData.obser[0].thk_mm_4,
            thk_mm_5: formData.obser[0].thk_mm_5,
            thk_mm_6: formData.obser[0].thk_mm_6,
            thk_mm_7: formData.obser[0].thk_mm_7,
            thk_mm_8: formData.obser[0].thk_mm_8,
            thk_mm_9: formData.obser[0].thk_mm_9,
            thk_mm_10: formData.obser[0].thk_mm_10,
            thk_cal: formData.obser[0].thk_cal,
            thk_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].thk_rmk == ""
                ? "NA"
                : formData.obser[0].thk_rmk,
            ply_obs: formData.obser[0].ply_obs,
            ply_remark:
              role == "ROLE_CHEMIST" && formData.obser[0].ply_remark == ""
                ? "NA"
                : formData.obser[0].ply_remark,
            whiteness_obs: formData.obser[0].whiteness_obs,
            whiteness_remark:
              role == "ROLE_CHEMIST" && formData.obser[0].whiteness_remark == ""
                ? "NA"
                : formData.obser[0].whiteness_remark,
            fluorescence_obs: formData.obser[0].fluorescence_obs,
            fluorescence_remark:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].fluorescence_remark == ""
                ? "NA"
                : formData.obser[0].fluorescence_remark,
            ph_obs: formData.obser[0].ph_obs,
            ph_remark:
              role == "ROLE_CHEMIST" && formData.obser[0].ph_remark == ""
                ? "NA"
                : formData.obser[0].ph_remark,
            starch_obs: formData.obser[0].starch_obs,
            starch_remark:
              role == "ROLE_CHEMIST" && formData.obser[0].starch_remark == ""
                ? "NA"
                : formData.obser[0].starch_remark,
            absorbency_obs: formData.obser[0].absorbency_obs,
            absorbency_remark:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].absorbency_remark == ""
                ? "NA"
                : formData.obser[0].absorbency_remark,
            sinking_time_obs: formData.obser[0].sinking_time_obs,
            sinking_time_remark:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].sinking_time_remark == ""
                ? "NA"
                : formData.obser[0].sinking_time_remark,
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
            lot_status: formData.obser[0].lot_status,
            accept_qty: formData.obser[0].accept_qty,
            rej_qty: formData.obser[0].rej_qty,
            ide_test_avg: formData.obser[0].ide_test_avg,
          },
        ],
        microbilogytestf004: [
          {
            micro_id: formData.microbilogytestf004[0].micro_id,
            test_id: formData.test_id,
            sampled_on: formData.microbilogytestf004[0].sampled_on,
            tested_on: formData.microbilogytestf004[0].tested_on,
            total_viable_count:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].total_viable_count == ""
                ? "NA"
                : formData.microbilogytestf004[0].total_viable_count,
            total_fungal_count:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].total_fungal_count == ""
                ? "NA"
                : formData.microbilogytestf004[0].total_fungal_count,
            gram:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].gram == ""
                ? "NA"
                : formData.microbilogytestf004[0].gram,
            escherechia_coli:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].escherechia_coli == ""
                ? "NA"
                : formData.microbilogytestf004[0].escherechia_coli,
            pseudonymous_aerogenosa:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].pseudonymous_aerogenosa == ""
                ? "NA"
                : formData.microbilogytestf004[0].pseudonymous_aerogenosa,
            salmonella:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].salmonella == ""
                ? "NA"
                : formData.microbilogytestf004[0].salmonella,
            stapylococcus:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].stapylococcus == ""
                ? "NA"
                : formData.microbilogytestf004[0].stapylococcus,
            test_completion_date:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].test_completion_date == ""
                ? "NA"
                : formData.microbilogytestf004[0].test_completion_date,
            remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].remark == ""
                ? "NA"
                : formData.microbilogytestf004[0].remark,
            product:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].product == ""
                ? "NA"
                : formData.microbilogytestf004[0].product,
          },
        ],
      };
    } else if (role == "QA_MANAGER" || role == "QC_MANAGER") {
      apiurl = `${   API.prodUrl}/Precot/api/chemicaltest/ARF004/approve`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.test_id,
        formatNo: "PH-QCL01-AR-F-004",
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
          navigate("/Precot/QualityControl/AR-F-004/Summary");
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
  //     formData.obser[0]?.wid_fab_1 < 1447.8 &&
  //     formData.obser[0]?.wid_fab_1 !== ""
  //   ) {
  //     message.warning(
  //       "	Width Of fabric Observation 1 Should be minimum 1447.8 mm"
  //     );
  //     handleFieldClear("wid_fab_1");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.wid_fab_2 < 1447.8 &&
  //     formData.obser[0]?.wid_fab_2 !== ""
  //   ) {
  //     message.warning(
  //       "	Width Of fabric Observation 2 Should be minimum 1447.8 mm"
  //     );
  //     handleFieldClear("wid_fab_2");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.wid_fab_3 < 1447.8 &&
  //     formData.obser[0]?.wid_fab_3 !== ""
  //   ) {
  //     message.warning(
  //       "	Width Of fabric Observation 3 Should be minimum 1447.8 mm"
  //     );
  //     handleFieldClear("wid_fab_3");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.wid_fab_4 < 1447.8 &&
  //     formData.obser[0]?.wid_fab_4 !== ""
  //   ) {
  //     message.warning(
  //       "	Width Of fabric Observation 4 Should be minimum 1447.8 mm"
  //     );
  //     handleFieldClear("wid_fab_4");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.wid_fab_5 < 1447.8 &&
  //     formData.obser[0]?.wid_fab_5 !== ""
  //   ) {
  //     message.warning(
  //       "	Width Of fabric Observation 5 Should be minimum 1447.8 mm"
  //     );
  //     handleFieldClear("wid_fab_5");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.wid_fab_6 < 1447.8 &&
  //     formData.obser[0]?.wid_fab_6 !== ""
  //   ) {
  //     message.warning(
  //       "	Width Of fabric Observation 6 Should be minimum 1447.8 mm"
  //     );
  //     handleFieldClear("wid_fab_6");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.wid_fab_7 < 1447.8 &&
  //     formData.obser[0]?.wid_fab_7 !== ""
  //   ) {
  //     message.warning(
  //       "	Width Of fabric Observation 7 Should be minimum 1447.8 mm"
  //     );
  //     handleFieldClear("wid_fab_7");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.wid_fab_8 < 1447.8 &&
  //     formData.obser[0]?.wid_fab_8 !== ""
  //   ) {
  //     message.warning(
  //       "	Width Of fabric Observation 8 Should be minimum 1447.8 mm"
  //     );
  //     handleFieldClear("wid_fab_8");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.wid_fab_9 < 1447.8 &&
  //     formData.obser[0]?.wid_fab_9 !== ""
  //   ) {
  //     message.warning(
  //       "	Width Of fabric Observation 9 Should be minimum 1447.8 mm"
  //     );
  //     handleFieldClear("wid_fab_9");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.wid_fab_10 < 1447.8 &&
  //     formData.obser[0]?.wid_fab_10 !== ""
  //   ) {
  //     message.warning(
  //       "	Width Of fabric Observation 10 Should be minimum 1447.8 mm"
  //     );
  //     handleFieldClear("wid_fab_10");
  //     isValid = false;
  //   }

  //   const tenPercent = (162 / 100) * 5;
  //   const lowerBound = 162 - tenPercent; //  153.9
  //   const upperBound = 162 + tenPercent; // 170.1

  //   if (
  //     (formData.obser[0]?.gsm_1 < lowerBound ||
  //       formData.obser[0]?.gsm_1 > upperBound) &&
  //     formData.obser[0]?.gsm_1 !== ""
  //   ) {
  //     message.warning(
  //       "GSM  Observation 1 Should be within the range of " +
  //         lowerBound +
  //         " to " +
  //         upperBound
  //     );
  //     handleFieldClear("gsm_1");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.gsm_2 < lowerBound ||
  //       formData.obser[0]?.gsm_2 > upperBound) &&
  //     formData.obser[0]?.gsm_2 !== ""
  //   ) {
  //     message.warning(
  //       "GSM  Observation 2 Should be within the range of " +
  //         lowerBound +
  //         " to " +
  //         upperBound
  //     );
  //     handleFieldClear("gsm_2");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.gsm_3 < lowerBound ||
  //       formData.obser[0]?.gsm_3 > upperBound) &&
  //     formData.obser[0]?.gsm_3 !== ""
  //   ) {
  //     message.warning(
  //       "GSM  Observation 3 Should be within the range of " +
  //         lowerBound +
  //         " to " +
  //         upperBound
  //     );
  //     handleFieldClear("gsm_3");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.gsm_4 < lowerBound ||
  //       formData.obser[0]?.gsm_4 > upperBound) &&
  //     formData.obser[0]?.gsm_4 !== ""
  //   ) {
  //     message.warning(
  //       "GSM  Observation 4 Should be within the range of " +
  //         lowerBound +
  //         " to " +
  //         upperBound
  //     );
  //     handleFieldClear("gsm_4");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.gsm_5 < lowerBound ||
  //       formData.obser[0]?.gsm_5 > upperBound) &&
  //     formData.obser[0]?.gsm_5 !== ""
  //   ) {
  //     message.warning(
  //       "GSM  Observation 5 Should be within the range of " +
  //         lowerBound +
  //         " to " +
  //         upperBound
  //     );
  //     handleFieldClear("gsm_5");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.gsm_6 < lowerBound ||
  //       formData.obser[0]?.gsm_6 > upperBound) &&
  //     formData.obser[0]?.gsm_6 !== ""
  //   ) {
  //     message.warning(
  //       "GSM  Observation 6 Should be within the range of " +
  //         lowerBound +
  //         " to " +
  //         upperBound
  //     );
  //     handleFieldClear("gsm_6");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.gsm_7 < lowerBound ||
  //       formData.obser[0]?.gsm_7 > upperBound) &&
  //     formData.obser[0]?.gsm_7 !== ""
  //   ) {
  //     message.warning(
  //       "GSM  Observation 7 Should be within the range of " +
  //         lowerBound +
  //         " to " +
  //         upperBound
  //     );
  //     handleFieldClear("gsm_7");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.gsm_8 < lowerBound ||
  //       formData.obser[0]?.gsm_8 > upperBound) &&
  //     formData.obser[0]?.gsm_8 !== ""
  //   ) {
  //     message.warning(
  //       "GSM  Observation 8 Should be within the range of " +
  //         lowerBound +
  //         " to " +
  //         upperBound
  //     );
  //     handleFieldClear("gsm_8");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.gsm_9 < lowerBound ||
  //       formData.obser[0]?.gsm_9 > upperBound) &&
  //     formData.obser[0]?.gsm_9 !== ""
  //   ) {
  //     message.warning(
  //       "GSM  Observation 9 Should be within the range of " +
  //         lowerBound +
  //         " to " +
  //         upperBound
  //     );
  //     handleFieldClear("gsm_9");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.gsm_10 < lowerBound ||
  //       formData.obser[0]?.gsm_10 > upperBound) &&
  //     formData.obser[0]?.gsm_10 !== ""
  //   ) {
  //     message.warning(
  //       "GSM  Observation 10 Should be within the range of " +
  //         lowerBound +
  //         " to " +
  //         upperBound
  //     );
  //     handleFieldClear("gsm_10");
  //     isValid = false;
  //   }

  //   if (
  //     (formData.obser[0]?.thk_mm_1 < 1 || formData.obser[0]?.thk_mm_1 > 1.2) &&
  //     formData.obser[0]?.thk_mm_1 !== ""
  //   ) {
  //     message.warning(
  //       "Thickness  Observation 1 Should be within the range of 1 to 1.2 "
  //     );
  //     handleFieldClear("thk_mm_1");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.thk_mm_2 < 1 || formData.obser[0]?.thk_mm_2 > 1.2) &&
  //     formData.obser[0]?.thk_mm_2 !== ""
  //   ) {
  //     message.warning(
  //       "Thickness  Observation 2 Should be within the range of 1 to 1.2 "
  //     );
  //     handleFieldClear("thk_mm_2");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.thk_mm_3 < 1 || formData.obser[0]?.thk_mm_3 > 1.2) &&
  //     formData.obser[0]?.thk_mm_3 !== ""
  //   ) {
  //     message.warning(
  //       "Thickness  Observation 3 Should be within the range of 1 to 1.2 "
  //     );
  //     handleFieldClear("thk_mm_3");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.thk_mm_4 < 1 || formData.obser[0]?.thk_mm_4 > 1.2) &&
  //     formData.obser[0]?.thk_mm_4 !== ""
  //   ) {
  //     message.warning(
  //       "Thickness  Observation 4 Should be within the range of 1 to 1.2 "
  //     );
  //     handleFieldClear("thk_mm_4");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.thk_mm_5 < 1 || formData.obser[0]?.thk_mm_5 > 1.2) &&
  //     formData.obser[0]?.thk_mm_5 !== ""
  //   ) {
  //     message.warning(
  //       "Thickness  Observation 5 Should be within the range of 1 to 1.2 "
  //     );
  //     handleFieldClear("thk_mm_5");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.thk_mm_6 < 1 || formData.obser[0]?.thk_mm_6 > 1.2) &&
  //     formData.obser[0]?.thk_mm_6 !== ""
  //   ) {
  //     message.warning(
  //       "Thickness  Observation 6 Should be within the range of 1 to 1.2 "
  //     );
  //     handleFieldClear("thk_mm_6");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.thk_mm_7 < 1 || formData.obser[0]?.thk_mm_7 > 1.2) &&
  //     formData.obser[0]?.thk_mm_7 !== ""
  //   ) {
  //     message.warning(
  //       "Thickness  Observation 7 Should be within the range of 1 to 1.2 "
  //     );
  //     handleFieldClear("thk_mm_7");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.thk_mm_8 < 1 || formData.obser[0]?.thk_mm_8 > 1.2) &&
  //     formData.obser[0]?.thk_mm_8 !== ""
  //   ) {
  //     message.warning(
  //       "Thickness  Observation 8 Should be within the range of 1 to 1.2 "
  //     );
  //     handleFieldClear("thk_mm_8");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.thk_mm_9 < 1 || formData.obser[0]?.thk_mm_9 > 1.2) &&
  //     formData.obser[0]?.thk_mm_9 !== ""
  //   ) {
  //     message.warning(
  //       "Thickness  Observation 9 Should be within the range of 1 to 1.2 "
  //     );
  //     handleFieldClear("thk_mm_9");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.thk_mm_10 < 1 ||
  //       formData.obser[0]?.thk_mm_10 > 1.2) &&
  //     formData.obser[0]?.thk_mm_10 !== ""
  //   ) {
  //     message.warning(
  //       "Thickness  Observation 10 Should be within the range of 1 to 1.2 "
  //     );
  //     handleFieldClear("thk_mm_10");
  //     isValid = false;
  //   }

  //   if (
  //     formData.obser[0]?.ply_obs != 3 &&
  //     formData.obser[0]?.ply_obs != 4 &&
  //     formData.obser[0]?.ply_obs !== ""
  //   ) {
  //     message.warning("No. of ply of thread should be either 3 or 4");
  //     handleFieldClear("ply_obs");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.whiteness_obs < 60 &&
  //     formData.obser[0]?.whiteness_obs !== ""
  //   ) {
  //     message.warning("Whiteness Indices Observation should be minimum 60");
  //     handleFieldClear("whiteness_obs");
  //     isValid = false;
  //   }
  //   if (
  //     (formData.obser[0]?.ph_obs < 6 || formData.obser[0]?.ph_obs > 8) &&
  //     formData.obser[0]?.ph_obs !== ""
  //   ) {
  //     message.warning("pH Observation Should be within the range of 6 to 8 ");
  //     handleFieldClear("ph_obs");
  //     isValid = false;
  //   }

  //   if (
  //     formData.obser[0]?.absorbency_obs < 4.0 &&
  //     formData.obser[0]?.absorbency_obs !== ""
  //   ) {
  //     message.warning("Absorbency Observation should be minimum 4.0");
  //     handleFieldClear("absorbency_obs");
  //     isValid = false;
  //   }
  //   if (
  //     formData.obser[0]?.sinking_time_obs > 60 &&
  //     formData.obser[0]?.sinking_time_obs !== ""
  //   ) {
  //     message.warning("Sinking Time Observation should be maximum 60");
  //     handleFieldClear("sinking_time_obs");
  //     isValid = false;
  //   }

  //   // if (
  //   //   formData.obser[0]?.sulphatedFlWtObr > 0.4 &&
  //   //   formData.obser[0]?.sulphatedFlWtObr !== ""
  //   // ) {
  //   //   message.warning("Sulphate Ash content Final should be maximum 0.40");
  //   //   handleFieldClear("sulphatedFlWtObr");
  //   //   isValid = false;
  //   // }
  //   // if (
  //   //   formData.obser[0]?.sulphatedIlWtObr > 0.4 &&
  //   //   formData.obser[0]?.sulphatedIlWtObr !== ""
  //   // ) {
  //   //   message.warning("Sulphate Ash content Initial should be maximum 0.40");
  //   //   handleFieldClear("sulphatedIlWtObr");
  //   //   isValid = false;
  //   // }
  //   // if (
  //   //   formData.obser[0]?.watersolubleFlWtObr > 0.5 &&
  //   //   formData.obser[0]?.watersolubleFlWtObr !== ""
  //   // ) {
  //   //   message.warning("Water Soluble Substances Final should be maximum 0.50");
  //   //   handleFieldClear("watersolubleFlWtObr");
  //   //   isValid = false;
  //   // }
  //   // if (
  //   //   formData.obser[0]?.watersolubleIlWtObr > 0.5 &&
  //   //   formData.obser[0]?.watersolubleIlWtObr !== ""
  //   // ) {
  //   //   message.warning(
  //   //     "Water Soluble Substances Initial should be maximum 0.50"
  //   //   );
  //   //   handleFieldClear("watersolubleIlWtObr");
  //   //   isValid = false;
  //   // }

  //   // if (
  //   //   formData.obser[0]?.ethersolubleFlWtObr > 0.5 &&
  //   //   formData.obser[0]?.ethersolubleFlWtObr !== ""
  //   // ) {
  //   //   message.warning("Ether Soluble Extract Final should be maximum 0.50");
  //   //   handleFieldClear("ethersolubleFlWtObr");
  //   //   isValid = false;
  //   // }

  //   // if (
  //   //   formData.obser[0]?.ethersolubleIlWtObr > 0.5 &&
  //   //   formData.obser[0]?.ethersolubleIlWtObr !== ""
  //   // ) {
  //   //   message.warning("Ether Soluble Extract Initial should be maximum 0.50");
  //   //   handleFieldClear("ethersolubleIlWtObr");
  //   //   isValid = false;
  //   // }

  //   // if (
  //   //   formData.obser[0]?.moistureFlWtObr > 8.0 &&
  //   //   formData.obser[0]?.moistureFlWtObr !== ""
  //   // ) {
  //   //   message.warning("Moisture content Final should be maximum 8.0 ");
  //   //   handleFieldClear("moistureFlWtObr");
  //   //   isValid = false;
  //   // }
  //   // if (
  //   //   formData.obser[0]?.moistureIlWtObr > 8.0 &&
  //   //   formData.obser[0]?.moistureIlWtObr !== ""
  //   // ) {
  //   //   message.warning("Moisture content Initial should be maximum 8.0 ");
  //   //   handleFieldClear("moistureIlWtObr");
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
          "tested_on",
          "no_rolls",
          "sample_size",
        ];

        const getName = (key) => {
          switch (key) {
            case "ar_no":
              return "Ar No";
            case "tested_on":
              return "Tested On";
            case "no_rolls":
              return "No of Rolls";
            case "sample_size":
              return "Sample Size";
          }
        };
        for (const key of keysToValidate) {
          if (formData[key] == "" || formData[key] == null) {
            message.warning(`Please Fill ${getName(key)} Field `);
            return;
          }
        }

        const keysToValidateFormFields = [
          "obr",
          "ide_test_1",
          "ide_test_2",
          "ide_test_3",
          "ide_test_4",
          "ide_test_5",
          "ide_test_6",
          "ide_test_7",
          "ide_test_8",
          "ide_test_9",
          "ide_test_10",
          "wid_fab_1",
          "wid_fab_2",
          "wid_fab_3",
          "wid_fab_4",
          "wid_fab_5",
          "wid_fab_6",
          "wid_fab_7",
          "wid_fab_8",
          "wid_fab_9",
          "wid_fab_10",
          "gsm_1",
          "gsm_2",
          "gsm_3",
          "gsm_4",
          "gsm_5",
          "gsm_6",
          "gsm_7",
          "gsm_8",
          "gsm_9",
          "gsm_10",
          "thk_mm_1",
          "thk_mm_2",
          "thk_mm_3",
          "thk_mm_4",
          "thk_mm_5",
          "thk_mm_6",
          "thk_mm_7",
          "thk_mm_8",
          "thk_mm_9",
          "thk_mm_10",
          "ply_obs",
          "whiteness_obs",
          "fluorescence_obs",
          "ph_obs",
          "starch_obs",
          "absorbency_obs",
          "sinking_time_obs",
          "sulphatedFlWtObr",
          "sulphatedIlWtObr",
          "watersolubleFlWtObr",
          "watersolubleIlWtObr",
          "ethersolubleFlWtObr",
          "ethersolubleIlWtObr",
          "moistureFlWtObr",
          "moistureIlWtObr",
          "lot_status",
        ];

        const getFieldName = (key) => {
          switch (key) {
            case "obr":
              return "Please Fill Identification Test Observation Field";
            case "ide_test_1":
              return "Please Fill Test Roll Number Observation 1 Field";
            case "ide_test_2":
              return "Please Fill Test Roll Number Observation 2 Field";
            case "ide_test_3":
              return "Please Fill Test Roll Number Observation 3 Field";
            case "ide_test_4":
              return "Please Fill Test Roll Number Observation 4 Field";
            case "ide_test_5":
              return "Please Fill Test Roll Number Observation 5 Field";
            case "ide_test_6":
              return "Please Fill Test Roll Number Observation 6 Field";
            case "ide_test_7":
              return "Please Fill Test Roll Number Observation 7 Field";
            case "ide_test_8":
              return "Please Fill Test Roll Number Observation 8 Field";
            case "ide_test_9":
              return "Please Fill Test Roll Number Observation 9 Field";
            case "ide_test_10":
              return "Please Fill Test Roll Number Observation 10 Field";
            case "wid_fab_1":
              return "Please Fill Width Of fabric Observation 1 Field";
            case "wid_fab_2":
              return "Please Fill Width Of fabric Observation 2 Field";
            case "wid_fab_3":
              return "Please Fill Width Of fabric Observation 3 Field";
            case "wid_fab_4":
              return "Please Fill Width Of fabric Observation 4 Field";
            case "wid_fab_5":
              return "Please Fill Width Of fabric Observation 5 Field";
            case "wid_fab_6":
              return "Please Fill Width Of fabric Observation 6 Field";
            case "wid_fab_7":
              return "Please Fill Width Of fabric Observation 7 Field";
            case "wid_fab_8":
              return "Please Fill Width Of fabric Observation 8 Field";
            case "wid_fab_9":
              return "Please Fill Width Of fabric Observation 9 Field";
            case "wid_fab_10":
              return "Please Fill Width Of fabric Observation 10 Field";
            case "gsm_1":
              return "Please Fill GSM Observation 1 Field";
            case "gsm_2":
              return "Please Fill GSM Observation 2 Field";
            case "gsm_3":
              return "Please Fill GSM Observation 3 Field";
            case "gsm_4":
              return "Please Fill GSM Observation 4 Field";
            case "gsm_5":
              return "Please Fill GSM Observation 5 Field";
            case "gsm_6":
              return "Please Fill GSM Observation 6 Field";
            case "gsm_7":
              return "Please Fill GSM Observation 7 Field";
            case "gsm_8":
              return "Please Fill GSM Observation 8 Field";
            case "gsm_9":
              return "Please Fill GSM Observation 9 Field";
            case "gsm_10":
              return "Please Fill GSM Observation 10 Field";
            case "thk_mm_1":
              return "Please Fill Thickness Observation 1 Field";
            case "thk_mm_2":
              return "Please Fill Thickness Observation 2 Field";
            case "thk_mm_3":
              return "Please Fill Thickness Observation 3 Field";
            case "thk_mm_4":
              return "Please Fill Thickness Observation 4 Field";
            case "thk_mm_5":
              return "Please Fill Thickness Observation 5 Field";
            case "thk_mm_6":
              return "Please Fill Thickness Observation 6 Field";
            case "thk_mm_7":
              return "Please Fill Thickness Observation 7 Field";
            case "thk_mm_8":
              return "Please Fill Thickness Observation 8 Field";
            case "thk_mm_9":
              return "Please Fill Thickness Observation 9 Field";
            case "thk_mm_10":
              return "Please Fill Thickness Observation 10 Field";
            case "ply_obs":
              return "Please Fill No. of ply of thread Observation Field";
            case "whiteness_obs":
              return "Please Fill Whiteness Indices Observation Field";
            case "fluorescence_obs":
              return "Please Fill Fluorescence Observation Field";
            case "ph_obs":
              return "Please Fill pH Observation Field";
            case "starch_obs":
              return "Please Fill Presence of Starch Observation Field";
            case "absorbency_obs":
              return "Please Fill Absorbency (g/g) Observation Field";
            case "sinking_time_obs":
              return "Please Fill Sinking Time (Sec) Observation Field";
            case "sulphatedFlWtObr":
              return "Please Fill Sulphate Ash content Final Field";
            case "sulphatedIlWtObr":
              return "Please Fill Sulphate Ash content Initial Field";
            case "watersolubleFlWtObr":
              return "Please Fill Water Soluble Substances Final Field";
            case "watersolubleIlWtObr":
              return "Please Fill Water Soluble Substances Initial Field";
            case "ethersolubleFlWtObr":
              return "Please Fill Ether Soluble Extract Final Field";
            case "ethersolubleIlWtObr":
              return "Please Fill Ether Soluble Extract Initial Field";
            case "moistureFlWtObr":
              return "Please Fill Moisture content  Final Field";
            case "moistureIlWtObr":
              return "Please Fill Moisture content  Initial Field";
            case "lot_status":
              return "Please Fill Lot Status Field";
          }
        };

        for (const key of keysToValidateFormFields) {
          if (formData.obser[0][key] == "" || formData.obser[0][key] == null) {
            message.warning(`${getFieldName(key)}`);
            return;
          }
        }
      }

      if (role == "ROLE_MICROBIOLOGIST") {
        if (!handleMandatory()) {
          return;
        }
      }
      succesMsg = "Submitted Successfully ";
      apiurl = `${   API.prodUrl}/Precot/api/chemicaltest/ARF004/submitChemicalTest`;
      payload = {
        test_id: formData.test_id,
        invoice_no: invoiceNo,
        po_no: formData.po_no,
        ar_no: formData.ar_no,
        description: formData.description,
        supplier: formData.supplier,
        no_rolls: formData.no_rolls,
        quantity: formData.quantity,
        tested_on: formData.tested_on,
        sample_size: formData.sample_size,
        format: "EXFOLIATING FABRIC ANALYSIS REPORT ",
        format_no: "PH-QCL01-AR-F-004",
        ref_sop_no: "PH-QCL01-D-05",
        revision_no: "04",
        accepted_quantity: formData.accepted_quantity,
        accepted_deviation_quantity: formData.accepted_deviation_quantity,
        reject_quantity: formData.reject_quantity,
        prepared_by: formData.prepared_by,
        reason: formData.reason,
        obser: [
          {
            obs_id: formData.obser[0].obs_id,
            test_id: formData.test_id,
            obr: formData.obser[0].obr,
            remarks:
              role == "ROLE_CHEMIST" && formData.obser[0].remarks == ""
                ? "NA"
                : formData.obser[0].remarks,
            ide_test_1: formData.obser[0].ide_test_1,
            ide_test_2: formData.obser[0].ide_test_2,
            ide_test_3: formData.obser[0].ide_test_3,
            ide_test_4: formData.obser[0].ide_test_4,
            ide_test_5: formData.obser[0].ide_test_5,
            ide_test_6: formData.obser[0].ide_test_6,
            ide_test_7: formData.obser[0].ide_test_7,
            ide_test_8: formData.obser[0].ide_test_8,
            ide_test_9: formData.obser[0].ide_test_9,
            ide_test_10: formData.obser[0].ide_test_10,
            ide_test_avg: formData.obser[0].ide_test_avg,
            ide_test_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].ide_test_rmk == ""
                ? "NA"
                : formData.obser[0].ide_test_rmk,
            wid_fab_1: formData.obser[0].wid_fab_1,
            wid_fab_2: formData.obser[0].wid_fab_2,
            wid_fab_3: formData.obser[0].wid_fab_3,
            wid_fab_4: formData.obser[0].wid_fab_4,
            wid_fab_5: formData.obser[0].wid_fab_5,
            wid_fab_6: formData.obser[0].wid_fab_6,
            wid_fab_7: formData.obser[0].wid_fab_7,
            wid_fab_8: formData.obser[0].wid_fab_8,
            wid_fab_9: formData.obser[0].wid_fab_9,
            wid_fab_10: formData.obser[0].wid_fab_10,
            wid_fab_cal: formData.obser[0].wid_fab_cal,
            wid_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].wid_rmk == ""
                ? "NA"
                : formData.obser[0].wid_rmk,
            gsm_1: formData.obser[0].gsm_1,
            gsm_2: formData.obser[0].gsm_2,
            gsm_3: formData.obser[0].gsm_3,
            gsm_4: formData.obser[0].gsm_4,
            gsm_5: formData.obser[0].gsm_5,
            gsm_6: formData.obser[0].gsm_6,
            gsm_7: formData.obser[0].gsm_7,
            gsm_8: formData.obser[0].gsm_8,
            gsm_9: formData.obser[0].gsm_9,
            gsm_10: formData.obser[0].gsm_10,
            gsm_cal: formData.obser[0].gsm_cal,
            gsm_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].gsm_rmk == ""
                ? "NA"
                : formData.obser[0].gsm_rmk,
            thk_mm_1: formData.obser[0].thk_mm_1,
            thk_mm_2: formData.obser[0].thk_mm_2,
            thk_mm_3: formData.obser[0].thk_mm_3,
            thk_mm_4: formData.obser[0].thk_mm_4,
            thk_mm_5: formData.obser[0].thk_mm_5,
            thk_mm_6: formData.obser[0].thk_mm_6,
            thk_mm_7: formData.obser[0].thk_mm_7,
            thk_mm_8: formData.obser[0].thk_mm_8,
            thk_mm_9: formData.obser[0].thk_mm_9,
            thk_mm_10: formData.obser[0].thk_mm_10,
            thk_cal: formData.obser[0].thk_cal,
            thk_rmk:
              role == "ROLE_CHEMIST" && formData.obser[0].thk_rmk == ""
                ? "NA"
                : formData.obser[0].thk_rmk,
            ply_obs: formData.obser[0].ply_obs,
            ply_remark:
              role == "ROLE_CHEMIST" && formData.obser[0].ply_remark == ""
                ? "NA"
                : formData.obser[0].ply_remark,
            whiteness_obs: formData.obser[0].whiteness_obs,
            whiteness_remark:
              role == "ROLE_CHEMIST" && formData.obser[0].whiteness_remark == ""
                ? "NA"
                : formData.obser[0].whiteness_remark,
            fluorescence_obs: formData.obser[0].fluorescence_obs,
            fluorescence_remark:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].fluorescence_remark == ""
                ? "NA"
                : formData.obser[0].fluorescence_remark,
            ph_obs: formData.obser[0].ph_obs,
            ph_remark:
              role == "ROLE_CHEMIST" && formData.obser[0].ph_remark == ""
                ? "NA"
                : formData.obser[0].ph_remark,
            starch_obs: formData.obser[0].starch_obs,
            starch_remark:
              role == "ROLE_CHEMIST" && formData.obser[0].starch_remark == ""
                ? "NA"
                : formData.obser[0].starch_remark,
            absorbency_obs: formData.obser[0].absorbency_obs,
            absorbency_remark:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].absorbency_remark == ""
                ? "NA"
                : formData.obser[0].absorbency_remark,
            sinking_time_obs: formData.obser[0].sinking_time_obs,
            sinking_time_remark:
              role == "ROLE_CHEMIST" &&
              formData.obser[0].sinking_time_remark == ""
                ? "NA"
                : formData.obser[0].sinking_time_remark,
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
            lot_status: formData.obser[0].lot_status,
            accept_qty: formData.obser[0].accept_qty,
            rej_qty: formData.obser[0].rej_qty,
            ide_test_avg: formData.obser[0].ide_test_avg,
          },
        ],
        microbilogytestf004: [
          {
            micro_id: formData.microbilogytestf004[0].micro_id,
            test_id: formData.test_id,
            sampled_on: formData.microbilogytestf004[0].sampled_on,
            tested_on: formData.microbilogytestf004[0].tested_on,
            total_viable_count:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].total_viable_count == ""
                ? "NA"
                : formData.microbilogytestf004[0].total_viable_count,
            total_fungal_count:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].total_fungal_count == ""
                ? "NA"
                : formData.microbilogytestf004[0].total_fungal_count,
            gram:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].gram == ""
                ? "NA"
                : formData.microbilogytestf004[0].gram,
            escherechia_coli:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].escherechia_coli == ""
                ? "NA"
                : formData.microbilogytestf004[0].escherechia_coli,
            pseudonymous_aerogenosa:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].pseudonymous_aerogenosa == ""
                ? "NA"
                : formData.microbilogytestf004[0].pseudonymous_aerogenosa,
            salmonella:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].salmonella == ""
                ? "NA"
                : formData.microbilogytestf004[0].salmonella,
            stapylococcus:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].stapylococcus == ""
                ? "NA"
                : formData.microbilogytestf004[0].stapylococcus,
            test_completion_date:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].test_completion_date == ""
                ? "NA"
                : formData.microbilogytestf004[0].test_completion_date,
            remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].remark == ""
                ? "NA"
                : formData.microbilogytestf004[0].remark,
            product:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbilogytestf004[0].product == ""
                ? "NA"
                : formData.microbilogytestf004[0].product,
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
      apiurl = `${   API.prodUrl}/Precot/api/chemicaltest/ARF004/approve`;
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
          navigate("/Precot/QualityControl/AR-F-004/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };
  const handleMandatory = () => {
    if (formData.microbilogytestf004[0].sampled_on == "") {
      message.warning("Please Select Sampled On");
      return false;
    }
    if (formData.microbilogytestf004[0].tested_on == "") {
      message.warning("Please Select Tested Started On");
      return false;
    }
    if (formData.microbilogytestf004[0].total_viable_count == "") {
      message.warning("Please Enter Total Viable Count");
      return false;
    }
    if (formData.microbilogytestf004[0].total_fungal_count == "") {
      message.warning("Please Enter Total Fungal Count");
      return false;
    }
    if (formData.microbilogytestf004[0].gram == "") {
      message.warning("Please select Gram Negatie");
      return false;
    }
    if (formData.microbilogytestf004[0].escherechia_coli == "") {
      message.warning("Please select Ecoli");
      return false;
    }
    if (formData.microbilogytestf004[0].stapylococcus == "") {
      message.warning("Please select Staphylococcos");
      return false;
    }
    if (formData.microbilogytestf004[0].pseudonymous_aerogenosa == "") {
      message.warning("Please select Pseudomonas");
      return false;
    }
    if (formData.microbilogytestf004[0].salmonella == "") {
      message.warning("Please select Salmonella");
      return false;
    }
    if (formData.microbilogytestf004[0].test_completion_date == "") {
      message.warning("Please Select Test Completion Date");
      return false;
    }
    if (formData.microbilogytestf004[0].product == "") {
      message.warning("Please Select Product");
      return false;
    }

    return true;
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
      microbilogytestf004: [
        {
          ...prevState.microbilogytestf004[0],
          [name]: "",
        },
      ],
    }));
  };

  let validation = new Set();

  const handleBlurGsm = (field) => {
    const tenPercent = (162 / 100) * 5;
    const lowerBound = 162 - tenPercent; // 153.9
    const upperBound = 162 + tenPercent; // 170.1

    const value = formData.obser[0]?.[field];

    if (value !== "" && (value < lowerBound || value > upperBound)) {
      message.warning(
        `Entered ${field.replace(
          "gsm_",
          "Observation "
        )} value is not in the range of ${lowerBound.toFixed(
          1
        )} to ${upperBound.toFixed(1)}`
      );
    }
  };

  const validateField = (value, field) => {
    if (value !== "" && (value < 1 || value > 1.2)) {
      message.warning(
        `Entered Thickness Observation  ${
          field.split("_")[2]
        } value is not in the range of 1 to 1.2`
      );
    }
  };

  const handleBlurThk = (value, field) => {
    validateField(value, field);
  };
  const handleBlurtab2 = () => {
    if (tabNo === "2") {
      if (formData.obser[0].whiteness_obs < 60) {
        message.warning(
          "Entered Whiteness Indices Observation value less than 60"
        );
      }

      if (formData.obser[0].ph_obs < 6 || formData.obser[0].ph_obs > 8) {
        message.warning("Entered pH Observation value not between 6 and 8 ");
      }

      if (formData.obser[0].absorbency_obs < 4.0) {
        message.warning("Entered Absorbency Observation value less than 4.0");
      }

      if (formData.obser[0].sinking_time_obs > 60) {
        message.warning(
          "Entered Sinking Time Observation value greater than 60"
        );
      }
    }
  };

  const handleBlur = (value, fieldName) => {
    if (role == "ROLE_CHEMIST") {
      const minValue = 1447.8;

      if (status.fieldStatus) {
        return;
      }

      if (tabNo == "1") {
        if (value < minValue && value !== "") {
          message.warning(
            `Entered Width Of fabric Observation (${fieldName}) value less than ${minValue} mm`
          );
        }
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
        Number(formData.microbilogytestf004[0].total_viable_count) > 1000 &&
        formData.microbilogytestf004[0].total_viable_count !== ""
      ) {
        validation2.add(
          "Entered Total Viable Count value is greater than 1000"
        );
      }
      if (
        Number(formData.microbilogytestf004[0].total_fungal_count) > 100 &&
        formData.microbilogytestf004[0].total_fungal_count !== ""
      ) {
        validation2.add("Entered Total Fungal Count value is greater than 100");
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
    let testedAvg = 0;
    let fabricAvg = 0;
    let gsmAvg = 0;
    let thicknessAvg = 0;
    let sulphateResult = 0;
    let waterResult = 0;
    let EtherResult = 0;
    let moistureResult = 0;

    const calculateAverage = (values) => {
      const validValues = values.filter(
        (val) => val !== undefined && val !== null && val !== ""
      ); // Exclude invalid values
      const sum = validValues.reduce((acc, val) => acc + Number(val), 0); // Sum up valid values
      return validValues.length > 0 ? (sum / validValues.length).toFixed(2) : 0; // Avoid division by zero
    };

    // Calculate tested average
    testedAvg = calculateAverage([
      formData.obser[0]?.ide_test_1,
      formData.obser[0]?.ide_test_2,
      formData.obser[0]?.ide_test_3,
      formData.obser[0]?.ide_test_4,
      formData.obser[0]?.ide_test_5,
      formData.obser[0]?.ide_test_6,
      formData.obser[0]?.ide_test_7,
      formData.obser[0]?.ide_test_8,
      formData.obser[0]?.ide_test_9,
      formData.obser[0]?.ide_test_10,
    ]);
    handleArrayInput(testedAvg, "ide_test_avg");

    // Calculate fabric average
    fabricAvg = calculateAverage([
      formData.obser[0]?.wid_fab_1,
      formData.obser[0]?.wid_fab_2,
      formData.obser[0]?.wid_fab_3,
      formData.obser[0]?.wid_fab_4,
      formData.obser[0]?.wid_fab_5,
      formData.obser[0]?.wid_fab_6,
      formData.obser[0]?.wid_fab_7,
      formData.obser[0]?.wid_fab_8,
      formData.obser[0]?.wid_fab_9,
      formData.obser[0]?.wid_fab_10,
    ]);
    handleArrayInput(fabricAvg, "wid_fab_cal");

    // Calculate GSM average
    gsmAvg = calculateAverage([
      formData.obser[0]?.gsm_1,
      formData.obser[0]?.gsm_2,
      formData.obser[0]?.gsm_3,
      formData.obser[0]?.gsm_4,
      formData.obser[0]?.gsm_5,
      formData.obser[0]?.gsm_6,
      formData.obser[0]?.gsm_7,
      formData.obser[0]?.gsm_8,
      formData.obser[0]?.gsm_9,
      formData.obser[0]?.gsm_10,
    ]);
    handleArrayInput(gsmAvg, "gsm_cal");

    // Calculate thickness average
    thicknessAvg = calculateAverage([
      formData.obser[0]?.thk_mm_1,
      formData.obser[0]?.thk_mm_2,
      formData.obser[0]?.thk_mm_3,
      formData.obser[0]?.thk_mm_4,
      formData.obser[0]?.thk_mm_5,
      formData.obser[0]?.thk_mm_6,
      formData.obser[0]?.thk_mm_7,
      formData.obser[0]?.thk_mm_8,
      formData.obser[0]?.thk_mm_9,
      formData.obser[0]?.thk_mm_10,
    ]);
    handleArrayInput(thicknessAvg, "thk_cal");

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
        Number(formData.obser[0]?.watersolubleFlWtObr || 0) -
        Number(formData.obser[0]?.watersolubleIlWtObr || 0)
      ).toFixed(2),
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
      ).toFixed(2),
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
      ).toFixed(2),
      "moistureKlObr"
    );
    moistureResult =
      ((Number(formData.obser[0]?.moistureIlWtObr || 0) -
        Number(formData.obser[0]?.moistureFlWtObr || 0)) *
        100) /
      (Number(formData.obser[0]?.moistureIlWtObr) || 1);
    handleArrayInput(moistureResult.toFixed(2), "moistureResultsObr");
  }, [
    formData.obser[0]?.sulphatedFlWtObr,
    formData.obser[0]?.sulphatedIlWtObr,
    formData.obser[0]?.watersolubleFlWtObr,
    formData.obser[0]?.watersolubleIlWtObr,
    formData.obser[0]?.ethersolubleFlWtObr,
    formData.obser[0]?.ethersolubleIlWtObr,
    formData.obser[0]?.moistureIlWtObr,
    formData.obser[0]?.moistureFlWtObr,
    formData.obser[0]?.ide_test_1,
    formData.obser[0]?.ide_test_2,
    formData.obser[0]?.ide_test_3,
    formData.obser[0]?.ide_test_4,
    formData.obser[0]?.ide_test_5,
    formData.obser[0]?.ide_test_6,
    formData.obser[0]?.ide_test_7,
    formData.obser[0]?.ide_test_8,
    formData.obser[0]?.ide_test_9,
    formData.obser[0]?.ide_test_10,
    formData.obser[0]?.wid_fab_1,
    formData.obser[0]?.wid_fab_2,
    formData.obser[0]?.wid_fab_3,
    formData.obser[0]?.wid_fab_4,
    formData.obser[0]?.wid_fab_5,
    formData.obser[0]?.wid_fab_6,
    formData.obser[0]?.wid_fab_7,
    formData.obser[0]?.wid_fab_8,
    formData.obser[0]?.wid_fab_9,
    formData.obser[0]?.wid_fab_10,
    formData.obser[0]?.gsm_1,
    formData.obser[0]?.gsm_2,
    formData.obser[0]?.gsm_3,
    formData.obser[0]?.gsm_4,
    formData.obser[0]?.gsm_5,
    formData.obser[0]?.gsm_6,
    formData.obser[0]?.gsm_7,
    formData.obser[0]?.gsm_8,
    formData.obser[0]?.gsm_9,
    formData.obser[0]?.gsm_10,
    formData.obser[0]?.thk_mm_1,
    formData.obser[0]?.thk_mm_2,
    formData.obser[0]?.thk_mm_3,
    formData.obser[0]?.thk_mm_4,
    formData.obser[0]?.thk_mm_5,
    formData.obser[0]?.thk_mm_6,
    formData.obser[0]?.thk_mm_7,
    formData.obser[0]?.thk_mm_8,
    formData.obser[0]?.thk_mm_9,
    formData.obser[0]?.thk_mm_10,
  ]);

  useEffect(() => {
    if (
      formData.microbilogytestf004[0].tested_on >
        formData.microbilogytestf004[0].test_completion_date &&
      formData.microbilogytestf004[0].tested_on !== "" &&
      formData.microbilogytestf004[0].test_completion_date !== ""
    ) {
      message.warning("Test Completion Date Should Come After Tested Start On");
    }
    if (
      formData.microbilogytestf004[0].tested_on == "" &&
      formData.microbilogytestf004[0].test_completion_date !== ""
    ) {
    }
  }, [
    formData.microbilogytestf004[0].tested_on,
    formData.microbilogytestf004[0].test_completion_date,
  ]);

  const handleBack = () => {
    navigate("/Precot/QualityControl/AR-F-004/Summary");
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
      microbilogytestf004: prevState.microbilogytestf004.map((item, i) =>
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
    { value: "Intern", label: "Internal" },
    { value: "Export", label: "Export" },
  ];
  const remarkLov = [
    { value: "Pass", label: "Pass" },
    { value: "Fail", label: "Fail" },
  ];

  const LotLov = [
    { value: "Accepted", label: "Accepted" },
    { value: "Rejected", label: "Rejected" },
    { value: "Accepted Under Deviation", label: "Accepted Under Deviation" },
    { value: "On Hold", label: "On Hold" },
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

  const setTabNumber = (e) => {
    if (e == "9") {
      return;
    }
    setTabNo(e);
  };

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

  const formatDateWithSlash = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split(".");
    return parts.join("/");
  };

  return (
    <>
      <BleachingHeader
        formName={"EXFOLIATING FABRIC ANALYSIS REPORT "}
        formatNo={"PH-QCL01-AR-F-004"}
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
          <>
            <div style={{ margin: "5px", display: "flex" }}>
              <Row gutter={[8, 8]} align="middle">
                <Col xs={24} sm={12} md={6}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Input
                      type="text"
                      value={formData.supplier}
                      addonBefore="Supplier :"
                      style={{ width: "100%", textAlign: "center" }}
                      readOnly
                    />
                    <Input
                      type="text"
                      value={formData.quantity}
                      addonBefore="Quantity (kg) :"
                      style={{ width: "100%", textAlign: "center" }}
                      readOnly
                    />
                  </Space>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Input
                      type="text"
                      value={formData.description}
                      addonBefore="Description : "
                      style={{ width: "100%", textAlign: "center" }}
                      readOnly
                    />
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
                  </Space>
                </Col>
                <br></br>
                <Col xs={24} sm={12} md={6}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Input
                      type="text"
                      addonBefore="Invoice No./ Date:"
                      value={invoiceNo}
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly
                    />
                    <Input
                      type="date"
                      addonBefore="Tested On:"
                      value={formData.tested_on}
                      style={{ textAlign: "center" }}
                      max={today}
                      onChange={(e) => {
                        handleInput(e.target.value, "tested_on");
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </Space>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Input
                      type="text"
                      value={formData.po_no}
                      addonBefore="PO.No./Date : "
                      style={{ width: "100%", textAlign: "center" }}
                      readOnly={status}
                    />

                    <Input
                      type="number"
                      value={formData.no_rolls}
                      addonBefore="No.of Rolls :"
                      style={{ width: "100%", textAlign: "center" }}
                      onKeyDown={handleE}
                      min={0}
                      onChange={(e) => {
                        handleInput(e.target.value, "no_rolls");
                      }}
                      readOnly={status.fieldStatus}
                    />
                  </Space>
                </Col>
              </Row>
            </div>
            <div>
              <Input
                type="number"
                value={formData.sample_size}
                addonBefore="Sample Size: "
                style={{
                  width: "300px",
                  textAlign: "center",
                  marginLeft: "5px",
                }}
                onKeyDown={handleE}
                min={0}
                onChange={(e) => {
                  handleInput(e.target.value, "sample_size");
                }}
                readOnly={status.fieldStatus}
              />
            </div>
          </>
        )}
      {(role == "ROLE_MICROBIOLOGIST" ||
        role == "QC_MANAGER" ||
        role == "QA_MANAGER") &&
        Number(tabNo) >= 7 && (
          <div style={{ margin: "5px" }}>
            <Input
              type="date"
              addonBefore="Sampled on"
              value={formData.microbilogytestf004[0].sampled_on}
              max={today}
              onChange={(e) => {
                handleMicroInput(e.target.value, "sampled_on");
              }}
              style={{ width: "150px", textAlign: "center" }}
              readOnly={status.fieldStatus}
            />
            <Input
              type="date"
              value={formData.microbilogytestf004[0].tested_on}
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
          setTabNumber(e);
        }}
      >
        {(role == "ROLE_CHEMIST" ||
          role == "QA_MANAGER" ||
          role == "QC_MANAGER") && (
          <>
            <TabPane tab="Phy And Che Test I" key="1">
              <table style={{ width: "95%" }}>
                <tr>
                  <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                  <td style={{ textAlign: "center" }}>Parameter Tested</td>
                  <td style={{ textAlign: "center" }}>Specification</td>
                  <td style={{ textAlign: "center" }} colSpan={11}>
                    Observation
                  </td>
                  <td style={{ textAlign: "center", width: "10%" }}>Remark</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>1</td>
                  <td style={{ textAlign: "center" }}>
                    Identification Test <br />
                    [with 66 % Sulfuric acid]
                  </td>
                  <td style={{ textAlign: "center" }}>100% Cotton</td>
                  <td colspan={11}>
                    <Input
                      type="text"
                      value={formData.obser[0]?.obr}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "obr");
                      }}
                      readOnly={status.fieldStatus}
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
                  <td style={{ textAlign: "center" }} colSpan={3}>
                    Tested Roll Number
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.ide_test_1}
                      style={{ textAlign: "center", width: "100%" }}
                      max={5}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ide_test_1");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.ide_test_2}
                      style={{ textAlign: "center", width: "100%" }}
                      max={5}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ide_test_2");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.ide_test_3}
                      style={{ textAlign: "center", width: "100%" }}
                      max={5}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ide_test_3");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.ide_test_4}
                      style={{ textAlign: "center", width: "100%" }}
                      max={5}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ide_test_4");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.ide_test_5}
                      style={{ textAlign: "center", width: "100%" }}
                      max={5}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ide_test_5");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.ide_test_6}
                      style={{ textAlign: "center", width: "100%" }}
                      max={5}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ide_test_6");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.ide_test_7}
                      style={{ textAlign: "center", width: "100%" }}
                      max={5}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ide_test_7");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.ide_test_8}
                      style={{ textAlign: "center", width: "100%" }}
                      max={5}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ide_test_8");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.ide_test_9}
                      style={{ textAlign: "center", width: "100%" }}
                      max={5}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ide_test_9");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.ide_test_10}
                      style={{ textAlign: "center", width: "100%" }}
                      max={5}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ide_test_10");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center" }}>Average Results</td>
                  <td>
                    <Select
                      value={formData.obser[0]?.ide_test_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "ide_test_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>2</td>
                  <td style={{ textAlign: "center" }}>Width Of fabric</td>
                  <td style={{ textAlign: "center" }}>
                    for 60''.Min. 1520 mm <br />
                    for 57'' <br /> Min.1447.8 mm
                  </td>
                  {[...Array(10).keys()].map((i) => (
                    <td key={i}>
                      <Input
                        type="number"
                        value={formData.obser[0][`wid_fab_${i + 1}`]}
                        style={{ textAlign: "center", width: "100%" }}
                        min={1447.8}
                        step={0.1}
                        onChange={(e) => {
                          handleArrayInput(e.target.value, `wid_fab_${i + 1}`);
                        }}
                        readOnly={status.fieldStatus}
                        onKeyDown={handleE}
                        onBlur={(e) =>
                          handleBlur(e.target.value, `Observation ${i + 1}`)
                        }
                      />
                    </td>
                  ))}
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Input
                      type="text"
                      value={formData.obser[0]?.wid_fab_cal}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.wid_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "wid_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>3</td>
                  <td style={{ textAlign: "center" }}>GSM</td>
                  <td style={{ textAlign: "center" }}>162 ±5%</td>
                  {[...Array(10).keys()].map((i) => (
                    <td key={i}>
                      <Input
                        type="number"
                        value={formData.obser[0][`gsm_${i + 1}`]}
                        style={{ textAlign: "center", width: "100%" }}
                        max={170.1}
                        min={153.9}
                        step={0.1}
                        onChange={(e) =>
                          handleArrayInput(e.target.value, `gsm_${i + 1}`)
                        }
                        onBlur={() => handleBlurGsm(`gsm_${i + 1}`)}
                        readOnly={status.fieldStatus}
                      />
                    </td>
                  ))}
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Input
                      type="text"
                      value={formData.obser[0]?.gsm_cal}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.gsm_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "gsm_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>4</td>
                  <td style={{ textAlign: "center" }}>Thickness (mm)</td>
                  <td style={{ textAlign: "center" }}>1.1 ± 0.1</td>
                  {[...Array(10)].map((_, index) => (
                    <td key={index}>
                      <Input
                        type="number"
                        value={formData.obser[0][`thk_mm_${index + 1}`]}
                        style={{ textAlign: "center", width: "100%" }}
                        max={1.2}
                        min={1}
                        step={0.1}
                        onChange={(e) =>
                          handleArrayInput(
                            e.target.value,
                            `thk_mm_${index + 1}`
                          )
                        }
                        onBlur={(e) =>
                          handleBlurThk(e.target.value, `thk_mm_${index + 1}`)
                        }
                      />
                    </td>
                  ))}
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Input
                      type="text"
                      value={formData.obser[0]?.thk_cal}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.thk_rmk}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "thk_rmk");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>5</td>
                  <td style={{ textAlign: "center" }}>No. of ply of thread</td>
                  <td style={{ textAlign: "center" }}>03 or 04 ply</td>
                  <td colspan={11}>
                    <Input
                      type="number"
                      value={formData.obser[0]?.ply_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ply_obs");
                      }}
                      onKeyDown={handleE}
                      onBlur={(e) => {
                        let value = e.target.value;
                        if (value != 3 && value != 4 && value !== "") {
                          message.warning(
                            "Entered No. of ply of thread value is not 3 or 4"
                          );
                        }
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.ply_remark}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "ply_remark");
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
                  <td style={{ textAlign: "center" }}>6</td>
                  <td style={{ textAlign: "center" }}>
                    Whiteness Indices [Berger 10deg/D65]
                  </td>
                  <td style={{ textAlign: "center" }}>Min.60</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.whiteness_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "whiteness_obs");
                      }}
                      onKeyDown={handleE}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlurtab2}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.whiteness_remark}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "whiteness_remark");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>7</td>
                  <td style={{ textAlign: "center" }}>
                    Fluorescence [Under UV]
                  </td>
                  <td style={{ textAlign: "center" }}>
                    No intense blue fluorescence fibers, a few isolated fibers
                    may pass
                  </td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser[0]?.fluorescence_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "fluorescence_obs");
                      }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.fluorescence_remark}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "fluorescence_remark");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>8</td>
                  <td style={{ textAlign: "center" }}>pH</td>
                  <td style={{ textAlign: "center" }}>6 to 8</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.ph_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      max={8}
                      min={6}
                      step={0.1}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "ph_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlurtab2}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.ph_remark}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "ph_remark");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>9</td>
                  <td style={{ textAlign: "center" }}>Presence of Starch</td>
                  <td style={{ textAlign: "center" }}>No Blue Colour</td>
                  <td>
                    <Input
                      type="text"
                      value={formData.obser[0]?.starch_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "starch_obs");
                      }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.starch_remark}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "starch_remark");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>10</td>
                  <td style={{ textAlign: "center" }}>Absorbency (g/g)</td>
                  <td style={{ textAlign: "center" }}>Min. 4.0</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.absorbency_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "absorbency_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlurtab2}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.absorbency_remark}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "absorbency_remark");
                      }}
                      dropdownStyle={{ textAlign: "center" }}
                      disabled={status.fieldStatus}
                    ></Select>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>11</td>
                  <td style={{ textAlign: "center" }}>Sinking Time (Sec)</td>
                  <td style={{ textAlign: "center" }}>Max. 60</td>
                  <td>
                    <Input
                      type="number"
                      value={formData.obser[0]?.sinking_time_obs}
                      style={{ textAlign: "center", width: "100%" }}
                      max={60}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "sinking_time_obs");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlurtab2}
                    ></Input>
                  </td>
                  <td>
                    <Select
                      value={formData.obser[0]?.sinking_time_remark}
                      options={remarkLov}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e, "sinking_time_remark");
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
                  <td style={{ textAlign: "center", width: "50%" }} colSpan={2}>
                    Observation
                  </td>
                  <td style={{ textAlign: "center", width: "10%" }}>Remark</td>
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
                    12
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Sulphate Ash content (%)
                    <br />
                    RESULT = [(B-A) x100]/ 5 <br /> A= Crucible Wt.(g) <br />
                    B= Crucible Wt with 5 g.
                    <br /> sample`s Ash Content. (g)
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Max. 0.40
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
                  <td rowSpan={4}>
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
                  <td style={{ textAlign: "center" }}>RESULTS</td>
                  <td style={{ textAlign: "center" }}>
                    {/* <Input
                      value={formData.obser[0]?.sulphatedResObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input> */}

                    <div>
                      {/* {formData.obser[0]?.sulphatedResObr &&
                      formData.obser[0]?.sulphatedResObr > 0.4 ? (
                        <div>
                          {formData.obser[0]?.sulphatedResObr}
                          {message.info(
                            "Sulphated Obr Result value more than 0.40"
                          )}
                        </div>
                      ) : (
                        <div>{formData.obser[0]?.sulphatedResObr}</div>
                      )} */}
                      {formData.obser[0]?.sulphatedResObr}
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
                    13
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Water Soluble Substances (%)
                    <br /> RESULT = [(N-M) x100]/ 5 <br /> M= Beaker Wt.(g) N=
                    Beaker <br /> Wt.with 5 g. <br /> sample's Water Soluble
                    extract. (g)
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Max. 0.50
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
                  <td rowSpan={4}>
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
                  <td style={{ textAlign: "center" }}>RESULTS</td>
                  <td style={{ textAlign: "center" }}>
                    {/* <Input
                      value={formData.obser[0]?.watersolubleResObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                   
                    ></Input> */}

                    <div>
                      {/* {formData.obser[0]?.watersolubleResObr &&
                      formData.obser[0]?.watersolubleResObr > 0.5 ? (
                        <div>
                          {formData.obser[0]?.watersolubleResObr}
                          {message.info(
                            "Watersoluble Obr Result value more than 0.50"
                          )}
                        </div>
                      ) : (
                        <div>{formData.obser[0]?.watersolubleResObr}</div>
                      )} */}
                      {formData.obser[0]?.watersolubleResObr}
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
                  <td style={{ textAlign: "center", width: "10%" }}>Remark</td>
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
                    14
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Ether Soluble Extract (%) <br />
                    RESULT = [(Y-X) x100]/ 5 X= Flask Wt.(g) <br />
                    Y= Flask Wt with 5 g. <br />
                    sample`s Ether soluble extract.(g)
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Max. 0.50
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
                  <td rowSpan={4}>
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
                  <td style={{ textAlign: "center" }}>RESULTS</td>
                  <td style={{ textAlign: "center" }}>
                    {/* <Input
                      value={formData.obser[0]?.ethersolubleResObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                       
                    ></Input> */}

                    {/* {formData.obser[0]?.ethersolubleResObr &&
                    formData.obser[0]?.ethersolubleResObr > 0.5 ? (
                      <div>
                        {formData.obser[0]?.ethersolubleResObr}
                        {message.info(
                          "Ethersoluble Obr Result value more than 0.50"
                        )}
                      </div>
                    ) : (
                      <div>{formData.obser[0]?.ethersolubleResObr}</div>
                    )} */}
                    <div>{formData.obser[0]?.ethersolubleResObr}</div>
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
                    15
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={4}>
                    Moisture content (%) <br />
                    RESULT = [(K-L) x100]/ K,
                    <br /> K= Cotton Wt.(g) before dry.
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
                  <td rowSpan={4}>
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
                  <td style={{ textAlign: "center" }}>RESULTS</td>
                  <td style={{ textAlign: "center" }}>
                    {/* <Input
                      value={formData.obser[0]?.moistureResultsObr}
                      style={{ textAlign: "center", width: "100%" }}
                      readOnly
                    ></Input> */}

                    {/* 
                    {formData.obser[0]?.moistureResultsObr &&
                    formData.obser[0]?.moistureResultsObr > 8.0 ? (
                      <div>
                        {formData.obser[0]?.moistureResultsObr}
                        {message.info(
                          "Sulphated Obr Result value more than 8.0"
                        )}
                      </div>
                    ) : (
                      <div>{formData.obser[0]?.moistureResultsObr}</div>
                    )} */}
                    <div>{formData.obser[0]?.moistureResultsObr}</div>
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Phy And Che Test V" key="5">
              <table>
                <tr>
                  <td style={{ padding: "5px" }}>
                    Remark(s):{" "}
                    <Input
                      type="text"
                      value={formData.obser[0]?.final_remark}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleArrayInput(e.target.value, "final_remark");
                      }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
                      }}
                      readOnly={status.fieldStatus}
                      onBlur={handleBlur}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>
                    (Note: Parameter No.10 & 11 are for information purpose
                    only) . Abbreviations: A.R. No- Analytical Reference Number,
                    No.-Number, Max.-Maximum, Min.-Minimum, mm-millimeter,
                    Wt.-weight,kg-Kilo gram, g.-gram, sec.-Seconds
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", textAlign: "center" }}>
                    <span style={{ float: "left" }}>
                      Lot Status :{" "}
                      <Select
                        value={formData.obser[0]?.lot_status}
                        options={LotLov}
                        style={{ textAlign: "center", width: "200px" }}
                        onChange={(e) => {
                          handleArrayInput(e, "lot_status");
                        }}
                        dropdownStyle={{ textAlign: "center" }}
                        disabled={status.fieldStatus}
                        onBlur={handleBlur}
                      ></Select>{" "}
                    </span>
                    <span style={{ marginLeft: "70px" }}>
                      Accepted Quantity(Kg):
                      <Input
                        type="number"
                        value={formData.accepted_quantity}
                        min={0}
                        max={0.4}
                        step={0.1}
                        style={{ textAlign: "center", width: "150px" }}
                        onChange={(e) => {
                          handleInput(e.target.value, "accepted_quantity");
                        }}
                        readOnly={status.fieldStatus}
                        onKeyDown={handleE}
                        onBlur={handleBlur}
                      ></Input>
                    </span>
                    <span style={{ float: "right", marginLeft: "20px" }}>
                      Accepted Under Deviation Quantity (Kg):{" "}
                      <Input
                        type="number"
                        value={formData.obser[0]?.accept_qty}
                        min={0}
                        max={0.4}
                        step={0.1}
                        style={{ textAlign: "center", width: "150px" }}
                        onChange={(e) => {
                          handleArrayInput(e.target.value, "accept_qty");
                        }}
                        readOnly={status.fieldStatus}
                        onKeyDown={handleE}
                        onBlur={handleBlur}
                      ></Input>
                    </span>
                    <br></br>
                    <br />
                    <span>
                      Rejected Quantity(Kg):{" "}
                      <Input
                        type="number"
                        value={formData.obser[0]?.rej_qty}
                        min={0}
                        max={0.4}
                        step={0.1}
                        style={{ textAlign: "center", width: "150px" }}
                        onChange={(e) => {
                          handleArrayInput(e.target.value, "rej_qty");
                        }}
                        readOnly={status.fieldStatus}
                        onKeyDown={handleE}
                        onBlur={handleBlur}
                      ></Input>
                    </span>{" "}
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
                        Approved By (QC Head):
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
                    colSpan={2}
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
                      type="number"
                      value={formData.microbilogytestf004[0].total_viable_count}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleMicroInput(e.target.value, "total_viable_count");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlurMicro}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Input
                      type="number"
                      value={formData.microbilogytestf004[0].total_fungal_count}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleMicroInput(e.target.value, "total_fungal_count");
                      }}
                      readOnly={status.fieldStatus}
                      onKeyDown={handleE}
                      onBlur={handleBlurMicro}
                    ></Input>
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    <Select
                      value={formData.microbilogytestf004[0].gram}
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
                      value={formData.microbilogytestf004[0].escherechia_coli}
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
                      value={formData.microbilogytestf004[0].stapylococcus}
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
                      value={
                        formData.microbilogytestf004[0].pseudonymous_aerogenosa
                      }
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
                      value={formData.microbilogytestf004[0].salmonella}
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
                  <td
                    style={{ textAlign: "center", padding: "5px" }}
                    colSpan={2}
                  >
                    <Input
                      type="date"
                      value={
                        formData.microbilogytestf004[0].test_completion_date
                      }
                      min={formData.microbilogytestf004[0].tested_on}
                      style={{ textAlign: "center", width: "100%" }}
                      onChange={(e) => {
                        handleMicroInput(
                          e.target.value,
                          "test_completion_date"
                        );
                      }}
                      readOnly={
                        status.fieldStatus ||
                        formData.microbilogytestf004[0].tested_on == ""
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
                      value={formData.microbilogytestf004[0].remark}
                      style={{ textAlign: "center", width: "70%" }}
                      onChange={(e) => {
                        handleMicroInput(e.target.value, "remark");
                      }}
                      onKeyDown={(e) => {
                        handleSelectText(e);
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
                      value={formData.microbilogytestf004[0].product}
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
                        Approved By (QC Head):
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
                        Approved By (QC Head):
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

export default QualityControl_AR_f04;
