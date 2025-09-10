/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Button,
  message,
  Select,
  Tooltip,
  Tabs,
  Input,
  Space,
  Row,
  Col,
} from "antd";
import { IoSave, IoPrint } from "react-icons/io5";
import { GrDocumentStore } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BleachingHeader from "../Components/BleachingHeader.js";
import BleachingTail from "../Components/BleachingTail.js";
import { GoArrowLeft } from "react-icons/go";
import "../index.css";
import approveIcon from "../Assests/outlined-approve.svg";
import rejectIcon from "../Assests/outlined-reject.svg";
import { TiTick } from "react-icons/ti";
import { AiFillCloseSquare } from "react-icons/ai";
import API from "../baseUrl.json";
import { Table, Modal, DatePicker, Form, Drawer, Menu, Avatar } from "antd";
import { FaLock } from "react-icons/fa6";
import { TbMenuDeep } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import PrecotSidebar from "../Components/PrecotSidebar.js";

const { Option } = Select;
const { TabPane } = Tabs;

const QualityControl_f26F = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const { customerName, productName } = location.state;
  const [rejectModal, setRejectModal] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [statusLoader, setStatusLoader] = useState(false);
  const [formData, setFormData] = useState({
    formatNo: "",
    revisionNo: "",
    formatName: "",
    refSopNo: "",
    date: "",
    product: "",
    customer: "",
    invoice_no: "",
    lot_no: "",
    reference_no: "",
    pattern: "",
    edge: "",
    gsm_standard: "",
    gsm_actual: "",
    gsm_remarks: "",
    no_of_pads_standard: "",
    no_of_pads_actual: "",
    no_of_pads_remarks: "",
    gross_weight_actual: "",
    gross_weight_remarks: "",
    gross_weight_standard: "",
    packing_material: "",
    fibre_actual: "",
    fibre_remarks: "",
    surface_actual: "",
    surface_remarks: "",
    sinking_actual: "",
    sinking_remarks: "",
    absorption_actual: "",
    absorption_remarks: "",
    whiteness_actual: "",
    whiteness_remarks: "",
    ph_actual: "",
    ph_remarks: "",
    loss_actual: "",
    loss_remarks: "",
    fluorescence_actual: "",
    fluorescence_remarks: "",
    water_actual: "",
    water_remarks: "",
    ether_actual: "",
    ether_remarks: "",
    sulphated_actual: "",
    sulphated_remarks: "",
    foreign_fibres_actual: "",
    foreign_fibres_remarks: "",
    neps_actual: "",
    neps_remarks: "",
    average_actual: "",
    average_remarks: "",
    extractable_actual: "",
    extractable_remarks: "",
    total_viable_standard: "",
    total_viable_actual: "",
    total_viable_remarks: "",
    total_fungal_standard: "",
    total_vfungal_actual: "",
    total_fungal_remarks: "",
    pathogen_standard: "",
    pathogen_spec: "",
    bile_actual: "",
    bile_remarks: "",
    escherichia_actual: "",
    escherichia_remarks: "",
    staphylococcus_actual: "",
    staphylococcus_remarks: "",
    pseudomonas_actual: "",
    pseudomonas_remarks: "",
    salmonella_actual: "",
    salmonella_remarks: "",
    burkholderia_actual: "",
    burkholderia_remarks: "",
    reason: "",
  });
  const today = new Date().toISOString().split("T")[0];
  const token = localStorage.getItem("token");
  const [eSign, setESign] = useState({
    chemist_sign: "",
    qa_exe_sign: "",
    manager_sign: "",
  });
  const initialized = useRef(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate("/Precot/QualityControl/F-026F/Summary");
  };
  const rejectFlow = () => {
    setRejectModal(true);
  };
  const handleCancel = () => {
    setRejectModal(false);
    setFormData((formData) => ({
      ...formData,
      reason: "",
    }));
  };
  const handleRejectReason = (e) => {
    const text = e.target.value;
    setFormData((formData) => ({
      ...formData,
      reason: text,
    }));
  };
  useEffect(() => {
    const signatureKeys = ["chemist_sign", "qa_exe_sign", "manager_sign"];
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
  }, [
    token,
    formData.chemist_sign,
    formData.qa_exe_sign,
    formData.manager_sign,
  ]);

  useEffect(() => {
    if (!initialized.current) {
      if (
        role == "QA_EXECUTIVE" ||
        role == "QA_MANAGER" ||
        role == "QC_MANAGER"
      ) {
        setStatus((prevState) => ({
          ...prevState,
          fieldStatus: true,
        }));
      }
      initialized.current = true;
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${   API.prodUrl}/Precot/api/QcForm/getInfusedCottonPadsF26F?product=${productName}&customer=${customerName}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length == 0) {
            if (role == "QA_EXECUTIVE") {
              message.warning("Chemist yet To approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-026F/Summary");
              }, 1000);
              return;
            }
            if (role == "QA_MANAGER" || role == "QC_MANAGER") {
              message.warning("Chemist or QA Executive yet to approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-026F/Summary");
              }, 1000);
              return;
            }
          }
          if (response.data.length > 0) {
            const data = response.data[0];
            if (
              role == "QA_EXECUTIVE" &&
              data.chemist_status != "CHEMIST_APPROVED"
            ) {
              message.warning("Chemist yet to approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-026F/Summary");
              }, 1000);
              return;
            }
            if (
              (role == "QA_MANAGER" || role == "QC_MANAGER") &&
              (data.chemist_status != "CHEMIST_APPROVED" ||
                data.qa_exe_status != "QA_EXE_APPROVED")
            ) {
              message.warning("Chemist or QA Executive yet to approve!");
              setTimeout(() => {
                navigate("/Precot/QualityControl/F-026F/Summary");
              }, 1000);
              return;
            }
            statusFunction(data);
            setFormData(data);
          }
        } catch (error) {
          console.log(error);
          message.error(error.response.data.message);
        }
      };
      fetchData();
    }
  }, []);
  const statusFunction = (responseData) => {
    if (
      role == "ROLE_CHEMIST" &&
      responseData.chemist_status == "CHEMIST_APPROVED"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_CHEMIST" &&
      responseData.chemist_status == "CHEMIST_APPROVED" &&
      (responseData.qa_exe_status == "QA_EXE_APPROVED" ||
        responseData.qa_exe_status == "WAITING_FOR_APPROVAL") &&
      (responseData.manager_status == "QC_APPROVED" ||
        responseData.manager_status == "QA_APPROVED" ||
        responseData.manager_status == "WAITING_FOR_APPROVAL" ||
        responseData.manager_status == "")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
        fieldStatus: true,
      }));
    }
    if (
      role == "QA_EXECUTIVE" &&
      (responseData.manager_status == "QA_REJECTED" ||
        responseData.manager_status == "QC_REJECTED")
    ) {
      message.warning("Chemist Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-026F/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      role == "QA_EXECUTIVE" &&
      responseData.qa_exe_status == "QA_EXE_APPROVED" &&
      (responseData.manager_status == "QC_APPROVED" ||
        responseData.manager_status == "QA_APPROVED" ||
        responseData.manager_status == "WAITING_FOR_APPROVAL")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      role == "QA_EXECUTIVE" &&
      responseData.qa_exe_status == "QA_EXE_REJECTED"
    ) {
      message.warning("Chemist Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-026F/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      responseData.qa_exe_status == "WAITING_FOR_APPROVAL"
    ) {
      message.warning("QA Executive Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-026F/Summary");
      }, 1000);
    }
    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (responseData.manager_status == "QC_APPROVED" ||
        responseData.manager_status == "QA_APPROVED")
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      (responseData.manager_status == "QC_REJECTED" ||
        responseData.manager_status == "QA_REJECTED")
    ) {
      message.warning("Chemist Yet To Approve");
      setTimeout(() => {
        navigate("/Precot/QualityControl/F-026F/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  const validateField = (value, min, max, errorMessage) => {
    if (
      (Number(value) < min || (max !== null && Number(value) > max)) &&
      value !== ""
    ) {
      message.warning(errorMessage);
      return false;
    }
    return true;
  };

  const runValidations = () => {
    // ---------- Test Type 1 ---------------
    const gsmStandard = Number(formData.gsm_standard);
    const tenPercent = (gsmStandard / 100) * 10;
    const lowerBound = gsmStandard - tenPercent;
    const upperBound = gsmStandard + tenPercent;

    if (
      !validateField(
        formData.gsm_actual,
        lowerBound,
        upperBound,
        "GSM actual should be within " + lowerBound + " to " + upperBound
      )
    )
      return;

    const padsStandard = Number(formData.no_of_pads_standard);
    const tenPercentPads = (padsStandard / 100) * 10;
    const lowerBoundPads = padsStandard - tenPercentPads;
    const upperBoundPads = padsStandard + tenPercentPads;

    if (
      !validateField(
        formData.no_of_pads_actual,
        lowerBoundPads,
        upperBoundPads,
        "No. of pads per bag actual should be within " +
          lowerBoundPads +
          " to " +
          upperBoundPads
      )
    )
      return;

    const grossStandard = Number(formData.gross_weight_standard);
    const lowerBoundGross = grossStandard - 0;
    const upperBoundGross = grossStandard + 2;
    if (
      !validateField(
        formData.gross_weight_actual,
        lowerBoundGross,
        upperBoundGross,
        "Gross weight of the bag with pads (g) actual should be within " +
          lowerBoundGross +
          " to " +
          upperBoundGross
      )
    )
      return;

    if (
      !validateField(
        formData.sinking_actual,
        0,
        9,
        "Sinking time actual Should be within 0 to 9"
      )
    )
      return;
    if (
      !validateField(
        formData.absorption_actual,
        23,
        null,
        "Absorption Capacity actual Should be greater than or equal to 23"
      )
    )
      return;

    // ---------- Test Type 2 ---------------
    if (
      !validateField(
        formData.whiteness_actual,
        80,
        null,
        "Whiteness Index actual Should be greater than or equal to 80"
      )
    )
      return;
    if (
      !validateField(
        formData.ph_actual,
        6,
        8,
        "pH actual Should be within 6 to 8"
      )
    )
      return;
    if (
      !validateField(
        formData.loss_actual,
        0,
        7.9,
        "Loss on drying actual Should be less than 8.0"
      )
    )
      return;
    if (
      !validateField(
        formData.water_actual,
        null,
        0.49,
        "Water Soluble Substance actual Should be less than 0.50"
      )
    )
      return;

    // ---------- Test Type 3 ---------------
    if (
      !validateField(
        formData.ether_actual,
        null,
        0.49,
        "Ether Soluble Substance actual Should be less than 0.50"
      )
    )
      return;
    if (
      !validateField(
        formData.sulphated_actual,
        null,
        0.39,
        "Sulphated ash actual Should be less than 0.40"
      )
    )
      return;
    if (
      !validateField(
        formData.average_actual,
        10,
        null,
        "Average Fibre length actual Should be greater than 10"
      )
    )
      return;
    if (
      !validateField(
        formData.total_viable_actual,
        null,
        999,
        "Total viable count actual Should be less than 1000"
      )
    )
      return;
    if (
      !validateField(
        formData.total_vfungal_actual,
        null,
        99,
        "Total fungal count actual Should be less than 100"
      )
    )
      return;

    return true;
  };

  const handleSave = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_CHEMIST") {
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${   API.prodUrl}/Precot/api/QcForm/SaveInfusedCottonPadsF26F`;
      payload = {
        formatNo: "PH-QCL01/F-026A",
        revisionNo: "01",
        formatName: "CERTIFICATE OF ANALYSIS FOR INFUSED COTTON PADS",
        refSopNo: "PH-QCL01-D-05",
        date: formData.date,
        product: productName,
        customer: customerName,
        invoice_no: formData.invoice_no,
        lot_no: formData.lot_no,
        reference_no: formData.reference_no,
        pattern: formData.pattern,
        edge: formData.edge,
        gsm_standard: formData.gsm_standard,
        gsm_actual: formData.gsm_actual,
        gsm_remarks: formData.gsm_remarks || "NA",
        no_of_pads_standard: formData.no_of_pads_standard,
        no_of_pads_actual: formData.no_of_pads_actual,
        no_of_pads_remarks: formData.no_of_pads_remarks || "NA",
        gross_weight_standard: formData.gross_weight_standard,
        gross_weight_actual: formData.gross_weight_actual,
        gross_weight_remarks: formData.gross_weight_remarks || "NA",
        packing_material: formData.packing_material,
        fibre_actual: formData.fibre_actual,
        fibre_remarks: formData.fibre_remarks || "NA",
        surface_actual: formData.surface_actual,
        surface_remarks: formData.surface_remarks || "NA",
        sinking_actual: formData.sinking_actual,
        sinking_remarks: formData.sinking_remarks || "NA",
        absorption_actual: formData.absorption_actual,
        absorption_remarks: formData.absorption_remarks || "NA",
        whiteness_actual: formData.whiteness_actual,
        whiteness_remarks: formData.whiteness_remarks || "NA",
        ph_actual: formData.ph_actual,
        ph_remarks: formData.ph_remarks || "NA",
        loss_actual: formData.loss_actual,
        loss_remarks: formData.loss_remarks || "NA",
        fluorescence_actual: formData.fluorescence_actual,
        fluorescence_remarks: formData.fluorescence_remarks || "NA",
        water_actual: formData.water_actual,
        water_remarks: formData.water_remarks || "NA",
        ether_actual: formData.ether_actual,
        ether_remarks: formData.ether_remarks || "NA",
        sulphated_actual: formData.sulphated_actual,
        sulphated_remarks: formData.sulphated_remarks || "NA",
        foreign_fibres_actual: formData.foreign_fibres_actual,
        foreign_fibres_remarks: formData.foreign_fibres_remarks || "NA",
        neps_actual: formData.neps_actual,
        neps_remarks: formData.neps_remarks || "NA",
        average_actual: formData.average_actual,
        average_remarks: formData.average_remarks || "NA",
        extractable_actual: formData.extractable_actual,
        extractable_remarks: formData.extractable_remarks || "NA",
        total_viable_standard: formData.total_viable_standard,
        total_viable_actual: formData.total_viable_actual,
        total_viable_remarks: formData.total_viable_remarks || "NA",
        total_fungal_standard: formData.total_fungal_standard,
        total_vfungal_actual: formData.total_vfungal_actual,
        total_fungal_remarks: formData.total_fungal_remarks || "NA",
        pathogen_standard: formData.pathogen_standard,
        pathogen_spec: formData.pathogen_spec,
        bile_actual: formData.bile_actual,
        bile_remarks: formData.bile_remarks || "NA",
        escherichia_actual: formData.escherichia_actual,
        escherichia_remarks: formData.escherichia_remarks || "NA",
        staphylococcus_actual: formData.staphylococcus_actual,
        staphylococcus_remarks: formData.staphylococcus_remarks || "NA",
        pseudomonas_actual: formData.pseudomonas_actual,
        pseudomonas_remarks: formData.pseudomonas_remarks || "NA",
        salmonella_actual: formData.salmonella_actual,
        salmonella_remarks: formData.salmonella_remarks || "NA",
        burkholderia_actual: formData.burkholderia_actual,
        burkholderia_remarks: formData.burkholderia_remarks || "NA",
      };
      if (formData.id) {
        payload.id = formData.id;
      }
    } else if (
      role == "QA_EXECUTIVE" ||
      role == "QA_MANAGER" ||
      role == "QC_MANAGER"
    ) {
      apiurl = `${   API.prodUrl}/Precot/api/QcForm/ApproveOrRejectF26F`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.id,
        formatNo: "PH-QCL01-F-026F",
        status: "Approve",
      };
    }

    console.log("payload", payload);
    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_CHEMIST" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-026F/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    let apiurl, payload;
    if (role == "ROLE_CHEMIST") {
      const headerValidate = ["date", "invoice_no", "pattern", "edge"];
      const keysToValidate = [
        "gsm_standard",
        "gsm_actual",
        "no_of_pads_standard",
        "no_of_pads_actual",
        "gross_weight_standard",
        "gross_weight_actual",
        "packing_material",
        "fibre_actual",
        "surface_actual",
        "sinking_actual",
        "absorption_actual",
        "whiteness_actual",
        "ph_actual",
        "loss_actual",
        "fluorescence_actual",
        "water_actual",
        "ether_actual",
        "sulphated_actual",
        "total_viable_standard",
        "total_viable_actual",
        "total_fungal_standard",
        "total_vfungal_actual",
        "pathogen_standard",
        "pathogen_spec",
        "bile_actual",
        "escherichia_actual",
        "staphylococcus_actual",
        "pseudomonas_actual",
        "salmonella_actual",
        "burkholderia_actual",
      ];
      const getName = (key) => {
        switch (key) {
          case "gsm_standard":
          case "gsm_actual":
            return "GSM";
          case "no_of_pads_standard":
          case "no_of_pads_actual":
            return "No. of pads per bag";
          case "gross_weight_standard":
          case "gross_weight_actual":
            return "Gross weight of the bag with pads (g)";
          case "packing_material":
            return "Packing Material";
          case "fibre_actual":
          case "fibre_remarks":
            return "Fibre Identification";
          case "surface_actual":
          case "surface_remarks":
            return "Surface active Substances";
          case "sinking_actual":
          case "sinking_remarks":
            return "Sinking time in water (sec)";
          case "absorption_actual":
          case "absorption_remarks":
            return "Absorption Capacity (g/g)";
          case "whiteness_actual":
          case "whiteness_remarks":
            return "Whiteness Index (Berger 10deg/D65)";
          case "ph_actual":
          case "ph_remarks":
            return "pH";
          case "loss_actual":
          case "loss_remarks":
            return "Loss on drying (% )";
          case "fluorescence_actual":
          case "fluorescence_remarks":
            return "Fluorescence";
          case "water_actual":
          case "water_remarks":
            return "Water Soluble Substance(%)";
          case "ether_actual":
          case "ether_remarks":
            return "Ether Soluble Substance (%)";
          case "sulphated_actual":
          case "sulphated_remarks":
            return "Sulphated ash (%)";
          case "total_viable_standard":
          case "total_viable_actual":
          case "total_viable_remarks":
            return "Total viable count (cfu/g)";
          case "total_fungal_standard":
          case "total_vfungal_actual":
          case "total_fungal_remarks":
            return "Total fungal count (cfu/g)";
          case "pathogen_standard":
          case "pathogen_spec":
            return "Pathogens";
          case "bile_actual":
            return "Bile-tolerant Gram-negative bacteria ( Coliforms)";
          case "escherichia_actual":
            return "Escherichia coli (E.coli)";
          case "staphylococcus_actual":
            return "Staphylococcus aureus ( S. aureus)";
          case "pseudomonas_actual":
            return "Pseudomonas aeruginosa ( P.aeruginosa)";
          case "salmonella_actual":
            return "Salmonella";

          case "burkholderia_actual":
            return "Burkholderia cepacia complex";
        }
      };
      for (const key of headerValidate) {
        if (formData[key] == "") {
          const formattedKey = key.replace(/_/g, " ");
          message.warning(`Please Enter ${formattedKey} Field`);
          return;
        }
      }
      if (formData.lot_no == "") {
        message.warning("Please Enter po no Field");
        return;
      }
      if (formData.reference_no == "") {
        message.warning("Please Enter product dimension Field");
        return;
      }
      for (const key of keysToValidate) {
        if (formData[key] == "") {
          message.warning(`Please Select All ${getName(key)} Fields`);
          return;
        }
      }
      if (!runValidations()) {
        return;
      }

      apiurl = `${   API.prodUrl}/Precot/api/QcForm/SubmitInfusedCottonPadsF26F`;
      payload = {
        formatNo: "PH-QCL01/F-026A",
        revisionNo: "01",
        formatName: "CERTIFICATE OF ANALYSIS FOR INFUSED COTTON PADS",
        refSopNo: "PH-QCL01-D-05",
        date: formData.date,
        product: productName,
        customer: customerName,
        invoice_no: formData.invoice_no,
        lot_no: formData.lot_no,
        reference_no: formData.reference_no,
        pattern: formData.pattern,
        edge: formData.edge,
        gsm_standard: formData.gsm_standard,
        gsm_actual: formData.gsm_actual,
        gsm_remarks: formData.gsm_remarks || "NA",
        no_of_pads_standard: formData.no_of_pads_standard,
        no_of_pads_actual: formData.no_of_pads_actual,
        no_of_pads_remarks: formData.no_of_pads_remarks || "NA",
        gross_weight_standard: formData.gross_weight_standard,
        gross_weight_actual: formData.gross_weight_actual,
        gross_weight_remarks: formData.gross_weight_remarks || "NA",
        packing_material: formData.packing_material,
        fibre_actual: formData.fibre_actual,
        fibre_remarks: formData.fibre_remarks || "NA",
        surface_actual: formData.surface_actual,
        surface_remarks: formData.surface_remarks || "NA",
        sinking_actual: formData.sinking_actual,
        sinking_remarks: formData.sinking_remarks || "NA",
        absorption_actual: formData.absorption_actual,
        absorption_remarks: formData.absorption_remarks || "NA",
        whiteness_actual: formData.whiteness_actual,
        whiteness_remarks: formData.whiteness_remarks || "NA",
        ph_actual: formData.ph_actual,
        ph_remarks: formData.ph_remarks || "NA",
        loss_actual: formData.loss_actual,
        loss_remarks: formData.loss_remarks || "NA",
        fluorescence_actual: formData.fluorescence_actual,
        fluorescence_remarks: formData.fluorescence_remarks || "NA",
        water_actual: formData.water_actual,
        water_remarks: formData.water_remarks || "NA",
        ether_actual: formData.ether_actual,
        ether_remarks: formData.ether_remarks || "NA",
        sulphated_actual: formData.sulphated_actual,
        sulphated_remarks: formData.sulphated_remarks || "NA",
        foreign_fibres_actual: formData.foreign_fibres_actual,
        foreign_fibres_remarks: formData.foreign_fibres_remarks || "NA",
        neps_actual: formData.neps_actual,
        neps_remarks: formData.neps_remarks || "NA",
        average_actual: formData.average_actual,
        average_remarks: formData.average_remarks || "NA",
        extractable_actual: formData.extractable_actual,
        extractable_remarks: formData.extractable_remarks || "NA",
        total_viable_standard: formData.total_viable_standard,
        total_viable_actual: formData.total_viable_actual,
        total_viable_remarks: formData.total_viable_remarks || "NA",
        total_fungal_standard: formData.total_fungal_standard,
        total_vfungal_actual: formData.total_vfungal_actual,
        total_fungal_remarks: formData.total_fungal_remarks || "NA",
        pathogen_standard: formData.pathogen_standard,
        pathogen_spec: formData.pathogen_spec,
        bile_actual: formData.bile_actual,
        bile_remarks: formData.bile_remarks || "NA",
        escherichia_actual: formData.escherichia_actual,
        escherichia_remarks: formData.escherichia_remarks || "NA",
        staphylococcus_actual: formData.staphylococcus_actual,
        staphylococcus_remarks: formData.staphylococcus_remarks || "NA",
        pseudomonas_actual: formData.pseudomonas_actual,
        pseudomonas_remarks: formData.pseudomonas_remarks || "NA",
        salmonella_actual: formData.salmonella_actual,
        salmonella_remarks: formData.salmonella_remarks || "NA",
        burkholderia_actual: formData.burkholderia_actual,
        burkholderia_remarks: formData.burkholderia_remarks || "NA",
      };
      if (formData.id) {
        payload.id = formData.id;
      }
      if (formData.chemist_saved_id) {
        payload.chemist_saved_id = formData.chemist_saved_id;
      }
      if (formData.chemist_submit_id) {
        payload.chemist_submit_id = formData.chemist_submit_id;
      }
      if (formData.qa_exe_submit_id) {
        payload.qa_exe_submit_id = formData.qa_exe_submit_id;
      }
      if (formData.manager_submit_id) {
        payload.manager_submit_id = formData.manager_submit_id;
      }
      if (formData.manager_submit_id) {
        payload.manager_submit_id = formData.manager_submit_id;
      }
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
      apiurl = `${   API.prodUrl}/Precot/api/QcForm/ApproveOrRejectF26F`;
      payload = {
        id: formData.id,
        status: "Reject",
        formatNo: "PH-QCL01-F-026F",
        remarks: formData.reason,
      };
    }
    try {
      setStatusLoader(true);
      const requestMethod = role === "ROLE_CHEMIST" ? axios.post : axios.put;
      const response = await requestMethod(apiurl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        message.success(response.data.message);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/Precot/QualityControl/F-026F/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };
  useEffect(() => {
    console.log("Form Data", formData);
  }, [formData]);
  let validation = new Set();

  const handleClear = (name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };
  const handleBlur = (event) => {
    if (status.fieldStatus) {
      return;
    }
    // --------- Test Type 1 ---------------
    const gsmStandard = Number(formData.gsm_standard);
    const tenPercent = (gsmStandard / 100) * 10;
    const lowerBound = gsmStandard - tenPercent;
    const twentyFivePercent = (gsmStandard / 100) * 25;
    const upperBound = gsmStandard + twentyFivePercent;
    if (
      (Number(formData.gsm_actual) < lowerBound ||
        Number(formData.gsm_actual) > upperBound) &&
      formData.gsm_actual !== "" &&
      formData.gsm_standard !== ""
    ) {
      validation.add(
        "GSM actual should be within " + lowerBound + " to " + upperBound
      );
      handleClear("gsm_actual");
    }

    const padsStandard = Number(formData.no_of_pads_standard);
    // const tenPercentPads = (padsStandard / 100) * 10;
    const lowerBoundPads = padsStandard - 0;
    const upperBoundPads = padsStandard + 2;

    if (
      (Number(formData.no_of_pads_actual) < lowerBoundPads ||
        Number(formData.no_of_pads_actual) > upperBoundPads) &&
      formData.no_of_pads_actual !== "" &&
      formData.no_of_pads_standard !== ""
    ) {
      validation.add(
        "No. of pads per bag actual should be within " +
          lowerBoundPads +
          " to " +
          upperBoundPads
      );
      handleClear("no_of_pads_actual");
    }

    const grossStandard = Number(formData.gross_weight_standard);
    const tenPercents = (grossStandard / 100) * 10;
    const lowerBoundGross = grossStandard - tenPercents;
    const twentyFivePercents = (gsmStandard / 100) * 25;
    const upperBoundGross = grossStandard + twentyFivePercents;
    if (
      (Number(formData.gross_weight_actual) < lowerBoundGross ||
        Number(formData.gross_weight_actual) > upperBoundGross) &&
      formData.gross_weight_actual !== "" &&
      formData.gross_weight_standard !== ""
    ) {
      validation.add(
        "Gross weight of the bag with pads (g) actual should be within " +
          lowerBoundGross +
          " to " +
          upperBoundGross
      );
      handleClear("gross_weight_actual");
    }

    if (
      (Number(formData.sinking_actual) < 0 ||
        Number(formData.sinking_actual) > 9) &&
      formData.sinking_actual !== ""
    ) {
      validation.add("Sinking time in water actual should be within  0 to 9 ");
      handleClear("sinking_actual");
    }
    if (
      Number(formData.absorption_actual) < 23 &&
      formData.absorption_actual !== ""
    ) {
      validation.add(
        "Absorption Capacity actual should be greater than or equal to 23"
      );
      handleClear("absorption_actual");
    }
    if (
      Number(formData.whiteness_actual) < 80 &&
      formData.whiteness_actual !== ""
    ) {
      validation.add(
        "Whiteness Index actual should be greater than or equal to 80"
      );
      handleClear("whiteness_actual");
    }
    if (
      (Number(formData.ph_actual) < 6 || Number(formData.ph_actual) > 8) &&
      formData.ph_actual !== ""
    ) {
      validation.add("pH actual Should be within 6 to 8");
      handleClear("ph_actual");
    }
    if (
      (Number(formData.loss_actual) >= 8.0 ||
        Number(formData.loss_actual) < 0) &&
      formData.loss_actual !== ""
    ) {
      validation.add("Loss on drying actual Should be 0 to 7.9");
      handleClear("loss_actual");
    }
    if (Number(formData.water_actual) >= 0.5 && formData.water_actual !== "") {
      validation.add("Water Soluble Substance actual Should be less than 0.50");
      handleClear("water_actual");
    }
    if (Number(formData.ether_actual) >= 0.5 && formData.ether_actual !== "") {
      validation.add("Ether Soluble Substance actual Should be less than 0.50");
      handleClear("ether_actual");
    }
    if (
      Number(formData.sulphated_actual) >= 0.4 &&
      formData.sulphated_actual !== ""
    ) {
      validation.add("Sulphated ash  actual Should be less than 0.40");
      handleClear("sulphated_actual");
    }
    if (
      Number(formData.average_actual) <= 10 &&
      formData.average_actual !== ""
    ) {
      validation.add(
        "Average Fibre length ash  actual Should be Greater than 10"
      );
      handleClear("average_actual");
    }
    if (
      (Number(formData.total_viable_actual) >= 1000 ||
        Number(formData.total_viable_actual) < 0) &&
      formData.total_viable_actual !== ""
    ) {
      validation.add("Total viable count actual Should be 0 to 999");
      handleClear("total_viable_actual");
    }
    if (
      (Number(formData.total_vfungal_actual) >= 100 ||
        Number(formData.total_vfungal_actual) < 0) &&
      formData.total_vfungal_actual !== ""
    ) {
      validation.add("Total fungal count actual Should be 0 to 99");
      handleClear("total_vfungal_actual");
    }
    if (validation.size > 0) {
      validation.forEach((msg) => {
        message.warning(msg);
      });
    }
  };
  const handleKeyDown_text = (e) => {
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

  // ------------- Form Lov's -------------------------
  const Lov1 = [
    { value: "Pass", label: "Pass" },
    { value: "Fail", label: "Fail" },
    {
      value: "Under conditionally passed",
      label: "Under conditionally passed",
    },
    { value: "Nil", label: "Nil" },
  ];
  const Lov2 = [
    { value: "Single top Drawstring", label: "Single top Drawstring" },
    { value: "Double Drawstring", label: "Double Drawstring" },
    { value: "Ziplock", label: "Ziplock" },
  ];
  const Lov3 = [{ value: "Nil", label: "Nil" }];
  const Lov4 = [{ value: "100% Cotton", label: "100% Cotton" }];
  const Lov5 = [{ value: "Absent", label: "Absent" }];
  const Lov6 = [
    { value: "EP", label: "EP" },
    { value: "USP", label: "USP" },
  ];
  const Lov7 = [{ value: "Odorless", label: "Odorless" }];
  const Lov8 = [
    { value: "Opened", label: "Opened" },
    { value: "Stitched", label: "Stitched" },
    { value: "Closed", label: "Closed" },
  ];
  const Lov9 = [{ value: "Not more neppy", label: "Not more neppy" }];
  // -------------------------------------------------

  // -------------- HandleINput Functions -----------
  const handleInput = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSelectText = (e, name) => {
    if (e.key == "Enter") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    }
  };
  //-------------------------------------------------

  const handleE = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };
  const handleDigit = (e, number, symbol) => {
    if (symbol == "no need") {
      if (
        ["e", "E", "+", "-"].includes(e.key) ||
        (e.target.value.length >= number && e.key !== "Backspace")
      ) {
        e.preventDefault();
      }
    } else if (symbol == "need") {
      if (
        ["e", "E"].includes(e.key) ||
        (e.target.value.length >= number && e.key !== "Backspace")
      ) {
        e.preventDefault();
      }
    }
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

  return (
    <>
      <BleachingHeader
        formName={"CERTIFICATE OF ANALYSIS FOR INFUSED COTTON PADS"}
        formatNo={"PH-QCL01/F-026F"}
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
              role == "ROLE_CHEMIST" ? (
                <IoSave color="#00308F" />
              ) : (
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              )
            }
            onClick={handleSave}
            loading={statusLoader}
          >
            {role == "ROLE_CHEMIST" ? "Save" : "Approve"}
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
              role == "ROLE_CHEMIST" ? (
                <GrDocumentStore color="#00308F" />
              ) : (
                <img src={rejectIcon} alt="Reject Icon" />
              )
            }
            onClick={role == "ROLE_CHEMIST" ? handleSubmit : rejectFlow}
            loading={statusLoader}
          >
            {role == "ROLE_CHEMIST" ? " Submit" : "   Reject"}
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

      <div style={{ margin: "10px", display: "flex" }}>
        <Row gutter={[8, 8]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                addonBefore="Customer :"
                value={customerName}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
              <Input
                type="text"
                addonBefore="PO. No. "
                onKeyDown={(e) => handleKeyDown_text(e)}
                value={formData.lot_no}
                onChange={(e) => handleInput(e.target.value, "lot_no")}
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              />
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                addonBefore="Product :"
                value={productName}
                style={{ width: "100%", textAlign: "center" }}
                readOnly
              />
              <Input
                type="number"
                addonBefore="Product Dimension :"
                style={{
                  width: "100%",
                  backgroundColor: "none",
                  textAlign: "center",
                }}
                onKeyDown={handleE}
                value={formData.reference_no}
                onChange={(e) => handleInput(e.target.value, "reference_no")}
                readOnly={status.fieldStatus}
              />
            </Space>
          </Col>
          <br></br>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                type="text"
                onKeyDown={(e) => handleKeyDown_text(e)}
                addonBefore="Invoice No : "
                value={formData.invoice_no}
                onChange={(e) => handleInput(e.target.value, "invoice_no")}
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              />
              <Input
                type="text"
                addonBefore="Pattern :"
                onKeyDown={(e) => handleKeyDown_text(e)}
                value={formData.pattern}
                onChange={(e) => handleInput(e.target.value, "pattern")}
                style={{ width: "100%", textAlign: "center" }}
                readOnly={status.fieldStatus}
              />
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <span style={{ marginTop: "10px" }}>Edge : </span>
                <Select
                  options={Lov8}
                  value={formData.edge}
                  style={{ textAlign: "center", width: "80%" }}
                  onInputKeyDown={(e) => {
                    handleSelectText(e, "edge");
                  }}
                  onChange={(e) => {
                    handleInput(e, "edge");
                  }}
                  dropdownStyle={{ textAlign: "center" }}
                  showSearch
                  filterOption={false}
                  readOnly={status.fieldStatus}
                  onKeyDown={(e) => {
                    handleSelectText(e, "edge");
                  }}
                  disabled={status.fieldStatus}
                ></Select>
              </div>
              <Input
                type="date"
                addonBefore="Date :"
                style={{ width: "95%", textAlign: "center" }}
                value={formData.date}
                onChange={(e) => handleInput(e.target.value, "date")}
                readOnly={status.fieldStatus}
                max={today}
              />
            </Space>
          </Col>
        </Row>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Test Type I" key="1">
          <div style={{ height: "50vh" }}>
            <table style={{ height: "100%" }}>
              <tr>
                <th> S.No</th>
                <th> Test Type </th>
                <th>Standard</th>
                <th>Specification/Tolerance</th>
                <th> Actual/ Observation </th>
                <th>Remark</th>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 1 </td>
                <td style={{ textAlign: "center" }}>GSM</td>
                <td style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    onChange={(e) => {
                      handleInput(e.target.value, "gsm_standard");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 1000, "need");
                    }}
                    value={formData.gsm_standard}
                    readOnly={status.fieldStatus}
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>-10%/+ 25%</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.gsm_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "gsm_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus || formData.gsm_standard == ""}
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.gsm_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "gsm_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "gsm_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "gsm_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 2 </td>
                <td style={{ textAlign: "center" }}>No. of pads per bag</td>
                <td style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.no_of_pads_standard}
                    onChange={(e) => {
                      handleInput(e.target.value, "no_of_pads_standard");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "no need");
                    }}
                    onBlur={handleBlur}
                    readOnly={status.fieldStatus}
                  ></Input>{" "}
                </td>
                <td style={{ textAlign: "center" }}>-0 /+2 </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.no_of_pads_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "no_of_pads_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "no need");
                    }}
                    readOnly={
                      status.fieldStatus || formData.no_of_pads_standard == ""
                    }
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.no_of_pads_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "no_of_pads_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "no_of_pads_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "no_of_pads_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 3 </td>
                <td style={{ textAlign: "center" }}>
                  Gross weight of the bag with pads (g)
                </td>
                <td style={{ textAlign: "center" }}>
                  {" "}
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.gross_weight_standard}
                    onChange={(e) => {
                      handleInput(e.target.value, "gross_weight_standard");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>-10%/+ 25%</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.gross_weight_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "gross_weight_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "no need");
                    }}
                    readOnly={
                      status.fieldStatus || formData.gross_weight_standard == ""
                    }
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.gross_weight_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "gross_weight_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "gross_weight_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "gross_weight_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 4 </td>
                <td style={{ textAlign: "center" }}>Packing Material</td>
                <td style={{ textAlign: "center", padding: "0px" }} colSpan={4}>
                  <Select
                    options={Lov2}
                    value={formData.packing_material}
                    style={{ textAlign: "center", width: "200px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "packing_material");
                    }}
                    onChange={(e) => {
                      handleInput(e, "packing_material");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "packing_material");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 5 </td>
                <td style={{ textAlign: "center" }}>Fibre Identification</td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}> 100% Cotton</td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov4}
                    value={formData.fibre_actual}
                    style={{ textAlign: "center", width: "100%" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "fibre_actual");
                    }}
                    onChange={(e) => {
                      handleInput(e, "fibre_actual");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "fibre_actual");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.fibre_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "fibre_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "fibre_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "fibre_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
            </table>
            <table style={{ marginTop: "10px" }}>
              <tr>
                <td>
                  Note: For product testing " Edana" and "Pharmacopoeia
                  standards" are followed.
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Test Type II" key="2">
          <div style={{ height: "50vh" }}>
            <table style={{ height: "100%" }}>
              <tr>
                <th> S.No</th>
                <th> Test Type </th>
                <th>Standard</th>
                <th>Specification/Tolerance</th>
                <th> Actual/ Observation </th>
                <th>Remark</th>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 6 </td>
                <td style={{ textAlign: "center" }}>
                  Surface active Substances
                </td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}>
                  Any Foam Present must not cover the entire surface of the
                  liquid
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov3}
                    value={formData.surface_actual}
                    style={{ textAlign: "center", width: "100%" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "surface_actual");
                    }}
                    onChange={(e) => {
                      handleInput(e, "surface_actual");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "surface_actual");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.surface_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "surface_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "surface_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "surface_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 7 </td>
                <td style={{ textAlign: "center" }}>
                  Sinking time in water (sec)
                </td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}>{"<"} 10</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.sinking_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "sinking_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus}
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.sinking_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "sinking_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "sinking_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "sinking_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 8 </td>
                <td style={{ textAlign: "center" }}>
                  Absorption Capacity (g/g)
                </td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}> ≥ 23</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.absorption_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "absorption_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus}
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.absorption_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "absorption_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "absorption_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "absorption_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 9 </td>
                <td style={{ textAlign: "center" }}>
                  Whiteness Index (Berger 10deg/D65)
                </td>
                <td style={{ textAlign: "center" }}>-</td>
                <td style={{ textAlign: "center" }}> ≥ 80</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.whiteness_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "whiteness_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus}
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.whiteness_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "whiteness_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "whiteness_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "whiteness_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 10 </td>
                <td style={{ textAlign: "center" }}>pH</td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}> 6 - 8</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.ph_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "ph_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 4, "no need");
                    }}
                    readOnly={status.fieldStatus}
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.ph_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "ph_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "ph_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "ph_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
            </table>
            <table style={{ marginTop: "10px" }}>
              <tr>
                <td>
                  Note: For product testing " Edana" and "Pharmacopoeia
                  standards" are followed.
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Test Type III" key="3">
          <div style={{ height: "50vh" }}>
            <table style={{ height: "100%" }}>
              <tr>
                <th> S.No</th>
                <th> Test Type </th>
                <th>Standard</th>
                <th>Specification/Tolerance</th>
                <th> Actual/ Observation </th>
                <th>Remark</th>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 11 </td>
                <td style={{ textAlign: "center" }}>Loss on drying (% )</td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}> {"<"}8.0</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.loss_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "loss_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus}
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.loss_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "loss_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "loss_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "loss_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 12 </td>
                <td style={{ textAlign: "center" }}>Fluorescence</td>
                <td style={{ textAlign: "center" }}> EP</td>
                <td style={{ textAlign: "center" }}>
                  No intense blue fluorescence . Few isolated fibers passable
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov5}
                    value={formData.fluorescence_actual}
                    style={{ textAlign: "center", width: "100%" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "fluorescence_actual");
                    }}
                    onChange={(e) => {
                      handleInput(e, "fluorescence_actual");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "fluorescence_actual");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.fluorescence_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "fluorescence_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "fluorescence_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "fluorescence_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 13 </td>
                <td style={{ textAlign: "center" }}>
                  Water Soluble Substance (%)
                </td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}>{"<"}0.50</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.water_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "water_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus}
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.water_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "water_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "water_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "water_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 14 </td>
                <td style={{ textAlign: "center" }}>
                  Ether Soluble Substance (%)
                </td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}> {"<"}0.50</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.ether_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "ether_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus}
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.ether_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "ether_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "ether_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "ether_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 15 </td>
                <td style={{ textAlign: "center" }}>Sulphated ash (%)</td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}> {"<"} 0.40</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.sulphated_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "sulphated_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus}
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.sulphated_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "sulphated_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "sulphated_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "sulphated_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
            </table>
            <table style={{ marginTop: "10px" }}>
              <tr>
                <td>
                  Note: For product testing " Edana" and "Pharmacopoeia
                  standards" are followed.
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Test Type IV" key="4">
          <div style={{ height: "50vh" }}>
            <table style={{ height: "100%" }}>
              <tr>
                <th> S.No</th>
                <th> Test Type </th>
                <th>Standard</th>
                <th>Specification/Tolerance</th>
                <th> Actual/ Observation </th>
                <th>Remark</th>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 16 </td>
                <td style={{ textAlign: "center" }}>Foreign fibres</td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}>
                  Examined under microscope a few isolated foreign fibers may
                  present
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="text"
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown_text(e)}
                    value={formData.foreign_fibres_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "foreign_fibres_actual");
                    }}
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly={status.fieldStatus}
                  />
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.foreign_fibres_remarks}
                    onBlur={handleBlur}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "foreign_fibres_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "foreign_fibres_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "foreign_fibres_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 17 </td>
                <td style={{ textAlign: "center" }}>Neps</td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}>
                  Max. 5 ( 2.5 mm in diameter)/ gram{" "}
                </td>
                <td style={{ textAlign: "center" }}>
                  {/* <Select
                    options={Lov9}
                    style={{ textAlign: "center", width: "100%" }}
                    value={formData.neps_actual}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "neps_actual");
                    }}
                    onChange={(e) => {
                      handleInput(e, "neps_actual");
                    }}
                  
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "neps_actual");
                    }}
                    disabled={status.fieldStatus}
                  ></Select> */}
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.neps_actual}
                    onBlur={(e) => {
                      if (e.target.value > 5  ) {
                        message.warning(
                          "Entered Neps Observation value greater than 5"
                        );
                      }
                    }}
                    onChange={(e) => {
                      handleInput(e.target.value, "neps_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus}
                  />
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    style={{ textAlign: "center", width: "300px" }}
                    onBlur={handleBlur}
                    value={formData.neps_remarks}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "neps_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "neps_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "neps_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 18 </td>
                <td style={{ textAlign: "center" }}>Average Fibre length</td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}>{">"}10mm</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.average_actual}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleInput(e.target.value, "average_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.average_remarks}
                    onBlur={handleBlur}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "average_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "average_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "average_remarks");
                    }}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 19 </td>
                <td style={{ textAlign: "center" }}>
                  Extractable colouring matter
                </td>
                <td style={{ textAlign: "center" }}>EP</td>
                <td style={{ textAlign: "center" }}>
                  {" "}
                  Alcohol extract may be slightly yellowish but not blue or
                  green{" "}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov3}
                    onBlur={handleBlur}
                    style={{ textAlign: "center", width: "100%" }}
                    value={formData.extractable_actual}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "extractable_actual");
                    }}
                    onChange={(e) => {
                      handleInput(e, "extractable_actual");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "extractable_actual");
                    }}
                  ></Select>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    onBlur={handleBlur}
                    value={formData.extractable_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "extractable_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "extractable_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "extractable_remarks");
                    }}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 20 </td>
                <td style={{ textAlign: "center" }}>
                  Total viable count (cfu/g)
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov6}
                    onBlur={handleBlur}
                    value={formData.total_viable_standard}
                    style={{ textAlign: "center", width: "100%" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "total_viable_standard");
                    }}
                    onChange={(e) => {
                      handleInput(e, "total_viable_standard");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "total_viable_standard");
                    }}
                  ></Select>
                </td>
                <td style={{ textAlign: "center" }}>{"<"} 1000</td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.total_viable_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "total_viable_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus}
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.total_viable_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "total_viable_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "total_viable_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    readOnly={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "total_viable_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
            </table>
            <table style={{ marginTop: "10px" }}>
              <tr>
                <td>
                  Note: For product testing " Edana" and "Pharmacopoeia
                  standards" are followed.
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Test Type V" key="5">
          <div style={{ height: "50vh" }}>
            <table style={{ height: "100%" }}>
              <tr>
                <th> S.No</th>
                <th> Test Type </th>
                <th>Standard</th>
                <th>Specification/Tolerance</th>
                <th> Actual/ Observation </th>
                <th>Remark</th>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}> 21</td>
                <td style={{ textAlign: "center" }}>
                  Total fungal count (cfu/g)
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov6}
                    value={formData.total_fungal_standard}
                    style={{ textAlign: "center", width: "100%" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "total_fungal_standard");
                    }}
                    onChange={(e) => {
                      handleInput(e, "total_fungal_standard");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "total_fungal_standard");
                    }}
                  ></Select>
                </td>
                <td style={{ textAlign: "center" }}>{"<"} 100 </td>
                <td style={{ textAlign: "center" }}>
                  <Input
                    type="number"
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      margin: "-9px",
                      textAlign: "center",
                    }}
                    value={formData.total_vfungal_actual}
                    onChange={(e) => {
                      handleInput(e.target.value, "total_vfungal_actual");
                    }}
                    onKeyDown={(e) => {
                      handleDigit(e, 100, "need");
                    }}
                    readOnly={status.fieldStatus}
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center", padding: "0px" }}>
                  <Select
                    options={Lov1}
                    value={formData.total_fungal_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "total_fungal_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "total_fungal_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    onKeyDown={(e) => {
                      handleSelectText(e, "total_fungal_remarks");
                    }}
                    disabled={status.fieldStatus}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }} rowSpan={7}>
                  {" "}
                  22{" "}
                </td>
                <td style={{ textAlign: "left" }} colSpan={5}>
                  Pathogens
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  Bile-tolerant Gram-negative bacteria ( Coliforms)
                </td>
                <td style={{ textAlign: "center" }} rowSpan={6}>
                  <Select
                    options={Lov6}
                    onBlur={handleBlur}
                    value={formData.pathogen_standard}
                    style={{ textAlign: "center", width: "150px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "pathogen_standard");
                    }}
                    onChange={(e) => {
                      handleInput(e, "pathogen_standard");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "pathogen_standard");
                    }}
                  ></Select>
                </td>
                <td style={{ textAlign: "center" }} rowSpan={6}>
                  <Select
                    options={Lov5}
                    onBlur={handleBlur}
                    value={formData.pathogen_spec}
                    style={{ textAlign: "center", width: "100%" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "pathogen_spec");
                    }}
                    onChange={(e) => {
                      handleInput(e, "pathogen_spec");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "pathogen_spec");
                    }}
                  ></Select>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov5}
                    onBlur={handleBlur}
                    value={formData.bile_actual}
                    style={{ textAlign: "center", width: "100%" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "bile_actual");
                    }}
                    onChange={(e) => {
                      handleInput(e, "bile_actual");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "bile_actual");
                    }}
                  ></Select>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov1}
                    onBlur={handleBlur}
                    value={formData.bile_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "bile_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "bile_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "bile_remarks");
                    }}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  Escherichia coli (E.coli)
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov5}
                    onBlur={handleBlur}
                    value={formData.escherichia_actual}
                    style={{ textAlign: "center", width: "100%" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "escherichia_actual");
                    }}
                    onChange={(e) => {
                      handleInput(e, "escherichia_actual");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "escherichia_actual");
                    }}
                  ></Select>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov1}
                    onBlur={handleBlur}
                    value={formData.escherichia_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "escherichia_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "escherichia_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "escherichia_remarks");
                    }}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  Staphylococcus aureus ( S. aureus)
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov5}
                    onBlur={handleBlur}
                    value={formData.staphylococcus_actual}
                    style={{ textAlign: "center", width: "100%" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "staphylococcus_actual");
                    }}
                    onChange={(e) => {
                      handleInput(e, "staphylococcus_actual");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "staphylococcus_actual");
                    }}
                  ></Select>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov1}
                    onBlur={handleBlur}
                    value={formData.staphylococcus_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "staphylococcus_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "staphylococcus_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "staphylococcus_remarks");
                    }}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  Pseudomonas aeruginosa ( P.aeruginosa)
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov5}
                    onBlur={handleBlur}
                    value={formData.pseudomonas_actual}
                    style={{ textAlign: "center", width: "100%" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "pseudomonas_actual");
                    }}
                    onChange={(e) => {
                      handleInput(e, "pseudomonas_actual");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "pseudomonas_actual");
                    }}
                  ></Select>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov1}
                    onBlur={handleBlur}
                    value={formData.pseudomonas_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "pseudomonas_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "pseudomonas_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "pseudomonas_remarks");
                    }}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>Salmonella</td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov5}
                    onBlur={handleBlur}
                    value={formData.salmonella_actual}
                    style={{ textAlign: "center", width: "100%" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "salmonella_actual");
                    }}
                    onChange={(e) => {
                      handleInput(e, "salmonella_actual");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "salmonella_actual");
                    }}
                  ></Select>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov1}
                    onBlur={handleBlur}
                    value={formData.salmonella_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "salmonella_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "salmonella_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "salmonella_remarks");
                    }}
                  ></Select>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  Burkholderia cepacia complex
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov5}
                    onBlur={handleBlur}
                    value={formData.burkholderia_actual}
                    style={{ textAlign: "center", width: "100%" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "burkholderia_actual");
                    }}
                    onChange={(e) => {
                      handleInput(e, "burkholderia_actual");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "burkholderia_actual");
                    }}
                  ></Select>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    options={Lov1}
                    onBlur={handleBlur}
                    value={formData.burkholderia_remarks}
                    style={{ textAlign: "center", width: "300px" }}
                    onInputKeyDown={(e) => {
                      handleSelectText(e, "burkholderia_remarks");
                    }}
                    onChange={(e) => {
                      handleInput(e, "burkholderia_remarks");
                    }}
                    dropdownStyle={{ textAlign: "center" }}
                    showSearch
                    filterOption={false}
                    disabled={status.fieldStatus}
                    onKeyDown={(e) => {
                      handleSelectText(e, "burkholderia_remarks");
                    }}
                  ></Select>
                </td>
              </tr>
            </table>
            <table style={{ marginTop: "10px" }}>
              <tr>
                <td>
                  Note: For product testing " Edana" and "Pharmacopoeia
                  standards" are followed.
                </td>
              </tr>
            </table>
          </div>
        </TabPane>
        <TabPane tab="Review" key={6}>
          <div style={{ height: "40vh" }}>
            <table style={{ height: "60%", tableLayout: "fixed" }}>
              <tr>
                <td colspan="1" style={{ textAlign: "center", width: "30%" }}>
                  Prepared By.
                </td>
                <td colspan="2" style={{ textAlign: "center", width: "35%" }}>
                  Verified By.
                </td>
                <td colspan="1" style={{ textAlign: "center", width: "35%" }}>
                  Approved By.
                </td>
              </tr>
              <tr>
                <td colspan="1" style={{ height: "60%", textAlign: "center" }}>
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

                <td colspan="2" style={{ height: "60%", textAlign: "center" }}>
                  {formData.qa_exe_status !== "WAITING_FOR_APPROVAL" &&
                    formData.qa_exe_status !== "" && (
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
                            {formData.qa_exe_sign}
                            <br />
                            {formatDateAndTime(formData.qa_exe_submit_on)}
                          </div>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          {eSign.qa_exe_sign ? (
                            <img
                              src={eSign.qa_exe_sign}
                              alt="eSign"
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
                <td colspan="1" style={{ height: "60%", textAlign: "center" }}>
                  {formData.manager_status !== "WAITING_FOR_APPROVAL" &&
                    formData.manager_status !== "" && (
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
                            {formData.manager_sign}
                            <br />
                            {formatDateAndTime(formData.manager_submit_on)}
                          </div>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          {eSign.manager_sign ? (
                            <img
                              src={eSign.manager_sign}
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
      </Tabs>
    </>
  );
};

export default QualityControl_f26F;
