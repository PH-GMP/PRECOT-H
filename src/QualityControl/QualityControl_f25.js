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
  InputNumber,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BleachingHeader from "../Components/BleachingHeader.js";
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

const QualityControl_f25 = () => {
  const navigate = useNavigate();
  const { TabPane } = Tabs;
  const [tabNo, setTabNo] = useState("1");
  const role = localStorage.getItem("role");
  const initialized = useRef(false);
  const location = useLocation();
  const { state } = location;
  const { date, Ltno } = state || {};
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [planingDetailsByDate, setPlaningDetailsByDate] = useState("");
  const [planId, setplanId] = useState("");
  const [statusLoader, setStatusLoader] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emptyarraycheck, setemptyarraycheck] = useState("");
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [rejectModal, setRejectModal] = useState(false);
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");

  const [showModal, setShowModal] = useState(false);
  const dateObject = new Date(date);
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();
  const [status, setStatus] = useState({
    saveStatus: false,
    submitStatus: false,
    fieldStatus: false,
  });
  const [resId, setResId] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const monthIndex = dateObject.getMonth();
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
  const [rows, setRows] = useState([{}]);
  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };
  const handleE = (e) => {
    // Ensure e and e.key are defined
    if (e && e.key && ["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
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

  const [formData, setFormData] = useState({
    formatNo: "PH-QCL01/F-025",
    revisionNo: "02",
    formatName:
      "SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA",
    refSopNo: "PH-QCL01-D-05",
    id: resId || "",
    year: year,
    month: monthName,
    customer: "",
    brand: "",
    productDescription: "",
    pattern: "",
    lotNumber: "",
    productionDate: "",
    testingDate: "",

    // Flat structure for dimensions, weights, and thickness
    dimensionStdLength: "",
    dimensionStdWidth: "",
    dimensionStdHeight: "",

    dimensionT1Length: "",
    dimensionT1Width: "",
    dimensionT1Height: "",
    dimensionT1Status: "",

    dimensionT2Length: "",
    dimensionT2Width: "",
    dimensionT2Height: "",
    dimensionT2Status: "",

    dimensionT3Length: "",
    dimensionT3Width: "",
    dimensionT3Height: "",
    dimensionT3Status: "",

    dimensionT4Length: "",
    dimensionT4Width: "",
    dimensionT4Height: "",
    dimensionT4Status: "",

    dimensionT5Length: "",
    dimensionT5Width: "",
    dimensionT5Height: "",
    dimensionT5Status: "",

    dimensionAvgLength: "",
    dimensionAvgWidth: "",
    dimensionAvgHeight: "",
    dimensionAvgStatus: "",

    weightStd: "",
    weightT1Actual: "",
    weightT1Status: "",
    weightT2Actual: "",
    weightT2Status: "",
    weightT3Actual: "",
    weightT3Status: "",
    weightT4Actual: "",
    weightT4Status: "",
    weightT5Actual: "",
    weightT5Status: "",
    weightAvgActual: "",
    weightAvgStatus: "",

    thicknessStd: "",
    thicknessT1Actual: "",
    thicknessT1Status: "",
    thicknessT2Actual: "",
    thicknessT2Status: "",
    thicknessT3Actual: "",
    thicknessT3Status: "",
    thicknessT4Actual: "",
    thicknessT4Status: "",
    thicknessT5Actual: "",
    thicknessT5Status: "",
    thicknessAvgActual: "",
    thicknessAvgStatus: "",

    physicalAndChemicalTests: [
      {
        chemist_id: "",
        samplingDate: "",
        testedDate: "",
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

    microbiologicalTests: [
      {
        micro_id: "",
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
        moisture: "",
        remark: "",
        product: "",
      },
    ],
  });

  const calculateAverage = (values) => {
    const total = values.reduce(
      (sum, value) => sum + (parseFloat(value) || 0),
      0
    );
    return (total / values.length).toFixed(2); // Rounded to 2 decimal places
  };

  const handleNumberChange = (name, value) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      // Calculate dimension average
      const dimensionLengthAvg = calculateAverage([
        updatedFormData.dimensionT1Length,
        updatedFormData.dimensionT2Length,
        updatedFormData.dimensionT3Length,
        updatedFormData.dimensionT4Length,
        updatedFormData.dimensionT5Length,
      ]);
      // Calculate dimension average
      const dimensionWidthAvg = calculateAverage([
        updatedFormData.dimensionT1Width,
        updatedFormData.dimensionT2Width,
        updatedFormData.dimensionT3Width,
        updatedFormData.dimensionT4Width,
        updatedFormData.dimensionT5Width,
      ]);
      // Calculate dimension average
      const dimensionHeightAvg = calculateAverage([
        updatedFormData.dimensionT1Height,
        updatedFormData.dimensionT2Height,
        updatedFormData.dimensionT3Height,
        updatedFormData.dimensionT4Height,
        updatedFormData.dimensionT5Height,
      ]);

      // Calculate weight average
      const weightAvg = calculateAverage([
        updatedFormData.weightT1Actual,
        updatedFormData.weightT2Actual,
        updatedFormData.weightT3Actual,
        updatedFormData.weightT4Actual,
        updatedFormData.weightT5Actual,
      ]);

      // Calculate thickness average
      const thicknessAvg = calculateAverage([
        updatedFormData.thicknessT1Actual,
        updatedFormData.thicknessT2Actual,
        updatedFormData.thicknessT3Actual,
        updatedFormData.thicknessT4Actual,
        updatedFormData.thicknessT5Actual,
      ]);

      // Update the formData with calculated averages
      return {
        ...updatedFormData,
        dimensionAvgLength: dimensionLengthAvg,
        dimensionAvgWidth: dimensionWidthAvg,
        dimensionAvgHeight: dimensionHeightAvg,
        weightAvgActual: weightAvg,
        thicknessAvgActual: thicknessAvg,
      };
    });
  };

  const [eSign, setESign] = useState({
    chemist_sign: "",
    microbiologist_sign: "",
    qc_sign: "",
  });

  let formattedMicroDate;
  if (selectedRow.microbiologist_submit_on) {
    formattedMicroDate = moment(selectedRow.microbiologist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedMicroDate = ""; // Or any other default value or error handling
  }

  let formattedChemistDate;
  if (selectedRow.chemist_submit_on) {
    formattedChemistDate = moment(selectedRow.chemist_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where chemist_submit_on is null or undefined
    formattedChemistDate = ""; // Or any other default value or error handling
  }
  let formattedQCDate;
  if (selectedRow.qc_submit_on) {
    formattedQCDate = moment(selectedRow.qc_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQCDate = ""; // Or any other default value or error handling
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // Update the specific field being changed
      const updatedFormData = { ...prev, [name]: value };

      // Function to calculate average, filtering out non-numeric values
      const calculateAverage = (fields) => {
        const filteredValues = fields.filter(
          (field) => field !== "" && !isNaN(field)
        );
        const sum = filteredValues.reduce((acc, val) => acc + Number(val), 0);
        return filteredValues.length > 0 ? sum / filteredValues.length : 0;
      };

      // Calculate averages based on the updated form data
      const dimensionAvg = calculateAverage([
        updatedFormData.dimensionT1Actual,
        updatedFormData.dimensionT2Actual,
        updatedFormData.dimensionT3Actual,
        updatedFormData.dimensionT4Actual,
        updatedFormData.dimensionT5Actual,
      ]);

      const weightAvg = calculateAverage([
        updatedFormData.weightT1Actual,
        updatedFormData.weightT2Actual,
        updatedFormData.weightT3Actual,
        updatedFormData.weightT4Actual,
        updatedFormData.weightT5Actual,
      ]);

      const thicknessAvg = calculateAverage([
        updatedFormData.thicknessT1Actual,
        updatedFormData.thicknessT2Actual,
        updatedFormData.thicknessT3Actual,
        updatedFormData.thicknessT4Actual,
        updatedFormData.thicknessT5Actual,
      ]);

      // Return the updated form data including the calculated averages
      return {
        ...updatedFormData,
        dimensionAvgActual: dimensionAvg,
        weightAvgActual: weightAvg,
        thicknessAvgActual: thicknessAvg,
      };
    });
  };

  const handleChangeStatus = (fieldName, value) => {
    setFormData((prev) => {
      // Update the specific status field
      const updatedFormData = { ...prev, [fieldName]: value };

      // Return the updated form data
      return updatedFormData;
    });
  };

  const handleInputChange = (e, field) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      physicalAndChemicalTests: prevState.physicalAndChemicalTests.map(
        (test, index) => {
          if (index === 0) {
            return {
              ...test,
              [field]: value,
            };
          }
          return test;
        }
      ),
    }));
  };

  const handleMicrobiologicalInputChange = (e, field) => {
    const { value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      microbiologicalTests: prevState.microbiologicalTests.map(
        (test, index) => {
          if (index === 0) {
            return {
              ...test,
              [field]: value,
            };
          }
          return test;
        }
      ),
    }));
  };

  const remarkLov = [
    { value: "Pass", label: "Pass" },
    { value: "Fail", label: "Fail" },
  ];

  const productLov = [
    { value: "Accepted", label: "Accepted" },
    { value: "Accepted Under Deviation", label: "Accepted Under Deviation" },
    { value: "Rejected", label: "Rejected" },
  ];

  const materiaLov = [
    { value: "JP", label: "JP" },
    { value: "BP", label: "BP" },
    { value: "EP", label: "EP" },
    { value: "USP", label: "USP" },
  ];

  const validateSinkingTime = (e, fieldName) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (!isNaN(numericValue) && isFinite(numericValue)) {
      // Allow values greater than or equal to 0
      handleInputChange(e, fieldName);

      // Show a warning message if the value is 10 or greater
      if (numericValue >= 10) {
        message.warning(
          "Sinking Time is less than 10, please check the value."
        );
      }

      // Trigger average calculation
      calculateSinkingTimeAverage();
    }
  };

  const calculateSinkingTimeAverage = () => {
    const { sinkingTimeResulta, sinkingTimeResultb, sinkingTimeResultc } =
      formData.physicalAndChemicalTests[0];

    // Ensure values are numbers and calculate the average
    const a = parseFloat(sinkingTimeResulta) || 0;
    const b = parseFloat(sinkingTimeResultb) || 0;
    const c = parseFloat(sinkingTimeResultc) || 0;

    const totalValues = [a, b, c].filter((val) => val !== 0).length; // Count non-zero values

    if (totalValues > 0) {
      const average = (a + b + c) / totalValues;

      // Update the sinkingTimeResult field
      handleInputChange(
        { target: { value: average.toFixed(2) } },
        "sinkingTimeResult"
      );
    }
  };

  const validateAbsorbancy = (e, fieldName) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (!isNaN(numericValue) && isFinite(numericValue)) {
      // Allow valid numbers
      handleInputChange(e, fieldName);

      // Show a warning if the value is 23 or less
      if (numericValue <= 23) {
        message.warning("Absorbancy Result should be greater than 23.");
      }

      // Trigger average calculation
      calculateAbsorbancyAverage();
    }
  };

  const calculateAbsorbancyAverage = () => {
    const { absorbancyResulta, absorbancyResultb, absorbancyResultC } =
      formData.physicalAndChemicalTests[0];
    const a = parseFloat(absorbancyResulta) || 0;
    const b = parseFloat(absorbancyResultb) || 0;
    const c = parseFloat(absorbancyResultC) || 0;

    const avg = ((a + b + c) / 3).toFixed(2); // Calculate and format to 2 decimal places
    handleInputChange({ target: { value: avg } }, "absorbancyResult");
  };

  const roleauth = localStorage.getItem("role");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const rejectFlow = () => {
    setShowModal(true);
  };
  const handleReject = async () => {
    setSubmitLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${    API.prodUrl}/Precot/api/qc/approveShelfLifePeriodReport`,
        {
          id: formData.id,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/precot/QualityControl/F-025/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleArrayInput = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      physicalAndChemicalTests: prevState.physicalAndChemicalTests.map(
        (item, i) => (i == 0 ? { ...item, [name]: value } : item)
      ),
    }));
  };
  const handleMicroInput = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      microbiologicalTests: prevState.microbiologicalTests.map((item, i) =>
        i == 0 ? { ...item, [name]: value } : item
      ),
    }));
  };
  let validation = new Set();
  const handleBlur = () => {
    if (role == "ROLE_CHEMIST") {
      if (status.fieldStatus) {
        return;
      }

      if (
        formData.physicalAndChemicalTests[0]?.fibre_average_length_obs < 10 &&
        formData.physicalAndChemicalTests[0]?.fibre_average_length_obs !== ""
      ) {
        validation.add(
          "Entered Fibre Average observation value is less than 10"
        );
      }

      if (tabNo == "3") {
        if (
          (formData.physicalAndChemicalTests[0]?.acidity_ph_obs < 6 ||
            formData.physicalAndChemicalTests[0]?.acidity_ph_obs > 8) &&
          formData.physicalAndChemicalTests[0]?.acidity_ph_obs !== ""
        ) {
          validation.add(
            "Entered Acidity / Alkalinity (pH) observation value is not between be 6 and 8"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.neps_obs > 5 &&
          formData.physicalAndChemicalTests[0]?.neps_obs !== ""
        ) {
          validation.add("Entered Neps observation value greater than 5");
        }
      }

      if (tabNo == "4") {
        if (
          formData.physicalAndChemicalTests[0]?.neps_count_obs > 5000 &&
          formData.physicalAndChemicalTests[0]?.neps_count_obs
        ) {
          validation.add(
            "Entered Neps count/gram observation value is greater than 5000"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.uql_w_obs < 12 &&
          formData.physicalAndChemicalTests[0]?.uql_w_obs !== ""
        ) {
          validation.add(
            "Entered Upper Quartile Length observation value is less than 12"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.ln_obs < 7 &&
          formData.physicalAndChemicalTests[0]?.ln_obs !== ""
        ) {
          validation.add(
            "Entered Length by number observation value is less than 7"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.lw_obs < 10 &&
          formData.physicalAndChemicalTests[0]?.lw_obs !== ""
        ) {
          validation.add(
            "Entered Length by weight observation value is less than 10"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.sfc_n_obs > 90 &&
          formData.physicalAndChemicalTests[0]?.sfc_n_obs !== ""
        ) {
          validation.add(
            "Entered Short fiber Content. by number observation value is greater than 90"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.sfc_w_obs > 85 &&
          formData.physicalAndChemicalTests[0]?.sfc_w_obs
        ) {
          validation.add(
            "Entered Short fiber Content. by wt observation value is greater than 85"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.micronaire_obs < 2.8 &&
          formData.physicalAndChemicalTests[0]?.micronaire_obs !== ""
        ) {
          validation.add(
            "Entered Micronaire Value observation value is less than 2.8"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.whiteness_obs < 80 &&
          formData.physicalAndChemicalTests[0]?.whiteness_obs !== ""
        ) {
          validation.add(
            "Entered Whiteness Indices observation value is less than 80"
          );
        }
      }

      if (tabNo == "5") {
        if (
          formData.physicalAndChemicalTests[0]?.abs_1 > 10 &&
          formData.physicalAndChemicalTests[0]?.abs_1 !== ""
        ) {
          validation.add(
            "Entered Sinking time (sec.) observation 1 value is greater than 10"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.abs_2 > 10 &&
          formData.physicalAndChemicalTests[0]?.abs_2 !== ""
        ) {
          validation.add(
            "Entered Sinking time (sec.) observation 2 value is greater than 10"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.abs_3 > 10 &&
          formData.physicalAndChemicalTests[0]?.abs_3 !== ""
        ) {
          validation.add(
            "Entered Sinking time (sec.) observation 3 value is greater than 10"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.abs_4 < 20 &&
          formData.physicalAndChemicalTests[0]?.abs_4 !== ""
        ) {
          validation.add(
            "Entered  Absorbption Capacity observation 1 value is less than 20.0"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.abs_5 < 20 &&
          formData.physicalAndChemicalTests[0]?.abs_5 !== ""
        ) {
          validation.add(
            "Entered Absorbption Capacity observation 2 value is less than 20.0"
          );
        }
        if (
          formData.physicalAndChemicalTests[0]?.abs_6 < 20 &&
          formData.physicalAndChemicalTests[0]?.abs_6 !== ""
        ) {
          validation.add(
            "Entered Absorbption Capacity observation 3 value is less than 20.0"
          );
        }
      }

      // if (
      //   formData.physicalAndChemicalTests[0]?.sulphatedFlWtObr > 0.4 &&
      //   formData.physicalAndChemicalTests[0]?.sulphatedFlWtObr !== ""
      // ) {
      //   validation.add("Sulphated Ash Final Wt.(g)-B Should be Less than 0.4");
      //   handleFieldClear("sulphatedFlWtObr");
      // }
      // if (
      //   formData.physicalAndChemicalTests[0]?.sulphatedIlWtObr > 0.4 &&
      //   formData.physicalAndChemicalTests[0]?.sulphatedIlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Sulphated Ash Initial Wt.(g)-A Should be Less than 0.2"
      //   );
      //   handleFieldClear("sulphatedIlWtObr");
      // }
      // if (
      //   formData.physicalAndChemicalTests[0]?.watersolubleFlWtObr > 0.5 &&
      //   formData.physicalAndChemicalTests[0]?.watersolubleFlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Water Soluble Substances Final Wt.(g)-N Should be Less than 0.50"
      //   );
      //   handleFieldClear("watersolubleFlWtObr");
      // }
      // if (
      //   formData.physicalAndChemicalTests[0]?.watersolubleIlWtObr > 0.5 &&
      //   formData.physicalAndChemicalTests[0]?.watersolubleIlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Water Soluble Substances Initial Wt.(g)-M Should be Less than 0.50"
      //   );
      //   handleFieldClear("watersolubleIlWtObr");
      // }
      // if (
      //   formData.physicalAndChemicalTests[0]?.ethersolubleFlWtObr > 0.7 &&
      //   formData.physicalAndChemicalTests[0]?.ethersolubleFlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Ether Soluble Substances Final Wt.(g)-Y Should be Less than 0.70"
      //   );
      //   handleFieldClear("ethersolubleFlWtObr");
      // }
      // if (
      //   formData.physicalAndChemicalTests[0]?.ethersolubleIlWtObr > 0.7 &&
      //   formData.physicalAndChemicalTests[0]?.ethersolubleIlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Ether Soluble Substances Initial Wt.(g)-X Should be Less than 0.70"
      //   );
      //   handleFieldClear("ethersolubleIlWtObr");
      // }
      // if (
      //   formData.physicalAndChemicalTests[0]?.moistureFlWtObr > 8.0 &&
      //   formData.physicalAndChemicalTests[0]?.moistureFlWtObr !== ""
      // ) {
      //   validation.add(
      //     "Loss on drying Initial Wt.(g)-K Should be Less than 8.0"
      //   );
      //   handleFieldClear("moistureFlWtObr");
      // }
      // if (
      //   formData.physicalAndChemicalTests[0]?.moistureIlWtObr > 8.0 &&
      //   formData.physicalAndChemicalTests[0]?.moistureIlWtObr !== ""
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
        Number(formData.microbiologicalTests[0].total_viable_count) > 1000 &&
        formData.microbiologicalTests[0].total_viable_count !== ""
      ) {
        validation2.add(
          "Total Viable Count should be less than or equal to 1000"
        );
      }
      if (
        Number(formData.microbiologicalTests[0].total_fungal_count) > 100 &&
        formData.microbiologicalTests[0].total_fungal_count !== ""
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
  const pathogenLov = [
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
  ];
  const product3Lov = [
    { value: "Accepted", label: "Accepted" },
    { value: "Rejected", label: "Rejected" },
    { value: "NA", label: "NA" },
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
  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios
      .put(
        `${    API.prodUrl}/Precot/api/qc/approveShelfLifePeriodReport`,
        {
          id: formData.id,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        message.success(res.data.message);
        navigate("/precot/QualityControl/F-025/Summary");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
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
      ((Number(formData.physicalAndChemicalTests[0]?.abs_1) || 0) +
        (Number(formData.physicalAndChemicalTests[0]?.abs_2) || 0) +
        (Number(formData.physicalAndChemicalTests[0]?.abs_3) || 0)) /
      3;
    handleArrayInput(sinkingAvg1.toFixed(2), "abs_avg");

    sinkingAvg2 =
      ((Number(formData.physicalAndChemicalTests[0]?.abs_4) || 0) +
        (Number(formData.physicalAndChemicalTests[0]?.abs_5) || 0) +
        (Number(formData.physicalAndChemicalTests[0]?.abs_6) || 0)) /
      3;
    handleArrayInput(sinkingAvg2.toFixed(2), "abs_avg_2");

    handleArrayInput(
      (
        Number(formData.physicalAndChemicalTests[0]?.sulphatedFlWtObr || 0) -
        Number(formData.physicalAndChemicalTests[0]?.sulphatedIlWtObr || 0)
      ).toFixed(4),
      "sulphatedBaObr"
    );
    sulphateResult =
      ((Number(formData.physicalAndChemicalTests[0]?.sulphatedFlWtObr || 0) -
        Number(formData.physicalAndChemicalTests[0]?.sulphatedIlWtObr || 0)) *
        100) /
      5;
    handleArrayInput(sulphateResult.toFixed(2), "sulphatedResObr");

    handleArrayInput(
      (
        Number(formData.physicalAndChemicalTests[0]?.watersolubleFlWtObr || 0) -
        Number(formData.physicalAndChemicalTests[0]?.watersolubleIlWtObr || 0)
      ).toFixed(4),
      "watersolubleNmObr"
    );
    waterResult =
      ((Number(formData.physicalAndChemicalTests[0]?.watersolubleFlWtObr || 0) -
        Number(
          formData.physicalAndChemicalTests[0]?.watersolubleIlWtObr || 0
        )) *
        100) /
      5;
    handleArrayInput(waterResult.toFixed(2), "watersolubleResObr");

    handleArrayInput(
      (
        Number(formData.physicalAndChemicalTests[0]?.ethersolubleFlWtObr || 0) -
        Number(formData.physicalAndChemicalTests[0]?.ethersolubleIlWtObr || 0)
      ).toFixed(4),
      "ethersolubleYxObr"
    );
    EtherResult =
      ((Number(formData.physicalAndChemicalTests[0]?.ethersolubleFlWtObr || 0) -
        Number(
          formData.physicalAndChemicalTests[0]?.ethersolubleIlWtObr || 0
        )) *
        100) /
      5;
    handleArrayInput(EtherResult.toFixed(2), "ethersolubleResObr");

    handleArrayInput(
      (
        Number(formData.physicalAndChemicalTests[0]?.moistureIlWtObr || 0) -
        Number(formData.physicalAndChemicalTests[0]?.moistureFlWtObr || 0)
      ).toFixed(4),
      "moistureKlObr"
    );
    lossDryResult =
      ((Number(formData.physicalAndChemicalTests[0]?.moistureIlWtObr || 0) -
        Number(formData.physicalAndChemicalTests[0]?.moistureFlWtObr || 0)) *
        100) /
      (Number(formData.physicalAndChemicalTests[0]?.moistureIlWtObr) || 1);
    handleArrayInput(lossDryResult.toFixed(2), "moistureResultsObr");
  }, [
    formData.physicalAndChemicalTests[0]?.abs_1,
    formData.physicalAndChemicalTests[0]?.abs_3,
    formData.physicalAndChemicalTests[0]?.abs_3,
    formData.physicalAndChemicalTests[0]?.abs_4,
    formData.physicalAndChemicalTests[0]?.abs_5,
    formData.physicalAndChemicalTests[0]?.abs_6,
    formData.physicalAndChemicalTests[0]?.sulphatedFlWtObr,
    formData.physicalAndChemicalTests[0]?.sulphatedIlWtObr,
    formData.physicalAndChemicalTests[0]?.watersolubleFlWtObr,
    formData.physicalAndChemicalTests[0]?.watersolubleIlWtObr,
    formData.physicalAndChemicalTests[0]?.ethersolubleFlWtObr,
    formData.physicalAndChemicalTests[0]?.ethersolubleIlWtObr,
    formData.physicalAndChemicalTests[0]?.moistureFlWtObr,
    formData.physicalAndChemicalTests[0]?.moistureIlWtObr,
  ]);

  const handleSave = async () => {
    let apiurl, payload, succesMsg;
    if (role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST") {
      succesMsg = "Data Saved Sucessfully";
      apiurl = `${    API.prodUrl}/Precot/api/qc/saveShelfLifePeriodReport`;
      console.log("resId", resId);
      console.log(
        "formData.physicalAndChemicalTests[0]?.chemist_id",
        formData.physicalAndChemicalTests[0]?.chemist_id
      );
      payload = {
        id: resId || "",
        formatNo: formData.formatNo,
        revisionNo: formData.revisionNo,
        formatName: formData.formatName,
        refSopNo: formData.refSopNo,

        year: formData.year || year,
        month: formData.month || monthName,
        customer: formData.customer,
        brand: formData.brand,
        productDescription: formData.productDescription,
        pattern: formData.pattern,
        lotNumber: formData.lotNumber || Ltno,
        productionDate: formData.productionDate,
        testingDate: formData.testingDate || date,

        // Flat structure for dimensions, weights, and thickness
        dimensionLengthStd: formData.dimensionStdLength || "N/A",
        dimensionWidthStd: formData.dimensionStdWidth || "N/A",
        dimensionHeightStd: formData.dimensionStdHeight || "N/A",

        dimensionT1Length: formData.dimensionT1Length || "NA",
        dimensionT1Width: formData.dimensionT1Width || "NA",
        dimensionT1Height: formData.dimensionT1Height || "NA",
        dimensionT1Status: formData.dimensionT1Status || "N/A",

        dimensionT2Length: formData.dimensionT2Length,
        dimensionT2Width: formData.dimensionT2Width || "N/A",
        dimensionT2Height: formData.dimensionT2Width,
        dimensionT2Status: formData.dimensionT2Status,

        dimensionT3Length: formData.dimensionT3Length,
        dimensionT3Width: formData.dimensionT3Width || "N/A",
        dimensionT3Height: formData.dimensionT3Height || "N/A",
        dimensionT3Status: formData.dimensionT3Status,

        dimensionT4Length: formData.dimensionT4Length,
        dimensionT4Width: formData.dimensionT4Width,
        dimensionT4Height: formData.dimensionT4Height,
        dimensionT4Status: formData.dimensionT4Status || "N/A",

        dimensionT5Length: formData.dimensionT5Length,
        dimensionT5Width: formData.dimensionT5Width || "N/A",
        dimensionT5Height: formData.dimensionT5Height,
        dimensionT5Status: formData.dimensionT5Status,

        dimensionAvgLength: formData.dimensionAvgLength,
        dimensionAvgWidth: formData.dimensionAvgWidth || "N/A",
        dimensionAvgHeight: formData.dimensionAvgHeight || "N/A",
        dimensionAvgStatus: formData.dimensionAvgStatus,

        weightStd: formData.weightStd || "N/A",
        weightT1Actual: formData.weightT1Actual,
        weightT1Status: formData.weightT1Status || "N/A",
        weightT2Actual: formData.weightT2Actual,
        weightT2Status: formData.weightT2Status || "N/A",
        weightT3Actual: formData.weightT3Actual,
        weightT3Status: formData.weightT3Status || "N/A",
        weightT4Actual: formData.weightT4Actual,
        weightT4Status: formData.weightT4Status || "N/A",
        weightT5Actual: formData.weightT5Actual,
        weightT5Status: formData.weightT5Status || "N/A",
        weightAvgActual: formData.weightAvgActual,
        weightAvgStatus: formData.weightAvgStatus || "N/A",

        thicknessStd: formData.thicknessStd || "N/A",
        thicknessT1Actual: formData.thicknessT1Actual,
        thicknessT1Status: formData.thicknessT1Status || "N/A",
        thicknessT2Actual: formData.thicknessT2Actual,
        thicknessT2Status: formData.thicknessT2Status || "N/A",
        thicknessT3Actual: formData.thicknessT3Actual,
        thicknessT3Status: formData.thicknessT3Status || "N/A",
        thicknessT4Actual: formData.thicknessT4Actual,
        thicknessT4Status: formData.thicknessT4Status || "N/A",
        thicknessT5Actual: formData.thicknessT5Actual,
        thicknessT5Status: formData.thicknessT5Status || "N/A",
        thicknessAvgActual: formData.thicknessAvgActual,
        thicknessAvgStatus: formData.thicknessAvgStatus || "N/A",

        physicalAndChemicalTests: [
          {
            id: formData.physicalAndChemicalTests[0]?.chemist_id || "",
            shelfLifeId: resId || "",
            samplingDate: formData.physicalAndChemicalTests[0]?.samplingDate,
            testedDate: formData.physicalAndChemicalTests[0]?.testedDate,
            descriptionObservation:
              formData.physicalAndChemicalTests[0]?.observation,
            descriptionRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.remarks == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.remarks,
            identificationObservation:
              formData.physicalAndChemicalTests[0]?.identification_obs,
            identificationRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.identification_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.identification_rmk,
            fibreObservation:
              formData.physicalAndChemicalTests[0]?.fibre_average_length_obs,
            fibreRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.fibre_average_length_rmk ==
                ""
                ? ""
                : formData.physicalAndChemicalTests[0]
                    ?.fibre_average_length_rmk,
            acidityObservation:
              formData.physicalAndChemicalTests[0]?.acidity_ph_obs,
            acidityRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.acidity_ph_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.acidity_ph_rmk,
            surfaceActivityObservation:
              formData.physicalAndChemicalTests[0]?.surface_activ_sub_obs,
            surfaceActivityRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.surface_activ_sub_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.surface_activ_sub_rmk,
            foreignFibersObservation:
              formData.physicalAndChemicalTests[0]?.foreign_fibers_obs,
            foreignFibersRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.foreign_fibers_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.foreign_fibers_rmk,
            fluorescenceObservation:
              formData.physicalAndChemicalTests[0]?.fluorescence_obs,
            fluorescenceRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.fluorescence_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.fluorescence_rmk,
            nepsObservation: formData.physicalAndChemicalTests[0]?.neps_obs,
            nepsRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.neps_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.neps_rmk,
            nepsCountGramObservation:
              formData.physicalAndChemicalTests[0]?.neps_count_obs,
            nepsCountGramRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.neps_count_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.neps_count_rmk,
            upperQuartileObservation:
              formData.physicalAndChemicalTests[0]?.uql_w_obs,
            upperQuartileRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.uql_w_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.uql_w_rmk,
            lengthByNumberObservation:
              formData.physicalAndChemicalTests[0]?.ln_obs,
            lengthByNumberRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.ln_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.ln_rmk,
            lengthByWeightObservation:
              formData.physicalAndChemicalTests[0]?.lw_obs,
            lengthByWeightRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.lw_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.lw_rmk,
            shortFiberContentByNumberObservation:
              formData.physicalAndChemicalTests[0]?.sfc_n_obs,
            shortFiberContentByNumberRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.sfc_n_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.sfc_n_rmk,
            shortFiberContentByWtObservation:
              formData.physicalAndChemicalTests[0]?.sfc_w_obs,
            shortFiberContentByWtRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.sfc_w_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.sfc_w_rmk,
            micronaireObservation:
              formData.physicalAndChemicalTests[0]?.micronaire_obs,
            micronaireRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.micronaire_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.micronaire_rmk,
            whitenessIndicesObservation:
              formData.physicalAndChemicalTests[0]?.whiteness_obs,
            whitenessIndicesRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.whiteness_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.whiteness_rmk,
            extractableColouringObservation:
              formData.physicalAndChemicalTests[0]?.extractable_obs,
            extractableColouringRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.extractable_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.extractable_rmk,
            sinkingTrail1: formData.physicalAndChemicalTests[0]?.abs_1,
            sinkingTrail2: formData.physicalAndChemicalTests[0]?.abs_2,
            sinkingTrail3: formData.physicalAndChemicalTests[0]?.abs_3,
            absorbptionTrail1: formData.physicalAndChemicalTests[0]?.abs_4,
            absorbptionTrail2: formData.physicalAndChemicalTests[0]?.abs_5,
            absorbptionTrail3: formData.physicalAndChemicalTests[0]?.abs_6,
            sinkingTrailAvg: formData.physicalAndChemicalTests[0]?.abs_avg,
            absorbptionTrailAvg:
              formData.physicalAndChemicalTests[0]?.abs_avg_2,
            // abs_rmk: formData.physicalAndChemicalTests[0]?.abs_rmk,
            // abs2_rmk: formData.physicalAndChemicalTests[0]?.abs2_rmk,
            sinkingTrailRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.abs_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.abs_rmk,
            absorbptionTrailRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.abs2_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.abs2_rmk,
            // remark: formData.physicalAndChemicalTests[0]?.remark,
            sulphatedAshFinal:
              formData.physicalAndChemicalTests[0]?.sulphatedFlWtObr,
            sulphatedAshInitial:
              formData.physicalAndChemicalTests[0]?.sulphatedIlWtObr,
            sulphatedAshBa:
              formData.physicalAndChemicalTests[0]?.sulphatedBaObr,
            sulphatedAshResult:
              formData.physicalAndChemicalTests[0]?.sulphatedResObr,
            sulphatedAshRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.sulphate_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.sulphate_rmk,
            waterSolubleFinal:
              formData.physicalAndChemicalTests[0]?.watersolubleFlWtObr,
            waterSolubleInitial:
              formData.physicalAndChemicalTests[0]?.watersolubleIlWtObr,
            waterSolubleBa:
              formData.physicalAndChemicalTests[0]?.watersolubleNmObr,
            waterSolubleResult:
              formData.physicalAndChemicalTests[0]?.watersolubleResObr,
            waterSolubleRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.water_soluble_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.water_soluble_rmk,
            etherSolubleFinal:
              formData.physicalAndChemicalTests[0]?.ethersolubleFlWtObr,
            etherSolubleInitial:
              formData.physicalAndChemicalTests[0]?.ethersolubleIlWtObr,
            etherSolubleBa:
              formData.physicalAndChemicalTests[0]?.ethersolubleYxObr,
            etherSolubleResult:
              formData.physicalAndChemicalTests[0]?.ethersolubleResObr,
            etherSolubleRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.ether_soluble_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.ether_soluble_rmk,
            lossOnDryingFinal:
              formData.physicalAndChemicalTests[0]?.moistureFlWtObr,
            lossOnDryingInitial:
              formData.physicalAndChemicalTests[0]?.moistureIlWtObr,
            lossOnDryingBa: formData.physicalAndChemicalTests[0]?.moistureKlObr,
            lossOnDryingResult:
              formData.physicalAndChemicalTests[0]?.moistureResultsObr,
            lossOnDryingRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.moisture_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.moisture_rmk,
            remarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.final_remark == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.final_remark,
          },
        ],

        microbiologicalTests: [
          {
            id: formData.microbiologicalTests[0]?.micro_id || "",
            shelfLifeId: resId || "",
            sampledOn: formData.microbiologicalTests[0].sampled_on,
            testIncubationStartOn: formData.microbiologicalTests[0].tested_on,
            totalViableCount:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].total_viable_count == ""
                ? ""
                : formData.microbiologicalTests[0].total_fungal_count,
            totalFungalCount:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].total_fungal_count == ""
                ? ""
                : formData.microbiologicalTests[0].total_fungal_count,

            gramNegativeBacteriaOrColiform:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].gram == ""
                ? ""
                : formData.microbiologicalTests[0].gram,
            escherichiaColi:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].escherechia_coli == ""
                ? ""
                : formData.microbiologicalTests[0].escherechia_coli,
            pseudomonasAeruginosa:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].pseudonymous_aerogenosa == ""
                ? ""
                : formData.microbiologicalTests[0].pseudonymous_aerogenosa,
            salmonella:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].salmonella == ""
                ? ""
                : formData.microbiologicalTests[0].salmonella,
            staphylococcusAureus:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].stapylococcus == ""
                ? ""
                : formData.microbiologicalTests[0].stapylococcus,
            testCompletionDate:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].test_completion_date == ""
                ? ""
                : formData.microbiologicalTests[0].test_completion_date,
            moisturePercentage:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].moisture == ""
                ? ""
                : formData.microbiologicalTests[0].moisture,
            // sub_batch_no: bmrNo,
            // completion_date: formData.microbiologicalTests[0].completion_date,
            remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].remark == ""
                ? ""
                : formData.microbiologicalTests[0].remark,
          },
        ],
      };
    } else if (role == "QA_MANAGER" || role == "QC_MANAGER") {
      apiurl = `${    API.prodUrl}/Precot/api/qc/approveShelfLifePeriodReport`;
      succesMsg = "Approved Successfully";
      payload = {
        id: formData.formData_id,
        formatNo: "PH-QCL01-AR-F-002",
        status: "Approve",
      };
    }

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

      if (response && response.data) {
        message.success(succesMsg);
        setStatusLoader(false);
        setTimeout(() => {
          navigate("/precot/QualityControl/F-025/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };

  const handleSubmit = async () => {
    if (role === "ROLE_CHEMIST") {
      const requiredFields = [
        { field: "customer", message: "Enter Customer" },
        { field: "brand", message: "Enter Brand" },
        { field: "productDescription", message: "Enter Product Description" },
        { field: "pattern", message: "Enter pattern" },
        { field: "productionDate", message: "Enter Production Date" },

        // Dimension fields with validation messages
        { field: "dimensionStdLength", message: "Enter Dimension Length STD" },
        {
          field: "dimensionT1Length",
          message: "Enter Dimension T1 Length Actual",
        },
        {
          field: "dimensionT2Length",
          message: "Enter Dimension T2 Length Actual",
        },
        {
          field: "dimensionT3Length",
          message: "Enter Dimension T3 Length Actual",
        },
        {
          field: "dimensionT4Length",
          message: "Enter Dimension T4 Length Actual",
        },
        {
          field: "dimensionT5Length",
          message: "Enter Dimension T5 Length Actual",
        },

        { field: "dimensionStdWidth", message: "Enter Dimension Width STD" },
        { field: "dimensionT1Width", message: "Enter Dimension T1 Width" },
        { field: "dimensionT2Width", message: "Enter Dimension T2 Width" },
        { field: "dimensionT3Width", message: "Enter Dimension T3 Width" },
        { field: "dimensionT4Width", message: "Enter Dimension T4 Width" },
        { field: "dimensionT5Width", message: "Enter Dimension T5 Width" },

        { field: "dimensionAvgHeight", message: "Enter Dimension Height STD" },
        { field: "dimensionT1Height", message: "Enter Dimension T1 Height" },
        { field: "dimensionT2Height", message: "Enter Dimension T2 Height" },
        { field: "dimensionT3Height", message: "Enter Dimension T3 Height" },
        { field: "dimensionT4Height", message: "Enter Dimension T4 Height" },
        { field: "dimensionT5Height", message: "Enter Dimension T5 Height" },

        // Weight fields with validation messages
        { field: "weightStd", message: "Enter Weight STD" },
        {
          field: "weightT1Actual",
          message: "Enter Weight T1 Actual",
          category: "Weight",
        },
        {
          field: "weightT2Actual",
          message: "Enter Weight T2 Actual",
          category: "Weight",
        },
        {
          field: "weightT3Actual",
          message: "Enter Weight T3 Actual",
          category: "Weight",
        },
        {
          field: "weightT4Actual",
          message: "Enter Weight T4 Actual",
          category: "Weight",
        },
        {
          field: "weightT5Actual",
          message: "Enter Weight T5 Actual",
          category: "Weight",
        },

        // Thickness fields with validation messages
        { field: "thicknessStd", message: "Enter Thickness STD" },
        {
          field: "thicknessT1Actual",
          message: "Enter Thickness T1 Actual",
          category: "Thickness",
        },
        {
          field: "thicknessT2Actual",
          message: "Enter Thickness T2 Actual",
          category: "Thickness",
        },
        {
          field: "thicknessT3Actual",
          message: "Enter Thickness T3 Actual",
          category: "Thickness",
        },
        {
          field: "thicknessT4Actual",
          message: "Enter Thickness T4 Actual",
          category: "Thickness",
        },
        {
          field: "thicknessT5Actual",
          message: "Enter Thickness T5 Actual",
          category: "Thickness",
        },
      ];

      const physicalAndChemicalTests = formData.physicalAndChemicalTests[0];

      // Function to check fields step by step

      // Sequentially validate required fields
      for (let { field, message: errorMessage } of requiredFields) {
        if (!formData[field]) {
          message.error(errorMessage);
          return;
        }
      }

      const keysToValidateFormFields = [
        "samplingDate",
        "testedDate",
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
        }
      };

      for (const key of keysToValidateFormFields) {
        if (
          formData.physicalAndChemicalTests[0][key] == "" ||
          formData.physicalAndChemicalTests[0][key] == null
        ) {
          message.warning(`Please Fill ${getFieldName(key)}`);
          return;
        }
      }
      // All validation passed here - proceed to submit form or next action
    } else if (role === "ROLE_MICROBIOLOGIST") {
      const microbiologicalTestFields = [
        "sampled_on",
        "tested_on",
        "total_viable_count",
        "total_fungal_count",
        "gram",
        "escherechia_coli",
        "stapylococcus",
        "pseudonymous_aerogenosa",
        "salmonella",
        "test_completion_date",
      ];

      for (let i = 0; i < microbiologicalTestFields.length; i++) {
        const field = microbiologicalTestFields[i];
        if (!formData.microbiologicalTests?.[0]?.[field]) {
          message.error(
            `Enter ${field.replace(
              /([A-Z])/g,
              " $1"
            )} for Microbiological Tests`
          );
          return;
        }
      }
    }
    let apiurl, payload, succesMsg;
    if (role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST") {
      succesMsg = "Submitted Successfully ";
      apiurl = `${    API.prodUrl}/Precot/api/qc/SubmitShelfLifePeriodReport`;
      console.log("resId", resId);
      console.log(
        "formData.physicalAndChemicalTests[0]?.chemist_id",
        formData.physicalAndChemicalTests[0]?.chemist_id
      );
      payload = {
        id: resId || "",
        formatNo: formData.formatNo,
        revisionNo: formData.revisionNo,
        formatName: formData.formatName,
        refSopNo: formData.refSopNo,

        year: formData.year || year,
        month: formData.month || monthName,
        customer: formData.customer,
        brand: formData.brand,
        productDescription: formData.productDescription,
        pattern: formData.pattern,
        lotNumber: formData.lotNumber || Ltno,
        productionDate: formData.productionDate,
        testingDate: formData.testingDate || date,

        // Flat structure for dimensions, weights, and thickness
        dimensionLengthStd: formData.dimensionStdLength || "N/A",
        dimensionWidthStd: formData.dimensionStdWidth || "N/A",
        dimensionHeightStd: formData.dimensionStdHeight || "N/A",

        dimensionT1Length: formData.dimensionT1Length || "NA",
        dimensionT1Width: formData.dimensionT1Width || "NA",
        dimensionT1Height: formData.dimensionT1Height || "NA",
        dimensionT1Status: formData.dimensionT1Status || "N/A",

        dimensionT2Length: formData.dimensionT2Length || "N/A",
        dimensionT2Width: formData.dimensionT2Width || "N/A",
        dimensionT2Height: formData.dimensionT2Width || "N/A",
        dimensionT2Status: formData.dimensionT2Status,

        dimensionT3Length: formData.dimensionT3Length || "N/A",
        dimensionT3Width: formData.dimensionT3Width || "N/A",
        dimensionT3Height: formData.dimensionT3Height || "N/A",
        dimensionT3Status: formData.dimensionT3Status || "N/A",

        dimensionT4Length: formData.dimensionT4Length || "N/A",
        dimensionT4Width: formData.dimensionT4Width || "N/A",
        dimensionT4Height: formData.dimensionT4Height || "N/A",
        dimensionT4Status: formData.dimensionT4Status || "N/A",

        dimensionT5Length: formData.dimensionT5Length || "N/A",
        dimensionT5Width: formData.dimensionT5Width || "N/A",
        dimensionT5Height: formData.dimensionT5Height || "N/A",
        dimensionT5Status: formData.dimensionT5Status || "N/A",

        dimensionAvgLength: formData.dimensionAvgLength || "N/A",
        dimensionAvgWidth: formData.dimensionAvgWidth || "N/A",
        dimensionAvgHeight: formData.dimensionAvgHeight || "N/A",
        dimensionAvgStatus: formData.dimensionAvgStatus || "N/A",

        weightStd: formData.weightStd || "N/A",
        weightT1Actual: formData.weightT1Actual || "N/A",
        weightT1Status: formData.weightT1Status || "N/A",
        weightT2Actual: formData.weightT2Actual || "N/A",
        weightT2Status: formData.weightT2Status || "N/A",
        weightT3Actual: formData.weightT3Actual || "N/A",
        weightT3Status: formData.weightT3Status || "N/A",
        weightT4Actual: formData.weightT4Actual || "N/A",
        weightT4Status: formData.weightT4Status || "N/A",
        weightT5Actual: formData.weightT5Actual || "N/A",
        weightT5Status: formData.weightT5Status || "N/A",
        weightAvgActual: formData.weightAvgActual || "N/A",
        weightAvgStatus: formData.weightAvgStatus || "N/A",

        thicknessStd: formData.thicknessStd || "N/A",
        thicknessT1Actual: formData.thicknessT1Actual || "N/A",
        thicknessT1Status: formData.thicknessT1Status || "N/A",
        thicknessT2Actual: formData.thicknessT2Actual || "N/A",
        thicknessT2Status: formData.thicknessT2Status || "N/A",
        thicknessT3Actual: formData.thicknessT3Actual || "N/A",
        thicknessT3Status: formData.thicknessT3Status || "N/A",
        thicknessT4Actual: formData.thicknessT4Actual || "N/A",
        thicknessT4Status: formData.thicknessT4Status || "N/A",
        thicknessT5Actual: formData.thicknessT5Actual || "N/A",
        thicknessT5Status: formData.thicknessT5Status || "N/A",
        thicknessAvgActual: formData.thicknessAvgActual || "N/A",
        thicknessAvgStatus: formData.thicknessAvgStatus || "N/A",

        physicalAndChemicalTests: [
          {
            id: formData.physicalAndChemicalTests[0]?.chemist_id || "",
            shelfLifeId: resId || "",
            samplingDate: formData.physicalAndChemicalTests[0]?.samplingDate,
            testedDate: formData.physicalAndChemicalTests[0]?.testedDate,
            descriptionObservation:
              formData.physicalAndChemicalTests[0]?.observation,
            descriptionRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.remarks == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.remarks,
            identificationObservation:
              formData.physicalAndChemicalTests[0]?.identification_obs,
            identificationRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.identification_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.identification_rmk,
            fibreObservation:
              formData.physicalAndChemicalTests[0]?.fibre_average_length_obs,
            fibreRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.fibre_average_length_rmk ==
                ""
                ? ""
                : formData.physicalAndChemicalTests[0]
                    ?.fibre_average_length_rmk,
            acidityObservation:
              formData.physicalAndChemicalTests[0]?.acidity_ph_obs,
            acidityRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.acidity_ph_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.acidity_ph_rmk,
            surfaceActivityObservation:
              formData.physicalAndChemicalTests[0]?.surface_activ_sub_obs,
            surfaceActivityRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.surface_activ_sub_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.surface_activ_sub_rmk,
            foreignFibersObservation:
              formData.physicalAndChemicalTests[0]?.foreign_fibers_obs,
            foreignFibersRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.foreign_fibers_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.foreign_fibers_rmk,
            fluorescenceObservation:
              formData.physicalAndChemicalTests[0]?.fluorescence_obs,
            fluorescenceRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.fluorescence_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.fluorescence_rmk,
            nepsObservation: formData.physicalAndChemicalTests[0]?.neps_obs,
            nepsRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.neps_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.neps_rmk,
            nepsCountGramObservation:
              formData.physicalAndChemicalTests[0]?.neps_count_obs,
            nepsCountGramRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.neps_count_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.neps_count_rmk,
            upperQuartileObservation:
              formData.physicalAndChemicalTests[0]?.uql_w_obs,
            upperQuartileRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.uql_w_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.uql_w_rmk,
            lengthByNumberObservation:
              formData.physicalAndChemicalTests[0]?.ln_obs,
            lengthByNumberRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.ln_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.ln_rmk,
            lengthByWeightObservation:
              formData.physicalAndChemicalTests[0]?.lw_obs,
            lengthByWeightRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.lw_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.lw_rmk,
            shortFiberContentByNumberObservation:
              formData.physicalAndChemicalTests[0]?.sfc_n_obs,
            shortFiberContentByNumberRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.sfc_n_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.sfc_n_rmk,
            shortFiberContentByWtObservation:
              formData.physicalAndChemicalTests[0]?.sfc_w_obs,
            shortFiberContentByWtRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.sfc_w_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.sfc_w_rmk,
            micronaireObservation:
              formData.physicalAndChemicalTests[0]?.micronaire_obs,
            micronaireRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.micronaire_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.micronaire_rmk,
            whitenessIndicesObservation:
              formData.physicalAndChemicalTests[0]?.whiteness_obs,
            whitenessIndicesRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.whiteness_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.whiteness_rmk,
            extractableColouringObservation:
              formData.physicalAndChemicalTests[0]?.extractable_obs,
            extractableColouringRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.extractable_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.extractable_rmk,
            sinkingTrail1: formData.physicalAndChemicalTests[0]?.abs_1,
            sinkingTrail2: formData.physicalAndChemicalTests[0]?.abs_2,
            sinkingTrail3: formData.physicalAndChemicalTests[0]?.abs_3,
            absorbptionTrail1: formData.physicalAndChemicalTests[0]?.abs_4,
            absorbptionTrail2: formData.physicalAndChemicalTests[0]?.abs_5,
            absorbptionTrail3: formData.physicalAndChemicalTests[0]?.abs_6,
            sinkingTrailAvg: formData.physicalAndChemicalTests[0]?.abs_avg,
            absorbptionTrailAvg:
              formData.physicalAndChemicalTests[0]?.abs_avg_2,
            // abs_rmk: formData.physicalAndChemicalTests[0]?.abs_rmk,
            // abs2_rmk: formData.physicalAndChemicalTests[0]?.abs2_rmk,
            sinkingTrailRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.abs_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.abs_rmk,
            absorbptionTrailRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.abs2_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.abs2_rmk,
            // remark: formData.physicalAndChemicalTests[0]?.remark,
            sulphatedAshFinal:
              formData.physicalAndChemicalTests[0]?.sulphatedFlWtObr,
            sulphatedAshInitial:
              formData.physicalAndChemicalTests[0]?.sulphatedIlWtObr,
            sulphatedAshBa:
              formData.physicalAndChemicalTests[0]?.sulphatedBaObr,
            sulphatedAshResult:
              formData.physicalAndChemicalTests[0]?.sulphatedResObr,
            sulphatedAshRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.sulphate_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.sulphate_rmk,
            waterSolubleFinal:
              formData.physicalAndChemicalTests[0]?.watersolubleFlWtObr,
            waterSolubleInitial:
              formData.physicalAndChemicalTests[0]?.watersolubleIlWtObr,
            waterSolubleBa:
              formData.physicalAndChemicalTests[0]?.watersolubleNmObr,
            waterSolubleResult:
              formData.physicalAndChemicalTests[0]?.watersolubleResObr,
            waterSolubleRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.water_soluble_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.water_soluble_rmk,
            etherSolubleFinal:
              formData.physicalAndChemicalTests[0]?.ethersolubleFlWtObr,
            etherSolubleInitial:
              formData.physicalAndChemicalTests[0]?.ethersolubleIlWtObr,
            etherSolubleBa:
              formData.physicalAndChemicalTests[0]?.ethersolubleYxObr,
            etherSolubleResult:
              formData.physicalAndChemicalTests[0]?.ethersolubleResObr,
            etherSolubleRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.ether_soluble_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.ether_soluble_rmk,
            lossOnDryingFinal:
              formData.physicalAndChemicalTests[0]?.moistureFlWtObr,
            lossOnDryingInitial:
              formData.physicalAndChemicalTests[0]?.moistureIlWtObr,
            lossOnDryingBa: formData.physicalAndChemicalTests[0]?.moistureKlObr,
            lossOnDryingResult:
              formData.physicalAndChemicalTests[0]?.moistureResultsObr,
            lossOnDryingRemarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.moisture_rmk == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.moisture_rmk,
            remarks:
              role == "ROLE_CHEMIST" &&
              formData.physicalAndChemicalTests[0]?.final_remark == ""
                ? ""
                : formData.physicalAndChemicalTests[0]?.final_remark,
          },
        ],

        microbiologicalTests: [
          {
            id: formData.microbiologicalTests[0]?.micro_id || "",
            shelfLifeId: resId || "",
            sampledOn: formData.microbiologicalTests[0].sampled_on,
            testIncubationStartOn: formData.microbiologicalTests[0].tested_on,
            totalViableCount:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].total_viable_count == ""
                ? ""
                : formData.microbiologicalTests[0].total_fungal_count,
            totalFungalCount:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].total_fungal_count == ""
                ? ""
                : formData.microbiologicalTests[0].total_fungal_count,

            gramNegativeBacteriaOrColiform:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].gram == ""
                ? ""
                : formData.microbiologicalTests[0].gram,
            escherichiaColi:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].escherechia_coli == ""
                ? ""
                : formData.microbiologicalTests[0].escherechia_coli,
            pseudomonasAeruginosa:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].pseudonymous_aerogenosa == ""
                ? ""
                : formData.microbiologicalTests[0].pseudonymous_aerogenosa,
            salmonella:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].salmonella == ""
                ? ""
                : formData.microbiologicalTests[0].salmonella,
            staphylococcusAureus:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].stapylococcus == ""
                ? ""
                : formData.microbiologicalTests[0].stapylococcus,
            testCompletionDate:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].test_completion_date == ""
                ? ""
                : formData.microbiologicalTests[0].test_completion_date,
            moisturePercentage:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].moisture == ""
                ? ""
                : formData.microbiologicalTests[0].moisture,
            // sub_batch_no: bmrNo,
            // completion_date: formData.microbiologicalTests[0].completion_date,
            remark:
              role == "ROLE_MICROBIOLOGIST" &&
              formData.microbiologicalTests[0].remark == ""
                ? ""
                : formData.microbiologicalTests[0].remark,
          },
        ],
      };
    } else if (role == "QA_MANAGER" || role == "QC_MANAGER") {
      if (formData.reason == "" || formData.reason == null) {
        message.warning("Please Enter the Reason");
        setStatusLoader(false);
        return;
      }
      apiurl = `${    API.prodUrl}/Precot/api/qc/approveShelfLifePeriodReport`;
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
          navigate("/precot/QualityControl/F-025/Summary");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setStatusLoader(false);
      message.error(error.response.data.message);
    }
  };
  const canEdit = () => {
    if (roleauth === "ROLE_MICROBIOLOGIST") {
      return (
        !(
          selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.qc_status === "WAITING_FOR_APPROVAL"
        ) ||
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.qc_status === "QC_APPROVED") ||
        (selectedRow.microbiologist_status === "MICROBIOLOGIST_APPROVED" &&
          selectedRow.qc_status === "QA_APPROVED")
      );
    }
  };

  let isEditable = canEdit();

  const statusFunction = (data) => {
    console.log("data.microbiologist_status", data.microbiologist_status);
    console.log("data.chekjist_status", data.chemist_status);
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
    console.log("statusfucntion called");
    console.log("data microbiologist_status", data.microbiologist_status);
    if (
      role == "ROLE_MICROBIOLOGIST" &&
      data.microbiologist_status == "MICROBIOLOGIST_APPROVED"
    ) {
      setStatus((prevState) => ({
        ...prevState,

        saveStatus: true,
      }));
    }
    if (
      role == "ROLE_MICROBIOLOGIST" &&
      data.microbiologist_status == "MICROBIOLOGIST_APPROVED" &&
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
        data.microbiologist_status !== "MICROBIOLOGIST_APPROVED")
    ) {
      message.warning("Chemist or Microbiologist Yet To Submit");
      setTimeout(() => {
        navigate("/precot/QualityControl/F-025/Summary");
      }, 1000);
    }

    if (
      (role == "QA_MANAGER" || role == "QC_MANAGER") &&
      data.qc_status === "WAITING_FOR_APPROVAL"
    ) {
      setStatus((formStatus) => ({
        ...formStatus,
        fieldStatus: true,
      }));
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
        navigate("/precot/QualityControl/F-025/Summary");
      }, 1000);
      setStatus((formStatus) => ({
        ...formStatus,
        saveStatus: true,
        submitStatus: true,
      }));
    }
  };

  //getdata
  useEffect(() => {
    initialized.current = true;
    console.log("resid", resId);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${    API.prodUrl}/Precot/api/qc/ShelfLifePeriodReport/ByProdDateTestingDateForF026?LotNo=${Ltno}&testingDate=${date}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.length === 0) {
          if (role === "QA_MANAGER" || role === "QC_MANAGER") {
            message.warning("Chemist or Microbiologist Yet To Approve");
            setTimeout(() => {
              navigate("/precot/QualityControl/F-025/Summary");
            }, 1000);
          }
        } else if (response.data.length > 0) {
          const data = response.data[0];
          setResId(data.id);
          statusFunction(data);
          setSelectedRow(response.data[0]);

          console.log("formData.id", formData.id);
          console.log(
            " data.physicalAndChemicalTests[0].id",
            data.physicalAndChemicalTests[0].id
          );
          setFormData((prevState) => ({
            ...prevState,
            id: data.id || "",
            formatNo: data.formatNo || "",
            revisionNo: data.revisionNo || "",
            formatName: data.formatName || "",
            refSopNo: data.refSopNo || "",
            year: data.year || "",
            pattern: data.pattern,
            month: data.month || "",
            customer: data.customer || "",
            brand: data.brand || "",
            productDescription: data.productDescription || "",
            lotNumber: data.lotNumber || "",
            productionDate: data.productionDate || "",
            testingDate: data.testingDate || "",

            // Dimensions mapping
            dimensionStdLength: data.dimensionLengthStd || "",
            dimensionStdWidth: data.dimensionWidthStd || "",
            dimensionStdHeight: data.dimensionHeightStd || "",

            dimensionT1Length: data.dimensionT1Length || "",
            dimensionT1Width: data.dimensionT1Width || "",
            dimensionT1Height: data.dimensionT1Height || "",
            dimensionT1Status: data.dimensionT1Status || "",

            dimensionT2Length: data.dimensionT2Length || "",
            dimensionT2Width: data.dimensionT2Width || "",
            dimensionT2Height: data.dimensionT2Height || "",
            dimensionT2Status: data.dimensionT2Status || "",

            dimensionT3Length: data.dimensionT3Length || "",
            dimensionT3Width: data.dimensionT3Width || "",
            dimensionT3Height: data.dimensionT3Height || "",
            dimensionT3Status: data.dimensionT3Status || "",

            dimensionT4Length: data.dimensionT4Length || "",
            dimensionT4Width: data.dimensionT4Width || "",
            dimensionT4Height: data.dimensionT4Height || "",
            dimensionT4Status: data.dimensionT4Status || "",

            dimensionT5Length: data.dimensionT5Length || "",
            dimensionT5Width: data.dimensionT5Width || "",
            dimensionT5Height: data.dimensionT5Height || "",
            dimensionT5Status: data.dimensionT5Status || "",

            dimensionAvgLength: data.dimensionAvgLength || "",
            dimensionAvgWidth: data.dimensionAvgWidth || "",
            dimensionAvgHeight: data.dimensionAvgHeight || "",
            dimensionAvgStatus: data.dimensionAvgStatus || "",

            // Weights mapping
            weightStd: data.weightStd || "",
            weightT1Actual: data.weightT1Actual || "",
            weightT1Status: data.weightT1Status || "",
            weightT2Actual: data.weightT2Actual || "",
            weightT2Status: data.weightT2Status || "",
            weightT3Actual: data.weightT3Actual || "",
            weightT3Status: data.weightT3Status || "",
            weightT4Actual: data.weightT4Actual || "",
            weightT4Status: data.weightT4Status || "",
            weightT5Actual: data.weightT5Actual || "",
            weightT5Status: data.weightT5Status || "",
            weightAvgActual: data.weightAvgActual || "",
            weightAvgStatus: data.weightAvgStatus || "",

            // Thickness mapping
            thicknessStd: data.thicknessStd || "",
            thicknessT1Actual: data.thicknessT1Actual || "",
            thicknessT1Status: data.thicknessT1Status || "",
            thicknessT2Actual: data.thicknessT2Actual || "",
            thicknessT2Status: data.thicknessT2Status || "",
            thicknessT3Actual: data.thicknessT3Actual || "",
            thicknessT3Status: data.thicknessT3Status || "",
            thicknessT4Actual: data.thicknessT4Actual || "",
            thicknessT4Status: data.thicknessT4Status || "",
            thicknessT5Actual: data.thicknessT5Actual || "",
            thicknessT5Status: data.thicknessT5Status || "",
            thicknessAvgActual: data.thicknessAvgActual || "",
            thicknessAvgStatus: data.thicknessAvgStatus || "",

            // Physical and Chemical Tests mapping
            physicalAndChemicalTests:
              data.physicalAndChemicalTests?.length > 0
                ? [
                    {
                      chemist_id: data.physicalAndChemicalTests[0].id,
                      shelfLifeId: data.physicalAndChemicalTests[0].shelfLifeId,
                      samplingDate:
                        data.physicalAndChemicalTests[0].samplingDate || "",
                      testedDate:
                        data.physicalAndChemicalTests[0].testedDate || "",
                      observation:
                        data.physicalAndChemicalTests[0]
                          .descriptionObservation || "",
                      remarks:
                        data.physicalAndChemicalTests[0].descriptionRemarks ||
                        "",
                      identification_obs:
                        data.physicalAndChemicalTests[0]
                          .identificationObservation || "",
                      identification_rmk:
                        data.physicalAndChemicalTests[0]
                          .identificationRemarks || "",
                      fibre_average_length_obs:
                        data.physicalAndChemicalTests[0].fibreObservation || "",
                      fibre_average_length_rmk:
                        data.physicalAndChemicalTests[0].fibreRemarks || "",
                      acidity_ph_obs:
                        data.physicalAndChemicalTests[0].acidityObservation ||
                        "",
                      acidity_ph_rmk:
                        data.physicalAndChemicalTests[0].acidityRemarks || "",
                      surface_activ_sub_obs:
                        data.physicalAndChemicalTests[0]
                          .surfaceActivityObservation || "",
                      surface_activ_sub_rmk:
                        data.physicalAndChemicalTests[0]
                          .surfaceActivityRemarks || "",
                      foreign_fibers_obs:
                        data.physicalAndChemicalTests[0]
                          .foreignFibersObservation || "",
                      foreign_fibers_rmk:
                        data.physicalAndChemicalTests[0].foreignFibersRemarks ||
                        "",
                      fluorescence_obs:
                        data.physicalAndChemicalTests[0]
                          .fluorescenceObservation || "",
                      fluorescence_rmk:
                        data.physicalAndChemicalTests[0].fluorescenceRemarks ||
                        "",
                      neps_obs:
                        data.physicalAndChemicalTests[0].nepsObservation || "",
                      neps_rmk:
                        data.physicalAndChemicalTests[0].nepsRemarks || "",
                      neps_count_obs:
                        data.physicalAndChemicalTests[0]
                          .nepsCountGramObservation || "",
                      neps_count_rmk:
                        data.physicalAndChemicalTests[0].nepsCountGramRemarks ||
                        "",
                      uql_w_obs:
                        data.physicalAndChemicalTests[0]
                          .upperQuartileObservation || "",
                      uql_w_rmk:
                        data.physicalAndChemicalTests[0].upperQuartileRemarks ||
                        "",
                      ln_obs:
                        data.physicalAndChemicalTests[0]
                          .lengthByNumberObservation || "",
                      ln_rmk:
                        data.physicalAndChemicalTests[0]
                          .lengthByNumberRemarks || "",
                      lw_obs:
                        data.physicalAndChemicalTests[0]
                          .lengthByWeightObservation || "",
                      lw_rmk:
                        data.physicalAndChemicalTests[0]
                          .lengthByWeightRemarks || "",
                      sfc_n_obs:
                        data.physicalAndChemicalTests[0]
                          .shortFiberContentByNumberObservation || "",
                      sfc_n_rmk:
                        data.physicalAndChemicalTests[0]
                          .shortFiberContentByNumberRemarks || "",
                      sfc_w_obs:
                        data.physicalAndChemicalTests[0]
                          .shortFiberContentByWtObservation || "",
                      sfc_w_rmk:
                        data.physicalAndChemicalTests[0]
                          .shortFiberContentByWtRemarks || "",
                      micronaire_obs:
                        data.physicalAndChemicalTests[0]
                          .micronaireObservation || "",
                      micronaire_rmk:
                        data.physicalAndChemicalTests[0].micronaireRemarks ||
                        "",
                      whiteness_obs:
                        data.physicalAndChemicalTests[0]
                          .whitenessIndicesObservation || "",
                      whiteness_rmk:
                        data.physicalAndChemicalTests[0]
                          .whitenessIndicesRemarks || "",
                      extractable_obs:
                        data.physicalAndChemicalTests[0]
                          .extractableColouringObservation || "",
                      extractable_rmk:
                        data.physicalAndChemicalTests[0]
                          .extractableColouringRemarks || "",

                      abs_1:
                        data.physicalAndChemicalTests[0].sinkingTrail1 || "",
                      abs_2:
                        data.physicalAndChemicalTests[0].sinkingTrail2 || "",
                      abs_3:
                        data.physicalAndChemicalTests[0].sinkingTrail3 || "",
                      abs_avg:
                        data.physicalAndChemicalTests[0].sinkingTrailAvg || "",
                      abs_rmk:
                        data.physicalAndChemicalTests[0].sinkingTrailRemarks ||
                        "",
                      abs_4:
                        data.physicalAndChemicalTests[0].absorbptionTrail1 ||
                        "",
                      abs_5:
                        data.physicalAndChemicalTests[0].absorbptionTrail2 ||
                        "",
                      abs_6:
                        data.physicalAndChemicalTests[0].absorbptionTrail3 ||
                        "",
                      abs_avg_2:
                        data.physicalAndChemicalTests[0].absorbptionTrailAvg ||
                        "",
                      abs2_rmk:
                        data.physicalAndChemicalTests[0]
                          .absorbptionTrailRemarks || "",
                      sulphatedFlWtObr:
                        data.physicalAndChemicalTests[0].sulphatedAshFinal ||
                        "",
                      sulphatedIlWtObr:
                        data.physicalAndChemicalTests[0].sulphatedAshInitial ||
                        "",
                      sulphatedBaObr:
                        data.physicalAndChemicalTests[0].sulphatedAshBa || "",
                      sulphatedResObr:
                        data.physicalAndChemicalTests[0].sulphatedAshResult ||
                        "",
                      sulphate_rmk:
                        data.physicalAndChemicalTests[0].sulphatedAshRemarks ||
                        "",
                      watersolubleFlWtObr:
                        data.physicalAndChemicalTests[0].waterSolubleFinal ||
                        "",
                      watersolubleIlWtObr:
                        data.physicalAndChemicalTests[0].waterSolubleInitial ||
                        "",
                      watersolubleNmObr:
                        data.physicalAndChemicalTests[0].waterSolubleBa || "",
                      watersolubleResObr:
                        data.physicalAndChemicalTests[0].waterSolubleResult ||
                        "",
                      water_soluble_rmk:
                        data.physicalAndChemicalTests[0].waterSolubleRemarks ||
                        "",

                      ethersolubleFlWtObr:
                        data.physicalAndChemicalTests[0].etherSolubleFinal ||
                        "",
                      ethersolubleIlWtObr:
                        data.physicalAndChemicalTests[0].etherSolubleInitial ||
                        "",
                      ethersolubleYxObr:
                        data.physicalAndChemicalTests[0].etherSolubleBa || "",
                      ethersolubleResObr:
                        data.physicalAndChemicalTests[0].etherSolubleResult ||
                        "",
                      ether_soluble_rmk:
                        data.physicalAndChemicalTests[0].etherSolubleRemarks ||
                        "",

                      moistureFlWtObr:
                        data.physicalAndChemicalTests[0].lossOnDryingFinal ||
                        "",
                      moistureIlWtObr:
                        data.physicalAndChemicalTests[0].lossOnDryingInitial ||
                        "",
                      moistureKlObr:
                        data.physicalAndChemicalTests[0].lossOnDryingBa || "",
                      moistureResultsObr:
                        data.physicalAndChemicalTests[0].lossOnDryingResult ||
                        "",
                      moisture_rmk:
                        data.physicalAndChemicalTests[0].lossOnDryingRemarks ||
                        "",

                      final_remark:
                        data.physicalAndChemicalTests[0].remarks || "",
                    },
                  ]
                : prevState.physicalAndChemicalTests ?? [],

            // Microbiological Tests mapping (maintaining previous structure if no new data)
            microbiologicalTests:
              data.microbiologicalTests?.length > 0
                ? [
                    {
                      micro_id: data.microbiologicalTests[0].id,
                      shelfLifeId: data.microbiologicalTests[0].shelfLifeId,

                      sampled_on: data.microbiologicalTests[0].sampledOn,
                      tested_on:
                        data.microbiologicalTests[0].testIncubationStartOn,
                      total_viable_count:
                        data.microbiologicalTests[0].totalViableCount,
                      total_fungal_count:
                        data.microbiologicalTests[0].totalFungalCount,
                      gram: data.microbiologicalTests[0]
                        .gramNegativeBacteriaOrColiform,
                      escherechia_coli:
                        data.microbiologicalTests[0].escherichiaColi,
                      stapylococcus:
                        data.microbiologicalTests[0].staphylococcusAureus,
                      pseudonymous_aerogenosa:
                        data.microbiologicalTests[0].pseudomonasAeruginosa,
                      salmonella: data.microbiologicalTests[0].salmonella,
                      moisture: data.microbiologicalTests[0].moisturePercentage,
                      test_completion_date:
                        data.microbiologicalTests[0].testCompletionDate,
                      remark: data.microbiologicalTests[0].remark,
                    },
                  ]
                : prevState.microbiologicalTests ?? [],
          }));

          const username = response.data[0]?.chemist_sign;
          console.log("username", username);
          //getImage
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

          const username2 = response.data[0]?.microbiologist_sign;
          console.log("username", username2);
          //getImage

          axios
            .get(
              `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username2}`,
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

          const username3 = response.data[0]?.qc_sign;
          console.log("username", username3);
          //getImage

          axios
            .get(
              `${    API.prodUrl}/Precot/api/Format/Service/image?username=${username3}`,
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Ltno, year, date, token, role, navigate]);

  const handleBack = () => {
    navigate("/precot/QualityControl/F-025/Summary");
  };

  const isInputDisabled = () => {
    const roleauth = localStorage.getItem("role");
    return roleauth !== "ROLE_CHEMIST" || status.fieldStatus;
  };

  const isInputDisabled2 = () => {
    const roleauth = localStorage.getItem("role");
    return roleauth !== "ROLE_MICROBIOLOGIST" || status.fieldStatus;
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

  const items = [];

  if (
    role === "ROLE_CHEMIST" ||
    role === "QA_MANAGER" ||
    role === "QC_MANAGER"
  ) {
    items.push(
      {
        key: "1",
        label: <p>Pysical Properties Test 1</p>,
        children: (
          <div>
            <table
              style={{
                width: "100%",
                margin: "auto",
                tableLayout: "fixed",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    colSpan="47"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    PHYSICAL PROPERTIES TEST
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan="15"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    DESCRIPTION OF PRODUCTS & TESTS
                  </th>
                  <th
                    colSpan="32"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    TEST RESULTS
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan="15"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Customer
                  </td>
                  <td
                    colSpan="32"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    <Input
                      type="text"
                      name="customer"
                      value={formData.customer}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={(e) => {
                        //  // handleSelectText(e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="15"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Brand
                  </td>
                  <td
                    colSpan="32"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    <Input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={(e) => {
                        // handleSelectText(e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="15"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Product Description
                  </td>
                  <td
                    colSpan="32"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    <Input
                      type="text"
                      name="productDescription"
                      value={formData.productDescription}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={(e) => {
                        // handleSelectText(e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="15"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Pattern
                  </td>
                  <td
                    colSpan="32"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    <Input
                      type="text"
                      name="pattern"
                      value={formData.pattern}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={(e) => {
                        // handleSelectText(e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="15"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Lot Number
                  </td>
                  <td
                    colSpan="32"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    <Input
                      style={{ width: "100%" }}
                      name="lotNumber"
                      type="text"
                      value={Ltno}
                      onChange={(value) =>
                        handleNumberChange("lotNumber", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={(e) => {
                        // handleSelectText(e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="15"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Production Date
                  </td>
                  <td
                    colSpan="32"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    <Input
                      type="date"
                      name="productionDate"
                      value={formData.productionDate}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      max={getCurrentDate}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="15"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Testing Date
                  </td>
                  <td
                    colSpan="32"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    {date}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="15"
                    rowSpan="9"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    DIMENSION (mm)
                  </td>
                  <td colSpan="6" rowSpan="3" style={{ textAlign: "center" }}>
                    TRIALS
                  </td>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    Length
                  </td>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    Width
                  </td>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    Height/Diameter
                  </td>
                  <td
                    colSpan="12"
                    rowSpan={3}
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    STATUS
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">STD:</td>
                  <td colSpan="3">
                    <Input
                      type="text"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        border: "none",
                      }}
                      value={formData.dimensionStdLength}
                      disabled={isInputDisabled()}
                      name="dimensionStdLength"
                      onChange={handleChange}
                    />
                  </td>
                  <td colSpan="5">
                    <Input
                      type="text"
                      style={{
                        width: "100%",

                        textAlign: "center",
                        border: "none",
                      }}
                      value={formData.dimensionStdWidth}
                      disabled={isInputDisabled()}
                      name="dimensionStdWidth"
                      onChange={handleChange}
                    />
                  </td>
                  <td colSpan="4">
                    <Input
                      type="text"
                      style={{
                        width: "100%",

                        textAlign: "center",
                        border: "none",
                      }}
                      value={formData.dimensionStdHeight}
                      disabled={isInputDisabled()}
                      name="dimensionStdHeight"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="14"
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    ACTUAL
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    T1
                  </td>

                  <td
                    colSpan="5"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT1Length}
                      onChange={(value) =>
                        handleNumberChange("dimensionT1Length", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td
                    colSpan="5"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT1Width}
                      onChange={(value) =>
                        handleNumberChange("dimensionT1Width", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td
                    colSpan="4"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT1Height}
                      onChange={(value) =>
                        handleNumberChange("dimensionT1Height", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  {/* </td> */}
                  <td colSpan="12">
                    <Select
                      name="dimensionT1Status"
                      value={formData.dimensionT1Status}
                      onChange={(value) => {
                        handleChangeStatus("dimensionT1Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus(
                            "dimensionT1Status",
                            e.target.value
                          );
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    T2
                  </td>
                  <td
                    colSpan="5"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT2Length}
                      onChange={(value) =>
                        handleNumberChange("dimensionT2Length", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td
                    colSpan="5"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT2Width}
                      onChange={(value) =>
                        handleNumberChange("dimensionT2Width", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td
                    colSpan="4"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT2Height}
                      onChange={(value) =>
                        handleNumberChange("dimensionT2Height", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td colSpan="12">
                    <Select
                      name="dimensionT2Status"
                      value={formData.dimensionT2Status}
                      onChange={(value) => {
                        handleChangeStatus("dimensionT2Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus(
                            "dimensionT2Status",
                            e.target.value
                          );
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    T3
                  </td>
                  <td
                    colSpan="5"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT3Length}
                      onChange={(value) =>
                        handleNumberChange("dimensionT3Length", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td
                    colSpan="5"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT3Width}
                      onChange={(value) =>
                        handleNumberChange("dimensionT3Width", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td
                    colSpan="4"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT3Height}
                      onChange={(value) =>
                        handleNumberChange("dimensionT3Height", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td colSpan="12">
                    <Select
                      name="dimensionT3Status"
                      value={formData.dimensionT3Status}
                      onChange={(value) => {
                        handleChangeStatus("dimensionT3Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus(
                            "dimensionT3Status",
                            e.target.value
                          );
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    T4
                  </td>
                  <td
                    colSpan="5"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT4Length}
                      onChange={(value) =>
                        handleNumberChange("dimensionT4Length", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td
                    colSpan="5"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT4Width}
                      onChange={(value) =>
                        handleNumberChange("dimensionT4Width", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td
                    colSpan="4"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT4Height}
                      onChange={(value) =>
                        handleNumberChange("dimensionT4Height", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td colSpan="12">
                    <Select
                      value={formData.dimensionT4Status}
                      onChange={(value) => {
                        handleChangeStatus("dimensionT4Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus(
                            "dimensionT4Status",
                            e.target.value
                          );
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    T5
                  </td>
                  <td
                    colSpan="5"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT5Length}
                      onChange={(value) =>
                        handleNumberChange("dimensionT5Length", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td
                    colSpan="5"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT5Width}
                      onChange={(value) =>
                        handleNumberChange("dimensionT5Width", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td
                    colSpan="4"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      type="number"
                      min={0}
                      step={1}
                      value={formData.dimensionT5Height}
                      onChange={(value) =>
                        handleNumberChange("dimensionT5Height", value)
                      }
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td colSpan="12">
                    <Select
                      value={formData.dimensionT5Status}
                      onChange={(value) => {
                        handleChangeStatus("dimensionT5Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus(
                            "dimensionT5Status",
                            e.target.value
                          );
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Avg.
                  </td>
                  <td
                    colSpan="5"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      value={formData.dimensionAvgLength}
                      onChange={(value) =>
                        handleNumberChange("dimensionAvgLength", value)
                      }
                      readOnly
                    />
                  </td>
                  <td
                    colSpan="5"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      value={formData.dimensionAvgWidth}
                      onChange={(value) =>
                        handleNumberChange("dimensionAvgWidth", value)
                      }
                      readOnly
                    />
                  </td>
                  <td
                    colSpan="4"
                    style={{ padding: "0", verticalAlign: "middle" }}
                  >
                    <InputNumber
                      style={{ width: "100%", boxSizing: "border-box" }}
                      value={formData.dimensionAvgHeight}
                      onChange={(value) =>
                        handleNumberChange("dimensionAvgHeight", value)
                      }
                      readOnly
                    />
                  </td>
                  <td colSpan="12" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="dimensionAvgStatus"
                      value={formData.dimensionAvgStatus}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}
                    <Select
                      value={formData.dimensionAvgStatus}
                      onChange={(value) => {
                        handleChangeStatus("dimensionAvgStatus", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus(
                            "dimensionAvgStatus",
                            e.target.value
                          );
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                {/* Additional rows and test fields can be added here */}
              </tbody>
            </table>
          </div>
        ),
      },
      {
        key: "2",
        label: <p>Pysical Properties Test 2</p>,
        children: (
          <div>
            <table
              style={{ width: "107%", margin: "auto", tableLayout: "fixed" }}
            >
              <tbody>
                {/* WEIGHT Section */}
                <tr>
                  <td colSpan="15" rowSpan="8">
                    WEIGHT(g)
                  </td>
                  <td colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                    TRIALS
                  </td>
                  <td colSpan="20" style={{ textAlign: "center" }}>
                    STD :{" "}
                    <Input
                      type="text"
                      style={{ width: "100%" }}
                      name="weightStd"
                      disabled={isInputDisabled()}
                      value={formData.weightStd}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    ACTUAL
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    STATUS
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    T1
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      name="weightT1Actual"
                      value={formData.weightT1Actual}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                      min={0}
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="weightT1Status"
                      value={formData.weightT1Status}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}
                    <Select
                      value={formData.weightT1Status}
                      onChange={(value) => {
                        handleChangeStatus("weightT1Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus("weightT1Status", e.target.value);
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    T2
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      name="weightT2Actual"
                      value={formData.weightT2Actual}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                      min={0}
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="weightT2Status"
                      value={formData.weightT2Status}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}
                    <Select
                      value={formData.weightT2Status}
                      onChange={(value) => {
                        handleChangeStatus("weightT2Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus("weightT2Status", e.target.value);
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    T3
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      name="weightT3Actual"
                      value={formData.weightT3Actual}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                      min={0}
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="weightT3Status"
                      value={formData.weightT3Status}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}

                    <Select
                      value={formData.weightT3Status}
                      onChange={(value) => {
                        handleChangeStatus("weightT3Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus("weightT3Status", e.target.value);
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    T4
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      name="weightT4Actual"
                      value={formData.weightT4Actual}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                      min={0}
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="weightT4Status"
                      value={formData.weightT4Status}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}

                    <Select
                      value={formData.weightT4Status}
                      onChange={(value) => {
                        handleChangeStatus("weightT4Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus("weightT4Status", e.target.value);
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    T5
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      name="weightT5Actual"
                      value={formData.weightT5Actual}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                      min={0}
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="weightT5Status"
                      value={formData.weightT5Status}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}
                    <Select
                      value={formData.weightT5Status}
                      onChange={(value) => {
                        handleChangeStatus("weightT5Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus("weightT5Status", e.target.value);
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    Avg.
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      name="weightAvgActual"
                      value={formData.weightAvgActual}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="weightAvgStatus"
                      value={formData.weightAvgStatus}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}
                    <Select
                      value={formData.weightAvgStatus}
                      onChange={(value) => {
                        handleChangeStatus("weightAvgStatus", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus("weightAvgStatus", e.target.value);
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>

                {/* THICKNESS Section */}
                <tr>
                  <td colSpan="15" rowSpan="8">
                    THICKNESS(mm)
                  </td>
                  <td colSpan="10" rowSpan="2" style={{ textAlign: "center" }}>
                    TRIALS
                  </td>
                  <td colSpan="20" style={{ textAlign: "center" }}>
                    STD :{" "}
                    <Input
                      type="text"
                      style={{ width: "100%" }}
                      disabled={isInputDisabled()}
                      name="thicknessStd"
                      onChange={handleChange}
                      value={formData.thicknessStd}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    ACTUAL
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    STATUS
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    T1
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      name="thicknessT1Actual"
                      value={formData.thicknessT1Actual}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                      min={0}
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="thicknessT1Status"
                      value={formData.thicknessT1Status}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}
                    <Select
                      value={formData.thicknessT1Status}
                      onChange={(value) => {
                        handleChangeStatus("thicknessT1Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus(
                            "thicknessT1Status",
                            e.target.value
                          );
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    T2
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      name="thicknessT2Actual"
                      value={formData.thicknessT2Actual}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                      min={0}
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="thicknessT2Status"
                      value={formData.thicknessT2Status}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}

                    <Select
                      value={formData.thicknessT2Status}
                      onChange={(value) => {
                        handleChangeStatus("thicknessT2Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus(
                            "thicknessT2Status",
                            e.target.value
                          );
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    T3
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      name="thicknessT3Actual"
                      value={formData.thicknessT3Actual}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                      min={0}
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="thicknessT3Status"
                      value={formData.thicknessT3Status}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}

                    <Select
                      value={formData.thicknessT3Status}
                      onChange={(value) => {
                        handleChangeStatus("thicknessT3Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus(
                            "thicknessT3Status",
                            e.target.value
                          );
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    T4
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      name="thicknessT4Actual"
                      value={formData.thicknessT4Actual}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                      min={0}
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="thicknessT4Status"
                      value={formData.thicknessT4Status}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}

                    <Select
                      value={formData.thicknessT4Status}
                      onChange={(value) => {
                        handleChangeStatus("thicknessT4Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus(
                            "thicknessT4Status",
                            e.target.value
                          );
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    T5
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      name="thicknessT5Actual"
                      value={formData.thicknessT5Actual}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                      min={0}
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="thicknessT5Status"
                      value={formData.thicknessT5Status}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}

                    <Select
                      value={formData.thicknessT5Status}
                      onChange={(value) => {
                        handleChangeStatus("thicknessT5Status", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus(
                            "thicknessT5Status",
                            e.target.value
                          );
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    Avg.
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    <Input
                      type="number"
                      name="thicknessAvgActual"
                      value={formData.thicknessAvgActual}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                      onKeyDown={handleE}
                    />
                  </td>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    {/* <Input
                      type="text"
                      name="thicknessAvgStatus"
                      value={formData.thicknessAvgStatus}
                      onChange={handleChange}
                      disabled={isInputDisabled()}
                    /> */}

                    <Select
                      value={formData.thicknessAvgStatus}
                      onChange={(value) => {
                        handleChangeStatus("thicknessAvgStatus", value);
                      }}
                      style={{ textAlign: "center", width: "100%" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeStatus(
                            "thicknessAvgStatus",
                            e.target.value
                          );
                        }
                      }}
                      filterOption={false}
                      showSearch
                      disabled={isInputDisabled()}
                    >
                      <Select.Option value="Pass">Pass</Select.Option>
                      <Select.Option value="Fail">Fail</Select.Option>
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        key: "3",
        label: <p>PHYSICAL AND CHEMCAL TEST I</p>,
        children: (
          <>
            <Input
              type="date"
              addonBefore="Sampling Date"
              value={formData.physicalAndChemicalTests[0]?.samplingDate}
              style={{
                textAlign: "center",
                width: "230px",
                marginRight: "50px",
                marginBottom: "20px",
              }}
              onChange={(e) => {
                handleArrayInput(e.target.value, "samplingDate");
              }}
              readOnly={status.fieldStatus}
              onBlur={handleBlur}
            />

            <Input
              addonBefore="Tested Date"
              type="date"
              value={formData.physicalAndChemicalTests[0]?.testedDate}
              style={{
                textAlign: "center",
                width: "230px",
                marginBottom: "20px",
              }}
              onChange={(e) => {
                handleArrayInput(e.target.value, "testedDate");
              }}
              readOnly={status.fieldStatus}
              onBlur={handleBlur}
            />

            <table>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                <td style={{ textAlign: "center" }}>Parameter Tested</td>
                <td style={{ textAlign: "center" }}>Specification</td>
                <td style={{ textAlign: "center" }}>observation</td>
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
                    value={formData.physicalAndChemicalTests[0]?.observation}
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
                    value={formData.physicalAndChemicalTests[0]?.remarks}
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
                  <br />, in the form of flattened tube with thick <br /> round
                  walls and often twisted.
                </td>
                <td>
                  <Input
                    type="text"
                    value={
                      formData.physicalAndChemicalTests[0]?.identification_obs
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]?.identification_rmk
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]
                        ?.fibre_average_length_obs
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]
                        ?.fibre_average_length_rmk
                    }
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
                    value={formData.physicalAndChemicalTests[0]?.acidity_ph_obs}
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
                    value={formData.physicalAndChemicalTests[0]?.acidity_ph_rmk}
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
                    value={
                      formData.physicalAndChemicalTests[0]
                        ?.surface_activ_sub_obs
                    }
                    style={{ textAlign: "center", width: "100%" }}
                    onChange={(e) => {
                      handleArrayInput(e.target.value, "surface_activ_sub_obs");
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
                    value={
                      formData.physicalAndChemicalTests[0]
                        ?.surface_activ_sub_rmk
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]?.foreign_fibers_obs
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]?.foreign_fibers_rmk
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]?.fluorescence_obs
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]?.fluorescence_rmk
                    }
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
                    value={formData.physicalAndChemicalTests[0]?.neps_obs}
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
                    value={formData.physicalAndChemicalTests[0]?.neps_rmk}
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
          </>
        ),
      },
      {
        key: "4",
        label: <p>PHYSICAL AND CHEMCAL TEST II</p>,
        children: (
          <>
            <table>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                <td style={{ textAlign: "center" }}>Parameter Tested</td>
                <td style={{ textAlign: "center" }}>Specification</td>
                <td style={{ textAlign: "center" }}>observation</td>
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
                    value={formData.physicalAndChemicalTests[0]?.neps_count_obs}
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
                    value={formData.physicalAndChemicalTests[0]?.neps_count_rmk}
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
                    value={formData.physicalAndChemicalTests[0]?.uql_w_obs}
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
                    value={formData.physicalAndChemicalTests[0]?.uql_w_rmk}
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
                    value={formData.physicalAndChemicalTests[0]?.ln_obs}
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
                    value={formData.physicalAndChemicalTests[0]?.ln_rmk}
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
                    value={formData.physicalAndChemicalTests[0]?.lw_obs}
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
                    value={formData.physicalAndChemicalTests[0]?.lw_rmk}
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
                    value={formData.physicalAndChemicalTests[0]?.sfc_n_obs}
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
                    value={formData.physicalAndChemicalTests[0]?.sfc_n_rmk}
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
                    value={formData.physicalAndChemicalTests[0]?.sfc_w_obs}
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
                    value={formData.physicalAndChemicalTests[0]?.sfc_w_rmk}
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
                    value={formData.physicalAndChemicalTests[0]?.micronaire_obs}
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
                    value={formData.physicalAndChemicalTests[0]?.micronaire_rmk}
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
                    value={formData.physicalAndChemicalTests[0]?.whiteness_obs}
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
                    value={formData.physicalAndChemicalTests[0]?.whiteness_rmk}
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
                    value={
                      formData.physicalAndChemicalTests[0]?.extractable_obs
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]?.extractable_rmk
                    }
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
          </>
        ),
      },
      {
        key: "5",
        label: <p>PHYSICAL AND CHEMCAL TEST III</p>,
        children: (
          <>
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
                  observation
                </td>
                <td rowSpan={2} style={{ textAlign: "center", width: "20%" }}>
                  Remark
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center", padding: "5px" }} rowSpan={3}>
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
                    value={formData.physicalAndChemicalTests[0]?.abs_1}
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
                    value={formData.physicalAndChemicalTests[0]?.abs_2}
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
                    value={formData.physicalAndChemicalTests[0]?.abs_3}
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
                    value={formData.physicalAndChemicalTests[0]?.abs_avg}
                    style={{ textAlign: "center", width: "100%" }}
                    readOnly
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    value={formData.physicalAndChemicalTests[0]?.abs_rmk}
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
                    value={formData.physicalAndChemicalTests[0]?.abs_4}
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
                    value={formData.physicalAndChemicalTests[0]?.abs_5}
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
                    value={formData.physicalAndChemicalTests[0]?.abs_6}
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
                    value={formData.physicalAndChemicalTests[0]?.abs_avg_2}
                    style={{ textAlign: "center", width: "100%" }}
                    readOnly
                    onBlur={handleBlur}
                  ></Input>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Select
                    value={formData.physicalAndChemicalTests[0]?.abs2_rmk}
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
                  Sulphated Ash (%) <br /> RESULT = [(B-A) x100]/ 5 A= Crucible
                  Wt.(g)
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
                    value={
                      formData.physicalAndChemicalTests[0]?.sulphatedFlWtObr
                    }
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
                <td rowSpan={4} style={{ textAlign: "center", width: "110px" }}>
                  <Select
                    value={formData.physicalAndChemicalTests[0]?.sulphate_rmk}
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
                    value={
                      formData.physicalAndChemicalTests[0]?.sulphatedIlWtObr
                    }
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
                    value={formData.physicalAndChemicalTests[0]?.sulphatedBaObr}
                    style={{ textAlign: "center", width: "100%" }}
                    readOnly
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>RESULTS(%) </td>
                <td style={{ textAlign: "center" }}>
                  {/* <Input
                             value={formData.physicalAndChemicalTests[0]?.sulphatedResObr}
                             style={{ textAlign: "center", width: "100%" }}
                             readOnly
                           ></Input> */}

                  <div>
                    {/* {formData.physicalAndChemicalTests[0] &&
                               tabNo === "3" &&
                               formData.physicalAndChemicalTests[0]?.sulphatedResObr &&
                               (() => {
                                 const value = formData.physicalAndChemicalTests[0]?.sulphatedResObr;
                                 if (value > 0.4) {
                                   message.info(
                                     "Sulphated Obr Result value more than 0.40"
                                   );
                                 }
                                 return value; // Display the value or handle it as needed
                               })()} */}
                    {formData.physicalAndChemicalTests[0]?.sulphatedResObr}
                  </div>
                </td>
              </tr>
            </table>
          </>
        ),
      },
      {
        key: "6",
        label: <p>PHYSICAL AND CHEMCAL TEST IV</p>,
        children: (
          <>
            <table>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                <td style={{ textAlign: "center" }}>Parameter Tested</td>
                <td style={{ textAlign: "center" }}>Specification</td>
                <td style={{ textAlign: "center" }} colSpan={2}>
                  observation
                </td>
                <td style={{ textAlign: "center", width: "120px" }}>Remarks</td>
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
                    value={
                      formData.physicalAndChemicalTests[0]?.watersolubleFlWtObr
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]?.water_soluble_rmk
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]?.watersolubleIlWtObr
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]?.watersolubleNmObr
                    }
                    style={{ textAlign: "center", width: "100%" }}
                    readOnly
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>RESULTS(%) </td>
                <td style={{ textAlign: "center" }}>
                  {/* <Input
                              value={formData.physicalAndChemicalTests[0]?.watersolubleResObr}
                              style={{ textAlign: "center", width: "100%" }}
                              readOnly
                            ></Input> */}

                  <div>
                    {/* {formData.physicalAndChemicalTests[0]?.watersolubleResObr &&
                                tabNo == "4" &&
                                formData.physicalAndChemicalTests[0]?.watersolubleResObr &&
                                (() => {
                                  const value = formData.physicalAndChemicalTests[0]?.watersolubleResObr;
                                  if (value > 0.5) {
                                    message.info(
                                      "Watersoluble Obr Result value more than 0.50"
                                    );
                                  }
                                  return value; // Display the value or handle it as needed
                                })()} */}
                    {formData.physicalAndChemicalTests[0]?.watersolubleResObr}
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
                    value={
                      formData.physicalAndChemicalTests[0]?.ethersolubleFlWtObr
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]?.ether_soluble_rmk
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]?.ethersolubleIlWtObr
                    }
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
                    value={
                      formData.physicalAndChemicalTests[0]?.ethersolubleYxObr
                    }
                    style={{ textAlign: "center", width: "100%" }}
                    readOnly
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>RESULTS(%)</td>
                <td style={{ textAlign: "center" }}>
                  {/* <Input
                              value={formData.physicalAndChemicalTests[0]?.ethersolubleResObr}
                              style={{ textAlign: "center", width: "100%" }}
                              readOnly
                              
                            ></Input> */}

                  <div>
                    {/* {formData.physicalAndChemicalTests[0] &&
                                tabNo == "4" &&
                                formData.physicalAndChemicalTests[0]?.ethersolubleResObr &&
                                (() => {
                                  const value = formData.physicalAndChemicalTests[0]?.ethersolubleResObr;
                                  if (value > 0.7) {
                                    message.info(
                                      "Ethersoluble Obr Result value more than 0.70"
                                    );
                                  }
                                  return value; // Display the value or handle it as needed
                                })()} */}
                    {formData.physicalAndChemicalTests[0]?.ethersolubleResObr}
                  </div>
                </td>
              </tr>
            </table>
          </>
        ),
      },
      {
        key: "7",
        label: <p>PHYSICAL AND CHEMCAL TEST V</p>,
        children: (
          <>
            <table>
              <tr>
                <td style={{ textAlign: "center", padding: "10px" }}>S.No</td>
                <td style={{ textAlign: "center" }}>Parameter Tested</td>
                <td style={{ textAlign: "center" }}>Specification</td>
                <td style={{ textAlign: "center" }} colSpan={2}>
                  observation
                </td>
                <td style={{ textAlign: "center", width: "140px" }}>Remarks</td>
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
                  /Moisture content (%) RESULT =[(K-L) x100]/K, K= Cotton Wt.(g)
                  before dry.
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
                    value={
                      formData.physicalAndChemicalTests[0]?.moistureIlWtObr
                    }
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
                    value={formData.physicalAndChemicalTests[0]?.moisture_rmk}
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
                    value={
                      formData.physicalAndChemicalTests[0]?.moistureFlWtObr
                    }
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
                    value={formData.physicalAndChemicalTests[0]?.moistureKlObr}
                    style={{ textAlign: "center", width: "100%" }}
                    readOnly
                  ></Input>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>RESULTS(%) </td>
                <td style={{ textAlign: "center" }}>
                  {/* <Input
                              value={formData.physicalAndChemicalTests[0]?.moistureResultsObr}
                              style={{ textAlign: "center", width: "100%" }}
                              readOnly
                              
                            ></Input> */}

                  <div>
                    {/* {formData.physicalAndChemicalTests[0] &&
                                tabNo == "5" &&
                                formData.physicalAndChemicalTests[0]?.moistureResultsObr &&
                                (() => {
                                  const value = formData.physicalAndChemicalTests[0]?.moistureResultsObr;
                                  if (value > 8.0) {
                                    message.info(
                                      "Moisture Obr Result value more than 8.0"
                                    );
                                  }
                                  return value; // Display the value or handle it as needed
                                })()} */}
                    {formData.physicalAndChemicalTests[0]?.moistureResultsObr}
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px" }} colSpan={6}>
                  Remark(s):{" "}
                  <Input
                    type="text"
                    value={formData.physicalAndChemicalTests[0]?.final_remark}
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
            </table>
          </>
        ),
      }
    );
  }

  if (
    role == "ROLE_MICROBIOLOGIST" ||
    role === "QA_MANAGER" ||
    role === "QC_MANAGER"
  ) {
    items.push({
      key: "8",
      label: <p>Micro Test I</p>,
      children: (
        <>
          <table>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }} colSpan={9}>
                Test Parameters & Specification{" "}
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} rowSpan={3}>
                Moisture (%){" "}
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} rowSpan={3}>
                Test Completion Date{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }} rowSpan={2}>
                Sampled on
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} rowSpan={2}>
                Tested /Incubation Start on
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} rowSpan={2}>
                Total Viable Count (TVC - cfu/g) (Limit ≤1000){" "}
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} rowSpan={2}>
                Total Fungal Count (TFC - cfu/g)(Limit ≤ 100)
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} colSpan={5}>
                Pathogens{" "}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }} colSpan={1}>
                Gram negative bacteria or Coliform (Should be Absent){" "}
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} colSpan={1}>
                {" "}
                Escherechia coli (E.coli)(Should be Absent)
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} colSpan={1}>
                Staphylococcos aures (S.aur )(Should be Absent)
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} colSpan={1}>
                Pseudomonas aerogenosa (P.aer) (Should be Absent)
              </td>
              <td style={{ textAlign: "center", padding: "10px" }} colSpan={1}>
                Salmonella (Sal.)(Should be Absent)
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "5px" }}>
                <Input
                  type="date"
                  value={formData.microbiologicalTests[0].sampled_on}
                  style={{ textAlign: "center", width: "100%" }}
                  onChange={(e) => {
                    handleMicroInput(e.target.value, "sampled_on");
                  }}
                  readOnly={status.fieldStatus}
                  onKeyDown={handleKeyDownNA}
                  onBlur={handleBlurMicro}
                ></Input>
              </td>

              <td style={{ textAlign: "center", padding: "5px" }}>
                <Input
                  type="date"
                  value={formData.microbiologicalTests[0].tested_on}
                  style={{ textAlign: "center", width: "100%" }}
                  onChange={(e) => {
                    handleMicroInput(e.target.value, "tested_on");
                  }}
                  readOnly={status.fieldStatus}
                  onKeyDown={handleKeyDownNA}
                  onBlur={handleBlurMicro}
                ></Input>
              </td>
              <td style={{ textAlign: "center", padding: "5px" }}>
                <Input
                  type="text"
                  value={formData.microbiologicalTests[0].total_viable_count}
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
                  value={formData.microbiologicalTests[0].total_fungal_count}
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
                  value={formData.microbiologicalTests[0].gram}
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
                  value={formData.microbiologicalTests[0].escherechia_coli}
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
                  value={formData.microbiologicalTests[0].stapylococcus}
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
                    formData.microbiologicalTests[0].pseudonymous_aerogenosa
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
                  value={formData.microbiologicalTests[0].salmonella}
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
                  value={formData.microbiologicalTests[0].moisture}
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
                  value={formData.microbiologicalTests[0].test_completion_date}
                  style={{ textAlign: "center", width: "100%" }}
                  onChange={(e) => {
                    handleMicroInput(e.target.value, "test_completion_date");
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
              <td colSpan={4} style={{ textAlign: "center", padding: "5px" }}>
                Remark:{" "}
                <Input
                  type="text"
                  value={formData.microbiologicalTests[0].remark}
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
            {/* <tr>
              <td style={{ textAlign: "center", padding: "5px" }} colSpan={4}>
                {" "}
                Product:{" "}
                <Select
                  value={formData.microbiologicalTests[0].product}
                  options={product3Lov}
                  onChange={(e) => {
                    handleMicroInput(e, "product");
                  }}
                  dropdownStyle={{ textAlign: "center" }}
                  disabled={status.fieldStatus}
                  style={{ textAlign: "center", width: "70%" }}
                ></Select>
              </td>
            </tr> */}
          </table>
        </>
      ),
    });
  }

  items.push({
    key: "9",
    label: <p>Review </p>,
    children: (
      <div>
        <table
          className="f18table"
          style={{ width: "90%", margin: "auto", tableLayout: "fixed" }}
        >
          <tr>
            <td colSpan="12" style={{ textAlign: "center" }}>
              Tested By (Chemist):
            </td>
            <td colSpan="12" style={{ textAlign: "center" }}>
              Tested By (Micro):
            </td>
            <td colSpan="12" style={{ textAlign: "center" }}>
              Approved By:
            </td>
          </tr>

          <tr>
            {/* Chemist Signature */}
            <td
              colSpan="12"
              style={{
                display: "table-cell",
                height: "80px",
                textAlign: "center",
                verticalAlign: "bottom",
              }}
            >
              {selectedRow?.chemist_status === "CHEMIST_APPROVED" && (
                <>
                  {getImage1 && (
                    <img
                      className="signature"
                      src={getImage1}
                      alt="Chemist Sign"
                    />
                  )}
                  <br />
                  {selectedRow.chemist_sign}
                  <br />
                  {formattedChemistDate}
                </>
              )}
            </td>

            {/* Microbiologist Signature */}
            <td
              colSpan="12"
              style={{
                display: "table-cell",
                height: "80px",
                textAlign: "center",
                verticalAlign: "bottom",
              }}
            >
              {selectedRow?.microbiologist_status ===
                "MICROBIOLOGIST_APPROVED" && (
                <>
                  {getImage2 && (
                    <img
                      className="signature"
                      src={getImage2}
                      alt="Microbiologist Sign"
                    />
                  )}
                  <br />
                  {selectedRow.microbiologist_submit_by}
                  <br />
                  {formattedMicroDate}
                </>
              )}
            </td>

            {/* Manager Signature */}
            <td
              colSpan="12"
              style={{
                fontSize: "12pt",
                textAlign: "center",
                height: "70px",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              {(selectedRow?.qc_status === "QC_REJECTED" ||
                selectedRow?.qc_status === "QC_APPROVED" ||
                selectedRow?.qc_status === "QA_REJECTED" ||
                selectedRow?.qc === "QA_APPROVED") && (
                <>
                  {getImage3 && (
                    <img
                      className="signature"
                      src={getImage3}
                      alt="Manager Sign"
                    />
                  )}
                  <br />
                  {selectedRow.qc_submit_by}
                  <br />
                  {formattedQCDate}
                </>
              )}
            </td>
          </tr>
        </table>
      </div>
    ),
  });

  return (
    <div>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />

      <BleachingHeader
        unit="Unit-H"
        formName="SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA"
        formatNo="PH-QCL01/F-025"
        sopNo="PH-QCL01-D-05"
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
            onClick={
              role == "ROLE_CHEMIST" || role == "ROLE_MICROBIOLOGIST"
                ? handleSave
                : handleApprove
            }
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
          addonBefore="Testing Date:"
          placeholder="Date"
          value={date}
          disabled
          style={{ width: "20%", height: "35px" }}
          max={getCurrentDate}
        />
        <Input
          addonBefore="Lot.NO"
          placeholder="LotNo"
          value={Ltno}
          disabled
          style={{ width: "20%", height: "35px" }}
        />
        <Input
          addonBefore="Year:"
          placeholder="Year"
          value={year}
          disabled
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
        onChange={(e) => {
          setTabNo(e);
        }}
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

export default QualityControl_f25;