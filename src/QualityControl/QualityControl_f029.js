import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Tabs,
  Select,
  Tooltip,
  message,
  Modal,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
} from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { TbMenuDeep } from "react-icons/tb";
import { FaLock, FaTrash } from "react-icons/fa6";
import { BiFontSize, BiLock } from "react-icons/bi";
import { IoChevronBackSharp, IoCreate, IoSave } from "react-icons/io5";
import TextArea from "antd/es/input/TextArea";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrDocumentStore } from "react-icons/gr";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import approveIcon from "../Assests/outlined-approve.svg";
import PrecotSidebar from "../Components/PrecotSidebar";
import rejectIcon from "../Assests/outlined-reject.svg";
import BleachingHeader from "../Components/BleachingHeader";
import API from "../baseUrl.json";
import moment from "moment";

const QualityControlF029 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const roleauth = localStorage.getItem("role");
  const [mainID, setMainID] = useState(null);
  const [selectedRow, setSelectedRow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const initialized = useRef(false);
  const [open, setOpen] = useState(false);
  const { uniqueDepartment, uniqueReqNo } = location.state || {};
  const token = localStorage.getItem("token");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const [getImage4, setGetImage4] = useState("");
  const [getImage5, setGetImage5] = useState("");
  const [getImage6, setGetImage6] = useState("");

  const [formValues, setFormValues] = useState({
    requisitionNo: uniqueReqNo,
    dispatchDate: "",
    customer: "",
    productDescription: "",
    standardMixing: "",
    bagType: "",

    patternSpecification: "",
    patternWholeText: "",

    edgeSpecification: "",
    edgeWholeText: "",

    gsmSpecification: "",
    gsmMax: "",
    gsmMin: "",
    gsmObservation1: "",
    gsmObservation2: "",
    gsmObservation3: "",
    gsmAvg: "",
    gsmhighLimit: "",
    gsmlowLimit: "",

    thicknessSpecification: "",
    thicknessMax: "",
    thicknessMin: "",
    thicknessObservation1: "",
    thicknessObservation2: "",
    thicknessObservation3: "",
    thicknessAvg: "",
    thicknessLowLimit: "",
    thicknessHighLimit: "",

    singlePadSpecification: "",
    singlePadMax: "",
    singlePadMin: "",
    singlePadObservation1: "",
    singlePadObservation2: "",
    singlePadObservation3: "",
    singlePadAvg: "",
    singlePadHighLimit: "",
    singlePadLowLimit: "",

    dimensionLengthSpecification: "",
    dimensionLengthMax: "",
    dimensionLengthMin: "",
    dimensionLengthObservation1: "",
    dimensionLengthObservation2: "",
    dimensionLengthObservation3: "",
    dimensionLengthAvg: "",
    dimensionLengtHighLimit: "",
    dimensionLengtLowLimit: "",

    dimensionWidthSpecification: "",
    dimensionWidthMax: "",
    dimensionWidthMin: "",
    dimensionWidthObservation1: "",
    dimensionWidthObservation2: "",
    dimensionWidthObservation3: "",
    dimensionWidthAvg: "",
    dimensionWidthHighLimit: "",
    dimensionWidthLowLimit: "",

    dimensionHeightSpecification: "",
    dimensionHeightMax: "",
    dimensionHeightMin: "",
    dimensionHeightObservation1: "",
    dimensionHeightObservation2: "",
    dimensionHeightObservation3: "",
    dimensionHeightAvg: "",
    dimensionHeightHighLimit: "",
    dimensionHeightLowLimit: "",

    diameterSpecification: "",
    diameterMax: "",
    diameterMin: "",
    diameterObservation1: "",
    diameterObservation2: "",
    diameterObservation3: "",
    diameterAvg: "",
    diameterhighlimit: "",
    diameterlowlimit: "",

    moistureSpecification: "",
    moistureMax: "",
    moistureMin: "",
    moistureObservation1: "",
    moistureObservation2: "",
    moistureObservation3: "",
    moistureAvg: "",
    moisturehighlimit: "",
    moisturelowlimit: "",

    countPerPackStd: "",
    countPerPackMax: "",
    countPerPackMin: "",
    countPerPackObservation1: "",
    countPerPackObservation2: "",
    countPerPackObservation3: "",
    countPerPackObservationAvg: "",
    countPerPackhighlimit: "",
    countPerPacklowlimit: "",

    grossWeightStd: "",
    grossWeightMax: "",
    grossWeightMin: "",
    grossWeightObservation1: "",
    grossWeightObservation2: "",
    grossWeightObservation3: "",
    grossWeightAvg: "",
    grossWeightHighLimit: "",
    grossWeightLowLimit: "",

    fillingHeightStd: "",
    fillingHeightMax: "",
    fillingHeightMin: "",
    fillingHeightObservation1: "",
    fillingHeightObservation2: "",
    fillingHeightObservation3: "",
    fillingHeightAvg: "",
    fillingHeighthighlimit: "",
    fillingHeightlowlimit: "",

    // Bag/Pack type
    bagPackType: "",

    // Bag/Pack dimensions
    bagPackLength: "",
    bagPackWidth: "",
    bagPackGussetHeight: "",
    bagPackMicronThickness: "",

    overallAppearance: "",
    cdMd: "",
    sampleCollectedFrom: "",

    batchNo: "",
    mixing: "",
    finish: "",
    absorbency: "",
    lN: "",
    wSS: "",
    sinking: "",
    micronaireValue: "",
    eSS: "",
    whitenessIndex: "",
    pH: "",
    sA: "",
    uQL: "",
    ashContent: "",
    neps: "",
    lW: "",
    fluorescence: "",
    odor: "",

    budType: "",
    stickMadeFrom: "",
    stickDiameter: "",
    stickColour: "",
    stickLength: "",
    budShape: "",
    budsFullLength: "",
    cottonLength: "",
    singleBudWeight: "",
    budDiameter: "",
    packagingType: "",
    packagingMadeFrom: "",
    packagingWidth: "",
    packagingLength: "",
    packagingHeight: "",
    packagingGrossWeight: "",
    moisture: "",
    stickStrength: "",

    remarks: "",

    approvedSampleRequestNo: "",
    firstProductionRemark: "",
  });

  // Function to handle the input changes
  const handleInputChange = (e) => {
    console.log("selectedDepartment", uniqueDepartment);

    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log(" e.target.value", name, value);
  };

  // calculateGsmLimits
  const calculateGsmLimits = () => {
    const { gsmSpecification } = formValues;

    if (gsmSpecification) {
      const specificationValue = parseFloat(gsmSpecification);
      const highLimit = specificationValue * 1.05;
      const lowLimit = specificationValue * 0.95;

      setFormValues((prev) => ({
        ...prev,
        gsmhighLimit: highLimit,
        gsmlowLimit: lowLimit,
      }));
    }
  };

  const calculateGsmAverage = () => {
    const {
      gsmMax,
      gsmMin,
      gsmObservation1,
      gsmObservation2,
      gsmObservation3,
    } = formValues;
    const values = [
      gsmMax,
      gsmMin,
      gsmObservation1,
      gsmObservation2,
      gsmObservation3,
    ]
      .map(Number)
      .filter((value) => !isNaN(value));

    if (values.length > 0) {
      const avg = values.reduce((acc, curr) => acc + curr, 0) / values.length;
      const formattedAvg = avg.toFixed(2); // Format to two decimal places

      setFormValues((prev) => ({ ...prev, gsmAvg: formattedAvg }));
    } else {
      setFormValues((prev) => ({ ...prev, gsmAvg: "" }));
    }
  };

  const handleGsmBlur = (e) => {
    const { name, value } = e.target;
    const lowLimit = parseFloat(formValues.gsmlowLimit);
    const highLimit = parseFloat(formValues.gsmhighLimit);

    if (
      (name === "gsmMax" ||
        name === "gsmMin" ||
        name.startsWith("gsmObservation")) &&
      (value < lowLimit || value > highLimit)
    ) {
      message.warning(`Value must be between ${lowLimit} and ${highLimit}`);
    }

    // Recalculate average on blur
    calculateGsmAverage();
  };

  // calculateThicknessLimits
  const calculateThicknessLimits = () => {
    const { thicknessSpecification } = formValues;
    if (thicknessSpecification) {
      const specification = parseFloat(thicknessSpecification);
      const lowLimit = specification - 0.2;
      const highLimit = specification + 0.2;

      setFormValues((prev) => ({
        ...prev,
        thicknessLowLimit: lowLimit,
        thicknessHighLimit: highLimit,
      }));
    }
  };

  const calculateThicknessAverage = () => {
    const {
      thicknessMax,
      thicknessMin,
      thicknessObservation1,
      thicknessObservation2,
      thicknessObservation3,
    } = formValues;

    // Check if the main fields are empty
    if (
      !thicknessMax &&
      !thicknessMin &&
      !thicknessObservation1 &&
      !thicknessObservation2 &&
      !thicknessObservation3
    ) {
      // Clear relevant fields if all are empty
      setFormValues((prev) => ({
        ...prev,
        thicknessAvg: "",
        thicknessMax: "",
        thicknessMin: "",
        thicknessObservation1: "",
        thicknessObservation2: "",
        thicknessObservation3: "",
      }));
      return; // Exit the function early
    }

    const values = [
      thicknessMax,
      thicknessMin,
      thicknessObservation1,
      thicknessObservation2,
      thicknessObservation3,
    ]
      .map(Number)
      .filter((value) => !isNaN(value));

    if (values.length > 0) {
      const avg = values.reduce((acc, curr) => acc + curr, 0) / values.length;
      const formattedAvg = avg.toFixed(2); // Format to two decimal places
      setFormValues((prev) => ({ ...prev, thicknessAvg: formattedAvg }));
    } else {
      setFormValues((prev) => ({ ...prev, thicknessAvg: "" }));
    }
  };

  const handleThicknessBlur = (e) => {
    const { name, value } = e.target;
    const lowLimit = parseFloat(formValues.thicknessLowLimit);
    const highLimit = parseFloat(formValues.thicknessHighLimit);

    if (
      (name === "thicknessMax" ||
        name === "thicknessMin" ||
        name.startsWith("thicknessObservation")) &&
      (value < lowLimit || value > highLimit)
    ) {
      message.warning(`Value must be between ${lowLimit} and ${highLimit}`);
    }

    // Recalculate average on blur
    calculateThicknessAverage();
  };

  // calculateSinglePadLimits
  const calculateSinglePadLimits = () => {
    const { singlePadSpecification } = formValues;
    if (singlePadSpecification) {
      const specification = parseFloat(singlePadSpecification);
      const lowLimit = specification * 0.95; // ±5%
      const highLimit = specification * 1.05;

      setFormValues((prev) => ({
        ...prev,
        singlePadLowLimit: lowLimit,
        singlePadHighLimit: highLimit,
      }));
    }
  };

  const calculateSinglePadAverage = () => {
    const {
      singlePadMax,
      singlePadMin,
      singlePadObservation1,
      singlePadObservation2,
      singlePadObservation3,
    } = formValues;

    // Check if the main fields are empty
    if (
      !singlePadMax &&
      !singlePadMin &&
      !singlePadObservation1 &&
      !singlePadObservation2 &&
      !singlePadObservation3
    ) {
      // Clear relevant fields if all are empty
      setFormValues((prev) => ({
        ...prev,
        singlePadAvg: "",
        singlePadMax: "",
        singlePadMin: "",
        singlePadObservation1: "",
        singlePadObservation2: "",
        singlePadObservation3: "",
      }));
      return; // Exit the function early
    }

    const values = [
      singlePadMax,
      singlePadMin,
      singlePadObservation1,
      singlePadObservation2,
      singlePadObservation3,
    ]
      .map(Number)
      .filter((value) => !isNaN(value));

    if (values.length > 0) {
      const avg = values.reduce((acc, curr) => acc + curr, 0) / values.length;
      const formattedAvg = avg.toFixed(2); // Format to two decimal places
      setFormValues((prev) => ({ ...prev, singlePadAvg: formattedAvg }));
    } else {
      setFormValues((prev) => ({ ...prev, singlePadAvg: "" }));
    }
  };

  const handleSinglePadBlur = (e) => {
    const { name, value } = e.target;
    const lowLimit = parseFloat(formValues.singlePadLowLimit);
    const highLimit = parseFloat(formValues.singlePadHighLimit);

    if (
      (name === "singlePadMax" ||
        name === "singlePadMin" ||
        name.startsWith("singlePadObservation")) &&
      (value < lowLimit || value > highLimit)
    ) {
      message.warning(`Value must be between ${lowLimit} and ${highLimit}`);
    }

    // Recalculate average on blur
    calculateSinglePadAverage();
  };

  // calculateDimensionLengthLimits
  const calculateDimensionLengthLimits = () => {
    const { dimensionLengthSpecification } = formValues;
    if (dimensionLengthSpecification) {
      const specification = parseFloat(dimensionLengthSpecification);
      const lowLimit = specification - 1; // ±1
      const highLimit = specification + 1;

      setFormValues((prev) => ({
        ...prev,
        dimensionLengtLowLimit: lowLimit,
        dimensionLengtHighLimit: highLimit,
      }));
    }
  };

  const calculateDimensionLengthAverage = () => {
    const {
      dimensionLengthMax,
      dimensionLengthMin,
      dimensionLengthObservation1,
      dimensionLengthObservation2,
      dimensionLengthObservation3,
    } = formValues;

    // Check if the main fields are empty
    if (
      !dimensionLengthMax &&
      !dimensionLengthMin &&
      !dimensionLengthObservation1 &&
      !dimensionLengthObservation2 &&
      !dimensionLengthObservation3
    ) {
      // Clear relevant fields if all are empty
      setFormValues((prev) => ({
        ...prev,
        dimensionLengthAvg: "",
        dimensionLengthMax: "",
        dimensionLengthMin: "",
        dimensionLengthObservation1: "",
        dimensionLengthObservation2: "",
        dimensionLengthObservation3: "",
      }));
      return; // Exit the function early
    }

    const values = [
      dimensionLengthMax,
      dimensionLengthMin,
      dimensionLengthObservation1,
      dimensionLengthObservation2,
      dimensionLengthObservation3,
    ]
      .map(Number)
      .filter((value) => !isNaN(value));

    if (values.length > 0) {
      const avg = values.reduce((acc, curr) => acc + curr, 0) / values.length;
      const formattedAvg = avg.toFixed(2); // Format to two decimal places
      setFormValues((prev) => ({ ...prev, dimensionLengthAvg: formattedAvg }));
    } else {
      setFormValues((prev) => ({ ...prev, dimensionLengthAvg: "" }));
    }
  };

  const handleDimensionLengthBlur = (e) => {
    const { name, value } = e.target;
    const lowLimit = parseFloat(formValues.dimensionLengtLowLimit);
    const highLimit = parseFloat(formValues.dimensionLengtHighLimit);

    if (
      (name === "dimensionLengthMax" ||
        name === "dimensionLengthMin" ||
        name.startsWith("dimensionLengthObservation")) &&
      (value < lowLimit || value > highLimit)
    ) {
      message.warning(`Value must be between ${lowLimit} and ${highLimit}`);
    }

    // Recalculate average on blur
    calculateDimensionLengthAverage();
  };

  // calculateDimensionWidthLimits
  const calculateDimensionWidthLimits = () => {
    const { dimensionWidthSpecification } = formValues;
    if (dimensionWidthSpecification) {
      const specification = parseFloat(dimensionWidthSpecification);
      const lowLimit = specification - 1; // ±1
      const highLimit = specification + 1;

      setFormValues((prev) => ({
        ...prev,
        dimensionWidthLowLimit: lowLimit,
        dimensionWidthHighLimit: highLimit,
      }));
    }
  };

  const calculateDimensionWidthAverage = () => {
    const {
      dimensionWidthMax,
      dimensionWidthMin,
      dimensionWidthObservation1,
      dimensionWidthObservation2,
      dimensionWidthObservation3,
    } = formValues;

    // Check if the main fields are empty
    if (
      !dimensionWidthMax &&
      !dimensionWidthMin &&
      !dimensionWidthObservation1 &&
      !dimensionWidthObservation2 &&
      !dimensionWidthObservation3
    ) {
      // Clear relevant fields if all are empty
      setFormValues((prev) => ({
        ...prev,
        dimensionWidthAvg: "",
        dimensionWidthMax: "",
        dimensionWidthMin: "",
        dimensionWidthObservation1: "",
        dimensionWidthObservation2: "",
        dimensionWidthObservation3: "",
      }));
      return; // Exit the function early
    }

    const values = [
      dimensionWidthMax,
      dimensionWidthMin,
      dimensionWidthObservation1,
      dimensionWidthObservation2,
      dimensionWidthObservation3,
    ]
      .map(Number)
      .filter((value) => !isNaN(value));

    if (values.length > 0) {
      const avg = values.reduce((acc, curr) => acc + curr, 0) / values.length;
      const formattedAvg = avg.toFixed(2); // Format to two decimal places
      setFormValues((prev) => ({ ...prev, dimensionWidthAvg: formattedAvg }));
    } else {
      setFormValues((prev) => ({ ...prev, dimensionWidthAvg: "" }));
    }
  };

  const handleDimensionWidthBlur = (e) => {
    const { name, value } = e.target;
    const lowLimit = parseFloat(formValues.dimensionWidthLowLimit);
    const highLimit = parseFloat(formValues.dimensionWidthHighLimit);

    if (
      (name === "dimensionWidthMax" ||
        name === "dimensionWidthMin" ||
        name.startsWith("dimensionWidthObservation")) &&
      (value < lowLimit || value > highLimit)
    ) {
      message.warning(`Value must be between ${lowLimit} and ${highLimit}`);
    }

    // Recalculate average on blur
    calculateDimensionWidthAverage();
  };

  // calculateDimensionHeightLimits
  const calculateDimensionHeightLimits = () => {
    const { dimensionHeightSpecification } = formValues;
    if (dimensionHeightSpecification) {
      const specification = parseFloat(dimensionHeightSpecification);
      const lowLimit = specification - 1; // ±1
      const highLimit = specification + 1;

      setFormValues((prev) => ({
        ...prev,
        dimensionHeightLowLimit: lowLimit,
        dimensionHeightHighLimit: highLimit,
      }));
    }
  };

  const calculateDimensionHeightAverage = () => {
    const {
      dimensionHeightMax,
      dimensionHeightMin,
      dimensionHeightObservation1,
      dimensionHeightObservation2,
      dimensionHeightObservation3,
    } = formValues;

    // Check if the main fields are empty
    if (
      !dimensionHeightMax &&
      !dimensionHeightMin &&
      !dimensionHeightObservation1 &&
      !dimensionHeightObservation2 &&
      !dimensionHeightObservation3
    ) {
      // Clear relevant fields if all are empty
      setFormValues((prev) => ({
        ...prev,
        dimensionHeightAvg: "",
        dimensionHeightMax: "",
        dimensionHeightMin: "",
        dimensionHeightObservation1: "",
        dimensionHeightObservation2: "",
        dimensionHeightObservation3: "",
      }));
      return; // Exit the function early
    }

    const values = [
      dimensionHeightMax,
      dimensionHeightMin,
      dimensionHeightObservation1,
      dimensionHeightObservation2,
      dimensionHeightObservation3,
    ]
      .map(Number)
      .filter((value) => !isNaN(value));

    if (values.length > 0) {
      const avg = values.reduce((acc, curr) => acc + curr, 0) / values.length;
      const formattedAvg = avg.toFixed(2); // Format to two decimal places
      setFormValues((prev) => ({ ...prev, dimensionHeightAvg: formattedAvg }));
    } else {
      setFormValues((prev) => ({ ...prev, dimensionHeightAvg: "" }));
    }
  };

  const handleDimensionHeightBlur = (e) => {
    const { name, value } = e.target;
    const lowLimit = parseFloat(formValues.dimensionHeightLowLimit);
    const highLimit = parseFloat(formValues.dimensionHeightHighLimit);

    if (
      (name === "dimensionHeightMax" ||
        name === "dimensionHeightMin" ||
        name.startsWith("dimensionHeightObservation")) &&
      (value < lowLimit || value > highLimit)
    ) {
      message.warning(`Value must be between ${lowLimit} and ${highLimit}`);
    }

    // Recalculate average on blur
    calculateDimensionHeightAverage();
  };

  // calculateDiameterLimits
  const calculateDiameterLimits = () => {
    const { diameterSpecification } = formValues;
    if (diameterSpecification) {
      const specification = parseFloat(diameterSpecification);
      const lowLimit = specification - 1; // ±1
      const highLimit = specification + 1;

      setFormValues((prev) => ({
        ...prev,
        diameterLowLimit: lowLimit,
        diameterHighLimit: highLimit,
      }));
    }
  };

  const calculateDiameterAverage = () => {
    const {
      diameterMax,
      diameterMin,
      diameterObservation1,
      diameterObservation2,
      diameterObservation3,
    } = formValues;

    // Check if the main fields are empty
    if (
      !diameterMax &&
      !diameterMin &&
      !diameterObservation1 &&
      !diameterObservation2 &&
      !diameterObservation3
    ) {
      // Clear relevant fields if all are empty
      setFormValues((prev) => ({
        ...prev,
        diameterAvg: "",
        diameterMax: "",
        diameterMin: "",
        diameterObservation1: "",
        diameterObservation2: "",
        diameterObservation3: "",
      }));
      return; // Exit the function early
    }

    const values = [
      diameterMax,
      diameterMin,
      diameterObservation1,
      diameterObservation2,
      diameterObservation3,
    ]
      .map(Number)
      .filter((value) => !isNaN(value));

    if (values.length > 0) {
      const avg = values.reduce((acc, curr) => acc + curr, 0) / values.length;
      const formattedAvg = avg.toFixed(2); // Format to two decimal places
      setFormValues((prev) => ({ ...prev, diameterAvg: formattedAvg }));
    } else {
      setFormValues((prev) => ({ ...prev, diameterAvg: "" }));
    }
  };

  const handleDiameterBlur = (e) => {
    const { name, value } = e.target;
    const lowLimit = parseFloat(formValues.diameterLowLimit);
    const highLimit = parseFloat(formValues.diameterHighLimit);

    if (
      (name === "diameterMax" ||
        name === "diameterMin" ||
        name.startsWith("diameterObservation")) &&
      (value < lowLimit || value > highLimit)
    ) {
      message.warning(`Value must be between ${lowLimit} and ${highLimit}`);
    }

    // Recalculate average on blur
    calculateDiameterAverage();
  };

  // calculateMoistureLimits
  const calculateMoistureLimits = () => {
    const { moistureSpecification } = formValues;
    if (moistureSpecification) {
      const specification = parseFloat(moistureSpecification);
      const lowLimit = specification - 0.5; // ±0.5
      const highLimit = specification + 0.5;

      setFormValues((prev) => ({
        ...prev,
        moistureLowLimit: lowLimit,
        moistureHighLimit: highLimit,
      }));
    }
  };

  const calculateMoistureAverage = () => {
    const {
      moistureMax,
      moistureMin,
      moistureObservation1,
      moistureObservation2,
      moistureObservation3,
    } = formValues;

    // Check if the main fields are empty
    if (
      !moistureMax &&
      !moistureMin &&
      !moistureObservation1 &&
      !moistureObservation2 &&
      !moistureObservation3
    ) {
      // Clear relevant fields if all are empty
      setFormValues((prev) => ({
        ...prev,
        moistureAvg: "",
        moistureMax: "",
        moistureMin: "",
        moistureObservation1: "",
        moistureObservation2: "",
        moistureObservation3: "",
      }));
      return; // Exit the function early
    }

    const values = [
      moistureMax,
      moistureMin,
      moistureObservation1,
      moistureObservation2,
      moistureObservation3,
    ]
      .map(Number)
      .filter((value) => !isNaN(value));

    if (values.length > 0) {
      const avg = values.reduce((acc, curr) => acc + curr, 0) / values.length;
      const formattedAvg = avg.toFixed(2); // Format to two decimal places
      setFormValues((prev) => ({ ...prev, moistureAvg: formattedAvg }));
    } else {
      setFormValues((prev) => ({ ...prev, moistureAvg: "" }));
    }
  };

  const handleMoistureBlur = (e) => {
    const { name, value } = e.target;
    const lowLimit = parseFloat(formValues.moistureLowLimit);
    const highLimit = parseFloat(formValues.moistureHighLimit);

    if (
      (name === "moistureMax" ||
        name === "moistureMin" ||
        name.startsWith("moistureObservation")) &&
      (value < lowLimit || value > highLimit)
    ) {
      message.warning(`Value must be between ${lowLimit} and ${highLimit}`);
    }

    // Recalculate average on blur
    calculateMoistureAverage();
  };

  // calculateCountPerPackLimits
  const calculateCountPerPackLimits = () => {
    const { countPerPackStd } = formValues;
    if (countPerPackStd) {
      const specification = parseFloat(countPerPackStd);
      const lowLimit = specification - 0; // Adjust according to your logic
      const highLimit = specification + 2;

      setFormValues((prev) => ({
        ...prev,
        countPerPacklowlimit: lowLimit,
        countPerPackhighlimit: highLimit,
      }));
    }
  };

  const calculateCountPerPackAverage = () => {
    const {
      countPerPackMax,
      countPerPackMin,
      countPerPackObservation1,
      countPerPackObservation2,
      countPerPackObservation3,
    } = formValues;

    // Check if the main fields are empty
    if (
      !countPerPackMax &&
      !countPerPackMin &&
      !countPerPackObservation1 &&
      !countPerPackObservation2 &&
      !countPerPackObservation3
    ) {
      // Clear relevant fields if all are empty
      setFormValues((prev) => ({
        ...prev,
        countPerPackObservationAvg: "",
        countPerPackMax: "",
        countPerPackMin: "",
        countPerPackObservation1: "",
        countPerPackObservation2: "",
        countPerPackObservation3: "",
      }));
      return; // Exit the function early
    }

    const values = [
      countPerPackMax,
      countPerPackMin,
      countPerPackObservation1,
      countPerPackObservation2,
      countPerPackObservation3,
    ]
      .map(Number)
      .filter((value) => !isNaN(value));

    if (values.length > 0) {
      const avg = values.reduce((acc, curr) => acc + curr, 0) / values.length;
      const formattedAvg = avg.toFixed(2); // Format to two decimal places
      setFormValues((prev) => ({
        ...prev,
        countPerPackObservationAvg: formattedAvg,
      }));
    } else {
      setFormValues((prev) => ({ ...prev, countPerPackObservationAvg: "" }));
    }
  };

  const handleCountPerPackBlur = (e) => {
    const { name, value } = e.target;
    const lowLimit = parseFloat(formValues.countPerPacklowlimit);
    const highLimit = parseFloat(formValues.countPerPackhighlimit);

    if (
      (name === "countPerPackMax" ||
        name === "countPerPackMin" ||
        name.startsWith("countPerPackObservation")) &&
      (value < lowLimit || value > highLimit)
    ) {
      message.warning(`Value must be between ${lowLimit} and ${highLimit}`);
    }

    // Recalculate average on blur
    calculateCountPerPackAverage();
  };

  // calculateGrossWeightLimits
  const calculateGrossWeightLimits = () => {
    const { grossWeightStd } = formValues;
    if (grossWeightStd) {
      const specification = parseFloat(grossWeightStd);
      const lowLimit = specification - specification * 0.05; // ±5%
      const highLimit = specification + specification * 0.05;

      setFormValues((prev) => ({
        ...prev,
        grossWeightLowLimit: lowLimit,
        grossWeightHighLimit: highLimit,
      }));
    }
  };

  const handleGrossWeightBlur = (e) => {
    const { name, value } = e.target;
    const lowLimit = parseFloat(formValues.grossWeightLowLimit);
    const highLimit = parseFloat(formValues.grossWeightHighLimit);

    if (
      (name === "grossWeightMax" ||
        name === "grossWeightMin" ||
        name.startsWith("grossWeightObservation")) &&
      (value < lowLimit || value > highLimit)
    ) {
      message.warning(`Value must be between ${lowLimit} and ${highLimit}`);
    }

    // Recalculate average on blur
    calculateGrossWeightAverage();
  };

  const calculateGrossWeightAverage = () => {
    const {
      grossWeightMax,
      grossWeightMin,
      grossWeightObservation1,
      grossWeightObservation2,
      grossWeightObservation3,
    } = formValues;

    // Check if the main fields are empty
    if (
      !grossWeightMax &&
      !grossWeightMin &&
      !grossWeightObservation1 &&
      !grossWeightObservation2 &&
      !grossWeightObservation3
    ) {
      // Clear relevant fields if all are empty
      setFormValues((prev) => ({
        ...prev,
        grossWeightAvg: "",
        grossWeightMax: "",
        grossWeightMin: "",
        grossWeightObservation1: "",
        grossWeightObservation2: "",
        grossWeightObservation3: "",
      }));
      return; // Exit the function early
    }

    const values = [
      grossWeightMax,
      grossWeightMin,
      grossWeightObservation1,
      grossWeightObservation2,
      grossWeightObservation3,
    ]
      .map(Number)
      .filter((value) => !isNaN(value));

    if (values.length > 0) {
      const avg = values.reduce((acc, curr) => acc + curr, 0) / values.length;
      const formattedAvg = avg.toFixed(2); // Format to two decimal places
      setFormValues((prev) => ({ ...prev, grossWeightAvg: formattedAvg }));
    } else {
      setFormValues((prev) => ({ ...prev, grossWeightAvg: "" }));
    }
  };

  // calculateFillingHeightLimits
  const calculateFillingHeightLimits = () => {
    const { fillingHeightStd } = formValues;
    if (fillingHeightStd) {
      const specification = parseFloat(fillingHeightStd);
      const lowLimit = specification - specification * 0.05; // ±5%
      const highLimit = specification + specification * 0.05;

      setFormValues((prev) => ({
        ...prev,
        fillingHeightlowlimit: lowLimit,
        fillingHeighthighlimit: highLimit,
      }));
    }
  };

  const calculateFillingHeightAverage = () => {
    const {
      fillingHeightMax,
      fillingHeightMin,
      fillingHeightObservation1,
      fillingHeightObservation2,
      fillingHeightObservation3,
    } = formValues;

    // Check if the main fields are empty
    if (
      !fillingHeightMax &&
      !fillingHeightMin &&
      !fillingHeightObservation1 &&
      !fillingHeightObservation2 &&
      !fillingHeightObservation3
    ) {
      // Clear relevant fields if all are empty
      setFormValues((prev) => ({
        ...prev,
        fillingHeightAvg: "",
        fillingHeightMax: "",
        fillingHeightMin: "",
        fillingHeightObservation1: "",
        fillingHeightObservation2: "",
        fillingHeightObservation3: "",
      }));
      return; // Exit the function early
    }

    const values = [
      fillingHeightMax,
      fillingHeightMin,
      fillingHeightObservation1,
      fillingHeightObservation2,
      fillingHeightObservation3,
    ]
      .map(Number)
      .filter((value) => !isNaN(value));

    if (values.length > 0) {
      const avg = values.reduce((acc, curr) => acc + curr, 0) / values.length;
      const formattedAvg = avg.toFixed(2); // Format to two decimal places
      setFormValues((prev) => ({ ...prev, fillingHeightAvg: formattedAvg }));
    } else {
      setFormValues((prev) => ({ ...prev, fillingHeightAvg: "" }));
    }
  };

  const handleFillingHeightBlur = (e) => {
    const { name, value } = e.target;
    const lowLimit = parseFloat(formValues.fillingHeightlowlimit);
    const highLimit = parseFloat(formValues.fillingHeighthighlimit);

    if (
      (name === "fillingHeightMax" ||
        name === "fillingHeightMin" ||
        name.startsWith("fillingHeightObservation")) &&
      (value < lowLimit || value > highLimit)
    ) {
      message.warning(`Value must be between ${lowLimit} and ${highLimit}`);
    }

    // Recalculate average on blur
    calculateFillingHeightAverage();
  };

  // handleSelectChange
  const handleSelectChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log(" e.target.value", value);
  };

  const handleSelectText = (e, name) => {
    if (e.key === "Enter") {
      setFormValues({
        ...formValues,
        [name]: e.target.value,
      });
    }
    console.log(" e.target.value", e.target.value);
  };

  // getdata
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Replace the URL with the correct API endpoint and the parameter (requis_num)
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API.prodUrl}/Precot/api/chemicaltest/CLF029?requis_num=${uniqueReqNo}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              responseType: "json",
            }
          );

          if (Array.isArray(response.data) && response.data.length > 0) {
            console.log("enterd to repse there section");
            setMainID(response.data[0].test_id);

            const data = response.data[0];
            setSelectedRow(response.data[0]);

            //getImage1
            const username = response.data[0]?.qc_sign_b;
            console.log("username", username);
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
                // console.log("Response:", res.data);
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
                // console.log("Error in fetching image:", err);
              });

            // getimage2
            const username2 = response.data[0]?.develop_sign;
            console.log("username", username);
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  responseType: "arraybuffer",
                }
              )
              .then((res) => {
                // console.log("Response:", res.data);
                const base64 = btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );
                const url = `data:image/jpeg;base64,${base64}`;
                setGetImage2(url);
              })
              .catch((err) => {
                // console.log("Error in fetching image:", err);
              });

            // getimage3
            const username3 = response.data[0]?.hod_sign;
            console.log("username", username);
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${username3}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  responseType: "arraybuffer",
                }
              )
              .then((res) => {
                // console.log("Response:", res.data);
                const base64 = btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );
                const url = `data:image/jpeg;base64,${base64}`;
                setGetImage3(url);
              })
              .catch((err) => {
                // console.log("Error in fetching image:", err);
              });

            // get image4
            const username4 = response.data[0]?.chemist_sign;
            console.log("username", username);
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${username4}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  responseType: "arraybuffer",
                }
              )
              .then((res) => {
                // console.log("Response:", res.data);
                const base64 = btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );
                const url = `data:image/jpeg;base64,${base64}`;
                setGetImage4(url);
              })
              .catch((err) => {
                // console.log("Error in fetching image:", err);
              });

            // getimage5
            const username5 = response.data[0]?.ins_sign;
            console.log("username", username);
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${username5}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  responseType: "arraybuffer",
                }
              )
              .then((res) => {
                // console.log("Response:", res.data);
                const base64 = btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );
                const url = `data:image/jpeg;base64,${base64}`;
                setGetImage5(url);
              })
              .catch((err) => {
                // console.log("Error in fetching image:", err);
              });

            // getimage6
            const username6 = response.data[0]?.qc_sign;
            console.log("username", username);
            axios
              .get(
                `${API.prodUrl}/Precot/api/Format/Service/image?username=${username6}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  responseType: "arraybuffer",
                }
              )
              .then((res) => {
                // console.log("Response:", res.data);
                const base64 = btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );
                const url = `data:image/jpeg;base64,${base64}`;
                setGetImage6(url);
              })
              .catch((err) => {
                // console.log("Error in fetching image:", err);
              });

            if (roleauth === "ROLE_QA") {
              if (
                (response.data[0].chemist_status === "WAITING_FOR_APPROVAL" &&
                  response.data[0].qc_status === "QC_REJECTED") ||
                (response.data[0].chemist_status === "WAITING_FOR_APPROVAL" &&
                  response.data[0].qc_status === "QA_REJECTED")
              ) {
                message.warning("Operator Not Yet Approved");
                setTimeout(() => {
                  navigate("/Precot/QualityControl/F-029/Summary");
                }, 1500);
              }
            }
            if (roleauth === "QA_MANAGER" || roleauth === "QC_MANAGER") {
              if (
                response.data[0].chemist_status === "OPERATOR_APPROVED" &&
                response.data[0].ins_status === "WAITING_FOR_APPROVAL"
              ) {
                message.warning("QA Inspector Not Yet Approved");
                setTimeout(() => {
                  navigate("/Precot/QualityControl/F-029/Summary");
                }, 1500);
              }
              if (
                (response.data[0].chemist_status === "WAITING_FOR_APPROVAL" &&
                  response.data[0].qc_status === "QC_REJECTED") ||
                (response.data[0].chemist_status === "WAITING_FOR_APPROVAL" &&
                  response.data[0].qc_status === "QA_REJECTED")
              ) {
                // message.warning("");
                setTimeout(() => {
                  navigate("/Precot/QualityControl/F-029/Summary");
                }, 1500);
              }
            }
            if (roleauth === "DEVELOPMENT_MANAGER") {
              if (
                response.data[0].ins_status === "QA_INSPECTOR_APPROVED" &&
                response.data[0].qc_status_b === "WAITING_FOR_APPROVAL"
              ) {
                message.warning("QC/QA MANAGER  Not Yet Approved");
                setTimeout(() => {
                  navigate("/Precot/QualityControl/F-029/Summary");
                }, 1500);
              }
              if (
                (response.data[0].chemist_status === "WAITING_FOR_APPROVAL" &&
                  response.data[0].qc_status === "QC_REJECTED") ||
                (response.data[0].chemist_status === "WAITING_FOR_APPROVAL" &&
                  response.data[0].qc_status === "QA_REJECTED") ||
                (response.data[0].chemist_status === "OPERATOR_APPROVED" &&
                  response.data[0].ins_status === "WAITING_FOR_APPROVAL")
              ) {
                message.warning(
                  "Operator, QA Inspector or QC/QA MANAGER  Not Yet Approved"
                );
                setTimeout(() => {
                  navigate("/Precot/QualityControl/F-029/Summary");
                }, 1500);
              }
            }
            if (roleauth === "ROLE_HOD") {
              if (
                (response.data[0].qc_status_b === "QA_APPROVED" &&
                  response.data[0].develop_status === "WAITING_FOR_APPROVAL") ||
                (response.data[0].qc_status_b === "QC_APPROVED" &&
                  response.data[0].develop_status === "WAITING_FOR_APPROVAL")
              ) {
                message.warning("DEVELOPMENT MANAGER  Not Yet Approved");
                setTimeout(() => {
                  navigate("/Precot/QualityControl/F-029/Summary");
                }, 1500);
              }
              if (
                (response.data[0].chemist_status === "WAITING_FOR_APPROVAL" &&
                  response.data[0].qc_status === "QC_REJECTED") ||
                (response.data[0].chemist_status === "WAITING_FOR_APPROVAL" &&
                  response.data[0].qc_status === "QA_REJECTED") ||
                (response.data[0].chemist_status === "OPERATOR_APPROVED" &&
                  response.data[0].ins_status === "WAITING_FOR_APPROVAL") ||
                (response.data[0].ins_status === "QA_INSPECTOR_APPROVED" &&
                  response.data[0].qc_status_b === "WAITING_FOR_APPROVAL")
              ) {
                message.warning(
                  "Operator, QA Inspector, QC/QA MANAGER or Developement Manager Not Yet Approved"
                );
                setTimeout(() => {
                  navigate("/Precot/QualityControl/F-029/Summary");
                }, 1500);
              }
            }
            if (roleauth === "QA_MANAGER" || roleauth === "QC_MANAGER") {
              if (
                response.data[0].develop_status ===
                  "DEVELOPMENT_MANAGER_APPROVED" &&
                response.data[0].hod_status === "WAITING_FOR_APPROVAL"
              ) {
                message.warning("HOD Not Yet Approved");
                setTimeout(() => {
                  navigate("/Precot/QualityControl/F-029/Summary");
                }, 1500);
              }

              if (
                (response.data[0].chemist_status === "WAITING_FOR_APPROVAL" &&
                  response.data[0].qc_status === "QC_REJECTED") ||
                (response.data[0].chemist_status === "WAITING_FOR_APPROVAL" &&
                  response.data[0].qc_status === "QA_REJECTED") ||
                (response.data[0].chemist_status === "OPERATOR_APPROVED" &&
                  response.data[0].ins_status === "WAITING_FOR_APPROVAL")
              ) {
                message.warning(
                  "Operator, QA Inspector, QC/QA MANAGER, Developement Manager or HOD Not Yet Approved"
                );
                setTimeout(() => {
                  navigate("/Precot/QualityControl/F-029/Summary");
                }, 1500);
              }
            }
            // Map the API response data to form values
            setFormValues({
              requisitionNo: data.requisitionNo,
              dispatchDate: data.dispatchDate,
              customer: data.customer,
              productDescription: data.productDescription,
              standardMixing: data.mixing,
              bagType: data.bagType,

              patternSpecification: data.pattern,
              patternWholeText: data.pattern_a,

              edgeSpecification: data.edge,
              edgeWholeText: data.edge_a,

              gsmSpecification: data.gsmGpm,
              gsmMax: data.gsmGpm_a,
              gsmMin: data.gsmGpm_b,
              gsmObservation1: data.gsmGpm_c,
              gsmObservation2: data.gsmGpm_d,
              gsmObservation3: data.gsmGpm_e,
              gsmAvg: data.gsmGpm_avg,

              thicknessSpecification: data.thickness,
              thicknessMax: data.thickness_a,
              thicknessMin: data.thickness_b,
              thicknessObservation1: data.thickness_c,
              thicknessObservation2: data.thickness_d,
              thicknessObservation3: data.thickness_e,
              thicknessAvg: data.thickness_avg,

              singlePadSpecification: data.padWeight,
              singlePadMax: data.padWeight_a,
              singlePadMin: data.padWeight_b,
              singlePadObservation1: data.padWeight_c,
              singlePadObservation2: data.padWeight_d,
              singlePadObservation3: data.padWeight_e,
              singlePadAvg: data.padWeight_avg,

              dimensionLengthSpecification: data.dimensionLength,
              dimensionLengthMax: data.dimensionLength_a,
              dimensionLengthMin: data.dimensionLength_b,
              dimensionLengthObservation1: data.dimensionLength_c,
              dimensionLengthObservation2: data.dimensionLength_d,
              dimensionLengthObservation3: data.dimensionLength_e,
              dimensionLengthAvg: data.dimensionLength_avg,

              dimensionWidthSpecification: data.dimensionWidth,
              dimensionWidthMax: data.dimensionWidth_a,
              dimensionWidthMin: data.dimensionWidth_b,
              dimensionWidthObservation1: data.dimensionWidth_c,
              dimensionWidthObservation2: data.dimensionWidth_d,
              dimensionWidthObservation3: data.dimensionWidth_e,
              dimensionWidthAvg: data.dimensionWidth_avg,

              dimensionHeightSpecification: data.dimensionHeight,
              dimensionHeightMax: data.dimensionHeight_a,
              dimensionHeightMin: data.dimensionHeight_b,
              dimensionHeightObservation1: data.dimensionHeight_c,
              dimensionHeightObservation2: data.dimensionHeight_d,
              dimensionHeightObservation3: data.dimensionHeight_e,
              dimensionHeightAvg: data.dimensionHeight_avg,

              diameterSpecification: data.diameter,
              diameterMax: data.diameter_a,
              diameterMin: data.diameter_b,
              diameterObservation1: data.diameter_c,
              diameterObservation2: data.diameter_d,
              diameterObservation3: data.diameter_e,
              diameterAvg: data.diameter_avg,

              moistureSpecification: data.moisture,
              moistureMax: data.moisture_a,
              moistureMin: data.moisture_b,
              moistureObservation1: data.moisture_c,
              moistureObservation2: data.moisture_d,
              moistureObservation3: data.moisture_e,
              moistureAvg: data.moisture_avg,

              countPerPackStd: data.countPerPack,
              countPerPackMax: data.countPerPack_a,
              countPerPackMin: data.countPerPack_b,
              countPerPackObservation1: data.countPerPack_c,
              countPerPackObservation2: data.countPerPack_d,
              countPerPackObservation3: data.countPerPack_e,
              countPerPackObservationAvg: data.countPerPack_avg,

              grossWeightStd: data.packGrossWeight,
              grossWeightMax: data.packGrossWeight_a,
              grossWeightMin: data.packGrossWeight_b,
              grossWeightObservation1: data.packGrossWeight_c,
              grossWeightObservation2: data.packGrossWeight_d,
              grossWeightObservation3: data.packGrossWeight_e,
              grossWeightAvg: data.packGrossWeight_avg,

              fillingHeightStd: data.packFillingHeight,
              fillingHeightMax: data.packFillingHeight_a,
              fillingHeightMin: data.packFillingHeight_b,
              fillingHeightObservation1: data.packFillingHeight_c,
              fillingHeightObservation2: data.packFillingHeight_d,
              fillingHeightObservation3: data.packFillingHeight_e,
              fillingHeightAvg: data.packFillingHeight_avg,

              bagPackType: data.packType,

              bagPackLength: data.packDimensionsLength,
              bagPackWidth: data.packDimensionsWidth,
              bagPackGussetHeight: data.gussetHeight,
              bagPackMicronThickness: data.packMicronThickness,

              overallAppearance: data.overallAppearance,
              cdMd: data.cdMd,
              sampleCollectedFrom: data.sampleCollectedFrom,

              batchNo: data.batchNo,
              mixing: data.mixing_b,
              finish: data.finish,
              absorbency: data.absorbency,
              lN: data.ln_mm,
              wSS: data.wss,
              sinking: data.sinkingTime,
              micronaireValue: data.micron_value,
              eSS: data.ess,
              whitenessIndex: data.whitenessIndex,
              pH: data.ph,
              sA: data.sa,
              uQL: data.uql_mm,
              ashContent: data.ashContent,
              neps: data.nepsPerGm,
              lW: data.lw_mm,
              fluorescence: data.fluorence,
              odor: data.odr,

              budType: data.budType,
              stickMadeFrom: data.stickMaterial,
              stickDiameter: data.stickDiameter,
              stickColour: data.stickColor,
              stickLength: data.stickLength,
              budShape: data.budShape,
              budsFullLength: data.budFullLength,
              cottonLength: data.cottonLength,
              singleBudWeight: data.singleBudWeight,
              budDiameter: data.budDiameter,
              packagingType: data.packagingType,
              packagingMadeFrom: data.packagingMaterial,
              packagingWidth: data.packagingWidth,
              packagingLength: data.packagingLength,
              packagingHeight: data.packagingHeight,
              packagingGrossWeight: data.packagingGrossWeight,
              moisture: data.finalmoisture,
              stickStrength: data.stickStrength,

              remarks: data.remarks,

              approvedSampleRequestNo: data.sample_requistion,
              firstProductionRemark: data.remarks_a,
            });
          }
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };

      if (uniqueReqNo) {
        fetchData();
      }
    }
  }, [uniqueReqNo]);

  const handleApprove = async () => {
    setSaveLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/chemicaltest/CLF029/approval`,
        {
          id: mainID,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        // console.log("res in approve", res);
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-029/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        // console.log("Err", err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleRejectModal = () => {
    setShowModal(true);
    // console.log("print screen works");
  };

  const handleReject = async () => {
    setSubmitLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/chemicaltest/CLF029/approval`,
        {
          id: mainID,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        // console.log("messsage reject", res.data.message);
        setSubmitLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-029/Summary");
      })
      .catch((err) => {
        // console.log("Err in reject", err.response.data.message);
        setSubmitLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleThirdLevelApprove = async () => {
    setSaveLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Create the base payload
    let payload = {
      id: mainID,
      status: "Approve",
    };

    // Conditionally add the sample requisition and remarks if the role matches
    if (roleauth === "QC_MANAGER" || roleauth === "QA_MANAGER") {
      payload.sample_requistion =
        formValues.approvedSampleRequestNo?.trim() || "NA";
      payload.remarks_a = formValues.firstProductionRemark?.trim() || "NA";
    }

    // Make the API call
    await axios
      .put(
        `${API.prodUrl}/Precot/api/chemicaltest/CLF029/SEC/approval`,
        payload,
        {
          headers,
        }
      )
      .then((res) => {
        setSaveLoading(false);
        message.success(res.data.message);
        navigate("/Precot/QualityControl/F-029/Summary");
      })
      .catch((err) => {
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const canEdit = () => {
    if (roleauth === "ROLE_OPERATOR") {
      return !(
        (selectedRow?.chemist_status === "OPERATOR_APPROVED" &&
          selectedRow?.ins_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.chemist_status === "OPERATOR_APPROVED" &&
          selectedRow?.ins_status === "QA_INSPECTOR_APPROVED")
      );
    } else if (roleauth === "ROLE_QA") {
      return !(
        (selectedRow &&
          selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qc_status_b === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qc_status_b === "QC_APPROVED") ||
        (selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qc_status_b === "QA_APPROVED") ||
        selectedRow?.chemist_status === "WAITING_FOR_APPROVAL"
      );
    } else if (roleauth === "QA_MANAGER" || roleauth === "QC_MANAGER") {
      return !(
        (selectedRow &&
          selectedRow?.qc_status_b === "QA_APPROVED" &&
          selectedRow?.develop_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.qc_status_b === "QA_APPROVED" &&
          selectedRow?.develop_status === "DEVELOPMENT_MANAGER_APPROVED") ||
        (selectedRow?.qc_status_b === "QC_APPROVED" &&
          selectedRow?.develop_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.qc_status_b === "QC_APPROVED" &&
          selectedRow?.develop_status === "DEVELOPMENT_MANAGER_APPROVED") ||
        (selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qc_status_b === "WAITING_FOR_APPROVAL") ||
        selectedRow?.chemist_status === "WAITING_FOR_APPROVAL"
      );
    } else if (roleauth === "DEVELOPMENT_MANAGER") {
      return !(
        (selectedRow &&
          selectedRow?.develop_status === "DEVELOPMENT_MANAGER_APPROVED" &&
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.develop_status === "DEVELOPMENT_MANAGER_APPROVED" &&
          selectedRow?.hod_status === "HOD_APPROVED") ||
        (selectedRow?.qc_status_b === "QC_APPROVED" &&
          selectedRow?.develop_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.qc_status_b === "QA_APPROVED" &&
          selectedRow?.develop_status === "WAITING_FOR_APPROVAL") ||
        selectedRow?.chemist_status === "WAITING_FOR_APPROVAL"
      );
    } else if (roleauth === "ROLE_HOD") {
      return !(
        (selectedRow &&
          selectedRow?.hod_status === "HOD_APPROVED" &&
          selectedRow?.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.hod_status === "HOD_APPROVED" &&
          selectedRow?.qc_status === "QC_APPROVED") ||
        (selectedRow?.hod_status === "HOD_APPROVED" &&
          selectedRow?.qc_status === "QA_APPROVED") ||
        (selectedRow?.develop_status === "DEVELOPMENT_MANAGER_APPROVED" &&
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
        selectedRow?.chemist_status === "WAITING_FOR_APPROVAL"
      );
    } else if (roleauth === "QA_MANAGER" || roleauth === "QC_MANAGER") {
      return !(
        (selectedRow &&
          selectedRow?.hod_status === "HOD_APPROVED" &&
          selectedRow?.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.chemist_status === "WAITING_FOR_APPROVAL" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        (selectedRow?.chemist_status === "WAITING_FOR_APPROVAL" &&
          selectedRow?.qc_status === "QA_REJECTED") ||
        // after reject
        (selectedRow?.chemist_status === "OPERATOR_APPROVED" &&
          selectedRow?.ins_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qc_status_b === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.qc_status_b === "QA_APPROVED" &&
          selectedRow?.develop_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.qc_status_b === "QC_APPROVED" &&
          selectedRow?.develop_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.develop_status === "DEVELOPMENT_MANAGER_APPROVED" &&
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL")
      );
    } else {
      return false;
    }
  };

  let isEditable = canEdit();

  const canDisplayButtonSave = () => {
    if (roleauth === "ROLE_OPERATOR") {
      if (
        (selectedRow?.chemist_status === "OPERATOR_APPROVED" &&
          selectedRow?.ins_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.chemist_status === "OPERATOR_APPROVED" &&
          selectedRow?.ins_status === "QA_INSPECTOR_APPROVED") ||
        (selectedRow?.chemist_status === "WAITING_FOR_APPROVAL" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        (selectedRow?.chemist_status === "WAITING_FOR_APPROVAL" &&
          selectedRow?.qc_status === "QA_REJECTED")
      ) {
        return "none";
      } else {
        return "block";
      }
    } else if (roleauth === "ROLE_QA") {
      if (
        (selectedRow &&
          selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qc_status_b === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qc_status_b === "QC_APPROVED") ||
        (selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qc_status_b === "QA_APPROVED") ||
        (selectedRow?.chemist_status === "OPERATOR_APPROVED" &&
          selectedRow?.qc_status === "QA_REJECTED") ||
        (selectedRow?.chemist_status === "OPERATOR_APPROVED" &&
          selectedRow?.qc_status === "QC_REJECTED") ||
        selectedRow?.chemist_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else {
        return "block";
      }
    } else if (roleauth === "QA_MANAGER" || roleauth === "QC_MANAGER") {
      if (
        (selectedRow &&
          selectedRow?.qc_status_b === "QA_APPROVED" &&
          selectedRow?.develop_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.qc_status_b === "QA_APPROVED" &&
          selectedRow?.develop_status === "DEVELOPMENT_MANAGER_APPROVED") ||
        (selectedRow?.qc_status_b === "QC_APPROVED" &&
          selectedRow?.develop_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.qc_status_b === "QC_APPROVED" &&
          selectedRow?.develop_status === "DEVELOPMENT_MANAGER_APPROVED") ||
        selectedRow?.chemist_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else {
        return "block";
      }
    } else if (roleauth === "DEVELOPMENT_MANAGER") {
      if (
        (selectedRow &&
          selectedRow?.develop_status === "DEVELOPMENT_MANAGER_APPROVED" &&
          selectedRow?.hod_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.develop_status === "DEVELOPMENT_MANAGER_APPROVED" &&
          selectedRow?.hod_status === "HOD_APPROVED") ||
        selectedRow?.chemist_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else {
        return "block";
      }
    } else if (roleauth === "ROLE_HOD") {
      if (
        (selectedRow &&
          selectedRow?.hod_status === "HOD_APPROVED" &&
          selectedRow?.qc_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.hod_status === "HOD_APPROVED" &&
          selectedRow?.qc_status === "QC_APPROVED") ||
        (selectedRow?.hod_status === "HOD_APPROVED" &&
          selectedRow?.qc_status === "QA_APPROVED") ||
        selectedRow?.chemist_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_OPERATOR") {
      if (
        (selectedRow?.chemist_status === "OPERATOR_APPROVED" &&
          selectedRow?.ins_status === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.chemist_status === "OPERATOR_APPROVED" &&
          selectedRow?.ins_status === "QA_INSPECTOR_APPROVED")
      ) {
        return "none";
      } else {
        return "block";
      }
    } else if (roleauth === "ROLE_QA") {
      if (
        (selectedRow &&
          selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qc_status_b === "WAITING_FOR_APPROVAL") ||
        (selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qc_status_b === "QC_APPROVED") ||
        (selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
          selectedRow?.qc_status_b === "QA_APPROVED") ||
        selectedRow?.chemist_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else {
        return "block";
      }
    } else if (roleauth === "QA_MANAGER" || roleauth === "QC_MANAGER") {
      if (
        selectedRow &&
        (selectedRow?.qc_status !== "WAITING_FOR_APPROVAL" ||
          selectedRow?.qc_status === "QC_REJECTED" ||
          selectedRow?.qc_status === "QA_REJECTED" ||
          selectedRow?.qc_status === "QC_APPROVED" ||
          selectedRow?.qc_status === "QA_APPROVED")
      ) {
        return "none";
      } else {
        return "block";
      }
    }
  };

  const handleSave = async () => {
    console.log("mainID", mainID);
    setSaveLoading(true);
    console.log("uniqueDepartment,", uniqueDepartment);
    let payload = {};

    if (["PAD PUNCHING", "SPUNLACE", "DRY GOODS"].includes(uniqueDepartment)) {
      payload = {
        test_id: mainID || "", // Assuming this is Report for now
        format: "Requisition Sample Analysis Report", // Assuming this is hardcoded for now
        unit_h: "Unit H", // Assuming this is hardcoded for now
        format_no: "PH-QCL01/F-029", // Assuming this is hardcoded for now
        ref_sop_no: "PH-QCL01-D-03", // Assuming this is hardcoded for now
        revision_no: "01", // Assuming this is hardcoded for now

        department: uniqueDepartment,

        requisitionNo: formValues.requisitionNo,
        dispatchDate: formValues.dispatchDate,
        customer: formValues.customer,
        productDescription: formValues.productDescription,
        mixing: formValues.standardMixing,
        bagType: formValues.bagType,

        // Pattern Specifications
        pattern: formValues.patternSpecification,
        pattern_a: formValues.patternWholeText,

        // Edge Specifications
        edge: formValues.edgeSpecification,
        edge_a: formValues.edgeWholeText,

        // GSM Specifications
        gsmGpm: formValues.gsmSpecification,
        gsmGpm_a: formValues.gsmMax,
        gsmGpm_b: formValues.gsmMin,
        gsmGpm_c: formValues.gsmObservation1,
        gsmGpm_d: formValues.gsmObservation2,
        gsmGpm_e: formValues.gsmObservation3,
        gsmGpm_avg: formValues.gsmAvg,

        // Thickness Specifications
        thickness: formValues.thicknessSpecification,
        thickness_a: formValues.thicknessMax,
        thickness_b: formValues.thicknessMin,
        thickness_c: formValues.thicknessObservation1,
        thickness_d: formValues.thicknessObservation2,
        thickness_e: formValues.thicknessObservation3,
        thickness_avg: formValues.thicknessAvg,

        // Single Pad Specifications
        padWeight: formValues.singlePadSpecification,
        padWeight_a: formValues.singlePadMax,
        padWeight_b: formValues.singlePadMin,
        padWeight_c: formValues.singlePadObservation1,
        padWeight_d: formValues.singlePadObservation2,
        padWeight_e: formValues.singlePadObservation3,
        padWeight_avg: formValues.singlePadAvg,

        // Dimension Length Specifications
        dimensionLength: formValues.dimensionLengthSpecification,
        dimensionLength_a: formValues.dimensionLengthMax,
        dimensionLength_b: formValues.dimensionLengthMin,
        dimensionLength_c: formValues.dimensionLengthObservation1,
        dimensionLength_d: formValues.dimensionLengthObservation2,
        dimensionLength_e: formValues.dimensionLengthObservation3,
        dimensionLength_avg: formValues.dimensionLengthAvg,

        // Dimension Width Specifications
        dimensionWidth: formValues.dimensionWidthSpecification,
        dimensionWidth_a: formValues.dimensionWidthMax,
        dimensionWidth_b: formValues.dimensionWidthMin,
        dimensionWidth_c: formValues.dimensionWidthObservation1,
        dimensionWidth_d: formValues.dimensionWidthObservation2,
        dimensionWidth_e: formValues.dimensionWidthObservation3,
        dimensionWidth_avg: formValues.dimensionWidthAvg,

        // Dimension Height Specifications
        dimensionHeight: formValues.dimensionHeightSpecification,
        dimensionHeight_a: formValues.dimensionHeightMax,
        dimensionHeight_b: formValues.dimensionHeightMin,
        dimensionHeight_c: formValues.dimensionHeightObservation1,
        dimensionHeight_d: formValues.dimensionHeightObservation2,
        dimensionHeight_e: formValues.dimensionHeightObservation3,
        dimensionHeight_avg: formValues.dimensionHeightAvg,

        // Diameter Specifications
        diameter: formValues.diameterSpecification,
        diameter_a: formValues.diameterMax,
        diameter_b: formValues.diameterMin,
        diameter_c: formValues.diameterObservation1,
        diameter_d: formValues.diameterObservation2,
        diameter_e: formValues.diameterObservation3,
        diameter_avg: formValues.diameterAvg,

        // Moisture Specifications
        moisture: formValues.moistureSpecification,
        moisture_a: formValues.moistureMax,
        moisture_b: formValues.moistureMin,
        moisture_c: formValues.moistureObservation1,
        moisture_d: formValues.moistureObservation2,
        moisture_e: formValues.moistureObservation3,
        moisture_avg: formValues.moistureAvg,

        // Count per Pack Specifications
        countPerPack: formValues.countPerPackStd,
        countPerPack_a: formValues.countPerPackMax,
        countPerPack_b: formValues.countPerPackMin,
        countPerPack_c: formValues.countPerPackObservation1,
        countPerPack_d: formValues.countPerPackObservation2,
        countPerPack_e: formValues.countPerPackObservation3,
        countPerPack_avg: formValues.countPerPackObservationAvg,

        // Gross Weight Specifications
        packGrossWeight: formValues.grossWeightStd,
        packGrossWeight_a: formValues.grossWeightMax,
        packGrossWeight_b: formValues.grossWeightMin,
        packGrossWeight_c: formValues.grossWeightObservation1,
        packGrossWeight_d: formValues.grossWeightObservation2,
        packGrossWeight_e: formValues.grossWeightObservation3,
        packGrossWeight_avg: formValues.grossWeightAvg,

        // Filling Height Specifications
        packFillingHeight: formValues.fillingHeightStd,
        packFillingHeight_a: formValues.fillingHeightMax,
        packFillingHeight_b: formValues.fillingHeightMin,
        packFillingHeight_c: formValues.fillingHeightObservation1,
        packFillingHeight_d: formValues.fillingHeightObservation2,
        packFillingHeight_e: formValues.fillingHeightObservation3,
        packFillingHeight_avg: formValues.fillingHeightAvg,

        // Bag Pack Details
        packType: formValues.bagPackType,
        packDimensionsLength: formValues.bagPackLength,
        packDimensionsWidth: formValues.bagPackWidth,
        gussetHeight: formValues.bagPackGussetHeight,
        packMicronThickness: formValues.bagPackMicronThickness,

        // Additional Info
        overallAppearance: formValues.overallAppearance,
        cdMd: formValues.cdMd,
        sampleCollectedFrom: formValues.sampleCollectedFrom,
        remarks: formValues.remarks,
      };
    }
    if (uniqueDepartment === "BLEACHING") {
      payload = {
        test_id: mainID || "", // Assuming this is Report for now
        format: "Requisition Sample Analysis Report", // Assuming this is hardcoded for now
        unit_h: "Unit H", // Assuming this is hardcoded for now
        format_no: "PH-QCL01/F-029", // Assuming this is hardcoded for now
        ref_sop_no: "PH-QCL01-D-03", // Assuming this is hardcoded for now
        revision_no: "01", // Assuming this is hardcoded for now
        department: uniqueDepartment,

        requisitionNo: formValues.requisitionNo,
        dispatchDate: formValues.dispatchDate,
        customer: formValues.customer,
        productDescription: formValues.productDescription,
        mixing: formValues.standardMixing,
        bagType: formValues.bagType,
        batchNo: formValues.batchNo,
        absorbency: formValues.absorbency,
        sinkingTime: formValues.sinking, // Example value, can be dynamic if needed
        whitenessIndex: formValues.whitenessIndex,
        uql_mm: formValues.uQL,
        lw_mm: formValues.lW,
        ph: formValues.pH,
        ashContent: formValues.ashContent,
        micron_value: formValues.micronaireValue,
        ln_mm: formValues.lN,
        mixing_b: formValues.mixing, // Assuming 'mixing' is used here as 'mixing_b'
        fluorence: formValues.fluorescence,
        nepsPerGm: formValues.neps,
        odr: formValues.odor, // Example value
        sa: formValues.sA,
        finish: formValues.finish,
        wss: formValues.wSS,
        ess: formValues.eSS, // Example value
        remarks: formValues.remarks,
      };
    }

    if (uniqueDepartment === "COTTON BUDS") {
      payload = {
        test_id: mainID || "", // Assuming this is Report for now
        format: "Requisition Sample Analysis Report", // Hardcoded value
        unit_h: "Unit H", // Hardcoded value
        format_no: "PH-QCL01/F-029", // Hardcoded value
        ref_sop_no: "PH-QCL01-D-03", // Hardcoded value
        revision_no: "01", // Hardcoded value
        department: uniqueDepartment,
        requisitionNo: formValues.requisitionNo,
        dispatchDate: formValues.dispatchDate,
        customer: formValues.customer,
        productDescription: formValues.productDescription,
        mixing: formValues.standardMixing,
        bagType: formValues.bagType,

        budType: formValues.budType, // Hardcoded value
        stickMaterial: formValues.stickMadeFrom, // Hardcoded value
        stickDiameter: formValues.stickDiameter, // From form state
        stickColor: formValues.stickColour, // From form state
        stickLength: formValues.stickLength, // From form state
        budShape: formValues.budShape, // From form state
        budFullLength: formValues.budsFullLength, // From form state
        cottonLength: formValues.cottonLength, // From form state
        singleBudWeight: formValues.singleBudWeight, // From form state
        budDiameter: formValues.budDiameter, // From form state
        packagingType: formValues.packagingType, // From form state
        packagingMaterial: formValues.packagingMadeFrom, // Hardcoded value
        packagingWidth: formValues.packagingWidth, // From form state
        packagingLength: formValues.packagingLength, // From form state
        packagingHeight: formValues.packagingHeight, // From form state
        packagingGrossWeight: formValues.packagingGrossWeight, // From form state
        finalmoisture: formValues.moisture, // From form state
        stickStrength: formValues.stickStrength, // From form state
        remarks: formValues.remarks,
      };
    }

    console.log("payload", payload);

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/chemicaltest/CLF029/save/requis`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Requisition Sample Analysis Report saved successfully!");
      console.log("Save successful:", response.data);
      setSaveLoading(false);
      navigate("/Precot/QualityControl/F-029/Summary");
    } catch (error) {
      setSaveLoading(false);
      console.error("Error saving the form:", error);
      message.error("There was an error saving the form.");
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    console.log("uniqueDepartment,", uniqueDepartment);
    console.log("mainID", mainID);

    const setZeroIfEmpty = (value) =>
      value === undefined || value === "" || value === null ? "0" : value;

    const setNAIfEmpty = (value) =>
      value.trim() === undefined || value.trim() === "" || value.trim() === null
        ? "NA"
        : value;

    // Validate mandatory fields
    const requiredFields = [
      "dispatchDate", // Mandatory field
      "customer",
      "productDescription",
      "standardMixing",
      "bagType",
    ];

    for (const field of requiredFields) {
      if (!formValues[field]) {
        message.warning(`${field} is required.`);
        setSubmitLoading(false);
        return; // Exit the function if a required field is missing
      }
    }

    let payload = {};
    if (["PAD PUNCHING", "SPUNLACE", "DRY GOODS"].includes(uniqueDepartment)) {
      payload = {
        test_id: mainID || "", // Assuming this is Report for now
        format: "Requisition Sample Analysis Report", // Assuming this is hardcoded for now
        unit_h: "Unit H", // Assuming this is hardcoded for now
        format_no: "PH-QCL01/F-029", // Assuming this is hardcoded for now
        ref_sop_no: "PH-QCL01-D-03", // Assuming this is hardcoded for now
        revision_no: "01", // Assuming this is hardcoded for now
        department: uniqueDepartment,
        requisitionNo: formValues.requisitionNo,
        dispatchDate: formValues.dispatchDate,
        customer: setNAIfEmpty(formValues.customer),
        productDescription: setNAIfEmpty(formValues.productDescription),
        mixing: setNAIfEmpty(formValues.standardMixing),
        bagType: setNAIfEmpty(formValues.bagType),

        // Pattern Specifications
        pattern: setZeroIfEmpty(formValues.patternSpecification),
        pattern_a: setZeroIfEmpty(formValues.patternWholeText),

        // Edge Specifications
        edge: setZeroIfEmpty(formValues.edgeSpecification),
        edge_a: setZeroIfEmpty(formValues.edgeWholeText),

        // GSM Specifications
        gsmGpm: setZeroIfEmpty(formValues.gsmSpecification),
        gsmGpm_a: setZeroIfEmpty(formValues.gsmMax),
        gsmGpm_b: setZeroIfEmpty(formValues.gsmMin),
        gsmGpm_c: setZeroIfEmpty(formValues.gsmObservation1),
        gsmGpm_d: setZeroIfEmpty(formValues.gsmObservation2),
        gsmGpm_e: setZeroIfEmpty(formValues.gsmObservation3),
        gsmGpm_avg: setZeroIfEmpty(formValues.gsmAvg),

        // Thickness Specifications
        thickness: setZeroIfEmpty(formValues.thicknessSpecification),
        thickness_a: setZeroIfEmpty(formValues.thicknessMax),
        thickness_b: setZeroIfEmpty(formValues.thicknessMin),
        thickness_c: setZeroIfEmpty(formValues.thicknessObservation1),
        thickness_d: setZeroIfEmpty(formValues.thicknessObservation2),
        thickness_e: setZeroIfEmpty(formValues.thicknessObservation3),
        thickness_avg: setZeroIfEmpty(formValues.thicknessAvg),

        // Single Pad Specifications
        padWeight: setZeroIfEmpty(formValues.singlePadSpecification),
        padWeight_a: setZeroIfEmpty(formValues.singlePadMax),
        padWeight_b: setZeroIfEmpty(formValues.singlePadMin),
        padWeight_c: setZeroIfEmpty(formValues.singlePadObservation1),
        padWeight_d: setZeroIfEmpty(formValues.singlePadObservation2),
        padWeight_e: setZeroIfEmpty(formValues.singlePadObservation3),
        padWeight_avg: setZeroIfEmpty(formValues.singlePadAvg),

        // Dimension Length Specifications
        dimensionLength: setZeroIfEmpty(
          formValues.dimensionLengthSpecification
        ),
        dimensionLength_a: setZeroIfEmpty(formValues.dimensionLengthMax),
        dimensionLength_b: setZeroIfEmpty(formValues.dimensionLengthMin),
        dimensionLength_c: setZeroIfEmpty(
          formValues.dimensionLengthObservation1
        ),
        dimensionLength_d: setZeroIfEmpty(
          formValues.dimensionLengthObservation2
        ),
        dimensionLength_e: setZeroIfEmpty(
          formValues.dimensionLengthObservation3
        ),
        dimensionLength_avg: setZeroIfEmpty(formValues.dimensionLengthAvg),

        dimensionWidth: setZeroIfEmpty(formValues.dimensionWidthSpecification),
        dimensionWidth_a: setZeroIfEmpty(formValues.dimensionWidthMax),
        dimensionWidth_b: setZeroIfEmpty(formValues.dimensionWidthMin),
        dimensionWidth_c: setZeroIfEmpty(formValues.dimensionWidthObservation1),
        dimensionWidth_d: setZeroIfEmpty(formValues.dimensionWidthObservation2),
        dimensionWidth_e: setZeroIfEmpty(formValues.dimensionWidthObservation3),
        dimensionWidth_avg: setZeroIfEmpty(formValues.dimensionWidthAvg),

        // Dimension Height Specifications
        dimensionHeight: setZeroIfEmpty(
          formValues.dimensionHeightSpecification
        ),
        dimensionHeight_a: setZeroIfEmpty(formValues.dimensionHeightMax),
        dimensionHeight_b: setZeroIfEmpty(formValues.dimensionHeightMin),
        dimensionHeight_c: setZeroIfEmpty(
          formValues.dimensionHeightObservation1
        ),
        dimensionHeight_d: setZeroIfEmpty(
          formValues.dimensionHeightObservation2
        ),
        dimensionHeight_e: setZeroIfEmpty(
          formValues.dimensionHeightObservation3
        ),
        dimensionHeight_avg: setZeroIfEmpty(formValues.dimensionHeightAvg),

        // Diameter Specifications
        diameter: setZeroIfEmpty(formValues.diameterSpecification),
        diameter_a: setZeroIfEmpty(formValues.diameterMax),
        diameter_b: setZeroIfEmpty(formValues.diameterMin),
        diameter_c: setZeroIfEmpty(formValues.diameterObservation1),
        diameter_d: setZeroIfEmpty(formValues.diameterObservation2),
        diameter_e: setZeroIfEmpty(formValues.diameterObservation3),
        diameter_avg: setZeroIfEmpty(formValues.diameterAvg),

        // Moisture Specifications
        moisture: setZeroIfEmpty(formValues.moistureSpecification),
        moisture_a: setZeroIfEmpty(formValues.moistureMax),
        moisture_b: setZeroIfEmpty(formValues.moistureMin),
        moisture_c: setZeroIfEmpty(formValues.moistureObservation1),
        moisture_d: setZeroIfEmpty(formValues.moistureObservation2),
        moisture_e: setZeroIfEmpty(formValues.moistureObservation3),
        moisture_avg: setZeroIfEmpty(formValues.moistureAvg),

        // Count per Pack Specifications
        countPerPack: setZeroIfEmpty(formValues.countPerPackStd),
        countPerPack_a: setZeroIfEmpty(formValues.countPerPackMax),
        countPerPack_b: setZeroIfEmpty(formValues.countPerPackMin),
        countPerPack_c: setZeroIfEmpty(formValues.countPerPackObservation1),
        countPerPack_d: setZeroIfEmpty(formValues.countPerPackObservation2),
        countPerPack_e: setZeroIfEmpty(formValues.countPerPackObservation3),
        countPerPack_avg: setZeroIfEmpty(formValues.countPerPackObservationAvg),

        // Gross Weight Specifications
        packGrossWeight: setZeroIfEmpty(formValues.grossWeightStd),
        packGrossWeight_a: setZeroIfEmpty(formValues.grossWeightMax),
        packGrossWeight_b: setZeroIfEmpty(formValues.grossWeightMin),
        packGrossWeight_c: setZeroIfEmpty(formValues.grossWeightObservation1),
        packGrossWeight_d: setZeroIfEmpty(formValues.grossWeightObservation2),
        packGrossWeight_e: setZeroIfEmpty(formValues.grossWeightObservation3),
        packGrossWeight_avg: setZeroIfEmpty(formValues.grossWeightAvg),

        // Filling Height Specifications
        packFillingHeight: setZeroIfEmpty(formValues.fillingHeightStd),
        packFillingHeight_a: setZeroIfEmpty(formValues.fillingHeightMax),
        packFillingHeight_b: setZeroIfEmpty(formValues.fillingHeightMin),
        packFillingHeight_c: setZeroIfEmpty(
          formValues.fillingHeightObservation1
        ),
        packFillingHeight_d: setZeroIfEmpty(
          formValues.fillingHeightObservation2
        ),
        packFillingHeight_e: setZeroIfEmpty(
          formValues.fillingHeightObservation3
        ),
        packFillingHeight_avg: setZeroIfEmpty(formValues.fillingHeightAvg),

        // Bag Pack Details
        packType: setNAIfEmpty(formValues.bagPackType),
        packDimensionsLength: setZeroIfEmpty(formValues.bagPackLength),
        packDimensionsWidth: setZeroIfEmpty(formValues.bagPackWidth),
        gussetHeight: setZeroIfEmpty(formValues.bagPackGussetHeight),
        packMicronThickness: setZeroIfEmpty(formValues.bagPackMicronThickness),

        // Additional Info
        overallAppearance: setNAIfEmpty(formValues.overallAppearance),
        cdMd: setZeroIfEmpty(formValues.cdMd),
        sampleCollectedFrom: setNAIfEmpty(formValues.sampleCollectedFrom),
        remarks: setNAIfEmpty(formValues.remarks),
      };
    }

    if (uniqueDepartment === "BLEACHING") {
      payload = {
        test_id: mainID || "", // Assuming this is Report for now
        format: "Requisition Sample Analysis Report", // Hardcoded
        unit_h: "Unit H", // Hardcoded
        format_no: "PH-QCL01/F-029", // Hardcoded
        ref_sop_no: "PH-QCL01-D-03", // Hardcoded
        revision_no: "01", // Hardcoded

        department: uniqueDepartment,
        requisitionNo: formValues.requisitionNo,
        dispatchDate: formValues.dispatchDate,
        customer: setNAIfEmpty(formValues.customer),
        productDescription: setNAIfEmpty(formValues.productDescription),
        mixing: setNAIfEmpty(formValues.standardMixing),
        bagType: setNAIfEmpty(formValues.bagType),

        mixing_b: setNAIfEmpty(formValues.mixing),
        batchNo: setZeroIfEmpty(formValues.batchNo),
        absorbency: setZeroIfEmpty(formValues.absorbency),
        sinkingTime: setZeroIfEmpty(formValues.sinking),
        whitenessIndex: setZeroIfEmpty(formValues.whitenessIndex),
        uql_mm: setZeroIfEmpty(formValues.uQL),
        lw_mm: setZeroIfEmpty(formValues.lW),
        ph: setZeroIfEmpty(formValues.pH),
        ashContent: setZeroIfEmpty(formValues.ashContent),
        micron_value: setZeroIfEmpty(formValues.micronaireValue),
        ln_mm: setZeroIfEmpty(formValues.lN),
        fluorence: setNAIfEmpty(formValues.fluorescence),
        nepsPerGm: setZeroIfEmpty(formValues.neps),
        odr: setNAIfEmpty(formValues.odor),
        sa: setZeroIfEmpty(formValues.sA),
        finish: setNAIfEmpty(formValues.finish),
        wss: setZeroIfEmpty(formValues.wSS),
        ess: setZeroIfEmpty(formValues.eSS),
        remarks: setNAIfEmpty(formValues.remarks),
      };
    }

    if (uniqueDepartment === "COTTON BUDS") {
      payload = {
        test_id: mainID || "", // Assuming this is Report for now
        format: "Requisition Sample Analysis Report", // Hardcoded
        unit_h: "Unit H", // Hardcoded
        format_no: "PH-QCL01/F-029", // Hardcoded
        ref_sop_no: "PH-QCL01-D-03", // Hardcoded
        revision_no: "01", // Hardcoded
        department: uniqueDepartment,
        requisitionNo: formValues.requisitionNo,
        dispatchDate: formValues.dispatchDate,
        customer: setNAIfEmpty(formValues.customer),
        productDescription: setNAIfEmpty(formValues.productDescription),
        mixing: setNAIfEmpty(formValues.standardMixing),
        bagType: setNAIfEmpty(formValues.bagType),

        budType: setNAIfEmpty(formValues.budType),
        stickMaterial: setNAIfEmpty(formValues.stickMadeFrom),
        stickDiameter: setZeroIfEmpty(formValues.stickDiameter),
        stickColor: setNAIfEmpty(formValues.stickColour),
        stickLength: setNAIfEmpty(formValues.stickLength),
        budShape: setNAIfEmpty(formValues.budShape),
        budFullLength: setNAIfEmpty(formValues.budsFullLength),
        cottonLength: setNAIfEmpty(formValues.cottonLength),
        singleBudWeight: setZeroIfEmpty(formValues.singleBudWeight),
        budDiameter: setZeroIfEmpty(formValues.budDiameter),
        packagingType: setNAIfEmpty(formValues.packagingType),
        packagingMaterial: setNAIfEmpty(formValues.packagingMadeFrom),
        packagingWidth: setZeroIfEmpty(formValues.packagingWidth),
        packagingLength: setZeroIfEmpty(formValues.packagingLength),
        packagingHeight: setZeroIfEmpty(formValues.packagingHeight),
        packagingGrossWeight: setZeroIfEmpty(formValues.packagingGrossWeight),
        finalmoisture: setZeroIfEmpty(formValues.moisture),
        stickStrength: setNAIfEmpty(formValues.stickStrength),
        remarks: setNAIfEmpty(formValues.remarks),
      };
    }

    console.log("payload", payload);

    try {
      const response = await axios.post(
        `${API.prodUrl}/Precot/api/chemicaltest/CLF029/submit/requis`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(
        "Requisition Sample Analysis Report submitted successfully!"
      );
      console.log("submit successful:", response.data);
      setSubmitLoading(false);
      navigate("/Precot/QualityControl/F-029/Summary");
    } catch (error) {
      setSubmitLoading(false);
      console.error("Error saving the form:", error);
      message.warning("There was an error saving the form.");
    }
  };

  let formattedQCBtDate;
  if (selectedRow.qc_submit_on_b) {
    formattedQCBtDate = moment(selectedRow.qc_submit_on_b).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCBtDate = ""; // Or any other default value or error handling
  }

  let formattedDevMngDate;
  if (selectedRow.develop_submit_on) {
    console.log("develop_submit_on", selectedRow.develop_submit_on);
    formattedDevMngDate = moment(selectedRow.develop_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedDevMngDate = ""; // Or any other default value or error handling
  }

  let formattedHodDate;
  if (selectedRow.hod_submit_on) {
    formattedHodDate = moment(selectedRow.hod_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedHodDate = ""; // Or any other default value or error handling
  }

  let formattedOperatorDate;
  if (selectedRow.chemist_submit_on) {
    formattedOperatorDate = moment(selectedRow.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedOperatorDate = ""; // Or any other default value or error handling
  }

  let formattedQAInspectorDate;
  if (selectedRow.ins_submit_on) {
    formattedQAInspectorDate = moment(selectedRow.ins_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQAInspectorDate = ""; // Or any other default value or error handling
  }

  let formattedQCFinalDate;
  if (selectedRow.qc_submit_on) {
    formattedQCFinalDate = moment(selectedRow.qc_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCFinalDate = ""; // Or any other default value or error handling
  }

  const allItems = [
    {
      key: "1",
      label: (
        <p>
          <b>Product Specification (PAD PUNCHING/SPUNLACE/DRY GOODS) I</b>
        </p>
      ),
      children: (
        <div>
          <div style={{ display: "flex", gap: "40px" }}></div>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
              maxWidth: "100%",
              marginLeft: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  S.No.
                </th>
                <th
                  style={{ padding: "5px", textAlign: "center" }}
                  colSpan="2"
                  rowSpan={2}
                >
                  Parameter
                </th>
                <th style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  Specification
                </th>
                <th style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  Limit
                </th>
                <th style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  Max.
                </th>
                <th style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  Min.
                </th>
                <th style={{ padding: "5px", textAlign: "center" }} colSpan={3}>
                  Observation
                </th>

                <th style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  Avg
                </th>
              </tr>
              <tr>
                <th rowSpan={1} style={{ padding: "5px", textAlign: "center" }}>
                  1
                </th>
                <th rowSpan={1} style={{ padding: "5px", textAlign: "center" }}>
                  2
                </th>
                <th rowSpan={1} style={{ padding: "5px", textAlign: "center" }}>
                  3
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>1</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  Pattern
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.patternSpecification}
                    onChange={handleInputChange}
                    name="patternSpecification"
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <span style={{ fontSize: "20px" }}>-</span>
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan="6">
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.patternWholeText}
                    onChange={handleInputChange}
                    name="patternWholeText"
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>2</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  Edge
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.edgeSpecification}
                    onChange={handleInputChange}
                    name="edgeSpecification"
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <span style={{ fontSize: "20px" }}>-</span>
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan="6">
                  <Input
                    disabled={!isEditable}
                    type="text"
                    value={formValues.edgeWholeText}
                    onChange={handleInputChange}
                    name="edgeWholeText"
                  />
                </td>
              </tr>

              {/* GSM / GPM- g/m */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>3</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  GSM / GPM- g/m
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="gsmSpecification"
                    value={formValues.gsmSpecification}
                    min={0}
                    onChange={handleInputChange}
                    onBlur={() => calculateGsmLimits()}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±5%</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="gsmMax"
                    value={formValues.gsmMax}
                    min={0}
                    onChange={handleInputChange}
                    onBlur={handleGsmBlur}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="gsmMin"
                    value={formValues.gsmMin}
                    min={0}
                    onChange={handleInputChange}
                    onBlur={handleGsmBlur}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="gsmObservation1"
                    value={formValues.gsmObservation1}
                    min={0}
                    onChange={handleInputChange}
                    onBlur={handleGsmBlur}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="gsmObservation2"
                    value={formValues.gsmObservation2}
                    min={0}
                    onChange={handleInputChange}
                    onBlur={handleGsmBlur}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="gsmObservation3"
                    value={formValues.gsmObservation3}
                    min={0}
                    onChange={handleInputChange}
                    onBlur={handleGsmBlur}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {formValues.gsmAvg} {/* Show average */}
                </td>
              </tr>

              {/* thickness */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>4</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  Thickness (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="thicknessSpecification"
                    value={formValues.thicknessSpecification}
                    onChange={handleInputChange}
                    onBlur={() => calculateThicknessLimits()}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±0.2</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="thicknessMax"
                    value={formValues.thicknessMax}
                    // Disable if gsmSpecification is empty
                    onChange={handleInputChange}
                    onBlur={handleThicknessBlur}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="thicknessMin"
                    value={formValues.thicknessMin}
                    onChange={handleInputChange}
                    onBlur={handleThicknessBlur}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="thicknessObservation1"
                    value={formValues.thicknessObservation1}
                    onChange={handleInputChange}
                    onBlur={handleThicknessBlur}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="thicknessObservation2"
                    value={formValues.thicknessObservation2}
                    onChange={handleInputChange}
                    onBlur={handleThicknessBlur}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="thicknessObservation3"
                    value={formValues.thicknessObservation3}
                    onChange={handleInputChange}
                    onBlur={handleThicknessBlur}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {formValues.thicknessAvg}
                </td>
              </tr>

              {/* Single Pad / Ball /Pleat/ Wool Roll/Roll Goods - Weight (g) */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>5</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  Single Pad / Ball /Pleat/ Wool Roll/Roll Goods - Weight (g)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    onBlur={() => calculateSinglePadLimits()}
                    name="singlePadSpecification"
                    value={formValues.singlePadSpecification}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±5%</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="singlePadMax"
                    value={formValues.singlePadMax}
                    onBlur={handleSinglePadBlur}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="singlePadMin"
                    value={formValues.singlePadMin}
                    onBlur={handleSinglePadBlur}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="singlePadObservation1"
                    value={formValues.singlePadObservation1}
                    onBlur={handleSinglePadBlur}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="singlePadObservation2"
                    value={formValues.singlePadObservation2}
                    onBlur={handleSinglePadBlur}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="singlePadObservation3"
                    value={formValues.singlePadObservation3}
                    onBlur={handleSinglePadBlur}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {formValues.singlePadAvg}
                </td>
              </tr>

              {/* Dimension (mm) */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} rowSpan="3">
                  6
                </td>
                <td
                  style={{ padding: "5px", textAlign: "center" }}
                  rowSpan="3"
                  colSpan={1}
                >
                  Dimension (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>Length</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionLengthSpecification"
                    value={formValues.dimensionLengthSpecification}
                    onChange={handleInputChange}
                    onBlur={() => calculateDimensionLengthLimits()}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±1</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionLengthMax"
                    value={formValues.dimensionLengthMax}
                    onChange={handleInputChange}
                    onBlur={handleDimensionLengthBlur} // Add this line
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionLengthMin"
                    value={formValues.dimensionLengthMin}
                    onChange={handleInputChange}
                    onBlur={handleDimensionLengthBlur} // Add this line
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionLengthObservation1"
                    value={formValues.dimensionLengthObservation1}
                    onChange={handleInputChange}
                    onBlur={handleDimensionLengthBlur} // Add this line
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionLengthObservation2"
                    value={formValues.dimensionLengthObservation2}
                    onChange={handleInputChange}
                    onBlur={handleDimensionLengthBlur} // Add this line
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionLengthObservation3"
                    value={formValues.dimensionLengthObservation3}
                    onChange={handleInputChange}
                    onBlur={handleDimensionLengthBlur} // Add this line
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {formValues.dimensionLengthAvg}
                </td>
              </tr>

              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  Width
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionWidthSpecification"
                    value={formValues.dimensionWidthSpecification}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={() => calculateDimensionWidthLimits()}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±1</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionWidthMax"
                    value={formValues.dimensionWidthMax}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDimensionWidthBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionWidthMin"
                    value={formValues.dimensionWidthMin}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDimensionWidthBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionWidthObservation1"
                    value={formValues.dimensionWidthObservation1}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDimensionWidthBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionWidthObservation2"
                    value={formValues.dimensionWidthObservation2}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDimensionWidthBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionWidthObservation3"
                    value={formValues.dimensionWidthObservation3}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDimensionWidthBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {formValues.dimensionWidthAvg}
                </td>
              </tr>

              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={1}>
                  Height
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionHeightSpecification"
                    value={formValues.dimensionHeightSpecification}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={() => calculateDimensionHeightLimits()} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±1</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionHeightMax"
                    value={formValues.dimensionHeightMax}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDimensionHeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionHeightMin"
                    value={formValues.dimensionHeightMin}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDimensionHeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionHeightObservation1"
                    value={formValues.dimensionHeightObservation1}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDimensionHeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionHeightObservation2"
                    value={formValues.dimensionHeightObservation2}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDimensionHeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="dimensionHeightObservation3"
                    value={formValues.dimensionHeightObservation3}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDimensionHeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {formValues.dimensionHeightAvg}
                </td>
              </tr>

              {/* Diameter (mm) */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>7</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  Diameter (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="diameterSpecification"
                    min={0}
                    value={formValues.diameterSpecification}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={() => calculateDiameterLimits()} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±1</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="diameterMax"
                    value={formValues.diameterMax}
                    onChange={handleInputChange}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDiameterBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="diameterMin"
                    value={formValues.diameterMin}
                    onChange={handleInputChange}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDiameterBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="diameterObservation1"
                    value={formValues.diameterObservation1}
                    onChange={handleInputChange}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDiameterBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="diameterObservation2"
                    value={formValues.diameterObservation2}
                    onChange={handleInputChange}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDiameterBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="diameterObservation3"
                    value={formValues.diameterObservation3}
                    onChange={handleInputChange}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleDiameterBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {formValues.diameterAvg}
                </td>
              </tr>

              {/* Moisture (%) */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>8</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="2">
                  Moisture (%)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="moistureSpecification"
                    value={formValues.moistureSpecification}
                    onChange={handleInputChange}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={() => calculateMoistureLimits()} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±0.5</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="moistureMax"
                    value={formValues.moistureMax}
                    onChange={handleInputChange}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleMoistureBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="moistureMin"
                    value={formValues.moistureMin}
                    onChange={handleInputChange}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleMoistureBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="moistureObservation1"
                    value={formValues.moistureObservation1}
                    onChange={handleInputChange}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleMoistureBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="moistureObservation2"
                    value={formValues.moistureObservation2}
                    onChange={handleInputChange}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleMoistureBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="moistureObservation3"
                    value={formValues.moistureObservation3}
                    onChange={handleInputChange}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleMoistureBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {formValues.moistureAvg}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <p>
          <b> Product Specification (PAD PUNCHING/SPUNLACE/DRY GOODS) II </b>
        </p>
      ),
      children: (
        <div style={{ width: "100%" }}>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th rowSpan={2} style={{ padding: "5px", textAlign: "center" }}>
                  S.No.
                </th>
                <th rowSpan={2} style={{ padding: "5px", textAlign: "center" }}>
                  TESTS
                </th>
                <th style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  STD
                </th>
                <th style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  Limit
                </th>
                <th style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  MAX
                </th>
                <th style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  MIN
                </th>
                <th style={{ padding: "5px", textAlign: "center" }} colSpan={3}>
                  Observation
                </th>

                <th style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  Avg
                </th>
              </tr>
              <tr>
                <th style={{ padding: "5px", textAlign: "center" }}>1</th>
                <th style={{ padding: "5px", textAlign: "center" }}>2</th>
                <th style={{ padding: "5px", textAlign: "center" }}>3</th>
              </tr>
            </thead>
            <tbody>
              {/* Count Per Pack (No's) */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>1</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Count Per Pack (No's)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="countPerPackStd" // Added name attribute
                    value={formValues.countPerPackStd} // Bind value to formValues state
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={() => calculateCountPerPackLimits()} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>-0,+2</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="countPerPackMax" // Added name attribute
                    value={formValues.countPerPackMax} // Bind value to formValues state
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleCountPerPackBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="countPerPackMin" // Added name attribute
                    value={formValues.countPerPackMin} // Bind value to formValues state
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleCountPerPackBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="countPerPackObservation1" // Added name attribute
                    value={formValues.countPerPackObservation1} // Bind value to formValues state
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleCountPerPackBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="countPerPackObservation2" // Added name attribute
                    value={formValues.countPerPackObservation2} // Bind value to formValues state
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleCountPerPackBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="countPerPackObservation3" // Added name attribute
                    value={formValues.countPerPackObservation3} // Bind value to formValues state
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleCountPerPackBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {formValues.countPerPackObservationAvg}
                </td>
              </tr>

              {/* Bag/Pack Gross Weight (gm) */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>2</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Bag/Pack Gross Weight (gm)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="grossWeightStd"
                    value={formValues.grossWeightStd}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={() => calculateGrossWeightLimits()}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±5%</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="grossWeightMax"
                    value={formValues.grossWeightMax}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleGrossWeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="grossWeightMin"
                    value={formValues.grossWeightMin}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleGrossWeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="grossWeightObservation1"
                    value={formValues.grossWeightObservation1}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleGrossWeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="grossWeightObservation2"
                    value={formValues.grossWeightObservation2}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleGrossWeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="grossWeightObservation3"
                    value={formValues.grossWeightObservation3}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleGrossWeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {formValues.grossWeightAvg}
                </td>
              </tr>

              {/* Bag/ Pack filling height (mm) */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>3</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Bag/ Pack filling height (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="fillingHeightStd"
                    value={formValues.fillingHeightStd}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={() => calculateFillingHeightLimits()} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>±5%</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="fillingHeightMax"
                    value={formValues.fillingHeightMax}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleFillingHeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="fillingHeightMin"
                    value={formValues.fillingHeightMin}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleFillingHeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="fillingHeightObservation1"
                    value={formValues.fillingHeightObservation1}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleFillingHeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="fillingHeightObservation2"
                    value={formValues.fillingHeightObservation2}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleFillingHeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="fillingHeightObservation3"
                    value={formValues.fillingHeightObservation3}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onBlur={handleFillingHeightBlur} // Add onBlur event
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {formValues.fillingHeightAvg}
                </td>
              </tr>

              {/* Bag/Pack type */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>4</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Bag/Pack type
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan="8">
                  <Select
                    disabled={!isEditable}
                    style={{ width: "100%" }}
                    placeholder="Select or type type"
                    name="bagPackType"
                    value={formValues.bagPackType}
                    onChange={(value) =>
                      handleSelectChange("bagPackType", value)
                    }
                    onKeyDown={(e) => handleSelectText(e, "bagPackType")} // Handle key inputs
                    showSearch
                    mode="combobox" // Allow free text input and dropdown selection
                    filterOption={false} // You can enable this if you want to filter options
                  >
                    <Select.Option value="Draw String">
                      Draw String
                    </Select.Option>
                    <Select.Option value="Ziplock">Ziplock</Select.Option>
                    <Select.Option value="Printed">Printed</Select.Option>
                  </Select>
                </td>
              </tr>

              {/* Bag/Pack dimensions (mm) */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>5</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Bag/Pack dimensions (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>Length</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="bagPackLength"
                    value={formValues.bagPackLength}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "100%" }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>Width</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="bagPackWidth"
                    value={formValues.bagPackWidth}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "100%" }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  Gusset/Height
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="bagPackGussetHeight"
                    value={formValues.bagPackGussetHeight}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "100%" }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  Micron /thickness
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="bagPackMicronThickness"
                    value={formValues.bagPackMicronThickness}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>

              {/* Overall Appearance */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>6</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Overall Appearance
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="8">
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="overallAppearance"
                    value={formValues.overallAppearance}
                    onChange={handleInputChange}
                    style={{ width: "30%" }}
                  />
                </td>
              </tr>

              {/* CD/MD */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>7</td>
                <td style={{ padding: "5px", textAlign: "start" }}>CD/MD</td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="8">
                  <Input
                    disabled={!isEditable}
                    type="number"
                    min={0}
                    name="cdMd"
                    value={formValues.cdMd}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "30%" }}
                  />
                </td>
              </tr>

              {/* Sample Collected From */}
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>8</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Sample Collected From
                </td>
                <td style={{ padding: "5px", textAlign: "start" }} colSpan="8">
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="sampleCollectedFrom"
                    value={formValues.sampleCollectedFrom}
                    onChange={handleInputChange}
                    style={{ width: "30%" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: "10px" }}>
            <label>Remarks: </label>
            <Input
              disabled={!isEditable}
              type="text"
              value={formValues.remarks}
              style={{ width: "30%" }}
              name="remarks"
              onChange={handleInputChange}
            />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <p>
          <b> AB - Cotton (Bleaching) Results </b>
        </p>
      ),
      children: (
        <div style={{ width: "100%" }}>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>9</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Batch No.
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="batchNo"
                    min={0}
                    value={formValues.batchNo}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>15</td>
                <td style={{ padding: "5px", textAlign: "start" }}>Mixing</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="mixing"
                    value={formValues.mixing}
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>21</td>
                <td style={{ padding: "5px", textAlign: "start" }}>Finish</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="finish"
                    value={formValues.finish}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>10</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Absorbency (g/g)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="absorbency"
                    value={formValues.absorbency}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>16</td>
                <td style={{ padding: "5px", textAlign: "start" }}>L(n) mm</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="lN"
                    value={formValues.lN}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>22</td>
                <td style={{ padding: "5px", textAlign: "start" }}>WSS(%)</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="wSS"
                    value={formValues.wSS}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>11</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Sinking (g)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="sinking"
                    value={formValues.sinking}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>17</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Micronaire Value
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="micronaireValue"
                    value={formValues.micronaireValue}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>23</td>
                <td style={{ padding: "5px", textAlign: "start" }}>E(%)</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="eSS"
                    value={formValues.eSS}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>12</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Whiteness Index
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="whitenessIndex"
                    value={formValues.whitenessIndex}
                    min={0}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>18</td>
                <td style={{ padding: "5px", textAlign: "start" }}>pH</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="pH"
                    value={formValues.pH}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>24</td>
                <td style={{ padding: "5px", textAlign: "start" }}>SA</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="sA"
                    value={formValues.sA}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>13</td>
                <td style={{ padding: "5px", textAlign: "start" }}>UQL</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="uQL"
                    value={formValues.uQL}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>19</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Ash Content
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="ashContent"
                    value={formValues.ashContent}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>25</td>
                <td style={{ padding: "5px", textAlign: "start" }}>Neps</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="neps"
                    value={formValues.neps}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>14</td>
                <td style={{ padding: "5px", textAlign: "start" }}>LW</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="lW"
                    value={formValues.lW}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>20</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Fluorescence
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="fluorescence"
                    value={formValues.fluorescence}
                    min={0}
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>26</td>
                <td style={{ padding: "5px", textAlign: "start" }}>Odor</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="odor"
                    value={formValues.odor}
                    min={0}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: "10px" }}>
            <label>Remarks: </label>
            <Input
              disabled={!isEditable}
              type="text"
              value={formValues.remarks}
              style={{ width: "30%" }}
              name="remarks"
              onChange={handleInputChange}
            />
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <p>
          <b> Cotton Buds Parameters </b>
        </p>
      ),
      children: (
        <div style={{ width: "100%" }}>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>27</td>
                <td style={{ padding: "5px", textAlign: "start" }}>Bud Type</td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="budType"
                    value={formValues.budType}
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>28</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Stick Made from
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="stickMadeFrom"
                    value={formValues.stickMadeFrom}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>29</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Stick Diameter (mm.)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="stickDiameter"
                    value={formValues.stickDiameter}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>30</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Stick Colour
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="stickColour"
                    value={formValues.stickColour}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>31</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Stick Length (mm.)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="stickLength"
                    value={formValues.stickLength}
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>32</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Bud Shape
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="budShape"
                    value={formValues.budShape}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>33</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Buds Full length (mm.)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="budsFullLength"
                    value={formValues.budsFullLength}
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>34</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Cotton Length (mm.)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="cottonLength"
                    value={formValues.cottonLength}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>35</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Single Bud Weight (g)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="singleBudWeight"
                    value={formValues.singleBudWeight}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>36</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Bud Diameter (mm.)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="budDiameter"
                    value={formValues.budDiameter}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>37</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Packaging Type
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="packagingType"
                    value={formValues.packagingType}
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>38</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Packaging made from
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    name="packagingMadeFrom"
                    value={formValues.packagingMadeFrom}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>39</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Packaging Width (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="packagingWidth"
                    value={formValues.packagingWidth}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>40</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Packaging length (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="packagingLength"
                    value={formValues.packagingLength}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>41</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Packaging Height (mm)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="packagingHeight"
                    value={formValues.packagingHeight}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>42</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Packaging Gross Weight (kg)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="packagingGrossWeight"
                    min={0}
                    onChange={handleInputChange}
                    value={formValues.packagingGrossWeight}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }}>43</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Moisture (%)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Input
                    disabled={!isEditable}
                    type="number"
                    name="moisture"
                    value={formValues.moisture}
                    min={0}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>44</td>
                <td style={{ padding: "5px", textAlign: "start" }}>
                  Stick Strength (When bent 900 degrees, the stem/ Stick
                  shouldn’t break.)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  <Select
                    disabled={!isEditable}
                    style={{ width: "100%" }}
                    name="stickStrength"
                    value={formValues.stickStrength}
                    onChange={(value) =>
                      handleSelectChange("stickStrength", value)
                    }
                    onKeyDown={(e) => handleSelectText(e, "stickStrength")} // Handle key inputs
                    showSearch
                    mode="combobox" // Allow free text input and dropdown selection
                    filterOption={false} // You can enable this if you want to filter options
                  >
                    <Select.Option value="Pass">Pass</Select.Option>
                    <Select.Option value="Fail">Fail</Select.Option>
                  </Select>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: "10px" }}>
            <label>Remarks: </label>
            <Input
              disabled={!isEditable}
              type="text"
              value={formValues.remarks}
              style={{ width: "30%" }}
              name="remarks"
              onChange={handleInputChange}
            />
          </div>
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <p>
          <b> For 1st production samples verification </b>
        </p>
      ),
      children: (
        <div
          style={{
            width: "100%",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} rowSpan={1}>
                  Approved sample request No.
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} rowSpan={2}>
                  Verified by (Respective In Charge)
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} rowSpan={1}>
                  QC/QA
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} rowSpan={1}>
                  Development
                </td>
                <td style={{ padding: "5px", textAlign: "center" }} rowSpan={1}>
                  Production
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} rowSpan={1}>
                  <TextArea
                    type="text"
                    name="approvedSampleRequestNo"
                    value={formValues.approvedSampleRequestNo}
                    disabled={
                      !(
                        (roleauth === "QC_MANAGER" ||
                          roleauth === "QA_MANAGER") &&
                        selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
                        selectedRow?.qc_status_b === "WAITING_FOR_APPROVAL"
                      )
                    }
                    onChange={handleInputChange}
                  />
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {(selectedRow?.qc_status_b === "QC_APPROVED" ||
                    selectedRow?.qc_status_b === "QA_APPROVED") && (
                    <>
                      {getImage1 && (
                        <img
                          className="signature"
                          src={getImage1}
                          alt="Operator"
                        />
                      )}
                      <br />
                      {selectedRow && selectedRow.qc_sign_b}
                      <br />
                      {formattedQCBtDate}
                    </>
                  )}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {selectedRow?.develop_status ===
                    "DEVELOPMENT_MANAGER_APPROVED" && (
                    <>
                      {getImage2 && (
                        <img
                          className="signature"
                          src={getImage2}
                          alt="Operator"
                        />
                      )}
                      <br />
                      {selectedRow && selectedRow.develop_sign}
                      <br />
                      {formattedDevMngDate}
                    </>
                  )}
                </td>
                <td style={{ padding: "5px", textAlign: "center" }}>
                  {selectedRow?.hod_status === "HOD_APPROVED" && (
                    <>
                      {getImage3 && (
                        <img
                          className="signature"
                          src={getImage3}
                          alt="Operator"
                        />
                      )}
                      <br />
                      {selectedRow && selectedRow.hod_sign}
                      <br />
                      {formattedHodDate}
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={5} style={{ padding: "5px", textAlign: "start" }}>
                  <label>Remark: </label>
                  <Input
                    style={{ width: "90%" }}
                    type="text"
                    name="firstProductionRemark"
                    value={formValues.firstProductionRemark}
                    onChange={handleInputChange}
                    disabled={
                      !(
                        (roleauth === "QC_MANAGER" ||
                          roleauth === "QA_MANAGER") &&
                        selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" &&
                        selectedRow?.qc_status_b === "WAITING_FOR_APPROVAL"
                      )
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "6",
      label: (
        <p>
          <b> Reviews </b>
        </p>
      ),
      children: (
        <div
          style={{
            width: "100%",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <tr>
              <td colSpan="2" style={{ height: "35px", textAlign: "center" }}>
                <b>Prepared by</b>
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <b>Inspected by</b>
              </td>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <b>Manager (QC/QA)</b>
              </td>
            </tr>
            <tr style={{ height: "35px" }}>
              <td
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {selectedRow?.chemist_status === "OPERATOR_APPROVED" && (
                  <>
                    {getImage4 && (
                      <img
                        className="signature"
                        src={getImage4}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.chemist_sign}
                    <br />
                    {formattedOperatorDate}
                  </>
                )}
              </td>
              <td
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" && (
                  <>
                    {getImage5 && (
                      <img
                        className="signature"
                        src={getImage5}
                        alt="Operator"
                      />
                    )}
                    <br />
                    {selectedRow && selectedRow.ins_sign}
                    <br />
                    {formattedQAInspectorDate}
                  </>
                )}
              </td>
              <td
                colSpan="2"
                style={{
                  display: "table-cell",
                  height: "80px",
                  textAlign: "center",
                  verticalAlign: "bottom",
                }}
              >
                {(selectedRow?.qc_status === "QC_REJECTED" ||
                  selectedRow?.qc_status === "QA_REJECTED" ||
                  selectedRow?.qc_status === "QA_APPROVED" ||
                  selectedRow?.qc_status === "QC_APPROVED") && (
                  <>
                    {getImage6 && (
                      <img
                        className="signature"
                        src={getImage6}
                        alt="Superviosr Sign"
                      />
                    )}
                    <br />

                    {selectedRow && selectedRow.qc_submit_by}
                    <br />
                    {formattedQCFinalDate}
                  </>
                )}
              </td>
            </tr>
          </table>
        </div>
      ),
    },
  ];

  // Filter the department-specific tabs
  let filteredItems = [];
  if (
    uniqueDepartment === "PAD PUNCHING" ||
    uniqueDepartment === "DRY GOODS" ||
    uniqueDepartment === "SPUNLACE"
  ) {
    filteredItems = allItems.filter(
      (item) => item.key === "1" || item.key === "2"
    );
  } else if (uniqueDepartment === "BLEACHING") {
    filteredItems = allItems.filter((item) => item.key === "3");
  } else if (uniqueDepartment === "COTTON BUDS") {
    filteredItems = allItems.filter((item) => item.key === "4");
  }

  // Add the always-included tabs (key: 5 and key: 6)
  filteredItems = [
    ...filteredItems,
    ...allItems.filter((item) => item.key === "5" || item.key === "6"),
  ];

  const handleBack = () => {
    navigate("/Precot/QualityControl/F-029/Summary");
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit H"
        formName="Requisition Sample Analysis Report"
        formatNo="PH-QCL01/F-029"
        MenuBtn={
          <Button type="primary" icon={<TbMenuDeep />} onClick={showDrawer} />
        }
        buttonsArray={[
          // Conditionally render buttons based on user role
          (roleauth === "ROLE_OPERATOR" || roleauth === "ROLE_QA") && (
            <>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtonSave(),
                }}
                onClick={handleSave}
                loading={saveLoading}
                shape="round"
                icon={<IoSave color="#00308F" />}
              >
                &nbsp;Save
              </Button>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtons(),
                }}
                icon={<GrDocumentStore color="#00308F" />}
                onClick={handleSubmit}
                loading={submitLoading}
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ),

          // Buttons for Development Manager or HOD
          (roleauth === "DEVELOPMENT_MANAGER" || roleauth === "ROLE_HOD") && (
            <Button
              type="primary"
              style={{
                backgroundColor: "#E5EEF9",
                color: "#00308F",
                fontWeight: "bold",
                display: canDisplayButtonSave(),
              }}
              shape="round"
              onClick={handleThirdLevelApprove}
              loading={saveLoading}
              icon={
                <img src={approveIcon} alt="Approve Icon" color="#00308F" />
              }
            >
              &nbsp;Approve
            </Button>
          ),

          // Buttons for QC or QA Manager based on selected row statuses
          (roleauth === "QC_MANAGER" || roleauth === "QA_MANAGER") &&
            (selectedRow?.ins_status === "QA_INSPECTOR_APPROVED" && 
            selectedRow?.qc_status_b === "WAITING_FOR_APPROVAL" ? (
              <Button
                type="primary"
                style={{
                  backgroundColor: "#E5EEF9",
                  color: "#00308F",
                  fontWeight: "bold",
                  display: canDisplayButtonSave(),
                }}
                shape="round"
                onClick={handleThirdLevelApprove}
                loading={saveLoading}
                icon={
                  <img src={approveIcon} alt="Approve Icon" color="#00308F" />
                }
              >
                &nbsp;Approve
              </Button>
            ) : (
              <>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  loading={saveLoading}
                  onClick={handleApprove}
                  shape="round"
                  icon={
                    <img src={approveIcon} alt="Approve Icon" color="#00308F" />
                  }
                >
                  &nbsp;Approve
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#E5EEF9",
                    color: "#00308F",
                    fontWeight: "bold",
                    display: canDisplayButtons(),
                  }}
                  icon={<img src={rejectIcon} alt="Reject Icon" />}
                  shape="round"
                  onClick={handleRejectModal}
                  loading={submitLoading}
                >
                  &nbsp;Reject
                </Button>
              </>
            )),

          // Common buttons for all roles
          <Button
            style={{
              backgroundColor: "#E5EEF9",
              color: "#00308F",
              fontWeight: "bold",
              marginRight: "20px",
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
              if (window.confirm("Are you sure want to logout?")) {
                localStorage.removeItem("token");
                navigate("/Precot");
              }
            }}
          >
            Logout
          </Button>,

          // Tooltip for user information
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

      {/* reqno */}
      <div style={{ padding: "10px", display: "flex" }}>
        <label style={{ marginTop: "5px" }}>Requisition No: </label>
        <Input
          style={{ width: "180px", marginLeft: "10px", color: "black" }}
          disabled
          value={formValues.requisitionNo}
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            padding: "10px",
          }}
        >
          {/* Dispatch Date */}
          <div>
            <label>Dispatch Date: </label>
            <Input
              disabled={!isEditable}
              type="date"
              name="dispatchDate"
              value={formValues.dispatchDate}
              onChange={handleInputChange}
            />
          </div>

          {/* Customer */}
          <div>
            <label>Customer: </label>
            <Input
              disabled={!isEditable}
              type="text"
              name="customer"
              value={formValues.customer}
              onChange={handleInputChange}
              placeholder="Enter customer name"
            />
          </div>

          {/* Product Description */}
          <div>
            <label>Product Description: </label>
            <Input
              disabled={!isEditable}
              type="text"
              name="productDescription"
              value={formValues.productDescription}
              onChange={handleInputChange}
              placeholder="Enter product description"
            />
          </div>

          {/* Mixing */}
          <div>
            <label>Mixing: </label>
            <Input
              disabled={!isEditable}
              type="text"
              name="standardMixing"
              value={formValues.standardMixing}
              onChange={handleInputChange}
              placeholder="Enter mixing details"
            />
          </div>

          {/* Bag Type */}
          <div>
            <label>Bag Type: </label>
            <Input
              disabled={!isEditable}
              type="text"
              name="bagType"
              value={formValues.bagType}
              onChange={handleInputChange}
              placeholder="Enter bag type"
            />
          </div>
        </div>
      </div>

      <Tabs
        defaultActiveKey={
          filteredItems.length > 0 ? filteredItems[0].key : null
        }
        items={filteredItems}
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

export default QualityControlF029;
