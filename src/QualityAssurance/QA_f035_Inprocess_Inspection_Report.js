import {
  Button,
  Col,
  DatePicker,
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

const QA_f035_Inprocess_Inspection_Report = () => {
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
  const [material, setMaterial] = useState();
  const [isEditResponse, setisEditResponse] = useState(false);
  const editShown = useRef(false);
  const alertShown = useRef(false);
  const [submitLoading, setSubmitLoading] = useState(false);
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
    "Bag Weight": {
      specification: "",
      observation: "",
    },
    "Average Weight of Balls": {
      specification: "",
      observation: "",
    },
    "No. of Balls Per Pack": {
      specification: "",
      observation: "",
    },
    "Balls Dia": {
      specification: "",
      observation: "",
    },
    "Artwork printing on bags / Label": {
      specification: "",
      observation: "",
    },
    "No. of Pack per carton": {
      specification: "",
      observation: "",
    },
  });
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const budsInspectionDataRef = useRef({});
  const [tableData, setTableData] = useState([]);
  const [inspectionId, setInspectionId] = useState("");

  // State to manage radio selections

  const inspectionLabels = [
    "Wrong / Missing FG No.",
    "Insect Contamination",
    "Metal Contamination",
    "Less Count",
    "Major Discolouration / Breakage at serration",
  ];
  const [crticalInspectionData, setCrticalInspectionData] = useState(
    inspectionLabels.reduce((acc, label) => {
      acc[label] = Array(4).fill("N/A"); // Set 'N/A' for all 4 options of each label
      return acc;
    }, {})
  );

  const inspectionMajorLabels = [
    "Improper / Open / Damaged Sealing",
    "Dirt / Dust Contamination",
    "Plastic Contamination",
    "Hair Contamination",
    "No cotton at end / Less Bonding Strength",
    "Shape or Compactness of balls not correct",
  ];
  const [majorInspectionData, setMajorInspectionData] = useState(
    inspectionMajorLabels.reduce((acc, label) => {
      acc[label] = Array(4).fill("N/A"); // Set 'N/A' for all 4 options of each label
      return acc;
    }, {})
  );

  const inspectionBudsLabels = [
    "Bag Weight",
    "Average Weight of Balls",
    "No. of Balls Per Pack",
    "Balls Dia",
    "Artwork printing on bags / Label",
    "No. of Pack per carton",
  ];

  const inspectionMinorLabels = [
    "Black Contamination",
    "Colour Contamination",
    "Less Weight/Sliver Defect(Loose Sliver/ Flat Shape/ More Hairiness)",
    "Loose Cotton / Less Cotton / Tail Ends",
    "Improper or Illegible printing of FG No.",
    "Result",
  ];

  const [minorInspectionData, setMinorInspectionData] = useState(
    inspectionMinorLabels.reduce((acc, label) => {
      acc[label] = Array(4).fill("Nil"); // Set 'N/A' for all 4 options of each label
      return acc;
    }, {})
  );

  const [statusLOVData, setStatusLOVData] = useState(
    inspectionMinorLabels.reduce((acc, label) => {
      acc[label] =
        label === "Result"
          ? Array(4).fill(null) // Fill 'Result' with null
          : Array(4).fill("Nil"); // Fill others with 'Nil'
      return acc;
    }, {})
  );

  const roleauth = localStorage.getItem("role");

  const departmentChange = (value) => setSelectedDepartment(value);
  const machineChange = (value) => setSelectedMachine(value);
  const bmrChange = (value) => {
    setSelectedpOrder(null);
    setSelectedMaterial(null);
    setSelectedBMR(value);
  };
  const pOrderChange = (value) => {
    setSelectedMaterial(null);
    setSelectedpOrder(value);
  };
  const materialChange = (value) => setSelectedMaterial(value);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
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
      improperOpenDamagedSealing35: item["Improper / Open / Damaged Sealing"],
      dirtDustContaminatio35n: item["Dirt / Dust Contamination"],
      plasticContamination35: item["Plastic Contamination"],
      hairContamination35: item["Hair Contamination"],
      noCottonAtEndLessBondingStrength35:
        item["No cotton at end / Less Bonding Strength"],
      shapeOrCompactnessOfBallsNotCorrect35:
        item["Shape or Compactness of balls not correct"],
    }));
  };

  const mapMinorKeys = (data) => {
    return data.map((item) => ({
      blackContamination35: item["Black Contamination"] || "Nil", // Default value "No" if undefined
      colourContamination35: item["Colour Contamination"] || "Nil",
      lessWeightSliverDefect35:
        item[
          "Less Weight/Sliver Defect(Loose Sliver/ Flat Shape/ More Hairiness)"
        ] || "Nil", // Assuming default "Good"
      looseCottonLessCotton35:
        item["Loose Cotton / Less Cotton / Tail Ends"] || "Nil",
      improperOrIllegiblePrintingFgNo35:
        item["Improper or Illegible printing of FG No."] || "Nil",
      result: item["Result"] || "Nil", // Assuming default "No"
    }));
  };

  const mapKeys = (data) => {
    return data.map((item) => ({
      wrongBoxFixed35: item["Wrong / Missing FG No."],
      insectContamination35: item["Insect Contamination"],
      metalContamination35: item["Metal Contamination"],
      lessCount35: item["Less Count "],
      majorDiscolourationBreakage35:
        item["Major Discolouration / Breakage at serration"],
    }));
  };

  const mapStatusKeys = (data) => {
    return data.map((item) => ({
      result: item["Result"], // Map "Less Count / Weight per bag"
    }));
  };

  // Call the function to map the keys

  const handleSave = () => {
    setSaveLoading(true);

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
        wrongBoxFixed35: mappedData[i]?.wrongBoxFixed35 || "N/A",
        insectContamination35: mappedData[i]?.insectContamination35 || "N/A",
        metalContamination35: mappedData[i]?.metalContamination35 || "N/A",
        lessCount35: mappedData[i]?.lessCount35 || "N/A",
        majorDiscolourationBreakage35:
          mappedData[i]?.majorDiscolourationBreakage35 || "N/A",
        improperOpenDamagedSealing35:
          mappedMajorData[i]?.improperOpenDamagedSealing35 || "Nil",
        dirtDustContaminatio35n:
          mappedMajorData[i]?.dirtDustContaminatio35n || "Nil",
        plasticContamination35:
          mappedMajorData[i]?.plasticContamination35 || "Nil",
        hairContamination35: mappedMajorData[i]?.hairContamination35 || "Nil",
        noCottonAtEndLessBondingStrength35:
          mappedMajorData[i]?.noCottonAtEndLessBondingStrength35 || "Nil",
        shapeOrCompactnessOfBallsNotCorrect35:
          mappedMajorData[i]?.shapeOrCompactnessOfBallsNotCorrect35 || "Nil",
        blackContamination35: mappedMinorData[i]?.blackContamination35 || "Nil",
        colourContamination35:
          mappedMinorData[i]?.colourContamination35 || "Nil",
        lessWeightSliverDefect35:
          mappedMinorData[i]?.lessWeightSliverDefect35 || "Nil",
        looseCottonLessCotton35:
          mappedMinorData[i]?.looseCottonLessCotton35 || "Nil",
        improperOrIllegiblePrintingFgNo35:
          mappedMinorData[i]?.improperOrIllegiblePrintingFgNo35 || "Nil",
        result: mappedStatusData[i]?.result || "Nil",
      };
      // Add the constructed object to the details array
      saveDetails.push(detail);
    }

    const payload = {
      inspectionId: inspectionId,
      formatName: "QA Inspection Format",
      formatNo: "PH-QAD01-F-035",
      revisionNo: "01",
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
      lotStatus: lotStatus || "Nil",
      remark: remarks || "Nil",
      bagWeightSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Bag Weight"].specification || "N/A"
          : "N/A",
      averageWeightOfBallsSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Average Weight of Balls"]
              .specification || "N/A"
          : "N/A",
      noOfBallsPerPackSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["No. of Balls Per Pack"]
              .specification || "N/A"
          : "N/A",
      ballsDiaSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Balls Dia"].specification || "N/A"
          : "N/A",
      artworkPrintingOnBagsLabelsSpecification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Artwork printing on bags / Label"]
              .specification || "N/A"
          : "N/A",
      noOfPackPerCotton35Specification:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["No. of Pack per carton"]
              .specification || "N/A"
          : "N/A",
      bagWeightObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Bag Weight"].observation || "N/A"
          : "N/A",
      averageWeightOfBallsObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Average Weight of Balls"]
              .observation || "N/A"
          : "N/A",
      noOfBallsPerPackObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["No. of Balls Per Pack"]
              .observation || "N/A"
          : "N/A",
      ballsDiaObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Balls Dia"].observation || "N/A"
          : "N/A",
      artworkPrintingOnBagsLabelsObservation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["Artwork printing on bags / Label"]
              .observation || "N/A"
          : "N/A",
      noOfPackPerCotton35Observation:
        Object.keys(budsInspectionDataRef.current).length !== 0
          ? budsInspectionDataRef.current["No. of Pack per carton"]
              .observation || "N/A"
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
        setSaveLoading(false);
        message.success("Form saved Succcessfully");
        navigate(
          "/Precot/QualityAssurance/F-035/inprocess_inspection_report_summary"
        );
      })
      .catch((err) => {
        setSaveLoading(false);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSubmit = () => {
    setSubmitLoading(true);

    const transformedData = transformData(tableData);
    const transformedCriticalData = transformCriticalData(
      crticalInspectionData
    );
    const mappedData = mapKeys(transformedCriticalData);

    const transformedMajorData = transformCriticalData(majorInspectionData);
    const mappedMajorData = mapMajorKeys(transformedMajorData);

    const transformedMinorData = transformCriticalData(minorInspectionData);
    const mappedMinorData = mapMinorKeys(transformedMinorData);

    const transformedStatusData = transformStatusData(statusLOVData);
    const mappedStatusData = mapStatusKeys(transformedStatusData);

    let saveDetails = [];

    // Loop over the maximum length of any of the arrays to ensure all data is captured
    const length = Math.max(
      transformedData.length,
      mappedData.length,
      mappedMajorData.length,
      mappedMinorData.length,
      mappedStatusData.length
    );

    for (let i = 0; i < length; i++) {
      // Constructing the detail object with fallbacks for undefined values
      const detail = {
        line_id: details[i]?.line_id || "",
        time: transformedData[i]?.time || "N/A",
        lotSize: transformedData[i]?.lotSize || "N/A",
        sampleSize: transformedData[i]?.sampleSize || "N/A",
        wrongBoxFixed35: mappedData[i]?.wrongBoxFixed35 || "N/A",
        insectContamination35: mappedData[i]?.insectContamination35 || "N/A",
        metalContamination35: mappedData[i]?.metalContamination35 || "N/A",
        lessCount35: mappedData[i]?.lessCount35 || "N/A",
        majorDiscolourationBreakage35:
          mappedData[i]?.majorDiscolourationBreakage35 || "N/A",
        improperOpenDamagedSealing35:
          mappedMajorData[i]?.improperOpenDamagedSealing35 || "Nil",
        dirtDustContaminatio35n:
          mappedMajorData[i]?.dirtDustContaminatio35n || "Nil",
        plasticContamination35:
          mappedMajorData[i]?.plasticContamination35 || "Nil",
        hairContamination35: mappedMajorData[i]?.hairContamination35 || "Nil",
        noCottonAtEndLessBondingStrength35:
          mappedMajorData[i]?.noCottonAtEndLessBondingStrength35 || "Nil",
        shapeOrCompactnessOfBallsNotCorrect35:
          mappedMajorData[i]?.shapeOrCompactnessOfBallsNotCorrect35 || "Nil",
        blackContamination35: mappedMinorData[i]?.blackContamination35 || "Nil",
        colourContamination35:
          mappedMinorData[i]?.colourContamination35 || "Nil",
        lessWeightSliverDefect35:
          mappedMinorData[i]?.lessWeightSliverDefect35 || "Nil",
        looseCottonLessCotton35:
          mappedMinorData[i]?.looseCottonLessCotton35 || "Nil",
        improperOrIllegiblePrintingFgNo35:
          mappedMinorData[i]?.improperOrIllegiblePrintingFgNo35 || "Nil",
        result: mappedStatusData[i]?.result || "Nil",
      };
      saveDetails.push(detail);
    }

    if (!selectedBMr) {
      setSubmitLoading(false);
      message.error("BMR No is required.");
      return;
    }

    if (!selectedpOrder) {
      setSubmitLoading(false);
      message.error("POrder is required.");
      return;
    }

    if (!date) {
      setSubmitLoading(false);
      message.error("Date is required.");
      return;
    }

    if (!shift) {
      setSubmitLoading(false);
      message.error("Shift is required.");
      return;
    }

    if (!selectedMachine) {
      setSubmitLoading(false);
      message.error("Machine Name is required.");
      return;
    }

    if (!fgNo) {
      setSubmitLoading(false);
      message.error("FG No is required.");
      return;
    }

    if (!lotNo) {
      setSubmitLoading(false);
      message.error("Lot No is required.");
      return;
    }

    if (!lotStatus) {
      setSubmitLoading(false);
      message.error("Lot Status is required.");
      return;
    }

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
      formatNo: "PH-QAD01-F-035",
      revisionNo: "01",
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
      lotStatus: lotStatus || "Nil",
      remark: remarks || "Nil",
      bagWeightSpecification:
        budsInspectionDataRef.current?.["Bag Weight"]?.specification || "N/A",
      averageWeightOfBallsSpecification:
        budsInspectionDataRef.current?.["Average Weight of Balls"]
          ?.specification || "N/A",
      noOfBallsPerPackSpecification:
        budsInspectionDataRef.current?.["No. of Balls Per Pack"]
          ?.specification || "N/A",
      ballsDiaSpecification:
        budsInspectionDataRef.current?.["Balls Dia"]?.specification || "N/A",
      artworkPrintingOnBagsLabelsSpecification:
        budsInspectionDataRef.current?.["Artwork printing on bags / Label"]
          ?.specification || "N/A",
      noOfPackPerCotton35Specification:
        budsInspectionDataRef.current?.["No. of Pack per carton"]
          ?.specification || "N/A",
      bagWeightObservation:
        budsInspectionDataRef.current?.["Bag Weight"]?.observation || "N/A",
      averageWeightOfBallsObservation:
        budsInspectionDataRef.current?.["Average Weight of Balls"]
          ?.observation || "N/A",
      noOfBallsPerPackObservation:
        budsInspectionDataRef.current?.["No. of Balls Per Pack"]?.observation ||
        "N/A",
      ballsDiaObservation:
        budsInspectionDataRef.current?.["Balls Dia"]?.observation || "N/A",
      artworkPrintingOnBagsLabelsObservation:
        budsInspectionDataRef.current?.["Artwork printing on bags / Label"]
          ?.observation || "N/A",
      noOfPackPerCotton35Observation:
        budsInspectionDataRef.current?.["No. of Pack per carton"]
          ?.observation || "N/A",
      details: saveDetails, // Set the constructed details array
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
          "/Precot/QualityAssurance/F-035/inprocess_inspection_report_summary"
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

  const handleBack = () => {
    navigate(
      "/Precot/QualityAssurance/F-035/Inprocess_Inspection_Report_summary"
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
        setSaveLoading(false);
        message.success(res.data.message);
        navigate(
          "/Precot/QualityAssurance/F-035/inprocess_inspection_report_summary"
        );
      })
      .catch((err) => {
        setSaveLoading(false);
        //
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleReject = async () => {
    setSubmitLoading(true);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type if needed
    };

    if (!rejectRemarks) {
      message.warning("Please Enter the Remarks!");
      setSubmitLoading(false);
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
        setSubmitLoading(false);
        message.success(res.data.message);
        navigate(
          "/Precot/QualityAssurance/F-035/inprocess_inspection_report_summary"
        );
      })
      .catch((err) => {
        setSubmitLoading(false);
        //
        message.error(err.response.data.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  useEffect(() => {
    if (editDepartment) {
      setSelectedDepartment(editDepartment);
    }
  }, [editDepartment]);

  useEffect(() => {
    fetchDepartmentsLov();
    fetchMachinesLov();
    fetchInspectionEditDate();
  }, []);

  useEffect(() => {
    fetchBMRLov();
  }, [selectedDepartment]);

  useEffect(() => {
    fetchpOderLov();
  }, [selectedDepartment, selectedBMr]);

  useEffect(() => {
    fetchPoNoLov();
  }, [selectedpOrder]);

  useEffect(() => {
    fetchCustNameAndProdDesc();
  }, [selectedMaterial]);

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
        (response?.qa_mr_status == "" ||
          response?.qa_mr_status == "QA_MR_REJECTED")
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
      //alert(response[0].qa_mr_status);
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

  const fetchMachinesLov = async () => {
    let depParam = "";
    if (editDepartment == "Dry Goods") {
      depParam = "balls";
    }
    try {
      setLoading(true); // Show loading spinner while fetching data
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/machineLov?department=${depParam}`, // Replace with your actual API base URL
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token in Authorization header
          },
        }
      );
      const machineOptions = response.data.map((mach) => ({
        label: mach.MCN, // Each element is the label itself
        value: mach.MCN, // Each element is also the value itself
      }));
      setMachines(machineOptions); // Set fetched departments as options
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
      //alert(selectedDepartment);
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

  const fetchpOderLov = async () => {
    try {
      setLoading(true); // Show loading spinner while fetching data
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/pOderLov?department=${selectedDepartment}&batchNo=${selectedBMr}`, // Replace with your actual API base URL
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token in Authorization header
          },
        }
      );
      const pOrderOptions = response.data.map((dept) => ({
        label: dept, // Each element is the label itself
        value: dept, // Each element is also the value itself
      }));
      setPOrder(pOrderOptions); // Set fetched departments as options
    } catch (error) {
      console.error("Error fetching department LOV:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const fetchPoNoLov = async () => {
    try {
      setLoading(true); // Show loading spinner while fetching data
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/poNoAndMaterial?pOrder=${selectedpOrder}`, // Replace with your actual API base URL
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token in Authorization hfetchPoNoLoveader
          },
          responseType: "json",
        }
      );
      // if (!editShown.current) {
      setPoNo(res.data.pono);
      // Set the material options, assuming `itemcode` is a string, wrap it in an array of options
      const materialOptions = [
        { label: res.data.itemcode, value: res.data.itemcode },
      ];
      setMaterial(materialOptions); // Set the material dropdown options
      // } // Set fetched departments as options
    } catch (error) {
      console.error("Error fetching department LOV:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const fetchCustNameAndProdDesc = async () => {
    try {
      setLoading(true); // Show loading spinner while fetching data
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API.prodUrl}/Precot/api/QA/Service/api/CustomerNameANdProductDesc?material=${selectedMaterial}`, // Replace with your actual API base URL
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token in Authorization header
          },
        }
      );

      setCustomerName(response.data.customerName);
      setProductDescription(response.data.productDesc);
    } catch (error) {
      console.error("Error fetching department LOV:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // getdata
  const fetchInspectionEditDate = async () => {
    const token = localStorage.getItem("token");
    if (alertShown.current) {
      return;
    }
    alertShown.current = true;
    try {
      await axios
        .get(
          `${API.prodUrl}/Precot/api/QA/Service/api/findByDateShidtMachineNoPordeBmr?date=${editDate}&shift=${editShift}&machineNo=${editMachineNo}&pOrder=${editPOrder}&bmrNo=${editBmrNo}&formatNo=PH-QAD01-F-035`,

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
            setSelectedMaterial(res.data[0].itemCode);
            setSelectedMachine(res.data[0].machineNo);
            setFgNo(res.data[0].fgNo);
            setPoNo(res.data[0].poNo);
            setAqlSampleSize(res.data[0].aqlSampleSize);
            setLotNo(res.data[0].lotNo);
            const transformedData = transformToOriginalStructure(res.data[0]);

            setBudsInspectionData(transformedData);
            setLotStatus(res.data[0].lotStatus);
            setRemarks(res.data[0].remark);
            budsInspectionDataRef.current = transformedData;
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
                "/Precot/QualityAssurance/F-035/inprocess_inspection_report_summary"
              );
            }, 1500);
            alertShown.current = true;
          }

          if (
            (roleauth == "ROLE_SUPERVISOR" &&
              res.data[0].qa_inspector_status !== "QA_INS_SUBMITTED") ||
            (roleauth == "ROLE_SUPERVISOR" &&
              res.data[0].prod_supervisor_status == "SUPERVISOR_REJECTED")
          ) {
            message.error("QA Inspector Yet Not Approved");
            setTimeout(() => {
              navigate(
                "/Precot/QualityAssurance/F-035/inprocess_inspection_report_summary"
              );
            }, 1500);
            alertShown.current = true;
          }
        })
        .catch((err) => { 
        });
    } catch (error) {
      console.error("Error in handleDatePrintChange:", error);
    }
  };

  const transformToOriginalStructure = (data) => {
    return {
      "Bag Weight": {
        specification: data.bagWeightSpecification || "",
        observation: data.bagWeightObservation || "",
      },
      "Average Weight of Balls": {
        specification: data.averageWeightOfBallsSpecification || "",
        observation: data.averageWeightOfBallsObservation || "",
      },
      "No. of Balls Per Pack": {
        specification: data.noOfBallsPerPackSpecification || "",
        observation: data.noOfBallsPerPackObservation || "",
      },
      "Balls Dia": {
        specification: data.ballsDiaSpecification || "",
        observation: data.ballsDiaObservation || "",
      },
      "Artwork printing on bags / Label": {
        specification: data.artworkPrintingOnBagsLabelsSpecification || "",
        observation: data.artworkPrintingOnBagsLabelsObservation || "",
      },
      "No. of Pack per carton": {
        specification: data.noOfPackPerCotton35Specification || "",
        observation: data.noOfPackPerCotton35Observation || "",
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
      "Less Count": [],
      "Major Discolouration / Breakage at serration": [],
    };

    const majorTransformed = {
      "Improper / Open / Damaged Sealing": [],
      "Dirt / Dust Contamination": [],
      "Plastic Contamination": [],
      "Hair Contamination": [],
      "No cotton at end / Less Bonding Strength": [],
      "Shape or Compactness of balls not correct": [],
    };
    const minorTransformed = {
      "Black Contamination": [],
      "Colour Contamination": [],
      "Less Weight/Sliver Defect(Loose Sliver/ Flat Shape/ More Hairiness)": [],
      "Loose Cotton / Less Cotton / Tail Ends": [],
      "Improper or Illegible printing of FG No.": [],
      Result: [],
    };
    if (details && details.length > 0) {
      details.forEach((item) => {
        criticalTransformed["Wrong / Missing FG No."].push(
          item.wrongBoxFixed35 || "N/A"
        );
        criticalTransformed["Insect Contamination"].push(
          item.insectContamination35 || "N/A"
        );
        criticalTransformed["Metal Contamination"].push(
          item.metalContamination35 || "N/A"
        );
        criticalTransformed["Less Count"].push(item.lessCount35 || "N/A");
        criticalTransformed[
          "Major Discolouration / Breakage at serration"
        ].push(item.majorDiscolourationBreakage35 || "N/A");

        majorTransformed["Improper / Open / Damaged Sealing"].push(
          item.improperOpenDamagedSealing35 || "Nil"
        );
        majorTransformed["Dirt / Dust Contamination"].push(
          item.dirtDustContaminatio35n || "Nil"
        );
        majorTransformed["Plastic Contamination"].push(
          item.plasticContamination35 || "Nil"
        );
        majorTransformed["Hair Contamination"].push(
          item.hairContamination35 || "Nil"
        );

        majorTransformed["No cotton at end / Less Bonding Strength"].push(
          item.noCottonAtEndLessBondingStrength35 || "Nil"
        );
        majorTransformed["Shape or Compactness of balls not correct"].push(
          item.shapeOrCompactnessOfBallsNotCorrect35 || "Nil"
        );

        minorTransformed["Black Contamination"].push(
          item.blackContamination35 || "Nil"
        );
        minorTransformed["Colour Contamination"].push(
          item.colourContamination35 || "Nil"
        );
        minorTransformed[
          "Less Weight/Sliver Defect(Loose Sliver/ Flat Shape/ More Hairiness)"
        ].push(item.lessWeightSliverDefect35 || "Nil");
        minorTransformed["Loose Cotton / Less Cotton / Tail Ends"].push(
          item.looseCottonLessCotton35 || "Nil"
        );
        minorTransformed["Improper or Illegible printing of FG No."].push(
          item.improperOrIllegiblePrintingFgNo35 || "Nil"
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
         
        });
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

  const tableCrticalData = [
    {
      key: "1",
      column1: "Time :", // First column hardcoded data
      column2: details.length > 0 ? details[0]?.time || "" : "", // Fill from details or empty
      column3: details.length > 0 ? details[1]?.time || "" : "",
      column4: details.length > 0 ? details[2]?.time || "" : "",
      column5: "",
    },
    {
      key: "2",
      column1: "Lot Size",
      column2: details.length > 0 ? details[0]?.lotSize || "" : "",
      column3: details.length > 0 ? details[1]?.lotSize || "" : "",
      column4: details.length > 0 ? details[2]?.lotSize || "" : "",
      column5: "",
    },
    {
      key: "3",
      column1: "Sample Size",
      column2: details.length > 0 ? details[0]?.sampleSize || "" : "",
      column3: details.length > 0 ? details[1]?.sampleSize || "" : "",
      column4: details.length > 0 ? details[2]?.sampleSize || "" : "",
      column5: "",
    },
  ];

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
        formName="ON-LINE INSPECTION REPORT(FOR BALLS)"
        formatNo="PH-QAD01-F-035"
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
                  display: canDisplayButtonSave(),
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
              if (window.confirm("Are you sure want to logout")) {
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
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6} lg={5}>
            <Form.Item label="Department">
              <Select
                value={selectedDepartment}
                placeholder="Choose Department"
                style={{ width: "140px" }} // Use 100% width for flexibility
                onChange={departmentChange}
                disabled
                options={departments}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6} lg={3} style={{ marginRight: "2%" }}>
            <Form.Item label="BMR No.">
              <Select
                showSearch
                value={selectedBMr}
                disabled={!isEditable}
                placeholder="Choose BMR"
                style={{ width: "120px" }} // Use 100% width for flexibility
                onChange={bmrChange}
                options={BMR}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={3} style={{ marginRight: "1%" }}>
            <Form.Item label="POrder">
              <Select
                showSearch
                value={selectedpOrder}
                disabled={!isEditable}
                placeholder="Choose POrder"
                style={{ width: "120px" }} // Use 100% width for flexibility
                onChange={pOrderChange}
                options={pOrder}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6} lg={3} style={{ marginRight: "1%" }}>
            <Form.Item label="Item Code">
              <Select
                value={selectedMaterial}
                disabled={!isEditable}
                placeholder="Choose Material"
                style={{ width: "180px" }} // Use 100% width for flexibility
                onChange={materialChange}
                options={material}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6} lg={5}>
            <Form.Item
              label="Product Description"
              style={{ marginLeft: "30%" }}
            >
              <Input
                value={productDescription}
                style={{ color: "black", width: "280px" }}
                disabled
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12} md={6} lg={5} style={{ marginRight: "" }}>
            <Form.Item label="Customer Name">
              <Input
                value={customerName}
                style={{ color: "black", width: "200px" }}
                disabled
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={2} style={{ marginLeft: "5%" }}>
            <Form.Item label="Shift">
              <Select
                value={shift}
                disabled={!isEditable}
                onChange={(value) => setShift(value)}
                style={{ width: "100%" }} // Use 100% width for flexibility
              >
                <Select.Option value="I">I</Select.Option>
                <Select.Option value="II">II</Select.Option>
                <Select.Option value="III">III</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Form.Item label="Date">
              <DatePicker
                value={date ? moment(date) : null}
                disabled={!isEditable}
                onChange={(date) =>
                  setDate(date ? date.format("YYYY-MM-DD") : null)
                }
                disabledDate={(current) => {
                  // Disable dates after today
                  return current && current > moment().endOf("day");
                }}
                style={{ width: "100%" }} // Use 100% width for flexibility
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Form.Item label="Lot No.">
              <Input
                value={lotNo}
                onKeyDown={(e) => {
                  const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                  // Check if the pressed key is not valid
                  if (
                    !isAlphanumeric.test(e.key) &&
                    ![
                      "Backspace",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                      "_",
                      "/",
                      " ",
                    ].includes(e.key)
                  ) {
                    e.preventDefault(); // Prevent the default action (character input)
                  }
                }}
                disabled={!isEditable}
                onChange={(e) => setLotNo(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Form.Item label="Machine Name">
              <Select
                value={selectedMachine}
                disabled={!isEditable}
                placeholder="Choose Machine"
                style={{ width: "100%" }} // Use 100% width for flexibility
                onChange={machineChange}
                options={machines}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Form.Item label="FG No.">
              <Input
                value={fgNo}
                disabled={!isEditable}
                onChange={(e) => setFgNo(e.target.value)}
                onKeyDown={(e) => {
                  const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                  // Check if the pressed key is not valid
                  if (
                    !isAlphanumeric.test(e.key) &&
                    ![
                      "Backspace",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                      "_",
                      "/",
                      " ",
                    ].includes(e.key)
                  ) {
                    e.preventDefault(); // Prevent the default action (character input)
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Buds Inspection" key="1">
            <DynamicTableForm
              labels={inspectionBudsLabels}
              dataSource={budsInspectionData}
              onChange={handleBudsInputChange}
              disabled={!isEditable}
              type="f035"
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
                        const timeValue =
                          record.column2 && record.column2 !== "N/A"
                            ? moment(record.column2, "HH:mm")
                            : null; // Ensure it's valid

                        return (
                          <TimePicker
                            format="HH:mm"
                            style={{ width: "100%" }}
                            disabled={!isEditable}
                            value={timeValue} // Set the timeValue here
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
                          onKeyDown={(e) => {
                            const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                            // Check if the pressed key is not valid
                            if (
                              !isAlphanumeric.test(e.key) &&
                              ![
                                "Backspace",
                                "Tab",
                                "ArrowLeft",
                                "ArrowRight",
                                "_",
                                " ",
                              ].includes(e.key)
                            ) {
                              e.preventDefault(); // Prevent the default action (character input)
                            }
                          }}
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
                        const timeValue =
                          record.column3 && record.column3 !== "N/A"
                            ? moment(record.column3, "HH:mm")
                            : null; // Ensure it's valid
                        return (
                          <TimePicker
                            format="HH:mm"
                            style={{ width: "100%" }}
                            disabled={!isEditable}
                            value={timeValue} // Ensure it's a valid moment object
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
                          onKeyDown={(e) => {
                            const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                            // Check if the pressed key is not valid
                            if (
                              !isAlphanumeric.test(e.key) &&
                              ![
                                "Backspace",
                                "Tab",
                                "ArrowLeft",
                                "ArrowRight",
                                "_",
                                " ",
                              ].includes(e.key)
                            ) {
                              e.preventDefault(); // Prevent the default action (character input)
                            }
                          }}
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
                        const timeValue =
                          record.column4 && record.column4 !== "N/A"
                            ? moment(record.column4, "HH:mm")
                            : null; // Ensure it's valid
                        return (
                          <TimePicker
                            format="HH:mm"
                            style={{ width: "100%" }}
                            disabled={!isEditable}
                            value={timeValue} // Ensure it's a valid moment object
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
                          onKeyDown={(e) => {
                            const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                            // Check if the pressed key is not valid
                            if (
                              !isAlphanumeric.test(e.key) &&
                              ![
                                "Backspace",
                                "Tab",
                                "ArrowLeft",
                                "ArrowRight",
                                "_",
                                " ",
                              ].includes(e.key)
                            ) {
                              e.preventDefault(); // Prevent the default action (character input)
                            }
                          }}
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
                        const timeValue =
                          record.column5 && record.column5 !== "N/A"
                            ? moment(record.column5, "HH:mm")
                            : null; // Ensure it's valid
                        return (
                          <TimePicker
                            disabled={!isEditable}
                            format="HH:mm"
                            style={{ width: "100%" }}
                            value={timeValue} // Ensure it's a valid moment object
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
                          disabled={!isEditable}
                          value={record.column5}
                          onKeyDown={(e) => {
                            const isAlphanumeric = /^[a-zA-Z0-9.]$/;
                            // Check if the pressed key is not valid
                            if (
                              !isAlphanumeric.test(e.key) &&
                              ![
                                "Backspace",
                                "Tab",
                                "ArrowLeft",
                                "ArrowRight",
                                "_",
                                " ",
                              ].includes(e.key)
                            ) {
                              e.preventDefault(); // Prevent the default action (character input)
                            }
                          }}
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
              disabled={!isEditable}
              labels={inspectionLabels}
              dataSource={details}
              onChange={handleRadioChange}
              type="f035"
            />
          </TabPane>
          <TabPane tab="Major Inspection" key="4">
            <QA_f034_major_inspection
              disabled={!isEditable}
              labels={inspectionMajorLabels}
              dataSource={details}
              onChange={handleMajorRadioChange}
              type="f035"
            />
          </TabPane>
          <TabPane tab="Minor Inspection" key="5">
            <QA_f034_minor_inspection
              disabled={!isEditable}
              labels={inspectionMinorLabels}
              dataSource={details}
              onChange={handleMinorRadioChange}
              type="f035"
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
                        {/* Signature & Date */}
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

export default QA_f035_Inprocess_Inspection_Report;
