import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
  TimePicker,
  Tooltip,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
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
import BleachingHeader from "../Components/BleachingHeader";
import PrecotSidebar from "../Components/PrecotSidebar.js";
import DynamicTableForm from "./DynamicTableForm";
import QA_f034_crtical_inspection from "./QA_f034_crtical_inspection";
import QA_f034_major_inspection from "./QA_f034_major_inspection";
import QA_f034_minor_inspection from "./QA_f034_minor_inspection";

const QA_f034_Inprocess_Inspection_Report = () => {
  const { TabPane } = Tabs;
  const [open, setOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [details, setDetails] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lotStatus, setLotStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [shift, setShift] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(null);
  const [fgNo, setFgNo] = useState("");
  const [aqlSampleSize, setAqlSampleSize] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [BMR, setBMR] = useState([]);
  const [selectedBMr, setSelectedBMR] = useState("");
  const [pOrder, setPOrder] = useState([]);
  const [selectedpOrder, setSelectedpOrder] = useState("");
  const [poNo, setPoNo] = useState("");
  const [material, setMaterial] = useState([]);
  const [selectedMaterial, setSelectedMat] = useState("");
  const [isEditResponse, setisEditResponse] = useState(false);
  const editShown = useRef(false);
  const alertShown = useRef(false);
  const [selectedPoNo, setSelectedPoNo] = useState("");
  const [customers, setCustomers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState();
  const [response, setResponse] = useState("");
  const [getImage1, setGetImage1] = useState("");
  const [getImage2, setGetImage2] = useState("");
  const [getImage3, setGetImage3] = useState("");
  const token = localStorage.getItem("token");
  const {
    editDepartment,
    editDate,
    editShift,
    editMachineNo,
    editPOrder,
    editBmrNo,
  } = location.state || {};
  const [budsInspectionData, setBudsInspectionData] = useState({
    "Surface Pattern": {
      specification: "",
      observation: "",
    },
    "Average GSM / Weight": {
      specification: "",
      observation: "",
    },
    "Product Size /  / Dia. of Rolls": {
      specification: "",
      observation: "",
    },
    "No. of Folds(Pleat)": {
      specification: "",
      observation: "",
    },
    "Artwork printing on bags / Label": {
      specification: "",
      observation: "",
    },
    "No. of Bags per carton": {
      specification: "",
      observation: "",
    },
    "Filled Box Gross weight": {
      specification: "",
      observation: "",
    },
    "Moisture %": {
      specification: "≤7",
      observation: "",
    },
  });
  const budsInspectionDataRef = useRef({});
  const [tableData, setTableData] = useState([]);
  const [inspectionId, setInspectionId] = useState("");
  const today = new Date().toISOString().split("T")[0];

  // State to manage radio selections

  const inspectionLabels = [
    "Wrong / Missing FG No.",
    "Insect Contamination",
    "Metal Contamination",
    "Less Count / Weight per bag",
  ];
  const [crticalInspectionData, setCrticalInspectionData] = useState(
    inspectionLabels.reduce((acc, label) => {
      acc[label] = Array(4).fill("N/A"); // Set 'N/A' for all 4 options of each label
      return acc;
    }, {})
  );

  const inspectionMajorLabels = [
    "Cut Pads",
    "Improper / Open / Damaged Sealing",
    "Dirt / Dust Contamination",
    "Plastic Contamination",
    "Hair Contamination",
    "Lower/Higher Filling Height / Less Dia.",
    "Improper Pad Alignment",
  ];
  const [majorInspectionData, setMajorInspectionData] = useState(
    inspectionMajorLabels.reduce((acc, label) => {
      acc[label] = Array(4).fill("N/A"); // Set 'N/A' for all 4 options of each label
      return acc;
    }, {})
  );

  const inspectionBudsLabels = [
    "Surface Pattern",
    "Average GSM / Weight",
    "Product Size /  / Dia. of Rolls",
    "No. of Folds(Pleat)",
    "Artwork printing on bags / Label",
    "No. of Bags per carton",
    "Filled Box Gross weight",
    "Moisture %",
  ];

  const inspectionMinorLabels = [
    "Black Contamination",
    "Colour Contamination",
    "Edge Condition (Open/Closed/Stitched)",
    "Folded Pads / No. of folds for pleat",
    "Improper or Illegible printing of FG No.",
    "Result",
  ];

  const [minorInspectionData, setMinorInspectionData] = useState(
    inspectionMinorLabels.reduce((acc, label) => {
      acc[label] = Array(4).fill("N/A"); // Set 'N/A' for all 4 options of each label
      return acc;
    }, {})
  );

  const [statusLOVData, setStatusLOVData] = useState(
    inspectionMinorLabels.reduce((acc, label) => {
      acc[label] = Array(4).fill(null); // Initialize with null for all 4 LOVs per label
      return acc;
    }, {})
  );

  const roleauth = localStorage.getItem("role");
  const departmentChange = (value) => setSelectedDepartment(value);
  const machineChange = (value) => setSelectedMachine(value);
  const materialChange = (value) => {
    fetchCustomer(value);
    setSelectedMat(value);
  };

  const bmrChange = (value) => {
    fetchPdeValues(value);
    setSelectedpOrder(null);
    setSelectedMat(null);
    setSelectedBMR(value);
  };

  const pOrderChange = (value) => {
    setSelectedMat(null);
    setSelectedpOrder(value);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    // Check if the selected date is in the future
    if (new Date(selectedDate) > new Date(today)) {
      // Set date to today if the selected date is in the future
      setDate(today);
    } else {
      setDate(selectedDate);
    }
  };

  const transformStatusData = (data) => {
    // Access the "Result" column directly
    const resultArray = data["Result"];

    // Create an array to hold the transformed objects for "Result"
    const result = [];

    // Iterate over each item in the "Result" array
    resultArray.forEach((value) => {
      result.push({ Result: value });
    });

    return result;
  };

  const transformData = (data) => {
    // Create an array to hold the transformed objects
    const result = [];

    // Assuming columns 2 to 5 represent time, lotSize, and sampleSize for four different rows
    for (let i = 2; i <= 5; i++) {
      const obj = {
        time: data[0][`column${i}`], // Extract time from the first row
        lotSize: data[1][`column${i}`], // Extract lotSize from the second row
        sampleSize: data[2][`column${i}`], // Extract sampleSize from the third row
      };
      result.push(obj);
    }

    return result;
  };

  const transformCriticalData = (data) => {
    // Ensure each key in `data` has arrays filled to a length of 4
    for (const key in data) {
      data[key] = fillArrayWithNA(data[key]);
    }

    // Determine the number of columns (assuming all arrays now have the same length)
    const numColumns = Object.values(data)[0].length;

    // Create an array to hold the transformed objects
    const result = [];

    // Iterate over the number of columns
    for (let i = 0; i < numColumns; i++) {
      // For each column, create an object with the respective key-value pairs
      const obj = {};

      // Iterate over the keys in the original data
      for (const key in data) {
        obj[key] = data[key][i]; // Assign the value from the current column (i-th index)
      }

      // Add the object to the result array
      result.push(obj);
    }

    return result;
  };

  const fillArrayWithNA = (array) => {
    return array.length === 0 ? Array(4).fill("N/A") : array;
  };

  const mapMajorKeys = (data) => {
    return data.map((item) => ({
      cutPads34: item["Cut Pads"],
      improperOpenDamagedSealing34: item["Improper / Open / Damaged Sealing"],
      dirtDustContamination34: item["Dirt / Dust Contamination"],
      plasticContamination34: item["Plastic Contamination"],
      hairContamination34: item["Hair Contamination"],
      lowerHigherFillingHeightLessData34:
        item["Lower/Higher Filling Height / Less Dia."],
      improperPadAllignment34: item["Improper Pad Alignment"],
    }));
  };

  const mapMinorKeys = (data) => {
    return data.map((item) => ({
      blackContamintion: item["Black Contamination"] || "N/A", // Default value "No" if undefined
      coloutContamination34: item["Colour Contamination"] || "N/A",
      edgeCondition34: item["Edge Condition (Open/Closed/Stitched)"] || "N/A", // Assuming default "Good"
      folderPads34: item["Folded Pads / No. of folds for pleat"] || "N/A",
      improperOrIllegiblePrintingOfFgNo34:
        item["Improper or Illegible printing of FG No."] || "N/A",
      // result34: item['Result'] || "No" // Assuming default "No"
    }));
  };

  const mapKeys = (data) => {
    return data.map((item) => ({
      wrongBoxFixed34: item["Wrong / Missing FG No."], // Map "Wrong / Missing FG No."
      insectContamination34: item["Insect Contamination"], // Map "Insect Contamination"
      metalContamination34: item["Metal Contamination"], // Map "Metal Contamination"
      lessCountWeightPerBag34: item["Less Count / Weight per bag"], // Map "Less Count / Weight per bag"
    }));
  };

  const mapStatusKeys = (data) => {
    return data.map((item) => ({
      result: item["Result"], // Map "Less Count / Weight per bag"
    }));
  };

  const handleSubmit = () => {
    setSubmitLoading(true);

    if (Object.keys(budsInspectionDataRef.current).length !== 0) {
      setBudsInspectionData(budsInspectionDataRef.current);
    }

    const transformedData = transformData(tableData);

    //crtical

    const transformedCrticalData = transformCriticalData(crticalInspectionData);
    const mappedData = mapKeys(transformedCrticalData);

    const transformedMajorData = transformCriticalData(majorInspectionData);
    const mappedMajorData = mapMajorKeys(transformedMajorData);

    const transformedMinorData = transformCriticalData(minorInspectionData);
    const mappedMinorData = mapMinorKeys(transformedMinorData);

    const transformedStatusData = transformStatusData(statusLOVData);

    const mappedStatusData = mapStatusKeys(transformedStatusData);

    let saveDetails = [];

    // Assuming all transformed arrays have the same length
    const length = Math.max(
      transformedData.length,
      transformedCrticalData.length,
      transformedMajorData.length,
      transformedMinorData.length,
      transformedStatusData.length
    );

    for (let i = 0; i < length; i++) {
      // Create a base object with properties from transformedData
      const detail = {
        line_id: details[i]?.line_id || "",
        time: transformedData[i]?.time || "N/A",
        lotSize: transformedData[i]?.lotSize || "N/A",
        sampleSize: transformedData[i]?.sampleSize || "N/A",
        wrongBoxFixed34: mappedData[i]?.wrongBoxFixed34 || "N/A",
        insectContamination34: mappedData[i]?.insectContamination34 || "N/A",
        metalContamination34: mappedData[i]?.metalContamination34 || "N/A",
        lessCountWeightPerBag34:
          mappedData[i]?.lessCountWeightPerBag34 || "N/A",
        cutPads34: mappedMajorData[i]?.cutPads34 || "N/A",
        improperOpenDamagedSealing34:
          mappedMajorData[i]?.improperOpenDamagedSealing34 || "N/A",
        dirtDustContamination34:
          mappedMajorData[i]?.dirtDustContamination34 || "N/A",
        plasticContamination34:
          mappedMajorData[i]?.plasticContamination34 || "N/A",
        hairContamination34: mappedMajorData[i]?.hairContamination34 || "N/A",
        lowerHigherFillingHeightLessData34:
          mappedMajorData[i]?.lowerHigherFillingHeightLessData34 || "N/A",
        improperPadAllignment34:
          mappedMajorData[i]?.improperPadAllignment34 || "N/A",
        blackContamintion: mappedMinorData[i]?.blackContamintion || "N/A",
        coloutContamination34:
          mappedMinorData[i]?.coloutContamination34 || "N/A",
        edgeCondition34: mappedMinorData[i]?.edgeCondition34 || "N/A",
        folderPads34: mappedMinorData[i]?.folderPads34 || "N/A",
        improperOrIllegiblePrintingOfFgNo34:
          mappedMinorData[i]?.improperOrIllegiblePrintingOfFgNo34 || "N/A",
        result: mappedStatusData[i]?.result || "N/A",
      };

      // Add the constructed object to the details array
      saveDetails.push(detail);
    }

    if (!selectedBMr) {
      setSubmitLoading(false);
      message.error("BMR No is required.");
      return; // Exit the function if validation fails
    }

    if (!selectedpOrder) {
      setSubmitLoading(false);
      message.error("POrder is required.");
      return; // Exit the function if validation fails
    }

    if (!date) {
      setSubmitLoading(false);
      message.error("Date is required.");
      return; // Exit the function if validation fails
    }

    if (!shift) {
      setSubmitLoading(false);
      message.error("Shift is required.");
      return; // Exit the function if validation fails
    }

    if (!poNo) {
      setSubmitLoading(false);
      message.error("PO.No. is required.");
      return; // Exit the function if validation fails
    }

    if (!selectedMachine) {
      setSubmitLoading(false);
      message.error("Machine Name is required.");
      return; // Exit the function if validation fails
    }

    if (!fgNo) {
      setSubmitLoading(false);
      message.error("FG.No. is required.");
      return; // Exit the function if validation fails
    }

    if (!lotNo) {
      setSubmitLoading(false);
      message.error("Lot.No. is required.");
      return; // Exit the function if validation fails
    }

    if (!lotStatus) {
      setSubmitLoading(false);
      message.error("Lot Status is required.");
      return; // Exit the function if validation fails
    }

    // Validation: Ensure that all details have a "result" that is neither null nor "N/A"

    const missingResult = saveDetails.some((detail) => {
      if (!detail.result || detail.result === "N/A") {
        return true; // stops the iteration on the first invalid result found
      }
      return false; // continue checking
    });

    if (missingResult) {
      setSubmitLoading(false);
      message.warning("Result field is mandatory for all rows.");
      return; // Stop the submission process if validation fails
    }
    const payload = {
      inspectionId: inspectionId,
      formatName: "QA Inspection Format",
      formatNo: "PH-QAD01-F-034",
      revisionNo: "03",
      refSopNo: "PH-QAD01-D-31",
      productDescription: productDescription,
      bmrNo: selectedBMr,
      shift: shift,
      customerName: customerName,
      porder: selectedpOrder,
      date: date,
      itemCode: selectedMaterial,
      machineNo: selectedMachine,
      fgNo: fgNo,
      poNo: poNo,
      aqlSampleSize: aqlSampleSize,
      lotNo: lotNo,
      department: selectedDepartment,
      lotStatus: lotStatus || "N/A",
      remark: remarks || "N/A",
      surfacePatternSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Surface Pattern"].specification ||
            "N/A"
          : "N/A",
      averageGsmWeightSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Average GSM / Weight"]
              .specification || "N/A"
          : "N/A",
      productSizeDiaOfRollsSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Product Size /  / Dia. of Rolls"]
              .specification || "N/A"
          : "N/A",
      noOfFoldsPleatSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["No. of Folds(Pleat)"]
              .specification || "N/A"
          : "N/A",
      artworkPrintingOnBagsLablesSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Artwork printing on bags / Label"]
              .specification || "N/A"
          : "N/A",
      noofBagsPerCartonSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["No. of Bags per carton"]
              .specification || "N/A"
          : "N/A",
      filledBoxGrossWeightSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Filled Box Gross weight"]
              .specification || "N/A"
          : "N/A",
      moistureSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Moisture %"].specification || "≤7"
          : "≤7",
      surfacePatternObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Surface Pattern"].observation ||
            "N/A"
          : "N/A",
      averageGsmWeightObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Average GSM / Weight"].observation ||
            "N/A"
          : "N/A",
      productSizeDiaOfRollsObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Product Size /  / Dia. of Rolls"]
              .observation || "N/A"
          : "N/A",
      noOfFoldsPleatObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["No. of Folds(Pleat)"].observation ||
            "N/A"
          : "N/A",
      artworkPrintingOnBagsLablesObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Artwork printing on bags / Label"]
              .observation || "N/A"
          : "N/A",
      noofBagsPerCartonObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["No. of Bags per carton"]
              .observation || "N/A"
          : "N/A",
      filledBoxGrossWeightObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Filled Box Gross weight"]
              .observation || "N/A"
          : "N/A",
      moistureObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Moisture %"].observation || "N/A"
          : "N/A",
      details: saveDetails,
    };

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(`${API.prodUrl}/Precot/api/QA/Service/api/SubmitReport`, payload, {
        headers,
      })
      .then((res) => {
        setSubmitLoading(false);
        message.success("Form submitted Succcessfully");
        navigate(
          "/Precot/QualityAssurance/F-034/inprocess_inspection_report_summary"
        );
      })
      .catch((err) => {
        setSubmitLoading(false);

        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleSave = () => {
    if (Object.keys(budsInspectionDataRef.current).length !== 0) {
      setBudsInspectionData(budsInspectionDataRef.current);
    }

    const transformedData = transformData(tableData);

    //crtical

    const transformedCrticalData = transformCriticalData(crticalInspectionData);
    const mappedData = mapKeys(transformedCrticalData);

    const transformedMajorData = transformCriticalData(majorInspectionData);
    const mappedMajorData = mapMajorKeys(transformedMajorData);

    const transformedMinorData = transformCriticalData(minorInspectionData);
    const mappedMinorData = mapMinorKeys(transformedMinorData);

    const transformedStatusData = transformStatusData(statusLOVData);

    const mappedStatusData = mapStatusKeys(transformedStatusData);

    // Assuming all transformed arrays have the same length
    const length = Math.max(
      transformedData.length,
      transformedCrticalData.length,
      transformedMajorData.length,
      transformedMinorData.length,
      transformedStatusData.length
    );

    let saveDetails = [];

    for (let i = 0; i < length; i++) {
      // Create a base object with properties from transformedData
      const detail = {
        line_id: details[i]?.line_id || "",
        time: transformedData[i]?.time || "N/A",
        lotSize: transformedData[i]?.lotSize || "N/A",
        sampleSize: transformedData[i]?.sampleSize || "N/A",
        wrongBoxFixed34: mappedData[i]?.wrongBoxFixed34 || "N/A",
        insectContamination34: mappedData[i]?.insectContamination34 || "N/A",
        metalContamination34: mappedData[i]?.metalContamination34 || "N/A",
        lessCountWeightPerBag34:
          mappedData[i]?.lessCountWeightPerBag34 || "N/A",
        cutPads34: mappedMajorData[i]?.cutPads34 || "N/A",
        improperOpenDamagedSealing34:
          mappedMajorData[i]?.improperOpenDamagedSealing34 || "N/A",
        dirtDustContamination34:
          mappedMajorData[i]?.dirtDustContamination34 || "N/A",
        plasticContamination34:
          mappedMajorData[i]?.plasticContamination34 || "N/A",
        hairContamination34: mappedMajorData[i]?.hairContamination34 || "N/A",
        lowerHigherFillingHeightLessData34:
          mappedMajorData[i]?.lowerHigherFillingHeightLessData34 || "N/A",
        improperPadAllignment34:
          mappedMajorData[i]?.improperPadAllignment34 || "N/A",
        blackContamintion: mappedMinorData[i]?.blackContamintion || "N/A",
        coloutContamination34:
          mappedMinorData[i]?.coloutContamination34 || "N/A",
        edgeCondition34: mappedMinorData[i]?.edgeCondition34 || "N/A",
        folderPads34: mappedMinorData[i]?.folderPads34 || "N/A",
        improperOrIllegiblePrintingOfFgNo34:
          mappedMinorData[i]?.improperOrIllegiblePrintingOfFgNo34 || "N/A",
        result: mappedStatusData[i]?.result || "N/A",
      };

      // Add the constructed object to the details array
      saveDetails.push(detail);
    }

    const payload = {
      inspectionId: inspectionId,
      formatName: "QA Inspection Format",
      formatNo: "PH-QAD01-F-034",
      revisionNo: "03",
      refSopNo: "PH-QAD01-D-31",
      productDescription: productDescription,
      bmrNo: selectedBMr,
      shift: shift,
      customerName: customerName,
      porder: selectedpOrder,
      date: date,
      itemCode: selectedMaterial,
      machineNo: selectedMachine,
      fgNo: fgNo,
      poNo: poNo,
      aqlSampleSize: aqlSampleSize,
      lotNo: lotNo,
      department: selectedDepartment,
      lotStatus: lotStatus,
      remark: remarks,
      surfacePatternSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Surface Pattern"].specification ||
            "N/A"
          : "N/A",
      averageGsmWeightSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Average GSM / Weight"]
              .specification || "N/A"
          : "N/A",
      productSizeDiaOfRollsSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Product Size /  / Dia. of Rolls"]
              .specification || "N/A"
          : "N/A",
      noOfFoldsPleatSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["No. of Folds(Pleat)"]
              .specification || "N/A"
          : "N/A",
      artworkPrintingOnBagsLablesSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Artwork printing on bags / Label"]
              .specification || "N/A"
          : "N/A",
      noofBagsPerCartonSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["No. of Bags per carton"]
              .specification || "N/A"
          : "N/A",
      filledBoxGrossWeightSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Filled Box Gross weight"]
              .specification || "N/A"
          : "N/A",
      moistureSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Moisture %"].specification || "≤7"
          : "≤7",
      surfacePatternObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Surface Pattern"].observation ||
            "N/A"
          : "N/A",
      averageGsmWeightObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Average GSM / Weight"].observation ||
            "N/A"
          : "N/A",
      productSizeDiaOfRollsObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Product Size /  / Dia. of Rolls"]
              .observation || "N/A"
          : "N/A",
      noOfFoldsPleatObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["No. of Folds(Pleat)"].observation ||
            "N/A"
          : "N/A",
      artworkPrintingOnBagsLablesObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Artwork printing on bags / Label"]
              .observation || "N/A"
          : "N/A",
      noofBagsPerCartonObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["No. of Bags per carton"]
              .observation || "N/A"
          : "N/A",
      filledBoxGrossWeightObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Filled Box Gross weight"]
              .observation || "N/A"
          : "N/A",
      moistureObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Moisture %"].observation || "N/A"
          : "N/A",
      details: saveDetails,
    };

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    // Make the POST request to the API endpoint with headers
    axios
      .post(
        `${API.prodUrl}/Precot/api/QA/Service/api/saveOnlineInspectionReport`,
        payload,
        { headers }
      )
      .then((res) => {
        message.success("Form saved Succcessfully");
        navigate(
          "/Precot/QualityAssurance/F-034/inprocess_inspection_report_summary"
        );
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleBack = () => {
    navigate(
      "/Precot/QualityAssurance/F-034/Inprocess_Inspection_Report_summary"
    );
  };

  const handleRejectModal = () => {
    setShowModal(true);
  };

  const handleApprove = async () => {
    setSaveLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/api/approveOrReject`,
        {
          id: inspectionId,
          status: "Approve",
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        navigate(
          "/Precot/QualityAssurance/F-034/inprocess_inspection_report_summary"
        );
      })
      .catch((err) => {
        setLoading(false);
        //
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleReject = async () => {
    setSaveLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setSaveLoading(false);
      return;
    }

    const res = await axios
      .put(
        `${API.prodUrl}/Precot/api/QA/Service/api/approveOrReject`,
        {
          id: inspectionId,
          status: "Reject",
          remarks: rejectRemarks,
        },
        { headers }
      )
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        navigate(
          "/Precot/QualityAssurance/F-034/inprocess_inspection_report_summary"
        );
      })
      .catch((err) => {
        setLoading(false);
        //
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };
  const { confirm } = Modal;

  const handleLogout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      // content: "You will be logged out and redirected to the login page.",
      onOk() {
        localStorage.removeItem("token");
        navigate("/Precot");
      },
      onCancel() {
        // Logic if the user cancels the logout action
      },
    });
  };

  useEffect(() => {
    if (editDepartment) {
      setSelectedDepartment(editDepartment);
    }
  }, [editDepartment]);

  useEffect(() => {
    fetchDepartmentsLov();
    fetchInspectionEditDate();
  }, []);

  useEffect(() => {
    fetchBMRLov();
  }, [selectedDepartment]);

  const canDisplayButtonSave = () => {
    if (roleauth === "ROLE_QA") {
      if (
        (response &&
          response.qa_inspector_status === "QA_INS_SUBMITTED" &&
          (response.prod_supervisor_status === "SUPERVISOR_REJECTED" ||
            response.prod_supervisor_status === "WAITING_FOR_APPROVAL" ||
            response.prod_supervisor_status === "SUPERVISOR_APPROVED" ||
            response.qa_mr_status === "QA_MR_REJECTED" ||
            response.qa_mr_status === "QA_MR_APPROVED")) ||
        response.qa_inspector_status === "QA_INS_SUBMITTED"
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
      return "block";
    }
  };

  const canDisplayButtons = () => {
    if (roleauth === "ROLE_QA") {
      if (
        response &&
        response.qa_inspector_status === "QA_INS_SUBMITTED" &&
        response.prod_supervisor_status !== "SUPERVISOR_REJECTED" &&
        response.qa_mr_status !== "QA_MR_REJECTED"
      ) {
        return "none"; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      } else if (
        response.qa_inspector_status === "QA_INS_SUBMITTED" &&
        response.qa_mr_status !== "WAITING_FOR_APPROVAL" &&
        response.prod_supervisor_status !== "SUPERVISOR_REJECTED"
      ) {
        return true; // Hide button if operator has approved and neither supervisor nor HOD has rejected
      }
      return "block";
    } else if (roleauth == "ROLE_SUPERVISOR") {
      if (
        (response?.prod_supervisor_status == "SUPERVISOR_APPROVED" ||
          response?.prod_supervisor_status == "SUPERVISOR_REJECTED") &&
        response?.qa_mr_status == ""
      ) {
        return "none";
      } else if (
        response?.prod_supervisor_status == "SUPERVISOR_REJECTED" &&
        response?.qa_mr_status == "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else if (
        (response?.prod_supervisor_status == "SUPERVISOR_APPROVED" &&
          response?.qa_mr_status == "WAITING_FOR_APPROVAL") ||
        response?.qa_mr_status == "QA_MR_APPROVED"
      ) {
        return "none";
      }
    } else if (roleauth == "QA_MANAGER" || roleauth == "ROLE_DESIGNEE") {
      if (
        (response.prod_supervisor_status == "SUPERVISOR_APPROVED" &&
          (response?.qa_mr_status == "QA_MR_APPROVED" ||
            response?.qa_mr_status == "QA_MR_REJECTED")) ||
        response?.prod_supervisor_status === "WAITING_FOR_APPROVAL"
      ) {
        return "none";
      } else if (
        response?.qa_mr_status == "" &&
        response?.prod_supervisor_status === "SUPERVISOR_REJECTED"
      ) {
        return "none";
      }
      return "block";
    } else {
      if (
        response?.qa_mr_status == "QA_MR__APPROVED" ||
        response?.qa_mr_status == "QA_MR__REJECTED"
      ) {
        return "none";
      }
      return "block";
    }
  };

  const canEdit = () => {
    if (roleauth === "ROLE_QA") {
      return !(
        response &&
        response?.qa_inspector_status === "QA_INS_SUBMITTED" &&
        response?.prod_supervisor_status !== "SUPERVISOR_REJECTED" &&
        response?.qa_mr_status !== "QA_MR_REJECTED"
      );
    } else if (roleauth === "ROLE_SUPERVISOR") {
      return !(
        (response &&
          response?.qa_inspector_status === "QA_INS_SUBMITTED" &&
          (response?.prod_supervisor_status === "SUPERVISOR_APPROVED" ||
            response?.prod_supervisor_status === "WAITING_FOR_APPROVAL") &&
          response?.qa_mr_status === "WAITING_FOR_APPROVAL") ||
        "QA_MR_APPROVED"
      );
    } else if (roleauth === "QA_MANAGER" || roleauth === "ROLE_DESIGNEE") {
      return !(
        response &&
        (response?.qa_mr_status === "QA_MR_APPROVED" ||
          response?.qa_mr_status === "WAITING_FOR_APPROVAL" ||
          response?.qa_mr_status === "QA_MR_REJECTED" ||
          response?.prod_supervisor_status === "SUPERVISOR_APPROVED" ||
          response?.prod_supervisor_status === "WAITING_FOR_APPROVAL" ||
          response?.prod_supervisor_status === "SUPERVISOR_REJECTED")
      );
    } else {
      return false;
    }
  };

  const fetchDepartmentsLov = async () => {
    try {
      setLoading(true); // Show loading spinner while fetching data
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/departmentsLov`, // Replace with your actual API base URL
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token in Authorization header
          },
        }
      );
      const departmentOptions = response.data.map((dept) => ({
        label: dept, // Each element is the label itself
        value: dept, // Each element is also the value itself
      }));
      setDepartments(departmentOptions); // Set fetched departments as options
    } catch (error) {
      console.error("Error fetching department LOV:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const fetchBMRLov = async () => {
    try {
      setLoading(true); // Show loading spinner while fetching data
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/bmrLov?department=${selectedDepartment}`, // Replace with your actual API base URL
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token in Authorization header
          },
        }
      );
      const bmrOptions = response.data.map((dept) => ({
        label: dept, // Each element is the label itself
        value: dept, // Each element is also the value itself
      }));
      setBMR(bmrOptions); // Set fetched departments as options
    } catch (error) {
      console.error("Error fetching department LOV:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const fetchPdeValues = async (value) => {
    try {
      const token = localStorage.getItem("token");
      await axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/getDataByBatchNo?batchNo=${value}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log("res", res);
          if (res.data) {
            setSelectedMachine(res.data.machineName);
            setSelectedpOrder(res.data.orderNo);
            setLotNo(res.data.lotNumber);
            setPoNo(res.data.poNumber);
            setProductDescription(res.data.productDescription);
            //Get itemcode api call
            fetchItemCodes(res.data.poNumber);
          }
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    } catch (error) {
      message.error(error);
    }
  };

  const fetchItemCodes = async (pOrder) => {
    try {
      await axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/getItemCode?porder=${pOrder}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            if (res.data.length == 1) {
              setSelectedMat(res.data[0]);
              console.log("fetchCustomer(res.data[0]);", res.data[0]);
              fetchCustomer(res.data[0]);
            } else {
              setMaterial(
                res.data.map((item) => ({
                  label: item,
                  value: item,
                }))
              );
            }
          }
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    } catch (error) {
      message.error(error);
    }
  };

  const fetchCustomer = async (itemCode) => {
    try {
      await axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/getCustomerName?material=${itemCode}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add token in Authorization header
            },
          }
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            if (res.data.length == 1) {
              setCustomerName(res.data[0]);
            } else {
              setCustomers(
                res.data.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                })
              );
            }
          }
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    } catch (error) {
      message.error(error);
    }
  };

  //Get API
  const fetchInspectionEditDate = async () => {
    const token = localStorage.getItem("token");
    if (alertShown.current) {
      return;
    }
    alertShown.current = true;
    try {
      await axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/api/findByDateShidtMachineNoPordeBmr?date=${editDate}&shift=${editShift}&machineNo=${editMachineNo}&pOrder=${editPOrder}&bmrNo=${editBmrNo}&formatNo=PH-QAD01-F-034`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data && res.data?.length > 0) {
            editShown.current = true;
            setisEditResponse(true);
            setSelectedDepartment(res.data[0].department);
            setInspectionId(res.data[0].inspectionId);
            setProductDescription(res.data[0].productDescription);
            setSelectedBMR(res.data[0].bmrNo);
            if (["I", "II", "III"].includes(response.shift)) {
              setShift(res.data[0].shift);
            } else {
              setShift(null); // Fallback in case the value doesn't match
            }
            setShift(res.data[0].shift);
            setSelectedpOrder(res.data[0].porder);
            setCustomerName(res.data[0].customerName);
            setResponse(res.data[0]);
            setDetails(res.data[0].details);

            setPOrder(res.data[0].porder);
            setDate(res.data[0].date);
            setMaterial(res.data[0].itemCode);
            setSelectedMat(res.data[0].itemCode);
            setSelectedMachine(res.data[0].machineNo);
            setFgNo(res.data[0].fgNo);
            setPoNo(res.data[0].poNo);
            setSelectedPoNo(res.data[0].poNo);
            setAqlSampleSize(res.data[0].aqlSampleSize);
            setLotNo(res.data[0].lotNo);
            const transformedData = transformToOriginalStructure(res.data[0]);

            setBudsInspectionData(transformedData);
            setLotStatus(res.data[0].lotStatus);
            setRemarks(res.data[0].remark);
            budsInspectionDataRef.current = transformedData;

            // fetchBMRLov();
          } else {
            setDetails([]);
            setisEditResponse(false);
            setIsEditable(canEdit());
          }

          if (
            ((roleauth == "QA_MANAGER" || roleauth == "ROLE_DESIGNEE") &&
              res.data[0].prod_supervisor_status !== "SUPERVISOR_APPROVED") ||
            ((roleauth == "QA_MANAGER" || roleauth == "ROLE_DESIGNEE") &&
              res.data[0].qa_mr_status == "QA_MR_REJECTED")
          ) {
            message.error("Supervisor Yet Not Approved");
            setTimeout(() => {
              navigate(
                "/Precot/QualityAssurance/F-034/inprocess_inspection_report_summary"
              );
            }, 1500);
            alertShown.current = true;
          }
          if (
            (roleauth == "ROLE_SUPERVISOR" &&
              res.data[0].qa_inspector_status !== "QA_INS_SUBMITTED") ||
            (roleauth == "ROLE_SUPERVISOR" &&
              (res.data[0].prod_supervisor_status == "SUPERVISOR_REJECTED" ||
                res.data[0].qa_mr_status == "QA_MR_REJECTED"))
          ) {
            message.error("Supervisor Yet Not Approved");
            setTimeout(() => {
              navigate(
                "/Precot/QualityAssurance/F-034/inprocess_inspection_report_summary"
              );
            }, 1500);
            alertShown.current = true;
          }
        })
        .catch((err) => {});
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  const transformToOriginalStructure = (data) => {
    return {
      "Surface Pattern": {
        specification: data.surfacePatternSpecification,
        observation: data.surfacePatternObservation || "",
      },
      "Average GSM / Weight": {
        specification: data.averageGsmWeightSpecification,
        observation: data.averageGsmWeightObservation || "",
      },
      "Product Size /  / Dia. of Rolls": {
        specification: data.productSizeDiaOfRollsSpecification,
        observation: data.productSizeDiaOfRollsObservation || "",
      },
      "No. of Folds(Pleat)": {
        specification: data.noOfFoldsPleatSpecification || "",
        observation: data.noOfFoldsPleatObservation || "",
      },
      "Artwork printing on bags / Label": {
        specification: data.artworkPrintingOnBagsLablesSpecification || "",
        observation: data.artworkPrintingOnBagsLablesObservation || "",
      },
      "No. of Bags per carton": {
        specification: data.noofBagsPerCartonSpecification || "",
        observation: data.noofBagsPerCartonObservation || "",
      },
      "Filled Box Gross weight": {
        specification: data.filledBoxGrossWeightSpecification || "",
        observation: data.filledBoxGrossWeightObservation || "",
      },
      "Moisture %": {
        specification: data.moistureSpecification,
        observation: data.moistureObservation || "",
      },
    };
  };

  const initializeTableData = () => {
    const data = [
      {
        key: "1",
        column1: "Time:",
        column2: details.length > 0 ? details[0]?.time || "" : "",
        column3: details.length > 1 ? details[1]?.time || "" : "",
        column4: details.length > 2 ? details[2]?.time || "" : "",
        column5: details.length > 3 ? details[3]?.time || "" : "", // New column5 for Time
      },
      {
        key: "2",
        column1: "Lot Size:",
        column2: details.length > 0 ? details[0]?.lotSize || "" : "",
        column3: details.length > 1 ? details[1]?.lotSize || "" : "",
        column4: details.length > 2 ? details[2]?.lotSize || "" : "",
        column5: details.length > 3 ? details[3]?.lotSize || "" : "", // New column5 for Lot Size
      },
      {
        key: "3",
        column1: "Sample Size:",
        column2: details.length > 0 ? details[0]?.sampleSize || "" : "",
        column3: details.length > 1 ? details[1]?.sampleSize || "" : "",
        column4: details.length > 2 ? details[2]?.sampleSize || "" : "",
        column5: details.length > 3 ? details[3]?.sampleSize || "" : "", // New column5 for Sample Size
      },
    ];
    setTableData(data);
  };

  useEffect(() => {
    initializeTableData();

    const criticalTransformed = {
      "Wrong / Missing FG No.": [],
      "Insect Contamination": [],
      "Metal Contamination": [],
      "Less Count / Weight per bag": [],
    };

    const majorTransformed = {
      "Cut Pads": [],
      "Improper / Open / Damaged Sealing": [],
      "Dirt / Dust Contamination": [],
      "Plastic Contamination": [],
      "Hair Contamination": [],
      "Lower/Higher Filling Height / Less Dia.": [],
      "Improper Pad Alignment": [],
    };
    const minorTransformed = {
      "Black Contamination": [],
      "Colour Contamination": [],
      "Edge Condition (Open/Closed/Stitched)": [],
      "Folded Pads / No. of folds for pleat": [],
      "Improper or Illegible printing of FG No.": [],
      Result: [],
    };
    if (details && details.length > 0) {
      details.forEach((item) => {
        criticalTransformed["Wrong / Missing FG No."].push(
          item.wrongBoxFixed34 || "N/A"
        );
        criticalTransformed["Insect Contamination"].push(
          item.insectContamination34 || "N/A"
        );
        criticalTransformed["Metal Contamination"].push(
          item.metalContamination34 || "N/A"
        );
        criticalTransformed["Less Count / Weight per bag"].push(
          item.lessCountWeightPerBag34 || "N/A"
        );

        majorTransformed["Cut Pads"].push(item.cutPads34 || "N/A");
        majorTransformed["Improper / Open / Damaged Sealing"].push(
          item.improperOpenDamagedSealing34 || "N/A"
        );
        majorTransformed["Dirt / Dust Contamination"].push(
          item.dirtDustContamination34 || "N/A"
        );
        majorTransformed["Plastic Contamination"].push(
          item.plasticContamination34 || "N/A"
        );
        majorTransformed["Hair Contamination"].push(
          item.hairContamination34 || "N/A"
        );
        majorTransformed["Lower/Higher Filling Height / Less Dia."].push(
          item.lowerHigherFillingHeightLessData34 || "N/A"
        );
        majorTransformed["Improper Pad Alignment"].push(
          item.improperPadAllignment34 || "N/A"
        );

        minorTransformed["Black Contamination"].push(
          item.blackContamintion || "N/A"
        );
        minorTransformed["Colour Contamination"].push(
          item.coloutContamination34 || "N/A"
        );
        minorTransformed["Edge Condition (Open/Closed/Stitched)"].push(
          item.edgeCondition34 || "N/A"
        );
        minorTransformed["Folded Pads / No. of folds for pleat"].push(
          item.folderPads34 || "N/A"
        );
        minorTransformed["Improper or Illegible printing of FG No."].push(
          item.improperOrIllegiblePrintingOfFgNo34 || "N/A"
        );
        minorTransformed["Result"].push(
          item.result !== undefined ? item.result : null
        );
      });
    }

    setCrticalInspectionData(criticalTransformed);
    setMajorInspectionData(majorTransformed);
    setMinorInspectionData(minorTransformed);
    setStatusLOVData((prevState) => ({
      ...prevState,
      ...minorTransformed, // Update based on minorTransformed data if necessary
    }));
  }, [details]);

  useEffect(() => {
    setIsEditable(canEdit());
  }, [response]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = response?.qa_inspector_sign;

    if (username) {
      //

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
          setGetImage1(url);
        })
        .catch((err) => {
          //
        });
    }
  }, [response, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = response?.prod_supervisor_sign;
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
          //
          const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const url = `data:image/jpeg;base64,${base64}`;
          setGetImage2(url);
        })
        .catch((err) => {});
    }
  }, [response, API.prodUrl, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = response?.qa_mr_sign;
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
          //
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
          //
        });
    }
  }, [response, API.prodUrl, token]);

  let formattedInspectorDate;
  if (response.qa_inspector_submit_on) {
    formattedInspectorDate = moment(response.qa_inspector_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where auditee is null or undefined
    formattedInspectorDate = ""; // Or any other default value or error handling
  }
  let formattedSupervisorDate;
  if (response.prod_supervisor_submit_on) {
    formattedSupervisorDate = moment(response.prod_supervisor_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedSupervisorDate = ""; // Or any other default value or error handling
  }
  let formattedQAMRDate;
  if (response.qa_mr_submit_on) {
    formattedQAMRDate = moment(response.qa_mr_submit_on).format(
      "DD/MM/YYYY HH:mm"
    );
  } else {
    // Handle case where hod_submit_on is null or undefined
    formattedQAMRDate = ""; // Or any other default value or error handling
  }

  const header = () => (
    <tr>
      Visual Inspection to Identify Defects (to be inspected once in every two
      hours for all the below mentioned defects)
    </tr>
  );

  const handleRadioChange = (label, value) => {
    setCrticalInspectionData((prev) => ({ ...prev, [label]: value })); // Update state with selected radio values
    // Log the changes
  };

  const handleMajorRadioChange = (label, value) => {
    setMajorInspectionData((prev) => ({ ...prev, [label]: value })); // Update state with selected radio values
    // Log the changes
  };

  const handleMinorRadioChange = (label, value, statusValues) => {
    setMinorInspectionData((prev) => ({ ...prev, [label]: value }));
    setStatusLOVData((prevData) => ({
      ...prevData,
      [label]: statusValues, // Update status LOV values for the specific label
    }));
  };

  const handleBudsInputChange = (updatedValues) => {
    budsInspectionDataRef.current = updatedValues;
    setBudsInspectionData(updatedValues);
  };

  // Function to handle updates in the table fields
  const handleInputChange = (key, column, value) => {
    const updatedData = tableData.map((item) => {
      if (item.key === key) {
        return { ...item, [column]: value };
      }
      return item;
    });
    setTableData(updatedData);
  };

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <PrecotSidebar
        open={open}
        onClose={onClose}
        role={localStorage.getItem("role")}
      />
      <BleachingHeader
        unit="Unit-H"
        formName="ON-LINE INSPECTION REPORT(for PADS / PLEATS / ROLLS)"
        formatNo="PH-QAD01-F-034"
        MenuBtn={
          <Button
            type="primary"
            icon={<TbMenuDeep />}
            onClick={showDrawer}
          ></Button>
        }
        buttonsArray={[
          roleauth === "ROLE_SUPERVISOR" ||
          roleauth === "QA_MANAGER" ||
          roleauth === "ROLE_DESIGNEE" ? (
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
                icon={
                  <img src={approveIcon} alt="Approve Icon" color="#00308F" />
                }
              >
                &nbsp;Approve
              </Button>
              <Button
                loading={saveLoading}
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
                  display: canDisplayButtonSave(),
                }}
                onClick={handleSave}
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
                shape="round"
              >
                &nbsp;Submit
              </Button>
            </>
          ),
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
            onClick={handleLogout}
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
          <label style={{ marginRight: "8px" }}>Reason:</label>
          <TextArea
            value={rejectRemarks}
            onChange={(e) => setRejectRemarks(e.target.value)}
            rows={4} // Adjust the number of rows as needed
            style={{ width: "100%" }} // Adjust the width as needed
          />
        </div>
      </Modal>
      <Form className="report-form">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6} lg={5}>
            <Form.Item label="Department">
              <Select
                value={selectedDepartment}
                placeholder="Choose Department"
                style={{ width: "100%" }}
                onChange={departmentChange}
                disabled
                options={departments}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6} lg={3} style={{ marginRight: "5%" }}>
            <Form.Item label="BMR No.">
              <Select
                showSearch
                value={selectedBMr}
                disabled={!isEditable}
                placeholder="Choose BMR"
                style={{ width: "150px" }} // Use 100% width for flexibility
                onChange={bmrChange}
                options={BMR}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6} lg={3} style={{ marginRight: "5%" }}>
            <Form.Item label="P Order">
              <Input
                showSearch
                value={selectedpOrder}
                disabled
                style={{ width: "150%" }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Item Code">
              <Select
                showSearch
                value={selectedMaterial}
                disabled={!isEditable}
                placeholder="Choose Material"
                style={{ width: "150px" }}
                onChange={materialChange}
                options={material}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col>
            <Form.Item label="Product Description">
              <Input
                value={productDescription}
                disabled
                onChange={(e) => setProductDescription(e.target.value)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6} lg={4}>
            <Form.Item label="Machine Name">
              <Input
                value={selectedMachine}
                disabled
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Form.Item label="FG No.">
              <Input
                value={fgNo}
                disabled={!isEditable}
                onChange={(e) => setFgNo(e.target.value)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6} lg={5}>
            <Form.Item label="Customer Name">
              <Select
                showSearch
                value={customerName}
                disabled={!isEditable}
                options={customers}
                onChange={(value) => setCustomerName(value)}
                style={{ width: "250px" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6} lg={3}>
            <Form.Item label="Shift">
              <Select
                value={shift}
                disabled={!isEditable}
                onChange={(value) => setShift(value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="I">I</Select.Option>
                <Select.Option value="II">II</Select.Option>
                <Select.Option value="III">III</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Po. No.">
              <Input value={poNo} disabled style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Form.Item label="Lot No.">
              <Input
                value={lotNo}
                disabled={!isEditable}
                onChange={(e) => setLotNo(e.target.value)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Form.Item label="Date">
              <Input
                type="date"
                value={date}
                max={today}
                disabled={!isEditable}
                onChange={handleDateChange}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6} lg={5}>
            <Form.Item label="General Inspection Level - II"></Form.Item>
          </Col>
        </Row>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Inspection Parameters" key="1">
            <DynamicTableForm
              labels={inspectionBudsLabels}
              dataSource={budsInspectionData}
              onChange={handleBudsInputChange}
              disabled={!isEditable}
              type="f034"
            />
          </TabPane>
          <TabPane tab="Visual Inspection" key="2">
            <div>
              <Table
                dataSource={tableData}
                pagination={false}
                bordered
                rowKey="key"
                components={{
                  header: {
                    cell: (props) => {
                      const { children, ...restProps } = props;
                      return <th {...restProps}>{children}</th>;
                    },
                  },
                }}
                title={() => header()}
                columns={[
                  {
                    dataIndex: "column1",
                    render: (text, _, index) => {
                      const labels = ["Time:", "Lot Size:", "Sample Size:"];
                      return <div>{labels[index]}</div>;
                    },
                  },
                  {
                    dataIndex: "column2",
                    render: (_, record, index) => {
                      if (index === 0) {
                        return (
                          <TimePicker
                            format="HH:mm"
                            style={{ width: "100%" }}
                            disabled={!isEditable}
                            value={
                              record.column2
                                ? moment(record.column2, "HH:mm")
                                : null
                            } // Ensure it's a valid moment object
                            onChange={(time, timeString) =>
                              handleInputChange(
                                record.key,
                                "column2",
                                timeString
                              )
                            }
                          />
                        );
                      }
                      return (
                        <Input
                          value={record.column2}
                          disabled={!isEditable}
                          onChange={(e) =>
                            handleInputChange(
                              record.key,
                              "column2",
                              e.target.value
                            )
                          }
                        />
                      );
                    },
                  },
                  {
                    dataIndex: "column3",
                    render: (_, record, index) => {
                      if (index === 0) {
                        return (
                          <TimePicker
                            format="HH:mm"
                            style={{ width: "100%" }}
                            disabled={!isEditable}
                            value={
                              record.column3
                                ? moment(record.column3, "HH:mm")
                                : null
                            } // Ensure it's a valid moment object
                            onChange={(time, timeString) =>
                              handleInputChange(
                                record.key,
                                "column3",
                                timeString
                              )
                            }
                          />
                        );
                      }
                      return (
                        <Input
                          value={record.column3}
                          disabled={!isEditable}
                          onChange={(e) =>
                            handleInputChange(
                              record.key,
                              "column3",
                              e.target.value
                            )
                          }
                        />
                      );
                    },
                  },
                  {
                    dataIndex: "column4",
                    render: (_, record, index) => {
                      if (index === 0) {
                        return (
                          <TimePicker
                            format="HH:mm"
                            style={{ width: "100%" }}
                            disabled={!isEditable}
                            value={
                              record.column4
                                ? moment(record.column4, "HH:mm")
                                : null
                            } // Ensure it's a valid moment object
                            onChange={(time, timeString) =>
                              handleInputChange(
                                record.key,
                                "column4",
                                timeString
                              )
                            }
                          />
                        );
                      }
                      return (
                        <Input
                          value={record.column4}
                          disabled={!isEditable}
                          onChange={(e) =>
                            handleInputChange(
                              record.key,
                              "column4",
                              e.target.value
                            )
                          }
                        />
                      );
                    },
                  },
                  {
                    dataIndex: "column5",
                    render: (_, record, index) => {
                      if (index === 0) {
                        return (
                          <TimePicker
                            format="HH:mm"
                            style={{ width: "100%" }}
                            disabled={!isEditable}
                            value={
                              record.column5
                                ? moment(record.column5, "HH:mm")
                                : null
                            } // Ensure it's a valid moment object
                            onChange={(time, timeString) =>
                              handleInputChange(
                                record.key,
                                "column5",
                                timeString
                              )
                            }
                          />
                        );
                      }
                      return (
                        <Input
                          value={record.column5}
                          disabled={!isEditable}
                          onChange={(e) =>
                            handleInputChange(
                              record.key,
                              "column5",
                              e.target.value
                            )
                          }
                        />
                      );
                    },
                  },
                ]}
              />
            </div>
          </TabPane>
          <TabPane tab="Crtical Inspection" key="3">
            <QA_f034_crtical_inspection
              labels={inspectionLabels}
              dataSource={details}
              disabled={!isEditable}
              onChange={handleRadioChange}
              type="f034"
            />
          </TabPane>
          <TabPane tab="Major Inspection" key="4">
            <QA_f034_major_inspection
              labels={inspectionMajorLabels}
              dataSource={details}
              disabled={!isEditable}
              onChange={handleMajorRadioChange}
              type="f034"
            />
          </TabPane>
          <TabPane tab="Minor Inspection" key="5">
            <QA_f034_minor_inspection
              labels={inspectionMinorLabels}
              dataSource={details}
              disabled={!isEditable}
              onChange={handleMinorRadioChange}
              type="f034"
            />
            <div>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item label="Lot Status">
                    <Select
                      value={lotStatus}
                      onChange={(value) => setLotStatus(value)} // Update the state on change
                      placeholder="Select Lot Status"
                      disabled={!isEditable}
                      style={{ width: "180px" }} // Full width for better UI
                    >
                      <Select.Option value="Accepted">Accepted</Select.Option>
                      <Select.Option value="Rejected">Rejected</Select.Option>
                      <Select.Option value="On Hold">On Hold</Select.Option>
                      <Select.Option value="Accepted Under Deviation">
                        Accepted Under Deviation
                      </Select.Option>
                      <Select.Option value="Rework">Rework</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Remarks">
                    <Input.TextArea
                      rows={1}
                      value={remarks}
                      disabled={!isEditable}
                      onChange={(e) => setRemarks(e.target.value)} // Access the value from the event
                      placeholder="Additional notes"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tab="Reviews" key="6">
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
                  <td
                    colSpan="2"
                    style={{ height: "35px", textAlign: "center" }}
                  >
                    <b>Inspected by:</b>
                  </td>
                  <td
                    colSpan="2"
                    style={{ height: "35px", textAlign: "center" }}
                  >
                    <b>Verified by :</b>
                  </td>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    <b>Approved by:</b>
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
                    {response?.qa_inspector_status === "QA_INS_SUBMITTED" && (
                      <>
                        {response && response.qa_inspector_sign}
                        <br />
                        {formattedInspectorDate}
                        <br />
                        {getImage1 && (
                          <img
                            className="signature"
                            src={getImage1}
                            alt="Auditee"
                          />
                        )}
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
                    {(response?.prod_supervisor_status ===
                      "SUPERVISOR_REJECTED" ||
                      response?.prod_supervisor_status ===
                        "SUPERVISOR_APPROVED") && (
                      <>
                        {response && response.prod_supervisor_sign}
                        <br></br>
                        {formattedSupervisorDate}
                        <br />
                        {getImage2 && (
                          <img
                            className="signature"
                            src={getImage2}
                            alt="Auditor Sign"
                          />
                        )}
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
                    {(response?.qa_mr_status === "QA_MR_REJECTED" ||
                      response?.qa_mr_status === "QA_MR_APPROVED") && (
                      <>
                        {response && response.qa_mr_status}
                        <br></br>
                        {formattedQAMRDate}
                        <br />
                        {getImage3 && (
                          <img
                            className="signature"
                            src={getImage3}
                            alt="QAMr"
                          />
                        )}
                      </>
                    )}
                  </td>
                </tr>
              </table>
            </div>
          </TabPane>
        </Tabs>
      </Form>
    </div>
  );
};

export default QA_f034_Inprocess_Inspection_Report;
